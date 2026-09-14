import { NextResponse } from "next/server";

/**
 * Reçoit les demandes d'ambassadeur et de lieu partenaire.
 * Si CONTACT_WEBHOOK est défini dans Vercel, la demande y est relayée
 * (Zapier, Make, Slack, Formspree, n'importe quel endpoint qui accepte du JSON).
 * Sinon, elle est écrite dans les logs Vercel, ce qui suffit pour démarrer.
 */
export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const hook = process.env.CONTACT_WEBHOOK;
  if (hook) {
    try {
      const res = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...(data as object), recu: new Date().toISOString() }),
      });
      if (!res.ok) return NextResponse.json({ ok: false }, { status: 502 });
    } catch {
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  } else {
    console.log("[byrc:contact]", JSON.stringify(data));
  }

  return NextResponse.json({ ok: true });
}
