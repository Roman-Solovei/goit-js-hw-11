const MainUrl = "https://pixabay.com/api/";
const key = "24779492-e45231f5fdfd8f5bb8624d13c";
const searchSettings = "?image_type=photo&orientation=horizontal&safesearch=true&";

const axios = require('axios').default;

export default class ApiImagesService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
    this.pagination = 40;
  }
  // async fetchImages() {
  //   const url = `${MainUrl}${searchSettings}q=${this.searchQuery}&page=${this.page}&per_page=40&key=${key}`;

  //   return await fetch(url).then((response) => {
  //     this.incrementPage();
  //     return response.json();
  //   });
  // }
  async fetchImages() {
    const url = `${MainUrl}${searchSettings}q=${this.searchQuery}&page=${this.page}&per_page=${this.pagination}&key=${key}`;
  try {
    const response = await axios.get(url);
    console.log(response);
    this.incrementPage();
      return response;
  } catch (error) {
    console.error(error);
  }
}

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
