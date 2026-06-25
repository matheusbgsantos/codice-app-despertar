import { useEffect, useRef, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { trpc } from "@/lib/trpc";

function Embers() {
  return (
    <div className="cdc-embers" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <span className="cdc-ember" key={i} />
      ))}
    </div>
  );
}

type Stage = "sealing" | "sealed";

/**
 * Tela SELAR — carimba o dia (protocol.completeDay) e mostra a confirmação.
 * Animação de brasa/carimbo, depois "DIA X — SELADO".
 */
export default function Selar() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/selar/:day");
  const [email, setEmail] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("sealing");
  const completeMutation = trpc.protocol.completeDay.useMutation();
  const utils = trpc.useUtils();
  const firedRef = useRef(false);

  const day = Math.max(1, Math.min(30, parseInt(params?.day ?? "1", 10) || 1));

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      setLocation("/");
      return;
    }
    setEmail(userEmail);
  }, [setLocation]);

  useEffect(() => {
    if (!email) return;
    if (firedRef.current) return;
    firedRef.current = true;

    completeMutation.mutate(
      { email, day },
      {
        onSuccess: () => {
          utils.protocol.get.invalidate();
          utils.protocol.stats.invalidate();
        },
      },
    );

    const t = setTimeout(() => setStage("sealed"), 1600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const streak = completeMutation.data?.streak ?? 0;
  const nextDay = Math.min(day + 1, 30);

  if (stage === "sealing") {
    return (
      <div className="cdc-v2">
        <Embers />
        <section className="cdc-screen" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
          <div className="cdc-seal cdc-seal--pulse" style={{ width: 88, height: 88, fontSize: 42 }}>
            𓂀
          </div>
          <p className="cdc-scan">&gt; carimbando o dia {day}...</p>
        </section>
      </div>
    );
  }

  return (
    <div className="cdc-v2">
      <Embers />
      <section className="cdc-screen" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, padding: "48px 22px", textAlign: "center" }}>
        <div className="cdc-seal" style={{ width: 88, height: 88, fontSize: 42, borderColor: "var(--cdc-gold)" }}>
          𓂀
        </div>
        <h1 className="cdc-title">
          DIA {day} — <span className="g">SELADO.</span>
        </h1>
        <div style={{ color: "var(--cdc-gold2)", fontFamily: "'PT Serif', serif", fontSize: 16 }}>
          🔥 <b>{streak} dia{streak === 1 ? "" : "s"} de pé.</b>
        </div>
        <p className="cdc-body" style={{ fontSize: 16 }}>
          {day >= 30
            ? "Você atravessou os 30 dias. O protocolo cumpriu. Agora a corrente é tua."
            : "Carimbado. Não foi confortável — foi livre."}
        </p>
        {day < 30 && (
          <div className="cdc-panel-v2" style={{ width: "100%" }}>
            <p className="cdc-eyebrow">
              Volte amanhã — o dia {nextDay} abre à meia-noite.
            </p>
          </div>
        )}
        <button className="cdc-action" onClick={() => setLocation("/hoje")}>
          Voltar ao mapa
        </button>
      </section>
    </div>
  );
}
