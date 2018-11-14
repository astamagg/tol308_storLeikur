"use strict"

function TimeChanger(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    
    //this.image = g_sprites.timeChanger[i].image;
    if(this._spatialID === 2) {
        this.sprite = this.sprite || g_sprites.timeChanger[0];
    } else {
        this.sprite = this.sprite || g_sprites.timeChanger[1];
    }
    this.frameCounter = 0;
    this.frameMax = util.randRange(0, 100);
    this.drawTimeChanger = false;
    this.velX = this.randomVelocity();

    this.cx = g_ctx.canvas.width + 10;
    this.cy = util.randRange(10, 300);
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
    //console.log('g_sprites', g_sprites.timeChanger[Math.round(Math.random())]);
    //bara draw öðru hvoru og bara annað þá
    //ctx.drawImage(g_sprites.timeChanger[Math.round(Math.random())].image, 10, 10, 150, 180);
}
