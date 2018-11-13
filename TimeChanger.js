"use strict"

function TimeChanger(descr, i) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    if(i === 0) {
        this.timeChange = 5;
    } else {
        this.timeChange = -5;
    }
};

TimeChanger.prototype = new Entity();

TimeChanger.prototype.update = function(du) {
    
}

TimeChanger.prototype.render = function(ctx) {
    ctx.drawImage(g_sprites.timeChange[Math.round(Math.random())]);
}
