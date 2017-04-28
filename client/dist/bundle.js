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

    function AI(game, x, y, sprite, props, behaviours) {
        _classCallCheck(this, AI);

        var _this = _possibleConstructorReturn(this, (AI.__proto__ || Object.getPrototypeOf(AI)).call(this, game, x, y, sprite, props));

        _this.id = props.type + '-' + x + '-' + y;

        _this.behaviours = behaviours;

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
        key: 'when',
        value: function when(params) {
            if (Math.random() < params.probability) {
                this[params.action] && this[params.action].call(this);
            }
        }
    }, {
        key: 'update',
        value: function update() {
            var _this2 = this;

            //const debugBounds = this.id+'\n'+ (this.boundTo && Object.keys(this.boundTo).length && this.boundTo.x) +'\n'+ (this.x | 0);
            //this.debug(debugBounds);
            this.animations.play('move');
            this.behaviours.forEach(function (behaviour) {
                _this2[behaviour.action] && _this2[behaviour.action].call(_this2, behaviour.params);
            });
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
    behaviours: [{ action: 'turnIfBlocked' }, { action: 'move' }, { action: 'checkBounds' }]
  },
  man: {
    type: 'man',
    maxSpeed: 200,
    lives: 8,
    lifespan: Infinity,
    animations: [{ name: 'move', frames: [11, '03', '05', 14, 20], fps: 10, loop: false }, { name: 'hit', frames: [22, 24, 28, 31, 34, 22, 24, 28, 31, 34], fps: 10, loop: true }, { name: 'stop', frames: [42, 45, 49, 52], fps: 10, loop: false }, { name: 'jump', frames: [16, 41, 47, 50, 50, 50, 50, 50, 50, 50, 50, 13, 50, 13, 50, 13], fps: 10, loop: false }, { name: 'idle', frames: [25, 25, 25, 25, 25, 25, 25, 25, 27, 27, 27, 27, 25, 25, 25, 25, 25, 25, 25, 25, 30, 25, 25, 25, 25, 25, 25, 25, 25, 27, 30, 27, 30, 35, 36, 25, 25, 25, 25, 25, 25, 25, 25, '07', '07', '07', '07', '02', '02'], fps: 5, loop: true }, { name: 'hurt', frames: [19], fps: 10, loop: true }, { name: 'stun', frames: [19], fps: 10, loop: true }, { name: 'die', frames: [19], fps: 10, loop: false }, { name: 'spawn', frames: [11, '03', '05', 14, 20], fps: 10, loop: false }]
  },
  dino: {
    type: 'dino',
    mass: 1.5,
    jumping: 300,
    maxSpeed: 50,
    acceleration: 5,
    behaviours: [{ action: 'turnIfBlocked' }, { action: 'move' }, { action: 'checkBounds' }, { action: 'when', params: { probability: 0.01, action: 'jump' } }],
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

var _AI = __webpack_require__(0);

var _AI2 = _interopRequireDefault(_AI);

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
            var enemy = new _AI2.default(_this.game, levelConfig.origin.x, levelConfig.origin.y, _this.globalConfig.textureAtlasName, _this.creatureConfig[levelConfig.type], _this.creatureConfig[levelConfig.type].behaviours);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmFiNmJlYTQ1MTRkZjg1OGU4ODIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL21lbnUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9tZW51L21lbnUuY3JlYXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuY3JlYXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnByZWxvYWQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS51cGRhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2NyZWF0dXJlRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsTG9hZGVyLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmF0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmVhci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Rpbm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9kcmFnb25mbHkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9mcm9nLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZ29yaWxsYS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2luc2VjdC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2plbGx5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvbmF0aXZlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcGFycm90LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcHRlcm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9zcGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy90aWdlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyJdLCJuYW1lcyI6WyJBSSIsImdhbWUiLCJ4IiwieSIsInNwcml0ZSIsInByb3BzIiwiYmVoYXZpb3VycyIsImlkIiwidHlwZSIsInNwcml0ZVN0YXRlIiwibW9ieCIsIm9ic2VydmFibGUiLCJsaWZlIiwic3R1biIsImhpdCIsIm5vaGl0IiwiYm9keSIsImJsb2NrZWQiLCJsZWZ0IiwicmlnaHQiLCJzY2FsZSIsImJvdW5kVG8iLCJoYXNPd25Qcm9wZXJ0eSIsIlBoYXNlciIsIlBvaW50IiwiUmVjdGFuZ2xlIiwieDEiLCJ4MiIsImhlaWdodCIsInkxIiwieTIiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiY29udGFpbnNQb2ludCIsImdldEJvdW5kcyIsImZhY2luZ1JpZ2h0IiwidHVybiIsImZhY2luZ0xlZnQiLCJ3aWR0aCIsInBhcmFtcyIsIk1hdGgiLCJyYW5kb20iLCJwcm9iYWJpbGl0eSIsImFjdGlvbiIsImNhbGwiLCJhbmltYXRpb25zIiwicGxheSIsImZvckVhY2giLCJiZWhhdmlvdXIiLCJFeHRlbmRlZFNwcml0ZSIsImFkZCIsImV4aXN0aW5nIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoeXNpY3MiLCJBUkNBREUiLCJhbmNob3IiLCJzZXRUbyIsImNvbGxpZGVXb3JsZEJvdW5kcyIsImNoZWNrV29ybGRCb3VuZHMiLCJvdXRPZkJvdW5kc0tpbGwiLCJncmF2aXR5IiwiX2RlYnVnVGV4dCIsImFkZENoaWxkIiwidGV4dCIsImZvbnQiLCJmaWxsIiwidmlzaWJsZSIsImFuaW1hdGlvbiIsIm5hbWUiLCJmcmFtZXMiLCJtYXAiLCJmcmFtZSIsInRvU3RyaW5nIiwiZnBzIiwibG9vcCIsImdhbWVTdGF0ZSIsInN0YXRlIiwic3RhdGVzIiwiY3VycmVudCIsIm9ic2VydmUiLCJjaGFuZ2UiLCJjb25zb2xlIiwibG9nIiwidXBkYXRlU3RhdGUiLCJhc3NpZ24iLCJ2ZWxvY2l0eSIsIm1heFNwZWVkIiwiYWNjZWxlcmF0aW9uIiwibW92ZVJpZ2h0IiwibW92ZUxlZnQiLCJ0b3VjaGluZyIsImRvd24iLCJoaXRVbnRpbCIsInRpbWUiLCJub3ciLCJicmVha1VudGlsIiwiZGlyZWN0aW9uIiwic2V0VGV4dCIsIlNwcml0ZSIsIkh1bWFuIiwiTWVudSIsInVuZGVmaW5lZCIsInByb3RvdHlwZSIsImNyZWF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJQbGF5IiwiZ2xvYmFsQ29uZmlnIiwicGxheWVyIiwiZW5lbXkiLCJsZXZlbCIsImJhY2tncm91bmRMYXllciIsImdyb3VuZExheWVyIiwidGlsZW1hcCIsImNyZWF0dXJlQ29uZmlnIiwibGV2ZWxMb2FkZXIiLCJjcmVhdHVyZUZhY3RvcnkiLCJpbml0IiwicHJlbG9hZCIsInVwZGF0ZSIsImJsb2NrcyIsImRvbUVsZW1lbnQiLCJiYWNrZ3JvdW5kUGF0aCIsInRpbGVzZXRQYXRoIiwibGV2ZWxQYXRoIiwidGV4dHVyZUF0bGFzUGF0aCIsInRleHR1cmVBdGxhc05hbWUiLCJ0ZXh0dXJlQXRsYXNJbWFnZSIsInRleHR1cmVBdGxhc0pzb24iLCJjcmVhdHVyZUNvbmZpZ3MiLCJjcmVhdHVyZURlZmF1bHRzIiwiYWN0aXZlIiwiYm91bmNlIiwibWFzcyIsImp1bXBpbmciLCJjb2xsaWRlIiwibGl2ZXMiLCJsaWZlc3BhbiIsIkluZmluaXR5Iiwic2Vuc2UiLCJ0aW1lT2YiLCJtYW4iLCJkaW5vIiwiYmVhciIsImltYWdlIiwidGlnZXIiLCJwdGVybyIsImRyYWdvbmZseSIsImJhdCIsInNwaWRlciIsIm5hdGl2ZSIsInBhcnJvdCIsImluc2VjdCIsImJ1ZyIsImZyb2ciLCJ0dXJ0bGUiLCJqZWxseSIsImdvcmlsbGEiLCJjcmVhdHVyZSIsImRlZmF1bHRzIiwicHJvcCIsImFkdmFuY2VkVGltaW5nIiwiYWxpZ24iLCJzZXQiLCJpbnB1dCIsImtleWJvYXJkIiwib25Eb3duQ2FsbGJhY2siLCJlIiwiZmV0Y2giLCJrZXkiLCJtZXRob2QiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwibGV2ZWxDb25maWciLCJzdGFydCIsIndvcmxkIiwic2V0Qm91bmRzIiwic3RhcnRTeXN0ZW0iLCJjcmVhdGVCYWNrZ3JvdW5kIiwiY3JlYXRlVGlsZXMiLCJ0aWxlc2V0IiwidGlsZXNldEltYWdlIiwiY3JlYXRlTGF5ZXJzIiwibGF5ZXJzIiwiZml4ZWRUb0NhbWVyYSIsImZpeGVkQmFja2dyb3VuZCIsInJlc2l6ZVdvcmxkIiwiaW5pdGlhbGlzZWQiLCJzY29yZSIsImVudHJ5UG9pbnQiLCJlbmVtaWVzIiwiR3JvdXAiLCJjYW1lcmEiLCJmb2xsb3ciLCJjcmVhdGVDdXJzb3JLZXlzIiwic3BhY2UiLCJhZGRLZXkiLCJLZXlib2FyZCIsIlNQQUNFQkFSIiwibWVudSIsImxvYWQiLCJhdGxhcyIsIkxvYWRlciIsIlRFWFRVUkVfQVRMQVNfSlNPTl9IQVNIIiwiYmFja2dyb3VuZEtleSIsImJhY2tncm91bmRJbWFnZSIsImJhY2tncm91bmRJbWFnZUV4dGVuc2lvbiIsInRpbGVzZXRJbWFnZUV4dGVuc2lvbiIsInRpbGVkSnNvbiIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwiZGVidWciLCJhcmNhZGUiLCJjb2xsaXNpb25MYXllciIsIm92ZXJsYXAiLCJ1cCIsImlzSGl0dGluZyIsImlzU3R1bm5lZCIsImh1cnQiLCJvbktleVByZXNzIiwiaXNEb3duIiwic3RvcCIsImp1bXAiLCJQTEFURk9STUVSIiwiR2FtZSIsIkFVVE8iLCJiaW5kIiwiQ3JlYXR1cmUiLCJvcmlnaW4iLCJsYXllck5hbWUiLCJ0aWxlU3ByaXRlIiwiY3JlYXRlTGF5ZXIiLCJsYXllciIsInRpbGVtYXBLZXkiLCJ0aWxlc2V0S2V5IiwiYWRkVGlsZXNldEltYWdlIiwic2V0Q29sbGlzaW9uQmV0d2VlbiIsImRlYXRoTGF5ZXIiLCJCYXQiLCJCZWFyIiwiQnVnIiwiRGlubyIsIkRyYWdvbmZseSIsIkZyb2ciLCJHb3JpbGxhIiwiSW5zZWN0IiwiSmVsbHkiLCJOYXRpdmUiLCJQYXJyb3QiLCJQdGVybyIsIlNwaWRlciIsIlRpZ2VyIiwiVHVydGxlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQTs7Ozs7Ozs7Ozs7O0lBRU1BLEU7OztBQUNGLGdCQUFZQyxJQUFaLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLE1BQXhCLEVBQWdDQyxLQUFoQyxFQUF1Q0MsVUFBdkMsRUFBa0Q7QUFBQTs7QUFBQSw0R0FDeENMLElBRHdDLEVBQ2xDQyxDQURrQyxFQUMvQkMsQ0FEK0IsRUFDNUJDLE1BRDRCLEVBQ3BCQyxLQURvQjs7QUFHOUMsY0FBS0UsRUFBTCxHQUFhRixNQUFNRyxJQUFuQixTQUEyQk4sQ0FBM0IsU0FBZ0NDLENBQWhDOztBQUVBLGNBQUtHLFVBQUwsR0FBa0JBLFVBQWxCOztBQUVBLGNBQUtHLFdBQUwsR0FBbUJDLEtBQUtDLFVBQUwsQ0FBZ0I7QUFDL0JDLGtCQUFNLEVBRHlCO0FBRS9CQyxrQkFBTSxDQUZ5QjtBQUcvQkMsaUJBQUssQ0FIMEI7QUFJL0JDLG1CQUFPO0FBSndCLFNBQWhCLENBQW5COztBQVA4QztBQWNqRDs7Ozt3Q0FDYztBQUNYLGdCQUFHLEtBQUtDLElBQUwsQ0FBVUMsT0FBVixDQUFrQkMsSUFBbEIsSUFBMEIsS0FBS0YsSUFBTCxDQUFVQyxPQUFWLENBQWtCRSxLQUEvQyxFQUFxRDtBQUNqRCxxQkFBS0MsS0FBTCxDQUFXbEIsQ0FBWCxJQUFnQixDQUFDLENBQWpCO0FBQ0g7QUFDSjs7OytCQUNLO0FBQ0YsaUJBQUtrQixLQUFMLENBQVdsQixDQUFYLElBQWdCLENBQUMsQ0FBakI7QUFDSDs7O2tDQUNTbUIsTyxFQUFRO0FBQ2QsZ0JBQUdBLE9BQUgsRUFBVztBQUNQLG9CQUFHQSxRQUFRQyxjQUFSLENBQXVCLEdBQXZCLEtBQ0NELFFBQVFDLGNBQVIsQ0FBdUIsR0FBdkIsQ0FESixFQUNnQztBQUN4Qix5QkFBS0QsT0FBTCxHQUFlLElBQUlFLE9BQU9DLEtBQVgsQ0FDWEgsUUFBUW5CLENBREcsRUFFWG1CLFFBQVFsQixDQUZHLENBQWY7QUFJUDs7QUFFRDtBQUNBLG9CQUFHa0IsUUFBUUMsY0FBUixDQUF1QixJQUF2QixLQUNDRCxRQUFRQyxjQUFSLENBQXVCLElBQXZCLENBREQsSUFFQyxDQUFDRCxRQUFRQyxjQUFSLENBQXVCLElBQXZCLENBRkYsSUFHQyxDQUFDRCxRQUFRQyxjQUFSLENBQXVCLElBQXZCLENBSEwsRUFHa0M7QUFDMUIseUJBQUtELE9BQUwsR0FBZSxJQUFJRSxPQUFPRSxTQUFYLENBQ1hKLFFBQVFLLEVBREcsRUFFWCxDQUZXLEVBR1hMLFFBQVFNLEVBQVIsR0FBYU4sUUFBUUssRUFIVixFQUlYLEtBQUt6QixJQUFMLENBQVUyQixNQUpDLENBQWY7QUFNUDs7QUFFRDtBQUNBLG9CQUFHUCxRQUFRQyxjQUFSLENBQXVCLElBQXZCLEtBQ0NELFFBQVFDLGNBQVIsQ0FBdUIsSUFBdkIsQ0FERCxJQUVDRCxRQUFRQyxjQUFSLENBQXVCLElBQXZCLENBRkQsSUFHQ0QsUUFBUUMsY0FBUixDQUF1QixJQUF2QixDQUhKLEVBR2lDO0FBQ3pCLHlCQUFLRCxPQUFMLEdBQWUsSUFBSUUsT0FBT0UsU0FBWCxDQUNYSixRQUFRSyxFQURHLEVBRVhMLFFBQVFRLEVBRkcsRUFHWFIsUUFBUU0sRUFBUixHQUFhTixRQUFRSyxFQUhWLEVBSVhMLFFBQVFTLEVBQVIsR0FBYVQsUUFBUVEsRUFKVixDQUFmO0FBTVA7QUFDSjtBQUNKOzs7c0NBQ1k7QUFDVCxnQkFBRyxDQUFDLEtBQUtSLE9BQU4sSUFBaUIsQ0FBQ1UsT0FBT0MsSUFBUCxDQUFZLEtBQUtYLE9BQWpCLEVBQTBCWSxNQUEvQyxFQUFzRDtBQUNuRDtBQUNGOztBQUVEO0FBQ0EsZ0JBQUcsQ0FBQyxLQUFLWixPQUFMLENBQWFDLGNBQWIsQ0FBNEIsT0FBNUIsQ0FBRCxJQUNDLENBQUNDLE9BQU9FLFNBQVAsQ0FBaUJTLGFBQWpCLENBQStCLEtBQUtDLFNBQUwsRUFBL0IsRUFBaUQsS0FBS2QsT0FBdEQsQ0FERixLQUVHLEtBQUtuQixDQUFMLEdBQVMsS0FBS21CLE9BQUwsQ0FBYW5CLENBQXRCLElBQTJCLENBQUMsS0FBS2tDLFdBQWxDLElBQ0EsS0FBS2xDLENBQUwsR0FBUyxLQUFLbUIsT0FBTCxDQUFhbkIsQ0FBdEIsSUFBMkIsS0FBS2tDLFdBSGxDLENBQUgsRUFHbUQ7QUFDM0MscUJBQUtDLElBQUw7QUFDUDs7QUFFRDtBQUNBLGdCQUFHLEtBQUtoQixPQUFMLElBQ0MsS0FBS0EsT0FBTCxDQUFhQyxjQUFiLENBQTRCLE9BQTVCLENBREQsS0FFRSxLQUFLcEIsQ0FBTCxHQUFTLEtBQUttQixPQUFMLENBQWFuQixDQUF0QixJQUEyQixLQUFLb0MsVUFBaEMsSUFDRCxLQUFLcEMsQ0FBTCxHQUFTLEtBQUttQixPQUFMLENBQWFuQixDQUFiLEdBQWlCLEtBQUttQixPQUFMLENBQWFrQixLQUF2QyxJQUFnRCxLQUFLSCxXQUh0RCxDQUFILEVBR3NFO0FBQzlELHFCQUFLQyxJQUFMO0FBQ1A7QUFDSjs7OzZCQUNJRyxNLEVBQVE7QUFDZixnQkFBR0MsS0FBS0MsTUFBTCxLQUFnQkYsT0FBT0csV0FBMUIsRUFBc0M7QUFDckMscUJBQUtILE9BQU9JLE1BQVosS0FBdUIsS0FBS0osT0FBT0ksTUFBWixFQUFvQkMsSUFBcEIsQ0FBeUIsSUFBekIsQ0FBdkI7QUFDQTtBQUNEOzs7aUNBQ1U7QUFBQTs7QUFDSjtBQUNBO0FBQ0EsaUJBQUtDLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLE1BQXJCO0FBQ0EsaUJBQUt6QyxVQUFMLENBQWdCMEMsT0FBaEIsQ0FBd0IsVUFBQ0MsU0FBRCxFQUFlO0FBQ25DLHVCQUFLQSxVQUFVTCxNQUFmLEtBQTBCLE9BQUtLLFVBQVVMLE1BQWYsRUFBdUJDLElBQXZCLFNBQWtDSSxVQUFVVCxNQUE1QyxDQUExQjtBQUNILGFBRkQ7QUFHSDs7Ozs7O2tCQUdVeEMsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDbkdUa0QsYzs7O0FBQ0YsNEJBQVlqRCxJQUFaLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLE1BQXhCLEVBQWdDQyxLQUFoQyxFQUFzQztBQUFBOztBQUFBLG9JQUM1QkosSUFENEIsRUFDdEJDLENBRHNCLEVBQ25CQyxDQURtQixFQUNoQkMsTUFEZ0I7O0FBRWxDLGNBQUtILElBQUwsR0FBWUEsSUFBWjtBQUNBLGNBQUtJLEtBQUwsR0FBYUEsU0FBUyxFQUFFeUMsWUFBWSxFQUFkLEVBQXRCO0FBQ0EsY0FBSzdDLElBQUwsQ0FBVWtELEdBQVYsQ0FBY0MsUUFBZDtBQUNBLGNBQUtuRCxJQUFMLENBQVVvRCxPQUFWLENBQWtCQyxNQUFsQixRQUErQi9CLE9BQU9nQyxPQUFQLENBQWVDLE1BQTlDO0FBQ0EsY0FBS0MsTUFBTCxDQUFZQyxLQUFaLENBQWtCLEdBQWxCLEVBQXVCLENBQXZCO0FBQ0EsY0FBSzFDLElBQUwsQ0FBVTJDLGtCQUFWLEdBQStCLElBQS9CO0FBQ0EsY0FBS0MsZ0JBQUwsR0FBd0IsSUFBeEI7QUFDQSxjQUFLQyxlQUFMLEdBQXVCLElBQXZCO0FBQ0EsY0FBSzdDLElBQUwsQ0FBVThDLE9BQVYsQ0FBa0IzRCxDQUFsQixHQUFzQixNQUFLRSxLQUFMLENBQVd5RCxPQUFqQztBQUNBLGNBQUtDLFVBQUwsR0FBa0IsTUFBS0MsUUFBTCxDQUNkLE1BQUsvRCxJQUFMLENBQVVrRCxHQUFWLENBQWNjLElBQWQsQ0FBbUIsRUFBbkIsRUFBdUIsQ0FBQyxFQUF4QixFQUE0QixPQUE1QixFQUFxQyxFQUFFQyxNQUFNLGNBQVIsRUFBd0JDLE1BQU0sU0FBOUIsRUFBckMsQ0FEYyxDQUFsQjtBQUdBLGNBQUtKLFVBQUwsQ0FBZ0JLLE9BQWhCLEdBQTBCLEtBQTFCOztBQUVBLGNBQUsvRCxLQUFMLENBQVd5QyxVQUFYLENBQXNCRSxPQUF0QixDQUE4QixxQkFBYTtBQUN2QyxrQkFBS0YsVUFBTCxDQUFnQkssR0FBaEIsQ0FDSWtCLFVBQVVDLElBRGQsRUFFSUQsVUFBVUUsTUFBVixDQUFpQkMsR0FBakIsQ0FBcUI7QUFBQSx1QkFBU0MsTUFBTUMsUUFBTixFQUFUO0FBQUEsYUFBckIsQ0FGSixFQUdJTCxVQUFVTSxHQUhkLEVBSUlOLFVBQVVPLElBSmQ7QUFNSCxTQVBEOztBQVNBLFlBQU1DLFlBQVksTUFBSzVFLElBQUwsQ0FBVTZFLEtBQVYsQ0FBZ0JDLE1BQWhCLENBQXVCLE1BQUs5RSxJQUFMLENBQVU2RSxLQUFWLENBQWdCRSxPQUF2QyxFQUFnREgsU0FBbEU7O0FBRUFuRSxhQUFLdUUsT0FBTCxDQUFhSixTQUFiLEVBQXdCLFVBQUNLLE1BQUQsRUFBWTtBQUNoQ0Msb0JBQVFDLEdBQVIsQ0FBWSxRQUFaLEVBQXNCRixNQUF0QixFQUE4QkwsU0FBOUI7QUFDSCxTQUZEOztBQUlBLGNBQUtRLFdBQUwsR0FBbUIzRSxLQUFLa0MsTUFBTCxDQUFZLFVBQUNzQyxNQUFELEVBQVk7QUFDdkMsa0JBQUt6RSxXQUFMLEdBQW1Cc0IsT0FBT3VELE1BQVAsQ0FBYyxNQUFLN0UsV0FBbkIsRUFBZ0N5RSxNQUFoQyxDQUFuQjtBQUNILFNBRmtCLENBQW5CO0FBL0JrQztBQWtDckM7Ozs7bUNBa0JTO0FBQ04saUJBQUs5RCxLQUFMLENBQVdsQixDQUFYLEdBQWUsQ0FBQyxDQUFoQjtBQUNBLGdCQUFHLEtBQUtjLElBQUwsQ0FBVXVFLFFBQVYsQ0FBbUJyRixDQUFuQixHQUF1QixDQUFDLEtBQUtHLEtBQUwsQ0FBV21GLFFBQXRDLEVBQStDO0FBQzNDLHFCQUFLeEUsSUFBTCxDQUFVdUUsUUFBVixDQUFtQnJGLENBQW5CLElBQXdCLEtBQUtHLEtBQUwsQ0FBV29GLFlBQW5DO0FBQ0g7QUFDSjs7O29DQUVVO0FBQ1AsaUJBQUtyRSxLQUFMLENBQVdsQixDQUFYLEdBQWUsQ0FBZjtBQUNBLGdCQUFHLEtBQUtjLElBQUwsQ0FBVXVFLFFBQVYsQ0FBbUJyRixDQUFuQixHQUF1QixLQUFLRyxLQUFMLENBQVdtRixRQUFyQyxFQUE4QztBQUMxQyxxQkFBS3hFLElBQUwsQ0FBVXVFLFFBQVYsQ0FBbUJyRixDQUFuQixJQUF3QixLQUFLRyxLQUFMLENBQVdvRixZQUFuQztBQUNIO0FBQ0o7OzsrQkFFSztBQUNGLGdCQUFHLEtBQUtyRSxLQUFMLENBQVdsQixDQUFYLEtBQWlCLENBQXBCLEVBQXNCO0FBQ2xCLHFCQUFLd0YsU0FBTDtBQUNILGFBRkQsTUFFTztBQUNILHFCQUFLQyxRQUFMO0FBQ0g7QUFDSjs7OytCQUVLO0FBQ0YsaUJBQUszRSxJQUFMLENBQVV1RSxRQUFWLENBQW1CckYsQ0FBbkIsSUFBd0IsR0FBeEI7QUFDSDs7OytCQUVLO0FBQ0YsZ0JBQUcsS0FBS2MsSUFBTCxDQUFVNEUsUUFBVixDQUFtQkMsSUFBbkIsSUFBMkIsS0FBSzdFLElBQUwsQ0FBVUMsT0FBVixDQUFrQjRFLElBQWhELEVBQXFEO0FBQ2pELHFCQUFLN0UsSUFBTCxDQUFVdUUsUUFBVixDQUFtQnBGLENBQW5CLElBQXdCLEdBQXhCO0FBQ0g7QUFDSjs7OzhCQUVJO0FBQ0QsZ0JBQU0yRixXQUFXLEtBQUs3RixJQUFMLENBQVU4RixJQUFWLENBQWVDLEdBQWYsR0FBcUIsR0FBdEM7QUFBQSxnQkFDSUMsYUFBYSxLQUFLaEcsSUFBTCxDQUFVOEYsSUFBVixDQUFlQyxHQUFmLEdBQXFCLElBRHRDO0FBRUFiLG9CQUFRQyxHQUFSLENBQVksd0JBQVosRUFBc0MsS0FBS25GLElBQUwsQ0FBVThGLElBQVYsQ0FBZUMsR0FBckQsRUFBMERGLFFBQTFELEVBQW9FRyxVQUFwRTtBQUNBLGlCQUFLWixXQUFMLENBQWlCO0FBQ2J2RSxxQkFBS2dGLFFBRFE7QUFFYi9FLHVCQUFPa0Y7QUFGTSxhQUFqQjtBQUlIOzs7NkJBRUlDLFMsRUFBVTtBQUNYLGlCQUFLbEYsSUFBTCxDQUFVdUUsUUFBVixDQUFtQnBGLENBQW5CLElBQXdCLEdBQXhCO0FBQ0EsZ0JBQUcrRixhQUFhQSxVQUFVaEYsSUFBMUIsRUFBK0I7QUFDM0IscUJBQUtGLElBQUwsQ0FBVXVFLFFBQVYsQ0FBbUJyRixDQUFuQixJQUF3QixPQUFPLEtBQUtHLEtBQUwsQ0FBV21GLFFBQTFDO0FBQ0g7QUFDRCxnQkFBR1UsYUFBYUEsVUFBVS9FLEtBQTFCLEVBQWdDO0FBQzVCLHFCQUFLSCxJQUFMLENBQVV1RSxRQUFWLENBQW1CckYsQ0FBbkIsSUFBd0IsT0FBTyxLQUFLRyxLQUFMLENBQVdtRixRQUExQztBQUNIO0FBQ0o7Ozs4QkFFS3ZCLEksRUFBSztBQUNSLGlCQUFLRixVQUFMLENBQWdCSyxPQUFoQixHQUEwQixJQUExQjtBQUNBLGlCQUFLTCxVQUFMLENBQWdCM0MsS0FBaEIsQ0FBc0JsQixDQUF0QixHQUEwQixLQUFLa0IsS0FBTCxDQUFXbEIsQ0FBckM7QUFDQSxpQkFBSzZELFVBQUwsQ0FBZ0JvQyxPQUFoQixDQUF3QmxDLEtBQUtTLFFBQUwsTUFBbUIsRUFBM0M7QUFDRjs7O2lDQUVPO0FBQ0o7QUFDSDs7OzRCQTVFYztBQUNYLG1CQUFPLEtBQUtqRSxXQUFMLENBQWlCSyxHQUFqQixHQUF1QixLQUFLYixJQUFMLENBQVU4RixJQUFWLENBQWVDLEdBQTdDO0FBQ0g7Ozs0QkFFYztBQUNYLG1CQUFPLEtBQUt2RixXQUFMLENBQWlCSSxJQUFqQixHQUF3QixLQUFLWixJQUFMLENBQVU4RixJQUFWLENBQWVDLEdBQTlDO0FBQ0g7Ozs0QkFFZ0I7QUFDYixtQkFBTyxLQUFLNUUsS0FBTCxDQUFXbEIsQ0FBWCxHQUFlLENBQXRCO0FBQ0g7Ozs0QkFFZTtBQUNaLG1CQUFPLEtBQUtrQixLQUFMLENBQVdsQixDQUFYLEdBQWUsQ0FBdEI7QUFDSDs7OztFQW5Ed0JxQixPQUFPNkUsTTs7QUFrSG5DOztrQkFFY2xELGM7Ozs7Ozs7Ozs7Ozs7QUNwSGY7Ozs7Ozs7Ozs7OztJQUVNbUQsSzs7O0FBQ0YsbUJBQVlwRyxJQUFaLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLE1BQXhCLEVBQWdDQyxLQUFoQyxFQUFzQztBQUFBOztBQUFBLGtIQUM1QkosSUFENEIsRUFDdEJDLENBRHNCLEVBQ25CQyxDQURtQixFQUNoQkMsTUFEZ0IsRUFDUkMsS0FEUTs7QUFHbEMsY0FBS0ksV0FBTCxHQUFtQkMsS0FBS0MsVUFBTCxDQUFnQjtBQUMvQkMsa0JBQU0sRUFEeUI7QUFFL0JDLGtCQUFNLENBRnlCO0FBRy9CQyxpQkFBSyxDQUgwQjtBQUkvQkMsbUJBQU87QUFKd0IsU0FBaEIsQ0FBbkI7QUFIa0M7QUFTckM7Ozs7O2tCQUdVc0YsSzs7Ozs7Ozs7O0FDZmY7Ozs7Ozs7O0FBQ0E7O0lBRU1DLEksR0FDRixnQkFBYztBQUFBOztBQUNWLFNBQUt0RSxJQUFMLEdBQVl1RSxTQUFaO0FBQ0gsQzs7QUFHTEQsS0FBS0UsU0FBTCxDQUFlQyxNQUFmOztBQUVBQyxPQUFPQyxPQUFQLEdBQWlCTCxJQUFqQixDOzs7Ozs7Ozs7QUNYQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU1NLEksR0FDRixjQUFZQyxZQUFaLEVBQTBCO0FBQUE7O0FBQ3RCLFNBQUs3RSxJQUFMLEdBQVl1RSxTQUFaO0FBQ0EsU0FBS08sTUFBTCxHQUFjUCxTQUFkO0FBQ0EsU0FBS1EsS0FBTCxHQUFhUixTQUFiO0FBQ0EsU0FBSzFCLFNBQUwsR0FBaUIwQixTQUFqQjtBQUNBLFNBQUtTLEtBQUwsR0FBYTtBQUNUQyx5QkFBaUJWLFNBRFI7QUFFVFcscUJBQWFYLFNBRko7QUFHVFksaUJBQVNaO0FBSEEsS0FBYjs7QUFNQSxTQUFLTSxZQUFMLEdBQW9CQSxZQUFwQjtBQUNBLFNBQUtPLGNBQUw7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLHNCQUFZeEUsSUFBWixDQUFpQixJQUFqQixDQUFuQjtBQUNBLFNBQUt5RSxlQUFMLEdBQXVCLDBCQUFnQnpFLElBQWhCLENBQXFCLElBQXJCLENBQXZCO0FBQ0gsQzs7QUFHTCtELEtBQUtKLFNBQUwsQ0FBZWUsSUFBZjtBQUNBWCxLQUFLSixTQUFMLENBQWVnQixPQUFmO0FBQ0FaLEtBQUtKLFNBQUwsQ0FBZUMsTUFBZjtBQUNBRyxLQUFLSixTQUFMLENBQWVpQixNQUFmOztBQUVBZixPQUFPQyxPQUFQLEdBQWlCQyxJQUFqQixDOzs7Ozs7Ozs7Ozs7QUNwQ0EsSUFBTUMsZUFBZTtBQUNqQnRFLFdBQU8sR0FEVTtBQUVqQlgsWUFBUSxHQUZTO0FBR2pCOEYsWUFBUSxDQUhTO0FBSWpCQyxnQkFBWSxNQUpLO0FBS2pCQyxvQkFBZ0IsY0FMQztBQU1qQkMsaUJBQWEsV0FOSTtBQU9qQkMsZUFBVyxTQVBNO0FBUWpCQyxzQkFBa0IsZUFSRDtBQVNqQkMsc0JBQWtCLFdBVEQ7QUFVakJDLHVCQUFtQixlQVZGO0FBV2pCQyxzQkFBa0I7QUFYRCxDQUFyQjs7a0JBY2VyQixZOzs7Ozs7Ozs7QUNkZixJQUFJc0Isa0JBQWtCO0FBQ3BCQyxvQkFBa0I7QUFDaEJDLFlBQVEsSUFEUTtBQUVoQnZFLGFBQVMsR0FGTztBQUdoQndFLFlBQVEsR0FIUTtBQUloQkMsVUFBTSxDQUpVO0FBS2hCQyxhQUFTLEdBTE87QUFNaEJoRCxjQUFVLEdBTk07QUFPaEJDLGtCQUFjLEVBUEU7QUFRaEJnRCxhQUFTLElBUk87QUFTaEJDLFdBQU8sQ0FUUztBQVVoQkMsY0FBVUMsUUFWTTtBQVdoQkMsV0FBTyxHQVhTO0FBWWhCL0YsZ0JBQVksRUFaSTtBQWFoQmdHLFlBQVE7QUFDTixjQUFRLEdBREY7QUFFTixhQUFPLEdBRkQ7QUFHTixjQUFRLEdBSEY7QUFJTixjQUFRLEdBSkY7QUFLTixjQUFRO0FBTEYsS0FiUTtBQW9CaEJ6SCxhQUFVLEVBcEJNO0FBcUJoQmYsZ0JBQVksQ0FDUixFQUFFc0MsUUFBUSxlQUFWLEVBRFEsRUFFUixFQUFFQSxRQUFRLE1BQVYsRUFGUSxFQUdSLEVBQUVBLFFBQVEsYUFBVixFQUhRO0FBckJJLEdBREU7QUE0QnBCbUcsT0FBSztBQUNIdkksVUFBTSxLQURIO0FBRUhnRixjQUFVLEdBRlA7QUFHSGtELFdBQU8sQ0FISjtBQUlIQyxjQUFVQyxRQUpQO0FBS0g5RixnQkFBWSxDQUNWLEVBQUV3QixNQUFNLE1BQVIsRUFBZ0JDLFFBQVEsQ0FBQyxFQUFELEVBQUksSUFBSixFQUFTLElBQVQsRUFBYyxFQUFkLEVBQWlCLEVBQWpCLENBQXhCLEVBQThDSSxLQUFLLEVBQW5ELEVBQXVEQyxNQUFNLEtBQTdELEVBRFUsRUFFVixFQUFFTixNQUFNLEtBQVIsRUFBZUMsUUFBUSxDQUFDLEVBQUQsRUFBSSxFQUFKLEVBQU8sRUFBUCxFQUFVLEVBQVYsRUFBYSxFQUFiLEVBQWdCLEVBQWhCLEVBQW1CLEVBQW5CLEVBQXNCLEVBQXRCLEVBQXlCLEVBQXpCLEVBQTRCLEVBQTVCLENBQXZCLEVBQXdESSxLQUFLLEVBQTdELEVBQWlFQyxNQUFNLElBQXZFLEVBRlUsRUFHVixFQUFFTixNQUFNLE1BQVIsRUFBZ0JDLFFBQVEsQ0FBQyxFQUFELEVBQUksRUFBSixFQUFPLEVBQVAsRUFBVSxFQUFWLENBQXhCLEVBQXVDSSxLQUFLLEVBQTVDLEVBQWdEQyxNQUFNLEtBQXRELEVBSFUsRUFJVixFQUFFTixNQUFNLE1BQVIsRUFBZ0JDLFFBQVEsQ0FBQyxFQUFELEVBQUksRUFBSixFQUFPLEVBQVAsRUFBVSxFQUFWLEVBQWEsRUFBYixFQUFnQixFQUFoQixFQUFtQixFQUFuQixFQUFzQixFQUF0QixFQUF5QixFQUF6QixFQUE0QixFQUE1QixFQUErQixFQUEvQixFQUFrQyxFQUFsQyxFQUFxQyxFQUFyQyxFQUF3QyxFQUF4QyxFQUEyQyxFQUEzQyxFQUE4QyxFQUE5QyxDQUF4QixFQUEyRUksS0FBSyxFQUFoRixFQUFvRkMsTUFBTSxLQUExRixFQUpVLEVBS1YsRUFBRU4sTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsRUFBRCxFQUFJLEVBQUosRUFBTyxFQUFQLEVBQVUsRUFBVixFQUFhLEVBQWIsRUFBZ0IsRUFBaEIsRUFBbUIsRUFBbkIsRUFBc0IsRUFBdEIsRUFBeUIsRUFBekIsRUFBNEIsRUFBNUIsRUFBK0IsRUFBL0IsRUFBa0MsRUFBbEMsRUFBcUMsRUFBckMsRUFBd0MsRUFBeEMsRUFBMkMsRUFBM0MsRUFBOEMsRUFBOUMsRUFBaUQsRUFBakQsRUFBb0QsRUFBcEQsRUFBdUQsRUFBdkQsRUFBMEQsRUFBMUQsRUFBNkQsRUFBN0QsRUFBZ0UsRUFBaEUsRUFBbUUsRUFBbkUsRUFBc0UsRUFBdEUsRUFBeUUsRUFBekUsRUFBNEUsRUFBNUUsRUFBK0UsRUFBL0UsRUFBa0YsRUFBbEYsRUFBcUYsRUFBckYsRUFBd0YsRUFBeEYsRUFBMkYsRUFBM0YsRUFBOEYsRUFBOUYsRUFBaUcsRUFBakcsRUFBb0csRUFBcEcsRUFBdUcsRUFBdkcsRUFBMEcsRUFBMUcsRUFBNkcsRUFBN0csRUFBZ0gsRUFBaEgsRUFBbUgsRUFBbkgsRUFBc0gsRUFBdEgsRUFBeUgsRUFBekgsRUFBNEgsRUFBNUgsRUFBK0gsRUFBL0gsRUFBa0ksSUFBbEksRUFBdUksSUFBdkksRUFBNEksSUFBNUksRUFBaUosSUFBakosRUFBc0osSUFBdEosRUFBMkosSUFBM0osQ0FBeEIsRUFBMExJLEtBQUssQ0FBL0wsRUFBa01DLE1BQU0sSUFBeE0sRUFMVSxFQU1WLEVBQUVOLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEVBQUQsQ0FBeEIsRUFBOEJJLEtBQUssRUFBbkMsRUFBdUNDLE1BQU0sSUFBN0MsRUFOVSxFQU9WLEVBQUVOLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEVBQUQsQ0FBeEIsRUFBOEJJLEtBQUssRUFBbkMsRUFBdUNDLE1BQU0sSUFBN0MsRUFQVSxFQVFWLEVBQUVOLE1BQU0sS0FBUixFQUFlQyxRQUFRLENBQUMsRUFBRCxDQUF2QixFQUE2QkksS0FBSyxFQUFsQyxFQUFzQ0MsTUFBTSxLQUE1QyxFQVJVLEVBU1YsRUFBRU4sTUFBTSxPQUFSLEVBQWlCQyxRQUFRLENBQUMsRUFBRCxFQUFJLElBQUosRUFBUyxJQUFULEVBQWMsRUFBZCxFQUFpQixFQUFqQixDQUF6QixFQUErQ0ksS0FBSyxFQUFwRCxFQUF3REMsTUFBTSxLQUE5RCxFQVRVO0FBTFQsR0E1QmU7QUE2Q3BCb0UsUUFBTTtBQUNKeEksVUFBTSxNQURGO0FBRUorSCxVQUFNLEdBRkY7QUFHSkMsYUFBUyxHQUhMO0FBSUpoRCxjQUFVLEVBSk47QUFLSkMsa0JBQWMsQ0FMVjtBQU1KbkYsZ0JBQVksQ0FDUixFQUFFc0MsUUFBUSxlQUFWLEVBRFEsRUFFUixFQUFFQSxRQUFRLE1BQVYsRUFGUSxFQUdSLEVBQUVBLFFBQVEsYUFBVixFQUhRLEVBSVIsRUFBRUEsUUFBUSxNQUFWLEVBQWtCSixRQUFRLEVBQUVHLGFBQWEsSUFBZixFQUFxQkMsUUFBUSxNQUE3QixFQUExQixFQUpRLENBTlI7QUFZSkUsZ0JBQVksQ0FDVixFQUFFd0IsTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULEVBQWEsR0FBYixFQUFpQixHQUFqQixFQUFxQixHQUFyQixFQUF5QixHQUF6QixFQUE2QixHQUE3QixDQUF4QixFQUEyREksS0FBSyxDQUFoRSxFQUFtRUMsTUFBTSxJQUF6RSxFQURVLEVBRVYsRUFBRU4sTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULEVBQWEsR0FBYixFQUFpQixHQUFqQixDQUF4QixFQUErQ0ksS0FBSyxFQUFwRCxFQUF3REMsTUFBTSxJQUE5RCxFQUZVLEVBR1YsRUFBRU4sTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULEVBQWEsR0FBYixFQUFpQixHQUFqQixDQUF4QixFQUErQ0ksS0FBSyxFQUFwRCxFQUF3REMsTUFBTSxJQUE5RCxFQUhVLEVBSVYsRUFBRU4sTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxDQUF4QixFQUErQkksS0FBSyxFQUFwQyxFQUF3Q0MsTUFBTSxJQUE5QyxFQUpVLEVBS1YsRUFBRU4sTUFBTSxLQUFSLEVBQWVDLFFBQVEsQ0FBQyxHQUFELENBQXZCLEVBQThCSSxLQUFLLEVBQW5DLEVBQXVDQyxNQUFNLElBQTdDLEVBTFUsRUFNVixFQUFFTixNQUFNLE9BQVIsRUFBaUJDLFFBQVEsQ0FBQyxHQUFELEVBQUssR0FBTCxFQUFTLEdBQVQsRUFBYSxHQUFiLENBQXpCLEVBQTRDSSxLQUFLLEVBQWpELEVBQXFEQyxNQUFNLElBQTNELEVBTlU7QUFaUixHQTdDYztBQWtFcEJxRSxRQUFNO0FBQ0p6SSxVQUFNLE1BREY7QUFFSitILFVBQU0sR0FGRjtBQUdKL0MsY0FBVSxFQUhOO0FBSUpnRCxhQUFTLENBSkw7QUFLSi9DLGtCQUFjLEVBTFY7QUFNSjNDLGdCQUFZLENBQ1YsRUFBRXdCLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEdBQUQsQ0FBeEIsRUFBK0JJLEtBQUssRUFBcEMsRUFBd0NDLE1BQU0sS0FBOUMsRUFEVSxFQUVWLEVBQUVOLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLEVBQVMsR0FBVCxDQUF4QixFQUF1Q0ksS0FBSyxFQUE1QyxFQUFnREMsTUFBTSxJQUF0RCxFQUZVLEVBR1YsRUFBRU4sTUFBTSxPQUFSLEVBQWlCQyxRQUFRLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULEVBQWEsR0FBYixDQUF6QixFQUE0Q0ksS0FBSyxFQUFqRCxFQUFxREMsTUFBTSxLQUEzRCxFQUhVLEVBSVYsRUFBRU4sTUFBTSxLQUFSLEVBQWVDLFFBQVEsQ0FBQyxHQUFELENBQXZCLEVBQThCSSxLQUFLLEVBQW5DLEVBQXVDQyxNQUFNLElBQTdDLEVBSlU7QUFOUixHQWxFYztBQStFcEIsZ0JBQWM7QUFDWmEsa0JBQWMsRUFERjtBQUVaRCxjQUFVLEdBRkU7QUFHWjBELFdBQU8sdUJBSEssRUFHb0I7QUFDaENwRyxnQkFBWTtBQUpBLEdBL0VNO0FBcUZwQnFHLFNBQU87QUFDTDNJLFVBQU0sT0FERDtBQUVMK0gsVUFBTSxHQUZEO0FBR0xDLGFBQVMsR0FISjtBQUlMaEQsY0FBVSxFQUpMO0FBS0xDLGtCQUFjLEVBTFQ7QUFNTDNDLGdCQUFZLENBQ1YsRUFBRXdCLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQXhCLEVBQW1DSSxLQUFLLEVBQXhDLEVBQTRDQyxNQUFNLElBQWxELEVBRFUsRUFFVixFQUFFTixNQUFNLE1BQVIsRUFBZ0JDLFFBQVEsQ0FBQyxHQUFELEVBQUssR0FBTCxDQUF4QixFQUFtQ0ksS0FBSyxFQUF4QyxFQUE0Q0MsTUFBTSxJQUFsRCxFQUZVLEVBR1YsRUFBRU4sTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBeEIsRUFBbUNJLEtBQUssRUFBeEMsRUFBNENDLE1BQU0sS0FBbEQsRUFIVSxFQUlWLEVBQUVOLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEdBQUQsQ0FBeEIsRUFBK0JJLEtBQUssRUFBcEMsRUFBd0NDLE1BQU0sS0FBOUMsRUFKVSxFQUtWLEVBQUVOLE1BQU0sS0FBUixFQUFlQyxRQUFRLENBQUMsR0FBRCxDQUF2QixFQUE4QkksS0FBSyxFQUFuQyxFQUF1Q0MsTUFBTSxJQUE3QyxFQUxVLEVBTVYsRUFBRU4sTUFBTSxPQUFSLEVBQWlCQyxRQUFRLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBekIsRUFBb0NJLEtBQUssRUFBekMsRUFBNkNDLE1BQU0sSUFBbkQsRUFOVTtBQU5QLEdBckZhO0FBb0dwQndFLFNBQU87QUFDTDVJLFVBQU0sT0FERDtBQUVMK0gsVUFBTSxHQUZEO0FBR0x6RSxhQUFTLENBSEo7QUFJTHdFLFlBQVEsR0FKSDtBQUtMRSxhQUFTLENBTEo7QUFNTEMsYUFBUyxLQU5KO0FBT0xqRCxjQUFVLEVBUEw7QUFRTEMsa0JBQWMsRUFSVDtBQVNMM0MsZ0JBQVksQ0FDVixFQUFFd0IsTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULEVBQWEsR0FBYixFQUFpQixHQUFqQixFQUFxQixHQUFyQixFQUF5QixHQUF6QixFQUE2QixHQUE3QixFQUFpQyxHQUFqQyxFQUFxQyxHQUFyQyxFQUF5QyxHQUF6QyxFQUE2QyxHQUE3QyxFQUFpRCxHQUFqRCxFQUFxRCxHQUFyRCxFQUF5RCxHQUF6RCxFQUE2RCxHQUE3RCxDQUF4QixFQUEyRkksS0FBSyxDQUFoRyxFQUFtR0MsTUFBTSxJQUF6RyxFQURVLEVBRVYsRUFBRU4sTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULEVBQWEsR0FBYixFQUFpQixHQUFqQixFQUFxQixHQUFyQixFQUF5QixHQUF6QixFQUE2QixHQUE3QixFQUFpQyxHQUFqQyxFQUFxQyxHQUFyQyxFQUF5QyxHQUF6QyxFQUE2QyxHQUE3QyxFQUFpRCxHQUFqRCxFQUFxRCxHQUFyRCxFQUF5RCxHQUF6RCxFQUE2RCxHQUE3RCxFQUFpRSxHQUFqRSxFQUFxRSxHQUFyRSxFQUF5RSxHQUF6RSxFQUE2RSxHQUE3RSxFQUFpRixHQUFqRixFQUFxRixHQUFyRixFQUF5RixHQUF6RixDQUF4QixFQUF1SEksS0FBSyxFQUE1SCxFQUFnSUMsTUFBTSxJQUF0SSxFQUZVLEVBR1YsRUFBRU4sTUFBTSxTQUFSLEVBQW1CQyxRQUFRLENBQUMsR0FBRCxDQUEzQixFQUFrQ0ksS0FBSyxFQUF2QyxFQUEyQ0MsTUFBTSxJQUFqRCxFQUhVLEVBSVYsRUFBRU4sTUFBTSxRQUFSLEVBQWtCQyxRQUFRLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULENBQTFCLEVBQXlDSSxLQUFLLEVBQTlDLEVBQWtEQyxNQUFNLElBQXhELEVBSlUsRUFLVixFQUFFTixNQUFNLEtBQVIsRUFBZUMsUUFBUSxDQUFDLEdBQUQsQ0FBdkIsRUFBOEJJLEtBQUssRUFBbkMsRUFBdUNDLE1BQU0sSUFBN0MsRUFMVSxFQU1WLEVBQUVOLE1BQU0sT0FBUixFQUFpQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLEVBQVMsR0FBVCxDQUF6QixFQUF3Q0ksS0FBSyxFQUE3QyxFQUFpREMsTUFBTSxJQUF2RCxFQU5VO0FBVFAsR0FwR2E7QUFzSHBCeUUsYUFBVztBQUNUN0ksVUFBTSxXQURHO0FBRVQrSCxVQUFNLEdBRkc7QUFHVHpFLGFBQVMsQ0FIQTtBQUlUd0UsWUFBUSxHQUpDO0FBS1RFLGFBQVMsQ0FMQTtBQU1UQyxhQUFTLEtBTkE7QUFPVGpELGNBQVUsRUFQRDtBQVFUQyxrQkFBYyxFQVJMO0FBU1QzQyxnQkFBWSxDQUNWLEVBQUV3QixNQUFNLE1BQVIsRUFBZ0JDLFFBQVEsQ0FBQyxHQUFELEVBQUssR0FBTCxDQUF4QixFQUFtQ0ksS0FBSyxFQUF4QyxFQUE0Q0MsTUFBTSxJQUFsRCxFQURVLEVBRVYsRUFBRU4sTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBeEIsRUFBbUNJLEtBQUssRUFBeEMsRUFBNENDLE1BQU0sSUFBbEQsRUFGVSxFQUdWLEVBQUVOLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQXhCLEVBQW1DSSxLQUFLLEVBQXhDLEVBQTRDQyxNQUFNLElBQWxELEVBSFUsRUFJVixFQUFFTixNQUFNLEtBQVIsRUFBZUMsUUFBUSxDQUFDLEdBQUQsQ0FBdkIsRUFBOEJJLEtBQUssRUFBbkMsRUFBdUNDLE1BQU0sSUFBN0MsRUFKVSxFQUtWLEVBQUVOLE1BQU0sT0FBUixFQUFpQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQXpCLEVBQW9DSSxLQUFLLEVBQXpDLEVBQTZDQyxNQUFNLElBQW5ELEVBTFU7QUFUSCxHQXRIUztBQXVJcEIwRSxPQUFLO0FBQ0g5SSxVQUFNLEtBREg7QUFFSCtILFVBQU0sR0FGSDtBQUdIekUsYUFBUyxDQUhOO0FBSUh3RSxZQUFRLEdBSkw7QUFLSEUsYUFBUyxDQUxOO0FBTUhDLGFBQVMsS0FOTjtBQU9IakQsY0FBVSxFQVBQO0FBUUhDLGtCQUFjLEVBUlg7QUFTSDNDLGdCQUFZLENBQ1YsRUFBRXdCLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLEVBQVMsR0FBVCxFQUFhLEdBQWIsRUFBaUIsR0FBakIsRUFBcUIsR0FBckIsQ0FBeEIsRUFBbURJLEtBQUssRUFBeEQsRUFBNERDLE1BQU0sSUFBbEUsRUFEVSxFQUVWLEVBQUVOLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQXhCLEVBQW1DSSxLQUFLLEVBQXhDLEVBQTRDQyxNQUFNLElBQWxELEVBRlUsRUFHVixFQUFFTixNQUFNLEtBQVIsRUFBZUMsUUFBUSxDQUFDLEdBQUQsQ0FBdkIsRUFBOEJJLEtBQUssRUFBbkMsRUFBdUNDLE1BQU0sSUFBN0MsRUFIVSxFQUlWLEVBQUVOLE1BQU0sT0FBUixFQUFpQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLENBQXpCLEVBQW9DSSxLQUFLLEVBQXpDLEVBQTZDQyxNQUFNLElBQW5ELEVBSlU7QUFUVCxHQXZJZTtBQXVKcEIyRSxVQUFRO0FBQ04vSSxVQUFNLFFBREE7QUFFTitILFVBQU0sR0FGQTtBQUdOQyxhQUFTLENBSEg7QUFJTkMsYUFBUyxJQUpIO0FBS05ILFlBQVEsQ0FMRjtBQU1OOUMsY0FBVSxFQU5KO0FBT05DLGtCQUFjLEVBUFI7QUFRTjNDLGdCQUFZLENBQ1YsRUFBRXdCLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEdBQUQsQ0FBeEIsRUFBK0JJLEtBQUssRUFBcEMsRUFBd0NDLE1BQU0sSUFBOUMsRUFEVSxFQUVWLEVBQUVOLE1BQU0sT0FBUixFQUFpQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLEVBQVMsR0FBVCxFQUFhLEdBQWIsQ0FBekIsRUFBNENJLEtBQUssRUFBakQsRUFBcURDLE1BQU0sS0FBM0QsRUFGVSxFQUdWLEVBQUVOLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLEVBQVMsR0FBVCxFQUFhLEdBQWIsQ0FBeEIsRUFBMkNJLEtBQUssRUFBaEQsRUFBb0RDLE1BQU0sSUFBMUQsRUFIVSxFQUlWLEVBQUVOLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEdBQUQsQ0FBeEIsRUFBK0JJLEtBQUssRUFBcEMsRUFBd0NDLE1BQU0sSUFBOUMsRUFKVSxFQUtWLEVBQUVOLE1BQU0sT0FBUixFQUFpQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLEVBQVMsR0FBVCxFQUFhLEdBQWIsQ0FBekIsRUFBNENJLEtBQUssRUFBakQsRUFBcURDLE1BQU0sSUFBM0QsRUFMVSxFQU1WLEVBQUVOLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLEVBQVMsR0FBVCxDQUF4QixFQUF1Q0ksS0FBSyxFQUE1QyxFQUFnREMsTUFBTSxJQUF0RCxFQU5VLEVBT1YsRUFBRU4sTUFBTSxLQUFSLEVBQWVDLFFBQVEsQ0FBQyxHQUFELENBQXZCLEVBQThCSSxLQUFLLEVBQW5DLEVBQXVDQyxNQUFNLEtBQTdDLEVBUFU7QUFSTixHQXZKWTtBQXlLcEI0RSxVQUFRO0FBQ05oSixVQUFNLFFBREE7QUFFTmdGLGNBQVUsR0FGSjtBQUdOQyxrQkFBYyxFQUhSO0FBSU4rQyxhQUFTLENBSkg7QUFLTjFGLGdCQUFZLENBQ1YsRUFBRXdCLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEdBQUQsQ0FBeEIsRUFBK0JJLEtBQUssRUFBcEMsRUFBd0NDLE1BQU0sSUFBOUMsRUFEVSxFQUVWLEVBQUVOLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLEVBQVMsR0FBVCxDQUF4QixFQUF1Q0ksS0FBSyxFQUE1QyxFQUFnREMsTUFBTSxJQUF0RCxFQUZVLEVBR1YsRUFBRU4sTUFBTSxLQUFSLEVBQWVDLFFBQVEsQ0FBQyxHQUFELENBQXZCLEVBQThCSSxLQUFLLEVBQW5DLEVBQXVDQyxNQUFNLEtBQTdDLEVBSFUsRUFJVixFQUFFTixNQUFNLE9BQVIsRUFBaUJDLFFBQVEsQ0FBQyxHQUFELEVBQUssR0FBTCxFQUFTLEdBQVQsQ0FBekIsRUFBd0NJLEtBQUssRUFBN0MsRUFBaURDLE1BQU0sSUFBdkQsRUFKVTtBQUxOLEdBektZO0FBcUxwQjZFLFVBQVE7QUFDTmpKLFVBQU0sUUFEQTtBQUVOK0gsVUFBTSxHQUZBO0FBR056RSxhQUFTLENBSEg7QUFJTndFLFlBQVEsR0FKRjtBQUtORSxhQUFTLENBTEg7QUFNTkMsYUFBUyxLQU5IO0FBT05qRCxjQUFVLEdBUEo7QUFRTkMsa0JBQWMsRUFSUjtBQVNOM0MsZ0JBQVksQ0FDVixFQUFFd0IsTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULENBQXhCLEVBQXVDSSxLQUFLLEVBQTVDLEVBQWdEQyxNQUFNLElBQXRELEVBRFUsRUFFVixFQUFFTixNQUFNLE1BQVIsRUFBZ0JDLFFBQVEsQ0FBQyxHQUFELEVBQUssR0FBTCxFQUFTLEdBQVQsQ0FBeEIsRUFBdUNJLEtBQUssRUFBNUMsRUFBZ0RDLE1BQU0sSUFBdEQsRUFGVSxFQUdWLEVBQUVOLE1BQU0sS0FBUixFQUFlQyxRQUFRLENBQUMsR0FBRCxDQUF2QixFQUE4QkksS0FBSyxFQUFuQyxFQUF1Q0MsTUFBTSxLQUE3QyxFQUhVLEVBSVYsRUFBRU4sTUFBTSxPQUFSLEVBQWlCQyxRQUFRLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULENBQXpCLEVBQXdDSSxLQUFLLEVBQTdDLEVBQWlEQyxNQUFNLElBQXZELEVBSlU7QUFUTixHQXJMWTtBQXFNcEI4RSxVQUFRO0FBQ05sSixVQUFNLFFBREE7QUFFTitILFVBQU0sQ0FGQTtBQUdORSxhQUFTLElBSEg7QUFJTkgsWUFBUSxHQUpGO0FBS05FLGFBQVMsR0FMSDtBQU1OaEQsY0FBVSxFQU5KO0FBT05DLGtCQUFjLEVBUFI7QUFRTjNDLGdCQUFZLENBQ1YsRUFBRXdCLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLEVBQVMsR0FBVCxFQUFhLEdBQWIsRUFBaUIsR0FBakIsRUFBcUIsR0FBckIsRUFBeUIsR0FBekIsQ0FBeEIsRUFBdURJLEtBQUssRUFBNUQsRUFBZ0VDLE1BQU0sSUFBdEUsRUFEVSxFQUVWLEVBQUVOLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLEVBQVMsR0FBVCxDQUF4QixFQUF1Q0ksS0FBSyxFQUE1QyxFQUFnREMsTUFBTSxJQUF0RCxFQUZVLEVBR1YsRUFBRU4sTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULENBQXhCLEVBQXVDSSxLQUFLLEVBQTVDLEVBQWdEQyxNQUFNLElBQXRELEVBSFUsRUFJVixFQUFFTixNQUFNLEtBQVIsRUFBZUMsUUFBUSxDQUFDLEdBQUQsQ0FBdkIsRUFBOEJJLEtBQUssRUFBbkMsRUFBdUNDLE1BQU0sSUFBN0MsRUFKVSxFQUtWLEVBQUVOLE1BQU0sT0FBUixFQUFpQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLEVBQVMsR0FBVCxDQUF6QixFQUF3Q0ksS0FBSyxFQUE3QyxFQUFpREMsTUFBTSxJQUF2RCxFQUxVO0FBUk4sR0FyTVk7QUFxTnBCK0UsT0FBSztBQUNIbkosVUFBTSxLQURIO0FBRUgrSCxVQUFNLENBRkg7QUFHSEUsYUFBUyxJQUhOO0FBSUhILFlBQVEsR0FKTDtBQUtIRSxhQUFTLEdBTE47QUFNSGhELGNBQVUsRUFOUDtBQU9IQyxrQkFBYyxFQVBYO0FBUUgzQyxnQkFBWSxDQUNWLEVBQUV3QixNQUFNLE1BQVIsRUFBZ0JDLFFBQVEsQ0FBQyxHQUFELEVBQUssR0FBTCxFQUFTLEdBQVQsRUFBYSxHQUFiLEVBQWlCLEdBQWpCLEVBQXFCLEdBQXJCLEVBQXlCLEdBQXpCLEVBQTZCLEdBQTdCLEVBQWlDLEdBQWpDLENBQXhCLEVBQStESSxLQUFLLEVBQXBFLEVBQXdFQyxNQUFNLElBQTlFLEVBRFUsRUFFVixFQUFFTixNQUFNLE1BQVIsRUFBZ0JDLFFBQVEsQ0FBQyxHQUFELEVBQUssR0FBTCxDQUF4QixFQUFtQ0ksS0FBSyxFQUF4QyxFQUE0Q0MsTUFBTSxJQUFsRCxFQUZVLEVBR1YsRUFBRU4sTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBeEIsRUFBbUNJLEtBQUssRUFBeEMsRUFBNENDLE1BQU0sSUFBbEQsRUFIVSxFQUlWLEVBQUVOLE1BQU0sS0FBUixFQUFlQyxRQUFRLENBQUMsR0FBRCxDQUF2QixFQUE4QkksS0FBSyxFQUFuQyxFQUF1Q0MsTUFBTSxJQUE3QyxFQUpVLEVBS1YsRUFBRU4sTUFBTSxPQUFSLEVBQWlCQyxRQUFRLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBekIsRUFBb0NJLEtBQUssRUFBekMsRUFBNkNDLE1BQU0sSUFBbkQsRUFMVTtBQVJULEdBck5lO0FBcU9wQmdGLFFBQU07QUFDSnBKLFVBQU0sTUFERjtBQUVKK0gsVUFBTSxDQUZGO0FBR0pFLGFBQVMsSUFITDtBQUlKSCxZQUFRLEdBSko7QUFLSkUsYUFBUyxHQUxMO0FBTUpoRCxjQUFVLEVBTk47QUFPSkMsa0JBQWMsRUFQVjtBQVFKM0MsZ0JBQVksQ0FDVixFQUFFd0IsTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxDQUF4QixFQUErQkksS0FBSyxFQUFwQyxFQUF3Q0MsTUFBTSxJQUE5QyxFQURVLEVBRVYsRUFBRU4sTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULEVBQWEsR0FBYixDQUF4QixFQUEyQ0ksS0FBSyxFQUFoRCxFQUFvREMsTUFBTSxLQUExRCxFQUZVLEVBR1YsRUFBRU4sTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULEVBQWEsR0FBYixDQUF4QixFQUEyQ0ksS0FBSyxFQUFoRCxFQUFvREMsTUFBTSxLQUExRCxFQUhVLEVBSVYsRUFBRU4sTUFBTSxLQUFSLEVBQWVDLFFBQVEsQ0FBQyxHQUFELENBQXZCLEVBQThCSSxLQUFLLEVBQW5DLEVBQXVDQyxNQUFNLElBQTdDLEVBSlUsRUFLVixFQUFFTixNQUFNLE9BQVIsRUFBaUJDLFFBQVEsQ0FBQyxHQUFELEVBQUssR0FBTCxFQUFTLEdBQVQsRUFBYSxHQUFiLENBQXpCLEVBQTRDSSxLQUFLLEVBQWpELEVBQXFEQyxNQUFNLEtBQTNELEVBTFU7QUFSUixHQXJPYztBQXFQcEJpRixVQUFRO0FBQ05ySixVQUFNLFFBREE7QUFFTitILFVBQU0sQ0FGQTtBQUdOQyxhQUFTLENBSEg7QUFJTkMsYUFBUyxJQUpIO0FBS05ILFlBQVEsR0FMRjtBQU1OOUMsY0FBVSxFQU5KO0FBT05DLGtCQUFjLEVBUFI7QUFRTjNDLGdCQUFZLENBQ1YsRUFBRXdCLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEdBQUQsQ0FBeEIsRUFBK0JJLEtBQUssRUFBcEMsRUFBd0NDLE1BQU0sSUFBOUMsRUFEVSxFQUVWLEVBQUVOLE1BQU0sT0FBUixFQUFpQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLEVBQVMsR0FBVCxFQUFhLEdBQWIsQ0FBekIsRUFBNENJLEtBQUssRUFBakQsRUFBcURDLE1BQU0sSUFBM0QsRUFGVSxFQUdWLEVBQUVOLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLEVBQVMsR0FBVCxFQUFhLEdBQWIsQ0FBeEIsRUFBMkNJLEtBQUssRUFBaEQsRUFBb0RDLE1BQU0sSUFBMUQsRUFIVSxFQUlWLEVBQUVOLE1BQU0sS0FBUixFQUFlQyxRQUFRLENBQUMsR0FBRCxDQUF2QixFQUE4QkksS0FBSyxFQUFuQyxFQUF1Q0MsTUFBTSxJQUE3QyxFQUpVO0FBUk4sR0FyUFk7QUFvUXBCa0YsU0FBTztBQUNMdEosVUFBTSxPQUREO0FBRUwrSCxVQUFNLENBRkQ7QUFHTEMsYUFBUyxDQUhKO0FBSUxDLGFBQVMsSUFKSjtBQUtMSCxZQUFRLENBTEg7QUFNTDlDLGNBQVUsQ0FOTDtBQU9MQyxrQkFBYyxDQVBUO0FBUUwzQyxnQkFBWSxDQUNWLEVBQUV3QixNQUFNLE1BQVIsRUFBZ0JDLFFBQVEsQ0FBQyxHQUFELEVBQUssR0FBTCxFQUFTLEdBQVQsQ0FBeEIsRUFBdUNJLEtBQUssQ0FBNUMsRUFBK0NDLE1BQU0sSUFBckQsRUFEVSxFQUVWLEVBQUVOLE1BQU0sT0FBUixFQUFpQkMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLEVBQVMsR0FBVCxDQUF6QixFQUF3Q0ksS0FBSyxDQUE3QyxFQUFnREMsTUFBTSxJQUF0RCxFQUZVLEVBR1YsRUFBRU4sTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULENBQXhCLEVBQXVDSSxLQUFLLENBQTVDLEVBQStDQyxNQUFNLElBQXJELEVBSFUsRUFJVixFQUFFTixNQUFNLEtBQVIsRUFBZUMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLEVBQVMsR0FBVCxDQUF2QixFQUFzQ0ksS0FBSyxDQUEzQyxFQUE4Q0MsTUFBTSxJQUFwRCxFQUpVO0FBUlAsR0FwUWE7QUFtUnBCbUYsV0FBUztBQUNQdkosVUFBTSxTQURDO0FBRVArSCxVQUFNLENBRkM7QUFHUEMsYUFBUyxHQUhGO0FBSVBoRCxjQUFVLENBSkg7QUFLUEMsa0JBQWMsQ0FMUDtBQU1QM0MsZ0JBQVksQ0FDVixFQUFFd0IsTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxDQUF4QixFQUErQkksS0FBSyxDQUFwQyxFQUF1Q0MsTUFBTSxJQUE3QyxFQURVLEVBRVYsRUFBRU4sTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxDQUF4QixFQUErQkksS0FBSyxFQUFwQyxFQUF3Q0MsTUFBTSxJQUE5QyxFQUZVLEVBR1YsRUFBRU4sTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxDQUF4QixFQUErQkksS0FBSyxFQUFwQyxFQUF3Q0MsTUFBTSxJQUE5QyxFQUhVLEVBSVYsRUFBRU4sTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsR0FBRCxDQUF4QixFQUErQkksS0FBSyxFQUFwQyxFQUF3Q0MsTUFBTSxJQUE5QyxFQUpVLEVBS1YsRUFBRU4sTUFBTSxLQUFSLEVBQWVDLFFBQVEsQ0FBQyxHQUFELENBQXZCLEVBQThCSSxLQUFLLEVBQW5DLEVBQXVDQyxNQUFNLElBQTdDLEVBTFUsRUFNVixFQUFFTixNQUFNLE9BQVIsRUFBaUJDLFFBQVEsQ0FBQyxHQUFELENBQXpCLEVBQWdDSSxLQUFLLEVBQXJDLEVBQXlDQyxNQUFNLElBQS9DLEVBTlU7QUFOTDtBQW5SVyxDQUF0Qjs7QUFvU0EsS0FBSSxJQUFJb0YsUUFBUixJQUFvQjdCLGVBQXBCLEVBQW9DO0FBQ2xDO0FBQ0EsTUFBSThCLFdBQVc5QixnQkFBZ0Isa0JBQWhCLENBQWY7QUFDQSxPQUFJLElBQUkrQixJQUFSLElBQWdCRCxRQUFoQixFQUF5QjtBQUN2QixRQUFHOUIsZ0JBQWdCNkIsUUFBaEIsRUFBMEJFLElBQTFCLE1BQW9DM0QsU0FBdkMsRUFBaUQ7QUFDL0M0QixzQkFBZ0I2QixRQUFoQixFQUEwQkUsSUFBMUIsSUFBa0NELFNBQVNDLElBQVQsQ0FBbEM7QUFDRDtBQUNGO0FBQ0Y7O0FBRUR4RCxPQUFPQyxPQUFQLEdBQWlCd0IsZUFBakIsQzs7Ozs7Ozs7O0FDOVNBLFNBQVMxQixNQUFULEdBQWlCO0FBQUE7O0FBRWI7QUFDQSxTQUFLeEcsSUFBTCxDQUFVOEYsSUFBVixDQUFlb0UsY0FBZixHQUFnQyxJQUFoQzs7QUFFQTtBQUNBLFFBQU1sRyxPQUFPLEtBQUtoRSxJQUFMLENBQVVrRCxHQUFWLENBQWNjLElBQWQsQ0FDVCxLQUFLaEUsSUFBTCxDQUFVc0MsS0FBVixHQUFrQixDQURULEVBRVQsS0FBS3RDLElBQUwsQ0FBVTJCLE1BQVYsR0FBbUIsQ0FGVixFQUdULDhCQUhTLEVBSVQsRUFBRXNDLE1BQU0sY0FBUixFQUF3QkMsTUFBTSxTQUE5QixFQUF5Q2lHLE9BQU8sUUFBaEQsRUFKUyxDQUFiOztBQU9BbkcsU0FBS1IsTUFBTCxDQUFZNEcsR0FBWixDQUFnQixHQUFoQjs7QUFFQSxTQUFLcEssSUFBTCxDQUFVcUssS0FBVixDQUFnQkMsUUFBaEIsQ0FBeUJDLGNBQXpCLEdBQTBDLFVBQUNDLENBQUQsRUFBTztBQUM3Q0MsY0FBTSxZQUFZRCxFQUFFRSxHQUFwQixFQUF5QjtBQUNyQkMsb0JBQVE7QUFEYSxTQUF6QixFQUVHQyxJQUZILENBRVEsVUFBQ0MsUUFBRCxFQUFjO0FBQ2xCLG1CQUFPQSxTQUFTQyxJQUFULEVBQVA7QUFDSCxTQUpELEVBSUdGLElBSkgsQ0FJUSxVQUFDRyxXQUFELEVBQWlCO0FBQ3JCLGtCQUFLL0ssSUFBTCxDQUFVNkUsS0FBVixDQUFnQm1HLEtBQWhCLENBQXNCLE1BQXRCLEVBQThCLElBQTlCLEVBQW9DLElBQXBDLEVBQTBDRCxXQUExQztBQUNBLGtCQUFLL0ssSUFBTCxDQUFVcUssS0FBVixDQUFnQkMsUUFBaEIsQ0FBeUJDLGNBQXpCLEdBQTBDLElBQTFDO0FBQ0gsU0FQRDtBQVNILEtBVkQ7O0FBYUFyRixZQUFRQyxHQUFSLENBQVksd0JBQVo7QUFDSDs7QUFFRHNCLE9BQU9DLE9BQVAsR0FBaUJGLE1BQWpCLEM7Ozs7Ozs7Ozs7Ozs7QUMvQkE7Ozs7QUFDQTs7Ozs7O0FBRUEsU0FBU0EsTUFBVCxHQUFpQjtBQUFBOztBQUNidEIsWUFBUUMsR0FBUixDQUFZLDZCQUFaO0FBQ0E7QUFDQSxTQUFLbkYsSUFBTCxDQUFVOEYsSUFBVixDQUFlb0UsY0FBZixHQUFnQyxJQUFoQzs7QUFFQTtBQUNBLFNBQUtsSyxJQUFMLENBQVVpTCxLQUFWLENBQWdCQyxTQUFoQixDQUNJLENBREosRUFFSSxDQUZKLEVBR0ksS0FBS3RFLFlBQUwsQ0FBa0J0RSxLQUFsQixHQUEwQixLQUFLc0UsWUFBTCxDQUFrQmEsTUFIaEQsRUFJSSxLQUFLYixZQUFMLENBQWtCakYsTUFKdEI7O0FBT0EsU0FBSzNCLElBQUwsQ0FBVW9ELE9BQVYsQ0FBa0IrSCxXQUFsQixDQUE4QjdKLE9BQU9nQyxPQUFQLENBQWVDLE1BQTdDOztBQUVBLFNBQUs2RCxXQUFMLENBQWlCZ0UsZ0JBQWpCLENBQWtDLGlCQUFsQztBQUNBLFNBQUtoRSxXQUFMLENBQWlCaUUsV0FBakIsQ0FDSSxLQUFLTixXQUFMLENBQWlCN0QsT0FEckIsRUFFSSxLQUFLNkQsV0FBTCxDQUFpQk8sT0FGckIsRUFHSSxLQUFLUCxXQUFMLENBQWlCUSxZQUhyQjtBQUtBLFNBQUtuRSxXQUFMLENBQWlCb0UsWUFBakIsQ0FBOEIsS0FBS1QsV0FBTCxDQUFpQlUsTUFBL0M7O0FBRUE7QUFDQSxTQUFLMUUsS0FBTCxDQUFXQyxlQUFYLENBQTJCMEUsYUFBM0IsR0FBMkMsS0FBS1gsV0FBTCxDQUFpQlksZUFBNUQ7QUFDQSxTQUFLNUUsS0FBTCxDQUFXRSxXQUFYLENBQXVCMkUsV0FBdkI7O0FBRUEsU0FBS2hILFNBQUwsR0FBaUJuRSxLQUFLQyxVQUFMLENBQWdCO0FBQzdCbUwscUJBQWEsS0FEZ0I7QUFFN0JDLGVBQU87QUFGc0IsS0FBaEIsQ0FBakI7O0FBS0EsU0FBSzFHLFdBQUwsR0FBbUIzRSxLQUFLa0MsTUFBTCxDQUFZLFVBQUNzQyxNQUFELEVBQVk7QUFDdkMsY0FBS0wsU0FBTCxHQUFpQjlDLE9BQU91RCxNQUFQLENBQWMsTUFBS1QsU0FBbkIsRUFBOEJLLE1BQTlCLENBQWpCO0FBQ0gsS0FGa0IsQ0FBbkI7O0FBSUF4RSxTQUFLdUUsT0FBTCxDQUFhLEtBQUtKLFNBQWxCLEVBQTZCLGtCQUFVO0FBQ25DTSxnQkFBUUMsR0FBUixDQUFZLG9CQUFaLEVBQWtDRixNQUFsQyxFQUEwQyxNQUFLTCxTQUEvQztBQUNILEtBRkQ7O0FBSUEsU0FBS1EsV0FBTCxDQUFpQixFQUFFeUcsYUFBYSxJQUFmLEVBQWpCOztBQUVBO0FBQ0EsU0FBS2hGLE1BQUwsR0FBYyxvQkFDVixLQUFLN0csSUFESyxFQUVWLEtBQUsrSyxXQUFMLENBQWlCZ0IsVUFBakIsQ0FBNEI5TCxDQUZsQixFQUdWLEtBQUs4SyxXQUFMLENBQWlCZ0IsVUFBakIsQ0FBNEI3TCxDQUhsQixFQUlWLEtBQUswRyxZQUFMLENBQWtCbUIsZ0JBSlIsRUFLVixLQUFLWixjQUFMLENBQW9CMkIsR0FMVixDQUFkOztBQVFBO0FBQ0EsU0FBS2tELE9BQUwsR0FBZSxJQUFJMUssT0FBTzJLLEtBQVgsQ0FBaUIsS0FBS2pNLElBQXRCLENBQWY7QUFDQSxTQUFLK0ssV0FBTCxDQUFpQmlCLE9BQWpCLENBQXlCakosT0FBekIsQ0FBaUMsS0FBS3NFLGVBQUwsQ0FBcUJiLE1BQXREOztBQUVBLFNBQUt4RyxJQUFMLENBQVVrTSxNQUFWLENBQWlCQyxNQUFqQixDQUF3QixLQUFLdEYsTUFBN0I7O0FBRUE7QUFDQSxTQUFLOUUsSUFBTCxHQUFZLEtBQUsvQixJQUFMLENBQVVxSyxLQUFWLENBQWdCQyxRQUFoQixDQUF5QjhCLGdCQUF6QixFQUFaO0FBQ0EsU0FBS3JLLElBQUwsQ0FBVXNLLEtBQVYsR0FBa0IsS0FBS3JNLElBQUwsQ0FBVXFLLEtBQVYsQ0FBZ0JDLFFBQWhCLENBQXlCZ0MsTUFBekIsQ0FBZ0NoTCxPQUFPaUwsUUFBUCxDQUFnQkMsUUFBaEQsQ0FBbEI7O0FBRUE7QUFDQSxTQUFLQyxJQUFMLEdBQVksS0FBS3pNLElBQUwsQ0FBVWtELEdBQVYsQ0FBY2MsSUFBZCxDQUNSLEtBQUs0QyxZQUFMLENBQWtCdEUsS0FBbEIsR0FBMEIsR0FEbEIsRUFFUixDQUZRLEVBR1IsV0FBVyxLQUFLdUUsTUFBTCxDQUFZckcsV0FBWixDQUF3QkcsSUFIM0IsRUFJUixFQUFFc0QsTUFBTSxjQUFSLEVBQXdCQyxNQUFNLE1BQTlCLEVBQXNDaUcsT0FBTyxRQUE3QyxFQUpRLENBQVo7QUFNQSxTQUFLc0MsSUFBTCxDQUFVZixhQUFWLEdBQTBCLElBQTFCO0FBQ0FqTCxTQUFLdUUsT0FBTCxDQUFhLEtBQUs2QixNQUFMLENBQVlyRyxXQUF6QixFQUFzQyxrQkFBVTtBQUM1QyxjQUFLaU0sSUFBTCxDQUFVdkcsT0FBVixDQUFrQixXQUFXLE1BQUtXLE1BQUwsQ0FBWXJHLFdBQVosQ0FBd0JHLElBQXJEO0FBQ0gsS0FGRDtBQUdIOztrQkFFYzZGLE07Ozs7Ozs7Ozs7OztBQzdFZixTQUFTYyxJQUFULENBQWN5RCxXQUFkLEVBQTBCO0FBQ3RCN0YsWUFBUUMsR0FBUixDQUFZLDJCQUFaLEVBQXlDNEYsV0FBekM7QUFDQSxTQUFLQSxXQUFMLEdBQW1CQSxXQUFuQjtBQUNIOztrQkFFY3pELEk7Ozs7Ozs7Ozs7OztBQ0xmLFNBQVNDLE9BQVQsR0FBa0I7QUFDZHJDLFlBQVFDLEdBQVIsQ0FBWSw4QkFBWjs7QUFFQTtBQUNBLFNBQUtuRixJQUFMLENBQVUwTSxJQUFWLENBQWVDLEtBQWYsQ0FDSSxXQURKLEVBRUksNEJBRkosRUFHSSw2QkFISixFQUlJckwsT0FBT3NMLE1BQVAsQ0FBY0MsdUJBSmxCOztBQU9BO0FBQ0EsU0FBSzdNLElBQUwsQ0FBVTBNLElBQVYsQ0FBZXpELEtBQWYsQ0FBcUIsS0FBSzhCLFdBQUwsQ0FBaUIrQixhQUF0QyxFQUFxRCxLQUFLbEcsWUFBTCxDQUFrQmUsY0FBbEIsR0FBbUMsS0FBS29ELFdBQUwsQ0FBaUJnQyxlQUFwRCxHQUFzRSxLQUFLaEMsV0FBTCxDQUFpQmlDLHdCQUE1STtBQUNBO0FBQ0EsU0FBS2hOLElBQUwsQ0FBVTBNLElBQVYsQ0FBZXpELEtBQWYsQ0FBcUIsS0FBSzhCLFdBQUwsQ0FBaUJPLE9BQXRDLEVBQStDLEtBQUsxRSxZQUFMLENBQWtCZ0IsV0FBbEIsR0FBZ0MsS0FBS21ELFdBQUwsQ0FBaUJRLFlBQWpELEdBQWdFLEtBQUtSLFdBQUwsQ0FBaUJrQyxxQkFBaEk7QUFDQTtBQUNBLFNBQUtqTixJQUFMLENBQVUwTSxJQUFWLENBQWV4RixPQUFmLENBQXVCLEtBQUs2RCxXQUFMLENBQWlCN0QsT0FBeEMsRUFBaUQsS0FBS04sWUFBTCxDQUFrQmlCLFNBQWxCLEdBQThCLEtBQUtrRCxXQUFMLENBQWlCbUMsU0FBaEcsRUFBMkcsSUFBM0csRUFBaUg1TCxPQUFPNkwsT0FBUCxDQUFlQyxVQUFoSTtBQUVIOztrQkFFYzdGLE87Ozs7Ozs7Ozs7OztBQ3BCZixTQUFTQyxNQUFULEdBQWlCO0FBQUE7O0FBQ2I7QUFDQTtBQUNBLFNBQUt4SCxJQUFMLENBQVVxTixLQUFWLENBQWdCckosSUFBaEIsQ0FBcUIsS0FBS2hFLElBQUwsQ0FBVThGLElBQVYsQ0FBZXBCLEdBQXBDLEVBQXlDLENBQXpDLEVBQTRDLEVBQTVDOztBQUVBO0FBQ0EsU0FBSzFFLElBQUwsQ0FBVW9ELE9BQVYsQ0FBa0JrSyxNQUFsQixDQUF5QjlFLE9BQXpCLENBQWlDLEtBQUszQixNQUF0QyxFQUE4QyxLQUFLRSxLQUFMLENBQVd3RyxjQUF6RDs7QUFFQSxTQUFLdk4sSUFBTCxDQUFVb0QsT0FBVixDQUFrQmtLLE1BQWxCLENBQXlCOUUsT0FBekIsQ0FBaUMsS0FBS3dELE9BQXRDLEVBQStDLEtBQUtqRixLQUFMLENBQVd3RyxjQUExRDs7QUFFQSxTQUFLdk4sSUFBTCxDQUFVb0QsT0FBVixDQUFrQmtLLE1BQWxCLENBQXlCRSxPQUF6QixDQUFpQyxLQUFLM0csTUFBdEMsRUFBOEMsS0FBS21GLE9BQW5ELEVBQTRELFVBQUNuRixNQUFELEVBQVNDLEtBQVQsRUFBbUI7QUFDM0UsWUFBRyxNQUFLRCxNQUFMLENBQVk5RixJQUFaLENBQWlCNEUsUUFBakIsQ0FBMEJDLElBQTFCLElBQWtDa0IsTUFBTS9GLElBQU4sQ0FBVzRFLFFBQVgsQ0FBb0I4SCxFQUF6RCxFQUE0RDtBQUN4RDtBQUNIO0FBQ0QsWUFBRyxDQUFDLE1BQUs1RyxNQUFMLENBQVk2RyxTQUFiLElBQTBCLENBQUMsTUFBSzdHLE1BQUwsQ0FBWThHLFNBQTFDLEVBQW9EO0FBQ2hELGtCQUFLOUcsTUFBTCxDQUFZekIsV0FBWixDQUF3QjtBQUNwQnpFLHNCQUFNLE1BQUtrRyxNQUFMLENBQVlyRyxXQUFaLENBQXdCRyxJQUF4QixHQUErQixDQURqQjtBQUVwQkMsc0JBQU0sTUFBS1osSUFBTCxDQUFVOEYsSUFBVixDQUFlQyxHQUFmLEdBQXFCO0FBRlAsYUFBeEI7QUFJQSxrQkFBS2MsTUFBTCxDQUFZK0csSUFBWixDQUFpQjlHLE1BQU0vRixJQUFOLENBQVc0RSxRQUE1QjtBQUNIO0FBQ0osS0FYRDs7QUFhQTtBQUNBa0ksZUFBV2pMLElBQVgsQ0FBZ0IsSUFBaEI7QUFDSDs7QUFFRCxTQUFTaUwsVUFBVCxHQUFxQjtBQUNqQjtBQUNBLFFBQUcsS0FBS2hILE1BQUwsQ0FBWThHLFNBQWYsRUFBeUI7QUFDckIsYUFBSzlHLE1BQUwsQ0FBWWhFLFVBQVosQ0FBdUJDLElBQXZCLENBQTRCLE1BQTVCO0FBQ0E7QUFDSDs7QUFFRDtBQUNBLFFBQUcsS0FBS2YsSUFBTCxDQUFVZCxJQUFWLENBQWU2TSxNQUFsQixFQUF5QjtBQUNyQixhQUFLakgsTUFBTCxDQUFZbkIsUUFBWjtBQUNBLGFBQUttQixNQUFMLENBQVloRSxVQUFaLENBQXVCQyxJQUF2QixDQUE0QixNQUE1QjtBQUNILEtBSEQsTUFHTyxJQUFHLEtBQUtmLElBQUwsQ0FBVWIsS0FBVixDQUFnQjRNLE1BQW5CLEVBQTBCO0FBQzdCLGFBQUtqSCxNQUFMLENBQVlwQixTQUFaO0FBQ0EsYUFBS29CLE1BQUwsQ0FBWWhFLFVBQVosQ0FBdUJDLElBQXZCLENBQTRCLE1BQTVCO0FBQ0gsS0FITSxNQUdBO0FBQ0gsYUFBSytELE1BQUwsQ0FBWWtILElBQVo7QUFDQSxhQUFLbEgsTUFBTCxDQUFZaEUsVUFBWixDQUF1QkMsSUFBdkIsQ0FBNEIsTUFBNUI7QUFDSDs7QUFFRDtBQUNBLFFBQUcsS0FBS2YsSUFBTCxDQUFVMEwsRUFBVixDQUFhSyxNQUFoQixFQUF1QjtBQUNuQixhQUFLakgsTUFBTCxDQUFZbUgsSUFBWjtBQUNBLGFBQUtuSCxNQUFMLENBQVloRSxVQUFaLENBQXVCQyxJQUF2QixDQUE0QixNQUE1QjtBQUNIOztBQUVEO0FBQ0EsUUFBRyxLQUFLZixJQUFMLENBQVVzSyxLQUFWLENBQWdCeUIsTUFBbkIsRUFBMEI7QUFDdEIsWUFBRyxLQUFLakgsTUFBTCxDQUFZckcsV0FBWixDQUF3Qk0sS0FBeEIsR0FBZ0MsS0FBS2QsSUFBTCxDQUFVOEYsSUFBVixDQUFlQyxHQUEvQyxJQUFzRCxLQUFLYyxNQUFMLENBQVlyRyxXQUFaLENBQXdCSyxHQUF4QixHQUE4QixLQUFLYixJQUFMLENBQVU4RixJQUFWLENBQWVDLEdBQXRHLEVBQTBHO0FBQ3RHLGlCQUFLYyxNQUFMLENBQVloRyxHQUFaO0FBQ0EsaUJBQUtnRyxNQUFMLENBQVloRSxVQUFaLENBQXVCQyxJQUF2QixDQUE0QixLQUE1QjtBQUNIO0FBQ0o7QUFDSjs7a0JBRWMwRSxNOzs7Ozs7Ozs7QUM3RGY7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBLElBQU15RyxhQUFhLElBQUkzTSxPQUFPNE0sSUFBWCxDQUNmLHVCQUFhNUwsS0FERSxFQUVmLHVCQUFhWCxNQUZFLEVBR2ZMLE9BQU82TSxJQUhRLEVBSWYsdUJBQWF6RyxVQUpFLENBQW5COztBQU9BO0FBQ0F1RyxXQUFXcEosS0FBWCxDQUFpQjNCLEdBQWpCLENBQXFCLE1BQXJCLEVBQTZCLGdCQUFLa0wsSUFBTCxDQUFVLElBQVYseUJBQTdCO0FBQ0FILFdBQVdwSixLQUFYLENBQWlCM0IsR0FBakIsQ0FBcUIsTUFBckIsRUFBNkIsZ0JBQUtrTCxJQUFMLENBQVUsSUFBVix5QkFBN0I7O0FBRUFILFdBQVdwSixLQUFYLENBQWlCbUcsS0FBakIsQ0FBdUIsTUFBdkIsRUFBK0IsSUFBL0IsRUFBcUMsSUFBckMsRTs7Ozs7Ozs7Ozs7OztBQ2hCQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBRUEsU0FBUzNELGVBQVQsR0FBMkI7QUFBQTs7QUFDdkIsUUFBTWdILFdBQVc7QUFDYmhGLDBCQURhO0FBRWJMLDRCQUZhO0FBR2JVLDBCQUhhO0FBSWJYLDRCQUphO0FBS2JLLHNDQUxhO0FBTWJPLDRCQU5hO0FBT2JHLGtDQVBhO0FBUWJMLGdDQVJhO0FBU2JJLDhCQVRhO0FBVWJOLGdDQVZhO0FBV2JDLGdDQVhhO0FBWWJMLDhCQVphO0FBYWJHLGdDQWJhO0FBY2JKLDhCQWRhO0FBZWJVO0FBZmEsS0FBakI7O0FBa0JBLFdBQU87QUFDSHBELGdCQUFRLGdCQUFDdUUsV0FBRCxFQUFpQjtBQUNyQixnQkFBTWpFLFFBQVEsaUJBQ1YsTUFBSzlHLElBREssRUFFVitLLFlBQVl1RCxNQUFaLENBQW1Cck8sQ0FGVCxFQUdWOEssWUFBWXVELE1BQVosQ0FBbUJwTyxDQUhULEVBSVYsTUFBSzBHLFlBQUwsQ0FBa0JtQixnQkFKUixFQUtWLE1BQUtaLGNBQUwsQ0FBb0I0RCxZQUFZeEssSUFBaEMsQ0FMVSxFQU1WLE1BQUs0RyxjQUFMLENBQW9CNEQsWUFBWXhLLElBQWhDLEVBQXNDRixVQU41QixDQUFkO0FBUUF5RyxrQkFBTW9FLFNBQU4sQ0FBZ0JILFlBQVkzSixPQUE1QjtBQUNBLGtCQUFLNEssT0FBTCxDQUFhOUksR0FBYixDQUFpQjRELEtBQWpCO0FBQ0g7QUFaRSxLQUFQO0FBY0g7O2tCQUVjTyxlOzs7Ozs7Ozs7Ozs7QUNyRGYsU0FBU0QsV0FBVCxHQUF1QjtBQUFBOztBQUNuQixXQUFPO0FBQ0hnRSwwQkFBa0IsMEJBQUNtRCxTQUFELEVBQWU7QUFDN0Isa0JBQUt4SCxLQUFMLENBQVdDLGVBQVgsR0FBNkIsTUFBS2hILElBQUwsQ0FBVWtELEdBQVYsQ0FBY3NMLFVBQWQsQ0FDekIsQ0FEeUIsRUFFekIsQ0FGeUIsRUFHekIsTUFBS3pELFdBQUwsQ0FBaUJ6SSxLQUhRLEVBSXpCLE1BQUt5SSxXQUFMLENBQWlCcEosTUFKUSxFQUt6QixNQUFLb0osV0FBTCxDQUFpQitCLGFBTFEsQ0FBN0I7QUFPSCxTQVRFO0FBVUgyQixxQkFBYSxxQkFBQ0MsS0FBRCxFQUFXO0FBQ3BCLGtCQUFLM0gsS0FBTCxDQUFXMkgsS0FBWCxJQUFvQixNQUFLM0gsS0FBTCxDQUFXRyxPQUFYLENBQW1CdUgsV0FBbkIsQ0FBK0IsTUFBSzFELFdBQUwsQ0FBaUIyRCxLQUFqQixDQUEvQixDQUFwQjtBQUNILFNBWkU7QUFhSGxELHNCQUFjLHNCQUFDQyxNQUFELEVBQVk7QUFDdEIsaUJBQUksSUFBSWlELEtBQVIsSUFBaUJqRCxNQUFqQixFQUF3QjtBQUNwQixzQkFBSzFFLEtBQUwsQ0FBVzJILEtBQVgsSUFBb0IsTUFBSzNILEtBQUwsQ0FBV0csT0FBWCxDQUFtQnVILFdBQW5CLENBQStCLE1BQUsxRCxXQUFMLENBQWlCVSxNQUFqQixDQUF3QmlELEtBQXhCLEVBQStCaEUsR0FBOUQsQ0FBcEI7QUFDQSxzQkFBSzNELEtBQUwsQ0FBVzJILEtBQVgsRUFBa0J2SyxPQUFsQixHQUE0QixNQUFLNEcsV0FBTCxDQUFpQlUsTUFBakIsQ0FBd0JpRCxLQUF4QixFQUErQnZLLE9BQTNEO0FBQ0g7QUFDSixTQWxCRTtBQW1CSGtILHFCQUFhLHFCQUFDc0QsVUFBRCxFQUFhQyxVQUFiLEVBQXlCckQsWUFBekIsRUFBMEM7QUFDbkQsa0JBQUt4RSxLQUFMLENBQVdHLE9BQVgsR0FBcUIsTUFBS2xILElBQUwsQ0FBVWtELEdBQVYsQ0FBY2dFLE9BQWQsQ0FBc0J5SCxVQUF0QixDQUFyQjtBQUNBLGtCQUFLNUgsS0FBTCxDQUFXRyxPQUFYLENBQW1CMkgsZUFBbkIsQ0FBbUN0RCxZQUFuQyxFQUFpRHFELFVBQWpEO0FBQ0Esa0JBQUs3SCxLQUFMLENBQVdHLE9BQVgsQ0FBbUI0SCxtQkFBbkIsQ0FBdUMsQ0FBdkMsRUFBMEMsSUFBMUMsRUFBZ0QsSUFBaEQsRUFBc0QsTUFBSy9ELFdBQUwsQ0FBaUJVLE1BQWpCLENBQXdCOEIsY0FBeEIsQ0FBdUM3QyxHQUE3RjtBQUNBLGtCQUFLM0QsS0FBTCxDQUFXRyxPQUFYLENBQW1CNEgsbUJBQW5CLENBQXVDLENBQXZDLEVBQTBDLElBQTFDLEVBQWdELElBQWhELEVBQXNELE1BQUsvRCxXQUFMLENBQWlCVSxNQUFqQixDQUF3QnNELFVBQXhCLENBQW1DckUsR0FBekY7QUFDSDtBQXhCRSxLQUFQO0FBMEJIOztrQkFFY3RELFc7Ozs7Ozs7Ozs7Ozs7QUM3QmY7Ozs7Ozs7Ozs7OztJQUVNNEgsRzs7O0FBQ0wsY0FBWWhQLElBQVosRUFBa0JDLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QkMsTUFBeEIsRUFBZ0NDLEtBQWhDLEVBQXNDO0FBQUE7O0FBQUEsbUdBQzVCSixJQUQ0QixFQUN0QkMsQ0FEc0IsRUFDbkJDLENBRG1CLEVBQ2hCQyxNQURnQixFQUNSQyxLQURRO0FBRXJDOzs7OztrQkFHYTRPLEc7Ozs7Ozs7Ozs7Ozs7QUNSZjs7Ozs7Ozs7Ozs7O0lBRU1DLEk7OztBQUNMLGVBQVlqUCxJQUFaLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLE1BQXhCLEVBQWdDQyxLQUFoQyxFQUFzQztBQUFBOztBQUFBLHFHQUM1QkosSUFENEIsRUFDdEJDLENBRHNCLEVBQ25CQyxDQURtQixFQUNoQkMsTUFEZ0IsRUFDUkMsS0FEUTtBQUVyQzs7Ozs7a0JBR2E2TyxJOzs7Ozs7Ozs7Ozs7O0FDUmY7Ozs7Ozs7Ozs7OztJQUVNQyxHOzs7QUFDTCxjQUFZbFAsSUFBWixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCQyxNQUF4QixFQUFnQ0MsS0FBaEMsRUFBc0M7QUFBQTs7QUFBQSxtR0FDNUJKLElBRDRCLEVBQ3RCQyxDQURzQixFQUNuQkMsQ0FEbUIsRUFDaEJDLE1BRGdCLEVBQ1JDLEtBRFE7QUFFckM7Ozs7O2tCQUdhOE8sRzs7Ozs7Ozs7Ozs7OztBQ1JmOzs7Ozs7Ozs7Ozs7SUFFTUMsSTs7O0FBQ0wsZUFBWW5QLElBQVosRUFBa0JDLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QkMsTUFBeEIsRUFBZ0NDLEtBQWhDLEVBQXNDO0FBQUE7O0FBQUEscUdBQzVCSixJQUQ0QixFQUN0QkMsQ0FEc0IsRUFDbkJDLENBRG1CLEVBQ2hCQyxNQURnQixFQUNSQyxLQURRO0FBRXJDOzs7OztrQkFHYStPLEk7Ozs7Ozs7Ozs7Ozs7QUNSZjs7Ozs7Ozs7Ozs7O0lBRU1DLFM7OztBQUNMLG9CQUFZcFAsSUFBWixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCQyxNQUF4QixFQUFnQ0MsS0FBaEMsRUFBc0M7QUFBQTs7QUFBQSwrR0FDNUJKLElBRDRCLEVBQ3RCQyxDQURzQixFQUNuQkMsQ0FEbUIsRUFDaEJDLE1BRGdCLEVBQ1JDLEtBRFE7QUFFckM7Ozs7O2tCQUdhZ1AsUzs7Ozs7Ozs7Ozs7OztBQ1JmOzs7Ozs7Ozs7Ozs7SUFFTUMsSTs7O0FBQ0wsZUFBWXJQLElBQVosRUFBa0JDLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QkMsTUFBeEIsRUFBZ0NDLEtBQWhDLEVBQXNDO0FBQUE7O0FBQUEscUdBQzVCSixJQUQ0QixFQUN0QkMsQ0FEc0IsRUFDbkJDLENBRG1CLEVBQ2hCQyxNQURnQixFQUNSQyxLQURRO0FBRXJDOzs7OztrQkFHYWlQLEk7Ozs7Ozs7Ozs7Ozs7QUNSZjs7Ozs7Ozs7Ozs7O0lBRU1DLE87OztBQUNMLGtCQUFZdFAsSUFBWixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCQyxNQUF4QixFQUFnQ0MsS0FBaEMsRUFBc0M7QUFBQTs7QUFBQSwyR0FDNUJKLElBRDRCLEVBQ3RCQyxDQURzQixFQUNuQkMsQ0FEbUIsRUFDaEJDLE1BRGdCLEVBQ1JDLEtBRFE7QUFFckM7Ozs7O2tCQUdha1AsTzs7Ozs7Ozs7Ozs7OztBQ1JmOzs7Ozs7Ozs7Ozs7SUFFTUMsTTs7O0FBQ0wsaUJBQVl2UCxJQUFaLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLE1BQXhCLEVBQWdDQyxLQUFoQyxFQUFzQztBQUFBOztBQUFBLHlHQUM1QkosSUFENEIsRUFDdEJDLENBRHNCLEVBQ25CQyxDQURtQixFQUNoQkMsTUFEZ0IsRUFDUkMsS0FEUTtBQUVyQzs7Ozs7a0JBR2FtUCxNOzs7Ozs7Ozs7Ozs7O0FDUmY7Ozs7Ozs7Ozs7OztJQUVNQyxLOzs7QUFDTCxnQkFBWXhQLElBQVosRUFBa0JDLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QkMsTUFBeEIsRUFBZ0NDLEtBQWhDLEVBQXNDO0FBQUE7O0FBQUEsdUdBQzVCSixJQUQ0QixFQUN0QkMsQ0FEc0IsRUFDbkJDLENBRG1CLEVBQ2hCQyxNQURnQixFQUNSQyxLQURRO0FBRXJDOzs7OztrQkFHYW9QLEs7Ozs7Ozs7Ozs7Ozs7QUNSZjs7Ozs7Ozs7Ozs7O0lBRU1DLE07OztBQUNMLGlCQUFZelAsSUFBWixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCQyxNQUF4QixFQUFnQ0MsS0FBaEMsRUFBc0M7QUFBQTs7QUFBQSx5R0FDNUJKLElBRDRCLEVBQ3RCQyxDQURzQixFQUNuQkMsQ0FEbUIsRUFDaEJDLE1BRGdCLEVBQ1JDLEtBRFE7QUFFckM7Ozs7O2tCQUdhcVAsTTs7Ozs7Ozs7Ozs7OztBQ1JmOzs7Ozs7Ozs7Ozs7SUFFTUMsTTs7O0FBQ0wsaUJBQVkxUCxJQUFaLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLE1BQXhCLEVBQWdDQyxLQUFoQyxFQUFzQztBQUFBOztBQUFBLHlHQUM1QkosSUFENEIsRUFDdEJDLENBRHNCLEVBQ25CQyxDQURtQixFQUNoQkMsTUFEZ0IsRUFDUkMsS0FEUTtBQUVyQzs7Ozs7a0JBR2FzUCxNOzs7Ozs7Ozs7Ozs7O0FDUmY7Ozs7Ozs7Ozs7OztJQUVNQyxLOzs7QUFDTCxnQkFBWTNQLElBQVosRUFBa0JDLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QkMsTUFBeEIsRUFBZ0NDLEtBQWhDLEVBQXNDO0FBQUE7O0FBQUEsdUdBQzVCSixJQUQ0QixFQUN0QkMsQ0FEc0IsRUFDbkJDLENBRG1CLEVBQ2hCQyxNQURnQixFQUNSQyxLQURRO0FBRXJDOzs7OztrQkFHYXVQLEs7Ozs7Ozs7Ozs7Ozs7QUNSZjs7Ozs7Ozs7Ozs7O0lBRU1DLE07OztBQUNMLGlCQUFZNVAsSUFBWixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCQyxNQUF4QixFQUFnQ0MsS0FBaEMsRUFBc0M7QUFBQTs7QUFBQSx5R0FDNUJKLElBRDRCLEVBQ3RCQyxDQURzQixFQUNuQkMsQ0FEbUIsRUFDaEJDLE1BRGdCLEVBQ1JDLEtBRFE7QUFFckM7Ozs7O2tCQUdhd1AsTTs7Ozs7Ozs7Ozs7OztBQ1JmOzs7Ozs7Ozs7Ozs7SUFFTUMsSzs7O0FBQ0wsZ0JBQVk3UCxJQUFaLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLE1BQXhCLEVBQWdDQyxLQUFoQyxFQUFzQztBQUFBOztBQUFBLHVHQUM1QkosSUFENEIsRUFDdEJDLENBRHNCLEVBQ25CQyxDQURtQixFQUNoQkMsTUFEZ0IsRUFDUkMsS0FEUTtBQUVyQzs7Ozs7a0JBR2F5UCxLOzs7Ozs7Ozs7Ozs7O0FDUmY7Ozs7Ozs7Ozs7OztJQUVNQyxNOzs7QUFDTCxpQkFBWTlQLElBQVosRUFBa0JDLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QkMsTUFBeEIsRUFBZ0NDLEtBQWhDLEVBQXNDO0FBQUE7O0FBQUEseUdBQzVCSixJQUQ0QixFQUN0QkMsQ0FEc0IsRUFDbkJDLENBRG1CLEVBQ2hCQyxNQURnQixFQUNSQyxLQURRO0FBRXJDOzs7OztrQkFHYTBQLE0iLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGJhYjZiZWE0NTE0ZGY4NThlODgyIiwiaW1wb3J0IEV4dGVuZGVkU3ByaXRlIGZyb20gJy4vRXh0ZW5kZWRTcHJpdGUnO1xyXG5cclxuY2xhc3MgQUkgZXh0ZW5kcyBFeHRlbmRlZFNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzLCBiZWhhdmlvdXJzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IGAke3Byb3BzLnR5cGV9LSR7eH0tJHt5fWA7XHJcblxyXG4gICAgICAgIHRoaXMuYmVoYXZpb3VycyA9IGJlaGF2aW91cnM7XHJcblxyXG4gICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgICAgICBsaWZlOiAxMCxcclxuICAgICAgICAgICAgc3R1bjogMCxcclxuICAgICAgICAgICAgaGl0OiAwLFxyXG4gICAgICAgICAgICBub2hpdDogMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICAgIHR1cm5JZkJsb2NrZWQoKXtcclxuICAgICAgICBpZih0aGlzLmJvZHkuYmxvY2tlZC5sZWZ0IHx8IHRoaXMuYm9keS5ibG9ja2VkLnJpZ2h0KXtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS54ICo9IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHR1cm4oKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggKj0gLTE7XHJcbiAgICB9XHJcbiAgICBzZXRCb3VuZHMoYm91bmRUbyl7XHJcbiAgICAgICAgaWYoYm91bmRUbyl7XHJcbiAgICAgICAgICAgIGlmKGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3gnKSAmJlxyXG4gICAgICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneScpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdW5kVG8gPSBuZXcgUGhhc2VyLlBvaW50KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEBSZWN0YW5nbGUgeyB4MSwgeDIgfVxyXG4gICAgICAgICAgICBpZihib3VuZFRvLmhhc093blByb3BlcnR5KCd4MScpICYmXHJcbiAgICAgICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd4MicpICYmXHJcbiAgICAgICAgICAgICAgICAhYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTEnKSAmJlxyXG4gICAgICAgICAgICAgICAgIWJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3kyJykpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm91bmRUbyA9IG5ldyBQaGFzZXIuUmVjdGFuZ2xlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngyIC0gYm91bmRUby54MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHt4MSwgeTEsIHgyLCB5Mn1cclxuICAgICAgICAgICAgaWYoYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneDEnKSAmJlxyXG4gICAgICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneDInKSAmJlxyXG4gICAgICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTEnKSAmJlxyXG4gICAgICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTInKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3VuZFRvID0gbmV3IFBoYXNlci5SZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDIgLSBib3VuZFRvLngxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZFRvLnkyIC0gYm91bmRUby55MVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjaGVja0JvdW5kcygpe1xyXG4gICAgICAgIGlmKCF0aGlzLmJvdW5kVG8gfHwgIU9iamVjdC5rZXlzKHRoaXMuYm91bmRUbykubGVuZ3RoKXtcclxuICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBAUG9pbnQge3gsIHl9XHJcbiAgICAgICAgaWYoIXRoaXMuYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSAmJlxyXG4gICAgICAgICAgICAhUGhhc2VyLlJlY3RhbmdsZS5jb250YWluc1BvaW50KHRoaXMuZ2V0Qm91bmRzKCksIHRoaXMuYm91bmRUbykgJiZcclxuICAgICAgICAgICAgKCh0aGlzLnggPCB0aGlzLmJvdW5kVG8ueCAmJiAhdGhpcy5mYWNpbmdSaWdodCkgfHxcclxuICAgICAgICAgICAgKHRoaXMueCA+IHRoaXMuYm91bmRUby54ICYmIHRoaXMuZmFjaW5nUmlnaHQpKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1cm4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEBSZWN0YW5nbGUge3gxLCB4Mn0gb3Ige3gxLCB5MSwgeDIsIHkyfVxyXG4gICAgICAgIGlmKHRoaXMuYm91bmRUbyAmJlxyXG4gICAgICAgICAgICB0aGlzLmJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3dpZHRoJykgJiZcclxuICAgICAgICAgICAgKHRoaXMueCA8IHRoaXMuYm91bmRUby54ICYmIHRoaXMuZmFjaW5nTGVmdCB8fFxyXG4gICAgICAgICAgICB0aGlzLnggPiB0aGlzLmJvdW5kVG8ueCArIHRoaXMuYm91bmRUby53aWR0aCAmJiB0aGlzLmZhY2luZ1JpZ2h0KSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1cm4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB3aGVuKHBhcmFtcykge1xyXG5cdFx0aWYoTWF0aC5yYW5kb20oKSA8IHBhcmFtcy5wcm9iYWJpbGl0eSl7XHJcblx0XHRcdHRoaXNbcGFyYW1zLmFjdGlvbl0gJiYgdGhpc1twYXJhbXMuYWN0aW9uXS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cdH1cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIC8vY29uc3QgZGVidWdCb3VuZHMgPSB0aGlzLmlkKydcXG4nKyAodGhpcy5ib3VuZFRvICYmIE9iamVjdC5rZXlzKHRoaXMuYm91bmRUbykubGVuZ3RoICYmIHRoaXMuYm91bmRUby54KSArJ1xcbicrICh0aGlzLnggfCAwKTtcclxuICAgICAgICAvL3RoaXMuZGVidWcoZGVidWdCb3VuZHMpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdtb3ZlJyk7XHJcbiAgICAgICAgdGhpcy5iZWhhdmlvdXJzLmZvckVhY2goKGJlaGF2aW91cikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzW2JlaGF2aW91ci5hY3Rpb25dICYmIHRoaXNbYmVoYXZpb3VyLmFjdGlvbl0uY2FsbCh0aGlzLCBiZWhhdmlvdXIucGFyYW1zKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQUk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9BSS5qcyIsImNsYXNzIEV4dGVuZGVkU3ByaXRlIGV4dGVuZHMgUGhhc2VyLlNwcml0ZXtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHMgfHwgeyBhbmltYXRpb25zOiBbXSB9O1xyXG4gICAgICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41LCAxKTtcclxuICAgICAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub3V0T2ZCb3VuZHNLaWxsID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gdGhpcy5wcm9wcy5ncmF2aXR5O1xyXG4gICAgICAgIHRoaXMuX2RlYnVnVGV4dCA9IHRoaXMuYWRkQ2hpbGQoXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGQudGV4dCgyMCwgLTIwLCAnZGVidWcnLCB7IGZvbnQ6IFwiMTJweCBDb3VyaWVyXCIsIGZpbGw6IFwiI2ZmZmZmZlwiIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLl9kZWJ1Z1RleHQudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnByb3BzLmFuaW1hdGlvbnMuZm9yRWFjaChhbmltYXRpb24gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24uZnJhbWVzLm1hcChmcmFtZSA9PiBmcmFtZS50b1N0cmluZygpKSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcHMsXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ubG9vcFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBnYW1lU3RhdGUgPSB0aGlzLmdhbWUuc3RhdGUuc3RhdGVzW3RoaXMuZ2FtZS5zdGF0ZS5jdXJyZW50XS5nYW1lU3RhdGU7XHJcblxyXG4gICAgICAgIG1vYngub2JzZXJ2ZShnYW1lU3RhdGUsIChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZScsIGNoYW5nZSwgZ2FtZVN0YXRlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSA9IG1vYnguYWN0aW9uKChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IE9iamVjdC5hc3NpZ24odGhpcy5zcHJpdGVTdGF0ZSwgY2hhbmdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNIaXR0aW5nKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlU3RhdGUuaGl0ID4gdGhpcy5nYW1lLnRpbWUubm93O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc1N0dW5uZWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcHJpdGVTdGF0ZS5zdHVuID4gdGhpcy5nYW1lLnRpbWUubm93O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBmYWNpbmdSaWdodCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBmYWNpbmdMZWZ0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCA8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUxlZnQoKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSAtMTtcclxuICAgICAgICBpZih0aGlzLmJvZHkudmVsb2NpdHkueCA+IC10aGlzLnByb3BzLm1heFNwZWVkKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggLT0gdGhpcy5wcm9wcy5hY2NlbGVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVSaWdodCgpe1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IDE7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnZlbG9jaXR5LnggPCB0aGlzLnByb3BzLm1heFNwZWVkKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggKz0gdGhpcy5wcm9wcy5hY2NlbGVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmUoKXtcclxuICAgICAgICBpZih0aGlzLnNjYWxlLnggPT09IDEpe1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVSaWdodCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUxlZnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcCgpe1xyXG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC89IDEuMTtcclxuICAgIH1cclxuXHJcbiAgICBqdW1wKCl7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnRvdWNoaW5nLmRvd24gfHwgdGhpcy5ib2R5LmJsb2NrZWQuZG93bil7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55IC09IDMwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGl0KCl7XHJcbiAgICAgICAgY29uc3QgaGl0VW50aWwgPSB0aGlzLmdhbWUudGltZS5ub3cgKyA5MDAsXHJcbiAgICAgICAgICAgIGJyZWFrVW50aWwgPSB0aGlzLmdhbWUudGltZS5ub3cgKyAxMDAwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdOb3cgJXMgSGl0ICVzIEJyZWFrICVzJywgdGhpcy5nYW1lLnRpbWUubm93LCBoaXRVbnRpbCwgYnJlYWtVbnRpbCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgIGhpdDogaGl0VW50aWwsXHJcbiAgICAgICAgICAgIG5vaGl0OiBicmVha1VudGlsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaHVydChkaXJlY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55IC09IDEwMDtcclxuICAgICAgICBpZihkaXJlY3Rpb24gJiYgZGlyZWN0aW9uLmxlZnQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAtPSAxMDAgfHwgdGhpcy5wcm9wcy5tYXhTcGVlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uICYmIGRpcmVjdGlvbi5yaWdodCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ICs9IDEwMCB8fCB0aGlzLnByb3BzLm1heFNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWJ1Zyh0ZXh0KXtcclxuICAgICAgIHRoaXMuX2RlYnVnVGV4dC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgIHRoaXMuX2RlYnVnVGV4dC5zY2FsZS54ID0gdGhpcy5zY2FsZS54O1xyXG4gICAgICAgdGhpcy5fZGVidWdUZXh0LnNldFRleHQodGV4dC50b1N0cmluZygpIHx8ICcnKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdbU3ByaXRlXSBzdGF0ZScpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXh0ZW5kZWRTcHJpdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsImltcG9ydCBFeHRlbmRlZFNwcml0ZSBmcm9tICcuL0V4dGVuZGVkU3ByaXRlJztcclxuXHJcbmNsYXNzIEh1bWFuIGV4dGVuZHMgRXh0ZW5kZWRTcHJpdGUge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgICAgICBsaWZlOiAxMCxcclxuICAgICAgICAgICAgc3R1bjogMCxcclxuICAgICAgICAgICAgaGl0OiAwLFxyXG4gICAgICAgICAgICBub2hpdDogMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIdW1hbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0h1bWFuLmpzIiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuL21lbnUuY3JlYXRlJztcclxuLy9pbXBvcnQgdXBkYXRlIGZyb20gJy4vcGxheS51cGRhdGUnO1xyXG5cclxuY2xhc3MgTWVudSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmtleXMgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbk1lbnUucHJvdG90eXBlLmNyZWF0ZSA9IGNyZWF0ZTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWVudTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL21lbnUvaW5kZXguanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9BSSc7XG5pbXBvcnQgSHVtYW4gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9IdW1hbic7XG5cbmltcG9ydCBsZXZlbExvYWRlciBmcm9tICcuLi8uLi9zZXJ2aWNlcy9sZXZlbExvYWRlcic7XG5pbXBvcnQgY3JlYXR1cmVGYWN0b3J5IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NyZWF0dXJlRmFjdG9yeSc7XG5pbXBvcnQgY3JlYXR1cmVDb25maWcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jcmVhdHVyZWNvbmZpZyc7XG5cbmltcG9ydCBpbml0IGZyb20gJy4vcGxheS5pbml0JztcbmltcG9ydCBwcmVsb2FkIGZyb20gJy4vcGxheS5wcmVsb2FkJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLi9wbGF5LmNyZWF0ZSc7XG5pbXBvcnQgdXBkYXRlIGZyb20gJy4vcGxheS51cGRhdGUnO1xuXHJcbmNsYXNzIFBsYXkge1xyXG4gICAgY29uc3RydWN0b3IoZ2xvYmFsQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5rZXlzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZW5lbXkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5sZXZlbCA9IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZExheWVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGdyb3VuZExheWVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHRpbGVtYXA6IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnID0gZ2xvYmFsQ29uZmlnO1xyXG4gICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWcgPSBjcmVhdHVyZUNvbmZpZztcclxuICAgICAgICB0aGlzLmxldmVsTG9hZGVyID0gbGV2ZWxMb2FkZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICB0aGlzLmNyZWF0dXJlRmFjdG9yeSA9IGNyZWF0dXJlRmFjdG9yeS5jYWxsKHRoaXMpO1xyXG4gICAgfVxyXG59XG5cblBsYXkucHJvdG90eXBlLmluaXQgPSBpbml0O1xuUGxheS5wcm90b3R5cGUucHJlbG9hZCA9IHByZWxvYWQ7XHJcblBsYXkucHJvdG90eXBlLmNyZWF0ZSA9IGNyZWF0ZTtcclxuUGxheS5wcm90b3R5cGUudXBkYXRlID0gdXBkYXRlO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9pbmRleC5qcyIsImNvbnN0IGdsb2JhbENvbmZpZyA9IHtcclxuICAgIHdpZHRoOiA1NDYsXHJcbiAgICBoZWlnaHQ6IDM2OCxcclxuICAgIGJsb2NrczogMyxcclxuICAgIGRvbUVsZW1lbnQ6ICdnYW1lJyxcclxuICAgIGJhY2tncm91bmRQYXRoOiAnYmFja2dyb3VuZHMvJyxcclxuICAgIHRpbGVzZXRQYXRoOiAndGlsZXNldHMvJyxcclxuICAgIGxldmVsUGF0aDogJ2xldmVscy8nLFxyXG4gICAgdGV4dHVyZUF0bGFzUGF0aDogJ3Nwcml0ZXNoZWV0cy8nLFxyXG4gICAgdGV4dHVyZUF0bGFzTmFtZTogJ3ByZTJhdGxhcycsXHJcbiAgICB0ZXh0dXJlQXRsYXNJbWFnZTogJ3ByZTJhdGxhcy5wbmcnLFxyXG4gICAgdGV4dHVyZUF0bGFzSnNvbjogJ3ByZTJhdGxhcy5qc29uJ1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2xvYmFsQ29uZmlnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dsb2JhbENvbmZpZy5qcyIsInZhciBjcmVhdHVyZUNvbmZpZ3MgPSB7XHJcbiAgY3JlYXR1cmVEZWZhdWx0czoge1xyXG4gICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgZ3Jhdml0eTogNTAwLFxyXG4gICAgYm91bmNlOiAwLjIsXHJcbiAgICBtYXNzOiAxLFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDEwMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgbGl2ZXM6IDEsXHJcbiAgICBsaWZlc3BhbjogSW5maW5pdHksXHJcbiAgICBzZW5zZTogMTUwLFxyXG4gICAgYW5pbWF0aW9uczogW10sXHJcbiAgICB0aW1lT2Y6IHtcclxuICAgICAgJ21vdmUnOiAyMDAsXHJcbiAgICAgICdoaXQnOiAxMDAsXHJcbiAgICAgICdodXJ0JzogNTAwLFxyXG4gICAgICAnc3RvcCc6IDIwMCxcclxuICAgICAgJ2lkbGUnOiAxMFxyXG4gICAgfSxcclxuICAgIGJvdW5kVG8gOiB7fSxcclxuICAgIGJlaGF2aW91cnM6IFtcclxuICAgICAgICB7IGFjdGlvbjogJ3R1cm5JZkJsb2NrZWQnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdtb3ZlJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnY2hlY2tCb3VuZHMnIH1cclxuICAgIF1cclxuICB9LFxyXG4gIG1hbjoge1xyXG4gICAgdHlwZTogJ21hbicsXHJcbiAgICBtYXhTcGVlZDogMjAwLFxyXG4gICAgbGl2ZXM6IDgsXHJcbiAgICBsaWZlc3BhbjogSW5maW5pdHksXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFsxMSwnMDMnLCcwNScsMTQsMjBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdoaXQnLCBmcmFtZXM6IFsyMiwyNCwyOCwzMSwzNCwyMiwyNCwyOCwzMSwzNF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3RvcCcsIGZyYW1lczogWzQyLDQ1LDQ5LDUyXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzE2LDQxLDQ3LDUwLDUwLDUwLDUwLDUwLDUwLDUwLDUwLDEzLDUwLDEzLDUwLDEzXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI3LDI3LDI3LDI3LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDMwLDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI3LDMwLDI3LDMwLDM1LDM2LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LCcwNycsJzA3JywnMDcnLCcwNycsJzAyJywnMDInXSwgZnBzOiA1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2h1cnQnLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3R1bicsIGZyYW1lczogWzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMTEsJzAzJywnMDUnLDE0LDIwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgZGlubzoge1xyXG4gICAgdHlwZTogJ2Rpbm8nLFxyXG4gICAgbWFzczogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiA1LFxyXG4gICAgYmVoYXZpb3VyczogW1xyXG4gICAgICAgIHsgYWN0aW9uOiAndHVybklmQmxvY2tlZCcgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ21vdmUnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdjaGVja0JvdW5kcycgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ3doZW4nLCBwYXJhbXM6IHsgcHJvYmFiaWxpdHk6IDAuMDEsIGFjdGlvbjogJ2p1bXAnIH0gfVxyXG4gICAgXSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM2MCwzNjAsMzYwLDM2MCwzNjAsMzYwLDM2MCwzNjddLCBmcHM6IDUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM2MCwzNjEsMzY0LDM2NywzNjldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszNjAsMzYxLDM2NCwzNjcsMzY5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdmYWxsJywgZnJhbWVzOiBbMzY5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNzFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzYwLDM2MSwzNjQsMzY3XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBiZWFyOiB7XHJcbiAgICB0eXBlOiAnYmVhcicsXHJcbiAgICBtYXNzOiAxLjIsXHJcbiAgICBtYXhTcGVlZDogNzUsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxNSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMyMV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMjAsMzIxLDMyNF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNjYsMzYzLDM1OCwzMTddLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszMjhdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gICdzdXBlci1iZWFyJzoge1xyXG4gICAgYWNjZWxlcmF0aW9uOiAzMCxcclxuICAgIG1heFNwZWVkOiAyMDAsXHJcbiAgICBpbWFnZTogJ3N1cGVyLWJlYXItc3ByaXRlLXJlZicsIC8vIG92ZXJyaWRlIHNwcml0ZSAoY3JlYXR1cmUgbmFtZSBieSBkZWZhdWx0KVxyXG4gICAgYW5pbWF0aW9uczogW11cclxuICB9LFxyXG4gIHRpZ2VyOiB7XHJcbiAgICB0eXBlOiAndGlnZXInLFxyXG4gICAgbWFzczogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM5MywzOTVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszOTMsMzk1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzk5LDQwMV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2ZhbGwnLCBmcmFtZXM6IFszOTldLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0MDJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzkzLDM5NV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgcHRlcm86IHtcclxuICAgIHR5cGU6ICdwdGVybycsXHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogMTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzcsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzcsNDc3XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFs0MDMsNDA0LDQwNSw0MDMsNDA0LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDA1LDQwMyw0MDQsNDA1LDQwMyw0MDQsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDA1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkZXNjZW5kJywgZnJhbWVzOiBbNDA1XSwgZnBzOiAxNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdhc2NlbmQnLCBmcmFtZXM6IFs0MDMsNDA0LDQwNV0sIGZwczogMTUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDcxXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzQwNSw0MDMsNDA0XSwgZnBzOiAxNSwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBkcmFnb25mbHk6IHtcclxuICAgIHR5cGU6ICdkcmFnb25mbHknLFxyXG4gICAgbWFzczogMC41LFxyXG4gICAgZ3Jhdml0eTogMCxcclxuICAgIGJvdW5jZTogMC4xLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IGZhbHNlLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMzNywzMzhdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMzcsMzM4XSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICd0dXJuJywgZnJhbWVzOiBbMzM5LDM0MF0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzQyXSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzMzNywzMzhdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGJhdDoge1xyXG4gICAgdHlwZTogJ2JhdCcsXHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogMjAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzUxLDM1MiwzNTEsMzUxLDM1MSwzNTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszNTcsMzU5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNjJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzU3LDM1OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgc3BpZGVyOiB7XHJcbiAgICB0eXBlOiAnc3BpZGVyJyxcclxuICAgIG1hc3M6IDAuMyxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMzNV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNjUsMzY4LDM3MCwzNzJdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMjk5LDMwMiwzMDUsMzA5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICd0dXJuJywgZnJhbWVzOiBbMzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdjbGltYicsIGZyYW1lczogWzM0MSwzNDMsMzQ1LDM0N10sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnd2FpdCcsIGZyYW1lczogWzMzMiwzMzUsMzcyXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszMjJdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBuYXRpdmU6IHtcclxuICAgIHR5cGU6ICduYXRpdmUnLFxyXG4gICAgbWF4U3BlZWQ6IDEwMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMjAsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzczXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzczLDM3NiwzNzhdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM4MF0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzczLDM3NiwzNzhdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHBhcnJvdDoge1xyXG4gICAgdHlwZTogJ3BhcnJvdCcsXHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogMTAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM5NCwzOTcsMzk4XSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzk0LDM5NywzOThdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQwMF0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzk0LDM5NywzOThdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGluc2VjdDoge1xyXG4gICAgdHlwZTogJ2luc2VjdCcsXHJcbiAgICBtYXNzOiAxLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyNSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM0OCwzNDgsMzQ4LDM0OCwzNDgsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMyMywzNDgsMzQ5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzIzLDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM0OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszMjMsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgYnVnOiB7XHJcbiAgICB0eXBlOiAnYnVnJyxcclxuICAgIG1hc3M6IDEsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDI1LFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzQ0LDM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0NCwzNDZdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzQ0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM0NCwzNDZdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGZyb2c6IHtcclxuICAgIHR5cGU6ICdmcm9nJyxcclxuICAgIG1hc3M6IDEsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAxLjUsXHJcbiAgICBqdW1waW5nOiA1MDAsXHJcbiAgICBtYXhTcGVlZDogODAsXHJcbiAgICBhY2NlbGVyYXRpb246IDQwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzI1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzI1LDMyNywzMzEsMzI1XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzMyNSwzMjcsMzMxLDMyNV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzMzNF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszMjUsMzI3LDMzMSwzMjVdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICB0dXJ0bGU6IHtcclxuICAgIHR5cGU6ICd0dXJ0bGUnLFxyXG4gICAgbWFzczogMixcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAwLjMsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzkwXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM3NywzODEsMzg0LDM4NV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM4NywzODksMzkwLDM5MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzkyXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBqZWxseToge1xyXG4gICAgdHlwZTogJ2plbGx5JyxcclxuICAgIG1hc3M6IDIsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMSxcclxuICAgIG1heFNwZWVkOiA1LFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbNDIwLDQzMyw0MzRdLCBmcHM6IDMsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbNDIwLDQzMyw0MzRdLCBmcHM6IDMsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDIwLDQzMyw0MzRdLCBmcHM6IDMsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgZ29yaWxsYToge1xyXG4gICAgdHlwZTogJ2dvcmlsbGEnLFxyXG4gICAgbWFzczogNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbNDExXSwgZnBzOiA1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2ZhbGwnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9XHJcbn07XHJcblxyXG5mb3IodmFyIGNyZWF0dXJlIGluIGNyZWF0dXJlQ29uZmlncyl7XHJcbiAgLy9jcmVhdHVyZUNvbmZpZ3NbY3JlYXR1cmVdID0gXy5tZXJnZSh7fSwgY29uZmlncy5jcmVhdHVyZURlZmF1bHRzLCBjb25maWdzW2NyZWF0dXJlXSk7XHJcbiAgdmFyIGRlZmF1bHRzID0gY3JlYXR1cmVDb25maWdzWydjcmVhdHVyZURlZmF1bHRzJ107XHJcbiAgZm9yKHZhciBwcm9wIGluIGRlZmF1bHRzKXtcclxuICAgIGlmKGNyZWF0dXJlQ29uZmlnc1tjcmVhdHVyZV1bcHJvcF0gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgIGNyZWF0dXJlQ29uZmlnc1tjcmVhdHVyZV1bcHJvcF0gPSBkZWZhdWx0c1twcm9wXTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXR1cmVDb25maWdzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVjb25maWcuanMiLCJmdW5jdGlvbiBjcmVhdGUoKXtcclxuXHJcbiAgICAvLyBmcHMgZGVidWdnaW5nXHJcbiAgICB0aGlzLmdhbWUudGltZS5hZHZhbmNlZFRpbWluZyA9IHRydWU7XHJcblxyXG4gICAgLy8gQ1RBIHRleHRcclxuICAgIGNvbnN0IHRleHQgPSB0aGlzLmdhbWUuYWRkLnRleHQoXHJcbiAgICAgICAgdGhpcy5nYW1lLndpZHRoIC8gMixcclxuICAgICAgICB0aGlzLmdhbWUuaGVpZ2h0IC8gMixcclxuICAgICAgICBcIkNob29zZSBhIGxldmVsIVxcbjEgMiAzIDQgNSA2XCIsXHJcbiAgICAgICAgeyBmb250OiBcIjI0cHggQ291cmllclwiLCBmaWxsOiBcIiNmZmZmZmZcIiwgYWxpZ246IFwiY2VudGVyXCIgfVxyXG4gICAgKTtcclxuXHJcbiAgICB0ZXh0LmFuY2hvci5zZXQoMC41KTtcclxuXHJcbiAgICB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQub25Eb3duQ2FsbGJhY2sgPSAoZSkgPT4ge1xyXG4gICAgICAgIGZldGNoKCcvbGV2ZWwvJyArIGUua2V5LCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcclxuICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIH0pLnRoZW4oKGxldmVsQ29uZmlnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnUGxheScsIHRydWUsIHRydWUsIGxldmVsQ29uZmlnKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLm9uRG93bkNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bTWVudV1bQ3JlYXRlXScpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9tZW51L21lbnUuY3JlYXRlLmpzIiwiaW1wb3J0IEh1bWFuIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSHVtYW4nO1xyXG5pbXBvcnQgQUkgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9BSSc7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGUoKXtcclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0NyZWF0ZV0nKTtcclxuICAgIC8vIGZwcyBkZWJ1Z2dpbmdcclxuICAgIHRoaXMuZ2FtZS50aW1lLmFkdmFuY2VkVGltaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBbU0VUIExFVkVMXSBzZXQgZGltZW5zaW9ucywgc3RhcnQgcGh5c2ljIHN5c3RlbVxyXG4gICAgdGhpcy5nYW1lLndvcmxkLnNldEJvdW5kcyhcclxuICAgICAgICAwLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcud2lkdGggKiB0aGlzLmdsb2JhbENvbmZpZy5ibG9ja3MsXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcuaGVpZ2h0XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcblxyXG4gICAgdGhpcy5sZXZlbExvYWRlci5jcmVhdGVCYWNrZ3JvdW5kKCdiYWNrZ3JvdW5kTGF5ZXInKTtcclxuICAgIHRoaXMubGV2ZWxMb2FkZXIuY3JlYXRlVGlsZXMoXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy50aWxlbWFwLFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcudGlsZXNldCxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXRJbWFnZVxyXG4gICAgKTtcclxuICAgIHRoaXMubGV2ZWxMb2FkZXIuY3JlYXRlTGF5ZXJzKHRoaXMubGV2ZWxDb25maWcubGF5ZXJzKTtcclxuXHJcbiAgICAvLyBbU0VUIExFVkVMXSBmaXggYmFja2dyb3VuZCwgcmVzaXplXHJcbiAgICB0aGlzLmxldmVsLmJhY2tncm91bmRMYXllci5maXhlZFRvQ2FtZXJhID0gdGhpcy5sZXZlbENvbmZpZy5maXhlZEJhY2tncm91bmQ7XHJcbiAgICB0aGlzLmxldmVsLmdyb3VuZExheWVyLnJlc2l6ZVdvcmxkKCk7XHJcblxyXG4gICAgdGhpcy5nYW1lU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgIGluaXRpYWxpc2VkOiBmYWxzZSxcclxuICAgICAgICBzY29yZTogMFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSA9IG1vYnguYWN0aW9uKChjaGFuZ2UpID0+IHtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IE9iamVjdC5hc3NpZ24odGhpcy5nYW1lU3RhdGUsIGNoYW5nZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtb2J4Lm9ic2VydmUodGhpcy5nYW1lU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tnYW1lU3RhdGVdIGNoYW5nZScsIGNoYW5nZSwgdGhpcy5nYW1lU3RhdGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7IGluaXRpYWxpc2VkOiB0cnVlIH0pO1xyXG5cclxuICAgIC8vIFtQTEFZRVJdXHJcbiAgICB0aGlzLnBsYXllciA9IG5ldyBIdW1hbihcclxuICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5lbnRyeVBvaW50LngsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5lbnRyeVBvaW50LnksXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcudGV4dHVyZUF0bGFzTmFtZSxcclxuICAgICAgICB0aGlzLmNyZWF0dXJlQ29uZmlnLm1hblxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBbRU5FTUlFU11cclxuICAgIHRoaXMuZW5lbWllcyA9IG5ldyBQaGFzZXIuR3JvdXAodGhpcy5nYW1lKTtcclxuICAgIHRoaXMubGV2ZWxDb25maWcuZW5lbWllcy5mb3JFYWNoKHRoaXMuY3JlYXR1cmVGYWN0b3J5LmNyZWF0ZSk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xyXG5cclxuICAgIC8vIGJpbmQga2V5c1xyXG4gICAgdGhpcy5rZXlzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuICAgIHRoaXMua2V5cy5zcGFjZSA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlNQQUNFQkFSKTtcclxuXHJcbiAgICAvLyBzY29yZSB0ZXh0XHJcbiAgICB0aGlzLm1lbnUgPSB0aGlzLmdhbWUuYWRkLnRleHQoXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcud2lkdGggLSAxMjAsXHJcbiAgICAgICAgMCxcclxuICAgICAgICBcIkxpZmU6IFwiICsgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSxcclxuICAgICAgICB7IGZvbnQ6IFwiMjRweCBDb3VyaWVyXCIsIGZpbGw6IFwiI2ZmZlwiLCBhbGlnbjogXCJjZW50ZXJcIiB9XHJcbiAgICApO1xyXG4gICAgdGhpcy5tZW51LmZpeGVkVG9DYW1lcmEgPSB0cnVlO1xyXG4gICAgbW9ieC5vYnNlcnZlKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgIHRoaXMubWVudS5zZXRUZXh0KFwiTGlmZTogXCIgKyB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmNyZWF0ZS5qcyIsImZ1bmN0aW9uIGluaXQobGV2ZWxDb25maWcpe1xyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bSW5pdF0nLCBsZXZlbENvbmZpZyk7XHJcbiAgICB0aGlzLmxldmVsQ29uZmlnID0gbGV2ZWxDb25maWc7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbml0O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmluaXQuanMiLCJmdW5jdGlvbiBwcmVsb2FkKCl7XHJcbiAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtQcmVsb2FkXScpO1xyXG5cclxuICAgIC8vIGFzc2V0cyB0byBsb2FkIHJlbGF0aXZlIHRvIC9hc3NldHMvLi5cclxuICAgIHRoaXMuZ2FtZS5sb2FkLmF0bGFzKFxyXG4gICAgICAgICdwcmUyYXRsYXMnLFxyXG4gICAgICAgICdzcHJpdGVzaGVldHMvcHJlMmF0bGFzLnBuZycsXHJcbiAgICAgICAgJ3Nwcml0ZXNoZWV0cy9wcmUyYXRsYXMuanNvbicsXHJcbiAgICAgICAgUGhhc2VyLkxvYWRlci5URVhUVVJFX0FUTEFTX0pTT05fSEFTSFxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBsb2FkIGJhY2tncm91bmRcclxuICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKHRoaXMubGV2ZWxDb25maWcuYmFja2dyb3VuZEtleSwgdGhpcy5nbG9iYWxDb25maWcuYmFja2dyb3VuZFBhdGggKyB0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRJbWFnZSArIHRoaXMubGV2ZWxDb25maWcuYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uKTtcclxuICAgIC8vIGxvYWQgdGlsZXNldFxyXG4gICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UodGhpcy5sZXZlbENvbmZpZy50aWxlc2V0LCB0aGlzLmdsb2JhbENvbmZpZy50aWxlc2V0UGF0aCArIHRoaXMubGV2ZWxDb25maWcudGlsZXNldEltYWdlICsgdGhpcy5sZXZlbENvbmZpZy50aWxlc2V0SW1hZ2VFeHRlbnNpb24pO1xyXG4gICAgLy8gbG9hZCB0aWxlbWFwXHJcbiAgICB0aGlzLmdhbWUubG9hZC50aWxlbWFwKHRoaXMubGV2ZWxDb25maWcudGlsZW1hcCwgdGhpcy5nbG9iYWxDb25maWcubGV2ZWxQYXRoICsgdGhpcy5sZXZlbENvbmZpZy50aWxlZEpzb24sIG51bGwsIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByZWxvYWQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkucHJlbG9hZC5qcyIsImZ1bmN0aW9uIHVwZGF0ZSgpe1xyXG4gICAgLy9jb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtVcGRhdGVdJyk7XHJcbiAgICAvLyBmcHNcclxuICAgIHRoaXMuZ2FtZS5kZWJ1Zy50ZXh0KHRoaXMuZ2FtZS50aW1lLmZwcywgNSwgMjApO1xyXG5cclxuICAgIC8vIGNvbGxpZGVcclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmxldmVsLmNvbGxpc2lvbkxheWVyKTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLmVuZW1pZXMsIHRoaXMubGV2ZWwuY29sbGlzaW9uTGF5ZXIpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMucGxheWVyLCB0aGlzLmVuZW1pZXMsIChwbGF5ZXIsIGVuZW15KSA9PiB7XHJcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIuYm9keS50b3VjaGluZy5kb3duICYmIGVuZW15LmJvZHkudG91Y2hpbmcudXApe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLnBsYXllci5pc0hpdHRpbmcgJiYgIXRoaXMucGxheWVyLmlzU3R1bm5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGxpZmU6IHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUgLSAxLFxyXG4gICAgICAgICAgICAgICAgc3R1bjogdGhpcy5nYW1lLnRpbWUubm93ICsgMTUwMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaHVydChlbmVteS5ib2R5LnRvdWNoaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBtb3ZlXHJcbiAgICBvbktleVByZXNzLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uS2V5UHJlc3MoKXtcclxuICAgIC8vIHN0dW4gPT4gYmxvY2tlZFxyXG4gICAgaWYodGhpcy5wbGF5ZXIuaXNTdHVubmVkKXtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3N0dW4nKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbW92ZSBsZWZ0IC8gcmlnaHRcclxuICAgIGlmKHRoaXMua2V5cy5sZWZ0LmlzRG93bil7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZUxlZnQoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgIH0gZWxzZSBpZih0aGlzLmtleXMucmlnaHQuaXNEb3duKXtcclxuICAgICAgICB0aGlzLnBsYXllci5tb3ZlUmlnaHQoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnaWRsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGp1bXBcclxuICAgIGlmKHRoaXMua2V5cy51cC5pc0Rvd24pe1xyXG4gICAgICAgIHRoaXMucGxheWVyLmp1bXAoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2p1bXAnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBoaXRcclxuICAgIGlmKHRoaXMua2V5cy5zcGFjZS5pc0Rvd24pe1xyXG4gICAgICAgIGlmKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLm5vaGl0IDwgdGhpcy5nYW1lLnRpbWUubm93ICYmIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmhpdCA8IHRoaXMuZ2FtZS50aW1lLm5vdyl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmhpdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2hpdCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnVwZGF0ZS5qcyIsImltcG9ydCBnbG9iYWxDb25maWcgZnJvbSAnLi9nbG9iYWxDb25maWcuanMnO1xyXG5pbXBvcnQgTWVudSBmcm9tICcuL2dhbWVzdGF0ZXMvbWVudS9pbmRleC5qcyc7XHJcbmltcG9ydCBQbGF5IGZyb20gJy4vZ2FtZXN0YXRlcy9wbGF5L2luZGV4LmpzJztcclxuXHJcbi8vIGluc3RhbnRpYXRlIGEgUGhhc2VyLkdhbWVcclxuY29uc3QgUExBVEZPUk1FUiA9IG5ldyBQaGFzZXIuR2FtZShcclxuICAgIGdsb2JhbENvbmZpZy53aWR0aCxcclxuICAgIGdsb2JhbENvbmZpZy5oZWlnaHQsXHJcbiAgICBQaGFzZXIuQVVUTyxcclxuICAgIGdsb2JhbENvbmZpZy5kb21FbGVtZW50XHJcbik7XHJcblxyXG4vLyByZWdpc3RlciBnYW1lc3RhdGVzICh3aWxsIGJlIGluc3RhbnRpYXRlZCB3LyB0aGlzLmdhbWUgYXMgMXN0IHBhcmFtLCBwYXNzIGdhbWVDb25maWcgYXMgMm5kKVxyXG5QTEFURk9STUVSLnN0YXRlLmFkZCgnTWVudScsIE1lbnUuYmluZChudWxsLCBnbG9iYWxDb25maWcpKTtcclxuUExBVEZPUk1FUi5zdGF0ZS5hZGQoJ1BsYXknLCBQbGF5LmJpbmQobnVsbCwgZ2xvYmFsQ29uZmlnKSk7XHJcblxyXG5QTEFURk9STUVSLnN0YXRlLnN0YXJ0KCdNZW51JywgdHJ1ZSwgdHJ1ZSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvaW5kZXguanMiLCJpbXBvcnQgYmF0IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2JhdC5qcyc7XHJcbmltcG9ydCBiZWFyIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2JlYXIuanMnO1xyXG5pbXBvcnQgYnVnIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyc7XHJcbmltcG9ydCBkaW5vIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Rpbm8uanMnO1xyXG5pbXBvcnQgZHJhZ29uZmx5IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2RyYWdvbmZseS5qcyc7XHJcbmltcG9ydCBmcm9nIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Zyb2cuanMnO1xyXG5pbXBvcnQgZ29yaWxsYSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9nb3JpbGxhLmpzJztcclxuaW1wb3J0IGluc2VjdCBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9pbnNlY3QuanMnO1xyXG5pbXBvcnQgamVsbHkgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvamVsbHkuanMnO1xyXG5pbXBvcnQgbmF0aXZlIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL25hdGl2ZS5qcyc7XHJcbmltcG9ydCBwYXJyb3QgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvcGFycm90LmpzJztcclxuaW1wb3J0IHB0ZXJvIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL3B0ZXJvLmpzJztcclxuaW1wb3J0IHNwaWRlciBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9zcGlkZXIuanMnO1xyXG5pbXBvcnQgdGlnZXIgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvdGlnZXIuanMnO1xyXG5pbXBvcnQgdHVydGxlIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyc7XHJcblxyXG5pbXBvcnQgQUkgZnJvbSAnLi4vY29tcG9uZW50cy9BSSc7XHJcblxyXG5mdW5jdGlvbiBjcmVhdHVyZUZhY3RvcnkoKSB7XHJcbiAgICBjb25zdCBDcmVhdHVyZSA9IHtcclxuICAgICAgICBiYXQ6IGJhdCxcclxuICAgICAgICBiZWFyOiBiZWFyLFxyXG4gICAgICAgIGJ1ZzogYnVnLFxyXG4gICAgICAgIGRpbm86IGRpbm8sXHJcbiAgICAgICAgZHJhZ29uZmx5OiBkcmFnb25mbHksXHJcbiAgICAgICAgZnJvZzogZnJvZyxcclxuICAgICAgICBnb3JpbGxhOiBnb3JpbGxhLFxyXG4gICAgICAgIGluc2VjdDogaW5zZWN0LFxyXG4gICAgICAgIGplbGx5OiBqZWxseSxcclxuICAgICAgICBuYXRpdmU6IG5hdGl2ZSxcclxuICAgICAgICBwYXJyb3Q6IHBhcnJvdCxcclxuICAgICAgICBwdGVybzogcHRlcm8sXHJcbiAgICAgICAgc3BpZGVyOiBzcGlkZXIsXHJcbiAgICAgICAgdGlnZXI6IHRpZ2VyLFxyXG4gICAgICAgIHR1cnRsZTogdHVydGxlXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlOiAobGV2ZWxDb25maWcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZW5lbXkgPSBuZXcgQUkoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgICAgICAgICBsZXZlbENvbmZpZy5vcmlnaW4ueCxcclxuICAgICAgICAgICAgICAgIGxldmVsQ29uZmlnLm9yaWdpbi55LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxDb25maWcudGV4dHVyZUF0bGFzTmFtZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWdbbGV2ZWxDb25maWcudHlwZV0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0dXJlQ29uZmlnW2xldmVsQ29uZmlnLnR5cGVdLmJlaGF2aW91cnNcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgZW5lbXkuc2V0Qm91bmRzKGxldmVsQ29uZmlnLmJvdW5kVG8pO1xyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMuYWRkKGVuZW15KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXR1cmVGYWN0b3J5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2NyZWF0dXJlRmFjdG9yeS5qcyIsImZ1bmN0aW9uIGxldmVsTG9hZGVyKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGVCYWNrZ3JvdW5kOiAobGF5ZXJOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwuYmFja2dyb3VuZExheWVyID0gdGhpcy5nYW1lLmFkZC50aWxlU3ByaXRlKFxyXG4gICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsQ29uZmlnLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRLZXlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZUxheWVyOiAobGF5ZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbFtsYXllcl0gPSB0aGlzLmxldmVsLnRpbGVtYXAuY3JlYXRlTGF5ZXIodGhpcy5sZXZlbENvbmZpZ1tsYXllcl0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlTGF5ZXJzOiAobGF5ZXJzKSA9PiB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgbGF5ZXIgaW4gbGF5ZXJzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxbbGF5ZXJdID0gdGhpcy5sZXZlbC50aWxlbWFwLmNyZWF0ZUxheWVyKHRoaXMubGV2ZWxDb25maWcubGF5ZXJzW2xheWVyXS5rZXkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbFtsYXllcl0udmlzaWJsZSA9IHRoaXMubGV2ZWxDb25maWcubGF5ZXJzW2xheWVyXS52aXNpYmxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGVUaWxlczogKHRpbGVtYXBLZXksIHRpbGVzZXRLZXksIHRpbGVzZXRJbWFnZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLnRpbGVtYXAgPSB0aGlzLmdhbWUuYWRkLnRpbGVtYXAodGlsZW1hcEtleSk7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcC5hZGRUaWxlc2V0SW1hZ2UodGlsZXNldEltYWdlLCB0aWxlc2V0S2V5KTtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC50aWxlbWFwLnNldENvbGxpc2lvbkJldHdlZW4oMCwgMzAwMCwgdHJ1ZSwgdGhpcy5sZXZlbENvbmZpZy5sYXllcnMuY29sbGlzaW9uTGF5ZXIua2V5KTtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC50aWxlbWFwLnNldENvbGxpc2lvbkJldHdlZW4oMCwgMzAwMCwgdHJ1ZSwgdGhpcy5sZXZlbENvbmZpZy5sYXllcnMuZGVhdGhMYXllci5rZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsZXZlbExvYWRlcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbExvYWRlci5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBCYXQgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmF0LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEJlYXIgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCZWFyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2JlYXIuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgQnVnIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnVnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBEaW5vIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGlubztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9kaW5vLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIERyYWdvbmZseSBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERyYWdvbmZseTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9kcmFnb25mbHkuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgRnJvZyBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZyb2c7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZnJvZy5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBHb3JpbGxhIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR29yaWxsYTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9nb3JpbGxhLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEluc2VjdCBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEluc2VjdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9pbnNlY3QuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgSmVsbHkgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBKZWxseTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9qZWxseS5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBOYXRpdmUgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOYXRpdmU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvbmF0aXZlLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIFBhcnJvdCBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhcnJvdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9wYXJyb3QuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgUHRlcm8gZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQdGVybztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9wdGVyby5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBTcGlkZXIgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcGlkZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvc3BpZGVyLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIFRpZ2VyIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGlnZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvdGlnZXIuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgVHVydGxlIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVHVydGxlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=