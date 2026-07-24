// # 1  -  SERVER CONFIG :
const fs = require("fs");
const port = 8080;
const https = require("https");
const { isError } = require("util");
httpServer = https.createServer({
    cert: fs.readFileSync("./cert.pem"),
    key: fs.readFileSync("./privkey.pem"),
    requestCert: true,
    rejectUnauthorized: false
})
var io = require("socket.io")(httpServer, {
    cors: {
        origin: '*',
        //   origin: 'https://http://localhost/projets/test_websocket/tchat/',
        //   credentials: true,
        // origin: "https://pat-mulot.com",
        // methods: ["GET", "POST"]
    }
});
httpServer.listen(port, () => {
    // console.log("listening on * : " + port);
});

// DEFINITION DES VARIABLES ACCESSIBLES A TOUS LES CLIENTS :
let usersList = [];
let msgsList = [];
// let messagesHistory = 3;
idsforUsers = 0;
idsforMsgs = 0;

// #  0  - connection au server
// écoute de la connexion utilisateur :
io.sockets.on('connection', (socket) => {
    // console.log("new user connected")
// ====================================================== //
//                         USERS                         //
// ==================================================== //
    // ------------------------ # LOGIN 2 ------------------------ //
    /**
     * Reception de l'utilisateur connecté depuis l'event login côté client
     * emit event newConnectedUser avec l'utilisateur vers le server
     */
    let meUser = false;
    // récupération des utilisateurs connectés
    getAllConnectedUsers();
    getMsgsHistory();
    socket.on("login", (connectedUser) => {
        // definition de l'utilisateur connecté
        idsforUsers++;
        meUser = connectedUser;
        meUser.userId = "user-" + idsforUsers;
        // ajout de l'utilisateur dans la liste côté server
        usersList[meUser.userId] = meUser;
        // emission de la connexion réussie a l'utilisateur client
        socket.emit("logged", meUser);
        // emission de nouvel utilisateur a tous les clients
        socket.broadcast.emit("newConnectedUser", meUser);
    })
    // récupération de tous les utilisateurs déjà connecté
    function getAllConnectedUsers() {
        for (let userIndex in usersList) {
            // socket.emit("newConnectedUser", usersList[user])
            if (usersList[userIndex]) {
                socket.emit("newConnectedUser", usersList[userIndex]);
            }
        }
    };
    // récupération de tous les utilisateurs déjà connecté
    function getMsgsHistory() {
        for (let msgIndex in msgsList) {
            // socket.emit("newConnectedUser", usersList[user])
            if (msgsList[msgIndex]) {
                socket.emit("newMsgSent", msgsList[msgIndex]);
            }
        }
    };
    // ------------------------ # LOGIN 4 ------------------------ //
    /**
     * gestion de la deconnexion d'un utilisateur
     * emit l'utilisateur qui se deco à tous les utilisateurs / clients
     */
    socket.on("disconnect", () => {
        // si il y a bien un utilisateur
        if (meUser) {
            // supression de l'utilisateur de la liste des utilisateurs :
            delete usersList[meUser.userId];
            io.sockets.emit("disconnectUser", meUser);
        }
    })

// ======================================================= //
//                        MESSAGES                        //
// ===================================================== //
    // ------------------------ # MESSAGE 2 ------------------------ //
    /**
     * récupération de l'event sendMsg et du message envoyé
     * emit le message aux utilisateurs
     */
     socket.on("sendMsg", (msgSent) => {
        idsforMsgs++;
        let date = new Date();
        // msgSent.msgDateTime = date.toLocaleString("fr-FR");
        msgSent.msgDate = date.toLocaleDateString("fr-FR");
        // msgSent.msgTime = date.toLocaleTimeString("fr-FR");
        msgSent.msgHours = date.getHours();
        msgSent.msgMinutes = date.getMinutes();
        msgSent.msgId = idsforMsgs;
        msgsList[msgSent.msgId] = msgSent;
        io.sockets.emit("newMsgSent", msgSent);
    })
})
