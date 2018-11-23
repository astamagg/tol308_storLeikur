/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

'use strict';

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {
  // "PRIVATE" DATA

  _nextSpatialID: 1, // make all valid IDs non-falsey (i.e. don't start at 0)

  _entities: [],

  // "PRIVATE" METHODS
  //
  // <none yet>

  // PUBLIC METHODS

  getNewSpatialID: function() {
    // YOUR STUFF HERE! -> DONE
    var newSpatialID = this._nextSpatialID;

    this._nextSpatialID += 1;

    return newSpatialID;
  },

  register: function(entity) {
    //var pos = entity.getPos();

    var spatialID = entity.getSpatialID();

    //add the value to the ID of the entity
    this._entities[spatialID] = entity;
  },

  unregister: function(entity) {
    //unregister with the the index of the entity in the array
    var index = this._entities.indexOf(entity);

    if(index === -1) return;
    this._entities.splice(index, 1);
    
  },

  findEntityInRange: function(posX, posY, width, height) {
    //All the entities are rectangels. Every entity is checked against the runner
    //The closest entity gets hit by the runner
    for (var ID in this._entities) {
      //return if I am comparing the entity to itself
      
      //þarf að geta náð í this.y úr runner til þess að upphafsstilla þar
      if(this._entities[ID].empty) {
        continue;
      }
      if (
        posX === this._entities[ID].getColPos().posX &&
        posY === this._entities[ID].getColPos().posY
      ) {
        continue;
      }
      //return item if it's colliding
      if (
        util.areColliding(
          posX,
          posY,
          width,
          height,
          this._entities[ID].getColPos().posX ,
          this._entities[ID].getColPos().posY,
          this._entities[ID].getHeight(),
          this._entities[ID].getWidth(),
        )
      ) {
        return this._entities[ID];
      }
    }
  },

  //rendering creates a red rectangle around the entities for easier debugging
  render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = 'red';
    for (var ID in this._entities) {
      var e = this._entities[ID];
      
      ctx.strokeRect(e.getColPos().posX, e.getColPos().posY, e.getWidth(), e.getHeight());
    }
    ctx.strokeStyle = oldStyle;
  },
};
