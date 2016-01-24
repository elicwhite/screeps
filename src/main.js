var archer = require('archer');
var harvester = require('harvester');
var healer = require('healer');
var builder = require('builder');
var guard = require('guard');
var spawner = require('spawner');
var utils = require('utils');

// var timeToWave = Game.rooms.sim.survivalInfo.timeToWave

function saveAvgGuardPosition() {
  var position = utils.findAvgPositionByCreepRoles(Game.rooms.sim, {
    roles: ['guard']
  });

  if (position) {
    Game.rooms.sim.memory.avgGuardPosition = { x: position.x, y: position.y };
    return true;
  }

  return false;
}

function calculatePointsOfInterest() {
  if (saveAvgGuardPosition()) {

  }
}

module.exports.loop = function () {
  spawner.tryBuildCreep();

  calculatePointsOfInterest();

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

