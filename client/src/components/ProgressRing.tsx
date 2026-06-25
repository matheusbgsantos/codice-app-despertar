/**
 * Anel de progresso circular (SVG) do Códice — "Dia X · de 30".
 * Reproduz o anel do protótipo (raio 84, stroke dourado, dasharray 527).
 */
export function ProgressRing({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const size = 188;
  const r = 84;
  const circumference = 2 * Math.PI * r; // ~527
  const pct = total > 0 ? Math.min(1, current / total) : 0;
  const offset = circumference - pct * circumference;

  return (
    <div className="cdc-ring">
      <svg width={size} height={size} viewBox="0 0 188 188">
        <circle cx="94" cy="94" r={r} fill="none" stroke="#241d12" strokeWidth="8" />
        <circle
          cx="94"
          cy="94"
          r={r}
          fill="none"
          stroke="#d4a93f"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <div className="num">
        <b>{current}</b>
        <small>Dia · de {total}</small>
      </div>
    </div>
  );
}
