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
            //const debugBounds = this.id+'\n'+ (this.boundTo && Object.keys(this.boundTo).length && this.boundTo.x) +'\n'+ (this.x | 0);
            //this.debug(debugBounds);
            this.animations.play('move');
            this.checkBounds();
            //this.turnIfBlocked();
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
        _this.anchor.setTo(0.5, 1);
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

var Play = function Play(globalConfig) {
    _classCallCheck(this, Play);

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

Play.prototype.init = _play2.default;
Play.prototype.preload = _play4.default;
Play.prototype.create = _play6.default;
Play.prototype.update = _play8.default;

module.exports = Play;

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
        if (_this.player.body.touching.down && enemy.body.touching.up) {
            return;
        }
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

var _index = __webpack_require__(13);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(3);

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// instantiate a Phaser.Game
var PLATFORMER = new Phaser.Game(_globalConfig2.default.width, _globalConfig2.default.height, Phaser.AUTO, _globalConfig2.default.domElement);

// register gamestates (will be instantiated w/ this.game as 1st param, pass gameConfig as 2nd)
PLATFORMER.state.add('Menu', _index2.default.bind(null, _globalConfig2.default));
PLATFORMER.state.add('Play', _index4.default.bind(null, _globalConfig2.default));

PLATFORMER.state.start('Menu', true, true);

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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _menu = __webpack_require__(14);

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import update from './play.update';

var Menu = function Menu() {
    _classCallCheck(this, Menu);

    this.keys = undefined;
};

Menu.prototype.create = _menu2.default;

module.exports = Menu;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function create() {
    var _this = this;

    // fps debugging
    this.game.time.advancedTiming = true;

    // CTA text
    var text = this.game.add.text(this.game.width / 2, this.game.height / 2, "Choose a level!\n1 2 3 4 5 6", { font: "24px Courier", fill: "#ffffff", align: "center" });

    text.anchor.set(0.5);

    this.game.input.keyboard.onDownCallback = function (e) {
        fetch('/level/' + e.key, {
            method: 'GET'
        }).then(function (response) {
            return response.json();
        }).then(function (levelConfig) {
            _this.game.state.start('Play', true, true, levelConfig);
            _this.game.input.keyboard.onDownCallback = null;
        });
    };

    console.log('[PHASER][Menu][Create]');
};

module.exports = create;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWU1ZDYxMzYyZjQwN2EyN2RiNzAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuY3JlYXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnByZWxvYWQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS51cGRhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2NyZWF0dXJlRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsTG9hZGVyLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9tZW51L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9tZW51L21lbnUuY3JlYXRlLmpzIl0sIm5hbWVzIjpbIkFJIiwiZ2FtZSIsIngiLCJ5Iiwic3ByaXRlIiwicHJvcHMiLCJzcHJpdGVTdGF0ZSIsIm1vYngiLCJvYnNlcnZhYmxlIiwibGlmZSIsInN0dW4iLCJoaXQiLCJub2hpdCIsImJvZHkiLCJibG9ja2VkIiwibGVmdCIsInJpZ2h0Iiwic2NhbGUiLCJib3VuZFRvIiwiaGFzT3duUHJvcGVydHkiLCJQaGFzZXIiLCJQb2ludCIsIlJlY3RhbmdsZSIsIngxIiwieDIiLCJoZWlnaHQiLCJ5MSIsInkyIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImNvbnRhaW5zUG9pbnQiLCJnZXRCb3VuZHMiLCJmYWNpbmdSaWdodCIsInR1cm4iLCJmYWNpbmdMZWZ0Iiwid2lkdGgiLCJhbmltYXRpb25zIiwicGxheSIsImNoZWNrQm91bmRzIiwibW92ZSIsIkV4dGVuZGVkU3ByaXRlIiwiYWRkIiwiZXhpc3RpbmciLCJwaHlzaWNzIiwiZW5hYmxlIiwiUGh5c2ljcyIsIkFSQ0FERSIsImFuY2hvciIsInNldFRvIiwiY29sbGlkZVdvcmxkQm91bmRzIiwiY2hlY2tXb3JsZEJvdW5kcyIsIm91dE9mQm91bmRzS2lsbCIsImdyYXZpdHkiLCJfZGVidWdUZXh0IiwiYWRkQ2hpbGQiLCJ0ZXh0IiwiZm9udCIsImZpbGwiLCJ2aXNpYmxlIiwiZm9yRWFjaCIsImFuaW1hdGlvbiIsIm5hbWUiLCJmcmFtZXMiLCJtYXAiLCJmcmFtZSIsInRvU3RyaW5nIiwiZnBzIiwibG9vcCIsImdhbWVTdGF0ZSIsInN0YXRlIiwic3RhdGVzIiwiY3VycmVudCIsIm9ic2VydmUiLCJjaGFuZ2UiLCJjb25zb2xlIiwibG9nIiwidXBkYXRlU3RhdGUiLCJhY3Rpb24iLCJhc3NpZ24iLCJ2ZWxvY2l0eSIsIm1heFNwZWVkIiwiYWNjZWxlcmF0aW9uIiwibW92ZVJpZ2h0IiwibW92ZUxlZnQiLCJ0b3VjaGluZyIsImRvd24iLCJoaXRVbnRpbCIsInRpbWUiLCJub3ciLCJicmVha1VudGlsIiwiZGlyZWN0aW9uIiwic2V0VGV4dCIsIlNwcml0ZSIsIkh1bWFuIiwiUGxheSIsImdsb2JhbENvbmZpZyIsInVuZGVmaW5lZCIsInBsYXllciIsImVuZW15IiwibGV2ZWwiLCJiYWNrZ3JvdW5kTGF5ZXIiLCJncm91bmRMYXllciIsInRpbGVtYXAiLCJjcmVhdHVyZUNvbmZpZyIsImxldmVsTG9hZGVyIiwiY2FsbCIsImNyZWF0dXJlRmFjdG9yeSIsInByb3RvdHlwZSIsImluaXQiLCJwcmVsb2FkIiwiY3JlYXRlIiwidXBkYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsImJsb2NrcyIsImRvbUVsZW1lbnQiLCJiYWNrZ3JvdW5kUGF0aCIsInRpbGVzZXRQYXRoIiwibGV2ZWxQYXRoIiwidGV4dHVyZUF0bGFzUGF0aCIsInRleHR1cmVBdGxhc05hbWUiLCJ0ZXh0dXJlQXRsYXNJbWFnZSIsInRleHR1cmVBdGxhc0pzb24iLCJjcmVhdHVyZUNvbmZpZ3MiLCJjcmVhdHVyZURlZmF1bHRzIiwiYWN0aXZlIiwiYm91bmNlIiwibWFzcyIsImp1bXBpbmciLCJjb2xsaWRlIiwibGl2ZXMiLCJsaWZlc3BhbiIsIkluZmluaXR5Iiwic2Vuc2UiLCJ0aW1lT2YiLCJjb3JyZWN0ZWRBbmNob3IiLCJtYW4iLCJ0eXBlIiwiZGlubyIsImJlYXIiLCJpbWFnZSIsInRpZ2VyIiwicHRlcm8iLCJkcmFnb25mbHkiLCJiYXQiLCJzcGlkZXIiLCJuYXRpdmUiLCJwYXJyb3QiLCJpbnNlY3QiLCJidWciLCJmcm9nIiwidHVydGxlIiwiamVsbHkiLCJnb3JpbGxhIiwiY3JlYXR1cmUiLCJkZWZhdWx0cyIsInByb3AiLCJhZHZhbmNlZFRpbWluZyIsIndvcmxkIiwic2V0Qm91bmRzIiwic3RhcnRTeXN0ZW0iLCJjcmVhdGVCYWNrZ3JvdW5kIiwiY3JlYXRlVGlsZXMiLCJsZXZlbENvbmZpZyIsInRpbGVzZXQiLCJ0aWxlc2V0SW1hZ2UiLCJjcmVhdGVMYXllcnMiLCJsYXllcnMiLCJmaXhlZFRvQ2FtZXJhIiwiZml4ZWRCYWNrZ3JvdW5kIiwicmVzaXplV29ybGQiLCJpbml0aWFsaXNlZCIsInNjb3JlIiwiZW50cnlQb2ludCIsImVuZW1pZXMiLCJHcm91cCIsImNhbWVyYSIsImZvbGxvdyIsImlucHV0Iiwia2V5Ym9hcmQiLCJjcmVhdGVDdXJzb3JLZXlzIiwic3BhY2UiLCJhZGRLZXkiLCJLZXlib2FyZCIsIlNQQUNFQkFSIiwibWVudSIsImFsaWduIiwibG9hZCIsImF0bGFzIiwiTG9hZGVyIiwiVEVYVFVSRV9BVExBU19KU09OX0hBU0giLCJiYWNrZ3JvdW5kS2V5IiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uIiwidGlsZXNldEltYWdlRXh0ZW5zaW9uIiwidGlsZWRKc29uIiwiVGlsZW1hcCIsIlRJTEVEX0pTT04iLCJkZWJ1ZyIsImFyY2FkZSIsImNvbGxpc2lvbkxheWVyIiwib3ZlcmxhcCIsInVwIiwiaXNIaXR0aW5nIiwiaXNTdHVubmVkIiwiaHVydCIsIm9uS2V5UHJlc3MiLCJpc0Rvd24iLCJzdG9wIiwianVtcCIsIlBMQVRGT1JNRVIiLCJHYW1lIiwiQVVUTyIsImJpbmQiLCJzdGFydCIsImNyZWF0dXJlcyIsImlkIiwib3JpZ2luIiwibGF5ZXJOYW1lIiwidGlsZVNwcml0ZSIsImNyZWF0ZUxheWVyIiwibGF5ZXIiLCJrZXkiLCJ0aWxlbWFwS2V5IiwidGlsZXNldEtleSIsImFkZFRpbGVzZXRJbWFnZSIsInNldENvbGxpc2lvbkJldHdlZW4iLCJkZWF0aExheWVyIiwiTWVudSIsInNldCIsIm9uRG93bkNhbGxiYWNrIiwiZSIsImZldGNoIiwibWV0aG9kIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7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cEMsRUFBMENuRCxXQUExQztBQUNBLGtCQUFLbkssSUFBTCxDQUFVa0wsS0FBVixDQUFnQkMsUUFBaEIsQ0FBeUJtRCxjQUF6QixHQUEwQyxJQUExQztBQUNILFNBUEQ7QUFTSCxLQVZEOztBQWFBNUosWUFBUUMsR0FBUixDQUFZLHdCQUFaO0FBQ0g7O0FBRURxQyxPQUFPQyxPQUFQLEdBQWlCSCxNQUFqQixDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhZTVkNjEzNjJmNDA3YTI3ZGI3MCIsImltcG9ydCBFeHRlbmRlZFNwcml0ZSBmcm9tICcuL0V4dGVuZGVkU3ByaXRlJztcclxuXHJcbmNsYXNzIEFJIGV4dGVuZHMgRXh0ZW5kZWRTcHJpdGUge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgICAgICBsaWZlOiAxMCxcclxuICAgICAgICAgICAgc3R1bjogMCxcclxuICAgICAgICAgICAgaGl0OiAwLFxyXG4gICAgICAgICAgICBub2hpdDogMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICAgIHR1cm5JZkJsb2NrZWQoKXtcclxuICAgICAgICBpZih0aGlzLmJvZHkuYmxvY2tlZC5sZWZ0IHx8IHRoaXMuYm9keS5ibG9ja2VkLnJpZ2h0KXtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS54ICo9IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHR1cm4oKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggKj0gLTE7XHJcbiAgICB9XHJcbiAgICBzZXRCb3VuZHMoYm91bmRUbyl7XHJcbiAgICAgICAgaWYoYm91bmRUbyl7XHJcbiAgICAgICAgICAgIGlmKGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3gnKSAmJlxyXG4gICAgICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneScpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdW5kVG8gPSBuZXcgUGhhc2VyLlBvaW50KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEBSZWN0YW5nbGUgeyB4MSwgeDIgfVxyXG4gICAgICAgICAgICBpZihib3VuZFRvLmhhc093blByb3BlcnR5KCd4MScpICYmXHJcbiAgICAgICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd4MicpICYmXHJcbiAgICAgICAgICAgICAgICAhYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTEnKSAmJlxyXG4gICAgICAgICAgICAgICAgIWJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3kyJykpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRUbyA9IG5ldyBQaGFzZXIuUmVjdGFuZ2xlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngyIC0gYm91bmRUby54MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHt4MSwgeTEsIHgyLCB5Mn1cclxuICAgICAgICAgICAgaWYoYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneDEnKSAmJlxyXG4gICAgICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneDInKSAmJlxyXG4gICAgICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTEnKSAmJlxyXG4gICAgICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTInKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3VuZFRvID0gbmV3IFBoYXNlci5SZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDIgLSBib3VuZFRvLngxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZFRvLnkyIC0gYm91bmRUby55MVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjaGVja0JvdW5kcygpe1xyXG4gICAgICAgIGlmKCF0aGlzLmJvdW5kVG8gfHwgIU9iamVjdC5rZXlzKHRoaXMuYm91bmRUbykubGVuZ3RoKXtcclxuICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBAUG9pbnQge3gsIHl9XHJcbiAgICAgICAgaWYoIXRoaXMuYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSAmJlxyXG4gICAgICAgICAgICAhUGhhc2VyLlJlY3RhbmdsZS5jb250YWluc1BvaW50KHRoaXMuZ2V0Qm91bmRzKCksIHRoaXMuYm91bmRUbykgJiZcclxuICAgICAgICAgICAgKCh0aGlzLnggPCB0aGlzLmJvdW5kVG8ueCAmJiAhdGhpcy5mYWNpbmdSaWdodCkgfHxcclxuICAgICAgICAgICAgKHRoaXMueCA+IHRoaXMuYm91bmRUby54ICYmIHRoaXMuZmFjaW5nUmlnaHQpKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1cm4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEBSZWN0YW5nbGUge3gxLCB4Mn0gb3Ige3gxLCB5MSwgeDIsIHkyfVxyXG4gICAgICAgIGlmKHRoaXMuYm91bmRUbyAmJlxyXG4gICAgICAgICAgICB0aGlzLmJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3dpZHRoJykgJiZcclxuICAgICAgICAgICAgKHRoaXMueCA8IHRoaXMuYm91bmRUby54ICYmIHRoaXMuZmFjaW5nTGVmdCB8fFxyXG4gICAgICAgICAgICB0aGlzLnggPiB0aGlzLmJvdW5kVG8ueCArIHRoaXMuYm91bmRUby53aWR0aCAmJiB0aGlzLmZhY2luZ1JpZ2h0KSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1cm4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL2NvbnN0IGRlYnVnQm91bmRzID0gdGhpcy5pZCsnXFxuJysgKHRoaXMuYm91bmRUbyAmJiBPYmplY3Qua2V5cyh0aGlzLmJvdW5kVG8pLmxlbmd0aCAmJiB0aGlzLmJvdW5kVG8ueCkgKydcXG4nKyAodGhpcy54IHwgMCk7XHJcbiAgICAgICAgLy90aGlzLmRlYnVnKGRlYnVnQm91bmRzKTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheSgnbW92ZScpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tCb3VuZHMoKTtcclxuICAgICAgICAvL3RoaXMudHVybklmQmxvY2tlZCgpO1xyXG4gICAgICAgIHRoaXMubW92ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBSTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwiY2xhc3MgRXh0ZW5kZWRTcHJpdGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRle1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlKTtcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wcyB8fCB7IGFuaW1hdGlvbnM6IFtdIH07XHJcbiAgICAgICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzKTtcclxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuICAgICAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUsIDEpO1xyXG4gICAgICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYm9keS5ncmF2aXR5LnkgPSB0aGlzLnByb3BzLmdyYXZpdHk7XHJcbiAgICAgICAgdGhpcy5fZGVidWdUZXh0ID0gdGhpcy5hZGRDaGlsZChcclxuICAgICAgICAgICAgdGhpcy5nYW1lLmFkZC50ZXh0KDIwLCAtMjAsICdkZWJ1ZycsIHsgZm9udDogXCIxMnB4IENvdXJpZXJcIiwgZmlsbDogXCIjZmZmZmZmXCIgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuX2RlYnVnVGV4dC52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcHMuYW5pbWF0aW9ucy5mb3JFYWNoKGFuaW1hdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ubmFtZSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcmFtZXMubWFwKGZyYW1lID0+IGZyYW1lLnRvU3RyaW5nKCkpLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZwcyxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5sb29wXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdhbWVTdGF0ZSA9IHRoaXMuZ2FtZS5zdGF0ZS5zdGF0ZXNbdGhpcy5nYW1lLnN0YXRlLmN1cnJlbnRdLmdhbWVTdGF0ZTtcclxuXHJcbiAgICAgICAgbW9ieC5vYnNlcnZlKGdhbWVTdGF0ZSwgKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlJywgY2hhbmdlLCBnYW1lU3RhdGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gT2JqZWN0LmFzc2lnbih0aGlzLnNwcml0ZVN0YXRlLCBjaGFuZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0hpdHRpbmcoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcHJpdGVTdGF0ZS5oaXQgPiB0aGlzLmdhbWUudGltZS5ub3c7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzU3R1bm5lZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwcml0ZVN0YXRlLnN0dW4gPiB0aGlzLmdhbWUudGltZS5ub3c7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZhY2luZ1JpZ2h0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZhY2luZ0xlZnQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS54IDwgMDtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlTGVmdCgpe1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IC0xO1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS52ZWxvY2l0eS54ID4gLXRoaXMucHJvcHMubWF4U3BlZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAtPSB0aGlzLnByb3BzLmFjY2VsZXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVJpZ2h0KCl7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gMTtcclxuICAgICAgICBpZih0aGlzLmJvZHkudmVsb2NpdHkueCA8IHRoaXMucHJvcHMubWF4U3BlZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCArPSB0aGlzLnByb3BzLmFjY2VsZXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuc2NhbGUueCA9PT0gMSl7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVJpZ2h0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlTGVmdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdG9wKCl7XHJcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggLz0gMS4xO1xyXG4gICAgfVxyXG5cclxuICAgIGp1bXAoKXtcclxuICAgICAgICBpZih0aGlzLmJvZHkudG91Y2hpbmcuZG93biB8fCB0aGlzLmJvZHkuYmxvY2tlZC5kb3duKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgLT0gMzAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoaXQoKXtcclxuICAgICAgICBjb25zdCBoaXRVbnRpbCA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDkwMCxcclxuICAgICAgICAgICAgYnJlYWtVbnRpbCA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDEwMDA7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ05vdyAlcyBIaXQgJXMgQnJlYWsgJXMnLCB0aGlzLmdhbWUudGltZS5ub3csIGhpdFVudGlsLCBicmVha1VudGlsKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgICAgICAgaGl0OiBoaXRVbnRpbCxcclxuICAgICAgICAgICAgbm9oaXQ6IGJyZWFrVW50aWxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBodXJ0KGRpcmVjdGlvbil7XHJcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgLT0gMTAwO1xyXG4gICAgICAgIGlmKGRpcmVjdGlvbiAmJiBkaXJlY3Rpb24ubGVmdCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC09IDEwMCB8fCB0aGlzLnByb3BzLm1heFNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkaXJlY3Rpb24gJiYgZGlyZWN0aW9uLnJpZ2h0KXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggKz0gMTAwIHx8IHRoaXMucHJvcHMubWF4U3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYnVnKHRleHQpe1xyXG4gICAgICAgdGhpcy5fZGVidWdUZXh0LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgdGhpcy5fZGVidWdUZXh0LnNjYWxlLnggPSB0aGlzLnNjYWxlLng7XHJcbiAgICAgICB0aGlzLl9kZWJ1Z1RleHQuc2V0VGV4dCh0ZXh0LnRvU3RyaW5nKCkgfHwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ1tTcHJpdGVdIHN0YXRlJyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHRlbmRlZFNwcml0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0V4dGVuZGVkU3ByaXRlLmpzIiwiaW1wb3J0IEV4dGVuZGVkU3ByaXRlIGZyb20gJy4vRXh0ZW5kZWRTcHJpdGUnO1xyXG5cclxuY2xhc3MgSHVtYW4gZXh0ZW5kcyBFeHRlbmRlZFNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGxpZmU6IDEwLFxyXG4gICAgICAgICAgICBzdHVuOiAwLFxyXG4gICAgICAgICAgICBoaXQ6IDAsXHJcbiAgICAgICAgICAgIG5vaGl0OiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEh1bWFuO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9BSSc7XG5pbXBvcnQgSHVtYW4gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9IdW1hbic7XG5cbmltcG9ydCBsZXZlbExvYWRlciBmcm9tICcuLi8uLi9zZXJ2aWNlcy9sZXZlbExvYWRlcic7XG5pbXBvcnQgY3JlYXR1cmVGYWN0b3J5IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NyZWF0dXJlRmFjdG9yeSc7XG5pbXBvcnQgY3JlYXR1cmVDb25maWcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jcmVhdHVyZWNvbmZpZyc7XG5cbmltcG9ydCBpbml0IGZyb20gJy4vcGxheS5pbml0JztcbmltcG9ydCBwcmVsb2FkIGZyb20gJy4vcGxheS5wcmVsb2FkJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLi9wbGF5LmNyZWF0ZSc7XG5pbXBvcnQgdXBkYXRlIGZyb20gJy4vcGxheS51cGRhdGUnO1xuXHJcbmNsYXNzIFBsYXkge1xyXG4gICAgY29uc3RydWN0b3IoZ2xvYmFsQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5rZXlzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZW5lbXkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5sZXZlbCA9IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZExheWVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGdyb3VuZExheWVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHRpbGVtYXA6IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnID0gZ2xvYmFsQ29uZmlnO1xyXG4gICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWcgPSBjcmVhdHVyZUNvbmZpZztcclxuICAgICAgICB0aGlzLmxldmVsTG9hZGVyID0gbGV2ZWxMb2FkZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICB0aGlzLmNyZWF0dXJlRmFjdG9yeSA9IGNyZWF0dXJlRmFjdG9yeS5jYWxsKHRoaXMpO1xyXG4gICAgfVxyXG59XG5cblBsYXkucHJvdG90eXBlLmluaXQgPSBpbml0O1xuUGxheS5wcm90b3R5cGUucHJlbG9hZCA9IHByZWxvYWQ7XHJcblBsYXkucHJvdG90eXBlLmNyZWF0ZSA9IGNyZWF0ZTtcclxuUGxheS5wcm90b3R5cGUudXBkYXRlID0gdXBkYXRlO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9pbmRleC5qcyIsImNvbnN0IGdsb2JhbENvbmZpZyA9IHtcclxuICAgIHdpZHRoOiA1NDYsXHJcbiAgICBoZWlnaHQ6IDM2OCxcclxuICAgIGJsb2NrczogMyxcclxuICAgIGRvbUVsZW1lbnQ6ICdnYW1lJyxcclxuICAgIGJhY2tncm91bmRQYXRoOiAnYmFja2dyb3VuZHMvJyxcclxuICAgIHRpbGVzZXRQYXRoOiAndGlsZXNldHMvJyxcclxuICAgIGxldmVsUGF0aDogJ2xldmVscy8nLFxyXG4gICAgdGV4dHVyZUF0bGFzUGF0aDogJ3Nwcml0ZXNoZWV0cy8nLFxyXG4gICAgdGV4dHVyZUF0bGFzTmFtZTogJ3ByZTJhdGxhcycsXHJcbiAgICB0ZXh0dXJlQXRsYXNJbWFnZTogJ3ByZTJhdGxhcy5wbmcnLFxyXG4gICAgdGV4dHVyZUF0bGFzSnNvbjogJ3ByZTJhdGxhcy5qc29uJ1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2xvYmFsQ29uZmlnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dsb2JhbENvbmZpZy5qcyIsInZhciBjcmVhdHVyZUNvbmZpZ3MgPSB7XHJcbiAgY3JlYXR1cmVEZWZhdWx0czoge1xyXG4gICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgZ3Jhdml0eTogNTAwLFxyXG4gICAgYm91bmNlOiAwLjIsXHJcbiAgICBtYXNzOiAxLFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDEwMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgbGl2ZXM6IDEsXHJcbiAgICBsaWZlc3BhbjogSW5maW5pdHksXHJcbiAgICBzZW5zZTogMTUwLFxyXG4gICAgYW5pbWF0aW9uczogW10sXHJcbiAgICB0aW1lT2Y6IHtcclxuICAgICAgJ21vdmUnOiAyMDAsXHJcbiAgICAgICdoaXQnOiAxMDAsXHJcbiAgICAgICdodXJ0JzogNTAwLFxyXG4gICAgICAnc3RvcCc6IDIwMCxcclxuICAgICAgJ2lkbGUnOiAxMFxyXG4gICAgfSxcclxuICAgIGJvdW5kVG8gOiB7fSxcclxuICAgIGNvcnJlY3RlZEFuY2hvcjoge1xyXG4gICAgICB4OiAwLjUsXHJcbiAgICAgIHk6IDAuNVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbWFuOiB7XHJcbiAgICB0eXBlOiAnbWFuJyxcclxuICAgIG1heFNwZWVkOiAyMDAsXHJcbiAgICBsaXZlczogOCxcclxuICAgIGxpZmVzcGFuOiBJbmZpbml0eSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzExLCcwMycsJzA1JywxNCwyMF0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2hpdCcsIGZyYW1lczogWzIyLDI0LDI4LDMxLDM0LDIyLDI0LDI4LDMxLDM0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzdG9wJywgZnJhbWVzOiBbNDIsNDUsNDksNTJdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMTYsNDEsNDcsNTAsNTAsNTAsNTAsNTAsNTAsNTAsNTAsMTMsNTAsMTMsNTAsMTNdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjcsMjcsMjcsMjcsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMzAsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjcsMzAsMjcsMzAsMzUsMzYsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjUsJzA3JywnMDcnLCcwNycsJzA3JywnMDInLCcwMiddLCBmcHM6IDUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnaHVydCcsIGZyYW1lczogWzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzdHVuJywgZnJhbWVzOiBbMTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzE5XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFsxMSwnMDMnLCcwNScsMTQsMjBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9XHJcbiAgICBdLFxyXG4gICAgY29ycmVjdGVkQW5jaG9yOiB7XHJcbiAgICAgIHg6IDAuNSxcclxuICAgICAgeTogMC44XHJcbiAgICB9XHJcbiAgfSxcclxuICBkaW5vOiB7XHJcbiAgICB0eXBlOiAnZGlubycsXHJcbiAgICBtYXNzOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDUsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNjAsMzYwLDM2MCwzNjAsMzYwLDM2MCwzNjAsMzY3XSwgZnBzOiA1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszNjAsMzYxLDM2NCwzNjcsMzY5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzYwLDM2MSwzNjQsMzY3LDM2OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZmFsbCcsIGZyYW1lczogWzM2OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzcxXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM2MCwzNjEsMzY0LDM2N10sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgYmVhcjoge1xyXG4gICAgdHlwZTogJ2JlYXInLFxyXG4gICAgbWFzczogMS4yLFxyXG4gICAgbWF4U3BlZWQ6IDc1LFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTUsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszMjFdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzIwLDMyMSwzMjRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzY2LDM2MywzNTgsMzE3XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzI4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICAnc3VwZXItYmVhcic6IHtcclxuICAgIGFjY2VsZXJhdGlvbjogMzAsXHJcbiAgICBtYXhTcGVlZDogMjAwLFxyXG4gICAgaW1hZ2U6ICdzdXBlci1iZWFyLXNwcml0ZS1yZWYnLCAvLyBvdmVycmlkZSBzcHJpdGUgKGNyZWF0dXJlIG5hbWUgYnkgZGVmYXVsdClcclxuICAgIGFuaW1hdGlvbnM6IFtdXHJcbiAgfSxcclxuICB0aWdlcjoge1xyXG4gICAgdHlwZTogJ3RpZ2VyJyxcclxuICAgIG1hc3M6IDEuNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMjAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszOTMsMzk1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzkzLDM5NV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzM5OSw0MDFdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdmYWxsJywgZnJhbWVzOiBbMzk5XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDAyXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM5MywzOTVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHB0ZXJvOiB7XHJcbiAgICB0eXBlOiAncHRlcm8nLFxyXG4gICAgbWFzczogMC41LFxyXG4gICAgZ3Jhdml0eTogMCxcclxuICAgIGJvdW5jZTogMC4xLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IGZhbHNlLFxyXG4gICAgbWF4U3BlZWQ6IDEwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc3LDQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc3LDQ3N10sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbNDAzLDQwNCw0MDUsNDAzLDQwNCw0MDUsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDMsNDA0LDQwNSw0MDMsNDA0LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDA1LDQwNV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGVzY2VuZCcsIGZyYW1lczogWzQwNV0sIGZwczogMTUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnYXNjZW5kJywgZnJhbWVzOiBbNDAzLDQwNCw0MDVdLCBmcHM6IDE1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQ3MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFs0MDUsNDAzLDQwNF0sIGZwczogMTUsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgZHJhZ29uZmx5OiB7XHJcbiAgICB0eXBlOiAnZHJhZ29uZmx5JyxcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszMzcsMzM4XSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzM3LDMzOF0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAndHVybicsIGZyYW1lczogWzMzOSwzNDBdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM0Ml0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszMzcsMzM4XSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBiYXQ6IHtcclxuICAgIHR5cGU6ICdiYXQnLFxyXG4gICAgbWFzczogMC41LFxyXG4gICAgZ3Jhdml0eTogMCxcclxuICAgIGJvdW5jZTogMC4xLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IGZhbHNlLFxyXG4gICAgbWF4U3BlZWQ6IDIwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM1MSwzNTIsMzUxLDM1MSwzNTEsMzUxXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzU3LDM1OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzYyXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM1NywzNTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHNwaWRlcjoge1xyXG4gICAgdHlwZTogJ3NwaWRlcicsXHJcbiAgICBtYXNzOiAwLjMsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszMzVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzY1LDM2OCwzNzAsMzcyXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzI5OSwzMDIsMzA1LDMwOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAndHVybicsIGZyYW1lczogWzMxOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnY2xpbWInLCBmcmFtZXM6IFszNDEsMzQzLDM0NSwzNDddLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3dhaXQnLCBmcmFtZXM6IFszMzIsMzM1LDM3Ml0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzIyXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgbmF0aXZlOiB7XHJcbiAgICB0eXBlOiAnbmF0aXZlJyxcclxuICAgIG1heFNwZWVkOiAxMDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDIwLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM3M10sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM3MywzNzYsMzc4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszODBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM3MywzNzYsMzc4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBwYXJyb3Q6IHtcclxuICAgIHR5cGU6ICdwYXJyb3QnLFxyXG4gICAgbWFzczogMC41LFxyXG4gICAgZ3Jhdml0eTogMCxcclxuICAgIGJvdW5jZTogMC4xLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IGZhbHNlLFxyXG4gICAgbWF4U3BlZWQ6IDEwMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszOTQsMzk3LDM5OF0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM5NCwzOTcsMzk4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0MDBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM5NCwzOTcsMzk4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBpbnNlY3Q6IHtcclxuICAgIHR5cGU6ICdpbnNlY3QnLFxyXG4gICAgbWFzczogMSxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEuNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMjUsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNDgsMzQ4LDM0OCwzNDgsMzQ4LDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMjMsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzMyMywzNDgsMzQ5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNDhdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzIzLDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGJ1Zzoge1xyXG4gICAgdHlwZTogJ2J1ZycsXHJcbiAgICBtYXNzOiAxLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyNSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzM0NCwzNDZdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM0NF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBmcm9nOiB7XHJcbiAgICB0eXBlOiAnZnJvZycsXHJcbiAgICBtYXNzOiAxLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMS41LFxyXG4gICAganVtcGluZzogNTAwLFxyXG4gICAgbWF4U3BlZWQ6IDgwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiA0MCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMyNV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMyNSwzMjcsMzMxLDMyNV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszMjUsMzI3LDMzMSwzMjVdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszMzRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzI1LDMyNywzMzEsMzI1XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgdHVydGxlOiB7XHJcbiAgICB0eXBlOiAndHVydGxlJyxcclxuICAgIG1hc3M6IDIsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMC4zLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM5MF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNzcsMzgxLDM4NCwzODVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszODcsMzg5LDM5MCwzOTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM5Ml0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgamVsbHk6IHtcclxuICAgIHR5cGU6ICdqZWxseScsXHJcbiAgICBtYXNzOiAyLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEsXHJcbiAgICBtYXhTcGVlZDogNSxcclxuICAgIGFjY2VsZXJhdGlvbjogMSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbNDIwLDQzMyw0MzRdLCBmcHM6IDMsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGdvcmlsbGE6IHtcclxuICAgIHR5cGU6ICdnb3JpbGxhJyxcclxuICAgIG1hc3M6IDUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzQxMV0sIGZwczogNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdmYWxsJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfVxyXG59O1xyXG5cclxuZm9yKHZhciBjcmVhdHVyZSBpbiBjcmVhdHVyZUNvbmZpZ3Mpe1xyXG4gIC8vY3JlYXR1cmVDb25maWdzW2NyZWF0dXJlXSA9IF8ubWVyZ2Uoe30sIGNvbmZpZ3MuY3JlYXR1cmVEZWZhdWx0cywgY29uZmlnc1tjcmVhdHVyZV0pO1xyXG4gIHZhciBkZWZhdWx0cyA9IGNyZWF0dXJlQ29uZmlnc1snY3JlYXR1cmVEZWZhdWx0cyddO1xyXG4gIGZvcih2YXIgcHJvcCBpbiBkZWZhdWx0cyl7XHJcbiAgICBpZihjcmVhdHVyZUNvbmZpZ3NbY3JlYXR1cmVdW3Byb3BdID09PSB1bmRlZmluZWQpe1xyXG4gICAgICBjcmVhdHVyZUNvbmZpZ3NbY3JlYXR1cmVdW3Byb3BdID0gZGVmYXVsdHNbcHJvcF07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0dXJlQ29uZmlncztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwiaW1wb3J0IEh1bWFuIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSHVtYW4nO1xyXG5pbXBvcnQgQUkgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9BSSc7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGUoKXtcclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0NyZWF0ZV0nKTtcclxuICAgIC8vIGZwcyBkZWJ1Z2dpbmdcclxuICAgIHRoaXMuZ2FtZS50aW1lLmFkdmFuY2VkVGltaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBbU0VUIExFVkVMXSBzZXQgZGltZW5zaW9ucywgc3RhcnQgcGh5c2ljIHN5c3RlbVxyXG4gICAgdGhpcy5nYW1lLndvcmxkLnNldEJvdW5kcyhcclxuICAgICAgICAwLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcud2lkdGggKiB0aGlzLmdsb2JhbENvbmZpZy5ibG9ja3MsXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcuaGVpZ2h0XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcblxyXG4gICAgdGhpcy5sZXZlbExvYWRlci5jcmVhdGVCYWNrZ3JvdW5kKCdiYWNrZ3JvdW5kTGF5ZXInKTtcclxuICAgIHRoaXMubGV2ZWxMb2FkZXIuY3JlYXRlVGlsZXMoXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy50aWxlbWFwLFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcudGlsZXNldCxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXRJbWFnZVxyXG4gICAgKTtcclxuICAgIHRoaXMubGV2ZWxMb2FkZXIuY3JlYXRlTGF5ZXJzKHRoaXMubGV2ZWxDb25maWcubGF5ZXJzKTtcclxuXHJcbiAgICAvLyBbU0VUIExFVkVMXSBmaXggYmFja2dyb3VuZCwgcmVzaXplXHJcbiAgICB0aGlzLmxldmVsLmJhY2tncm91bmRMYXllci5maXhlZFRvQ2FtZXJhID0gdGhpcy5sZXZlbENvbmZpZy5maXhlZEJhY2tncm91bmQ7XHJcbiAgICB0aGlzLmxldmVsLmdyb3VuZExheWVyLnJlc2l6ZVdvcmxkKCk7XHJcblxyXG4gICAgdGhpcy5nYW1lU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgIGluaXRpYWxpc2VkOiBmYWxzZSxcclxuICAgICAgICBzY29yZTogMFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSA9IG1vYnguYWN0aW9uKChjaGFuZ2UpID0+IHtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IE9iamVjdC5hc3NpZ24odGhpcy5nYW1lU3RhdGUsIGNoYW5nZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtb2J4Lm9ic2VydmUodGhpcy5nYW1lU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tnYW1lU3RhdGVdIGNoYW5nZScsIGNoYW5nZSwgdGhpcy5nYW1lU3RhdGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7IGluaXRpYWxpc2VkOiB0cnVlIH0pO1xyXG5cclxuICAgIC8vIFtQTEFZRVJdXHJcbiAgICB0aGlzLnBsYXllciA9IG5ldyBIdW1hbihcclxuICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5lbnRyeVBvaW50LngsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5lbnRyeVBvaW50LnksXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcudGV4dHVyZUF0bGFzTmFtZSxcclxuICAgICAgICB0aGlzLmNyZWF0dXJlQ29uZmlnLm1hblxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBbRU5FTUlFU11cclxuICAgIHRoaXMuZW5lbWllcyA9IG5ldyBQaGFzZXIuR3JvdXAodGhpcy5nYW1lKTtcclxuICAgIHRoaXMubGV2ZWxDb25maWcuZW5lbWllcy5mb3JFYWNoKHRoaXMuY3JlYXR1cmVGYWN0b3J5LmNyZWF0ZSk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xyXG5cclxuICAgIC8vIGJpbmQga2V5c1xyXG4gICAgdGhpcy5rZXlzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuICAgIHRoaXMua2V5cy5zcGFjZSA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlNQQUNFQkFSKTtcclxuXHJcbiAgICAvLyBzY29yZSB0ZXh0XHJcbiAgICB0aGlzLm1lbnUgPSB0aGlzLmdhbWUuYWRkLnRleHQoXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcud2lkdGggLSAxMjAsXHJcbiAgICAgICAgMCxcclxuICAgICAgICBcIkxpZmU6IFwiICsgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSxcclxuICAgICAgICB7IGZvbnQ6IFwiMjRweCBDb3VyaWVyXCIsIGZpbGw6IFwiI2ZmZlwiLCBhbGlnbjogXCJjZW50ZXJcIiB9XHJcbiAgICApO1xyXG4gICAgdGhpcy5tZW51LmZpeGVkVG9DYW1lcmEgPSB0cnVlO1xyXG4gICAgbW9ieC5vYnNlcnZlKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgIHRoaXMubWVudS5zZXRUZXh0KFwiTGlmZTogXCIgKyB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmNyZWF0ZS5qcyIsImZ1bmN0aW9uIGluaXQobGV2ZWxDb25maWcpe1xyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bSW5pdF0nLCBsZXZlbENvbmZpZyk7XHJcbiAgICB0aGlzLmxldmVsQ29uZmlnID0gbGV2ZWxDb25maWc7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbml0O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmluaXQuanMiLCJmdW5jdGlvbiBwcmVsb2FkKCl7XHJcbiAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtQcmVsb2FkXScpO1xyXG5cclxuICAgIC8vIGFzc2V0cyB0byBsb2FkIHJlbGF0aXZlIHRvIC9hc3NldHMvLi5cclxuICAgIHRoaXMuZ2FtZS5sb2FkLmF0bGFzKFxyXG4gICAgICAgICdwcmUyYXRsYXMnLFxyXG4gICAgICAgICdzcHJpdGVzaGVldHMvcHJlMmF0bGFzLnBuZycsXHJcbiAgICAgICAgJ3Nwcml0ZXNoZWV0cy9wcmUyYXRsYXMuanNvbicsXHJcbiAgICAgICAgUGhhc2VyLkxvYWRlci5URVhUVVJFX0FUTEFTX0pTT05fSEFTSFxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBsb2FkIGJhY2tncm91bmRcclxuICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKHRoaXMubGV2ZWxDb25maWcuYmFja2dyb3VuZEtleSwgdGhpcy5nbG9iYWxDb25maWcuYmFja2dyb3VuZFBhdGggKyB0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRJbWFnZSArIHRoaXMubGV2ZWxDb25maWcuYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uKTtcclxuICAgIC8vIGxvYWQgdGlsZXNldFxyXG4gICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UodGhpcy5sZXZlbENvbmZpZy50aWxlc2V0LCB0aGlzLmdsb2JhbENvbmZpZy50aWxlc2V0UGF0aCArIHRoaXMubGV2ZWxDb25maWcudGlsZXNldEltYWdlICsgdGhpcy5sZXZlbENvbmZpZy50aWxlc2V0SW1hZ2VFeHRlbnNpb24pO1xyXG4gICAgLy8gbG9hZCB0aWxlbWFwXHJcbiAgICB0aGlzLmdhbWUubG9hZC50aWxlbWFwKHRoaXMubGV2ZWxDb25maWcudGlsZW1hcCwgdGhpcy5nbG9iYWxDb25maWcubGV2ZWxQYXRoICsgdGhpcy5sZXZlbENvbmZpZy50aWxlZEpzb24sIG51bGwsIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByZWxvYWQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkucHJlbG9hZC5qcyIsImZ1bmN0aW9uIHVwZGF0ZSgpe1xyXG4gICAgLy9jb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtVcGRhdGVdJyk7XHJcbiAgICAvLyBmcHNcclxuICAgIHRoaXMuZ2FtZS5kZWJ1Zy50ZXh0KHRoaXMuZ2FtZS50aW1lLmZwcywgNSwgMjApO1xyXG5cclxuICAgIC8vIGNvbGxpZGVcclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmxldmVsLmNvbGxpc2lvbkxheWVyKTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLmVuZW1pZXMsIHRoaXMubGV2ZWwuY29sbGlzaW9uTGF5ZXIpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMucGxheWVyLCB0aGlzLmVuZW1pZXMsIChwbGF5ZXIsIGVuZW15KSA9PiB7XHJcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIuYm9keS50b3VjaGluZy5kb3duICYmIGVuZW15LmJvZHkudG91Y2hpbmcudXApe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLnBsYXllci5pc0hpdHRpbmcgJiYgIXRoaXMucGxheWVyLmlzU3R1bm5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGxpZmU6IHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUgLSAxLFxyXG4gICAgICAgICAgICAgICAgc3R1bjogdGhpcy5nYW1lLnRpbWUubm93ICsgMTUwMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaHVydChlbmVteS5ib2R5LnRvdWNoaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBtb3ZlXHJcbiAgICBvbktleVByZXNzLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uS2V5UHJlc3MoKXtcclxuICAgIC8vIHN0dW4gPT4gYmxvY2tlZFxyXG4gICAgaWYodGhpcy5wbGF5ZXIuaXNTdHVubmVkKXtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3N0dW4nKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbW92ZSBsZWZ0IC8gcmlnaHRcclxuICAgIGlmKHRoaXMua2V5cy5sZWZ0LmlzRG93bil7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZUxlZnQoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgIH0gZWxzZSBpZih0aGlzLmtleXMucmlnaHQuaXNEb3duKXtcclxuICAgICAgICB0aGlzLnBsYXllci5tb3ZlUmlnaHQoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnaWRsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGp1bXBcclxuICAgIGlmKHRoaXMua2V5cy51cC5pc0Rvd24pe1xyXG4gICAgICAgIHRoaXMucGxheWVyLmp1bXAoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2p1bXAnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBoaXRcclxuICAgIGlmKHRoaXMua2V5cy5zcGFjZS5pc0Rvd24pe1xyXG4gICAgICAgIGlmKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLm5vaGl0IDwgdGhpcy5nYW1lLnRpbWUubm93ICYmIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmhpdCA8IHRoaXMuZ2FtZS50aW1lLm5vdyl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmhpdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2hpdCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnVwZGF0ZS5qcyIsImltcG9ydCBnbG9iYWxDb25maWcgZnJvbSAnLi9nbG9iYWxDb25maWcuanMnO1xyXG5pbXBvcnQgTWVudSBmcm9tICcuL2dhbWVzdGF0ZXMvbWVudS9pbmRleC5qcyc7XHJcbmltcG9ydCBQbGF5IGZyb20gJy4vZ2FtZXN0YXRlcy9wbGF5L2luZGV4LmpzJztcclxuXHJcbi8vIGluc3RhbnRpYXRlIGEgUGhhc2VyLkdhbWVcclxuY29uc3QgUExBVEZPUk1FUiA9IG5ldyBQaGFzZXIuR2FtZShcclxuICAgIGdsb2JhbENvbmZpZy53aWR0aCxcclxuICAgIGdsb2JhbENvbmZpZy5oZWlnaHQsXHJcbiAgICBQaGFzZXIuQVVUTyxcclxuICAgIGdsb2JhbENvbmZpZy5kb21FbGVtZW50XHJcbik7XHJcblxyXG4vLyByZWdpc3RlciBnYW1lc3RhdGVzICh3aWxsIGJlIGluc3RhbnRpYXRlZCB3LyB0aGlzLmdhbWUgYXMgMXN0IHBhcmFtLCBwYXNzIGdhbWVDb25maWcgYXMgMm5kKVxyXG5QTEFURk9STUVSLnN0YXRlLmFkZCgnTWVudScsIE1lbnUuYmluZChudWxsLCBnbG9iYWxDb25maWcpKTtcclxuUExBVEZPUk1FUi5zdGF0ZS5hZGQoJ1BsYXknLCBQbGF5LmJpbmQobnVsbCwgZ2xvYmFsQ29uZmlnKSk7XHJcblxyXG5QTEFURk9STUVSLnN0YXRlLnN0YXJ0KCdNZW51JywgdHJ1ZSwgdHJ1ZSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvaW5kZXguanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vY29tcG9uZW50cy9BSSc7XHJcblxyXG5mdW5jdGlvbiBjcmVhdHVyZUZhY3RvcnkoKSB7XHJcbiAgICBjb25zdCBjcmVhdHVyZXMgPSB7XHJcbiAgICAgICAgYmF0OiAnYmF0JyxcclxuICAgICAgICBiZWFyOiAnYmVhcicsXHJcbiAgICAgICAgYnVnOiAnYnVnJyxcclxuICAgICAgICBkaW5vOiAnZGlubycsXHJcbiAgICAgICAgZHJhZ29uZmx5OiAnZHJhZ29uZmx5JyxcclxuICAgICAgICBmcm9nOiAnZnJvZycsXHJcbiAgICAgICAgZ29yaWxsYTogJ2dvcmlsbGEnLFxyXG4gICAgICAgIGluc2VjdDogJ2luc2VjdCcsXHJcbiAgICAgICAgamVsbHk6ICdqZWxseScsXHJcbiAgICAgICAgbmF0aXZlOiAnbmF0aXZlJyxcclxuICAgICAgICBwYXJyb3Q6ICdwYXJyb3QnLFxyXG4gICAgICAgIHB0ZXJvOiAncHRlcm8nLFxyXG4gICAgICAgIHNwaWRlcjogJ3NwaWRlcicsXHJcbiAgICAgICAgdGlnZXI6ICd0aWdlcicsXHJcbiAgICAgICAgdHVydGxlOiAndHVydGxlJ1xyXG4gICAgfTtcclxuXHJcbiAgICBmb3IobGV0IGNyZWF0dXJlIGluIGNyZWF0dXJlcyl7XHJcbiAgICAgICAgaWYoY3JlYXR1cmVzLmhhc093blByb3BlcnR5KGNyZWF0dXJlKSl7XHJcbiAgICAgICAgICAgIGNyZWF0dXJlc1tjcmVhdHVyZV0gPSBjbGFzcyBjcmVhdHVyZSBleHRlbmRzIEFJIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG4gICAgICAgICAgICBcdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlkID0gYCR7cHJvcHMudHlwZX0tJHt4fS0ke3l9YDtcclxuICAgICAgICAgICAgXHR9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGU6IChsZXZlbENvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBlbmVteSA9IG5ldyBjcmVhdHVyZXNbbGV2ZWxDb25maWcudHlwZV0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgICAgICAgICBsZXZlbENvbmZpZy5vcmlnaW4ueCxcclxuICAgICAgICAgICAgICAgIGxldmVsQ29uZmlnLm9yaWdpbi55LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxDb25maWcudGV4dHVyZUF0bGFzTmFtZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWdbbGV2ZWxDb25maWcudHlwZV1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgZW5lbXkuc2V0Qm91bmRzKGxldmVsQ29uZmlnLmJvdW5kVG8pO1xyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMuYWRkKGVuZW15KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXR1cmVGYWN0b3J5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2NyZWF0dXJlRmFjdG9yeS5qcyIsImZ1bmN0aW9uIGxldmVsTG9hZGVyKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGVCYWNrZ3JvdW5kOiAobGF5ZXJOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwuYmFja2dyb3VuZExheWVyID0gdGhpcy5nYW1lLmFkZC50aWxlU3ByaXRlKFxyXG4gICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsQ29uZmlnLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRLZXlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZUxheWVyOiAobGF5ZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbFtsYXllcl0gPSB0aGlzLmxldmVsLnRpbGVtYXAuY3JlYXRlTGF5ZXIodGhpcy5sZXZlbENvbmZpZ1tsYXllcl0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlTGF5ZXJzOiAobGF5ZXJzKSA9PiB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgbGF5ZXIgaW4gbGF5ZXJzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxbbGF5ZXJdID0gdGhpcy5sZXZlbC50aWxlbWFwLmNyZWF0ZUxheWVyKHRoaXMubGV2ZWxDb25maWcubGF5ZXJzW2xheWVyXS5rZXkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbFtsYXllcl0udmlzaWJsZSA9IHRoaXMubGV2ZWxDb25maWcubGF5ZXJzW2xheWVyXS52aXNpYmxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGVUaWxlczogKHRpbGVtYXBLZXksIHRpbGVzZXRLZXksIHRpbGVzZXRJbWFnZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLnRpbGVtYXAgPSB0aGlzLmdhbWUuYWRkLnRpbGVtYXAodGlsZW1hcEtleSk7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcC5hZGRUaWxlc2V0SW1hZ2UodGlsZXNldEltYWdlLCB0aWxlc2V0S2V5KTtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC50aWxlbWFwLnNldENvbGxpc2lvbkJldHdlZW4oMCwgMzAwMCwgdHJ1ZSwgdGhpcy5sZXZlbENvbmZpZy5sYXllcnMuY29sbGlzaW9uTGF5ZXIua2V5KTtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC50aWxlbWFwLnNldENvbGxpc2lvbkJldHdlZW4oMCwgMzAwMCwgdHJ1ZSwgdGhpcy5sZXZlbENvbmZpZy5sYXllcnMuZGVhdGhMYXllci5rZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsZXZlbExvYWRlcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbExvYWRlci5qcyIsImltcG9ydCBjcmVhdGUgZnJvbSAnLi9tZW51LmNyZWF0ZSc7XHJcbi8vaW1wb3J0IHVwZGF0ZSBmcm9tICcuL3BsYXkudXBkYXRlJztcclxuXHJcbmNsYXNzIE1lbnUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5rZXlzID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5NZW51LnByb3RvdHlwZS5jcmVhdGUgPSBjcmVhdGU7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1lbnU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9tZW51L2luZGV4LmpzIiwiZnVuY3Rpb24gY3JlYXRlKCl7XHJcblxyXG4gICAgLy8gZnBzIGRlYnVnZ2luZ1xyXG4gICAgdGhpcy5nYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xyXG5cclxuICAgIC8vIENUQSB0ZXh0XHJcbiAgICBjb25zdCB0ZXh0ID0gdGhpcy5nYW1lLmFkZC50ZXh0KFxyXG4gICAgICAgIHRoaXMuZ2FtZS53aWR0aCAvIDIsXHJcbiAgICAgICAgdGhpcy5nYW1lLmhlaWdodCAvIDIsXHJcbiAgICAgICAgXCJDaG9vc2UgYSBsZXZlbCFcXG4xIDIgMyA0IDUgNlwiLFxyXG4gICAgICAgIHsgZm9udDogXCIyNHB4IENvdXJpZXJcIiwgZmlsbDogXCIjZmZmZmZmXCIsIGFsaWduOiBcImNlbnRlclwiIH1cclxuICAgICk7XHJcblxyXG4gICAgdGV4dC5hbmNob3Iuc2V0KDAuNSk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLm9uRG93bkNhbGxiYWNrID0gKGUpID0+IHtcclxuICAgICAgICBmZXRjaCgnL2xldmVsLycgKyBlLmtleSwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnXHJcbiAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICB9KS50aGVuKChsZXZlbENvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ1BsYXknLCB0cnVlLCB0cnVlLCBsZXZlbENvbmZpZyk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5vbkRvd25DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW01lbnVdW0NyZWF0ZV0nKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvbWVudS9tZW51LmNyZWF0ZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=