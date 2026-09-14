"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { checklist, materiel, cats, type Cat } from "@/content/checklist";

type Custom = { id: string; titre: string; phase: string; cat: Cat };
type State = { done: Record<string, boolean>; notes: Record<string, string>; custom: Custom[] };

const vide: State = { done: {}, notes: {}, custom: [] };
const cle = (slug: string) => `byrc:checklist:${slug}`;

export function lireProgres(slug: string) {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(cle(slug));
    if (!raw) return 0;
    const s = JSON.parse(raw) as State;
    return Object.values(s.done ?? {}).filter(Boolean).length;
  } catch {
    return 0;
  }
}

export default function ProjetChecklist({ slug, titre }: { slug: string; titre: string }) {
  const [s, setS] = useState<State>(vide);
  const [pret, setPret] = useState(false);
  const [filtre, setFiltre] = useState<Cat | "tout">("tout");
  const [cacherFaits, setCacherFaits] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(cle(slug));
      if (raw) setS({ ...vide, ...(JSON.parse(raw) as State) });
    } catch {
      /* rien */
    }
    setPret(true);
  }, [slug]);

  useEffect(() => {
    if (!pret) return;
    try {
      window.localStorage.setItem(cle(slug), JSON.stringify(s));
    } catch {
      /* rien */
    }
  }, [s, slug, pret]);

  const bascule = (id: string) => setS((p) => ({ ...p, done: { ...p.done, [id]: !p.done[id] } }));
  const note = (id: string, v: string) => setS((p) => ({ ...p, notes: { ...p.notes, [id]: v } }));

  const ajouter = (phase: string) => {
    const titre = window.prompt("Quelle tâche ajouter à cet arrêt?");
    if (!titre?.trim()) return;
    const item: Custom = { id: `c-${Date.now()}`, titre: titre.trim(), phase, cat: "lieu" };
    setS((p) => ({ ...p, custom: [...p.custom, item] }));
  };

  const retirer = (id: string) =>
    setS((p) => ({ ...p, custom: p.custom.filter((c) => c.id !== id), done: { ...p.done, [id]: false } }));

  const exporter = () => {
    const blob = new Blob([JSON.stringify({ slug, ...s }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `byrc-${slug}-checklist.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importer = async (f: File) => {
    try {
      const data = JSON.parse(await f.text()) as State;
      setS({ done: data.done ?? {}, notes: data.notes ?? {}, custom: data.custom ?? [] });
    } catch {
      window.alert("Ce fichier n'est pas une checklist BYRC.");
    }
  };

  const tousLesItems = useMemo(() => {
    const base = checklist.flatMap((p) => p.items.map((i) => ({ ...i, phase: p.id })));
    return [...base, ...s.custom];
  }, [s.custom]);

  const faits = tousLesItems.filter((i) => s.done[i.id]).length;
  const total = tousLesItems.length;
  const pct = total ? Math.round((faits / total) * 100) : 0;

  const matFaits = materiel.flatMap((g) => g.items).filter((i) => s.done[i.id]).length;
  const matTotal = materiel.flatMap((g) => g.items).length;

  if (!pret) return <p className="muted">Chargement…</p>;

  const Ligne = ({
    id,
    titre,
    noteFixe,
    cat,
    onRetirer,
  }: {
    id: string;
    titre: string;
    noteFixe?: string;
    cat?: Cat;
    onRetirer?: () => void;
  }) => {
    const fait = !!s.done[id];
    if (cacherFaits && fait) return null;
    if (cat && filtre !== "tout" && cat !== filtre) return null;
    return (
      <div className={`task${fait ? " is-done" : ""}`}>
        <label className="task-main">
          <input type="checkbox" checked={fait} onChange={() => bascule(id)} />
          <span>
            <span className="task-titre">{titre}</span>
            {cat && <span className="task-cat">{cats[cat]}</span>}
            {noteFixe && <span className="task-note">{noteFixe}</span>}
          </span>
        </label>
        <div className="task-side">
          <input
            className="task-champ"
            placeholder="Note"
            value={s.notes[id] ?? ""}
            onChange={(e) => note(id, e.target.value)}
          />
          {onRetirer && (
            <button className="task-x" onClick={onRetirer} aria-label="Retirer">
              ×
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="proj-head">
        <div>
          <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>{titre}</h1>
          <p className="muted" style={{ margin: "0.4rem 0 0" }}>
            {faits} sur {total} tâches, matériel {matFaits} sur {matTotal}. Tout est sauvegardé dans ce
            navigateur.
          </p>
        </div>
        <div className="proj-pct">
          <span>{pct}%</span>
        </div>
      </div>

      <div className="bar">
        <div className="bar-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="proj-tools">
        <select value={filtre} onChange={(e) => setFiltre(e.target.value as Cat | "tout")}>
          <option value="tout">Toutes les catégories</option>
          {Object.entries(cats).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        <label className="switch">
          <input type="checkbox" checked={cacherFaits} onChange={(e) => setCacherFaits(e.target.checked)} />
          Cacher ce qui est fait
        </label>
        <button className="btn btn-ghost btn-mini" onClick={exporter}>
          Exporter
        </button>
        <button className="btn btn-ghost btn-mini" onClick={() => fileRef.current?.click()}>
          Importer
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          hidden
          onChange={(e) => e.target.files?.[0] && importer(e.target.files[0])}
        />
      </div>

      {checklist.map((phase) => {
        const items = phase.items;
        const perso = s.custom.filter((c) => c.phase === phase.id);
        const n = [...items, ...perso];
        const f = n.filter((i) => s.done[i.id]).length;
        return (
          <section className="phase" key={phase.id}>
            <div className="phase-head">
              <h2>{phase.nom}</h2>
              <span className="phase-quand">{phase.quand}</span>
              <span className="phase-count">
                {f} / {n.length}
              </span>
            </div>
            {items.map((i) => (
              <Ligne key={i.id} id={i.id} titre={i.titre} noteFixe={i.note} cat={i.cat} />
            ))}
            {perso.map((c) => (
              <Ligne key={c.id} id={c.id} titre={c.titre} cat={c.cat} onRetirer={() => retirer(c.id)} />
            ))}
            <button className="ajout" onClick={() => ajouter(phase.id)}>
              Ajouter une tâche à cette phase
            </button>
          </section>
        );
      })}

      <section className="phase">
        <div className="phase-head">
          <h2>Le camion</h2>
          <span className="phase-quand">À charger la veille</span>
          <span className="phase-count">
            {matFaits} / {matTotal}
          </span>
        </div>
        {materiel.map((g) => (
          <div key={g.groupe}>
            <h3 className="groupe">{g.groupe}</h3>
            {g.items.map((i) => (
              <Ligne key={i.id} id={i.id} titre={i.titre} noteFixe={i.note} />
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
