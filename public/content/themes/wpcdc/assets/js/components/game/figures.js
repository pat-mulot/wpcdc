const figures = {
    currentFigure: false,
    figToAdd: false,
    // figures counters :
    cdcCounter: 0,
    cvCounter: 0,
    chouetteCounter: 0,
    veluteCounter: 0,
    suiteCounter: 0,
    neantCounter: 0,
    figName: "",
    siropCounter: 0,
    successSiropCounter: 0,
    // todo
    grelottineCounter: 0,
    civetCounter: 0,
    // -------------- CHECK FIGURES -------------- //
    check() {
        if (figures.cdc()) {
            figures.figToAdd = "cdcCounter";
            dices.hydeDiceRollGauge();
            return scores.scoreFig;
        } else if (figures.cv()) {
            figures.figToAdd = "cvCounter";
            dices.hydeDiceRollGauge();
            return scores.scoreFig;
        } else if (figures.chouette()) {
            figures.figToAdd = "chouetteCounter";
            dices.hydeDiceRollGauge();
            return scores.scoreFig;
        } else if (figures.velute()) {
            figures.figToAdd = "veluteCounter";
            dices.hydeDiceRollGauge();
            return scores.scoreFig;
        } else if (figures.suite()) {
            figures.figToAdd = "suiteCounter";
            dices.hydeDiceRollGauge();
            return scores.scoreFig;
        } else {
            figures.neant();
            figures.figToAdd = "neantCounter";
            dices.hydeDiceRollGauge();
            return scores.scoreFig;
        }
    },
    cdc() {
        if (dices.dicesTab[0] === dices.dicesTab[1]
            && dices.dicesTab[1] === dices.dicesTab[2]) {
            scores.scoreCdc();
            return true;
        }
        return false;
    },
    cv() {
        if (dices.dicesTab[0] + dices.dicesTab[1] === dices.dicesTab[2]
            && dices.dicesTab[0] === dices.dicesTab[1]) {
            scores.scoreCv(dices.dicesTab[0], dices.dicesTab[1], dices.dicesTab[2]);
            return true;
        }
        else if (dices.dicesTab[0] + dices.dicesTab[2] === dices.dicesTab[1]
            && dices.dicesTab[0] === dices.dicesTab[2]) {
            scores.scoreCv(dices.dicesTab[0], dices.dicesTab[2], dices.dicesTab[1]);
            return true;
        }
        else if (dices.dicesTab[1] + dices.dicesTab[2] === dices.dicesTab[0]
            && dices.dicesTab[1] === dices.dicesTab[2]) {
            scores.scoreCv(dices.dicesTab[1], dices.dicesTab[2], dices.dicesTab[0]);
            return true;
        }
        return false;
    },
    chouette() {
        if (dices.dicesTab[0] === dices.dicesTab[1]) {
            scores.scoreChouette(dices.dicesTab[0], dices.dicesTab[1], 2);
            return true;
        } else if (dices.dicesTab[0] === dices.dicesTab[2]) {
            scores.scoreChouette(dices.dicesTab[0], dices.dicesTab[2], 1);
            return true;
        } else if (dices.dicesTab[1] === dices.dicesTab[2]) {
            scores.scoreChouette(dices.dicesTab[1], dices.dicesTab[2], 0);
            return true;
        }
        return false;
    },
    velute() {
        if (dices.dicesTab[0] + dices.dicesTab[1] === dices.dicesTab[2]) {
            scores.scoreVelute(dices.dicesTab[0], dices.dicesTab[1], dices.dicesTab[2]);
            return true;
        }
        else if (dices.dicesTab[0] + dices.dicesTab[2] === dices.dicesTab[1]) {
            scores.scoreVelute(dices.dicesTab[0], dices.dicesTab[2], dices.dicesTab[1]);
            return true;
        }
        else if (dices.dicesTab[1] + dices.dicesTab[2] === dices.dicesTab[0]) {
            scores.scoreVelute(dices.dicesTab[1], dices.dicesTab[2], dices.dicesTab[0]);
            return true;
        }
        return false;
    },
    suite() {
        if (
            dices.dicesTab[0] + 1 === dices.dicesTab[1]
            && dices.dicesTab[1] + 1 === dices.dicesTab[2]
            || dices.dicesTab[0] + 1 === dices.dicesTab[2]
            && dices.dicesTab[2] + 1 === dices.dicesTab[1]
            || dices.dicesTab[1] + 1 === dices.dicesTab[2]
            && dices.dicesTab[2] + 1 === dices.dicesTab[0]
            || dices.dicesTab[1] + 1 === dices.dicesTab[0]
            && dices.dicesTab[0] + 1 === dices.dicesTab[2]
            || dices.dicesTab[2] + 1 === dices.dicesTab[1]
            && dices.dicesTab[1] + 1 === dices.dicesTab[0]
            || dices.dicesTab[2] + 1 === dices.dicesTab[0]
            && dices.dicesTab[0] + 1 === dices.dicesTab[1]
        ) {
            scores.scoreSuite();
            return true;
        }
        else if (dices.dicesTab[0] + dices.dicesTab[2] === dices.dicesTab[1]) {
            scores.scoreSuite();
            return true;
        }
        else if (dices.dicesTab[1] + dices.dicesTab[2] === dices.dicesTab[0]) {
            scores.scoreVelute(dices.dicesTab[1], dices.dicesTab[2], dices.dicesTab[0]);
            return true;
        }
        return false;
    },
    neant() {
        scores.scoreNeant();
        return true;
    },
    displayMessageFig() {
        let messageFigContainerElement = document.querySelector(".message-figure-container");
        // reset (invisible, le texte est déjà masqué via "closing") avant de relancer une animation fraîche :
        messageFigContainerElement.classList.remove("active", "closing");
        void messageFigContainerElement.offsetWidth; // force le navigateur à appliquer le reset ci-dessus avant de continuer
        messageFigContainerElement.style.display = "flex";
        messageFigContainerElement.querySelector(".message-figure").innerHTML = figures.figName;
        setTimeout(function () {
            messageFigContainerElement.classList.add("active");
        }, 50);
    },
    hydeMessageFig() {
        let messageFigContainerElement = document.querySelector(".message-figure-container");
        // masque juste le texte, ne touche pas à "active" : le défilement du conteneur continue sa course sans revenir en arrière
        messageFigContainerElement.classList.add("closing");
    }
}