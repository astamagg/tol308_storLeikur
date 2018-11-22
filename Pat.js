'use strict';


function Pat(descr) {
  // Common inherited setup logic from Entity
  this.setup(descr);
  this.sprite = g_sprites.pat;
  this.cx = g_canvas.width + this.getWidth()/2;
  this.cy = 320;
  //since the runner needs to stop when Pat appears we need
  //to be aware of his placement
  spatialManager.register(this);
}

Pat.prototype = new Entity();
Pat.prototype.speed = 1;

Pat.prototype.getWidth = function() {
    return this.sprite.width;
};

Pat.prototype.startWalkingIn = function () {
    this.isWalkingIn = true;
    this.cx = g_canvas.width + this.getWidth()/2;
};

Pat.prototype.getWidth = function() {
    return this.sprite.width;
};
  
Pat.prototype.getHeight = function() {
    return this.sprite.height;
};

Pat.prototype.getPos = function() {
    return {posX : this.cx - this.sprite.width/2.0, posY : this.cy-this.sprite.height/2.0};
};

Pat.prototype.update = function (du) {
    if (this.isWalkingIn) {
        this.cx -= this.speed * du;
        if (this.cx <= g_canvas.width - (this.getWidth()/2) - 50) {
            this.isWalkingIn = false;
            g_patIsShowing = true;
        }
    }

    

};

Pat.prototype.render = function () {
    this.sprite.drawCentredAt(ctx, this.cx, this.cy);
};
