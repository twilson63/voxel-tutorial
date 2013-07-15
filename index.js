var createGame = require('voxel-engine');

var game = createGame({
  materials: ['grass', 'yellow'],
  generate: function(x, y, z) {
    if (y === 5 && x === 5 && z === 5) { return 2; }
    if (y === 4 && (x > 3 && x < 7) && (z > 3 && z < 7)) { return 2; }
    if (y === 3 && (x > 2 && x < 8) && (z > 2 && z < 8)) { return 2; }
    if (y === 2 && (x > 1 && x < 9) && (z > 1 && z < 9)) { return 2; }
    if (y === 1 && (x > 0 && x < 10) && (z > 0 && z < 10)) { return 2; }
    return y === 0 ? 1 : 0
  }
});

game.appendTo(document.body);

var player = require('voxel-player');
var createPlayer = player(game);

var avatar = createPlayer('player.png');
avatar.possess();
avatar.yaw.position.set(0,1, 4);