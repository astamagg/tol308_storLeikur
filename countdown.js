
var countdown = {
_time: 60,  //time in seconds
_patCountdown: 10,
_timeString: "01:00",   //string to be rendered
_patCount: 1,
updateCount: 1, //frame count
powerTime: 0,
powerCatch: false,
powerChangeString: "",
_patCountThreshold: 10,
_updateThreshold: 60,
PAT_TIME_CONSTANT: 10,

reset:function() {
    this._time = 60;  //time in seconds
    this._patCountdown = 50;
    this._timeString = "01:00";   //string to be rendered
    this._patCount = 1;
    this.updateCount = 1; //frame count
    this.powerTime = 0;
    this.powerCatch = false;
    this.powerChangeString = "";
    this._patCountThreshold = 50;
    this._updateThreshold = 60;
    this.PAT_TIME_CONSTANT = 50;
},

update:function() {
    this.updateCount++;
    this._patCount++;

    //change the value every 60 updates
    if(this.updateCount === this._updateThreshold) {
        this._time = this._time - 1; //change the time value
        this.updateCount = 1;   
        this.timeToMinutes();   //change to minutes
    }

    //check whether to decrease the time of the inner logic of the game
    if(this._patCount > this._patCountThreshold) {
        this._patCountdown = this._patCountdown - 1;
        this._patCount = 1;
    }

    //have pat walk in at the end
    if (this._patCountdown === 0) {
        console.log('fór inn í pat countdown');
        entityManager._pat[0].startWalkingIn();
    }
    this.checkGameState();   //check if the game is over
    
    //count how long the power effect should appear for
    if(this.powerCatch) {
        this.powerTime++;
        if(this.powerTime > 25) {
            this.powerCatch = false;
            this.powerTime = 0;
        }
    }

    if(this._time < 0 && this._patCountdown > 0) {
        setGameState('gameOver')
    }
},

//rendering the clock
render:function(ctx) {
    ctx.font = "50px Courier";
    ctx.fillStyle = "black";
    var width = g_canvas.width/2;
    ctx.fillText(this._timeString, width, 100);

    //adding the time change to the screen eftir powerUp/powerDown catch
    if(this.powerCatch) {
        g_ctx.font = "20px Courier";
        g_ctx.fillStyle = "red";
        g_ctx.fillText(this.powerChangeString, g_canvas.width/2 + 80, 50);
    }
},

//reacting to powerUps/powerDowns that change time
changeTime: function(entity) {
    //get the effect
    this.timeChanged = entity.powerChange;
    var powerChange = entity.powerType;

    //if power up increase the players time
    if(powerChange === "timeChangerUp") {
        this._time = this._time + this.timeChanged;
        //string to appear on screen for a couple of seconds
        this.powerChangeString = "+" + this.timeChanged;
    } else {
        this._time = this._time - this.timeChanged;
        //string to appear on screen for a couple of seconds
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

//make the countdown for the end state increase or decrease with regard to speed
//that is count sooner down if the runner is slower, covering less ground than usually
speedChange: function(change, type) {
    //change the counting threshold lower/higher depending on powerUp/powerDown
    var timeChange = Math.floor(change * 10);
    if(type === 'speedChangerUp') {
        this._patCountThreshold = this._patCountThreshold - timeChange;
    } else if(type === 'speedChangerDown' || type === 'crash') {
        this._patCountThreshold = this._patCountThreshold + timeChange;
    }
    var that = this;
    //sett the time limit before changing back.
    setTimeout(function() {
        that._patCountThreshold = that.PAT_TIME_CONSTANT;
    }, 5000);
}

}