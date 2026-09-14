import Link from "next/link";
import { getDict, type Locale } from "@/content/dict";
import { arretsAVenir, arretsPasses } from "@/content/arrets";
import { getFormat } from "@/content/formats";
import { dateCourte } from "@/content/format-date";

export default async function Arrets({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const p = (path: string) => `/${locale}${path}`;
  const aVenir = arretsAVenir();
  const passes = arretsPasses();

  const Liste = ({ items }: { items: typeof aVenir }) => (
    <div className="stops">
      {items.map((a) => {
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
              {a.statut === "passe"
                ? a.cause.nom
                : a.statut === "complet"
                  ? t.cta.complet
                  : a.inscriptionUrl
                    ? t.cta.inscrire
                    : t.cta.bientot}
            </span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      <section className="wrap page-head">
        <h1>{t.arretsPage.titre}</h1>
        <p className="lede" style={{ marginTop: "1.4rem" }}>{t.arretsPage.lede}</p>
      </section>

      <section className="wrap" style={{ paddingTop: "1rem" }}>
        <h2>{t.arretsPage.aVenir}</h2>
        {aVenir.length ? <Liste items={aVenir} /> : <p className="muted">{t.arretsPage.vide}</p>}
      </section>

      {passes.length > 0 && (
        <section className="wrap" style={{ paddingTop: 0 }}>
          <h2>{t.arretsPage.passes}</h2>
          <Liste items={passes} />
        </section>
      )}

      <section className="band">
        <div className="wrap">
          <h2>{t.home.recruteTitre}</h2>
          <p style={{ marginTop: "1rem" }}>{t.home.recruteTexte}</p>
          <div className="btn-row">
            <Link className="btn btn-ghost" href={p("/ambassadeur")}>{t.nav.ambassadeur}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
