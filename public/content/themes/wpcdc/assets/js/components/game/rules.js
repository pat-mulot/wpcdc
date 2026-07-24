const rules = {
    enableRules: {
        "bevue": false,
        "grelotte": false,
        "sirotage": false,
        "grelottine": false,
        "civet": false,
    },
    diceToRerollIndex: 0,
    diceContainerToReroll: Object,
    diceToReroll: Object,
    sirotageRunning: false,
    sirotageCounter: 0,
    sirotageSuccess: 0,
    sirotageTimer: false,
    sirotageDuration: 3000,
    sirotageInterval: 500,
    iaGambleValue: 0,
    playerGambleValue: 0,
    iaPlayerSiropStatus: false,
    playerGambleSirop: 0,
    playerGambleSiropSuccess: 0,
    // -------------- DICES INIT -------------- //
    init: function () {
        if (rules.enableRules["bevue"]) {
            bevue.init();
        }
        if (rules.enableRules["grelotte"]) {
            grelotte.init();
        }
        let playSirotageButton = document.querySelector(".sirotage-yes");
        let cancelSirotageButton = document.querySelector(".sirotage-no");
        playSirotageButton.addEventListener("touchstart", rules.handleClickOnPlaySirotage);
        playSirotageButton.addEventListener("click", rules.handleClickOnPlaySirotage);
        cancelSirotageButton.addEventListener("touchend", rules.handleClickOnCancelSirotage);
        cancelSirotageButton.addEventListener("click", rules.handleClickOnCancelSirotage);
        let allSiropElements = document.querySelectorAll(".sirop");
        for (let oneSirop of allSiropElements) {
            oneSirop.addEventListener("touchstart", rules.handleClickOnSiropSelector);
            oneSirop.addEventListener("click", rules.handleClickOnSiropSelector);
        };
    },
    checkSirotage(diceIndex) {
        setTimeout(() => {
            gameApp.clickEnable = false;
            rules.diceToRerollIndex = diceIndex;
            rules.diceContainerToReroll = document.querySelectorAll(".dice_container")[(2 - rules.diceToRerollIndex)];
            rules.diceToReroll = rules.diceContainerToReroll.querySelector(".dice");
            rules.sirotageRunning = true;
            if (iaPlayer.playerTurn) {
                rules.displaySirotageMessage();
                // rules.playerSirotage(diceSirop);
                return
            } else if (iaPlayer.iaTurn) {
                setTimeout(() => {
                    let iaChoice = iaPlayer.iaSirotageChoice();
                    // IF IA DECIDE TO SIROTER :
                    if (iaChoice === 1) {
                        rules.iaPlayerSiropStatus = true;
                        rules.iaPlaySirotage();
                        return;
                    } else {
                        rules.iaPlayerSiropStatus = false;
                        rules.sirotageRunning = false;
                        setTimeout(() => {
                            gameApp.playerDiceRoll();
                        }, 500);
                        return;
                    };
                }, 1000);
            }
        }, 500);
    },
    displaySirotageMessage() {
        let sirotageMessageElementContainer = document.querySelector(".message-sirop-container");
        sirotageMessageElementContainer.style.display = "flex";
        setTimeout(function () {
            sirotageMessageElementContainer.classList.add("active")
        }, 50);

    },
    handleClickOnPlaySirotage(evt) {
        evt.preventDefault();
        rules.sirotageCounter++;
        rules.diceContainerToReroll.classList.remove("rollAnim" + (rules.diceToRerollIndex + 1));
        if (!iaPlayer.iaTurn) {
            if (rules.diceToRerollIndex === 0) {
                dices.diceContainer1.style.transform = "translateX(-4rem)";
            } else if (rules.diceToRerollIndex === 1) {
                dices.diceContainer2.style.transform = "translateX(-2rem)";
            } else if (rules.diceToRerollIndex === 2) {
                dices.diceContainer3.style.transform = "translate(0,0)";
            }
        }
        rules.diceToReroll.classList.remove("active");
        rules.sirotageStart();
        let sirotageMessageElementContainer = document.querySelector(".message-sirop-container");
        sirotageMessageElementContainer.classList.remove("active");
        // setTimeout(function () {
        //     sirotageMessageElementContainer.style.display = "none";
        // }, 500);
        rules.playerRollSirop();
    },
    iaPlaySirotage() {
        rules.displayPlayerSiropSelector();
        rules.diceContainerToReroll.classList.remove("rollAnim" + (rules.diceToRerollIndex + 1) + "-other");
        if (iaPlayer.iaTurn) {
            if (rules.diceToRerollIndex === 0) {
                dices.diceContainer1.style.transform = "translate(0,0)";
            } else if (rules.diceToRerollIndex === 1) {
                dices.diceContainer2.style.transform = "translateX(2rem)";
            } else if (rules.diceToRerollIndex === 2) {
                dices.diceContainer3.style.transform = "translateX(4rem)";
            }
        }
        rules.diceToReroll.classList.remove("active");
        rules.sirotageStart();
        rules.playerRollSirop();
    },
    handleClickOnCancelSirotage(evt) {
        evt.preventDefault();
        let sirotageMessageElementContainer = document.querySelector(".message-sirop-container");
        sirotageMessageElementContainer.classList.remove("active");
        setTimeout(function () {
            sirotageMessageElementContainer.style.display = "none";
            rules.sirotageRunning = false;
            gameApp.clickEnable = true;
            gameApp.playerDiceRoll();
        }, 500);
    },
    playerRollSirop() {
        setTimeout(() => {
            rules.sirotageRunning = "sirotage";
            rules.sirotageStop();
            if (iaPlayer.iaTurn) {
                setTimeout(() => {
                    // setTimeout(() => {
                    // if(gameApp.clickEnable) {
                    gameApp.playerDiceRoll();
                    //     gameApp.clickEnable = true;
                    // }
                    // }, 500);
                }, 500);
            }
        }, rules.sirotageDuration);
    },
    // ------------------- Sirotage timer : ------------------- //
    sirotageStart() {
        gameApp.clickEnable = false;
        let index = 2;
        rules.sirotageInterval = rules.sirotageDuration / 50;
        let timerElement = document.querySelector(".sirotage_timer-container");
        let timerBarElement = timerElement.querySelector(".sirotage_timer-bar");
        timerElement.style.display = "flex";
        setTimeout(() => {
            timerElement.classList.add("active");
        }, 50);
        rules.sirotageTimer = setInterval(function () {
            timerBarElement.style.width = index + "%";
            if (rules.iaPlayerSiropStatus) {
                rules.diceToReroll.classList.add("active");
            }
            if (index === 100) {
                if (!rules.iaPlayerSiropStatus) {
                    rules.diceToReroll.classList.add("active");
                }
                timerBarElement.querySelector(".bar-cursor").classList.add("active");
                if (gameApp.iaEnable) {
                    if (rules.iaPlayerSiropStatus) {}
                    if (iaPlayer.playerTurn) {
                        rules.iaGamble();
                    }
                    // else if (iaPlayer.iaTurn) {
                    //     gameApp.clickEnable = true;
                    // }
                }
            }
            index += 2;
        }, rules.sirotageInterval);
    },
    sirotageStop() {
        clearInterval(rules.sirotageTimer);
        let timerElement = document.querySelector(".sirotage_timer-container");
        let timerBarElement = timerElement.querySelector(".sirotage_timer-bar");
        timerElement.classList.remove("active");
        timerBarElement.querySelector(".bar-cursor").classList.remove("active");
        setTimeout(() => {
            timerElement.style.display = "none";
            let siropSelectorElement = document.querySelector(".sirop_selector-container");
            if (siropSelectorElement && siropSelectorElement.style.display === "flex") {
                siropSelectorElement.classList.remove("active");
                setTimeout(() => {
                    siropSelectorElement.style.display = "none";
                }, 50);
            } else {
                dices.displayDiceRollGauge();
            }
            // if(!iaPlayer.iaTurn) {
            //     gameApp.clickEnable = true;
            // }
            gameApp.clickEnable = true;
        }, 300);
    },
    iaGamble() {
        rules.iaGambleValue = dices.diceRand();
        let iaGambleMessage = document.querySelector(".message-sirop-gamble");
        iaGambleMessage.style.display = "flex";
        iaGambleMessage.innerHTML = '<span class="message-gamble">' + iaPlayer.player[iaPlayer.currentIaTurnId].name + ' a parié <br><span class="gamble_value">' + rules.iaGambleValue + '</span></span>'
        let gambleValue = iaPlayer.currentIaPlayerContainer.querySelector("#gamble-nb-ia");
        gambleValue.style.display = "flex";
        setTimeout(() => {
            iaGambleMessage.classList.add("active");
            iaGambleMessage.querySelector(".message-gamble").classList.add("active");
            gambleValue.classList.add("active");
            gambleValue.textContent = rules.iaGambleValue;
        }, 50);
        setTimeout(() => {
            iaGambleMessage.classList.remove("active");
            iaGambleMessage.querySelector(".message-gamble").classList.remove("active");
            // setTimeout(() => {
            //     iaGambleMessage.style.display = "none";
            // }, 50);
        }, 1500)
    },
    playerGamble() {
        if (rules.playerGambleValue) {
            let playerGambleMessage = document.querySelector(".message-sirop-gamble");
            playerGambleMessage.style.display = "flex";
            playerGambleMessage.innerHTML = '<span class="message-gamble">Vous avez parié <br><span class="gamble_value">' + rules.playerGambleValue + '</span></span>';
            setTimeout(() => {
                playerGambleMessage.classList.add("active");
                playerGambleMessage.querySelector(".message-gamble").classList.add("active");
            }, 50);
            setTimeout(() => {
                playerGambleMessage.classList.remove("active");
                playerGambleMessage.querySelector(".message-gamble").classList.remove("active");
                // setTimeout(() => {
                //     playerGambleMessage.style.display = "none";
                // }, 50);
            }, 1500);
        };
    },
    iaGambleCheck() {
        let msg;
        let msgClass;
        if (dices.dicesTab[rules.diceToRerollIndex] === rules.iaGambleValue) {
            msg = "gagné<br>+25pts";
            msgClass = "win";
            // adding gamble success score (25pts) to IA :
            iaPlayer.currentScore[iaPlayer.playerIndex] += 25;
            let scoreContainerElement = iaPlayer.currentIaPlayerContainer.querySelector(".score-total-other_players");
            scoreContainerElement.textContent = iaPlayer.currentScore[iaPlayer.playerIndex];
        } else {
            msg = "perdu";
            msgClass = "lost";
        };
        let gambleValue = iaPlayer.currentIaPlayerContainer.querySelector("#gamble-nb-ia");
        gambleValue.classList.remove("active");
        gambleValue.textContent = rules.iaGambleValue;
        let gambleScoreMsg = iaPlayer.currentIaPlayerContainer.querySelector("#gamble-score_msg-ia");
        gambleScoreMsg.style.display = "flex";
        gambleScoreMsg.querySelector("span").innerHTML = msg;
        setTimeout(() => {
            gambleScoreMsg.classList.add(msgClass);
            gambleScoreMsg.querySelector("span").classList.add("active");
        }, 50);
        setTimeout(() => {
            gambleValue.style.display = "none";
        }, 300);
        setTimeout(() => {
            gambleScoreMsg.style.display = "none";
            gambleScoreMsg.classList.remove(msgClass);
            gambleScoreMsg.querySelector("span").classList.remove("active");
            rules.iaGambleValue + 0;
        }, 1000);
    },
    playerGambleCheck() {
        let msg;
        let msgClass;
        if (dices.dicesTab[rules.diceToRerollIndex] === rules.playerGambleValue) {
            msg = "gagné<br>+25pts";
            msgClass = "win";
            rules.playerGambleSiropSuccess++;
            // adding gamble success score (25pts) to IA :
            scores.currentScore += 25;
            let scoreContainerElement = document.querySelector("#score-total");
            scoreContainerElement.textContent = scores.currentScore;
        } else if (rules.playerGambleValue === 0) {
            msg = "";
            msgClass = "";
        } else {
            msg = "perdu";
            msgClass = "lost";
        };
        let gambleValue = document.querySelector("#gamble-nb-player");
        gambleValue.classList.remove("active");
        gambleValue.textContent = rules.iaGambleValue;
        let gambleScoreMsg = document.querySelector("#gamble-score_msg-player");
        gambleScoreMsg.style.display = "flex";
        gambleScoreMsg.querySelector("span").innerHTML = msg;
        setTimeout(() => {
            if (msgClass !== "") {
                gambleScoreMsg.classList.add(msgClass);
            }
            gambleScoreMsg.querySelector("span").classList.add("active");
        }, 50);
        setTimeout(() => {
            gambleValue.style.display = "none";
        }, 300);
        setTimeout(() => {
            gambleScoreMsg.style.display = "none";
            if (msgClass !== "") {
                gambleScoreMsg.classList.remove(msgClass);
            }
            gambleScoreMsg.querySelector("span").classList.remove("active");
            gameApp.playerDiceRoll();
            rules.iaPlayerSiropStatus = false;
            rules.iaGambleValue = 0;
        }, 2000);
        rules.sirotageRunning = false;
    },
    displayPlayerSiropSelector() {
        let siropSelectorElement = document.querySelector(".sirop_selector-container");
        siropSelectorElement.style.display = "flex";
        setTimeout(() => {
            siropSelectorElement.classList.add("active");
        }, 50);
    },
    handleClickOnSiropSelector(evt) {
        evt.preventDefault();
        rules.playerGambleSirop++;
        rules.playerGambleValue = parseInt(evt.currentTarget.dataset.diceValue);
        let siropSelectorElement = document.querySelector(".sirop_selector-container");
        siropSelectorElement.classList.remove("active");
        let gambleValue = document.querySelector("#gamble-nb-player");
        gambleValue.style.display = "flex";
        setTimeout(() => {
            gambleValue.classList.add("active");
            gambleValue.textContent = rules.playerGambleValue;
        }, 50);
        setTimeout(() => {
            siropSelectorElement.style.display = "none";
        }, 500);
    },
}