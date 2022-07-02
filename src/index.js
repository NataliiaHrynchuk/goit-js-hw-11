import {fetchImages} from './fetchImages';
let searchQuery = '';
let page = 1;
const refs = {
    form: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
};
refs.loadMoreBtn.classList.add("is-hidden");
function onSearch(event) {
    event.preventDefault();
    searchQuery = event.currentTarget.elements.searchQuery.value;
    console.log(searchQuery);
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
 }


refs.form.addEventListener('submit', onSearch);
refs.form.addEventListener('input', ofLoadMore);
refs.loadMoreBtn.addEventListener('click', onLoadMore);