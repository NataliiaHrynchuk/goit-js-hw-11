import axios from 'axios';
const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "28247101-24b63c3c82da89bc4099ab93b";

export async function fetchImages(searchQuery, page) {
    try {
        const response = await axios.get(`${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
        return response.data;
    } catch(error) {
    console.log(error);
}
};