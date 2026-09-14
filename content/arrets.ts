import type { FormatKey } from "./formats";

/**
 * AJOUTER UN ARRÊT
 * Copie un bloc, change les valeurs, pousse. La page se génère toute seule.
 * Rien d'autre à toucher dans le code.
 */

export type Arret = {
  slug: string;
  ville: string;
  province: string;
  format: FormatKey;
  date: string; // ISO, date du départ
  statut: "a-venir" | "complet" | "passe";
  inscriptionUrl: string | null; // lien Race Roster / Eventbrite. null = pas encore ouvert
  lieu: {
    nom: string;
    adresse: string;
    url: string;
    mapUrl: string;
    mot: { fr: string; en: string };
  };
  ambassadeur: {
    nom: string;
    photo: string | null;
    pourquoi: { fr: string; en: string };
  };
  cause: {
    nom: string;
    url: string;
    donUrl: string;
    quoi: { fr: string; en: string };
  };
  bilan?: { participants: number; boucles: number; amasse: number };
};

export const arrets: Arret[] = [
  {
    slug: "quebec-apero-2026",
    ville: "Québec",
    province: "QC",
    format: "apero",
    date: "2026-05-23T16:00:00-04:00",
    statut: "a-venir",
    inscriptionUrl: null,
    lieu: {
      nom: "Carrera Café",
      adresse: "72 boul. Champlain, Québec",
      url: "https://carreracafe.ca",
      mapUrl: "https://maps.google.com/?q=72+boul.+Champlain+Quebec",
      mot: {
        fr: "Point de départ, toilettes, café entre les boucles, et le souper à 20h.",
        en: "Start line, washrooms, coffee between loops, and dinner at 8.",
      },
    },
    ambassadeur: {
      nom: "Patrick Ouellette",
      photo: null,
      pourquoi: {
        fr: "J'ai couru 25 km pour la fondation Michel Sarrazin avec des amis et j'ai arrêté quand j'ai eu fini mon plaisir. C'est exactement ça que je veux offrir à d'autres villes.",
        en: "I ran 25 km for the Michel Sarrazin foundation with friends and stopped when I'd had my fill. That's the thing I want to hand to other cities.",
      },
    },
    cause: {
      nom: "Fondation Michel Sarrazin",
      url: "https://michel-sarrazin.ca",
      donUrl: "https://michel-sarrazin.ca/faire-un-don",
      quoi: {
        fr: "Soins palliatifs et accompagnement de fin de vie à Québec.",
        en: "Palliative care and end-of-life support in Québec City.",
      },
    },
  },
  {
    slug: "montreal-sunset-2026",
    ville: "Montréal",
    province: "QC",
    format: "sunset",
    date: "2026-08-15T12:00:00-04:00",
    statut: "a-venir",
    inscriptionUrl: null,
    lieu: {
      nom: "À confirmer",
      adresse: "Montréal",
      url: "",
      mapUrl: "",
      mot: { fr: "On cherche le quartier général.", en: "Still looking for the host." },
    },
    ambassadeur: {
      nom: "Poste à combler",
      photo: null,
      pourquoi: {
        fr: "Cet arrêt attend la personne qui va le porter.",
        en: "This stop is waiting for the person who will carry it.",
      },
    },
    cause: {
      nom: "Choisie par l'ambassadeur",
      url: "",
      donUrl: "",
      quoi: { fr: "À venir.", en: "To come." },
    },
  },
];

export const arretsAVenir = () =>
  arrets
    .filter((a) => a.statut !== "passe")
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));

export const arretsPasses = () =>
  arrets.filter((a) => a.statut === "passe").sort((a, b) => +new Date(b.date) - +new Date(a.date));

export const getArret = (slug: string) => arrets.find((a) => a.slug === slug);
