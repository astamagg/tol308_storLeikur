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
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();
    //create the entity with the current position, radius and the thing itself
   /* var updatedEntity = {
      posX: pos.posX,
      posY: pos.posY,
      radius: entity.getRadius(),
      entity: entity,
      empty: false,
    };*/
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
    // Þurfum í raun bara að nota find entity in range fyrir stelpuna - hún er eina sem getur collide-að
    // Svo köllum við á util fallið areColliding hér til að athuga hvort hún snerti hluti
    for (var ID in this._entities) {
      //return if I am comparing the entity to itself
      
      if(this._entities[ID].empty) {
        continue;
      }
      if (
        posX === this._entities[ID].getPos().posX &&
        posY === this._entities[ID].getPos().posY
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
          this._entities[ID].getPos().posX ,
          this._entities[ID].getPos().posY,
          this._entities[ID].height,
          this._entities[ID].width,
        )
      ) {
        return this._entities[ID];
      }
    }
  },

  render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = 'red';
    for (var ID in this._entities) {
      var e = this._entities[ID];

      ctx.strokeRect(e.getPos().posX, e.getPos().posY, e.getWidth(), e.getHeight());
    }
    ctx.strokeStyle = oldStyle;
  },
};
