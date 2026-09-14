import Link from "next/link";
import Loop from "@/components/Loop";
import Timetable from "@/components/Timetable";
import { getDict, type Locale } from "@/content/dict";
import { formats, getFormat } from "@/content/formats";
import { arretsAVenir } from "@/content/arrets";
import { dateCourte } from "@/content/format-date";

export default async function Accueil({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const p = (path: string) => `/${locale}${path}`;
  const prochains = arretsAVenir().slice(0, 4);
  const apero = getFormat("apero");

  return (
    <>
      <section className="wrap hero">
        <div className="hero-grid">
          <div>
            <span className="hero-tag">{t.tagline}</span>
            <h1>{locale === "fr" ? "Cinq kilomètres, à chaque heure, ensemble" : "Five kilometres, every hour, together"}</h1>
            <p className="lede" style={{ marginTop: "1.6rem" }}>
              {t.home.lede}
            </p>
            <div className="btn-row">
              <Link className="btn" href={p("/arrets")}>
                {t.nav.arrets}
              </Link>
              <Link className="btn btn-ghost" href={p("/principe")}>
                {t.nav.principe}
              </Link>
            </div>
          </div>
          <Timetable format={apero} locale={locale} />
        </div>
      </section>

      <hr className="rule" />

      <section className="wrap">
        <h2>{t.home.commentTitre}</h2>
        <div className="steps">
          {t.home.comment.map((s) => (
            <div className="step" key={s.t}>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <p className="statement">{t.promesse}</p>
          <p style={{ marginTop: "1.5rem", maxWidth: "46ch" }}>{t.home.pasUn}</p>
        </div>
      </section>

      <section className="wrap">
        <h2>{t.home.prochainsTitre}</h2>
        <div className="stops">
          {prochains.map((a) => {
            const f = getFormat(a.format);
            return (
              <Link className="stop" href={p(`/arrets/${a.slug}`)} key={a.slug}>
                <span className="stop-date">{dateCourte(a.date, locale)}</span>
                <span>
                  <span className="stop-city">{a.ville}</span>
                  <span className="stop-sub">
                    {f.nom}, {f.heures} h, {a.lieu.nom}
                  </span>
                </span>
                <span className="stop-tag">
                  {a.statut === "complet" ? t.cta.complet : a.inscriptionUrl ? t.cta.inscrire : t.cta.bientot}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="wrap">
        <h2>{t.home.formatsTitre}</h2>
        <p className="muted" style={{ marginTop: "0.8rem" }}>
          {t.home.formatsLede}
        </p>
        <div className="formats">
          {formats.map((f) => (
            <Link className="format" href={p(`/formats#${f.key}`)} key={f.key}>
              <Loop size={44} ticks={f.ticks} heavy={f.key === "full"} className="format-loop" />
              <h3>{f.nom}</h3>
              <div className="format-meta">
                {f.heures} h &nbsp;/&nbsp; {f.kmMax} km
              </div>
              <p>{locale === "fr" ? f.resume.fr : f.resume.en}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="wrap two-col">
          <div>
            <h2>{t.home.recruteTitre}</h2>
            <p style={{ marginTop: "1rem" }}>{t.home.recruteTexte}</p>
            <div className="btn-row">
              <Link className="btn btn-ghost" href={p("/ambassadeur")}>
                {t.nav.ambassadeur}
              </Link>
              <Link className="btn btn-ghost" href={p("/partenaire")}>
                {t.nav.partenaire}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
