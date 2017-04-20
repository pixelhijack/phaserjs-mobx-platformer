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
        }
    };
};

export default levelLoader;
