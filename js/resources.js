class Resources {
    static updateResources(gameState, lastTick) {
        gameState.resources.food = gameState.resources.food + gameState.resourceUpdatesPerTick.food;
        gameState.resources.copper = gameState.resources.copper + gameState.resourceUpdatesPerTick.copper;
        gameState.resources.wood = gameState.resources.wood + gameState.resourceUpdatesPerTick.wood;
        Resources.checkMilestones(gameState);
    };

    static checkMilestones(gameState) {
        for(let ms in gameState.milestones) {
            let milestone = gameState.milestones[ms];
            if (milestone.milestoneMet === false) {
                let milestoneResource = milestone.resource;
                let milestoneCount = milestone.count;
                if (gameState.resources[milestoneResource] >= milestoneCount) {
                    milestone.milestoneMet = true;
                }
            }
        }
    }
}