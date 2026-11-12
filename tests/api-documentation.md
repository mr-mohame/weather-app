# Documentation de l'API — Weather App

## 1. Présentation de l'API Open-Meteo

Le projet Weather App utilise **Open-Meteo**, une API météo publique qui permet de récupérer des informations météorologiques à partir des coordonnées géographiques d'une ville.

L'application utilise deux services :

- **Geocoding API** : rechercher une ville et récupérer ses coordonnées géographiques.
- **Weather Forecast API** : récupérer les conditions météorologiques actuelles et les prévisions quotidiennes.

Site officiel : https://open-meteo.com/

## 2. Endpoints utilisés

### 2.1 Geocoding API

**Endpoint :**

```text
https://geocoding-api.open-meteo.com/v1/search
```

**Méthode HTTP :** GET

**Objectif :**

Rechercher une ville à partir de son nom et récupérer les informations nécessaires pour identifier sa position géographique.

**Paramètres utilisés :**

| Paramètre | Description | Exemple |
|---|---|---|
| `name` | Nom de la ville recherchée | Taza |
| `count` | Nombre maximum de résultats | 10 |
| `language` | Langue des résultats | fr |
| `format` | Format de la réponse | json |
| `countryCode` | Code ISO du pays | MA |

**Exemple de requête :**

```text
https://geocoding-api.open-meteo.com/v1/search?name=Taza&count=10&language=fr&format=json&countryCode=MA
```

**Exemple de données récupérées :**

```json
{
  "results": [
    {
      "name": "Taza",
      "latitude": 34.206882,
      "longitude": -3.9676573,
      "country": "Maroc"
    }
  ]
}
```

Les coordonnées `latitude` et `longitude` sont ensuite utilisées pour demander les données météorologiques.

### 2.2 Weather Forecast API

**Endpoint :**

```text
https://api.open-meteo.com/v1/forecast
```

**Méthode HTTP :** GET

**Objectif :**

Récupérer les conditions météorologiques actuelles et les prévisions des cinq prochains jours.

Cette API est utilisée pour deux types de données.

#### A. Conditions météorologiques actuelles

**Paramètres utilisés :**

| Paramètre | Description |
|---|---|
| `latitude` | Latitude de la ville |
| `longitude` | Longitude de la ville |
| `current` | Variables météorologiques actuelles |
| `timezone` | Fuseau horaire |

Variables demandées dans `current` :

- `temperature_2m`
- `relative_humidity_2m`
- `weather_code`
- `wind_speed_10m`

**Exemple de requête :**

```text
https://api.open-meteo.com/v1/forecast?latitude=34.206882&longitude=-3.9676573&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Africa%2FCasablanca
```

#### B. Prévisions météorologiques quotidiennes

**Paramètres utilisés :**

| Paramètre | Description |
|---|---|
| `latitude` | Latitude de la ville |
| `longitude` | Longitude de la ville |
| `daily` | Variables des prévisions quotidiennes |
| `forecast_days` | Nombre de jours demandés |
| `timezone` | Fuseau horaire |

Variables demandées dans `daily` :

- `temperature_2m_max`
- `temperature_2m_min`
- `weather_code`

**Exemple de requête :**

```text
https://api.open-meteo.com/v1/forecast?latitude=34.206882&longitude=-3.9676573&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=5&timezone=Africa%2FCasablanca
```

## 3. Fonctionnement des requêtes API

Le fonctionnement de l'application suit ces étapes :

1. L'utilisateur saisit le nom d'une ville.
2. JavaScript envoie une requête à la Geocoding API.
3. L'API retourne les coordonnées géographiques.
4. L'application utilise ces coordonnées pour interroger la Weather Forecast API.
5. Les données JSON sont récupérées avec `response.json()`.
6. JavaScript transforme les données et les affiche dans le DOM.

## 4. Limites de l'API

La version gratuite d'Open-Meteo est destinée à un usage non commercial et possède des limites de requêtes.

### Limites d'utilisation

| Limite | Nombre de requêtes |
|---|---:|
| Par minute | 600 |
| Par heure | 5 000 |
| Par jour | Moins de 10 000 |
| Par mois | 300 000 |

Ces limites sont susceptibles d'évoluer. Il faut consulter les conditions officielles d'Open-Meteo pour connaître les règles à jour.

### Données disponibles

L'application utilise uniquement les variables nécessaires à ses fonctionnalités :

- Température actuelle.
- Humidité relative.
- Code météo.
- Vitesse du vent.
- Températures minimales et maximales quotidiennes.
- Dates des prévisions.

La disponibilité et la précision des données peuvent varier selon les modèles météorologiques, les régions et les périodes.

### Comment respecter ces limites ?

