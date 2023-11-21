let currentPage = 1;
const searchButton = document.querySelector('#search');
const nextPageButton = document.querySelector('#next-page');
const overlay = document.querySelector('#overlay');

async function getImages(){
    let text = document.querySelector('input#text').value; // Värdet från inputfältet

    const API_KEY = '19d3e6e0acfe9c438f368e2c2bab1c5d';
    const BASE_URL = 'https://api.flickr.com/services/rest';

    let url = `${BASE_URL}?api_key=${API_KEY}&method=flickr.photos.search&text=${text}&page=${currentPage}&per_page=20&format=json&nojsoncallback=1`;

    try {   
        let response = await fetch(url);
        let data = await response.json();

        return data;
    }
    catch(err) {
        console.error(err);
    }

}

function imgUrl(img, size){
    // vilken storlek?
    let imgSize = 'z';
    if(size == 'thumb') { imgSize = 'q' }
    if(size == 'large') { imgSize = 'b' }

    let url = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${imgSize}.jpg`

    return url;

}

function updateUI(data){
    let main = document.querySelector('main');
    main.innerHTML = '' // Töm html element på alla img-taggar

    const images = data.photos.photo;

    for(const image of images) {
        if(image.farm !== 0) { // Visa bara bilder som går att visa

            let imageElement = document.createElement('img');
            imageElement.setAttribute('src', imgUrl(image, 'thumb'));
            imageElement.setAttribute('alt', image.title);

            imageElement.addEventListener('click', () => {
                handleLightbox(image.title, imgUrl(image, 'large'));
            })
            
            main.appendChild(imageElement);
        
        }
    }
}

// Open lightBox
function handleLightbox(title, url){
    document.querySelector('#overlay').classList.toggle('show');
    
    let imageElement = document.querySelector('#overlay img');
    imageElement.setAttribute('src', url);
    imageElement.setAttribute('alt', title);

    document.querySelector('#overlay figcaption').innerHTML = title;

}

// Close lightBox
overlay.addEventListener('click', () => {
    document.querySelector('#overlay').classList.toggle('show');
});

searchButton.addEventListener('click', async () => {
    // hämta bilder
    let images = await getImages();
    
    // uppdatera ui
    updateUI(images);

});

nextPageButton.addEventListener('click', () => {
    nextPage();
});

async function nextPage() {
    currentPage++; // Välj nästa sida
    // hämta bilder
    let images = await getImages();

    // uppdatera ui
    updateUI(images);
}
