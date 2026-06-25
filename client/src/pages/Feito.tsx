import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { trpc } from "@/lib/trpc";

/**
 * Tela de "feito" — confirmação do dia selado, com 𓂀, streak e botão voltar.
 */
export default function Feito() {
  const params = useParams<{ dia: string }>();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState<string | null>(null);

  const dia = Math.min(Math.max(parseInt(params.dia || "1", 10) || 1, 1), 30);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      setLocation("/");
      return;
    }
    setEmail(userEmail);
  }, [setLocation]);

  const progressQuery = trpc.progress.get.useQuery(
    { email: email ?? "" },
    { enabled: !!email },
  );
  const streak = progressQuery.data?.streakCount ?? 0;
  const proximo = Math.min(dia + 1, 30);

  return (
    <div className="cdc-phone">
      <section className="cdc-screen">
        <div style={{ textAlign: "center", padding: "60px 0 30px" }}>
          <div style={{ fontSize: 64, marginBottom: 14 }}>𓂀</div>
          <div className="cdc-phase" style={{ fontSize: 13 }}>
            Dia {dia} — selado
          </div>
          <div className="cdc-h" style={{ fontSize: 30, margin: "8px 0" }}>
            Mais uma
            <br />
            <span className="g">corrente caiu.</span>
          </div>
          <p
            style={{
              maxWidth: 300,
              margin: "10px auto 26px",
              color: "var(--cdc-txt)",
            }}
          >
            Streak:{" "}
            <b style={{ color: "var(--cdc-gold2)" }}>
              {streak} dia{streak === 1 ? "" : "s"}
            </b>
            . Volte amanhã — o dia {proximo} abre à meia-noite.
          </p>
          <button
            className="cdc-btn"
            style={{ maxWidth: 280, margin: "0 auto" }}
            onClick={() => setLocation("/hoje")}
          >
            Voltar ao mapa
          </button>
        </div>
      </section>
    </div>
  );
}
