import Link from "next/link";
import { getDict, type Locale } from "@/content/dict";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const p = (path: string) => `/${locale}${path}`;
  const year = new Date().getFullYear();

  return (
    <footer className="site-foot">
      <div className="wrap foot-inner">
        <div>
          <div style={{ fontFamily: "var(--display)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)" }}>
            {t.footer.droits}
          </div>
          <div>{t.tagline}</div>
          <div style={{ marginTop: "0.4rem" }}>
            <a href="mailto:allo@byrc.ca">allo@byrc.ca</a>
          </div>
        </div>
        <nav className="foot-nav">
          <Link href={p("/principe")}>{t.nav.principe}</Link>
          <Link href={p("/formats")}>{t.nav.formats}</Link>
          <Link href={p("/arrets")}>{t.nav.arrets}</Link>
          <Link href={p("/ambassadeur")}>{t.nav.ambassadeur}</Link>
          <Link href={p("/partenaire")}>{t.nav.partenaire}</Link>
          <Link href={p("/a-propos")}>{t.nav.apropos}</Link>
        </nav>
        <div>&copy; {year}</div>
      </div>
    </footer>
  );
}
