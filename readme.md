# Voxel Game Engine Example

I got some time this weekend to spend with VoxelJs, and it is a lot of fun, but it is new and I wanted to share some of the things I learned as I was getting up to speed on the engine.

First: RTFM (Read the freaking manual), I thought the video and walk through was good enough, but reading the readme of the https://github.com/maxogden/voxel-engine give you a better perspective of the api.

After reading the manual, I still struggled fully understanding what was going on and after spending time studing the https://github.com/maxogden/voxel-hello-world, it finally clicked, __I was missing the png files and setting the materials.___

In the default game options the textures are pulled from the /textures folder, if you do not have the png's in that folder the game engine will not be able to skins for your voxels.

Here is a step by step tutorial on creating a flat world.

## The Setup

* Install NodeJS
* Install browservefy - npm install browservefy -g

Browservefy will be our web server that will serve our voxel game, without having to create a dummy html page.

create your project

``` sh
mkdir voxel-1
cd voxel-1
npm init
npm install voxel-engine --save
touch index.js
```
open index.js

``` js
var createGame = require('voxel-engine');
var game = createGame();
game.appendTo(document.body);
```

now you should be able to run the server using `browservefy`

``` sh
browservefy ./index.js 3000
```

This will convert your index.js to a bundle.js file for front end js and serve an template html file that wraps the bundle.js file into the body.  Also, as you make changes to your index.js file, the browservefy will notice and rebuild the bundle.js as you save your index file.

Hopefully, your game loaded and ran in the browser, but you probaly did not see much, because we have not done much yet.

Before we start to generate terrain, we need to get some textures.

``` sh
mkdir textures
cd textures
curl -O https://dl.dropboxusercontent.com/u/14239864/textures.zip
unzip textures.zip
```

Now that we have our texture images, we need to generate our floor for the game.

When we call createGame, we can pass a javascript object in the constructor as options, two of those options is: `materials` and `generate`.  `materials` takes an array of texture names.  These names must correspond with the png files in the texture.  `generate` takes a function that will be called for every voxel that is created, and we need to return a 0 if we do not want to set the block, and a 1, if we want to set the block as the first material, a 2 if we want to set the block as the second marterial, etc.  In this example, we are just going to create floor using the grass material.

edit index.js

```
var game = createGame({
  materials: ['grass', 'yellow'],
  generate: function(x, y, z) {
    return y === 0 ? 1 : 0;
  }
});
```

## Lets build a pryamid

Ok, now that we have a floor, lets build a pryamid:

So in the generate message lets set the block to 2 for the voxels we want to take on the pryamid shape:

``` js
var game = createGame({
  materials: ['grass', 'yellow'],
  generate: function(x, y, z) {
  if (y === 5 && x === 5 && z === 5) { return 2; }
  if (y === 4 && (x > 3 && x < 7) && (z > 3 && z < 7)) { return 2; }
  if (y === 3 && (x > 2 && x < 8) && (z > 2 && z < 8)) { return 2; }
  if (y === 2 && (x > 1 && x < 9) && (z > 1 && z < 9)) { return 2; }
  if (y === 1 && (x > 0 && x < 10) && (z > 0 && z < 10)) { return 2; }
  return y === 0 ? 1 : 0;
  }
});
```

So the entire index.js should look like this:

``` js
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
```

## Add a player

Now we have to add a player to run around in our world.

First we need to download a player skin:

``` sh
curl -O https://dl.dropboxusercontent.com/u/14239864/player.png
```

Now we need to install the voxel-player module in our project:

``` sh
npm install voxel-player --save
```

Add the player to our game:

``` js
var player = require('voxel-player');
var createPlayer = player(game);

var avatar = createPlayer('player.png');
avatar.possess();
avatar.yaw.position.set(0,1, 4);
```
Now you can fire up browservefy and nav to localhost:3000.

Hopefully, you are up and running in voxel js with a little pyramid to hope on.

Here is the whole index.js file.

``` js
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
```

## LICENSE

MIT

## Contributions

Pull Request welcome.

