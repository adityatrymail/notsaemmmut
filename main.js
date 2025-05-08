let slideIndex = 1;
let slideTimer;
const effects = ["fade-effect", "slide-effect", "zoom-effect", "rotate-effect"];

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const unitNames = document.getElementsByClassName("unit-name");
    if (slides.length === 0) return;
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        effects.forEach(effect => slides[i].classList.remove(effect));
        if (unitNames[i]) unitNames[i].classList.remove("active");
    }
    const currentSlide = slides[slideIndex - 1];
    currentSlide.style.display = "block";
    const effect = effects[(slideIndex - 1) % effects.length];
    currentSlide.classList.remove(effect);
    void currentSlide.offsetWidth;
    currentSlide.classList.add(effect);
    if (unitNames[slideIndex - 1]) unitNames[slideIndex - 1].classList.add("active");
}

function plusSlides(n) {
    showSlides(slideIndex += n);
    resetTimer();
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    resetTimer();
}

function autoShowSlides() {
    plusSlides(1);
    slideTimer = window.setTimeout(autoShowSlides, 3000);
}

function resetTimer() {
    if (slideTimer) clearTimeout(slideTimer);
    slideTimer = window.setTimeout(autoShowSlides, 3000);
}

window.onload = () => {
    showSlides(slideIndex);
    slideTimer = window.setTimeout(autoShowSlides, 3000);
    window.plusSlides = plusSlides;
    window.currentSlide = currentSlide;
    
    // Add click event to unit names
    const unitNames = document.getElementsByClassName("unit-name");
    for (let i = 0; i < unitNames.length; i++) {
        unitNames[i].addEventListener("click", () => {
            showSlides(slideIndex = i + 1);
            resetTimer();
        });
    }
}; 