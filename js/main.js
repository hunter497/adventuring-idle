;(function () {
    let MyGame = new Object();

    let log = [];

    function main( tFrame ) {
      MyGame.stopMain = window.requestAnimationFrame( main );
      var nextTick = MyGame.lastTick + MyGame.tickLength;
      var numTicks = 0;
  
      // If tFrame < nextTick then 0 ticks need to be updated (0 is default for numTicks).
      // If tFrame = nextTick then 1 tick needs to be updated (and so forth).
      // Note: As we mention in summary, you should keep track of how large numTicks is.
      // If it is large, then either your game was asleep, or the machine cannot keep up.
      if (tFrame > nextTick) {
        var timeSinceTick = tFrame - MyGame.lastTick;
        numTicks = Math.floor( timeSinceTick / MyGame.tickLength );
      }
  
      queueUpdates( numTicks );
      saveState();
      Render.renderUI(gameState, log);
      MyGame.lastRender = tFrame;
    }
  
    function queueUpdates( numTicks ) {
      for(var i=0; i < numTicks; i++) {
        MyGame.lastTick = MyGame.lastTick + MyGame.tickLength; // Now lastTick is this tick.
        Resources.updateResources(gameState, MyGame.lastTick);
      }
    };

    function setInitialState() {
        loadState();
        Handlers.setActionHandlers(gameState, log);
    };

    

    //////////////
    // LocalStorage functions
    /////////////

    // Load function, including defaults if nothing set in localstorage
    function loadState() {
        gameState = JSON.parse(localStorage.getItem('gameState')) || {
            resources: {
                food: 0,
                energy: 0,
                copper: 0
            },
            resourceUpdatesPerClick: {
                food: 10,
                hunger: 5,
                energy: 3,
                copper: 5
            },
            milestones: {
                mining: new Milestone("food", 100, false)
            },    
            resourceUpdatesPerTick: {
                food: 0.0,
                copper: 0.0
            }
        };
    }   
    function saveState() {
        localStorage.setItem('gameState', JSON.stringify(gameState));
    }
  
    MyGame.lastTick = performance.now();
    MyGame.lastRender = MyGame.lastTick; // Pretend the first draw was on first update.
    MyGame.tickLength = 50; // This sets your simulation to run at 20Hz (50ms)
    
    setInitialState();
    main(performance.now()); // Start the cycle
  })();

