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
  this.frameCount = 0;
  this.moveBitch = false;
}

Runner.prototype = new Entity();

Runner.prototype.rememberResets = function() {
  // Remember my reset positions
  this.reset_cx = this.cx;
  this.reset_cy = this.cy;
};

Runner.prototype.KEY_JUMP = 'W'.charCodeAt(0);
Runner.prototype.KEY_CROUCH = 'S'.charCodeAt(0);


// Initial, inheritable, default values
Runner.prototype.cx = 200;
Runner.prototype.cy = 200;
Runner.prototype.numSubSteps = 1;
Runner.prototype.width = 64;
Runner.prototype.height = 80;
Runner.prototype.walkLoop = [0,1,2,3,4];
Runner.prototype.crouchLoop = [0,1,2,3,4,2,0];
Runner.prototype.jump = [0,1];
Runner.prototype.loops = [[0,1,2,3,4], [0,1,2,3,4,2,0], [0,1]];
Runner.prototype.speed = 150;

Runner.prototype.currentSpeed = 10; 
Runner.prototype.currentLoop = 0;
Runner.prototype.currentLoopIndex = 0;
Runner.prototype.endFrame = 11; 
Runner.prototype.frameCount = 0; 



Runner.prototype.update = function(du) {

  // Perform movement substeps
  //to do add diferent frames
  // ef key = S þá crouch animation
  // ef key = w þá jump animation 
  

  if (eatKey(this.KEY_CROUCH)) {
    this.currentLoop = this.currentLoop = 1;
  }
  if (eatKey(this.KEY_JUMP)) {
    this.currentLoop = this.currentLoop = 1;
  }

  this.computeSubStep(du);
  if(this.moveBitch) {
    if (this.currentLoopIndex >= this.loops[this.currentLoop].length) {
      this.currentLoopIndex = 0;
      this.moveBitch = false;
    }
  }
};

//sama og step fallið? 
Runner.prototype.computeSubStep = function(du) {

  this.frameCount++;
  if (this.frameCount < this.speed) { //hversu hratt við update-um
    this.moveBitch = true;
    this.frameCount = 0;
    return;
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

Runner.prototype.render = function(ctx) {
  if(this.moveBitch) {
    this.sprite.drawFrame(ctx,this.loops[this.currentLoop][this.currentLoopIndex], this.currentLoop, this.cx, this.cy);
    this.moveBitch = false;
    this.currentLoopIndex++;
  }
};

