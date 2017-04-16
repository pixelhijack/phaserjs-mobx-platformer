class ExtendedSprite extends Phaser.Sprite{
    constructor(game, x, y, sprite){
        super(game, x, y, sprite)
        this.game = game;
        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.setTo(0.5, 0.5);
        this.body.collideWorldBounds = true;
        this.checkWorldBounds = true;
        this.body.gravity.y = 500;

        const gameState = this.game.state.states[this.game.state.current].gameState;
        mobx.observe(gameState, change => {
            console.log('change', change, gameState);
        });
        this.spriteState = mobx.observable({
            life: 10,
            stun: 0
        });
        this.updateState = mobx.action((change) => {
            this.spriteState = Object.assign(this.spriteState, change);
            console.log('[%s] life: ', sprite, this.spriteState.life);
        });
    }

    jump(){
        if(this.body.touching.down || this.body.blocked.down){
            this.body.velocity.y -= 300;
        }
    }

    update(){
        //console.log('[Sprite] state');
    }
};

export default ExtendedSprite;
