"use strict"

function PowerChanger(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    this.innerSetUp(); //initialize parameters
};

PowerChanger.prototype = new Entity();

PowerChanger.prototype.innerSetUp = function() {
    //find the power changer, that is what effect it has if the runner hits it
    var ID = Math.floor(util.randRange(0,8));
    this.sprite = this.sprite || g_sprites.powerUpsDowns[ID].sprite;
    console.log(this.sprite);
    this.powerChange = g_sprites.powerUpsDowns[ID].powerChange; 
    //sprite, height, width and the initial placement and velocity of the entity
    this.id = this.getEntityID();
    this.speedAndPlacement();
    //get the entity ID

    this.drawLogic();  //when to start drawing the entity
};

PowerChanger.prototype.getHeight = function() {
    return this.height;
};

PowerChanger.prototype.getWidth = function() {
    return this.width;
};

//tells us which sprite it is
PowerChanger.prototype.speedAndPlacement = function() {
    
    this.height = this.sprite.height;
    this.width = this.sprite.width;

    this.velX = this.randomVelocity();  //choosing a random velocity

    //original placement
    this.cx = g_ctx.canvas.width + 10;
    this.cy = util.randRange(220, 325);
};

//when to start drawing the entity
PowerChanger.prototype.drawLogic = function() {
    this.frameCounter = 0;
    this.frameMax = Math.floor(util.randRange(0, 3000));
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

    if(this.frameCounter > this.frameMax && g_powerChangerCounter < 4) {
        this.drawTimeChanger = true;
        g_powerChangerCounter++;
        this.frameMax = util.randRange(0, 1500);
        this.frameCounter = 0;
    }

    if(this.drawTimeChanger) {
        this.cx -= this.velX * du;
    }

    if(this.cx < -30) {
        g_powerChangerCounter--;
        return entityManager.KILL_ME_NOW;
    }
}

PowerChanger.prototype.render = function(ctx) {
    if(this.drawTimeChanger) {
        ctx.drawImage(this.sprite.image, this.cx, this.cy);
    }
}