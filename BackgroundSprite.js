function BackgroundSprite(i) {

    this.sprite = g_sprites.backgroundSprites[i];
    this.setOriginalPosition(i);
};

BackgroundSprite.prototype = new Entity();

BackgroundSprite.prototype.setOriginalPosition = function (i) {
    // Rock randomisation defaults (if nothing otherwise specified)
    if(i === 0) {
        this.cx = 150;
        this.cy = 200;
    }
    if(i === 1) {
        this.cx = 100;
        this.cy = 250;
    }
    if(i === 2) {
        this.cx = 300;
        this.cy = 250;
    }
};

BackgroundSprite.prototype.render = function(ctx) {
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy
    );
    console.log('fór í þetta render');
};