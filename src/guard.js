module.exports = function (creep) {
  var targets = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
    filter: enemy => enemy.owner.username !== 'Source Keeper'
  });

  if(targets.length) {
    if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0]);
    }
  }
};
