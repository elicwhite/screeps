var AttackEnemies = b3.Class(b3.Action, {
  name: 'AttackEnemies',

  tick: function(tick) {
    var creep = tick.target;

    var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
      filter: enemy => enemy.owner.username !== 'Source Keeper'
    });

    if(target) {
      if(creep.attack(target) == ERR_NOT_IN_RANGE) {
        if (creep.moveTo(target) !== OK) {
          creep.rangedAttack(target);
        }
      }

      return b3.RUNNING;
    }

    return b3.SUCCESS;
  }
});

module.exports = AttackEnemies;
