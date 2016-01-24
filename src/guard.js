module.exports = function (creep) {
  var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
    filter: enemy => enemy.owner.username !== 'Source Keeper'
  });

  if(target) {
    if(creep.attack(target) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }

    return;
  }

  const avgGuardLoc = creep.room.memory.avgGuardPosition;
  if (avgGuardLoc) {
    const position = new RoomPosition(avgGuardLoc.x, avgGuardLoc.y, creep.room.name);
    creep.moveTo(position);
  }
};
