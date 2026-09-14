import type { Locale } from "./dict";

export const dateLongue = (iso: string, locale: Locale) =>
  new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Toronto",
  }).format(new Date(iso));

export const dateCourte = (iso: string, locale: Locale) =>
  new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "America/Toronto",
  }).format(new Date(iso));
