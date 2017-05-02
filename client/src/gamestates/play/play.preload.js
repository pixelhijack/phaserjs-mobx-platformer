function preload(){
    console.log('[PHASER][Component][Preload]');

    // ------! FPS killer: performance drop on scaling up more than 1.6x
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.scale.setMinMax(0, 0, this.globalConfig.width * 1.6, this.globalConfig.height * 1.6);
    // ------!

    // assets to load relative to /assets/..
    this.game.load.atlas(
        'pre2atlas',
        'spritesheets/pre2atlas.png',
        'spritesheets/pre2atlas.json',
        Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
    );

    // load background
    this.game.load.image(this.levelConfig.backgroundKey, this.globalConfig.backgroundPath + this.levelConfig.backgroundImage + this.levelConfig.backgroundImageExtension);
    // load tileset
    this.game.load.image(this.levelConfig.tileset, this.globalConfig.tilesetPath + this.levelConfig.tilesetImage + this.levelConfig.tilesetImageExtension);
    // load tilemap
    if(typeof this.levelConfig.tiledJson === 'string'){
        this.game.load.tilemap(this.levelConfig.tilemap, this.globalConfig.levelPath + this.levelConfig.tiledJson, null, Phaser.Tilemap.TILED_JSON);
    } else {
        this.game.load.tilemap(this.levelConfig.tilemap, null, this.levelConfig.tiledJson, Phaser.Tilemap.TILED_JSON);
    }

};

export default preload;
