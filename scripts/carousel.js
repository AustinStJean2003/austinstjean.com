const track = document.querySelector('.image-track');
const images = document.querySelectorAll('.image-track img');
const container = document.querySelector('#image-container');

let index = 0;
let scrollAmount = 0;
let visibleImages = 0;
let totalImages = images.length;
let imageWidth = 0;

function updateCarousel() {
    const containerWidth = container.offsetWidth;

    if (containerWidth > 980) {
        visibleImages = 3;
        scrollAmount = 2;
    } else if (containerWidth > 700) {
        visibleImages = 2;
        scrollAmount = 1;
    } else {
        visibleImages = 1;
        scrollAmount = 1;
    }

    imageWidth = containerWidth / visibleImages;

    images.forEach(img => {
        img.style.width = `${imageWidth}px`;
    });

    track.style.width = `${totalImages * imageWidth}px`;

    updatePosition();
}

function updatePosition() {
    if (index >= totalImages) {
        index = 0; // Loop back to start
    } else if (index < 0) {
        index = totalImages - visibleImages; // Loop to end
    }

    const offset = index * imageWidth;
    track.style.transform = `translateX(-${offset}px)`;
}

function nextSlide() {
    if (index + scrollAmount >= totalImages) {
        index = 0;
    } else {
        index += scrollAmount;
    }

    updatePosition();
}

function prevSlide() {
    if (index - scrollAmount < 0) {
        index = totalImages - visibleImages;
    } else {
        index -= scrollAmount;
    }

    updatePosition();
}

updateCarousel();
window.addEventListener('resize', updateCarousel);
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
