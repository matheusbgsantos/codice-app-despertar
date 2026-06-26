import { eq, and, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { existsSync, mkdirSync } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Resolve __dirname compatível com ESM e com bundle esbuild
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  InsertUser,
  users,
  authorizedEmails,
  webhookLogs,
  visitors,
  InsertAuthorizedEmail,
  InsertWebhookLog,
  InsertVisitor,
  userProgress,
  journeyDayCompletions,
  frequencySessions,
  userProtocol,
  InsertUserProtocol,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance (SQLite local — standalone, sem Manus).
export async function getDb() {
  if (!_db) {
    try {
      // Usa DATABASE_URL do ambiente (Railway etc.) ou path absoluto como fallback.
      // path.resolve garante que funciona independente do diretório de execução.
      const dbPath = process.env.DATABASE_URL
        ? path.resolve(process.env.DATABASE_URL)
        : path.resolve(__dirname, "../data/app.db");
      const dir = dirname(dbPath);
      if (dir && dir !== "." && !existsSync(dir)) mkdirSync(dir, { recursive: true });
      const sqlite = new Database(dbPath);
      sqlite.pragma("journal_mode = WAL");
      // Auto-migrate: SQL embutido (idempotente) — garante tabelas em produção
      try {
        const DDL = [
          `CREATE TABLE IF NOT EXISTS users (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, openId text NOT NULL UNIQUE, appId text, name text, email text, avatarUrl text, role text DEFAULT 'user' NOT NULL, createdAt integer DEFAULT (unixepoch()) NOT NULL, updatedAt integer DEFAULT (unixepoch()) NOT NULL)`,
          `CREATE TABLE IF NOT EXISTS authorized_emails (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, email text NOT NULL UNIQUE, accessType text DEFAULT 'lifetime' NOT NULL, createdAt integer DEFAULT (unixepoch()) NOT NULL)`,
          `CREATE TABLE IF NOT EXISTS webhook_logs (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, eventType text, email text, payload text, status text, createdAt integer DEFAULT (unixepoch()) NOT NULL)`,
          `CREATE TABLE IF NOT EXISTS visitors (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, email text NOT NULL UNIQUE, firstSeenAt integer DEFAULT (unixepoch()) NOT NULL, lastSeenAt integer DEFAULT (unixepoch()) NOT NULL, visitCount integer DEFAULT 1 NOT NULL, accessType text DEFAULT 'lifetime' NOT NULL)`,
          `CREATE TABLE IF NOT EXISTS user_progress (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, email text NOT NULL UNIQUE, activeJourneyId text, currentDay integer DEFAULT 1 NOT NULL, streakCount integer DEFAULT 0 NOT NULL, lastSessionDate text, createdAt integer DEFAULT (unixepoch()) NOT NULL, updatedAt integer DEFAULT (unixepoch()) NOT NULL)`,
          `CREATE TABLE IF NOT EXISTS journey_day_completions (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, email text NOT NULL, journeyId text NOT NULL, dayNumber integer NOT NULL, frequencyId text NOT NULL, completedAt integer DEFAULT (unixepoch()) NOT NULL)`,
          `CREATE TABLE IF NOT EXISTS frequency_sessions (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, email text NOT NULL, frequencyId text NOT NULL, mode text NOT NULL, durationSeconds integer DEFAULT 0 NOT NULL, startedAt integer DEFAULT (unixepoch()) NOT NULL)`,
          `CREATE TABLE IF NOT EXISTS user_protocol (email text PRIMARY KEY NOT NULL, seal text NOT NULL, dominantChain text NOT NULL, answersJson text NOT NULL, protocolJson text NOT NULL, createdAt text NOT NULL)`,
        ];
        for (const ddl of DDL) {
          try { sqlite.exec(ddl); } catch(_) {}
        }
        console.log("[Database] Tabelas garantidas (DDL embutido)");
      } catch (migErr) {
        console.warn("[Database] migrate erro:", migErr);
      }
      _db = drizzle(sqlite);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}


export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ==================== AUTHORIZED EMAILS ====================

/**
 * Verifica se um email está autorizado a acessar o conteúdo
 */
export async function isEmailAuthorized(email: string): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot check email: database not available");
    return false;
  }

  const normalizedEmail = email.toLowerCase().trim();
  const result = await db
    .select()
    .from(authorizedEmails)
    .where(and(
      eq(authorizedEmails.email, normalizedEmail),
      eq(authorizedEmails.isActive, true)
    ))
    .limit(1);

  return result.length > 0;
}

/**
 * Obtém informações de um email autorizado
 */
export async function getAuthorizedEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get email: database not available");
    return null;
  }

  const normalizedEmail = email.toLowerCase().trim();
  const result = await db
    .select()
    .from(authorizedEmails)
    .where(eq(authorizedEmails.email, normalizedEmail))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Adiciona um email à lista de autorizados
 */
