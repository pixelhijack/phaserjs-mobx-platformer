class ExtendedSprite extends Phaser.Sprite{
    constructor(game, x, y, sprite, props){
        super(game, x, y, sprite);
        this.game = game;
        this.props = props || { animations: [] };
        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.setTo(0.5, 0.5);
        this.body.collideWorldBounds = true;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.body.gravity.y = this.props.gravity;
        this._debugText = this.addChild(
            this.game.add.text(20, -20, 'debug', { font: "12px Courier", fill: "#ffffff" })
        );
        this._debugText.visible = false;

        this.props.animations.forEach(animation => {
            this.animations.add(
                animation.name,
                animation.frames.map(frame => frame.toString()),
                animation.fps,
                animation.loop
            );
        });

        const gameState = this.game.state.states[this.game.state.current].gameState;

        mobx.observe(gameState, (change) => {
            console.log('change', change, gameState);
        });

        this.updateState = mobx.action((change) => {
            this.spriteState = Object.assign(this.spriteState, change);
        });
    }

    get isHitting(){
        return this.spriteState.hit > this.game.time.now;
    }

    get isStunned(){
        return this.spriteState.stun > this.game.time.now;
    }

    get facingRight(){
        return this.scale.x > 0;
    }

    get facingLeft(){
        return this.scale.x < 0;
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
        const hitUntil = this.game.time.now + 900,
            breakUntil = this.game.time.now + 1000;
        console.log('Now %s Hit %s Break %s', this.game.time.now, hitUntil, breakUntil);
        this.updateState({
            hit: hitUntil,
            nohit: breakUntil
        });
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

    debug(text){
       this._debugText.visible = true;
       this._debugText.scale.x = this.scale.x;
       this._debugText.setText(text.toString() || '');
    }

    update(){
        //console.log('[Sprite] state');
    }
};

export default ExtendedSprite;
