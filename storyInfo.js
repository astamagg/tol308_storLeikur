
'use strict';

function theStory (ctx) {

    ctx.drawImage(g_images.backgroundFrontPage,0,0, g_canvas.width, g_canvas.height);

    // title text
    ctx.textAlign = "center";
    ctx.font = '50px Courier';
    ctx.fillStyle = 'black';

    ctx.fillText('STUDENT PROBLEMS',ctx.canvas.width/2,ctx.canvas.height/4);

    // description text

    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(80, 215, canvas.width/2+140, canvas.height/4);

    ctx.textAlign = "center";
    ctx.font = '15px Courier';
    ctx.fillStyle = 'black';

    // Because canvas fillText doesen't support multi-line we must style the text
    // like this.
    ctx.fillText("You just remembered that you have only 1 hour"
            , ctx.canvas.width/2, ctx.canvas.height/2.5);
    
    ctx.fillText("until the assignment is due for the class "
            , ctx.canvas.width/2, ctx.canvas.height/2.5+15);

    ctx.fillText("Computer Game Programming. Better start"
            , ctx.canvas.width/2,ctx.cancanvas.height/2.5+30);

    ctx.fillText("running so you can deliver the assignment"
            ,ctx.cancanvas.widthctx.cantx.canvas.height/2.5+45);

    ctx.fillText("to Patrick in time!"
            ,ctx.cancanvas.widthctx.cantx.canvas.height/2.5+60);

    ctx.fillText("There will be power ups to help you deliver"
            ,ctx.cancanvas.widthctx.cantx.canvas.height/2.5+80);

    ctx.fillText("the assignment in timebut you must beware"
            ,ctx.cancanvas.widthctx.cantx.canvas.height/2.5+95);

    ctx.fillText("of the power downs which can slow you down."
            ,ctx.cancanvas.widthctx.cantx.canvas.height/2.5+110);


    // start game and information button
    for (let i = 0; i < g_buttonsFrontPage.length; i++) {
        if (g_buttonsFrontPage[i].contains(g_mouseX, g_mouseY)) {
            g_buttonsFrontPage[i].onClick();
            console.log("BLABLA");
        }
    }

    // Temporary while testing
    if (keys[KEY_G]) {
        g_theStory = false;
        g_gameOver = true;
    }

    // Temporary while testing
    if (keys[KEY_W]) {
        g_theStory = false;
        g_WINNER = true;
    }
}

