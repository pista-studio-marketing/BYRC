import Link from "next/link";
import Loop from "@/components/Loop";

export const metadata = { title: "BYRC, gestion" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin">
      <header className="site-head">
        <div className="wrap head-inner">
          <Link className="brand" href="/admin/projets">
            <Loop size={28} />
            <span className="brand-word">BYRC</span>
          </Link>
          <nav className="site-nav">
            <Link href="/admin/projets">Projets</Link>
            <Link href="/admin/calculateur">Calculateur</Link>
            <Link href="/fr">Retour au site</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
