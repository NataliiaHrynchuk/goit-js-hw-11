import { fetchImages } from './fetchImages';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let searchQuery = '';
let page = 1;
let gallery = new SimpleLightbox('.photo-card a', {
    close: true,
    closeText: '×',
    overlayOpasity: 0.8,
    fadeSpeed: 250,
    // captionsData: 'alt',
    
});


const refs = {
    form: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    imageContainer: document.querySelector('.gallery')
};

refs.loadMoreBtn.classList.add("is-hidden");


const renderImagesList = (webformatURL, largeImageURL, tags, likes, views, comments, downloads) => {
        return `<div class="photo-card">
    <a class="gallery__item" href="${largeImageURL}">
    <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b> ${likes}
      </p>
      <p class="info-item">
        <b>Views</b> ${views}
      </p>
      <p class="info-item">
        <b>Comments</b> ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b> ${downloads}
      </p>
    </div>
</div>`
    };

function onSearch(event) {
    event.preventDefault();
    searchQuery = event.currentTarget.elements.searchQuery.value;
    console.log(searchQuery);
    fetchImages(searchQuery, page)
    .then((data) => {
        // console.log(data.hits);
        console.log(`totalHits: ${data.totalHits}`);
        const { hits } = data;
        
        if (data.totalHits === 0) {
                console.log("Sorry, there are no images matching your search query. Please try again.")
        }
        
        hits.map(hit =>{
            const {
                webformatURL,
                largeImageURL,
                tags, 
                likes,
                views, 
                comments,
                downloads
            } = hit;
            console.log(`webformatURL: ${webformatURL}, largeImageURL: ${largeImageURL}, tags: ${tags}, likes: ${likes}, views: ${views}, comments: ${comments}, downloads: ${downloads}`);
             refs.imageContainer.insertAdjacentHTML("beforeend", renderImagesList(webformatURL, largeImageURL, tags, likes, views, comments, downloads));
            gallery.on('show.SimpleLightbox', function (e) {
                    e.preventDefault();
                    sourceAttr: 'href';
                });
                gallery.refresh();
        });
        page +=1;
        refs.loadMoreBtn.classList.remove("is-hidden");
    })       
}

function onLoadMore(event) {
    event.preventDefault();
    fetchImages(searchQuery, page)    
    .then((data) => {
        // console.log(data.hits);
        console.log(`totalHits: ${data.totalHits}`);
        const {hits} = data;
        hits.map(hit =>{
            const {
                webformatURL,
                largeImageURL,
                tags, 
                likes,
                views, 
                comments,
                downloads
            } = hit;
        console.log(`webformatURL: ${webformatURL}, largeImageURL: ${largeImageURL}, tags: ${tags}, likes: ${likes}, views: ${views}, comments: ${comments}, downloads: ${downloads}`);
    });
        page +=1;
})
}

function ofLoadMore() {
    page = 1;
    refs.loadMoreBtn.classList.add("is-hidden");
    refs.imageContainer.innerHTML = '';
 }


refs.form.addEventListener('submit', onSearch);
refs.form.addEventListener('input', ofLoadMore);
refs.loadMoreBtn.addEventListener('click', onLoadMore);