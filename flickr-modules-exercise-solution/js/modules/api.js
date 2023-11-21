async function getImages(currentPage){
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

export { getImages }