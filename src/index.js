
import "./css/styles.css";
import LoadMoreBtn from "./js/load-more-btn";
import imagesTemplate from "./templates/imageCard.hbs";
import ApiImagesService from "./js/api-service";
import getRefs from "./js/get-refs";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


var lightbox = new SimpleLightbox('.gallery a');

const apiImageService = new ApiImagesService();

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

const refs = getRefs();
// const galleryContainer = refs.gallery;

refs.gallery.addEventListener("click", onImageClick);
refs.form.addEventListener("submit", onImageSearch);
refs.loadMoreBtn.addEventListener("click", fetchImages);


function onImageSearch(e) {
  e.preventDefault();

  apiImageService.query = e.currentTarget.elements[0].value;
 
  if (apiImageService.query === "") {
    Notify.failure("Empty query");
  }
  
  loadMoreBtn.show();
  apiImageService.resetPage();
  clearGallery();
  fetchImages();

}

function fetchImages() {
  loadMoreBtn.disable();
  apiImageService
    .fetchImages()
    .then((images) => {
      renderImages(images.data.hits);
      loadMoreBtn.enable();
      console.log(images)

      // window.addEventListener("test", null, options);

     
      if (images.data.totalHits === 0) {    
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }
      if (images.data.totalHits > 0 && images.data.hits.length === 0) {
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
  refs.gallery.insertAdjacentHTML("beforeend", imagesTemplate(images));  
}

function clearGallery() {
  refs.gallery.innerHTML = "";
}


function onImageClick(e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }

  e.preventDefault();
  lightbox.on('show.simplelightbox');
  // lightbox.options.captionsData = "alt";  
  // lightbox.options.captionDelay = 250;  
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
