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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
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

        _this.id = props.type + '-' + x + '-' + y;

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


var _menu = __webpack_require__(7);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _AI = __webpack_require__(0);

var _AI2 = _interopRequireDefault(_AI);

var _Human = __webpack_require__(2);

var _Human2 = _interopRequireDefault(_Human);

var _levelLoader = __webpack_require__(14);

var _levelLoader2 = _interopRequireDefault(_levelLoader);

var _creatureFactory = __webpack_require__(13);

var _creatureFactory2 = _interopRequireDefault(_creatureFactory);

var _creatureconfig = __webpack_require__(6);

var _creatureconfig2 = _interopRequireDefault(_creatureconfig);

var _play = __webpack_require__(9);

var _play2 = _interopRequireDefault(_play);

var _play3 = __webpack_require__(10);

var _play4 = _interopRequireDefault(_play3);

var _play5 = __webpack_require__(8);

var _play6 = _interopRequireDefault(_play5);

var _play7 = __webpack_require__(11);

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
/* 5 */
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
/* 6 */
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
/* 7 */
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

/***/ }),
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _globalConfig = __webpack_require__(5);

var _globalConfig2 = _interopRequireDefault(_globalConfig);

var _index = __webpack_require__(3);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(4);

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// instantiate a Phaser.Game
var PLATFORMER = new Phaser.Game(_globalConfig2.default.width, _globalConfig2.default.height, Phaser.AUTO, _globalConfig2.default.domElement);

// register gamestates (will be instantiated w/ this.game as 1st param, pass gameConfig as 2nd)
PLATFORMER.state.add('Menu', _index2.default.bind(null, _globalConfig2.default));
PLATFORMER.state.add('Play', _index4.default.bind(null, _globalConfig2.default));

PLATFORMER.state.start('Menu', true, true);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bat = __webpack_require__(15);

var _bat2 = _interopRequireDefault(_bat);

var _bear = __webpack_require__(16);

var _bear2 = _interopRequireDefault(_bear);

var _bug = __webpack_require__(17);

var _bug2 = _interopRequireDefault(_bug);

var _dino = __webpack_require__(18);

var _dino2 = _interopRequireDefault(_dino);

var _dragonfly = __webpack_require__(19);

var _dragonfly2 = _interopRequireDefault(_dragonfly);

var _frog = __webpack_require__(20);

var _frog2 = _interopRequireDefault(_frog);

var _gorilla = __webpack_require__(21);

var _gorilla2 = _interopRequireDefault(_gorilla);

var _insect = __webpack_require__(22);

var _insect2 = _interopRequireDefault(_insect);

var _jelly = __webpack_require__(23);

var _jelly2 = _interopRequireDefault(_jelly);

var _native = __webpack_require__(24);

var _native2 = _interopRequireDefault(_native);

var _parrot = __webpack_require__(25);

var _parrot2 = _interopRequireDefault(_parrot);

var _ptero = __webpack_require__(26);

var _ptero2 = _interopRequireDefault(_ptero);

var _spider = __webpack_require__(27);

var _spider2 = _interopRequireDefault(_spider);

var _tiger = __webpack_require__(28);

var _tiger2 = _interopRequireDefault(_tiger);

var _turtle = __webpack_require__(29);

var _turtle2 = _interopRequireDefault(_turtle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function creatureFactory() {
    var _this = this;

    var Creature = {
        bat: _bat2.default,
        bear: _bear2.default,
        bug: _bug2.default,
        dino: _dino2.default,
        dragonfly: _dragonfly2.default,
        frog: _frog2.default,
        gorilla: _gorilla2.default,
        insect: _insect2.default,
        jelly: _jelly2.default,
        native: _native2.default,
        parrot: _parrot2.default,
        ptero: _ptero2.default,
        spider: _spider2.default,
        tiger: _tiger2.default,
        turtle: _turtle2.default
    };

    return {
        create: function create(levelConfig) {
            var enemy = new Creature[levelConfig.type](_this.game, levelConfig.origin.x, levelConfig.origin.y, _this.globalConfig.textureAtlasName, _this.creatureConfig[levelConfig.type]);
            enemy.setBounds(levelConfig.boundTo);
            _this.enemies.add(enemy);
        }
    };
};

exports.default = creatureFactory;

/***/ }),
/* 14 */
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
/* 15 */
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

var Bat = function (_AI) {
	_inherits(Bat, _AI);

	function Bat(game, x, y, sprite, props) {
		_classCallCheck(this, Bat);

		return _possibleConstructorReturn(this, (Bat.__proto__ || Object.getPrototypeOf(Bat)).call(this, game, x, y, sprite, props));
	}

	return Bat;
}(_AI3.default);

exports.default = Bat;

/***/ }),
/* 16 */
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

var Bear = function (_AI) {
	_inherits(Bear, _AI);

	function Bear(game, x, y, sprite, props) {
		_classCallCheck(this, Bear);

		return _possibleConstructorReturn(this, (Bear.__proto__ || Object.getPrototypeOf(Bear)).call(this, game, x, y, sprite, props));
	}

	return Bear;
}(_AI3.default);

exports.default = Bear;

/***/ }),
/* 17 */
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

var Bug = function (_AI) {
	_inherits(Bug, _AI);

	function Bug(game, x, y, sprite, props) {
		_classCallCheck(this, Bug);

		return _possibleConstructorReturn(this, (Bug.__proto__ || Object.getPrototypeOf(Bug)).call(this, game, x, y, sprite, props));
	}

	return Bug;
}(_AI3.default);

exports.default = Bug;

/***/ }),
/* 18 */
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

var Dino = function (_AI) {
	_inherits(Dino, _AI);

	function Dino(game, x, y, sprite, props) {
		_classCallCheck(this, Dino);

		return _possibleConstructorReturn(this, (Dino.__proto__ || Object.getPrototypeOf(Dino)).call(this, game, x, y, sprite, props));
	}

	return Dino;
}(_AI3.default);

exports.default = Dino;

/***/ }),
/* 19 */
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

var Dragonfly = function (_AI) {
	_inherits(Dragonfly, _AI);

	function Dragonfly(game, x, y, sprite, props) {
		_classCallCheck(this, Dragonfly);

		return _possibleConstructorReturn(this, (Dragonfly.__proto__ || Object.getPrototypeOf(Dragonfly)).call(this, game, x, y, sprite, props));
	}

	return Dragonfly;
}(_AI3.default);

exports.default = Dragonfly;

/***/ }),
/* 20 */
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

var Frog = function (_AI) {
	_inherits(Frog, _AI);

	function Frog(game, x, y, sprite, props) {
		_classCallCheck(this, Frog);

		return _possibleConstructorReturn(this, (Frog.__proto__ || Object.getPrototypeOf(Frog)).call(this, game, x, y, sprite, props));
	}

	return Frog;
}(_AI3.default);

exports.default = Frog;

/***/ }),
/* 21 */
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

var Gorilla = function (_AI) {
	_inherits(Gorilla, _AI);

	function Gorilla(game, x, y, sprite, props) {
		_classCallCheck(this, Gorilla);

		return _possibleConstructorReturn(this, (Gorilla.__proto__ || Object.getPrototypeOf(Gorilla)).call(this, game, x, y, sprite, props));
	}

	return Gorilla;
}(_AI3.default);

exports.default = Gorilla;

/***/ }),
/* 22 */
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

var Insect = function (_AI) {
	_inherits(Insect, _AI);

	function Insect(game, x, y, sprite, props) {
		_classCallCheck(this, Insect);

		return _possibleConstructorReturn(this, (Insect.__proto__ || Object.getPrototypeOf(Insect)).call(this, game, x, y, sprite, props));
	}

	return Insect;
}(_AI3.default);

exports.default = Insect;

/***/ }),
/* 23 */
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

var Jelly = function (_AI) {
	_inherits(Jelly, _AI);

	function Jelly(game, x, y, sprite, props) {
		_classCallCheck(this, Jelly);

		return _possibleConstructorReturn(this, (Jelly.__proto__ || Object.getPrototypeOf(Jelly)).call(this, game, x, y, sprite, props));
	}

	return Jelly;
}(_AI3.default);

exports.default = Jelly;

/***/ }),
/* 24 */
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

