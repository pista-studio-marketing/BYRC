# BYRC, Backyard Run Canada

Site bilingue et outil de gestion pour BYRC. Next.js 15, App Router, aucune base de données.

Une boucle, une heure, une ville, une cause.

## Mettre en ligne

### 1. GitHub

```bash
cd byrc-site
git init
git add -A
git commit -m "BYRC, premier jet"
git branch -M main
git remote add origin https://github.com/TON-COMPTE/byrc-site.git
git push -u origin main
```

### 2. Vercel

1. vercel.com, **Add New, Project**, importe le dépôt.
2. Framework détecté: Next.js. Ne change rien.
3. **Deploy**.

En ligne en deux minutes. Chaque `git push` redéploie tout seul.

### 3. Le domaine

Vercel, **Settings, Domains**, ajoute `byrc.ca`. Vercel te donne les
enregistrements DNS à copier chez ton registraire.

## Variables d'environnement

Toutes optionnelles. Vercel, **Settings, Environment Variables**.

| Variable | Ce que ça fait |
|---|---|
| `CONTACT_WEBHOOK` | URL qui reçoit les demandes d'ambassadeur et de partenaire, en JSON. Zapier, Make, Slack, Formspree. Sans elle, les demandes vont dans les logs Vercel. |
| `ADMIN_USER` | Utilisateur pour accéder à `/admin`. |
| `ADMIN_PASS` | Mot de passe pour `/admin`. Tant que les deux ne sont pas définis, la section reste ouverte à tous. |

Mets `ADMIN_USER` et `ADMIN_PASS` avant le premier partage public, puis
redéploie: les variables ne sont lues qu'au déploiement suivant.

La protection de `/admin` vit dans `proxy.ts` à la racine. C'est la convention
Next 16, l'ancien nom `middleware.ts` est déprécié.

## Ajouter un arrêt

Un seul fichier à toucher: `content/arrets.ts`. Copie un bloc, change les
valeurs, pousse. La page de l'arrêt se génère toute seule dans les deux langues.

```ts
{
  slug: "halifax-sunset-2026",
  ville: "Halifax",
  province: "NS",
  format: "sunset",
  date: "2026-09-12T12:00:00-03:00",
  statut: "a-venir",
  inscriptionUrl: "https://raceroster.com/...",
  ...
}
```

`statut` accepte `a-venir`, `complet` ou `passe`. Un arrêt passé peut recevoir
un `bilan` qui affiche les chiffres de la journée.

## Les projets

`/admin/projets`. Une destination par arrêt, avec la checklist complète de
préparation: 76 tâches réparties en sept phases, de la première approche de
l'ambassadeur jusqu'au bilan, plus 34 éléments de matériel à charger dans le
camion.

Chaque tâche accepte une note libre. Tu peux ajouter des tâches propres à un
arrêt sans toucher au code. Pour ajouter une tâche à **tous** les arrêts futurs,
elle va dans `content/checklist.ts`.

L'avancement est gardé dans le navigateur, il n'y a pas de base de données.
Le bouton Exporter sort un fichier JSON que quelqu'un d'autre de l'équipe
réimporte de son bord.

## Le calculateur

`/admin/calculateur`. Trois scénarios qui se recalculent en direct pendant une
rencontre avec un resto ou un commanditaire. Il sort le seuil de rentabilité,
la marge par participant, le net par arrêt et la projection annuelle.

Les dons à la cause n'entrent jamais dans le résultat. Ils transitent
directement vers l'organisme, jamais par BYRC.

## Structure

```
app/[locale]/        pages publiques, fr et en
app/admin/projets/   checklists de préparation par destination
app/admin/calculateur/  modèle financier d'un arrêt
app/api/contact/     réception des formulaires
components/          Loop, Timetable, ContactForm, Calculator, ProjetChecklist
content/             arrets.ts, formats.ts, checklist.ts, dict.ts
public/logo/         exports SVG du symbole
scripts/logo.mjs     régénère les SVG, `node scripts/logo.mjs`
```

## Local

```bash
npm install
npm run dev
```

http://localhost:3000
