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

  this.blinking = false;
  this.blinkingCount = 20;
  //since the runner is the one colliding with the other things we always need
  //to be aware of their placement
  spatialManager.register(this);
}

Runner.prototype = new Entity();

Runner.prototype.rememberResets = function() {
  // Remember my reset positions
  this.reset_cx = this.cx;
  this.reset_cy = this.cy;
  this.reset_roomX = this.roomX;
  this.reset_speed = this.speed;
};

Runner.prototype.reset = function() {
  this.cx = this.reset_cx;
  this.cy = this.reset_cy;
  this.roomX = this.reset_roomX;
  this.speed = this.reset_speed;
  this.isPowered = false;
  this.currentLoop = 2;
  this.isCrouching = false;
  this.isJumping = false;

  this.setPos(this.reset_cx, this.reset_cy);
  this.halt();
};

Runner.prototype.KEY_JUMP = ' '.charCodeAt(0);
Runner.prototype.KEY_CROUCH = 'S'.charCodeAt(0);

// Initial, inheritable, default values
Runner.prototype.cx = 50;
Runner.prototype.cy = 270;
Runner.prototype.roomX = 50;
Runner.prototype.y_velocity = 0;
Runner.prototype.numSubSteps = 1; //what is this
Runner.prototype.width = 64;
Runner.prototype.height = 80;
Runner.prototype.totalDistance = 0;
Runner.prototype.isPowered = false;
//animations from spritesheet frames
Runner.prototype.loops = [[0], [0], [0, 1, 2, 3, 4]]; //crouch, jump, walk
Runner.prototype.poweredLoops = [
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [],
  [0, 1, 2, 3, 4],
]; ///powered- crouch, jump, walk

//animation update speed and interval (running speed)
Runner.prototype.speed = 10;
Runner.prototype.updateInterval = 30;

//position in loops for drawing
Runner.prototype.currentLoop = 2; //start in walk loop
Runner.prototype.currentLoopIndex = 0;

//bools for jumping & crouching
Runner.prototype.isJumping = false;
Runner.prototype.isCrouching = false;

//speeds
Runner.prototype.normalSpeed = 25;
Runner.prototype.animationSpeed = 25; //normal = 20-25?
Runner.prototype.jumpingSpeed = -10;
Runner.prototype.gravity = 1;
var jumpCounter = 0; // how long the jump button can be pressed down
var ground = 270;
var NOMINAL_GRAVITY = 1;
var JUMP_ACCELERATION = NOMINAL_GRAVITY * 15; // the bigger this number the higher the jump

Runner.prototype.handleKeys = function() {
  if (keys[this.KEY_CROUCH]) {
    this.isCrouching = true;
  } else {
    this.isCrouching = false;
  }
  if (keys[this.KEY_JUMP] && this.isJumping == false) {
    this.y_velocity -= JUMP_ACCELERATION;
    this.isJumping = true;
    g_jumpSound.play();

    //TODO bæta við lengra jump-i ef við höldum inni
    //með því að nota jumpCounter
  }
};

//react to candy powerUp
//hair color changes, runner and song speeds up for 5 sek
Runner.prototype.powerUp = function(change) {
  this.isPowered = true;
  this.animationSpeed = 50;

  if (g_music.paused === false) {
    g_music.playbackRate = 1.25;  
  }
  
  var that = this;
  //power down after 5 sek
  //runner and song slows down, hair back to normal
  //change sprite loop
  setTimeout(function() {
    that.isPowered = false;
    that.currentLoop = 2;
    that.currentLoopIndex = 0;
    that.animationSpeed = 10;

    if (g_music.paused === false) {
      g_music.playbackRate = 0.8;
    }

    //set to normal values after 5 sek
    setTimeout(function() {
      that.animationSpeed = that.normalSpeed;
      if (g_music.paused === false) {
        g_music.playbackRate = 1;
      }
    }, 5000);
  }, 5000);
};

Runner.prototype.speedChange = function(change) {
  console.log('number', change);
  this.animationSpeed *= change;
  console.log('speed', this.animationSpeed);

  var that = this;
  setTimeout(function() {
    that.animationSpeed = that.normalSpeed;
    console.log('after timeout', that.animationSpeed);
  }, 5000);
};

