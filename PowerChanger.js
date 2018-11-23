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
    this.powerChange = g_sprites.powerUpsDowns[ID].powerChange; 
    this.powerType = g_sprites.powerUpsDowns[ID].powerType;
    //sprite, height, width and the initial placement and velocity of the entity
    this.speedAndPlacement();
    //get the entity ID

    // remember reset position
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;

    this.drawLogic();  //when to start drawing the entity

    this.y = this.cy - this.height;
};

// reset the powerchangers
PowerChanger.prototype.reset = function() {
    this.cx = this.reset_cx;
    this.cy = this.reset_cy;
};

//return the height of the entity
PowerChanger.prototype.getHeight = function() {
    return this.height;
};

//return the effect of the entity
PowerChanger.prototype.getWidth = function() {
    return this.width;
};

//get the power effect after collision
PowerChanger.prototype.getPowerChanger = function() {
    return this.powerChange;
};

//get the type of the power after collision
PowerChanger.prototype.getPowerType = function() {
    return this.powerType;
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
    this.frameMax = Math.floor(util.randRange(0, 4500));
    this.drawTimeChanger = false;
};

//generate a random velocity for the entity 
PowerChanger.prototype.randomVelocity = function() {
    var MIN_SPEED = entityManager._runner[0].getSpeed() + 300;
    var MAX_SPEED = entityManager._runner[0].getSpeed() + 400;

    var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
    return speed;
};

PowerChanger.prototype.update = function(du) {
    if(!g_patIsShowing) {
        if(!this.drawTimeChanger) {
            this.frameCounter++;
        }
    } else {
        this.frameCounter = 0;
    }
    //draw a new power changer if frame count is reached and the number of
    // power changers already in the frame is less than four
    if(this.frameCounter > this.frameMax && g_powerChangerCounter < 2) {
        //once they are drawn the spatial manager need to know about them for collision
        spatialManager.register(this);  
        this.drawTimeChanger = true;
        g_powerChangerCounter++;
        //reseting the frame max and the fram counter
        this.frameMax = util.randRange(0, 4500);
        this.frameCounter = 0;
    }
        
    if(this.drawTimeChanger) {
        this.cx -= this.velX * du;
    }
    
    //if the powerChanger has gone beyond the frame or has hit the runner we remove it
    if(this.cx < -30 || this._isDeadNow) {
        spatialManager.unregister(this);
        g_powerChangerCounter--;
        return entityManager.KILL_ME_NOW;
    }

};

PowerChanger.prototype.getPos = function() {
    return {posX : this.cx, posY : this.cy};
};

PowerChanger.prototype.render = function(ctx) {
    if(this.drawTimeChanger) {
        ctx.drawImage(this.sprite.image, this.cx, this.cy);
    }
};