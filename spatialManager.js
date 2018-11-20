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
    // YOUR STUFF HERE! -> DONE
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();

    //create the entity with the current position, radius and the thing itself
    var updatedEntity = {
      posX: pos.posX,
      posY: pos.posY,
      radius: entity.getRadius(),
      entity: entity,
    };

    //add the value to the ID of the entity
    this._entities[spatialID] = updatedEntity;
  },

  unregister: function(entity) {
    // YOUR STUFF HERE! -> done
    var spatialID = entity.getSpatialID();
    //create a new entity that is empty for this particular ID
    //I have a question about this, this is a rather simple method but does it not take
    //up alot of memory to have an array with empty indices?
    this._entities[spatialID] = new Entity();
  },

  findEntityInRange: function(posX, posY, width, height) {
    // YOUR STUFF HERE! -> DONE
    // TODO: Öll entity þurfa að vera með width og height breytur
    // Þurfum í raun bara að nota find entity in range fyrir stelpuna - hún er eina sem getur collide-að
    // Svo köllum við á util fallið areColliding hér til að athuga hvort hún snerti hluti
    for (var ID in this._entities) {
      //return if I am comparing the entity to itself
      if (
        posX === this._entities[ID].posX &&
        posY === this._entities[ID].posY
      ) {
        return;
      }
      //return item if it's colliding
      if (
        util.areColliding(
          posX,
          posY,
          width,
          height,
          ID.posX,
          ID.posY,
          ID.getWidth(),
          ID.getHeight()
        )
      ) {
        return this._entities[ID].entity;
      }
    }
  },

  render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = 'red';
    for (var ID in this._entities) {
      var e = this._entities[ID];
      util.strokeCircle(ctx, e.posX, e.posY, e.radius);
    }
    ctx.strokeStyle = oldStyle;
  },
};
