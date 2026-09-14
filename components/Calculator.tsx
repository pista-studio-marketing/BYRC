"use client";

import { useMemo, useState } from "react";
import { formats, type FormatKey } from "@/content/formats";

const money = (n: number) =>
  new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

type Inputs = {
  format: FormatKey;
  participants: number;
  billet: number;
  repas: number;
  cafe: number;
  fraisPct: number;
  materiel: number;
  deplacement: number;
  permis: number;
  commanditesLocales: number;
  valeurCommandite: number;
  commanditeNationale: number;
  merchTaux: number;
  merchPrix: number;
  merchMarge: number;
  equipesCorpo: number;
  prixCorpo: number;
  donMoyen: number;
  arretsParAn: number;
};

const defauts: Inputs = {
  format: "apero",
  participants: 60,
  billet: 65,
  repas: 28,
  cafe: 4,
  fraisPct: 5,
  materiel: 450,
  deplacement: 700,
  permis: 250,
  commanditesLocales: 2,
  valeurCommandite: 750,
  commanditeNationale: 1500,
  merchTaux: 30,
  merchPrix: 35,
  merchMarge: 55,
  equipesCorpo: 1,
  prixCorpo: 1800,
  donMoyen: 40,
  arretsParAn: 6,
};

type Scenario = { nom: string; part: number; spons: number; merch: number; base?: boolean };

const scenarios: Scenario[] = [
  { nom: "Pessimiste", part: 0.6, spons: 0.5, merch: 0.6 },
  { nom: "Réaliste", part: 1, spons: 1, merch: 1, base: true },
  { nom: "Optimiste", part: 1.35, spons: 1.5, merch: 1.4 },
];

function calcule(i: Inputs, s: Scenario) {
  const participants = Math.round(i.participants * s.part);

  const revBillets = participants * i.billet;
  const revCommLocale = i.commanditesLocales * i.valeurCommandite * s.spons;
  const revCommNat = i.commanditeNationale * s.spons;
  const revCorpo = i.equipesCorpo * i.prixCorpo;
  const revMerch = participants * (i.merchTaux / 100) * s.merch * i.merchPrix * (i.merchMarge / 100);
  const revenus = revBillets + revCommLocale + revCommNat + revCorpo + revMerch;

  const coutRepas = participants * i.repas;
  const coutCafe = participants * i.cafe;
  const coutFrais = revBillets * (i.fraisPct / 100);
  const coutsVariables = coutRepas + coutCafe + coutFrais;
  const coutsFixes = i.materiel + i.deplacement + i.permis;
  const couts = coutsVariables + coutsFixes;

  const net = revenus - couts;

  // contribution d'un participant de plus
  const contribution = i.billet - i.repas - i.cafe - i.billet * (i.fraisPct / 100) + (i.merchTaux / 100) * s.merch * i.merchPrix * (i.merchMarge / 100);
  const couvertureFixe = coutsFixes - revCommLocale - revCommNat - revCorpo;
  const seuil = contribution > 0 ? Math.max(0, Math.ceil(couvertureFixe / contribution)) : Infinity;

  const cause = participants * i.donMoyen;

  return {
    participants,
    revBillets,
    revCommLocale,
    revCommNat,
    revCorpo,
    revMerch,
    revenus,
    coutRepas,
    coutCafe,
    coutFrais,
    coutsFixes,
    couts,
    net,
    contribution,
    seuil,
    cause,
  };
}

