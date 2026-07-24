const burger = {
    burgerStatus: false,
    'init': function () {
        const burgerIconElement = document.querySelector(".burger-icon");
        burgerIconElement.addEventListener("click", burger.handleClickOneBurgerIcon);
        // window.addEventListener('resize', burger.displayBurgerLinks);
    },
    handleClickOneBurgerIcon(evt) {
        evt.preventDefault();
        let burgerButton = evt.currentTarget;
        let linksToDisplayElements = burgerButton.closest(".nav-container").querySelector(".nav_links-container");
        let buttonContainer = burgerButton.closest(".nav-container").querySelector("#burger-icon-container");
        let headerLogoElement = burgerButton.closest(".nav-container").querySelector(".nav-header_logo");
        buttonContainer.classList.toggle("active");
        burgerButton.classList.toggle("active-burger");
        linksToDisplayElements.classList.toggle("active-burger-links");

        if (headerLogoElement.classList.contains("active-header-logo")) {
            setTimeout(function () {
                let headerLogoElement = burgerButton.closest(".nav-container").querySelector(".nav-header_logo");

                headerLogoElement.classList.remove("active-header-logo");
                document.querySelector(".hydeburger-background").style.display = "none";
            }, 300);
        } else {
            headerLogoElement.classList.add("active-header-logo");
        }


        document.querySelector(".hydeburger-background").style.display = "initial";
        document.querySelector(".hydeburger-background").addEventListener("click", burger.handleClickOnBody);
    },
    handleClickOnBody(evt) {
        evt.preventDefault();
        document.querySelector(".hydeburger-background").style.display = "none";
        let burgerButton = document.querySelector(".burger-icon");
        let linksToDisplayElements = document.querySelector(".nav_links-container");
        let buttonContainer = burgerButton.closest(".nav-container").querySelector("#burger-icon-container");
        buttonContainer.classList.remove("active");
        burgerButton.classList.remove("active-burger");
        linksToDisplayElements.classList.remove("active-burger-links");
        setTimeout(function () {
            let headerLogoElement = burgerButton.closest(".nav-container").querySelector(".nav-header_logo");
            headerLogoElement.classList.remove("active-header-logo");
        }, 300);
    }
}