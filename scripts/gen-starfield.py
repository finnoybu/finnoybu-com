#!/usr/bin/env python
"""Generate public/starfield.svg — a varied, gently twinkling night sky.

Star colour tracks stellar reality: hot blue-white stars are common and
brighter; cool red stars are rarer and dim. Most field stars twinkle on
randomized durations + phases (a self-contained CSS animation inside the
SVG, which runs even when the SVG is used as a CSS background-image).

Run from the repo root:  py scripts/gen-starfield.py
"""
import random

random.seed(11)
W, H = 1600, 1000

# (hex, weight, r_min, r_max, opacity_min, opacity_max)
KINDS = [
    ('#e8eefc', 32, 0.40, 1.20, 0.10, 0.52),  # faint white
    ('#bdd1ff', 24, 0.40, 1.45, 0.14, 0.64),  # blue-hued
    ('#ffffff', 13, 0.60, 1.70, 0.46, 0.92),  # bright white
    ('#fff0d6', 12, 0.50, 1.30, 0.18, 0.60),  # warm white
    ('#ffce9e',  9, 0.50, 1.30, 0.16, 0.54),  # amber
    ('#ffb4a3',  7, 0.40, 1.10, 0.10, 0.40),  # red-hued (kept dim)
]
weights = [k[1] for k in KINDS]

out = [
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
    f'preserveAspectRatio="xMidYMid slice">',
    '<style>'
    '.tw{animation:tw var(--d) ease-in-out infinite;animation-delay:var(--delay)}'
    '.twf{animation:twf var(--d) ease-in-out infinite;animation-delay:var(--delay)}'
    '@keyframes tw{0%,100%{opacity:var(--o)}50%{opacity:calc(var(--o)*0.40)}}'
    '@keyframes twf{0%,100%{opacity:var(--o)}50%{opacity:calc(var(--o)*0.72)}}'
    '</style>',
]

# field stars — ~60% twinkle
for _ in range(155):
    hexc, _, rmin, rmax, omin, omax = random.choices(KINDS, weights=weights)[0]
    x = round(random.uniform(0, W), 1)
    y = round(random.uniform(0, H), 1)
    r = round(random.uniform(rmin, rmax), 2)
    o = round(random.uniform(omin, omax), 2)
    if random.random() < 0.60:
        d = round(random.uniform(2.8, 6.5), 1)
        delay = round(random.uniform(-8.0, -0.2), 1)
        out.append(
            f'<circle cx="{x}" cy="{y}" r="{r}" fill="{hexc}" class="tw" '
            f'style="--o:{o};--d:{d}s;--delay:{delay}s"/>'
        )
    else:
        out.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{hexc}" opacity="{o}"/>')

# standout "feature" stars — steady halo + slow gentle core twinkle
FEATURES = [
    ('#ffffff', 2.0), ('#cfe0ff', 1.9), ('#ffffff', 1.7),
    ('#ffe6c4', 1.8), ('#cfe0ff', 1.6), ('#fff4f0', 2.1),
]
for hexc, r in FEATURES:
    x = round(random.uniform(50, W - 50), 1)
    y = round(random.uniform(40, H * 0.78), 1)
    d = round(random.uniform(5.0, 9.0), 1)
    delay = round(random.uniform(-9.0, -0.3), 1)
    out.append(f'<circle cx="{x}" cy="{y}" r="{round(r * 3.6, 2)}" '
               f'fill="{hexc}" opacity="0.09"/>')
    out.append(
        f'<circle cx="{x}" cy="{y}" r="{r}" fill="{hexc}" class="twf" '
        f'style="--o:0.95;--d:{d}s;--delay:{delay}s"/>'
    )

out.append('</svg>')

with open('public/starfield.svg', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
print(f'wrote public/starfield.svg — {len(out) - 3} stars')
