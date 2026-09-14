import Link from "next/link";
import Timetable from "@/components/Timetable";
import { getDict, type Locale } from "@/content/dict";
import { getFormat } from "@/content/formats";

export default async function Principe({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const p = (path: string) => `/${locale}${path}`;

  return (
    <>
      <section className="wrap page-head">
        <h1>{t.principe.titre}</h1>
        <p className="lede" style={{ marginTop: "1.4rem" }}>{t.principe.lede}</p>
      </section>

      <section className="wrap" style={{ paddingTop: 0 }}>
        <div className="two-col">
          <div>
            {t.home.comment.map((s) => (
              <div key={s.t} style={{ marginBottom: "2rem" }}>
                <h3 style={{ marginBottom: "0.5rem" }}>{s.t}</h3>
                <p className="muted" style={{ margin: 0 }}>{s.d}</p>
              </div>
            ))}
            <p>{t.home.pasUn}</p>
          </div>
          <div>
            <Timetable format={getFormat("apero")} locale={locale} />
          </div>
        </div>
      </section>

      <hr className="rule" />

      <section className="wrap">
        <h2>{t.principe.faqTitre}</h2>
        <div style={{ marginTop: "1.5rem", maxWidth: "58ch" }}>
          {t.principe.faq.map((f) => (
            <div className="qa" key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.r}</p>
            </div>
          ))}
        </div>
        <div className="btn-row">
          <Link className="btn" href={p("/arrets")}>{t.nav.arrets}</Link>
        </div>
      </section>
    </>
  );
}
