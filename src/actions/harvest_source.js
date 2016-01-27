var HarvestSource = b3.Class(b3.Action, {
  name: 'HarvestSource',

  tick: function(tick) {
    var creep = tick.target;

    if(creep.carryCapacity === 0 || creep.carry.energy < creep.carryCapacity) {
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }

      return b3.RUNNING;
    }

    return b3.SUCCESS;
  }
});

module.exports = HarvestSource;
