var utils = require('./utils');

var MemoryUtils = {
  clearMemoryForTick: function() {
    Memory.tick = {};
  },

  isEnemyInRoom: function() {
    if (!Memory.tick || !Memory.tick.isEnemyInRoom) {
      var hostileCreeps = Game.rooms.sim.find(FIND_HOSTILE_CREEPS, {
        filter: enemy => enemy.owner.username !== 'Source Keeper'
      });

      if (hostileCreeps.length) {
        Memory.tick.isEnemyInRoom = true;
      } else {
        Memory.tick.isEnemyInRoom = false;
      }
    }

    return Memory.tick.isEnemyInRoom;
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
