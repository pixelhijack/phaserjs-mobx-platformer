import bat from '../components/creatures/bat.js';
import bear from '../components/creatures/bear.js';
import bug from '../components/creatures/bug.js';
import dino from '../components/creatures/dino.js';
import dragonfly from '../components/creatures/dragonfly.js';
import frog from '../components/creatures/frog.js';
import gorilla from '../components/creatures/gorilla.js';
import insect from '../components/creatures/insect.js';
import jelly from '../components/creatures/jelly.js';
import native from '../components/creatures/native.js';
import parrot from '../components/creatures/parrot.js';
import ptero from '../components/creatures/ptero.js';
import spider from '../components/creatures/spider.js';
import tiger from '../components/creatures/tiger.js';
import turtle from '../components/creatures/turtle.js';

import AI from '../components/AI';

function creatureFactory() {
    const Creature = {
        bat: bat,
        bear: bear,
        bug: bug,
        dino: dino,
        dragonfly: dragonfly,
        frog: frog,
        gorilla: gorilla,
        insect: insect,
        jelly: jelly,
        native: native,
        parrot: parrot,
        ptero: ptero,
        spider: spider,
        tiger: tiger,
        turtle: turtle
    };

    return {
        create: (levelConfig) => {
            const enemy = new AI(
                this.game,
                levelConfig.origin.x,
                levelConfig.origin.y,
                this.globalConfig.textureAtlasName,
                this.creatureConfig[levelConfig.type],
                this.creatureConfig[levelConfig.type].behaviours
            );
            enemy.setBounds(levelConfig.boundTo);
            this.enemies.add(enemy);
        }
    };
};

export default creatureFactory;
