import AI from '../components/AI';
import Human from '../components/Human';

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
        this.game.load.atlas(
            'pre2atlas',
            'pre2atlas.png',
            'pre2atlas.json',
            Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
        );
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
        this.player = new Human(this.game, 200, 200, 'pre2atlas', {
            acceleration: 10,
            maxSpeed: 200,
            animations: [
              { name: 'move', frames: [11,'03','05',14,20], fps: 10, loop: false },
              { name: 'hit', frames: [22,24,28,31,34,22,24,28,31,34], fps: 10, loop: true },
              { name: 'stop', frames: [42,45,49,52], fps: 10, loop: false },
              { name: 'jump', frames: [16,41,47,50,50,50,50,50,50,50,50,13,50,13,50,13], fps: 10, loop: false },
              { name: 'idle', frames: [25,25,25,25,25,25,25,25,27,27,27,27,25,25,25,25,25,25,25,25,30,25,25,25,25,25,25,25,25,27,30,27,30,35,36,25,25,25,25,25,25,25,25,'07','07','07','07','02','02'], fps: 5, loop: true },
              { name: 'hurt', frames: [19], fps: 10, loop: true },
              { name: 'stun', frames: [19], fps: 10, loop: true },
              { name: 'die', frames: [19], fps: 10, loop: false },
              { name: 'spawn', frames: [11,'03','05',14,20], fps: 10, loop: false }
            ]
        });

        // [ENEMY]
        this.enemy = new AI(this.game, 400, 200, 'dino');
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
        mobx.observe(this.player.spriteState, change => {
            this.menu.setText("Life: " + this.player.spriteState.life);
        });
    }
    update(){
        //console.log('[PHASER][Component][Update]');
        // fps
        this.game.debug.text(this.game.time.fps, 5, 20);

        // move
        this.onKeyPress();

        // collide
        this.game.physics.arcade.overlap(this.player, this.enemy, (player, enemy) => {
            if(!this.player.isHitting && !this.player.isStunned){
                this.player.updateState({
                    life: this.player.spriteState.life - 1,
                    stun: this.game.time.now + 1500
                });
                this.player.hurt(enemy.body.touching);
            }
        });
    }
    onKeyPress(){
        // stun => blocked
        if(this.player.isStunned){
            this.player.animations.play('stun');
            return;
        }

        // move left / right
        if(this.keys.left.isDown){
            this.player.moveLeft();
            this.player.animations.play('move');
        } else if(this.keys.right.isDown){
            this.player.moveRight();
            this.player.animations.play('move');
        } else {
            this.player.stop();
            this.player.animations.play('idle');
        }

        // jump
        if(this.keys.up.isDown){
            this.player.jump();
            this.player.animations.play('jump');
        }

        // hit
        if(this.keys.space.isDown){
            if(this.player.spriteState.nohit < this.game.time.now && this.player.spriteState.hit < this.game.time.now){
                this.player.hit();
                this.player.animations.play('hit');
            }
        }
    }
}

module.exports = GameState;
