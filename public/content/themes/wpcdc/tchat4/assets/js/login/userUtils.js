const userUtils = {
    loginFormElement: null,
    userNameInputElement: null,
    userNameElement: null,
    msgFormElement: null,
    usersListElement: null,
    currentUser: {},
    meListedUserElement: null,
    allListedUsersElements : [],
    init: () => {
        userUtils.loginFormElement = document.querySelector("#user_name-form");
        userUtils.userNameInputElement = document.querySelector("#user_name-input");
        userUtils.userNameElement = document.querySelector("#user_name");
        userUtils.msgFormElement = document.querySelector("#msg-form");
        userUtils.usersListElement = document.querySelector(".users_list");
        document.querySelectorAll('input, textarea').forEach((input) => {
            input.addEventListener('input', (e) => {
              e.target.blur();
              e.target.focus();
            })
          })
    },
    setConnectedUser: (user) => {
        userUtils.currentUser = user;
        userUtils.userNameElement.textContent = user.userName;
        userUtils.loginFormElement.style.display = "none";
        userUtils.msgFormElement.style.display = "flex";
    },
    usersListAdd: (user) => {
        const listedUserTpl = document.querySelector("#listed_user-tpl");
        let clonedListedUser = listedUserTpl.content.cloneNode(true);
        userUtils.usersListElement.prepend(clonedListedUser);
        userUtils.meListedUserElement = document.querySelectorAll(".listed_user")[0];
        userUtils.meListedUserElement.textContent = user.userName;
        userUtils.meListedUserElement.dataset.userId = user.userId;
        userUtils.allListedUsersElements[user.userId] = userUtils.meListedUserElement;
    },
    removeUser: (userToRemove) => {
        userUtils.allListedUsersElements[userToRemove.userId].remove();
    },
}
document.addEventListener('DOMContentLoaded', userUtils.init);