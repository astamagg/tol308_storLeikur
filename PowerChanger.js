"use strict"

function PowerChanger(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    this.powerChange = g_sprites.powerUpsDowns[this.getEntityID()].powerChange; 
    this.sprite = this.sprite || g_sprites.powerUpsDowns[this.getEntityID()].sprite;
    this.frameCounter = 0;
    this.frameMax = util.randRange(0, 1500);
    this.drawTimeChanger = false;
    this.velX = this.randomVelocity();

    this.cx = g_ctx.canvas.width + 10;
    this.cy = util.randRange(120, 250);
};

PowerChanger.prototype = new Entity();


PowerChanger.prototype.randomVelocity = function() {
    var MIN_SPEED = 20,
    MAX_SPEED = 70;

    var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
    return speed;
};

PowerChanger.prototype.update = function(du) {
    if(!this.drawTimeChanger) {
        this.frameCounter++;
    }

    if(this.frameCounter > this.frameMax) {
        this.drawTimeChanger = true;
        this.frameMax = util.randRange(0, 250);
        this.frameCounter = 0;
    }
    if(this.drawTimeChanger) {
        this.cx -= this.velX * du;
    }

    
}

PowerChanger.prototype.render = function(ctx) {
    if(this.drawTimeChanger) {

        ctx.drawImage(this.sprite.image, this.cx, this.cy);
    }
}
