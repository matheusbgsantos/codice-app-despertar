/**
 * Modo Teste / Admin — helpers compartilhados (client + server).
 *
 * Um e-mail é admin se:
 *  - estiver na lista hardcoded abaixo, OU
 *  - estiver na env ADMIN_EMAILS (separada por vírgula) — só no servidor.
 *
 * O modo teste no CLIENTE também pode ser ligado pela flag localStorage
 * 'cdc_admin' = '1' (ativável via ?admin=1 na URL). Ver client/src/lib/admin.ts.
 */

// Hardcoded — troque/adicione o e-mail real do Matheus aqui.
export const HARDCODED_ADMIN_EMAILS = [
  "matheus@codice.app",
  "admin@codice.app",
  "ver@codice.app",
  "teste@codice.app",
];

function envAdminEmails(): string[] {
  try {
    const raw =
      typeof process !== "undefined" && process?.env
        ? process.env.ADMIN_EMAILS
        : undefined;
    if (!raw) return [];
    return raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  } catch {
    return [];
  }
}

/** Verdadeiro se o e-mail estiver na lista de admins (hardcoded ou env). */
export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const e = email.toLowerCase().trim();
  return HARDCODED_ADMIN_EMAILS.includes(e) || envAdminEmails().includes(e);
}
