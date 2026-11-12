# Weather App

Une application météo web responsive qui permet de rechercher une ville et de consulter ses conditions météorologiques actuelles ainsi que les prévisions des prochains jours.

Le projet utilise l'API publique **Open-Meteo** pour récupérer les données météorologiques, sans nécessiter de backend.

## Objectif du projet

Développer une application météo simple et intuitive afin de pratiquer :

- La consommation d'une API REST avec JavaScript.
- Les requêtes HTTP avec `fetch()`.
- La programmation asynchrone avec `async/await`.
- La manipulation du DOM.
- La gestion des erreurs.
- L'organisation du code JavaScript en modules.
- L'utilisation de Git et GitHub.

## Fonctionnalités

-  **Recherche de ville** : rechercher une ville pour obtenir ses informations météorologiques.
-  **Conditions actuelles** : afficher la température, la description météo, l'humidité et la vitesse du vent.
-  **Prévisions météorologiques** : consulter les prévisions des cinq prochains jours.
-  **Gestion des erreurs** : afficher des messages adaptés en cas de ville introuvable, d'erreur réseau ou de problème avec l'API.
-  **Réessayer** : relancer la dernière recherche en cas d'erreur.
-  **Design responsive** : adapter l'affichage aux différentes tailles d'écran.

## 🛠️ Technologies utilisées

- HTML5
- Tailwind CSS
- JavaScript DOM
- API Open-Meteo
- Git et GitHub
- Trello pour la gestion des tâches

## API utilisée

Le projet utilise l'API gratuite [Open-Meteo](https://open-meteo.com/).

Deux services principaux sont utilisés :

### 1. Geocoding API

Permet de rechercher une ville et de récupérer ses coordonnées géographiques.

**Endpoint :**
```text
https://geocoding-api.open-meteo.com/v1/search
```

**Paramètres principaux :**
- `name` : nom de la ville recherchée.
- `count` : nombre de résultats souhaités.
- `language` : langue des résultats.
- `countryCode` : code du pays.

### 2. Weather Forecast API

Permet de récupérer les conditions météorologiques actuelles et les prévisions.

**Endpoint :**
```text
https://api.open-meteo.com/v1/forecast
```

**Paramètres utilisés :**
- `latitude` : latitude de la ville.
- `longitude` : longitude de la ville.
- `current` : données météorologiques actuelles.
- `daily` : prévisions quotidiennes.
- `forecast_days` : nombre de jours de prévision.
- `timezone` : fuseau horaire.

## Données météorologiques affichées

### Conditions actuelles

- Température (`temperature_2m`)
- Humidité relative (`relative_humidity_2m`)
- Code météo (`weather_code`)
- Vitesse du vent (`wind_speed_10m`)

### Prévisions quotidiennes

- Date (`time`)
- Température maximale (`temperature_2m_max`)
- Température minimale (`temperature_2m_min`)
- Code météo (`weather_code`)

Les codes météo sont convertis en descriptions et icônes grâce à un objet de correspondance défini dans `utils.js`.

## Gestion des erreurs

L'application prend en compte plusieurs situations :

- Champ de recherche vide.
- Ville introuvable.
- Erreur de connexion Internet.
- Réponse HTTP incorrecte.
- Limitation du nombre de requêtes API.
- Indisponibilité du service.
- Erreur inattendue.

Un bouton « Réessayer » permet de relancer la dernière recherche.

## Structure du projet

```text
weather-app/
│
├──  screenshots/
│   ├── test-01-recherche.png
│   ├── test-02-ville-introuvable.png
│   ├── test-03-previsions.png
│   └── test-04-erreur-reseau.png
│
├── js/
│   ├── scripts.js
│   ├── api.js
│   └── utils.js
│
├── tests/
│   ├── api-documentation.md
│   └── test-manuel.md
│
├── index.html   
├── README.md
│
└── ...
```
screenshots/

- `index.html` : structure HTML de l'application.
- `scripts.js` : gestion des événements et affichage des données dans le DOM.
- `api.js` : communication avec les API Open-Meteo.
- `utils.js` : fonctions utilitaires, notamment la correspondance des codes météo et la gestion des erreurs.
- `api-documentation.md` : Documentation de l’intégration API.
- `test-manuel.md` :  les tests manuels effectués sur l'application Weather App 
- `README.md` : documentation du projet.

## Installation et lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/mr-mohame/weather-app.git
```

### 2. Accéder au dossier

```bash
cd weather-app
```

### 3. Lancer le projet

Ouvrir le fichier `index.html` avec un serveur de développement local, par exemple l'extension **Live Server** de VS Code.

## Limites du projet

- L'application dépend d'une connexion Internet pour récupérer les données.
- Les informations affichées dépendent de la disponibilité de l'API.
- Les résultats de recherche sont limités aux villes reconnues par le service de géocodage.
- Les données météorologiques sont fournies par Open-Meteo et peuvent évoluer.
- Le projet ne possède pas de backend ni de base de données.

Pour les conditions d'utilisation et les éventuelles limites de requêtes, consulter la [documentation officielle Open-Meteo](https://open-meteo.com/en/docs).

## Auteur

Projet réalisé dans le cadre de mon apprentissage du développement Front-End, avec JavaScript et la consommation d'API.

**GitHub :** [mr-mohame](https://github.com/mr-mohame)

---


