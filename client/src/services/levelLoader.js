function levelLoader() {

    return {
        createBackground: (layerName) => {
            this.level.backgroundLayer = this.game.add.tileSprite(
                0,
                0,
                this.levelConfig.width,
                this.levelConfig.height,
                this.levelConfig.backgroundKey
            );
        },
        createLayer: (layer) => {
            this.level[layer] = this.level.tilemap.createLayer(this.levelConfig[layer]);
        },
        createLayers: (layers) => {
            for(let layer in layers){
                this.level[layer] = this.level.tilemap.createLayer(this.levelConfig.layers[layer].key);
                this.level[layer].visible = this.levelConfig.layers[layer].visible;
            }
        },
        createTiles: (tilemapKey, tilesetKey, tilesetImage) => {
            this.level.tilemap = this.game.add.tilemap(tilemapKey);
            this.level.tilemap.addTilesetImage(tilesetImage, tilesetKey);
            this.level.tilemap.setCollisionBetween(0, 3000, true, this.levelConfig.layers.collisionLayer.key);
            this.level.tilemap.setCollisionBetween(0, 3000, true, this.levelConfig.layers.deathLayer.key);
        }
    };
};

export default levelLoader;
