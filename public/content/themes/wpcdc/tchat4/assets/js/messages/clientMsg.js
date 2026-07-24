// ------------------------ # LOGIN 1 ------------------------ //
/**
 * Récupération du form messages
 * emit l'event sendMsg avec le message vers le server
 */
msgUtils.msgFormElement.addEventListener("submit", submitMsg);

function submitMsg(evt) {
    evt.preventDefault();
    if (msgUtils.msgInputElement.value) {
        let newMsg = {
            msgSenderName: userUtils.currentUser.userName,
            msgSenderId: userUtils.currentUser.userId,
            msgContent: msgUtils.msgInputElement.value,
            msgDate: "",
            msgHours: "",
            msgMinutes: "",
            msgId: 0,
        }
        socket.emit("sendMsg", newMsg);
        msgUtils.msgInputElement.value = "";
        msgUtils.msgInputElement.focus();
    } else {
        alert("vous devez entrer un message");
    }
}
// ------------------------ # MESSAGE 3 ------------------------ //
/**
 * récupération d'un message depuis le server event newMsgSent
 * emit l'utilisateur qui se deco à tous les utilisateurs / clients
 */
socket.on("newMsgSent", (newMsg) => {
    
    msgUtils.msgListAdd(newMsg);

})