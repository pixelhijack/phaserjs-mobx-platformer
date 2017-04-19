function preload(){
    console.log('[PHASER][Component][Preload]');
    this.game.load.image('player', 'man.png');
    this.game.load.image('dino', 'dino.png');
    this.game.load.atlas(
        'pre2atlas',
        'pre2atlas.png',
        'pre2atlas.json',
        Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
    );
};

export default preload;
