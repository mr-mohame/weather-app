## 1. Présentation d'Open-Meteo

[Open-Meteo](https://open-meteo.com/) est une plateforme qui fournit des données météorologiques à travers des API accessibles aux développeurs.

Elle permet de récupérer la météo actuelle ainsi que les prévisions météorologiques au format JSON.

Dans notre projet Weather App, nous utilisons deux API principales :

- **Geocoding API :** rechercher une ville et récupérer ses coordonnées géographiques (latitude et longitude).
- **Weather Forecast API :** récupérer les données météorologiques à partir des coordonnées de la ville.

Ces API sont consommées avec JavaScript et Fetch API.

## 3. Justification du choix de l'API

Nous avons choisi **Open-Meteo** pour notre projet Weather App grâce à ses nombreux avantages :

- API gratuite pour une utilisation non commerciale.
- Aucune clé API ni inscription nécessaire.
- Réponses au format JSON via des requêtes HTTP GET.
- Données météo actuelles et prévisions horaires et quotidiennes.
- Geocoding API pour rechercher les villes.
- Intégration facile avec JavaScript et Fetch API.

## 3. Documentation du Geocoding API

Le **Geocoding API** permet de rechercher une ville par son nom et de récupérer ses coordonnées géographiques (latitude et longitude).

### Endpoint

```http
https://geocoding-api.open-meteo.com/v1/search
```

### Paramètres

| Paramètre | Description | Exemple |
|---|---|---|
| `name` | Nom de la ville (obligatoire) | Casablanca |
| `count` | Nombre de résultats (1 à 100) | 5 |
| `language` | Langue des résultats | fr |
| `format` | Format de réponse | json |
| `countryCode` | Filtrer par code pays | MA |

### Exemple de requête

```http
https://geocoding-api.open-meteo.com/v1/search?name=Casablanca&count=5&language=fr&format=json
```

### Exemple de réponse JSON

```json
{
  "results": [
    {
      "name": "Taza",
      "latitude": 34.21,
      "longitude": -4.01,
      "country": "Morocco",
      "country_code": "MA",
      "timezone": "Africa/Casablanca"
    }
  ]
}
```

*Exemple illustratif.*

### Données utilisées

- `name` : nom de la ville.
- `latitude` : latitude.
- `longitude` : longitude.
- `country` : pays.

**Utilisation dans le projet :** les coordonnées récupérées sont utilisées pour effectuer une deuxième requête vers le Weather Forecast API.