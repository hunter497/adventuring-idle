class Handlers {
    static setActionHandlers(gameState, log) {
        // Forage handler
        var forageAction = document.getElementById('action-forage');
        forageAction.addEventListener("click", () => Handlers.forageHandler(gameState, log));

        // Eating handler
        var forageAction = document.getElementById('action-eat');
        forageAction.addEventListener("click", () => Handlers.eatingHandler(gameState, log));

        // Mining handler
        var mineAction = document.getElementById('action-mine');
        mineAction.addEventListener("click", () => Handlers.miningHandler(gameState, log));
    };

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

    // Mining handler
    static miningHandler(gameState, log) {
        gameState.resources.copper = gameState.resources.copper + gameState.resourceUpdatesPerClick.copper;
        gameState.resources.energy -= 5;
        log.push(gameState.resourceUpdatesPerClick.copper + " copper has been added to your stash!");
    };
}