class Item extends Phaser.Sprite{
    constructor(game, x, y, sprite, props){
        super(game, x, y, sprite);
        this.game = game;
        this.props = props || { animations: [] };
        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.setTo(0.5, 1);
        this.body.gravity.y = 0;
        this.allowGravity = false;
        this.body.immovable = true;

        this.props.animations.forEach(animation => {
            this.animations.add(
                animation.name,
                animation.frames.map(frame => frame.toString()),
                animation.fps,
                animation.loop
            );
        });
    }

    update(){
        this.animations.play('idle');
    }
};

export default Item;
