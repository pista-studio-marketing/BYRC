"use client";

import { useState } from "react";
import { getDict, type Locale } from "@/content/dict";

type FieldDef = { name: string; label: string; type?: "text" | "email" | "number" | "textarea"; required?: boolean };

export default function ContactForm({ locale, kind }: { locale: Locale; kind: "ambassadeur" | "partenaire" }) {
  const t = getDict(locale).form;
  const [state, setState] = useState<"idle" | "sending" | "ok" | "bad" | "missing">("idle");

  const fields: FieldDef[] =
    kind === "ambassadeur"
      ? [
          { name: "nom", label: t.nom, required: true },
          { name: "courriel", label: t.courriel, type: "email", required: true },
          { name: "ville", label: t.ville, required: true },
          { name: "cause", label: t.cause },
          { name: "lieu", label: t.lieu },
          { name: "message", label: t.message, type: "textarea" },
        ]
      : [
          { name: "etablissement", label: t.etablissement, required: true },
          { name: "nom", label: t.nom, required: true },
          { name: "courriel", label: t.courriel, type: "email", required: true },
          { name: "ville", label: t.ville, required: true },
          { name: "capacite", label: t.capacite, type: "number" },
          { name: "message", label: t.message, type: "textarea" },
        ];

  const submit = async () => {
    const payload: Record<string, string> = { kind, locale };
    for (const f of fields) {
      const el = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="byrc-${f.name}"]`);
      payload[f.name] = el?.value.trim() ?? "";
      if (f.required && !payload[f.name]) {
        setState("missing");
        el?.focus();
        return;
      }
    }
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setState(res.ok ? "ok" : "bad");
    } catch {
      setState("bad");
    }
  };

  if (state === "ok") {
    return <p className="form-note ok">{t.merci}</p>;
  }

  return (
    <div className="form">
      {fields.map((f) => (
        <div className="field" key={f.name}>
          <label htmlFor={`byrc-${f.name}`}>
            {f.label}
            {f.required ? " *" : ""}
          </label>
          {f.type === "textarea" ? (
            <textarea id={`byrc-${f.name}`} name={`byrc-${f.name}`} />
          ) : (
            <input id={`byrc-${f.name}`} name={`byrc-${f.name}`} type={f.type ?? "text"} />
          )}
        </div>
      ))}
      <button className="btn" onClick={submit} disabled={state === "sending"}>
        {t.envoyer}
      </button>
      {state === "missing" && <p className="form-note bad">{t.requis}</p>}
      {state === "bad" && <p className="form-note bad">{t.erreur}</p>}
    </div>
  );
}
