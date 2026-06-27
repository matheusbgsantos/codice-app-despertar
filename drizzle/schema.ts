import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

/**
 * Core user table backing auth flow (SQLite — standalone, sem Manus).
 * Colunas em camelCase para casar com os tipos gerados.
 */
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  /** Identificador único do usuário (e-mail-based agora; mantém nome openId por compat). */
  openId: text("openId").notNull().unique(),
  name: text("name"),
  email: text("email"),
  loginMethod: text("loginMethod"),
  role: text("role", { enum: ["user", "admin"] }).default("user").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  lastSignedIn: integer("lastSignedIn", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Emails autorizados — compradores (Kirvano). Acesso liberado quando a compra é aprovada.
 */
export const authorizedEmails = sqliteTable("authorized_emails", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name"),
  saleId: text("saleId"),
  productName: text("productName"),
  // Tipo de acesso. 'lifetime' = compra única vitalícia (App de Frequências R$27,90,
  // modelo atual). 'subscription' = assinatura recorrente (GANCHO FUTURO, ainda
  // NÃO ativado). Para ativar recorrência no futuro: (1) mudar este default ou
  // gravar 'subscription' no webhook quando o produto for um plano recorrente da
  // Kirvano; (2) tratar eventos de renovação/cancelamento (ex.: SUBSCRIPTION_RENEWED,
  // SUBSCRIPTION_CANCELED) chamando activateEmail/deactivateEmail; (3) opcionalmente
  // adicionar uma coluna expiresAt e checar validade em isEmailAuthorized.
  accessType: text("accessType", { enum: ["lifetime", "subscription"] })
    .default("lifetime")
    .notNull(),
  isActive: integer("isActive", { mode: "boolean" }).default(true).notNull(),
  addedBy: text("addedBy", { enum: ["webhook", "manual"] }).default("manual").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type AuthorizedEmail = typeof authorizedEmails.$inferSelect;
export type InsertAuthorizedEmail = typeof authorizedEmails.$inferInsert;

/**
 * Log de webhooks recebidos (Kirvano) — debug e auditoria.
 */
export const webhookLogs = sqliteTable("webhook_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  event: text("event").notNull(),
  payload: text("payload"),
  customerEmail: text("customerEmail"),
  saleId: text("saleId"),
  processed: integer("processed", { mode: "boolean" }).default(false).notNull(),
  errorMessage: text("errorMessage"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type WebhookLog = typeof webhookLogs.$inferSelect;
export type InsertWebhookLog = typeof webhookLogs.$inferInsert;

/**
 * Visitantes/leads — todos que acessam o portal. Captura e-mails.
 */
export const visitors = sqliteTable("visitors", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name"),
  accessCount: integer("accessCount").default(1).notNull(),
  lastAccessAt: integer("lastAccessAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type Visitor = typeof visitors.$inferSelect;
export type InsertVisitor = typeof visitors.$inferInsert;

/* =========================================================================
 * v2 — Tabelas de PROGRESSO (Story 4.1). Chave por e-mail (consistente c/ auth).
 * ========================================================================= */

/** Estado atual do usuário: trilha ativa, dia, streak. */
export const userProgress = sqliteTable("user_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  activeJourneyId: text("activeJourneyId"),
  currentDay: integer("currentDay").default(1).notNull(),
  streakCount: integer("streakCount").default(0).notNull(),
  lastSessionDate: text("lastSessionDate"), // 'YYYY-MM-DD' (data local do cliente)
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;

/** Dias concluídos de cada trilha. */
export const journeyDayCompletions = sqliteTable("journey_day_completions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  journeyId: text("journeyId").notNull(),
  dayNumber: integer("dayNumber").notNull(),
  frequencyId: text("frequencyId").notNull(),
  completedAt: integer("completedAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type JourneyDayCompletion = typeof journeyDayCompletions.$inferSelect;
export type InsertJourneyDayCompletion = typeof journeyDayCompletions.$inferInsert;

/** Telemetria leve de sessões de áudio (alimenta "Sua Evolução"). */
export const frequencySessions = sqliteTable("frequency_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  frequencyId: text("frequencyId").notNull(),
  mode: text("mode", { enum: ["ambiente", "puro"] }).notNull(),
  durationSeconds: integer("durationSeconds").default(0).notNull(),
  startedAt: integer("startedAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type FrequencySession = typeof frequencySessions.$inferSelect;
export type InsertFrequencySession = typeof frequencySessions.$inferInsert;

/* =========================================================================
 * v2 — DESAFIO 30 DIAS (Códice). Protocolo individual e intransferível.
 * Chave por e-mail (consistente c/ auth). Gerado pelo protocol-engine.
 * ========================================================================= */

/** Protocolo de 30 dias selado para um usuário (1 por e-mail). */
export const userProtocol = sqliteTable("user_protocol", {
  /** E-mail do dono — chave primária (1 protocolo por pessoa). */
  email: text("email").primaryKey(),
  /** Selo curto determinístico (ex "#A7F"). */
  seal: text("seal").notNull(),
  /** Corrente dominante ('corpo' | 'mente' | 'espirito'). */
  dominantChain: text("dominantChain").notNull(),
  /** Respostas do quiz (JSON serializado). */
  answersJson: text("answersJson").notNull(),
  /** Protocolo completo (JSON serializado — seal, days, diagnosisText...). */
  protocolJson: text("protocolJson").notNull(),
  /** Data de selagem (ISO string). */
  createdAt: text("createdAt").notNull(),
});

export type UserProtocol = typeof userProtocol.$inferSelect;
export type InsertUserProtocol = typeof userProtocol.$inferInsert;

/** Vendas recebidas via webhook Kirvano (análise de conversão). */
export const sales = sqliteTable("sales", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  saleId: text("saleId"),
  event: text("event").notNull(),
  status: text("status"),
  customerEmail: text("customerEmail"),
  customerName: text("customerName"),
  customerPhone: text("customerPhone"),
  productName: text("productName"),
  paymentMethod: text("paymentMethod"),
  totalPrice: text("totalPrice"),
  bumps: text("bumps"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type Sale = typeof sales.$inferSelect;
export type InsertSale = typeof sales.$inferInsert;

/** Visitas às páginas de venda (conversão). */
export const pageviews = sqliteTable("pageviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  page: text("page").notNull(),
  visitorId: text("visitorId"),
  ref: text("ref"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type Pageview = typeof pageviews.$inferSelect;
export type InsertPageview = typeof pageviews.$inferInsert;

