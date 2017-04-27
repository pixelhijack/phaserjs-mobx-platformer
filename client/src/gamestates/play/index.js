import AI from '../../components/AI';
import Human from '../../components/Human';

import levelLoader from '../../services/levelLoader';
import creatureFactory from '../../services/creatureFactory';
import creatureConfig from '../../components/creatureconfig';

import init from './play.init';
import preload from './play.preload';
import create from './play.create';
import update from './play.update';

class Play {
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
        this.creatureConfig = creatureConfig;
        this.levelLoader = levelLoader.call(this);
        this.creatureFactory = creatureFactory.call(this);
    }
}

Play.prototype.init = init;
Play.prototype.preload = preload;
Play.prototype.create = create;
Play.prototype.update = update;

module.exports = Play;
