// donne ce function on communiquer avec API 
// pour recupere les informatins de la ville saise.
export async function rechercherVille(ville) {
    //encodeURIComponent : cest tu une function bien definie en js
    //  qui transforme le text et utilise dans une url
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ville)}&count=10&language=fr&format=json&countryCode=MA`;
    // fetch
    const response = await fetch(url);   // pour envoyer la requete
    // on verifie cest ces reponse http 
    if (!response.ok) {
        throw new Error("erreur API")
    }
    const data = await response.json();  // pour recuperer les donnees

    console.log(data);    // pour afficher les donnnes
    return data;     // pour retourne les donnees

}

// cette function recevoir les cordonne et les informations meteo
export async function obtenirMeteo(latitude, longitude) {
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Africa%2FCasablanca`;
    // console.log(URL)
    try {
        const response = await fetch(URL);
        // console.log(response);

        if (!response.ok) {
            const erreur = new Error("erreur API meteo");
            erreur.status = response.status;
            throw erreur;
        }

        const data = await response.json();
        // console.log(data);
        return data;

    } catch (error) {
        console.log("erreur :", error);
        throw error;

    }
}

export async function obtenirPrevisions(latitude, longitude) {

    const urlPrev = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=5&timezone=Africa%2FCasablanca`;
    // console.log(urlPrev)
    try {
        const response = await fetch(urlPrev);

        if (!response.ok) {
            const erreur = new Error("erreur API meteo");
            erreur.status = response.status;
            throw erreur;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("erreur :", error);
        throw error;
    }

}