export async function addAuthorizedEmail(data: InsertAuthorizedEmail): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot add email: database not available");
    return;
  }

  const normalizedEmail = data.email.toLowerCase().trim();
  
  // Upsert - se já existe, atualiza; se não, insere
  await db.insert(authorizedEmails).values({
    ...data,
    email: normalizedEmail,
  }).onConflictDoUpdate({
    target: authorizedEmails.email,
    set: {
      name: data.name,
      saleId: data.saleId,
      productName: data.productName,
      isActive: data.isActive ?? true,
      addedBy: data.addedBy,
      // accessType só é sobrescrito se vier explícito (preserva 'lifetime' default).
      ...(data.accessType ? { accessType: data.accessType } : {}),
    },
  });
}

/**
 * Remove/desativa um email da lista de autorizados
 */
export async function deactivateEmail(email: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot deactivate email: database not available");
    return;
  }

  const normalizedEmail = email.toLowerCase().trim();
  await db
    .update(authorizedEmails)
    .set({ isActive: false })
    .where(eq(authorizedEmails.email, normalizedEmail));
}

/**
 * Reativa um email
 */
export async function activateEmail(email: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot activate email: database not available");
    return;
  }

  const normalizedEmail = email.toLowerCase().trim();
  await db
    .update(authorizedEmails)
    .set({ isActive: true })
    .where(eq(authorizedEmails.email, normalizedEmail));
}

/**
 * Lista todos os emails autorizados
 */
export async function listAuthorizedEmails() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot list emails: database not available");
    return [];
  }

  return await db.select().from(authorizedEmails).orderBy(authorizedEmails.createdAt);
}

/**
 * Deleta um email permanentemente
 */
export async function deleteAuthorizedEmail(email: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete email: database not available");
    return;
  }

  const normalizedEmail = email.toLowerCase().trim();
  await db.delete(authorizedEmails).where(eq(authorizedEmails.email, normalizedEmail));
}

// ==================== WEBHOOK LOGS ====================

/**
 * Registra um log de webhook recebido
 */
export async function logWebhook(data: InsertWebhookLog): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot log webhook: database not available");
    return;
  }

  await db.insert(webhookLogs).values(data);
}

/**
 * Lista os últimos logs de webhook
 */
export async function listWebhookLogs(limit: number = 50) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot list webhook logs: database not available");
    return [];
  }

  return await db
    .select()
    .from(webhookLogs)
    .orderBy(webhookLogs.createdAt)
    .limit(limit);
}

// ==================== VISITORS/LEADS ====================

/**
 * Registra um visitante/lead no banco de dados
 * Se já existe, incrementa o contador de acessos
 */
export async function registerVisitor(email: string, name?: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot register visitor: database not available");
    return;
  }

  const normalizedEmail = email.toLowerCase().trim();
  
  // Tenta inserir, se já existe atualiza o contador e último acesso
  await db.insert(visitors).values({
    email: normalizedEmail,
    name: name || null,
    accessCount: 1,
  }).onConflictDoUpdate({
    target: visitors.email,
    set: {
      accessCount: sql`${visitors.accessCount} + 1`,
      lastAccessAt: new Date(),
    },
  });
}

/**
 * Lista todos os visitantes/leads
 */
export async function listVisitors() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot list visitors: database not available");
    return [];
  }

  return await db.select().from(visitors).orderBy(visitors.createdAt);
}

// ==================== PROGRESSO (Épico 4) ====================

/** Retorna 'YYYY-MM-DD' (UTC) para uma data. */
function toDateString(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Diferença em dias inteiros entre duas datas 'YYYY-MM-DD'. */
function dayDiff(fromYmd: string, toYmd: string): number {
  const a = new Date(fromYmd + "T00:00:00Z").getTime();
  const b = new Date(toYmd + "T00:00:00Z").getTime();
  return Math.round((b - a) / 86400000);
}

/**
 * Obtém (ou cria implicitamente como null) o progresso do usuário.
 */
export async function getProgress(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get progress: database not available");
    return null;
  }
  const normalizedEmail = email.toLowerCase().trim();
  const result = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.email, normalizedEmail))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

