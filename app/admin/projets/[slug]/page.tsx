import Link from "next/link";
import { notFound } from "next/navigation";
import ProjetChecklist from "@/components/ProjetChecklist";
import { arrets, getArret } from "@/content/arrets";
import { getFormat } from "@/content/formats";

export function generateStaticParams() {
  return arrets.map((a) => ({ slug: a.slug }));
}

export default async function ProjetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArret(slug);
  if (!a) notFound();
  const f = getFormat(a.format);
  const titre = `${a.ville}, ${f.nom} ${new Date(a.date).getFullYear()}`;

  return (
    <section className="wrap" style={{ paddingBlock: "2rem 4rem" }}>
      <Link href="/admin/projets" className="retour">
        Tous les projets
      </Link>
      <ProjetChecklist slug={slug} titre={titre} />
    </section>
  );
}
