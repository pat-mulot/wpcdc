const msgUtils = {
    msgFormElement: null,
    msgInputElement: null,
    msgsListElement: null,
    previousMsg: null,
    allListedMsgsElements: [],
    lastSender: null,
    init: () => {
        msgUtils.msgFormElement = document.querySelector("#msg-form");
        msgUtils.msgInputElement = document.querySelector("#msg-input");
        msgUtils.msgsListElement = document.querySelector(".msg_list");
    },
    msgListAdd: (msg) => {
        let scrollHeightValue = msgUtils.msgsListElement.getBoundingClientRect().height;
        let sender;
        let sameClass = "";
        let selfClass = "";
        // si l'expediteur du message actuel est le même que le précédent expediteur
        if (msg.msgSenderName == userUtils.currentUser.userName) {
            // ajouter la classe same
            selfClass = "self";
        // alors ne pas répéter le nom et ajouter la classe "same"
            sender = "vous";
        }
        // si non afficher le nom de l'expediteur
        else {
            sender = msg.msgSenderName;
        }
        // si le précédent expéditeur est le même que l'expéditeur actuel
        if (msgUtils.previousMsg) {
            // si l'expediteur actuel est aussi le même que l'utilisateur client actuel
            if (msg.msgSenderName == msgUtils.previousMsg.msgSenderName) {
                // ajouter la classe "self" et définir le nom le nom comme "vous"
                sameClass = "same";
                // ne pas répéter le nom et ajouter la classe "same"
                sender = "";
            }
        }

        msgUtils.previousMsg = msg;

        const listedMsgTpl = document.querySelector("#listed_msg-tpl");
        let clonedListedMsg = listedMsgTpl.content.cloneNode(true);
        clonedListedMsg.querySelector('.msg').textContent = msg.msgContent;

        if (sender != msgUtils.lastSender) {
            clonedListedMsg.querySelector('.sender').textContent = sender;
        }
        if (sameClass) {
            clonedListedMsg.querySelector('li').classList.add(sameClass);
        }
        if (selfClass) {
            clonedListedMsg.querySelector('li').classList.add(selfClass);
        }
        clonedListedMsg.querySelector('.msg').dataset.msgId = msg.msgId;
        msgUtils.msgsListElement.append(clonedListedMsg);
        msgUtils.allListedMsgsElements[msg.msgId] = userUtils.clonedListedMsg;
        document.querySelector(".msg_list-container ").scrollTo(0, scrollHeightValue);
        msgUtils.lastSender = sender;
    },
}