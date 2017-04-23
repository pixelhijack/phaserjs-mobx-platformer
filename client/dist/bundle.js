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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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
        key: 'setBounds',
        value: function setBounds(boundTo) {
            if (boundTo) {
                if (boundTo.hasOwnProperty('x') && boundTo.hasOwnProperty('y')) {
                    this.boundTo = new Phaser.Point(boundTo.x, boundTo.y);
                }

                // @Rectangle { x1, x2 }
                if (boundTo.hasOwnProperty('x1') && boundTo.hasOwnProperty('x2') && !boundTo.hasOwnProperty('y1') && !boundTo.hasOwnProperty('y2')) {
                    this.boundTo = new Phaser.Rectangle(boundTo.x1, 0, boundTo.x2 - boundTo.x1, this.game.height);
                }

                // {x1, y1, x2, y2}
                if (boundTo.hasOwnProperty('x1') && boundTo.hasOwnProperty('x2') && boundTo.hasOwnProperty('y1') && boundTo.hasOwnProperty('y2')) {
                    this.boundTo = new Phaser.Rectangle(boundTo.x1, boundTo.y1, boundTo.x2 - boundTo.x1, boundTo.y2 - boundTo.y1);
                }
            }
        }
    }, {
        key: 'checkBounds',
        value: function checkBounds() {
            if (!this.boundTo || !Object.keys(this.boundTo).length) {
                return;
            }

            // @Point {x, y}
            if (!this.boundTo.hasOwnProperty('width') && !Phaser.Rectangle.containsPoint(this.getBounds(), this.boundTo) && (this.x < this.boundTo.x && !this.facingRight || this.x > this.boundTo.x && this.facingRight)) {
                this.turn();
            }

            // @Rectangle {x1, x2} or {x1, y1, x2, y2}
            if (this.boundTo && this.boundTo.hasOwnProperty('width') && (this.x < this.boundTo.x && this.facingLeft || this.x > this.boundTo.x + this.boundTo.width && this.facingRight)) {
                this.turn();
            }
        }
    }, {
        key: 'update',
        value: function update() {
            //this.debug(this.id);
            this.animations.play('move');
            this.checkBounds();
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
        _this._debugText = _this.addChild(_this.game.add.text(20, -20, 'debug', { font: "12px Courier", fill: "#ffffff" }));
        _this._debugText.visible = false;

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
        key: "moveLeft",
        value: function moveLeft() {
            this.scale.x = -1;
            if (this.body.velocity.x > -this.props.maxSpeed) {
                this.body.velocity.x -= this.props.acceleration;
            }
        }
    }, {
        key: "moveRight",
        value: function moveRight() {
            this.scale.x = 1;
            if (this.body.velocity.x < this.props.maxSpeed) {
                this.body.velocity.x += this.props.acceleration;
            }
        }
    }, {
        key: "move",
        value: function move() {
            if (this.scale.x === 1) {
                this.moveRight();
            } else {
                this.moveLeft();
            }
        }
    }, {
        key: "stop",
        value: function stop() {
            this.body.velocity.x /= 1.1;
        }
    }, {
        key: "jump",
        value: function jump() {
            if (this.body.touching.down || this.body.blocked.down) {
                this.body.velocity.y -= 300;
            }
        }
    }, {
        key: "hit",
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
        key: "hurt",
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
        key: "debug",
        value: function debug(text) {
            this._debugText.visible = true;
            this._debugText.scale.x = this.scale.x;
            this._debugText.setText(text.toString() || '');
        }
    }, {
        key: "update",
        value: function update() {
            //console.log('[Sprite] state');
        }
    }, {
        key: "isHitting",
        get: function get() {
            return this.spriteState.hit > this.game.time.now;
        }
    }, {
        key: "isStunned",
        get: function get() {
            return this.spriteState.stun > this.game.time.now;
        }
    }, {
        key: "facingRight",
        get: function get() {
            return this.scale.x > 0;
        }
    }, {
        key: "facingLeft",
        get: function get() {
            return this.scale.x < 0;
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

var _levelLoader = __webpack_require__(12);

var _levelLoader2 = _interopRequireDefault(_levelLoader);

var _creatureFactory = __webpack_require__(11);

var _creatureFactory2 = _interopRequireDefault(_creatureFactory);

var _creatureconfig = __webpack_require__(5);

var _creatureconfig2 = _interopRequireDefault(_creatureconfig);

var _play = __webpack_require__(7);

var _play2 = _interopRequireDefault(_play);

var _play3 = __webpack_require__(8);

var _play4 = _interopRequireDefault(_play3);

var _play5 = __webpack_require__(6);

var _play6 = _interopRequireDefault(_play5);

var _play7 = __webpack_require__(9);

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
    boundTo: {},
    correctedAnchor: {
      x: 0.5,
      y: 0.5
    }
  },
  man: {
    type: 'man',
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
    type: 'dino',
    mass: 1.5,
    jumping: 300,
    maxSpeed: 50,
    acceleration: 5,
    animations: [{ name: 'idle', frames: [360, 360, 360, 360, 360, 360, 360, 367], fps: 5, loop: true }, { name: 'move', frames: [360, 361, 364, 367, 369], fps: 10, loop: true }, { name: 'jump', frames: [360, 361, 364, 367, 369], fps: 10, loop: true }, { name: 'fall', frames: [369], fps: 10, loop: true }, { name: 'die', frames: [371], fps: 10, loop: true }, { name: 'spawn', frames: [360, 361, 364, 367], fps: 10, loop: true }]
  },
  bear: {
    type: 'bear',
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
    type: 'tiger',
    mass: 1.5,
    jumping: 300,
    maxSpeed: 50,
    acceleration: 20,
    animations: [{ name: 'idle', frames: [393, 395], fps: 10, loop: true }, { name: 'move', frames: [393, 395], fps: 10, loop: true }, { name: 'jump', frames: [399, 401], fps: 10, loop: false }, { name: 'fall', frames: [399], fps: 10, loop: false }, { name: 'die', frames: [402], fps: 10, loop: true }, { name: 'spawn', frames: [393, 395], fps: 10, loop: true }]
  },
  ptero: {
    type: 'ptero',
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
    type: 'dragonfly',
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
    type: 'bat',
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
    type: 'spider',
    mass: 0.3,
    jumping: 0,
    collide: true,
    bounce: 0,
    maxSpeed: 50,
    acceleration: 10,
    animations: [{ name: 'idle', frames: [335], fps: 10, loop: true }, { name: 'spawn', frames: [365, 368, 370, 372], fps: 10, loop: false }, { name: 'move', frames: [299, 302, 305, 309], fps: 10, loop: true }, { name: 'turn', frames: [319], fps: 10, loop: true }, { name: 'climb', frames: [341, 343, 345, 347], fps: 10, loop: true }, { name: 'wait', frames: [332, 335, 372], fps: 10, loop: true }, { name: 'die', frames: [322], fps: 10, loop: false }]
  },
  native: {
    type: 'native',
    maxSpeed: 100,
    acceleration: 20,
    jumping: 0,
    animations: [{ name: 'idle', frames: [373], fps: 10, loop: true }, { name: 'move', frames: [373, 376, 378], fps: 10, loop: true }, { name: 'die', frames: [380], fps: 10, loop: false }, { name: 'spawn', frames: [373, 376, 378], fps: 10, loop: true }]
  },
  parrot: {
    type: 'parrot',
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
    type: 'insect',
    mass: 1,
    collide: true,
    bounce: 1.5,
    jumping: 300,
    maxSpeed: 50,
    acceleration: 25,
    animations: [{ name: 'idle', frames: [348, 348, 348, 348, 348, 348, 349], fps: 10, loop: true }, { name: 'move', frames: [323, 348, 349], fps: 10, loop: true }, { name: 'jump', frames: [323, 348, 349], fps: 10, loop: true }, { name: 'die', frames: [348], fps: 10, loop: true }, { name: 'spawn', frames: [323, 348, 349], fps: 10, loop: true }]
  },
  bug: {
    type: 'bug',
    mass: 1,
    collide: true,
    bounce: 1.5,
    jumping: 300,
    maxSpeed: 50,
    acceleration: 25,
    animations: [{ name: 'idle', frames: [344, 344, 344, 344, 344, 344, 344, 344, 346], fps: 10, loop: true }, { name: 'move', frames: [344, 346], fps: 10, loop: true }, { name: 'jump', frames: [344, 346], fps: 10, loop: true }, { name: 'die', frames: [344], fps: 10, loop: true }, { name: 'spawn', frames: [344, 346], fps: 10, loop: true }]
  },
  frog: {
    type: 'frog',
    mass: 1,
    collide: true,
    bounce: 1.5,
    jumping: 500,
    maxSpeed: 80,
    acceleration: 40,
    animations: [{ name: 'idle', frames: [325], fps: 10, loop: true }, { name: 'move', frames: [325, 327, 331, 325], fps: 10, loop: false }, { name: 'jump', frames: [325, 327, 331, 325], fps: 10, loop: false }, { name: 'die', frames: [334], fps: 10, loop: true }, { name: 'spawn', frames: [325, 327, 331, 325], fps: 10, loop: false }]
  },
  turtle: {
    type: 'turtle',
    mass: 2,
    jumping: 0,
    collide: true,
    bounce: 0.3,
    maxSpeed: 50,
    acceleration: 10,
    animations: [{ name: 'idle', frames: [390], fps: 10, loop: true }, { name: 'spawn', frames: [377, 381, 384, 385], fps: 10, loop: true }, { name: 'move', frames: [387, 389, 390, 391], fps: 10, loop: true }, { name: 'die', frames: [392], fps: 10, loop: true }]
  },
  jelly: {
    type: 'jelly',
    mass: 2,
    jumping: 0,
    collide: true,
    bounce: 1,
    maxSpeed: 5,
    acceleration: 1,
    animations: [{ name: 'idle', frames: [420, 433, 434], fps: 3, loop: true }, { name: 'spawn', frames: [420, 433, 434], fps: 3, loop: true }, { name: 'move', frames: [420, 433, 434], fps: 3, loop: true }, { name: 'die', frames: [420, 433, 434], fps: 3, loop: true }]
  },
  gorilla: {
    type: 'gorilla',
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
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

                    var _this = _possibleConstructorReturn(this, (creature.__proto__ || Object.getPrototypeOf(creature)).call(this, game, x, y, sprite, props));

                    _this.id = props.type + '-' + x + '-' + y;
                    return _this;
                }

                return creature;
            }(_AI3.default);
        }
    }

    return {
        create: function create(levelConfig) {
            var enemy = new creatures[levelConfig.type](_this2.game, levelConfig.origin.x, levelConfig.origin.y, _this2.globalConfig.textureAtlasName, _this2.creatureConfig[levelConfig.type]);
            enemy.setBounds(levelConfig.boundTo);
            _this2.enemies.add(enemy);
        }
    };
};