var Native = function (_AI) {
	_inherits(Native, _AI);

	function Native(game, x, y, sprite, props) {
		_classCallCheck(this, Native);

		return _possibleConstructorReturn(this, (Native.__proto__ || Object.getPrototypeOf(Native)).call(this, game, x, y, sprite, props));
	}

	return Native;
}(_AI3.default);

exports.default = Native;

/***/ }),
/* 25 */
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

var Parrot = function (_AI) {
	_inherits(Parrot, _AI);

	function Parrot(game, x, y, sprite, props) {
		_classCallCheck(this, Parrot);

		return _possibleConstructorReturn(this, (Parrot.__proto__ || Object.getPrototypeOf(Parrot)).call(this, game, x, y, sprite, props));
	}

	return Parrot;
}(_AI3.default);

exports.default = Parrot;

/***/ }),
/* 26 */
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

var Ptero = function (_AI) {
	_inherits(Ptero, _AI);

	function Ptero(game, x, y, sprite, props) {
		_classCallCheck(this, Ptero);

		return _possibleConstructorReturn(this, (Ptero.__proto__ || Object.getPrototypeOf(Ptero)).call(this, game, x, y, sprite, props));
	}

	return Ptero;
}(_AI3.default);

exports.default = Ptero;

/***/ }),
/* 27 */
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

var Spider = function (_AI) {
	_inherits(Spider, _AI);

	function Spider(game, x, y, sprite, props) {
		_classCallCheck(this, Spider);

		return _possibleConstructorReturn(this, (Spider.__proto__ || Object.getPrototypeOf(Spider)).call(this, game, x, y, sprite, props));
	}

	return Spider;
}(_AI3.default);

exports.default = Spider;

/***/ }),
/* 28 */
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

var Tiger = function (_AI) {
	_inherits(Tiger, _AI);

	function Tiger(game, x, y, sprite, props) {
		_classCallCheck(this, Tiger);

		return _possibleConstructorReturn(this, (Tiger.__proto__ || Object.getPrototypeOf(Tiger)).call(this, game, x, y, sprite, props));
	}

	return Tiger;
}(_AI3.default);

exports.default = Tiger;

/***/ }),
/* 29 */
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

var Turtle = function (_AI) {
	_inherits(Turtle, _AI);

	function Turtle(game, x, y, sprite, props) {
		_classCallCheck(this, Turtle);

		return _possibleConstructorReturn(this, (Turtle.__proto__ || Object.getPrototypeOf(Turtle)).call(this, game, x, y, sprite, props));
	}

	return Turtle;
}(_AI3.default);

