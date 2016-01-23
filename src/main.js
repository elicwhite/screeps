// Game.spawns.Spawn1.createCreep( [WORK, CARRY, MOVE], 'Worker1' );
// Game.spawns.Spawn1.createCreep( [WORK, WORK, CARRY, MOVE], 'Builder1' );
// module.exports.loop = function () {
//   var creep = Game.creeps.Worker1;
//   var sources = creep.room.find(FIND_SOURCES);
//   if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
//     creep.moveTo(sources[0]);
//   }
// }


// Memory.creeps.Worker1.role = 'harvester';
// Memory.creeps.Worker2.role = 'harvester';
// Memory.creeps.Builder1.role = 'builder';


var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');

// Game.spawns.Spawn1.createCreep( [TOUGH, ATTACK, MOVE, MOVE], 'Guard1', { role: 'guard' } );

var harvesters = [];
var guards = [];

var timeToWave = Game.rooms.sim.survivalInfo.timeToWave

Spawn.prototype.createHarvester = function() {
  return this.createCreep( [WORK, CARRY, MOVE], Math.random(), { role: 'harvester' } );
};

Spawn.prototype.createBuilder = function() {
  return this.createCreep( [WORK, WORK, CARRY, MOVE], Math.random(), { role: 'builder' } );
};

Spawn.prototype.createGuard = function() {
  return this.createCreep( [TOUGH, ATTACK, MOVE, MOVE], Math.random(), { role: 'guard' } );
};


var currentRoom = Game.rooms.sim;

function tryBuildCreep() {
  var timeToWave = currentRoom.survivalInfo.timeToWave;
  var invaders = currentRoom.survivalInfo.invaders;

  var spawn = Game.spawns.Spawn1;
  var energy = spawn.energy;

  if (energy > 200) {
    spawn.createHarvester();
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

