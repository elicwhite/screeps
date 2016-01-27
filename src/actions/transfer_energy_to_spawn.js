var TransferEnergyToSpawn = b3.Class(b3.Action);
TransferEnergyToSpawn.prototype.name = 'TransferEnergyToSpawn';
TransferEnergyToSpawn.prototype.tick = function(tick) {
  var creep = tick.target;

  if (!Game.spawns.Spawn1) {
    return b3.FAILURE;
  }

  if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(Game.spawns.Spawn1);
    return b3.RUNNING;
  }

  return b3.SUCCESS;
}

module.exports = TransferEnergyToSpawn;
