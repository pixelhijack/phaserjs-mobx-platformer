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
            if (!boundTo || !Object.keys(boundTo).length) {
                this.boundTo = null;
                return;
            }
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
    }, {
        key: 'checkBounds',
        value: function checkBounds() {
            if (!this.boundTo) {
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

            var debugBounds = this.id + '\n' + (this.boundTo && Object.keys(this.boundTo).length && this.boundTo.x) + '\n' + (this.x | 0);
            this.debug(debugBounds);
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
    behaviours: [{ action: 'turnIfBlocked' }, { action: 'move' }, { action: 'checkBounds' }, { action: 'when', params: { probability: 0.03, action: 'jump' } }],
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
    behaviours: [{ action: 'turnIfBlocked' }, { action: 'move' }, { action: 'checkBounds' }, { action: 'when', params: { probability: 0.02, action: 'jump' } }],
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
    behaviours: [{ action: 'turnIfBlocked' }, { action: 'move' }, { action: 'checkBounds' }, { action: 'when', params: { probability: 0.1, action: 'jump' } }],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDc4ZmEyY2Y3YWFjYjU1Mjg2NzYiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL21lbnUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9tZW51L21lbnUuY3JlYXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuY3JlYXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnByZWxvYWQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS51cGRhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2NyZWF0dXJlRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsTG9hZGVyLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmF0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmVhci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Rpbm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9kcmFnb25mbHkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9mcm9nLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZ29yaWxsYS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2luc2VjdC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2plbGx5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvbmF0aXZlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcGFycm90LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcHRlcm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9zcGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy90aWdlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyJdLCJuYW1lcyI6WyJBSSIsImdhbWUiLCJ4IiwieSIsInNwcml0ZSIsInByb3BzIiwiYmVoYXZpb3VycyIsImlkIiwidHlwZSIsInNwcml0ZVN0YXRlIiwibW9ieCIsIm9ic2VydmFibGUiLCJsaWZlIiwic3R1biIsImhpdCIsIm5vaGl0IiwiYm9keSIsImJsb2NrZWQiLCJsZWZ0IiwicmlnaHQiLCJzY2FsZSIsImJvdW5kVG8iLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiaGFzT3duUHJvcGVydHkiLCJQaGFzZXIiLCJQb2ludCIsIlJlY3RhbmdsZSIsIngxIiwieDIiLCJoZWlnaHQiLCJ5MSIsInkyIiwiY29udGFpbnNQb2ludCIsImdldEJvdW5kcyIsImZhY2luZ1JpZ2h0IiwidHVybiIsImZhY2luZ0xlZnQiLCJ3aWR0aCIsInBhcmFtcyIsIk1hdGgiLCJyYW5kb20iLCJwcm9iYWJpbGl0eSIsImFjdGlvbiIsImNhbGwiLCJkZWJ1Z0JvdW5kcyIsImRlYnVnIiwiYW5pbWF0aW9ucyIsInBsYXkiLCJmb3JFYWNoIiwiYmVoYXZpb3VyIiwiRXh0ZW5kZWRTcHJpdGUiLCJhZGQiLCJleGlzdGluZyIsInBoeXNpY3MiLCJlbmFibGUiLCJQaHlzaWNzIiwiQVJDQURFIiwiYW5jaG9yIiwic2V0VG8iLCJjb2xsaWRlV29ybGRCb3VuZHMiLCJjaGVja1dvcmxkQm91bmRzIiwib3V0T2ZCb3VuZHNLaWxsIiwiZ3Jhdml0eSIsIl9kZWJ1Z1RleHQiLCJhZGRDaGlsZCIsInRleHQiLCJmb250IiwiZmlsbCIsInZpc2libGUiLCJhbmltYXRpb24iLCJuYW1lIiwiZnJhbWVzIiwibWFwIiwiZnJhbWUiLCJ0b1N0cmluZyIsImZwcyIsImxvb3AiLCJnYW1lU3RhdGUiLCJzdGF0ZSIsInN0YXRlcyIsImN1cnJlbnQiLCJvYnNlcnZlIiwiY2hhbmdlIiwiY29uc29sZSIsImxvZyIsInVwZGF0ZVN0YXRlIiwiYXNzaWduIiwidmVsb2NpdHkiLCJtYXhTcGVlZCIsImFjY2VsZXJhdGlvbiIsIm1vdmVSaWdodCIsIm1vdmVMZWZ0IiwidG91Y2hpbmciLCJkb3duIiwiaGl0VW50aWwiLCJ0aW1lIiwibm93IiwiYnJlYWtVbnRpbCIsImRpcmVjdGlvbiIsInNldFRleHQiLCJTcHJpdGUiLCJIdW1hbiIsIk1lbnUiLCJ1bmRlZmluZWQiLCJwcm90b3R5cGUiLCJjcmVhdGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiUGxheSIsImdsb2JhbENvbmZpZyIsInBsYXllciIsImVuZW15IiwibGV2ZWwiLCJiYWNrZ3JvdW5kTGF5ZXIiLCJncm91bmRMYXllciIsInRpbGVtYXAiLCJjcmVhdHVyZUNvbmZpZyIsImxldmVsTG9hZGVyIiwiY3JlYXR1cmVGYWN0b3J5IiwiaW5pdCIsInByZWxvYWQiLCJ1cGRhdGUiLCJibG9ja3MiLCJkb21FbGVtZW50IiwiYmFja2dyb3VuZFBhdGgiLCJ0aWxlc2V0UGF0aCIsImxldmVsUGF0aCIsInRleHR1cmVBdGxhc1BhdGgiLCJ0ZXh0dXJlQXRsYXNOYW1lIiwidGV4dHVyZUF0bGFzSW1hZ2UiLCJ0ZXh0dXJlQXRsYXNKc29uIiwiY3JlYXR1cmVDb25maWdzIiwiY3JlYXR1cmVEZWZhdWx0cyIsImFjdGl2ZSIsImJvdW5jZSIsIm1hc3MiLCJqdW1waW5nIiwiY29sbGlkZSIsImxpdmVzIiwibGlmZXNwYW4iLCJJbmZpbml0eSIsInNlbnNlIiwidGltZU9mIiwibWFuIiwiZGlubyIsImJlYXIiLCJpbWFnZSIsInRpZ2VyIiwicHRlcm8iLCJkcmFnb25mbHkiLCJiYXQiLCJzcGlkZXIiLCJuYXRpdmUiLCJwYXJyb3QiLCJpbnNlY3QiLCJidWciLCJmcm9nIiwidHVydGxlIiwiamVsbHkiLCJnb3JpbGxhIiwiY3JlYXR1cmUiLCJkZWZhdWx0cyIsInByb3AiLCJhZHZhbmNlZFRpbWluZyIsImFsaWduIiwic2V0IiwiaW5wdXQiLCJrZXlib2FyZCIsIm9uRG93bkNhbGxiYWNrIiwiZSIsImZldGNoIiwia2V5IiwibWV0aG9kIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImxldmVsQ29uZmlnIiwic3RhcnQiLCJ3b3JsZCIsInNldEJvdW5kcyIsInN0YXJ0U3lzdGVtIiwiY3JlYXRlQmFja2dyb3VuZCIsImNyZWF0ZVRpbGVzIiwidGlsZXNldCIsInRpbGVzZXRJbWFnZSIsImNyZWF0ZUxheWVycyIsImxheWVycyIsImZpeGVkVG9DYW1lcmEiLCJmaXhlZEJhY2tncm91bmQiLCJyZXNpemVXb3JsZCIsImluaXRpYWxpc2VkIiwic2NvcmUiLCJlbnRyeVBvaW50IiwiZW5lbWllcyIsIkdyb3VwIiwiY2FtZXJhIiwiZm9sbG93IiwiY3JlYXRlQ3Vyc29yS2V5cyIsInNwYWNlIiwiYWRkS2V5IiwiS2V5Ym9hcmQiLCJTUEFDRUJBUiIsIm1lbnUiLCJsb2FkIiwiYXRsYXMiLCJMb2FkZXIiLCJURVhUVVJFX0FUTEFTX0pTT05fSEFTSCIsImJhY2tncm91bmRLZXkiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJiYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb24iLCJ0aWxlc2V0SW1hZ2VFeHRlbnNpb24iLCJ0aWxlZEpzb24iLCJUaWxlbWFwIiwiVElMRURfSlNPTiIsImFyY2FkZSIsImNvbGxpc2lvbkxheWVyIiwib3ZlcmxhcCIsInVwIiwiaXNIaXR0aW5nIiwiaXNTdHVubmVkIiwiaHVydCIsIm9uS2V5UHJlc3MiLCJpc0Rvd24iLCJzdG9wIiwianVtcCIsIlBMQVRGT1JNRVIiLCJHYW1lIiwiQVVUTyIsImJpbmQiLCJDcmVhdHVyZSIsIm9yaWdpbiIsImxheWVyTmFtZSIsInRpbGVTcHJpdGUiLCJjcmVhdGVMYXllciIsImxheWVyIiwidGlsZW1hcEtleSIsInRpbGVzZXRLZXkiLCJhZGRUaWxlc2V0SW1hZ2UiLCJzZXRDb2xsaXNpb25CZXR3ZWVuIiwiZGVhdGhMYXllciIsIkJhdCIsIkJlYXIiLCJCdWciLCJEaW5vIiwiRHJhZ29uZmx5IiwiRnJvZyIsIkdvcmlsbGEiLCJJbnNlY3QiLCJKZWxseSIsIk5hdGl2ZSIsIlBhcnJvdCIsIlB0ZXJvIiwiU3BpZGVyIiwiVGlnZXIiLCJUdXJ0bGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtB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ZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQ3OGZhMmNmN2FhY2I1NTI4Njc2IiwiaW1wb3J0IEV4dGVuZGVkU3ByaXRlIGZyb20gJy4vRXh0ZW5kZWRTcHJpdGUnO1xyXG5cclxuY2xhc3MgQUkgZXh0ZW5kcyBFeHRlbmRlZFNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzLCBiZWhhdmlvdXJzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IGAke3Byb3BzLnR5cGV9LSR7eH0tJHt5fWA7XHJcblxyXG4gICAgICAgIHRoaXMuYmVoYXZpb3VycyA9IGJlaGF2aW91cnM7XHJcblxyXG4gICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgICAgICBsaWZlOiAxMCxcclxuICAgICAgICAgICAgc3R1bjogMCxcclxuICAgICAgICAgICAgaGl0OiAwLFxyXG4gICAgICAgICAgICBub2hpdDogMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICAgIHR1cm5JZkJsb2NrZWQoKXtcclxuICAgICAgICBpZih0aGlzLmJvZHkuYmxvY2tlZC5sZWZ0IHx8IHRoaXMuYm9keS5ibG9ja2VkLnJpZ2h0KXtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS54ICo9IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHR1cm4oKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggKj0gLTE7XHJcbiAgICB9XHJcbiAgICBzZXRCb3VuZHMoYm91bmRUbyl7XHJcbiAgICAgICAgaWYoIWJvdW5kVG8gfHwgIU9iamVjdC5rZXlzKGJvdW5kVG8pLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm91bmRUbyA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneCcpICYmXHJcbiAgICAgICAgICAgIGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3knKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kVG8gPSBuZXcgUGhhc2VyLlBvaW50KFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueCxcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLnlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBAUmVjdGFuZ2xlIHsgeDEsIHgyIH1cclxuICAgICAgICBpZihib3VuZFRvLmhhc093blByb3BlcnR5KCd4MScpICYmXHJcbiAgICAgICAgICAgIGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3gyJykgJiZcclxuICAgICAgICAgICAgIWJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3kxJykgJiZcclxuICAgICAgICAgICAgIWJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3kyJykpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFRvID0gbmV3IFBoYXNlci5SZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby54MSxcclxuICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDIgLSBib3VuZFRvLngxLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5oZWlnaHRcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB7eDEsIHkxLCB4MiwgeTJ9XHJcbiAgICAgICAgaWYoYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneDEnKSAmJlxyXG4gICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd4MicpICYmXHJcbiAgICAgICAgICAgIGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3kxJykgJiZcclxuICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTInKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kVG8gPSBuZXcgUGhhc2VyLlJlY3RhbmdsZShcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngxLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueTEsXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby54MiAtIGJvdW5kVG8ueDEsXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby55MiAtIGJvdW5kVG8ueTFcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2hlY2tCb3VuZHMoKXtcclxuICAgICAgICBpZighdGhpcy5ib3VuZFRvKXtcclxuICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBAUG9pbnQge3gsIHl9XHJcbiAgICAgICAgaWYoIXRoaXMuYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSAmJlxyXG4gICAgICAgICAgICAhUGhhc2VyLlJlY3RhbmdsZS5jb250YWluc1BvaW50KHRoaXMuZ2V0Qm91bmRzKCksIHRoaXMuYm91bmRUbykgJiZcclxuICAgICAgICAgICAgKCh0aGlzLnggPCB0aGlzLmJvdW5kVG8ueCAmJiAhdGhpcy5mYWNpbmdSaWdodCkgfHxcclxuICAgICAgICAgICAgKHRoaXMueCA+IHRoaXMuYm91bmRUby54ICYmIHRoaXMuZmFjaW5nUmlnaHQpKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1cm4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEBSZWN0YW5nbGUge3gxLCB4Mn0gb3Ige3gxLCB5MSwgeDIsIHkyfVxyXG4gICAgICAgIGlmKHRoaXMuYm91bmRUbyAmJlxyXG4gICAgICAgICAgICB0aGlzLmJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3dpZHRoJykgJiZcclxuICAgICAgICAgICAgKHRoaXMueCA8IHRoaXMuYm91bmRUby54ICYmIHRoaXMuZmFjaW5nTGVmdCB8fFxyXG4gICAgICAgICAgICB0aGlzLnggPiB0aGlzLmJvdW5kVG8ueCArIHRoaXMuYm91bmRUby53aWR0aCAmJiB0aGlzLmZhY2luZ1JpZ2h0KSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1cm4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB3aGVuKHBhcmFtcykge1xyXG5cdFx0aWYoTWF0aC5yYW5kb20oKSA8IHBhcmFtcy5wcm9iYWJpbGl0eSl7XHJcblx0XHRcdHRoaXNbcGFyYW1zLmFjdGlvbl0gJiYgdGhpc1twYXJhbXMuYWN0aW9uXS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cdH1cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIGNvbnN0IGRlYnVnQm91bmRzID0gdGhpcy5pZCsnXFxuJysgKHRoaXMuYm91bmRUbyAmJiBPYmplY3Qua2V5cyh0aGlzLmJvdW5kVG8pLmxlbmd0aCAmJiB0aGlzLmJvdW5kVG8ueCkgKydcXG4nKyAodGhpcy54IHwgMCk7XHJcbiAgICAgICAgdGhpcy5kZWJ1ZyhkZWJ1Z0JvdW5kcyk7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgICAgICB0aGlzLmJlaGF2aW91cnMuZm9yRWFjaCgoYmVoYXZpb3VyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXNbYmVoYXZpb3VyLmFjdGlvbl0gJiYgdGhpc1tiZWhhdmlvdXIuYWN0aW9uXS5jYWxsKHRoaXMsIGJlaGF2aW91ci5wYXJhbXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBSTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwiY2xhc3MgRXh0ZW5kZWRTcHJpdGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRle1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlKTtcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wcyB8fCB7IGFuaW1hdGlvbnM6IFtdIH07XHJcbiAgICAgICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzKTtcclxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuICAgICAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUsIDEpO1xyXG4gICAgICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYm9keS5ncmF2aXR5LnkgPSB0aGlzLnByb3BzLmdyYXZpdHk7XHJcbiAgICAgICAgdGhpcy5fZGVidWdUZXh0ID0gdGhpcy5hZGRDaGlsZChcclxuICAgICAgICAgICAgdGhpcy5nYW1lLmFkZC50ZXh0KDIwLCAtMjAsICdkZWJ1ZycsIHsgZm9udDogXCIxMnB4IENvdXJpZXJcIiwgZmlsbDogXCIjZmZmZmZmXCIgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuX2RlYnVnVGV4dC52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcHMuYW5pbWF0aW9ucy5mb3JFYWNoKGFuaW1hdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ubmFtZSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcmFtZXMubWFwKGZyYW1lID0+IGZyYW1lLnRvU3RyaW5nKCkpLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZwcyxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5sb29wXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdhbWVTdGF0ZSA9IHRoaXMuZ2FtZS5zdGF0ZS5zdGF0ZXNbdGhpcy5nYW1lLnN0YXRlLmN1cnJlbnRdLmdhbWVTdGF0ZTtcclxuXHJcbiAgICAgICAgbW9ieC5vYnNlcnZlKGdhbWVTdGF0ZSwgKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlJywgY2hhbmdlLCBnYW1lU3RhdGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gT2JqZWN0LmFzc2lnbih0aGlzLnNwcml0ZVN0YXRlLCBjaGFuZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0hpdHRpbmcoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcHJpdGVTdGF0ZS5oaXQgPiB0aGlzLmdhbWUudGltZS5ub3c7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzU3R1bm5lZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwcml0ZVN0YXRlLnN0dW4gPiB0aGlzLmdhbWUudGltZS5ub3c7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZhY2luZ1JpZ2h0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZhY2luZ0xlZnQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS54IDwgMDtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlTGVmdCgpe1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IC0xO1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS52ZWxvY2l0eS54ID4gLXRoaXMucHJvcHMubWF4U3BlZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAtPSB0aGlzLnByb3BzLmFjY2VsZXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVJpZ2h0KCl7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gMTtcclxuICAgICAgICBpZih0aGlzLmJvZHkudmVsb2NpdHkueCA8IHRoaXMucHJvcHMubWF4U3BlZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCArPSB0aGlzLnByb3BzLmFjY2VsZXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuc2NhbGUueCA9PT0gMSl7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVJpZ2h0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlTGVmdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdG9wKCl7XHJcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggLz0gMS4xO1xyXG4gICAgfVxyXG5cclxuICAgIGp1bXAoKXtcclxuICAgICAgICBpZih0aGlzLmJvZHkudG91Y2hpbmcuZG93biB8fCB0aGlzLmJvZHkuYmxvY2tlZC5kb3duKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgLT0gMzAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoaXQoKXtcclxuICAgICAgICBjb25zdCBoaXRVbnRpbCA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDkwMCxcclxuICAgICAgICAgICAgYnJlYWtVbnRpbCA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDEwMDA7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ05vdyAlcyBIaXQgJXMgQnJlYWsgJXMnLCB0aGlzLmdhbWUudGltZS5ub3csIGhpdFVudGlsLCBicmVha1VudGlsKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgICAgICAgaGl0OiBoaXRVbnRpbCxcclxuICAgICAgICAgICAgbm9oaXQ6IGJyZWFrVW50aWxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBodXJ0KGRpcmVjdGlvbil7XHJcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgLT0gMTAwO1xyXG4gICAgICAgIGlmKGRpcmVjdGlvbiAmJiBkaXJlY3Rpb24ubGVmdCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC09IDEwMCB8fCB0aGlzLnByb3BzLm1heFNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkaXJlY3Rpb24gJiYgZGlyZWN0aW9uLnJpZ2h0KXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggKz0gMTAwIHx8IHRoaXMucHJvcHMubWF4U3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYnVnKHRleHQpe1xyXG4gICAgICAgdGhpcy5fZGVidWdUZXh0LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgdGhpcy5fZGVidWdUZXh0LnNjYWxlLnggPSB0aGlzLnNjYWxlLng7XHJcbiAgICAgICB0aGlzLl9kZWJ1Z1RleHQuc2V0VGV4dCh0ZXh0LnRvU3RyaW5nKCkgfHwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ1tTcHJpdGVdIHN0YXRlJyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHRlbmRlZFNwcml0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0V4dGVuZGVkU3ByaXRlLmpzIiwiaW1wb3J0IEV4dGVuZGVkU3ByaXRlIGZyb20gJy4vRXh0ZW5kZWRTcHJpdGUnO1xyXG5cclxuY2xhc3MgSHVtYW4gZXh0ZW5kcyBFeHRlbmRlZFNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGxpZmU6IDEwLFxyXG4gICAgICAgICAgICBzdHVuOiAwLFxyXG4gICAgICAgICAgICBoaXQ6IDAsXHJcbiAgICAgICAgICAgIG5vaGl0OiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEh1bWFuO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJpbXBvcnQgY3JlYXRlIGZyb20gJy4vbWVudS5jcmVhdGUnO1xyXG4vL2ltcG9ydCB1cGRhdGUgZnJvbSAnLi9wbGF5LnVwZGF0ZSc7XHJcblxyXG5jbGFzcyBNZW51IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxufVxyXG5cclxuTWVudS5wcm90b3R5cGUuY3JlYXRlID0gY3JlYXRlO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNZW51O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvbWVudS9pbmRleC5qcyIsImltcG9ydCBBSSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0FJJztcbmltcG9ydCBIdW1hbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL0h1bWFuJztcblxuaW1wb3J0IGxldmVsTG9hZGVyIGZyb20gJy4uLy4uL3NlcnZpY2VzL2xldmVsTG9hZGVyJztcbmltcG9ydCBjcmVhdHVyZUZhY3RvcnkgZnJvbSAnLi4vLi4vc2VydmljZXMvY3JlYXR1cmVGYWN0b3J5JztcbmltcG9ydCBjcmVhdHVyZUNvbmZpZyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnJztcblxuaW1wb3J0IGluaXQgZnJvbSAnLi9wbGF5LmluaXQnO1xuaW1wb3J0IHByZWxvYWQgZnJvbSAnLi9wbGF5LnByZWxvYWQnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuL3BsYXkuY3JlYXRlJztcbmltcG9ydCB1cGRhdGUgZnJvbSAnLi9wbGF5LnVwZGF0ZSc7XG5cclxuY2xhc3MgUGxheSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnbG9iYWxDb25maWcpIHtcclxuICAgICAgICB0aGlzLmtleXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5lbmVteSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmxldmVsID0ge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kTGF5ZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgZ3JvdW5kTGF5ZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdGlsZW1hcDogdW5kZWZpbmVkXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcgPSBnbG9iYWxDb25maWc7XHJcbiAgICAgICAgdGhpcy5jcmVhdHVyZUNvbmZpZyA9IGNyZWF0dXJlQ29uZmlnO1xyXG4gICAgICAgIHRoaXMubGV2ZWxMb2FkZXIgPSBsZXZlbExvYWRlci5jYWxsKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY3JlYXR1cmVGYWN0b3J5ID0gY3JlYXR1cmVGYWN0b3J5LmNhbGwodGhpcyk7XHJcbiAgICB9XHJcbn1cblxuUGxheS5wcm90b3R5cGUuaW5pdCA9IGluaXQ7XG5QbGF5LnByb3RvdHlwZS5wcmVsb2FkID0gcHJlbG9hZDtcclxuUGxheS5wcm90b3R5cGUuY3JlYXRlID0gY3JlYXRlO1xyXG5QbGF5LnByb3RvdHlwZS51cGRhdGUgPSB1cGRhdGU7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L2luZGV4LmpzIiwiY29uc3QgZ2xvYmFsQ29uZmlnID0ge1xyXG4gICAgd2lkdGg6IDU0NixcclxuICAgIGhlaWdodDogMzY4LFxyXG4gICAgYmxvY2tzOiAzLFxyXG4gICAgZG9tRWxlbWVudDogJ2dhbWUnLFxyXG4gICAgYmFja2dyb3VuZFBhdGg6ICdiYWNrZ3JvdW5kcy8nLFxyXG4gICAgdGlsZXNldFBhdGg6ICd0aWxlc2V0cy8nLFxyXG4gICAgbGV2ZWxQYXRoOiAnbGV2ZWxzLycsXHJcbiAgICB0ZXh0dXJlQXRsYXNQYXRoOiAnc3ByaXRlc2hlZXRzLycsXHJcbiAgICB0ZXh0dXJlQXRsYXNOYW1lOiAncHJlMmF0bGFzJyxcclxuICAgIHRleHR1cmVBdGxhc0ltYWdlOiAncHJlMmF0bGFzLnBuZycsXHJcbiAgICB0ZXh0dXJlQXRsYXNKc29uOiAncHJlMmF0bGFzLmpzb24nXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnbG9iYWxDb25maWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2xvYmFsQ29uZmlnLmpzIiwidmFyIGNyZWF0dXJlQ29uZmlncyA9IHtcclxuICBjcmVhdHVyZURlZmF1bHRzOiB7XHJcbiAgICBhY3RpdmU6IHRydWUsXHJcbiAgICBncmF2aXR5OiA1MDAsXHJcbiAgICBib3VuY2U6IDAuMixcclxuICAgIG1hc3M6IDEsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogMTAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBsaXZlczogMSxcclxuICAgIGxpZmVzcGFuOiBJbmZpbml0eSxcclxuICAgIHNlbnNlOiAxNTAsXHJcbiAgICBhbmltYXRpb25zOiBbXSxcclxuICAgIHRpbWVPZjoge1xyXG4gICAgICAnbW92ZSc6IDIwMCxcclxuICAgICAgJ2hpdCc6IDEwMCxcclxuICAgICAgJ2h1cnQnOiA1MDAsXHJcbiAgICAgICdzdG9wJzogMjAwLFxyXG4gICAgICAnaWRsZSc6IDEwXHJcbiAgICB9LFxyXG4gICAgYm91bmRUbyA6IHt9LFxyXG4gICAgYmVoYXZpb3VyczogW1xyXG4gICAgICAgIHsgYWN0aW9uOiAndHVybklmQmxvY2tlZCcgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ21vdmUnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdjaGVja0JvdW5kcycgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgbWFuOiB7XHJcbiAgICB0eXBlOiAnbWFuJyxcclxuICAgIG1heFNwZWVkOiAyMDAsXHJcbiAgICBsaXZlczogOCxcclxuICAgIGxpZmVzcGFuOiBJbmZpbml0eSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzExLCcwMycsJzA1JywxNCwyMF0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2hpdCcsIGZyYW1lczogWzIyLDI0LDI4LDMxLDM0LDIyLDI0LDI4LDMxLDM0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzdG9wJywgZnJhbWVzOiBbNDIsNDUsNDksNTJdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMTYsNDEsNDcsNTAsNTAsNTAsNTAsNTAsNTAsNTAsNTAsMTMsNTAsMTMsNTAsMTNdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjcsMjcsMjcsMjcsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMzAsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjcsMzAsMjcsMzAsMzUsMzYsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjUsJzA3JywnMDcnLCcwNycsJzA3JywnMDInLCcwMiddLCBmcHM6IDUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnaHVydCcsIGZyYW1lczogWzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzdHVuJywgZnJhbWVzOiBbMTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzE5XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFsxMSwnMDMnLCcwNScsMTQsMjBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBkaW5vOiB7XHJcbiAgICB0eXBlOiAnZGlubycsXHJcbiAgICBtYXNzOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDUsXHJcbiAgICBiZWhhdmlvdXJzOiBbXHJcbiAgICAgICAgeyBhY3Rpb246ICd0dXJuSWZCbG9ja2VkJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnbW92ZScgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ2NoZWNrQm91bmRzJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnd2hlbicsIHBhcmFtczogeyBwcm9iYWJpbGl0eTogMC4wMSwgYWN0aW9uOiAnanVtcCcgfSB9XHJcbiAgICBdLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzYwLDM2MCwzNjAsMzYwLDM2MCwzNjAsMzYwLDM2N10sIGZwczogNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzYwLDM2MSwzNjQsMzY3LDM2OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzM2MCwzNjEsMzY0LDM2NywzNjldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2ZhbGwnLCBmcmFtZXM6IFszNjldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM3MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNjAsMzYxLDM2NCwzNjddLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGJlYXI6IHtcclxuICAgIHR5cGU6ICdiZWFyJyxcclxuICAgIG1hc3M6IDEuMixcclxuICAgIG1heFNwZWVkOiA3NSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDE1LFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzIxXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMyMCwzMjEsMzI0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM2NiwzNjMsMzU4LDMxN10sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzMyOF0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgJ3N1cGVyLWJlYXInOiB7XHJcbiAgICBhY2NlbGVyYXRpb246IDMwLFxyXG4gICAgbWF4U3BlZWQ6IDIwMCxcclxuICAgIGltYWdlOiAnc3VwZXItYmVhci1zcHJpdGUtcmVmJywgLy8gb3ZlcnJpZGUgc3ByaXRlIChjcmVhdHVyZSBuYW1lIGJ5IGRlZmF1bHQpXHJcbiAgICBhbmltYXRpb25zOiBbXVxyXG4gIH0sXHJcbiAgdGlnZXI6IHtcclxuICAgIHR5cGU6ICd0aWdlcicsXHJcbiAgICBtYXNzOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDIwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzkzLDM5NV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM5MywzOTVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszOTksNDAxXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZmFsbCcsIGZyYW1lczogWzM5OV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQwMl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszOTMsMzk1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBwdGVybzoge1xyXG4gICAgdHlwZTogJ3B0ZXJvJyxcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiAxMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFs0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3Nyw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3Nyw0NzddLCBmcHM6IDMsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzQwMyw0MDQsNDA1LDQwMyw0MDQsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDAzLDQwNCw0MDUsNDAzLDQwNCw0MDUsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2Rlc2NlbmQnLCBmcmFtZXM6IFs0MDVdLCBmcHM6IDE1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2FzY2VuZCcsIGZyYW1lczogWzQwMyw0MDQsNDA1XSwgZnBzOiAxNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0NzFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbNDA1LDQwMyw0MDRdLCBmcHM6IDE1LCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGRyYWdvbmZseToge1xyXG4gICAgdHlwZTogJ2RyYWdvbmZseScsXHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzM3LDMzOF0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMzNywzMzhdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3R1cm4nLCBmcmFtZXM6IFszMzksMzQwXSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNDJdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzM3LDMzOF0sIGZwczogMTIsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgYmF0OiB7XHJcbiAgICB0eXBlOiAnYmF0JyxcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiAyMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNTEsMzUyLDM1MSwzNTEsMzUxLDM1MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM1NywzNTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM2Ml0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNTcsMzU5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBzcGlkZXI6IHtcclxuICAgIHR5cGU6ICdzcGlkZXInLFxyXG4gICAgbWFzczogMC4zLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzM1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM2NSwzNjgsMzcwLDM3Ml0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFsyOTksMzAyLDMwNSwzMDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3R1cm4nLCBmcmFtZXM6IFszMTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2NsaW1iJywgZnJhbWVzOiBbMzQxLDM0MywzNDUsMzQ3XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICd3YWl0JywgZnJhbWVzOiBbMzMyLDMzNSwzNzJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzMyMl0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIG5hdGl2ZToge1xyXG4gICAgdHlwZTogJ25hdGl2ZScsXHJcbiAgICBtYXhTcGVlZDogMTAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyMCxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNzNdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszNzMsMzc2LDM3OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzgwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNzMsMzc2LDM3OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgcGFycm90OiB7XHJcbiAgICB0eXBlOiAncGFycm90JyxcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiAxMDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzk0LDM5NywzOThdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszOTQsMzk3LDM5OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDAwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszOTQsMzk3LDM5OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgaW5zZWN0OiB7XHJcbiAgICB0eXBlOiAnaW5zZWN0JyxcclxuICAgIG1hc3M6IDEsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDI1LFxyXG4gICAgYmVoYXZpb3VyczogW1xyXG4gICAgICAgIHsgYWN0aW9uOiAndHVybklmQmxvY2tlZCcgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ21vdmUnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdjaGVja0JvdW5kcycgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ3doZW4nLCBwYXJhbXM6IHsgcHJvYmFiaWxpdHk6IDAuMDMsIGFjdGlvbjogJ2p1bXAnIH0gfVxyXG4gICAgXSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM0OCwzNDgsMzQ4LDM0OCwzNDgsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMyMywzNDgsMzQ5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzIzLDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM0OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszMjMsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgYnVnOiB7XHJcbiAgICB0eXBlOiAnYnVnJyxcclxuICAgIG1hc3M6IDEsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDI1LFxyXG4gICAgYmVoYXZpb3VyczogW1xyXG4gICAgICAgIHsgYWN0aW9uOiAndHVybklmQmxvY2tlZCcgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ21vdmUnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdjaGVja0JvdW5kcycgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ3doZW4nLCBwYXJhbXM6IHsgcHJvYmFiaWxpdHk6IDAuMDIsIGFjdGlvbjogJ2p1bXAnIH0gfVxyXG4gICAgXSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzM0NCwzNDZdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM0NF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBmcm9nOiB7XHJcbiAgICB0eXBlOiAnZnJvZycsXHJcbiAgICBtYXNzOiAxLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMS41LFxyXG4gICAganVtcGluZzogNTAwLFxyXG4gICAgbWF4U3BlZWQ6IDgwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiA0MCxcclxuICAgIGJlaGF2aW91cnM6IFtcclxuICAgICAgICB7IGFjdGlvbjogJ3R1cm5JZkJsb2NrZWQnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdtb3ZlJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnY2hlY2tCb3VuZHMnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICd3aGVuJywgcGFyYW1zOiB7IHByb2JhYmlsaXR5OiAwLjEsIGFjdGlvbjogJ2p1bXAnIH0gfVxyXG4gICAgXSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMyNV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMyNSwzMjcsMzMxLDMyNV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszMjUsMzI3LDMzMSwzMjVdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszMzRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzI1LDMyNywzMzEsMzI1XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgdHVydGxlOiB7XHJcbiAgICB0eXBlOiAndHVydGxlJyxcclxuICAgIG1hc3M6IDIsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMC4zLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM5MF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNzcsMzgxLDM4NCwzODVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszODcsMzg5LDM5MCwzOTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM5Ml0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgamVsbHk6IHtcclxuICAgIHR5cGU6ICdqZWxseScsXHJcbiAgICBtYXNzOiAyLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEsXHJcbiAgICBtYXhTcGVlZDogNSxcclxuICAgIGFjY2VsZXJhdGlvbjogMSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbNDIwLDQzMyw0MzRdLCBmcHM6IDMsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGdvcmlsbGE6IHtcclxuICAgIHR5cGU6ICdnb3JpbGxhJyxcclxuICAgIG1hc3M6IDUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzQxMV0sIGZwczogNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdmYWxsJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfVxyXG59O1xyXG5cclxuZm9yKHZhciBjcmVhdHVyZSBpbiBjcmVhdHVyZUNvbmZpZ3Mpe1xyXG4gIC8vY3JlYXR1cmVDb25maWdzW2NyZWF0dXJlXSA9IF8ubWVyZ2Uoe30sIGNvbmZpZ3MuY3JlYXR1cmVEZWZhdWx0cywgY29uZmlnc1tjcmVhdHVyZV0pO1xyXG4gIHZhciBkZWZhdWx0cyA9IGNyZWF0dXJlQ29uZmlnc1snY3JlYXR1cmVEZWZhdWx0cyddO1xyXG4gIGZvcih2YXIgcHJvcCBpbiBkZWZhdWx0cyl7XHJcbiAgICBpZihjcmVhdHVyZUNvbmZpZ3NbY3JlYXR1cmVdW3Byb3BdID09PSB1bmRlZmluZWQpe1xyXG4gICAgICBjcmVhdHVyZUNvbmZpZ3NbY3JlYXR1cmVdW3Byb3BdID0gZGVmYXVsdHNbcHJvcF07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0dXJlQ29uZmlncztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwiZnVuY3Rpb24gY3JlYXRlKCl7XHJcblxyXG4gICAgLy8gZnBzIGRlYnVnZ2luZ1xyXG4gICAgdGhpcy5nYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xyXG5cclxuICAgIC8vIENUQSB0ZXh0XHJcbiAgICBjb25zdCB0ZXh0ID0gdGhpcy5nYW1lLmFkZC50ZXh0KFxyXG4gICAgICAgIHRoaXMuZ2FtZS53aWR0aCAvIDIsXHJcbiAgICAgICAgdGhpcy5nYW1lLmhlaWdodCAvIDIsXHJcbiAgICAgICAgXCJDaG9vc2UgYSBsZXZlbCFcXG4xIDIgMyA0IDUgNlwiLFxyXG4gICAgICAgIHsgZm9udDogXCIyNHB4IENvdXJpZXJcIiwgZmlsbDogXCIjZmZmZmZmXCIsIGFsaWduOiBcImNlbnRlclwiIH1cclxuICAgICk7XHJcblxyXG4gICAgdGV4dC5hbmNob3Iuc2V0KDAuNSk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLm9uRG93bkNhbGxiYWNrID0gKGUpID0+IHtcclxuICAgICAgICBmZXRjaCgnL2xldmVsLycgKyBlLmtleSwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnXHJcbiAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICB9KS50aGVuKChsZXZlbENvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ1BsYXknLCB0cnVlLCB0cnVlLCBsZXZlbENvbmZpZyk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5vbkRvd25DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW01lbnVdW0NyZWF0ZV0nKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvbWVudS9tZW51LmNyZWF0ZS5qcyIsImltcG9ydCBIdW1hbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL0h1bWFuJztcclxuaW1wb3J0IEFJIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQUknO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlKCl7XHJcbiAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtDcmVhdGVdJyk7XHJcbiAgICAvLyBmcHMgZGVidWdnaW5nXHJcbiAgICB0aGlzLmdhbWUudGltZS5hZHZhbmNlZFRpbWluZyA9IHRydWU7XHJcblxyXG4gICAgLy8gW1NFVCBMRVZFTF0gc2V0IGRpbWVuc2lvbnMsIHN0YXJ0IHBoeXNpYyBzeXN0ZW1cclxuICAgIHRoaXMuZ2FtZS53b3JsZC5zZXRCb3VuZHMoXHJcbiAgICAgICAgMCxcclxuICAgICAgICAwLFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLndpZHRoICogdGhpcy5nbG9iYWxDb25maWcuYmxvY2tzLFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLmhlaWdodFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG5cclxuICAgIHRoaXMubGV2ZWxMb2FkZXIuY3JlYXRlQmFja2dyb3VuZCgnYmFja2dyb3VuZExheWVyJyk7XHJcbiAgICB0aGlzLmxldmVsTG9hZGVyLmNyZWF0ZVRpbGVzKFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcudGlsZW1hcCxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXQsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy50aWxlc2V0SW1hZ2VcclxuICAgICk7XHJcbiAgICB0aGlzLmxldmVsTG9hZGVyLmNyZWF0ZUxheWVycyh0aGlzLmxldmVsQ29uZmlnLmxheWVycyk7XHJcblxyXG4gICAgLy8gW1NFVCBMRVZFTF0gZml4IGJhY2tncm91bmQsIHJlc2l6ZVxyXG4gICAgdGhpcy5sZXZlbC5iYWNrZ3JvdW5kTGF5ZXIuZml4ZWRUb0NhbWVyYSA9IHRoaXMubGV2ZWxDb25maWcuZml4ZWRCYWNrZ3JvdW5kO1xyXG4gICAgdGhpcy5sZXZlbC5ncm91bmRMYXllci5yZXNpemVXb3JsZCgpO1xyXG5cclxuICAgIHRoaXMuZ2FtZVN0YXRlID0gbW9ieC5vYnNlcnZhYmxlKHtcclxuICAgICAgICBpbml0aWFsaXNlZDogZmFsc2UsXHJcbiAgICAgICAgc2NvcmU6IDBcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudXBkYXRlU3RhdGUgPSBtb2J4LmFjdGlvbigoY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2FtZVN0YXRlLCBjaGFuZ2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbW9ieC5vYnNlcnZlKHRoaXMuZ2FtZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbZ2FtZVN0YXRlXSBjaGFuZ2UnLCBjaGFuZ2UsIHRoaXMuZ2FtZVN0YXRlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudXBkYXRlU3RhdGUoeyBpbml0aWFsaXNlZDogdHJ1ZSB9KTtcclxuXHJcbiAgICAvLyBbUExBWUVSXVxyXG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgSHVtYW4oXHJcbiAgICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcuZW50cnlQb2ludC54LFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcuZW50cnlQb2ludC55LFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLnRleHR1cmVBdGxhc05hbWUsXHJcbiAgICAgICAgdGhpcy5jcmVhdHVyZUNvbmZpZy5tYW5cclxuICAgICk7XHJcblxyXG4gICAgLy8gW0VORU1JRVNdXHJcbiAgICB0aGlzLmVuZW1pZXMgPSBuZXcgUGhhc2VyLkdyb3VwKHRoaXMuZ2FtZSk7XHJcbiAgICB0aGlzLmxldmVsQ29uZmlnLmVuZW1pZXMuZm9yRWFjaCh0aGlzLmNyZWF0dXJlRmFjdG9yeS5jcmVhdGUpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcclxuXHJcbiAgICAvLyBiaW5kIGtleXNcclxuICAgIHRoaXMua2V5cyA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XHJcbiAgICB0aGlzLmtleXMuc3BhY2UgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TUEFDRUJBUik7XHJcblxyXG4gICAgLy8gc2NvcmUgdGV4dFxyXG4gICAgdGhpcy5tZW51ID0gdGhpcy5nYW1lLmFkZC50ZXh0KFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLndpZHRoIC0gMTIwLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgXCJMaWZlOiBcIiArIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUsXHJcbiAgICAgICAgeyBmb250OiBcIjI0cHggQ291cmllclwiLCBmaWxsOiBcIiNmZmZcIiwgYWxpZ246IFwiY2VudGVyXCIgfVxyXG4gICAgKTtcclxuICAgIHRoaXMubWVudS5maXhlZFRvQ2FtZXJhID0gdHJ1ZTtcclxuICAgIG1vYngub2JzZXJ2ZSh0aGlzLnBsYXllci5zcHJpdGVTdGF0ZSwgY2hhbmdlID0+IHtcclxuICAgICAgICB0aGlzLm1lbnUuc2V0VGV4dChcIkxpZmU6IFwiICsgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5jcmVhdGUuanMiLCJmdW5jdGlvbiBpbml0KGxldmVsQ29uZmlnKXtcclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0luaXRdJywgbGV2ZWxDb25maWcpO1xyXG4gICAgdGhpcy5sZXZlbENvbmZpZyA9IGxldmVsQ29uZmlnO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5pbml0LmpzIiwiZnVuY3Rpb24gcHJlbG9hZCgpe1xyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bUHJlbG9hZF0nKTtcclxuXHJcbiAgICAvLyBhc3NldHMgdG8gbG9hZCByZWxhdGl2ZSB0byAvYXNzZXRzLy4uXHJcbiAgICB0aGlzLmdhbWUubG9hZC5hdGxhcyhcclxuICAgICAgICAncHJlMmF0bGFzJyxcclxuICAgICAgICAnc3ByaXRlc2hlZXRzL3ByZTJhdGxhcy5wbmcnLFxyXG4gICAgICAgICdzcHJpdGVzaGVldHMvcHJlMmF0bGFzLmpzb24nLFxyXG4gICAgICAgIFBoYXNlci5Mb2FkZXIuVEVYVFVSRV9BVExBU19KU09OX0hBU0hcclxuICAgICk7XHJcblxyXG4gICAgLy8gbG9hZCBiYWNrZ3JvdW5kXHJcbiAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSh0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRLZXksIHRoaXMuZ2xvYmFsQ29uZmlnLmJhY2tncm91bmRQYXRoICsgdGhpcy5sZXZlbENvbmZpZy5iYWNrZ3JvdW5kSW1hZ2UgKyB0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRJbWFnZUV4dGVuc2lvbik7XHJcbiAgICAvLyBsb2FkIHRpbGVzZXRcclxuICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKHRoaXMubGV2ZWxDb25maWcudGlsZXNldCwgdGhpcy5nbG9iYWxDb25maWcudGlsZXNldFBhdGggKyB0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXRJbWFnZSArIHRoaXMubGV2ZWxDb25maWcudGlsZXNldEltYWdlRXh0ZW5zaW9uKTtcclxuICAgIC8vIGxvYWQgdGlsZW1hcFxyXG4gICAgdGhpcy5nYW1lLmxvYWQudGlsZW1hcCh0aGlzLmxldmVsQ29uZmlnLnRpbGVtYXAsIHRoaXMuZ2xvYmFsQ29uZmlnLmxldmVsUGF0aCArIHRoaXMubGV2ZWxDb25maWcudGlsZWRKc29uLCBudWxsLCBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmVsb2FkO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnByZWxvYWQuanMiLCJmdW5jdGlvbiB1cGRhdGUoKXtcclxuICAgIC8vY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bVXBkYXRlXScpO1xyXG4gICAgLy8gZnBzXHJcbiAgICB0aGlzLmdhbWUuZGVidWcudGV4dCh0aGlzLmdhbWUudGltZS5mcHMsIDUsIDIwKTtcclxuXHJcbiAgICAvLyBjb2xsaWRlXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5sZXZlbC5jb2xsaXNpb25MYXllcik7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5lbmVtaWVzLCB0aGlzLmxldmVsLmNvbGxpc2lvbkxheWVyKTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLnBsYXllciwgdGhpcy5lbmVtaWVzLCAocGxheWVyLCBlbmVteSkgPT4ge1xyXG4gICAgICAgIGlmKHRoaXMucGxheWVyLmJvZHkudG91Y2hpbmcuZG93biAmJiBlbmVteS5ib2R5LnRvdWNoaW5nLnVwKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhpcy5wbGF5ZXIuaXNIaXR0aW5nICYmICF0aGlzLnBsYXllci5pc1N0dW5uZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBsaWZlOiB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlIC0gMSxcclxuICAgICAgICAgICAgICAgIHN0dW46IHRoaXMuZ2FtZS50aW1lLm5vdyArIDE1MDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmh1cnQoZW5lbXkuYm9keS50b3VjaGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gbW92ZVxyXG4gICAgb25LZXlQcmVzcy5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvbktleVByZXNzKCl7XHJcbiAgICAvLyBzdHVuID0+IGJsb2NrZWRcclxuICAgIGlmKHRoaXMucGxheWVyLmlzU3R1bm5lZCl7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdzdHVuJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1vdmUgbGVmdCAvIHJpZ2h0XHJcbiAgICBpZih0aGlzLmtleXMubGVmdC5pc0Rvd24pe1xyXG4gICAgICAgIHRoaXMucGxheWVyLm1vdmVMZWZ0KCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdtb3ZlJyk7XHJcbiAgICB9IGVsc2UgaWYodGhpcy5rZXlzLnJpZ2h0LmlzRG93bil7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZVJpZ2h0KCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdtb3ZlJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGxheWVyLnN0b3AoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2lkbGUnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBqdW1wXHJcbiAgICBpZih0aGlzLmtleXMudXAuaXNEb3duKXtcclxuICAgICAgICB0aGlzLnBsYXllci5qdW1wKCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdqdW1wJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaGl0XHJcbiAgICBpZih0aGlzLmtleXMuc3BhY2UuaXNEb3duKXtcclxuICAgICAgICBpZih0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5ub2hpdCA8IHRoaXMuZ2FtZS50aW1lLm5vdyAmJiB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5oaXQgPCB0aGlzLmdhbWUudGltZS5ub3cpe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5oaXQoKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdoaXQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVwZGF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS51cGRhdGUuanMiLCJpbXBvcnQgZ2xvYmFsQ29uZmlnIGZyb20gJy4vZ2xvYmFsQ29uZmlnLmpzJztcclxuaW1wb3J0IE1lbnUgZnJvbSAnLi9nYW1lc3RhdGVzL21lbnUvaW5kZXguanMnO1xyXG5pbXBvcnQgUGxheSBmcm9tICcuL2dhbWVzdGF0ZXMvcGxheS9pbmRleC5qcyc7XHJcblxyXG4vLyBpbnN0YW50aWF0ZSBhIFBoYXNlci5HYW1lXHJcbmNvbnN0IFBMQVRGT1JNRVIgPSBuZXcgUGhhc2VyLkdhbWUoXHJcbiAgICBnbG9iYWxDb25maWcud2lkdGgsXHJcbiAgICBnbG9iYWxDb25maWcuaGVpZ2h0LFxyXG4gICAgUGhhc2VyLkFVVE8sXHJcbiAgICBnbG9iYWxDb25maWcuZG9tRWxlbWVudFxyXG4pO1xyXG5cclxuLy8gcmVnaXN0ZXIgZ2FtZXN0YXRlcyAod2lsbCBiZSBpbnN0YW50aWF0ZWQgdy8gdGhpcy5nYW1lIGFzIDFzdCBwYXJhbSwgcGFzcyBnYW1lQ29uZmlnIGFzIDJuZClcclxuUExBVEZPUk1FUi5zdGF0ZS5hZGQoJ01lbnUnLCBNZW51LmJpbmQobnVsbCwgZ2xvYmFsQ29uZmlnKSk7XHJcblBMQVRGT1JNRVIuc3RhdGUuYWRkKCdQbGF5JywgUGxheS5iaW5kKG51bGwsIGdsb2JhbENvbmZpZykpO1xyXG5cclxuUExBVEZPUk1FUi5zdGF0ZS5zdGFydCgnTWVudScsIHRydWUsIHRydWUpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2luZGV4LmpzIiwiaW1wb3J0IGJhdCBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9iYXQuanMnO1xyXG5pbXBvcnQgYmVhciBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9iZWFyLmpzJztcclxuaW1wb3J0IGJ1ZyBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9idWcuanMnO1xyXG5pbXBvcnQgZGlubyBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9kaW5vLmpzJztcclxuaW1wb3J0IGRyYWdvbmZseSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9kcmFnb25mbHkuanMnO1xyXG5pbXBvcnQgZnJvZyBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9mcm9nLmpzJztcclxuaW1wb3J0IGdvcmlsbGEgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvZ29yaWxsYS5qcyc7XHJcbmltcG9ydCBpbnNlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvaW5zZWN0LmpzJztcclxuaW1wb3J0IGplbGx5IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2plbGx5LmpzJztcclxuaW1wb3J0IG5hdGl2ZSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9uYXRpdmUuanMnO1xyXG5pbXBvcnQgcGFycm90IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL3BhcnJvdC5qcyc7XHJcbmltcG9ydCBwdGVybyBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9wdGVyby5qcyc7XHJcbmltcG9ydCBzcGlkZXIgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvc3BpZGVyLmpzJztcclxuaW1wb3J0IHRpZ2VyIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL3RpZ2VyLmpzJztcclxuaW1wb3J0IHR1cnRsZSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy90dXJ0bGUuanMnO1xyXG5cclxuaW1wb3J0IEFJIGZyb20gJy4uL2NvbXBvbmVudHMvQUknO1xyXG5cclxuZnVuY3Rpb24gY3JlYXR1cmVGYWN0b3J5KCkge1xyXG4gICAgY29uc3QgQ3JlYXR1cmUgPSB7XHJcbiAgICAgICAgYmF0OiBiYXQsXHJcbiAgICAgICAgYmVhcjogYmVhcixcclxuICAgICAgICBidWc6IGJ1ZyxcclxuICAgICAgICBkaW5vOiBkaW5vLFxyXG4gICAgICAgIGRyYWdvbmZseTogZHJhZ29uZmx5LFxyXG4gICAgICAgIGZyb2c6IGZyb2csXHJcbiAgICAgICAgZ29yaWxsYTogZ29yaWxsYSxcclxuICAgICAgICBpbnNlY3Q6IGluc2VjdCxcclxuICAgICAgICBqZWxseTogamVsbHksXHJcbiAgICAgICAgbmF0aXZlOiBuYXRpdmUsXHJcbiAgICAgICAgcGFycm90OiBwYXJyb3QsXHJcbiAgICAgICAgcHRlcm86IHB0ZXJvLFxyXG4gICAgICAgIHNwaWRlcjogc3BpZGVyLFxyXG4gICAgICAgIHRpZ2VyOiB0aWdlcixcclxuICAgICAgICB0dXJ0bGU6IHR1cnRsZVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNyZWF0ZTogKGxldmVsQ29uZmlnKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVuZW15ID0gbmV3IEFJKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICAgICAgICAgICAgbGV2ZWxDb25maWcub3JpZ2luLngsXHJcbiAgICAgICAgICAgICAgICBsZXZlbENvbmZpZy5vcmlnaW4ueSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLnRleHR1cmVBdGxhc05hbWUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0dXJlQ29uZmlnW2xldmVsQ29uZmlnLnR5cGVdLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdHVyZUNvbmZpZ1tsZXZlbENvbmZpZy50eXBlXS5iZWhhdmlvdXJzXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGVuZW15LnNldEJvdW5kcyhsZXZlbENvbmZpZy5ib3VuZFRvKTtcclxuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLmFkZChlbmVteSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0dXJlRmFjdG9yeTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9jcmVhdHVyZUZhY3RvcnkuanMiLCJmdW5jdGlvbiBsZXZlbExvYWRlcigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlQmFja2dyb3VuZDogKGxheWVyTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLmJhY2tncm91bmRMYXllciA9IHRoaXMuZ2FtZS5hZGQudGlsZVNwcml0ZShcclxuICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbENvbmZpZy53aWR0aCxcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxDb25maWcuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5iYWNrZ3JvdW5kS2V5XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGVMYXllcjogKGxheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWxbbGF5ZXJdID0gdGhpcy5sZXZlbC50aWxlbWFwLmNyZWF0ZUxheWVyKHRoaXMubGV2ZWxDb25maWdbbGF5ZXJdKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZUxheWVyczogKGxheWVycykgPT4ge1xyXG4gICAgICAgICAgICBmb3IobGV0IGxheWVyIGluIGxheWVycyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsW2xheWVyXSA9IHRoaXMubGV2ZWwudGlsZW1hcC5jcmVhdGVMYXllcih0aGlzLmxldmVsQ29uZmlnLmxheWVyc1tsYXllcl0ua2V5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxbbGF5ZXJdLnZpc2libGUgPSB0aGlzLmxldmVsQ29uZmlnLmxheWVyc1tsYXllcl0udmlzaWJsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlVGlsZXM6ICh0aWxlbWFwS2V5LCB0aWxlc2V0S2V5LCB0aWxlc2V0SW1hZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC50aWxlbWFwID0gdGhpcy5nYW1lLmFkZC50aWxlbWFwKHRpbGVtYXBLZXkpO1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLnRpbGVtYXAuYWRkVGlsZXNldEltYWdlKHRpbGVzZXRJbWFnZSwgdGlsZXNldEtleSk7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDAsIDMwMDAsIHRydWUsIHRoaXMubGV2ZWxDb25maWcubGF5ZXJzLmNvbGxpc2lvbkxheWVyLmtleSk7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDAsIDMwMDAsIHRydWUsIHRoaXMubGV2ZWxDb25maWcubGF5ZXJzLmRlYXRoTGF5ZXIua2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGV2ZWxMb2FkZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxMb2FkZXIuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgQmF0IGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmF0O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2JhdC5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBCZWFyIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmVhcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9iZWFyLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEJ1ZyBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1ZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9idWcuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgRGlubyBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERpbm87XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZGluby5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBEcmFnb25mbHkgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEcmFnb25mbHk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZHJhZ29uZmx5LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEZyb2cgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGcm9nO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Zyb2cuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgR29yaWxsYSBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdvcmlsbGE7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZ29yaWxsYS5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBJbnNlY3QgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnNlY3Q7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvaW5zZWN0LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEplbGx5IGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSmVsbHk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvamVsbHkuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgTmF0aXZlIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmF0aXZlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL25hdGl2ZS5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBQYXJyb3QgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYXJyb3Q7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcGFycm90LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIFB0ZXJvIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHRlcm87XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcHRlcm8uanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgU3BpZGVyIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3BpZGVyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3NwaWRlci5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBUaWdlciBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRpZ2VyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3RpZ2VyLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIFR1cnRsZSBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFR1cnRsZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy90dXJ0bGUuanMiXSwic291cmNlUm9vdCI6IiJ9