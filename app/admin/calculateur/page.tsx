import Calculator from "@/components/Calculator";

export default function CalculateurPage() {
  return (
    <section className="wrap" style={{ paddingBlock: "2.5rem" }}>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>Rentabilité d&apos;un arrêt</h1>
      <p className="lede" style={{ marginTop: "1rem", marginBottom: "2.5rem" }}>
        Bouge les curseurs pendant une rencontre avec un resto ou un commanditaire. Les trois scénarios se
        recalculent en direct.
      </p>
      <Calculator />
    </section>
  );
}
