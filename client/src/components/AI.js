import ExtendedSprite from './ExtendedSprite';

class AI extends ExtendedSprite {
    constructor(game, x, y, sprite, props, behaviours){
        super(game, x, y, sprite, props);

        this.id = `${props.type}-${x}-${y}`;

        this.behaviours = behaviours;

        this.spriteState = mobx.observable({
            life: 10,
            stun: 0,
            hit: 0,
            nohit: 0
        });

    }
    turnIfBlocked(){
        if(this.body.blocked.left || this.body.blocked.right){
            this.scale.x *= -1;
        }
    }
    turn(){
        this.scale.x *= -1;
    }
    setBounds(boundTo){
        if(boundTo){
            if(boundTo.hasOwnProperty('x') &&
                boundTo.hasOwnProperty('y')){
                    this.boundTo = new Phaser.Point(
                        boundTo.x,
                        boundTo.y
                    );
            }

            // @Rectangle { x1, x2 }
            if(boundTo.hasOwnProperty('x1') &&
                boundTo.hasOwnProperty('x2') &&
                !boundTo.hasOwnProperty('y1') &&
                !boundTo.hasOwnProperty('y2')){
                    this.boundTo = new Phaser.Rectangle(
                        boundTo.x1,
                        0,
                        boundTo.x2 - boundTo.x1,
                        this.game.height
                    );
            }

            // {x1, y1, x2, y2}
            if(boundTo.hasOwnProperty('x1') &&
                boundTo.hasOwnProperty('x2') &&
                boundTo.hasOwnProperty('y1') &&
                boundTo.hasOwnProperty('y2')){
                    this.boundTo = new Phaser.Rectangle(
                        boundTo.x1,
                        boundTo.y1,
                        boundTo.x2 - boundTo.x1,
                        boundTo.y2 - boundTo.y1
                    );
            }
        }
    }
    checkBounds(){
        if(!this.boundTo || !Object.keys(this.boundTo).length){
           return;
        }

        // @Point {x, y}
        if(!this.boundTo.hasOwnProperty('width') &&
            !Phaser.Rectangle.containsPoint(this.getBounds(), this.boundTo) &&
            ((this.x < this.boundTo.x && !this.facingRight) ||
            (this.x > this.boundTo.x && this.facingRight))){
                this.turn();
        }

        // @Rectangle {x1, x2} or {x1, y1, x2, y2}
        if(this.boundTo &&
            this.boundTo.hasOwnProperty('width') &&
            (this.x < this.boundTo.x && this.facingLeft ||
            this.x > this.boundTo.x + this.boundTo.width && this.facingRight)){
                this.turn();
        }
    }
    when(params) {
		if(Math.random() < params.probability){
			this[params.action] && this[params.action].call(this);
		}
	}
    update(){
        //const debugBounds = this.id+'\n'+ (this.boundTo && Object.keys(this.boundTo).length && this.boundTo.x) +'\n'+ (this.x | 0);
        //this.debug(debugBounds);
        this.animations.play('move');
        this.behaviours.forEach((behaviour) => {
            this[behaviour.action] && this[behaviour.action].call(this, behaviour.params);
        });
    }
}

export default AI;
