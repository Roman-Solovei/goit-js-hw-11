import * as basicLightbox from "basiclightbox";
import getRefs from "./get-refs";
const refs = getRefs();
refs.gallery.addEventListener("click", onImageClick);

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
