import { useEffect } from "react";
import { useLocation } from "wouter";
import { provas } from "@shared/provas-codice";

/**
 * Aba PROVAS — dossiês desclassificados (acervo do Códice).
 */
export default function Provas() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("userEmail")) setLocation("/");
  }, [setLocation]);

  return (
    <div className="cdc-phone">
      <section className="cdc-screen">
        <div className="cdc-brand">
          <div className="cdc-logo">
            O ACERVO <span>/ provas</span>
          </div>
          <div className="cdc-eye">🗝</div>
        </div>
        <div className="cdc-kicker">Dossiês desclassificados</div>
        <div className="cdc-h" style={{ marginBottom: 16 }}>
          As provas <span className="g">que cruzam.</span>
        </div>

        {provas.map((p, i) => (
          <div
            className="cdc-prova"
            key={i}
            style={p.bloqueado ? { opacity: 0.5 } : undefined}
          >
            <div className="ic">{p.icone}</div>
            <div>
              <b>{p.titulo}</b>
              <small>{p.subtitulo}</small>
            </div>
            <div className="lock">{p.bloqueado ? "🔒" : "↗"}</div>
          </div>
        ))}

        <div className="cdc-note">
          As provas viram o conteúdo que alimenta os Sinais.
        </div>
      </section>
    </div>
  );
}
