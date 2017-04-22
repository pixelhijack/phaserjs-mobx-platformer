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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    _createClass(AI, [{
        key: 'turnIfBlocked',
        value: function turnIfBlocked() {
            if (this.body.blocked.left || this.body.blocked.right) {
                this.scale.x *= -1;
            }
        }
    }, {
        key: 'turn',
        value: function turn() {
            this.scale.x *= -1;
        }
    }, {
        key: 'update',
        value: function update() {
            this.animations.play('move');
            this.turnIfBlocked();
            this.move();
        }
    }]);

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

    // [ENEMIES]
    this.enemies = new Phaser.Group(this.game);
    this.levelConfig.enemies.forEach(this.creatureFactory.create);

    this.game.camera.follow(this.player);

    // bind keys
    this.keys = this.game.input.keyboard.createCursorKeys();
    this.keys.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // score text
    this.menu = this.game.add.text(this.globalConfig.width - 120, 0, "Life: " + this.player.spriteState.life, { font: "24px Courier", fill: "#fff", align: "center" });
    this.menu.fixedToCamera = true;
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

    // collide
    this.game.physics.arcade.collide(this.player, this.level.collisionLayer);

    this.game.physics.arcade.collide(this.enemies, this.level.collisionLayer);

    this.game.physics.arcade.overlap(this.player, this.enemies, function (player, enemy) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmFjNjYzNzBiOThiYWE3ZWNiNjkiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5pbml0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkucHJlbG9hZC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnVwZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvY3JlYXR1cmVGYWN0b3J5LmpzIl0sIm5hbWVzIjpbIkFJIiwiZ2FtZSIsIngiLCJ5Iiwic3ByaXRlIiwicHJvcHMiLCJzcHJpdGVTdGF0ZSIsIm1vYngiLCJvYnNlcnZhYmxlIiwibGlmZSIsInN0dW4iLCJoaXQiLCJub2hpdCIsImJvZHkiLCJibG9ja2VkIiwibGVmdCIsInJpZ2h0Iiwic2NhbGUiLCJhbmltYXRpb25zIiwicGxheSIsInR1cm5JZkJsb2NrZWQiLCJtb3ZlIiwiRXh0ZW5kZWRTcHJpdGUiLCJhZGQiLCJleGlzdGluZyIsInBoeXNpY3MiLCJlbmFibGUiLCJQaGFzZXIiLCJQaHlzaWNzIiwiQVJDQURFIiwiYW5jaG9yIiwic2V0VG8iLCJjb2xsaWRlV29ybGRCb3VuZHMiLCJjaGVja1dvcmxkQm91bmRzIiwib3V0T2ZCb3VuZHNLaWxsIiwiZ3Jhdml0eSIsImZvckVhY2giLCJhbmltYXRpb24iLCJuYW1lIiwiZnJhbWVzIiwibWFwIiwiZnJhbWUiLCJ0b1N0cmluZyIsImZwcyIsImxvb3AiLCJnYW1lU3RhdGUiLCJzdGF0ZSIsInN0YXRlcyIsImN1cnJlbnQiLCJvYnNlcnZlIiwiY2hhbmdlIiwiY29uc29sZSIsImxvZyIsInVwZGF0ZVN0YXRlIiwiYWN0aW9uIiwiT2JqZWN0IiwiYXNzaWduIiwidmVsb2NpdHkiLCJtYXhTcGVlZCIsImFjY2VsZXJhdGlvbiIsIm1vdmVSaWdodCIsIm1vdmVMZWZ0IiwidG91Y2hpbmciLCJkb3duIiwiaGl0VW50aWwiLCJ0aW1lIiwibm93IiwiYnJlYWtVbnRpbCIsImRpcmVjdGlvbiIsIlNwcml0ZSIsIkh1bWFuIiwiR2FtZVN0YXRlIiwiZ2xvYmFsQ29uZmlnIiwia2V5cyIsInVuZGVmaW5lZCIsInBsYXllciIsImVuZW15IiwibGV2ZWwiLCJiYWNrZ3JvdW5kTGF5ZXIiLCJncm91bmRMYXllciIsInRpbGVtYXAiLCJjcmVhdHVyZUNvbmZpZyIsImxldmVsTG9hZGVyIiwiY2FsbCIsImNyZWF0dXJlRmFjdG9yeSIsInByb3RvdHlwZSIsImluaXQiLCJwcmVsb2FkIiwiY3JlYXRlIiwidXBkYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsIndpZHRoIiwiaGVpZ2h0IiwiYmxvY2tzIiwiZG9tRWxlbWVudCIsImJhY2tncm91bmRQYXRoIiwidGlsZXNldFBhdGgiLCJsZXZlbFBhdGgiLCJ0ZXh0dXJlQXRsYXNQYXRoIiwidGV4dHVyZUF0bGFzTmFtZSIsInRleHR1cmVBdGxhc0ltYWdlIiwidGV4dHVyZUF0bGFzSnNvbiIsImFkdmFuY2VkVGltaW5nIiwid29ybGQiLCJzZXRCb3VuZHMiLCJzdGFydFN5c3RlbSIsImNyZWF0ZUJhY2tncm91bmQiLCJjcmVhdGVUaWxlcyIsImxldmVsQ29uZmlnIiwidGlsZXNldCIsInRpbGVzZXRJbWFnZSIsImNyZWF0ZUxheWVycyIsImxheWVycyIsImZpeGVkVG9DYW1lcmEiLCJmaXhlZEJhY2tncm91bmQiLCJyZXNpemVXb3JsZCIsImluaXRpYWxpc2VkIiwic2NvcmUiLCJlbnRyeVBvaW50IiwibWFuIiwiZW5lbWllcyIsIkdyb3VwIiwiY2FtZXJhIiwiZm9sbG93IiwiaW5wdXQiLCJrZXlib2FyZCIsImNyZWF0ZUN1cnNvcktleXMiLCJzcGFjZSIsImFkZEtleSIsIktleWJvYXJkIiwiU1BBQ0VCQVIiLCJtZW51IiwidGV4dCIsImZvbnQiLCJmaWxsIiwiYWxpZ24iLCJzZXRUZXh0IiwibG9hZCIsImF0bGFzIiwiTG9hZGVyIiwiVEVYVFVSRV9BVExBU19KU09OX0hBU0giLCJpbWFnZSIsImJhY2tncm91bmRLZXkiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJiYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb24iLCJ0aWxlc2V0SW1hZ2VFeHRlbnNpb24iLCJ0aWxlZEpzb24iLCJUaWxlbWFwIiwiVElMRURfSlNPTiIsImRlYnVnIiwiYXJjYWRlIiwiY29sbGlkZSIsImNvbGxpc2lvbkxheWVyIiwib3ZlcmxhcCIsImlzSGl0dGluZyIsImlzU3R1bm5lZCIsImh1cnQiLCJvbktleVByZXNzIiwiaXNEb3duIiwic3RvcCIsInVwIiwianVtcCIsIlBMQVRGT1JNRVIiLCJHYW1lIiwiQVVUTyIsImJpbmQiLCJmZXRjaCIsIm1ldGhvZCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJzdGFydCIsImxheWVyTmFtZSIsInRpbGVTcHJpdGUiLCJjcmVhdGVMYXllciIsImxheWVyIiwia2V5IiwidmlzaWJsZSIsInRpbGVtYXBLZXkiLCJ0aWxlc2V0S2V5IiwiYWRkVGlsZXNldEltYWdlIiwic2V0Q29sbGlzaW9uQmV0d2VlbiIsImRlYXRoTGF5ZXIiLCJjcmVhdHVyZUNvbmZpZ3MiLCJjcmVhdHVyZURlZmF1bHRzIiwiYWN0aXZlIiwiYm91bmNlIiwibWFzcyIsImp1bXBpbmciLCJsaXZlcyIsImxpZmVzcGFuIiwiSW5maW5pdHkiLCJzZW5zZSIsInRpbWVPZiIsImJvdW5kVG8iLCJ4MSIsIngyIiwiY29ycmVjdGVkQW5jaG9yIiwiZGlubyIsImJlYXIiLCJ0aWdlciIsInB0ZXJvIiwiZHJhZ29uZmx5IiwiYmF0Iiwic3BpZGVyIiwibmF0aXZlIiwicGFycm90IiwiaW5zZWN0IiwiYnVnIiwiZnJvZyIsInR1cnRsZSIsImplbGx5IiwiZ29yaWxsYSIsImNyZWF0dXJlIiwiZGVmYXVsdHMiLCJwcm9wIiwiY3JlYXR1cmVzIiwiaGFzT3duUHJvcGVydHkiLCJ0eXBlIiwib3JpZ2luIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQTs7Ozs7Ozs7Ozs7O0lBRU1BLEU7OztBQUNGLGdCQUFZQyxJQUFaLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLE1BQXhCLEVBQWdDQyxLQUFoQyxFQUFzQztBQUFBOztBQUFBLDRHQUM1QkosSUFENEIsRUFDdEJDLENBRHNC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ZTBJLElBQW5DLENBTFUsQ0FBZDtBQU9BLG1CQUFLbEcsT0FBTCxDQUFhbEcsR0FBYixDQUFpQnFELEtBQWpCO0FBQ0g7QUFWRSxLQUFQO0FBWUg7O2tCQUVjUSxlIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDJhYzY2MzcwYjk4YmFhN2VjYjY5IiwiaW1wb3J0IEV4dGVuZGVkU3ByaXRlIGZyb20gJy4vRXh0ZW5kZWRTcHJpdGUnO1xyXG5cclxuY2xhc3MgQUkgZXh0ZW5kcyBFeHRlbmRlZFNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGxpZmU6IDEwLFxyXG4gICAgICAgICAgICBzdHVuOiAwLFxyXG4gICAgICAgICAgICBoaXQ6IDAsXHJcbiAgICAgICAgICAgIG5vaGl0OiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0dXJuSWZCbG9ja2VkKCl7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LmJsb2NrZWQubGVmdCB8fCB0aGlzLmJvZHkuYmxvY2tlZC5yaWdodCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUueCAqPSAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0dXJuKCl7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ICo9IC0xO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgICAgICB0aGlzLnR1cm5JZkJsb2NrZWQoKTtcclxuICAgICAgICB0aGlzLm1vdmUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQUk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9BSS5qcyIsImNsYXNzIEV4dGVuZGVkU3ByaXRlIGV4dGVuZHMgUGhhc2VyLlNwcml0ZXtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHMgfHwgeyBhbmltYXRpb25zOiBbXSB9O1xyXG4gICAgICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xyXG4gICAgICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYm9keS5ncmF2aXR5LnkgPSB0aGlzLnByb3BzLmdyYXZpdHk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcHMuYW5pbWF0aW9ucy5mb3JFYWNoKGFuaW1hdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ubmFtZSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcmFtZXMubWFwKGZyYW1lID0+IGZyYW1lLnRvU3RyaW5nKCkpLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZwcyxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5sb29wXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdhbWVTdGF0ZSA9IHRoaXMuZ2FtZS5zdGF0ZS5zdGF0ZXNbdGhpcy5nYW1lLnN0YXRlLmN1cnJlbnRdLmdhbWVTdGF0ZTtcclxuXHJcbiAgICAgICAgbW9ieC5vYnNlcnZlKGdhbWVTdGF0ZSwgKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlJywgY2hhbmdlLCBnYW1lU3RhdGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gT2JqZWN0LmFzc2lnbih0aGlzLnNwcml0ZVN0YXRlLCBjaGFuZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0hpdHRpbmcoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcHJpdGVTdGF0ZS5oaXQgPiB0aGlzLmdhbWUudGltZS5ub3c7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzU3R1bm5lZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwcml0ZVN0YXRlLnN0dW4gPiB0aGlzLmdhbWUudGltZS5ub3c7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUxlZnQoKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSAtMTtcclxuICAgICAgICBpZih0aGlzLmJvZHkudmVsb2NpdHkueCA+IC10aGlzLnByb3BzLm1heFNwZWVkKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggLT0gdGhpcy5wcm9wcy5hY2NlbGVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVSaWdodCgpe1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IDE7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnZlbG9jaXR5LnggPCB0aGlzLnByb3BzLm1heFNwZWVkKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggKz0gdGhpcy5wcm9wcy5hY2NlbGVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmUoKXtcclxuICAgICAgICBpZih0aGlzLnNjYWxlLnggPT09IDEpe1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVSaWdodCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUxlZnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcCgpe1xyXG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC89IDEuMTtcclxuICAgIH1cclxuXHJcbiAgICBqdW1wKCl7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnRvdWNoaW5nLmRvd24gfHwgdGhpcy5ib2R5LmJsb2NrZWQuZG93bil7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55IC09IDMwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGl0KCl7XHJcbiAgICAgICAgY29uc3QgaGl0VW50aWwgPSB0aGlzLmdhbWUudGltZS5ub3cgKyA5MDAsXHJcbiAgICAgICAgICAgIGJyZWFrVW50aWwgPSB0aGlzLmdhbWUudGltZS5ub3cgKyAxMDAwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdOb3cgJXMgSGl0ICVzIEJyZWFrICVzJywgdGhpcy5nYW1lLnRpbWUubm93LCBoaXRVbnRpbCwgYnJlYWtVbnRpbCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgIGhpdDogaGl0VW50aWwsXHJcbiAgICAgICAgICAgIG5vaGl0OiBicmVha1VudGlsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaHVydChkaXJlY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55IC09IDEwMDtcclxuICAgICAgICBpZihkaXJlY3Rpb24gJiYgZGlyZWN0aW9uLmxlZnQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAtPSAxMDAgfHwgdGhpcy5wcm9wcy5tYXhTcGVlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uICYmIGRpcmVjdGlvbi5yaWdodCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ICs9IDEwMCB8fCB0aGlzLnByb3BzLm1heFNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdbU3ByaXRlXSBzdGF0ZScpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXh0ZW5kZWRTcHJpdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsImltcG9ydCBFeHRlbmRlZFNwcml0ZSBmcm9tICcuL0V4dGVuZGVkU3ByaXRlJztcclxuXHJcbmNsYXNzIEh1bWFuIGV4dGVuZHMgRXh0ZW5kZWRTcHJpdGUge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgICAgICBsaWZlOiAxMCxcclxuICAgICAgICAgICAgc3R1bjogMCxcclxuICAgICAgICAgICAgaGl0OiAwLFxyXG4gICAgICAgICAgICBub2hpdDogMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIdW1hbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0h1bWFuLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQUknO1xuaW1wb3J0IEh1bWFuIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSHVtYW4nO1xuXG5pbXBvcnQgbGV2ZWxMb2FkZXIgZnJvbSAnLi4vLi4vc2VydmljZXMvbGV2ZWxMb2FkZXInO1xuaW1wb3J0IGNyZWF0dXJlRmFjdG9yeSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jcmVhdHVyZUZhY3RvcnknO1xuaW1wb3J0IGNyZWF0dXJlQ29uZmlnIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY3JlYXR1cmVjb25maWcnO1xuXG5pbXBvcnQgaW5pdCBmcm9tICcuL3BsYXkuaW5pdCc7XG5pbXBvcnQgcHJlbG9hZCBmcm9tICcuL3BsYXkucHJlbG9hZCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy4vcGxheS5jcmVhdGUnO1xuaW1wb3J0IHVwZGF0ZSBmcm9tICcuL3BsYXkudXBkYXRlJztcblxyXG5jbGFzcyBHYW1lU3RhdGUge1xyXG4gICAgY29uc3RydWN0b3IoZ2xvYmFsQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5rZXlzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZW5lbXkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5sZXZlbCA9IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZExheWVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGdyb3VuZExheWVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHRpbGVtYXA6IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnID0gZ2xvYmFsQ29uZmlnO1xyXG4gICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWcgPSBjcmVhdHVyZUNvbmZpZztcclxuICAgICAgICB0aGlzLmxldmVsTG9hZGVyID0gbGV2ZWxMb2FkZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICB0aGlzLmNyZWF0dXJlRmFjdG9yeSA9IGNyZWF0dXJlRmFjdG9yeS5jYWxsKHRoaXMpO1xyXG4gICAgfVxyXG59XG5cbkdhbWVTdGF0ZS5wcm90b3R5cGUuaW5pdCA9IGluaXQ7XG5HYW1lU3RhdGUucHJvdG90eXBlLnByZWxvYWQgPSBwcmVsb2FkO1xyXG5HYW1lU3RhdGUucHJvdG90eXBlLmNyZWF0ZSA9IGNyZWF0ZTtcclxuR2FtZVN0YXRlLnByb3RvdHlwZS51cGRhdGUgPSB1cGRhdGU7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVTdGF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJjb25zdCBnbG9iYWxDb25maWcgPSB7XHJcbiAgICB3aWR0aDogNTQ2LFxyXG4gICAgaGVpZ2h0OiAzNjgsXHJcbiAgICBibG9ja3M6IDMsXHJcbiAgICBkb21FbGVtZW50OiAnZ2FtZScsXHJcbiAgICBiYWNrZ3JvdW5kUGF0aDogJ2JhY2tncm91bmRzLycsXHJcbiAgICB0aWxlc2V0UGF0aDogJ3RpbGVzZXRzLycsXHJcbiAgICBsZXZlbFBhdGg6ICdsZXZlbHMvJyxcclxuICAgIHRleHR1cmVBdGxhc1BhdGg6ICdzcHJpdGVzaGVldHMvJyxcclxuICAgIHRleHR1cmVBdGxhc05hbWU6ICdwcmUyYXRsYXMnLFxyXG4gICAgdGV4dHVyZUF0bGFzSW1hZ2U6ICdwcmUyYXRsYXMucG5nJyxcclxuICAgIHRleHR1cmVBdGxhc0pzb246ICdwcmUyYXRsYXMuanNvbidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdsb2JhbENvbmZpZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJpbXBvcnQgSHVtYW4gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9IdW1hbic7XHJcbmltcG9ydCBBSSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0FJJztcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZSgpe1xyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bQ3JlYXRlXScpO1xyXG4gICAgLy8gZnBzIGRlYnVnZ2luZ1xyXG4gICAgdGhpcy5nYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xyXG5cclxuICAgIC8vIFtTRVQgTEVWRUxdIHNldCBkaW1lbnNpb25zLCBzdGFydCBwaHlzaWMgc3lzdGVtXHJcbiAgICB0aGlzLmdhbWUud29ybGQuc2V0Qm91bmRzKFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgMCxcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy53aWR0aCAqIHRoaXMuZ2xvYmFsQ29uZmlnLmJsb2NrcyxcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy5oZWlnaHRcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuXHJcbiAgICB0aGlzLmxldmVsTG9hZGVyLmNyZWF0ZUJhY2tncm91bmQoJ2JhY2tncm91bmRMYXllcicpO1xyXG4gICAgdGhpcy5sZXZlbExvYWRlci5jcmVhdGVUaWxlcyhcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLnRpbGVtYXAsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy50aWxlc2V0LFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcudGlsZXNldEltYWdlXHJcbiAgICApO1xyXG4gICAgdGhpcy5sZXZlbExvYWRlci5jcmVhdGVMYXllcnModGhpcy5sZXZlbENvbmZpZy5sYXllcnMpO1xyXG5cclxuICAgIC8vIFtTRVQgTEVWRUxdIGZpeCBiYWNrZ3JvdW5kLCByZXNpemVcclxuICAgIHRoaXMubGV2ZWwuYmFja2dyb3VuZExheWVyLmZpeGVkVG9DYW1lcmEgPSB0aGlzLmxldmVsQ29uZmlnLmZpeGVkQmFja2dyb3VuZDtcclxuICAgIHRoaXMubGV2ZWwuZ3JvdW5kTGF5ZXIucmVzaXplV29ybGQoKTtcclxuXHJcbiAgICB0aGlzLmdhbWVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgaW5pdGlhbGlzZWQ6IGZhbHNlLFxyXG4gICAgICAgIHNjb3JlOiAwXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gT2JqZWN0LmFzc2lnbih0aGlzLmdhbWVTdGF0ZSwgY2hhbmdlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1vYngub2JzZXJ2ZSh0aGlzLmdhbWVTdGF0ZSwgY2hhbmdlID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnW2dhbWVTdGF0ZV0gY2hhbmdlJywgY2hhbmdlLCB0aGlzLmdhbWVTdGF0ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHsgaW5pdGlhbGlzZWQ6IHRydWUgfSk7XHJcblxyXG4gICAgLy8gW1BMQVlFUl1cclxuICAgIHRoaXMucGxheWVyID0gbmV3IEh1bWFuKFxyXG4gICAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmVudHJ5UG9pbnQueCxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmVudHJ5UG9pbnQueSxcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy50ZXh0dXJlQXRsYXNOYW1lLFxyXG4gICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWcubWFuXHJcbiAgICApO1xyXG5cclxuICAgIC8vIFtFTkVNSUVTXVxyXG4gICAgdGhpcy5lbmVtaWVzID0gbmV3IFBoYXNlci5Hcm91cCh0aGlzLmdhbWUpO1xyXG4gICAgdGhpcy5sZXZlbENvbmZpZy5lbmVtaWVzLmZvckVhY2godGhpcy5jcmVhdHVyZUZhY3RvcnkuY3JlYXRlKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XHJcblxyXG4gICAgLy8gYmluZCBrZXlzXHJcbiAgICB0aGlzLmtleXMgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xyXG4gICAgdGhpcy5rZXlzLnNwYWNlID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpO1xyXG5cclxuICAgIC8vIHNjb3JlIHRleHRcclxuICAgIHRoaXMubWVudSA9IHRoaXMuZ2FtZS5hZGQudGV4dChcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy53aWR0aCAtIDEyMCxcclxuICAgICAgICAwLFxyXG4gICAgICAgIFwiTGlmZTogXCIgKyB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlLFxyXG4gICAgICAgIHsgZm9udDogXCIyNHB4IENvdXJpZXJcIiwgZmlsbDogXCIjZmZmXCIsIGFsaWduOiBcImNlbnRlclwiIH1cclxuICAgICk7XHJcbiAgICB0aGlzLm1lbnUuZml4ZWRUb0NhbWVyYSA9IHRydWU7XHJcbiAgICBtb2J4Lm9ic2VydmUodGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgdGhpcy5tZW51LnNldFRleHQoXCJMaWZlOiBcIiArIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuY3JlYXRlLmpzIiwiZnVuY3Rpb24gaW5pdChsZXZlbENvbmZpZyl7XHJcbiAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtJbml0XScsIGxldmVsQ29uZmlnKTtcclxuICAgIHRoaXMubGV2ZWxDb25maWcgPSBsZXZlbENvbmZpZztcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGluaXQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuaW5pdC5qcyIsImZ1bmN0aW9uIHByZWxvYWQoKXtcclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW1ByZWxvYWRdJyk7XHJcblxyXG4gICAgLy8gYXNzZXRzIHRvIGxvYWQgcmVsYXRpdmUgdG8gL2Fzc2V0cy8uLlxyXG4gICAgdGhpcy5nYW1lLmxvYWQuYXRsYXMoXHJcbiAgICAgICAgJ3ByZTJhdGxhcycsXHJcbiAgICAgICAgJ3Nwcml0ZXNoZWV0cy9wcmUyYXRsYXMucG5nJyxcclxuICAgICAgICAnc3ByaXRlc2hlZXRzL3ByZTJhdGxhcy5qc29uJyxcclxuICAgICAgICBQaGFzZXIuTG9hZGVyLlRFWFRVUkVfQVRMQVNfSlNPTl9IQVNIXHJcbiAgICApO1xyXG5cclxuICAgIC8vIGxvYWQgYmFja2dyb3VuZFxyXG4gICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UodGhpcy5sZXZlbENvbmZpZy5iYWNrZ3JvdW5kS2V5LCB0aGlzLmdsb2JhbENvbmZpZy5iYWNrZ3JvdW5kUGF0aCArIHRoaXMubGV2ZWxDb25maWcuYmFja2dyb3VuZEltYWdlICsgdGhpcy5sZXZlbENvbmZpZy5iYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb24pO1xyXG4gICAgLy8gbG9hZCB0aWxlc2V0XHJcbiAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSh0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXQsIHRoaXMuZ2xvYmFsQ29uZmlnLnRpbGVzZXRQYXRoICsgdGhpcy5sZXZlbENvbmZpZy50aWxlc2V0SW1hZ2UgKyB0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXRJbWFnZUV4dGVuc2lvbik7XHJcbiAgICAvLyBsb2FkIHRpbGVtYXBcclxuICAgIHRoaXMuZ2FtZS5sb2FkLnRpbGVtYXAodGhpcy5sZXZlbENvbmZpZy50aWxlbWFwLCB0aGlzLmdsb2JhbENvbmZpZy5sZXZlbFBhdGggKyB0aGlzLmxldmVsQ29uZmlnLnRpbGVkSnNvbiwgbnVsbCwgUGhhc2VyLlRpbGVtYXAuVElMRURfSlNPTik7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJlbG9hZDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5wcmVsb2FkLmpzIiwiZnVuY3Rpb24gdXBkYXRlKCl7XHJcbiAgICAvL2NvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW1VwZGF0ZV0nKTtcclxuICAgIC8vIGZwc1xyXG4gICAgdGhpcy5nYW1lLmRlYnVnLnRleHQodGhpcy5nYW1lLnRpbWUuZnBzLCA1LCAyMCk7XHJcblxyXG4gICAgLy8gY29sbGlkZVxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMubGV2ZWwuY29sbGlzaW9uTGF5ZXIpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMuZW5lbWllcywgdGhpcy5sZXZlbC5jb2xsaXNpb25MYXllcik7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5wbGF5ZXIsIHRoaXMuZW5lbWllcywgKHBsYXllciwgZW5lbXkpID0+IHtcclxuICAgICAgICBpZighdGhpcy5wbGF5ZXIuaXNIaXR0aW5nICYmICF0aGlzLnBsYXllci5pc1N0dW5uZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBsaWZlOiB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlIC0gMSxcclxuICAgICAgICAgICAgICAgIHN0dW46IHRoaXMuZ2FtZS50aW1lLm5vdyArIDE1MDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmh1cnQoZW5lbXkuYm9keS50b3VjaGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gbW92ZVxyXG4gICAgb25LZXlQcmVzcy5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvbktleVByZXNzKCl7XHJcbiAgICAvLyBzdHVuID0+IGJsb2NrZWRcclxuICAgIGlmKHRoaXMucGxheWVyLmlzU3R1bm5lZCl7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdzdHVuJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1vdmUgbGVmdCAvIHJpZ2h0XHJcbiAgICBpZih0aGlzLmtleXMubGVmdC5pc0Rvd24pe1xyXG4gICAgICAgIHRoaXMucGxheWVyLm1vdmVMZWZ0KCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdtb3ZlJyk7XHJcbiAgICB9IGVsc2UgaWYodGhpcy5rZXlzLnJpZ2h0LmlzRG93bil7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZVJpZ2h0KCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdtb3ZlJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGxheWVyLnN0b3AoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2lkbGUnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBqdW1wXHJcbiAgICBpZih0aGlzLmtleXMudXAuaXNEb3duKXtcclxuICAgICAgICB0aGlzLnBsYXllci5qdW1wKCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdqdW1wJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaGl0XHJcbiAgICBpZih0aGlzLmtleXMuc3BhY2UuaXNEb3duKXtcclxuICAgICAgICBpZih0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5ub2hpdCA8IHRoaXMuZ2FtZS50aW1lLm5vdyAmJiB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5oaXQgPCB0aGlzLmdhbWUudGltZS5ub3cpe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5oaXQoKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdoaXQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVwZGF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS51cGRhdGUuanMiLCJpbXBvcnQgZ2xvYmFsQ29uZmlnIGZyb20gJy4vZ2xvYmFsQ29uZmlnLmpzJztcclxuaW1wb3J0IFBsYXkgZnJvbSAnLi9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMnO1xyXG5cclxuLy8gaW5zdGFudGlhdGUgYSBQaGFzZXIuR2FtZVxyXG5jb25zdCBQTEFURk9STUVSID0gbmV3IFBoYXNlci5HYW1lKFxyXG4gICAgZ2xvYmFsQ29uZmlnLndpZHRoLFxyXG4gICAgZ2xvYmFsQ29uZmlnLmhlaWdodCxcclxuICAgIFBoYXNlci5BVVRPLFxyXG4gICAgZ2xvYmFsQ29uZmlnLmRvbUVsZW1lbnRcclxuKTtcclxuXHJcbi8vIHJlZ2lzdGVyIGdhbWVzdGF0ZXMgKHdpbGwgYmUgaW5zdGFudGlhdGVkIHcvIHRoaXMuZ2FtZSBhcyAxc3QgcGFyYW0sIHBhc3MgZ2FtZUNvbmZpZyBhcyAybmQpXHJcblBMQVRGT1JNRVIuc3RhdGUuYWRkKCdQbGF5JywgUGxheS5iaW5kKG51bGwsIGdsb2JhbENvbmZpZykpO1xyXG5cclxuZmV0Y2goJy9sZXZlbC8xJywge1xyXG4gICAgbWV0aG9kOiAnR0VUJ1xyXG59KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG59KS50aGVuKGZ1bmN0aW9uKGxldmVsQ29uZmlnKSB7XHJcbiAgICBQTEFURk9STUVSLnN0YXRlLnN0YXJ0KCdQbGF5JywgdHJ1ZSwgdHJ1ZSwgbGV2ZWxDb25maWcpO1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9pbmRleC5qcyIsImZ1bmN0aW9uIGxldmVsTG9hZGVyKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGVCYWNrZ3JvdW5kOiAobGF5ZXJOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwuYmFja2dyb3VuZExheWVyID0gdGhpcy5nYW1lLmFkZC50aWxlU3ByaXRlKFxyXG4gICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsQ29uZmlnLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRLZXlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZUxheWVyOiAobGF5ZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbFtsYXllcl0gPSB0aGlzLmxldmVsLnRpbGVtYXAuY3JlYXRlTGF5ZXIodGhpcy5sZXZlbENvbmZpZ1tsYXllcl0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlTGF5ZXJzOiAobGF5ZXJzKSA9PiB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgbGF5ZXIgaW4gbGF5ZXJzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxbbGF5ZXJdID0gdGhpcy5sZXZlbC50aWxlbWFwLmNyZWF0ZUxheWVyKHRoaXMubGV2ZWxDb25maWcubGF5ZXJzW2xheWVyXS5rZXkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbFtsYXllcl0udmlzaWJsZSA9IHRoaXMubGV2ZWxDb25maWcubGF5ZXJzW2xheWVyXS52aXNpYmxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGVUaWxlczogKHRpbGVtYXBLZXksIHRpbGVzZXRLZXksIHRpbGVzZXRJbWFnZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLnRpbGVtYXAgPSB0aGlzLmdhbWUuYWRkLnRpbGVtYXAodGlsZW1hcEtleSk7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcC5hZGRUaWxlc2V0SW1hZ2UodGlsZXNldEltYWdlLCB0aWxlc2V0S2V5KTtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC50aWxlbWFwLnNldENvbGxpc2lvbkJldHdlZW4oMCwgMzAwMCwgdHJ1ZSwgdGhpcy5sZXZlbENvbmZpZy5sYXllcnMuY29sbGlzaW9uTGF5ZXIua2V5KTtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC50aWxlbWFwLnNldENvbGxpc2lvbkJldHdlZW4oMCwgMzAwMCwgdHJ1ZSwgdGhpcy5sZXZlbENvbmZpZy5sYXllcnMuZGVhdGhMYXllci5rZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsZXZlbExvYWRlcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbExvYWRlci5qcyIsInZhciBjcmVhdHVyZUNvbmZpZ3MgPSB7XHJcbiAgY3JlYXR1cmVEZWZhdWx0czoge1xyXG4gICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgZ3Jhdml0eTogNTAwLFxyXG4gICAgYm91bmNlOiAwLjIsXHJcbiAgICBtYXNzOiAxLFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDEwMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgbGl2ZXM6IDEsXHJcbiAgICBsaWZlc3BhbjogSW5maW5pdHksXHJcbiAgICBzZW5zZTogMTUwLFxyXG4gICAgYW5pbWF0aW9uczogW10sXHJcbiAgICB0aW1lT2Y6IHtcclxuICAgICAgJ21vdmUnOiAyMDAsXHJcbiAgICAgICdoaXQnOiAxMDAsXHJcbiAgICAgICdodXJ0JzogNTAwLFxyXG4gICAgICAnc3RvcCc6IDIwMCxcclxuICAgICAgJ2lkbGUnOiAxMFxyXG4gICAgfSxcclxuICAgIGJvdW5kVG8gOiB7XHJcbiAgICAgIHgxOiAxMDAwLFxyXG4gICAgICB4MjogMTIwMFxyXG4gICAgfSxcclxuICAgIGNvcnJlY3RlZEFuY2hvcjoge1xyXG4gICAgICB4OiAwLjUsXHJcbiAgICAgIHk6IDAuNVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbWFuOiB7XHJcbiAgICBtYXhTcGVlZDogMjAwLFxyXG4gICAgbGl2ZXM6IDgsXHJcbiAgICBsaWZlc3BhbjogSW5maW5pdHksXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFsxMSwnMDMnLCcwNScsMTQsMjBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdoaXQnLCBmcmFtZXM6IFsyMiwyNCwyOCwzMSwzNCwyMiwyNCwyOCwzMSwzNF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3RvcCcsIGZyYW1lczogWzQyLDQ1LDQ5LDUyXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzE2LDQxLDQ3LDUwLDUwLDUwLDUwLDUwLDUwLDUwLDUwLDEzLDUwLDEzLDUwLDEzXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI3LDI3LDI3LDI3LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDMwLDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI3LDMwLDI3LDMwLDM1LDM2LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LCcwNycsJzA3JywnMDcnLCcwNycsJzAyJywnMDInXSwgZnBzOiA1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2h1cnQnLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3R1bicsIGZyYW1lczogWzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMTEsJzAzJywnMDUnLDE0LDIwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfVxyXG4gICAgXSxcclxuICAgIGNvcnJlY3RlZEFuY2hvcjoge1xyXG4gICAgICB4OiAwLjUsXHJcbiAgICAgIHk6IDAuOFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGlubzoge1xyXG4gICAgbWFzczogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiA1LFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzYwLDM2MCwzNjAsMzYwLDM2MCwzNjAsMzYwLDM2N10sIGZwczogNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzYwLDM2MSwzNjQsMzY3LDM2OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzM2MCwzNjEsMzY0LDM2NywzNjldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2ZhbGwnLCBmcmFtZXM6IFszNjldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM3MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNjAsMzYxLDM2NCwzNjddLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGJlYXI6IHtcclxuICAgIG1hc3M6IDEuMixcclxuICAgIG1heFNwZWVkOiA3NSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDE1LFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzIxXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMyMCwzMjEsMzI0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM2NiwzNjMsMzU4LDMxN10sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzMyOF0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgJ3N1cGVyLWJlYXInOiB7XHJcbiAgICBhY2NlbGVyYXRpb246IDMwLFxyXG4gICAgbWF4U3BlZWQ6IDIwMCxcclxuICAgIGltYWdlOiAnc3VwZXItYmVhci1zcHJpdGUtcmVmJywgLy8gb3ZlcnJpZGUgc3ByaXRlIChjcmVhdHVyZSBuYW1lIGJ5IGRlZmF1bHQpXHJcbiAgICBhbmltYXRpb25zOiBbXVxyXG4gIH0sXHJcbiAgdGlnZXI6IHtcclxuICAgIG1hc3M6IDEuNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMjAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszOTMsMzk1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzkzLDM5NV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzM5OSw0MDFdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdmYWxsJywgZnJhbWVzOiBbMzk5XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDAyXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM5MywzOTVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHB0ZXJvOiB7XHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogMTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzcsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzcsNDc3XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFs0MDMsNDA0LDQwNSw0MDMsNDA0LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDA1LDQwMyw0MDQsNDA1LDQwMyw0MDQsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDA1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkZXNjZW5kJywgZnJhbWVzOiBbNDA1XSwgZnBzOiAxNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdhc2NlbmQnLCBmcmFtZXM6IFs0MDMsNDA0LDQwNV0sIGZwczogMTUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDcxXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzQwNSw0MDMsNDA0XSwgZnBzOiAxNSwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBkcmFnb25mbHk6IHtcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszMzcsMzM4XSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzM3LDMzOF0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAndHVybicsIGZyYW1lczogWzMzOSwzNDBdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM0Ml0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszMzcsMzM4XSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBiYXQ6IHtcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiAyMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNTEsMzUyLDM1MSwzNTEsMzUxLDM1MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM1NywzNTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM2Ml0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNTcsMzU5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBzcGlkZXI6IHtcclxuICAgIG1hc3M6IDAuMyxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMzNV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNjUsMzY4LDM3MCwzNzJdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMjk5LDMwMiwzMDUsMzA5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICd0dXJuJywgZnJhbWVzOiBbMzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdjbGltYicsIGZyYW1lczogWzM0MSwzNDMsMzQ1LDM0N10sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnd2FpdCcsIGZyYW1lczogWzMzMiwzMzUsMzcyXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszMjJdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBuYXRpdmU6IHtcclxuICAgIG1heFNwZWVkOiAxMDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDIwLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM3M10sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM3MywzNzYsMzc4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszODBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM3MywzNzYsMzc4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBwYXJyb3Q6IHtcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiAxMDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzk0LDM5NywzOThdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszOTQsMzk3LDM5OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDAwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszOTQsMzk3LDM5OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgaW5zZWN0OiB7XHJcbiAgICBtYXNzOiAxLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyNSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM0OCwzNDgsMzQ4LDM0OCwzNDgsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMyMywzNDgsMzQ5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzIzLDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM0OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszMjMsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgYnVnOiB7XHJcbiAgICBtYXNzOiAxLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyNSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzM0NCwzNDZdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM0NF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBmcm9nOiB7XHJcbiAgICBtYXNzOiAxLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMS41LFxyXG4gICAganVtcGluZzogNTAwLFxyXG4gICAgbWF4U3BlZWQ6IDgwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiA0MCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMyNV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMyNSwzMjcsMzMxLDMyNV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszMjUsMzI3LDMzMSwzMjVdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszMzRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzI1LDMyNywzMzEsMzI1XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgdHVydGxlOiB7XHJcbiAgICBtYXNzOiAyLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDAuMyxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszOTBdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzc3LDM4MSwzODQsMzg1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzg3LDM4OSwzOTAsMzkxXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszOTJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGplbGx5OiB7XHJcbiAgICBtYXNzOiAyLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEsXHJcbiAgICBtYXhTcGVlZDogNSxcclxuICAgIGFjY2VsZXJhdGlvbjogMSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbNDIwLDQzMyw0MzRdLCBmcHM6IDMsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGdvcmlsbGE6IHtcclxuICAgIG1hc3M6IDUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzQxMV0sIGZwczogNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdmYWxsJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfVxyXG59O1xyXG5cclxuZm9yKHZhciBjcmVhdHVyZSBpbiBjcmVhdHVyZUNvbmZpZ3Mpe1xyXG4gIC8vY3JlYXR1cmVDb25maWdzW2NyZWF0dXJlXSA9IF8ubWVyZ2Uoe30sIGNvbmZpZ3MuY3JlYXR1cmVEZWZhdWx0cywgY29uZmlnc1tjcmVhdHVyZV0pO1xyXG4gIHZhciBkZWZhdWx0cyA9IGNyZWF0dXJlQ29uZmlnc1snY3JlYXR1cmVEZWZhdWx0cyddO1xyXG4gIGZvcih2YXIgcHJvcCBpbiBkZWZhdWx0cyl7XHJcbiAgICBpZihjcmVhdHVyZUNvbmZpZ3NbY3JlYXR1cmVdW3Byb3BdID09PSB1bmRlZmluZWQpe1xyXG4gICAgICBjcmVhdHVyZUNvbmZpZ3NbY3JlYXR1cmVdW3Byb3BdID0gZGVmYXVsdHNbcHJvcF07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0dXJlQ29uZmlncztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL2NvbXBvbmVudHMvQUknO1xyXG5cclxuZnVuY3Rpb24gY3JlYXR1cmVGYWN0b3J5KCkge1xyXG4gICAgY29uc3QgY3JlYXR1cmVzID0ge1xyXG4gICAgICAgIGJhdDogJ2JhdCcsXHJcbiAgICAgICAgYmVhcjogJ2JlYXInLFxyXG4gICAgICAgIGJ1ZzogJ2J1ZycsXHJcbiAgICAgICAgZGlubzogJ2Rpbm8nLFxyXG4gICAgICAgIGRyYWdvbmZseTogJ2RyYWdvbmZseScsXHJcbiAgICAgICAgZnJvZzogJ2Zyb2cnLFxyXG4gICAgICAgIGdvcmlsbGE6ICdnb3JpbGxhJyxcclxuICAgICAgICBpbnNlY3Q6ICdpbnNlY3QnLFxyXG4gICAgICAgIGplbGx5OiAnamVsbHknLFxyXG4gICAgICAgIG5hdGl2ZTogJ25hdGl2ZScsXHJcbiAgICAgICAgcGFycm90OiAncGFycm90JyxcclxuICAgICAgICBwdGVybzogJ3B0ZXJvJyxcclxuICAgICAgICBzcGlkZXI6ICdzcGlkZXInLFxyXG4gICAgICAgIHRpZ2VyOiAndGlnZXInLFxyXG4gICAgICAgIHR1cnRsZTogJ3R1cnRsZSdcclxuICAgIH07XHJcblxyXG4gICAgZm9yKGxldCBjcmVhdHVyZSBpbiBjcmVhdHVyZXMpe1xyXG4gICAgICAgIGlmKGNyZWF0dXJlcy5oYXNPd25Qcm9wZXJ0eShjcmVhdHVyZSkpe1xyXG4gICAgICAgICAgICBjcmVhdHVyZXNbY3JlYXR1cmVdID0gY2xhc3MgY3JlYXR1cmUgZXh0ZW5kcyBBSSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuICAgICAgICAgICAgXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7XHJcbiAgICAgICAgICAgIFx0fVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlOiAoY3JlYXR1cmVDb25maWcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZW5lbXkgPSBuZXcgY3JlYXR1cmVzW2NyZWF0dXJlQ29uZmlnLnR5cGVdKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICAgICAgICAgICAgY3JlYXR1cmVDb25maWcub3JpZ2luLngsXHJcbiAgICAgICAgICAgICAgICBjcmVhdHVyZUNvbmZpZy5vcmlnaW4ueSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLnRleHR1cmVBdGxhc05hbWUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0dXJlQ29uZmlnW2NyZWF0dXJlQ29uZmlnLnR5cGVdXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5hZGQoZW5lbXkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdHVyZUZhY3Rvcnk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvY3JlYXR1cmVGYWN0b3J5LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==