class Render {
    static renderResources(gameState) {
        // Energy Update
        var forageLabel = document.getElementById('label-energy');
        forageLabel.innerHTML = "Energy: <span class='resource-amount'>" + gameState.resources.energy + "</span>";

        // Forage Update
        var forageLabel = document.getElementById('label-forage');
        forageLabel.innerHTML = "Food Foraged: <span class='resource-amount'>" + gameState.resources.food + "</span>";

        // Forage Update
        var woodLabel = document.getElementById('label-wood');
        woodLabel.innerHTML = "Wood Cut: <span class='resource-amount'>" + gameState.resources.wood + "</span>";

        // Mining Update
        var miningLabel = document.getElementById('label-copper');
        miningLabel.innerHTML = "Copper Mined: <span class='resource-amount'>" + gameState.resources.copper + "</span>";
    }

    static renderActions(gameState) {
        // Render eating action
        var eatAction = document.getElementById('action-eat');
        if(gameState.milestones.eating.milestoneMet) {
            eatAction.classList.remove("hidden");
        }

        // Render woodcutting action
        var woodcutAction = document.getElementById('action-woodcut');
        if(gameState.milestones.woodcutting.milestoneMet) {
            woodcutAction.classList.remove("hidden");
        }

        // Render mining action
        var mineAction = document.getElementById('action-mine');
        if(gameState.milestones.mining.milestoneMet) {
            mineAction.classList.remove("hidden");
        }
    }

    static renderLog(log) {
        // Render log
        var logPanel = document.getElementById('log-contents');
        let logStatement = log.pop();
        if (logStatement) { logPanel.insertAdjacentHTML("afterbegin", "<span class='log-statement'>" + logStatement + "</span><br/>") };
    }

    static renderActionCheck(gameState) {
        // Check to disable buttons

        // Foraging check
        var forageAction = document.getElementById('action-forage');
        if(gameState.resources.energy < 5) {
            forageAction.disabled = true;
        } else {
            forageAction.disabled = false;
        }

        // Eating check
        var eatAction = document.getElementById('action-eat');
        if(gameState.resources.food < gameState.resourceUpdatesPerClick.hunger) {
            eatAction.disabled = true;
        } else {
            eatAction.disabled = false;
        }        

        // Woodcutting check
        var woodcutAction = document.getElementById('action-woodcut');
        if(gameState.resources.energy < 5) {
            woodcutAction.disabled = true;
        } else {
            woodcutAction.disabled = false;
        }

        // Mining check
        var mineAction = document.getElementById('action-mine');
        if(gameState.resources.energy < 5) {
            mineAction.disabled = true;
        } else {
            mineAction.disabled = false;
        }
    }

    static renderUI(gameState, log) {
        this.renderResources(gameState);
        this.renderActions(gameState);
        this.renderLog(log);
        this.renderActionCheck(gameState);
    };
}