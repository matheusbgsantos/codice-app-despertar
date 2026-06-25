#!/usr/bin/env python3
"""
Gera todos os audios de frequencia do app via ffmpeg.
- Solfeggio / tons audiveis: senoide pura na frequencia exata.
- Ondas cerebrais (Gamma, Delta): batida binaural (tom base + base+offset em cada canal).
- Modo PURO: tom limpo.
- Modo AMBIENTE: tom + pad harmonico suave + leve reverb (sensacao de "som de fundo").
Tudo loopavel (duracao multipla de ciclos longos; fade so no app via loop continuo).
"""
import subprocess, os, math

OUT = r"C:\Users\mathe\Downloads\kirvano-app-extract\kirvano-members-v2\client\public\audio"
os.makedirs(OUT, exist_ok=True)

DUR = 180  # 3 minutos por faixa (loopa no player)
BR = "128k"

# id -> (tipo, params)
# tipo 'tone' = senoide direta na freq
# tipo 'binaural' = base Hz + offset (diferenca percebida pelo cerebro)
FREQS = {
    "escudo":       ("tone", 432),
    "regeneracao":  ("tone", 528),
    "chave-mestra": ("tone", 963),
    "libertacao":   ("tone", 396),
    "mudanca":      ("tone", 417),
    "coracao":      ("tone", 639),
    "despertar":    ("tone", 741),
    "intuicao":     ("tone", 852),
    "raiz":         ("tone", 174),
    "renovacao":    ("tone", 285),
    "abundancia":   ("tone", 888),
    # ondas cerebrais -> batida binaural (base, offset)
    "foco":         ("binaural", (200, 40)),    # Gamma 40Hz
    "sono":         ("binaural", (150, 2.5)),   # Delta ~2.5Hz
}

def run(cmd):
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return r.returncode

def gen_tone_puro(freq, path):
    # senoide pura
    cmd = f'ffmpeg -y -f lavfi -i "sine=frequency={freq}:duration={DUR}" -b:a {BR} "{path}" 2>nul'
    return run(cmd)

def gen_tone_ambiente(freq, path):
    # tom + harmonico oitava abaixo (pad) + leve reverb (aecho) = sensacao ambiente
    sub = freq/2
    cmd = (f'ffmpeg -y -f lavfi -i "sine=frequency={freq}:duration={DUR}" '
           f'-f lavfi -i "sine=frequency={sub}:duration={DUR}" '
           f'-filter_complex "[0:a]volume=0.6[a];[1:a]volume=0.25[b];[a][b]amix=inputs=2:normalize=0,aecho=0.8:0.7:60:0.3,volume=1.4[out]" '
           f'-map "[out]" -b:a {BR} "{path}" 2>nul')
    return run(cmd)

def gen_binaural_puro(base, offset, path):
    # canal L = base, canal R = base+offset -> cerebro percebe 'offset' Hz
    cmd = (f'ffmpeg -y -f lavfi -i "sine=frequency={base}:duration={DUR}" '
           f'-f lavfi -i "sine=frequency={base+offset}:duration={DUR}" '
           f'-filter_complex "[0:a][1:a]join=inputs=2:channel_layout=stereo[out]" '
           f'-map "[out]" -b:a {BR} "{path}" 2>nul')
    return run(cmd)

def gen_binaural_ambiente(base, offset, path):
    # batida binaural + pad suave de fundo
    cmd = (f'ffmpeg -y -f lavfi -i "sine=frequency={base}:duration={DUR}" '
           f'-f lavfi -i "sine=frequency={base+offset}:duration={DUR}" '
           f'-f lavfi -i "sine=frequency={base/2}:duration={DUR}" '
           f'-filter_complex "[0:a][1:a]join=inputs=2:channel_layout=stereo[bin];[2:a]volume=0.2,aecho=0.8:0.7:80:0.3[pad];[bin]volume=0.8[binv];[binv][pad]amix=inputs=2:normalize=0,volume=1.3[out]" '
           f'-map "[out]" -b:a {BR} "{path}" 2>nul')
    return run(cmd)

print("Gerando audios da BIBLIOTECA (13 freqs x 2 modos)...")
ok = 0
for fid, (tipo, params) in FREQS.items():
    pa = os.path.join(OUT, f"{fid}-puro.mp3")
    am = os.path.join(OUT, f"{fid}-ambiente.mp3")
    if tipo == "tone":
        r1 = gen_tone_puro(params, pa)
        r2 = gen_tone_ambiente(params, am)
    else:
        base, off = params
        r1 = gen_binaural_puro(base, off, pa)
        r2 = gen_binaural_ambiente(base, off, am)
    status = "OK" if (r1==0 and r2==0) else f"ERRO(r1={r1},r2={r2})"
    if r1==0 and r2==0: ok += 1
    print(f"  {fid}: {status}")

print(f"\nBiblioteca: {ok}/{len(FREQS)} freqs com 2 modos cada.")

# JORNADAS - 1 audio por trilha (usa a freq principal em modo ambiente, mais longo/imersivo)
print("\nGerando audios das JORNADAS (5)...")
JORNADAS = {
    "jornada-calma":        432,   # escudo
    "jornada-prosperidade": 888,   # abundancia
    "jornada-cura":         528,   # regeneracao
    "jornada-recomeco":     639,   # coracao
    "jornada-despertar":    741,   # despertar
}
okj = 0
for jid, freq in JORNADAS.items():
    p = os.path.join(OUT, f"{jid}.mp3")
    r = gen_tone_ambiente(freq, p)
    if r == 0: okj += 1
    print(f"  {jid} ({freq}Hz): {'OK' if r==0 else 'ERRO'}")

print(f"\nJornadas: {okj}/{len(JORNADAS)}")

# limpa teste
t = os.path.join(OUT, "teste-432.mp3")
if os.path.exists(t): os.remove(t)

total = len([f for f in os.listdir(OUT) if f.endswith('.mp3')])
print(f"\n=== TOTAL: {total} arquivos .mp3 gerados em /audio ===")
