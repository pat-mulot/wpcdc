const grelotte = {
    grelotteHittersTab: [],
    HanToHitContainer: Object,
    grelotteRunning: false,
    duration: 3000,
    iaScore: 0,
    playerScore: 0,
    playerGrelotteStatus: false,
    grelotteCounter: 0,
    grelotteFail: 0,
    // -------------- DICES INIT -------------- //
    init: function () {
        grelotte.HanToHitContainer = document.querySelector(".grelotte_hit-container");
        let grelotteHanToHit = grelotte.HanToHitContainer.querySelector(".grelotte_hit-content");
        grelotteHanToHit.addEventListener("touchstart", grelotte.handleClickOnGrelotte);
        grelotteHanToHit.addEventListener("click", grelotte.handleClickOnGrelotte);
    },
    displayGrelotteHit() {
        gameApp.clickEnable = false;
        grelotte.grelotteCounter++;
        // let currentPos = 3;
        // let grelotteHanToHit = document.querySelector(".grelotte_hit-content");
        grelotte.grelotteRunning = true;
        grelotte.HanToHitContainer.style.display = "initial";
        // grelotteHanToHit.classList.add("pos-" + currentPos);
        if (gameApp.iaEnable) {
            setTimeout(() => {
                grelotte.grelotteHittersTab.push(iaPlayer.player[iaPlayer.playerIndex].name);
                let gambleValue = iaPlayer.currentIaPlayerContainer.querySelector("#gamble-nb-ia");
                gambleValue.style.display = "flex";
                setTimeout(() => {
                    gambleValue.classList.add("active");
                    gambleValue.innerHTML = '<i class="fas fa-hand-paper">';
                }, 50);
            }, iaPlayer.player[iaPlayer.currentIaTurnId].grelotteDuration());
        };
        setTimeout(() => {
            grelotte.HanToHitContainer.classList.add("active");
        }, 50);
        setTimeout(() => {
            grelotte.checkLooser();
            grelotte.grelotteRunning = false;
        }, grelotte.duration);
    },
    handleClickOnGrelotte(evt) {
        evt.preventDefault();
        grelotte.playerGrelotteStatus = true;
        let messageFigContainerElement = document.querySelector(".message-figure-container");
        messageFigContainerElement.classList.remove("active");
        grelotte.grelotteHittersTab.push(gameApp.userName);
        grelotte.HanToHitContainer.querySelector(".grelotte_hit-content").classList.add("active");
        figures.figName = "Grelotte ça picote !";
        figures.displayMessageFig();
    },
    checkLooser() {
        let msg = "perdu<br>-10";
        let msgClass = "lost";
        let gambleScoreMsg;
        figures.figToAdd = "grelotteCounter";
        if (!grelotte.playerGrelotteStatus) {
            grelotte.grelotteHittersTab.push(gameApp.userName);
        }
        if (grelotte.grelotteHittersTab.length !== 0) {
            let looserPlayer = grelotte.grelotteHittersTab[grelotte.grelotteHittersTab.length - 1];
            if (looserPlayer === gameApp.userName && !gameApp.iaEnable) {
                scores.currentScore += -10;
                scoreContainerElement = document.querySelector("#score-total");
                scoreContainerElement.textContent = scores.currentScore;
                gambleScoreMsg = document.querySelector("#gamble-score_msg-player");
                grelotte.grelotteFail++;
            } else if (gameApp.iaEnable) {
                if (looserPlayer === gameApp.userName) {
                    scores.currentScore += -10;
                    scoreContainerElement = document.querySelector("#score-total");
                    scoreContainerElement.textContent = scores.currentScore;
                    gambleScoreMsg = document.querySelector("#gamble-score_msg-player");
                    grelotte.grelotteFail++;
                } else if (looserPlayer === iaPlayer.player[iaPlayer.playerIndex].name) {
                    iaPlayer.currentScore[iaPlayer.playerIndex] += -10;
                    scoreContainerElement = iaPlayer.currentIaPlayerContainer.querySelector(".score-total-other_players");
                    scoreContainerElement.textContent = iaPlayer.currentScore[iaPlayer.playerIndex];
                    gambleScoreMsg = iaPlayer.currentIaPlayerContainer.querySelector("#gamble-score_msg-ia");
                };
            };
            gambleScoreMsg.style.display = "flex";
            gambleScoreMsg.querySelector("span").innerHTML = msg;
            setTimeout(() => {
                gambleScoreMsg.classList.add(msgClass);
                gambleScoreMsg.querySelector("span").classList.add("active");
            }, 50);
        };
        grelotte.endGrelotte();
    },
    endGrelotte() {
        grelotte.grelotteHittersTab = [];
        grelotte.HanToHitContainer.classList.remove("active");
        setTimeout(() => {
            if (iaPlayer.currentIaPlayerContainer) {
                let gambleValue = iaPlayer.currentIaPlayerContainer.querySelector("#gamble-nb-ia");
                gambleValue.classList.remove("active");
                setTimeout(() => {
                    gambleValue.style.display = "none";
                }, 300);
            }
            grelotte.HanToHitContainer.querySelector(".grelotte_hit-content").classList.remove("pos-3");
            grelotte.HanToHitContainer.style.display = "none";
            grelotte.HanToHitContainer.querySelector(".grelotte_hit-content").classList.remove("active");
            grelotte.playerGrelotteStatus = false;
            if (iaPlayer.iaTurn) {
                setTimeout(() => {
                    gameApp.playerDiceRoll();
                }, 500);
            } else {
                gameApp.clickEnable = true;
                gameApp.playerDiceRoll(gameApp.rollEvent);
            };
        }, 300);
        let grelotteHanToHit = grelotte.HanToHitContainer.querySelector(".grelotte_hit-content");
        grelotteHanToHit.removeEventListener("click", grelotte.handleClickOnGrelotte, true);
    },
}