export default function Calculator() {
  const [i, setI] = useState<Inputs>(defauts);
  const set = <K extends keyof Inputs>(k: K, v: Inputs[K]) => setI((p) => ({ ...p, [k]: v }));

  const res = useMemo(() => scenarios.map((s) => ({ s, r: calcule(i, s) })), [i]);
  const base = res.find((x) => x.s.base)!.r;

  const Slider = ({
    k,
    label,
    min,
    max,
    step = 1,
    suffix = "",
  }: {
    k: keyof Inputs;
    label: string;
    min: number;
    max: number;
    step?: number;
    suffix?: string;
  }) => (
    <div className="ctrl">
      <div className="ctrl-head">
        <label htmlFor={`s-${k}`}>{label}</label>
        <span className="ctrl-val">
          {i[k] as number}
          {suffix}
        </span>
      </div>
      <input
        id={`s-${k}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={i[k] as number}
        onChange={(e) => set(k, Number(e.target.value) as Inputs[typeof k])}
      />
    </div>
  );

  const Num = ({ k, label }: { k: keyof Inputs; label: string }) => (
    <div className="ctrl">
      <div className="ctrl-head">
        <label htmlFor={`n-${k}`}>{label}</label>
      </div>
      <input
        id={`n-${k}`}
        type="number"
        value={i[k] as number}
        onChange={(e) => set(k, Number(e.target.value) as Inputs[typeof k])}
      />
    </div>
  );

  return (
    <div className="calc-grid">
      <div>
        <div className="panel" style={{ marginBottom: "1rem" }}>
          <h3>L&apos;arrêt</h3>
          <div className="ctrl">
            <div className="ctrl-head">
              <label htmlFor="fmt">Format</label>
            </div>
            <select
              id="fmt"
              value={i.format}
              onChange={(e) => set("format", e.target.value as FormatKey)}
              style={{ width: "100%", padding: "0.45rem 0.6rem", border: "1px solid var(--line)", borderRadius: 0 }}
            >
              {formats.map((f) => (
                <option key={f.key} value={f.key}>
                  {f.nom}, {f.heures} h, jusqu&apos;à {f.kmMax} km
                </option>
              ))}
            </select>
          </div>
          <Slider k="participants" label="Participants" min={10} max={300} step={5} />
          <Slider k="billet" label="Prix du billet" min={0} max={200} step={5} suffix=" $" />
          <Slider k="donMoyen" label="Don moyen à la cause" min={0} max={200} step={5} suffix=" $" />
        </div>

        <div className="panel" style={{ marginBottom: "1rem" }}>
          <h3>Les coûts</h3>
          <Slider k="repas" label="Repas par personne" min={0} max={90} suffix=" $" />
          <Slider k="cafe" label="Café et collations" min={0} max={25} suffix=" $" />
          <Slider k="fraisPct" label="Frais de plateforme" min={0} max={12} step={0.5} suffix=" %" />
          <Num k="materiel" label="Matériel et affichage ($)" />
          <Num k="deplacement" label="Déplacement de l'équipe ($)" />
          <Num k="permis" label="Permis, assurance, divers ($)" />
        </div>

        <div className="panel" style={{ marginBottom: "1rem" }}>
          <h3>Commandites et corporatif</h3>
          <Slider k="commanditesLocales" label="Commandites locales" min={0} max={8} />
          <Slider k="valeurCommandite" label="Valeur de chacune" min={0} max={5000} step={250} suffix=" $" />
          <Num k="commanditeNationale" label="Part de la commandite nationale ($)" />
          <Slider k="equipesCorpo" label="Blocs corporatifs vendus" min={0} max={6} />
          <Slider k="prixCorpo" label="Prix d'un bloc" min={0} max={6000} step={100} suffix=" $" />
        </div>

        <div className="panel">
          <h3>Merch et volume annuel</h3>
          <Slider k="merchTaux" label="Participants qui achètent" min={0} max={100} step={5} suffix=" %" />
          <Slider k="merchPrix" label="Panier moyen" min={0} max={150} step={5} suffix=" $" />
          <Slider k="merchMarge" label="Marge sur le merch" min={0} max={90} step={5} suffix=" %" />
          <Slider k="arretsParAn" label="Arrêts par année" min={1} max={24} />
        </div>
      </div>

      <div>
        <div className="scenarios">
          {res.map(({ s, r }) => (
            <div className={`scen${s.base ? " is-base" : ""}`} key={s.nom}>
              <div className="scen-name">{s.nom}</div>
              <div className={`scen-net ${r.net >= 0 ? "pos" : "neg"}`}>{money(r.net)}</div>
              <div className="scen-sub">
                {r.participants} participants, seuil à {Number.isFinite(r.seuil) ? r.seuil : "jamais"}
              </div>
            </div>
          ))}
        </div>

        <dl className="readout">
          <div>
            <dt>Seuil de rentabilité</dt>
            <dd>{Number.isFinite(base.seuil) ? `${base.seuil} pers.` : "jamais"}</dd>
          </div>
          <div>
            <dt>Marge par participant</dt>
            <dd>{money(base.contribution)}</dd>
          </div>
          <div>
            <dt>Net par arrêt</dt>
            <dd className={base.net >= 0 ? "pos" : "neg"}>{money(base.net)}</dd>
          </div>
          <div>
            <dt>Net sur {i.arretsParAn} arrêts</dt>
            <dd className={base.net >= 0 ? "pos" : "neg"}>{money(base.net * i.arretsParAn)}</dd>
          </div>
          <div>
            <dt>Versé à la cause</dt>
            <dd>{money(base.cause)}</dd>
          </div>
          <div>
            <dt>À la cause sur l&apos;année</dt>
            <dd>{money(base.cause * i.arretsParAn)}</dd>
          </div>
        </dl>

        <table className="ledger">
          <thead>
            <tr>
              <th>Scénario réaliste, un arrêt</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Revenus</td>
              <td>{money(base.revenus)}</td>
            </tr>
            <tr className="sub">
              <td>Inscriptions</td>
              <td>{money(base.revBillets)}</td>
            </tr>
            <tr className="sub">
              <td>Commandites locales</td>
              <td>{money(base.revCommLocale)}</td>
            </tr>
            <tr className="sub">
              <td>Commandite nationale</td>
              <td>{money(base.revCommNat)}</td>
            </tr>
            <tr className="sub">
              <td>Blocs corporatifs</td>
              <td>{money(base.revCorpo)}</td>
            </tr>
            <tr className="sub">
              <td>Merch, marge nette</td>
              <td>{money(base.revMerch)}</td>
            </tr>
            <tr>
              <td>Coûts</td>
              <td>{money(base.couts)}</td>
            </tr>
            <tr className="sub">
              <td>Repas</td>
              <td>{money(base.coutRepas)}</td>
            </tr>
            <tr className="sub">
              <td>Café et collations</td>
              <td>{money(base.coutCafe)}</td>
            </tr>
            <tr className="sub">
              <td>Frais de plateforme</td>
              <td>{money(base.coutFrais)}</td>
            </tr>
            <tr className="sub">
              <td>Fixes, matériel, déplacement, permis</td>
              <td>{money(base.coutsFixes)}</td>
            </tr>
            <tr className="total">
              <td>Résultat de l&apos;arrêt</td>
              <td className={base.net >= 0 ? "pos" : "neg"}>{money(base.net)}</td>
            </tr>
          </tbody>
        </table>

        <p className="muted" style={{ fontSize: "0.86rem", marginTop: "1.2rem", maxWidth: "56ch" }}>
          Les dons à la cause ne transitent pas par BYRC et n&apos;entrent pas dans le résultat. Le montant affiché
          sert à pitcher un commanditaire ou un organisme, pas à comptabiliser un revenu.
        </p>
      </div>
    </div>
  );
}
