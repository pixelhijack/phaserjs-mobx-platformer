class GameState{
    constructor(gameConfig) {
        this.gameConfig = gameConfig;
    }

    init(configs){
        console.log('[PHASER][Component][Init]', configs);
    }

    preload(){
        console.log('[PHASER][Component][Preload]');
    }
    create(){
        console.log('[PHASER][Component][Create]');
    }
    update(){
        console.log('[PHASER][Component][Update]');
    }
}


module.exports = GameState;
