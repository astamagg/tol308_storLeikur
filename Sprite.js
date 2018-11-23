//This class is based on instruction classes by Patrick Kerr

// ============
// SPRITE STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// Construct a "sprite" from the given `image`,
//
function Sprite(image) {
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.scale = 1;

    this.y = this.cy - this.height;
}

Sprite.prototype.drawAt = function (ctx, x, y) {
    ctx.drawImage(this.image, 
                  x, y);
};

//Draw runner based on the current frame in the animation 
//Manually inserting height value as 80 so that crouching won't change it
Sprite.prototype.drawFrame = function(ctx, frameX, frameY, canvasX, canvasY, height, width) {
    ctx.drawImage(this.image,
                  frameX * width, frameY * 80, width, 80, 
                  canvasX, canvasY, width, 80);
  }

  Sprite.prototype.drawEnd = function(ctx,  canvasX, canvasY, height, width) {
      console.log("draw stuff");
      for(var i = 0; i<10; i++ ){
        ctx.drawImage(g_images.endSprite,
                    i * width, 0, width, height, 
                    canvasX, canvasY, width, height);
      }
  }

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation) {
    if (rotation === undefined) rotation = 0;
    
    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);
    
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    ctx.drawImage(this.image, 
                  -w/2, -h/2);
    
    ctx.restore();
};  

Sprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation) {
    
    // Get "screen width"
    var sw = g_canvas.width;
    
    // Draw primary instance
    this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);
    
    // Left and Right wraps
    this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation);
    this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation);
};
/*
Sprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, rotation) {

    // Get "screen height"
    var sh = g_canvas.height;
    
    // Draw primary instance
    this.drawCentredAt(ctx, cx, cy, rotation);
    
    // Top and Bottom wraps
    this.drawCentredAt(ctx, cx, cy - sh, rotation);
    this.drawCentredAt(ctx, cx, cy + sh, rotation);
};*/
