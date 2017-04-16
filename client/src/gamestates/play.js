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
            initialised: false,
            score: 0
        });

        this.updateState = mobx.action((change) => {
            this.gameState = Object.assign(this.gameState, change);
        });

        mobx.observe(this.gameState, change => {
            console.log('[gameState] change', change, this.gameState);
        });

        this.updateState({ initialised: true });

        // [PLAYER]
        this.player = new ExtendedSprite(this.game, 200, 200, 'player');

        // [ENEMY]
        this.enemy = new ExtendedSprite(this.game, 400, 200, 'dino');
        this.enemy.body.velocity.x = Math.random() * (-10) - 10;

        this.game.camera.follow(this.player);

        // bind keys
        this.keys = this.game.input.keyboard.createCursorKeys();
        this.keys.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // score text
        this.menu = this.game.add.text(
            150,
            0,
            "Life: " + this.player.spriteState.life,
            { font: "24px Courier", fill: "#000", align: "center" }
        );
        this.setMenu = life => {
            this.menu.setText("Life: " + life);
        };
        mobx.observe(this.player.spriteState, change => {
            this.setMenu(this.player.spriteState.life);
        });
    }
    update(){
        console.log('[PHASER][Component][Update]');
        // fps
        this.game.debug.text(this.game.time.fps, 5, 20);

        // move
        if(this.keys.left.isDown){
            this.player.body.velocity.x--;
        } else if(this.keys.right.isDown){
            this.player.body.velocity.x++;
        }

        if(this.keys.up.isDown){
            this.player.jump();
        }

        // collide
        this.game.physics.arcade.overlap(this.player, this.enemy, (player, enemy) => {
            console.log('collision!', arguments);
            this.player.updateState({ life: this.player.spriteState.life - 1 });
        });
    }
}


module.exports = GameState;
