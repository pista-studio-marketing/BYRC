import ProjetsListe from "@/components/ProjetsListe";
import { totalItems, totalMateriel } from "@/content/checklist";

export default function ProjetsPage() {
  return (
    <section className="wrap" style={{ paddingBlock: "2.5rem" }}>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>Projets</h1>
      <p className="lede" style={{ marginTop: "1rem" }}>
        Un projet par destination. Chacun démarre avec les {totalItems} tâches du gabarit et les{" "}
        {totalMateriel} éléments de matériel, de la première approche jusqu&apos;au bilan.
      </p>
      <ProjetsListe />
      <p className="muted" style={{ fontSize: "0.86rem", marginTop: "1.5rem", maxWidth: "56ch" }}>
        Les projets viennent de content/arrets.ts. Ajoute un arrêt là et il apparaît ici avec sa
        checklist complète. L&apos;avancement est gardé dans ce navigateur, utilise Exporter pour le
        partager à quelqu&apos;un d&apos;autre de l&apos;équipe.
      </p>
    </section>
  );
}
