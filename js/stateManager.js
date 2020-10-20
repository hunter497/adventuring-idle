class StateManager {
        // Clear save
        static clearSave() {
            localStorage.removeItem('gameState');
        }
    
        // Save
        static save(gameState) {
            localStorage.setItem('gameState', JSON.stringify(gameState));
        }
}