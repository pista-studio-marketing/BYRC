/**
 * Génère les SVG du symbole BYRC dans public/logo.
 * node scripts/logo.mjs
 *
 * Règles: un anneau, une seule interruption. Le repère ambre touche
 * l'anneau d'un côté, le vide est de l'autre côté. Trait uniforme,
 * bouts arrondis, aucun dégradé.
 */
import { mkdirSync, writeFileSync } from "node:fs";

const R = 38;
const C = 50;
const W = 5;
const INK = "#111111";
const AMBER = "#D99400";

const pt = (deg) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [(C + R * Math.cos(rad)).toFixed(2), (C + R * Math.sin(rad)).toFixed(2)];
};

const ticks = (n, ink) => {
  if (!n) return "";
  let out = "";
  for (let i = 0; i < n; i++) {
    const deg = 180 - (i * 360) / n;
    const rad = ((deg - 90) * Math.PI) / 180;
    const inner = R + W / 2 + 3;
    const outer = inner + 5;
    out += `\n  <line x1="${(C + inner * Math.cos(rad)).toFixed(2)}" y1="${(C + inner * Math.sin(rad)).toFixed(2)}" x2="${(C + outer * Math.cos(rad)).toFixed(2)}" y2="${(C + outer * Math.sin(rad)).toFixed(2)}" stroke="${ink}" stroke-width="${(W * 0.7).toFixed(2)}" stroke-linecap="round"/>`;
  }
  return out;
};

const symbole = ({ n = null, heavy = false, ink = INK, accent = AMBER }) => {
  const [ax, ay] = pt(13);
  const [bx, by] = pt(313);
  const [cx, cy] = pt(347);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none">
  <path d="M ${ax} ${ay} A ${R} ${R} 0 1 1 ${bx} ${by}" stroke="${ink}" stroke-width="${W}" stroke-linecap="round"/>
  <path d="M ${bx} ${by} A ${R} ${R} 0 0 1 ${cx} ${cy}" stroke="${accent}" stroke-width="${heavy ? W * 1.5 : W}" stroke-linecap="round"/>${ticks(n, ink)}
</svg>
`;
};

mkdirSync("public/logo", { recursive: true });

const fichiers = {
  "byrc-symbole.svg": symbole({}),
  "byrc-symbole-noir.svg": symbole({ accent: INK }),
  "byrc-symbole-blanc.svg": symbole({ ink: "#FFFFFF", accent: "#FFFFFF" }),
  "byrc-format-apero.svg": symbole({ n: 4 }),
  "byrc-format-brunch.svg": symbole({ n: 6 }),
  "byrc-format-sunset.svg": symbole({}),
  "byrc-format-full.svg": symbole({ heavy: true }),
};

for (const [nom, contenu] of Object.entries(fichiers)) {
  writeFileSync(`public/logo/${nom}`, contenu);
  console.log("écrit  public/logo/" + nom);
}
