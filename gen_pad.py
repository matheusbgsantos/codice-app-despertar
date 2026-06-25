#!/usr/bin/env python3
"""
Gera pad AMBIENTE MUSICAL (nao tom puro) baseado numa frequencia.
Acorde harmonico (raiz + terca + quinta + oitava) + movimento (vibrato lento) +
lowpass (suaviza) + reverb amplo. Soa como musica de meditacao, com a freq embutida.
"""
import subprocess, sys, os

OUT = r"C:\Users\mathe\Downloads\kirvano-app-extract\kirvano-members-v2\client\public\audio"
DUR = 180
BR = "160k"

def musical_pad(freq, path, dur=DUR):
    # Acorde: raiz, terca maior (5/4), quinta (3/2), oitava (2). Volumes baixos e desiguais.
    # Para freqs agudas (>500) baixa uma/duas oitavas pra ficar grave/suave.
    base = float(freq)
    while base > 330:        # mantem o pad numa regiao grave/agradavel
        base /= 2
    r  = base
    t3 = base * 1.25         # terca maior
    q5 = base * 1.5          # quinta
    oc = base * 2            # oitava
    sub= base / 2            # sub-grave (corpo)
    # cada voz com vibrato lento diferente p/ movimento "vivo"
    cmd = (
        f'ffmpeg -y '
        f'-f lavfi -i "sine=frequency={r}:duration={dur}" '
        f'-f lavfi -i "sine=frequency={t3}:duration={dur}" '
        f'-f lavfi -i "sine=frequency={q5}:duration={dur}" '
        f'-f lavfi -i "sine=frequency={oc}:duration={dur}" '
        f'-f lavfi -i "sine=frequency={sub}:duration={dur}" '
        f'-filter_complex "'
        f'[0:a]vibrato=f=0.12:d=0.4,volume=0.50[a];'
        f'[1:a]vibrato=f=0.15:d=0.4,volume=0.22[b];'
        f'[2:a]vibrato=f=0.10:d=0.4,volume=0.30[c];'
        f'[3:a]vibrato=f=0.18:d=0.3,volume=0.16[d];'
        f'[4:a]volume=0.35[e];'
        f'[a][b][c][d][e]amix=inputs=5:normalize=0[mix];'
        f'[mix]lowpass=f=1100,aecho=0.8:0.85:150:0.35,'
        f'volume=2.2,'
        f'afade=t=in:d=3[out]" '
        f'-map "[out]" -ac 2 -b:a {BR} "{path}" 2>nul'
    )
    return subprocess.run(cmd, shell=True, capture_output=True, text=True).returncode

if __name__ == "__main__":
    if len(sys.argv) >= 3:
        freq = float(sys.argv[1]); path = os.path.join(OUT, sys.argv[2])
        dur = int(sys.argv[3]) if len(sys.argv) > 3 else DUR
        rc = musical_pad(freq, path, dur)
        print("OK" if rc == 0 else f"ERRO rc={rc}", path)
