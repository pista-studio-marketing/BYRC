import Link from "next/link";
import { notFound } from "next/navigation";
import Loop from "@/components/Loop";
import Timetable from "@/components/Timetable";
import { getDict, locales, type Locale } from "@/content/dict";
import { arrets, getArret } from "@/content/arrets";
import { getFormat } from "@/content/formats";
import { dateLongue } from "@/content/format-date";

export function generateStaticParams() {
  return locales.flatMap((locale) => arrets.map((a) => ({ locale, slug: a.slug })));
}

export default async function ArretPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const a = getArret(slug);
  if (!a) notFound();
  const t = getDict(locale);
  const fr = locale === "fr";
  const f = getFormat(a.format);

  return (
    <>
      <section className="wrap page-head">
        <span className="hero-tag">
          {dateLongue(a.date, locale)} &nbsp;/&nbsp; {f.nom} &nbsp;/&nbsp; {f.heures} h
        </span>
        <h1>
          {a.ville}
          <br />
          <span style={{ color: "var(--ash)" }}>{f.nom} {new Date(a.date).getFullYear()}</span>
        </h1>
        <div className="btn-row">
          {a.inscriptionUrl && a.statut === "a-venir" ? (
            <a className="btn" href={a.inscriptionUrl} target="_blank" rel="noreferrer">
              {t.cta.inscrire}
            </a>
          ) : (
            <span className="btn" aria-disabled="true">
              {a.statut === "complet" ? t.cta.complet : t.cta.bientot}
            </span>
          )}
          {a.cause.donUrl && (
            <a className="btn btn-ghost" href={a.cause.donUrl} target="_blank" rel="noreferrer">
              {t.arret.don}
            </a>
          )}
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: "1rem" }}>
        <div className="two-col">
          <div>
            <h2>{t.arret.horaire}</h2>
            <div style={{ marginTop: "1.5rem" }}>
              <Timetable format={f} locale={locale} />
            </div>
          </div>
          <div>
            <Loop size={56} ticks={f.ticks} heavy={f.key === "full"} />
            <h3 style={{ marginTop: "1.4rem" }}>{t.arret.quartier}</h3>
            <dl className="spec">
              <dt>{fr ? "Lieu" : "Venue"}</dt>
              <dd>
                {a.lieu.url ? (
                  <a href={a.lieu.url} target="_blank" rel="noreferrer">{a.lieu.nom}</a>
                ) : (
                  a.lieu.nom
                )}
              </dd>
              <dt>{fr ? "Adresse" : "Address"}</dt>
              <dd>
                {a.lieu.mapUrl ? (
                  <a href={a.lieu.mapUrl} target="_blank" rel="noreferrer">{a.lieu.adresse}</a>
                ) : (
                  a.lieu.adresse
                )}
              </dd>
              <dt>{fr ? "Ce qu'on y trouve" : "What's there"}</dt>
              <dd>{fr ? a.lieu.mot.fr : a.lieu.mot.en}</dd>
            </dl>
          </div>
        </div>
      </section>

      <hr className="rule" />

      <section className="wrap">
        <div className="two-col">
          <div>
            <h2>{t.arret.ambassadeur}</h2>
            <h3 style={{ marginTop: "1.2rem", fontSize: "1.3rem" }}>{a.ambassadeur.nom}</h3>
            <p style={{ marginTop: "0.8rem" }}>{fr ? a.ambassadeur.pourquoi.fr : a.ambassadeur.pourquoi.en}</p>
          </div>
          <div>
            <h2>{t.arret.cause}</h2>
            <h3 style={{ marginTop: "1.2rem", fontSize: "1.3rem" }}>
              {a.cause.url ? (
                <a href={a.cause.url} target="_blank" rel="noreferrer">{a.cause.nom}</a>
              ) : (
                a.cause.nom
              )}
            </h3>
            <p style={{ marginTop: "0.8rem" }}>{fr ? a.cause.quoi.fr : a.cause.quoi.en}</p>
            {a.cause.donUrl && (
              <a className="btn btn-ghost" href={a.cause.donUrl} target="_blank" rel="noreferrer">
                {t.arret.don}
              </a>
            )}
          </div>
        </div>
      </section>

      {a.bilan && (
        <section className="band">
          <div className="wrap">
            <h2>{t.arret.bilan}</h2>
            <div className="steps">
              <div className="step">
                <h3>{a.bilan.participants}</h3>
                <p>{t.arret.participants}</p>
              </div>
              <div className="step">
                <h3>{a.bilan.boucles}</h3>
                <p>{t.arret.bouclesTotal}</p>
              </div>
              <div className="step">
                <h3>{a.bilan.amasse.toLocaleString(fr ? "fr-CA" : "en-CA")} $</h3>
                <p>{t.arret.amasse}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="wrap">
        <Link className="btn btn-ghost" href={`/${locale}/arrets`}>{t.nav.arrets}</Link>
      </section>
    </>
  );
}
