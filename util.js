//tók bara allt saman, við tökum bara út það sem við erum ekki að nota

// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

'use strict';

var util = {
  // RANGES
  // ======

  /*clampRange: function(value, lowBound, highBound) {
    if (value < lowBound) {
      value = lowBound;
    } else if (value > highBound) {
      value = highBound;
    }
    return value;
  },

  wrapRange: function(value, lowBound, highBound) {
    while (value < lowBound) {
      value += highBound - lowBound;
    }
    while (value > highBound) {
      value -= highBound - lowBound;
    }
    return value;
  },

  isBetween: function(value, lowBound, highBound) {
    if (value < lowBound) {
      return false;
    }
    if (value > highBound) {
      return false;
    }
    return true;
  },*/

  // RANDOMNESS
  // ==========

  randRange: function(min, max) {
    return min + Math.random() * (max - min);
  },

  // MISC
  // ====

 /* square: function(x) {
    return x * x;
  },*/

  // Check whether there is a collision
  areColliding: function(
    a_x,
    a_y,
    a_width,
    a_height,
    b_x,
    b_y,
    b_width,
    b_height
  ) {
    return this.areIntersecting(
      a_x,
      a_x + a_width,
      a_y,
      a_y + a_height,
      b_x,
      b_x + b_width,
      b_y,
      b_y + b_height
    );
  },

  // Check whether two boxes are intersecting
  areIntersecting: function(a_x1, a_x2, a_y1, a_y2, b_x1, b_x2, b_y1, b_y2) {
    return a_x1 < b_x2 && a_x2 > b_x1 && (a_y1 < b_y2 && a_y2 > b_y1);
  },

  // DISTANCES
  // =========
/*
  distSq: function(x1, y1, x2, y2) {
    return this.square(x2 - x1) + this.square(y2 - y1);
  },

  wrappedDistSq: function(x1, y1, x2, y2, xWrap, yWrap) {
    var dx = Math.abs(x2 - x1),
      dy = Math.abs(y2 - y1);
    if (dx > xWrap / 2) {
      dx = xWrap - dx;
    }
    if (dy > yWrap / 2) {
      dy = yWrap - dy;
    }
    return this.square(dx) + this.square(dy);
  },*/

  // CANVAS OPS
  // ==========

  //Add the redraw of the background picture
  clearBackgroundCanvas: function(ctx) {
    var prevfillStyle = ctx.fillStyle;
    g_background.draw(ctx);
    ctx.fillStyle = prevfillStyle;
  },

  //add the redraw of the forground picture
  clearCanvas: function(ctx) {
    /*var prevfillStyle = ctx.fillStyle;
    ctx.fillStyle = "rgb(255, 255,224)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = prevfillStyle;*/
  },

  /*strokeCircle: function(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  },

  fillCircle: function(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  },

  fillBox: function(ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
  },*/

  reactToPowerChanger: function(entity) {
    var type = entity.getPowerType();
    var change = entity.getPowerChanger();
    console.log('type', type);
    if(type === "speedChanger") {
      console.log('fór inn í speed changer');
      //breyttu runner speed
    }
    if(type === "timeChanger") {
      console.log('fór inn í time changer');
      //breyttu klukkunni sem birtist
    }
    if(type === "dead") {
      console.log('fórum inn í dead')
      //game over
    }
    if(type === "crash") {
      console.log('fór inn í crash');
      //hafa áhrif á hraðann.
    }
  }
};
