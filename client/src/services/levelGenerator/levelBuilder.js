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

import platforms from './models/platforms';
import tilemaps from './models/tilemaps';
import tilesets from './models/tilesets';
import backgrounds from './models/backgrounds';

// with frequency
const enemyTypes = [
    'bat', 'bat', 'bat', 'bat',
    'bear', 'bear', 'bear', 'bear', 'bear', 'bear',
    'bug',
    'dino',
    'dragonfly', 'dragonfly', 'dragonfly', 'dragonfly', 'dragonfly',
    'frog',
    'insect',
    'jelly',
    'native', 'native', 'native', 'native', 'native',
    'parrot',
    'ptero',
    'spider', 'spider', 'spider', 'spider',
    'tiger',
    'turtle'
];

const findPlacesFor = (aMatrix, items, retry) => {
    let matrix = aMatrix.slice(0);
    let enemies = [];
    while(retry--){
        let item = items[Math.floor(Math.random() * items.length)],
            x = Math.floor(Math.random() * (matrix[0].length - item[0].length)),
            y = Math.floor(Math.random() * (matrix.length - item.length));
        if(checkIfAreaIsCovered(matrix, x, y, item[0].length, item.length)){
            enemies.push([x, y, item[0].length]);
            applyMatrix(matrix, item, x, y);
        }
    }
    return {
        enemies: enemies,
        islands: matrix
    };
};

const createEnemyAt = (xTile, yTile, tilesWidth) => {
    return {
		type: enemyTypes[Math.floor(Math.random() * enemyTypes.length)],
		number: 1,
		lifespan: Infinity,
		origin: {
			x: (xTile + tilesWidth / 2) * 16,
			y: yTile * 16
		},
		boundTo: {
			x1: xTile * 16,
			x2: (xTile + tilesWidth) * 16
		}
    };
};

const getCollisionLayer = (flatMatrix, collisionTiles) => {
    let matrix = flatMatrix.slice(0).map((tile) => {
        return collisionTiles.indexOf(tile) > -1
            ? tile
            : 0;
    });
    return matrix;
};

var LevelBuilder = function(id, levelConfig){
    let level = Object.assign(levelConfig, tilemaps[id]);
    return {
        createLayers(tilesWidth, tilesHeight){
            // 100: rare, 40: frequent
            const density = 100,
                retry = Math.floor((tilesWidth * tilesHeight) / density);
            const placesFor = findPlacesFor(createMatrix(tilesHeight, tilesWidth, 0), platforms[id].groundLayer, retry);

            level.enemies = placesFor.enemies.map(enemy => createEnemyAt.apply(null, enemy));

            groundLayer.data = flatten(placesFor.islands);
            collisionLayer.data = getCollisionLayer(groundLayer.data, platforms[id].collisionTiles);
            deathLayer.data = groundLayer.data.map(tile => 0);

            level.tiledJson.width = tilesWidth;
            level.tiledJson.height = tilesHeight;

            groundLayer.width = tilesWidth;
            groundLayer.height = tilesHeight;
            collisionLayer.width = tilesWidth;
            collisionLayer.height = tilesHeight;

            level.width = tilesWidth * 16;
            level.height = tilesHeight * 16;

            do {
                // 195 = spike
                groundLayer.data[groundLayer.data.length - tilesWidth] = 195;
                deathLayer.data[deathLayer.data.length - tilesWidth] = 195;
            } while(tilesWidth--);

            level.tiledJson.layers = [
                groundLayer,
                collisionLayer,
                deathLayer
            ];
            level.tiledJson.tilesets = [tilesets[id]];
            return this;
        },
        randomBackground(){
            const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)]
            level.backgroundImage = randomBackground.backgroundImage;
            level.backgroundImageExtension = randomBackground.backgroundImageExtension;
            return this;
        },
        build(){
            return level;
        }
    };
};

export default LevelBuilder;
