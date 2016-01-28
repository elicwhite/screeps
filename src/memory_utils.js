var utils = require('./utils');

var MemoryUtils = {
  clearMemoryForTick: function() {
    Memory.tick = {};
  },

  getAvgGuardPosition: function() {
    if (!Memory.tick || !Memory.tick.avgGuardPosition) {
      var position = utils.findAvgPositionByCreepRoles(Game.rooms.sim, {
        roles: ['guard']
      });

      if (position) {
        Memory.tick.avgGuardPosition = { x: position.x, y: position.y };
      }
    }

    if (Memory.tick.avgGuardPosition) {
      return Memory.tick.avgGuardPosition;
    }
  }
};

module.exports = MemoryUtils;
