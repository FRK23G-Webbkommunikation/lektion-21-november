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

export { updateUI }