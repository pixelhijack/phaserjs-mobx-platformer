function update(){
    //console.log('[PHASER][Component][Update]');
    // fps
    this.game.debug.text(this.game.time.fps, 5, 20);

    // collide
    this.game.physics.arcade.collide(this.player, this.level.collisionLayer);

    this.game.physics.arcade.collide(this.enemies, this.level.collisionLayer);

    this.game.physics.arcade.collide(this.player, this.level.deathLayer, () => {
        console.log('DEAD!');
        this.levelConfig = null;
        this.game.state.start('Menu', true, true, undefined);
    });

    this.game.physics.arcade.collide(this.player, this.items.platforms);

    this.game.physics.arcade.overlap(this.player, this.enemies, (player, enemy) => {
        if(this.player.body.touching.down && enemy.body.touching.up){
            return;
        }
        if(!this.player.isHitting && !this.player.isStunned){
            this.player.updateState({
                life: this.player.spriteState.life - 1,
                stun: this.game.time.now + 1500
            });
            this.player.hurt(enemy.body.touching);
        }
    });

    // move
    onKeyPress.call(this);
}

function onKeyPress(){
    // player make noise
    this.gameState.playerAt.x = this.player.body.x | 0;
    this.gameState.playerAt.y = this.player.body.y | 0;

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
        }
    }

    if(this.keys.alt.isDown){
        if(this.player.spriteState.nobuild < this.game.time.now) {
            const x = this.player.facingRight ? this.player.body.x + 40 : this.player.body.x - 20,
                y = this.player.body.y - 20;
            this.player.build((x | 0), (y | 0));
        }
    }
}

export default update;
