import { useLocation } from "wouter";

/**
 * Tabbar inferior do Códice v2 — enxuta: Hoje · Provas.
 * Sinais fica oculto pra v3. Some no login e no fluxo focado (quiz/porquê/selar).
 */
export function TabBar() {
  const [location, setLocation] = useLocation();

  // Não exibe na tela de login nem no fluxo focado (quiz / leitura / selar).
  if (
    location === "/" ||
    location.startsWith("/quiz") ||
    location.startsWith("/porque") ||
    location.startsWith("/selar") ||
    location.startsWith("/leitura") ||
    location.startsWith("/feito")
  ) {
    return null;
  }

  const tabs = [
    { key: "hoje", label: "Hoje", icon: "🗓️", to: "/hoje" },
    { key: "provas", label: "Provas", icon: "🗝️", to: "/provas" },
  ];

  return (
    <nav className="cdc-tabs">
      {tabs.map(({ key, label, icon, to }) => {
        const active =
          location === to || (to === "/hoje" && location === "/");
        return (
          <button
            key={key}
            className={`cdc-tab${active ? " active" : ""}`}
            onClick={() => setLocation(to)}
            aria-label={label}
          >
            <span className="ic">{icon}</span>
            {label}
          </button>
        );
      })}
    </nav>
  );
}
