module.exports = function (creep) {
  if(creep.carry.energy < creep.carryCapacity) {
    var energy = creep.pos.findInRange(Game.DROPPED_ENERGY, 1)[0]
    if (creep.pickup(energy) === ERR_NOT_IN_RANGE) {
      creep.moveTo(energy);
    }

    return;
  }

  if (!Game.spawns.Spawn1) {
    return;
  }

  if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(Game.spawns.Spawn1);
  }
}
