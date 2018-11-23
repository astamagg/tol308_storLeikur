//constructor for an arpitrary rectangle
function Rectangle(x, y, w, h) {
    this.left = x;
    this.top = y;

    this.width = w;
    this.height = h;
    this.right = (this.left + this.width);
    this.bottom = (this.top + this.height);

    //remeber rectangle position
    this.reset_left = this.left;
    this.reset_top = this.top;
    this.reset_width = this.width;
    this.reset_height = this.height;
    this.reset_right = this.right;
    this.reset_bottom = this.bottom;

}

Rectangle.prototype.reset = function() {
    this.left = this.reset_left;
    this.top = this.reset_top;
    this.width = this.reset_width;
    this.height = this.reset_height;
    this.right = this.reset_right;
    this.bottom = this.reset_botton;
}

//check whether a given object is inside the rectangle
Rectangle.prototype.isInside = function(r) {
    return (r.left <= this.left && 
            r.right >= this.right &&
            r.top <= this.top && 
            r.bottom >= this.bottom);
}

//setter for x value based on placement and width
Rectangle.prototype.setX = function(x) {
    this.left = x;
    this.right = (this.left + this.width);
}


// Camera constructor

function Camera(xView, roomHeight) {
    // position of camera (left-top coordinate)
    this.xView = xView || 0;
    
    // distance from followed object to border before camera starts move
    this.xDeadZone = g_canvas.width/2.0; // min distance to horizontal borders
    
    // viewport dimensions
    this.wView = g_canvas.width;
    this.hView = g_canvas.height;
    
    // remember Camera's position
    this.reset_wView = this.wView;
    this.reset_hView = this.hView;
    this.reset_xView = this.xView;
    this.reset_xDeadZone = this.xDeadZone;
    
    // rectangle that represents the viewport
    this.viewportRect = new Rectangle(this.xView, 0, this.wView, this.hView);				
                        
    // rectangle that represents the world's boundary (room's boundary)
    this.roomRect = new Rectangle(0, 0, Number.MAX_SAFE_INTEGER, roomHeight);
    
}

Camera.prototype.update = function() {

    const runner = entityManager._runner[0];

    // keep following the player
    if (runner.roomX - this.xView  + this.xDeadZone > this.wView) {
        this.xView = runner.roomX - (this.wView - this.xDeadZone);
    } else if (runner.roomX - this.xDeadZone < this.xView) {
        this.xView = runner.roomX  - this.xDeadZone;
    }
    
    // update viewportRect
    this.viewportRect.setX(this.xView);
    
    const cameraMovingUpToMiddle = this.viewportRect.left < this.roomRect.left;

    // don't move camera in the beginning
    if (cameraMovingUpToMiddle)
    {
        this.xView = this.roomRect.left;
    }
    
}	