var memoryUtils = require('../memory_utils');

var MoveToAvgGuardPosition = b3.Class(b3.Action, {
  name: 'MoveToAvgGuardPosition',

  tick: function(tick) {
    var creep = tick.target;

    const avgGuardLoc = memoryUtils.getAvgGuardPosition();
    if (avgGuardLoc) {
      const position = new RoomPosition(avgGuardLoc.x, avgGuardLoc.y, creep.room.name);

      var before = new RoomPosition(creep.pos.x, creep.pos.y, creep.pos.room);
      creep.moveTo(position);

      if (!creep.pos.isEqualTo(before)) {
        return b3.RUNNING;
      }
    }

    return b3.SUCCESS;
  }
});

module.exports = MoveToAvgGuardPosition;
