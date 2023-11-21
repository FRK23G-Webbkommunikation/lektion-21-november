import { getImages } from "./modules/api.js";
import { updateUI } from "./modules/ui.js";
import { nextPage } from "./modules/nextPage.js";

let currentPage = 1;
const searchButton = document.querySelector('#search');
const nextPageButton = document.querySelector('#next-page');
const overlay = document.querySelector('#overlay');


// Close lightBox
overlay.addEventListener('click', () => {
    document.querySelector('#overlay').classList.toggle('show');
});

searchButton.addEventListener('click', async () => {
    // hämta bilder
    let images = await getImages(currentPage);
    
    // uppdatera ui
    updateUI(images);

});

nextPageButton.addEventListener('click', () => {
    nextPage(currentPage);
});


