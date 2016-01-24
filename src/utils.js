const Utils = {
  keepAwayFromEnemies: function(creep, { distance = 3 } = {}) {
    const target = creep.pos.findClosestByPath(Game.HOSTILE_CREEPS);
    if(target !== null && target.pos.inRangeTo(creep.pos, distance)) {
      creep.moveTo(creep.pos.x + creep.pos.x - target.pos.x, creep.pos.y + creep.pos.y - target.pos.y );
    }
  }
};

module.exports = Utils;
