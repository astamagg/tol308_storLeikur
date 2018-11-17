"use strict";
/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_background = document.getElementById("backgroundCanvas");

var g_ctxBackground = g_background.getContext("2d");
var g_ctx = g_canvas.getContext("2d");

var g_powerUpsAndDown = {
    "timeIncrease": 1,
    "timeDecrease": 2,
    "speedIncrease": 3,
    "speedDecrease": 4,
    "floorPowers": 5,
}

// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`



function createInitialRunner() {
    entityManager.generateRunner({
      cx: 200,
      cy: 200,
    });
  }

function updateSimulation(du) {
    
    processDiagnostics();
    
    entityManager.update(du);

    // Prevent perpetual firing!
   // eatKey(Ship.prototype.KEY_FIRE);
}

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_MIXED   = keyCode('M');;
var KEY_GRAVITY = keyCode('G');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

var KEY_K = keyCode('K');

function processDiagnostics() {
/*
    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_HALT)) entityManager.haltShips();

    if (eatKey(KEY_RESET)) entityManager.resetShips();

    if (eatKey(KEY_0)) entityManager.toggleRocks();*/

}



function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {
    
    entityManager.render(ctx);
    

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};
var g_background = {};

function requestPreloads() {
    
    var requiredImages = {
        background: "https://notendur.hi.is/alm20/images/background.png",
        girlstanding : "src/girlstanding.png",
        coffee: "src/coffee.png",
        energydrink: "src/energydrink.png",
        piazza: "src/piazza.png",
        spotify: "src/spotify.png",
        candy: "src/candy.png",
        youtube: "src/youtube.png",
        netflix: "src/netflix.png",

    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {
    g_sprites.powerUpsDowns = [
        {
            sprite: new Sprite(g_images.piazza),
            powerChange: 5,
            height: g_images.piazza.height,
            width: g_images.piazza.width

        },
        {
            sprite: new Sprite(g_images.netflix),
            powerChange: -5,
            height: g_images.netflix.height,
            width: g_images.netflix.width
        },
        {
            sprite: new Sprite(g_images.energydrink),
            powerChange: 3,
            height: g_images.energydrink.height,
            width: g_images.energydrink.width
            
        },
        {   
            sprite: new Sprite(g_images.coffee),
            powerChange: 3,
            height: g_images.coffee.height,
            width: g_images.coffee.width

        },
        {
            sprite: new Sprite(g_images.spotify),
            powerChange: 3,
            height: g_images.spotify.height,
            width: g_images.spotify.width
        },
        {
            sprite: new Sprite(g_images.candy),
            powerChange: 3,
            height: g_images.candy.height,
            width: g_images.candy.width
        },
        {
            sprite: new Sprite(g_images.beer),
            powerChange: -1/3,
            height: g_images.beer.height,
            width: g_images.beer.width,
        },
        {
            sprite: new Sprite(g_images.youtube),
            
        }
    
    
    ];
            

    g_background = new Background(g_images.background);
    //breyta líka í okkar
    g_sprites.runner  = new Sprite(g_images.girlstanding);
    
    entityManager.init();
    createInitialRunner();

    main.init();
}

// Kick it off
requestPreloads();