import { useEffect, useState } from "react";
import { useLocation } from "wouter";

/**
 * O PORTÃO — login por email (localStorage userEmail).
 * Visual dossiê/despertar do Códice.
 */
export default function Home() {
  const [, setLocation] = useLocation();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setLocation("/hoje");
    } else {
      setIsCheckingSession(false);
    }
  }, [setLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Insira um email válido para abrir o Códice.");
      setIsLoading(false);
      return;
    }

    localStorage.setItem("userEmail", email.toLowerCase());
    localStorage.setItem("userName", "Iniciado");

    setTimeout(() => {
      setIsLoading(false);
      setLocation("/hoje");
    }, 400);
  };

  if (isCheckingSession) {
    return (
      <div className="cdc-phone">
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>𓂀</div>
            <p className="cdc-phase">Abrindo o Códice...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cdc-phone">
      <section className="cdc-screen">
        <div style={{ textAlign: "center", padding: "48px 0 24px" }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>𓂀</div>
          <div className="cdc-logo" style={{ fontSize: 20, letterSpacing: "0.22em" }}>
            O CÓDICE
          </div>
          <div className="cdc-phase" style={{ marginTop: 6 }}>
            do despertar
          </div>
        </div>

        <div className="cdc-file" style={{ marginTop: 8 }}>
          <span className="cdc-stamp">Confidencial</span>
          <div className="cdc-kicker">Arquivo restrito</div>
          <h3
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 600,
              fontSize: 22,
              color: "var(--cdc-white)",
              textTransform: "uppercase",
              lineHeight: 1.1,
              marginBottom: 10,
            }}
          >
            Trinta dias para sair da prisão invisível.
          </h3>
          <p style={{ fontSize: 15, color: "var(--cdc-txt)", marginBottom: 18 }}>
            Entre com o email da sua compra. O Códice abre o primeiro arquivo e
            te dá um caminho — um dia de cada vez.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="seu email de acesso"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              style={{
                width: "100%",
                background: "var(--cdc-ink)",
                border: "1px solid var(--cdc-line)",
                borderRadius: 5,
                padding: "14px 16px",
                color: "var(--cdc-white)",
                fontFamily: "'PT Serif', serif",
                fontSize: 15,
                textAlign: "center",
                marginBottom: 12,
                outline: "none",
              }}
            />
            {error && (
              <p
                style={{
                  color: "var(--cdc-red)",
                  fontSize: 13,
                  marginBottom: 12,
                  textAlign: "center",
                }}
              >
                {error}
              </p>
            )}
            <button className="cdc-btn" type="submit" disabled={isLoading || !email}>
              {isLoading ? "Abrindo..." : "Abrir o Códice"}
            </button>
          </form>
        </div>

        <div className="cdc-note">
          Acesso vitalício · use o email da compra.
        </div>
      </section>
    </div>
  );
}
