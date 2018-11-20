"use strict"

function StillPowerChanger(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    this.innerSetUp(); //initialize parameters
};

StillPowerChanger.prototype = new Entity();

StillPowerChanger.prototype.innerSetUp = function() {
     //find the power changer, that is what effect it has if the runner hits it
    var ID = Math.floor(util.randRange(8,11));
    this.powerChange = g_sprites.powerUpsDowns[ID].powerChange;
    this.sprite = this.sprite || g_sprites.powerUpsDowns[ID].sprite;
    this.id = this.getEntityID();   //get the id 

    this.height = this.sprite.height;
    this.width = this.sprite.width;

    this.cx = g_ctx.canvas.width + 50;
   
    //decide between the two because they are not the same size
    if(ID === 8) {
        this.cy = 315;
    } else if(ID === 9) {
        this.cy = 250;
    } else {
        this.cy = 345;
    }

    this.drawLogic();

};

StillPowerChanger.prototype.getHeight = function() {
    return this.height;
};

StillPowerChanger.prototype.getWidth = function() {
    return this.width;
};

StillPowerChanger.prototype.getPowerChange = function() {
    return this.powerChange;
};

//deciding when to start drawing the entity
StillPowerChanger.prototype.drawLogic = function() {
    this.frameCounter = 0;
    this.frameMax = util.randRange(0, 1500);
    this.drawTimeChanger = true;
};


StillPowerChanger.prototype.update = function(du) {
    if(!this.drawTimeChanger) {
        this.frameCounter++;
    }

    if(this.frameCounter > this.frameMax) {
        this.drawTimeChanger = false;
        this.frameMax = util.randRange(0, 250);
        this.frameCounter = 0;
    }

    if(this.cx < -30) {
        g_powerChangerCounter--;
        return entityManager.KILL_ME_NOW;
    }
};

StillPowerChanger.prototype.render = function(ctx) {
    if(this.drawTimeChanger) {
        ctx.drawImage(this.sprite.image, this.cx, this.cy);
    }
};