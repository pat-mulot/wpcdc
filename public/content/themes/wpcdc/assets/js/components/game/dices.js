const dices = {
    // DICES ELEMENTS :
    diceContainer1: Object,
    diceContainer2: Object,
    diceContainer3: Object,
    dice1: Object,
    dice2: Object,
    dice3: Object,
    // ROLL STATUS :
    chouetteRollStatus: false,
    cdcRollStatus: false,
    roundStartStatus: false,
    // DICES VALUES :
    dicesTab: [, ,],
    allDicesValue: [],
    iaDicesClass: "",
    // // DICES TRANSLATE VALUES :
    mobileCoef: 1,
    maxTableWidth: 0,
    maxTableHeight: 0,
    diceSize: 0,
    // -------------- DICES INIT -------------- //
    init: function () {
        let dicesTableElement = document.querySelector(".dices_table");
        if(dicesTableElement) {
            dices.maxTableWidth = dicesTableElement.offsetWidth;
            dices.maxTableHeight = dicesTableElement.offsetHeight;
        };
        let allDicesContainer = document.querySelectorAll(".dice_container");
        if (gameApp.iaEnable) {
            dices.iaDicesClass = "-other";
            if (iaPlayer.iaTurn) {
                let classIndex = 3;
                for (let oneDiceContainer of allDicesContainer) {
                    oneDiceContainer.classList.add("dice_container" + dices.iaDicesClass);
                    oneDiceContainer.classList.add("dice_container" + classIndex + dices.iaDicesClass);
                    classIndex--;
                }
                dices.diceContainer1.style.transform = "translate(0,0)";
                dices.diceContainer2.style.transform = "translateX(2rem)";
                dices.diceContainer3.style.transform = "translateX(4rem)";
            } else {
                let classIndex = 3;
                for (let oneDiceContainer of allDicesContainer) {
                    oneDiceContainer.classList.remove("dice_container" + dices.iaDicesClass);
                    oneDiceContainer.classList.remove("dice_container" + classIndex + dices.iaDicesClass);
                    classIndex--;
                }
                dices.diceContainer1.style.transform = "translate(0,0)";
                dices.diceContainer2.style.transform = "translateX(-2rem)";
                dices.diceContainer3.style.transform = "translateX(-4rem)";
                dices.iaDicesClass = "";
            };
        };
        dices.diceContainer1 = document.querySelector(".dice_container1");
        dices.dice1 = document.querySelector("#dice1");
        dices.diceContainer2 = document.querySelector(".dice_container2");
        dices.dice2 = document.querySelector("#dice2");
        dices.diceContainer3 = document.querySelector(".dice_container3");
        dices.dice3 = document.querySelector("#dice3");
        if(dices.dice1) {
            dices.diceSize = dices.dice1.offsetWidth;
        }
        // if (screen.width < 475) {
        //     dices.mobileCoef = 1.5;
        // };
    },
    displayDiceRollGauge() {
        if (!iaPlayer.iaTurn) {
            gameApp.gaugeContainerElement.style.display = "flex";
            setTimeout(() => {
                gameApp.gaugeContainerElement.classList.add("active");
            }, 50);
        }
    },
    hydeDiceRollGauge() {
        if (!iaPlayer.iaTurn) {
            gameApp.gaugeContainerElement.classList.remove("active");
            setTimeout(() => {
                gameApp.gaugeContainerElement.style.display = "none";
            }, 300);
        }
    },
    // -------------- DICES ANIMATION -------------- //
    startDiceRollAnimation() {
        dices.dice1.classList.add("active");
        dices.dice2.classList.add("active");
    },
    chouetteDiceRollAnimation() {
        let coef = 1;
        // IF BEVUE MOD IS ENABLE
        if (rules.enableRules["bevue"]) {
            // THEN START RUNNING STATUS
            bevue.runningStatus = true;
            // IF IA PLAYING
            if (gameApp.iaEnable && iaPlayer.iaTurn) {
                // GET THE IA FORCE ROLL PROPERTY
                coef = iaPlayer.player[iaPlayer.currentIaTurnId].coefBevue();
            } else {
                // ELSE USER IS PLAYING AND GET THE FORCE FROM GAUGE
                coef = (gameApp.gaugeIndex / 10);
            }
        } else {
            // IF TRAINNING MOD IS ENABLE AND NO IA
            // GET THE USER FORCE FROM GAUGE
            coef = (gameApp.gaugeIndex / 10);
        }
        if (coef < 0.32) {
            coef = 0.33;
        }
        dices.diceContainer1.classList.add("rollAnim1" + dices.iaDicesClass);
        dices.diceContainer2.classList.add("rollAnim2" + dices.iaDicesClass);
        if (iaPlayer.iaTurn) {
            dices.diceContainer1.style.transform = "translate(calc(" + ((dices.maxTableWidth / 3) - dices.diceSize) + "px * " + coef + "), calc(" + (dices.maxTableHeight - dices.diceSize) + "px* " + coef + "))";
            dices.diceContainer2.style.transform = "translate(calc(" + (dices.maxTableWidth - dices.diceSize) + "px * " + coef + "), calc(" + ((dices.maxTableHeight / 3) - dices.diceSize) + "px* " + coef + "))";
        } else {
            dices.diceContainer1.style.transform = "translate(calc(" + ((dices.maxTableWidth / 3) - dices.diceSize) + "px * -1 * " + coef + "), calc(" + (dices.maxTableHeight - dices.diceSize) + "px * -1 * " + coef + "))";
            dices.diceContainer2.style.transform = "translate(calc(" + (dices.maxTableWidth - dices.diceSize) + "px * -1 * " + coef + "), calc(" + ((dices.maxTableHeight / 3) - dices.diceSize) + "px * -1 * " + coef + "))";
        };
        dices.deleteVisible(dices.dice1);
        dices.deleteVisible(dices.dice2);
        dices.diceDesign(0, dices.dice1);
        dices.diceDesign(1, dices.dice2);
        dices.dice3.classList.add("active");
        if (bevue.runningStatus) {
            bevue.checkDicesPos(coef);
        };
    },
    cdcDiceRollAnimation() {
        let coef = 1;
        // IF BEVUE MOD IS ENABLE
        if (rules.enableRules["bevue"]) {
            // THEN START RUNNING STATUS
            bevue.runningStatus = true;
            // IF IA PLAYING
            if (gameApp.iaEnable && iaPlayer.iaTurn) {
                // GET THE IA FORCE ROLL PROPERTY
                coef = iaPlayer.player[iaPlayer.currentIaTurnId].coefBevue();
            } else {
                // ELSE USER IS PLAYING AND GET THE FORCE FROM GAUGE
                coef = (gameApp.gaugeIndex / 10);
            }
        } else {
            // IF TRAINNING MOD IS ENABLE AND NO IA
            // GET THE USER FORCE FROM GAUGE
            coef = (gameApp.gaugeIndex / 10);
        }
        if (coef < 0.32) {
            coef = 0.33;
        }
        dices.diceContainer3.classList.add("rollAnim3" + dices.iaDicesClass);
        if (iaPlayer.iaTurn) {
            dices.diceContainer3.style.transform = "translate(calc(" + (dices.maxTableWidth - dices.diceSize) + "px * " + coef + "), calc(" + (dices.maxTableHeight - dices.diceSize) + "px * " + coef + "))";
        } else {
            dices.diceContainer3.style.transform = "translate(calc(" + (dices.maxTableWidth - dices.diceSize) + "px * -1 * " + coef + "), calc(" + (dices.maxTableHeight - dices.diceSize) + "px * -1 * " + coef + "))";
        }
        dices.deleteVisible(dices.dice3);
        dices.diceDesign(2, dices.dice3);
        if (bevue.runningStatus) {
            bevue.checkDicesPos(coef);
        };
    },
    endDiceRollAnimation() {
        setTimeout(() => {
            dices.diceContainer1.classList.remove("rollAnim1" + dices.iaDicesClass);
            dices.diceContainer2.classList.remove("rollAnim2" + dices.iaDicesClass);
            dices.diceContainer3.classList.remove("rollAnim3" + dices.iaDicesClass);
            if (!gameApp.iaEnable) {
                dices.diceContainer1.style.transform = "translate(0,0)";
                dices.diceContainer2.style.transform = "translateX(-2rem)";
                dices.diceContainer3.style.transform = "translateX(-4rem)";
            }
            dices.dice1.classList.remove("active");
            dices.dice2.classList.remove("active");
            dices.dice3.classList.remove("active");
        }, 750);
    },
    singleDiceRollAnimation(diceIndex, diceContainerToRoll, diceToRoll) {
        let coef = 1;
        // IF BEVUE MOD IS ENABLE
        if (rules.enableRules["bevue"]) {
            // THEN START RUNNING STATUS
            bevue.runningStatus = true;
            // IF IA PLAYING
            if (gameApp.iaEnable && iaPlayer.iaTurn) {
                // GET THE IA FORCE ROLL PROPERTY
                coef = iaPlayer.player[iaPlayer.currentIaTurnId].coefBevue();
            } else {
                // ELSE USER IS PLAYING AND GET THE FORCE FROM GAUGE
                coef = (gameApp.gaugeIndex / 10);
            }
        } else {
            // IF TRAINNING MOD IS ENABLE AND NO IA
            // GET THE USER FORCE FROM GAUGE
            coef = (gameApp.gaugeIndex / 10);
        }
        if (coef < 0.32) {
            coef = 0.33;
        }
        diceContainerToRoll.classList.add("rollAnim" + (diceIndex + 1) + dices.iaDicesClass);
        if (iaPlayer.iaTurn) {
            if (diceIndex === 0) {
                dices.diceContainer1.style.transform = "translate(calc(" + ((dices.maxTableWidth / 3) - dices.diceSize) + "px * " + coef + "), calc(" + (dices.maxTableHeight - dices.diceSize) + "px* " + coef + "))";
            } else if (diceIndex === 1) {
                dices.diceContainer2.style.transform = "translate(calc(" + (dices.maxTableWidth - dices.diceSize) + "px * " + coef + "), calc(" + ((dices.maxTableHeight / 3) - dices.diceSize) + "px* " + coef + "))";
            } else if (diceIndex === 2) {
                dices.diceContainer3.style.transform = "translate(calc(" + (dices.maxTableWidth - dices.diceSize) + "px * " + coef + "), calc(" + (dices.maxTableHeight - dices.diceSize) + "px * " + coef + "))";
            }
        } else {
            if (diceIndex === 0) {
                dices.diceContainer1.style.transform = "translate(calc(" + ((dices.maxTableWidth / 3) - dices.diceSize) + "px * -1 * " + coef + "), calc(" + (dices.maxTableHeight - dices.diceSize) + "px * -1 * " + coef + "))";
            } else if (diceIndex === 1) {
                dices.diceContainer2.style.transform = "translate(calc(" + (dices.maxTableWidth - dices.diceSize) + "px * -1 * " + coef + "), calc(" + ((dices.maxTableHeight / 3) - dices.diceSize) + "px * -1 * " + coef + "))";
            } else if (diceIndex === 2) {
                dices.diceContainer3.style.transform = "translate(calc(" + (dices.maxTableWidth - dices.diceSize) + "px * -1 * " + coef + "), calc(" + (dices.maxTableHeight - dices.diceSize) + "px * -1 * " + coef + "))";
            }
        }
        dices.deleteVisible(diceToRoll);
        dices.diceDesign(diceIndex, diceToRoll);
        if (bevue.runningStatus) {
            bevue.checkDicesPos(coef);
        };
    },
    // -------------- DICES RAND -------------- //
    diceIndexSirop: 1,
    diceRand() {
        let diceValue = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        dices.allDicesValue.push(diceValue);
        return diceValue;
    },
    // -------------- DICES DESIGN -------------- //
    deleteVisible(diceToRll) {
        let visibleDots = diceToRll.querySelectorAll('.dot');
        for (i = 0; i < (visibleDots.length); i++) {
            visibleDots[i].classList.remove('visible');
        };
    },
    diceDesign: function (diceIndex, diceToRoll) {
        let diceValue = dices.diceRand();
        // // ---
        // // Code de test de valeurs de dés pour check les figures
        // if (diceIndex == 0) {
        //     // Test suite :
        //     diceValue = 2;
        //     // // Test chouette :
        //     // diceValue = 2;
        // } else if (diceIndex == 1) {
        //     // Test suite :
        //     diceValue = 3;
        //     // // Test chouette :
        //     // diceValue = 2;
        // } else if (diceIndex == 2) {
        //     // Test suite :
        //     diceValue = 4;
        //     // // Test chouette :
        //     // diceValue = 3;
        // }
        // // ---
        dices.dicesTab[diceIndex] = diceValue;
        if (diceValue == 1) {
            let currentDiceToChange = diceToRoll.querySelector('.fig_mid');
            currentDiceToChange.classList.add("visible");
            return
        } else if (diceValue == 2) {
            let currentDiceToChange = diceToRoll.querySelector('.fig_top_left');
            currentDiceToChange.classList.add("visible");
            currentDiceToChange = diceToRoll.querySelector('.fig_bot_right');
            currentDiceToChange.classList.add("visible");
            return
        } else if (diceValue == 3) {
            let currentDiceToChange = diceToRoll.querySelector('.fig_top_left');
            currentDiceToChange.classList.add("visible");
            currentDiceToChange = diceToRoll.querySelector('.fig_mid');
            currentDiceToChange.classList.add("visible");
            currentDiceToChange = diceToRoll.querySelector('.fig_bot_right');
            currentDiceToChange.classList.add("visible");
            return
        } else if (diceValue == 4) {
            let currentDiceToChange = diceToRoll.querySelector('.fig_top_left');
            currentDiceToChange.classList.add("visible");
            currentDiceToChange = diceToRoll.querySelector('.fig_top_right');
            currentDiceToChange.classList.add("visible");
            currentDiceToChange = diceToRoll.querySelector('.fig_bot_left');
            currentDiceToChange.classList.add("visible");
            currentDiceToChange = diceToRoll.querySelector('.fig_bot_right');
            currentDiceToChange.classList.add("visible");
            return
        } else if (diceValue == 5) {
            let currentDiceToChange = diceToRoll.querySelector('.fig_top_left');
            currentDiceToChange.classList.add("visible");
            currentDiceToChange = diceToRoll.querySelector('.fig_top_right');
            currentDiceToChange.classList.add("visible");
            currentDiceToChange = diceToRoll.querySelector('.fig_mid');
            currentDiceToChange.classList.add("visible");
            currentDiceToChange = diceToRoll.querySelector('.fig_bot_left');
            currentDiceToChange.classList.add("visible");
            currentDiceToChange = diceToRoll.querySelector('.fig_bot_right');
            currentDiceToChange.classList.add("visible");
            return
        } else if (diceValue == 6) {
            let currentDiceToChange = diceToRoll.querySelector('.fig_top_left');
            currentDiceToChange.classList.add("visible");
            currentDiceToChange = diceToRoll.querySelector('.fig_top_right');
            currentDiceToChange.classList.add("visible");
            currentDiceToChange = diceToRoll.querySelector('.fig_mid_left');
            currentDiceToChange.classList.add("visible");
            currentDiceToChange = diceToRoll.querySelector('.fig_mid_right');
            currentDiceToChange.classList.add("visible");
            currentDiceToChange = diceToRoll.querySelector('.fig_bot_left');
            currentDiceToChange.classList.add("visible");
            currentDiceToChange = diceToRoll.querySelector('.fig_bot_right');
            currentDiceToChange.classList.add("visible");
            return
        };
    },
}