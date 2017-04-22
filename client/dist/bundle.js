/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ExtendedSprite2 = __webpack_require__(1);

var _ExtendedSprite3 = _interopRequireDefault(_ExtendedSprite2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AI = function (_ExtendedSprite) {
    _inherits(AI, _ExtendedSprite);

    function AI(game, x, y, sprite, props) {
        _classCallCheck(this, AI);

        var _this = _possibleConstructorReturn(this, (AI.__proto__ || Object.getPrototypeOf(AI)).call(this, game, x, y, sprite, props));

        _this.spriteState = mobx.observable({
            life: 10,
            stun: 0,
            hit: 0,
            nohit: 0
        });
        return _this;
    }

    return AI;
}(_ExtendedSprite3.default);

exports.default = AI;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExtendedSprite = function (_Phaser$Sprite) {
    _inherits(ExtendedSprite, _Phaser$Sprite);

    function ExtendedSprite(game, x, y, sprite, props) {
        _classCallCheck(this, ExtendedSprite);

        var _this = _possibleConstructorReturn(this, (ExtendedSprite.__proto__ || Object.getPrototypeOf(ExtendedSprite)).call(this, game, x, y, sprite));

        _this.game = game;
        _this.props = props || { animations: [] };
        _this.game.add.existing(_this);
        _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.anchor.setTo(0.5, 0.5);
        _this.body.collideWorldBounds = true;
        _this.checkWorldBounds = true;
        _this.outOfBoundsKill = true;
        _this.body.gravity.y = _this.props.gravity;

        _this.props.animations.forEach(function (animation) {
            _this.animations.add(animation.name, animation.frames.map(function (frame) {
                return frame.toString();
            }), animation.fps, animation.loop);
        });

        var gameState = _this.game.state.states[_this.game.state.current].gameState;

        mobx.observe(gameState, function (change) {
            console.log('change', change, gameState);
        });

        _this.updateState = mobx.action(function (change) {
            _this.spriteState = Object.assign(_this.spriteState, change);
        });
        return _this;
    }

    _createClass(ExtendedSprite, [{
        key: 'moveLeft',
        value: function moveLeft() {
            this.scale.x = -1;
            if (this.body.velocity.x > -this.props.maxSpeed) {
                this.body.velocity.x -= this.props.acceleration;
            }
        }
    }, {
        key: 'moveRight',
        value: function moveRight() {
            this.scale.x = 1;
            if (this.body.velocity.x < this.props.maxSpeed) {
                this.body.velocity.x += this.props.acceleration;
            }
        }
    }, {
        key: 'move',
        value: function move() {
            if (this.scale.x === 1) {
                this.moveRight();
            } else {
                this.moveLeft();
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.body.velocity.x /= 1.1;
        }
    }, {
        key: 'jump',
        value: function jump() {
            if (this.body.touching.down || this.body.blocked.down) {
                this.body.velocity.y -= 300;
            }
        }
    }, {
        key: 'hit',
        value: function hit() {
            var hitUntil = this.game.time.now + 900,
                breakUntil = this.game.time.now + 1000;
            console.log('Now %s Hit %s Break %s', this.game.time.now, hitUntil, breakUntil);
            this.updateState({
                hit: hitUntil,
                nohit: breakUntil
            });
        }
    }, {
        key: 'hurt',
        value: function hurt(direction) {
            this.body.velocity.y -= 100;
            if (direction && direction.left) {
                this.body.velocity.x -= 100 || this.props.maxSpeed;
            }
            if (direction && direction.right) {
                this.body.velocity.x += 100 || this.props.maxSpeed;
            }
        }
    }, {
        key: 'update',
        value: function update() {
            //console.log('[Sprite] state');
        }
    }, {
        key: 'isHitting',
        get: function get() {
            return this.spriteState.hit > this.game.time.now;
        }
    }, {
        key: 'isStunned',
        get: function get() {
            return this.spriteState.stun > this.game.time.now;
        }
    }]);

    return ExtendedSprite;
}(Phaser.Sprite);

;

exports.default = ExtendedSprite;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ExtendedSprite2 = __webpack_require__(1);

var _ExtendedSprite3 = _interopRequireDefault(_ExtendedSprite2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Human = function (_ExtendedSprite) {
    _inherits(Human, _ExtendedSprite);

    function Human(game, x, y, sprite, props) {
        _classCallCheck(this, Human);

        var _this = _possibleConstructorReturn(this, (Human.__proto__ || Object.getPrototypeOf(Human)).call(this, game, x, y, sprite, props));

        _this.spriteState = mobx.observable({
            life: 10,
            stun: 0,
            hit: 0,
            nohit: 0
        });
        return _this;
    }

    return Human;
}(_ExtendedSprite3.default);

exports.default = Human;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _AI = __webpack_require__(0);

var _AI2 = _interopRequireDefault(_AI);

var _Human = __webpack_require__(2);

var _Human2 = _interopRequireDefault(_Human);

var _levelLoader = __webpack_require__(10);

var _levelLoader2 = _interopRequireDefault(_levelLoader);

var _creatureFactory = __webpack_require__(13);

var _creatureFactory2 = _interopRequireDefault(_creatureFactory);

var _creatureconfig = __webpack_require__(12);

var _creatureconfig2 = _interopRequireDefault(_creatureconfig);

var _play = __webpack_require__(6);

var _play2 = _interopRequireDefault(_play);

var _play3 = __webpack_require__(7);

var _play4 = _interopRequireDefault(_play3);

var _play5 = __webpack_require__(5);

var _play6 = _interopRequireDefault(_play5);

var _play7 = __webpack_require__(8);

var _play8 = _interopRequireDefault(_play7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameState = function GameState(globalConfig) {
    _classCallCheck(this, GameState);

    this.keys = undefined;
    this.player = undefined;
    this.enemy = undefined;
    this.gameState = undefined;
    this.level = {
        backgroundLayer: undefined,
        groundLayer: undefined,
        tilemap: undefined
    };

    this.globalConfig = globalConfig;
    this.creatureConfig = _creatureconfig2.default;
    this.levelLoader = _levelLoader2.default.call(this);
    this.creatureFactory = _creatureFactory2.default.call(this);
};

GameState.prototype.init = _play2.default;
GameState.prototype.preload = _play4.default;
GameState.prototype.create = _play6.default;
GameState.prototype.update = _play8.default;

module.exports = GameState;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var globalConfig = {
    width: 546,
    height: 368,
    blocks: 3,
    domElement: 'game',
    backgroundPath: 'backgrounds/',
    tilesetPath: 'tilesets/',
    levelPath: 'levels/',
    textureAtlasPath: 'spritesheets/',
    textureAtlasName: 'pre2atlas',
    textureAtlasImage: 'pre2atlas.png',
    textureAtlasJson: 'pre2atlas.json'
};

exports.default = globalConfig;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Human = __webpack_require__(2);

var _Human2 = _interopRequireDefault(_Human);

var _AI = __webpack_require__(0);

var _AI2 = _interopRequireDefault(_AI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create() {
    var _this = this;

    console.log('[PHASER][Component][Create]');
    // fps debugging
    this.game.time.advancedTiming = true;

    // [SET LEVEL] set dimensions, start physic system
    this.game.world.setBounds(0, 0, this.globalConfig.width * this.globalConfig.blocks, this.globalConfig.height);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.levelLoader.createBackground('backgroundLayer');
    this.levelLoader.createTiles(this.levelConfig.tilemap, this.levelConfig.tileset, this.levelConfig.tilesetImage);
    this.levelLoader.createLayers(this.levelConfig.layers);

    // [SET LEVEL] fix background, resize
    this.level.backgroundLayer.fixedToCamera = this.levelConfig.fixedBackground;
    this.level.groundLayer.resizeWorld();

    this.gameState = mobx.observable({
        initialised: false,
        score: 0
    });

    this.updateState = mobx.action(function (change) {
        _this.gameState = Object.assign(_this.gameState, change);
    });

    mobx.observe(this.gameState, function (change) {
        console.log('[gameState] change', change, _this.gameState);
    });

    this.updateState({ initialised: true });

    // [PLAYER]
    this.player = new _Human2.default(this.game, this.levelConfig.entryPoint.x, this.levelConfig.entryPoint.y, this.globalConfig.textureAtlasName, this.creatureConfig.man);

    // [ENEMY]
    this.enemy = new _AI2.default(this.game, this.levelConfig.entryPoint.x + 50, this.levelConfig.entryPoint.y, this.globalConfig.textureAtlasName, this.creatureConfig.dino);
    this.enemy.body.velocity.x = Math.random() * -10 - 10;

    this.enemies = new Phaser.Group(this.game);
    this.levelConfig.enemies.forEach(this.creatureFactory.create);

    this.game.camera.follow(this.player);

    // bind keys
    this.keys = this.game.input.keyboard.createCursorKeys();
    this.keys.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // score text
    this.menu = this.game.add.text(150, 0, "Life: " + this.player.spriteState.life, { font: "24px Courier", fill: "#000", align: "center" });
    mobx.observe(this.player.spriteState, function (change) {
        _this.menu.setText("Life: " + _this.player.spriteState.life);
    });
};

exports.default = create;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function init(levelConfig) {
    console.log('[PHASER][Component][Init]', levelConfig);
    this.levelConfig = levelConfig;
};

exports.default = init;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function preload() {
    console.log('[PHASER][Component][Preload]');

    // assets to load relative to /assets/..
    this.game.load.atlas('pre2atlas', 'spritesheets/pre2atlas.png', 'spritesheets/pre2atlas.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

    // load background
    this.game.load.image(this.levelConfig.backgroundKey, this.globalConfig.backgroundPath + this.levelConfig.backgroundImage + this.levelConfig.backgroundImageExtension);
    // load tileset
    this.game.load.image(this.levelConfig.tileset, this.globalConfig.tilesetPath + this.levelConfig.tilesetImage + this.levelConfig.tilesetImageExtension);
    // load tilemap
    this.game.load.tilemap(this.levelConfig.tilemap, this.globalConfig.levelPath + this.levelConfig.tiledJson, null, Phaser.Tilemap.TILED_JSON);
};

exports.default = preload;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function update() {
    var _this = this;

    //console.log('[PHASER][Component][Update]');
    // fps
    this.game.debug.text(this.game.time.fps, 5, 20);

    this.enemy.animations.play('move');

    // collide
    this.game.physics.arcade.collide(this.player, this.level.collisionLayer);

    this.game.physics.arcade.collide(this.enemies, this.level.collisionLayer);

    this.game.physics.arcade.overlap(this.player, this.enemy, function (player, enemy) {
        if (!_this.player.isHitting && !_this.player.isStunned) {
            _this.player.updateState({
                life: _this.player.spriteState.life - 1,
                stun: _this.game.time.now + 1500
            });
            _this.player.hurt(enemy.body.touching);
        }
    });

    // move
    onKeyPress.call(this);
}

function onKeyPress() {
    // stun => blocked
    if (this.player.isStunned) {
        this.player.animations.play('stun');
        return;
    }

    // move left / right
    if (this.keys.left.isDown) {
        this.player.moveLeft();
        this.player.animations.play('move');
    } else if (this.keys.right.isDown) {
        this.player.moveRight();
        this.player.animations.play('move');
    } else {
        this.player.stop();
        this.player.animations.play('idle');
    }

    // jump
    if (this.keys.up.isDown) {
        this.player.jump();
        this.player.animations.play('jump');
    }

    // hit
    if (this.keys.space.isDown) {
        if (this.player.spriteState.nohit < this.game.time.now && this.player.spriteState.hit < this.game.time.now) {
            this.player.hit();
            this.player.animations.play('hit');
        }
    }
}

exports.default = update;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _globalConfig = __webpack_require__(4);

var _globalConfig2 = _interopRequireDefault(_globalConfig);

var _index = __webpack_require__(3);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// instantiate a Phaser.Game
var PLATFORMER = new Phaser.Game(_globalConfig2.default.width, _globalConfig2.default.height, Phaser.AUTO, _globalConfig2.default.domElement);

// register gamestates (will be instantiated w/ this.game as 1st param, pass gameConfig as 2nd)
PLATFORMER.state.add('Play', _index2.default.bind(null, _globalConfig2.default));

fetch('/level/1', {
    method: 'GET'
}).then(function (response) {
    return response.json();
}).then(function (levelConfig) {
    PLATFORMER.state.start('Play', true, true, levelConfig);
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function levelLoader() {
    var _this = this;

    return {
        createBackground: function createBackground(layerName) {
            _this.level.backgroundLayer = _this.game.add.tileSprite(0, 0, _this.levelConfig.width, _this.levelConfig.height, _this.levelConfig.backgroundKey);
        },
        createLayer: function createLayer(layer) {
            _this.level[layer] = _this.level.tilemap.createLayer(_this.levelConfig[layer]);
        },
        createLayers: function createLayers(layers) {
            for (var layer in layers) {
                _this.level[layer] = _this.level.tilemap.createLayer(_this.levelConfig.layers[layer].key);
                _this.level[layer].visible = _this.levelConfig.layers[layer].visible;
            }
        },
        createTiles: function createTiles(tilemapKey, tilesetKey, tilesetImage) {
            _this.level.tilemap = _this.game.add.tilemap(tilemapKey);
            _this.level.tilemap.addTilesetImage(tilesetImage, tilesetKey);
            _this.level.tilemap.setCollisionBetween(0, 3000, true, _this.levelConfig.layers.collisionLayer.key);
            _this.level.tilemap.setCollisionBetween(0, 3000, true, _this.levelConfig.layers.deathLayer.key);
        }
    };
};

exports.default = levelLoader;

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var creatureConfigs = {
  creatureDefaults: {
    active: true,
    gravity: 500,
    bounce: 0.2,
    mass: 1,
    jumping: 300,
    maxSpeed: 100,
    acceleration: 10,
    collide: true,
    lives: 1,
    lifespan: Infinity,
    sense: 150,
    animations: [],
    timeOf: {
      'move': 200,
      'hit': 100,
      'hurt': 500,
      'stop': 200,
      'idle': 10
    },
    boundTo: {
      x1: 1000,
      x2: 1200
    },
    correctedAnchor: {
      x: 0.5,
      y: 0.5
    }
  },
  man: {
    maxSpeed: 200,
    lives: 8,
    lifespan: Infinity,
    animations: [{ name: 'move', frames: [11, '03', '05', 14, 20], fps: 10, loop: false }, { name: 'hit', frames: [22, 24, 28, 31, 34, 22, 24, 28, 31, 34], fps: 10, loop: true }, { name: 'stop', frames: [42, 45, 49, 52], fps: 10, loop: false }, { name: 'jump', frames: [16, 41, 47, 50, 50, 50, 50, 50, 50, 50, 50, 13, 50, 13, 50, 13], fps: 10, loop: false }, { name: 'idle', frames: [25, 25, 25, 25, 25, 25, 25, 25, 27, 27, 27, 27, 25, 25, 25, 25, 25, 25, 25, 25, 30, 25, 25, 25, 25, 25, 25, 25, 25, 27, 30, 27, 30, 35, 36, 25, 25, 25, 25, 25, 25, 25, 25, '07', '07', '07', '07', '02', '02'], fps: 5, loop: true }, { name: 'hurt', frames: [19], fps: 10, loop: true }, { name: 'stun', frames: [19], fps: 10, loop: true }, { name: 'die', frames: [19], fps: 10, loop: false }, { name: 'spawn', frames: [11, '03', '05', 14, 20], fps: 10, loop: false }],
    correctedAnchor: {
      x: 0.5,
      y: 0.8
    }
  },
  dino: {
    mass: 1.5,
    jumping: 300,
    maxSpeed: 50,
    acceleration: 5,
    animations: [{ name: 'idle', frames: [360, 360, 360, 360, 360, 360, 360, 367], fps: 5, loop: true }, { name: 'move', frames: [360, 361, 364, 367, 369], fps: 10, loop: true }, { name: 'jump', frames: [360, 361, 364, 367, 369], fps: 10, loop: true }, { name: 'fall', frames: [369], fps: 10, loop: true }, { name: 'die', frames: [371], fps: 10, loop: true }, { name: 'spawn', frames: [360, 361, 364, 367], fps: 10, loop: true }]
  },
  bear: {
    mass: 1.2,
    maxSpeed: 75,
    jumping: 0,
    acceleration: 15,
    animations: [{ name: 'idle', frames: [321], fps: 10, loop: false }, { name: 'move', frames: [320, 321, 324], fps: 10, loop: true }, { name: 'spawn', frames: [366, 363, 358, 317], fps: 10, loop: false }, { name: 'die', frames: [328], fps: 10, loop: true }]
  },
  'super-bear': {
    acceleration: 30,
    maxSpeed: 200,
    image: 'super-bear-sprite-ref', // override sprite (creature name by default)
    animations: []
  },
  tiger: {
    mass: 1.5,
    jumping: 300,
    maxSpeed: 50,
    acceleration: 20,
    animations: [{ name: 'idle', frames: [393, 395], fps: 10, loop: true }, { name: 'move', frames: [393, 395], fps: 10, loop: true }, { name: 'jump', frames: [399, 401], fps: 10, loop: false }, { name: 'fall', frames: [399], fps: 10, loop: false }, { name: 'die', frames: [402], fps: 10, loop: true }, { name: 'spawn', frames: [393, 395], fps: 10, loop: true }]
  },
  ptero: {
    mass: 0.5,
    gravity: 0,
    bounce: 0.1,
    jumping: 0,
    collide: false,
    maxSpeed: 10,
    acceleration: 10,
    animations: [{ name: 'idle', frames: [478, 478, 478, 478, 478, 478, 478, 478, 477, 478, 478, 478, 478, 478, 477, 477], fps: 3, loop: true }, { name: 'move', frames: [403, 404, 405, 403, 404, 405, 405, 405, 405, 405, 405, 403, 404, 405, 403, 404, 405, 405, 405, 405, 405, 405, 405], fps: 10, loop: true }, { name: 'descend', frames: [405], fps: 15, loop: true }, { name: 'ascend', frames: [403, 404, 405], fps: 15, loop: true }, { name: 'die', frames: [471], fps: 10, loop: true }, { name: 'spawn', frames: [405, 403, 404], fps: 15, loop: true }]
  },
  dragonfly: {
    mass: 0.5,
    gravity: 0,
    bounce: 0.1,
    jumping: 0,
    collide: false,
    maxSpeed: 50,
    acceleration: 10,
    animations: [{ name: 'idle', frames: [337, 338], fps: 12, loop: true }, { name: 'move', frames: [337, 338], fps: 12, loop: true }, { name: 'turn', frames: [339, 340], fps: 12, loop: true }, { name: 'die', frames: [342], fps: 12, loop: true }, { name: 'spawn', frames: [337, 338], fps: 12, loop: true }]
  },
  bat: {
    mass: 0.5,
    gravity: 0,
    bounce: 0.1,
    jumping: 0,
    collide: false,
    maxSpeed: 20,
    acceleration: 10,
    animations: [{ name: 'idle', frames: [351, 352, 351, 351, 351, 351], fps: 10, loop: true }, { name: 'move', frames: [357, 359], fps: 10, loop: true }, { name: 'die', frames: [362], fps: 10, loop: true }, { name: 'spawn', frames: [357, 359], fps: 10, loop: true }]
  },
  spider: {
    mass: 0.3,
    jumping: 0,
    collide: true,
    bounce: 0,
    maxSpeed: 50,
    acceleration: 10,
    animations: [{ name: 'idle', frames: [335], fps: 10, loop: true }, { name: 'spawn', frames: [365, 368, 370, 372], fps: 10, loop: false }, { name: 'move', frames: [299, 302, 305, 309], fps: 10, loop: true }, { name: 'turn', frames: [319], fps: 10, loop: true }, { name: 'climb', frames: [341, 343, 345, 347], fps: 10, loop: true }, { name: 'wait', frames: [332, 335, 372], fps: 10, loop: true }, { name: 'die', frames: [322], fps: 10, loop: false }]
  },
  native: {
    maxSpeed: 100,
    acceleration: 20,
    jumping: 0,
    animations: [{ name: 'idle', frames: [373], fps: 10, loop: true }, { name: 'move', frames: [373, 376, 378], fps: 10, loop: true }, { name: 'die', frames: [380], fps: 10, loop: false }, { name: 'spawn', frames: [373, 376, 378], fps: 10, loop: true }]
  },
  parrot: {
    mass: 0.5,
    gravity: 0,
    bounce: 0.1,
    jumping: 0,
    collide: false,
    maxSpeed: 100,
    acceleration: 10,
    animations: [{ name: 'idle', frames: [394, 397, 398], fps: 12, loop: true }, { name: 'move', frames: [394, 397, 398], fps: 10, loop: true }, { name: 'die', frames: [400], fps: 10, loop: false }, { name: 'spawn', frames: [394, 397, 398], fps: 10, loop: true }]
  },
  insect: {
    mass: 1,
    collide: true,
    bounce: 1.5,
    jumping: 300,
    maxSpeed: 50,
    acceleration: 25,
    animations: [{ name: 'idle', frames: [348, 348, 348, 348, 348, 348, 349], fps: 10, loop: true }, { name: 'move', frames: [323, 348, 349], fps: 10, loop: true }, { name: 'jump', frames: [323, 348, 349], fps: 10, loop: true }, { name: 'die', frames: [348], fps: 10, loop: true }, { name: 'spawn', frames: [323, 348, 349], fps: 10, loop: true }]
  },
  bug: {
    mass: 1,
    collide: true,
    bounce: 1.5,
    jumping: 300,
    maxSpeed: 50,
    acceleration: 25,
    animations: [{ name: 'idle', frames: [344, 344, 344, 344, 344, 344, 344, 344, 346], fps: 10, loop: true }, { name: 'move', frames: [344, 346], fps: 10, loop: true }, { name: 'jump', frames: [344, 346], fps: 10, loop: true }, { name: 'die', frames: [344], fps: 10, loop: true }, { name: 'spawn', frames: [344, 346], fps: 10, loop: true }]
  },
  frog: {
    mass: 1,
    collide: true,
    bounce: 1.5,
    jumping: 500,
    maxSpeed: 80,
    acceleration: 40,
    animations: [{ name: 'idle', frames: [325], fps: 10, loop: true }, { name: 'move', frames: [325, 327, 331, 325], fps: 10, loop: false }, { name: 'jump', frames: [325, 327, 331, 325], fps: 10, loop: false }, { name: 'die', frames: [334], fps: 10, loop: true }, { name: 'spawn', frames: [325, 327, 331, 325], fps: 10, loop: false }]
  },
  turtle: {
    mass: 2,
    jumping: 0,
    collide: true,
    bounce: 0.3,
    maxSpeed: 50,
    acceleration: 10,
    animations: [{ name: 'idle', frames: [390], fps: 10, loop: true }, { name: 'spawn', frames: [377, 381, 384, 385], fps: 10, loop: true }, { name: 'move', frames: [387, 389, 390, 391], fps: 10, loop: true }, { name: 'die', frames: [392], fps: 10, loop: true }]
  },
  jelly: {
    mass: 2,
    jumping: 0,
    collide: true,
    bounce: 1,
    maxSpeed: 5,
    acceleration: 1,
    animations: [{ name: 'idle', frames: [420, 433, 434], fps: 3, loop: true }, { name: 'spawn', frames: [420, 433, 434], fps: 3, loop: true }, { name: 'move', frames: [420, 433, 434], fps: 3, loop: true }, { name: 'die', frames: [420, 433, 434], fps: 3, loop: true }]
  },
  gorilla: {
    mass: 5,
    jumping: 300,
    maxSpeed: 0,
    acceleration: 0,
    animations: [{ name: 'idle', frames: [411], fps: 5, loop: true }, { name: 'move', frames: [411], fps: 10, loop: true }, { name: 'jump', frames: [411], fps: 10, loop: true }, { name: 'fall', frames: [411], fps: 10, loop: true }, { name: 'die', frames: [411], fps: 10, loop: true }, { name: 'spawn', frames: [411], fps: 10, loop: true }]
  }
};

for (var creature in creatureConfigs) {
  //creatureConfigs[creature] = _.merge({}, configs.creatureDefaults, configs[creature]);
  var defaults = creatureConfigs['creatureDefaults'];
  for (var prop in defaults) {
    if (creatureConfigs[creature][prop] === undefined) {
      creatureConfigs[creature][prop] = defaults[prop];
    }
  }
}

module.exports = creatureConfigs;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AI2 = __webpack_require__(0);

var _AI3 = _interopRequireDefault(_AI2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function creatureFactory() {
    var _this2 = this;

    var creatures = {
        bat: 'bat',
        bear: 'bear',
        bug: 'bug',
        dino: 'dino',
        dragonfly: 'dragonfly',
        frog: 'frog',
        gorilla: 'gorilla',
        insect: 'insect',
        jelly: 'jelly',
        native: 'native',
        parrot: 'parrot',
        ptero: 'ptero',
        spider: 'spider',
        tiger: 'tiger',
        turtle: 'turtle'
    };

    for (var creature in creatures) {
        if (creatures.hasOwnProperty(creature)) {
            creatures[creature] = function (_AI) {
                _inherits(creature, _AI);

                function creature(game, x, y, sprite, props) {
                    _classCallCheck(this, creature);

                    return _possibleConstructorReturn(this, (creature.__proto__ || Object.getPrototypeOf(creature)).call(this, game, x, y, sprite, props));
                }

                _createClass(creature, [{
                    key: 'update',
                    value: function update() {
                        this.animations.play('move');
                    }
                }]);

                return creature;
            }(_AI3.default);
        }
    }

    return {
        create: function create(creatureConfig) {
            var enemy = new creatures[creatureConfig.type](_this2.game, creatureConfig.origin.x, creatureConfig.origin.y, _this2.globalConfig.textureAtlasName, _this2.creatureConfig[creatureConfig.type]);
            _this2.enemies.add(enemy);
        }
    };
};

exports.default = creatureFactory;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjU3YWI2NTAzOGNiODM2YjUyNzciLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5pbml0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkucHJlbG9hZC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnVwZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvY3JlYXR1cmVGYWN0b3J5LmpzIl0sIm5hbWVzIjpbIkFJIiwiZ2FtZSIsIngiLCJ5Iiwic3ByaXRlIiwicHJvcHMiLCJzcHJpdGVTdGF0ZSIsIm1vYngiLCJvYnNlcnZhYmxlIiwibGlmZSIsInN0dW4iLCJoaXQiLCJub2hpdCIsIkV4dGVuZGVkU3ByaXRlIiwiYW5pbWF0aW9ucyIsImFkZCIsImV4aXN0aW5nIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJhbmNob3IiLCJzZXRUbyIsImJvZHkiLCJjb2xsaWRlV29ybGRCb3VuZHMiLCJjaGVja1dvcmxkQm91bmRzIiwib3V0T2ZCb3VuZHNLaWxsIiwiZ3Jhdml0eSIsImZvckVhY2giLCJhbmltYXRpb24iLCJuYW1lIiwiZnJhbWVzIiwibWFwIiwiZnJhbWUiLCJ0b1N0cmluZyIsImZwcyIsImxvb3AiLCJnYW1lU3RhdGUiLCJzdGF0ZSIsInN0YXRlcyIsImN1cnJlbnQiLCJvYnNlcnZlIiwiY2hhbmdlIiwiY29uc29sZSIsImxvZyIsInVwZGF0ZVN0YXRlIiwiYWN0aW9uIiwiT2JqZWN0IiwiYXNzaWduIiwic2NhbGUiLCJ2ZWxvY2l0eSIsIm1heFNwZWVkIiwiYWNjZWxlcmF0aW9uIiwibW92ZVJpZ2h0IiwibW92ZUxlZnQiLCJ0b3VjaGluZyIsImRvd24iLCJibG9ja2VkIiwiaGl0VW50aWwiLCJ0aW1lIiwibm93IiwiYnJlYWtVbnRpbCIsImRpcmVjdGlvbiIsImxlZnQiLCJyaWdodCIsIlNwcml0ZSIsIkh1bWFuIiwiR2FtZVN0YXRlIiwiZ2xvYmFsQ29uZmlnIiwia2V5cyIsInVuZGVmaW5lZCIsInBsYXllciIsImVuZW15IiwibGV2ZWwiLCJiYWNrZ3JvdW5kTGF5ZXIiLCJncm91bmRMYXllciIsInRpbGVtYXAiLCJjcmVhdHVyZUNvbmZpZyIsImxldmVsTG9hZGVyIiwiY2FsbCIsImNyZWF0dXJlRmFjdG9yeSIsInByb3RvdHlwZSIsImluaXQiLCJwcmVsb2FkIiwiY3JlYXRlIiwidXBkYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsIndpZHRoIiwiaGVpZ2h0IiwiYmxvY2tzIiwiZG9tRWxlbWVudCIsImJhY2tncm91bmRQYXRoIiwidGlsZXNldFBhdGgiLCJsZXZlbFBhdGgiLCJ0ZXh0dXJlQXRsYXNQYXRoIiwidGV4dHVyZUF0bGFzTmFtZSIsInRleHR1cmVBdGxhc0ltYWdlIiwidGV4dHVyZUF0bGFzSnNvbiIsImFkdmFuY2VkVGltaW5nIiwid29ybGQiLCJzZXRCb3VuZHMiLCJzdGFydFN5c3RlbSIsImNyZWF0ZUJhY2tncm91bmQiLCJjcmVhdGVUaWxlcyIsImxldmVsQ29uZmlnIiwidGlsZXNldCIsInRpbGVzZXRJbWFnZSIsImNyZWF0ZUxheWVycyIsImxheWVycyIsImZpeGVkVG9DYW1lcmEiLCJmaXhlZEJhY2tncm91bmQiLCJyZXNpemVXb3JsZCIsImluaXRpYWxpc2VkIiwic2NvcmUiLCJlbnRyeVBvaW50IiwibWFuIiwiZGlubyIsIk1hdGgiLCJyYW5kb20iLCJlbmVtaWVzIiwiR3JvdXAiLCJjYW1lcmEiLCJmb2xsb3ciLCJpbnB1dCIsImtleWJvYXJkIiwiY3JlYXRlQ3Vyc29yS2V5cyIsInNwYWNlIiwiYWRkS2V5IiwiS2V5Ym9hcmQiLCJTUEFDRUJBUiIsIm1lbnUiLCJ0ZXh0IiwiZm9udCIsImZpbGwiLCJhbGlnbiIsInNldFRleHQiLCJsb2FkIiwiYXRsYXMiLCJMb2FkZXIiLCJURVhUVVJFX0FUTEFTX0pTT05fSEFTSCIsImltYWdlIiwiYmFja2dyb3VuZEtleSIsImJhY2tncm91bmRJbWFnZSIsImJhY2tncm91bmRJbWFnZUV4dGVuc2lvbiIsInRpbGVzZXRJbWFnZUV4dGVuc2lvbiIsInRpbGVkSnNvbiIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwiZGVidWciLCJwbGF5IiwiYXJjYWRlIiwiY29sbGlkZSIsImNvbGxpc2lvbkxheWVyIiwib3ZlcmxhcCIsImlzSGl0dGluZyIsImlzU3R1bm5lZCIsImh1cnQiLCJvbktleVByZXNzIiwiaXNEb3duIiwic3RvcCIsInVwIiwianVtcCIsIlBMQVRGT1JNRVIiLCJHYW1lIiwiQVVUTyIsImJpbmQiLCJmZXRjaCIsIm1ldGhvZCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJzdGFydCIsImxheWVyTmFtZSIsInRpbGVTcHJpdGUiLCJjcmVhdGVMYXllciIsImxheWVyIiwia2V5IiwidmlzaWJsZSIsInRpbGVtYXBLZXkiLCJ0aWxlc2V0S2V5IiwiYWRkVGlsZXNldEltYWdlIiwic2V0Q29sbGlzaW9uQmV0d2VlbiIsImRlYXRoTGF5ZXIiLCJjcmVhdHVyZUNvbmZpZ3MiLCJjcmVhdHVyZURlZmF1bHRzIiwiYWN0aXZlIiwiYm91bmNlIiwibWFzcyIsImp1bXBpbmciLCJsaXZlcyIsImxpZmVzcGFuIiwiSW5maW5pdHkiLCJzZW5zZSIsInRpbWVPZiIsImJvdW5kVG8iLCJ4MSIsIngyIiwiY29ycmVjdGVkQW5jaG9yIiwiYmVhciIsInRpZ2VyIiwicHRlcm8iLCJkcmFnb25mbHkiLCJiYXQiLCJzcGlkZXIiLCJuYXRpdmUiLCJwYXJyb3QiLCJpbnNlY3QiLCJidWciLCJmcm9nIiwidHVydGxlIiwiamVsbHkiLCJnb3JpbGxhIiwiY3JlYXR1cmUiLCJkZWZhdWx0cyIsInByb3AiLCJjcmVhdHVyZXMiLCJoYXNPd25Qcm9wZXJ0eSIsInR5cGUiLCJvcmlnaW4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2hFQTs7Ozs7Ozs7Ozs7O0lBRU1BLEU7OztBQUNGLGdCQUFZQyxJQUFaLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLE1BQXhCLEVBQWdDQyxLQUFoQyxFQUFzQztBQUFBOztBQUFBLDRHQUM1QkosSUFENEIsRUFDdEJDLENBRHNCLEVBQ25CQyxD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LE9BQUtrRSxZQUFMLENBQWtCNEIsZ0JBSlIsRUFLVixPQUFLbkIsY0FBTCxDQUFvQkEsZUFBZTZJLElBQW5DLENBTFUsQ0FBZDtBQU9BLG1CQUFLbEcsT0FBTCxDQUFhMUcsR0FBYixDQUFpQjBELEtBQWpCO0FBQ0g7QUFWRSxLQUFQO0FBWUg7O2tCQUVjUSxlIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGY1N2FiNjUwMzhjYjgzNmI1Mjc3IiwiaW1wb3J0IEV4dGVuZGVkU3ByaXRlIGZyb20gJy4vRXh0ZW5kZWRTcHJpdGUnO1xyXG5cclxuY2xhc3MgQUkgZXh0ZW5kcyBFeHRlbmRlZFNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGxpZmU6IDEwLFxyXG4gICAgICAgICAgICBzdHVuOiAwLFxyXG4gICAgICAgICAgICBoaXQ6IDAsXHJcbiAgICAgICAgICAgIG5vaGl0OiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFJO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvQUkuanMiLCJjbGFzcyBFeHRlbmRlZFNwcml0ZSBleHRlbmRzIFBoYXNlci5TcHJpdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzIHx8IHsgYW5pbWF0aW9uczogW10gfTtcclxuICAgICAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcclxuICAgICAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub3V0T2ZCb3VuZHNLaWxsID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gdGhpcy5wcm9wcy5ncmF2aXR5O1xyXG5cclxuICAgICAgICB0aGlzLnByb3BzLmFuaW1hdGlvbnMuZm9yRWFjaChhbmltYXRpb24gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24uZnJhbWVzLm1hcChmcmFtZSA9PiBmcmFtZS50b1N0cmluZygpKSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcHMsXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ubG9vcFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBnYW1lU3RhdGUgPSB0aGlzLmdhbWUuc3RhdGUuc3RhdGVzW3RoaXMuZ2FtZS5zdGF0ZS5jdXJyZW50XS5nYW1lU3RhdGU7XHJcblxyXG4gICAgICAgIG1vYngub2JzZXJ2ZShnYW1lU3RhdGUsIChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZScsIGNoYW5nZSwgZ2FtZVN0YXRlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSA9IG1vYnguYWN0aW9uKChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IE9iamVjdC5hc3NpZ24odGhpcy5zcHJpdGVTdGF0ZSwgY2hhbmdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNIaXR0aW5nKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlU3RhdGUuaGl0ID4gdGhpcy5nYW1lLnRpbWUubm93O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc1N0dW5uZWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcHJpdGVTdGF0ZS5zdHVuID4gdGhpcy5nYW1lLnRpbWUubm93O1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVMZWZ0KCl7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gLTE7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnZlbG9jaXR5LnggPiAtdGhpcy5wcm9wcy5tYXhTcGVlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC09IHRoaXMucHJvcHMuYWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlUmlnaHQoKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSAxO1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS52ZWxvY2l0eS54IDwgdGhpcy5wcm9wcy5tYXhTcGVlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ICs9IHRoaXMucHJvcHMuYWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlKCl7XHJcbiAgICAgICAgaWYodGhpcy5zY2FsZS54ID09PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlUmlnaHQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVMZWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKXtcclxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAvPSAxLjE7XHJcbiAgICB9XHJcblxyXG4gICAganVtcCgpe1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS50b3VjaGluZy5kb3duIHx8IHRoaXMuYm9keS5ibG9ja2VkLmRvd24pe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSAtPSAzMDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhpdCgpe1xyXG4gICAgICAgIGNvbnN0IGhpdFVudGlsID0gdGhpcy5nYW1lLnRpbWUubm93ICsgOTAwLFxyXG4gICAgICAgICAgICBicmVha1VudGlsID0gdGhpcy5nYW1lLnRpbWUubm93ICsgMTAwMDtcclxuICAgICAgICBjb25zb2xlLmxvZygnTm93ICVzIEhpdCAlcyBCcmVhayAlcycsIHRoaXMuZ2FtZS50aW1lLm5vdywgaGl0VW50aWwsIGJyZWFrVW50aWwpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICAgICAgICBoaXQ6IGhpdFVudGlsLFxyXG4gICAgICAgICAgICBub2hpdDogYnJlYWtVbnRpbFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGh1cnQoZGlyZWN0aW9uKXtcclxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSAtPSAxMDA7XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uICYmIGRpcmVjdGlvbi5sZWZ0KXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggLT0gMTAwIHx8IHRoaXMucHJvcHMubWF4U3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRpcmVjdGlvbiAmJiBkaXJlY3Rpb24ucmlnaHQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCArPSAxMDAgfHwgdGhpcy5wcm9wcy5tYXhTcGVlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnW1Nwcml0ZV0gc3RhdGUnKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4dGVuZGVkU3ByaXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvRXh0ZW5kZWRTcHJpdGUuanMiLCJpbXBvcnQgRXh0ZW5kZWRTcHJpdGUgZnJvbSAnLi9FeHRlbmRlZFNwcml0ZSc7XHJcblxyXG5jbGFzcyBIdW1hbiBleHRlbmRzIEV4dGVuZGVkU3ByaXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gbW9ieC5vYnNlcnZhYmxlKHtcclxuICAgICAgICAgICAgbGlmZTogMTAsXHJcbiAgICAgICAgICAgIHN0dW46IDAsXHJcbiAgICAgICAgICAgIGhpdDogMCxcclxuICAgICAgICAgICAgbm9oaXQ6IDBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSHVtYW47XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9IdW1hbi5qcyIsImltcG9ydCBBSSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0FJJztcbmltcG9ydCBIdW1hbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL0h1bWFuJztcblxuaW1wb3J0IGxldmVsTG9hZGVyIGZyb20gJy4uLy4uL3NlcnZpY2VzL2xldmVsTG9hZGVyJztcbmltcG9ydCBjcmVhdHVyZUZhY3RvcnkgZnJvbSAnLi4vLi4vc2VydmljZXMvY3JlYXR1cmVGYWN0b3J5JztcbmltcG9ydCBjcmVhdHVyZUNvbmZpZyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnJztcblxuaW1wb3J0IGluaXQgZnJvbSAnLi9wbGF5LmluaXQnO1xuaW1wb3J0IHByZWxvYWQgZnJvbSAnLi9wbGF5LnByZWxvYWQnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuL3BsYXkuY3JlYXRlJztcbmltcG9ydCB1cGRhdGUgZnJvbSAnLi9wbGF5LnVwZGF0ZSc7XG5cclxuY2xhc3MgR2FtZVN0YXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKGdsb2JhbENvbmZpZykge1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnBsYXllciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmVuZW15ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMubGV2ZWwgPSB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRMYXllcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBncm91bmRMYXllcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB0aWxlbWFwOiB1bmRlZmluZWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZyA9IGdsb2JhbENvbmZpZztcclxuICAgICAgICB0aGlzLmNyZWF0dXJlQ29uZmlnID0gY3JlYXR1cmVDb25maWc7XHJcbiAgICAgICAgdGhpcy5sZXZlbExvYWRlciA9IGxldmVsTG9hZGVyLmNhbGwodGhpcyk7XHJcbiAgICAgICAgdGhpcy5jcmVhdHVyZUZhY3RvcnkgPSBjcmVhdHVyZUZhY3RvcnkuY2FsbCh0aGlzKTtcclxuICAgIH1cclxufVxuXG5HYW1lU3RhdGUucHJvdG90eXBlLmluaXQgPSBpbml0O1xuR2FtZVN0YXRlLnByb3RvdHlwZS5wcmVsb2FkID0gcHJlbG9hZDtcclxuR2FtZVN0YXRlLnByb3RvdHlwZS5jcmVhdGUgPSBjcmVhdGU7XHJcbkdhbWVTdGF0ZS5wcm90b3R5cGUudXBkYXRlID0gdXBkYXRlO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lU3RhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L2luZGV4LmpzIiwiY29uc3QgZ2xvYmFsQ29uZmlnID0ge1xyXG4gICAgd2lkdGg6IDU0NixcclxuICAgIGhlaWdodDogMzY4LFxyXG4gICAgYmxvY2tzOiAzLFxyXG4gICAgZG9tRWxlbWVudDogJ2dhbWUnLFxyXG4gICAgYmFja2dyb3VuZFBhdGg6ICdiYWNrZ3JvdW5kcy8nLFxyXG4gICAgdGlsZXNldFBhdGg6ICd0aWxlc2V0cy8nLFxyXG4gICAgbGV2ZWxQYXRoOiAnbGV2ZWxzLycsXHJcbiAgICB0ZXh0dXJlQXRsYXNQYXRoOiAnc3ByaXRlc2hlZXRzLycsXHJcbiAgICB0ZXh0dXJlQXRsYXNOYW1lOiAncHJlMmF0bGFzJyxcclxuICAgIHRleHR1cmVBdGxhc0ltYWdlOiAncHJlMmF0bGFzLnBuZycsXHJcbiAgICB0ZXh0dXJlQXRsYXNKc29uOiAncHJlMmF0bGFzLmpzb24nXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnbG9iYWxDb25maWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2xvYmFsQ29uZmlnLmpzIiwiaW1wb3J0IEh1bWFuIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSHVtYW4nO1xyXG5pbXBvcnQgQUkgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9BSSc7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGUoKXtcclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0NyZWF0ZV0nKTtcclxuICAgIC8vIGZwcyBkZWJ1Z2dpbmdcclxuICAgIHRoaXMuZ2FtZS50aW1lLmFkdmFuY2VkVGltaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBbU0VUIExFVkVMXSBzZXQgZGltZW5zaW9ucywgc3RhcnQgcGh5c2ljIHN5c3RlbVxyXG4gICAgdGhpcy5nYW1lLndvcmxkLnNldEJvdW5kcyhcclxuICAgICAgICAwLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcud2lkdGggKiB0aGlzLmdsb2JhbENvbmZpZy5ibG9ja3MsXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcuaGVpZ2h0XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcblxyXG4gICAgdGhpcy5sZXZlbExvYWRlci5jcmVhdGVCYWNrZ3JvdW5kKCdiYWNrZ3JvdW5kTGF5ZXInKTtcclxuICAgIHRoaXMubGV2ZWxMb2FkZXIuY3JlYXRlVGlsZXMoXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy50aWxlbWFwLFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcudGlsZXNldCxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXRJbWFnZVxyXG4gICAgKTtcclxuICAgIHRoaXMubGV2ZWxMb2FkZXIuY3JlYXRlTGF5ZXJzKHRoaXMubGV2ZWxDb25maWcubGF5ZXJzKTtcclxuXHJcbiAgICAvLyBbU0VUIExFVkVMXSBmaXggYmFja2dyb3VuZCwgcmVzaXplXHJcbiAgICB0aGlzLmxldmVsLmJhY2tncm91bmRMYXllci5maXhlZFRvQ2FtZXJhID0gdGhpcy5sZXZlbENvbmZpZy5maXhlZEJhY2tncm91bmQ7XHJcbiAgICB0aGlzLmxldmVsLmdyb3VuZExheWVyLnJlc2l6ZVdvcmxkKCk7XHJcblxyXG4gICAgdGhpcy5nYW1lU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgIGluaXRpYWxpc2VkOiBmYWxzZSxcclxuICAgICAgICBzY29yZTogMFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSA9IG1vYnguYWN0aW9uKChjaGFuZ2UpID0+IHtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IE9iamVjdC5hc3NpZ24odGhpcy5nYW1lU3RhdGUsIGNoYW5nZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtb2J4Lm9ic2VydmUodGhpcy5nYW1lU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tnYW1lU3RhdGVdIGNoYW5nZScsIGNoYW5nZSwgdGhpcy5nYW1lU3RhdGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7IGluaXRpYWxpc2VkOiB0cnVlIH0pO1xyXG5cclxuICAgIC8vIFtQTEFZRVJdXHJcbiAgICB0aGlzLnBsYXllciA9IG5ldyBIdW1hbihcclxuICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5lbnRyeVBvaW50LngsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5lbnRyeVBvaW50LnksXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcudGV4dHVyZUF0bGFzTmFtZSxcclxuICAgICAgICB0aGlzLmNyZWF0dXJlQ29uZmlnLm1hblxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBbRU5FTVldXHJcbiAgICB0aGlzLmVuZW15ID0gbmV3IEFJKFxyXG4gICAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmVudHJ5UG9pbnQueCArIDUwLCBcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmVudHJ5UG9pbnQueSxcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy50ZXh0dXJlQXRsYXNOYW1lLFxyXG4gICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWcuZGlub1xyXG4gICAgKTtcclxuICAgIHRoaXMuZW5lbXkuYm9keS52ZWxvY2l0eS54ID0gTWF0aC5yYW5kb20oKSAqICgtMTApIC0gMTA7XHJcblxyXG4gICAgdGhpcy5lbmVtaWVzID0gbmV3IFBoYXNlci5Hcm91cCh0aGlzLmdhbWUpO1xyXG4gICAgdGhpcy5sZXZlbENvbmZpZy5lbmVtaWVzLmZvckVhY2godGhpcy5jcmVhdHVyZUZhY3RvcnkuY3JlYXRlKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XHJcblxyXG4gICAgLy8gYmluZCBrZXlzXHJcbiAgICB0aGlzLmtleXMgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xyXG4gICAgdGhpcy5rZXlzLnNwYWNlID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpO1xyXG5cclxuICAgIC8vIHNjb3JlIHRleHRcclxuICAgIHRoaXMubWVudSA9IHRoaXMuZ2FtZS5hZGQudGV4dChcclxuICAgICAgICAxNTAsXHJcbiAgICAgICAgMCxcclxuICAgICAgICBcIkxpZmU6IFwiICsgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSxcclxuICAgICAgICB7IGZvbnQ6IFwiMjRweCBDb3VyaWVyXCIsIGZpbGw6IFwiIzAwMFwiLCBhbGlnbjogXCJjZW50ZXJcIiB9XHJcbiAgICApO1xyXG4gICAgbW9ieC5vYnNlcnZlKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgIHRoaXMubWVudS5zZXRUZXh0KFwiTGlmZTogXCIgKyB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmNyZWF0ZS5qcyIsImZ1bmN0aW9uIGluaXQobGV2ZWxDb25maWcpe1xyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bSW5pdF0nLCBsZXZlbENvbmZpZyk7XHJcbiAgICB0aGlzLmxldmVsQ29uZmlnID0gbGV2ZWxDb25maWc7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbml0O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmluaXQuanMiLCJmdW5jdGlvbiBwcmVsb2FkKCl7XHJcbiAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtQcmVsb2FkXScpO1xyXG5cclxuICAgIC8vIGFzc2V0cyB0byBsb2FkIHJlbGF0aXZlIHRvIC9hc3NldHMvLi5cclxuICAgIHRoaXMuZ2FtZS5sb2FkLmF0bGFzKFxyXG4gICAgICAgICdwcmUyYXRsYXMnLFxyXG4gICAgICAgICdzcHJpdGVzaGVldHMvcHJlMmF0bGFzLnBuZycsXHJcbiAgICAgICAgJ3Nwcml0ZXNoZWV0cy9wcmUyYXRsYXMuanNvbicsXHJcbiAgICAgICAgUGhhc2VyLkxvYWRlci5URVhUVVJFX0FUTEFTX0pTT05fSEFTSFxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBsb2FkIGJhY2tncm91bmRcclxuICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKHRoaXMubGV2ZWxDb25maWcuYmFja2dyb3VuZEtleSwgdGhpcy5nbG9iYWxDb25maWcuYmFja2dyb3VuZFBhdGggKyB0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRJbWFnZSArIHRoaXMubGV2ZWxDb25maWcuYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uKTtcclxuICAgIC8vIGxvYWQgdGlsZXNldFxyXG4gICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UodGhpcy5sZXZlbENvbmZpZy50aWxlc2V0LCB0aGlzLmdsb2JhbENvbmZpZy50aWxlc2V0UGF0aCArIHRoaXMubGV2ZWxDb25maWcudGlsZXNldEltYWdlICsgdGhpcy5sZXZlbENvbmZpZy50aWxlc2V0SW1hZ2VFeHRlbnNpb24pO1xyXG4gICAgLy8gbG9hZCB0aWxlbWFwXHJcbiAgICB0aGlzLmdhbWUubG9hZC50aWxlbWFwKHRoaXMubGV2ZWxDb25maWcudGlsZW1hcCwgdGhpcy5nbG9iYWxDb25maWcubGV2ZWxQYXRoICsgdGhpcy5sZXZlbENvbmZpZy50aWxlZEpzb24sIG51bGwsIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByZWxvYWQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkucHJlbG9hZC5qcyIsImZ1bmN0aW9uIHVwZGF0ZSgpe1xyXG4gICAgLy9jb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtVcGRhdGVdJyk7XHJcbiAgICAvLyBmcHNcclxuICAgIHRoaXMuZ2FtZS5kZWJ1Zy50ZXh0KHRoaXMuZ2FtZS50aW1lLmZwcywgNSwgMjApO1xyXG5cclxuICAgIHRoaXMuZW5lbXkuYW5pbWF0aW9ucy5wbGF5KCdtb3ZlJyk7XHJcblxyXG4gICAgLy8gY29sbGlkZVxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMubGV2ZWwuY29sbGlzaW9uTGF5ZXIpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMuZW5lbWllcywgdGhpcy5sZXZlbC5jb2xsaXNpb25MYXllcik7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5wbGF5ZXIsIHRoaXMuZW5lbXksIChwbGF5ZXIsIGVuZW15KSA9PiB7XHJcbiAgICAgICAgaWYoIXRoaXMucGxheWVyLmlzSGl0dGluZyAmJiAhdGhpcy5wbGF5ZXIuaXNTdHVubmVkKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudXBkYXRlU3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgbGlmZTogdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSAtIDEsXHJcbiAgICAgICAgICAgICAgICBzdHVuOiB0aGlzLmdhbWUudGltZS5ub3cgKyAxNTAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5odXJ0KGVuZW15LmJvZHkudG91Y2hpbmcpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIG1vdmVcclxuICAgIG9uS2V5UHJlc3MuY2FsbCh0aGlzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb25LZXlQcmVzcygpe1xyXG4gICAgLy8gc3R1biA9PiBibG9ja2VkXHJcbiAgICBpZih0aGlzLnBsYXllci5pc1N0dW5uZWQpe1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnc3R1bicpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtb3ZlIGxlZnQgLyByaWdodFxyXG4gICAgaWYodGhpcy5rZXlzLmxlZnQuaXNEb3duKXtcclxuICAgICAgICB0aGlzLnBsYXllci5tb3ZlTGVmdCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnbW92ZScpO1xyXG4gICAgfSBlbHNlIGlmKHRoaXMua2V5cy5yaWdodC5pc0Rvd24pe1xyXG4gICAgICAgIHRoaXMucGxheWVyLm1vdmVSaWdodCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnbW92ZScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBsYXllci5zdG9wKCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdpZGxlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8ganVtcFxyXG4gICAgaWYodGhpcy5rZXlzLnVwLmlzRG93bil7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuanVtcCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnanVtcCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGhpdFxyXG4gICAgaWYodGhpcy5rZXlzLnNwYWNlLmlzRG93bil7XHJcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubm9oaXQgPCB0aGlzLmdhbWUudGltZS5ub3cgJiYgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUuaGl0IDwgdGhpcy5nYW1lLnRpbWUubm93KXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaGl0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnaGl0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1cGRhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkudXBkYXRlLmpzIiwiaW1wb3J0IGdsb2JhbENvbmZpZyBmcm9tICcuL2dsb2JhbENvbmZpZy5qcyc7XHJcbmltcG9ydCBQbGF5IGZyb20gJy4vZ2FtZXN0YXRlcy9wbGF5L2luZGV4LmpzJztcclxuXHJcbi8vIGluc3RhbnRpYXRlIGEgUGhhc2VyLkdhbWVcclxuY29uc3QgUExBVEZPUk1FUiA9IG5ldyBQaGFzZXIuR2FtZShcclxuICAgIGdsb2JhbENvbmZpZy53aWR0aCxcclxuICAgIGdsb2JhbENvbmZpZy5oZWlnaHQsXHJcbiAgICBQaGFzZXIuQVVUTyxcclxuICAgIGdsb2JhbENvbmZpZy5kb21FbGVtZW50XHJcbik7XHJcblxyXG4vLyByZWdpc3RlciBnYW1lc3RhdGVzICh3aWxsIGJlIGluc3RhbnRpYXRlZCB3LyB0aGlzLmdhbWUgYXMgMXN0IHBhcmFtLCBwYXNzIGdhbWVDb25maWcgYXMgMm5kKVxyXG5QTEFURk9STUVSLnN0YXRlLmFkZCgnUGxheScsIFBsYXkuYmluZChudWxsLCBnbG9iYWxDb25maWcpKTtcclxuXHJcbmZldGNoKCcvbGV2ZWwvMScsIHtcclxuICAgIG1ldGhvZDogJ0dFVCdcclxufSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxufSkudGhlbihmdW5jdGlvbihsZXZlbENvbmZpZykge1xyXG4gICAgUExBVEZPUk1FUi5zdGF0ZS5zdGFydCgnUGxheScsIHRydWUsIHRydWUsIGxldmVsQ29uZmlnKTtcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvaW5kZXguanMiLCJmdW5jdGlvbiBsZXZlbExvYWRlcigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlQmFja2dyb3VuZDogKGxheWVyTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLmJhY2tncm91bmRMYXllciA9IHRoaXMuZ2FtZS5hZGQudGlsZVNwcml0ZShcclxuICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbENvbmZpZy53aWR0aCxcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxDb25maWcuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5iYWNrZ3JvdW5kS2V5XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGVMYXllcjogKGxheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWxbbGF5ZXJdID0gdGhpcy5sZXZlbC50aWxlbWFwLmNyZWF0ZUxheWVyKHRoaXMubGV2ZWxDb25maWdbbGF5ZXJdKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZUxheWVyczogKGxheWVycykgPT4ge1xyXG4gICAgICAgICAgICBmb3IobGV0IGxheWVyIGluIGxheWVycyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsW2xheWVyXSA9IHRoaXMubGV2ZWwudGlsZW1hcC5jcmVhdGVMYXllcih0aGlzLmxldmVsQ29uZmlnLmxheWVyc1tsYXllcl0ua2V5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxbbGF5ZXJdLnZpc2libGUgPSB0aGlzLmxldmVsQ29uZmlnLmxheWVyc1tsYXllcl0udmlzaWJsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlVGlsZXM6ICh0aWxlbWFwS2V5LCB0aWxlc2V0S2V5LCB0aWxlc2V0SW1hZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC50aWxlbWFwID0gdGhpcy5nYW1lLmFkZC50aWxlbWFwKHRpbGVtYXBLZXkpO1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLnRpbGVtYXAuYWRkVGlsZXNldEltYWdlKHRpbGVzZXRJbWFnZSwgdGlsZXNldEtleSk7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDAsIDMwMDAsIHRydWUsIHRoaXMubGV2ZWxDb25maWcubGF5ZXJzLmNvbGxpc2lvbkxheWVyLmtleSk7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDAsIDMwMDAsIHRydWUsIHRoaXMubGV2ZWxDb25maWcubGF5ZXJzLmRlYXRoTGF5ZXIua2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGV2ZWxMb2FkZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxMb2FkZXIuanMiLCJ2YXIgY3JlYXR1cmVDb25maWdzID0ge1xyXG4gIGNyZWF0dXJlRGVmYXVsdHM6IHtcclxuICAgIGFjdGl2ZTogdHJ1ZSxcclxuICAgIGdyYXZpdHk6IDUwMCxcclxuICAgIGJvdW5jZTogMC4yLFxyXG4gICAgbWFzczogMSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiAxMDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGxpdmVzOiAxLFxyXG4gICAgbGlmZXNwYW46IEluZmluaXR5LFxyXG4gICAgc2Vuc2U6IDE1MCxcclxuICAgIGFuaW1hdGlvbnM6IFtdLFxyXG4gICAgdGltZU9mOiB7XHJcbiAgICAgICdtb3ZlJzogMjAwLFxyXG4gICAgICAnaGl0JzogMTAwLFxyXG4gICAgICAnaHVydCc6IDUwMCxcclxuICAgICAgJ3N0b3AnOiAyMDAsXHJcbiAgICAgICdpZGxlJzogMTBcclxuICAgIH0sXHJcbiAgICBib3VuZFRvIDoge1xyXG4gICAgICB4MTogMTAwMCxcclxuICAgICAgeDI6IDEyMDBcclxuICAgIH0sXHJcbiAgICBjb3JyZWN0ZWRBbmNob3I6IHtcclxuICAgICAgeDogMC41LFxyXG4gICAgICB5OiAwLjVcclxuICAgIH1cclxuICB9LFxyXG4gIG1hbjoge1xyXG4gICAgbWF4U3BlZWQ6IDIwMCxcclxuICAgIGxpdmVzOiA4LFxyXG4gICAgbGlmZXNwYW46IEluZmluaXR5LFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMTEsJzAzJywnMDUnLDE0LDIwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnaGl0JywgZnJhbWVzOiBbMjIsMjQsMjgsMzEsMzQsMjIsMjQsMjgsMzEsMzRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3N0b3AnLCBmcmFtZXM6IFs0Miw0NSw0OSw1Ml0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFsxNiw0MSw0Nyw1MCw1MCw1MCw1MCw1MCw1MCw1MCw1MCwxMyw1MCwxMyw1MCwxM10sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFsyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNywyNywyNywyNywyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwzMCwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNywzMCwyNywzMCwzNSwzNiwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwnMDcnLCcwNycsJzA3JywnMDcnLCcwMicsJzAyJ10sIGZwczogNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdodXJ0JywgZnJhbWVzOiBbMTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3N0dW4nLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMTldLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzExLCcwMycsJzA1JywxNCwyMF0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH1cclxuICAgIF0sXHJcbiAgICBjb3JyZWN0ZWRBbmNob3I6IHtcclxuICAgICAgeDogMC41LFxyXG4gICAgICB5OiAwLjhcclxuICAgIH1cclxuICB9LFxyXG4gIGRpbm86IHtcclxuICAgIG1hc3M6IDEuNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogNSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM2MCwzNjAsMzYwLDM2MCwzNjAsMzYwLDM2MCwzNjddLCBmcHM6IDUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM2MCwzNjEsMzY0LDM2NywzNjldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszNjAsMzYxLDM2NCwzNjcsMzY5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdmYWxsJywgZnJhbWVzOiBbMzY5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNzFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzYwLDM2MSwzNjQsMzY3XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBiZWFyOiB7XHJcbiAgICBtYXNzOiAxLjIsXHJcbiAgICBtYXhTcGVlZDogNzUsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxNSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMyMV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMjAsMzIxLDMyNF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNjYsMzYzLDM1OCwzMTddLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszMjhdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gICdzdXBlci1iZWFyJzoge1xyXG4gICAgYWNjZWxlcmF0aW9uOiAzMCxcclxuICAgIG1heFNwZWVkOiAyMDAsXHJcbiAgICBpbWFnZTogJ3N1cGVyLWJlYXItc3ByaXRlLXJlZicsIC8vIG92ZXJyaWRlIHNwcml0ZSAoY3JlYXR1cmUgbmFtZSBieSBkZWZhdWx0KVxyXG4gICAgYW5pbWF0aW9uczogW11cclxuICB9LFxyXG4gIHRpZ2VyOiB7XHJcbiAgICBtYXNzOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDIwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzkzLDM5NV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM5MywzOTVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszOTksNDAxXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZmFsbCcsIGZyYW1lczogWzM5OV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQwMl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszOTMsMzk1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBwdGVybzoge1xyXG4gICAgbWFzczogMC41LFxyXG4gICAgZ3Jhdml0eTogMCxcclxuICAgIGJvdW5jZTogMC4xLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IGZhbHNlLFxyXG4gICAgbWF4U3BlZWQ6IDEwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc3LDQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc3LDQ3N10sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbNDAzLDQwNCw0MDUsNDAzLDQwNCw0MDUsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDMsNDA0LDQwNSw0MDMsNDA0LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDA1LDQwNV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGVzY2VuZCcsIGZyYW1lczogWzQwNV0sIGZwczogMTUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnYXNjZW5kJywgZnJhbWVzOiBbNDAzLDQwNCw0MDVdLCBmcHM6IDE1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQ3MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFs0MDUsNDAzLDQwNF0sIGZwczogMTUsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgZHJhZ29uZmx5OiB7XHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzM3LDMzOF0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMzNywzMzhdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3R1cm4nLCBmcmFtZXM6IFszMzksMzQwXSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNDJdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzM3LDMzOF0sIGZwczogMTIsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgYmF0OiB7XHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogMjAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzUxLDM1MiwzNTEsMzUxLDM1MSwzNTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszNTcsMzU5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNjJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzU3LDM1OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgc3BpZGVyOiB7XHJcbiAgICBtYXNzOiAwLjMsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszMzVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzY1LDM2OCwzNzAsMzcyXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzI5OSwzMDIsMzA1LDMwOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAndHVybicsIGZyYW1lczogWzMxOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnY2xpbWInLCBmcmFtZXM6IFszNDEsMzQzLDM0NSwzNDddLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3dhaXQnLCBmcmFtZXM6IFszMzIsMzM1LDM3Ml0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzIyXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgbmF0aXZlOiB7XHJcbiAgICBtYXhTcGVlZDogMTAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyMCxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNzNdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszNzMsMzc2LDM3OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzgwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNzMsMzc2LDM3OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgcGFycm90OiB7XHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogMTAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM5NCwzOTcsMzk4XSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzk0LDM5NywzOThdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQwMF0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzk0LDM5NywzOThdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGluc2VjdDoge1xyXG4gICAgbWFzczogMSxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEuNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMjUsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNDgsMzQ4LDM0OCwzNDgsMzQ4LDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMjMsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzMyMywzNDgsMzQ5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNDhdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzIzLDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGJ1Zzoge1xyXG4gICAgbWFzczogMSxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEuNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMjUsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM0NCwzNDZdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNDRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgZnJvZzoge1xyXG4gICAgbWFzczogMSxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEuNSxcclxuICAgIGp1bXBpbmc6IDUwMCxcclxuICAgIG1heFNwZWVkOiA4MCxcclxuICAgIGFjY2VsZXJhdGlvbjogNDAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszMjVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMjUsMzI3LDMzMSwzMjVdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzI1LDMyNywzMzEsMzI1XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzM0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzMyNSwzMjcsMzMxLDMyNV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHR1cnRsZToge1xyXG4gICAgbWFzczogMixcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAwLjMsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzkwXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM3NywzODEsMzg0LDM4NV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM4NywzODksMzkwLDM5MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzkyXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBqZWxseToge1xyXG4gICAgbWFzczogMixcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAxLFxyXG4gICAgbWF4U3BlZWQ6IDUsXHJcbiAgICBhY2NlbGVyYXRpb246IDEsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBnb3JpbGxhOiB7XHJcbiAgICBtYXNzOiA1LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZmFsbCcsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH1cclxufTtcclxuXHJcbmZvcih2YXIgY3JlYXR1cmUgaW4gY3JlYXR1cmVDb25maWdzKXtcclxuICAvL2NyZWF0dXJlQ29uZmlnc1tjcmVhdHVyZV0gPSBfLm1lcmdlKHt9LCBjb25maWdzLmNyZWF0dXJlRGVmYXVsdHMsIGNvbmZpZ3NbY3JlYXR1cmVdKTtcclxuICB2YXIgZGVmYXVsdHMgPSBjcmVhdHVyZUNvbmZpZ3NbJ2NyZWF0dXJlRGVmYXVsdHMnXTtcclxuICBmb3IodmFyIHByb3AgaW4gZGVmYXVsdHMpe1xyXG4gICAgaWYoY3JlYXR1cmVDb25maWdzW2NyZWF0dXJlXVtwcm9wXSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgY3JlYXR1cmVDb25maWdzW2NyZWF0dXJlXVtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdHVyZUNvbmZpZ3M7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZWNvbmZpZy5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9jb21wb25lbnRzL0FJJztcclxuXHJcbmZ1bmN0aW9uIGNyZWF0dXJlRmFjdG9yeSgpIHtcclxuICAgIGNvbnN0IGNyZWF0dXJlcyA9IHtcclxuICAgICAgICBiYXQ6ICdiYXQnLFxyXG4gICAgICAgIGJlYXI6ICdiZWFyJyxcclxuICAgICAgICBidWc6ICdidWcnLFxyXG4gICAgICAgIGRpbm86ICdkaW5vJyxcclxuICAgICAgICBkcmFnb25mbHk6ICdkcmFnb25mbHknLFxyXG4gICAgICAgIGZyb2c6ICdmcm9nJyxcclxuICAgICAgICBnb3JpbGxhOiAnZ29yaWxsYScsXHJcbiAgICAgICAgaW5zZWN0OiAnaW5zZWN0JyxcclxuICAgICAgICBqZWxseTogJ2plbGx5JyxcclxuICAgICAgICBuYXRpdmU6ICduYXRpdmUnLFxyXG4gICAgICAgIHBhcnJvdDogJ3BhcnJvdCcsXHJcbiAgICAgICAgcHRlcm86ICdwdGVybycsXHJcbiAgICAgICAgc3BpZGVyOiAnc3BpZGVyJyxcclxuICAgICAgICB0aWdlcjogJ3RpZ2VyJyxcclxuICAgICAgICB0dXJ0bGU6ICd0dXJ0bGUnXHJcbiAgICB9O1xyXG5cclxuICAgIGZvcihsZXQgY3JlYXR1cmUgaW4gY3JlYXR1cmVzKXtcclxuICAgICAgICBpZihjcmVhdHVyZXMuaGFzT3duUHJvcGVydHkoY3JlYXR1cmUpKXtcclxuICAgICAgICAgICAgY3JlYXR1cmVzW2NyZWF0dXJlXSA9IGNsYXNzIGNyZWF0dXJlIGV4dGVuZHMgQUkge1xyXG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcbiAgICAgICAgICAgIFx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpO1xyXG4gICAgICAgICAgICBcdH1cclxuICAgICAgICAgICAgICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdtb3ZlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGU6IChjcmVhdHVyZUNvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBlbmVteSA9IG5ldyBjcmVhdHVyZXNbY3JlYXR1cmVDb25maWcudHlwZV0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgICAgICAgICBjcmVhdHVyZUNvbmZpZy5vcmlnaW4ueCxcclxuICAgICAgICAgICAgICAgIGNyZWF0dXJlQ29uZmlnLm9yaWdpbi55LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxDb25maWcudGV4dHVyZUF0bGFzTmFtZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWdbY3JlYXR1cmVDb25maWcudHlwZV1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLmFkZChlbmVteSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0dXJlRmFjdG9yeTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9jcmVhdHVyZUZhY3RvcnkuanMiXSwic291cmNlUm9vdCI6IiJ9