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

// kick off first gamestate: Menu
PLATFORMER.state.start('Play', true, true, {
    initialState: 'some initial state'
});
