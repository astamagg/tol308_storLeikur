"use strict";

// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

_runner:[],   

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

init: function() {
    this.generateRunner();
},
// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

generateRunner: function(descr) {
    this._runner.push(new Runner(descr));
  },

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    //bæta við okkar flokkum
    this._categories = [this._runner]; 
},

update: function(du) {
    countdown.update(du);
},

render: function(ctx) {
    /*for (var i = 0; i < this._categories.length; ++i) {
        var aCategory = this._categories[i];

        aCategory[i].render(ctx);
        //debug.text(".", debugX + i * 10, debugY);

    }*/
    
    this._runner[0].render(ctx);
   // drawClock(ctx);
   countdown.render(ctx);
},
}
entityManager.deferredSetup();

