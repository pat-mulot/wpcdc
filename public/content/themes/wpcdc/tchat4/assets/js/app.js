const app = {
    init: () => {
        document.querySelector("body").style.height = window.innerHeight + "0px";
    },
}
document.addEventListener('DOMContentLoaded', app.init);