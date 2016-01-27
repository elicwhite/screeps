var RoleCheck = b3.Class(b3.Condition);

RoleCheck.prototype.name = 'RoleCheck';

RoleCheck.prototype.initialize = function(settings) {
  if (!settings || !settings.role) {
    throw new Error('role must be defined for RoleCheck');
  }

  b3.Condition.prototype.initialize.call(this);
  this.role = settings.role;
},

RoleCheck.prototype.tick = function(tick) {
  var creep = tick.target;

  if (creep.memory.role === this.role) {
    return b3.SUCCESS;
  }

  return b3.FAILURE;
}

module.exports = RoleCheck;
