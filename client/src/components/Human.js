import ExtendedSprite from './ExtendedSprite';
import Item from './Item';

class Human extends ExtendedSprite {
    constructor(game, x, y, sprite, props){
        super(game, x, y, sprite, props);

        this.spriteState = mobx.observable({
            life: 10,
            stun: 0,
            hit: 0,
            nohit: 0,
            nobuild: 0
        });
    }
    build(x, y){
        const step = new Item(this.game, x, y, 'pre2atlas', {
            animations: [{ name: 'idle', frames: [298], fps: 10, loop: false }]
        });
        this.game.state.states[this.game.state.current].items.platforms.add(step);
        this.updateState({
            nobuild: this.game.time.now + 3000
        });
    }
}

export default Human;
