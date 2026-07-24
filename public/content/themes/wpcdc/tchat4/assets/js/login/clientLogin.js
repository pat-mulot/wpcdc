
    // ------------------------ # LOGIN 1 ------------------------ //
    /**
     * Récupération de l'utilisateur connecté
     * emit l'event login avec l'utilisateur vers le server
     */
     userUtils.loginFormElement.addEventListener("submit", submitLogin);

     function submitLogin(evt) {
         evt.preventDefault();
         if (userUtils.userNameInputElement.value) {
             let connectedUser = {
                 userName : userUtils.userNameInputElement.value,
             }
             socket.emit("login", connectedUser);
         } else {
             alert("vous devez entrer un nom d'utilisateur");
         }
     }
 
 
     // ------------------------ # LOGIN 3 ------------------------ //
     /**
      * Reception de l'utilisateur connecté depuis l'event login côté client
      * emit event newConnectedUser avec l'utilisateur vers le server
      */
     socket.on("logged", (currentUser) => {
         userUtils.setConnectedUser(currentUser);
     })
     /**
      * actions liées a la création de l'utilisateur une fois loggé
      */
     socket.on("newConnectedUser", (currentUser)=>{
         userUtils.usersListAdd(currentUser);
     })
 
     // ------------------------ # LOGIN 5 ------------------------ //
     /**
      * reception de l'event disconnect du server
      * supression de l'utilisateur qui se déconnecte
      */
     socket.on("disconnectUser", (disconnectingUser) => {
         userUtils.removeUser(disconnectingUser);
     })