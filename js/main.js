;(function () {
    let MyGame = new Object();

    let log = [];

    function main( tFrame ) {
      MyGame.stopMain = window.requestAnimationFrame( main );
      var nextTick = MyGame.lastTick + MyGame.tickLength;
      var numTicks = 0;

      if (tFrame > nextTick) {
        var timeSinceTick = tFrame - MyGame.lastTick;
        numTicks = Math.floor( timeSinceTick / MyGame.tickLength );
      }
  
      queueUpdates( numTicks );
      // saveState();
      Render.renderUI(gameState, log);
      MyGame.lastRender = tFrame;
    }
  
    function queueUpdates( numTicks ) {
      for(var i=0; i < numTicks; i++) {
        MyGame.lastTick = MyGame.lastTick + MyGame.tickLength;
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
          energy: 0,
          food: 0,
          wood: 0,
          copper: 0
        },
        resourceUpdatesPerClick: {
          energy: 7,
          food: 10,
          hunger: 5,
          wood: 3,
          copper: 5
        },
        milestones: {
          eating: new Milestone("food", 10, false, "You should probably think about eating some of that food!", false),
          woodcutting: new Milestone("food", 100, false, "You see a ton of trees all around you. Maybe you should cut some down?", false),
          mining: new Milestone("wood", 100, false, "That copper looks useful, go ahead and start mining away!", false)
        },    
        resourceUpdatesPerTick: {
          energy: 1.0,
          food: 0.0,
          wood: 0.0,
          copper: 0.0
        }
      };
    }   
    // function saveState() {
    //   localStorage.setItem('gameState', JSON.stringify(gameState));
    // }
  
    MyGame.lastTick = performance.now();
    MyGame.lastRender = MyGame.lastTick; // Pretend the first draw was on first update.
    MyGame.tickLength = 1000; // This sets your simulation to run at 20Hz (50ms)
    
    setInitialState();
    main(performance.now()); // Start the cycle
  })();

