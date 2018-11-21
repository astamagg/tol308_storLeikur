function Background(image) {
    this.image = image; //the source photo

    //placeholder variables 
    this.cx = 0; 
    this.cy = 0;
    this.scrollSpeed = 1;
}

Background.prototype.draw = function(ctx) {
    // offset point to crop the image
    const sx = g_camera.xView;
    // console.log(g_camera);
    // dimensions of cropped image			
    let sWidth =  ctx.canvas.width;
    let sHeight = ctx.canvas.height;

    // if cropped image is smaller than canvas we need to change the source dimensions
    if(this.image.width - sx < sWidth) {
        sWidth = this.image.width - sx;
    }

    ctx.drawImage(this.image, sx, 0, sWidth, sHeight, 0, 0, sWidth, sHeight);
    // ctx.drawImage(this.image, this.cx, this.cy);
}

Background.prototype.update = function(du) {
    //calling the draw function again redrawing it at the new location


}