exports.default = Turtle;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDA5Y2Y3YmNhMTU5OGFkMjZhNGEiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL21lbnUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9tZW51L21lbnUuY3JlYXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuY3JlYXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnByZWxvYWQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS51cGRhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2NyZWF0dXJlRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsTG9hZGVyLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmF0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmVhci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Rpbm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9kcmFnb25mbHkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9mcm9nLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZ29yaWxsYS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2luc2VjdC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2plbGx5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvbmF0aXZlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcGFycm90LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcHRlcm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9zcGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy90aWdlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyJdLCJuYW1lcyI6WyJBSSIsImdhbWUiLCJ4IiwieSIsInNwcml0ZSIsInByb3BzIiwiaWQiLCJ0eXBlIiwic3ByaXRlU3RhdGUiLCJtb2J4Iiwib2JzZXJ2YWJsZSIsImxpZmUiLCJzdHVuIiwiaGl0Iiwibm9oaXQiLCJib2R5IiwiYmxvY2tlZCIsImxlZnQiLCJyaWdodCIsInNjYWxlIiwiYm91bmRUbyIsImhhc093blByb3BlcnR5IiwiUGhhc2VyIiwiUG9pbnQiLCJSZWN0YW5nbGUiLCJ4MSIsIngyIiwiaGVpZ2h0IiwieTEiLCJ5MiIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJjb250YWluc1BvaW50IiwiZ2V0Qm91bmRzIiwiZmFjaW5nUmlnaHQiLCJ0dXJuIiwiZmFjaW5nTGVmdCIsIndpZHRoIiwiYW5pbWF0aW9ucyIsInBsYXkiLCJjaGVja0JvdW5kcyIsIm1vdmUiLCJFeHRlbmRlZFNwcml0ZSIsImFkZCIsImV4aXN0aW5nIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoeXNpY3MiLCJBUkNBREUiLCJhbmNob3IiLCJzZXRUbyIsImNvbGxpZGVXb3JsZEJvdW5kcyIsImNoZWNrV29ybGRCb3VuZHMiLCJvdXRPZkJvdW5kc0tpbGwiLCJncmF2aXR5IiwiX2RlYnVnVGV4dCIsImFkZENoaWxkIiwidGV4dCIsImZvbnQiLCJmaWxsIiwidmlzaWJsZSIsImZvckVhY2giLCJhbmltYXRpb24iLCJuYW1lIiwiZnJhbWVzIiwibWFwIiwiZnJhbWUiLCJ0b1N0cmluZyIsImZwcyIsImxvb3AiLCJnYW1lU3RhdGUiLCJzdGF0ZSIsInN0YXRlcyIsImN1cnJlbnQiLCJvYnNlcnZlIiwiY2hhbmdlIiwiY29uc29sZSIsImxvZyIsInVwZGF0ZVN0YXRlIiwiYWN0aW9uIiwiYXNzaWduIiwidmVsb2NpdHkiLCJtYXhTcGVlZCIsImFjY2VsZXJhdGlvbiIsIm1vdmVSaWdodCIsIm1vdmVMZWZ0IiwidG91Y2hpbmciLCJkb3duIiwiaGl0VW50aWwiLCJ0aW1lIiwibm93IiwiYnJlYWtVbnRpbCIsImRpcmVjdGlvbiIsInNldFRleHQiLCJTcHJpdGUiLCJIdW1hbiIsIk1lbnUiLCJ1bmRlZmluZWQiLCJwcm90b3R5cGUiLCJjcmVhdGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiUGxheSIsImdsb2JhbENvbmZpZyIsInBsYXllciIsImVuZW15IiwibGV2ZWwiLCJiYWNrZ3JvdW5kTGF5ZXIiLCJncm91bmRMYXllciIsInRpbGVtYXAiLCJjcmVhdHVyZUNvbmZpZyIsImxldmVsTG9hZGVyIiwiY2FsbCIsImNyZWF0dXJlRmFjdG9yeSIsImluaXQiLCJwcmVsb2FkIiwidXBkYXRlIiwiYmxvY2tzIiwiZG9tRWxlbWVudCIsImJhY2tncm91bmRQYXRoIiwidGlsZXNldFBhdGgiLCJsZXZlbFBhdGgiLCJ0ZXh0dXJlQXRsYXNQYXRoIiwidGV4dHVyZUF0bGFzTmFtZSIsInRleHR1cmVBdGxhc0ltYWdlIiwidGV4dHVyZUF0bGFzSnNvbiIsImNyZWF0dXJlQ29uZmlncyIsImNyZWF0dXJlRGVmYXVsdHMiLCJhY3RpdmUiLCJib3VuY2UiLCJtYXNzIiwianVtcGluZyIsImNvbGxpZGUiLCJsaXZlcyIsImxpZmVzcGFuIiwiSW5maW5pdHkiLCJzZW5zZSIsInRpbWVPZiIsImNvcnJlY3RlZEFuY2hvciIsIm1hbiIsImRpbm8iLCJiZWFyIiwiaW1hZ2UiLCJ0aWdlciIsInB0ZXJvIiwiZHJhZ29uZmx5IiwiYmF0Iiwic3BpZGVyIiwibmF0aXZlIiwicGFycm90IiwiaW5zZWN0IiwiYnVnIiwiZnJvZyIsInR1cnRsZSIsImplbGx5IiwiZ29yaWxsYSIsImNyZWF0dXJlIiwiZGVmYXVsdHMiLCJwcm9wIiwiYWR2YW5jZWRUaW1pbmciLCJhbGlnbiIsInNldCIsImlucHV0Iiwia2V5Ym9hcmQiLCJvbkRvd25DYWxsYmFjayIsImUiLCJmZXRjaCIsImtleSIsIm1ldGhvZCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJsZXZlbENvbmZpZyIsInN0YXJ0Iiwid29ybGQiLCJzZXRCb3VuZHMiLCJzdGFydFN5c3RlbSIsImNyZWF0ZUJhY2tncm91bmQiLCJjcmVhdGVUaWxlcyIsInRpbGVzZXQiLCJ0aWxlc2V0SW1hZ2UiLCJjcmVhdGVMYXllcnMiLCJsYXllcnMiLCJmaXhlZFRvQ2FtZXJhIiwiZml4ZWRCYWNrZ3JvdW5kIiwicmVzaXplV29ybGQiLCJpbml0aWFsaXNlZCIsInNjb3JlIiwiZW50cnlQb2ludCIsImVuZW1pZXMiLCJHcm91cCIsImNhbWVyYSIsImZvbGxvdyIsImNyZWF0ZUN1cnNvcktleXMiLCJzcGFjZSIsImFkZEtleSIsIktleWJvYXJkIiwiU1BBQ0VCQVIiLCJtZW51IiwibG9hZCIsImF0bGFzIiwiTG9hZGVyIiwiVEVYVFVSRV9BVExBU19KU09OX0hBU0giLCJiYWNrZ3JvdW5kS2V5IiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uIiwidGlsZXNldEltYWdlRXh0ZW5zaW9uIiwidGlsZWRKc29uIiwiVGlsZW1hcCIsIlRJTEVEX0pTT04iLCJkZWJ1ZyIsImFyY2FkZSIsImNvbGxpc2lvbkxheWVyIiwib3ZlcmxhcCIsInVwIiwiaXNIaXR0aW5nIiwiaXNTdHVubmVkIiwiaHVydCIsIm9uS2V5UHJlc3MiLCJpc0Rvd24iLCJzdG9wIiwianVtcCIsIlBMQVRGT1JNRVIiLCJHYW1lIiwiQVVUTyIsImJpbmQiLCJDcmVhdHVyZSIsIm9yaWdpbiIsImxheWVyTmFtZSIsInRpbGVTcHJpdGUiLCJjcmVhdGVMYXllciIsImxheWVyIiwidGlsZW1hcEtleSIsInRpbGVzZXRLZXkiLCJhZGRUaWxlc2V0SW1hZ2UiLCJzZXRDb2xsaXNpb25CZXR3ZWVuIiwiZGVhdGhMYXllciIsIkJhdCIsIkJlYXIiLCJCdWciLCJEaW5vIiwiRHJhZ29uZmx5IiwiRnJvZyIsIkdvcmlsbGEiLCJJbnNlY3QiLCJKZWxseSIsIk5hdGl2ZSIsIlBhcnJvdCIsIlB0ZXJvIiwiU3BpZGVyIiwiVGlnZXIiLCJUdXJ0bGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7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RUFDUkMsS0FEUTtBQUVyQzs7Ozs7a0JBR2FxUCxNOzs7Ozs7Ozs7Ozs7O0FDUmY7Ozs7Ozs7Ozs7OztJQUVNQyxLOzs7QUFDTCxnQkFBWTFQLElBQVosRUFBa0JDLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QkMsTUFBeEIsRUFBZ0NDLEtBQWhDLEVBQXNDO0FBQUE7O0FBQUEsdUdBQzVCSixJQUQ0QixFQUN0QkMsQ0FEc0IsRUFDbkJDLENBRG1CLEVBQ2hCQyxNQURnQixFQUNSQyxLQURRO0FBRXJDOzs7OztrQkFHYXNQLEs7Ozs7Ozs7Ozs7Ozs7QUNSZjs7Ozs7Ozs7Ozs7O0lBRU1DLE07OztBQUNMLGlCQUFZM1AsSUFBWixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCQyxNQUF4QixFQUFnQ0MsS0FBaEMsRUFBc0M7QUFBQTs7QUFBQSx5R0FDNUJKLElBRDRCLEVBQ3RCQyxDQURzQixFQUNuQkMsQ0FEbUIsRUFDaEJDLE1BRGdCLEVBQ1JDLEtBRFE7QUFFckM7Ozs7O2tCQUdhdVAsTSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDA5Y2Y3YmNhMTU5OGFkMjZhNGEiLCJpbXBvcnQgRXh0ZW5kZWRTcHJpdGUgZnJvbSAnLi9FeHRlbmRlZFNwcml0ZSc7XHJcblxyXG5jbGFzcyBBSSBleHRlbmRzIEV4dGVuZGVkU3ByaXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLmlkID0gYCR7cHJvcHMudHlwZX0tJHt4fS0ke3l9YDtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGxpZmU6IDEwLFxyXG4gICAgICAgICAgICBzdHVuOiAwLFxyXG4gICAgICAgICAgICBoaXQ6IDAsXHJcbiAgICAgICAgICAgIG5vaGl0OiAwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gICAgdHVybklmQmxvY2tlZCgpe1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS5ibG9ja2VkLmxlZnQgfHwgdGhpcy5ib2R5LmJsb2NrZWQucmlnaHQpe1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnggKj0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdHVybigpe1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCAqPSAtMTtcclxuICAgIH1cclxuICAgIHNldEJvdW5kcyhib3VuZFRvKXtcclxuICAgICAgICBpZihib3VuZFRvKXtcclxuICAgICAgICAgICAgaWYoYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneCcpICYmXHJcbiAgICAgICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd5Jykpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRUbyA9IG5ldyBQaGFzZXIuUG9pbnQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm91bmRUby55XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQFJlY3RhbmdsZSB7IHgxLCB4MiB9XHJcbiAgICAgICAgICAgIGlmKGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3gxJykgJiZcclxuICAgICAgICAgICAgICAgIGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3gyJykgJiZcclxuICAgICAgICAgICAgICAgICFib3VuZFRvLmhhc093blByb3BlcnR5KCd5MScpICYmXHJcbiAgICAgICAgICAgICAgICAhYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTInKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3VuZFRvID0gbmV3IFBoYXNlci5SZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDIgLSBib3VuZFRvLngxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8ge3gxLCB5MSwgeDIsIHkyfVxyXG4gICAgICAgICAgICBpZihib3VuZFRvLmhhc093blByb3BlcnR5KCd4MScpICYmXHJcbiAgICAgICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd4MicpICYmXHJcbiAgICAgICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd5MScpICYmXHJcbiAgICAgICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd5MicpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdW5kVG8gPSBuZXcgUGhhc2VyLlJlY3RhbmdsZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm91bmRUby54MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm91bmRUby55MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm91bmRUby54MiAtIGJvdW5kVG8ueDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueTIgLSBib3VuZFRvLnkxXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNoZWNrQm91bmRzKCl7XHJcbiAgICAgICAgaWYoIXRoaXMuYm91bmRUbyB8fCAhT2JqZWN0LmtleXModGhpcy5ib3VuZFRvKS5sZW5ndGgpe1xyXG4gICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEBQb2ludCB7eCwgeX1cclxuICAgICAgICBpZighdGhpcy5ib3VuZFRvLmhhc093blByb3BlcnR5KCd3aWR0aCcpICYmXHJcbiAgICAgICAgICAgICFQaGFzZXIuUmVjdGFuZ2xlLmNvbnRhaW5zUG9pbnQodGhpcy5nZXRCb3VuZHMoKSwgdGhpcy5ib3VuZFRvKSAmJlxyXG4gICAgICAgICAgICAoKHRoaXMueCA8IHRoaXMuYm91bmRUby54ICYmICF0aGlzLmZhY2luZ1JpZ2h0KSB8fFxyXG4gICAgICAgICAgICAodGhpcy54ID4gdGhpcy5ib3VuZFRvLnggJiYgdGhpcy5mYWNpbmdSaWdodCkpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudHVybigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQFJlY3RhbmdsZSB7eDEsIHgyfSBvciB7eDEsIHkxLCB4MiwgeTJ9XHJcbiAgICAgICAgaWYodGhpcy5ib3VuZFRvICYmXHJcbiAgICAgICAgICAgIHRoaXMuYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSAmJlxyXG4gICAgICAgICAgICAodGhpcy54IDwgdGhpcy5ib3VuZFRvLnggJiYgdGhpcy5mYWNpbmdMZWZ0IHx8XHJcbiAgICAgICAgICAgIHRoaXMueCA+IHRoaXMuYm91bmRUby54ICsgdGhpcy5ib3VuZFRvLndpZHRoICYmIHRoaXMuZmFjaW5nUmlnaHQpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudHVybigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIC8vY29uc3QgZGVidWdCb3VuZHMgPSB0aGlzLmlkKydcXG4nKyAodGhpcy5ib3VuZFRvICYmIE9iamVjdC5rZXlzKHRoaXMuYm91bmRUbykubGVuZ3RoICYmIHRoaXMuYm91bmRUby54KSArJ1xcbicrICh0aGlzLnggfCAwKTtcclxuICAgICAgICAvL3RoaXMuZGVidWcoZGVidWdCb3VuZHMpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdtb3ZlJyk7XHJcbiAgICAgICAgdGhpcy5jaGVja0JvdW5kcygpO1xyXG4gICAgICAgIC8vdGhpcy50dXJuSWZCbG9ja2VkKCk7XHJcbiAgICAgICAgdGhpcy5tb3ZlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFJO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvQUkuanMiLCJjbGFzcyBFeHRlbmRlZFNwcml0ZSBleHRlbmRzIFBoYXNlci5TcHJpdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzIHx8IHsgYW5pbWF0aW9uczogW10gfTtcclxuICAgICAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSwgMSk7XHJcbiAgICAgICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jaGVja1dvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm91dE9mQm91bmRzS2lsbCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdyYXZpdHkueSA9IHRoaXMucHJvcHMuZ3Jhdml0eTtcclxuICAgICAgICB0aGlzLl9kZWJ1Z1RleHQgPSB0aGlzLmFkZENoaWxkKFxyXG4gICAgICAgICAgICB0aGlzLmdhbWUuYWRkLnRleHQoMjAsIC0yMCwgJ2RlYnVnJywgeyBmb250OiBcIjEycHggQ291cmllclwiLCBmaWxsOiBcIiNmZmZmZmZcIiB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5fZGVidWdUZXh0LnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5hbmltYXRpb25zLmZvckVhY2goYW5pbWF0aW9uID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLmFkZChcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5uYW1lLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZyYW1lcy5tYXAoZnJhbWUgPT4gZnJhbWUudG9TdHJpbmcoKSksXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24uZnBzLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmxvb3BcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZ2FtZVN0YXRlID0gdGhpcy5nYW1lLnN0YXRlLnN0YXRlc1t0aGlzLmdhbWUuc3RhdGUuY3VycmVudF0uZ2FtZVN0YXRlO1xyXG5cclxuICAgICAgICBtb2J4Lm9ic2VydmUoZ2FtZVN0YXRlLCAoY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UnLCBjaGFuZ2UsIGdhbWVTdGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUgPSBtb2J4LmFjdGlvbigoY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuc3ByaXRlU3RhdGUsIGNoYW5nZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzSGl0dGluZygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwcml0ZVN0YXRlLmhpdCA+IHRoaXMuZ2FtZS50aW1lLm5vdztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNTdHVubmVkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlU3RhdGUuc3R1biA+IHRoaXMuZ2FtZS50aW1lLm5vdztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZmFjaW5nUmlnaHQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS54ID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZmFjaW5nTGVmdCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnggPCAwO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVMZWZ0KCl7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gLTE7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnZlbG9jaXR5LnggPiAtdGhpcy5wcm9wcy5tYXhTcGVlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC09IHRoaXMucHJvcHMuYWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlUmlnaHQoKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSAxO1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS52ZWxvY2l0eS54IDwgdGhpcy5wcm9wcy5tYXhTcGVlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ICs9IHRoaXMucHJvcHMuYWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlKCl7XHJcbiAgICAgICAgaWYodGhpcy5zY2FsZS54ID09PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlUmlnaHQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVMZWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKXtcclxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAvPSAxLjE7XHJcbiAgICB9XHJcblxyXG4gICAganVtcCgpe1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS50b3VjaGluZy5kb3duIHx8IHRoaXMuYm9keS5ibG9ja2VkLmRvd24pe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSAtPSAzMDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhpdCgpe1xyXG4gICAgICAgIGNvbnN0IGhpdFVudGlsID0gdGhpcy5nYW1lLnRpbWUubm93ICsgOTAwLFxyXG4gICAgICAgICAgICBicmVha1VudGlsID0gdGhpcy5nYW1lLnRpbWUubm93ICsgMTAwMDtcclxuICAgICAgICBjb25zb2xlLmxvZygnTm93ICVzIEhpdCAlcyBCcmVhayAlcycsIHRoaXMuZ2FtZS50aW1lLm5vdywgaGl0VW50aWwsIGJyZWFrVW50aWwpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICAgICAgICBoaXQ6IGhpdFVudGlsLFxyXG4gICAgICAgICAgICBub2hpdDogYnJlYWtVbnRpbFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGh1cnQoZGlyZWN0aW9uKXtcclxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSAtPSAxMDA7XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uICYmIGRpcmVjdGlvbi5sZWZ0KXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggLT0gMTAwIHx8IHRoaXMucHJvcHMubWF4U3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRpcmVjdGlvbiAmJiBkaXJlY3Rpb24ucmlnaHQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCArPSAxMDAgfHwgdGhpcy5wcm9wcy5tYXhTcGVlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVidWcodGV4dCl7XHJcbiAgICAgICB0aGlzLl9kZWJ1Z1RleHQudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICB0aGlzLl9kZWJ1Z1RleHQuc2NhbGUueCA9IHRoaXMuc2NhbGUueDtcclxuICAgICAgIHRoaXMuX2RlYnVnVGV4dC5zZXRUZXh0KHRleHQudG9TdHJpbmcoKSB8fCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnW1Nwcml0ZV0gc3RhdGUnKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4dGVuZGVkU3ByaXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvRXh0ZW5kZWRTcHJpdGUuanMiLCJpbXBvcnQgRXh0ZW5kZWRTcHJpdGUgZnJvbSAnLi9FeHRlbmRlZFNwcml0ZSc7XHJcblxyXG5jbGFzcyBIdW1hbiBleHRlbmRzIEV4dGVuZGVkU3ByaXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gbW9ieC5vYnNlcnZhYmxlKHtcclxuICAgICAgICAgICAgbGlmZTogMTAsXHJcbiAgICAgICAgICAgIHN0dW46IDAsXHJcbiAgICAgICAgICAgIGhpdDogMCxcclxuICAgICAgICAgICAgbm9oaXQ6IDBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSHVtYW47XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9IdW1hbi5qcyIsImltcG9ydCBjcmVhdGUgZnJvbSAnLi9tZW51LmNyZWF0ZSc7XHJcbi8vaW1wb3J0IHVwZGF0ZSBmcm9tICcuL3BsYXkudXBkYXRlJztcclxuXHJcbmNsYXNzIE1lbnUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5rZXlzID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5NZW51LnByb3RvdHlwZS5jcmVhdGUgPSBjcmVhdGU7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1lbnU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9tZW51L2luZGV4LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQUknO1xuaW1wb3J0IEh1bWFuIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSHVtYW4nO1xuXG5pbXBvcnQgbGV2ZWxMb2FkZXIgZnJvbSAnLi4vLi4vc2VydmljZXMvbGV2ZWxMb2FkZXInO1xuaW1wb3J0IGNyZWF0dXJlRmFjdG9yeSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jcmVhdHVyZUZhY3RvcnknO1xuaW1wb3J0IGNyZWF0dXJlQ29uZmlnIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY3JlYXR1cmVjb25maWcnO1xuXG5pbXBvcnQgaW5pdCBmcm9tICcuL3BsYXkuaW5pdCc7XG5pbXBvcnQgcHJlbG9hZCBmcm9tICcuL3BsYXkucHJlbG9hZCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy4vcGxheS5jcmVhdGUnO1xuaW1wb3J0IHVwZGF0ZSBmcm9tICcuL3BsYXkudXBkYXRlJztcblxyXG5jbGFzcyBQbGF5IHtcclxuICAgIGNvbnN0cnVjdG9yKGdsb2JhbENvbmZpZykge1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnBsYXllciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmVuZW15ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMubGV2ZWwgPSB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRMYXllcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBncm91bmRMYXllcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB0aWxlbWFwOiB1bmRlZmluZWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZyA9IGdsb2JhbENvbmZpZztcclxuICAgICAgICB0aGlzLmNyZWF0dXJlQ29uZmlnID0gY3JlYXR1cmVDb25maWc7XHJcbiAgICAgICAgdGhpcy5sZXZlbExvYWRlciA9IGxldmVsTG9hZGVyLmNhbGwodGhpcyk7XHJcbiAgICAgICAgdGhpcy5jcmVhdHVyZUZhY3RvcnkgPSBjcmVhdHVyZUZhY3RvcnkuY2FsbCh0aGlzKTtcclxuICAgIH1cclxufVxuXG5QbGF5LnByb3RvdHlwZS5pbml0ID0gaW5pdDtcblBsYXkucHJvdG90eXBlLnByZWxvYWQgPSBwcmVsb2FkO1xyXG5QbGF5LnByb3RvdHlwZS5jcmVhdGUgPSBjcmVhdGU7XHJcblBsYXkucHJvdG90eXBlLnVwZGF0ZSA9IHVwZGF0ZTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJjb25zdCBnbG9iYWxDb25maWcgPSB7XHJcbiAgICB3aWR0aDogNTQ2LFxyXG4gICAgaGVpZ2h0OiAzNjgsXHJcbiAgICBibG9ja3M6IDMsXHJcbiAgICBkb21FbGVtZW50OiAnZ2FtZScsXHJcbiAgICBiYWNrZ3JvdW5kUGF0aDogJ2JhY2tncm91bmRzLycsXHJcbiAgICB0aWxlc2V0UGF0aDogJ3RpbGVzZXRzLycsXHJcbiAgICBsZXZlbFBhdGg6ICdsZXZlbHMvJyxcclxuICAgIHRleHR1cmVBdGxhc1BhdGg6ICdzcHJpdGVzaGVldHMvJyxcclxuICAgIHRleHR1cmVBdGxhc05hbWU6ICdwcmUyYXRsYXMnLFxyXG4gICAgdGV4dHVyZUF0bGFzSW1hZ2U6ICdwcmUyYXRsYXMucG5nJyxcclxuICAgIHRleHR1cmVBdGxhc0pzb246ICdwcmUyYXRsYXMuanNvbidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdsb2JhbENvbmZpZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJ2YXIgY3JlYXR1cmVDb25maWdzID0ge1xyXG4gIGNyZWF0dXJlRGVmYXVsdHM6IHtcclxuICAgIGFjdGl2ZTogdHJ1ZSxcclxuICAgIGdyYXZpdHk6IDUwMCxcclxuICAgIGJvdW5jZTogMC4yLFxyXG4gICAgbWFzczogMSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiAxMDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGxpdmVzOiAxLFxyXG4gICAgbGlmZXNwYW46IEluZmluaXR5LFxyXG4gICAgc2Vuc2U6IDE1MCxcclxuICAgIGFuaW1hdGlvbnM6IFtdLFxyXG4gICAgdGltZU9mOiB7XHJcbiAgICAgICdtb3ZlJzogMjAwLFxyXG4gICAgICAnaGl0JzogMTAwLFxyXG4gICAgICAnaHVydCc6IDUwMCxcclxuICAgICAgJ3N0b3AnOiAyMDAsXHJcbiAgICAgICdpZGxlJzogMTBcclxuICAgIH0sXHJcbiAgICBib3VuZFRvIDoge30sXHJcbiAgICBjb3JyZWN0ZWRBbmNob3I6IHtcclxuICAgICAgeDogMC41LFxyXG4gICAgICB5OiAwLjVcclxuICAgIH1cclxuICB9LFxyXG4gIG1hbjoge1xyXG4gICAgdHlwZTogJ21hbicsXHJcbiAgICBtYXhTcGVlZDogMjAwLFxyXG4gICAgbGl2ZXM6IDgsXHJcbiAgICBsaWZlc3BhbjogSW5maW5pdHksXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFsxMSwnMDMnLCcwNScsMTQsMjBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdoaXQnLCBmcmFtZXM6IFsyMiwyNCwyOCwzMSwzNCwyMiwyNCwyOCwzMSwzNF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3RvcCcsIGZyYW1lczogWzQyLDQ1LDQ5LDUyXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzE2LDQxLDQ3LDUwLDUwLDUwLDUwLDUwLDUwLDUwLDUwLDEzLDUwLDEzLDUwLDEzXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI3LDI3LDI3LDI3LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDMwLDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI3LDMwLDI3LDMwLDM1LDM2LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LCcwNycsJzA3JywnMDcnLCcwNycsJzAyJywnMDInXSwgZnBzOiA1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2h1cnQnLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3R1bicsIGZyYW1lczogWzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMTEsJzAzJywnMDUnLDE0LDIwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfVxyXG4gICAgXSxcclxuICAgIGNvcnJlY3RlZEFuY2hvcjoge1xyXG4gICAgICB4OiAwLjUsXHJcbiAgICAgIHk6IDAuOFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGlubzoge1xyXG4gICAgdHlwZTogJ2Rpbm8nLFxyXG4gICAgbWFzczogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiA1LFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzYwLDM2MCwzNjAsMzYwLDM2MCwzNjAsMzYwLDM2N10sIGZwczogNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzYwLDM2MSwzNjQsMzY3LDM2OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzM2MCwzNjEsMzY0LDM2NywzNjldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2ZhbGwnLCBmcmFtZXM6IFszNjldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM3MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNjAsMzYxLDM2NCwzNjddLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGJlYXI6IHtcclxuICAgIHR5cGU6ICdiZWFyJyxcclxuICAgIG1hc3M6IDEuMixcclxuICAgIG1heFNwZWVkOiA3NSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDE1LFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzIxXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMyMCwzMjEsMzI0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM2NiwzNjMsMzU4LDMxN10sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzMyOF0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgJ3N1cGVyLWJlYXInOiB7XHJcbiAgICBhY2NlbGVyYXRpb246IDMwLFxyXG4gICAgbWF4U3BlZWQ6IDIwMCxcclxuICAgIGltYWdlOiAnc3VwZXItYmVhci1zcHJpdGUtcmVmJywgLy8gb3ZlcnJpZGUgc3ByaXRlIChjcmVhdHVyZSBuYW1lIGJ5IGRlZmF1bHQpXHJcbiAgICBhbmltYXRpb25zOiBbXVxyXG4gIH0sXHJcbiAgdGlnZXI6IHtcclxuICAgIHR5cGU6ICd0aWdlcicsXHJcbiAgICBtYXNzOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDIwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzkzLDM5NV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM5MywzOTVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszOTksNDAxXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZmFsbCcsIGZyYW1lczogWzM5OV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQwMl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszOTMsMzk1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBwdGVybzoge1xyXG4gICAgdHlwZTogJ3B0ZXJvJyxcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiAxMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFs0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3Nyw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3Nyw0NzddLCBmcHM6IDMsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzQwMyw0MDQsNDA1LDQwMyw0MDQsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDAzLDQwNCw0MDUsNDAzLDQwNCw0MDUsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2Rlc2NlbmQnLCBmcmFtZXM6IFs0MDVdLCBmcHM6IDE1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2FzY2VuZCcsIGZyYW1lczogWzQwMyw0MDQsNDA1XSwgZnBzOiAxNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0NzFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbNDA1LDQwMyw0MDRdLCBmcHM6IDE1LCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGRyYWdvbmZseToge1xyXG4gICAgdHlwZTogJ2RyYWdvbmZseScsXHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzM3LDMzOF0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMzNywzMzhdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3R1cm4nLCBmcmFtZXM6IFszMzksMzQwXSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNDJdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzM3LDMzOF0sIGZwczogMTIsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgYmF0OiB7XHJcbiAgICB0eXBlOiAnYmF0JyxcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiAyMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNTEsMzUyLDM1MSwzNTEsMzUxLDM1MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM1NywzNTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM2Ml0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNTcsMzU5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBzcGlkZXI6IHtcclxuICAgIHR5cGU6ICdzcGlkZXInLFxyXG4gICAgbWFzczogMC4zLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzM1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM2NSwzNjgsMzcwLDM3Ml0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFsyOTksMzAyLDMwNSwzMDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3R1cm4nLCBmcmFtZXM6IFszMTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2NsaW1iJywgZnJhbWVzOiBbMzQxLDM0MywzNDUsMzQ3XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICd3YWl0JywgZnJhbWVzOiBbMzMyLDMzNSwzNzJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzMyMl0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIG5hdGl2ZToge1xyXG4gICAgdHlwZTogJ25hdGl2ZScsXHJcbiAgICBtYXhTcGVlZDogMTAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyMCxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNzNdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszNzMsMzc2LDM3OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzgwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNzMsMzc2LDM3OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgcGFycm90OiB7XHJcbiAgICB0eXBlOiAncGFycm90JyxcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiAxMDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzk0LDM5NywzOThdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszOTQsMzk3LDM5OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDAwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszOTQsMzk3LDM5OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgaW5zZWN0OiB7XHJcbiAgICB0eXBlOiAnaW5zZWN0JyxcclxuICAgIG1hc3M6IDEsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDI1LFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzQ4LDM0OCwzNDgsMzQ4LDM0OCwzNDgsMzQ5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzIzLDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszMjMsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzQ4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzMyMywzNDgsMzQ5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBidWc6IHtcclxuICAgIHR5cGU6ICdidWcnLFxyXG4gICAgbWFzczogMSxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEuNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMjUsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM0NCwzNDZdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNDRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgZnJvZzoge1xyXG4gICAgdHlwZTogJ2Zyb2cnLFxyXG4gICAgbWFzczogMSxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEuNSxcclxuICAgIGp1bXBpbmc6IDUwMCxcclxuICAgIG1heFNwZWVkOiA4MCxcclxuICAgIGFjY2VsZXJhdGlvbjogNDAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszMjVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMjUsMzI3LDMzMSwzMjVdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzI1LDMyNywzMzEsMzI1XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzM0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzMyNSwzMjcsMzMxLDMyNV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHR1cnRsZToge1xyXG4gICAgdHlwZTogJ3R1cnRsZScsXHJcbiAgICBtYXNzOiAyLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDAuMyxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszOTBdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzc3LDM4MSwzODQsMzg1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzg3LDM4OSwzOTAsMzkxXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszOTJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGplbGx5OiB7XHJcbiAgICB0eXBlOiAnamVsbHknLFxyXG4gICAgbWFzczogMixcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAxLFxyXG4gICAgbWF4U3BlZWQ6IDUsXHJcbiAgICBhY2NlbGVyYXRpb246IDEsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBnb3JpbGxhOiB7XHJcbiAgICB0eXBlOiAnZ29yaWxsYScsXHJcbiAgICBtYXNzOiA1LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZmFsbCcsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH1cclxufTtcclxuXHJcbmZvcih2YXIgY3JlYXR1cmUgaW4gY3JlYXR1cmVDb25maWdzKXtcclxuICAvL2NyZWF0dXJlQ29uZmlnc1tjcmVhdHVyZV0gPSBfLm1lcmdlKHt9LCBjb25maWdzLmNyZWF0dXJlRGVmYXVsdHMsIGNvbmZpZ3NbY3JlYXR1cmVdKTtcclxuICB2YXIgZGVmYXVsdHMgPSBjcmVhdHVyZUNvbmZpZ3NbJ2NyZWF0dXJlRGVmYXVsdHMnXTtcclxuICBmb3IodmFyIHByb3AgaW4gZGVmYXVsdHMpe1xyXG4gICAgaWYoY3JlYXR1cmVDb25maWdzW2NyZWF0dXJlXVtwcm9wXSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgY3JlYXR1cmVDb25maWdzW2NyZWF0dXJlXVtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdHVyZUNvbmZpZ3M7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZWNvbmZpZy5qcyIsImZ1bmN0aW9uIGNyZWF0ZSgpe1xyXG5cclxuICAgIC8vIGZwcyBkZWJ1Z2dpbmdcclxuICAgIHRoaXMuZ2FtZS50aW1lLmFkdmFuY2VkVGltaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBDVEEgdGV4dFxyXG4gICAgY29uc3QgdGV4dCA9IHRoaXMuZ2FtZS5hZGQudGV4dChcclxuICAgICAgICB0aGlzLmdhbWUud2lkdGggLyAyLFxyXG4gICAgICAgIHRoaXMuZ2FtZS5oZWlnaHQgLyAyLFxyXG4gICAgICAgIFwiQ2hvb3NlIGEgbGV2ZWwhXFxuMSAyIDMgNCA1IDZcIixcclxuICAgICAgICB7IGZvbnQ6IFwiMjRweCBDb3VyaWVyXCIsIGZpbGw6IFwiI2ZmZmZmZlwiLCBhbGlnbjogXCJjZW50ZXJcIiB9XHJcbiAgICApO1xyXG5cclxuICAgIHRleHQuYW5jaG9yLnNldCgwLjUpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5vbkRvd25DYWxsYmFjayA9IChlKSA9PiB7XHJcbiAgICAgICAgZmV0Y2goJy9sZXZlbC8nICsgZS5rZXksIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xyXG4gICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgfSkudGhlbigobGV2ZWxDb25maWcpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdQbGF5JywgdHJ1ZSwgdHJ1ZSwgbGV2ZWxDb25maWcpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQub25Eb3duQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG5cclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtNZW51XVtDcmVhdGVdJyk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL21lbnUvbWVudS5jcmVhdGUuanMiLCJpbXBvcnQgSHVtYW4gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9IdW1hbic7XHJcbmltcG9ydCBBSSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0FJJztcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZSgpe1xyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bQ3JlYXRlXScpO1xyXG4gICAgLy8gZnBzIGRlYnVnZ2luZ1xyXG4gICAgdGhpcy5nYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xyXG5cclxuICAgIC8vIFtTRVQgTEVWRUxdIHNldCBkaW1lbnNpb25zLCBzdGFydCBwaHlzaWMgc3lzdGVtXHJcbiAgICB0aGlzLmdhbWUud29ybGQuc2V0Qm91bmRzKFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgMCxcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy53aWR0aCAqIHRoaXMuZ2xvYmFsQ29uZmlnLmJsb2NrcyxcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy5oZWlnaHRcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuXHJcbiAgICB0aGlzLmxldmVsTG9hZGVyLmNyZWF0ZUJhY2tncm91bmQoJ2JhY2tncm91bmRMYXllcicpO1xyXG4gICAgdGhpcy5sZXZlbExvYWRlci5jcmVhdGVUaWxlcyhcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLnRpbGVtYXAsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy50aWxlc2V0LFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcudGlsZXNldEltYWdlXHJcbiAgICApO1xyXG4gICAgdGhpcy5sZXZlbExvYWRlci5jcmVhdGVMYXllcnModGhpcy5sZXZlbENvbmZpZy5sYXllcnMpO1xyXG5cclxuICAgIC8vIFtTRVQgTEVWRUxdIGZpeCBiYWNrZ3JvdW5kLCByZXNpemVcclxuICAgIHRoaXMubGV2ZWwuYmFja2dyb3VuZExheWVyLmZpeGVkVG9DYW1lcmEgPSB0aGlzLmxldmVsQ29uZmlnLmZpeGVkQmFja2dyb3VuZDtcclxuICAgIHRoaXMubGV2ZWwuZ3JvdW5kTGF5ZXIucmVzaXplV29ybGQoKTtcclxuXHJcbiAgICB0aGlzLmdhbWVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgaW5pdGlhbGlzZWQ6IGZhbHNlLFxyXG4gICAgICAgIHNjb3JlOiAwXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gT2JqZWN0LmFzc2lnbih0aGlzLmdhbWVTdGF0ZSwgY2hhbmdlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1vYngub2JzZXJ2ZSh0aGlzLmdhbWVTdGF0ZSwgY2hhbmdlID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnW2dhbWVTdGF0ZV0gY2hhbmdlJywgY2hhbmdlLCB0aGlzLmdhbWVTdGF0ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHsgaW5pdGlhbGlzZWQ6IHRydWUgfSk7XHJcblxyXG4gICAgLy8gW1BMQVlFUl1cclxuICAgIHRoaXMucGxheWVyID0gbmV3IEh1bWFuKFxyXG4gICAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmVudHJ5UG9pbnQueCxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmVudHJ5UG9pbnQueSxcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy50ZXh0dXJlQXRsYXNOYW1lLFxyXG4gICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWcubWFuXHJcbiAgICApO1xyXG5cclxuICAgIC8vIFtFTkVNSUVTXVxyXG4gICAgdGhpcy5lbmVtaWVzID0gbmV3IFBoYXNlci5Hcm91cCh0aGlzLmdhbWUpO1xyXG4gICAgdGhpcy5sZXZlbENvbmZpZy5lbmVtaWVzLmZvckVhY2godGhpcy5jcmVhdHVyZUZhY3RvcnkuY3JlYXRlKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XHJcblxyXG4gICAgLy8gYmluZCBrZXlzXHJcbiAgICB0aGlzLmtleXMgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xyXG4gICAgdGhpcy5rZXlzLnNwYWNlID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpO1xyXG5cclxuICAgIC8vIHNjb3JlIHRleHRcclxuICAgIHRoaXMubWVudSA9IHRoaXMuZ2FtZS5hZGQudGV4dChcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy53aWR0aCAtIDEyMCxcclxuICAgICAgICAwLFxyXG4gICAgICAgIFwiTGlmZTogXCIgKyB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlLFxyXG4gICAgICAgIHsgZm9udDogXCIyNHB4IENvdXJpZXJcIiwgZmlsbDogXCIjZmZmXCIsIGFsaWduOiBcImNlbnRlclwiIH1cclxuICAgICk7XHJcbiAgICB0aGlzLm1lbnUuZml4ZWRUb0NhbWVyYSA9IHRydWU7XHJcbiAgICBtb2J4Lm9ic2VydmUodGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgdGhpcy5tZW51LnNldFRleHQoXCJMaWZlOiBcIiArIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuY3JlYXRlLmpzIiwiZnVuY3Rpb24gaW5pdChsZXZlbENvbmZpZyl7XHJcbiAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtJbml0XScsIGxldmVsQ29uZmlnKTtcclxuICAgIHRoaXMubGV2ZWxDb25maWcgPSBsZXZlbENvbmZpZztcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGluaXQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuaW5pdC5qcyIsImZ1bmN0aW9uIHByZWxvYWQoKXtcclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW1ByZWxvYWRdJyk7XHJcblxyXG4gICAgLy8gYXNzZXRzIHRvIGxvYWQgcmVsYXRpdmUgdG8gL2Fzc2V0cy8uLlxyXG4gICAgdGhpcy5nYW1lLmxvYWQuYXRsYXMoXHJcbiAgICAgICAgJ3ByZTJhdGxhcycsXHJcbiAgICAgICAgJ3Nwcml0ZXNoZWV0cy9wcmUyYXRsYXMucG5nJyxcclxuICAgICAgICAnc3ByaXRlc2hlZXRzL3ByZTJhdGxhcy5qc29uJyxcclxuICAgICAgICBQaGFzZXIuTG9hZGVyLlRFWFRVUkVfQVRMQVNfSlNPTl9IQVNIXHJcbiAgICApO1xyXG5cclxuICAgIC8vIGxvYWQgYmFja2dyb3VuZFxyXG4gICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UodGhpcy5sZXZlbENvbmZpZy5iYWNrZ3JvdW5kS2V5LCB0aGlzLmdsb2JhbENvbmZpZy5iYWNrZ3JvdW5kUGF0aCArIHRoaXMubGV2ZWxDb25maWcuYmFja2dyb3VuZEltYWdlICsgdGhpcy5sZXZlbENvbmZpZy5iYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb24pO1xyXG4gICAgLy8gbG9hZCB0aWxlc2V0XHJcbiAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSh0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXQsIHRoaXMuZ2xvYmFsQ29uZmlnLnRpbGVzZXRQYXRoICsgdGhpcy5sZXZlbENvbmZpZy50aWxlc2V0SW1hZ2UgKyB0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXRJbWFnZUV4dGVuc2lvbik7XHJcbiAgICAvLyBsb2FkIHRpbGVtYXBcclxuICAgIHRoaXMuZ2FtZS5sb2FkLnRpbGVtYXAodGhpcy5sZXZlbENvbmZpZy50aWxlbWFwLCB0aGlzLmdsb2JhbENvbmZpZy5sZXZlbFBhdGggKyB0aGlzLmxldmVsQ29uZmlnLnRpbGVkSnNvbiwgbnVsbCwgUGhhc2VyLlRpbGVtYXAuVElMRURfSlNPTik7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJlbG9hZDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5wcmVsb2FkLmpzIiwiZnVuY3Rpb24gdXBkYXRlKCl7XHJcbiAgICAvL2NvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW1VwZGF0ZV0nKTtcclxuICAgIC8vIGZwc1xyXG4gICAgdGhpcy5nYW1lLmRlYnVnLnRleHQodGhpcy5nYW1lLnRpbWUuZnBzLCA1LCAyMCk7XHJcblxyXG4gICAgLy8gY29sbGlkZVxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMubGV2ZWwuY29sbGlzaW9uTGF5ZXIpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMuZW5lbWllcywgdGhpcy5sZXZlbC5jb2xsaXNpb25MYXllcik7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5wbGF5ZXIsIHRoaXMuZW5lbWllcywgKHBsYXllciwgZW5lbXkpID0+IHtcclxuICAgICAgICBpZih0aGlzLnBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24gJiYgZW5lbXkuYm9keS50b3VjaGluZy51cCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMucGxheWVyLmlzSGl0dGluZyAmJiAhdGhpcy5wbGF5ZXIuaXNTdHVubmVkKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudXBkYXRlU3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgbGlmZTogdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSAtIDEsXHJcbiAgICAgICAgICAgICAgICBzdHVuOiB0aGlzLmdhbWUudGltZS5ub3cgKyAxNTAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5odXJ0KGVuZW15LmJvZHkudG91Y2hpbmcpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIG1vdmVcclxuICAgIG9uS2V5UHJlc3MuY2FsbCh0aGlzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb25LZXlQcmVzcygpe1xyXG4gICAgLy8gc3R1biA9PiBibG9ja2VkXHJcbiAgICBpZih0aGlzLnBsYXllci5pc1N0dW5uZWQpe1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnc3R1bicpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtb3ZlIGxlZnQgLyByaWdodFxyXG4gICAgaWYodGhpcy5rZXlzLmxlZnQuaXNEb3duKXtcclxuICAgICAgICB0aGlzLnBsYXllci5tb3ZlTGVmdCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnbW92ZScpO1xyXG4gICAgfSBlbHNlIGlmKHRoaXMua2V5cy5yaWdodC5pc0Rvd24pe1xyXG4gICAgICAgIHRoaXMucGxheWVyLm1vdmVSaWdodCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnbW92ZScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBsYXllci5zdG9wKCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdpZGxlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8ganVtcFxyXG4gICAgaWYodGhpcy5rZXlzLnVwLmlzRG93bil7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuanVtcCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnanVtcCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGhpdFxyXG4gICAgaWYodGhpcy5rZXlzLnNwYWNlLmlzRG93bil7XHJcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubm9oaXQgPCB0aGlzLmdhbWUudGltZS5ub3cgJiYgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUuaGl0IDwgdGhpcy5nYW1lLnRpbWUubm93KXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaGl0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnaGl0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1cGRhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkudXBkYXRlLmpzIiwiaW1wb3J0IGdsb2JhbENvbmZpZyBmcm9tICcuL2dsb2JhbENvbmZpZy5qcyc7XHJcbmltcG9ydCBNZW51IGZyb20gJy4vZ2FtZXN0YXRlcy9tZW51L2luZGV4LmpzJztcclxuaW1wb3J0IFBsYXkgZnJvbSAnLi9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMnO1xyXG5cclxuLy8gaW5zdGFudGlhdGUgYSBQaGFzZXIuR2FtZVxyXG5jb25zdCBQTEFURk9STUVSID0gbmV3IFBoYXNlci5HYW1lKFxyXG4gICAgZ2xvYmFsQ29uZmlnLndpZHRoLFxyXG4gICAgZ2xvYmFsQ29uZmlnLmhlaWdodCxcclxuICAgIFBoYXNlci5BVVRPLFxyXG4gICAgZ2xvYmFsQ29uZmlnLmRvbUVsZW1lbnRcclxuKTtcclxuXHJcbi8vIHJlZ2lzdGVyIGdhbWVzdGF0ZXMgKHdpbGwgYmUgaW5zdGFudGlhdGVkIHcvIHRoaXMuZ2FtZSBhcyAxc3QgcGFyYW0sIHBhc3MgZ2FtZUNvbmZpZyBhcyAybmQpXHJcblBMQVRGT1JNRVIuc3RhdGUuYWRkKCdNZW51JywgTWVudS5iaW5kKG51bGwsIGdsb2JhbENvbmZpZykpO1xyXG5QTEFURk9STUVSLnN0YXRlLmFkZCgnUGxheScsIFBsYXkuYmluZChudWxsLCBnbG9iYWxDb25maWcpKTtcclxuXHJcblBMQVRGT1JNRVIuc3RhdGUuc3RhcnQoJ01lbnUnLCB0cnVlLCB0cnVlKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9pbmRleC5qcyIsImltcG9ydCBiYXQgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvYmF0LmpzJztcclxuaW1wb3J0IGJlYXIgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvYmVhci5qcyc7XHJcbmltcG9ydCBidWcgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvYnVnLmpzJztcclxuaW1wb3J0IGRpbm8gZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvZGluby5qcyc7XHJcbmltcG9ydCBkcmFnb25mbHkgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvZHJhZ29uZmx5LmpzJztcclxuaW1wb3J0IGZyb2cgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvZnJvZy5qcyc7XHJcbmltcG9ydCBnb3JpbGxhIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2dvcmlsbGEuanMnO1xyXG5pbXBvcnQgaW5zZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2luc2VjdC5qcyc7XHJcbmltcG9ydCBqZWxseSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9qZWxseS5qcyc7XHJcbmltcG9ydCBuYXRpdmUgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvbmF0aXZlLmpzJztcclxuaW1wb3J0IHBhcnJvdCBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9wYXJyb3QuanMnO1xyXG5pbXBvcnQgcHRlcm8gZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvcHRlcm8uanMnO1xyXG5pbXBvcnQgc3BpZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL3NwaWRlci5qcyc7XHJcbmltcG9ydCB0aWdlciBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy90aWdlci5qcyc7XHJcbmltcG9ydCB0dXJ0bGUgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvdHVydGxlLmpzJztcclxuXHJcbmZ1bmN0aW9uIGNyZWF0dXJlRmFjdG9yeSgpIHtcclxuICAgIGNvbnN0IENyZWF0dXJlID0ge1xyXG4gICAgICAgIGJhdDogYmF0LFxyXG4gICAgICAgIGJlYXI6IGJlYXIsXHJcbiAgICAgICAgYnVnOiBidWcsXHJcbiAgICAgICAgZGlubzogZGlubyxcclxuICAgICAgICBkcmFnb25mbHk6IGRyYWdvbmZseSxcclxuICAgICAgICBmcm9nOiBmcm9nLFxyXG4gICAgICAgIGdvcmlsbGE6IGdvcmlsbGEsXHJcbiAgICAgICAgaW5zZWN0OiBpbnNlY3QsXHJcbiAgICAgICAgamVsbHk6IGplbGx5LFxyXG4gICAgICAgIG5hdGl2ZTogbmF0aXZlLFxyXG4gICAgICAgIHBhcnJvdDogcGFycm90LFxyXG4gICAgICAgIHB0ZXJvOiBwdGVybyxcclxuICAgICAgICBzcGlkZXI6IHNwaWRlcixcclxuICAgICAgICB0aWdlcjogdGlnZXIsXHJcbiAgICAgICAgdHVydGxlOiB0dXJ0bGVcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGU6IChsZXZlbENvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBlbmVteSA9IG5ldyBDcmVhdHVyZVtsZXZlbENvbmZpZy50eXBlXShcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgICAgICAgICAgIGxldmVsQ29uZmlnLm9yaWdpbi54LFxyXG4gICAgICAgICAgICAgICAgbGV2ZWxDb25maWcub3JpZ2luLnksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy50ZXh0dXJlQXRsYXNOYW1lLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdHVyZUNvbmZpZ1tsZXZlbENvbmZpZy50eXBlXVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBlbmVteS5zZXRCb3VuZHMobGV2ZWxDb25maWcuYm91bmRUbyk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5hZGQoZW5lbXkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdHVyZUZhY3Rvcnk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvY3JlYXR1cmVGYWN0b3J5LmpzIiwiZnVuY3Rpb24gbGV2ZWxMb2FkZXIoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNyZWF0ZUJhY2tncm91bmQ6IChsYXllck5hbWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC5iYWNrZ3JvdW5kTGF5ZXIgPSB0aGlzLmdhbWUuYWRkLnRpbGVTcHJpdGUoXHJcbiAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxDb25maWcud2lkdGgsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmhlaWdodCxcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxDb25maWcuYmFja2dyb3VuZEtleVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlTGF5ZXI6IChsYXllcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsW2xheWVyXSA9IHRoaXMubGV2ZWwudGlsZW1hcC5jcmVhdGVMYXllcih0aGlzLmxldmVsQ29uZmlnW2xheWVyXSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGVMYXllcnM6IChsYXllcnMpID0+IHtcclxuICAgICAgICAgICAgZm9yKGxldCBsYXllciBpbiBsYXllcnMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbFtsYXllcl0gPSB0aGlzLmxldmVsLnRpbGVtYXAuY3JlYXRlTGF5ZXIodGhpcy5sZXZlbENvbmZpZy5sYXllcnNbbGF5ZXJdLmtleSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsW2xheWVyXS52aXNpYmxlID0gdGhpcy5sZXZlbENvbmZpZy5sYXllcnNbbGF5ZXJdLnZpc2libGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZVRpbGVzOiAodGlsZW1hcEtleSwgdGlsZXNldEtleSwgdGlsZXNldEltYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcCA9IHRoaXMuZ2FtZS5hZGQudGlsZW1hcCh0aWxlbWFwS2V5KTtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC50aWxlbWFwLmFkZFRpbGVzZXRJbWFnZSh0aWxlc2V0SW1hZ2UsIHRpbGVzZXRLZXkpO1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLnRpbGVtYXAuc2V0Q29sbGlzaW9uQmV0d2VlbigwLCAzMDAwLCB0cnVlLCB0aGlzLmxldmVsQ29uZmlnLmxheWVycy5jb2xsaXNpb25MYXllci5rZXkpO1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLnRpbGVtYXAuc2V0Q29sbGlzaW9uQmV0d2VlbigwLCAzMDAwLCB0cnVlLCB0aGlzLmxldmVsQ29uZmlnLmxheWVycy5kZWF0aExheWVyLmtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxldmVsTG9hZGVyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsTG9hZGVyLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEJhdCBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9iYXQuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgQmVhciBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJlYXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmVhci5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBCdWcgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYnVnLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIERpbm8gZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEaW5vO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Rpbm8uanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgRHJhZ29uZmx5IGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRHJhZ29uZmx5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2RyYWdvbmZseS5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBGcm9nIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRnJvZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9mcm9nLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEdvcmlsbGEgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHb3JpbGxhO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2dvcmlsbGEuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgSW5zZWN0IGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5zZWN0O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2luc2VjdC5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBKZWxseSBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEplbGx5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2plbGx5LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIE5hdGl2ZSBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5hdGl2ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9uYXRpdmUuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgUGFycm90IGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFycm90O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3BhcnJvdC5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBQdGVybyBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFB0ZXJvO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3B0ZXJvLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIFNwaWRlciBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNwaWRlcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9zcGlkZXIuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgVGlnZXIgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUaWdlcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy90aWdlci5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBUdXJ0bGUgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUdXJ0bGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvdHVydGxlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==