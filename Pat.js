'use strict';

// On the endstate of the game Pat will appear to recieve the homework
// from the girl. 

function Pat(descr) {
  // Common inherited setup logic from Entity
  this.setup(descr);
  // Default sprite, if not otherwise specified
  this.sprite = this.sprite || g_sprites.powerUpsDowns[11].sprite;
  // in this case pats powertype is just "pat"
  this.powerType = g_sprites.powerUpsDowns[11].powerType;

  this.height = this.sprite.height;
  this.width = this.sprite.width * 1.5;

  // Pats position before he stars walking in
  this.cx = g_canvas.width + this.getWidth() * 2;
  this.cy = 320;

  // first, Pat is not walking in 
  this.isWalkingIn = false;

  // remember Pat's position
  this.reset_cx = this.cx;
  this.reset_cy = this.cy;

  //since the runner needs to stop when Pat appears we need
  //to be aware of his placement
  spatialManager.register(this);
}

Pat.prototype = new Entity();

// reset Pat's position
Pat.prototype.reset = function() {
    this.cx = this.reset_cx;
    this.cy = this.reset_cy;
   // console.log('PATTY BOY!', this.cx, this.cy);
    g_patIsShowing = false;
    spatialManager.register(this);
};

Pat.prototype.speed = 1;

Pat.prototype.getWidth = function() {
    return this.width;
};

Pat.prototype.getHeight = function() {9
    return this.height;
};

// Tells when Pat is supposed to walk in
Pat.prototype.startWalkingIn = function () {
    this.isWalkingIn = true;
    this.cx = g_canvas.width + this.getWidth()/2;
};

Pat.prototype.getPowerType = function() {
    return this.powerType;
};

Pat.prototype.getPos = function() {
    return { posX : this.cx - this.getWidth(), posY : this.cy-this.getHeight()/2.0 };
};

Pat.prototype.update = function (du) {
    // check if Pat is supposed to walk in
    if (this.isWalkingIn) {
        // walks towards the runner/girl 
        this.cx -= this.speed * du;
        // when Pat has walked in, g_patIsShowing is true
        if (this.cx <= g_canvas.width - (this.sprite.width/2) - 50) {
            this.isWalkingIn = false;
            g_patIsShowing = true;
        }
    }
};

Pat.prototype.render = function () {
    this.sprite.drawCentredAt(ctx, this.cx, this.cy);
};
