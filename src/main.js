var archer = require('archer');
var harvester = require('harvester');
var healer = require('healer');
var builder = require('builder');
var guard = require('guard');
var spawner = require('spawner');

// var timeToWave = Game.rooms.sim.survivalInfo.timeToWave

module.exports.loop = function () {
  spawner.tryBuildCreep();

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

