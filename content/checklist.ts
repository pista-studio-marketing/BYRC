/**
 * CHECKLIST MAÎTRESSE D'UN ARRÊT BYRC
 *
 * Gabarit appliqué à chaque destination. Pour ajouter une tâche à tous
 * les arrêts futurs, ajoute-la ici. Pour une tâche propre à un seul arrêt,
 * utilise le bouton d'ajout dans l'admin.
 *
 * Les identifiants ne doivent jamais changer: c'est ce qui garde
 * l'historique des cases cochées.
 */

export type Cat =
  | "lieu"
  | "cause"
  | "ambassadeur"
  | "parcours"
  | "legal"
  | "inscriptions"
  | "commandites"
  | "marketing"
  | "materiel"
  | "repas"
  | "benevoles"
  | "securite"
  | "finances";

export const cats: Record<Cat, string> = {
  lieu: "Lieu partenaire",
  cause: "Cause",
  ambassadeur: "Ambassadeur",
  parcours: "Parcours",
  legal: "Légal et permis",
  inscriptions: "Inscriptions",
  commandites: "Commandites",
  marketing: "Marketing",
  materiel: "Matériel",
  repas: "Repas et café",
  benevoles: "Bénévoles",
  securite: "Sécurité",
  finances: "Finances",
};

export type Item = { id: string; titre: string; cat: Cat; note?: string };
export type Phase = { id: string; nom: string; quand: string; items: Item[] };

