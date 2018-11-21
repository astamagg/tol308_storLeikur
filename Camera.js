
function Rectangle(x, y, w, h) {
    this.left = x;
    this.top = y;

    this.width = w;
    this.height = h;
    this.right = (this.left + this.width);
    this.bottom = (this.top + this.height);
}

Rectangle.prototype.isInside = function(r) {
    return (r.left <= this.left && 
            r.right >= this.right &&
            r.top <= this.top && 
            r.bottom >= this.bottom);
}

Rectangle.prototype.setX = function(x) {
    this.left = x;
    this.right = (this.left + this.width);
}


// Camera constructor

function Camera(xView, roomWidth, roomHeight)
{
    // position of camera (left-top coordinate)
    this.xView = xView || 0;
    
    // distance from followed object to border before camera starts move
    this.xDeadZone = g_canvas.width/2.0; // min distance to horizontal borders
    
    // viewport dimensions
    this.wView = g_canvas.width;
    this.hView = g_canvas.height;		
    
    // rectangle that represents the viewport
    this.viewportRect = new Rectangle(this.xView, 0, this.wView, this.hView);				
                        
    // rectangle that represents the world's boundary (room's boundary)
    this.roomRect = new Rectangle(0, 0, roomWidth, roomHeight);
    
}

Camera.prototype.update = function()
{
    const runner = entityManager._runner[0];
    console.log(runner);
    // keep following the player
    if (runner.roomX - this.xView  + this.xDeadZone > this.wView) {
        this.xView = runner.roomX - (this.wView - this.xDeadZone);
    } else if (runner.roomX - this.xDeadZone < this.xView) {
        this.xView = runner.roomX  - this.xDeadZone;
    }
    
    // update viewportRect
    this.viewportRect.setX(this.xView);
    
    // don't let camera leaves the room's boundary
    if(!this.viewportRect.isInside(this.roomRect))
    {
        if(this.viewportRect.left < this.roomRect.left) {
            this.xView = this.roomRect.left;
        }

        if(this.viewportRect.right > this.roomRect.right) {
            this.xView = this.roomRect.right - this.wView;
        }
    }
    
}	