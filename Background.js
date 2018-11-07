function Background(image) {
    this.image = image; //the source photo

    //placeholder variables 
    this.cx = 0; 
    this.cy = 0;
}

Background.prototype.render = function(ctx) {
    ctx.drawImage(this.image, this.cx, this.cy);
}

Background.prototype.update = function(du) {
    //Add a connection to the velocity in the game and move the background by an
    //appropriate amount of pixels
}