export const checklist: Phase[] = [
  {
    id: "fondation",
    nom: "Fondation",
    quand: "4 mois avant",
    items: [
      { id: "f-amb", titre: "Confirmer l'ambassadeur et son engagement écrit", cat: "ambassadeur" },
      { id: "f-date", titre: "Arrêter la date et le format", cat: "ambassadeur", note: "Vérifier les autres événements en ville la même fin de semaine" },
      { id: "f-cause", titre: "Choisir la cause avec l'ambassadeur", cat: "cause" },
      { id: "f-orgcontact", titre: "Premier contact avec l'organisme, valider qu'il accepte", cat: "cause" },
      { id: "f-orgdon", titre: "Obtenir la page de don de l'organisme et son numéro de charité", cat: "cause", note: "L'argent ne transite jamais par BYRC" },
      { id: "f-lieuliste", titre: "Dresser une liste de 5 lieux partenaires possibles", cat: "lieu" },
      { id: "f-lieuvisite", titre: "Visiter les lieux retenus avec l'ambassadeur", cat: "lieu" },
      { id: "f-lieudeal", titre: "Entente écrite avec le lieu partenaire", cat: "lieu", note: "Départ, toilettes, café, menu de groupe, heures" },
      { id: "f-budget", titre: "Monter le budget de l'arrêt dans le calculateur", cat: "finances" },
      { id: "f-seuil", titre: "Fixer le nombre minimal de participants et le prix du billet", cat: "finances" },
      { id: "f-parcours1", titre: "Tracer une première version de la boucle de 5 km", cat: "parcours" },
    ],
  },
  {
    id: "verrouillage",
    nom: "Verrouillage",
    quand: "3 mois avant",
    items: [
      { id: "v-parcours2", titre: "Courir la boucle au complet pour la valider", cat: "parcours" },
      { id: "v-gpx", titre: "Enregistrer le tracé GPX et vérifier la distance réelle", cat: "parcours" },
      { id: "v-eclairage", titre: "Repérer les sections sombres et sans trottoir", cat: "parcours", note: "Critique pour Sunset et Full" },
      { id: "v-toilettes", titre: "Confirmer l'accès aux toilettes toute la durée", cat: "lieu" },
      { id: "v-permis", titre: "Vérifier si la ville exige un permis d'événement", cat: "legal" },
      { id: "v-permisdepot", titre: "Déposer la demande de permis", cat: "legal", note: "Certaines villes demandent 60 à 90 jours" },
      { id: "v-assurance", titre: "Souscrire l'assurance responsabilité de l'événement", cat: "legal" },
      { id: "v-decharge", titre: "Préparer le formulaire de décharge de responsabilité", cat: "legal" },
      { id: "v-mineurs", titre: "Décider de la politique pour les mineurs et l'autorisation parentale", cat: "legal" },
      { id: "v-plateforme", titre: "Créer l'événement sur la plateforme d'inscription", cat: "inscriptions" },
      { id: "v-prix", titre: "Configurer les prix, les rabais et la date limite", cat: "inscriptions" },
      { id: "v-page", titre: "Publier la page de l'arrêt sur byrc.ca", cat: "marketing", note: "Ajouter le bloc dans content/arrets.ts" },
      { id: "v-comm1", titre: "Monter la liste des commanditaires locaux à approcher", cat: "commandites" },
      { id: "v-commdoc", titre: "Préparer le document de commandite avec les chiffres du calculateur", cat: "commandites" },
    ],
  },
  {
    id: "marche",
    nom: "Mise en marché",
    quand: "2 mois avant",
    items: [
      { id: "m-ouverture", titre: "Ouvrir les inscriptions", cat: "inscriptions" },
      { id: "m-annonce", titre: "Annonce publique, réseaux sociaux et infolettre", cat: "marketing" },
      { id: "m-visuels", titre: "Produire les visuels de l'arrêt, écusson avec ville et format", cat: "marketing" },
      { id: "m-photoamb", titre: "Photo et texte de l'ambassadeur pour la page", cat: "marketing" },
      { id: "m-videocause", titre: "Capsule ou mot de l'organisme sur la cause", cat: "marketing" },
      { id: "m-medias", titre: "Approcher les médias locaux et les radios communautaires", cat: "marketing" },
      { id: "m-clubs", titre: "Contacter les clubs de course et les boutiques de sport de la ville", cat: "marketing" },
      { id: "m-commrelance", titre: "Relancer les commanditaires locaux", cat: "commandites" },
      { id: "m-commsign", titre: "Signer les ententes de commandite", cat: "commandites" },
      { id: "m-commlogos", titre: "Récupérer les logos vectoriels des commanditaires", cat: "commandites" },
      { id: "m-corpo", titre: "Démarcher les blocs corporatifs auprès des entreprises locales", cat: "commandites" },
      { id: "m-merch", titre: "Commander le merch, écussons et chandails de l'arrêt", cat: "materiel", note: "Prévoir 6 semaines de production" },
      { id: "m-benevoles", titre: "Lancer le recrutement de bénévoles", cat: "benevoles", note: "Compter 1 bénévole par 15 participants, minimum 4" },
    ],
  },
  {
    id: "logistique",
    nom: "Logistique",
    quand: "1 mois avant",
    items: [
      { id: "l-menu", titre: "Arrêter le menu de groupe et le prix par personne", cat: "repas" },
      { id: "l-allergies", titre: "Prévoir les options végé, sans gluten et les allergies", cat: "repas" },
      { id: "l-cafe", titre: "Confirmer le café en continu et son mode de facturation", cat: "repas" },
      { id: "l-eau", titre: "Organiser le point d'eau et les collations entre les boucles", cat: "repas" },
      { id: "l-depart", titre: "Définir précisément la ligne de départ et d'arrivée", cat: "parcours" },
      { id: "l-signal", titre: "Choisir le signal de départ, cloche ou corne", cat: "materiel" },
      { id: "l-affichage", titre: "Produire l'affichage du parcours et les flèches de virage", cat: "materiel" },
      { id: "l-tableau", titre: "Préparer le tableau de comptage des boucles", cat: "materiel" },
      { id: "l-dossards", titre: "Imprimer les dossards ou les bracelets numérotés", cat: "materiel" },
      { id: "l-secours", titre: "Prévoir la trousse de premiers soins et qui la gère", cat: "securite" },
      { id: "l-urgence", titre: "Écrire le plan d'urgence et la liste des numéros", cat: "securite" },
      { id: "l-meteo", titre: "Décider du plan B en cas de météo extrême", cat: "securite" },
      { id: "l-benroles", titre: "Assigner les rôles de bénévoles et les quarts", cat: "benevoles" },
      { id: "l-benbrief", titre: "Envoyer le briefing écrit aux bénévoles", cat: "benevoles" },
      { id: "l-photo", titre: "Confirmer le photographe ou le vidéaste", cat: "marketing" },
      { id: "l-stationnement", titre: "Communiquer le stationnement et le transport en commun", cat: "lieu" },
    ],
  },
  {
    id: "semaine",
    nom: "Semaine de l'arrêt",
    quand: "7 jours avant",
    items: [
      { id: "s-nombre", titre: "Envoyer le nombre final de repas au lieu partenaire", cat: "repas" },
      { id: "s-courriel", titre: "Courriel aux participants, horaire, adresse, quoi apporter", cat: "marketing" },
      { id: "s-frontale", titre: "Rappeler la frontale et les vêtements réfléchissants", cat: "securite", note: "Sunset et Full seulement" },
      { id: "s-chaises", titre: "Rappeler d'apporter une chaise pliante", cat: "marketing" },
      { id: "s-parcoursfinal", titre: "Refaire la boucle une dernière fois, vérifier les travaux de rue", cat: "parcours" },
      { id: "s-materielcheck", titre: "Vérifier et charger tout le matériel", cat: "materiel" },
      { id: "s-benconfirm", titre: "Confirmation finale de chaque bénévole", cat: "benevoles" },
      { id: "s-meteocheck", titre: "Suivre la météo et décider du plan B", cat: "securite" },
      { id: "s-caisse", titre: "Préparer le flottant, le terminal de paiement et les dons sur place", cat: "finances" },
      { id: "s-orgpresence", titre: "Confirmer si quelqu'un de l'organisme vient dire un mot", cat: "cause" },
    ],
  },
  {
    id: "jour",
    nom: "Le jour de l'arrêt",
    quand: "Jour J",
    items: [
      { id: "j-arrivee", titre: "Arriver 2 heures avant le premier départ", cat: "materiel" },
      { id: "j-balisage", titre: "Baliser le parcours au complet", cat: "parcours" },
      { id: "j-accueil", titre: "Monter la table d'accueil et l'affichage", cat: "materiel" },
      { id: "j-decharges", titre: "Faire signer les décharges à l'arrivée", cat: "legal" },
      { id: "j-brief", titre: "Briefing des participants avant le premier départ", cat: "securite", note: "Parcours, sécurité, on arrête quand on veut" },
      { id: "j-motcause", titre: "Mot de l'ambassadeur et de l'organisme", cat: "cause" },
      { id: "j-comptage", titre: "Tenir le comptage des boucles à chaque heure", cat: "benevoles" },
      { id: "j-cafe", titre: "Garder le café et l'eau approvisionnés", cat: "repas" },
      { id: "j-contenu", titre: "Capter les photos et les vidéos pendant la journée", cat: "marketing" },
      { id: "j-logos", titre: "Vérifier que les visuels des commanditaires sont visibles", cat: "commandites" },
      { id: "j-repas", titre: "Annoncer le repas et rassembler tout le monde", cat: "repas" },
      { id: "j-total", titre: "Annoncer le total amassé pour la cause", cat: "cause" },
      { id: "j-demontage", titre: "Démonter, récupérer le balisage, laisser le lieu propre", cat: "lieu" },
    ],
  },
  {
    id: "apres",
    nom: "Après",
    quand: "Dans les 2 semaines",
    items: [
      { id: "a-merci", titre: "Courriel de remerciement aux participants avec les chiffres", cat: "marketing" },
      { id: "a-album", titre: "Publier l'album photo et les capsules", cat: "marketing" },
      { id: "a-bilanpage", titre: "Ajouter le bilan sur la page de l'arrêt", cat: "marketing", note: "Champ bilan dans content/arrets.ts" },
      { id: "a-don", titre: "Confirmer avec l'organisme le montant total reçu", cat: "cause" },
      { id: "a-recu", titre: "Vérifier que les reçus de charité ont été émis par l'organisme", cat: "cause" },
      { id: "a-commrapport", titre: "Envoyer le rapport de visibilité à chaque commanditaire", cat: "commandites" },
      { id: "a-lieufacture", titre: "Régler la facture du lieu partenaire", cat: "finances" },
      { id: "a-benmerci", titre: "Remercier les bénévoles personnellement", cat: "benevoles" },
      { id: "a-compta", titre: "Fermer les chiffres réels et les comparer au calculateur", cat: "finances" },
      { id: "a-lecons", titre: "Rencontre de bilan avec l'ambassadeur, noter ce qui a cloché", cat: "ambassadeur" },
      { id: "a-prochain", titre: "Demander à l'ambassadeur s'il repart l'an prochain", cat: "ambassadeur" },
      { id: "a-recrut", titre: "Identifier les participants qui pourraient porter une autre ville", cat: "ambassadeur" },
    ],
  },
];

