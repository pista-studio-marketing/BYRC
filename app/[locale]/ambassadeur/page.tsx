import ContactForm from "@/components/ContactForm";
import { getDict, type Locale } from "@/content/dict";

export default async function Ambassadeur({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);

  return (
    <>
      <section className="wrap page-head">
        <h1>{t.ambassadeurPage.titre}</h1>
        <p className="lede" style={{ marginTop: "1.4rem" }}>{t.ambassadeurPage.lede}</p>
      </section>

      <section className="wrap" style={{ paddingTop: "1rem" }}>
        <div className="two-col">
          <div>
            <h2>{t.ambassadeurPage.toiTitre}</h2>
            <ul className="checklist">
              {t.ambassadeurPage.toi.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
          <div>
            <h2>{t.ambassadeurPage.nousTitre}</h2>
            <ul className="checklist">
              {t.ambassadeurPage.nous.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <hr className="rule" />

      <section className="wrap">
        <h2>{t.ambassadeurPage.formTitre}</h2>
        <ContactForm locale={locale} kind="ambassadeur" />
      </section>
    </>
  );
}
