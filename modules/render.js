class Render {
    renderResources(gameState) {
        // Energy Update
        let energyLabel = document.getElementById('label-energy');
        energyLabel.innerHTML = `Energy: <span class='resource-amount'>${gameState.resources.energy}</span>`;

        // Forage Update
        let forageLabel = document.getElementById('label-forage');
        forageLabel.innerHTML = `Food Foraged: <span class='resource-amount'>${gameState.resources.food}</span>`;

        // Forage Update
        let woodLabel = document.getElementById('label-wood');
        woodLabel.innerHTML = `Wood Cut: <span class='resource-amount'>${gameState.resources.wood}</span>`;

        // Mining Update
        let miningLabel = document.getElementById('label-copper');
        miningLabel.innerHTML = `Copper Mined: <span class='resource-amount'>${gameState.resources.copper}</span>`;
    }

    renderActions(gameState, log) {
        // Render eating action
        let eatAction = document.getElementById('action-eat');
        let eatingMilestone = gameState.milestones.eating;
        if(eatingMilestone.milestoneMet && !eatingMilestone.milestoneAlert) {
            eatAction.classList.remove("hidden");
            log.push(eatingMilestone.milestoneMessage);
            eatingMilestone.milestoneAlert = true;
        }

        // Render woodcutting action
        let woodcutAction = document.getElementById('action-woodcut');
        let woodcutMilestone = gameState.milestones.woodcutting;
        if(woodcutMilestone.milestoneMet && !woodcutMilestone.milestoneAlert) {
            woodcutAction.classList.remove("hidden");
            log.push(woodcutMilestone.milestoneMessage);
            woodcutMilestone.milestoneAlert = true;
        }

        // Render mining action
        let mineAction = document.getElementById('action-mine');
        let miningMilestone = gameState.milestones.mining;
        if(miningMilestone.milestoneMet && !miningMilestone.milestoneAlert) {
            mineAction.classList.remove("hidden");
            log.push(miningMilestone.milestoneMessage);
            miningMilestone.milestoneAlert = true;
        }
    }

    renderLog(log) {
        // Render log
        let logPanel = document.getElementById('log-contents');
        let logStatement = log.pop();
        if (logStatement) { logPanel.insertAdjacentHTML("afterbegin", `<span class='log-statement'>${logStatement}</span><br/>`) };
    }

    renderActionCheck(gameState) {
        // Check to disable buttons

        // Foraging check
        let forageAction = document.getElementById('action-forage');
        if(gameState.resources.energy < 5) {
            forageAction.disabled = true;
        } else {
            forageAction.disabled = false;
        }

        // Eating check
        let eatAction = document.getElementById('action-eat');
        if(gameState.resources.food < gameState.resourceUpdatesPerClick.hunger) {
            eatAction.disabled = true;
        } else {
            eatAction.disabled = false;
        }        

        // Woodcutting check
        let woodcutAction = document.getElementById('action-woodcut');
        if(gameState.resources.energy < 5) {
            woodcutAction.disabled = true;
        } else {
            woodcutAction.disabled = false;
        }

        // Mining check
        let mineAction = document.getElementById('action-mine');
        if(gameState.resources.energy < 5) {
            mineAction.disabled = true;
        } else {
            mineAction.disabled = false;
        }
    }

    renderUI(gameState, log) {
        this.renderResources(gameState);
        this.renderActions(gameState, log);
        this.renderLog(log);
        this.renderActionCheck(gameState);
    };
}

export { Render };