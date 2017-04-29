var LevelBuilder = function(aLevelConfig){
    let level = aLevelConfig;
    let levelMatrix = [];
    let layerModel = {
        data: [],
        height: 0,
        name: "ground-layer",
        opacity: 1,
        type: "tilelayer",
        visible: true,
        width: 0,
        x: 0,
        y: 0
    };
    return {
        createGroundLayer(tileWidth, tileHeight){
            levelMatrix = createMatrix(tileWidth, tileHeight, 0);
            layerModel.data = flatten(levelMatrix);
            level.tiledJson.layers.push(layerModel);
            layerModel.width = tileWidth;
            layerModel.height = tileHeight;
            return this;
        },
        clearLayers(){
            level.tiledJson.layers = [];
            return this;
        },
        setDimensions(width, height){
            level.width = width;
            level.height = height;
            return this;
        },
        build(){
            return level;
        }
    };
};

export default LevelBuilder;
