var harvester = require('harvester');
var miner = require('miner');
var minerHelper = require('miner_helper');
var healer = require('healer');
var builder = require('builder');
var guard = require('guard');
var spawner = require('spawner');
var memoryUtils = require('memory_utils');

// var timeToWave = Game.rooms.sim.survivalInfo.timeToWave

module.exports.loop = function () {
  memoryUtils.clearMemoryForTick();
  spawner.tryBuildCreep();

  for(var name in Game.creeps) {
    var creep = Game.creeps[name];

    if(creep.memory.role == 'harvester') {
      harvester(creep);
    }

    if(creep.memory.role == 'miner') {
      miner(creep);
    }

    if(creep.memory.role == 'minerHelper') {
      minerHelper(creep);
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