/**
 * Inicia (ou troca) uma jornada para o usuário. Reseta currentDay para 1.
 * Não reseta o streak (continuidade diária é mantida entre jornadas).
 */
export async function startJourney(email: string, journeyId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot start journey: database not available");
    return null;
  }
  const normalizedEmail = email.toLowerCase().trim();
  const now = new Date();

  await db
    .insert(userProgress)
    .values({
      email: normalizedEmail,
      activeJourneyId: journeyId,
      currentDay: 1,
      streakCount: 0,
      lastSessionDate: null,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: userProgress.email,
      set: {
        activeJourneyId: journeyId,
        currentDay: 1,
        updatedAt: now,
      },
    });

  return await getProgress(normalizedEmail);
}

/**
 * Conclui o dia atual de uma jornada.
 * - Recalcula o streak comparando lastSessionDate com hoje:
 *   ontem => +1, hoje (mesmo dia) => mantém, caso contrário => reset para 1.
 * - Grava lastSessionDate = hoje, incrementa currentDay (máx. 30).
 * - Insere registro em journeyDayCompletions (evita duplicar mesmo dia/jornada).
 */
export async function completeDay(
  email: string,
  journeyId: string,
  day: number,
  frequencyId: string,
  // MODO TESTE (admin): quando true, ignora a trava de "1 dia por dia real",
  // permitindo avançar vários dias na mesma data. NÃO usado pelo fluxo normal
  // do cliente (default false), então a experiência do cliente fica intacta.
  bypassDateLock: boolean = false,
) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot complete day: database not available");
    return null;
  }
  const normalizedEmail = email.toLowerCase().trim();
  const now = new Date();
  const today = toDateString(now);

  const existing = await getProgress(normalizedEmail);

  // Cálculo de streak no SERVIDOR.
  let newStreak = 1;
  let alreadyToday = false;
  if (existing?.lastSessionDate) {
    const diff = dayDiff(existing.lastSessionDate, today);
    if (diff === 0) {
      // Já registrou hoje: mantém streak.
      newStreak = existing.streakCount > 0 ? existing.streakCount : 1;
      alreadyToday = true;
    } else if (diff === 1) {
      // Dia consecutivo: incrementa.
      newStreak = existing.streakCount + 1;
    } else {
      // Quebrou a sequência: reinicia.
      newStreak = 1;
    }
  }

  // No MODO TESTE, ignora a trava do mesmo dia: sempre avança e soma streak.
  if (bypassDateLock) {
    if (alreadyToday) {
      newStreak = (existing?.streakCount ?? 0) + 1;
    }
    alreadyToday = false;
  }

  // Avança o dia (limite 30). Só avança uma vez por dia (exceto modo teste).
  const baseDay = existing?.currentDay ?? day;
  const nextDay = alreadyToday ? baseDay : Math.min(baseDay + 1, 30);

  await db
    .insert(userProgress)
    .values({
      email: normalizedEmail,
      activeJourneyId: journeyId,
      currentDay: nextDay,
      streakCount: newStreak,
      lastSessionDate: today,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: userProgress.email,
      set: {
        activeJourneyId: journeyId,
        currentDay: nextDay,
        streakCount: newStreak,
        lastSessionDate: today,
        updatedAt: now,
      },
    });

  // Registra a conclusão do dia (idempotente por email+journey+dia).
  const dup = await db
    .select()
    .from(journeyDayCompletions)
    .where(
      and(
        eq(journeyDayCompletions.email, normalizedEmail),
        eq(journeyDayCompletions.journeyId, journeyId),
        eq(journeyDayCompletions.dayNumber, day),
      ),
    )
    .limit(1);

  if (dup.length === 0) {
    await db.insert(journeyDayCompletions).values({
      email: normalizedEmail,
      journeyId,
      dayNumber: day,
      frequencyId,
    });
  }

  return await getProgress(normalizedEmail);
}

/** Registra uma sessão de áudio (telemetria leve). */
export async function logSession(
  email: string,
  frequencyId: string,
  mode: "ambiente" | "puro",
  durationSeconds: number,
) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot log session: database not available");
    return;
  }
  const normalizedEmail = email.toLowerCase().trim();
  await db.insert(frequencySessions).values({
    email: normalizedEmail,
    frequencyId,
    mode,
    durationSeconds: Math.max(0, Math.round(durationSeconds)),
  });
}

