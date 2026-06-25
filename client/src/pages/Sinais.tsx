import { useEffect } from "react";
import { useLocation } from "wouter";
import { sinais } from "@shared/sinais-codice";

/**
 * Aba SINAIS — transmissões (notícias decodificadas no tom do Códice).
 * Conteúdo seed estático; automação de notícia diária vem depois.
 */
export default function Sinais() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("userEmail")) setLocation("/");
  }, [setLocation]);

  return (
    <div className="cdc-phone">
      <section className="cdc-screen">
        <div className="cdc-brand">
          <div className="cdc-logo">
            SINAIS <span>/ transmissões</span>
          </div>
          <div className="cdc-eye">📡</div>
        </div>
        <div className="cdc-kicker">Decodificado · transmissões recentes</div>
        <div className="cdc-h" style={{ marginBottom: 16 }}>
          O sinal <span className="g">do dia.</span>
        </div>

        {sinais.map((s) => (
          <div className="cdc-signal" key={s.numero}>
            <div className="meta">
              ⚠ Transmissão #{s.numero} <span>{s.tempo}</span>
            </div>
            <h4>{s.titulo}</h4>
            <p>{s.texto}</p>
            <div className="react">
              <span>
                👁 <b>{s.viram.toLocaleString("pt-BR")}</b> viram
              </span>
              <span>
                🔥 <b>{s.despertos.toLocaleString("pt-BR")}</b> despertos
              </span>
            </div>
          </div>
        ))}

        <div className="cdc-note">
          Um sinal novo todo dia — é o que te traz de volta.
        </div>
      </section>
    </div>
  );
}
