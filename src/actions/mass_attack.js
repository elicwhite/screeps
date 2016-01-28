var MassAttack = b3.Class(b3.Action, {
  name: 'MassAttack',

  tick: function(tick) {
    var creep = tick.target;

    var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
    if(targets.length >= 2) {
      creep.rangedMassAttack();
    }

    return b3.SUCCESS;
  }
});

module.exports = MassAttack;
