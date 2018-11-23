'use strict';


function Pat(descr) {
  // Common inherited setup logic from Entity
  this.setup(descr);
  this.sprite = this.sprite || g_sprites.powerUpsDowns[11].sprite;
  this.powerType = g_sprites.powerUpsDowns[11].powerType;

  this.height = this.sprite.height;
  this.width = this.sprite.width * 1.5;

  this.cx = g_canvas.width + this.getWidth() * 2;
  this.cy = 320;

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

Pat.prototype.getHeight = function() {

    return this.height;
};

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
    if (this.isWalkingIn) {
        this.cx -= this.speed * du;
        if (this.cx <= g_canvas.width - (this.sprite.width/2) - 50) {
            this.isWalkingIn = false;
            console.log("Pat is showing"+ g_patIsShowing);
            g_patIsShowing = true;
        }
    }
    console.log('g_pat: ', g_patIsShowing);
};

Pat.prototype.render = function () {
    this.sprite.drawCentredAt(ctx, this.cx, this.cy);
};
