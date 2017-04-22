import ExtendedSprite from './ExtendedSprite';

class AI extends ExtendedSprite {
    constructor(game, x, y, sprite, props){
        super(game, x, y, sprite, props);

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
    update(){
        this.animations.play('move');
        this.turnIfBlocked();
        this.move();
    }
}

export default AI;
