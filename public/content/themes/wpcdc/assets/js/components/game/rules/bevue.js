const bevue = {
    runningStatus: false,
    figName: "Bévue !<br>-5pts",
    bevueCounter: 0,
    bevueFail: 0,
    // -------------- DICES INIT -------------- //
    init: function () {
        // 
    },
    checkDicesPos(coef) {
        setTimeout(() => {
            if (gameApp.iaEnable && iaPlayer.iaTurn) {
                if (coef > 1) {
                    bevue.isBevue();
                    return;
                };
            } else {
                bevue.bevueCounter++;
                if (coef > 1) {
                    bevue.isBevue();
                    bevue.displayMessageFig();
                    return;
                };
            }
            if (rules.enableRules["bevue"]) {
                bevue.runningStatus = false;
            }
            return
        }, 600);
    },
    displayMessageFig() {
        let messageFigContainerElement = document.querySelector(".message-bevue-container");
        messageFigContainerElement.querySelector(".message-bevue").innerHTML = bevue.figName;
        messageFigContainerElement.style.display = "flex";
        setTimeout(function () {
            messageFigContainerElement.classList.add("active");
        }, 50);
        setTimeout(() => {
            messageFigContainerElement.style.display = "none";
        }, 4000);
    },
    hydeMessageFig() {
        let messageFigContainerElement = document.querySelector(".message-bevue-container");
        messageFigContainerElement.classList.remove("active");
    },
    isBevue() {
        let msg;
        msg = "-5ps";
        let gambleScoreMsg;
        if (iaPlayer.iaTurn) {
            iaPlayer.currentScore[iaPlayer.playerIndex] -= 5;
            let scoreContainerElement = iaPlayer.currentIaPlayerContainer.querySelector(".score-total-other_players");
            scoreContainerElement.textContent = iaPlayer.currentScore[iaPlayer.playerIndex];
            gambleScoreMsg = iaPlayer.currentIaPlayerContainer.querySelector("#bevue-score_msg-ia");
        } else {
            bevue.bevueFail++;
            scores.currentScore -= 5;
            let scoreContainerElement = document.querySelector("#score-total");
            scoreContainerElement.textContent = scores.currentScore;
            gambleScoreMsg = document.querySelector("#bevue-score_msg-player");
        }
        gambleScoreMsg.style.display = "flex";
        gambleScoreMsg.querySelector("span").innerHTML = msg;
        setTimeout(() => {
            gambleScoreMsg.classList.add("active");
            gambleScoreMsg.querySelector("span").classList.add("active");
        }, 50);
        setTimeout(() => {
            gambleScoreMsg.classList.remove("active");
            gambleScoreMsg.style.display = "none";
            gambleScoreMsg.querySelector("span").classList.remove("active");
        }, 1000);
    },
}