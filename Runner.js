// ==========
// Runner STUFF
// ==========

'use strict';

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Runner(descr) {
  // Common inherited setup logic from Entity
  this.setup(descr);

  this.rememberResets();

  // Default sprite, if not otherwise specified
  this.sprite = g_sprites.runner;

  // Set normal drawing scale, and warp state off
  this._scale = 1;
  //this.frameCount = 0;
  this.moveBitch = false;
}

Runner.prototype = new Entity();

Runner.prototype.rememberResets = function() {
  // Remember my reset positions
  this.reset_cx = this.cx;
  this.reset_cy = this.cy;
};

Runner.prototype.KEY_CROUCH = 'S'.charCodeAt(0);
Runner.prototype.KEY_JUMP   = ' '.charCodeAt(0);

//Runner.prototype.KEY_CROUCH = 'S'.charCodeAt(0);


// Initial, inheritable, default values
Runner.prototype.cx = 50;
Runner.prototype.cy = 170;
Runner.prototype.numSubSteps = 1; //what is this
Runner.prototype.width = 64;
Runner.prototype.height = 80;
Runner.prototype.totalDistance = 0;
//animations from spritesheet frames
Runner.prototype.loops = [[0,1,2,3,4], [0,1,2,3,4], [2,1,0], [1]]; //walk, crouchingDown, standing up, jump,

//animation update speed and interval (running speed)
Runner.prototype.speed = 10;
Runner.prototype.updateInterval = 30;

//position in loops for drawing
Runner.prototype.currentLoop = 0;
Runner.prototype.currentLoopIndex = 0;
//Runner.prototype.endFrame = 11; (þarf ekki að nota en ætla að geyma)
//Runner.prototype.frameCount = 0; 

//bools for jumping & crouching
Runner.prototype.isJumping = false; 
Runner.prototype.isCrouching = false;
//speeds
Runner.prototype.runningSpeed = 25;  //normal = 20-25?  


/*Runner.prototype.handleKeys = function(){

  if (this.KEY_CROUCH) {
    this.isCrouching = true;
  }
  if (this.KEY_JUMP) {
    this.isJumping = true;
  }
/*Jumping
setja velocity á entityið -> neg y- velocity
síðan mun gravity minnka velocity þangað til að kallinn lendir aftur

Hafa veriable jumps
tap -> hoppa minna
lengra press -> hoppa hærra

nota G for gravity

this.isJumping = true; 
this.isCrouching = true; //hvar endurstill ég þetta? 


  return true; 
};*/

Runner.prototype.update = function(du) {

this.updateInterval -= du;


//eatKey bregst ekki við því ef maður heldur takkanum inni? 
if (eatKey(this.KEY_CROUCH)) {
    this.isCrouching = true;
  }
if (eatKey(this.KEY_JUMP)) {
    this.isJumping = true;
}
/*
//En þetta virkar ekki heldur
if (this.KEY_CROUCH) {
  this.isCrouching = true;
}
if (this.KEY_JUMP) {
  this.isJumping = true;
}*/

//hversu oft við viljum breyta um ramma
var updateTresh = this.runningSpeed;

  if (this.updateInterval < updateTresh) {
    this.computeSubStep(this.updateInterval);
      //hvað er hvert skref mikil x færsla?
      //placeholder if settning til þess að stelpan birtist aftur
     if(this.cx > 600 ){
       this.cx = 0;
     }
     else this.cx += this.speed;
     //console.log(this.currentLoopIndex);
     this.updateInterval = 30; 
     }

  //bæta við this.totalDistance += du... til þess að updatea bakgrunn eftir X distance
};

//Færa spritesheet ramma um eitt skref
Runner.prototype.computeSubStep = function(du) {

if(this.isCrouching){

  //á meðan að takkinn er niðri þá ætlum við að fara niður í full crouch stöðu
  //1. crouching down þangað til að takkanum er sleppt 
  //      this.currentLopp = 1;
  //2. þá færa á standing up loopu, keyra hana 1x
  //      this.isCrouching = false
  //      this.currentLoop = 2 (fyrir 1xloop)
  //3. setja aftur á walking loop-u
  //      this.currentLopp = 0; 

  this.currentLoop = 1;
  //this.currentLoopIndex = 0; 
  while(this.currentLoopIndex > this.currentLoop.length){
    this.currentLoopIndex++;
    console.log(this.currentLoopIndex);
  }
  this.currentLoop = 0;
  this.isCrouching = false
  //this.currentLoop = this.currentLoop = 3;
}

/*
//höndla hopp
if(this.isJumping){
  this.currentLoop = this.currentLoop = 3;
  this.cy += ?? 
  eitthvað með gravity
}*/

//fara á næsta ramma
this.currentLoopIndex++;

//loppa í hring til þess að gera animation og færa stelpuna um x distance
if (this.currentLoopIndex >= this.loops[this.currentLoop].length) {
  this.currentLoopIndex = 0; 
 }
};

var NOMINAL_GRAVITY = 0.12;

Runner.prototype.computeGravity = function() {
  return g_useGravity ? NOMINAL_GRAVITY : 0;
};

Runner.prototype.reset = function() {
  this.setPos(this.reset_cx, this.reset_cy);
  this.halt();
};

Runner.prototype.halt = function() {
  this.velX = 0;
  this.velY = 0;
};

//teikna ramma á spritesheet
Runner.prototype.render = function(ctx) {
//drawFrame(ctx, X gildi á ramma, Y gildi á ramma, x staðsettning á canvas, y staðsettning á canvas  )
  this.sprite.drawFrame(ctx,this.loops[this.currentLoop][this.currentLoopIndex], this.currentLoop, this.cx, this.cy);
};

