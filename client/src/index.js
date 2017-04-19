import gameConfig from './gameconfig.js';
import Play from './gamestates/play/index.js';

// instantiate a Phaser.Game
const PLATFORMER = new Phaser.Game(
    gameConfig.width,
    gameConfig.height,
    Phaser.AUTO,
    gameConfig.domElement
);

// register gamestates (will be instantiated w/ this.game as 1st param, pass gameConfig as 2nd)
PLATFORMER.state.add('Play', Play.bind(null, gameConfig));

fetch('/level/1', {
    method: 'GET'
}).then(function(response) {
    return response.json();
}).then(function(levelConfig) {
    PLATFORMER.state.start('Play', true, true, levelConfig);
});
