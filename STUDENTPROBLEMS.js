'use strict';
/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById('myCanvas');
var g_background = document.getElementById('backgroundCanvas');

var ctxBackground = g_background.getContext('2d');
var ctx = g_canvas.getContext('2d');
var g_camera;
var g_music;
var g_jumpSound;
var g_powerDownSound;
var g_powerUpSound;

var g_powerUpsAndDown = {
  timeIncrease: 1,
  timeDecrease: 2,
  speedIncrease: 3,
  speedDecrease: 4,
  floorPowers: 5,
};

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
    cx: 50,
    cy: 270,
  });
}

// Button

var g_gameOver = false;
var g_theStory = true;
var g_WINNER = false;
var g_instructions = false;

var isPlaying = false;

var gameState = 'story';

function setGameState(state) {
    //console.log(state);

    if (state === 'story') {
        g_gameOver = false;
        g_theStory = true;
        g_WINNER = false;
        g_instructions = false;

        isPlaying = false;
        g_music.pause();
    } else if (state === 'gameOver') {
        g_gameOver = true;
        g_theStory = false;
        g_WINNER = false;
        g_instructions = false;

        isPlaying = false;
        g_music.pause();
    } else if (state === 'winner') {
        g_gameOver = false;
        g_theStory = false;
        g_WINNER = true;
        g_instructions = false;

        isPlaying = false;
        g_music.pause();
    } else if (state === 'instructions') {
        g_gameOver = false;
        g_theStory = false;
        g_WINNER = false;
        g_instructions = true;

        isPlaying = false;
        g_music.pause();
    } else if (state === 'playGame') {
        g_gameOver = false;
        g_theStory = false;
        g_WINNER = false;
        g_instructions = false;

        g_music.currentTime = 0;
        isPlaying = true;
        g_music.play();
    }
    gameState = state;
}

var g_buttonsFrontPage = [
  new Button({
    text: 'Start new game',
    color: 'red',
    width: 200,
    height: 40,
    x: g_canvas.width / 2 - 100,
    y: g_canvas.height / 1.2 - 85,
    onClick: function() {
      setGameState('playGame');
    },
  }),

  new Button({
    text: 'Instructions',
    color: 'red',
    width: 200,
    height: 40,
    x: g_canvas.width / 2 - 100,
    y: g_canvas.height / 1.1 - 65,
    onClick: function() {
      setGameState('instructions');
    },
  }),
];

var g_buttonGameOver = new Button({
    text : 'Start new game',
    color : 'red',
    width : 200,
    height : 40,
    x : g_canvas.width/2 - 100,
    y : 100,
    onClick : function () {
        //console.log('START NEW GAME FROM GAMEOVER CLICKED!');
        entityManager.reset();
        setGameState('playGame');
    }
});

var g_buttonInstruction = new Button({
  text: 'Go back',
  color: 'red',
  width: 200,
  height: 40,
  x: g_canvas.width / 2 - 100,
  y: g_canvas.height / 1.15 + 5,
});

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;
var g_patIsShowing = false;

var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

var KEY_HALT = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

var KEY_K = keyCode('K');

var KEY_G = keyCode('G');
var KEY_W = keyCode('W');
var TOGGLE_MUTE = 'M'.charCodeAt(0);

function toggleMusic() {
  if (g_music.paused) {
    //console.log('PLAY');
    g_music.play();
    g_jumpSound.volume = 0.4;
    g_powerDownSound.volume = 0.4;
    g_powerUpSound.volume = 0.4;
  } else {
    //console.log('PAUSE');
    g_music.pause();
    g_jumpSound.volume = 0;
    g_powerDownSound.volume = 0;
    g_powerUpSound.volume = 0;
  }
}

function onStartedPlaying() {
  g_music.play();
}

function updateSimulation(du) {
    
    processDiagnostics();
    if (typeof g_camera === 'undefined') { return }
    if (typeof g_music === 'undefined') { return }

    if (gameState === 'gameOver' || gameState == 'winner') {
        isPlaying = false;
        g_music.pause();
    } else if (gameState === 'story') {
        isPlaying = false;
        g_music.pause();
    } else if (gameState === 'instructions') {
        isPlaying = false;
        g_music.pause();
    } else if (gameState === 'playGame') {
        if (eatKey(TOGGLE_MUTE)) {
            toggleMusic();
        }

        if (isPlaying == false) {
            isPlaying = true;
            onStartedPlaying();
        }

        entityManager.update(du);
    }
}

