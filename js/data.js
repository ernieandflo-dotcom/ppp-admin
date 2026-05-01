// ============================================================
// PPP Tracker — Données du projet
// ============================================================

const PROJECT_DATA = [
  {
    id: 'p1',
    name: 'Phase 1 — Fondation de la présence web',
    color: '#3a79d8',
    groups: [
      {
        id: 'g-gmb',
        name: '1.1 Profil Google My Business',
        tasks: [
          {
            id: 't-gmb-complete',
            name: 'Compléter les détails du profil GMB',
            note: 'Revendiqué ✓ — heures ouverture, services, photos de couverture, description',
            status: 'inprogress',
            hours: 1,
          },
          {
            id: 't-gmb-photos',
            name: 'Mise à jour périodique des photos sur Google',
            note: 'À répéter aux 2–3 mois',
            status: 'todo',
          },
        ],
      },
      {
        id: 'g-bing',
        name: '1.1b Bing Places',
        tasks: [
          {
            id: 't-bing',
            name: 'Créer et revendiquer le profil Bing Places',
            note: 'Publié',
            status: 'done',
            hours: 0.5,
          },
        ],
      },
      {
        id: 'g-sitemap',
        name: '1.2 Sitemap & robots.txt',
        tasks: [
          {
            id: 't-sitemap',
            name: 'Écrire et uploader le sitemap.xml',
            status: 'todo',
          },
          {
            id: 't-robots',
            name: 'Écrire et uploader le robots.txt',
            status: 'todo',
          },
        ],
      },
      {
        id: 'g-balises',
        name: '1.4 Balises H et navigation',
        tasks: [
          {
            id: 't-h1',
            name: 'Enrichir les H1 — Accueil, Services, À propos, Contact',
            status: 'done',
            hours: 1,
          },
          {
            id: 't-h2-qc',
            name: 'H2 — ajouter "Québec" où pertinent',
            status: 'done',
          },
          {
            id: 't-h2-services',
            name: 'H2 — renommer "Autres services" → "Pose de papiers peints et faux-finis à Québec"',
            status: 'done',
          },
          {
            id: 't-h3-francois',
            name: 'H3 → H2 — déplacer "François Poirier" (page À propos)',
            status: 'done',
          },
          {
            id: 't-meta',
            name: 'Ajuster les meta titles sur toutes les pages',
            status: 'inprogress',
          },
          {
            id: 't-nav',
            name: 'Debug navigation active (pointe vers "/")',
            status: 'done',
            hours: 0.5,
          },
        ],
      },
      {
        id: 'g-kw',
        name: '1.5 Mots-clés',
        tasks: [
          {
            id: 't-kw-research',
            name: 'Recherche et sélection des mots-clés prioritaires',
            status: 'done',
            hours: 2,
          },
          {
            id: 't-kw-mapping',
            name: 'Mapping mots-clés / pages du site',
            status: 'inprogress',
          },
        ],
      },
      {
        id: 'g-citations',
        name: '1.6 Citations & plateformes locales',
        tasks: [
          {
            id: 't-pages-jaunes',
            name: 'Pages Jaunes — audit du réseau de distribution',
            status: 'done',
          },
          {
            id: 't-apple',
            name: 'Apple Business Connect — créer / revendiquer',
            status: 'todo',
          },
          {
            id: 't-nextdoor',
            name: 'Nextdoor — créer / revendiquer le profil',
            status: 'todo',
          },
          {
            id: 't-autres-ann',
            name: 'Autres annuaires prioritaires (Yelp, Yellow Pages direct, etc.)',
            status: 'waiting',
          },
        ],
      },
    ],
  },

  {
    id: 'p2',
    name: 'Phase 2 — Mise à jour du contenu du site',
    color: '#2a9d6e',
    groups: [
      {
        id: 'g-menage',
        name: '2.1 Nettoyage du site',
        tasks: [
          {
            id: 't-pages-inutiles',
            name: 'Supprimer pages inutiles et doublons',
            status: 'todo',
          },
        ],
      },
      {
        id: 'g-accueil',
        name: '2.2 Refonte page Accueil',
        tasks: [
          {
            id: 't-accueil-copy',
            name: 'Rédiger nouveau contenu page Accueil',
            status: 'todo',
          },
          {
            id: 't-accueil-pub',
            name: 'Publier les modifications (GitHub)',
            note: 'Dépend de la rédaction du contenu',
            dep: ['t-accueil-copy'],
            status: 'todo',
          },
        ],
      },
      {
        id: 'g-services',
        name: '2.3 Refonte page Services',
        tasks: [
          {
            id: 't-services-copy',
            name: 'Rédiger nouveau contenu page Services',
            status: 'todo',
          },
          {
            id: 't-services-pub',
            name: 'Publier les modifications (GitHub)',
            note: 'Dépend de la rédaction du contenu',
            dep: ['t-services-copy'],
            status: 'todo',
          },
        ],
      },
      {
        id: 'g-articles',
        name: '2.4 Actualités → Articles',
        tasks: [
          {
            id: 't-articles-copy',
            name: 'Écrire le nouveau contenu (articles de blogue)',
            status: 'todo',
          },
          {
            id: 't-articles-imgs',
            name: 'Mettre à jour le descriptif des images',
            status: 'todo',
          },
          {
            id: 't-articles-pub',
            name: 'Publier la page mise à jour (GitHub)',
            dep: ['t-articles-copy'],
            status: 'todo',
          },
        ],
      },
      {
        id: 'g-galeries',
        name: '2.5 Textes pour galeries photos',
        tasks: [
          {
            id: 't-galerie-resid',
            name: 'Rédiger textes galerie résidentielle',
            status: 'todo',
          },
          {
            id: 't-galerie-comm',
            name: 'Rédiger textes galerie commerciale',
            status: 'todo',
          },
        ],
      },
    ],
  },

  {
    id: 'p3',
    name: 'Phase 3 — Pages géolocalisées',
    color: '#b85c1a',
    groups: [
      {
        id: 'g-geo-draft',
        name: 'Brouillons rédigés',
        tasks: [
          {
            id: 't-geo-sfy',
            name: 'Page peintre Ste-Foy',
            note: 'Brouillon avancé complété',
            status: 'inprogress',
            hours: 0.5,
          },
          {
            id: 't-geo-cap',
            name: 'Page peintre Cap-Rouge',
            note: 'Brouillon avancé complété',
            status: 'inprogress',
          },
          {
            id: 't-geo-lim',
            name: 'Page peintre Limoilou',
            note: 'Brouillon avancé complété',
            status: 'inprogress',
          },
        ],
      },
      {
        id: 'g-geo-todo',
        name: 'Pages à rédiger',
        tasks: [
          {
            id: 't-geo-sil',
            name: 'Page peintre Sillery',
            status: 'todo',
          },
          {
            id: 't-geo-char',
            name: 'Page peintre Charlesbourg',
            status: 'todo',
          },
          {
            id: 't-geo-beau',
            name: 'Page peintre Beauport',
            status: 'todo',
          },
          {
            id: 't-geo-ancl',
            name: "Page peintre L'Ancienne-Lorette",
            status: 'todo',
          },
        ],
      },
      {
        id: 'g-geo-pub',
        name: 'Publication',
        tasks: [
          {
            id: 't-geo-revision',
            name: 'Révision finale des brouillons avec le client',
            dep: ['t-geo-sfy', 't-geo-cap', 't-geo-lim'],
            status: 'waiting',
          },
          {
            id: 't-geo-pub-all',
            name: 'Publication sur le site (GitHub)',
            dep: ['t-geo-revision'],
            note: 'Dépend de l\'approbation des brouillons',
            status: 'waiting',
          },
          {
            id: 't-geo-schema',
            name: 'Ajouter Schema LocalBusiness sur chaque page géo',
            note: 'Bonus SEO — après publication',
            dep: ['t-geo-pub-all'],
            status: 'todo',
          },
        ],
      },
    ],
  },

  {
    id: 'p4',
    name: 'Phase 4 — Avis et réputation',
    color: '#7c4dab',
    groups: [
      {
        id: 'g-avis',
        name: '4.1 Gestion des avis Google',
        tasks: [
          {
            id: 't-avis-reponses',
            name: 'Répondre aux avis existants et aux nouveaux avis',
            note: 'Processus établi — continu',
            status: 'inprogress',
          },
          {
            id: 't-avis-strat',
            name: 'Développer une stratégie de sollicitation de nouveaux avis',
            status: 'todo',
          },
        ],
      },
    ],
  },

  {
    id: 'p5',
    name: 'Phase 5 — Optimisation avancée',
    color: '#5a5a5a',
    groups: [
      {
        id: 'g-comm',
        name: '5.1 Communications client',
        tasks: [
          {
            id: 't-comm-templates',
            name: 'Préparer des templates de communications régulières',
            note: 'Infolettres, suivis, confirmations de soumission',
            status: 'todo',
          },
        ],
      },
      {
        id: 'g-ai',
        name: '5.2 Optimisation IA & recherche générative',
        tasks: [
          {
            id: 't-ai-sge',
            name: 'Adapter le contenu pour Google AI Overviews / SGE',
            note: 'Domaine en évolution — veille continue requise',
            status: 'waiting',
          },
          {
            id: 't-ai-schema',
            name: 'Implémenter Schema markup avancé (FAQ, LocalBusiness, Review)',
            status: 'todo',
          },
          {
            id: 't-ai-perplexity',
            name: 'Vérifier l\'indexation sur Perplexity, ChatGPT, Bing Copilot',
            status: 'todo',
          },
        ],
      },
    ],
  },
];

// Lookup rapide par id
const TASK_INDEX = {};
PROJECT_DATA.forEach(p =>
  p.groups.forEach(g =>
    g.tasks.forEach(t => { TASK_INDEX[t.id] = t; })
  )
);
