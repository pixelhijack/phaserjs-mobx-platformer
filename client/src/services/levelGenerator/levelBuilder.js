import {
    flatten,
    applyMatrix,
    createMatrix,
    layerToMatrix,
    checkIfAreaIsCovered
} from './utils';
import {
    groundLayer,
    collisionLayer,
    deathLayer
} from './models/layers';

const populateMatrix = (aMatrix, items, retry) => {
    let matrix = aMatrix.slice(0);
    while(retry--){
        let item = items[Math.floor(Math.random() * items.length)],
            x = Math.floor(Math.random() * (matrix[0].length - item[0].length)),
            y = Math.floor(Math.random() * (matrix.length - item.length));
        if(checkIfAreaIsCovered(matrix, x, y, item[0].length, item.length)){
            applyMatrix(matrix, item, x, y);
        }
    }
    return matrix;
};

const getCollisionLayer = (flatMatrix, collisionTiles) => {
    let matrix = flatMatrix.slice(0).map((tile) => {
        return collisionTiles.indexOf(tile) > -1
            ? tile
            : 0;
    });
    return matrix;
};

const island = [[0,0,0,0],[0,77,78,0],[0,91,92,0],[0,0,0,0]];
const collisionTiles = [91, 130, 111, 92, 97, 98, 77, 78];

var LevelBuilder = function(aLevelConfig){
    let level = aLevelConfig;
    let levelMatrix = [];
    return {
        createLayers(){
            groundLayer.data = flatten(populateMatrix(layerToMatrix(groundLayer), [island], 10));
            collisionLayer.data = getCollisionLayer(groundLayer.data, collisionTiles);
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
