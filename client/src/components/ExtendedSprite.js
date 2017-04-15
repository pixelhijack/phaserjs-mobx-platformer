class ExtendedSprite extends Phaser.Sprite{
    constructor(game, x, y, sprite, gameState){
        super(game, x, y, sprite)
        this.game = game;
        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.setTo(0.5, 0.5);
        this.body.collideWorldBounds = true;
        this.checkWorldBounds = true;
        mobx.observe(gameState, change => {
            console.log('change', change, gameState);
        });
        this.spriteState = mobx.observable({
            life: 10
        });
        this.updateState = mobx.action((change) => {
            this.spriteState = Object.assign(this.spriteState, change);
            console.log('[%s] life: ', sprite, this.spriteState.life);
        });
    }

    update(){
        //console.log('[Sprite] state');
    }
};

export default ExtendedSprite;
