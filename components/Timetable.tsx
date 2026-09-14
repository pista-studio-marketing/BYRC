import type { Format } from "@/content/formats";
import type { Locale } from "@/content/dict";

const addHours = (hhmm: string, n: number) => {
  const [h, m] = hhmm.split(":").map(Number);
  const t = (h + n) % 24;
  return `${String(t).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

/** Combien de lignes on montre avant de résumer, pour ne pas avoir 24 rangées */
const CAP = 8;

export default function Timetable({
  format,
  locale,
  compact = false,
}: {
  format: Format;
  locale: Locale;
  compact?: boolean;
}) {
  const fr = locale === "fr";
  const total = format.heures;
  const shown = compact ? Math.min(total, 5) : Math.min(total, CAP);

  const rows = Array.from({ length: shown }, (_, i) => ({
    hour: addHours(format.depart, i),
    label: fr ? `Boucle ${i + 1}` : `Loop ${i + 1}`,
    km: (i + 1) * 5,
  }));

  const hidden = total - shown;

  return (
    <div>
      <div className="timetable">
        {rows.map((r) => (
          <div className="tt-row" key={r.hour}>
            <span className="tt-hour">{r.hour}</span>
            <span className="tt-label">{r.label}</span>
            <span className="tt-km">{r.km} km</span>
          </div>
        ))}

        {hidden > 0 && (
          <div className="tt-row">
            <span className="tt-hour" aria-hidden="true">
              &middot;&middot;&middot;
            </span>
            <span className="tt-label">
              {fr
                ? `${hidden} départs de plus, à chaque heure`
                : `${hidden} more departures, one every hour`}
            </span>
            <span className="tt-km">{format.kmMax} km</span>
          </div>
        )}

        <div className="tt-row is-meal">
          <span className="tt-hour">{addHours(format.depart, total)}</span>
          <span className="tt-label">{fr ? format.repas.fr : format.repas.en}</span>
          <span className="tt-km" aria-hidden="true">
            &nbsp;
          </span>
        </div>
      </div>
      <p className="tt-cap">
        {fr
          ? "Tu arrêtes quand tu veux. Chaque boucle terminée compte."
          : "Stop whenever you want. Every finished loop counts."}
      </p>
    </div>
  );
}
