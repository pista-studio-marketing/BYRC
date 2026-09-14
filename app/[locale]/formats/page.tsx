import Link from "next/link";
import Loop from "@/components/Loop";
import Timetable from "@/components/Timetable";
import { getDict, type Locale } from "@/content/dict";
import { formats } from "@/content/formats";

export default async function Formats({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const fr = locale === "fr";
  const p = (path: string) => `/${locale}${path}`;

  return (
    <>
      <section className="wrap page-head">
        <h1>{t.formatsPage.titre}</h1>
        <p className="lede" style={{ marginTop: "1.4rem" }}>{t.formatsPage.lede}</p>
      </section>

      {formats.map((f, n) => (
        <section className="wrap" id={f.key} key={f.key} style={n === 0 ? { paddingTop: "1rem" } : undefined}>
          <hr className="rule" style={{ marginBottom: "2.5rem" }} />
          <div className="two-col">
            <div>
              <Loop size={56} ticks={f.ticks} heavy={f.key === "full"} />
              <h2 style={{ marginTop: "1rem" }}>{f.nom}</h2>
              <p className="lede" style={{ marginTop: "0.8rem" }}>{fr ? f.resume.fr : f.resume.en}</p>
              <dl className="spec">
                <dt>{t.formatsPage.duree}</dt>
                <dd>{f.heures} h, {f.heures} {t.formatsPage.boucles}</dd>
                <dt>{t.formatsPage.depart}</dt>
                <dd>{f.depart}</dd>
                <dt>{t.formatsPage.distance}</dt>
                <dd>{f.kmMax} km</dd>
                <dt>{t.formatsPage.repas}</dt>
                <dd>{fr ? f.repas.fr : f.repas.en}</dd>
                <dt>{t.formatsPage.pour}</dt>
                <dd>{fr ? f.pour.fr : f.pour.en}</dd>
              </dl>
              <div className="btn-row">
                <Link className="btn" href={p("/arrets")}>{t.cta.voir}</Link>
              </div>
            </div>
            <Timetable format={f} locale={locale} />
          </div>
        </section>
      ))}
    </>
  );
}
