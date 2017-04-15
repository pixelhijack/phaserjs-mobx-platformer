import ExtendedSprite from '../components/ExtendedSprite';

class GameState{
    constructor(gameConfig) {
        this.gameConfig = gameConfig;
        this.keys = undefined;
        this.player = undefined;
        this.enemy = undefined;
        this.gameState = undefined;
    }

    init(configs){
        console.log('[PHASER][Component][Init]', configs);
    }

    preload(){
        console.log('[PHASER][Component][Preload]');
        this.game.load.image('player', 'man.png');
        this.game.load.image('dino', 'dino.png');
    }
    create(){
        console.log('[PHASER][Component][Create]');
        // fps debugging
        this.game.time.advancedTiming = true;

        // [SET LEVEL] set dimensions, start physic system
        this.game.world.setBounds(
            0,
            0,
            this.gameConfig.width,
            this.gameConfig.height
        );

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#fff';

        this.gameState = mobx.observable({
            hit: false,
            counter: 0
        });

        this.updateState = mobx.action(() => {
            this.gameState.counter++;
        });

        // [PLAYER]
        this.player = new ExtendedSprite(this.game, 200, 200, 'player', this.gameState);

        // [ENEMY]
        this.enemy = this.game.add.sprite(400, 200, 'dino');

        this.game.camera.follow(this.player);

        // bind keys
        this.keys = this.game.input.keyboard.createCursorKeys();
        this.keys.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
    update(){
        console.log('[PHASER][Component][Update]');
        // fps
        this.game.debug.text(this.game.time.fps, 5, 20);

        // move
        if(this.keys.left.isDown){
            this.player.x--;
            this.updateState();
        } else if(this.keys.right.isDown){
            this.player.x++;
        }

        // collide
        this.game.physics.arcade.collide(this.player, this.enemies, function(player, enemy){
            console.log('collision!', arguments);
        });
    }
}


module.exports = GameState;
