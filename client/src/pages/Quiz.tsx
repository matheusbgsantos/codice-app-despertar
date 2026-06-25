import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { quiz, TOTAL_QUESTIONS } from "@shared/quiz";
import type { QuizAnswers } from "@shared/protocol-engine";

type Phase = "intro" | "questions" | "calibrating" | "diagnosis";

const CHAIN_LABEL: Record<string, string> = {
  corpo: "O CORPO",
  mente: "A MENTE",
  espirito: "O ESPÍRITO",
};

const SCAN_LINES = [
  "analisando padrões...",
  "cruzando correntes...",
  "medindo o tamanho da cela...",
  "selando protocolo...",
  "protocolo intransferível gerado.",
];

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

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0); // índice da pergunta (0..6)
  const [single, setSingle] = useState<Record<number, number>>({});
  const [multi, setMulti] = useState<number[]>([]); // Q5
  const [scanIdx, setScanIdx] = useState(0);
  const createMutation = trpc.protocol.create.useMutation();
  const utils = trpc.useUtils();
  const startedRef = useRef(false);

  // Gate: precisa de email. Se já tem protocolo, vai pro /hoje.
  const protocolQuery = trpc.protocol.get.useQuery(
    { email: email ?? "" },
    { enabled: !!email },
  );

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      setLocation("/");
      return;
    }
    setEmail(userEmail);
  }, [setLocation]);

  useEffect(() => {
    if (phase === "intro" && protocolQuery.data) {
      setLocation("/hoje");
    }
  }, [phase, protocolQuery.data, setLocation]);

  // Animação de calibração → cria protocolo.
  useEffect(() => {
    if (phase !== "calibrating") return;
    if (startedRef.current) return;
    startedRef.current = true;

    const answers: QuizAnswers = {
      q1: single[0] ?? 0,
      q2: single[1] ?? 0,
      q3: single[2] ?? 0,
      q4: single[3] ?? 0,
      q5: [...multi].sort((a, b) => a - b),
      q6: single[5] ?? 0,
      q7: single[6] ?? 0,
    };

    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setScanIdx((n) => Math.min(n + 1, SCAN_LINES.length));
    }, 620);

    createMutation.mutate(
      { email: email!, answers },
      {
        onSuccess: () => {
          utils.protocol.get.invalidate();
        },
      },
    );

    const done = setTimeout(() => {
      clearInterval(interval);
      setPhase("diagnosis");
    }, 3300);

    return () => {
      clearInterval(interval);
      clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const q = quiz[step];
  const isLast = step === TOTAL_QUESTIONS - 1;
  const isMultiQ = !!q?.multi;
  const canAdvance = isMultiQ ? true : single[step] != null;

  function pickSingle(optIdx: number) {
    setSingle((s) => ({ ...s, [step]: optIdx }));
  }
  function toggleMulti(optIdx: number) {
    setMulti((m) =>
      m.includes(optIdx) ? m.filter((x) => x !== optIdx) : [...m, optIdx],
    );
  }
  function next() {
    if (isLast) {
      setPhase("calibrating");
    } else {
      setStep((s) => s + 1);
    }
  }

  // ---------- INTRO ----------
  if (phase === "intro") {
    return (
      <div className="cdc-v2">
        <Embers />
        <section className="cdc-screen" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", gap: 28, padding: "48px 22px" }}>
          <div style={{ textAlign: "center" }}>
            <div className="cdc-seal cdc-seal--pulse" style={{ width: 64, height: 64, fontSize: 30, margin: "0 auto" }}>
              𓂀
            </div>
          </div>
          <h1 className="cdc-title" style={{ textAlign: "center" }}>
            Antes de te dar <span className="g">o mapa</span>, preciso saber onde te prenderam.
          </h1>
          <p className="cdc-body" style={{ textAlign: "center", fontSize: 16 }}>
            Responde sem mentir — ninguém tá vendo. Sete perguntas. No fim, teu
            protocolo é selado: trinta dias calibrados só pra ti.
          </p>
          <button className="cdc-action" onClick={() => setPhase("questions")}>
            Começar a decodificação →
          </button>
        </section>
      </div>
    );
  }

  // ---------- CALIBRAÇÃO ----------
  if (phase === "calibrating") {
    return (
      <div className="cdc-v2">
        <Embers />
        <section className="cdc-screen" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16, padding: "48px 22px" }}>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <div className="cdc-seal cdc-seal--pulse" style={{ width: 72, height: 72, fontSize: 34, margin: "0 auto" }}>
              𓂀
            </div>
          </div>
          <div style={{ minHeight: 160 }}>
            {SCAN_LINES.slice(0, scanIdx).map((line, i) => (
              <div className="cdc-scan" key={i} style={{ marginBottom: 10 }}>
                &gt; {line}
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // ---------- DIAGNÓSTICO ----------
  if (phase === "diagnosis") {
    const data = createMutation.data ?? protocolQuery.data;
    const protocol = data?.protocol;
    if (!protocol) {
      return (
        <div className="cdc-v2">
          <Embers />
          <section className="cdc-screen" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p className="cdc-scan">&gt; selando protocolo...</p>
          </section>
        </div>
      );
    }
    return (
      <div className="cdc-v2">
        <Embers />
        <section className="cdc-screen" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", gap: 22, padding: "48px 22px" }}>
          <div className="cdc-eyebrow" style={{ textAlign: "center" }}>Decodificado</div>
          <h1 className="cdc-title" style={{ textAlign: "center" }}>
            DECODIFICADO.
          </h1>
          <div style={{ textAlign: "center" }}>
            <div className="cdc-eyebrow">Tua corrente dominante</div>
            <div className="cdc-title g" style={{ fontSize: "clamp(26px,8vw,40px)", marginTop: 4 }}>
              {CHAIN_LABEL[protocol.dominantChain] ?? protocol.dominantChain}
            </div>
          </div>
          <hr className="cdc-divider cdc-divider--gold" />
          <p className="cdc-body" style={{ fontSize: 16 }}>
            {protocol.diagnosisText}
          </p>
          <div className="cdc-panel-v2 cdc-panel-v2--accent" style={{ textAlign: "center" }}>
            <div className="cdc-numeral" style={{ fontSize: 22 }}>Protocolo {data?.seal ?? protocol.seal}</div>
            <div className="cdc-eyebrow" style={{ marginTop: 6 }}>calibrado para você</div>
            <div style={{ marginTop: 10 }}>
              <span className="cdc-mark">intransferível</span>
            </div>
          </div>
          <button className="cdc-action" onClick={() => setLocation("/hoje")}>
            Entrar no Dia 1 →
          </button>
        </section>
      </div>
    );
  }

  // ---------- PERGUNTAS ----------
  return (
    <div className="cdc-v2">
      <Embers />
      <section className="cdc-screen" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: "40px 22px 28px" }}>
        <div className="cdc-step" style={{ textAlign: "center", marginBottom: 30 }}>
          <b>{String(step + 1).padStart(2, "0")}</b> / {String(TOTAL_QUESTIONS).padStart(2, "0")}
        </div>

        <h2 className="cdc-title" style={{ fontSize: "clamp(24px,7vw,36px)", marginBottom: 26 }}>
          {q.prompt}
        </h2>

        <div style={{ flex: 1 }}>
          {q.options.map((opt, idx) => {
            const selected = isMultiQ
              ? multi.includes(idx)
              : single[step] === idx;
            return (
              <button
                key={idx}
                className={
                  "cdc-archive-btn" +
                  (isMultiQ ? " is-checkbox" : "") +
                  (selected ? " is-selected" : "")
                }
                onClick={() => (isMultiQ ? toggleMulti(idx) : pickSingle(idx))}
              >
                {opt.label}
              </button>
            );
          })}
          {isMultiQ && (
            <p className="cdc-eyebrow" style={{ marginTop: 8 }}>
              pode marcar mais de um — ou nenhum
            </p>
          )}
        </div>

        <div style={{ marginTop: 22, display: "flex", gap: 12 }}>
          {step > 0 && (
            <button
              className="cdc-action cdc-action--ghost"
              style={{ flex: "0 0 38%" }}
              onClick={() => setStep((s) => s - 1)}
            >
              ← Voltar
            </button>
          )}
          <button
            className="cdc-action"
            style={{ flex: 1 }}
            disabled={!canAdvance}
            onClick={next}
          >
            {isLast ? "Selar protocolo →" : "Continuar →"}
          </button>
        </div>
      </section>
    </div>
  );
}
