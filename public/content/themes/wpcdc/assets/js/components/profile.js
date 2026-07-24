const profile = {
    image: "",
    imageId: 0,
    imageHover: false,
    init: function () {
        let fileSelectorElement = document.querySelector("#file");
        if (fileSelectorElement) {
            fileSelectorElement.addEventListener("change", profile.previewFiles);
        }
        let cancelFilesBtn = document.querySelector(".cancel-btn");
        if (cancelFilesBtn) {
            cancelFilesBtn.addEventListener("click", profile.handleClickOnCancelFiles);
        }
        let imageContainer = document.querySelector(".img_hover");
        if (imageContainer) {
            let imgSelectorBtnToDisplay = imageContainer.closest(".profile_avatar").querySelector(".profile_avatar-add");
            imageContainer.addEventListener("mouseover", profile.handleMouseOverOnImage);
            imgSelectorBtnToDisplay.addEventListener("mouseover", profile.handleMouseOverOnImage);
            imageContainer.addEventListener("mouseleave", profile.handleMouseLeaveOutImage);
        }
    },
    async previewFiles(evt) {
        evt.preventDefault();
        const imagePreview = evt.currentTarget.files[0];
        let imageResult = await userService.uploadProfileImage(imagePreview);
        if (imageResult) {
            let previewFilesElement = document.querySelector("#avatar-preview_img");
            previewFilesElement.src = imagePreview;
            profile.image = imageResult.image.url;
            profile.imageId = imageResult.image.id;
            let previewImgElementContainer = document.querySelector(".avatar-preview_img-container");
            let previewImgElement = document.querySelector("#avatar-preview_img");
            previewImgElementContainer.style.display = "flex";
            previewImgElement.src = imageResult.image.url;
            let imageIdInput = document.querySelector("#imageId");
            imageIdInput.value = parseInt(imageResult.image.id);
        }
    },
    handleClickOnCancelFiles(evt) {
        evt.preventDefault();
        let containerElementToDisable = evt.currentTarget.closest(".avatar-preview_img-container");
        containerElementToDisable.style.display = "none";
    },
    handleMouseOverOnImage(evt) {
        evt.preventDefault();
        profile.imageHover = false;
        let imgSelectorBtnToDisplay = evt.currentTarget.closest(".profile_avatar").querySelector(".profile_avatar-add");
        evt.currentTarget.classList.add("active");
        imgSelectorBtnToDisplay.classList.add("active");
        profile.imageHover = true;
    },
    handleMouseLeaveOutImage(evt) {
        evt.preventDefault();
        let imgSelectorBtnToDisplay = evt.currentTarget.closest(".profile_avatar").querySelector(".profile_avatar-add");
        if (profile.imageHover) {
            evt.currentTarget.classList.remove("active");
            imgSelectorBtnToDisplay.classList.remove("active");
        }
    },
}