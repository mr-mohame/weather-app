// donne ce function on communiquer avec API 
// pour recupere les informatins de la ville saise.
export async function rechercherVille(ville) {
    //encodeURIComponent : cest tu une function bien definie en js
    //  qui transforme le text et utilise dans une url
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ville)}&count=10&language=fr&format=json&countryCode=MA`;
    // fetch
    const response = await fetch(url);   // pour envoyer la requete
    const data = await response.json();  // pour recuperer les donnees
    console.log(data);    // pour afficher les donnnes
    return data;     // pour retourne les donnees
    
}

// export async function (params) {
    
// }