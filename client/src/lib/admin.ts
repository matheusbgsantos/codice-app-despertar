/**
 * Modo Teste / Admin no CLIENTE.
 *
 * O modo teste fica ATIVO se qualquer um destes for verdadeiro:
 *  1. localStorage 'cdc_admin' === '1'  (atalho do Matheus)
 *  2. o e-mail logado está na lista de admins (shared/admin.ts)
 *
 * BÔNUS: a query param ?admin=1 na URL liga a flag automaticamente.
 * Ex.: http://192.168.0.3:3000/hoje?admin=1
 *
 * Usuário normal nunca vê nada disso.
 */
import { isAdminEmail } from "@shared/admin";

const FLAG_KEY = "cdc_admin";

/**
 * Lê ?admin=1 / ?admin=0 da URL e persiste em localStorage.
 * Chame uma vez no boot da tela (useEffect).
 */
export function syncAdminFlagFromUrl(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("admin")) return;
    const v = params.get("admin");
    if (v === "0" || v === "false") {
      localStorage.removeItem(FLAG_KEY);
    } else {
      localStorage.setItem(FLAG_KEY, "1");
    }
  } catch {
    /* noop */
  }
}

/** Flag localStorage 'cdc_admin' === '1'. */
export function hasAdminFlag(): boolean {
  try {
    return localStorage.getItem(FLAG_KEY) === "1";
  } catch {
    return false;
  }
}

/** Modo teste ativo: flag local OU e-mail admin. */
export function isTestMode(email?: string | null): boolean {
  return hasAdminFlag() || isAdminEmail(email);
}
