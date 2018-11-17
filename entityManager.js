"use strict";

// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

_runner:[],   
_powerChanger: [],

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

_generatePowerChangers : function() {
    var i,
        NUM_POWERCHANGERS = 8;
    for (i = 0; i < NUM_POWERCHANGERS; ++i) {
        this.generatePowerChangers();
    }
    console.log('powerChanger', this._powerChanger);
},

init: function() {
    this._generatePowerChangers();
    this.generateRunner();
},
// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

generatePowerChangers: function(descr) {
    this._powerChanger.push(new PowerChanger(descr));
},

generateRunner: function(descr) {
    this._runner.push(new Runner(descr));
  },

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    //bæta við okkar flokkum
    this._categories = [this._powerChanger]; 
},

update: function(du) {
    countdown.update(du);
    this._runner[0].update(du);

    for(var c = 0; c < this._categories.length; c++) {
        var aCategory = this._categories[c];
        var i = 0;
        while ( i < aCategory.length) {
            aCategory[i].update(du);
            i++;
        }
    }
    //TimeChanger.update(du);
},

/*update: function(du) {
    countdown.update(du);

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        while (i < aCategory.length) {
            aCategory[i].update(du);
           // var status = aCategory[i].update(du);

           /* if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
            }
            else {
                ++i;
            }
        }
    }
    
   // if (this._rocks.length === 0) this._generateRocks();

},*/



render: function(ctx) {
    for (var i = 0; i < this._categories.length; ++i) {
        var aCategory = this._categories[i];
        for(var j = 0; j < aCategory.length; j++) {
            aCategory[j].render(ctx);
        }
        //debug.text(".", debugX + i * 10, debugY);

    }
    
    this._runner[0].render(ctx);
   // drawClock(ctx);
   countdown.render(ctx);
},
}
entityManager.deferredSetup();

