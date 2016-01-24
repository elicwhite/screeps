function upgradeController(creep) {
  var tryTransferToController = creep.upgradeController(creep.room.controller);
  if(tryTransferToController === ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.controller);
  } else if(tryTransferToController === ERR_INVALID_TARGET) {
    creep.claimController(creep.room.controller)
  }
}

module.exports = function (creep) {
  if (creep.memory.upgradingController) {
    if (creep.carry.energy > 0) {
      upgradeController(creep);
    } else {
      creep.memory.upgradingController = false;
    }

    return;
  }

  if(creep.carry.energy < creep.carryCapacity) {
    var sources = creep.room.find(FIND_SOURCES);
    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0]);
    }

    return;
  }

  if (Game.spawns.Spawn1.energy === Game.spawns.Spawn1.energyCapacity) {
    creep.memory.upgradingController = true;
    upgradeController(creep);
  } else {
    if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(Game.spawns.Spawn1);
    }
  }
}
