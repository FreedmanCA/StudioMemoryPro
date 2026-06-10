const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const windowEl = document.querySelector('.carousel-window');
const dotsContainer = document.getElementById('carouselDots');
const carouselItems = document.querySelectorAll('.carousel-item');

// 1. Dynamically create dots
carouselItems.forEach((item, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');

    // Native Apple-style smooth scrolling directly to the exact item
    dot.addEventListener('click', () => {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.carousel-dot');

function moveCarousel(direction) {
    const scrollAmount = 373.33; // Item width + gap
    if (direction === 'next') {
        windowEl.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
        windowEl.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}

// 2. Update Arrows
function updateArrows() {
    if (windowEl.scrollLeft <= 5) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }

    if (Math.ceil(windowEl.scrollLeft + windowEl.clientWidth) >= windowEl.scrollWidth - 5) {
        nextBtn.classList.add('hidden');
    } else {
        nextBtn.classList.remove('hidden');
    }
}

windowEl.addEventListener('scroll', updateArrows);
window.addEventListener('resize', updateArrows);
window.addEventListener('load', updateArrows);

prevBtn.addEventListener('click', () => moveCarousel('prev'));
nextBtn.addEventListener('click', () => moveCarousel('next'));

// 3. Center-Calculation Logic for flawless dot synchronization on all screen sizes
function updateDots() {
    // Find the exact pixel center of the visible carousel window
    const windowCenter = windowEl.getBoundingClientRect().left + (windowEl.clientWidth / 2);
    let closestIndex = 0;
    let minDistance = Infinity;

    // Check every image to see which one's center is closest to the window's center
    carouselItems.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + (itemRect.width / 2);
        const distance = Math.abs(windowCenter - itemCenter);

        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
        }
    });

    // Update the dots to match the closest image
    dots.forEach((dot, index) => {
        if (index === closestIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Listen for scrolling and resizing to keep dots perfectly synced
windowEl.addEventListener('scroll', updateDots);
window.addEventListener('resize', updateDots);
window.addEventListener('load', updateDots);

// --- NATIVE DIALOG LIGHTBOX LOGIC ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryImages = document.querySelectorAll('.feature-ui-preview');

// Open lightbox on image click
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.showModal();
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close when clicking the backdrop or the image itself
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxImg) {
        lightbox.close();
    }
});

// Restore scroll when closed (handles ESC key automatically)
lightbox.addEventListener('close', () => {
    document.body.style.overflow = '';
});