var slideIndex = 1;
var slideTimer;
var effects = ["fade-effect", "slide-effect", "zoom-effect", "rotate-effect"];

function showSlides(n) {
    var slides = document.getElementsByClassName("slide");
    var unitNames = document.getElementsByClassName("unit-name");
    if (slides.length === 0)
        return;
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        effects.forEach(function (effect) { slides[i].classList.remove(effect); });
        if (unitNames[i])
            unitNames[i].classList.remove("active");
    }
    var currentSlide = slides[slideIndex - 1];
    currentSlide.style.display = "block";
    var effect = effects[(slideIndex - 1) % effects.length];
    currentSlide.classList.remove(effect);
    void currentSlide.offsetWidth;
    currentSlide.classList.add(effect);
    if (unitNames[slideIndex - 1])
        unitNames[slideIndex - 1].classList.add("active");
}
function plusSlides(n) {
    showSlides(slideIndex += n);
    resetTimer();
}
function currentSlideFn(n) {
    showSlides(slideIndex = n);
    resetTimer();
}
function autoShowSlides() {
    plusSlides(1);
    slideTimer = window.setTimeout(autoShowSlides, 3000);
}
function resetTimer() {
    if (slideTimer)
        clearTimeout(slideTimer);
    slideTimer = window.setTimeout(autoShowSlides, 3000);
}
window.onload = function () {
    showSlides(slideIndex);
    slideTimer = window.setTimeout(autoShowSlides, 3000);
    window.plusSlides = plusSlides;
    window.currentSlide = currentSlideFn;
    var unitNames = document.getElementsByClassName("unit-name");
    for (var i = 0; i < unitNames.length; i++) {
        unitNames[i].addEventListener("click", (function (idx) {
            return function () {
                showSlides(slideIndex = idx + 1);
                resetTimer();
            };
        })(i));
    }
}; 