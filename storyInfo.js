
'use strict';

function theStory (ctx) {

    ctx.drawImage(g_images.background,0,700, g_canvas.width, g_canvas.height);

    // title text
    ctx.textAlign = "center";
    ctx.font = '50px Courier';
    ctx.fillStyle = 'black';

    ctx.fillText('STUDENT PROBLEMS',ctx.canvas.width/2,ctx.canvas.height/4);

    // description text

    ctx.textAlign = "center";
    ctx.font = '15px Courier';
    ctx.fillStyle = 'black';

    // Because canvas fillText doesen't support multi-line we must style the text
    // like this.
    ctx.fillText("You just remembered that you have only 1 hour"
            , ctx.canvas.width/2, ctx.canvas.height/3);
    
    ctx.fillText("until the assignment is due for the class "
            , ctx.canvas.width/2, ctx.canvas.height/3+15);

    ctx.fillText("Computer Game Programming. Better start"
            , ctx.canvas.width/2, ctx.canvas.height/3+30);

    ctx.fillText("running so you can deliver the assignment"
            ,ctx.canvas.width/2, ctx.canvas.height/3+45);

    ctx.fillText("to Patrick in time!"
            ,ctx.canvas.width/2, ctx.canvas.height.height/3+60);

    ctx.fillText("There will be power ups to help you deliver"
            ,ctx.canvas.width/2, ctx.canvas.height/3+80);

    ctx.fillText("the assignment in timebut you must beware"
            ,ctx.canvas.width/2, ctx.canvas.height/3+95);

    ctx.fillText("of the power downs which can slow you down."
            ,ctx.canvas.width/2, ctx.canvas.height/3+110);


    // start game and information button
    for (let i = 0; i < g_buttonsFrontPage.length; i++) {
        if (g_buttonsFrontPage[i].contains(g_mouseX, g_mouseY)) {
            g_buttonsFrontPage[i].onClick();
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
    ctx.drawImage(g_images.background,0,700, g_canvas.width, g_canvas.height);

    // title text
    ctx.font = '50px Courier';
    ctx.fillStyle = 'black';

    ctx.fillText('Instructions', ctx.canvas.width/2, ctx.canvas.height/8);

    // instruction text
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(60, 60, canvas.width/2+235, canvas.height/1.5);

    ctx.textAlign = "center";
    ctx.font = '10px Courier';
    ctx.fillStyle = 'white';

    // Because canvas fillText doesen't support multi-line we must style the text
    // like this.
    
    ctx.fillText("Press key D to go right"
            ,ctx.canvas.width/3.5, ctx.canvas.height/5-5);

    ctx.fillText("Press key S to go down"
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+10);

    ctx.fillText("Press key SPACE to jump"
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+25);

    // Power ups instruction
    ctx.font = '15px Courier';
    ctx.fillText("Power Ups and Power Downs"
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+45);

    // BED
    ctx.fillStyle = 'red';
    ctx.font = '10px Courier';
    ctx.fillText("Your bed -> Game over because you have."
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+70);
    ctx.fillText("fallen asleep."
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+85);

    // NETFLIX
   ctx.fillStyle = 'red';
   ctx.fillText("Netflix -> You couldn’t resist the temptation"
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+105);
   ctx.fillText("of watching one episode from your favourite"
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+120);
   ctx.fillText("TV show."
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+135);   

    // ENERGY DRINK
   ctx.fillStyle = 'red';
   ctx.fillText("Energy drink -> You drank an energy drink"
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+155);
   ctx.fillText("and can now run faster!"
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+170);   

    // CANDY
   ctx.fillStyle = 'yellow';
   ctx.fillText("Candy -> Oh no you found candy and you couldn’t"
            ,ctx.canvas.width/1.4, ctx.canvas.height/5-5);
   ctx.fillText("resist eating it. You’ll use the adrenaline"
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+10);
   ctx.fillText("from the sugar rush to get faster. But soon"
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+25);
   ctx.fillText("the sugar rush will be over and you’ll get"
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+40);
   ctx.fillText("even more tired than before and therefore run"
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+55);
   ctx.fillText("slower."
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+70);

    // PIAZZA
   ctx.fillStyle = 'green';
   ctx.fillText("Piazza -> Patrick gave the class extra time"
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+90);
   ctx.fillText("to submit the assignment!"
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+105);

    // COFFEE
   ctx.fillStyle = 'green';
   ctx.fillText("Coffee -> Caffeine!! You drank a cup of coffee"
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+135);
   ctx.fillText("and can now run faster"
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+150);

    // SPOTIFY
   ctx.fillStyle = 'green';
   ctx.fillText("Spotify -> YES! Your favourite song comes up!"
             ,ctx.canvas.width/1.4, ctx.canvas.height/5+170);
   ctx.fillText("The tempo of the song speeds you up."
             ,ctx.canvas.width/1.4, ctx.canvas.height/5+185);

    // BEER
   ctx.fillStyle = 'red';
   ctx.fillText("Beer -> Oh no… your friend gave you a beer."
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+205);
   ctx.fillText("The beer calms you down which makes you run"
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+220);
   ctx.fillText("slower."
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+235);
    
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
      ctx.fillText('Game over',ctx.canvas.width/2, ctx.canvas.height/2);
   } else if (g_WINNER){
      ctx.fillText("WINNER!",ctx.canvas.width/2, ctx.canvas.height/2);
   }
   ctx.font = '15px Courier';
  ctx.fillText("If you wan't to start a NEW GAME press G",ctx.canvas.width/2, ctx.canvas.height/2+50);

   // reset everything if press KEY_SPACE and start a new game
   if(keys[KEY_SPACE]) {
       // no longer gameOver/winner
       g_gameOver = false;
       g_WINNER = false;

       // TODO : reset everything
   }
}