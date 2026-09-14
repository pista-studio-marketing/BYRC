import { NextResponse, type NextRequest } from "next/server";

/**
 * Protège /admin par mot de passe si ADMIN_USER et ADMIN_PASS
 * sont définis dans les variables d'environnement Vercel.
 * Tant qu'ils ne le sont pas, la section reste ouverte.
 */
export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;
  if (!user || !pass) return NextResponse.next();

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    const [u, p] = atob(header.slice(6)).split(":");
    if (u === user && p === pass) return NextResponse.next();
  }

  return new NextResponse("Authentification requise", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="BYRC"' },
  });
}

export const config = { matcher: ["/admin/:path*"] };