function processDiagnostics() {
  if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;
}

function gatherInputs() {
  // Nothing to do here!
  // The event handlers do everything we need for now.
}

// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {
    if (typeof g_camera === 'undefined') { return }

    if (gameState === 'gameOver' || gameState == 'winner') {
        g_buttonGameOver.render(ctx);
        gameOver(ctx);
    } else if (gameState === 'story') {
        theStory(ctx);
        for (let i=0; i<g_buttonsFrontPage.length; i++) { 
            g_buttonsFrontPage[i].render(ctx);
        }
    } else if (gameState === 'instructions') {
        instructionGame(ctx);
        g_buttonInstruction.render(ctx);
    } else if (gameState === 'playGame') {
        entityManager.render(ctx);
        if (g_renderSpatialDebug) {
            spatialManager.render(ctx);
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
    background: 'src/background/background(2100x400).png',
    spritesheet: 'src/girlspritesheet.png',
    coffee: 'src/coffee.png',
    energydrink: 'src/energydrink.png',
    piazza: 'src/piazza.png',
    spotify: 'src/spotify.png',
    candy: 'src/candy.png',
    youtube: 'src/youtube.png',
    netflix: 'src/netflix.png',
    beer: 'src/beer.png',
    youtube: 'src/youtube.png',
    desk: 'src/desk.png',
    chair: 'src/chair.png',
    bed: 'src/bedtile(54x54).png',
    pat: 'src/pat (49x62).png',
  };

  imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

//initialize all the power ups and downs as sprites.
//done in a function for clarity
function setUpPowerUps() {
    g_sprites.powerUpsDowns = [
        {
            sprite: new Sprite(g_images.piazza),
            powerChange: 10,
            powerType: "timeChangerUp",
        },
        {
            sprite: new Sprite(g_images.netflix),
            powerChange: 10,
            powerType: "timeChangerDown",
        },
        {
            sprite: new Sprite(g_images.energydrink),
            powerChange: 1.75,
            powerType: "speedChangerUp",
        },
        {   
            sprite: new Sprite(g_images.coffee),
            powerChange: 1.5,
            powerType: "speedChangerUp"
        },
        {
            sprite: new Sprite(g_images.spotify),
            powerChange: 1.25,
            powerType: "speedChangerUp",
        },
        {
            sprite: new Sprite(g_images.candy),
            powerChange: 2,
            powerType: "candy",
        },
        {
            sprite: new Sprite(g_images.beer),
            powerChange: 0.5,
            powerType: "speedChangerDown",
        },
        {
            sprite: new Sprite(g_images.youtube),
            powerChange: 3,
            powerType: "timeChangerDown",
        },
        {
            sprite: new Sprite(g_images.chair),
            powerChange: 0.75,
            powerType: "crash",
        },
        {
            sprite: new Sprite(g_images.desk),
            powerChange: 0.5,
            powerType: "crash",
        },
        {
            sprite: new Sprite(g_images.bed),
            powerChange: 0,
            powerType: "dead",
        },{
            sprite: new Sprite(g_images.pat),
            powerChange: 0,
            powerType: "pat",
        },];
}

function preloadDone() {
  g_camera = new Camera(/*x start*/ 0, g_images.background.height);

  // Game music and reactionary sounds added
  g_music = new Audio('src/sounds/gametrack-xmas.mp3');
  g_music.loop = true;
  g_jumpSound = new Audio('src/sounds/bump.mp3');
  g_powerDownSound = new Audio('src/sounds/powerdown.mp3');
  g_powerUpSound = new Audio('src/sounds/powerup.mp3');
  g_music.volume = 0.8;
  g_jumpSound.volume = 0.4;
  g_powerDownSound.volume = 0.4;
  g_powerUpSound.volume = 0.4;

  setUpPowerUps();

  g_background = new Background(g_images.background);
  //breyta líka í okkar

  g_sprites.runner = new Sprite(g_images.spritesheet);
  
  entityManager.init();

  main.init();
}
// Kick it off
requestPreloads();
