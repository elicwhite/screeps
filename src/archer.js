const utils = require('utils');

module.exports = function (creep) {
  utils.keepAwayFromEnemies(creep, {
    distance: 1
  });

  var targets = creep.room.find(FIND_HOSTILE_CREEPS, {
    filter: enemy => enemy.owner.username !== 'Source Keeper'
  });

  if(targets.length) {
    if(creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0]);
    }
  }
};
