global.b3 = {};
var behavior = require('./b3core.0.1.0.js');
var spawner = require('./spawner');
var CreepMemory = require('./creep_memory');
var CreepMemSequence = require('./actions/creep_mem_sequence');
var RoleCheck = require('./actions/role_check');
var PickupDroppedResources = require('./actions/pickup_dropped_resources');
var HarvestSource = require('./actions/harvest_source');
var TransferEnergyToSpawn = require('./actions/transfer_energy_to_spawn');

var tree = new b3.BehaviorTree();

tree.root = new b3.Priority({children: [
  new b3.MemSequence({
    children: [
      new RoleCheck({
        role: 'harvester'
      }),
      new b3.MemSequence({
        children: [
          new HarvestSource(),
          new TransferEnergyToSpawn()
        ]
      })
    ]
  }),
  new b3.MemSequence({
    children: [
      new RoleCheck({
        role: 'miner'
      }),
      new b3.MemSequence({
        children: [
          new HarvestSource()
        ]
      })
    ]
  }),
  new b3.MemSequence({
    children: [
      new RoleCheck({
        role: 'minerHelper'
      }),
      new b3.MemSequence({
        children: [
          new PickupDroppedResources(),
          new TransferEnergyToSpawn()
        ]
      })
    ]
  })
]});

var blackboard = new CreepMemory();

// var minerHelper = require('./miner_helper');
// var healer = require('./healer');
// var builder = require('./builder');
// var guard = require('./guard');

// var memoryUtils = require('./memory_utils');

// var timeToWave = Game.rooms.sim.survivalInfo.timeToWave

// memoryUtils.clearMemoryForTick();
spawner.tryBuildCreep();

var treeId = tree.id;

for(var name in Game.creeps) {
  var creep = Game.creeps[name];
  tree.id = treeId + creep.name;
  tree.tick(creep, blackboard);
}

//   if(creep.memory.role == 'minerHelper') {
//     minerHelper(creep);
//   }

//   if(creep.memory.role == 'healer') {
//     healer(creep);
//   }

//   if(creep.memory.role == 'builder') {
//     builder(creep);
//   }

//   if(creep.memory.role == 'guard') {
//     guard(creep);
//   }
// }

