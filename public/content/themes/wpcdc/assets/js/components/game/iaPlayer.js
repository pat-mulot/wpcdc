const iaPlayer = {
    otherPlayersContainerElement: null,
    currentIaPlayerContainer: null,
    iaName: "",
    playerTurn: true,
    iaTurn: false,
    scoreFig: 0,
    currentScore: [],
    number: 0,
    currentIaTurnId: 0,
    playerIndex: 0,
    // -------------- CHECK FIGURES -------------- //
    init() {
        iaPlayer.iaName = iaPlayer.player[gameApp.iaSelected - 1].name;
        iaPlayer.otherPlayersContainerElement = document.querySelector(".other_players");
        iaPlayer.otherPlayersContainerElement.style.display = "flex";
        // otherPlayersElements.classList.add(gameApp.iaSelected - 1);
        iaPlayer.createPlayer(gameApp.iaSelected - 1);
    },
    player: [
        // CREER UNE DUREE VARIABLE DE LANCEE DE DES 
        // ET SI UN JOUEUR LANCE TOUS LES DES 
        // A MOINS D'1SEC D'INTERVAL 
        // ALORS IL Y A BEVUE
        {
            // "index": 3,
            "name": "Kadoc",
            "sirotageChoice": function () {
                // let choice = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
                let choice = 1;
                return choice;
            },
            "grelotteDuration": function () {
                let duration = 3000;
                return duration;
            },
            "coefBevue": function () {
                let coef = 0.5 + (Math.floor(Math.random() * 3 - 0 + 1) / 10);
                return coef;
            },
        },
        {
            // "index": 2,
            "name": "Karadoc",
            "sirotageChoice": function () {
                let choice = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
                // let choice = 1;
                return choice;
            },
            "grelotteDuration": function () {
                let duration = 2000;
                return duration;
            },
            "coefBevue": function () {
                let coef = 0.5 + (Math.floor(Math.random() * 3 - 0 + 1) / 10);
                return coef;
            },
        },
        {
            // "index": 1,
            "name": "Perceval",
            "sirotageChoice": function () {
                let choice;
                if (dices.dicesTab[rules.diceToRerollIndex] <= 6) {
                    choice = 1;
                } else {
                    choice = 0;
                }
                // // let choice = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
                return choice;
            },
            "grelotteDuration": function () {
                let duration = 1500;
                return duration;
            },
            "coefBevue": function () {
                let chance = Math.floor(Math.random() * 10 - 0 + 1);
                let coef;
                if (chance > 9) {
                    coef = (Math.floor(Math.random() * 5 - 0 + 1) / 10) + 1;
                } else {
                    coef = (Math.floor(Math.random() * 10 - 0 + 1) / 10);
                }
                // let coef = 0.5 + (Math.floor(Math.random() * 3 - 0 + 1) / 10);
                // let coef = 0.75;
                // let coef = 1;
                return coef;
            },
        },
        {
            // "index": 4,
            "name": "Provençal le Gaulois",
            "sirotageChoice": function () {
                let choice = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
                // let choice = 1;
                return choice;
            },
            "grelotteDuration": function () {
                let duration = 1000;
                return duration;
            },
            "coefBevue": function () {
                let coef = 0.7;
                return coef;
            },
        },
        {
            // "index": 5,
            "name": "Merlin",
            "sirotageChoice": function () {
                let choice = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
                return choice;
            },
            "grelotteDuration": function () {
                let duration = 3000;
                return duration;
            },
            "coefBevue": function () {
                let coef = 0.5 + (Math.floor(Math.random() * 3 - 0 + 1) / 10);
                return coef;
            },
            // sortilège d'illusion sur le joueur
            // // se trompe une fois sur 2 et fait disparaitre les dés
            // // change la couleur ou la valeur des dés
            // sort de chance et fait des dés de 7
            // sortilège de chance
        },
        {
            // "index": 5,
            "name": "Venek",
            "sirotageChoice": function () {
                let choice = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
                return choice;
            },
            "grelotteDuration": function () {
                let duration = 1500;
                return duration;
            },
            "coefBevue": function () {
                let coef = 0.5 + (Math.floor(Math.random() * 3 - 0 + 1) / 10);
                return coef;
            },
            // triche et se rajoute des points de temps à autre
            // triche et change ses dés contre des dés truqués
        },
    ],
    createPlayer: function (playerId) {
        let templateOthePlayer = document.querySelector("#tpl-other_player");
        let otherPlayerElement = templateOthePlayer.content.cloneNode(true);
        iaPlayer.otherPlayersContainerElement.appendChild(otherPlayerElement);
        let otherPlayerElements = iaPlayer.otherPlayersContainerElement.querySelectorAll(".score-ia");
        otherPlayerElements[iaPlayer.number].classList.add("player-" + iaPlayer.number);
        otherPlayerElements[iaPlayer.number].dataset.playerId = playerId;
        let otherPlayersNameElements = otherPlayerElements[iaPlayer.number].querySelector(".other_player-name");
        // otherPlayersNameElements[playerId].textContent = iaPlayer.player[playerId].name;
        otherPlayersNameElements.textContent = iaPlayer.player[playerId].name;
        // otherPlayersNameElements[0].dataset.playerId = playerId;
        iaPlayer.currentScore.push(0);
        iaPlayer.currentIaPlayerContainer = document.querySelectorAll(".score-ia, .player-" + iaPlayer.playerIndex)[iaPlayer.playerIndex];
        iaPlayer.currentIaTurnId = iaPlayer.currentIaPlayerContainer.dataset.playerId;
        iaPlayer.number++;
    },
    iaDiceRoll() {
        if (!iaPlayer.playerTurn && iaPlayer.iaTurn) {
            // Stylising current ia player :
            iaPlayer.currentIaPlayerContainer = document.querySelectorAll(".score-ia, .player-" + iaPlayer.playerIndex)[iaPlayer.playerIndex];
            iaPlayer.currentIaTurnId = iaPlayer.currentIaPlayerContainer.dataset.playerId;
            let currentIaPlayerElement = iaPlayer.currentIaPlayerContainer.querySelector(".score-total-other_players");
            currentIaPlayerElement.classList.add("active");
            gameApp.currentPlayerName = iaPlayer.player[iaPlayer.currentIaTurnId].name;
            // checking current player's turn :
            gameApp.playerDiceRoll(gameApp.rollEvent);
            setTimeout(() => {
                if (!iaPlayer.playerTurn && iaPlayer.iaTurn) {
                    gameApp.playerDiceRoll(gameApp.rollEvent);
                }
            }, 1000);
            setTimeout(() => {
                if (!iaPlayer.playerTurn && iaPlayer.iaTurn) {
                    gameApp.playerDiceRoll(gameApp.rollEvent);
                }
            }, 2000);
            // let lastRoll = 3000;
            // if (iaPlayer.iaTurn && rules.iaPlayerSiropStatus) {
            //     lastRoll = 5000;
            // }
            let duration = 3000;
            // if (grelotte.grelotteRunning) {
            //     currentTimer += grelotte.duration;
            // }
            setTimeout(() => {
                gameApp.playerDiceRoll(gameApp.rollEvent);
                // iaPlayer.iaTurn = false;
                // iaPlayer.playerTurn = true;
            }, duration);
        };
    },
    iaSirotageChoice() {
        let sirotageChoice = iaPlayer.player[iaPlayer.currentIaTurnId].sirotageChoice();
        return sirotageChoice
    }
}