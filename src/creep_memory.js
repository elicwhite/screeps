function CreepMemory() {
  if (!Memory._treeMemory) {
    Memory._treeMemory = {};
    Memory._baseMemory = {};
  }
}

CreepMemory.prototype = {
  _getTreeMemory: function(treeScope) {
    if (!Memory._treeMemory[treeScope]) {
      Memory._treeMemory[treeScope] = {
        'nodeMemory'     : {},
        'openNodes'      : [],
        'traversalDepth' : 0,
        'traversalCycle' : 0,
      };
    }

    return Memory._treeMemory[treeScope];
  },

  _getNodeMemory: function(treeMemory, nodeScope) {
    var memory = treeMemory.nodeMemory;
    if (!memory[nodeScope]) {
      memory[nodeScope] = {};
    }

    return memory[nodeScope];
  },

  _getMemory: function(treeScope, nodeScope, creepScope) {
    var memory = Memory._baseMemory;

    if (treeScope) {
      memory = this._getTreeMemory(treeScope);

      if (nodeScope) {
        memory = this._getNodeMemory(memory, nodeScope);
      }
    }

    return memory;
  },

  set: function(key, value, treeScope, nodeScope) {
    var memory = this._getMemory(treeScope, nodeScope);
    memory[key] = value;
  },

  get: function(key, treeScope, nodeScope) {
    var memory = this._getMemory(treeScope, nodeScope);
    return memory[key];
  }
}

module.exports = CreepMemory;
