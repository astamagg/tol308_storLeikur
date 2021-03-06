function Background(image) {
    this.image = image; //the source photo

    //placeholder variables 
    this.cx = 0; 
    this.cy = 0;
}

Background.prototype.draw = function(ctx) {
    // Draw the camera's view wrapped to this.image.width...

    // Find where the camera is on the background image
    const cameraLocationInImage = g_camera.xView % this.image.width;

    // Logic for looping the background

    const firstImageWidth = this.image.width - cameraLocationInImage;
    const restWidth = g_canvas.width - firstImageWidth;

    ctx.drawImage(this.image, cameraLocationInImage, 0, firstImageWidth, g_canvas.height, 0, 0, firstImageWidth, g_canvas.height);
    ctx.drawImage(this.image, 0, 0, restWidth, g_canvas.height, firstImageWidth, 0, restWidth, g_canvas.height);
}

Background.prototype.update = function(du) {
    //calling the draw function again redrawing it at the new location
}
