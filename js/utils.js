
export const WEATHER_CODES = {
  0: { label: "Ciel dégagé", icon: "☀️" },
  1: { label: "Plutôt dégagé", icon: "🌤️" },
  2: { label: "Partiellement nuageux", icon: "⛅" },
  3: { label: "Couvert", icon: "☁️" },
  45: { label: "Brouillard", icon: "🌫️" },
  48: { label: "Brouillard givrant", icon: "🌫️" },
  51: { label: "Bruine légère", icon: "🌦️" },
  53: { label: "Bruine", icon: "🌦️" },
  55: { label: "Bruine forte", icon: "🌦️" },
  56: { label: "Bruine verglaçante", icon: "🌧️" },
  57: { label: "Bruine verglaçante", icon: "🌧️" },
  61: { label: "Pluie légère", icon: "🌧️" },
  63: { label: "Pluie", icon: "🌧️" },
  65: { label: "Pluie forte", icon: "🌧️" },
  66: { label: "Pluie verglaçante", icon: "🌧️" },
  67: { label: "Pluie verglaçante", icon: "🌧️" },
  71: { label: "Neige légère", icon: "🌨️" },
  73: { label: "Neige", icon: "🌨️" },
  75: { label: "Neige forte", icon: "❄️" },
  77: { label: "Grains de neige", icon: "🌨️" },
  80: { label: "Averses légères", icon: "🌦️" },
  81: { label: "Averses", icon: "🌧️" },
  82: { label: "Averses violentes", icon: "⛈️" },
  85: { label: "Averses de neige", icon: "🌨️" },
  86: { label: "Fortes averses de neige", icon: "❄️" },
  95: { label: "Orage", icon: "⛈️" },
  96: { label: "Orage avec grêle", icon: "⛈️" },
  99: { label: "Orage avec forte grêle", icon: "⛈️" },
};


export async function gestionErreur(erreur, msg_erreur) {
  if (erreur instanceof TypeError) {
    msg_erreur.textContent = "impossible de contacter le serveur";
    msg_erreur.classList.remove("hidden");
  } else if (erreur.status === 429) {
    msg_erreur.textContent = "trop de requete";
    msg_erreur.classList.remove("hidden");
  } else if (erreur.status === 503) {
    msg_erreur.textContent = "service indisponsible";
    msg_erreur.classList.remove("hidden");
  } else if (erreur.status === 400 ||
    erreur.status === 401 ||
    erreur.status === 403 ||
    erreur.status === 404) {
    msg_erreur.textContent = "erreur client";
    msg_erreur.classList.remove("hidden");
  }else if (erreur.status === 500 ||
    erreur.status === 502 ||
    erreur.status === 504){
      msg_erreur.textContent = "erreur serveaur";
    msg_erreur.classList.remove("hidden");

  } else {
    msg_erreur.textContent = "erreur inattendue";
    msg_erreur.classList.remove("hidden");
  }

}