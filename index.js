window.addEventListener("load", () => {
    history.replaceState(null, null, " ");
    window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".stages-container");
    const tiles = Array.from(container.querySelectorAll(".tile"));
    const leftArrow = document.querySelector("#arrow-left");
    const rightArrow = document.querySelector("#arrow-right");
    const dotsContainer = document.querySelector(".dots");

    const gap = 20;
    const tileWidth = () => tiles[0]?.offsetWidth;

    console.log(tiles[3].offsetWidth);

    let currentIndex = 0;

    function renderDots() {
        dotsContainer.innerHTML = "";
        const arr = new Array(5).fill(0);
        arr.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (index === currentIndex) dot.classList.add("active");
            dot.addEventListener("click", () => scrollToTile(index));
            dotsContainer.appendChild(dot);
        });
    }

    function updateArrows() {
        leftArrow.classList.toggle("arrow-disabled", currentIndex === 0);
        rightArrow.classList.toggle(
            "arrow-disabled",
            currentIndex >= tiles.length - 1
        );
    }

    function scrollToTile(index) {
        const scrollX = index * tileWidth(index);
        container.scrollTo({
            left: scrollX,
            behavior: "smooth",
        });
        currentIndex = index;
        updateArrows();
        updateDots();
    }

    function updateDots() {
        const allDots = dotsContainer.querySelectorAll(".dot");
        allDots.forEach((dot) => dot.classList.remove("active"));
        if (allDots[currentIndex]) {
            allDots[currentIndex].classList.add("active");
        }
    }

    leftArrow.addEventListener("click", () => {
        if (currentIndex > 0) scrollToTile(currentIndex - 1);
    });

    rightArrow.addEventListener("click", () => {
        if (currentIndex < tiles.length - 1) scrollToTile(currentIndex + 1);
    });

    container.addEventListener("scroll", () => {
        const index = Math.round(container.scrollLeft / tileWidth());
        if (index !== currentIndex) {
            currentIndex = index;
            updateArrows();
            updateDots();
        }
    });

    renderDots();
    updateArrows();
});

document.addEventListener("DOMContentLoaded", () => {
    const tiles = document.querySelectorAll(".tile");

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target); // чтобы анимация сработала только 1 раз
                }
            });
        },
        {
            threshold: 0.1, // когда 10% элемента в зоне видимости
        }
    );

    tiles.forEach((tile, i) => {
        tile.style.transitionDelay = `${i * 0.2}s`; // поочерёдная задержка
        observer.observe(tile);
    });
});

const track = document.querySelector(".slider-track");
const prevBtn = document.querySelector("#arrow-left-memb");
const nextBtn = document.querySelector("#arrow-right-memb");
const countEl = document.querySelector(".count");

const cards = document.querySelectorAll(".member");
const cardCount = cards.length;
let cardsPerView = window.innerWidth <= 670 ? 1 : 3;
const gap = 20;

let currentSlide = 0;

const updateSlider = () => {
    const cardWidth = cards[0].offsetWidth + gap;
    const shift = currentSlide * cardWidth;
    track.style.transform = `translateX(-${shift}px)`;

    const visibleLast = Math.min(currentSlide + cardsPerView, cardCount);
    countEl.innerHTML = `<span class="count-current">${visibleLast}</span> / <span class="count-total">${cardCount}</span>`;

    prevBtn.classList.remove("arrow-disabled");
    nextBtn.classList.remove("arrow-disabled");
};

nextBtn.addEventListener("click", () => {
    currentSlide++;
    if (currentSlide > cardCount - cardsPerView) {
        currentSlide = 0;
    }
    updateSlider();
});

prevBtn.addEventListener("click", () => {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = cardCount - cardsPerView;
    }
    updateSlider();
});

window.addEventListener("resize", () => {
    cardsPerView = window.innerWidth <= 670 ? 1 : 3;

    if (currentSlide > cardCount - cardsPerView) {
        currentSlide = cardCount - cardsPerView;
    }
    updateSlider();
});

updateSlider();

setInterval(() => {
    currentSlide++;
    if (currentSlide > cardCount - cardsPerView) {
        currentSlide = 0;
    }
    updateSlider();
}, 4000);

document.querySelectorAll('.header-btns a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const targetID = anchor.getAttribute("href").substring(1);
        const targetElem = document.getElementById(targetID);
        if (targetElem) {
            targetElem.scrollIntoView({ behavior: "smooth" });
        }
    });
});
