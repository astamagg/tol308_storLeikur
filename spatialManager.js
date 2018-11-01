/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {
    // TODO: YOUR STUFF HERE! -> DONE
    var newSpatialID = this._nextSpatialID;

    this._nextSpatialID += 1;
    
    return newSpatialID;

},

register: function(entity) {
    // TODO: YOUR STUFF HERE! -> DONE
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
    // TODO: YOUR STUFF HERE! -> done
    var spatialID = entity.getSpatialID();
    //create a new entity that is empty for this particular ID
    //I have a question about this, this is a rather simple method but does it not take
    //up alot of memory to have an array with empty indices?
    this._entities[spatialID] = new Entity(); 
},

findEntityInRange: function(posX, posY, radius) {
    // TODO: YOUR STUFF HERE! -> DONE
    var smallestID = 0;
    var smallestDistance = 1000000;
    for(var ID in this._entities) {
        //return if I am comparing the entity to itself
        if(posX === this._entities[ID].posX && posY === this._entities[ID]) {
            return;
        }
        //calculate the distance between the two objects
        var distance = util.wrappedDistSq(posX, posY, this._entities[ID].posX, this._entities[ID].posY, g_canvas.width, g_canvas.height);
        //update the smallest value
        if(distance < smallestDistance) {
            smallestDistance = distance;
            smallestID = ID;
        }
    }
    //calculate the distance between their centers
    var limit = radius + this._entities[smallestID].radius;

    //return the value if the distance is smaller that limit squared
    if(smallestDistance < limit*limit) {
        return this._entities[smallestID].entity;
    }
},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    for (var ID in this._entities) {
        var e = this._entities[ID];
        util.strokeCircle(ctx, e.posX, e.posY, e.radius);
    }
    ctx.strokeStyle = oldStyle;
}

}
