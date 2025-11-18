/* ========== HELPERS ========== */
const qs = (sel) => document.querySelector(sel);
const qsa = (sel) => document.querySelectorAll(sel);

/* ========== STICKY MENU STYLE ON SCROLL ========== */
const menuBar = qs(".menu-bar");

window.addEventListener("scroll", () => {
    const scrolled = window.scrollY || document.documentElement.scrollTop;
    if (scrolled > 200) {
        menuBar.classList.add("menu-bar--solid");
    } else {
        menuBar.classList.remove("menu-bar--solid");
    }
});

/* ========== HAMBURGER MENU (MOBILE) ========== */
const burgerBtn = qs(".menu-toggle");
const mainNav = qs(".main-nav");

if (burgerBtn && mainNav) {
    burgerBtn.addEventListener("click", () => {
        mainNav.classList.toggle("main-nav--open");

        const icon = burgerBtn.firstElementChild;
        if (!icon) return;

        if (mainNav.classList.contains("main-nav--open")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });
}

/* ========== PORTFOLIO MINIATURES PANEL ========== */
const portfolioLink = qs("#menuPortfolio");
const miniPanel = qs("#miniThumbs");
let miniOpen = false;

if (portfolioLink && miniPanel) {
    portfolioLink.addEventListener("click", (e) => {
        e.preventDefault();
        miniOpen = !miniOpen;
        miniPanel.classList.toggle("portfolio-mini--open", miniOpen);
    });
}

// close mini panel when clicking outside (desktop)
document.addEventListener("click", (e) => {
    if (!miniPanel || !portfolioLink) return;

    const insidePanel = miniPanel.contains(e.target);
    const onPortfolioLink = portfolioLink.contains(e.target);

    if (!insidePanel && !onPortfolioLink) {
        miniOpen = false;
        miniPanel.classList.remove("portfolio-mini--open");
    }
});

/* ========== SLIDESHOW / MODAL ========== */
const lightbox = qs("#lightbox");
const lightboxImage = qs("#lightboxImage");
const lightboxIndex = qs("#lightboxIndex");
const closeBtn = qs(".lightbox-close");
const prevBtn = qs(".lightbox-nav.prev");
const nextBtn = qs(".lightbox-nav.next");
const dots = qsa(".dot");

let currentIndex = 1;
const maxImages = 8;

// update image, caption and dots
function updateLightbox() {
    if (currentIndex < 1) currentIndex = maxImages;
    if (currentIndex > maxImages) currentIndex = 1;

    if (lightboxImage) {
        lightboxImage.src = `./assets/img/p${currentIndex}.jpg`;
    }
    if (lightboxIndex) {
        lightboxIndex.textContent = String(currentIndex);
    }

    dots.forEach((d) => {
        const idx = Number(d.dataset.index);
        d.classList.toggle("dot--active", idx === currentIndex);
    });
}

// open modal with specific image
function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    if (lightbox) lightbox.classList.add("lightbox--visible");
}

// close modal
function closeLightbox() {
    if (lightbox) lightbox.classList.remove("lightbox--visible");
}

// thumbnail clicks (from mini panel)
qsa(".miniature").forEach((thumb) => {
    thumb.addEventListener("click", () => {
        const idx = Number(thumb.dataset.index);
        openLightbox(idx);
    });
});

// big portfolio images
qsa(".folio-img").forEach((img) => {
    img.addEventListener("click", () => {
        const idx = Number(img.dataset.index);
        openLightbox(idx);
    });
});

// slider controls
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        currentIndex -= 1;
        updateLightbox();
    });
}

if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        currentIndex += 1;
        updateLightbox();
    });
}

if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
}

// click outside image closes modal
if (lightbox) {
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// ESC key closes modal
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeLightbox();
    }
});

// click on dots to jump
dots.forEach((dot) => {
    dot.addEventListener("click", () => {
        const idx = Number(dot.dataset.index);
        openLightbox(idx);
    });
});
