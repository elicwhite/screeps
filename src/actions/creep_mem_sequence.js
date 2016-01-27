var CreepMemSequence = b3.Class(b3.Composite, {
  name: 'CreepMemSequence',

  open: function(tick) {
    tick.blackboard.set('runningChild', 0, tick.tree.id, this.id, tick.target.name);
  },

  tick: function(tick) {
    var creep = tick.target;

    var child = tick.blackboard.get('runningChild', tick.tree.id, this.id, creep.name);
    for (var i=child; i<this.children.length; i++) {
      var status = this.children[i]._execute(tick);

      if (status !== b3.SUCCESS) {
        if (status === b3.RUNNING) {
          tick.blackboard.set('runningChild', i, tick.tree.id, this.id, creep.name);
        }
        return status;
      }
    }

    return b3.SUCCESS;
  }
});

module.exports = CreepMemSequence;