exports.default = creatureFactory;

/***/ }),
/* 12 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2VjYmQwOGZkZDU5OWUyMTkwMDMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuY3JlYXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnByZWxvYWQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS51cGRhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2NyZWF0dXJlRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsTG9hZGVyLmpzIl0sIm5hbWVzIjpbIkFJIiwiZ2FtZSIsIngiLCJ5Iiwic3ByaXRlIiwicHJvcHMiLCJzcHJpdGVTdGF0ZSIsIm1vYngiLCJvYnNlcnZhYmxlIiwibGlmZSIsInN0dW4iLCJoaXQiLCJub2hpdCIsImJvZHkiLCJibG9ja2VkIiwibGVmdCIsInJpZ2h0Iiwic2NhbGUiLCJib3VuZFRvIiwiaGFzT3duUHJvcGVydHkiLCJQaGFzZXIiLCJQb2ludCIsIlJlY3RhbmdsZSIsIngxIiwieDIiLCJoZWlnaHQiLCJ5MSIsInkyIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImNvbnRhaW5zUG9pbnQiLCJnZXRCb3VuZHMiLCJmYWNpbmdSaWdodCIsInR1cm4iLCJmYWNpbmdMZWZ0Iiwid2lkdGgiLCJhbmltYXRpb25zIiwicGxheSIsImNoZWNrQm91bmRzIiwidHVybklmQmxvY2tlZCIsIm1vdmUiLCJFeHRlbmRlZFNwcml0ZSIsImFkZCIsImV4aXN0aW5nIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoeXNpY3MiLCJBUkNBREUiLCJhbmNob3IiLCJzZXRUbyIsImNvbGxpZGVXb3JsZEJvdW5kcyIsImNoZWNrV29ybGRCb3VuZHMiLCJvdXRPZkJvdW5kc0tpbGwiLCJncmF2aXR5IiwiX2RlYnVnVGV4dCIsImFkZENoaWxkIiwidGV4dCIsImZvbnQiLCJmaWxsIiwidmlzaWJsZSIsImZvckVhY2giLCJhbmltYXRpb24iLCJuYW1lIiwiZnJhbWVzIiwibWFwIiwiZnJhbWUiLCJ0b1N0cmluZyIsImZwcyIsImxvb3AiLCJnYW1lU3RhdGUiLCJzdGF0ZSIsInN0YXRlcyIsImN1cnJlbnQiLCJvYnNlcnZlIiwiY2hhbmdlIiwiY29uc29sZSIsImxvZyIsInVwZGF0ZVN0YXRlIiwiYWN0aW9uIiwiYXNzaWduIiwidmVsb2NpdHkiLCJtYXhTcGVlZCIsImFjY2VsZXJhdGlvbiIsIm1vdmVSaWdodCIsIm1vdmVMZWZ0IiwidG91Y2hpbmciLCJkb3duIiwiaGl0VW50aWwiLCJ0aW1lIiwibm93IiwiYnJlYWtVbnRpbCIsImRpcmVjdGlvbiIsInNldFRleHQiLCJTcHJpdGUiLCJIdW1hbiIsIkdhbWVTdGF0ZSIsImdsb2JhbENvbmZpZyIsInVuZGVmaW5lZCIsInBsYXllciIsImVuZW15IiwibGV2ZWwiLCJiYWNrZ3JvdW5kTGF5ZXIiLCJncm91bmRMYXllciIsInRpbGVtYXAiLCJjcmVhdHVyZUNvbmZpZyIsImxldmVsTG9hZGVyIiwiY2FsbCIsImNyZWF0dXJlRmFjdG9yeSIsInByb3RvdHlwZSIsImluaXQiLCJwcmVsb2FkIiwiY3JlYXRlIiwidXBkYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsImJsb2NrcyIsImRvbUVsZW1lbnQiLCJiYWNrZ3JvdW5kUGF0aCIsInRpbGVzZXRQYXRoIiwibGV2ZWxQYXRoIiwidGV4dHVyZUF0bGFzUGF0aCIsInRleHR1cmVBdGxhc05hbWUiLCJ0ZXh0dXJlQXRsYXNJbWFnZSIsInRleHR1cmVBdGxhc0pzb24iLCJjcmVhdHVyZUNvbmZpZ3MiLCJjcmVhdHVyZURlZmF1bHRzIiwiYWN0aXZlIiwiYm91bmNlIiwibWFzcyIsImp1bXBpbmciLCJjb2xsaWRlIiwibGl2ZXMiLCJsaWZlc3BhbiIsIkluZmluaXR5Iiwic2Vuc2UiLCJ0aW1lT2YiLCJjb3JyZWN0ZWRBbmNob3IiLCJtYW4iLCJ0eXBlIiwiZGlubyIsImJlYXIiLCJpbWFnZSIsInRpZ2VyIiwicHRlcm8iLCJkcmFnb25mbHkiLCJiYXQiLCJzcGlkZXIiLCJuYXRpdmUiLCJwYXJyb3QiLCJpbnNlY3QiLCJidWciLCJmcm9nIiwidHVydGxlIiwiamVsbHkiLCJnb3JpbGxhIiwiY3JlYXR1cmUiLCJkZWZhdWx0cyIsInByb3AiLCJhZHZhbmNlZFRpbWluZyIsIndvcmxkIiwic2V0Qm91bmRzIiwic3RhcnRTeXN0ZW0iLCJjcmVhdGVCYWNrZ3JvdW5kIiwiY3JlYXRlVGlsZXMiLCJsZXZlbENvbmZpZyIsInRpbGVzZXQiLCJ0aWxlc2V0SW1hZ2UiLCJjcmVhdGVMYXllcnMiLCJsYXllcnMiLCJmaXhlZFRvQ2FtZXJhIiwiZml4ZWRCYWNrZ3JvdW5kIiwicmVzaXplV29ybGQiLCJpbml0aWFsaXNlZCIsInNjb3JlIiwiZW50cnlQb2ludCIsImVuZW1pZXMiLCJHcm91cCIsImNhbWVyYSIsImZvbGxvdyIsImlucHV0Iiwia2V5Ym9hcmQiLCJjcmVhdGVDdXJzb3JLZXlzIiwic3BhY2UiLCJhZGRLZXkiLCJLZXlib2FyZCIsIlNQQUNFQkFSIiwibWVudSIsImFsaWduIiwibG9hZCIsImF0bGFzIiwiTG9hZGVyIiwiVEVYVFVSRV9BVExBU19KU09OX0hBU0giLCJiYWNrZ3JvdW5kS2V5IiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uIiwidGlsZXNldEltYWdlRXh0ZW5zaW9uIiwidGlsZWRKc29uIiwiVGlsZW1hcCIsIlRJTEVEX0pTT04iLCJkZWJ1ZyIsImFyY2FkZSIsImNvbGxpc2lvbkxheWVyIiwib3ZlcmxhcCIsImlzSGl0dGluZyIsImlzU3R1bm5lZCIsImh1cnQiLCJvbktleVByZXNzIiwiaXNEb3duIiwic3RvcCIsInVwIiwianVtcCIsIlBMQVRGT1JNRVIiLCJHYW1lIiwiQVVUTyIsImJpbmQiLCJmZXRjaCIsIm1ldGhvZCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJzdGFydCIsImNyZWF0dXJlcyIsImlkIiwib3JpZ2luIiwibGF5ZXJOYW1lIiwidGlsZVNwcml0ZSIsImNyZWF0ZUxheWVyIiwibGF5ZXIiLCJrZXkiLCJ0aWxlbWFwS2V5IiwidGlsZXNldEtleSIsImFkZFRpbGVzZXRJbWFnZSIsInNldENvbGxpc2lvbkJldHdlZW4iLCJkZWF0aExheWVyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7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YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzZWNiZDA4ZmRkNTk5ZTIxOTAwMyIsImltcG9ydCBFeHRlbmRlZFNwcml0ZSBmcm9tICcuL0V4dGVuZGVkU3ByaXRlJztcclxuXHJcbmNsYXNzIEFJIGV4dGVuZHMgRXh0ZW5kZWRTcHJpdGUge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgICAgICBsaWZlOiAxMCxcclxuICAgICAgICAgICAgc3R1bjogMCxcclxuICAgICAgICAgICAgaGl0OiAwLFxyXG4gICAgICAgICAgICBub2hpdDogMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICAgIHR1cm5JZkJsb2NrZWQoKXtcclxuICAgICAgICBpZih0aGlzLmJvZHkuYmxvY2tlZC5sZWZ0IHx8IHRoaXMuYm9keS5ibG9ja2VkLnJpZ2h0KXtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS54ICo9IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHR1cm4oKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggKj0gLTE7XHJcbiAgICB9XHJcbiAgICBzZXRCb3VuZHMoYm91bmRUbyl7XHJcbiAgICAgICAgaWYoYm91bmRUbyl7XHJcbiAgICAgICAgICAgIGlmKGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3gnKSAmJlxyXG4gICAgICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneScpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdW5kVG8gPSBuZXcgUGhhc2VyLlBvaW50KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEBSZWN0YW5nbGUgeyB4MSwgeDIgfVxyXG4gICAgICAgICAgICBpZihib3VuZFRvLmhhc093blByb3BlcnR5KCd4MScpICYmXHJcbiAgICAgICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd4MicpICYmXHJcbiAgICAgICAgICAgICAgICAhYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTEnKSAmJlxyXG4gICAgICAgICAgICAgICAgIWJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3kyJykpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRUbyA9IG5ldyBQaGFzZXIuUmVjdGFuZ2xlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngyIC0gYm91bmRUby54MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHt4MSwgeTEsIHgyLCB5Mn1cclxuICAgICAgICAgICAgaWYoYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneDEnKSAmJlxyXG4gICAgICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneDInKSAmJlxyXG4gICAgICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTEnKSAmJlxyXG4gICAgICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTInKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3VuZFRvID0gbmV3IFBoYXNlci5SZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDIgLSBib3VuZFRvLngxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZFRvLnkyIC0gYm91bmRUby55MVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjaGVja0JvdW5kcygpe1xyXG4gICAgICAgIGlmKCF0aGlzLmJvdW5kVG8gfHwgIU9iamVjdC5rZXlzKHRoaXMuYm91bmRUbykubGVuZ3RoKXtcclxuICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBAUG9pbnQge3gsIHl9XHJcbiAgICAgICAgaWYoIXRoaXMuYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSAmJlxyXG4gICAgICAgICAgICAhUGhhc2VyLlJlY3RhbmdsZS5jb250YWluc1BvaW50KHRoaXMuZ2V0Qm91bmRzKCksIHRoaXMuYm91bmRUbykgJiZcclxuICAgICAgICAgICAgKCh0aGlzLnggPCB0aGlzLmJvdW5kVG8ueCAmJiAhdGhpcy5mYWNpbmdSaWdodCkgfHxcclxuICAgICAgICAgICAgKHRoaXMueCA+IHRoaXMuYm91bmRUby54ICYmIHRoaXMuZmFjaW5nUmlnaHQpKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1cm4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEBSZWN0YW5nbGUge3gxLCB4Mn0gb3Ige3gxLCB5MSwgeDIsIHkyfVxyXG4gICAgICAgIGlmKHRoaXMuYm91bmRUbyAmJlxyXG4gICAgICAgICAgICB0aGlzLmJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3dpZHRoJykgJiZcclxuICAgICAgICAgICAgKHRoaXMueCA8IHRoaXMuYm91bmRUby54ICYmIHRoaXMuZmFjaW5nTGVmdCB8fFxyXG4gICAgICAgICAgICB0aGlzLnggPiB0aGlzLmJvdW5kVG8ueCArIHRoaXMuYm91bmRUby53aWR0aCAmJiB0aGlzLmZhY2luZ1JpZ2h0KSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1cm4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL3RoaXMuZGVidWcodGhpcy5pZCk7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgICAgICB0aGlzLmNoZWNrQm91bmRzKCk7XHJcbiAgICAgICAgdGhpcy50dXJuSWZCbG9ja2VkKCk7XHJcbiAgICAgICAgdGhpcy5tb3ZlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFJO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvQUkuanMiLCJjbGFzcyBFeHRlbmRlZFNwcml0ZSBleHRlbmRzIFBoYXNlci5TcHJpdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzIHx8IHsgYW5pbWF0aW9uczogW10gfTtcclxuICAgICAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcclxuICAgICAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub3V0T2ZCb3VuZHNLaWxsID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gdGhpcy5wcm9wcy5ncmF2aXR5O1xyXG4gICAgICAgIHRoaXMuX2RlYnVnVGV4dCA9IHRoaXMuYWRkQ2hpbGQoXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGQudGV4dCgyMCwgLTIwLCAnZGVidWcnLCB7IGZvbnQ6IFwiMTJweCBDb3VyaWVyXCIsIGZpbGw6IFwiI2ZmZmZmZlwiIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLl9kZWJ1Z1RleHQudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnByb3BzLmFuaW1hdGlvbnMuZm9yRWFjaChhbmltYXRpb24gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24uZnJhbWVzLm1hcChmcmFtZSA9PiBmcmFtZS50b1N0cmluZygpKSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcHMsXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ubG9vcFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBnYW1lU3RhdGUgPSB0aGlzLmdhbWUuc3RhdGUuc3RhdGVzW3RoaXMuZ2FtZS5zdGF0ZS5jdXJyZW50XS5nYW1lU3RhdGU7XHJcblxyXG4gICAgICAgIG1vYngub2JzZXJ2ZShnYW1lU3RhdGUsIChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZScsIGNoYW5nZSwgZ2FtZVN0YXRlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSA9IG1vYnguYWN0aW9uKChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IE9iamVjdC5hc3NpZ24odGhpcy5zcHJpdGVTdGF0ZSwgY2hhbmdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNIaXR0aW5nKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlU3RhdGUuaGl0ID4gdGhpcy5nYW1lLnRpbWUubm93O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc1N0dW5uZWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcHJpdGVTdGF0ZS5zdHVuID4gdGhpcy5nYW1lLnRpbWUubm93O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBmYWNpbmdSaWdodCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBmYWNpbmdMZWZ0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCA8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUxlZnQoKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSAtMTtcclxuICAgICAgICBpZih0aGlzLmJvZHkudmVsb2NpdHkueCA+IC10aGlzLnByb3BzLm1heFNwZWVkKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggLT0gdGhpcy5wcm9wcy5hY2NlbGVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVSaWdodCgpe1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IDE7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnZlbG9jaXR5LnggPCB0aGlzLnByb3BzLm1heFNwZWVkKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggKz0gdGhpcy5wcm9wcy5hY2NlbGVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmUoKXtcclxuICAgICAgICBpZih0aGlzLnNjYWxlLnggPT09IDEpe1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVSaWdodCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUxlZnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcCgpe1xyXG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC89IDEuMTtcclxuICAgIH1cclxuXHJcbiAgICBqdW1wKCl7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnRvdWNoaW5nLmRvd24gfHwgdGhpcy5ib2R5LmJsb2NrZWQuZG93bil7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55IC09IDMwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGl0KCl7XHJcbiAgICAgICAgY29uc3QgaGl0VW50aWwgPSB0aGlzLmdhbWUudGltZS5ub3cgKyA5MDAsXHJcbiAgICAgICAgICAgIGJyZWFrVW50aWwgPSB0aGlzLmdhbWUudGltZS5ub3cgKyAxMDAwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdOb3cgJXMgSGl0ICVzIEJyZWFrICVzJywgdGhpcy5nYW1lLnRpbWUubm93LCBoaXRVbnRpbCwgYnJlYWtVbnRpbCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgIGhpdDogaGl0VW50aWwsXHJcbiAgICAgICAgICAgIG5vaGl0OiBicmVha1VudGlsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaHVydChkaXJlY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55IC09IDEwMDtcclxuICAgICAgICBpZihkaXJlY3Rpb24gJiYgZGlyZWN0aW9uLmxlZnQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAtPSAxMDAgfHwgdGhpcy5wcm9wcy5tYXhTcGVlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uICYmIGRpcmVjdGlvbi5yaWdodCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ICs9IDEwMCB8fCB0aGlzLnByb3BzLm1heFNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWJ1Zyh0ZXh0KXtcclxuICAgICAgIHRoaXMuX2RlYnVnVGV4dC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgIHRoaXMuX2RlYnVnVGV4dC5zY2FsZS54ID0gdGhpcy5zY2FsZS54O1xyXG4gICAgICAgdGhpcy5fZGVidWdUZXh0LnNldFRleHQodGV4dC50b1N0cmluZygpIHx8ICcnKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdbU3ByaXRlXSBzdGF0ZScpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXh0ZW5kZWRTcHJpdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsImltcG9ydCBFeHRlbmRlZFNwcml0ZSBmcm9tICcuL0V4dGVuZGVkU3ByaXRlJztcclxuXHJcbmNsYXNzIEh1bWFuIGV4dGVuZHMgRXh0ZW5kZWRTcHJpdGUge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgICAgICBsaWZlOiAxMCxcclxuICAgICAgICAgICAgc3R1bjogMCxcclxuICAgICAgICAgICAgaGl0OiAwLFxyXG4gICAgICAgICAgICBub2hpdDogMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIdW1hbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0h1bWFuLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQUknO1xuaW1wb3J0IEh1bWFuIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSHVtYW4nO1xuXG5pbXBvcnQgbGV2ZWxMb2FkZXIgZnJvbSAnLi4vLi4vc2VydmljZXMvbGV2ZWxMb2FkZXInO1xuaW1wb3J0IGNyZWF0dXJlRmFjdG9yeSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jcmVhdHVyZUZhY3RvcnknO1xuaW1wb3J0IGNyZWF0dXJlQ29uZmlnIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY3JlYXR1cmVjb25maWcnO1xuXG5pbXBvcnQgaW5pdCBmcm9tICcuL3BsYXkuaW5pdCc7XG5pbXBvcnQgcHJlbG9hZCBmcm9tICcuL3BsYXkucHJlbG9hZCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy4vcGxheS5jcmVhdGUnO1xuaW1wb3J0IHVwZGF0ZSBmcm9tICcuL3BsYXkudXBkYXRlJztcblxyXG5jbGFzcyBHYW1lU3RhdGUge1xyXG4gICAgY29uc3RydWN0b3IoZ2xvYmFsQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5rZXlzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZW5lbXkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5sZXZlbCA9IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZExheWVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGdyb3VuZExheWVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHRpbGVtYXA6IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnID0gZ2xvYmFsQ29uZmlnO1xyXG4gICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWcgPSBjcmVhdHVyZUNvbmZpZztcclxuICAgICAgICB0aGlzLmxldmVsTG9hZGVyID0gbGV2ZWxMb2FkZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICB0aGlzLmNyZWF0dXJlRmFjdG9yeSA9IGNyZWF0dXJlRmFjdG9yeS5jYWxsKHRoaXMpO1xyXG4gICAgfVxyXG59XG5cbkdhbWVTdGF0ZS5wcm90b3R5cGUuaW5pdCA9IGluaXQ7XG5HYW1lU3RhdGUucHJvdG90eXBlLnByZWxvYWQgPSBwcmVsb2FkO1xyXG5HYW1lU3RhdGUucHJvdG90eXBlLmNyZWF0ZSA9IGNyZWF0ZTtcclxuR2FtZVN0YXRlLnByb3RvdHlwZS51cGRhdGUgPSB1cGRhdGU7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVTdGF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJjb25zdCBnbG9iYWxDb25maWcgPSB7XHJcbiAgICB3aWR0aDogNTQ2LFxyXG4gICAgaGVpZ2h0OiAzNjgsXHJcbiAgICBibG9ja3M6IDMsXHJcbiAgICBkb21FbGVtZW50OiAnZ2FtZScsXHJcbiAgICBiYWNrZ3JvdW5kUGF0aDogJ2JhY2tncm91bmRzLycsXHJcbiAgICB0aWxlc2V0UGF0aDogJ3RpbGVzZXRzLycsXHJcbiAgICBsZXZlbFBhdGg6ICdsZXZlbHMvJyxcclxuICAgIHRleHR1cmVBdGxhc1BhdGg6ICdzcHJpdGVzaGVldHMvJyxcclxuICAgIHRleHR1cmVBdGxhc05hbWU6ICdwcmUyYXRsYXMnLFxyXG4gICAgdGV4dHVyZUF0bGFzSW1hZ2U6ICdwcmUyYXRsYXMucG5nJyxcclxuICAgIHRleHR1cmVBdGxhc0pzb246ICdwcmUyYXRsYXMuanNvbidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdsb2JhbENvbmZpZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJ2YXIgY3JlYXR1cmVDb25maWdzID0ge1xyXG4gIGNyZWF0dXJlRGVmYXVsdHM6IHtcclxuICAgIGFjdGl2ZTogdHJ1ZSxcclxuICAgIGdyYXZpdHk6IDUwMCxcclxuICAgIGJvdW5jZTogMC4yLFxyXG4gICAgbWFzczogMSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiAxMDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGxpdmVzOiAxLFxyXG4gICAgbGlmZXNwYW46IEluZmluaXR5LFxyXG4gICAgc2Vuc2U6IDE1MCxcclxuICAgIGFuaW1hdGlvbnM6IFtdLFxyXG4gICAgdGltZU9mOiB7XHJcbiAgICAgICdtb3ZlJzogMjAwLFxyXG4gICAgICAnaGl0JzogMTAwLFxyXG4gICAgICAnaHVydCc6IDUwMCxcclxuICAgICAgJ3N0b3AnOiAyMDAsXHJcbiAgICAgICdpZGxlJzogMTBcclxuICAgIH0sXHJcbiAgICBib3VuZFRvIDoge30sXHJcbiAgICBjb3JyZWN0ZWRBbmNob3I6IHtcclxuICAgICAgeDogMC41LFxyXG4gICAgICB5OiAwLjVcclxuICAgIH1cclxuICB9LFxyXG4gIG1hbjoge1xyXG4gICAgdHlwZTogJ21hbicsXHJcbiAgICBtYXhTcGVlZDogMjAwLFxyXG4gICAgbGl2ZXM6IDgsXHJcbiAgICBsaWZlc3BhbjogSW5maW5pdHksXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFsxMSwnMDMnLCcwNScsMTQsMjBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdoaXQnLCBmcmFtZXM6IFsyMiwyNCwyOCwzMSwzNCwyMiwyNCwyOCwzMSwzNF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3RvcCcsIGZyYW1lczogWzQyLDQ1LDQ5LDUyXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzE2LDQxLDQ3LDUwLDUwLDUwLDUwLDUwLDUwLDUwLDUwLDEzLDUwLDEzLDUwLDEzXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI3LDI3LDI3LDI3LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDMwLDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI3LDMwLDI3LDMwLDM1LDM2LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LCcwNycsJzA3JywnMDcnLCcwNycsJzAyJywnMDInXSwgZnBzOiA1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2h1cnQnLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3R1bicsIGZyYW1lczogWzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMTEsJzAzJywnMDUnLDE0LDIwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfVxyXG4gICAgXSxcclxuICAgIGNvcnJlY3RlZEFuY2hvcjoge1xyXG4gICAgICB4OiAwLjUsXHJcbiAgICAgIHk6IDAuOFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGlubzoge1xyXG4gICAgdHlwZTogJ2Rpbm8nLFxyXG4gICAgbWFzczogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiA1LFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzYwLDM2MCwzNjAsMzYwLDM2MCwzNjAsMzYwLDM2N10sIGZwczogNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzYwLDM2MSwzNjQsMzY3LDM2OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzM2MCwzNjEsMzY0LDM2NywzNjldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2ZhbGwnLCBmcmFtZXM6IFszNjldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM3MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNjAsMzYxLDM2NCwzNjddLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGJlYXI6IHtcclxuICAgIHR5cGU6ICdiZWFyJyxcclxuICAgIG1hc3M6IDEuMixcclxuICAgIG1heFNwZWVkOiA3NSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDE1LFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzIxXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMyMCwzMjEsMzI0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM2NiwzNjMsMzU4LDMxN10sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzMyOF0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgJ3N1cGVyLWJlYXInOiB7XHJcbiAgICBhY2NlbGVyYXRpb246IDMwLFxyXG4gICAgbWF4U3BlZWQ6IDIwMCxcclxuICAgIGltYWdlOiAnc3VwZXItYmVhci1zcHJpdGUtcmVmJywgLy8gb3ZlcnJpZGUgc3ByaXRlIChjcmVhdHVyZSBuYW1lIGJ5IGRlZmF1bHQpXHJcbiAgICBhbmltYXRpb25zOiBbXVxyXG4gIH0sXHJcbiAgdGlnZXI6IHtcclxuICAgIHR5cGU6ICd0aWdlcicsXHJcbiAgICBtYXNzOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDIwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzkzLDM5NV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM5MywzOTVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszOTksNDAxXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZmFsbCcsIGZyYW1lczogWzM5OV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQwMl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszOTMsMzk1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBwdGVybzoge1xyXG4gICAgdHlwZTogJ3B0ZXJvJyxcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiAxMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFs0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3Nyw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3Nyw0NzddLCBmcHM6IDMsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzQwMyw0MDQsNDA1LDQwMyw0MDQsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDAzLDQwNCw0MDUsNDAzLDQwNCw0MDUsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2Rlc2NlbmQnLCBmcmFtZXM6IFs0MDVdLCBmcHM6IDE1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2FzY2VuZCcsIGZyYW1lczogWzQwMyw0MDQsNDA1XSwgZnBzOiAxNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0NzFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbNDA1LDQwMyw0MDRdLCBmcHM6IDE1LCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGRyYWdvbmZseToge1xyXG4gICAgdHlwZTogJ2RyYWdvbmZseScsXHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzM3LDMzOF0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMzNywzMzhdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3R1cm4nLCBmcmFtZXM6IFszMzksMzQwXSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNDJdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzM3LDMzOF0sIGZwczogMTIsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgYmF0OiB7XHJcbiAgICB0eXBlOiAnYmF0JyxcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiAyMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNTEsMzUyLDM1MSwzNTEsMzUxLDM1MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM1NywzNTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM2Ml0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNTcsMzU5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBzcGlkZXI6IHtcclxuICAgIHR5cGU6ICdzcGlkZXInLFxyXG4gICAgbWFzczogMC4zLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzM1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM2NSwzNjgsMzcwLDM3Ml0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFsyOTksMzAyLDMwNSwzMDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3R1cm4nLCBmcmFtZXM6IFszMTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2NsaW1iJywgZnJhbWVzOiBbMzQxLDM0MywzNDUsMzQ3XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICd3YWl0JywgZnJhbWVzOiBbMzMyLDMzNSwzNzJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzMyMl0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIG5hdGl2ZToge1xyXG4gICAgdHlwZTogJ25hdGl2ZScsXHJcbiAgICBtYXhTcGVlZDogMTAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyMCxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNzNdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszNzMsMzc2LDM3OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzgwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNzMsMzc2LDM3OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgcGFycm90OiB7XHJcbiAgICB0eXBlOiAncGFycm90JyxcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiAxMDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzk0LDM5NywzOThdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszOTQsMzk3LDM5OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDAwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszOTQsMzk3LDM5OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgaW5zZWN0OiB7XHJcbiAgICB0eXBlOiAnaW5zZWN0JyxcclxuICAgIG1hc3M6IDEsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDI1LFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzQ4LDM0OCwzNDgsMzQ4LDM0OCwzNDgsMzQ5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzIzLDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszMjMsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzQ4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzMyMywzNDgsMzQ5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBidWc6IHtcclxuICAgIHR5cGU6ICdidWcnLFxyXG4gICAgbWFzczogMSxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEuNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMjUsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM0NCwzNDZdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNDRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgZnJvZzoge1xyXG4gICAgdHlwZTogJ2Zyb2cnLFxyXG4gICAgbWFzczogMSxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEuNSxcclxuICAgIGp1bXBpbmc6IDUwMCxcclxuICAgIG1heFNwZWVkOiA4MCxcclxuICAgIGFjY2VsZXJhdGlvbjogNDAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszMjVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMjUsMzI3LDMzMSwzMjVdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzI1LDMyNywzMzEsMzI1XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzM0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzMyNSwzMjcsMzMxLDMyNV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHR1cnRsZToge1xyXG4gICAgdHlwZTogJ3R1cnRsZScsXHJcbiAgICBtYXNzOiAyLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDAuMyxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszOTBdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzc3LDM4MSwzODQsMzg1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzg3LDM4OSwzOTAsMzkxXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszOTJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGplbGx5OiB7XHJcbiAgICB0eXBlOiAnamVsbHknLFxyXG4gICAgbWFzczogMixcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAxLFxyXG4gICAgbWF4U3BlZWQ6IDUsXHJcbiAgICBhY2NlbGVyYXRpb246IDEsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBnb3JpbGxhOiB7XHJcbiAgICB0eXBlOiAnZ29yaWxsYScsXHJcbiAgICBtYXNzOiA1LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZmFsbCcsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH1cclxufTtcclxuXHJcbmZvcih2YXIgY3JlYXR1cmUgaW4gY3JlYXR1cmVDb25maWdzKXtcclxuICAvL2NyZWF0dXJlQ29uZmlnc1tjcmVhdHVyZV0gPSBfLm1lcmdlKHt9LCBjb25maWdzLmNyZWF0dXJlRGVmYXVsdHMsIGNvbmZpZ3NbY3JlYXR1cmVdKTtcclxuICB2YXIgZGVmYXVsdHMgPSBjcmVhdHVyZUNvbmZpZ3NbJ2NyZWF0dXJlRGVmYXVsdHMnXTtcclxuICBmb3IodmFyIHByb3AgaW4gZGVmYXVsdHMpe1xyXG4gICAgaWYoY3JlYXR1cmVDb25maWdzW2NyZWF0dXJlXVtwcm9wXSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgY3JlYXR1cmVDb25maWdzW2NyZWF0dXJlXVtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdHVyZUNvbmZpZ3M7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZWNvbmZpZy5qcyIsImltcG9ydCBIdW1hbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL0h1bWFuJztcclxuaW1wb3J0IEFJIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQUknO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlKCl7XHJcbiAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtDcmVhdGVdJyk7XHJcbiAgICAvLyBmcHMgZGVidWdnaW5nXHJcbiAgICB0aGlzLmdhbWUudGltZS5hZHZhbmNlZFRpbWluZyA9IHRydWU7XHJcblxyXG4gICAgLy8gW1NFVCBMRVZFTF0gc2V0IGRpbWVuc2lvbnMsIHN0YXJ0IHBoeXNpYyBzeXN0ZW1cclxuICAgIHRoaXMuZ2FtZS53b3JsZC5zZXRCb3VuZHMoXHJcbiAgICAgICAgMCxcclxuICAgICAgICAwLFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLndpZHRoICogdGhpcy5nbG9iYWxDb25maWcuYmxvY2tzLFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLmhlaWdodFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG5cclxuICAgIHRoaXMubGV2ZWxMb2FkZXIuY3JlYXRlQmFja2dyb3VuZCgnYmFja2dyb3VuZExheWVyJyk7XHJcbiAgICB0aGlzLmxldmVsTG9hZGVyLmNyZWF0ZVRpbGVzKFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcudGlsZW1hcCxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXQsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy50aWxlc2V0SW1hZ2VcclxuICAgICk7XHJcbiAgICB0aGlzLmxldmVsTG9hZGVyLmNyZWF0ZUxheWVycyh0aGlzLmxldmVsQ29uZmlnLmxheWVycyk7XHJcblxyXG4gICAgLy8gW1NFVCBMRVZFTF0gZml4IGJhY2tncm91bmQsIHJlc2l6ZVxyXG4gICAgdGhpcy5sZXZlbC5iYWNrZ3JvdW5kTGF5ZXIuZml4ZWRUb0NhbWVyYSA9IHRoaXMubGV2ZWxDb25maWcuZml4ZWRCYWNrZ3JvdW5kO1xyXG4gICAgdGhpcy5sZXZlbC5ncm91bmRMYXllci5yZXNpemVXb3JsZCgpO1xyXG5cclxuICAgIHRoaXMuZ2FtZVN0YXRlID0gbW9ieC5vYnNlcnZhYmxlKHtcclxuICAgICAgICBpbml0aWFsaXNlZDogZmFsc2UsXHJcbiAgICAgICAgc2NvcmU6IDBcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudXBkYXRlU3RhdGUgPSBtb2J4LmFjdGlvbigoY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2FtZVN0YXRlLCBjaGFuZ2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbW9ieC5vYnNlcnZlKHRoaXMuZ2FtZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbZ2FtZVN0YXRlXSBjaGFuZ2UnLCBjaGFuZ2UsIHRoaXMuZ2FtZVN0YXRlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudXBkYXRlU3RhdGUoeyBpbml0aWFsaXNlZDogdHJ1ZSB9KTtcclxuXHJcbiAgICAvLyBbUExBWUVSXVxyXG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgSHVtYW4oXHJcbiAgICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcuZW50cnlQb2ludC54LFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcuZW50cnlQb2ludC55LFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLnRleHR1cmVBdGxhc05hbWUsXHJcbiAgICAgICAgdGhpcy5jcmVhdHVyZUNvbmZpZy5tYW5cclxuICAgICk7XHJcblxyXG4gICAgLy8gW0VORU1JRVNdXHJcbiAgICB0aGlzLmVuZW1pZXMgPSBuZXcgUGhhc2VyLkdyb3VwKHRoaXMuZ2FtZSk7XHJcbiAgICB0aGlzLmxldmVsQ29uZmlnLmVuZW1pZXMuZm9yRWFjaCh0aGlzLmNyZWF0dXJlRmFjdG9yeS5jcmVhdGUpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcclxuXHJcbiAgICAvLyBiaW5kIGtleXNcclxuICAgIHRoaXMua2V5cyA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XHJcbiAgICB0aGlzLmtleXMuc3BhY2UgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TUEFDRUJBUik7XHJcblxyXG4gICAgLy8gc2NvcmUgdGV4dFxyXG4gICAgdGhpcy5tZW51ID0gdGhpcy5nYW1lLmFkZC50ZXh0KFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLndpZHRoIC0gMTIwLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgXCJMaWZlOiBcIiArIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUsXHJcbiAgICAgICAgeyBmb250OiBcIjI0cHggQ291cmllclwiLCBmaWxsOiBcIiNmZmZcIiwgYWxpZ246IFwiY2VudGVyXCIgfVxyXG4gICAgKTtcclxuICAgIHRoaXMubWVudS5maXhlZFRvQ2FtZXJhID0gdHJ1ZTtcclxuICAgIG1vYngub2JzZXJ2ZSh0aGlzLnBsYXllci5zcHJpdGVTdGF0ZSwgY2hhbmdlID0+IHtcclxuICAgICAgICB0aGlzLm1lbnUuc2V0VGV4dChcIkxpZmU6IFwiICsgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5jcmVhdGUuanMiLCJmdW5jdGlvbiBpbml0KGxldmVsQ29uZmlnKXtcclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0luaXRdJywgbGV2ZWxDb25maWcpO1xyXG4gICAgdGhpcy5sZXZlbENvbmZpZyA9IGxldmVsQ29uZmlnO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5pbml0LmpzIiwiZnVuY3Rpb24gcHJlbG9hZCgpe1xyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bUHJlbG9hZF0nKTtcclxuXHJcbiAgICAvLyBhc3NldHMgdG8gbG9hZCByZWxhdGl2ZSB0byAvYXNzZXRzLy4uXHJcbiAgICB0aGlzLmdhbWUubG9hZC5hdGxhcyhcclxuICAgICAgICAncHJlMmF0bGFzJyxcclxuICAgICAgICAnc3ByaXRlc2hlZXRzL3ByZTJhdGxhcy5wbmcnLFxyXG4gICAgICAgICdzcHJpdGVzaGVldHMvcHJlMmF0bGFzLmpzb24nLFxyXG4gICAgICAgIFBoYXNlci5Mb2FkZXIuVEVYVFVSRV9BVExBU19KU09OX0hBU0hcclxuICAgICk7XHJcblxyXG4gICAgLy8gbG9hZCBiYWNrZ3JvdW5kXHJcbiAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSh0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRLZXksIHRoaXMuZ2xvYmFsQ29uZmlnLmJhY2tncm91bmRQYXRoICsgdGhpcy5sZXZlbENvbmZpZy5iYWNrZ3JvdW5kSW1hZ2UgKyB0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRJbWFnZUV4dGVuc2lvbik7XHJcbiAgICAvLyBsb2FkIHRpbGVzZXRcclxuICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKHRoaXMubGV2ZWxDb25maWcudGlsZXNldCwgdGhpcy5nbG9iYWxDb25maWcudGlsZXNldFBhdGggKyB0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXRJbWFnZSArIHRoaXMubGV2ZWxDb25maWcudGlsZXNldEltYWdlRXh0ZW5zaW9uKTtcclxuICAgIC8vIGxvYWQgdGlsZW1hcFxyXG4gICAgdGhpcy5nYW1lLmxvYWQudGlsZW1hcCh0aGlzLmxldmVsQ29uZmlnLnRpbGVtYXAsIHRoaXMuZ2xvYmFsQ29uZmlnLmxldmVsUGF0aCArIHRoaXMubGV2ZWxDb25maWcudGlsZWRKc29uLCBudWxsLCBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmVsb2FkO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnByZWxvYWQuanMiLCJmdW5jdGlvbiB1cGRhdGUoKXtcclxuICAgIC8vY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bVXBkYXRlXScpO1xyXG4gICAgLy8gZnBzXHJcbiAgICB0aGlzLmdhbWUuZGVidWcudGV4dCh0aGlzLmdhbWUudGltZS5mcHMsIDUsIDIwKTtcclxuXHJcbiAgICAvLyBjb2xsaWRlXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5sZXZlbC5jb2xsaXNpb25MYXllcik7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5lbmVtaWVzLCB0aGlzLmxldmVsLmNvbGxpc2lvbkxheWVyKTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLnBsYXllciwgdGhpcy5lbmVtaWVzLCAocGxheWVyLCBlbmVteSkgPT4ge1xyXG4gICAgICAgIGlmKCF0aGlzLnBsYXllci5pc0hpdHRpbmcgJiYgIXRoaXMucGxheWVyLmlzU3R1bm5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGxpZmU6IHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUgLSAxLFxyXG4gICAgICAgICAgICAgICAgc3R1bjogdGhpcy5nYW1lLnRpbWUubm93ICsgMTUwMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaHVydChlbmVteS5ib2R5LnRvdWNoaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBtb3ZlXHJcbiAgICBvbktleVByZXNzLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uS2V5UHJlc3MoKXtcclxuICAgIC8vIHN0dW4gPT4gYmxvY2tlZFxyXG4gICAgaWYodGhpcy5wbGF5ZXIuaXNTdHVubmVkKXtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3N0dW4nKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbW92ZSBsZWZ0IC8gcmlnaHRcclxuICAgIGlmKHRoaXMua2V5cy5sZWZ0LmlzRG93bil7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZUxlZnQoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgIH0gZWxzZSBpZih0aGlzLmtleXMucmlnaHQuaXNEb3duKXtcclxuICAgICAgICB0aGlzLnBsYXllci5tb3ZlUmlnaHQoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnaWRsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGp1bXBcclxuICAgIGlmKHRoaXMua2V5cy51cC5pc0Rvd24pe1xyXG4gICAgICAgIHRoaXMucGxheWVyLmp1bXAoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2p1bXAnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBoaXRcclxuICAgIGlmKHRoaXMua2V5cy5zcGFjZS5pc0Rvd24pe1xyXG4gICAgICAgIGlmKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLm5vaGl0IDwgdGhpcy5nYW1lLnRpbWUubm93ICYmIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmhpdCA8IHRoaXMuZ2FtZS50aW1lLm5vdyl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmhpdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2hpdCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnVwZGF0ZS5qcyIsImltcG9ydCBnbG9iYWxDb25maWcgZnJvbSAnLi9nbG9iYWxDb25maWcuanMnO1xyXG5pbXBvcnQgUGxheSBmcm9tICcuL2dhbWVzdGF0ZXMvcGxheS9pbmRleC5qcyc7XHJcblxyXG4vLyBpbnN0YW50aWF0ZSBhIFBoYXNlci5HYW1lXHJcbmNvbnN0IFBMQVRGT1JNRVIgPSBuZXcgUGhhc2VyLkdhbWUoXHJcbiAgICBnbG9iYWxDb25maWcud2lkdGgsXHJcbiAgICBnbG9iYWxDb25maWcuaGVpZ2h0LFxyXG4gICAgUGhhc2VyLkFVVE8sXHJcbiAgICBnbG9iYWxDb25maWcuZG9tRWxlbWVudFxyXG4pO1xyXG5cclxuLy8gcmVnaXN0ZXIgZ2FtZXN0YXRlcyAod2lsbCBiZSBpbnN0YW50aWF0ZWQgdy8gdGhpcy5nYW1lIGFzIDFzdCBwYXJhbSwgcGFzcyBnYW1lQ29uZmlnIGFzIDJuZClcclxuUExBVEZPUk1FUi5zdGF0ZS5hZGQoJ1BsYXknLCBQbGF5LmJpbmQobnVsbCwgZ2xvYmFsQ29uZmlnKSk7XHJcblxyXG5mZXRjaCgnL2xldmVsLzEnLCB7XHJcbiAgICBtZXRob2Q6ICdHRVQnXHJcbn0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbn0pLnRoZW4oZnVuY3Rpb24obGV2ZWxDb25maWcpIHtcclxuICAgIFBMQVRGT1JNRVIuc3RhdGUuc3RhcnQoJ1BsYXknLCB0cnVlLCB0cnVlLCBsZXZlbENvbmZpZyk7XHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2luZGV4LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL2NvbXBvbmVudHMvQUknO1xyXG5cclxuZnVuY3Rpb24gY3JlYXR1cmVGYWN0b3J5KCkge1xyXG4gICAgY29uc3QgY3JlYXR1cmVzID0ge1xyXG4gICAgICAgIGJhdDogJ2JhdCcsXHJcbiAgICAgICAgYmVhcjogJ2JlYXInLFxyXG4gICAgICAgIGJ1ZzogJ2J1ZycsXHJcbiAgICAgICAgZGlubzogJ2Rpbm8nLFxyXG4gICAgICAgIGRyYWdvbmZseTogJ2RyYWdvbmZseScsXHJcbiAgICAgICAgZnJvZzogJ2Zyb2cnLFxyXG4gICAgICAgIGdvcmlsbGE6ICdnb3JpbGxhJyxcclxuICAgICAgICBpbnNlY3Q6ICdpbnNlY3QnLFxyXG4gICAgICAgIGplbGx5OiAnamVsbHknLFxyXG4gICAgICAgIG5hdGl2ZTogJ25hdGl2ZScsXHJcbiAgICAgICAgcGFycm90OiAncGFycm90JyxcclxuICAgICAgICBwdGVybzogJ3B0ZXJvJyxcclxuICAgICAgICBzcGlkZXI6ICdzcGlkZXInLFxyXG4gICAgICAgIHRpZ2VyOiAndGlnZXInLFxyXG4gICAgICAgIHR1cnRsZTogJ3R1cnRsZSdcclxuICAgIH07XHJcblxyXG4gICAgZm9yKGxldCBjcmVhdHVyZSBpbiBjcmVhdHVyZXMpe1xyXG4gICAgICAgIGlmKGNyZWF0dXJlcy5oYXNPd25Qcm9wZXJ0eShjcmVhdHVyZSkpe1xyXG4gICAgICAgICAgICBjcmVhdHVyZXNbY3JlYXR1cmVdID0gY2xhc3MgY3JlYXR1cmUgZXh0ZW5kcyBBSSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuICAgICAgICAgICAgXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pZCA9IGAke3Byb3BzLnR5cGV9LSR7eH0tJHt5fWA7XHJcbiAgICAgICAgICAgIFx0fVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlOiAobGV2ZWxDb25maWcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZW5lbXkgPSBuZXcgY3JlYXR1cmVzW2xldmVsQ29uZmlnLnR5cGVdKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICAgICAgICAgICAgbGV2ZWxDb25maWcub3JpZ2luLngsXHJcbiAgICAgICAgICAgICAgICBsZXZlbENvbmZpZy5vcmlnaW4ueSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLnRleHR1cmVBdGxhc05hbWUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0dXJlQ29uZmlnW2xldmVsQ29uZmlnLnR5cGVdXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGVuZW15LnNldEJvdW5kcyhsZXZlbENvbmZpZy5ib3VuZFRvKTtcclxuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLmFkZChlbmVteSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0dXJlRmFjdG9yeTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9jcmVhdHVyZUZhY3RvcnkuanMiLCJmdW5jdGlvbiBsZXZlbExvYWRlcigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlQmFja2dyb3VuZDogKGxheWVyTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLmJhY2tncm91bmRMYXllciA9IHRoaXMuZ2FtZS5hZGQudGlsZVNwcml0ZShcclxuICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbENvbmZpZy53aWR0aCxcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxDb25maWcuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5iYWNrZ3JvdW5kS2V5XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGVMYXllcjogKGxheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWxbbGF5ZXJdID0gdGhpcy5sZXZlbC50aWxlbWFwLmNyZWF0ZUxheWVyKHRoaXMubGV2ZWxDb25maWdbbGF5ZXJdKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZUxheWVyczogKGxheWVycykgPT4ge1xyXG4gICAgICAgICAgICBmb3IobGV0IGxheWVyIGluIGxheWVycyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsW2xheWVyXSA9IHRoaXMubGV2ZWwudGlsZW1hcC5jcmVhdGVMYXllcih0aGlzLmxldmVsQ29uZmlnLmxheWVyc1tsYXllcl0ua2V5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxbbGF5ZXJdLnZpc2libGUgPSB0aGlzLmxldmVsQ29uZmlnLmxheWVyc1tsYXllcl0udmlzaWJsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlVGlsZXM6ICh0aWxlbWFwS2V5LCB0aWxlc2V0S2V5LCB0aWxlc2V0SW1hZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC50aWxlbWFwID0gdGhpcy5nYW1lLmFkZC50aWxlbWFwKHRpbGVtYXBLZXkpO1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLnRpbGVtYXAuYWRkVGlsZXNldEltYWdlKHRpbGVzZXRJbWFnZSwgdGlsZXNldEtleSk7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDAsIDMwMDAsIHRydWUsIHRoaXMubGV2ZWxDb25maWcubGF5ZXJzLmNvbGxpc2lvbkxheWVyLmtleSk7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDAsIDMwMDAsIHRydWUsIHRoaXMubGV2ZWxDb25maWcubGF5ZXJzLmRlYXRoTGF5ZXIua2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGV2ZWxMb2FkZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxMb2FkZXIuanMiXSwic291cmNlUm9vdCI6IiJ9