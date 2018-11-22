
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
    ctx.font = '15px Courier';
    ctx.fillStyle = 'white';

    // Because canvas fillText doesen't support multi-line we must style the text
    // like this.
    
    ctx.fillText("Press key S to crouch"
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+10);

    ctx.fillText("Press key SPACE to jump"
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+25);

    // Power ups instruction
    ctx.font = '17px Courier';
    ctx.fillText("Power Ups and Power Downs"
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+45);

    // BED
   ctx.fillStyle = 'red';
    ctx.font = '12px Courier';
    ctx.fillText("YOUR BED -> You fall assleep and miss" 
            ,ctx.canvas.width/3.2, ctx.canvas.height/5+70);
    ctx.fillText("the deadline. GAME OVER."
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+85);

    // NETFLIX
   ctx.fillStyle = 'red';
   ctx.fillText("NETFLIX -> You couldn’t resist the "
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+190);
   ctx.fillText("temptation of watching one episode"
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+205);
   ctx.fillText("of your favourite show. Loose 20 min."
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+220);  
        
    // BEER
    ctx.fillStyle = 'red';
    ctx.fillText("BEER -> Your friend gave you a beer."
         ,ctx.canvas.width/3.5, ctx.canvas.height/5+105);
    ctx.fillText("The beer calms you down which makes"
         ,ctx.canvas.width/3.5, ctx.canvas.height/5+120);   
    ctx.fillText("you run 2x slower untill you sober up."
         ,ctx.canvas.width/3.5, ctx.canvas.height/5+135);   


     // YOUTUBE
   ctx.fillStyle = 'red';
   ctx.fillText("YOUTUBE -> You watch a funny cat video."
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+155);
   ctx.fillText("Time flies by and you loose 10 min."
            ,ctx.canvas.width/3.5, ctx.canvas.height/5+170);

     

    // ENERGY DRINK
   ctx.fillStyle = 'green';
   ctx.fillText("Energy drink -> You drank an energy drink"
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+205);
   ctx.fillText("and can now run faster!"
   ,ctx.canvas.width/1.4, ctx.canvas.height/5+220);


    // CANDY
   ctx.fillStyle = 'yellow';
   ctx.fillText("CANDY -> Oh no you found candy and you"
            ,ctx.canvas.width/1.4, ctx.canvas.height/5-5);
   ctx.fillText("couldn’t resist eating it. The adrenaline"
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+10);
   ctx.fillText("from the sugar rush gives you super speed" 
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+25);
   ctx.fillText(" and you become unstoppable! But once"
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+40);
   ctx.fillText("the sugar high wears off you crash"
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+55);
   ctx.fillText("and become even. slower than before."
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+70);

    // PIAZZA
   ctx.fillStyle = 'green';
   ctx.fillText("PIAZZA -> Patrick extends the deadline."
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+90);
   ctx.fillText("You gain 10 min!"
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+105);

    // COFFEE
   ctx.fillStyle = 'green';
   ctx.fillText("COFFEE -> You drank a cup of coffee"
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+135);
   ctx.fillText("and can now run 1x faster!"
            ,ctx.canvas.width/1.4, ctx.canvas.height/5+150);

    // SPOTIFY
   ctx.fillStyle = 'green';
   ctx.fillText("SPOTIFY ->Your favourite song comes on!"
             ,ctx.canvas.width/1.4, ctx.canvas.height/5+170);
   ctx.fillText("The tempo of the song speeds you up 1.5x."
             ,ctx.canvas.width/1.4, ctx.canvas.height/5+185);
    // Go back button
    if (g_buttonInstruction.contains(g_mouseX, g_mouseY)){
        g_instructions = false;
        g_theStory = true;
    }
}

function gameOver (ctx) {
   // Clear the game
   ctx.drawImage(g_images.background,0,700, g_canvas.width, g_canvas.height);

   // title text
   ctx.textAlign = "center";
   ctx.font = '50px Courier';
   ctx.fillStyle = 'black';

   // style and write the gameOver-text
   ctx.textAlign = "center";
   if(g_gameOver) {
      ctx.fillText('You Lost',ctx.canvas.width/2, ctx.canvas.height/2);
   } else if (g_WINNER){
      ctx.fillText("YOU WON!!",ctx.canvas.width/2, ctx.canvas.height/2);
   }

   // start game and information button
   for (let i = 0; i < g_buttonsGameOver; i++) {
        if (g_buttonsGameOver[i].contains(g_mouseX, g_mouseY)) {
            g_buttonsGameOver[i].onClick();
        }
    }
}