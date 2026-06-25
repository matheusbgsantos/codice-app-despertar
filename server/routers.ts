import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { isAdminEmail } from "@shared/admin";
import { 
  isEmailAuthorized, 
  getAuthorizedEmail, 
  addAuthorizedEmail, 
  deactivateEmail, 
  activateEmail,
  deleteAuthorizedEmail,
  listAuthorizedEmails,
  listWebhookLogs,
  registerVisitor,
  listVisitors,
  getProgress,
  startJourney,
  completeDay,
  logSession,
  getStats,
  getUserProtocol,
  createUserProtocol,
  PROTOCOL_JOURNEY_ID,
} from "./db";
import { buildProtocol, type QuizAnswers, type Protocol } from "@shared/protocol-engine";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Verifica se o email está autorizado (comprou o produto)
  visitors: router({
    verifyEmail: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        // Verifica se o email existe na tabela de emails autorizados
        const isAuthorized = await isEmailAuthorized(input.email);
        
        if (isAuthorized) {
          // Também registra como visitante
          await registerVisitor(input.email);
          return { authorized: true };
        }
        
        return { authorized: false };
      }),
  }),

  // Acesso livre - salva email no banco e permite entrada
  access: router({
    // Registra email e permite acesso (acesso livre)
    checkEmail: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        // Salva o email no banco de dados (tabela visitors)
        await registerVisitor(input.email);
        
        // Sempre autoriza o acesso
        return {
          authorized: true,
          name: null,
          productName: null,
        };
      }),
  }),

  // Painel administrativo - apenas para admins
  admin: router({
    // Lista todos os emails autorizados (compradores)
    listEmails: adminProcedure.query(async () => {
      const emails = await listAuthorizedEmails();
      return emails;
    }),

    // Lista todos os visitantes/leads
    listVisitors: adminProcedure.query(async () => {
      const visitors = await listVisitors();
      return visitors;
    }),

    // Adiciona um email manualmente
    addEmail: adminProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string().optional(),
        productName: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await addAuthorizedEmail({
          email: input.email,
          name: input.name || null,
          productName: input.productName || null,
          addedBy: 'manual',
          isActive: true,
        });
        return { success: true };
      }),

    // Desativa um email
    deactivateEmail: adminProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        await deactivateEmail(input.email);
        return { success: true };
      }),

    // Reativa um email
    activateEmail: adminProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        await activateEmail(input.email);
        return { success: true };
      }),

    // Deleta um email permanentemente
    deleteEmail: adminProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        await deleteAuthorizedEmail(input.email);
        return { success: true };
      }),

    // Lista logs de webhook
    listWebhookLogs: adminProcedure
      .input(z.object({ limit: z.number().optional().default(50) }))
      .query(async ({ input }) => {
        const logs = await listWebhookLogs(input.limit);
        return logs;
      }),
  }),

  // Progresso do usuário — jornadas, streak, sessões, stats (Épico 4)
  progress: router({
    // Estado atual (trilha ativa, dia, streak)
    get: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .query(async ({ input }) => {
        return await getProgress(input.email);
      }),

    // Inicia (ou troca) uma jornada
    startJourney: publicProcedure
      .input(z.object({ email: z.string().email(), journeyId: z.string() }))
      .mutation(async ({ input }) => {
        return await startJourney(input.email, input.journeyId);
      }),

    // Conclui o dia atual da jornada (recalcula streak no servidor)
    completeDay: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          journeyId: z.string(),
          day: z.number().int().min(1).max(30),
          frequencyId: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        return await completeDay(
          input.email,
          input.journeyId,
          input.day,
          input.frequencyId,
        );
      }),

    // Telemetria de sessão de áudio
    logSession: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          frequencyId: z.string(),
          mode: z.enum(["ambiente", "puro"]),
          durationSeconds: z.number().min(0).default(0),
        }),
      )
      .mutation(async ({ input }) => {
        await logSession(
          input.email,
          input.frequencyId,
          input.mode,
          input.durationSeconds,
        );
        return { success: true };
      }),

    // Estatísticas agregadas
    stats: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .query(async ({ input }) => {
        return await getStats(input.email);
      }),
  }),

  // Protocolo personalizado de 30 dias (Épico 3 — Códice v2).
  // Isolamento total por e-mail: toda operação filtra pelo e-mail do input.
  protocol: router({
    // Retorna o protocolo selado do e-mail (parseado) ou null.
    get: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .query(async ({ input }) => {
        const row = await getUserProtocol(input.email);
        if (!row) return null;
        return {
          email: row.email,
          seal: row.seal,
          dominantChain: row.dominantChain,
          createdAt: row.createdAt,
          protocol: JSON.parse(row.protocolJson) as Protocol,
          answers: JSON.parse(row.answersJson) as QuizAnswers,
        };
      }),

    // Cria (sela) o protocolo. IDEMPOTENTE: se já existe, devolve o existente.
    create: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          answers: z.object({
            q1: z.number().int(),
            q2: z.number().int(),
            q3: z.number().int(),
            q4: z.number().int(),
            q5: z.array(z.number().int()),
            q6: z.number().int(),
            q7: z.number().int(),
          }),
        }),
      )
      .mutation(async ({ input }) => {
        const answers = input.answers as QuizAnswers;
        const protocol = buildProtocol(answers);
        const { row, created } = await createUserProtocol({
          email: input.email,
          seal: protocol.seal,
          dominantChain: protocol.dominantChain,
          answersJson: JSON.stringify(answers),
          protocolJson: JSON.stringify(protocol),
          createdAt: new Date().toISOString(),
        });
        return {
          created,
          email: row.email,
          seal: row.seal,
          dominantChain: row.dominantChain,
          createdAt: row.createdAt,
          protocol: JSON.parse(row.protocolJson) as Protocol,
        };
      }),

    // Marca um dia cumprido (reaproveita o motor de progresso/streak).
    completeDay: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          day: z.number().int().min(1).max(30),
          // MODO TESTE (admin): só tem efeito se o email for admin.
          testMode: z.boolean().optional(),
        }),
      )
      .mutation(async ({ input }) => {
        // frequencyId = id do hábito do dia (snapshot do protocolo), p/ rastro.
        const row = await getUserProtocol(input.email);
        let habitId = "protocolo";
        if (row) {
          const protocol = JSON.parse(row.protocolJson) as Protocol;
          habitId = protocol.days[input.day - 1]?.habitId ?? "protocolo";
        }
        // Só ignora a trava de data se for testMode E o e-mail for admin.
        const bypass = input.testMode === true && isAdminEmail(input.email);
        const progress = await completeDay(
          input.email,
          PROTOCOL_JOURNEY_ID,
          input.day,
          habitId,
          bypass,
        );
        return {
          currentDay: progress?.currentDay ?? 1,
          streak: progress?.streakCount ?? 0,
          lastSessionDate: progress?.lastSessionDate ?? null,
        };
      }),

    // MODO TESTE (admin) — avança o dia atual IGNORANDO a trava de 1/dia.
    // Autoriza por email admin OU por testMode=true (flag local do client).
    // Não afeta o fluxo normal do cliente (procedure separada).
    advanceDay: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          // permite o atalho da flag localStorage 'cdc_admin' do client
          testMode: z.boolean().optional(),
        }),
      )
      .mutation(async ({ input }) => {
        if (!isAdminEmail(input.email) && input.testMode !== true) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Modo teste indisponível.",
          });
        }
        const progress = await getProgress(input.email);
        const day = Math.min(progress?.currentDay ?? 1, 30);
        const row = await getUserProtocol(input.email);
        let habitId = "protocolo";
        if (row) {
          const protocol = JSON.parse(row.protocolJson) as Protocol;
          habitId = protocol.days[day - 1]?.habitId ?? "protocolo";
        }
        const updated = await completeDay(
          input.email,
          PROTOCOL_JOURNEY_ID,
          day,
          habitId,
          true, // bypass da trava de data
        );
        return {
          currentDay: updated?.currentDay ?? 1,
          streak: updated?.streakCount ?? 0,
          lastSessionDate: updated?.lastSessionDate ?? null,
        };
      }),

    // MODO TESTE (admin) — reinicia o protocolo (volta pro dia 1).
    resetProtocol: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          testMode: z.boolean().optional(),
        }),
      )
      .mutation(async ({ input }) => {
        if (!isAdminEmail(input.email) && input.testMode !== true) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Modo teste indisponível.",
          });
        }
        const progress = await startJourney(input.email, PROTOCOL_JOURNEY_ID);
        return {
          currentDay: progress?.currentDay ?? 1,
          streak: progress?.streakCount ?? 0,
        };
      }),

    // Estatísticas do desafio: dia atual, streak, total, pct.
    stats: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .query(async ({ input }) => {
        const progress = await getProgress(input.email);
        const totalDays = 30;
        const currentDay = progress?.currentDay ?? 1;
        const streak = progress?.streakCount ?? 0;
        const todayYmd = new Date().toISOString().slice(0, 10);
        const completedToday = progress?.lastSessionDate === todayYmd;
        return {
          currentDay,
          streak,
          totalDays,
          pct: Math.round((Math.min(currentDay - 1, totalDays) / totalDays) * 100),
          completedToday,
          lastSessionDate: progress?.lastSessionDate ?? null,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
