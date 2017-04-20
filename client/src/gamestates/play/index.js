import AI from '../../components/AI';
import Human from '../../components/Human';

import levelLoader from '../../services/levelLoader';

import init from './play.init';
import preload from './play.preload';
import create from './play.create';
import update from './play.update';

class GameState {
    constructor(globalConfig) {
        this.keys = undefined;
        this.player = undefined;
        this.enemy = undefined;
        this.gameState = undefined;
        this.level = {
            backgroundLayer: undefined,
            groundLayer: undefined,
            tilemap: undefined
        };
        
        this.globalConfig = globalConfig;
        this.levelLoader = levelLoader.call(this);
    }
}

GameState.prototype.init = init;
GameState.prototype.preload = preload;
GameState.prototype.create = create;
GameState.prototype.update = update;

module.exports = GameState;
