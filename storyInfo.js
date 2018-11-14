
'use strict';

function theStory (ctx) {

    g_ctx.drawImage(g_images.backgroundFrontPage,0,0, g_canvas.width, g_canvas.height);

    // title text
    g_ctx.textAlign = "center";
    g_ctx.font = '50px Courier';
    g_ctx.fillStyle = 'black';

    g_ctx.fillText('STUDENT PROBLEMS', g_ctx.canvas.width/2, g_ctx.canvas.height/4);

    // description text

    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(80, 215, canvas.width/2+140, canvas.height/4);

    g_ctx.textAlign = "center";
    g_ctx.font = '15px Courier';
    g_ctx.fillStyle = 'black';

    // Because canvas fillText doesen't support multi-line we must style the text
    // like this.
    g_ctx.fillText("You just remembered that you have only 1 hour"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/2.5);
    
    g_ctx.fillText("until the assignment is due for the class "
            , g_ctx.canvas.width/2, g_ctx.canvas.height/2.5+15);

    g_ctx.fillText("Computer Game Programming. Better start"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/2.5+30);

    g_ctx.fillText("running so you can deliver the assignment"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/2.5+45);

    g_ctx.fillText("to Patrick in time!"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/2.5+60);

    g_ctx.fillText("There will be power ups to help you deliver"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/2.5+80);

    g_ctx.fillText("the assignment in timebut you must beware"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/2.5+95);

    g_ctx.fillText("of the power downs which can slow you down."
            , g_ctx.canvas.width/2, g_ctx.canvas.height/2.5+110);


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
    g_ctx.drawImage(g_images.backgroundFrontPage,0,0, g_canvas.width, g_canvas.height);

    // title text
    g_ctx.font = '50px Courier';
    g_ctx.fillStyle = 'black';

    g_ctx.fillText('Instructions', g_ctx.canvas.width/2, g_ctx.canvas.height/7);

    // instruction text
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(100, 100, canvas.width/2+100, canvas.height/1.6+3);

    g_ctx.textAlign = "center";
    g_ctx.font = '15px Courier';
    g_ctx.fillStyle = 'white';

    // Because canvas fillText doesen't support multi-line we must style the text
    // like this.
    g_ctx.fillText("Press key A to go left"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5-15);
    
    g_ctx.fillText("Press key D to go right"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5);

    g_ctx.fillText("Press key S to go down"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+15);

    g_ctx.fillText("Press key W to jump"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+30);

    // Power ups instruction
    g_ctx.font = '20px Courier';
    g_ctx.fillText("Power Ups and Power Downs"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+50);

    // BED
    g_ctx.fillStyle = 'red';
    g_ctx.font = '15px Courier';
    g_ctx.fillText("Your bed -> Game over because you have."
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+70);
    g_ctx.fillText("fallen asleep."
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+85);

    // NETFLIX
    g_ctx.fillStyle = 'red';
    g_ctx.fillText("Netflix -> You couldn’t resist the temptation"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+105);
    g_ctx.fillText("of watching one episode from your favourite"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+120);
    g_ctx.fillText("TV show."
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+135);   

    // ENERGY DRINK
    g_ctx.fillStyle = 'red';
    g_ctx.fillText("Energy drink -> You drank an energy drink"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+155);
    g_ctx.fillText("and can now run faster!"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+170);   

    // CANDY
    g_ctx.fillStyle = 'yellow';
    g_ctx.fillText("Candy -> Oh no you found candy and you couldn’t"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+190);
    g_ctx.fillText("resist eating it. You’ll use the adrenaline"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+205);
    g_ctx.fillText("from the sugar rush to get faster. But soon"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+220);
    g_ctx.fillText("the sugar rush will be over and you’ll get"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+235);
    g_ctx.fillText("even more tired than before and therefore run"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+250);
    g_ctx.fillText("slower."
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+265);

    // PIAZZA
    g_ctx.fillStyle = 'green';
    g_ctx.fillText("Piazza -> Patrick gave the class extra time"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+285);
    g_ctx.fillText("to submit the assignment!"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+300);

    // COFFEE
    g_ctx.fillStyle = 'green';
    g_ctx.fillText("Coffee -> Caffeine!! You drank a cup of coffee"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+320);
    g_ctx.fillText("and can now run faster"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+335);

    // SPOTIFY
    g_ctx.fillStyle = 'green';
    g_ctx.fillText("Spotify -> YES! Your favourite song comes up!"
             , g_ctx.canvas.width/2, g_ctx.canvas.height/5+355);
    g_ctx.fillText("The tempo of the song speeds you up."
             , g_ctx.canvas.width/2, g_ctx.canvas.height/5+370);

    // BEER
    g_ctx.fillStyle = 'red';
    g_ctx.fillText("Beer -> Oh no… your friend gave you a beer."
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+390);
    g_ctx.fillText("The beer calms you down which makes you run"
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+405);
    g_ctx.fillText("slower."
            , g_ctx.canvas.width/2, g_ctx.canvas.height/5+420);
    
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

   g_ctx.font = '50px Courier';
   g_ctx.fillStyle = 'yellow';

   // style and write the gameOver-text
   g_ctx.textAlign = "center";
   if(g_gameOver) {
       g_ctx.fillText('Game over', g_ctx.canvas.width/2, g_ctx.canvas.height/2);
   } else if (g_WINNER){
       g_ctx.fillText("WINNER!", g_ctx.canvas.width/2, g_ctx.canvas.height/2);
   }
   g_ctx.font = '15px Courier';
   g_ctx.fillText("If you wan't to start a NEW GAME press G", g_ctx.canvas.width/2, g_ctx.canvas.height/2+50);

   // reset everything if press KEY_SPACE and start a new game
   if(keys[KEY_SPACE]) {
       // no longer gameOver/winner
       g_gameOver = false;
       g_WINNER = false;

       // TODO : reset everything
   }
}