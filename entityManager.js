"use strict";

// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

_runner:[],   
_powerChanger: [],     //power changers that move with a random x position
_stillPowerChanger: [], //power changers that logically need to be drawn on the floor

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

//Generate power changers that move
_generatePowerChangers : function() {
    var i,
        NUM_POWERCHANGERS = 32;
    for (i = 0; i < NUM_POWERCHANGERS; ++i) {
        this.generatePowerChangers();
    }
},

//generate power changers that stay still
_generateStillPowerChangers: function() {
    var i,
        NUM_POWERCHANGERS = 3;
    for (i = 0; i < NUM_POWERCHANGERS; ++i) {
        this.generateStillPowerChangers();
    }
},

init: function() {
    this.generateRunner();
    this._generatePowerChangers();
    this._generateStillPowerChangers();
},
// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

generatePowerChangers: function(descr) {
    this._powerChanger.push(new PowerChanger(descr));
},

generateStillPowerChangers: function(descr) {
    this._stillPowerChanger.push(new StillPowerChanger(descr));
},

generateRunner: function(descr) {
    this._runner.push(new Runner(descr));
  },

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    //bæta við okkar flokkum
    this._categories = [this._runner, this._powerChanger, this._stillPowerChanger]; 
},

update: function(du) {
    countdown.update(du);

    for(var c = 0; c < this._categories.length; c++) {
        var aCategory = this._categories[c];
        var i = 0;
        while ( i < aCategory.length) {
            var status = aCategory[i].update(du);

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
            }
            else {
                ++i;
            }
        }
    }
},

render: function(ctx) {
    countdown.render(ctx);
    
    for (var i = 0; i < this._categories.length; ++i) {
        var aCategory = this._categories[i];
        for(var j = 0; j < aCategory.length; j++) {
            aCategory[j].render(ctx);
        }
        //debug.text(".", debugX + i * 10, debugY);

    }
},
}
entityManager.deferredSetup();

