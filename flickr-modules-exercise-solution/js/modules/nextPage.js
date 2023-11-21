import { getImages } from "./api.js";
import { updateUI } from "./ui.js";

async function nextPage(currentPage) {
    currentPage++; // Välj nästa sida
    // hämta bilder
    let images = await getImages(currentPage);

    // uppdatera ui
    updateUI(images);
}

export { nextPage }