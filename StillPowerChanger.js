"use strict"

function StillPowerChanger(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    this.innerSetUp(); //initialize parameters
};

StillPowerChanger.prototype = new Entity();

StillPowerChanger.prototype.innerSetUp = function() {
     //find the power changer, that is what effect it has if the runner hits it
    this.ID = Math.floor(util.randRange(8,11));

    this.powerChange = g_sprites.powerUpsDowns[this.ID].powerChange;
    this.sprite = this.sprite || g_sprites.powerUpsDowns[this.ID].sprite;
    this.powerType = g_sprites.powerUpsDowns[this.ID].powerType;

    //because the runner doesn't move when it reaches the middle the other things have to move
    this.velX = entityManager._runner[0].getSpeed() - 3;

    this.width = this.sprite.width;
    this.height = this.sprite.height;

    this.cx = g_ctx.canvas.width + 10;
    this.x = this.cx - this.width;

    // Remember reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
   
    //decide between the three static power ups because they need different placements
    if(this.ID === 8) {
        this.cy = 315;
    } else if(this.ID === 9) {
        this.cy = 295;
    } else {
        this.cy = 345;
        this.width = this.width/2;
    }

    this.drawLogic();

};

// Reset the still powerchangers
StillPowerChanger.prototype.reset = function() {
    this.cx = this.reset_cx;
    this.cy = this.reset_cy;
};

StillPowerChanger.prototype.getHeight = function() {
    return this.height;
};

StillPowerChanger.prototype.getWidth = function() {
    return this.width;
};

//get the power effect after collision
StillPowerChanger.prototype.getPowerChange = function() {
    return this.powerChange;
};

//get the type of the power after collision
StillPowerChanger.prototype.getPowerType = function() {
    return this.powerType;
};

//deciding when to start drawing the entity
StillPowerChanger.prototype.drawLogic = function() {
    this.frameCounter = 0;
    this.frameMax = util.randRange(0, 2000);
    this.drawTimeChanger = false;
};

StillPowerChanger.prototype.getColPos = function() {
    if(this.ID === 10) {
        var currX = this.getPos().posX + this.width/2;
        return {posX: currX, posY: this.cy};
    }
    return {posX: this.cx, posY: this.cy};
};


StillPowerChanger.prototype.update = function(du) {
    if(!this.drawTimeChanger) {
        this.frameCounter++;
    }
    //start drawing it at a certain space count
    if(this.frameCounter > this.frameMax && g_stillPowerChangerCounter < 1) {
        //add to the space to check collision
        spatialManager.register(this);
        this.drawTimeChanger = true;
        this.frameMax = util.randRange(0, 2000);
        this.frameCounter = 0;
        g_stillPowerChangerCounter++;
    }

    if(this.drawTimeChanger) {
        this.cx -= this.velX * du;
    }
    

    //if it as reached beyond the frame or was hit by the user it should disappear
    if(this.cx < -150) {
        spatialManager.unregister(this);
        g_stillPowerChangerCounter--;
        return entityManager.KILL_ME_NOW;
    }
};

StillPowerChanger.prototype.getPos = function() {
    return {posX : this.cx, posY : this.cy};
};

StillPowerChanger.prototype.render = function(ctx) {
    if(this.drawTimeChanger) {
        ctx.drawImage(this.sprite.image, this.cx, this.cy);
    }
    
};