Pour éviter les requêtes inutiles :

- Les requêtes sont déclenchées lors d'une recherche effectuée par l'utilisateur.
- L'application ne lance pas de requêtes en continu.
- Seules les variables nécessaires sont demandées.
- Les erreurs HTTP, notamment le statut `429`, sont prises en charge.
- Le bouton « Réessayer » permet à l'utilisateur de relancer une recherche en cas d'erreur.

## 5. Exemple simplifié de réponse JSON

### 5.1 Conditions actuelles

Voici un exemple simplifié de réponse de la Weather Forecast API :

```json
{
  "current": {
    "temperature_2m": 23.3,
    "relative_humidity_2m": 63,
    "weather_code": 1,
    "wind_speed_10m": 19.9
  }
}
```

### 5.2 Prévisions quotidiennes

```json
{
  "daily": {
    "time": [
      "2026-11-12",
      "2026-11-13",
      "2026-11-14"
    ],
    "temperature_2m_max": [24.4, 20.7, 21.0],
    "temperature_2m_min": [13.2, 11.5, 12.0],
    "weather_code": [1, 3, 2]
  }
}
```

*Les valeurs sont des exemples simplifiés pour expliquer la structure des réponses.*

## 6. Affichage des données dans le DOM

Après réception des données, JavaScript utilise les propriétés des objets JSON pour remplir les éléments HTML.

### 6.1 Affichage des conditions actuelles

| Donnée API | Élément HTML | Affichage |
|---|---|---|
| `temperature_2m` | `#temperature` | 23.3 °C |
| `relative_humidity_2m` | `#humidite` | 63 % |
| `weather_code` | `#meteo-icon` et `#meteo-description` | Icône et description |
| `wind_speed_10m` | `#vitesse-vent` | 19.9 km/h |

Les valeurs sont insérées dans les éléments HTML grâce à la propriété `textContent`.

### 6.2 Conversion des codes météo

L'application utilise un objet de correspondance `WEATHER_CODES`, défini dans `utils.js`.

Cet objet associe chaque code météo à une description et à une icône.

Exemple simplifié :

```js
const WEATHER_CODES = {
    0: {
        label: "Ciel dégagé",
        icon: "☀️"
    },
    1: {
        label: "Principalement dégagé",
        icon: "🌤️"
    },
    2: {
        label: "Partiellement nuageux",
        icon: "⛅"
    },
    3: {
        label: "Couvert",
        icon: "☁️"
    }
};
```

Lors de l'affichage, JavaScript recherche le code météo correspondant dans cet objet afin de récupérer l'icône et la description.

### 6.3 Affichage des prévisions

Les données quotidiennes sont organisées sous forme de tableaux.

Chaque index correspond à une même journée.

| Donnée | Utilisation |
|---|---|
| `daily.time[i]` | Date de la prévision |
| `daily.temperature_2m_max[i]` | Température maximale |
| `daily.temperature_2m_min[i]` | Température minimale |
| `daily.weather_code[i]` | Icône et description météo |

JavaScript utilise une boucle pour parcourir les données et créer dynamiquement les cartes de prévisions avec `document.createElement()` et `appendChild()`.

Les dates sont formatées en français avec `toLocaleDateString("fr-FR")`.

## 7. Gestion des erreurs API

L'application utilise `try`, `catch` et `finally` pour gérer les erreurs lors des requêtes.

Les principales situations prises en charge sont :

| Situation | Comportement |
|---|---|
| Ville introuvable | Afficher un message d'erreur |
| Erreur réseau | Signaler l'impossibilité de contacter le serveur |
| HTTP 400 | Erreur de requête |
| HTTP 401 / 403 | Erreur d'autorisation |
| HTTP 404 | Ressource introuvable |
| HTTP 429 | Limite de requêtes atteinte |
| HTTP 500 / 502 / 503 / 504 | Erreur ou indisponibilité du serveur |

Un bouton « Réessayer » permet de relancer la dernière recherche.

## 8. Sécurité et clé API

L'application utilise les endpoints publics gratuits d'Open-Meteo.

Aucune clé API n'est nécessaire pour cet usage non commercial.

Aucune clé API secrète n'est donc stockée dans le dépôt GitHub.

## 9. Liens vers la documentation officielle

- Geocoding API : https://open-meteo.com/en/docs/geocoding-api
- Weather Forecast API : https://open-meteo.com/en/docs
- Pricing et limites : https://open-meteo.com/en/pricing
- Conditions d'utilisation : https://open-meteo.com/en/terms

---

**Projet :** Weather App

**API :** Open-Meteo

**Technologies :** HTML, Tailwind CSS et JavaScript

**Auteur :** Projet réalisé dans le cadre de l'apprentissage du développement Front-End.