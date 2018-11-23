'use strict';

// A generic constructor which accepts an arbitrary descriptor object
function Button(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

//creating a button base on the height, width and placement of an object
Button.prototype.contains = function (x, y) {
    var topY = this.y + this.height; // top of the button
    var bottomY = this.y; // bottom of the button
    var leftX = this.x;  // left side of the button
    var rightX = this.x + this.width; // right side of the button

    // return true if contains, else return false 
    if ((y >= bottomY && y <= topY) && (x >= leftX && x <= rightX)) {
        return true;
    }
    return false;

};

Button.prototype.render = function (ctx) {
    ctx.fillStyle = this.color; //color for the button
    ctx.fillRect(this.x, this.y, this.width, this.height);  //the button

    g_ctx.font = '15px Courier';    //text style in button 
    g_ctx.fillStyle = 'white';      //text color
    g_ctx.textAlign = 'center';     //text placement

    g_ctx.fillText(this.text, this.x + this.width/2, this.y + (this.height/2 + 5)); // the text in the button
};