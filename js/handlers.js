class Handlers {
    static setActionHandlers(gameState, log) {
        // Clear Save
        var clearSave = document.getElementById('clear-save');
        clearSave.addEventListener("click", () => Handlers.clearSave());

        // Save
        var save = document.getElementById('save');
        save.addEventListener("click", () => Handlers.save(gameState));

        // Forage handler
        var forageAction = document.getElementById('action-forage');
        forageAction.addEventListener("click", () => Handlers.forageHandler(gameState, log));

        // Eating handler
        var eatAction = document.getElementById('action-eat');
        eatAction.addEventListener("click", () => Handlers.eatingHandler(gameState, log));

        // Cutting handler
        var woodcuttingAction = document.getElementById('action-woodcut');
        woodcuttingAction.addEventListener("click", () => Handlers.woodcuttingHandler(gameState, log));

        // Mining handler
        var mineAction = document.getElementById('action-mine');
        mineAction.addEventListener("click", () => Handlers.miningHandler(gameState, log));
    };

    // Clear save
    static clearSave() {
        localStorage.removeItem('gameState');
    }

    // Save
    static save(gameState) {
        localStorage.setItem('gameState', JSON.stringify(gameState));
    }

    // Forage handler
    static forageHandler(gameState, log) {
        gameState.resources.food = gameState.resources.food + gameState.resourceUpdatesPerClick.food;
        log.push(`${gameState.resourceUpdatesPerClick.food} food has been added to your stash!`);
    };

    static eatingHandler(gameState, log) {
        gameState.resources.food = gameState.resources.food - gameState.resourceUpdatesPerClick.hunger;
        gameState.resources.energy += gameState.resourceUpdatesPerClick.energy;
        log.push(`You have consumed ${gameState.resourceUpdatesPerClick.hunger} food and gained ${gameState.resourceUpdatesPerClick.energy} energy!`);
    };

    // Woodcutting handler
    static woodcuttingHandler(gameState, log) {
        gameState.resources.wood = gameState.resources.wood + gameState.resourceUpdatesPerClick.wood;
        gameState.resources.energy -= 5;
        log.push(`${gameState.resourceUpdatesPerClick.wood} wood has been added to your stash!`);
    }

    // Mining handler
    static miningHandler(gameState, log) {
        gameState.resources.copper = gameState.resources.copper + gameState.resourceUpdatesPerClick.copper;
        gameState.resources.energy -= 5;
        log.push(`${gameState.resourceUpdatesPerClick.copper} copper has been added to your stash!`);
    };
}