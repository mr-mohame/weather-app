import { rechercherVille, obtenirMeteo, obtenirPrevisions } from "./api.js";
import { WEATHER_CODES, gestionErreur } from "./utils.js";


const search_form = document.getElementById("form-search");
const input_ville = document.getElementById("input-ville");
const msg_loading = document.getElementById("msg-loading");
const msg_erreur = document.getElementById("msg-erreur");
// console.log(msg_erreur);
const btn_search = document.getElementById("btn-search");
const carte_meteo = document.getElementById("carte-meteo");
const ville_name = document.getElementById("ville-name");
const meteo_icone = document.getElementById("meteo-icone");
const temperature = document.getElementById("temperature");
const meteo_description = document.getElementById("meteo-description");
const humidite = document.getElementById("humidite");
const vitesse_vent = document.getElementById("vitesse-vent");
const liste_previsions = document.getElementById("liste-previsions");
// ajouter la btn reessayer
const btn_reessayer = document.getElementById("btn-reessayer")

// console.log(search_form, input_ville, msg_loading, msg_erreur, btn_search, carte_meteo, ville_name, meteo_icone, temperature, meteo_description, humidite, vitesse_vent);
// pour enregister la dernier recherche
let derniereVille = "";
//
search_form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const ville = input_ville.value.trim();

    // masquer le msg erreur
    msg_erreur.classList.add("hidden");
    // masquer le btn reessayer
    btn_reessayer.classList.add("hidden");

    if (ville === "") {
        alert("saisir une ville");
        return;
    }
    carte_meteo.classList.add("hidden");
    liste_previsions.classList.add("hidden");
    //pour enregistrer derniere ville recherchee
    derniereVille = ville;
    // masquer le msg de chargemment
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
        // recupere la meteo
        const meteo = await obtenirMeteo(latitude, longitude);

        // recupere la previsions daily
        const previsions = await obtenirPrevisions(latitude, longitude);
        // console.log(previsions.daily);
        
        // appel function (api)
        afficherMeteo(villeTrouve.name, meteo);
        afficherPrevisions(previsions);

    } catch (erreur) {
        console.error(erreur);
        // console.log("dans catch");
         
        // appel function (utils)
        gestionErreur(erreur, msg_erreur);

        btn_reessayer.classList.remove("hidden");
        console.log(btn_reessayer);


    } finally {
        msg_loading.classList.add("hidden");
       

    }
});
// pour affiche le btn ressaayer 
btn_reessayer.addEventListener("click", function () {
    input_ville.value = derniereVille;
    btn_search.click();
});

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

// function pour ajouter des carte  pour les prochains 5 jours 
function afficherPrevisions(previsions) {
    const daily = previsions.daily;
    const liste = document.getElementById("liste-previsions");

    liste.replaceChildren();

    for (let i = 0; i < daily.time.length; i++) {

        const weather = WEATHER_CODES[daily.weather_code[i]];


        // 1. creer la carte
        const carte = document.createElement("div");
        carte.classList.add("bg-white", "rounded-2xl", "p-5", "flex", "flex-col", "items-center", "justify-between", "w-48", "h-50", "shrink-0", "text-center", "border", "border-black", "hover:shadow-xl")

        const jour = document.createElement("span");
        const date = new Date(daily.time[i] + "T12:00:00");
        jour.classList.add("text-sm", "font-semibold", "text-gray-500", "uppercase", "tracking-wider");
        jour.textContent = date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

        const icone = document.createElement("span");
        icone.classList.add("text-5xl")
        icone.textContent = weather.icon;

        const description = document.createElement("span");
        description.classList.add("text-xs", "text-gray-400", "mb-2")
        description.textContent = weather.label;

        const temperatures = document.createElement("div");
        temperatures.classList.add("flex", "items-center", "justify-center", "gap-2")

        const tempMax = document.createElement("span");
        tempMax.classList.add("text-lg", "font-bold", "text-gray-800")
        tempMax.textContent = daily.temperature_2m_max[i] ?? "Donnée indisponible";

        const tempMin = document.createElement("span");
        tempMin.classList.add("text-sm", "text-gray-400");
        tempMin.textContent = daily.temperature_2m_max[i] ?? "Donnée indisponible";

        temperatures.appendChild(tempMax);
        temperatures.appendChild(tempMin);
        carte.appendChild(jour);
        carte.appendChild(icone);
        carte.appendChild(description);
        carte.appendChild(temperatures);

        liste.appendChild(carte);
    }
    liste.classList.remove("hidden");
}


// teste HTTP 429

// const erreurTest = new Error("Erreur de test");
// erreurTest.status = 429;
// gestionErreur(erreurTest, msg_erreur);
