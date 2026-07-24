const scoresSheet = {
    players: [],
    currentPlayerId: 0,
    currentPlayerName: "Nouveau Joueur",
    currentPlayerScore: 0,
    // isScoreMaxSetting: false,
    isNewPlayerAdd: true,
    isPlayerScoreAdd: false,
    currentPlayerIdToUpdate: 0,
    currentScoreElementToUpdate: "",
    currentScoreCoef: 1,
    winner: "",
    scoreMax: 343,
    isViewInited: false,
    'init': function () {
        const addPlayerElement = document.querySelector(".player-add-container");
        if (addPlayerElement) {
            addPlayerElement.addEventListener("click", scoresSheet.handleClickOneAddPlayer);
        }
        let newPlayerFormElement = document.querySelector(".new_player-form-background");
        if (newPlayerFormElement) {
            newPlayerFormElement.addEventListener("click", scoresSheet.hydeNewPlayerForm);
        }
        let validatePlayerNameButton = document.querySelectorAll(".submit-player_name");
        for (oneButton of validatePlayerNameButton) {
            oneButton.addEventListener("click", scoresSheet.validateNewPlayer);
        }
        let addPointsButton = document.querySelectorAll(".points-add");
        for (oneButton of addPointsButton) {
            oneButton.addEventListener("click", scoresSheet.addPointsToPlayer);
        }
        let removePointsButton = document.querySelectorAll(".points-remove");
        for (oneButton of removePointsButton) {
            oneButton.addEventListener("click", scoresSheet.removePointsToPlayer);
        }
        let removePlayerButton = document.querySelectorAll(".player-remove");
        for (oneButton of removePlayerButton) {
            oneButton.addEventListener("click", scoresSheet.removePlayer);
        }
        let setMaxScoreButton = document.querySelectorAll(".max_score-button");
        for (oneButton of setMaxScoreButton) {
            oneButton.addEventListener("click", scoresSheet.editMaxScore);
        }
        let scoreMaxElement = document.querySelector(".score_max");
        if (scoreMaxElement) {
            scoreMaxElement.textContent = scoresSheet.scoreMax;
        }
        let playerNameInputElement = document.querySelector("#new_player-form-name");
        let scoreInput = document.querySelector("#score_input");
        if (playerNameInputElement) {
            playerNameInputElement.addEventListener('keydown', function (evt) {
                if (evt.key === "Enter") {
                    playerNameInputElement.addEventListener("blur", scoresSheet.validateNewPlayer);
                    playerNameInputElement.blur();
                }
            });
        }
        if (scoreInput) {
            scoreInput.blur();
            scoreInput.addEventListener('keydown', function (evt) {
                if (evt.key === "Enter") {
                    scoreInput.addEventListener("blur", scoresSheet.validateNewPlayer);
                    scoreInput.blur();
                }
            });
        }
    },
    initStoredPlayers() {
        let newPlayerFormElement = document.querySelector(".new_player-form");
        if (newPlayerFormElement) {
            if (!scoresSheet.viewInited) {
                let storedPlayers = scoresSheet.getStoredScores();
                if (storedPlayers) {
                    for (let storedPlayer of storedPlayers) {
                        scoresSheet.players.push(storedPlayer);
                        scoresSheet.createNewPlayer(storedPlayer);
                        let storedPlayerId = parseInt(storedPlayer.id ?? 0);
                        if (!scoresSheet.currentPlayerId || scoresSheet.currentPlayerId < storedPlayerId) {
                            scoresSheet.currentPlayerId = storedPlayerId;
                        }
                    }
                }
                newPlayerFormElement.style.opacity = 1;
                scoresSheet.isViewInited = true;
            }
            let scoreMax = scoresSheet.getStoredMaxScore();
            if (scoreMax) {
                let scoreMaxElement = document.querySelector(".score_max");
                scoreMaxElement.textContent = scoreMax;
                scoresSheet.scoreMax = scoreMax;
            }
        }
    },
    getStoredScores() {
        const json = window.localStorage.getItem("stored_scores");
        const value = JSON.parse(json) ?? [];
        return value;
    },
    setStoredScores(scoresData) {
        window.localStorage.setItem("stored_scores", JSON.stringify(scoresData));
    },
    getStoredMaxScore() {
        return window.localStorage.getItem("stored_max_score") ?? 343;
    },
    setStoredMaxScore(score) {
        window.localStorage.setItem("stored_max_score", parseInt(score));
    },
    editMaxScore(evt) {
        evt.preventDefault();
        let scoreMaxElement = document.querySelector(".score_max");
        scoreMaxElement.style.display = "none";
        let scoreMaxInput = document.querySelector(".edit-score_max");
        scoreMaxInput.style.display = "initial";
        scoreMaxInput.focus();
        scoreMaxInput.addEventListener("blur", scoresSheet.updateScoreMax);

    },
    updateScoreMax() {
        let scoreMaxInput = document.querySelector(".edit-score_max");
        let scoreMaxElement = document.querySelector(".score_max");
        scoresSheet.scoreMax = scoreMaxInput.value;
        scoreMaxInput.style.display = "none";
        scoreMaxElement.style.display = "initial";
        scoresSheet.init();
        scoreMaxElement.textContent = scoreMaxInput.value;
        scoreMaxInput.value = "";
        if (scoresSheet.scoreMax) {
            scoresSheet.setStoredMaxScore(scoresSheet.scoreMax);
        } else {
            scoresSheet.setStoredMaxScore(343);
        }
    },
    handleClickOneAddPlayer(evt) {
        evt.preventDefault();
        scoresSheet.displayNewPlayerForm();
    },
    displayNewPlayerForm() {
        // document.querySelector("main").style.overflowY = "hidden";
        let scoreInput = document.querySelector("#score_input");
        scoreInput.style.display = "none";
        let newPlayerFormElement = document.querySelector(".new_player-form");
        newPlayerFormElement.style.display = "flex";
        let playerNameInputElement = document.querySelector("#new_player-form-name");
        playerNameInputElement.style.display = "flex";
        playerNameInputElement.focus();
        setTimeout(function () {
            newPlayerFormElement.style.opacity = 1;
        }, 100);
    },
    validateNewPlayer(evt) {
        if (scoresSheet.isNewPlayerAdd) {
            let playerNameInputElement = document.querySelector("#new_player-form-name");
            scoresSheet.currentPlayerId += 1;
            scoresSheet.currentPlayerName = playerNameInputElement.value;
            scoresSheet.currentPlayerScore = 0;
            let newPlayerTemp = {};
            newPlayerTemp["id"] = scoresSheet.currentPlayerId;
            newPlayerTemp["name"] = scoresSheet.currentPlayerName;
            newPlayerTemp["score"] = scoresSheet.currentPlayerScore;
            scoresSheet.players.push(newPlayerTemp);
            scoresSheet.createNewPlayer(newPlayerTemp);
            playerNameInputElement.value = "";
        } else if (scoresSheet.isPlayerScoreAdd) {
            let currentPlayerScore = parseInt(document.querySelector("#score_input").value);
            if(isNaN(currentPlayerScore)) {
                currentPlayerScore = 0;
            }
            for (let onePlayer of scoresSheet.players) {
                if (parseInt(onePlayer.id) == scoresSheet.currentPlayerIdToUpdate) {
                    onePlayer.score += (currentPlayerScore * scoresSheet.currentScoreCoef);
                    scoresSheet.updateScore(onePlayer.score);
                    scoresSheet.checkEndGame();
                }
            }
        }
        scoresSheet.setStoredScores(scoresSheet.players)
    },
    hydeNewPlayerForm(evt) {
        if (evt) {
            evt.preventDefault();
        }
        let newPlayerFormElement = document.querySelector(".new_player-form");
        newPlayerFormElement.style.display = "none";
        isScoreMaxSetting = false;
    },
    createNewPlayer(newPlayer) {
        let playerTemplateElement = document.querySelector(".player-tpl");
        if (playerTemplateElement) {
            let newPlayerToClone = playerTemplateElement.content.cloneNode(true);
            newPlayerToClone.querySelector(".player-row").dataset.playerId = newPlayer.id;
            newPlayerToClone.querySelector(".name_link").textContent = newPlayer.name;
            newPlayerToClone.querySelector(".player-score").textContent = newPlayer.score;
            let listElement = document.querySelector(".new_player-tpl-container");
            listElement.appendChild(newPlayerToClone);
            scoresSheet.hydeNewPlayerForm();
            scoresSheet.init();
            let allPlayerRowsElements = document.querySelectorAll(".player-row");
            setTimeout(function () {
                allPlayerRowsElements[allPlayerRowsElements.length - 1].style.opacity = 1;
            }, 50);
        }
    },
    addPointsToPlayer(evt) {
        evt.preventDefault();
        scoresSheet.currentScoreCoef = 1;
        scoresSheet.currentScoreElementToUpdate = evt.currentTarget.closest(".player-row").querySelector(".player-score");
        scoresSheet.currentPlayerIdToUpdate = evt.currentTarget.closest(".player-row").dataset.playerId;
        scoresSheet.editScore();
    },
    removePointsToPlayer(evt) {
        evt.preventDefault();
        scoresSheet.currentScoreCoef = -1;
        scoresSheet.currentScoreElementToUpdate = evt.currentTarget.closest(".player-row").querySelector(".player-score");
        scoresSheet.currentPlayerIdToUpdate = evt.currentTarget.closest(".player-row").dataset.playerId;
        scoresSheet.editScore();
    },
    editScore(evt) {
        scoresSheet.isNewPlayerAdd = false;
        scoresSheet.isPlayerScoreAdd = true;
        let playerNameInputElement = document.querySelector("#new_player-form-name");
        playerNameInputElement.style.display = "none";
        let newPlayerFormElement = document.querySelector(".new_player-form");
        newPlayerFormElement.style.display = "flex";
        let scoreInput = document.querySelector("#score_input");
        scoreInput.style.display = "flex";
        scoreInput.focus();
    },
    updateScore(newScore) {
        scoresSheet.currentScoreElementToUpdate.textContent = newScore;
        scoresSheet.hydeNewPlayerForm();
        document.querySelector("#score_input").value = "";
        scoresSheet.isNewPlayerAdd = true;
        scoresSheet.isPlayerScoreAdd = false;
    },
    checkEndGame() {
        for (let onePlayer of scoresSheet.players) {
            if (onePlayer.score >= scoresSheet.scoreMax) {
                scoresSheet.winner = onePlayer.name;
                scoresSheet.isNewPlayerAdd = false;
                scoresSheet.isPlayerScoreAdd = false;
                scoresSheet.displayEndGame();
            }
        }
    },
    displayEndGame() {
        scoresSheet.displayNewPlayerForm();
        document.querySelector("#winner").textContent = scoresSheet.winner;
        document.querySelector(".submit-player_name").style.display = "none";
        document.querySelector("#new_player-form-name").style.display = "none";
        document.querySelector("#endgame_message-container").style.display = "flex";
        setTimeout(function () {
            document.querySelector("#endgame_message-container").style.opacity = 1;
            document.querySelector(".new_player-form-background").style.backgroundColor = "black";
        }, 100);
    },
    removePlayer(evt) {
        evt.preventDefault();
        let liElement = evt.currentTarget.closest("li");
        let playerId = parseInt(liElement.dataset.playerId);
        let playerName = liElement.querySelector(".name_link").textContent;
        scoresSheet.players = scoresSheet.players.filter((player) => {
            if (player.id !== playerId && player.name !== playerName) {
                return player;
            }
        });
        scoresSheet.setStoredScores(scoresSheet.players)
        liElement.remove();
        let hrElement = liElement.nextElementSibling;
        if (hrElement) {
            hrElement.remove();
        }
    }
}