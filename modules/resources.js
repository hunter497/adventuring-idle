class Resources {
    updateResources(gameState, lastTick) {
        gameState.resources.energy += gameState.resourceUpdatesPerTick.energy;
        gameState.resources.food += gameState.resourceUpdatesPerTick.food;
        gameState.resources.copper += gameState.resourceUpdatesPerTick.copper;
        gameState.resources.wood += gameState.resourceUpdatesPerTick.wood;
        this.checkMilestones(gameState);
    };

    checkMilestones(gameState) {
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

export { Resources };