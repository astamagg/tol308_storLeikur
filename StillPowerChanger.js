"use strict"

function StillPowerChanger(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    this.innerSetUp(); //initialize parameters
};

StillPowerChanger.prototype = new Entity();

StillPowerChanger.prototype.innerSetUp = function() {
     //find the power changer, that is what effect it has if the runner hits it
    this.powerChange = g_sprites.powerUpsDowns[this.getEntityID()].powerChange;
    this.id = this.getEntityID();   //get the id 
    this.spriteLogicAndPlacement(); //get the sprite, it's height and placement

    this.drawLogic();   //decide when to start drawing it
};

StillPowerChanger.prototype.getHeight = function() {
    return this.height;
};

StillPowerChanger.prototype.getWidth = function() {
    return this.width;
};

//placement on the frame and the sprite source for the entity
StillPowerChanger.prototype.spriteLogicAndPlacement = function() {
    this.sprite = this.sprite || g_sprites.powerUpsDowns[this.getEntityID()].sprite;
    this.height = g_sprites.powerUpsDowns[this.getEntityID()].height;
    this.width = g_sprites.powerUpsDowns[this.getEntityID()].width;

    this.cx = g_ctx.canvas.width + 50;

    //decide between the two because they are not the same size
    if(this.id === 8) {
        this.cy = 315;
    } else {
        this.cy = 250;
    }
};

//deciding when to start drawing the entity
StillPowerChanger.prototype.drawLogic = function() {
    this.frameCounter = 0;
    this.frameMax = util.randRange(0, 1500);
    this.drawTimeChanger = true;
}


StillPowerChanger.prototype.update = function(du) {
    if(!this.drawTimeChanger) {
        this.frameCounter++;
    }

    if(this.frameCounter > this.frameMax) {
        this.drawTimeChanger = true;
        this.frameMax = util.randRange(0, 250);
        this.frameCounter = 0;
    }

    if(this.cx < -30) {
        g_powerChangerCounter--;
        return entityManager.KILL_ME_NOW;
    }
}

StillPowerChanger.prototype.render = function(ctx) {
    if(this.drawTimeChanger) {
        ctx.drawImage(this.sprite.image, this.cx, this.cy);
    }
}