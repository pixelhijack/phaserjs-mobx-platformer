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

import {
    column,
    snowball
} from './models/islands';

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

const islands = [
    [[0,0,0,0],[0,77,78,0],[0,91,92,0],[0,0,0,0]],
    [[0, 0, 0, 0], [77, 111, 111, 78], [91, 130, 130, 92], [0, 0, 0, 0]],
    [[0, 0, 0, 0, 0, 0, 0], [77, 111, 111, 142, 111, 142, 78], [91, 130, 130, 144, 130, 144, 92], [0, 0, 0, 0, 0, 0, 0]],
    [[0, 0, 0, 0], [0, 18, 19, 16], [15, 79, 23, 52], [58, 93, 39, 34], [112, 113, 34, 83], [77, 111, 111, 78], [91, 130, 130, 92], [0, 0, 0, 0]],
    [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,77,111,78,0,0,0,0,0,0,0,0,0,0,0,0],[0,91,130,92,0,0,0,77,111,78,0,0,0,0,0,0],[0,0,0,0,0,0,0,91,130,92,0,0,0,77,78,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,91,92,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,64,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,64,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,64,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,64,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],
    [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,77,111,78,0],[0,0,0,0,0,0,0,77,78,0,0,0,0,91,130,92,0],[0,77,111,78,0,0,0,91,92,77,78,0,0,0,0,0,0],[0,91,130,92,0,0,0,0,0,91,92,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    column,
    [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,98,99,243,100,105,97,64,97,97,64,97,64,97,98,99,100,104,104,105,0],[0,122,127,126,206,0,0,0,0,0,0,0,0,0,245,127,125,126,127,0,0],[0,0,2684354681,2684354591,0,0,0,0,0,0,0,0,0,0,230,216,230,230,216,0,0]],
    snowball
];
const collisionTiles = [24,64,77,78,91,92,97,98,99,100,104,105,111,123,124,125,126,127,130,167,180,197,204,205,206,207,208,229,243];

var LevelBuilder = function(levelConfig){
    var level = levelConfig;
    return {
        createLayers(tilesWidth, tilesHeight){
            // 100: rare, 40: frequent
            const density = 100,
                retry = Math.floor((tilesWidth * tilesHeight) / density);
            groundLayer.data = flatten(populateMatrix(createMatrix(tilesHeight, tilesWidth, 0), islands, retry));
            collisionLayer.data = getCollisionLayer(groundLayer.data, collisionTiles);

            level.tiledJson.width = tilesWidth;
            level.tiledJson.height = tilesHeight;

            groundLayer.width = tilesWidth;
            groundLayer.height = tilesHeight;
            collisionLayer.width = tilesWidth;
            collisionLayer.height = tilesHeight;

            level.width = tilesWidth * 16;
            level.height = tilesHeight * 16;

            level.tiledJson.layers = [
                groundLayer,
                collisionLayer,
                deathLayer
            ];
            return this;
        },
        build(){
            return level;
        }
    };
};

export default LevelBuilder;