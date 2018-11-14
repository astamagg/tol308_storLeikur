"use strict"

function TimeChanger(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    
    if(this._spatialID === 2) {
        this.sprite = this.sprite || g_sprites.timeChanger[0];
        this.timeChange = 5;
    } else {
        this.sprite = this.sprite || g_sprites.timeChanger[1];
        this.timeChange = -5;
    }
    this.frameCounter = 0;
    this.frameMax = util.randRange(0, 100);
    this.drawTimeChanger = false;
    this.velX = this.randomVelocity();

    this.cx = g_ctx.canvas.width + 10;
    this.cy = util.randRange(80, 250);
    console.log('cy', this.cy);
};

TimeChanger.prototype = new Entity();

TimeChanger.prototype.randomVelocity = function() {
    var MIN_SPEED = 20,
    MAX_SPEED = 70;

    var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
    return speed;
};

TimeChanger.prototype.update = function(du) {
    this.frameCounter++;

    if(this.frameCounter > this.frameMax) {
        this.drawTimeChanger = true;
        this.frameMax = util.randRange(0, 100);
        this.frameCounter = 0;
    }
    if(this.drawTimeChanger) {
        this.cx -= this.velX * du;
    }

    
}

TimeChanger.prototype.render = function(ctx) {
    if(this.drawTimeChanger) {

        ctx.drawImage(this.sprite.image, this.cx, this.cy);
    }
}
