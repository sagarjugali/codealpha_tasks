/* ========================================
   SELECT ELEMENTS
======================================== */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightbox-img");

const lightboxTitle =
    document.getElementById("lightbox-title");

const lightboxCategory =
    document.getElementById("lightbox-category");

const counter =
    document.getElementById("counter");

const closeButton =
    document.getElementById("close");

const nextButton =
    document.getElementById("next");

const prevButton =
    document.getElementById("prev");


/* ========================================
   VARIABLES
======================================== */

let visibleImages = [];

let currentIndex = 0;


/* ========================================
   UPDATE VISIBLE IMAGES
======================================== */

function updateVisibleImages() {

    visibleImages = [];

    galleryItems.forEach(item => {

        if (!item.classList.contains("hide")) {

            visibleImages.push(item);

        }

    });

}


/* Initialize */

updateVisibleImages();


/* ========================================
   FILTER SYSTEM
======================================== */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter =
            button.getAttribute("data-filter");


        /* Active button */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        /* Filter gallery */

        galleryItems.forEach(item => {

            const category =
                item.getAttribute("data-category");


            if (
                filter === "all" ||
                category === filter
            ) {

                item.classList.remove("hide");

            } else {

                item.classList.add("hide");

            }

        });


        updateVisibleImages();

    });

});


/* ========================================
   OPEN LIGHTBOX
======================================== */

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        updateVisibleImages();

        currentIndex =
            visibleImages.indexOf(item);

        showImage();

        openLightbox();

    });

});


/* ========================================
   SHOW IMAGE
======================================== */

function showImage() {

    if (visibleImages.length === 0) {
        return;
    }


    const item =
        visibleImages[currentIndex];


    const image =
        item.querySelector("img");


    const title =
        item.querySelector("h3");


    const category =
        item.querySelector("p");


    /* Image */

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;


    /* Caption */

    lightboxTitle.textContent =
        title.textContent;

    lightboxCategory.textContent =
        category.textContent;


    /* Counter */

    const current =
        String(currentIndex + 1).padStart(2, "0");

    const total =
        String(visibleImages.length).padStart(2, "0");


    counter.textContent =
        `${current} / ${total}`;

}


/* ========================================
   OPEN LIGHTBOX
======================================== */

function openLightbox() {

    lightbox.classList.add("show");

    document.body.style.overflow = "hidden";

}


/* ========================================
   CLOSE LIGHTBOX
======================================== */

function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "";

}


closeButton.addEventListener(
    "click",
    closeLightbox
);


/* ========================================
   NEXT IMAGE
======================================== */

function nextImage() {

    currentIndex++;

    if (
        currentIndex >=
        visibleImages.length
    ) {

        currentIndex = 0;

    }

    showImage();

}


nextButton.addEventListener(
    "click",
    nextImage
);


/* ========================================
   PREVIOUS IMAGE
======================================== */

function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex =
            visibleImages.length - 1;

    }

    showImage();

}


prevButton.addEventListener(
    "click",
    previousImage
);


/* ========================================
   CLICK OUTSIDE IMAGE
======================================== */

lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


/* ========================================
   KEYBOARD CONTROLS
======================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox.classList.contains("show")
        ) {

            return;

        }


        /* Right arrow */

        if (event.key === "ArrowRight") {

            nextImage();

        }


        /* Left arrow */

        if (event.key === "ArrowLeft") {

            previousImage();

        }


        /* Escape */

        if (event.key === "Escape") {

            closeLightbox();

        }

    }
);


/* ========================================
   PRELOAD IMAGE WHEN NAVIGATING
======================================== */

function preloadImages() {

    visibleImages.forEach(item => {

        const image =
            item.querySelector("img");

        const preload =
            new Image();

        preload.src = image.src;

    });

}

preloadImages();