Runner.prototype.update = function(du) {
  this.handleKeys();
  this.updateInterval -= du;
  this.cy += this.y_velocity;

  if (this.isCrouching) this.height = 60;
  else this.height = 80;

  if (this.isJumping) {
    this.y_velocity += this.gravity;
    //this.cy += this.y_velocity;
  }

  //collision check
  if (this.cy > 270) {
    this.isJumping = false;
    this.cy = 270;
    this.y_velocity = 0;
  }

  //How often do we want to change the fram
  var updateTresh = this.animationSpeed;

  if (this.updateInterval < updateTresh) {
    this.computeSubStep(this.updateInterval);
    //hvað er hvert skref mikil x færsla?
    //placeholder if settning til þess að stelpan birtist aftur
    this.roomX += this.speed;
    console.log("RoomX: "+ this.roomX + "Reset: "+this.reset_roomX);
    this.cx = this.roomX - this.width / 2 - g_camera.xView;
    this.updateInterval = 30;
  }

  this.cy = this.getPos().posY;
  //bæta við this.totalDistance += du... til þess að updatea bakgrunn eftir X distance
  if (this.isPowered) {
  } else {
    var entityHit = this.isColliding();
  }
  //the runner hit another entity
  if (entityHit) {
    //react accordingly to it's affect
    entityManager.reactToPowerChanger(entityHit);
    //kill the entity
    entityHit.kill();
    //unregister it from the spatial manager
    spatialManager.unregister(entityHit);
  }
};

//Færa spritesheet ramma um eitt skref
Runner.prototype.computeSubStep = function(du) {
  this.cy += this.y_velocity;

  if (this.isPowered) {
    if (this.isCrouching) {
      this.currentLoop = 0;
      this.currentLoopIndex++;
    }
    if (this.isJumping) {
      this.currentLoop = 1;
      this.currentLoopIndex++;
    }
    //if not crouching or jumping set to walk animation
    if (!this.isCrouching && !this.isJumping) {
      this.currentLoop = 3;
      this.currentLoopIndex++;
    }
    if (this.currentLoopIndex >= this.poweredLoops[this.currentLoop].length) {
      this.currentLoopIndex = 0;
    }
  } else {
    if (this.isCrouching) {
      this.currentLoop = 0;
      this.height = 60;
    } else {
      this.height = 80;
    }
    if (this.isJumping) {
      this.currentLoop = 1;
    }
    //if not crouching or jumping set to walk animation
    if (!this.isCrouching && !this.isJumping) {
      this.currentLoop = 2;
      this.currentLoopIndex++;
    }

    //loop in a circle to animate and move the runner a distance x
    if (this.currentLoopIndex >= this.loops[this.currentLoop].length) {
      this.currentLoopIndex = 0;
    }
  }
};

Runner.prototype.getWidth = function() {
  return this.width;
};

Runner.prototype.getHeight = function() {
  return this.height;
};

Runner.prototype.getSpeed = function() {
  return this.speed;
};

/*Runner.prototype.reset = function() {
  this.setPos(this.reset_cx, this.reset_cy);
  this.roomX = this.reset_cx;
  this.halt();
};*/

Runner.prototype.halt = function() {
  this.velX = 0;
  this.velY = 0;
};

Runner.prototype.getPos = function() {
  return { posX: this.cx, posY: this.cy };
};

Runner.prototype.getColPos = function() {
  var currY = this.getPos().posY + this.isCrouching * 20;
  return { posX: this.cx, posY: currY };
};

//if the runner is suppose to blink, change the opacity for a certain amount of time
Runner.prototype.blinkingRender = function(ctx) {
  ctx.save();
  ctx.globalAlpha = 0.3;
  this.sprite.drawFrame(
    ctx,
    this.loops[this.currentLoop][this.currentLoopIndex],
    this.currentLoop,
    this.cx,
    this.cy
  );
  ctx.restore();
  this.blinkingCount--;

  //if the blinking count is zero she should stop being transparent
  if (this.blinkingCount < 0) {
    this.blinking = false;
    this.blinkingCount = 20;
  }
};

//draw a frame from the spritesheet
Runner.prototype.render = function(ctx) {
  this.sprite.image.style.opacity = 0.2;

  //change color of hair when the power up appears
  if (this.isPowered) {
    this.sprite.drawFrame(
      ctx,
      this.poweredLoops[this.currentLoop][this.currentLoopIndex],
      this.currentLoop,
      this.cx,
      this.cy
    );
  } else if (!this.isPowered) {
    //check whether she hit a chair or a desk, then she slows down and blinks
    if (this.blinking) {
      this.blinkingRender(ctx);
    } else {
      this.sprite.drawFrame(
        ctx,
        this.loops[this.currentLoop][this.currentLoopIndex],
        this.currentLoop,
        this.cx,
        this.cy
      );
    }
  }
};
