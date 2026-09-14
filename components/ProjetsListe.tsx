"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { arrets } from "@/content/arrets";
import { getFormat } from "@/content/formats";
import { totalItems, totalMateriel } from "@/content/checklist";

const TOTAL = totalItems + totalMateriel;

export default function ProjetsListe() {
  const [progres, setProgres] = useState<Record<string, number>>({});

  useEffect(() => {
    const p: Record<string, number> = {};
    for (const a of arrets) {
      try {
        const raw = window.localStorage.getItem(`byrc:checklist:${a.slug}`);
        p[a.slug] = raw
          ? Object.values((JSON.parse(raw).done ?? {}) as Record<string, boolean>).filter(Boolean).length
          : 0;
      } catch {
        p[a.slug] = 0;
      }
    }
    setProgres(p);
  }, []);

  return (
    <div className="stops">
      {arrets.map((a) => {
        const f = getFormat(a.format);
        const faits = progres[a.slug] ?? 0;
        const pct = Math.round((faits / TOTAL) * 100);
        return (
          <Link className="stop" href={`/admin/projets/${a.slug}`} key={a.slug}>
            <span className="stop-date">
              {new Date(a.date).toLocaleDateString("fr-CA", { month: "short", year: "numeric" })}
            </span>
            <span>
              <span className="stop-city">{a.ville}</span>
              <span className="stop-sub">
                {f.nom}, {f.heures} h, {a.lieu.nom}
              </span>
              <span className="bar" style={{ marginTop: "0.6rem", maxWidth: "22rem" }}>
                <span className="bar-fill" style={{ width: `${pct}%` }} />
              </span>
            </span>
            <span className="stop-tag">
              {faits} / {TOTAL}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
