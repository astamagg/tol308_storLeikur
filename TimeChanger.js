"use strict"

function TimeChanger(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    this.powerChange = g_sprites.powerUpsDowns[this.getEntityID()].powerChange; 
    this.sprite = this.sprite || g_sprites.powerUpsDowns[this.getEntityID()].sprite;
    this.frameCounter = 0;
    this.frameMax = util.randRange(0, 360);
    this.drawTimeChanger = false;
    this.velX = this.randomVelocity();

    this.cx = g_ctx.canvas.width + 10;
    this.cy = util.randRange(80, 250);
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
        this.frameMax = util.randRange(0, 250);
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
