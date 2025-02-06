const track = document.querySelector('.image-track');
const images = document.querySelectorAll('.image-track img');
const container = document.querySelector('#image-container');
let index = 0;
let scrollAmount = 0;
let maximum = 0;

function getImageWidth() {
    const containerWidth = container.offsetWidth;
    const imageAmount = getAmountOfImages(containerWidth);
    const imageWidth = Math.floor(containerWidth / imageAmount); // 3 images at a time
    return imageWidth;
}

function getAmountOfImages(width) {
    if (width > 980) {
        maximum = 4
        scrollAmount = 2;
        return 5;
    } else {
        maximum = 6
        scrollAmount = 1;
        return 4;
    }
}

function updateCarousel() {
    const imageWidth = getImageWidth();
    const maxIndex = images.length - 1;
    const offset = index * imageWidth;
    track.style.transform = `translateX(-${offset}px)`;
    // Loop back to the start or end if we're at the first or last image
    if (index > maxIndex) index = 0;
    if (index < 0) index = maxIndex;
}

function nextSlide() {
    if (index + scrollAmount <= maximum) {
        index += scrollAmount;
    } else {
        index = 0;
    }
    updateCarousel();
}

function prevSlide() {
    if (index - scrollAmount >= 0) {
        index -= scrollAmount;
    } else {
        index = images.length - 1 ;
    }
    updateCarousel();
}

updateCarousel();
window.addEventListener('resize', updateCarousel);
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;