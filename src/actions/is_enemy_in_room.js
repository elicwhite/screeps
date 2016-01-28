Memory.tick = Memory.tick || {};
Memory.tick.isEnemyInRoom = undefined;

var IsEnemyInRoom = b3.Class(b3.Condition, {
  name: 'IsEnemyInRoom',

  tick: function(tick) {
    if (!Memory.tick.isEnemyInRoom) {
      var hostileCreeps = Game.rooms.sim.find(FIND_HOSTILE_CREEPS, {
        filter: enemy => enemy.owner.username !== 'Source Keeper'
      });

      if (hostileCreeps.length) {
        Memory.tick.isEnemyInRoom = true;
      } else {
        Memory.tick.isEnemyInRoom = false;
      }
    }

    if(Memory.tick.isEnemyInRoom) {
      return b3.SUCCESS;
    }

    return b3.FAILURE;
  }
});

module.exports = IsEnemyInRoom;
