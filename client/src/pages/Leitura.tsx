import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  JOURNEY_ID,
  getCodiceDay,
  chaveInfo,
} from "@shared/journey-codice";

/**
 * Tela de LEITURA do dia: capítulo, título, barra de áudio (visual, sem áudio
 * real por enquanto), texto com capitular, e botão "Concluir o dia X".
 * Concluir salva no backend (completeDay) e leva para a tela "feito".
 */
export default function Leitura() {
  const params = useParams<{ dia: string }>();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState<string | null>(null);

  const dia = Math.min(Math.max(parseInt(params.dia || "1", 10) || 1, 1), 30);
  const day = getCodiceDay(dia);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      setLocation("/");
      return;
    }
    setEmail(userEmail);
  }, [setLocation]);

  const utils = trpc.useUtils();
  const completeMutation = trpc.progress.completeDay.useMutation({
    onSuccess: () => {
      utils.progress.get.invalidate();
      utils.progress.stats.invalidate();
      setLocation(`/feito/${dia}`);
    },
  });

  const handleComplete = () => {
    if (!email) return;
    completeMutation.mutate({
      email,
      journeyId: JOURNEY_ID,
      day: dia,
      // Reaproveita o campo frequencyId do motor para registrar a chave do dia.
      frequencyId: day.chave,
    });
  };

  // Capitular: primeira letra vira drop cap.
  const first = day.leitura.charAt(0);
  const rest = day.leitura.slice(1);

  return (
    <div className="cdc-phone">
      <section className="cdc-screen">
        <button className="cdc-back" onClick={() => setLocation("/hoje")}>
          ‹ voltar
        </button>
        <div className="cdc-chapnum">
          Dia {dia} · {chaveInfo[day.chave].icone} {chaveInfo[day.chave].nome}
        </div>
        <div className="cdc-chaptitle">{day.missaoTitulo}</div>

        <div className="cdc-audiobar">
          <div className="pl">▶</div>
          <div className="pr">
            <i />
          </div>
          <small>áudio em breve</small>
        </div>

        <div className="cdc-read">
          <p>
            <span className="drop">{first}</span>
            {rest}
          </p>
        </div>

        <button
          className="cdc-btn"
          style={{ margin: "6px 0 22px" }}
          onClick={handleComplete}
          disabled={completeMutation.isPending}
        >
          {completeMutation.isPending ? "Selando..." : `✓ Concluir o dia ${dia}`}
        </button>
      </section>
    </div>
  );
}
