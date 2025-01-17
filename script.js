const accessKey = "f9G98xBNfglLAaoMNL_ViTPO57HPGqwVGO3BGYyCbHU"

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

let keyword = '';
let page = 1;


async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResult.innerHTML = '';
    }

    const results = data.results;

    results.map(result => {
        const img = document.createElement('img');
        img.src = result.urls.small;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';

        imageLink.appendChild(img);
        searchResult.appendChild(imageLink);
    });

    showMoreBtn.style.display = 'block';
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

searchBtn.addEventListener('click', () => {
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener('click', () => {
    page++;
    searchImages();
});