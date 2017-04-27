import globalConfig from './globalConfig.js';
import Menu from './gamestates/menu/index.js';
import Play from './gamestates/play/index.js';

// instantiate a Phaser.Game
const PLATFORMER = new Phaser.Game(
    globalConfig.width,
    globalConfig.height,
    Phaser.AUTO,
    globalConfig.domElement
);

// register gamestates (will be instantiated w/ this.game as 1st param, pass gameConfig as 2nd)
PLATFORMER.state.add('Menu', Menu.bind(null, globalConfig));
PLATFORMER.state.add('Play', Play.bind(null, globalConfig));

PLATFORMER.state.start('Menu', true, true);
