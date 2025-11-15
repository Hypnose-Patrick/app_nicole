# LingoQuest - Structure du Projet

## Architecture Consolidée

```
app_nicole/
├── index.html                      # Point d'entrée de l'application
├── manifest.json                   # Configuration PWA
├── COMPLETE_SETUP.sh              # Script de setup
├── LINGOQUEST_RECAPITULATIF_COMPLET.md
├── README.md
├── STRUCTURE.md                   # Ce fichier
│
└── src/                           # Code source organisé
    ├── app.js                     # Orchestrateur principal
    │
    ├── data/                      # Données de l'application
    │   ├── modules.js             # 6 modules d'apprentissage
    │   └── badges.js              # 19 badges gamifiés
    │
    ├── utils/                     # Utilitaires
    │   ├── storage.js             # Gestion LocalStorage
    │   ├── dilts-engine.js        # Moteur d'analyse Dilts (caché)
    │   ├── vocal-analyzer.js      # Analyse vocale
    │   └── badge-system.js        # Système de badges
    │
    ├── components/                # Composants UI réutilisables
    │   ├── module-card.js         # Carte de module
    │   ├── lesson-card.js         # Carte de leçon
    │   ├── exercise-card.js       # Carte d'exercice
    │   ├── badge-card.js          # Carte de badge
    │   └── feedback-panel.js      # Panneau de feedback
    │
    ├── pages/                     # Pages de l'application
    │   ├── dashboard.js           # Tableau de bord principal
    │   ├── module-view.js         # Vue d'un module
    │   ├── lesson-view.js         # Vue d'une leçon
    │   ├── exercise-view.js       # Interface d'exercice vocal
    │   ├── progress-view.js       # Statistiques de progression
    │   └── badges-view.js         # Collection de badges
    │
    └── styles/                    # Feuilles de style
        ├── main.css               # Variables CSS + styles de base
        ├── components.css         # Styles des composants
        ├── animations.css         # Animations et transitions
        ├── vocal.css              # Interface d'exercice vocal
        └── badges.css             # Styles des badges
```

## Fichiers Créés (Session Actuelle)

### Utilitaires (src/utils/)
- ✅ `storage.js` - Gestion complète du LocalStorage
- ✅ `dilts-engine.js` - Moteur d'analyse des 6 niveaux logiques (250+ lignes)
- ✅ `badge-system.js` - Logique de déverrouillage des badges

### Composants (src/components/)
- ✅ `module-card.js` - Affichage des modules avec progression
- ✅ `lesson-card.js` - Affichage des leçons
- ✅ `exercise-card.js` - Affichage des exercices
- ✅ `badge-card.js` - Affichage des badges avec progression
- ✅ `feedback-panel.js` - Panneau de feedback post-exercice

### Pages (src/pages/)
- ✅ `dashboard.js` - Page d'accueil avec tous les modules
- ✅ `module-view.js` - Détail d'un module avec ses leçons
- ✅ `lesson-view.js` - Détail d'une leçon avec ses exercices
- ✅ `exercise-view.js` - Interface complète d'exercice vocal
- ✅ `progress-view.js` - Statistiques détaillées
- ✅ `badges-view.js` - Collection complète des badges

### Styles (src/styles/)
- ✅ `main.css` - Variables CSS, reset, utilitaires (400+ lignes)
- ✅ `components.css` - Tous les composants UI (600+ lignes)
- ✅ `animations.css` - Animations et transitions
- ✅ `vocal.css` - Interface d'enregistrement vocal (400+ lignes)
- ✅ `badges.css` - Système de badges (500+ lignes)

### Application
- ✅ `src/app.js` - Orchestrateur principal avec navigation

## Fonctionnalités Implémentées

### 1. Système de Navigation
- Dashboard principal
- Navigation par modules → leçons → exercices
- Breadcrumb avec navigation arrière
- Menu de navigation persistant

### 2. Système de Progression
- Tracking par exercice, leçon, module
- Calcul de progression en %
- Système XP et niveaux
- Streaks quotidiens

### 3. Exercices Vocaux
- Interface d'enregistrement Web Speech API
- Analyse en temps réel (WPM, durée, pauses)
- Feedback multi-dimensionnel via Dilts Engine
- Recommandations personnalisées

### 4. Système de Badges
- 19 badges sur 5 tiers (Bronze → Diamond)
- Progression vers chaque badge
- Modales de déverrouillage animées
- Tracking automatique

### 5. Intelligence Cachée (Dilts)
- 6 niveaux d'analyse : Environnement, Comportement, Capacités, Croyances, Identité, Purpose
- Feedback professionnel sans mention des niveaux
- Recommandations prioritaires
- Score global calculé

### 6. Interface Utilisateur
- Design moderne et responsive
- Mode sombre/clair
- Animations fluides
- Cartes interactives
- Toasts de notification

## Technologies Utilisées

- **HTML5** - Structure
- **CSS3** - Styling (variables CSS, Grid, Flexbox)
- **Vanilla JavaScript** - Logique (ES6+)
- **Web Speech API** - Reconnaissance vocale
- **LocalStorage** - Persistance des données
- **PWA** - Progressive Web App

## Prochaines Étapes

1. ✅ Tester l'application dans un navigateur
2. ✅ Vérifier la reconnaissance vocale
3. ✅ Ajouter plus d'exercices aux modules
4. ✅ Créer des graphiques de progression
5. ✅ Déployer sur GitHub Pages / Netlify

## Notes Importantes

- Le moteur Dilts est **100% caché** de l'utilisateur
- Tous les feedbacks sont en langage professionnel
- Le système est entièrement frontend (pas de backend requis)
- Compatible Chrome, Edge, Safari (pour Speech API)
- Responsive mobile et desktop

---

**Date de création** : 15 Novembre 2025
**Version** : 1.0.0
**Statut** : ✅ Structure complète et consolidée