function instructionGame (ctx) {
    ctx.drawImage(g_images.backgroundFrontPage,0,0, g_canvas.width, g_canvas.height);

    // title text
    ctx.font = '50px Courier';
    ctx.fillStyle = 'black';

    ctx.fillText('Instructions', ctx.canvas.wictx.can, ctx.canvas.height/7);

    // instruction text
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(100, 100, canvas.width/2+100, canvas.height/1.6+3);

    ctx.textAlign = "center";
    ctx.font = '15px Courier';
    ctx.fillStyle = 'white';

    // Because canvas fillText doesen't support multi-line we must style the text
    // like this.
    ctx.fillText("Press key A to go left"
            ,ctx.cancanvas.widthctx.cantx.canvas.height/5-15);
    
    ctx.fillText("Press key D to go right"
            ,ctx.cancanvas.widthctx.cantx.canvas.height/5);

    ctx.fillText("Press key S to go down"
            ,ctx.cancanvas.widthctx.cantx.canvas.height/5+15);

    ctx.fillText("Press key W to jump"
            ,ctx.cancanvas.widthctx.cantx.canvas.height/5+30);

    // Power ups instruction
    ctx.font = '20px Courier';
    ctx.fillText("Power Ups and Power Downs"
            ,ctx.cancanvas.widthctx.cantx.canvas.height/5+50);

    // BED
    ctx.fillStyle = 'red';
    ctx.font = '15px Courier';
    ctx.fillText("Your bed -> Game over because you have."
            ,ctx.canvas.width/2,ctx.canvas.height/5+70);
    ctx.fillText("fallen asleep."
            ,ctx.canvas.width/2,ctx.canvas.height/5+85);

    // NETFLIX
   ctx.fillStyle = 'red';
   ctx.fillText("Netflix -> You couldn’t resist the temptation"
            ,ctx.canvas.width/2,ctx.canvas.height/5+105);
   ctx.fillText("of watching one episode from your favourite"
            ,ctx.canvas.width/2,ctx.canvas.height/5+120);
   ctx.fillText("TV show."
            ,ctx.canvas.width/2,ctx.canvas.height/5+135);   

    // ENERGY DRINK
   ctx.fillStyle = 'red';
   ctx.fillText("Energy drink -> You drank an energy drink"
            ,ctx.canvas.width/2,ctx.canvas.height/5+155);
   ctx.fillText("and can now run faster!"
            ,ctx.canvas.width/2,ctx.canvas.height/5+170);   

    // CANDY
   ctx.fillStyle = 'yellow';
   ctx.fillText("Candy -> Oh no you found candy and you couldn’t"
            ,ctx.canvas.width/2,ctx.canvas.height/5+190);
   ctx.fillText("resist eating it. You’ll use the adrenaline"
            ,ctx.canvas.width/2,ctx.canvas.height/5+205);
   ctx.fillText("from the sugar rush to get faster. But soon"
            ,ctx.canvas.width/2,ctx.canvas.height/5+220);
   ctx.fillText("the sugar rush will be over and you’ll get"
            ,ctx.canvas.width/2,ctx.canvas.height/5+235);
   ctx.fillText("even more tired than before and therefore run"
            ,ctx.canvas.width/2,ctx.canvas.height/5+250);
   ctx.fillText("slower."
            ,ctx.canvas.width/2,ctx.canvas.height/5+265);

    // PIAZZA
   ctx.fillStyle = 'green';
   ctx.fillText("Piazza -> Patrick gave the class extra time"
            ,ctx.canvas.width/2,ctx.canvas.height/5+285);
   ctx.fillText("to submit the assignment!"
            ,ctx.canvas.width/2,ctx.canvas.height/5+300);

    // COFFEE
   ctx.fillStyle = 'green';
   ctx.fillText("Coffee -> Caffeine!! You drank a cup of coffee"
            ,ctx.canvas.width/2,ctx.canvas.height/5+320);
   ctx.fillText("and can now run faster"
            ,ctx.canvas.width/2,ctx.canvas.height/5+335);

    // SPOTIFY
   ctx.fillStyle = 'green';
   ctx.fillText("Spotify -> YES! Your favourite song comes up!"
             ,ctx.canvas.width/2,ctx.canvas.height/5+355);
   ctx.fillText("The tempo of the song speeds you up."
             ,ctx.canvas.width/2,ctx.canvas.height/5+370);

    // BEER
   ctx.fillStyle = 'red';
   ctx.fillText("Beer -> Oh no… your friend gave you a beer."
            ,ctx.canvas.width/2,ctx.canvas.height/5+390);
   ctx.fillText("The beer calms you down which makes you run"
            ,ctx.canvas.width/2,ctx.canvas.height/5+405);
   ctx.fillText("slower."
            ,ctx.canvas.width/2,ctx.canvas.height/5+420);
    
    // Go back button
    if (g_buttonInstruction.contains(g_mouseX, g_mouseY)){
        g_instructions = false;
        g_theStory = true;
    }
}

function gameOver (ctx) {
   // Clear the game
   ctx.fillStyle = "black";
   ctx.fillRect(0, 0, canvas.width, canvas.height);

   ctx.font = '50px Courier';
   ctx.fillStyle = 'yellow';

   // style and write the gameOver-text
   ctx.textAlign = "center";
   if(g_gameOver) {
      ctx.fillText('Game over',ctx.canvas.width/2,ctx.canvas.height/2);
   } else if (g_WINNER){
      ctx.fillText("WINNER!",ctx.canvas.width/2,ctx.canvas.height/2);
   }
   ctx.font = '15px Courier';
  ctx.fillText("If you wan't to start a NEW GAME press G",ctx.canvas.width/2,ctx.canvas.height/2+50);

   // reset everything if press KEY_SPACE and start a new game
   if(keys[KEY_SPACE]) {
       // no longer gameOver/winner
       g_gameOver = false;
       g_WINNER = false;

       // TODO : reset everything
   }
}