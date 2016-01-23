var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');

var harvesters = [];
var guards = [];

var timeToWave = Game.rooms.sim.survivalInfo.timeToWave

Spawn.prototype.createHarvester = function() {
  var name = this.createCreep( [WORK, CARRY, MOVE], Math.random(), { role: 'harvester' } );
  Game.creeps[name].memory.upgradingController = false;

  return name;
};

Spawn.prototype.createBuilder = function() {
  return this.createCreep( [WORK, WORK, CARRY, MOVE], Math.random(), { role: 'builder' } );
};

Spawn.prototype.createGuard = function() {
  return this.createCreep( [TOUGH, ATTACK, MOVE, MOVE], Math.random(), { role: 'guard' } );
};

if (!Memory.creepTypes) {
  Memory.creepTypes = [
    'harvester',
    'harvester',
    'guard',
    'harvester',
    'harvester',
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

  if (energy > 200) {
    if (creepTypes.length) {
      var type = creepTypes.shift();
      switch(type) {
        case 'harvester':
          return spawn.createHarvester();
        case 'guard':
          return spawn.createGuard();
      }
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

