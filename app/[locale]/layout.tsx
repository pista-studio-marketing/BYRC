import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { locales, type Locale } from "@/content/dict";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;

  return (
    <>
      <a className="skip" href="#main">
        Aller au contenu
      </a>
      <Header locale={l} />
      <main id="main">{children}</main>
      <Footer locale={l} />
    </>
  );
}
