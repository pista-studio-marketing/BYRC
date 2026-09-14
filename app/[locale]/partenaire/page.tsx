import ContactForm from "@/components/ContactForm";
import { getDict, type Locale } from "@/content/dict";

export default async function Partenaire({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);

  return (
    <>
      <section className="wrap page-head">
        <h1>{t.partenairePage.titre}</h1>
        <p className="lede" style={{ marginTop: "1.4rem" }}>{t.partenairePage.lede}</p>
      </section>

      <section className="wrap" style={{ paddingTop: "1rem" }}>
        <h2>{t.partenairePage.pourquoiTitre}</h2>
        <div className="steps">
          {t.partenairePage.pourquoi.map((x) => (
            <div className="step" key={x.t}>
              <h3>{x.t}</h3>
              <p>{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <h2>{t.partenairePage.besoinTitre}</h2>
          <ul className="checklist">
            {t.partenairePage.besoin.map((x) => (
              <li key={x} style={{ borderBottomColor: "#33312c" }}>{x}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap">
        <h2>{t.partenairePage.formTitre}</h2>
        <ContactForm locale={locale} kind="partenaire" />
      </section>
    </>
  );
}
