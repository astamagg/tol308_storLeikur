function Background(image) {
    this.image = image; //the source photo

    //placeholder variables 
    this.cx = 0; 
    this.cy = 0;
    this.scrollSpeed = 1;
}

Background.prototype.draw = function(ctx) {
    ctx.drawImage(this.image, this.cx, this.cy);
}

Background.prototype.update = function(du) {
    //calling the draw function again redrawing it at the new location


}