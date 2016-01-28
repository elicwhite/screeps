var HealFriends = b3.Class(b3.Action, {
  name: 'HealFriends',

  tick: function(tick) {
    var creep = tick.target;

    var target = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
      filter: creep => creep.hits < creep.hitsMax
    });

    if(target) {
      if (creep.heal(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
        creep.rangedHeal(target);
      }

      return b3.RUNNING;
    }

    return b3.SUCCESS;
  }
});

module.exports = HealFriends;
