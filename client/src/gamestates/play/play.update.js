function update(){
    //console.log('[PHASER][Component][Update]');
    // fps
    this.game.debug.text(this.game.time.fps, 5, 20);

    this.enemy.animations.play('move');

    // move
    onKeyPress.call(this);

    // collide
    this.game.physics.arcade.overlap(this.player, this.enemy, (player, enemy) => {
        if(!this.player.isHitting && !this.player.isStunned){
            this.player.updateState({
                life: this.player.spriteState.life - 1,
                stun: this.game.time.now + 1500
            });
            this.player.hurt(enemy.body.touching);
        }
    });
}

function onKeyPress(){
    // stun => blocked
    if(this.player.isStunned){
        this.player.animations.play('stun');
        return;
    }

    // move left / right
    if(this.keys.left.isDown){
        this.player.moveLeft();
        this.player.animations.play('move');
    } else if(this.keys.right.isDown){
        this.player.moveRight();
        this.player.animations.play('move');
    } else {
        this.player.stop();
        this.player.animations.play('idle');
    }

    // jump
    if(this.keys.up.isDown){
        this.player.jump();
        this.player.animations.play('jump');
    }

    // hit
    if(this.keys.space.isDown){
        if(this.player.spriteState.nohit < this.game.time.now && this.player.spriteState.hit < this.game.time.now){
            this.player.hit();
            this.player.animations.play('hit');
        }
    }
}

export default update;
