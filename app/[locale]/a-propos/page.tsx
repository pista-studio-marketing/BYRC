import Link from "next/link";
import Loop from "@/components/Loop";
import { getDict, type Locale } from "@/content/dict";

export default async function APropos({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const p = (path: string) => `/${locale}${path}`;

  return (
    <>
      <section className="wrap page-head">
        <Loop size={64} />
        <h1 style={{ marginTop: "1.5rem" }}>{t.apropos.titre}</h1>
      </section>

      <section className="wrap" style={{ paddingTop: "1rem" }}>
        <div style={{ maxWidth: "58ch" }}>
          {t.apropos.corps.map((c, n) => (
            <p key={n} className={n === 0 ? "lede" : undefined} style={n === 0 ? { marginBottom: "1.6rem" } : undefined}>
              {c}
            </p>
          ))}
        </div>
        <div className="btn-row">
          <Link className="btn" href={p("/ambassadeur")}>{t.nav.ambassadeur}</Link>
          <Link className="btn btn-ghost" href={p("/partenaire")}>{t.nav.partenaire}</Link>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <p className="statement">{t.promesse}</p>
        </div>
      </section>
    </>
  );
}
