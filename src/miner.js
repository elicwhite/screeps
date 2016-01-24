module.exports = function (creep) {
  var sources = creep.room.find(FIND_SOURCES);
  if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
    creep.moveTo(sources[0]);
  }
}
