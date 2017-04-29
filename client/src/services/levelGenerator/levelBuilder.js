import {
    flatten,
    applyMatrix,
    createMatrix,
    layerToMatrix,
    checkIfAreaIsCovered,
    putMatrixAtPoint
} from './utils';
import {
    groundLayer,
    collisionLayer,
    deathLayer
} from './models/layers';

var LevelBuilder = function(aLevelConfig){
    let level = aLevelConfig;
    let levelMatrix = [];
    return {
        createLayers(){
            level.tiledJson.layers = [
                groundLayer,
                collisionLayer,
                deathLayer
            ];
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
