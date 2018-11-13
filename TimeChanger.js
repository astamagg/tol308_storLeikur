"use strict"

function TimeChanger(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
};

TimeChanger.prototype = new Entity();
