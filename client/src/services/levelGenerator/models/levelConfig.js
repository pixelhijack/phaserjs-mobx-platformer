import level from './level';

const levelConfig = {
	"id": "rise-of-the-tide",
	"name": "Rise of the Tide",
	"tileset": "tileset-level-rise-of-the-tide",
	"tilemap": "tilemap-level-rise-of-the-tide",
	"tiledJson": level,
	"tilesetImage": "L1",
	"tilesetImageExtension": ".png",
	"backgroundImage": "bg3seamless",
	"backgroundImageExtension": ".jpg",
	"backgroundKey": "background-2",
	"width": 546,
	"height": 368,
	"layers": {
		"groundLayer": {
			"key": "ground-layer",
			"visible": true
		},
		"collisionLayer": {
			"key": "collision-layer",
			"visible": false
		},
		"deathLayer": {
			"key": "death-layer",
			"visible": false
		}
	},
	"fixedBackground": true,
	"entryPoint": {
		"x": 40,
		"y": 250
	},
	"portals": [],
	"platforms": [],
	"bonus": [],
	"enemies": []
};

export default levelConfig;
