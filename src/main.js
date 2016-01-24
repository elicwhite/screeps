var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');

// var timeToWave = Game.rooms.sim.survivalInfo.timeToWave

var roleTypes = {
  harvester: [WORK, CARRY, MOVE],
  builder: [WORK, WORK, CARRY, MOVE],
  healer: [MOVE, HEAL],
  guard: [TOUGH, ATTACK, MOVE, MOVE]
};

Spawn.prototype.createHarvester = function() {
  var name = this.createCreep( roleTypes.harvester, Math.random(), {
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

if (!Memory.creepTypes) {
  Memory.creepTypes = [
    'harvester',
    'harvester',
    'guard',
    'harvester',
    'harvester',
    'healer',
    'guard',
    'guard',
    'guard',
    'guard',
    'guard',
    'guard'
  ];
}

var currentRoom = Game.rooms.sim;

function getCreepCounts() {
  return Object.keys(Game.creeps).reduce(function(groups, name) {
    var creep = Game.creeps[name];
    var role = creep.memory.role;

    if (!groups[role]) {
      groups[role] =  0;
    }

    groups[role]++;

    return groups;
  }, {});
}

function tryBuildCreep() {
  var creepTypes = Memory.creepTypes;
  var timeToWave = currentRoom.survivalInfo.timeToWave;
  var invaders = currentRoom.survivalInfo.invaders;

  if (!Game.spawns.Spawn1) {
    return;
  }

  var spawn = Game.spawns.Spawn1;
  var energy = spawn.energy;

  if (creepTypes.length) {
    var type = creepTypes.shift();

    var canCreateCreepResult = spawn.canCreateCreep(roleTypes[type]);

    if (canCreateCreepResult === OK) {
      switch(type) {
        case 'harvester':
          return spawn.createHarvester();
        case 'healer':
          return spawn.createHealer();
        case 'guard':
          return spawn.createGuard();
      }
    } else if (canCreateCreepResult === ERR_NOT_ENOUGH_ENERGY) {
      creepTypes.unshift(type);
    } else if (canCreateCreepResult !== ERR_BUSY) {
      console.log('Something bad happened when creating a creep. Code', canCreateCreepResult);
    }
  }
}

module.exports.loop = function () {
  tryBuildCreep();

  for(var name in Game.creeps) {
    var creep = Game.creeps[name];

    if(creep.memory.role == 'harvester') {
      harvester(creep);
    }

    if(creep.memory.role == 'builder') {
      builder(creep);
    }

    if(creep.memory.role == 'guard') {
      guard(creep);
    }
  }
}

