var roleTypes = {
  harvester: [WORK, CARRY, MOVE],
  miner: [MOVE, WORK, WORK],
  minerHelper: [MOVE, CARRY, MOVE, CARRY],
  builder: [WORK, WORK, CARRY, MOVE],
  healer: [MOVE, HEAL],
  guard: [TOUGH, RANGED_ATTACK, MOVE, ATTACK]
};

function getNextCreepType() {
  var counts = getCreepCounts();

  if (!Object.keys(Game.creeps).length) {
    return 'harvester';
  }

  if (!counts.miner) {
    return 'miner';
  }

  if (!counts.minerHelper) {
    return 'minerHelper';
  }

  if (counts.guard <= 2) {
    return 'guard';
  }

  if (counts.miner < 2) {
    return 'miner';
  }

  if (counts.healer / counts.guard <= .25) {
    return 'healer';
  }

  if (counts.guard / counts.miner <= 2) {
    return 'guard';
  }

  return 'guard';
}

function getCreepCounts() {
  return Object.keys(Game.creeps).reduce(function(groups, name) {
    var creep = Game.creeps[name];
    var role = creep.memory.role;

    if (!groups[role]) {
      groups[role] =  0;
    }

    groups[role]++;

    return groups;
  }, {
    harvester: 0,
    miner: 0,
    minerHelper: 0,
    guard: 0,
    healer: 0,
  });
}

var Spawner = {
  tryBuildCreep: function() {
    var currentRoom = Game.rooms.sim;

    // var timeToWave = currentRoom.survivalInfo.timeToWave;
    // var invaders = currentRoom.survivalInfo.invaders;

    if (!Game.spawns.Spawn1) {
      return;
    }

    var spawn = Game.spawns.Spawn1;
    var energy = spawn.energy;

    var type = getNextCreepType();

    var canCreateCreepResult = spawn.canCreateCreep(roleTypes[type]);

    if (canCreateCreepResult === OK) {
      return spawn.createCreep( roleTypes[type], Math.random(), { role: type } );
    }
  }
};

module.exports = Spawner;
