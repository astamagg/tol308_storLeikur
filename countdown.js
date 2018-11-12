
var countdown = {
_time: 60,  //time in seconds
_timeString: "01:00",   //string to be rendered
updateCount: 1, //frame count

//updating the function every 60 updates
update:function(du) {
    this.updateCount++;
    if(this.updateCount === 60) {
        this._time = this._time - 1;
        this.updateCount = 1;
        this.timeToMinutes();
    }
    this.checkGameState();
},

//rendering the clock
render:function(ctx) {
    ctx.font = "30px Courier";
    var width = (g_canvas.width-ctx.measureText(this._timeString).width)/2;
    ctx.fillText(this._timeString, width, 50);
},

//changing seconds to string
timeToMinutes() {
    var minutes = Math.floor(this._time/60);
    var seconds = this._time - minutes * 60;

    if(seconds < 10 && minutes < 1) {
        this._timeString =  "0" + minutes + ":0" + seconds;
    } else {
        this._timeString = "0" + minutes + ":" + seconds;
    }
},

//This has to be fixed to update if the player catches power ups or power downs and redirecting to end page
checkGameState: function() {
    if(this._time < 0) {
        this._timeString = "You lost";
    }
},

}