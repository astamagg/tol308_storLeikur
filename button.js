'use strict';

// A generic constructor which accepts an arbitrary descriptor object
function Button(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

/*Button.update() = function () {

};*/

Button.prototype.contains = function (x, y) {
    var topY = this.y + this.height;
    var bottomY = this.y;
    var leftX = this.x;
    var rightX = this.x + this.width;

    if ((y >= bottomY && y <= topY) && (x >= leftX && x <= rightX)) {
        return true;
    }
    return false;

};

Button.prototype.render = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    g_ctx.font = '15px Courier';
    g_ctx.fillStyle = 'white';
    g_ctx.textAlign = 'center';

    g_ctx.fillText(this.text, this.x + this.width/2, this.y + (this.height/2 + 5));
};