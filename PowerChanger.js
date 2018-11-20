"use strict"

function PowerChanger(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    this.innerSetUp(); //initialize parameters
};

PowerChanger.prototype = new Entity();

PowerChanger.prototype.innerSetUp = function() {
    //find the power changer, that is what effect it has if the runner hits it
    this.powerChange = g_sprites.powerUpsDowns[this.getEntityID()].powerChange; 
    //sprite, height, width and the initial placement and velocity of the entity
    this.spriteLogicAndPlacement();
    //get the entity ID
    this.id = this.getEntityID;

    this.drawLogic();  //when to start drawing the entity
};

PowerChanger.prototype.getHeight = function() {
    return this.height;
};

PowerChanger.prototype.getWidth = function() {
    return this.width;
};

//tells us which sprite it is
PowerChanger.prototype.spriteLogicAndPlacement = function() {
    this.sprite = this.sprite || g_sprites.powerUpsDowns[this.getEntityID()].sprite;
    this.height = g_sprites.powerUpsDowns[this.getEntityID()].height;
    this.width = g_sprites.powerUpsDowns[this.getEntityID()];

    this.velX = this.randomVelocity();  //choosing a random velocity

    //original placement
    this.cx = g_ctx.canvas.width + 10;
    this.cy = util.randRange(200, 325);
};

//when to start drawing the entity
PowerChanger.prototype.drawLogic = function() {
    this.frameCounter = 0;
    this.frameMax = util.randRange(0, 2500);
    this.drawTimeChanger = false;
};

//generate a random velocity for the entity 
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

    if(this.frameCounter > this.frameMax && g_powerChangerCounter < 3) {
        this.drawTimeChanger = true;
        g_powerChangerCounter++;
        this.frameMax = util.randRange(0, 2000);
        this.frameCounter = 0;
    }
    if(this.drawTimeChanger) {
        this.cx -= this.velX * du;
    } 
    if(this.cx < 0) {
        g_powerChangerCounter--;
        return entityManager.KILL_ME_NOW;
    }
}

PowerChanger.prototype.render = function(ctx) {
    if(this.drawTimeChanger) {
        ctx.drawImage(this.sprite.image, this.cx, this.cy);
    }
}