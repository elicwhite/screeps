var PickupDroppedResources = b3.Class(b3.Action, {
  name: 'PickupDroppedResources',

  tick: function(tick) {
    var creep = tick.target;

    if(creep.carry.energy < creep.carryCapacity) {
      var energy = creep.room.find(FIND_DROPPED_RESOURCES)[0]
      if (creep.pickup(energy) === ERR_NOT_IN_RANGE) {
        creep.moveTo(energy);
      }

      return b3.RUNNING;
    }

    return b3.SUCCESS;
  }
});

module.exports = PickupDroppedResources;
