type Props = {
  size?: number;
  ticks?: number | null;
  /** repère de départ plus épais, réservé au format Full */
  heavy?: boolean;
  /** couleur de l'anneau, l'accent reste ambre sauf en monochrome */
  ink?: string;
  accent?: string;
  className?: string;
};

const R = 38;
const C = 50;

const pt = (deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [C + R * Math.cos(rad), C + R * Math.sin(rad)] as const;
};

/**
 * Un anneau, une seule interruption.
 * Le repère ambre touche l'anneau d'un côté, le vide est de l'autre côté.
 * Gap: 347° à 13°. Ambre: 313° à 347°. Encre: 13° à 313°.
 */
export default function Loop({
  size = 64,
  ticks = null,
  heavy = false,
  ink = "var(--ink)",
  accent = "var(--amber)",
  className,
}: Props) {
  const w = 5;
  const [ax, ay] = pt(13);
  const [bx, by] = pt(313);
  const [cx, cy] = pt(347);

  const tickMarks = ticks
    ? Array.from({ length: ticks }, (_, i) => {
        const deg = 180 - (i * 360) / ticks;
        const inner = R + w / 2 + 3;
        const outer = inner + 5;
        const rad = ((deg - 90) * Math.PI) / 180;
        return {
          x1: C + inner * Math.cos(rad),
          y1: C + inner * Math.sin(rad),
          x2: C + outer * Math.cos(rad),
          y2: C + outer * Math.sin(rad),
        };
      })
    : [];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-label="BYRC"
      className={className}
    >
      <path
        d={`M ${ax.toFixed(2)} ${ay.toFixed(2)} A ${R} ${R} 0 1 1 ${bx.toFixed(2)} ${by.toFixed(2)}`}
        stroke={ink}
        strokeWidth={w}
        strokeLinecap="round"
      />
      <path
        d={`M ${bx.toFixed(2)} ${by.toFixed(2)} A ${R} ${R} 0 0 1 ${cx.toFixed(2)} ${cy.toFixed(2)}`}
        stroke={accent}
        strokeWidth={heavy ? w * 1.5 : w}
        strokeLinecap="round"
      />
      {tickMarks.map((t, i) => (
        <line
          key={i}
          x1={t.x1.toFixed(2)}
          y1={t.y1.toFixed(2)}
          x2={t.x2.toFixed(2)}
          y2={t.y2.toFixed(2)}
          stroke={ink}
          strokeWidth={w * 0.7}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
