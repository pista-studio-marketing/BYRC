import Link from "next/link";
import Loop from "./Loop";
import { getDict, type Locale } from "@/content/dict";

export default function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const other: Locale = locale === "fr" ? "en" : "fr";
  const p = (path: string) => `/${locale}${path}`;

  return (
    <header className="site-head">
      <div className="wrap head-inner">
        <Link className="brand" href={p("")} aria-label="BYRC">
          <Loop size={30} />
          <span className="brand-word">BYRC</span>
        </Link>
        <nav className="site-nav">
          <Link href={p("/principe")}>{t.nav.principe}</Link>
          <Link href={p("/formats")}>{t.nav.formats}</Link>
          <Link href={p("/arrets")}>{t.nav.arrets}</Link>
          <Link href={p("/ambassadeur")}>{t.nav.ambassadeur}</Link>
          <Link className="lang" href={`/${other}`}>
            {t.footer.langue}
          </Link>
        </nav>
      </div>
    </header>
  );
}
