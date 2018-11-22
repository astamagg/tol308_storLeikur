
var countdown = {
_time: 60,  //time in seconds
_patCountdown: 60,
_timeString: "01:00",   //string to be rendered
updateCount: 0, //frame count
powerTime: 0,
powerCatch: false,
powerChangeString: "",

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

    if(this.powerCatch) {
        this.powerTime++;
        if(this.powerTime > 25) {
            this.powerCatch = false;
        }
    }
},

//rendering the clock
render:function(ctx) {
    ctx.font = "50px Courier";
    ctx.fillStyle = "black";
    var width = g_canvas.width/2;
    ctx.fillText(this._timeString, width, 100);

    if(this.powerCatch) {
        g_ctx.font = "20px Courier";
        g_ctx.fillStyle = "red";
        g_ctx.fillText(this.powerChangeString, g_canvas.width/2 + 80, 50);
    }
},

changeTime: function(entity) {
    this.timeChanged = entity.powerChange;
    var powerChange = entity.powerType;

    if(powerChange === "timeChangerUp") {
        this._time = this._time + this.timeChanged;
        this.powerChangeString = "+" + this.timeChanged;
    } else {
        this._time = this._time - this.timeChanged;
        this.powerChangeString = "-" + this.timeChanged;
    }
    this.powerCatch = true;
},

//changing seconds to string
timeToMinutes() {
    var minutes = Math.floor(this._time/60);  
    var seconds = this._time - minutes * 60;

    //checking whether second value goes below 10, then we need to add a 0 to the string for completeness
    if(seconds < 10) {
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