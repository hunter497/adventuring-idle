// Grabbed this basic game loop from mozilla
;(function () {
    let MyGame = new Object();

    // Current resources, will need to save and load this to localstorage on page load, not on update
    let resources = {
        food: 0,
        energy: 0,
        copper: 0
    };

    let resourceUpdatesPerClick = {
        food: 10,
        hunger: 5,
        energy: 3,
        copper: 5
    };

    let resourceUpdatesPerTick = {
        food: 0.0,
        copper: 0.0
    };

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
      render( tFrame );
      MyGame.lastRender = tFrame;
    }
  
    function queueUpdates( numTicks ) {
      for(var i=0; i < numTicks; i++) {
        MyGame.lastTick = MyGame.lastTick + MyGame.tickLength; // Now lastTick is this tick.
        update( MyGame.lastTick );
      }
    };

    // Rendering/UI Updates

    function render( tFrame ) {
        // Energy Update
        var forageLabel = document.getElementById('label-energy');
        forageLabel.innerHTML = "Total Energy: <span class='resource-amount'>" + resources.energy + "</span>";

        // Forage Update
        var forageLabel = document.getElementById('label-forage');
        forageLabel.innerHTML = "Total Food Foraged: <span class='resource-amount'>" + resources.food + "</span>";

        // Mining Update
        var miningLabel = document.getElementById('label-copper');
        miningLabel.innerHTML = "Total Copper: <span class='resource-amount'>" + resources.copper + "</span>";

        // Render log
        //TODO: limit to 10 log items shown
        var logPanel = document.getElementById('log-contents');
        let logStatement = log.pop();
        if (logStatement) { logPanel.innerHTML += "<span class='log-statement'>" + logStatement + "</span><br/>"; }

        // Check to disable buttons

        // Eating check
        var eatAction = document.getElementById('action-eat');
        if(resources.food < resourceUpdatesPerClick.hunger) {
            eatAction.disabled = true;
        } else {
            eatAction.disabled = false;
        }        

        // Mining check
        var mineAction = document.getElementById('action-mine');
        if(resources.energy < 5) {
            mineAction.disabled = true;
        } else {
            mineAction.disabled = false;
        }
        
    };

    // Resource updates

    function update() {
        resources.food = resources.food + resourceUpdatesPerTick.food;
        resources.copper = resources.copper + resourceUpdatesPerTick.copper;
        saveState();
    };

    function setInitialState() {
        setActionHandlers();
        loadState();
    };


    // Button click handlers

    function setActionHandlers() {
        // Forage handler
        var forageAction = document.getElementById('action-forage');
        forageAction.addEventListener("click", forageHandler);

        // Eating handler
        var forageAction = document.getElementById('action-eat');
        forageAction.addEventListener("click", eatingHandler);

        // Mining handler
        var mineAction = document.getElementById('action-mine');
        mineAction.addEventListener("click", miningHandler);
    };


    // Resource Updates

    // Forage handler
    function forageHandler() {
        resources.food = resources.food + resourceUpdatesPerClick.food;
        log.push(`${resourceUpdatesPerClick.food} food has been added to your stash!`);
    };

    function eatingHandler() {
        resources.food = resources.food - resourceUpdatesPerClick.hunger;
        resources.energy += resourceUpdatesPerClick.energy;
        log.push(`You have consumed ${resourceUpdatesPerClick.hunger} food and gained ${resourceUpdatesPerClick.energy} energy!`);
    };

    // Mining handler
    function miningHandler() {
        resources.copper = resources.copper + resourceUpdatesPerClick.copper;
        resources.energy -= 5;
        log.push(resourceUpdatesPerClick.copper + " copper has been added to your stash!");
    };

    //////////////
    // LocalStorage functions
    /////////////

    // Load function, including defaults if nothing set in localstorage
    function loadState() {
        resources = JSON.parse(localStorage.getItem('resources')) || {
            food: 0,
            energy: 0,
            copper: 0
        };
        resourceUpdatesPerClick = JSON.parse(localStorage.getItem('resourceUpdatesPerClick')) || {
            food: 10,
            hunger: 5,
            energy: 3,
            copper: 5
        };
        resourceUpdatesPerTick = JSON.parse(localStorage.getItem('resourceUpdatesPerTick')) || {
            food: 0.0,
            copper: 0.0
        };
    }   

    // Save function
    function saveState() {
        localStorage.setItem('resources', JSON.stringify(resources));
        localStorage.setItem('resourceUpdatesPerClick', JSON.stringify(resourceUpdatesPerClick));
        localStorage.setItem('resourceUpdatesPerTick', JSON.stringify(resourceUpdatesPerTick));
    }
  
    MyGame.lastTick = performance.now();
    MyGame.lastRender = MyGame.lastTick; // Pretend the first draw was on first update.
    MyGame.tickLength = 50; // This sets your simulation to run at 20Hz (50ms)
    
    setInitialState();
    main(performance.now()); // Start the cycle
  })();

