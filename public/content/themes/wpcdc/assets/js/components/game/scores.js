const scores = {
    scoreFig: 0,
    currentScore: 0,
    scoreMax: 343,
    // -------------- CHECK FIGURES -------------- //
    scoreCdc() {
        scores.scoreFig = 40 + (10 * dices.dicesTab[0]);
        if (rules.sirotageRunning) {
            figures.figName = "Sirotage réussu <br> " + scores.scoreFig;
            figures.displayMessageFig();
            if(iaPlayer.playerTurn) {
                rules.sirotageSuccess++;
            }
        } else {
            figures.figName = "Cul de chouette de " + dices.dicesTab[0];
            figures.displayMessageFig();
        }
    },
    scoreCv(dice1, dice2, dice3) {
        scores.scoreFig = ((dice1 + dice2) * dice3) * 3;
        if (rules.sirotageRunning) {
            figures.figName = "Sirotage réussu <br> " + scores.scoreFig;
            figures.displayMessageFig();
            if(iaPlayer.playerTurn) {
                rules.sirotageSuccess++;
            }
        } else {
            figures.figName = "Chouette Velute de " + dice3;
            figures.displayMessageFig();
        }
    },
    scoreChouette(dice1, dice2, diceSiropIndex) {
        if (rules.sirotageRunning) {
        scores.scoreFig = - (dice1 * dice2);
            if (gameApp.currentPlayerName === "Vous") {
                figures.figName = gameApp.currentPlayerName + " avez perdu votre sirotage <br> " + scores.scoreFig;
            } else {
                figures.figName = gameApp.currentPlayerName + "a perdu son sirotage <br> " + scores.scoreFig;
            }
            figures.displayMessageFig();
        } else {
        scores.scoreFig = (dice1 * dice2);
            figures.figName = "Chouette de " + dice2;
            figures.displayMessageFig();
            // IF SIROTAGE RULE IS ENABLE :
            if (rules.enableRules["sirotage"]) {
                rules.checkSirotage(diceSiropIndex);
            };
        }

    },
    scoreVelute(dice1, dice2, dice3) {
        scores.scoreFig = ((dice1 + dice2) * dice3) * 2;
        figures.figName = "Velute de " + dice3;
        figures.displayMessageFig();
    },
    scoreSuite() {
        scores.scoreFig = 10;
        figures.figName = "Suite";
        figures.displayMessageFig();
        // IF NEANT RULE IS ENABLE :
        if (rules.enableRules["grelotte"]) {
            grelotte.displayGrelotteHit();
        };
    },
    scoreNeant() {
        scores.scoreFig = 0;
        figures.figName = "Néant";
        figures.displayMessageFig();
    },
    addScore() {
        let roundsContainerElement = document.querySelector("#round-nb");
        let scoreContainerElement;
        // if practice mod is enable :
        if (!gameApp.iaEnable) {
            scores.currentScore += scores.scoreFig;
            figures[figures.figToAdd] += 1;
            scoreContainerElement = document.querySelector("#score-total");
            scoreContainerElement.textContent = scores.currentScore;
            roundsContainerElement.textContent = gameApp.roundCounter;
        } else if (gameApp.iaEnable) {
            // if single player mod is enable :
            if (iaPlayer.playerTurn) {
                // if player's turn :
                scores.currentScore += scores.scoreFig;
                figures[figures.figToAdd] += 1;
                scoreContainerElement = document.querySelector("#score-total");
                scoreContainerElement.textContent = scores.currentScore;
                roundsContainerElement.textContent = gameApp.roundCounter;
            } else if (iaPlayer.iaTurn) {
                // if IA's turn :
                iaPlayer.currentScore[iaPlayer.playerIndex] += scores.scoreFig;
                // playerContainer = document.querySelectorAll(".score-ia")[iaPlayer.playerIndex];
                scoreContainerElement = iaPlayer.currentIaPlayerContainer.querySelector(".score-total-other_players");
                scoreContainerElement.textContent = iaPlayer.currentScore[iaPlayer.playerIndex];
            };
        };
    },
}