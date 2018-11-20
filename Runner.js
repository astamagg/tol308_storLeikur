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
}

Runner.prototype = new Entity();

Runner.prototype.rememberResets = function() {
  // Remember my reset positions
  this.reset_cx = this.cx;
  this.reset_cy = this.cy;
};

/*
Runner.prototype.KEY_CROUCH = 40;
Runner.prototype.KEY_JUMP   = ' '.charCodeAt(0);
*/
Runner.prototype.KEY_JUMP   = 'W'.charCodeAt(0);
Runner.prototype.KEY_CROUCH = 'S'.charCodeAt(0);

// Initial, inheritable, default values
Runner.prototype.cx = 50;
Runner.prototype.cy = 220;
Runner.prototype.y_velocity = 0; 
Runner.prototype.numSubSteps = 1; //what is this
Runner.prototype.width = 64;
Runner.prototype.height = 80;
Runner.prototype.totalDistance = 0;
//animations from spritesheet frames
//Runner.prototype.loops = [[0,1,2,3,4], [0,1,2,3,4], [2,1,0], [1]]; //walk, crouchingDown, standing up, jump,
Runner.prototype.loops = [[0,1,2,3,4], [4], [1]]; //walk, crouchingDown, standing up, jump,


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


Runner.prototype.handleKeys = function(){
  if (keys[this.KEY_CROUCH]) {
    console.log('crouch');
    this.isCrouching = true;    
  }
  else {
    this.isCrouching = false;
  }
  if (keys[this.KEY_JUMP] && this.cy <= 220) {
    //console.log('jump');
    //this.y_velocity -= 20;
    this.isJumping = true;
  }
  else {
    if(this.y_velocity = 1.7){
         this.isJumping = false;
         console.log(this.isJumping);
         
    }

  }
};

Runner.prototype.update = function(du) {

this.handleKeys(); 
this.updateInterval -= du;

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
  this.currentLoop = 1;
}
//höndla hopp
// gefa velocity á meðan að við höldum niðri takkanum
// gera alla takka óvirka þar til við snertum base-ið 
if(this.isJumping){
  //console.log('changeloop');
  this.currentLoop = 2;
  console.log("current loop:", this.currentLoop);
  
  this.y_velocity -= 20;
  this.cy += this.y_velocity; 
    //this.cy -= 10;
    //this.g_useGravity = true;
    console.log(this.cy);
    console.log("isJumping yvel:",this.y_velocity);
    
    //accelY += this.computeGravity();
}
if(!this.isJumping){
  this.y_velocity += 2.7;
  console.log("yvel:",this.y_velocity);
  this.cy += this.y_velocity;
}

if(this.cy > 220){
  this.isJumping = false;
  this.cy = 220; 
  this.y_velocity = 0; 
}
else{
  this.isJumping = true;
}


if(!this.isCrouching && !this.isJumping){
  this.currentLoop = 0;
  this.currentLoopIndex++;
}
//fara á næsta ramma
/*
if(!this.isCrouching || !this.isJumping){
  this.currentLoopIndex++;
}*/
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

