import AI from '../components/AI';

function creatureFactory() {
    const creatures = {
        bat: 'bat',
        bear: 'bear',
        bug: 'bug',
        dino: 'dino',
        dragonfly: 'dragonfly',
        frog: 'frog',
        gorilla: 'gorilla',
        insect: 'insect',
        jelly: 'jelly',
        native: 'native',
        parrot: 'parrot',
        ptero: 'ptero',
        spider: 'spider',
        tiger: 'tiger',
        turtle: 'turtle'
    };

    for(let creature in creatures){
        if(creatures.hasOwnProperty(creature)){
            creatures[creature] = class creature extends AI {
                constructor(game, x, y, sprite, props){
            	    super(game, x, y, sprite, props);
            	}
            }
        }
    }

    return {
        create: (creatureConfig) => {
            const enemy = new creatures[creatureConfig.type](
                this.game,
                creatureConfig.origin.x,
                creatureConfig.origin.y,
                this.globalConfig.textureAtlasName,
                this.creatureConfig[creatureConfig.type]
            );
            this.enemies.add(enemy);
        }
    };
};

export default creatureFactory;
