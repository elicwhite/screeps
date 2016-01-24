module.exports = function (creep) {
  if(creep.carry.energy < creep.carryCapacity) {
    var sources = creep.room.find(FIND_SOURCES);
    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0]);
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
