class ExtendedSprite extends Phaser.Sprite{
    constructor(game, x, y, sprite, props){
        super(game, x, y, sprite)
        this.game = game;
        this.props = props;
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

    moveLeft(){
        this.scale.x = -1;
        if(this.body.velocity.x > -this.props.maxSpeed){
            this.body.velocity.x -= this.props.acceleration;
        }
    }

    moveRight(){
        this.scale.x = 1;
        if(this.body.velocity.x < this.props.maxSpeed){
            this.body.velocity.x += this.props.acceleration;
        }
    }

    move(){
        if(this.scale.x === 1){
            this.moveRight();
        } else {
            this.moveLeft();
        }
    }

    stop(){
        this.body.velocity.x /= 1.1;
    }

    jump(){
        if(this.body.touching.down || this.body.blocked.down){
            this.body.velocity.y -= 300;
        }
    }

    hit(){

    }

    hurt(direction){
        this.body.velocity.y -= 100;
        if(direction && direction.left){
            this.body.velocity.x -= 100 || this.props.maxSpeed;
        }
        if(direction && direction.right){
            this.body.velocity.x += 100 || this.props.maxSpeed;
        }
    }

    update(){
        //console.log('[Sprite] state');
    }
};

export default ExtendedSprite;
