var archer = require('archer');
var harvester = require('harvester');
var healer = require('healer');
var builder = require('builder');
var guard = require('guard');

// var timeToWave = Game.rooms.sim.survivalInfo.timeToWave

var roleTypes = {
  harvester: [WORK, CARRY, MOVE],
  builder: [WORK, WORK, CARRY, MOVE],
  healer: [MOVE, HEAL],
  guard: [TOUGH, ATTACK, MOVE, MOVE],
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

function getNextCreepType() {
  var counts = getCreepCounts();

  if (counts.harvester <= 2) {
    return 'harvester';
  }

  if (counts.guard <= 2) {
    return 'guard';
  }

  if (counts.healer / counts.guard <= .25) {
    return 'healer';
  }

  if (counts.guard / counts.harvester <= 2) {
    return 'guard';
  }

  if (counts.harvester < 10) {
    return 'harvester';
  }
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
  }, {
    harvester: 0,
    guard: 0,
    healer: 0
  });
}

function tryBuildCreep() {
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
      case 'healer':
        return spawn.createHealer();
      case 'guard':
        return spawn.createGuard();
      case 'archer':
        return spawn.createArcher();
    }
  }
}

module.exports.loop = function () {
  tryBuildCreep();

  for(var name in Game.creeps) {
    var creep = Game.creeps[name];

    if(creep.memory.role == 'archer') {
      archer(creep);
    }

    if(creep.memory.role == 'harvester') {
      harvester(creep);
    }

    if(creep.memory.role == 'healer') {
      healer(creep);
    }

    if(creep.memory.role == 'builder') {
      builder(creep);
    }

    if(creep.memory.role == 'guard') {
      guard(creep);
    }
  }
}

