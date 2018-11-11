var i = 59;
g_time = "01:00"

var x = setInterval(function() {
    var time = timeToMinutes(i);
    if(time.seconds < 10) {
        g_time =  "0" + time.minutes + ":" + "0" + time.seconds;
    } else {
        g_time = "0" + time.minutes + ":" + time.seconds;
    }
    i--; 
    if(i < 0) {
        clearInterval(x);
           // document.getElementById('countdown').innerHTML = "You lost";
        g_time = "You lost!";
    } 
    if(!g_doRender) {
        clearInterval(x);
    }
}, 1000); 

function timeToMinutes(time) {
    var minutes = Math.floor(i/60);
    var seconds = time - minutes * 60;

    return {minutes: minutes, seconds: seconds};
}

function drawClock(ctx) {
    ctx.font = "30px Courier";
    var width = (g_canvas.width-ctx.measureText(g_time).width)/2;
    ctx.fillText(g_time, width, 50);
}