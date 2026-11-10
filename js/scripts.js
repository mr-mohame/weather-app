import { rechercherVille } from "./api.js";
const search_form = document.getElementById("form-search");
const input_ville = document.getElementById("input-ville");
const msg_loading = document.getElementById("msg-loading");
const msg_erreur = document.getElementById("msg-erreur");
const btn_search = document.getElementById("btn-search");

// console.log(search_form, input_ville, msg_loading, msg_erreur, btn_search);

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
        const data = await rechercherVille(ville);
        if (!data.results || data.results.length === 0) {
            msg_erreur.textContent = "Ville introuvable";
            msg_erreur.classList.remove("hidden");
            return;
        }
        console.log(data)
    }catch(erreur){
        msg_erreur.textContent = "une erreur ";
        msg_erreur.classList.remove("hidden");

    }finally {
        msg_loading.classList.add("hidden");
        
    }

})