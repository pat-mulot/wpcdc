const carousel = {
    slidesContainer: null,
    sliderButtons: null,
    currentSlide: 0,
    // --------- AUTO SLIDE ----------- //
    autoSlideTimer: null,
    autoSlideDuration: 3000,
    lastClickDate: null,
    lastClickCheckInterval: 500,
    restartAfterDuration: 5000,
    // -------------------------------- //
    'init': function () {
        carousel.slidesContainer = document.querySelector(".slider")
        if (carousel.slidesContainer) {
            carousel.sliderButtons = document.querySelectorAll(".slider-button")
            carousel.sliderButtons[0].classList.add("active");
            for (let oneSliderButton of carousel.sliderButtons) {
                oneSliderButton.addEventListener("click", carousel.handleClickOnSlideButton);
            }
            // --------- AUTO SLIDE ----------- //
            carousel.start();
            carousel.checkAutoRestart();
            // -------------------------------- //
        }
    },
    handleClickOnSlideButton(evt) {
        evt.preventDefault();
        if (evt.isTrusted) {
            const currentDate = new Date();
            carousel.lastClickDate = currentDate.getTime();
            carousel.stop();
        }
        for (let oneSliderButton of carousel.sliderButtons) {
            oneSliderButton.classList.remove("active");
        }
        evt.currentTarget.classList.toggle("active");
        let slideNumberToDisplay = parseInt(evt.currentTarget.dataset.slideButtonNumber);
        carousel.displaySlide(slideNumberToDisplay);
    },
    displaySlide(slideNumber) {
        let slideWidth = carousel.slidesContainer.offsetWidth;
        let scrollXvalue = slideWidth * slideNumber;
        carousel.slidesContainer.scroll(scrollXvalue, 0);
    },
    // --------- AUTO SLIDE ----------- //
    start() {
        carousel.autoSlideTimer = setInterval(function () {
            let newSlideToDisplay = carousel.currentSlide++;
            newSlideToDisplay = newSlideToDisplay % carousel.sliderButtons.length;
            carousel.sliderButtons[newSlideToDisplay].click();
        }, carousel.autoSlideDuration);
    },
    stop() {
        clearInterval(carousel.autoSlideTimer);
    },
    checkAutoRestart() {
        setInterval(function () {
            const currentDate = new Date();
            if (carousel.lastClickDate) {
                let elapsed = currentDate.getTime() - carousel.lastClickDate;
                if (elapsed > carousel.restartAfterDuration) {
                    carousel.lastClickDate = null;
                    carousel.start();
                }
            }
        }, carousel.lastClickCheckInterval);
    },
}