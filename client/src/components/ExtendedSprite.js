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
    }

    update(){
        //console.log('[Sprite] state');
    }
};

export default ExtendedSprite;
