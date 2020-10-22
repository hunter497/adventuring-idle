import { StateManager } from './stateManager.js';

class Handlers {
    setActionHandlers(gameState, log) {
        let stateManager = new StateManager();

        // Clear Save
        var clearSave = document.getElementById('clear-save');
        clearSave.addEventListener("click", () => stateManager.clearSave());

        // Save
        var save = document.getElementById('save');
        save.addEventListener("click", () => stateManager.save(gameState));

        // Forage handler
        var forageAction = document.getElementById('action-forage');
        forageAction.addEventListener("click", () => this.forageHandler(gameState, log));

        // Eating handler
        var eatAction = document.getElementById('action-eat');
        eatAction.addEventListener("click", () => this.eatingHandler(gameState, log));

        // Cutting handler
        var woodcuttingAction = document.getElementById('action-woodcut');
        woodcuttingAction.addEventListener("click", () => this.woodcuttingHandler(gameState, log));

        // Mining handler
        var mineAction = document.getElementById('action-mine');
        mineAction.addEventListener("click", () => this.miningHandler(gameState, log));
    };

    // Forage handler
    forageHandler(gameState, log) {
        gameState.resources.food = gameState.resources.food + gameState.resourceUpdatesPerClick.food;
        gameState.resources.energy -= 5;
        log.push(`${gameState.resourceUpdatesPerClick.food} food has been added to your stash!`);
    };

    eatingHandler(gameState, log) {
        gameState.resources.food = gameState.resources.food - gameState.resourceUpdatesPerClick.hunger;
        gameState.resources.energy += gameState.resourceUpdatesPerClick.energy;
        log.push(`You have consumed ${gameState.resourceUpdatesPerClick.hunger} food and gained ${gameState.resourceUpdatesPerClick.energy} energy!`);
    };

    // Woodcutting handler
    woodcuttingHandler(gameState, log) {
        gameState.resources.wood = gameState.resources.wood + gameState.resourceUpdatesPerClick.wood;
        gameState.resources.energy -= 5;
        log.push(`${gameState.resourceUpdatesPerClick.wood} wood has been added to your stash!`);
    }

    // Mining handler
    miningHandler(gameState, log) {
        gameState.resources.copper = gameState.resources.copper + gameState.resourceUpdatesPerClick.copper;
        gameState.resources.energy -= 5;
        log.push(`${gameState.resourceUpdatesPerClick.copper} copper has been added to your stash!`);
    };
}

export { Handlers };