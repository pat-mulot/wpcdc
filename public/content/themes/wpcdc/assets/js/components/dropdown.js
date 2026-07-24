const dropdown = {
    dropDownElement: [],
    button: [],
    menu: [],
    selectedOption: [],
    index: false,
    init: function () {
        let dropDownElements = document.querySelectorAll(".dropdown");
        let dropdownId = 0;
        for (let oneDropDown of dropDownElements) {
            oneDropDown.dataset.id = dropdownId;
            // getting each single dropdown elements and contents
            dropdown.dropDownElement[dropdownId] = oneDropDown;
            dropdown.button[dropdownId] = oneDropDown.children[0];
            dropdown.menu[dropdownId] = oneDropDown.children[1];
            // setting default selected option :
            dropdown.selectedOption[dropdownId] = dropdown.menu[dropdownId].children[0];
            dropdown.button[dropdownId].textContent = dropdown.selectedOption[dropdownId].textContent;
            // setting events on each dropdown buttons et dropdown elements :
            dropdown.button[dropdownId].addEventListener('click', dropdown.handleClickOnDropdown);
            for (let menuOption of dropdown.menu[dropdownId].children) {
                menuOption.addEventListener('click', dropdown.handleClickOnOption);
            }
            dropdown.dropDownElement[dropdownId].addEventListener('opened', function (evt) {
            });
            dropdown.dropDownElement[dropdownId].addEventListener('closed', function (evt) {
            });
            dropdown.dropDownElement[dropdownId].addEventListener('change', function (evt) {
            });
            dropdownId++;
        }
    },
    handleClickOnDropdown(evt) {
        evt.preventDefault();
        dropdown.index = parseInt(evt.currentTarget.closest(".dropdown").dataset.id);
        dropdown.toggle();
    },
    toggle(expand = null) {
        expand = expand === null ? dropdown.menu[dropdown.index].getAttribute('aria-expanded') !== 'true' : expand;
        dropdown.menu[dropdown.index].setAttribute('aria-expanded', expand);
        if (expand) {
            dropdown.button[dropdown.index].classList.add('active');
            dropdown.selectedOption[dropdown.index].classList.add('active');
            // dropdown.selectedOption[dropdown.index].focus();
            document.addEventListener('click', dropdown.handleClickOut);
            dropdown.dropDownElement[dropdown.index].dispatchEvent(new Event('opened'));
        } else {
            dropdown.button[dropdown.index].classList.remove('active');
            dropdown.dropDownElement[dropdown.index].dispatchEvent(new Event('closed'));
            document.removeEventListener('click', dropdown.handleClickOut);
        }
    },
    handleClickOut(evt) {
        if (!dropdown.dropDownElement[dropdown.index]) {
            return document.removeEventListener('click', dropdown.handleClickOut);
        }
        if (!dropdown.dropDownElement[dropdown.index].contains(evt.target)) {
            dropdown.toggle(evt, false);
        };
    },
    handleClickOnOption(evt) {
        let allOptions = evt.target.closest("ul").querySelectorAll("li")
        for (let option of allOptions) {
            option.classList.remove("active");
        }
        evt.target.classList.add("active");
        evt.preventDefault();
        dropdown.selectedOption[dropdown.index] = evt.target;
        let currentContent = evt.target.textContent;
        let currentValue = evt.target.value;
        dropdown.button[dropdown.index].textContent = currentContent;
        dropdown.button[dropdown.index].value = currentValue;
        dropdown.toggle(false);
        dropdown.dropDownElement[dropdown.index].dispatchEvent(new Event('change'));
        dropdown.button[dropdown.index].focus();
    }
};


