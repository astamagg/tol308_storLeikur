'use strict';

// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/

var entityManager = {
  _pat: [],
  _runner: [],
  _powerChanger: [], //power changers that move with a random x position
  _stillPowerChanger: [], //power changers that logically need to be drawn on the floor

  _forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
      fn.call(aCategory[i]);
    }
  },

  //Generate power changers that move
  _generatePowerChangers: function() {
    var i,
      NUM_POWERCHANGERS = 30;
    for (i = 0; i < NUM_POWERCHANGERS; ++i) {
      this.generatePowerChangers();
    }
  },

  //generate power changers that stay still
  _generateStillPowerChangers: function() {
    var i,
      NUM_POWERCHANGERS = 30;
    for (i = 0; i < NUM_POWERCHANGERS; ++i) {
      this.generateStillPowerChangers();
    }
  },

  init: function() {
    this.generateRunner();
    this._generatePowerChangers();
    this._generateStillPowerChangers();
    this.generatePat();
  },
  // PUBLIC METHODS

  // A special return value, used by other objects,
  // to request the blessed release of death!
  //
  KILL_ME_NOW: -1,

  generatePowerChangers: function(descr) {
    this._powerChanger.push(new PowerChanger(descr));
  },

  generateStillPowerChangers: function(descr) {
    this._stillPowerChanger.push(new StillPowerChanger(descr));
  },

  generateRunner: function(descr) {
    this._runner.push(new Runner(descr));
  },

  generatePat: function(descr) {
    this._pat.push(new Pat(descr));
  },

  // Some things must be deferred until after initial construction
  // i.e. thing which need `this` to be defined.
  //
  deferredSetup: function() {
    this._categories = [
      this._runner,
      this._powerChanger,
      this._stillPowerChanger,
      this._pat,
    ];
  },

  reset: function() {

    countdown.reset();

    for (let i = 0; i < this._runner.length; i++) {
        this._runner[i].reset();
    }

    for (let i = 0; i < this._pat.length; i++) {
      this._pat[i].reset();
    }
    
    for (let i = 0; i < this._powerChanger.length; i++) {
        this._powerChanger[i].reset();
    }

    for (let i = 0; i < this._stillPowerChanger.length; i++) {
        this._stillPowerChanger[i].reset();
    }
    this._powerChanger = [];
    this._stillPowerChanger = [];

  },

  reactToPowerChanger: function(entity) {
    var type = entity.getPowerType();
    var change = entity.getPowerChanger();

    // Play right reactionary sound
    if (type === 'timeChangerUp' || (type === 'speedChangerUp' && change >= 1)) {
      g_powerUpSound.play();
    }
    if (type === 'timeChangerDown' || (type === 'speedChangerDown' && change < 1)) {
      g_powerDownSound.play();
    }
    //change the runners speed and affect the time logic of the game
    if (type === 'speedChangerUp' || type === 'speedChangerDown') {
      this._runner[0].speedChange(change);
      countdown.speedChange(change, type);
    }
    //makes the runner indestructable and then slows her down
    if (type === 'candy') {
      this._runner[0].powerUp(change);
      countdown.speedChange(change);
    }
    //change the value of the tme the runner has left
    if (type === 'timeChangerUp' || type === 'timeChangerDown') {
      countdown.changeTime(entity);
    }
    //landing on the bed ends the game
    if(type === "dead") {
      setGameState('gameOver');
    }
    //crashing into a chair or a desk causes the runner to blink and slow down
    if(type === "crash") {
        this._runner[0].speedChange(change); 
        this._runner[0].blinking = true;
        countdown.speedChange(change);
    }
    if(type === "pat") {
        //console.log('fór inn í pat');
        this._runner[0].speed = 0;

        setTimeout(function() {
            setGameState('winner');
        }, 5000);
    }
},

  update: function(du) {
    countdown.update(du);

    if (!g_patIsShowing) {
      g_camera.update(du);
    }
    // this._runner[0].update(du);

    for (var c = 0; c < this._categories.length; c++) {
      var aCategory = this._categories[c];
      var i = 0;
      while (i < aCategory.length) {
        var status = aCategory[i].update(du);

        if (status === this.KILL_ME_NOW) {
          // remove the dead guy, and shuffle the others down to
          // prevent a confusing gap from appearing in the array
          aCategory.splice(i, 1);
        } else {
          ++i;
        }
      }
    }
  },

  render: function(ctx) {
    countdown.render(ctx);

    for (var i = 0; i < this._categories.length; ++i) {
      var aCategory = this._categories[i];
      for (var j = 0; j < aCategory.length; j++) {
        aCategory[j].render(ctx);
      }
      //debug.text(".", debugX + i * 10, debugY);
    }
  },
};
entityManager.deferredSetup();
