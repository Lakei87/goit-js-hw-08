// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

console.log(galleryItems);

const galleryRef = document.querySelector(".gallery")
galleryRef.insertAdjacentHTML("afterbegin", createMarkup(galleryItems))

function createMarkup(array) {
    return array.map(element => {
        const { original, preview, description } = element
        
        return `<a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" /></a>`
    }).join("")
}

new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
})