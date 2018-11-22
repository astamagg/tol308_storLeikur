
var countdown = {
_time: 60,  //time in seconds
_patCountdown: 50,
_timeString: "01:00",   //string to be rendered
updateCount: 0, //frame count

_reset_time: this._time,
_reset_patCountdown: this._patCountdown,
_reset_timeString: this._timeString,
reset_updateCount: this.updateCount,

reset:function() {
    this._time = this._reset_time;
    this._patCountdown = this._reset_patCountdown;
    this._timeString = this._reset_timeString;
    this.updateCount = this.reset_updateCount;
},

update:function() {
    this.updateCount++;
    //change the value every 60 updates
    if(this.updateCount === 60) {
        this._time = this._time - 1; //change the time value
        this._patCountdown = this._patCountdown - 1;
        this.updateCount = 1;   
        this.timeToMinutes();   //change to minutes
    }

    if (this._patCountdown === 0) {
        entityManager._pat[0].startWalkingIn();
    }
    this.checkGameState();   //check if the game is over
},

//rendering the clock
render:function(ctx) {
    ctx.font = "50px Courier";
    ctx.fillStyle = "black";
    var width = g_canvas.width/2;
    ctx.fillText(this._timeString, width, 100);
},

//changing seconds to string
timeToMinutes() {
    var minutes = Math.floor(this._time/60);  
    var seconds = this._time - minutes * 60;

    //checking whether second value goes below 10, then we need to add a 0 to the string for completeness
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