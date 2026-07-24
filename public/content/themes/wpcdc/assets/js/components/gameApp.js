const gameApp = {
    rollEvent: false,
    roundCounter: 0,
    gameType: "practice",
    iaSelected: false,
    iaEnable: false,
    gameEnded: false,
    userName: "Vous",
    currentPlayerName: "Vous",
    players: [],
    gaugeElement: Object,
    gaugeContainerElement: Object,
    gaugeIndex: 0,
    clickOnDiceTableIndex: 0,
    holdClick: false,
    clickEnable: true,
    isFullScreen: false,
    playerTurnHitElement: null,
    init: function () {
        let gameOptionsElement = document.querySelector(".game_options-container");
        let typeSelectedElement = document.querySelector("#type_selected");
        if (gameOptionsElement) {
            if (typeSelectedElement) {
                typeSelectedElement.textContent = gameApp.gameType;
            };
            gameOptionsElement.style.display = "flex";
            setTimeout(() => {
                gameOptionsElement.classList.add("active");
                gameApp.setGameOptions();
            }, 50);
            let displayOptionsButton = document.querySelector(".display-options");
            displayOptionsButton.addEventListener("click", gameApp.handleClickOnDisplayOptions);
            let cancelOptionsBtn = document.querySelector(".cancel-btn");
            if (!gameApp.gameEnded) {
                cancelOptionsBtn.closest(".cancel-btn-container").style.display = "none";
            };
            cancelOptionsBtn.addEventListener("click", gameApp.handleClickOnCancelOptions);
        };
        dices.init();
        // ELEMENT TO ROLL DICES :
        let gameTable = document.querySelector(".dices_table");
        // let gameTable = document.querySelector("#dices-roll_handler");
        if (gameTable) {
            gameApp.gaugeContainerElement = document.querySelector(".dice_roll-gauge-container");
            gameApp.gaugeElement = document.querySelector(".dice_roll-gauge");
            gameTable.addEventListener("touchstart", gameApp.handleMousedownOnDiceTable);
            gameTable.addEventListener("mousedown", gameApp.handleMousedownOnDiceTable);
            gameTable.addEventListener("touchend", gameApp.handleMouseupOnDiceTable);
            gameTable.addEventListener("mouseup", gameApp.handleMouseupOnDiceTable);
        };
        let fullScreenBtn = document.querySelector(".fullscreen-btn");
        if (fullScreenBtn) {
            fullScreenBtn.addEventListener("click", () => {
                if (gameApp.isFullScreen) {
                    document.exitFullscreen();
                    gameApp.isFullScreen = false;
                    fullScreenBtn.classList.remove("active");
                    window.scrollTo(0, 0, "smooth");
                } else {
                    document.documentElement.requestFullscreen();
                    gameApp.isFullScreen = true;
                    fullScreenBtn.classList.add("active");
                    window.scrollTo(0, 0, "smooth");
                }
            })
        }
        gameApp.playerTurnHitElement = document.querySelector(".player_turn_hit-container");
    },
    // -------------- GAMES OPTIONS -------------- //
    handleClickOnDisplayOptions(evt) {
        evt.currentTarget.closest(".display-options").classList.add("active");
        // enable cancel button :
        let cancelOptionsBtn = document.querySelector(".cancel-btn");
        // if (!gameApp.gameEnded) {
        cancelOptionsBtn.closest(".cancel-btn-container").style.display = "flex";
        // }
        let gameOptionsElement = document.querySelector(".game_options-container");
        gameOptionsElement.style.display = "flex";
        setTimeout(() => {
            gameOptionsElement.classList.add("active");
            gameApp.setGameOptions();
        }, 50);
    },
    setGameMod() {
        let singlePlayerSelector = document.querySelector("#ia_select-form");
        // IF SELECTED GAME TYPE IS SINGLEPLAYER WITH IA
        if (selectedGameType === 2) {
            singlePlayerSelector.style.display = "flex";
            setTimeout(() => {
                singlePlayerSelector.classList.add("active");
                gameApp.setGameOptions();
            }, 50);
            gameApp.iaEnable = true;
            // DEFAULT IA IS PERCEVAL (index = 0)
            gameApp.iaSelected = 1;
            let allIaImages = document.querySelectorAll(".ia_img");
            let iaSelector = document.querySelector("#ia-dropdown-selector");
            iaSelector.addEventListener("change", (evt) => {
                // GETTING SELECTED IA OPTION :
                gameApp.iaSelected = parseInt(evt.target.querySelector("button").value);
                for (let oneIaImage of allIaImages) {
                    let oneIaImageContainer = oneIaImage.closest(".main_card-img-container");
                    oneIaImageContainer.style.display = "none";
                }
                let iaImageContainer = allIaImages[gameApp.iaSelected - 1].closest(".main_card-img-container");
                iaImageContainer.style.display = "flex";
            });
        } else {
            gameApp.setGameOptions();
            setTimeout(() => {
                singlePlayerSelector.classList.remove("active");
            }, 500);
            setTimeout(() => {
                singlePlayerSelector.style.display = "none";
            }, 501);
            gameApp.iaSelected = false;
            gameApp.iaEnable = false;
        }

    },
    setGameOptions() {
        let fullScreenBtnContainer = document.querySelector(".fullscreen-container");
        if (fullScreenBtnContainer) {
            fullScreenBtnContainer.style.display = "initial";
        }
        let gameTypeSelect = document.querySelector("#game_type-dropdown-selector");
        let selectedGameType;
        gameTypeSelect.addEventListener("change", (evt) => {
            selectedGameType = parseInt(evt.target.querySelector(".dropdown-btn").value);
            let singlePlayerSelector = document.querySelector("#ia_select-form");
            //		setGameOptions(selectedGameType);
            // IF SELECTED GAME TYPE IS SINGLEPLAYER WITH IA
            if (selectedGameType === 2) {
                singlePlayerSelector.style.display = "flex";
                setTimeout(() => {
                    singlePlayerSelector.classList.add("active");
                    gameApp.setGameOptions();
                }, 50);
                gameApp.iaEnable = true;
                // DEFAULT IA IS PERCEVAL (index = 0)
                gameApp.iaSelected = 1;
                let allIaImages = document.querySelectorAll(".ia_img");
                console.log("allIaImages", allIaImages)
                // allIaImages[0].style.display = "flex";
                let defaultIaImageContainer = allIaImages[0].closest(".main_card-img-container");
                defaultIaImageContainer.style.display = "flex";
                let iaSelector = document.querySelector("#ia-dropdown-selector");
                iaSelector.addEventListener("change", (evt) => {
                    // GETTING SELECTED IA OPTION :
                    gameApp.iaSelected = parseInt(evt.target.querySelector("button").value);
                    for (let oneIaImage of allIaImages) {
                        // oneIaImage.style.display = "none";
                        let oneIaImageContainer = oneIaImage.closest(".main_card-img-container");
                        oneIaImageContainer.style.display = "none";
                    }
                    // allIaImages[gameApp.iaSelected - 1].style.display = "flex";
                    let iaImageContainer = allIaImages[gameApp.iaSelected - 1].closest(".main_card-img-container");
                    iaImageContainer.style.display = "flex";
                });
            } else {
                gameApp.setGameOptions();
                setTimeout(() => {
                    singlePlayerSelector.classList.remove("active");
                }, 500);
                setTimeout(() => {
                    singlePlayerSelector.style.display = "none";
                }, 501);
                gameApp.iaSelected = false;
                gameApp.iaEnable = false;
            }
        });
        let rulesSelector = document.querySelector("#rules_list");
        let allRulesElements = rulesSelector.querySelectorAll("li");
        for (let oneRulesElement of allRulesElements) {
            oneRulesElement.addEventListener("click", gameApp.handleClickOnRule);
        }
        let gameOptionsSubmit = document.querySelector(".start_game-btn");
        gameOptionsSubmit.addEventListener("click", gameApp.gameStart);
    },
    handleClickOnCancelOptions(evt) {
        evt.preventDefault();
        let gameOptionsElement = evt.currentTarget.closest(".game_options-container");
        gameOptionsElement.classList.remove("active");
        document.querySelector(".display-options").classList.remove("active");

        setTimeout(() => {
            gameOptionsElement.style.display = "none";
        }, 500);
    },
    handleClickOnRule(evt) {
        let currentRuleOptionSelected = evt.currentTarget;
        let currentRuleOption = currentRuleOptionSelected.dataset.rule;
        if (currentRuleOptionSelected.classList.contains("active")) {
            currentRuleOptionSelected.classList.remove("active");
            rules.enableRules[currentRuleOption] = false;
        } else {
            currentRuleOptionSelected.classList.add("active");
            rules.enableRules[currentRuleOption] = true;
        }
        rules.init();
    },
    gameStart(evt) {
        evt.preventDefault();
        gameApp.players.push(gameApp.userName);
        // IF IA IS SELECTED 
        if (gameApp.iaEnable && gameApp.iaSelected) {
            // SETTING CURRENT IA SELECTED AND ENABLING IA_MOD
            iaPlayer.init();
            gameApp.players.push(iaPlayer.player[gameApp.iaSelected - 1].name);
        }
        let gameOptionsElement = document.querySelector(".game_options-container");
        gameOptionsElement.classList.remove("active");
        setTimeout(() => {
            gameOptionsElement.style.display = "none";
            figures.figName = "LA PARTIE PEUT COMMENCER";
            if (window.innerWidth < 700) {
                let startButtonContainer = document.querySelector(".start_game");
                startButtonContainer.style.display = "flex";
                setTimeout(() => {
                    startButtonContainer.classList.add("active");
                    startButtonContainer.querySelector("button").addEventListener("click", () => {
                        document.documentElement.requestFullscreen();
                        startButtonContainer.classList.remove("active");
                        setTimeout(() => {
                            startButtonContainer.style.display = "none";
                            if (!gameApp.playerTurnHitElement.classList.contains("active")) {
                                gameApp.playerTurnHitElement.classList.add("active");
                                gameApp.playerTurnHitElement.addEventListener("click", () => {
                                    gameApp.playerTurnHitElement.classList.remove("active");
                                })
                                gameApp.playerTurnHitElement.addEventListener("touchstart", () => {
                                    gameApp.playerTurnHitElement.classList.remove("active");
                                })
                            }
                        }, 500);
                        figures.displayMessageFig();
                        let fullScreenBtn = document.querySelector(".fullscreen-btn");
                        if (fullScreenBtn) {
                            gameApp.isFullScreen = true;
                            fullScreenBtn.classList.add("active");
                            window.scrollTo(0, 0, "smooth");
                        }
                    })
                }, 50);
            } else {
                figures.displayMessageFig();
                if (!gameApp.playerTurnHitElement.classList.contains("active")) {
                    gameApp.playerTurnHitElement.classList.add("active");
                    gameApp.playerTurnHitElement.addEventListener("click", () => {
                        gameApp.playerTurnHitElement.classList.remove("active");
                    })
                    gameApp.playerTurnHitElement.addEventListener("touchstart", () => {
                        gameApp.playerTurnHitElement.classList.remove("active");
                    })
                }
            }
        }, 500);
    },
    handleMousedownOnDiceTable(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (gameApp.clickEnable) {
            figures.hydeMessageFig();
            gameApp.gaugeIndex = 0;
            if (gameApp.clickOnDiceTableIndex === 0 && iaPlayer.playerTurn) {
                gameApp.handleClickOnDiceTable();
                gameApp.clickOnDiceTableIndex++;
                dices.displayDiceRollGauge();
            } else if (gameApp.clickOnDiceTableIndex === 1 || gameApp.clickOnDiceTableIndex === 2 && iaPlayer.playerTurn) {
                gameApp.gaugeElement.classList.add("active");
                gameApp.handleDiceRoll();
                gameApp.clickOnDiceTableIndex++;
            } else if (gameApp.clickOnDiceTableIndex === 3 && iaPlayer.playerTurn && rules.sirotageRunning === "sirotage") {
                gameApp.gaugeElement.classList.add("active");
                gameApp.handleDiceRoll();
            } else if (gameApp.clickOnDiceTableIndex === 3 && iaPlayer.playerTurn && !rules.sirotageRunning) {
                gameApp.handleClickOnDiceTable();
                gameApp.clickOnDiceTableIndex = 0;
            };

        }
    },
    gaugeTimer: "",
    handleDiceRoll() {
        gameApp.gaugeTimer = setTimeout(() => {
            gameApp.gaugeIndex++;
            if (gameApp.gaugeIndex >= 15) {
                return gameApp.gaugeIndex;
            } else {
                gameApp.handleDiceRoll();
            };
        }, 1000 / 15);
    },
    handleMouseupOnDiceTable(evt) {
        // gameApp.gaugeElement.classList.remove("active");
        clearTimeout(gameApp.gaugeTimer);
        if (gameApp.clickEnable) {
            if (gameApp.clickOnDiceTableIndex === 2 || gameApp.clickOnDiceTableIndex === 3 && iaPlayer.playerTurn) {
                // if(rules.sirotageRunning === "sirotage") {
                //     gameApp.clickOnDiceTableIndex = 0;
                // }
                gameApp.gaugeElement.classList.remove("active");
                gameApp.handleClickOnDiceTable();
            };
        };
    },
    // -------------- START GAME -------------- //
    handleClickOnDiceTable(evt) {
        if (evt) {
            evt.preventDefault();
        }
        // checcking current player's turn :
        if (!iaPlayer.iaTurn && this.clickEnable) {
            gameApp.playerDiceRoll();
            gameApp.rollEvent = evt;
            let gameTable = document.querySelector(".dices_table");
            // let gameTable = document.querySelector("#dices-roll_handler");
            // gameTable.removeEventListener("click", gameApp.handleClickOneDiceTable);
            gameTable.removeEventListener("touchstart", gameApp.handleMousedownOnDiceTable);
            gameTable.removeEventListener("mousedown", gameApp.handleMousedownOnDiceTable);
            gameTable.removeEventListener("touchend", gameApp.handleMouseupOnDiceTable);
            gameTable.removeEventListener("mouseup", gameApp.handleMouseupOnDiceTable);
            setTimeout(() => {
                // gameTable.addEventListener("click", gameApp.handleClickOneDiceTable);
                gameTable.addEventListener("touchstart", gameApp.handleMousedownOnDiceTable);
                gameTable.addEventListener("mousedown", gameApp.handleMousedownOnDiceTable);
                gameTable.addEventListener("touchend", gameApp.handleMouseupOnDiceTable);
                gameTable.addEventListener("mouseup", gameApp.handleMouseupOnDiceTable);
            }, 250);
        }
    },
    // -------------- DICES ROLL -------------- //
    playerDiceRoll() {
        if (!grelotte.grelotteRunning) {
            if (!dices.roundStartStatus && !rules.sirotageRunning) {
                dices.startDiceRollAnimation();
                scores.scoreFig = 0;
                dices.roundStartStatus = true;
                if (iaPlayer.playerTurn === true) {
                    gameApp.roundCounter += 1;
                }
            } else if (!dices.chouetteRollStatus && !dices.cdcRollStatus && !rules.sirotageRunning) {
                dices.chouetteDiceRollAnimation();
                dices.chouetteRollStatus = true;
            } else if (dices.chouetteRollStatus && !dices.cdcRollStatus && !rules.sirotageRunning) {
                dices.cdcDiceRollAnimation();
                dices.cdcRollStatus = true;
                figures.check();
                if (iaPlayer.playerTurn) {
                    setTimeout(() => {
                        gameApp.playerDiceRoll();
                    }, 750);
                }
            } else if (dices.chouetteRollStatus && dices.cdcRollStatus && rules.sirotageRunning === "sirotage") {
                // SIROTAGE :
                dices.singleDiceRollAnimation(rules.diceToRerollIndex, rules.diceContainerToReroll, rules.diceToReroll);
                figures.check();
                if (gameApp.iaEnable) {
                    if (iaPlayer.playerTurn && rules.sirotageRunning) {
                        rules.iaGambleCheck();
                        rules.sirotageRunning = false;
                        setTimeout(() => {
                            gameApp.playerDiceRoll();
                        }, 1500);
                    } else if (iaPlayer.iaTurn && rules.sirotageRunning) {
                        rules.sirotageRunning = false;
                        rules.playerGambleCheck();
                    }
                } else {
                    rules.sirotageRunning = false;
                    setTimeout(() => {
                        gameApp.playerDiceRoll();
                    }, 1500);
                }
            } else if (dices.chouetteRollStatus && dices.cdcRollStatus && !rules.sirotageRunning) {
                dices.endDiceRollAnimation();
                dices.chouetteRollStatus = false;
                dices.cdcRollStatus = false;
                dices.roundStartStatus = false;
                scores.addScore();
                gameApp.checkEndGame();
                // IF GAME IS NOT ENDED
                if (!gameApp.gameEnded) {
                    // IF SINGLE PLAYER MOD & IA ENABLE :
                    setTimeout(() => {
                        gameApp.turnChange();
                        figures.hydeMessageFig();
                    }, 750);
                } else {
                    figures.hydeMessageFig();
                }
            };
        }
    },
    turnChange() {
        gameApp.clickOnDiceTableIndex = 0;
        if (gameApp.iaEnable) {
            if (iaPlayer.playerTurn) {
                iaPlayer.playerTurn = false;
                iaPlayer.iaTurn = true;
                gameApp.clickEnable = false;
                dices.init();
                iaPlayer.iaDiceRoll();
            } else if (iaPlayer.iaTurn) {
                // Stylising current ia player :
                document.querySelectorAll(".score-total-other_players")[0].classList.remove("active");
                iaPlayer.playerTurn = true;
                iaPlayer.iaTurn = false;
                dices.init();
                gameApp.clickEnable = true;
                gameApp.currentPlayerName = gameApp.userName;
                if (iaPlayer.number > 1 && iaPlayer.playerIndex === (iaPlayer.number - 1)) {
                    iaPlayer.playerIndex++;
                } else {
                    iaPlayer.playerIndex = 0;
                }
                if (!gameApp.playerTurnHitElement.classList.contains("active")) {
                    gameApp.playerTurnHitElement.classList.add("active");
                }
            };
        } else {
            dices.init();
            if (!gameApp.playerTurnHitElement.classList.contains("active")) {
                gameApp.playerTurnHitElement.classList.add("active");
            }
        }

    },
    checkEndGame() {
        let endGameWin = document.querySelector(".end_game-you_win-container");
        let endGameLost = document.querySelector(".end_game-lost-container");
        let roundsContainerElement = document.querySelector("#final_score-rounds");
        let scoreContainerElement = document.querySelector("#final_score-total");
        let iaroundsContainerElement = document.querySelector("#final_score-rounds-ia");
        let iaScoreContainerElement = document.querySelector("#final_score-total-ia");
        // hidden inputs : -------------------------------
        let playerScoreInput = document.querySelector("#scoreToSend");
        let playerRoundsInput = document.querySelector("#roundsToSend");
        if (iaPlayer.currentScore >= scores.scoreMax) {
            // gameApp.clickEnable = false,
            gameApp.gameEnded = true;
            endGameLost.style.display = "flex";
            let winnerNameElement = document.querySelector(".winner-name");
            winnerNameElement.textContent = iaPlayer.iaName;
            iaScoreContainerElement.textContent = iaPlayer.currentScore;
            iaroundsContainerElement.textContent = gameApp.roundCounter;
        } else if (scores.currentScore >= scores.scoreMax) {
            // gameApp.clickEnable = false,
            gameApp.gameEnded = true;
            endGameWin.style.display = "flex";
            scoreContainerElement.textContent = scores.currentScore;
            roundsContainerElement.textContent = gameApp.roundCounter;
            // hidden inputs : -------------------------------
            playerScoreInput.value = scores.currentScore;
            playerRoundsInput.value = gameApp.roundCounter;
            // inputs for stats :
            let cdcNbInput = document.querySelector("#cdcNb");
            cdcNbInput.value = figures.cdcCounter;
            let cvNb = document.querySelector("#cvNb");
            cvNb.value = figures.cvCounter;
            let chouetteNb = document.querySelector("#chouetteNb");
            chouetteNb.value = figures.chouetteCounter;
            let veluteNb = document.querySelector("#veluteNb");
            veluteNb.value = figures.veluteCounter;
            let suiteNb = document.querySelector("#suiteNb");
            suiteNb.value = figures.suiteCounter;
            let neantNb = document.querySelector("#neantNb");
            neantNb.value = figures.neantCounter;
            let sirotageNbElement = document.querySelector("#sirotageNb");
            sirotageNbElement.value = rules.sirotageCounter;
            let sirotageSuccessNbElement = document.querySelector("#sirotageSuccessNb");
            sirotageSuccessNbElement.value = rules.sirotageSuccess;
            let grelotteNbElement = document.querySelector("#grelotteNb");
            grelotteNbElement.value = grelotte.grelotteCounter;
            let grelotteFailNbElement = document.querySelector("#grelotteFailNb");
            grelotteFailNbElement.value = grelotte.grelotteFail;
            let bevueNbElement = document.querySelector("#bevueNb");
            bevueNbElement.value = bevue.bevueCounter;
            let bevueFailNbElement = document.querySelector("#bevueFailNb");
            bevueFailNbElement.value = bevue.bevueFail;
            let siropGambleNbElement = document.querySelector("#siropGambleNb");
            siropGambleNbElement.value = rules.playerGambleSirop;
            let siropGambleSuccessNbElement = document.querySelector("#siropGambleSuccessNb");
            siropGambleSuccessNbElement.value = rules.playerGambleSiropSuccess;
        };
    },
}
