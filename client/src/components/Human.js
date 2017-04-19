import ExtendedSprite from './ExtendedSprite';

class Human extends ExtendedSprite {
    constructor(game, x, y, sprite, props){
        super(game, x, y, sprite, props);

        this.spriteState = mobx.observable({
            life: 10,
            stun: 0,
            hit: 0,
            nohit: 0
        });
    }
}

export default Human;
