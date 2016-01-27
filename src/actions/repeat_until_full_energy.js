var RepeatUntilFullEnergy = b3.Class(b3.Decorator, {
  name: 'RepeatUntilFullEnergy',

  tick: function(tick) {
    if (!this.child) {
      return b3.ERRROR;
    }

    var creep = tick.target;

    if (creep.carry.energy >= creep.carryCapacity) {
      return b3.SUCCESS;
    }

    const status = this.child._execute(tick);

    if (status === b3.SUCCESS) {
       if (creep.carry.energy >= creep.carryCapacity) {
          return b3.SUCCESS;
       }

       return b3.RUNNING;
    }

    return status;
  }

});

module.exports = RepeatUntilFullEnergy;