/** Ce qui monte dans le camion. Coché séparément le jour du départ. */
export const materiel: { groupe: string; items: { id: string; titre: string; note?: string }[] }[] = [
  {
    groupe: "Départ et parcours",
    items: [
      { id: "x-cloche", titre: "Cloche ou corne de départ" },
      { id: "x-arche", titre: "Bannière ou arche de départ" },
      { id: "x-fleches", titre: "Flèches de virage et balises" },
      { id: "x-cones", titre: "Cônes" },
      { id: "x-craie", titre: "Craie de trottoir" },
      { id: "x-ruban", titre: "Ruban de signalisation" },
      { id: "x-lampes", titre: "Lampes de chantier pour les sections sombres" },
    ],
  },
  {
    groupe: "Accueil",
    items: [
      { id: "x-table", titre: "Table pliante et nappe BYRC" },
      { id: "x-dossards", titre: "Dossards ou bracelets numérotés" },
      { id: "x-epingles", titre: "Épingles à dossard" },
      { id: "x-liste", titre: "Liste des inscrits, papier et numérique" },
      { id: "x-decharges", titre: "Décharges imprimées et crayons" },
      { id: "x-tableau", titre: "Tableau de comptage des boucles et marqueurs" },
      { id: "x-horloge", titre: "Horloge ou minuterie visible de loin" },
    ],
  },
  {
    groupe: "Confort",
    items: [
      { id: "x-chaises", titre: "Chaises pliantes de réserve" },
      { id: "x-abri", titre: "Abri ou tente 10x10" },
      { id: "x-glaciere", titre: "Glacière, glace et eau" },
      { id: "x-collations", titre: "Collations, bananes, barres, sel" },
      { id: "x-verres", titre: "Verres réutilisables ou gourdes" },
      { id: "x-poubelles", titre: "Poubelles et bacs de recyclage" },
    ],
  },
  {
    groupe: "Sécurité",
    items: [
      { id: "x-trousse", titre: "Trousse de premiers soins" },
      { id: "x-frontales", titre: "Frontales de réserve et piles" },
      { id: "x-dossardsrefl", titre: "Dossards réfléchissants de réserve" },
      { id: "x-urgence", titre: "Feuille des contacts d'urgence" },
      { id: "x-couverture", titre: "Couvertures de survie" },
    ],
  },
  {
    groupe: "Technique",
    items: [
      { id: "x-batterie", titre: "Batteries externes et câbles" },
      { id: "x-terminal", titre: "Terminal de paiement" },
      { id: "x-flottant", titre: "Flottant en argent comptant" },
      { id: "x-rallonge", titre: "Rallonge électrique" },
      { id: "x-hautparleur", titre: "Haut-parleur portatif" },
      { id: "x-camera", titre: "Appareil photo, cartes mémoire, batteries" },
    ],
  },
  {
    groupe: "Marque",
    items: [
      { id: "x-banderoles", titre: "Banderoles BYRC" },
      { id: "x-commandites", titre: "Visuels des commanditaires" },
      { id: "x-merch", titre: "Merch à vendre, écussons et chandails" },
      { id: "x-cause", titre: "Matériel fourni par l'organisme" },
      { id: "x-qr", titre: "Affiche avec le code QR de don" },
    ],
  },
];

export const totalItems = checklist.reduce((n, p) => n + p.items.length, 0);
export const totalMateriel = materiel.reduce((n, g) => n + g.items.length, 0);
