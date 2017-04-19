function preload(){
    console.log('[PHASER][Component][Preload]');

    // assets to load relative to /assets/.. 
    this.game.load.atlas(
        'pre2atlas',
        'spritesheets/pre2atlas.png',
        'spritesheets/pre2atlas.json',
        Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
    );
};

export default preload;
