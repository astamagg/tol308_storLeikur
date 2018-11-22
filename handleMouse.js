// ==============
// MOUSE HANDLING
// ==============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var g_mouseX = 0,
    g_mouseY = 0;

function handleMouse(evt) {
    
    g_mouseX = evt.clientX - g_canvas.offsetLeft;
    g_mouseY = evt.clientY - g_canvas.offsetTop;
    
}

//change the color of a button if it is pressed
function handleButtonColor(evt) {
    
    let instructionButton = g_buttonInstruction.contains(
        evt.clientX - g_canvas.offsetLeft, 
        evt.clientY - g_canvas.offsetTop);
    
    for (let i=0; i<g_buttonsFrontPage.length; i++) {
        if (g_buttonsFrontPage[i].contains(
            evt.clientX - g_canvas.offsetLeft, 
            evt.clientY - g_canvas.offsetTop)) {
            g_buttonsFrontPage[i].color = 'yellow';
            
        }
    }

    for (let i=0; i<g_buttonsGameOver.length; i++) {
        if (g_buttonsGameOver[i].contains(
            evt.clientX - g_canvas.offsetLeft, 
            evt.clientY - g_canvas.offsetTop)) {
            g_buttonsGameOver[i].color = 'yellow';
            
        }
    }

    if (instructionButton) {
        g_buttonInstruction.color = 'yellow';
    }
}

//change the color back to the original when we stop pressing
function handleButtonUp(evt) {
    
    g_buttonInstruction.color = 'red';

    for (let i=0; i<g_buttonsFrontPage.length; i++) {
        if (g_buttonsFrontPage[i].contains(
            evt.clientX - g_canvas.offsetLeft, 
            evt.clientY - g_canvas.offsetTop)) {
            g_buttonsFrontPage[i].color = 'red';
            
        }
    }

    for (let i=0; i<g_buttonsGameOver.length; i++) {
        if (g_buttonsGameOver[i].contains(
            evt.clientX - g_canvas.offsetLeft, 
            evt.clientY - g_canvas.offsetTop)) {
            g_buttonsGameOver[i].color = 'red';
            
        }
    }

}

// Handle "down" and "move" events the same way.
window.addEventListener("click", handleMouse);
window.addEventListener("mousedown", handleButtonColor);
window.addEventListener("mouseup", handleButtonUp);