import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BYRC, Backyard Run Canada",
  description: "Une boucle, une heure, une ville, une cause.",
  metadataBase: new URL("https://byrc.ca"),
  openGraph: {
    title: "BYRC, Backyard Run Canada",
    description: "Une boucle, une heure, une ville, une cause.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
