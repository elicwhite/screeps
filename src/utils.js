function averagePositionForCreeps(creeps) {
  var sumX = 0;
  var sumY = 0;

  creeps.forEach(function(creep) {
    sumX += creep.pos.x;
    sumY += creep.pos.y;
  });

  sumX /= creeps.length;
  sumY /= creeps.length;

  return creeps[0].room.getPositionAt(Math.round(sumX), Math.round(sumY));
}

const Utils = {
  keepAwayFromEnemies: function(creep, { distance = 3 } = {}) {
    const target = creep.pos.findClosestByPath(Game.HOSTILE_CREEPS);
    if(target !== null && target.pos.inRangeTo(creep.pos, distance)) {
      creep.moveTo(creep.pos.x + creep.pos.x - target.pos.x, creep.pos.y + creep.pos.y - target.pos.y );
    }
  },

  findAvgPositionByCreepRoles: function(room, { roles = [] }) {
    var creeps = room.find(FIND_MY_CREEPS, {
      filter: function(creep) {
        return roles.includes(creep.memory.role);
      }
    });

    if (creeps.length) {
      return averagePositionForCreeps(creeps);
    }
  }
};

module.exports = Utils;
