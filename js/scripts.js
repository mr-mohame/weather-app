import { rechercherVille, obtenirMeteo } from "./api.js";
import { WEATHER_CODES } from "./utils.js";


const search_form = document.getElementById("form-search");
const input_ville = document.getElementById("input-ville");
const msg_loading = document.getElementById("msg-loading");
const msg_erreur = document.getElementById("msg-erreur");
const btn_search = document.getElementById("btn-search");
const carte_meteo = document.getElementById("carte-meteo");
const ville_name = document.getElementById("ville-name");
const meteo_icone = document.getElementById("meteo-icone");
const temperature = document.getElementById("temperature");
const meteo_description = document.getElementById("meteo-description");
const humidite = document.getElementById("humidite");
const vitesse_vent = document.getElementById("vitesse-vent");

// console.log(search_form, input_ville, msg_loading, msg_erreur, btn_search, carte_meteo, ville_name, meteo_icone, temperature, meteo_description, humidite, vitesse_vent);

search_form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const ville = input_ville.value.trim();
    msg_erreur.classList.add("hidden");

    if (ville === "") {
        alert("saisir une ville");
        return;
    }

    msg_loading.classList.remove("hidden");
    try {
        // appel de fonction afficher 
        const data = await rechercherVille(ville);
        // verifie les resultat
        if (!data.results || data.results.length === 0) {
            msg_erreur.textContent = "Ville introuvable";
            msg_erreur.classList.remove("hidden");
            return;
        }
        console.log(data)
        // recupere latitude et longitud
        const villeTrouve = data.results[0];
        //recupere les coordonnees
        const latitude = villeTrouve.latitude;
        const longitude = villeTrouve.longitude;
        // recupere la mteo
        const meteo = await obtenirMeteo(latitude, longitude);
        afficherMeteo(villeTrouve.name, meteo);
        
    }catch(erreur){
        msg_erreur.textContent = "une erreur ";
        msg_erreur.classList.remove("hidden");

    }finally {
        msg_loading.classList.add("hidden");
        
    }

})

//function affiche les section carte 
function afficherMeteo(ville, meteo) {
    // pour recupere les current d'objet de meteo et stock dans un var appel current 
    const current = meteo.current;

    const weather = WEATHER_CODES[current.weather_code];

    console.log(weather);
    

    // crees les element 
    const icone = document.createElement("span");
    const nom = document.createElement("span");
    const temp = document.createElement("span");
    const hum = document.createElement("span");
    const vent = document.createElement("span");
    const description = document.createElement("span");

    // ajouter les donne 
    
    nom.textContent = ville;
    icone.textContent = weather.icon;
    description.textContent = weather.label;
    temp.textContent = `${current.temperature_2m} °C`;
    hum.textContent = `${current.relative_humidity_2m} %`;
    vent.textContent = `${current.wind_speed_10m} km/h`;

    // ajouter les elemens dans le HTML
    ville_name.replaceChildren(nom); 
    meteo_icone.replaceChildren(icone);
    temperature.replaceChildren(temp);
    meteo_description.replaceChildren(description);
    humidite.replaceChildren(hum);
    vitesse_vent.replaceChildren(vent);

    // Afficher la carte
    carte_meteo.classList.remove("hidden");
}
