global.b3 = {};
var behavior = require('./b3core.0.1.0.js');
var spawner = require('./spawner');
var CreepMemory = require('./creep_memory');
var CreepMemSequence = require('./actions/creep_mem_sequence');
var RoleCheck = require('./actions/role_check');
var PickupDroppedResources = require('./actions/pickup_dropped_resources');
var HarvestSource = require('./actions/harvest_source');
var TransferEnergyToSpawn = require('./actions/transfer_energy_to_spawn');
var KeepAwayFromEnemies = require('./actions/keep_away_from_enemies');
var HealFriends = require('./actions/heal_friends');
var MoveToAvgGuardPosition = require('./actions/move_to_avg_guard_position');
var IsEnemyInRoom = require('./actions/is_enemy_in_room');
var MassAttack = require('./actions/mass_attack');
var AttackEnemies = require('./actions/attack_enemies');

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
  }),
  new b3.MemSequence({
    children: [
      new RoleCheck({
        role: 'healer'
      }),
      new b3.MemSequence({
        children: [
          new HealFriends(),
          new MoveToAvgGuardPosition()
        ]
      })
    ]
  }),
  new b3.MemSequence({
    children: [
      new RoleCheck({
        role: 'guard'
      }),
      new b3.Priority({
        children: [
          new b3.Sequence({
            children: [
              new IsEnemyInRoom(),
              new MassAttack(),
              new AttackEnemies()
            ]
          }),
          new MoveToAvgGuardPosition()
        ]
      })
    ]
  })
]});

var blackboard = new CreepMemory();

// var builder = require('./builder');

var memoryUtils = require('./memory_utils');

// var timeToWave = Game.rooms.sim.survivalInfo.timeToWave

memoryUtils.clearMemoryForTick();
spawner.tryBuildCreep();

var treeId = tree.id;

for(var name in Game.creeps) {
  var creep = Game.creeps[name];
  tree.id = treeId + creep.name;
  tree.tick(creep, blackboard);
}

//   if(creep.memory.role == 'builder') {
//     builder(creep);
//   }

// }

