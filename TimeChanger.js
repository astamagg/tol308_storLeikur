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
    //console.log('g_sprites', g_sprites.timeChanger[Math.round(Math.random())]);
    //bara draw öðru hvoru og bara annað þá
    //ctx.drawImage(g_sprites.timeChanger[Math.round(Math.random())].image, 10, 10, 150, 180);
}
