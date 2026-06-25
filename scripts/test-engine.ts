// O CÓDICE — Prova CLI do motor de protocolo.
// Roda: npx tsx scripts/test-engine.ts
// Prova que: (1) 2 respostas DIFERENTES geram 2 protocolos DIFERENTES;
//            (2) rodar o MESMO input 2x dá EXATAMENTE igual (determinístico).

import { buildProtocol, type QuizAnswers, type Protocol } from "../shared/protocol-engine";
import { habitsById } from "../shared/habits";

// ---- Pessoa A: dominante MENTE (scroll pesado, ansiedade, quer foco) ----
const respostasA: QuizAnswers = {
  q1: 2, // pego o celular antes de levantar (MENTE)
  q2: 1, // minha mente: disperso (MENTE peso 2)
  q3: 3, // +9h de tela (MENTE peso 2, intensidade 3)
  q4: 0, // fé firme (espírito leve)
  q5: [1, 2], // scroll + notícias (sem módulo)
  q6: 0, // treina sempre (intensidade alta)
  q7: 1, // foco e clareza (MENTE)
};

// ---- Pessoa B: dominante ESPÍRITO (fé perdida, isolamento, porn) ----
const respostasB: QuizAnswers = {
  q1: 3, // sem vontade de nada (ESPÍRITO)
  q2: 2, // meu espírito: vazio (ESPÍRITO peso 2)
  q3: 1, // 3-6h de tela
  q4: 2, // perdi a fé (ESPÍRITO peso 3)
  q5: [0, 4], // pornografia (módulo) + isolamento (módulo)
  q6: 2, // quase nunca treina (intensidade baixa)
  q7: 2, // paz e propósito (ESPÍRITO)
};

function imprimir(nome: string, p: Protocol) {
  console.log("════════════════════════════════════════════════════════");
  console.log(`PROTOCOLO ${nome}`);
  console.log("════════════════════════════════════════════════════════");
  console.log(`  seal           : ${p.seal}`);
  console.log(`  dominantChain  : ${p.dominantChain}`);
  console.log(`  promise        : ${p.promise}`);
  console.log(`  modules        : ${p.modules.length ? p.modules.join(", ") : "(nenhum)"}`);
  console.log(`  diagnóstico    : ${p.diagnosisText}`);
  console.log("  ── 30 dias ──");
  for (const d of p.days) {
    const h = habitsById[d.habitId];
    const tag = h?.module ? " [MÓDULO]" : "";
    const dd = String(d.day).padStart(2, "0");
    console.log(
      `   Dia ${dd} | ${d.chainKey.padEnd(8)} | ${d.habitId.padEnd(12)} | ${h?.name ?? "?"}${tag}`,
    );
  }
  console.log("");
}

// 1) Dois protocolos diferentes
const pA = buildProtocol(respostasA);
const pB = buildProtocol(respostasB);
imprimir("A (dominante esperado: MENTE)", pA);
imprimir("B (dominante esperado: ESPÍRITO)", pB);

// 2) Determinismo: mesmo input duas vezes
const pA2 = buildProtocol(respostasA);
const igualA = JSON.stringify(pA) === JSON.stringify(pA2);

// 3) Diferença entre A e B
const diferentes = JSON.stringify(pA) !== JSON.stringify(pB);
const selosDiferentes = pA.seal !== pB.seal;
const correntesDiferentes = pA.dominantChain !== pB.dominantChain;

console.log("════════════════════════════════════════════════════════");
console.log("VERIFICAÇÕES");
console.log("════════════════════════════════════════════════════════");
console.log(`  [${igualA ? "OK" : "FALHA"}] Determinístico: mesmo input → output idêntico`);
console.log(
  `  [${diferentes ? "OK" : "FALHA"}] A e B são protocolos DIFERENTES (JSON completo)`,
);
console.log(
  `  [${selosDiferentes ? "OK" : "FALHA"}] Selos diferentes: ${pA.seal} vs ${pB.seal}`,
);
console.log(
  `  [${correntesDiferentes ? "OK" : "FALHA"}] Correntes dominantes diferentes: ${pA.dominantChain} vs ${pB.dominantChain}`,
);

const todasOk = igualA && diferentes && selosDiferentes && correntesDiferentes;
console.log("");
console.log(todasOk ? ">>> PROVA PASSOU. Motor OK." : ">>> PROVA FALHOU.");
process.exit(todasOk ? 0 : 1);
