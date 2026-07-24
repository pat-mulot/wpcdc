const app = {
    slidesContent: [],
    slideId: 0,
    previousSlideButton: Object,
    homtTopsSlideIndex: 0,
    pageLinksScrollIndex: 0,
    'init': function () {
        // window.addEventListener('resize', app.displayBurgerLinks);
        //     if (window.window.innerWidth < 575) {
        //         // window.scrollTo(0, 48);
        //     }
        burger.init();
        carousel.init();
        scoresSheet.initStoredPlayers();
        scoresSheet.init();
        gameApp.init();
        profile.init();
        app.pageLinksScrollInit();
        app.homeTopSliderInit();
        app.innerSliderInit();
        dropdown.init();
        // Element with opacity transition :
        let allDomElementsToDisplay = document.querySelectorAll(".main_card-container");
        for (let singleElement of allDomElementsToDisplay) {
            singleElement.classList.add("active");
        };
        // REGISTRATION :
        let registerFormElement = document.querySelector("#loginform");
        if (registerFormElement) {
            registerFormElement.addEventListener("submit", app.getUserLogin)
        }
        // scroll home presentation :
        app.displayHomeScrollText();
        let mainHomBackground = document.querySelector(".main_section-home");
        if (mainHomBackground) {
            mainHomBackground.addEventListener("click", () => {
                mainHomBackground.classList.add("active");
            })
        }
    },
    pageLinksScrollInit() {
        let navContainer = document.querySelector(".page_links");
        if (navContainer) {
            let linksContainer = navContainer.querySelector("ul");
            let leftButton = navContainer.querySelector(".scroll_button-left");
            let rightButton = navContainer.querySelector(".scroll_button-right");
            leftButton.addEventListener("click", (evt) => {
                evt.preventDefault();
                app.pageLinksScrollIndex -= navContainer.offsetWidth / 2;
                linksContainer.scrollLeft = - app.pageLinksScrollIndex;
            });
            rightButton.addEventListener("click", (evt) => {
                evt.preventDefault();
                app.pageLinksScrollIndex += navContainer.offsetWidth / 2;
                linksContainer.scrollLeft = app.pageLinksScrollIndex;
            });
        }
    },
    displayHomeScrollText() {
        if (document.querySelector(".main_section-home-content")) {
            let textContent = document.querySelector(".main_section-home-content").querySelector(".main_card-text");
            textContent.classList.add("active");
        }
    },
    getUserLogin(evt) {
        let loginInputElement = document.querySelector("#user_login");
        let passwordInputElement = document.querySelector("#user_pass");
        let userLogin = loginInputElement.value;
        let userPass = passwordInputElement.value;
        userService.login(userLogin, userPass);
    },
    homeTopSliderInit() {
        let previousButton = document.querySelectorAll(".home_tops_slider-button")[0];
        if (previousButton) {
            previousButton.addEventListener("click", app.handleClickOnHomeTopPreviousSlide);
            let nextButton = document.querySelectorAll(".home_tops_slider-button")[1];
            nextButton.addEventListener("click", app.handleClickOnHomeTopNextSlide);
        }

    },
    handleClickOnHomeTopNextSlide(evt) {
        evt.preventDefault();
        let sliderContainer = document.querySelector(".home_tops-wrapper");
        if (app.homtTopsSlideIndex < parseInt(sliderContainer.querySelectorAll("article").length) - 1) {
            app.homtTopsSlideIndex += 1;
        } else {
            app.homtTopsSlideIndex = 0;
        }
        let currentScrollSize = sliderContainer.querySelectorAll("article")[0].offsetWidth;
        sliderContainer.scrollLeft = app.homtTopsSlideIndex * currentScrollSize;
    },
    handleClickOnHomeTopPreviousSlide(evt) {
        evt.preventDefault();
        let sliderContainer = document.querySelector(".home_tops-wrapper");
        if (app.homtTopsSlideIndex > 0) {
            app.homtTopsSlideIndex -= 1;
        } else {
            app.homtTopsSlideIndex = parseInt(sliderContainer.querySelectorAll("article").length) - 1;
        }
        let currentScrollSize = sliderContainer.querySelectorAll("article")[0].offsetWidth;
        sliderContainer.scrollLeft = app.homtTopsSlideIndex * currentScrollSize;
    },
    innerSliderInit() {
        let allTopHomeSliders = document.querySelectorAll(".best_scores-wrappers");
        for (let oneTopSlider of allTopHomeSliders) {
            let allSlidesContent = oneTopSlider.querySelectorAll(".inner_slider-content");
            if (allSlidesContent.length !== 0) {
                allSlidesContent[0].classList.add("active");
                let allButtons = oneTopSlider.querySelector(".inner_slider-buttons-container").querySelectorAll(".inner_slider-button");
                allButtons[0].style.display = "none";
                for (let signleButton of allButtons) {
                    signleButton.addEventListener("click", app.displaySlide);
                }
            }
        }
    },
    displaySlide(evt) {
        evt.preventDefault();
        let allTopHomeSlider = evt.currentTarget.closest(".best_scores-wrappers");
        let allButtons = allTopHomeSlider.querySelectorAll(".inner_slider-button")
        let allSlidesContent = allTopHomeSlider.querySelectorAll(".inner_slider-content");
        for (let oneButton of allButtons) {
            if (oneButton.style.display === "none") {
                oneButton.style.display = "flex";
                allSlidesContent[oneButton.dataset.itemId].classList.remove("active");
            }
        }
        evt.currentTarget.style.display = "none";
        allSlidesContent[evt.currentTarget.dataset.itemId].classList.add("active");
    },
}
document.addEventListener('DOMContentLoaded', app.init);