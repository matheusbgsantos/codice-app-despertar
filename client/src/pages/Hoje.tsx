import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { ProgressRing } from "@/components/ProgressRing";
import { getHabit } from "@shared/habits";
import { syncAdminFlagFromUrl, isTestMode } from "@/lib/admin";

/** Brasa de fundo (12 partículas determinísticas). */
function Embers() {
  return (
    <div className="cdc-embers" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <span className="cdc-ember" key={i} />
      ))}
    </div>
  );
}

const TOTAL = 30;

/**
 * Tela HOJE — coração do desafio. Lê protocol.get + protocol.stats por e-mail.
 * Hábito do dia em destaque, manutenção empilhada, anel/streak, selar o dia.
 */
export default function Hoje() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState<string | null>(null);
  const [showReading, setShowReading] = useState(false);
  // Modo teste (admin). Liga via ?admin=1 / flag localStorage / email admin.
  const [testMode, setTestMode] = useState(false);
  const utils = trpc.useUtils();

  useEffect(() => {
    syncAdminFlagFromUrl();
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      setLocation("/");
      return;
    }
    setEmail(userEmail);
    setTestMode(isTestMode(userEmail));
  }, [setLocation]);

  const advanceMutation = trpc.protocol.advanceDay.useMutation({
    onSuccess: () => {
      utils.protocol.get.invalidate();
      utils.protocol.stats.invalidate();
    },
  });
  const resetMutation = trpc.protocol.resetProtocol.useMutation({
    onSuccess: () => {
      utils.protocol.get.invalidate();
      utils.protocol.stats.invalidate();
    },
  });

  const protocolQuery = trpc.protocol.get.useQuery(
    { email: email ?? "" },
    { enabled: !!email },
  );
  const statsQuery = trpc.protocol.stats.useQuery(
    { email: email ?? "" },
    { enabled: !!email },
  );

  // Gate: sem protocolo → manda pro quiz.
  useEffect(() => {
    if (!email) return;
    if (protocolQuery.isLoading) return;
    if (protocolQuery.data === null) {
      setLocation("/quiz");
    }
  }, [email, protocolQuery.isLoading, protocolQuery.data, setLocation]);

  const protocol = protocolQuery.data?.protocol;
  const seal = protocolQuery.data?.seal ?? protocol?.seal ?? "";
  const stats = statsQuery.data;
  const currentDay = Math.min(stats?.currentDay ?? 1, TOTAL);
  const streak = stats?.streak ?? 0;
  const completedToday = stats?.completedToday ?? false;
  // Ao selar, o servidor já avança currentDay; logo o dia recém-selado é o anterior
  // (no dia 30 não há avanço, então o selado é o próprio currentDay).
  const sealedDay = currentDay >= TOTAL ? TOTAL : Math.max(1, currentDay - 1);

  const todayPlan = protocol?.days[currentDay - 1];
  const todayHabit = todayPlan ? getHabit(todayPlan.habitId) : undefined;

  // Manutenção: hábitos dos dias 1..currentDay-1, deduplicados por id.
  const maintenance = useMemo(() => {
    if (!protocol) return [];
    const seen = new Set<string>();
    const out: { day: number; id: string; name: string }[] = [];
    for (let d = 1; d < currentDay; d++) {
      const plan = protocol.days[d - 1];
      if (!plan) continue;
      if (seen.has(plan.habitId)) continue;
      seen.add(plan.habitId);
      const h = getHabit(plan.habitId);
      if (h) out.push({ day: d, id: plan.habitId, name: h.name });
    }
    return out;
  }, [protocol, currentDay]);

  if (protocolQuery.isLoading || !protocol || !todayHabit) {
    return (
      <div className="cdc-v2">
        <Embers />
        <section className="cdc-screen" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div className="cdc-seal cdc-seal--pulse" style={{ width: 56, height: 56, fontSize: 26, margin: "0 auto" }}>𓂀</div>
            <p className="cdc-scan" style={{ marginTop: 16 }}>&gt; abrindo teu protocolo...</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="cdc-v2">
      <Embers />
      <section className="cdc-screen" style={{ minHeight: "100vh", padding: "26px 20px 110px" }}>
        {/* Brand + selo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div className="cdc-eyebrow" style={{ fontSize: 13, letterSpacing: "0.28em" }}>O CÓDICE</div>
          <div className="cdc-numeral" style={{ fontSize: 13, border: "1px solid var(--cdc-line)", padding: "3px 9px" }}>
            {seal}
          </div>
        </div>

        {/* Anel + fase + streak */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <ProgressRing current={currentDay} total={TOTAL} />
        </div>
        <div className="cdc-eyebrow" style={{ textAlign: "center" }}>
          {todayPlan?.phase ?? ""}
        </div>
        <div style={{ textAlign: "center", marginTop: 10, marginBottom: 24, color: "var(--cdc-gold2)", fontFamily: "'PT Serif', serif", fontSize: 14 }}>
          🔥 <b>{streak} dia{streak === 1 ? "" : "s"} de pé.</b>{" "}
          <span style={{ color: "var(--cdc-dim)" }}>
            {streak >= 3 ? "Continua firme." : "A maioria parou no 3."}
          </span>
        </div>

        {/* Hábito de hoje — destaque */}
        <div className="cdc-panel-v2 cdc-panel-v2--accent" style={{ marginBottom: 20 }}>
          <div className="cdc-eyebrow" style={{ color: "var(--cdc-gold)" }}>
            Hábito de hoje · Dia {currentDay}
          </div>
          <h2 className="cdc-title" style={{ fontSize: "clamp(22px,6.5vw,32px)", margin: "8px 0 12px" }}>
            {todayHabit.name}
          </h2>
          <p className="cdc-body" style={{ fontSize: 16, marginBottom: 18 }}>
            {todayHabit.action}
          </p>

          {/* Seu primeiro passo — instrução detalhada em destaque */}
          {todayHabit.firstStep && (
            <div
              style={{
                borderLeft: "2px solid var(--cdc-gold)",
                background: "rgba(0,0,0,0.35)",
                padding: "14px 16px",
                marginBottom: 18,
              }}
            >
              <div
                className="cdc-eyebrow"
                style={{ color: "var(--cdc-gold)", marginBottom: 8 }}
              >
                Seu primeiro passo
              </div>
              <p
                className="cdc-body"
                style={{
                  fontFamily: "'PT Serif', serif",
                  fontSize: 17,
                  lineHeight: 1.75,
                  color: "var(--cdc-txt)",
                }}
              >
                {todayHabit.firstStep}
              </p>
            </div>
          )}

          {/* Ações: porquê + leitura de apoio (tudo dentro do app) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              className="cdc-action cdc-action--ghost"
              onClick={() => setLocation(`/porque/${currentDay}`)}
            >
              Por que isso te liberta
            </button>
            {todayHabit.support && (
              <button
                className="cdc-action cdc-action--ghost"
                onClick={() => setShowReading((s) => !s)}
              >
                {showReading ? "− Fechar leitura de apoio" : "Leitura de apoio"}
              </button>
            )}
          </div>

          {/* Leitura de apoio EMBUTIDA — o capítulo do dia, dentro do app */}
          {todayHabit.support && showReading && (
            <div
              className="cdc-panel-v2"
              style={{
                marginTop: 14,
                background: "rgba(0,0,0,0.4)",
              }}
            >
              <div className="cdc-eyebrow" style={{ marginBottom: 10 }}>
                Leitura de apoio · o capítulo de hoje
              </div>
              <p
                className="cdc-body"
                style={{
                  fontFamily: "'PT Serif', serif",
                  fontSize: 16,
                  lineHeight: 1.85,
                  color: "var(--cdc-txt)",
                }}
              >
                {todayHabit.support}
              </p>
            </div>
          )}
        </div>

        {/* Manutenção empilhada */}
        {maintenance.length > 0 && (
          <div style={{ marginBottom: 22 }}>
            <div className="cdc-eyebrow" style={{ marginBottom: 12 }}>
              Manutenção · o que você já não larga
            </div>
            {maintenance.map((m) => (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "11px 0",
                  borderBottom: "1px solid var(--cdc-line)",
                }}
              >
                <span style={{ color: "var(--cdc-gold2)", fontSize: 15 }}>✓</span>
                <span className="cdc-body" style={{ fontSize: 15, color: "var(--cdc-txt)" }}>
                  {m.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Selar o dia */}
        <button
          className="cdc-action"
          disabled={completedToday}
          onClick={() => setLocation(`/selar/${currentDay}`)}
          style={{ marginBottom: 26 }}
        >
          {completedToday ? `✓ Dia ${sealedDay} já selado hoje` : `✓ Selar o dia ${currentDay}`}
        </button>

        {/* Timeline 30 dots */}
        <div className="cdc-eyebrow" style={{ marginBottom: 12 }}>Tua travessia</div>
        <div className="cdc-tl">
          {Array.from({ length: TOTAL }, (_, i) => i + 1).map((d) => {
            const cls = d < currentDay ? "done" : d === currentDay ? "now" : "";
            return (
              <div className={`cdc-dot ${cls}`.trim()} key={d}>
                {d}
              </div>
            );
          })}
        </div>

        <hr className="cdc-divider" />
        <p className="cdc-eyebrow" style={{ textAlign: "center" }}>
          Um hábito por dia. Trinta dias para atravessar.
        </p>

        {/* MODO TESTE (admin) — discreto, invisível para o cliente normal. */}
        {testMode && (
          <div
            style={{
              marginTop: 22,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              opacity: 0.55,
            }}
          >
            <div
              style={{ display: "flex", gap: 14, justifyContent: "center" }}
            >
              <button
                onClick={() => {
                  if (!email || advanceMutation.isPending) return;
                  advanceMutation.mutate({ email, testMode: true });
                }}
                disabled={advanceMutation.isPending || currentDay >= TOTAL}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--cdc-dim)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {advanceMutation.isPending
                  ? "» avançando..."
                  : "» avançar dia (teste)"}
              </button>
              <button
                onClick={() => {
                  if (!email || resetMutation.isPending) return;
                  if (window.confirm("Reiniciar protocolo (modo teste)?")) {
                    resetMutation.mutate({ email, testMode: true });
                  }
                }}
                disabled={resetMutation.isPending}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--cdc-dim)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                reiniciar (teste)
              </button>
            </div>
            <span style={{ fontSize: 10, color: "var(--cdc-dim)" }}>
              modo teste ativo · dia {currentDay}/{TOTAL}
            </span>
          </div>
        )}
      </section>
    </div>
  );
}
