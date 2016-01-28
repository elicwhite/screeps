var KeepAwayFromEnemies = b3.Class(b3.Action, {
  name: 'KeepAwayFromEnemies',

  initialize: function(settings) {
    if (!settings || !settings.distance) {
      throw new Error('distance must be defined for KeepAwayFromEnemies');
    }

    b3.Condition.prototype.initialize.call(this);
    this.distance = settings.distance;
  },

  tick: function(tick) {
    var creep = tick.target;

    const target = creep.pos.findClosestByPath(Game.HOSTILE_CREEPS);
    if(target !== null && target.pos.inRangeTo(creep.pos, this.distance)) {
      creep.moveTo(creep.pos.x + creep.pos.x - target.pos.x, creep.pos.y + creep.pos.y - target.pos.y );

      return b3.RUNNING;
    }

    return b3.SUCCESS;
  }
});

module.exports = KeepAwayFromEnemies;
