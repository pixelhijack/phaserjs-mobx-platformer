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
                    this.id = `${props.type}-${x}-${y}`;
            	}
            }
        }
    }

    return {
        create: (levelConfig) => {
            const enemy = new creatures[levelConfig.type](
                this.game,
                levelConfig.origin.x,
                levelConfig.origin.y,
                this.globalConfig.textureAtlasName,
                this.creatureConfig[levelConfig.type]
            );
            enemy.setBounds(levelConfig.boundTo);
            this.enemies.add(enemy);
        }
    };
};

export default creatureFactory;
