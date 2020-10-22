class StateManager {
        // Clear save
        clearSave() {
            localStorage.removeItem('gameState');
        }
    
        // Save
        save(gameState) {
            localStorage.setItem('gameState', JSON.stringify(gameState));
        }
}

export { StateManager };