/** Estatísticas agregadas: total de sessões, minutos e dias completos. */
export async function getStats(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get stats: database not available");
    return { totalSessions: 0, totalMinutes: 0, daysCompleted: 0, streakCount: 0 };
  }
  const normalizedEmail = email.toLowerCase().trim();

  const sessions = await db
    .select()
    .from(frequencySessions)
    .where(eq(frequencySessions.email, normalizedEmail));

  const completions = await db
    .select()
    .from(journeyDayCompletions)
    .where(eq(journeyDayCompletions.email, normalizedEmail));

  const progress = await getProgress(normalizedEmail);

  const totalSeconds = sessions.reduce(
    (acc, s) => acc + (s.durationSeconds ?? 0),
    0,
  );

  return {
    totalSessions: sessions.length,
    totalMinutes: Math.round(totalSeconds / 60),
    daysCompleted: completions.length,
    streakCount: progress?.streakCount ?? 0,
  };
}

// ==================== PROTOCOLO 30 DIAS (Épico 3 — Códice v2) ====================

/** journeyId fixo do desafio personalizado (chaveia o motor de progresso). */
export const PROTOCOL_JOURNEY_ID = "protocolo-codice";

/**
 * Retorna o protocolo selado de um e-mail (linha crua) ou null.
 * Isolamento: a query é SEMPRE filtrada pelo e-mail normalizado.
 */
export async function getUserProtocol(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get protocol: database not available");
    return null;
  }
  const normalizedEmail = email.toLowerCase().trim();
  const result = await db
    .select()
    .from(userProtocol)
    .where(eq(userProtocol.email, normalizedEmail))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

/**
 * Cria (sela) o protocolo de um e-mail. IDEMPOTENTE: se já existe, NÃO
 * regenera — retorna o snapshot imutável existente. Isolamento por e-mail.
 */
export async function createUserProtocol(
  data: InsertUserProtocol,
): Promise<{ row: typeof userProtocol.$inferSelect; created: boolean }> {
  const db = await getDb();
  if (!db) {
    throw new Error("[Database] Cannot create protocol: database not available");
  }
  const normalizedEmail = data.email.toLowerCase().trim();

  const existing = await getUserProtocol(normalizedEmail);
  if (existing) {
    return { row: existing, created: false };
  }

  await db.insert(userProtocol).values({ ...data, email: normalizedEmail });

  // Inicializa o motor de progresso (currentDay=1, streak=0) para este e-mail.
  await startJourney(normalizedEmail, PROTOCOL_JOURNEY_ID);

  const row = await getUserProtocol(normalizedEmail);
  if (!row) throw new Error("[Database] Protocol insert failed");
  return { row, created: true };
}

/** Analytics agregado do app (uso real). */
export async function getAnalytics() {
  const db = await getDb();
  if (!db) throw new Error("[Database] not available");
  const protocols = await db.select().from(userProtocol);
  const progress = await db.select().from(userProgress);

  const total = protocols.length;
  // Distribuição por corrente dominante
  const chains: Record<string, number> = {};
  for (const p of protocols) {
    chains[p.dominantChain] = (chains[p.dominantChain] || 0) + 1;
  }
  // Progresso: dia atual e streak por pessoa
  const dias = progress.map((p) => p.currentDay || 1);
  const streaks = progress.map((p) => p.streakCount || 0);
  const avgDay = dias.length ? (dias.reduce((a, b) => a + b, 0) / dias.length) : 0;
  const maxDay = dias.length ? Math.max(...dias) : 0;
  const maxStreak = streaks.length ? Math.max(...streaks) : 0;
  // Quantos passaram do dia 1 (engajaram de verdade)
  const passou1 = dias.filter((d) => d > 1).length;
  const passou7 = dias.filter((d) => d > 7).length;
  const chegou30 = dias.filter((d) => d >= 30).length;
  // Lista por e-mail (resumida)
  const usuarios = protocols.map((p) => {
    const prog = progress.find((g) => g.email === p.email);
    return {
      email: p.email,
      corrente: p.dominantChain,
      seal: p.seal,
      diaAtual: prog?.currentDay || 1,
      streak: prog?.streakCount || 0,
      criadoEm: p.createdAt,
    };
  });

  return {
    totalUsuarios: total,
    porCorrente: chains,
    diaMedio: Math.round(avgDay * 10) / 10,
    maiorDia: maxDay,
    maiorStreak: maxStreak,
    passaramDia1: passou1,
    passaramDia7: passou7,
    chegaramDia30: chegou30,
    taxaEngajamento: total ? Math.round((passou1 / total) * 100) : 0,
    usuarios: usuarios.sort((a, b) => (b.diaAtual - a.diaAtual)),
  };
}
