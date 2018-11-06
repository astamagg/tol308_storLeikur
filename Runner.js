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
  this.sprite = this.sprite || g_sprites.runner;

  // Set normal drawing scale, and warp state off
  this._scale = 1;
  this._isWarping = false;
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
Runner.prototype.velX = 0;
Runner.prototype.velY = 0;
Runner.prototype.launchVel = 2;
Runner.prototype.numSubSteps = 1;



Runner.prototype.update = function(du) {

  // Perform movement substeps
  //to do add diferent frames
  var steps = this.numSubSteps;
  var dStep = du / steps;
  for (var i = 0; i < steps; ++i) {
    this.computeSubStep(dStep);
  }

};

Runner.prototype.computeSubStep = function(du) {
  /*var thrust = this.computeThrustMag();

  // Apply thrust directionally, based on our rotation
  //var accelX = +Math.sin(this.rotation) * thrust;
  //var accelY = -Math.cos(this.rotation) * thrust;

  accelY += this.computeGravity();

  this.applyAccel(accelX, accelY, du);

  this.wrapPosition();

  if (thrust === 0 || g_allowMixedActions) {
    this.updateRotation(du);
  }*/
};

var NOMINAL_GRAVITY = 0.12;

Runner.prototype.computeGravity = function() {
  return g_useGravity ? NOMINAL_GRAVITY : 0;
};

var NOMINAL_THRUST = +0.2;
var NOMINAL_RETRO = -0.1;

Runner.prototype.computeThrustMag = function() {
  /*var thrust = 0;

  if (keys[this.KEY_JUMP]) {
    thrust += NOMINAL_THRUST;
  }
  if (keys[this.KEY_CROUCH]) {
    thrust += NOMINAL_RETRO;
  }
*/
  return thrust;
};

Runner.prototype.applyAccel = function(accelX, accelY, du) {
  // u = original velocity
  var oldVelX = this.velX;
  var oldVelY = this.velY;

  // v = u + at
  this.velX += accelX * du;
  this.velY += accelY * du;

  // v_ave = (u + v) / 2
  var aveVelX = (oldVelX + this.velX) / 2;
  var aveVelY = (oldVelY + this.velY) / 2;

  // Decide whether to use the average or not (average is best!)
  var intervalVelX = g_useAveVel ? aveVelX : this.velX;
  var intervalVelY = g_useAveVel ? aveVelY : this.velY;

  // s = s + v_ave * t
  var nextX = this.cx + intervalVelX * du;
  var nextY = this.cy + intervalVelY * du;

  // s = s + v_ave * t
  this.cx += du * intervalVelX;
  this.cy += du * intervalVelY;
};


Runner.prototype.reset = function() {
  this.setPos(this.reset_cx, this.reset_cy);
  this.rotation = this.reset_rotation;

  this.halt();
};

Runner.prototype.halt = function() {
  this.velX = 0;
  this.velY = 0;
};


Runner.prototype.render = function(ctx) {
  //var origScale = this.sprite.scale;
  // pass my scale into the sprite, for drawing
  //this.sprite.scale = this._scale;
 
  
  this.sprite.drawWrappedCentredAt(ctx, this.cx, this.cy, 0);
  //this.sprite.scale = origScale;
};
