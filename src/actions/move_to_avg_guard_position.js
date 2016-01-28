var memoryUtils = require('../memory_utils');

var MoveToAvgGuardPosition = b3.Class(b3.Action, {
  name: 'MoveToAvgGuardPosition',

  tick: function(tick) {
    var creep = tick.target;

    const avgGuardLoc = memoryUtils.getAvgGuardPosition();
    if (avgGuardLoc) {
      const position = new RoomPosition(avgGuardLoc.x, avgGuardLoc.y, creep.room.name);
      creep.moveTo(position);
      return b3.RUNNING;
    }

    return b3.SUCCESS;

    if(creep.carry.energy < creep.carryCapacity) {
      var energy = creep.room.find(FIND_DROPPED_RESOURCES)[0]
      if (creep.pickup(energy) === ERR_NOT_IN_RANGE) {
        creep.moveTo(energy);
      }

      return b3.RUNNING;
    }

    return b3.SUCCESS;
  }
});

module.exports = MoveToAvgGuardPosition;
