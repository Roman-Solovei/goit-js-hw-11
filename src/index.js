// import './css/styles.css';
// import { fetchCountries } from './js/fetchCountries';
// import countryList from '../src/css/templates/templatesCountryList.hbs';
// import oneCountry from '../src/css/templates/templatesOneCountry.hbs';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// var debounce = require('lodash.debounce');

// const refs = {
//     countryListMarkup: document.querySelector(".country-list"),
//     countryInfo: document.querySelector(".country-info"),
//     DEBOUNCE_DELAY: 300,
//     countryInput: document.querySelector('input#search-box'),
// };

// refs.countryInput.addEventListener('input', debounce(countrySearch, refs.DEBOUNCE_DELAY));

// function countrySearch(e) {
//     e.preventDefault();
//     const searchQuery = e.target.value;
//     clearCountryInfo();
    
//     if (searchQuery !== '') {
//     fetchCountries(searchQuery)
//     .then(data => {    
//         if (data.length > 10) {
//         Notify.success("Too many matches found. Please enter a more specific name.");
//             }  
//         else if (data.length === 1) {
//              buildCountryQuery(data, oneCountry);
//         } else if (data.length < 10) {
//             buildCountryQuery(data, countryList);       
//         }
//     })
//     .catch(error => {    
//       Notify.failure("Oops, there is no country with that name");
//     });
//     };    
// };

// function buildCountryQuery(countries, template) {
//     const markup = template(countries);    
//     refs.countryListMarkup.insertAdjacentHTML('afterbegin', markup);
// };

// function clearCountryInfo() {
//     refs.countryInfo.innerHTML = '';
//     refs.countryListMarkup.innerHTML = '';
// };


import "./css/styles.css";
import imagesTemplate from "./templates/imageCard.hbs";
import ApiImagesService from "./js/api-service";
import getRefs from "./js/get-refs";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import LoadMoreBtn from "./js/load-more-btn";

// var lightbox = new SimpleLightbox('.gallery a');

const apiImageService = new ApiImagesService();

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

const refs = getRefs();

refs.gallery.addEventListener("click", onImageClick);
refs.form.addEventListener("submit", onImgageSearch);
refs.loadMoreBtn.addEventListener("click", fetchImages);
// console.log(apiImageService.pagination)
// galleryContainer.addEventListener('click', onClickHandler);

function onImgageSearch(e) {
  e.preventDefault();

  apiImageService.query = e.currentTarget.elements[0].value;
  
  console.log(e)

  if (apiImageService.query === "") {    
      Notify.failure("Пустой запрос")
  }

  loadMoreBtn.show();
  apiImageService.resetPage();
  clearGallery();
  fetchImages();
  // console.dir(fetchImages())
}

function fetchImages() {
  loadMoreBtn.disable();
  apiImageService
    .fetchImages()
    .then((images) => {
      renderImages(images.data.hits);
      loadMoreBtn.enable();
      console.log(images)
      if (images.data.total === 0) {    
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }
      if (images.data.total > 0 && images.data.hits.length === 0) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notify.failure("We're sorry, but you've reached the end of search results.");
     }
    })
    .catch(onFetchError);
}

function onFetchError(error) {
  alert(error);
}

function renderImages(images) {
  // console.log(images)
  refs.gallery.insertAdjacentHTML("beforeend", imagesTemplate(images));
  // console.log(images)
}

function clearGallery() {
  refs.gallery.innerHTML = "";
}


function onImageClick(e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }

  e.preventDefault();

  const fullImgLink = e.target.getAttribute("data-src");
  const imgAlt = e.target.getAttribute("alt");
  const imgWidth = e.target.getAttribute("data-width");

  const instance =
    basicLightbox.create(`
        <img src=${fullImgLink} alt=${imgAlt}/>
    `);

  instance.show();
}


// function onCreateGalleryItems(images) {
//   console.log()
//     return images
//       .map(({ preview, original, description }) => {
//         return `
//     <a class="gallery__item" href="${original}">
//     <img class="gallery__image" src="${preview}" alt="${description}" /></a>`;     
//       }).join('');  
// };

// function onClickHandler(e) {
//   e.preventDefault();
//   lightbox.options.captionsData = "alt";  
//   lightbox.options.captionDelay = 250;  
// };
