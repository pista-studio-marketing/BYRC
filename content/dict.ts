export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const dict = {
  fr: {
    nav: {
      principe: "Le principe",
      formats: "Les formats",
      arrets: "Les arrêts",
      ambassadeur: "Devenir ambassadeur",
      partenaire: "Devenir partenaire",
      apropos: "À propos",
    },
    tagline: "Une boucle, une heure, une ville, une cause.",
    promesse: "On revient toujours au même point, alors personne ne court seul.",
    cta: { inscrire: "S'inscrire", bientot: "Inscriptions à venir", complet: "Complet", voir: "Voir l'arrêt" },
    home: {
      lede:
        "Une boucle de 5 km. Un départ à chaque heure, tout le monde en même temps. Ceux qui vont vite reviennent plus tôt et attendent les autres au point de départ. Entre deux boucles, on s'assoit.",
      commentTitre: "Comment ça marche",
      comment: [
        {
          t: "On part à l'heure juste",
          d: "Tout le monde ensemble, 5 km, une boucle qui revient exactement d'où elle est partie.",
        },
        {
          t: "On attend les autres",
          d: "Le rapide a 20 minutes de chaise, de café et de jasette. Le plus lent a le temps de souffler.",
        },
        {
          t: "On repart, jusqu'à ce que tu arrêtes",
          d: "Tu arrêtes quand tu veux. Chaque boucle terminée compte. Le seul échec, c'est de ne pas être venu.",
        },
      ],
      prochainsTitre: "Les prochains arrêts",
      formatsTitre: "Quatre façons de le vivre",
      formatsLede: "Même boucle, même principe. C'est la durée et le repas qui changent.",
      pasUn:
        "Pas un ultra. Pas une course chronométrée. Pas une compétition. On a notre propre formule à 5 km.",
      recruteTitre: "Il manque des villes",
      recruteTexte:
        "BYRC voyage. Chaque arrêt est porté par quelqu'un de la place et par la cause qui lui tient à cœur. Si c'est toi, on s'occupe du reste.",
    },
    principe: {
      titre: "Le principe",
      lede: "Ça se comprend en une minute et ça se vit en une journée.",
      faqTitre: "Ce que le monde demande toujours",
      faq: [
        {
          q: "Est-ce que je dois courir tout le temps?",
          r: "Non. Tu dois revenir au point de départ avant le prochain départ. Beaucoup de monde marche des boucles complètes.",
        },
        {
          q: "Qu'est-ce qui arrive si je suis lent?",
          r: "Rien. Tu as une heure pour 5 km. C'est large. Et si tu manques le départ suivant, tu repars à celui d'après.",
        },
        {
          q: "Combien de boucles je devrais faire?",
          r: "Celles que tu veux. Une personne qui vient faire deux boucles et rester à souper a fait la journée au complet.",
        },
        {
          q: "Est-ce que c'est chronométré?",
          r: "Non. On compte les boucles, pas le temps. Il n'y a pas de classement et pas de podium.",
        },
        {
          q: "J'apporte quoi?",
          r: "Des souliers, une gourde, une chaise pliante si tu en as une. Une frontale pour les formats de soir.",
        },
        {
          q: "Où va l'argent?",
          r: "Les dons vont directement à l'organisme choisi par l'ambassadeur de l'arrêt. Ton inscription paie le repas et la logistique.",
        },
      ],
    },
    formatsPage: {
      titre: "Les formats",
      lede: "Choisis celui qui ressemble à ta journée.",
      duree: "Durée",
      depart: "Départ",
      distance: "Distance maximale",
      repas: "Le repas",
      pour: "C'est pour qui",
      boucles: "boucles",
    },
    arretsPage: {
      titre: "Les arrêts",
      lede: "Une ville à la fois. Chaque arrêt appartient à la personne qui le porte.",
      aVenir: "À venir",
      passes: "Déjà passés",
      vide: "Rien d'annoncé pour l'instant. La prochaine ville est peut-être la tienne.",
    },
    arret: {
      quartier: "Le quartier général",
      ambassadeur: "L'ambassadeur",
      cause: "La cause",
      don: "Faire un don à la cause",
      horaire: "Le déroulement",
      depart: "Départ",
      cumule: "cumulé",
      repas: "Repas",
      bilan: "Ce que ça a donné",
      participants: "personnes",
      bouclesTotal: "boucles courues",
      amasse: "amassé pour la cause",
    },
    ambassadeurPage: {
      titre: "Devenir ambassadeur",
      lede: "Tu connais ta ville, ton monde et ta cause. C'est tout ce qu'il faut.",
      toiTitre: "Ce que tu fournis",
      toi: [
        "La ville et la cause. C'est ton choix, pas le nôtre.",
        "Le contact avec le resto ou la microbrasserie qui va nous héberger.",
        "Le tracé de la boucle de 5 km, qu'on valide ensemble.",
        "Ta gang. Les vingt premières personnes viennent toujours de toi.",
      ],
      nousTitre: "Ce qu'on fournit",
      nous: [
        "La marque, la page de ton arrêt et tout le visuel prêt à publier.",
        "La plateforme d'inscription et la gestion des paiements.",
        "Le matériel de départ, l'affichage et le chronométrage des départs.",
        "Quelqu'un de l'équipe sur place la journée même.",
      ],
      formTitre: "Écris-nous",
    },
    partenairePage: {
      titre: "Devenir lieu partenaire",
      lede: "Une journée complète de monde chez vous, et un repas de groupe réservé au bout.",
      pourquoiTitre: "Ce que ça vous apporte",
      pourquoi: [
        {
          t: "Du trafic sur des heures creuses",
          d: "Un Apéro remplit votre salle un samedi de 16h à 20h, un Brunch de 7h à 13h.",
        },
        {
          t: "Un repas de groupe garanti",
          d: "Les participants mangent chez vous à la fin. Le nombre est connu d'avance, le menu est fixe.",
        },
        {
          t: "Du café toute la journée",
          d: "Entre les boucles, votre comptoir est le seul endroit où aller.",
        },
        {
          t: "Votre nom sur tout l'arrêt",
          d: "Page de l'arrêt, visuels, communications. Vous êtes le quartier général, pas une commandite.",
        },
      ],
      besoinTitre: "Ce qu'on vous demande",
      besoin: [
        "Un point de départ dehors, devant ou à côté.",
        "L'accès aux toilettes pour les participants.",
        "Du café en continu, facturé au réel.",
        "Un menu de groupe à prix fixe pour le repas de fin.",
      ],
      formTitre: "Parlons-en",
    },
    apropos: {
      titre: "D'où ça vient",
      corps: [
        "En 2025, une gang d'amis s'est donné rendez-vous pour courir pour la fondation Michel Sarrazin. Une boucle de 5 km, un départ à chaque heure, pendant 24 heures.",
        "Ce qui est resté, ce n'est pas la distance. C'est les heures passées assis entre les boucles, avec un café, à attendre le monde qui rentrait. Personne n'a couru seul une seule minute de la journée.",
        "BYRC, c'est ça qu'on emmène dans d'autres villes. Le format est un prétexte. Ce qu'on organise, c'est le temps entre les boucles.",
      ],
    },
    form: {
      nom: "Ton nom",
      courriel: "Ton courriel",
      ville: "Ta ville",
      cause: "La cause que tu veux porter",
      lieu: "Le resto ou le café que tu as en tête",
      etablissement: "Nom de l'établissement",
      capacite: "Combien de personnes vous pouvez asseoir",
      message: "Dis-nous en plus",
      envoyer: "Envoyer",
      merci: "C'est envoyé. On revient vers toi cette semaine.",
      erreur: "L'envoi n'a pas fonctionné. Écris-nous directement à allo@byrc.ca.",
      requis: "Remplis les champs obligatoires avant d'envoyer.",
    },
    footer: { droits: "Backyard Run Canada", langue: "English" },
  },

  en: {
    nav: {
      principe: "How it works",
      formats: "Formats",
      arrets: "Stops",
      ambassadeur: "Become an ambassador",
      partenaire: "Become a host",
      apropos: "About",
    },
    tagline: "One loop, one hour, one city, one cause.",
    promesse: "We always come back to the same spot, so nobody runs alone.",
    cta: { inscrire: "Sign up", bientot: "Sign-up opens soon", complet: "Full", voir: "See this stop" },
    home: {
      lede:
        "A 5 km loop. One departure every hour, everyone at once. The fast ones get back sooner and wait at the start line. Between loops, you sit down.",
      commentTitre: "How it works",
      comment: [
        {
          t: "We start on the hour",
          d: "Everyone together, 5 km, a loop that comes back exactly where it left.",
        },
        {
          t: "We wait for each other",
          d: "The quick runner gets 20 minutes of chair, coffee and conversation. The slowest one gets time to breathe.",
        },
        {
          t: "We go again, until you stop",
          d: "Stop whenever you want. Every finished loop counts. The only way to fail is not to show up.",
        },
      ],
      prochainsTitre: "Next stops",
      formatsTitre: "Four ways to do it",
      formatsLede: "Same loop, same idea. The length and the meal are what change.",
      pasUn: "Not an ultra. Not a timed race. Not a competition. We run our own 5 km format.",
      recruteTitre: "Cities missing",
      recruteTexte:
        "BYRC travels. Every stop is carried by someone local and the cause they care about. If that's you, we handle the rest.",
    },
    principe: {
      titre: "How it works",
      lede: "It takes a minute to understand and a day to live.",
      faqTitre: "What people always ask",
      faq: [
        {
          q: "Do I have to run the whole time?",
          r: "No. You just have to be back before the next departure. Plenty of people walk full loops.",
        },
        {
          q: "What if I'm slow?",
          r: "Nothing happens. You get an hour for 5 km, which is generous. Miss a departure and you catch the next one.",
        },
        {
          q: "How many loops should I do?",
          r: "However many you want. Two loops and staying for dinner is a full day here.",
        },
        {
          q: "Is it timed?",
          r: "No. We count loops, not minutes. There's no ranking and no podium.",
        },
        {
          q: "What do I bring?",
          r: "Shoes, a water bottle, a folding chair if you have one. A headlamp for the evening formats.",
        },
        {
          q: "Where does the money go?",
          r: "Donations go straight to the organization chosen by the local ambassador. Your registration pays for the meal and the logistics.",
        },
      ],
    },
    formatsPage: {
      titre: "Formats",
      lede: "Pick the one that looks like your day.",
      duree: "Length",
      depart: "First departure",
      distance: "Maximum distance",
      repas: "The meal",
      pour: "Who it's for",
      boucles: "loops",
    },
    arretsPage: {
      titre: "Stops",
      lede: "One city at a time. Every stop belongs to the person carrying it.",
      aVenir: "Coming up",
      passes: "Already done",
      vide: "Nothing announced yet. The next city might be yours.",
    },
    arret: {
      quartier: "Headquarters",
      ambassadeur: "The ambassador",
      cause: "The cause",
      don: "Donate to the cause",
      horaire: "The schedule",
      depart: "Departure",
      cumule: "total",
      repas: "Meal",
      bilan: "How it went",
      participants: "people",
      bouclesTotal: "loops run",
      amasse: "raised for the cause",
    },
    ambassadeurPage: {
      titre: "Become an ambassador",
      lede: "You know your city, your people and your cause. That's the whole job description.",
      toiTitre: "What you bring",
      toi: [
        "The city and the cause. Your call, not ours.",
        "The contact at the restaurant or brewery that will host us.",
        "The 5 km loop, which we validate together.",
        "Your people. The first twenty always come from you.",
      ],
      nousTitre: "What we bring",
      nous: [
        "The brand, your stop's page and every visual ready to post.",
        "The sign-up platform and the payment handling.",
        "The start-line kit, the signage and the hourly departures.",
        "Someone from the team on site on the day.",
      ],
      formTitre: "Write to us",
    },
    partenairePage: {
      titre: "Become a host venue",
      lede: "A full day of people in your room, and a group meal booked at the end of it.",
      pourquoiTitre: "What you get",
      pourquoi: [
        {
          t: "Traffic in the quiet hours",
          d: "An Apéro fills your room on a Saturday from 4 to 8. A Brunch from 7 to 1.",
        },
        {
          t: "A guaranteed group meal",
          d: "Participants eat with you at the end. The headcount is known in advance, the menu is set.",
        },
        { t: "Coffee all day", d: "Between loops, your counter is the only place to go." },
        {
          t: "Your name on the whole stop",
          d: "Stop page, visuals, every communication. You're the headquarters, not a sponsor logo.",
        },
      ],
      besoinTitre: "What we ask",
      besoin: [
        "A start line outside, in front or beside.",
        "Washroom access for participants.",
        "Coffee through the day, billed at cost.",
        "A fixed-price group menu for the closing meal.",
      ],
      formTitre: "Let's talk",
    },
    apropos: {
      titre: "Where this came from",
      corps: [
        "In 2025, a group of friends got together to run for the Michel Sarrazin foundation. A 5 km loop, one departure every hour, for 24 hours.",
        "What stayed with us wasn't the distance. It was the hours spent sitting between loops with a coffee, waiting for people to come back. Nobody ran alone for a single minute of that day.",
        "BYRC is that thing, taken to other cities. The format is a pretext. What we organize is the time between the loops.",
      ],
    },
    form: {
      nom: "Your name",
      courriel: "Your email",
      ville: "Your city",
      cause: "The cause you want to carry",
      lieu: "The restaurant or café you have in mind",
      etablissement: "Venue name",
      capacite: "How many people you can seat",
      message: "Tell us more",
      envoyer: "Send",
      merci: "Sent. We'll get back to you this week.",
      erreur: "That didn't send. Write to us directly at allo@byrc.ca.",
      requis: "Fill in the required fields before sending.",
    },
    footer: { droits: "Backyard Run Canada", langue: "Français" },
  },
} as const;

export type Dict = (typeof dict)["fr"];
export const getDict = (locale: Locale): Dict => dict[locale] as Dict;
