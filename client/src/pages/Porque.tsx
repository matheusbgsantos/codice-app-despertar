import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { getHabit } from "@shared/habits";

function Embers() {
  return (
    <div className="cdc-embers" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <span className="cdc-ember" key={i} />
      ))}
    </div>
  );
}

/** Tela "POR QUE ISSO TE LIBERTA" — o porquê (neurociência) do hábito do dia. */
export default function Porque() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/porque/:day");
  const [email, setEmail] = useState<string | null>(null);
  const [showReading, setShowReading] = useState(false);

  const day = Math.max(1, Math.min(30, parseInt(params?.day ?? "1", 10) || 1));

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      setLocation("/");
      return;
    }
    setEmail(userEmail);
  }, [setLocation]);

  const protocolQuery = trpc.protocol.get.useQuery(
    { email: email ?? "" },
    { enabled: !!email },
  );

  const protocol = protocolQuery.data?.protocol;
  const plan = protocol?.days[day - 1];
  const habit = plan ? getHabit(plan.habitId) : undefined;

  if (protocolQuery.isLoading || !habit) {
    return (
      <div className="cdc-v2">
        <Embers />
        <section className="cdc-screen" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p className="cdc-scan">&gt; abrindo o arquivo...</p>
        </section>
      </div>
    );
  }

  return (
    <div className="cdc-v2">
      <Embers />
      <section className="cdc-screen" style={{ minHeight: "100vh", padding: "30px 22px 40px" }}>
        <button
          className="cdc-action cdc-action--ghost"
          style={{ width: "auto", padding: "8px 16px", marginBottom: 26 }}
          onClick={() => setLocation("/hoje")}
        >
          ← Voltar
        </button>

        <div className="cdc-eyebrow">Dia {day} · {plan?.phase}</div>
        <h1 className="cdc-title" style={{ fontSize: "clamp(26px,7.5vw,38px)", margin: "8px 0 10px" }}>
          {habit.name}
        </h1>
        <p className="cdc-body" style={{ fontSize: 16, marginBottom: 24 }}>
          {habit.action}
        </p>

        <hr className="cdc-divider cdc-divider--gold" />

        <div className="cdc-eyebrow g" style={{ color: "var(--cdc-gold)", marginBottom: 12 }}>
          Por que isso te liberta
        </div>
        <p className="cdc-body" style={{ fontSize: 17, lineHeight: 1.8 }}>
          {habit.why}
        </p>

        {habit.support && (
          <div style={{ marginTop: 26 }}>
            <button
              className="cdc-archive-btn"
              onClick={() => setShowReading((s) => !s)}
            >
              {showReading ? "− Fechar leitura de apoio" : "+ Leitura de apoio"}
            </button>
            {showReading && (
              <div className="cdc-panel-v2" style={{ marginTop: 4 }}>
                <div className="cdc-eyebrow" style={{ marginBottom: 10 }}>
                  Leitura de apoio · o capítulo de hoje
                </div>
                <p
                  className="cdc-body"
                  style={{
                    fontFamily: "'PT Serif', serif",
                    fontSize: 16,
                    lineHeight: 1.85,
                  }}
                >
                  {habit.support}
                </p>
              </div>
            )}
          </div>
        )}

        <button
          className="cdc-action"
          style={{ marginTop: 30 }}
          onClick={() => setLocation("/hoje")}
        >
          Voltar ao mapa
        </button>
      </section>
    </div>
  );
}
