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
        console.error(erreur);
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

    // console.log(weather);
    // cree la carte
    const carte = document.createElement("div");
    carte.classList.add("w-full", "max-w-2xl", "mx-auto", "bg-gradient-to-br", "from-sky-400", "to-blue-600", "p-6", "rounded-2xl", "shadow-md", "text-center");

    const titer = document.createElement("h2");
    titer.classList.add("text-2xl", "font-bold", "mb-4", "tracking-wider");
    titer.textContent = ville + " Maroc";

    const icone = document.createElement("p");
    icone.classList.add("text-5xl")
    icone.textContent = weather.icon;

    const temp = document.createElement("p");
    temp.classList.add("text-4xl", "font-bold", "text-yellow-300")
    temp.textContent = current.temperature_2m + " °C";

    const description = document.createElement("p");
    description.classList.add("text-xl", "mb-5")
    description.textContent = weather.label;

    const informatins = document.createElement("div");
    informatins.classList.add("flex", "gap-4", "w-full", "mt-8")

    const hum_block = document.createElement("div");
    hum_block.classList.add("flex-1", "basis-0", "h-40", "flex", "flex-col", "items-center", "justify-center", "border", "border-blue-100", "rounded-xl", "p-3", "text-center")

    const hum_titre = document.createElement("p");
    hum_titre.classList.add("m-1", "font-bold", "text-[25px]")
    hum_titre.textContent = "💧 Humidite";

    const hum_Valeur = document.createElement("p");
    hum_Valeur.classList.add("m-1", "font-bold", "text-[18px]")
    hum_Valeur.textContent = current.relative_humidity_2m + " %";

    hum_block.append(hum_titre, hum_Valeur);

    const vent_block = document.createElement("div");
    vent_block.classList.add("flex-1", "basis-0", "h-40", "flex", "flex-col", "items-center", "justify-center", "border", "border-blue-100", "rounded-xl", "p-3", "text-center")

    const vent_titre = document.createElement("p");
    vent_titre.classList.add("m-1", "font-bold", "text-[25px]")
    vent_titre.textContent = "💨 Vitess du vente";

    const vent_valeur = document.createElement("p");
    vent_valeur.classList.add("m-1", "font-bold", "text-[18px]")
    vent_valeur.textContent = current.wind_speed_10m + " km/h";
    
    vent_block.append(vent_titre, vent_valeur);
    
    
    informatins.append(hum_block, vent_block);
    carte.append(titer, icone, temp, description, informatins);
    carte_meteo.replaceChildren(carte);
    
     // Afficher la carte
    carte_meteo.classList.remove("hidden");
}
    
   