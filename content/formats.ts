export type FormatKey = "apero" | "brunch" | "sunset" | "full";

export type Format = {
  key: FormatKey;
  nom: string;
  heures: number;
  depart: string;
  fin: string;
  kmMax: number;
  ticks: number | null;
  repas: { fr: string; en: string };
  pour: { fr: string; en: string };
  resume: { fr: string; en: string };
};

export const formats: Format[] = [
  {
    key: "apero",
    nom: "Apéro",
    heures: 4,
    depart: "16:00",
    fin: "20:00",
    kmMax: 20,
    ticks: 4,
    repas: { fr: "Souper collectif au resto partenaire", en: "Group dinner at the host restaurant" },
    pour: {
      fr: "Une première fois. Si tu marches ta boucle, tu es à ta place.",
      en: "A first time. If you walk your loop, you belong here.",
    },
    resume: {
      fr: "Quatre départs, la fin du jour, et tout le monde à table à 20h.",
      en: "Four departures, the end of the day, everyone at the table by 8.",
    },
  },
  {
    key: "brunch",
    nom: "Brunch",
    heures: 6,
    depart: "07:00",
    fin: "13:00",
    kmMax: 30,
    ticks: 6,
    repas: { fr: "Brunch collectif à 13h", en: "Group brunch at 1 p.m." },
    pour: {
      fr: "Le monde qui aime se lever tôt et avoir son après-midi.",
      en: "Early risers who still want their afternoon.",
    },
    resume: {
      fr: "Six départs dans la lumière du matin, brunch au bout.",
      en: "Six departures in morning light, brunch at the end.",
    },
  },
  {
    key: "sunset",
    nom: "Sunset",
    heures: 12,
    depart: "12:00",
    fin: "00:00",
    kmMax: 60,
    ticks: null,
    repas: { fr: "Souper à mi-parcours, collations en continu", en: "Dinner at halfway, food throughout" },
    pour: {
      fr: "Ceux qui veulent voir le jour tomber et finir à la frontale.",
      en: "Anyone who wants to watch the light go and finish by headlamp.",
    },
    resume: {
      fr: "Midi à minuit. La boucle change complètement après la noirceur.",
      en: "Noon to midnight. The loop becomes a different thing after dark.",
    },
  },
  {
    key: "full",
    nom: "Full",
    heures: 24,
    depart: "12:00",
    fin: "12:00",
    kmMax: 120,
    ticks: null,
    repas: { fr: "Cuisine ouverte les 24 heures", en: "Kitchen open all 24 hours" },
    pour: {
      fr: "Une fois par année, dans une ville phare. On dort sur place ou pas.",
      en: "Once a year, in one flagship city. Sleep on site or don't.",
    },
    resume: {
      fr: "Le grand format. Personne n'est obligé de le finir.",
      en: "The big one. Nobody has to finish it.",
    },
  },
];

export const getFormat = (key: FormatKey) => formats.find((f) => f.key === key)!;
