var roleTypes = {
  harvester: [WORK, CARRY, MOVE],
  miner: [MOVE, WORK, WORK],
  minerHelper: [MOVE, CARRY, MOVE, CARRY],
  builder: [WORK, WORK, CARRY, MOVE],
  healer: [MOVE, HEAL],
  guard: [TOUGH, RANGED_ATTACK, MOVE, ATTACK],
  archer: [TOUGH, RANGED_ATTACK, MOVE, MOVE]
};

Spawn.prototype.createHarvester = function() {
  var name = this.createCreep(roleTypes.harvester, Math.random(), {
    role: 'harvester',
    upgradeController: false
  });

  return name;
};

Spawn.prototype.createBuilder = function() {
  return this.createCreep( roleTypes.builder, Math.random(), { role: 'builder' } );
};

Spawn.prototype.createHealer = function() {
  return this.createCreep( roleTypes.healer, Math.random(), { role: 'healer' } );
};

Spawn.prototype.createGuard = function() {
  return this.createCreep( roleTypes.guard, Math.random(), { role: 'guard' } );
};

Spawn.prototype.createArcher = function() {
  return this.createCreep( roleTypes.archer, Math.random(), { role: 'archer' } );
};

Spawn.prototype.createMiner = function() {
  return this.createCreep( roleTypes.miner, Math.random(), { role: 'miner' } );
};

Spawn.prototype.createMinerHelper = function() {
  return this.createCreep( roleTypes.minerHelper, Math.random(), { role: 'minerHelper' } );
};

function getNextCreepType() {
  var counts = getCreepCounts();

  if (Object.keys(Game.creeps).length === 0) {
    return 'harvester';
  }

  if (counts.minerHelper < counts.miner) {
    return 'minerHelper';
  }

  if (counts.miner <= 2) {
    return 'miner';
  }

  if (counts.guard <= 2) {
    return 'guard';
  }

  if (counts.healer / counts.guard <= .25) {
    return 'healer';
  }

  if (counts.guard / counts.miner <= 2) {
    return 'guard';
  }

  if (counts.miner < 4) {
    return 'miner';
  }
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

    var timeToWave = currentRoom.survivalInfo.timeToWave;
    var invaders = currentRoom.survivalInfo.invaders;

    if (!Game.spawns.Spawn1) {
      return;
    }

    var spawn = Game.spawns.Spawn1;
    var energy = spawn.energy;

    var type = getNextCreepType();

    var canCreateCreepResult = spawn.canCreateCreep(roleTypes[type]);

    if (canCreateCreepResult === OK) {
      switch(type) {
        case 'harvester':
          return spawn.createHarvester();
        case 'miner':
          return spawn.createMiner();
        case 'minerHelper':
          return spawn.createMinerHelper();
        case 'healer':
          return spawn.createHealer();
        case 'guard':
          return spawn.createGuard();
        case 'archer':
          return spawn.createArcher();
      }
    }
  }
};

module.exports = Spawner;
