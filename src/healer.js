var memoryUtils = require('./memory_utils');
const utils = require('./utils');

module.exports = function (creep) {
  utils.keepAwayFromEnemies(creep);

  var target = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
    filter: creep => creep.hits < creep.hitsMax
  });

  if(target) {
    if (creep.heal(target) === ERR_NOT_IN_RANGE) {
      if(creep.moveTo(target) !== OK) {
        if(creep.rangedHeal(target) === OK) {
          return;
        }
      }
    }

    return;
  }

  const avgGuardLoc = memoryUtils.getAvgGuardPosition();
  if (avgGuardLoc) {
    const position = new RoomPosition(avgGuardLoc.x, avgGuardLoc.y, creep.room.name);
    creep.moveTo(position);
    return;
  }
};
