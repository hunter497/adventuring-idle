class Render {
    static renderResources(gameState) {
        // Energy Update
        var forageLabel = document.getElementById('label-energy');
        forageLabel.innerHTML = "Total Energy: <span class='resource-amount'>" + gameState.resources.energy + "</span>";

        // Forage Update
        var forageLabel = document.getElementById('label-forage');
        forageLabel.innerHTML = "Total Food Foraged: <span class='resource-amount'>" + gameState.resources.food + "</span>";

        // Mining Update
        var miningLabel = document.getElementById('label-copper');
        miningLabel.innerHTML = "Total Copper: <span class='resource-amount'>" + gameState.resources.copper + "</span>";
    }

    static renderActions(gameState) {
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

        // Eating check
        var eatAction = document.getElementById('action-eat');
        if(gameState.resources.food < gameState.resourceUpdatesPerClick.hunger) {
            eatAction.disabled = true;
        } else {
            eatAction.disabled = false;
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