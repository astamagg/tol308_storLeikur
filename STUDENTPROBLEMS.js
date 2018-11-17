"use strict";
/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_background = document.getElementById("backgroundCanvas");

var ctxBackground = g_background.getContext("2d");
var ctx = g_canvas.getContext("2d");

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

// Button

var g_gameOver = false;
var g_theStory = true;
var g_WINNER = false;
var g_instructions = false;

var g_buttonsFrontPage = [

    new Button({
        text : 'Start new game',
        color : 'red',
        width : 200,
        height : 40,
        x : g_canvas.width/2 - 100,
        y : g_canvas.height/1.2 - 80,
        onClick : function () {
            g_theStory = false;
        }
    }),

    new Button({
        text : 'Instructions',
        color : 'red',
        width : 200,
        height : 40,
        x : g_canvas.width/2 - 100,
        y : g_canvas.height/1.1 - 60,
        onClick : function () {
            g_theStory = false;
            g_instructions = true;
        }
    }),

];

var g_buttonInstruction = new Button({
    text : 'Go back',
    color : 'red',
    width : 200,
    height : 40,
    x : g_canvas.width/2 - 100,
    y : g_canvas.height/1.1
});

var g_buttonGameOver = new Button({
    text : 'New game',
    color : 'red',
    width : 200,
    height : 40,
    x : 100,
    y : 100
});

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_MIXED   = keyCode('M');;
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

var KEY_K = keyCode('K');

var KEY_G = keyCode('G');
var KEY_W = keyCode('W');

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


    if (g_gameOver || g_WINNER) {
        gameOver(ctx);
    } else {
        if (g_theStory) {
            theStory(ctx);
            for (let i=0; i<g_buttonsFrontPage.length; i++) { 
                g_buttonsFrontPage[i].render(ctx);
            }
        } else if (g_instructions) {
            instructionGame(ctx);
            g_buttonInstruction.render(ctx);
        }
        
        if (!g_theStory && !g_instructions) {
            entityManager.render(ctx);
    
            if (g_renderSpatialDebug) spatialManager.render(ctx);
        }
    }


}


// =============
// PRELOAD STUFF
// =============

var g_images = {};
var g_background = {};

function requestPreloads() {
    
    var requiredImages = {
        background: "https://notendur.hi.is/alm20/images/background.png",

        spritesheet : "src/spritesheet64x80.png",
        girlstanding : "src/girlstanding.png",
        coffee: "src/coffee.png",
        energydrink: "src/energydrink.png",
        piazza: "src/piazza.png",
        spotify: "src/spotify.png",
        candy: "src/candy.png",
        youtube: "src/youtube.png",
        netflix: "src/netflix.png",
        beer: "src/beer.png",
        youtube: "src/youtube.png",
        backgroundFrontPage : "src/backgroundFrontPage.png",
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
            powerChange: -3,
            height: g_images.beer.height,
            width: g_images.beer.width,
        },
        {
            sprite: new Sprite(g_images.youtube),
            powerChange: -3,
            height: g_images.youtube.height,
            width: g_images.youtube.width,
        }];
            

    g_background = new Background(g_images.background);
    //breyta líka í okkar

    g_sprites.runner  = new Sprite(g_images.spritesheet);
  
    entityManager.init();
    createInitialRunner();

    main.init();
}
// Kick it off
requestPreloads();