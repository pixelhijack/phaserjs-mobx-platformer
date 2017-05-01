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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
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

            //const debugBounds = this.id+'\n'+ (this.boundTo && Object.keys(this.boundTo).length && this.boundTo.x) +'\n'+ (this.x | 0);
            //this.debug(debugBounds);
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
            this.animations.play('move');
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
            this.animations.play('stop');
        }
    }, {
        key: "jump",
        value: function jump() {
            if (this.body.touching.down || this.body.blocked.down) {
                this.body.velocity.y -= 300;
                this.animations.play('jump');
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
            this.animations.play('hit');
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
            this.animations.play('hurt');
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


var _menu = __webpack_require__(22);

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

var _levelLoader = __webpack_require__(33);

var _levelLoader2 = _interopRequireDefault(_levelLoader);

var _creatureFactory = __webpack_require__(28);

var _creatureFactory2 = _interopRequireDefault(_creatureFactory);

var _creatureconfig = __webpack_require__(6);

var _creatureconfig2 = _interopRequireDefault(_creatureconfig);

var _play = __webpack_require__(24);

var _play2 = _interopRequireDefault(_play);

var _play3 = __webpack_require__(25);

var _play4 = _interopRequireDefault(_play3);

var _play5 = __webpack_require__(23);

var _play6 = _interopRequireDefault(_play5);

var _play7 = __webpack_require__(26);

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
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 12 */
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
/* 14 */
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

var Turtle = function (_AI) {
	_inherits(Turtle, _AI);

	function Turtle(game, x, y, sprite, props) {
		_classCallCheck(this, Turtle);

		return _possibleConstructorReturn(this, (Turtle.__proto__ || Object.getPrototypeOf(Turtle)).call(this, game, x, y, sprite, props));
	}

	return Turtle;
}(_AI3.default);

exports.default = Turtle;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function create() {
    var _this = this;

    // fps debugging
    this.game.time.advancedTiming = true;

    // CTA text
    var text = this.game.add.text(this.game.width / 2, this.game.height / 2, "Choose a level!\n1 2 3 4 5 6 \nOr press a key to generate!", { font: "24px Courier", fill: "#ffffff", align: "center" });

    text.anchor.set(0.5);

    this.game.input.keyboard.onDownCallback = function (e) {
        // if pressed key is number (space is empty string which evaluates true)
        if (!isNaN(e.key) && /[^\s]/.test(e.key)) {
            fetch('/level/' + e.key, {
                method: 'GET'
            }).then(function (response) {
                return response.json();
            }).then(function (levelConfig) {
                _this.game.state.start('Play', true, true, levelConfig);
                _this.game.input.keyboard.onDownCallback = null;
            });
        } else {
            _this.game.state.start('Play', true, true, undefined);
            _this.game.input.keyboard.onDownCallback = null;
        }
    };

    console.log('[PHASER][Menu][Create]');
};

module.exports = create;

/***/ }),
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = __webpack_require__(29);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init(levelConfig) {
    console.log('[PHASER][Component][Init]', levelConfig);
    this.levelConfig = levelConfig || _index2.default.create();
};

exports.default = init;

/***/ }),
/* 25 */
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
    if (typeof this.levelConfig.tiledJson === 'string') {
        this.game.load.tilemap(this.levelConfig.tilemap, this.globalConfig.levelPath + this.levelConfig.tiledJson, null, Phaser.Tilemap.TILED_JSON);
    } else {
        this.game.load.tilemap(this.levelConfig.tilemap, null, this.levelConfig.tiledJson, Phaser.Tilemap.TILED_JSON);
    }
};

exports.default = preload;

/***/ }),
/* 26 */
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

    this.game.physics.arcade.collide(this.player, this.level.deathLayer, function () {
        console.log('DEAD!');
        _this.levelConfig = null;
        _this.game.state.start('Menu', true, true, undefined);
    });

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
/* 27 */
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bat = __webpack_require__(7);

var _bat2 = _interopRequireDefault(_bat);

var _bear = __webpack_require__(8);

var _bear2 = _interopRequireDefault(_bear);

var _bug = __webpack_require__(9);

var _bug2 = _interopRequireDefault(_bug);

var _dino = __webpack_require__(10);

var _dino2 = _interopRequireDefault(_dino);

var _dragonfly = __webpack_require__(11);

var _dragonfly2 = _interopRequireDefault(_dragonfly);

var _frog = __webpack_require__(12);

var _frog2 = _interopRequireDefault(_frog);

var _gorilla = __webpack_require__(13);

var _gorilla2 = _interopRequireDefault(_gorilla);

var _insect = __webpack_require__(14);

var _insect2 = _interopRequireDefault(_insect);

var _jelly = __webpack_require__(15);

var _jelly2 = _interopRequireDefault(_jelly);

var _native = __webpack_require__(16);

var _native2 = _interopRequireDefault(_native);

var _parrot = __webpack_require__(17);

var _parrot2 = _interopRequireDefault(_parrot);

var _ptero = __webpack_require__(18);

var _ptero2 = _interopRequireDefault(_ptero);

var _spider = __webpack_require__(19);

var _spider2 = _interopRequireDefault(_spider);

var _tiger = __webpack_require__(20);

var _tiger2 = _interopRequireDefault(_tiger);

var _turtle = __webpack_require__(21);

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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _levelBuilder = __webpack_require__(30);

var _levelBuilder2 = _interopRequireDefault(_levelBuilder);

var _levelConfig = __webpack_require__(32);

var _levelConfig2 = _interopRequireDefault(_levelConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var levelGenerator = {
    create: function create() {
        var levelBuilder = new _levelBuilder2.default(_levelConfig2.default);
        return levelBuilder.createLayers(34 * 3, 23 * 10).randomBackground().build();
    }
};

exports.default = levelGenerator;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(37);

var _layers = __webpack_require__(36);

var _islands = __webpack_require__(35);

var _backgrounds = __webpack_require__(34);

var _backgrounds2 = _interopRequireDefault(_backgrounds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// with frequency
var enemyTypes = ['bat', 'bat', 'bat', 'bat', 'bear', 'bear', 'bear', 'bear', 'bear', 'bear', 'bug', 'dino', 'dragonfly', 'dragonfly', 'dragonfly', 'dragonfly', 'dragonfly', 'frog', 'insect', 'jelly', 'native', 'native', 'native', 'native', 'native', 'parrot', 'ptero', 'spider', 'spider', 'spider', 'spider', 'tiger', 'turtle'];

var findPlacesFor = function findPlacesFor(aMatrix, items, retry) {
    var matrix = aMatrix.slice(0);
    var enemies = [];
    while (retry--) {
        var item = items[Math.floor(Math.random() * items.length)],
            x = Math.floor(Math.random() * (matrix[0].length - item[0].length)),
            y = Math.floor(Math.random() * (matrix.length - item.length));
        if ((0, _utils.checkIfAreaIsCovered)(matrix, x, y, item[0].length, item.length)) {
            enemies.push([x, y, item[0].length]);
            (0, _utils.applyMatrix)(matrix, item, x, y);
        }
    }
    return {
        enemies: enemies,
        islands: matrix
    };
};

var createEnemyAt = function createEnemyAt(xTile, yTile, tilesWidth) {
    return {
        "type": enemyTypes[Math.floor(Math.random() * enemyTypes.length)],
        "number": 1,
        "lifespan": Infinity,
        "origin": {
            "x": (xTile + tilesWidth / 2) * 16,
            "y": yTile * 16
        },
        "boundTo": {
            "x1": xTile * 16,
            "x2": (xTile + tilesWidth) * 16
        }
    };
};

var getCollisionLayer = function getCollisionLayer(flatMatrix, collisionTiles) {
    var matrix = flatMatrix.slice(0).map(function (tile) {
        return collisionTiles.indexOf(tile) > -1 ? tile : 0;
    });
    return matrix;
};

var islands = [[[0, 0, 0, 0], [0, 77, 78, 0], [0, 91, 92, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [77, 111, 111, 78], [91, 130, 130, 92], [0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0], [77, 111, 111, 142, 111, 142, 78], [91, 130, 130, 144, 130, 144, 92], [0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0], [0, 18, 19, 16], [15, 79, 23, 52], [58, 93, 39, 34], [112, 113, 34, 83], [77, 111, 111, 78], [91, 130, 130, 92], [0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 77, 111, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 91, 130, 92, 0, 0, 0, 77, 111, 78, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 91, 130, 92, 0, 0, 0, 77, 78, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 92, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 64, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 64, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 64, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 64, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77, 111, 78, 0], [0, 0, 0, 0, 0, 0, 0, 77, 78, 0, 0, 0, 0, 91, 130, 92, 0], [0, 77, 111, 78, 0, 0, 0, 91, 92, 77, 78, 0, 0, 0, 0, 0, 0], [0, 91, 130, 92, 0, 0, 0, 0, 0, 91, 92, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], _islands.column, [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 98, 99, 243, 100, 105, 97, 64, 97, 97, 64, 97, 64, 97, 98, 99, 100, 104, 104, 105, 0], [0, 122, 127, 126, 206, 0, 0, 0, 0, 0, 0, 0, 0, 0, 245, 127, 125, 126, 127, 0, 0], [0, 0, 2684354681, 2684354591, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 230, 216, 230, 230, 216, 0, 0]], _islands.snowball];
var collisionTiles = [24, 64, 77, 78, 91, 92, 97, 98, 99, 100, 104, 105, 111, 123, 124, 125, 126, 127, 130, 167, 180, 195, 197, 204, 205, 206, 207, 208, 229, 243];

var LevelBuilder = function LevelBuilder(levelConfig) {
    var level = levelConfig;
    return {
        createLayers: function createLayers(tilesWidth, tilesHeight) {
            // 100: rare, 40: frequent
            var density = 100,
                retry = Math.floor(tilesWidth * tilesHeight / density);
            var placesFor = findPlacesFor((0, _utils.createMatrix)(tilesHeight, tilesWidth, 0), islands, retry);

            level.enemies = placesFor.enemies.map(function (enemy) {
                return createEnemyAt.apply(null, enemy);
            });

            _layers.groundLayer.data = (0, _utils.flatten)(placesFor.islands);
            _layers.collisionLayer.data = getCollisionLayer(_layers.groundLayer.data, collisionTiles);
            _layers.deathLayer.data = _layers.groundLayer.data.map(function (tile) {
                return 0;
            });

            level.tiledJson.width = tilesWidth;
            level.tiledJson.height = tilesHeight;

            _layers.groundLayer.width = tilesWidth;
            _layers.groundLayer.height = tilesHeight;
            _layers.collisionLayer.width = tilesWidth;
            _layers.collisionLayer.height = tilesHeight;

            level.width = tilesWidth * 16;
            level.height = tilesHeight * 16;

            do {
                // 195 = spike
                _layers.groundLayer.data[_layers.groundLayer.data.length - tilesWidth] = 195;
                _layers.deathLayer.data[_layers.deathLayer.data.length - tilesWidth] = 195;
            } while (tilesWidth--);

            level.tiledJson.layers = [_layers.groundLayer, _layers.collisionLayer, _layers.deathLayer];
            return this;
        },
        randomBackground: function randomBackground() {
            var randomBackground = _backgrounds2.default[Math.floor(Math.random() * _backgrounds2.default.length)];
            level.backgroundImage = randomBackground.backgroundImage;
            level.backgroundImageExtension = randomBackground.backgroundImageExtension;
            return this;
        },
        build: function build() {
            return level;
        }
    };
};

exports.default = LevelBuilder;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var levelModel = {
	"height": 23,
	"layers": [{
		"data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 19, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 79, 23, 52, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 58, 93, 39, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 113, 34, 83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77, 111, 111, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 130, 130, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 97, 98, 77, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		"height": 23,
		"name": "ground-layer",
		"opacity": 1,
		"type": "tilelayer",
		"visible": true,
		"width": 34,
		"x": 0,
		"y": 0
	}, {
		"data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77, 111, 111, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 130, 130, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 97, 98, 77, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		"height": 23,
		"name": "collision-layer",
		"opacity": 1,
		"type": "tilelayer",
		"visible": false,
		"width": 34,
		"x": 0,
		"y": 0
	}, {
		"data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		"height": 23,
		"name": "death-layer",
		"opacity": 1,
		"type": "tilelayer",
		"visible": false,
		"width": 34,
		"x": 0,
		"y": 0
	}],
	"nextobjectid": 1,
	"orientation": "orthogonal",
	"properties": {},
	"renderorder": "right-down",
	"tileheight": 16,
	"tilesets": [{
		"columns": 11,
		"firstgid": 1,
		"image": "L1.png",
		"imageheight": 384,
		"imagewidth": 176,
		"margin": 0,
		"name": "L1",
		"properties": {},
		"spacing": 0,
		"tilecount": 264,
		"tileheight": 16,
		"tilewidth": 16
	}],
	"tilewidth": 16,
	"version": 1,
	"width": 34
};

exports.default = levelModel;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _level = __webpack_require__(31);

var _level2 = _interopRequireDefault(_level);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var levelConfig = {
	"id": "rise-of-the-tide",
	"name": "Rise of the Tide",
	"tileset": "tileset-level-rise-of-the-tide",
	"tilemap": "tilemap-level-rise-of-the-tide",
	"tiledJson": _level2.default,
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
		"x": 10,
		"y": 10
	},
	"portals": [],
	"platforms": [],
	"bonus": [],
	"enemies": []
};

exports.default = levelConfig;

/***/ }),
/* 33 */
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var backgrounds = [{
    backgroundImage: "bg3seamless",
    backgroundImageExtension: ".jpg"
}, {
    backgroundImage: "volcano",
    backgroundImageExtension: ".png"
}, {
    backgroundImage: "cave",
    backgroundImageExtension: ".png"
}, {
    backgroundImage: "bg1seamless",
    backgroundImageExtension: ".png"
}, {
    backgroundImage: "forest-green",
    backgroundImageExtension: ".png"
}, {
    backgroundImage: "forest-fire",
    backgroundImageExtension: ".png"
}, {
    backgroundImage: "forest-orange",
    backgroundImageExtension: ".png"
}, {
    backgroundImage: "forest-pink",
    backgroundImageExtension: ".png"
}, {
    backgroundImage: "forest",
    backgroundImageExtension: ".png"
}, {
    backgroundImage: "graveyard",
    backgroundImageExtension: ".png"
}, {
    backgroundImage: "ice-green",
    backgroundImageExtension: ".png"
}, {
    backgroundImage: "ice",
    backgroundImageExtension: ".png"
}, {
    backgroundImage: "snow",
    backgroundImageExtension: ".png"
}];

exports.default = backgrounds;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var column = exports.column = [[0, 0, 0, 0, 0, 0, 0], [0, 97, 98, 99, 100, 105, 0], [0, 0, 122, 127, 121, 0, 0], [0, 0, 37, 57, 31, 0, 0], [0, 0, 37, 57, 121, 0, 0], [0, 0, 58, 67, 31, 0, 0], [0, 84, 85, 136, 121, 0, 0], [0, 0, 58, 67, 31, 0, 0], [0, 0, 2, 57, 52, 0, 0], [0, 0, 21, 67, 34, 0, 0], [0, 0, 37, 57, 121, 0, 0], [0, 0, 2684354681, 2684354591, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];

var snowball = exports.snowball = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 19, 20, 17, 63, 16, 18, 19, 20, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 17, 63, 34, 13, 35, 67, 32, 33, 34, 13, 35, 45, 46, 31, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 30, 4, 80, 12, 53, 65, 66, 4, 80, 56, 57, 11, 110, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 17, 110, 79, 22, 23, 44, 45, 46, 79, 22, 23, 44, 45, 128, 112, 113, 107, 20, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 2, 57, 11, 38, 39, 55, 114, 12, 53, 38, 39, 29, 49, 50, 51, 59, 51, 131, 96, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 15, 79, 67, 32, 33, 34, 13, 35, 46, 79, 107, 108, 112, 76, 61, 62, 60, 76, 61, 131, 14, 0, 0, 0, 0], [0, 0, 0, 0, 0, 58, 11, 12, 53, 65, 66, 4, 93, 89, 90, 29, 56, 129, 59, 59, 49, 73, 47, 88, 141, 34, 0, 0, 0, 0], [0, 0, 0, 0, 15, 67, 32, 46, 79, 22, 23, 44, 113, 107, 108, 109, 128, 112, 133, 60, 76, 61, 62, 167, 100, 104, 229, 0, 0, 0], [0, 0, 0, 20, 90, 29, 79, 129, 93, 89, 90, 29, 29, 48, 49, 50, 51, 131, 59, 62, 73, 47, 24, 180, 125, 126, 121, 0, 0, 0], [0, 0, 0, 2, 108, 109, 128, 112, 113, 107, 108, 109, 133, 60, 76, 61, 62, 132, 133, 62, 167, 100, 197, 34, 45, 46, 31, 0, 0, 0], [0, 0, 0, 21, 49, 50, 51, 131, 59, 48, 49, 50, 51, 76, 133, 62, 132, 73, 47, 24, 124, 124, 127, 4, 114, 57, 121, 0, 0, 0], [0, 0, 0, 37, 76, 132, 137, 138, 133, 60, 76, 139, 178, 132, 137, 138, 132, 167, 100, 197, 32, 33, 34, 44, 35, 67, 31, 0, 0, 0], [0, 0, 0, 58, 184, 73, 184, 73, 138, 195, 184, 193, 194, 73, 184, 73, 88, 180, 124, 127, 11, 3221225494, 3221225551, 3221225518, 3221225504, 3221225539, 3221225487, 0, 0, 0], [0, 97, 98, 99, 100, 104, 100, 104, 100, 104, 100, 204, 205, 104, 100, 104, 197, 13, 35, 67, 32, 3221225537, 3221225525, 3221225484, 3221225483, 3221225530, 0, 0, 0, 0], [0, 0, 122, 125, 124, 127, 125, 126, 123, 206, 124, 207, 208, 126, 123, 206, 124, 4, 80, 12, 53, 3221225505, 3221225504, 3221225539, 3221225551, 3221225487, 0, 0, 0, 0], [0, 0, 3221225492, 3221225579, 3221225585, 3221225584, 3221225600, 3221225517, 3221225516, 3221225495, 3221225494, 3221225551, 3221225518, 3221225517, 3221225516, 3221225495, 3221225494, 3221225551, 45, 46, 79, 3221225510, 3221225483, 3221225529, 3221225474, 0, 0, 0, 0, 0], [0, 0, 0, 3221225582, 3221225483, 3221225529, 3221225528, 3221225552, 3221225476, 3221225538, 3221225537, 3221225525, 3221225484, 3221225552, 3221225476, 3221225502, 3221225475, 3221225474, 3221225524, 3221225495, 3221225494, 3221225485, 3221225506, 3221225582, 3221225489, 0, 0, 0, 0, 0], [0, 0, 0, 0, 3221225503, 3221225518, 3221225517, 3221225507, 3221225485, 3221225506, 3221225505, 3221225504, 3221225532, 3221225580, 3221225579, 3221225585, 3221225584, 3221225600, 3221225581, 3221225551, 3221225617, 3221225491, 3221225490, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3221225490, 3221225489, 3221225492, 3221225491, 3221225490, 3221225488, 3221225535, 3221225489, 3221225568, 3221225510, 3221225502, 3221225475, 3221225538, 3221225537, 3221225474, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3221225486, 3221225580, 3221225579, 3221225506, 3221225582, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3221225489, 3221225488, 3221225490, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var groundLayer = exports.groundLayer = {
    "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 19, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 79, 23, 52, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 58, 93, 39, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 113, 34, 83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77, 111, 111, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 130, 130, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 97, 98, 77, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "height": 23,
    "name": "ground-layer",
    "opacity": 1,
    "type": "tilelayer",
    "visible": true,
    "width": 34,
    "x": 0,
    "y": 0
};

var collisionLayer = exports.collisionLayer = {
    "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77, 111, 111, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 130, 130, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 97, 98, 77, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "height": 23,
    "name": "collision-layer",
    "opacity": 1,
    "type": "tilelayer",
    "visible": false,
    "width": 34,
    "x": 0,
    "y": 0
};

var deathLayer = exports.deathLayer = {
    "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "height": 23,
    "name": "death-layer",
    "opacity": 1,
    "type": "tilelayer",
    "visible": false,
    "width": 34,
    "x": 0,
    "y": 0
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var flatten = exports.flatten = function flatten(multidimensional) {
    return multidimensional.reduce(function (res, row) {
        return res.concat(row);
    }, []);
};

var applyMatrix = exports.applyMatrix = function applyMatrix(big, small, x, y) {
    for (var row = 0; row < small.length; row++) {
        for (var col = 0; col < small[row].length; col++) {
            big[y + row][x + col] = small[row][col];
        }
    }
    return big;
};

var createMatrix = exports.createMatrix = function createMatrix(rows, cols, tile) {
    var res = [];
    for (var i = 0; i < rows; i++) {
        var row = [];
        for (var j = 0; j < cols; j++) {
            row.push(tile);
        }
        res.push(row);
    }
    return res;
};

var layerToMatrix = exports.layerToMatrix = function layerToMatrix(layer) {
    return layer.data.reduce(function (result, tile, i) {
        if (i % layer.width === 0) {
            result.push([tile]);
        } else {
            result[result.length - 1].push(tile);
        }
        return result;
    }, []);
};

var checkIfAreaIsCovered = exports.checkIfAreaIsCovered = function checkIfAreaIsCovered(matrix, x, y, width, height) {
    var res = 0;
    for (var row = x; row <= x + width; row++) {
        for (var col = y; col <= y + height; col++) {
            res += matrix[col][row];
        }
    }
    return res === 0;
};

var filterCollisionTiles = exports.filterCollisionTiles = function filterCollisionTiles(flatmatrix) {
    return flatmatrix.filter(function (tile) {
        return tile !== 0;
    }).reduce(function (uniques, tile) {
        if (uniques.indexOf(tile) < 0) {
            uniques.push(tile);
        }
        return uniques;
    }, []).sort(function (a, b) {
        return a - b;
    });
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmEwOTBmZmFhZTc0OGZjOWVjYjkiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL21lbnUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmF0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmVhci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Rpbm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9kcmFnb25mbHkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9mcm9nLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZ29yaWxsYS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2luc2VjdC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2plbGx5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvbmF0aXZlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcGFycm90LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcHRlcm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9zcGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy90aWdlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvbWVudS9tZW51LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmluaXQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5wcmVsb2FkLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkudXBkYXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9jcmVhdHVyZUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL2xldmVsQnVpbGRlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9sZXZlbC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9sZXZlbENvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsTG9hZGVyLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL2JhY2tncm91bmRzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL2lzbGFuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9tb2RlbHMvbGF5ZXJzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvdXRpbHMuanMiXSwibmFtZXMiOlsiQUkiLCJnYW1lIiwieCIsInkiLCJzcHJpdGUiLCJwcm9wcyIsImJlaGF2aW91cnMiLCJpZCIsInR5cGUiLCJzcHJpdGVTdGF0ZSIsIm1vYngiLCJvYnNlcnZhYmxlIiwibGlmZSIsInN0dW4iLCJoaXQiLCJub2hpdCIsImJvZHkiLCJibG9ja2VkIiwibGVmdCIsInJpZ2h0Iiwic2NhbGUiLCJib3VuZFRvIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImhhc093blByb3BlcnR5IiwiUGhhc2VyIiwiUG9pbnQiLCJSZWN0YW5nbGUiLCJ4MSIsIngyIiwiaGVpZ2h0IiwieTEiLCJ5MiIsImNvbnRhaW5zUG9pbnQiLCJnZXRCb3VuZHMiLCJmYWNpbmdSaWdodCIsInR1cm4iLCJmYWNpbmdMZWZ0Iiwid2lkdGgiLCJwYXJhbXMiLCJNYXRoIiwicmFuZG9tIiwicHJvYmFiaWxpdHkiLCJhY3Rpb24iLCJjYWxsIiwiZm9yRWFjaCIsImJlaGF2aW91ciIsIkV4dGVuZGVkU3ByaXRlIiwiYW5pbWF0aW9ucyIsImFkZCIsImV4aXN0aW5nIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoeXNpY3MiLCJBUkNBREUiLCJhbmNob3IiLCJzZXRUbyIsImNvbGxpZGVXb3JsZEJvdW5kcyIsImNoZWNrV29ybGRCb3VuZHMiLCJvdXRPZkJvdW5kc0tpbGwiLCJncmF2aXR5IiwiX2RlYnVnVGV4dCIsImFkZENoaWxkIiwidGV4dCIsImZvbnQiLCJmaWxsIiwidmlzaWJsZSIsImFuaW1hdGlvbiIsIm5hbWUiLCJmcmFtZXMiLCJtYXAiLCJmcmFtZSIsInRvU3RyaW5nIiwiZnBzIiwibG9vcCIsImdhbWVTdGF0ZSIsInN0YXRlIiwic3RhdGVzIiwiY3VycmVudCIsIm9ic2VydmUiLCJjaGFuZ2UiLCJjb25zb2xlIiwibG9nIiwidXBkYXRlU3RhdGUiLCJhc3NpZ24iLCJ2ZWxvY2l0eSIsIm1heFNwZWVkIiwiYWNjZWxlcmF0aW9uIiwicGxheSIsIm1vdmVSaWdodCIsIm1vdmVMZWZ0IiwidG91Y2hpbmciLCJkb3duIiwiaGl0VW50aWwiLCJ0aW1lIiwibm93IiwiYnJlYWtVbnRpbCIsImRpcmVjdGlvbiIsInNldFRleHQiLCJTcHJpdGUiLCJIdW1hbiIsIk1lbnUiLCJ1bmRlZmluZWQiLCJwcm90b3R5cGUiLCJjcmVhdGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiUGxheSIsImdsb2JhbENvbmZpZyIsInBsYXllciIsImVuZW15IiwibGV2ZWwiLCJiYWNrZ3JvdW5kTGF5ZXIiLCJncm91bmRMYXllciIsInRpbGVtYXAiLCJjcmVhdHVyZUNvbmZpZyIsImxldmVsTG9hZGVyIiwiY3JlYXR1cmVGYWN0b3J5IiwiaW5pdCIsInByZWxvYWQiLCJ1cGRhdGUiLCJibG9ja3MiLCJkb21FbGVtZW50IiwiYmFja2dyb3VuZFBhdGgiLCJ0aWxlc2V0UGF0aCIsImxldmVsUGF0aCIsInRleHR1cmVBdGxhc1BhdGgiLCJ0ZXh0dXJlQXRsYXNOYW1lIiwidGV4dHVyZUF0bGFzSW1hZ2UiLCJ0ZXh0dXJlQXRsYXNKc29uIiwiY3JlYXR1cmVDb25maWdzIiwiY3JlYXR1cmVEZWZhdWx0cyIsImFjdGl2ZSIsImJvdW5jZSIsIm1hc3MiLCJqdW1waW5nIiwiY29sbGlkZSIsImxpdmVzIiwibGlmZXNwYW4iLCJJbmZpbml0eSIsInNlbnNlIiwidGltZU9mIiwibWFuIiwiZGlubyIsImJlYXIiLCJpbWFnZSIsInRpZ2VyIiwicHRlcm8iLCJkcmFnb25mbHkiLCJiYXQiLCJzcGlkZXIiLCJuYXRpdmUiLCJwYXJyb3QiLCJpbnNlY3QiLCJidWciLCJmcm9nIiwidHVydGxlIiwiamVsbHkiLCJnb3JpbGxhIiwiY3JlYXR1cmUiLCJkZWZhdWx0cyIsInByb3AiLCJCYXQiLCJCZWFyIiwiQnVnIiwiRGlubyIsIkRyYWdvbmZseSIsIkZyb2ciLCJHb3JpbGxhIiwiSW5zZWN0IiwiSmVsbHkiLCJOYXRpdmUiLCJQYXJyb3QiLCJQdGVybyIsIlNwaWRlciIsIlRpZ2VyIiwiVHVydGxlIiwiYWR2YW5jZWRUaW1pbmciLCJhbGlnbiIsInNldCIsImlucHV0Iiwia2V5Ym9hcmQiLCJvbkRvd25DYWxsYmFjayIsImUiLCJpc05hTiIsImtleSIsInRlc3QiLCJmZXRjaCIsIm1ldGhvZCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJsZXZlbENvbmZpZyIsInN0YXJ0Iiwid29ybGQiLCJzZXRCb3VuZHMiLCJzdGFydFN5c3RlbSIsImNyZWF0ZUJhY2tncm91bmQiLCJjcmVhdGVUaWxlcyIsInRpbGVzZXQiLCJ0aWxlc2V0SW1hZ2UiLCJjcmVhdGVMYXllcnMiLCJsYXllcnMiLCJmaXhlZFRvQ2FtZXJhIiwiZml4ZWRCYWNrZ3JvdW5kIiwicmVzaXplV29ybGQiLCJpbml0aWFsaXNlZCIsInNjb3JlIiwiZW50cnlQb2ludCIsImVuZW1pZXMiLCJHcm91cCIsImNhbWVyYSIsImZvbGxvdyIsImNyZWF0ZUN1cnNvcktleXMiLCJzcGFjZSIsImFkZEtleSIsIktleWJvYXJkIiwiU1BBQ0VCQVIiLCJtZW51IiwibG9hZCIsImF0bGFzIiwiTG9hZGVyIiwiVEVYVFVSRV9BVExBU19KU09OX0hBU0giLCJiYWNrZ3JvdW5kS2V5IiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uIiwidGlsZXNldEltYWdlRXh0ZW5zaW9uIiwidGlsZWRKc29uIiwiVGlsZW1hcCIsIlRJTEVEX0pTT04iLCJkZWJ1ZyIsImFyY2FkZSIsImNvbGxpc2lvbkxheWVyIiwiZGVhdGhMYXllciIsIm92ZXJsYXAiLCJ1cCIsImlzSGl0dGluZyIsImlzU3R1bm5lZCIsImh1cnQiLCJvbktleVByZXNzIiwiaXNEb3duIiwic3RvcCIsImp1bXAiLCJQTEFURk9STUVSIiwiR2FtZSIsIkFVVE8iLCJiaW5kIiwiQ3JlYXR1cmUiLCJvcmlnaW4iLCJsZXZlbEdlbmVyYXRvciIsImxldmVsQnVpbGRlciIsInJhbmRvbUJhY2tncm91bmQiLCJidWlsZCIsImVuZW15VHlwZXMiLCJmaW5kUGxhY2VzRm9yIiwiYU1hdHJpeCIsIml0ZW1zIiwicmV0cnkiLCJtYXRyaXgiLCJzbGljZSIsIml0ZW0iLCJmbG9vciIsInB1c2giLCJpc2xhbmRzIiwiY3JlYXRlRW5lbXlBdCIsInhUaWxlIiwieVRpbGUiLCJ0aWxlc1dpZHRoIiwiZ2V0Q29sbGlzaW9uTGF5ZXIiLCJmbGF0TWF0cml4IiwiY29sbGlzaW9uVGlsZXMiLCJ0aWxlIiwiaW5kZXhPZiIsIkxldmVsQnVpbGRlciIsInRpbGVzSGVpZ2h0IiwiZGVuc2l0eSIsInBsYWNlc0ZvciIsImFwcGx5IiwiZGF0YSIsImxldmVsTW9kZWwiLCJsYXllck5hbWUiLCJ0aWxlU3ByaXRlIiwiY3JlYXRlTGF5ZXIiLCJsYXllciIsInRpbGVtYXBLZXkiLCJ0aWxlc2V0S2V5IiwiYWRkVGlsZXNldEltYWdlIiwic2V0Q29sbGlzaW9uQmV0d2VlbiIsImJhY2tncm91bmRzIiwiY29sdW1uIiwic25vd2JhbGwiLCJmbGF0dGVuIiwibXVsdGlkaW1lbnNpb25hbCIsInJlZHVjZSIsInJlcyIsInJvdyIsImNvbmNhdCIsImFwcGx5TWF0cml4IiwiYmlnIiwic21hbGwiLCJjb2wiLCJjcmVhdGVNYXRyaXgiLCJyb3dzIiwiY29scyIsImkiLCJqIiwibGF5ZXJUb01hdHJpeCIsInJlc3VsdCIsImNoZWNrSWZBcmVhSXNDb3ZlcmVkIiwiZmlsdGVyQ29sbGlzaW9uVGlsZXMiLCJmbGF0bWF0cml4IiwiZmlsdGVyIiwidW5pcXVlcyIsInNvcnQiLCJhIiwiYiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRUE7Ozs7Ozs7Ozs7OztJQUVNQSxFOzs7QUFDRixnQkFBWUMsSUFBWixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCQyxNQUF4QixFQUFnQ0MsS0FBaEMsRUFBdUNDLFVBQXZDLEVBQWtEO0FBQUE7O0FBQUEsNEdBQ3hDTCxJQUR3QyxFQUNsQ0MsQ0FEa0MsRUFDL0JDLENBRCtCLEVBQzVCQyxNQUQ0QixFQUNwQkMsS0FEb0I7O0FBRzlDLGNBQUtFLEVBQUwsR0FBYUYsTUFBTUcsSUFBbkIsU0FBMkJOLENBQTNCLFNBQWdDQyxDQUFoQzs7QUFFQSxjQUFLRyxVQUFMLEdBQWtCQSxVQUFsQjs7QUFFQSxjQUFLRyxXQUFMLEdBQW1CQyxLQUFLQyxVQUFMLENBQWdCO0FBQy9CQyxrQkFBTSxFQUR5QjtBQUUvQkMsa0JBQU0sQ0FGeUI7QUFHL0JDLGlCQUFLLENBSDBCO0FBSS9CQyxtQkFBTztBQUp3QixT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Z0ssQ0FBaEssRUFBbUssQ0FBbkssRUFBc0ssQ0FBdEssRUFBeUssQ0FBekssRUFBNEssQ0FBNUssRUFBK0ssQ0FBL0ssRUFBa0wsQ0FBbEwsRUFBcUwsQ0FBckwsRUFBd0wsQ0FBeEwsRUFBMkwsQ0FBM0wsRUFBOEwsQ0FBOUwsRUFBaU0sQ0FBak0sRUFBb00sQ0FBcE0sRUFBdU0sQ0FBdk0sRUFBME0sQ0FBMU0sRUFBNk0sQ0FBN00sRUFBZ04sQ0FBaE4sRUFBbU4sQ0FBbk4sRUFBc04sQ0FBdE4sRUFBeU4sQ0FBek4sRUFBNE4sQ0FBNU4sRUFBK04sQ0FBL04sRUFBa08sQ0FBbE8sRUFBcU8sQ0FBck8sRUFBd08sQ0FBeE8sRUFBMk8sQ0FBM08sRUFBOE8sQ0FBOU8sRUFBaVAsQ0FBalAsRUFBb1AsQ0FBcFAsRUFBdVAsQ0FBdlAsRUFBMFAsQ0FBMVAsRUFBNlAsQ0FBN1AsRUFBZ1EsQ0FBaFEsRUFBbVEsQ0FBblEsRUFBc1EsQ0FBdFEsRUFBeVEsQ0FBelEsRUFBNFEsQ0FBNVEsRUFBK1EsQ0FBL1EsRUFBa1IsQ0FBbFIsRUFBcVIsQ0FBclIsRUFBd1IsQ0FBeFIsRUFBMlIsQ0FBM1IsRUFBOFIsQ0FBOVIsRUFBaVMsQ0FBalMsRUFBb1MsQ0FBcFMsRUFBdVMsQ0FBdlMsRUFBMFMsQ0FBMVMsRUFBNlMsQ0FBN1MsRUFBZ1QsQ0FBaFQsRUFBbVQsQ0FBblQsRUFBc1QsQ0FBdFQsRUFBeVQsQ0FBelQsRUFBNFQsQ0FBNVQsRUFBK1QsQ0FBL1QsRUFBa1UsQ0FBbFUsRUFBcVUsQ0FBclUsRUFBd1UsQ0FBeFUsRUFBMlUsQ0FBM1UsRUFBOFUsQ0FBOVUsRUFBaVYsQ0FBalYsRUFBb1YsQ0FBcFYsRUFBdVYsQ0FBdlYsRUFBMFYsQ0FBMVYsRUFBNlYsQ0FBN1YsRUFBZ1csQ0FBaFcsRUFBbVcsQ0FBblcsRUFBc1csQ0FBdFcsRUFBeVcsQ0FBelcsRUFBNFcsQ0FBNVcsRUFBK1csQ0FBL1csRUFBa1gsQ0FBbFgsRUFBcVgsQ0FBclgsRUFBd1gsQ0FBeFgsRUFBMlgsQ0FBM1gsRUFBOFgsQ0FBOVgsRUFBaVksQ0FBalksRUFBb1ksQ0FBcFksRUFBdVksQ0FBdlksRUFBMFksQ0FBMVksRUFBNlksQ0FBN1ksRUFBZ1osQ0FBaFosRUFBbVosQ0FBblosRUFBc1osQ0FBdFosRUFBeVosQ0FBelosRUFBNFosQ0FBNVosRUFBK1osQ0FBL1osRUFBa2EsQ0FBbGEsRUFBcWEsQ0FBcmEsRUFBd2EsQ0FBeGEsRUFBMmEsQ0FBM2EsRUFBOGEsQ0FBOWEsRUFBaWIsQ0FBamIsRUFBb2IsQ0FBcGIsRUFBdWIsQ0FBdmIsRUFBMGIsQ0FBMWIsRUFBNmIsQ0FBN2IsRUFBZ2MsQ0FBaGMsRUFBbWMsQ0FBbmMsRUFBc2MsQ0FBdGMsRUFBeWMsQ0FBemMsRUFBNGMsQ0FBNWMsRUFBK2MsQ0FBL2MsRUFBa2QsQ0FBbGQsRUFBcWQsQ0FBcmQsRUFBd2QsQ0FBeGQsRUFBMmQsQ0FBM2QsRUFBOGQsQ0FBOWQsRUFBaWUsQ0FBamUsRUFBb2UsQ0FBcGUsRUFBdWUsQ0FBdmUsRUFBMGUsQ0FBMWUsRUFBNmUsQ0FBN2UsRUFBZ2YsQ0FBaGYsRUFBbWYsQ0FBbmYsRUFBc2YsQ0FBdGYsRUFBeWYsQ0FBemYsRUFBNGYsQ0FBNWYsRUFBK2YsQ0FBL2YsRUFBa2dCLENBQWxnQixFQUFxZ0IsQ0FBcmdCLEVBQXdnQixDQUF4Z0IsRUFBMmdCLENBQTNnQixFQUE4Z0IsQ0FBOWdCLEVBQWloQixDQUFqaEIsRUFBb2hCLENBQXBoQixFQUF1aEIsQ0FBdmhCLEVBQTBoQixDQUExaEIsRUFBNmhCLENBQTdoQixFQUFnaUIsQ0FBaGlCLEVBQW1pQixDQUFuaUIsRUFBc2lCLENBQXRpQixFQUF5aUIsQ0FBemlCLEVBQTRpQixDQUE1aUIsRUFBK2lCLENBQS9pQixFQUFrakIsQ0FBbGpCLEVBQXFqQixDQUFyakIsRUFBd2pCLENBQXhqQixFQUEyakIsQ0FBM2pCLEVBQThqQixDQUE5akIsRUFBaWtCLENBQWprQixFQUFva0IsQ0FBcGtCLEVBQXVrQixDQUF2a0IsRUFBMGtCLENBQTFrQixFQUE2a0IsQ0FBN2tCLEVBQWdsQixDQUFobEIsRUFBbWxCLENBQW5sQixFQUFzbEIsQ0FBdGxCLEVBQXlsQixDQUF6bEIsRUFBNGxCLENBQTVsQixFQUErbEIsQ0FBL2xCLEVBQWttQixDQUFsbUIsRUFBcW1CLENBQXJtQixFQUF3bUIsQ0FBeG1CLEVBQTJtQixDQUEzbUIsRUFBOG1CLENBQTltQixFQUFpbkIsQ0FBam5CLEVBQW9uQixDQUFwbkIsRUFBdW5CLENBQXZuQixFQUEwbkIsQ0FBMW5CLEVBQTZuQixDQUE3bkIsRUFBZ29CLENBQWhvQixFQUFtb0IsQ0FBbm9CLEVBQXNvQixDQUF0b0IsRUFBeW9CLENBQXpvQixFQUE0b0IsQ0FBNW9CLEVBQStvQixDQUEvb0IsRUFBa3BCLENBQWxwQixFQUFxcEIsQ0FBcnBCLEVBQXdwQixDQUF4cEIsRUFBMnBCLENBQTNwQixFQUE4cEIsQ0FBOXBCLEVBQWlxQixDQUFqcUIsRUFBb3FCLENBQXBxQixFQUF1cUIsQ0FBdnFCLEVBQTBxQixDQUExcUIsRUFBNnFCLENBQTdxQixFQUFnckIsQ0FBaHJCLEVBQW1yQixDQUFuckIsRUFBc3JCLENBQXRyQixFQUF5ckIsQ0FBenJCLEVBQTRyQixDQUE1ckIsRUFBK3JCLENBQS9yQixFQUFrc0IsQ0FBbHNCLEVBQXFzQixDQUFyc0IsRUFBd3NCLENBQXhzQixFQUEyc0IsQ0FBM3NCLEVBQThzQixDQUE5c0IsRUFBaXRCLENBQWp0QixFQUFvdEIsQ0FBcHRCLEVBQXV0QixDQUF2dEIsRUFBMHRCLENBQTF0QixFQUE2dEIsQ0FBN3RCLEVBQWd1QixDQUFodUIsRUFBbXVCLENBQW51QixFQUFzdUIsQ0FBdHVCLEVBQXl1QixDQUF6dUIsRUFBNHVCLENBQTV1QixFQUErdUIsQ0FBL3VCLEVBQWt2QixDQUFsdkIsRUFBcXZCLENBQXJ2QixFQUF3dkIsQ0FBeHZCLEVBQTJ2QixDQUEzdkIsRUFBOHZCLENBQTl2QixFQUFpd0IsQ0FBandCLEVBQW93QixDQUFwd0IsRUFBdXdCLENBQXZ3QixFQUEwd0IsQ0FBMXdCLEVBQTZ3QixDQUE3d0IsRUFBZ3hCLENBQWh4QixFQUFteEIsQ0FBbnhCLEVBQXN4QixDQUF0eEIsRUFBeXhCLENBQXp4QixFQUE0eEIsQ0FBNXhCLEVBQSt4QixDQUEveEIsRUFBa3lCLENBQWx5QixFQUFxeUIsQ0FBcnlCLEVBQXd5QixDQUF4eUIsRUFBMnlCLENBQTN5QixFQUE4eUIsQ0FBOXlCLEVBQWl6QixDQUFqekIsRUFBb3pCLENBQXB6QixFQUF1ekIsQ0FBdnpCLEVBQTB6QixDQUExekIsRUFBNnpCLENBQTd6QixFQUFnMEIsQ0FBaDBCLEVBQW0wQixDQUFuMEIsRUFBczBCLENBQXQwQixFQUF5MEIsQ0FBejBCLEVBQTQwQixDQUE1MEIsRUFBKzBCLENBQS8wQixFQUFrMUIsQ0FBbDFCLEVBQXExQixDQUFyMUIsRUFBdzFCLENBQXgxQixFQUEyMUIsQ0FBMzFCLEVBQTgxQixDQUE5MUIsRUFBaTJCLENBQWoyQixFQUFvMkIsQ0FBcDJCLEVBQXUyQixDQUF2MkIsRUFBMDJCLENBQTEyQixFQUE2MkIsQ0FBNzJCLEVBQWczQixDQUFoM0IsRUFBbTNCLENBQW4zQixFQUFzM0IsQ0FBdDNCLEVBQXkzQixDQUF6M0IsRUFBNDNCLENBQTUzQixFQUErM0IsQ0FBLzNCLEVBQWs0QixDQUFsNEIsRUFBcTRCLENBQXI0QixFQUF3NEIsQ0FBeDRCLEVBQTI0QixDQUEzNEIsRUFBODRCLENBQTk0QixFQUFpNUIsQ0FBajVCLEVBQW81QixDQUFwNUIsRUFBdTVCLENBQXY1QixFQUEwNUIsQ0FBMTVCLEVBQTY1QixDQUE3NUIsRUFBZzZCLENBQWg2QixFQUFtNkIsQ0FBbjZCLEVBQXM2QixDQUF0NkIsRUFBeTZCLENBQXo2QixFQUE0NkIsQ0FBNTZCLEVBQSs2QixDQUEvNkIsRUFBazdCLENBQWw3QixFQUFxN0IsQ0FBcjdCLEVBQXc3QixDQUF4N0IsRUFBMjdCLENBQTM3QixFQUE4N0IsQ0FBOTdCLEVBQWk4QixDQUFqOEIsRUFBbzhCLENBQXA4QixFQUF1OEIsQ0FBdjhCLEVBQTA4QixDQUExOEIsRUFBNjhCLENBQTc4QixFQUFnOUIsQ0FBaDlCLEVBQW05QixDQUFuOUIsRUFBczlCLENBQXQ5QixFQUF5OUIsQ0FBejlCLEVBQTQ5QixDQUE1OUIsRUFBKzlCLENBQS85QixFQUFrK0IsQ0FBbCtCLEVBQXErQixDQUFyK0IsRUFBdytCLENBQXgrQixFQUEyK0IsQ0FBMytCLEVBQTgrQixDQUE5K0IsRUFBaS9CLENBQWovQixFQUFvL0IsQ0FBcC9CLEVBQXUvQixDQUF2L0IsRUFBMC9CLENBQTEvQixFQUE2L0IsQ0FBNy9CLEVBQWdnQyxDQUFoZ0MsRUFBbWdDLENBQW5nQyxFQUFzZ0MsQ0FBdGdDLEVBQXlnQyxDQUF6Z0MsRUFBNGdDLENBQTVnQyxFQUErZ0MsQ0FBL2dDLEVBQWtoQyxDQUFsaEMsRUFBcWhDLENBQXJoQyxFQUF3aEMsQ0FBeGhDLEVBQTJoQyxDQUEzaEMsRUFBOGhDLENBQTloQyxFQUFpaUMsRUFBamlDLEVBQXFpQyxFQUFyaUMsRUFBeWlDLEVBQXppQyxFQUE2aUMsQ0FBN2lDLEVBQWdqQyxDQUFoakMsRUFBbWpDLENBQW5qQyxFQUFzakMsQ0FBdGpDLEVBQXlqQyxDQUF6akMsRUFBNGpDLENBQTVqQyxFQUErakMsQ0FBL2pDLEVBQWtrQyxDQUFsa0MsRUFBcWtDLENBQXJrQyxFQUF3a0MsQ0FBeGtDLEVBQTJrQyxDQUEza0MsRUFBOGtDLENBQTlrQyxFQUFpbEMsQ0FBamxDLEVBQW9sQyxDQUFwbEMsRUFBdWxDLENBQXZsQyxFQUEwbEMsQ0FBMWxDLEVBQTZsQyxDQUE3bEMsRUFBZ21DLENBQWhtQyxFQUFtbUMsQ0FBbm1DLEVBQXNtQyxDQUF0bUMsRUFBeW1DLENBQXptQyxFQUE0bUMsQ0FBNW1DLEVBQSttQyxDQUEvbUMsRUFBa25DLENBQWxuQyxFQUFxbkMsQ0FBcm5DLEVBQXduQyxDQUF4bkMsRUFBMm5DLENBQTNuQyxFQUE4bkMsQ0FBOW5DLEVBQWlvQyxDQUFqb0MsRUFBb29DLENBQXBvQyxFQUF1b0MsRUFBdm9DLEVBQTJvQyxFQUEzb0MsRUFBK29DLEVBQS9vQyxFQUFtcEMsRUFBbnBDLEVBQXVwQyxDQUF2cEMsRUFBMHBDLENBQTFwQyxFQUE2cEMsQ0FBN3BDLEVBQWdxQyxDQUFocUMsRUFBbXFDLENBQW5xQyxFQUFzcUMsQ0FBdHFDLEVBQXlxQyxDQUF6cUMsRUFBNHFDLENBQTVxQyxFQUErcUMsQ0FBL3FDLEVBQWtyQyxDQUFsckMsRUFBcXJDLENBQXJyQyxFQUF3ckMsQ0FBeHJDLEVBQTJyQyxDQUEzckMsRUFBOHJDLENBQTlyQyxFQUFpc0MsQ0FBanNDLEVBQW9zQyxDQUFwc0MsRUFBdXNDLENBQXZzQyxFQUEwc0MsQ0FBMXNDLEVBQTZzQyxDQUE3c0MsRUFBZ3RDLENBQWh0QyxFQUFtdEMsQ0FBbnRDLEVBQXN0QyxDQUF0dEMsRUFBeXRDLENBQXp0QyxFQUE0dEMsQ0FBNXRDLEVBQSt0QyxDQUEvdEMsRUFBa3VDLENBQWx1QyxFQUFxdUMsQ0FBcnVDLEVBQXd1QyxDQUF4dUMsRUFBMnVDLENBQTN1QyxFQUE4dUMsQ0FBOXVDLEVBQWl2QyxFQUFqdkMsRUFBcXZDLEVBQXJ2QyxFQUF5dkMsRUFBenZDLEVBQTZ2QyxFQUE3dkMsRUFBaXdDLENBQWp3QyxFQUFvd0MsQ0FBcHdDLEVBQXV3QyxDQUF2d0MsRUFBMHdDLENBQTF3QyxFQUE2d0MsQ0FBN3dDLEVBQWd4QyxDQUFoeEMsRUFBbXhDLENBQW54QyxFQUFzeEMsQ0FBdHhDLEVBQXl4QyxDQUF6eEMsRUFBNHhDLENBQTV4QyxFQUEreEMsQ0FBL3hDLEVBQWt5QyxDQUFseUMsRUFBcXlDLENBQXJ5QyxFQUF3eUMsQ0FBeHlDLEVBQTJ5QyxDQUEzeUMsRUFBOHlDLENBQTl5QyxFQUFpekMsQ0FBanpDLEVBQW96QyxDQUFwekMsRUFBdXpDLENBQXZ6QyxFQUEwekMsQ0FBMXpDLEVBQTZ6QyxDQUE3ekMsRUFBZzBDLENBQWgwQyxFQUFtMEMsQ0FBbjBDLEVBQXMwQyxDQUF0MEMsRUFBeTBDLENBQXowQyxFQUE0MEMsQ0FBNTBDLEVBQSswQyxDQUEvMEMsRUFBazFDLENBQWwxQyxFQUFxMUMsQ0FBcjFDLEVBQXcxQyxDQUF4MUMsRUFBMjFDLEdBQTMxQyxFQUFnMkMsR0FBaDJDLEVBQXEyQyxFQUFyMkMsRUFBeTJDLEVBQXoyQyxFQUE2MkMsQ0FBNzJDLEVBQWczQyxDQUFoM0MsRUFBbTNDLENBQW4zQyxFQUFzM0MsQ0FBdDNDLEVBQXkzQyxDQUF6M0MsRUFBNDNDLENBQTUzQyxFQUErM0MsQ0FBLzNDLEVBQWs0QyxDQUFsNEMsRUFBcTRDLENBQXI0QyxFQUF3NEMsQ0FBeDRDLEVBQTI0QyxDQUEzNEMsRUFBODRDLENBQTk0QyxFQUFpNUMsQ0FBajVDLEVBQW81QyxDQUFwNUMsRUFBdTVDLENBQXY1QyxFQUEwNUMsQ0FBMTVDLEVBQTY1QyxDQUE3NUMsRUFBZzZDLENBQWg2QyxFQUFtNkMsQ0FBbjZDLEVBQXM2QyxDQUF0NkMsRUFBeTZDLENBQXo2QyxFQUE0NkMsQ0FBNTZDLEVBQSs2QyxDQUEvNkMsRUFBazdDLENBQWw3QyxFQUFxN0MsQ0FBcjdDLEVBQXc3QyxDQUF4N0MsRUFBMjdDLENBQTM3QyxFQUE4N0MsQ0FBOTdDLEVBQWk4QyxDQUFqOEMsRUFBbzhDLENBQXA4QyxFQUF1OEMsRUFBdjhDLEVBQTI4QyxHQUEzOEMsRUFBZzlDLEdBQWg5QyxFQUFxOUMsRUFBcjlDLEVBQXk5QyxDQUF6OUMsRUFBNDlDLENBQTU5QyxFQUErOUMsQ0FBLzlDLEVBQWsrQyxDQUFsK0MsRUFBcStDLENBQXIrQyxFQUF3K0MsQ0FBeCtDLEVBQTIrQyxDQUEzK0MsRUFBOCtDLENBQTkrQyxFQUFpL0MsQ0FBai9DLEVBQW8vQyxDQUFwL0MsRUFBdS9DLENBQXYvQyxFQUEwL0MsQ0FBMS9DLEVBQTYvQyxDQUE3L0MsRUFBZ2dELENBQWhnRCxFQUFtZ0QsQ0FBbmdELEVBQXNnRCxDQUF0Z0QsRUFBeWdELENBQXpnRCxFQUE0Z0QsQ0FBNWdELEVBQStnRCxDQUEvZ0QsRUFBa2hELENBQWxoRCxFQUFxaEQsQ0FBcmhELEVBQXdoRCxDQUF4aEQsRUFBMmhELENBQTNoRCxFQUE4aEQsQ0FBOWhELEVBQWlpRCxDQUFqaUQsRUFBb2lELENBQXBpRCxFQUF1aUQsQ0FBdmlELEVBQTBpRCxDQUExaUQsRUFBNmlELENBQTdpRCxFQUFnakQsQ0FBaGpELEVBQW1qRCxFQUFuakQsRUFBdWpELEdBQXZqRCxFQUE0akQsR0FBNWpELEVBQWlrRCxFQUFqa0QsRUFBcWtELENBQXJrRCxFQUF3a0QsQ0FBeGtELEVBQTJrRCxDQUEza0QsRUFBOGtELENBQTlrRCxFQUFpbEQsQ0FBamxELEVBQW9sRCxDQUFwbEQsRUFBdWxELENBQXZsRCxFQUEwbEQsQ0FBMWxELEVBQTZsRCxDQUE3bEQsRUFBZ21ELENBQWhtRCxFQUFtbUQsQ0FBbm1ELEVBQXNtRCxDQUF0bUQsRUFBeW1ELENBQXptRCxFQUE0bUQsQ0FBNW1ELEVBQSttRCxDQUEvbUQsRUFBa25ELENBQWxuRCxFQUFxbkQsQ0FBcm5ELEVBQXduRCxDQUF4bkQsRUFBMm5ELENBQTNuRCxFQUE4bkQsQ0FBOW5ELEVBQWlvRCxDQUFqb0QsRUFBb29ELENBQXBvRCxFQUF1b0QsQ0FBdm9ELEVBQTBvRCxDQUExb0QsRUFBNm9ELENBQTdvRCxFQUFncEQsRUFBaHBELEVBQW9wRCxFQUFwcEQsRUFBd3BELENBQXhwRCxFQUEycEQsQ0FBM3BELEVBQThwRCxDQUE5cEQsRUFBaXFELENBQWpxRCxFQUFvcUQsQ0FBcHFELEVBQXVxRCxDQUF2cUQsRUFBMHFELENBQTFxRCxFQUE2cUQsQ0FBN3FELEVBQWdyRCxDQUFockQsRUFBbXJELENBQW5yRCxFQUFzckQsQ0FBdHJELEVBQXlyRCxDQUF6ckQsRUFBNHJELENBQTVyRCxFQUErckQsQ0FBL3JELEVBQWtzRCxDQUFsc0QsRUFBcXNELENBQXJzRCxFQUF3c0QsQ0FBeHNELEVBQTJzRCxDQUEzc0QsRUFBOHNELENBQTlzRCxFQUFpdEQsQ0FBanRELEVBQW90RCxDQUFwdEQsRUFBdXRELENBQXZ0RCxFQUEwdEQsQ0FBMXRELEVBQTZ0RCxDQUE3dEQsRUFBZ3VELENBQWh1RCxFQUFtdUQsQ0FBbnVELEVBQXN1RCxDQUF0dUQsRUFBeXVELENBQXp1RCxFQUE0dUQsQ0FBNXVELEVBQSt1RCxDQUEvdUQsRUFBa3ZELENBQWx2RCxFQUFxdkQsQ0FBcnZELEVBQXd2RCxFQUF4dkQsRUFBNHZELEVBQTV2RCxFQUFnd0QsQ0FBaHdELEVBQW13RCxDQUFud0QsRUFBc3dELENBQXR3RCxFQUF5d0QsQ0FBendELEVBQTR3RCxDQUE1d0QsRUFBK3dELENBQS93RCxFQUFreEQsQ0FBbHhELEVBQXF4RCxDQUFyeEQsRUFBd3hELENBQXh4RCxFQUEyeEQsQ0FBM3hELEVBQTh4RCxDQUE5eEQsRUFBaXlELENBQWp5RCxFQUFveUQsQ0FBcHlELEVBQXV5RCxDQUF2eUQsRUFBMHlELENBQTF5RCxFQUE2eUQsQ0FBN3lELEVBQWd6RCxDQUFoekQsRUFBbXpELENBQW56RCxFQUFzekQsQ0FBdHpELEVBQXl6RCxDQUF6ekQsRUFBNHpELENBQTV6RCxFQUErekQsQ0FBL3pELEVBQWswRCxDQUFsMEQsRUFBcTBELENBQXIwRCxFQUF3MEQsQ0FBeDBELEVBQTIwRCxDQUEzMEQsRUFBODBELENBQTkwRCxFQUFpMUQsQ0FBajFELEVBQW8xRCxDQUFwMUQsRUFBdTFELENBQXYxRCxFQUEwMUQsQ0FBMTFELEVBQTYxRCxDQUE3MUQsRUFBZzJELENBQWgyRCxFQUFtMkQsQ0FBbjJELEVBQXMyRCxDQUF0MkQsRUFBeTJELENBQXoyRCxFQUE0MkQsQ0FBNTJELEVBQSsyRCxDQUEvMkQsRUFBazNELENBQWwzRCxFQUFxM0QsQ0FBcjNELEVBQXczRCxDQUF4M0QsRUFBMjNELENBQTMzRCxFQUE4M0QsQ0FBOTNELEVBQWk0RCxDQUFqNEQsRUFBbzRELENBQXA0RCxFQUF1NEQsQ0FBdjRELEVBQTA0RCxDQUExNEQsRUFBNjRELENBQTc0RCxFQUFnNUQsQ0FBaDVELEVBQW01RCxDQUFuNUQsRUFBczVELENBQXQ1RCxFQUF5NUQsQ0FBejVELEVBQTQ1RCxDQUE1NUQsRUFBKzVELENBQS81RCxFQUFrNkQsQ0FBbDZELEVBQXE2RCxDQUFyNkQsRUFBdzZELENBQXg2RCxFQUEyNkQsQ0FBMzZELEVBQTg2RCxDQUE5NkQsRUFBaTdELENBQWo3RCxFQUFvN0QsQ0FBcDdELEVBQXU3RCxDQUF2N0QsRUFBMDdELENBQTE3RCxFQUE2N0QsQ0FBNzdELEVBQWc4RCxDQUFoOEQsRUFBbThELENBQW44RCxFQUFzOEQsQ0FBdDhELEVBQXk4RCxDQUF6OEQsRUFBNDhELENBQTU4RCxFQUErOEQsQ0FBLzhELEVBQWs5RCxDQUFsOUQsRUFBcTlELENBQXI5RCxFQUF3OUQsQ0FBeDlELEVBQTI5RCxDQUEzOUQsRUFBODlELENBQTk5RCxFQUFpK0QsQ0FBaitELEVBQW8rRCxDQUFwK0QsRUFBdStELENBQXYrRCxFQUEwK0QsQ0FBMStELEVBQTYrRCxDQUE3K0QsRUFBZy9ELENBQWgvRCxFQUFtL0QsQ0FBbi9ELEVBQXMvRCxDQUF0L0QsRUFBeS9ELENBQXovRCxFQUE0L0QsQ0FBNS9ELEVBQSsvRCxDQUEvL0QsRUFBa2dFLENBQWxnRSxFQUFxZ0UsQ0FBcmdFLEVBQXdnRSxDQUF4Z0UsRUFBMmdFLENBQTNnRSxFQUE4Z0UsQ0FBOWdFLEVBQWloRSxDQUFqaEUsRUFBb2hFLENBQXBoRSxFQUF1aEUsQ0FBdmhFLEVBQTBoRSxDQUExaEUsRUFBNmhFLEVBQTdoRSxFQUFpaUUsRUFBamlFLEVBQXFpRSxFQUFyaUUsRUFBeWlFLEVBQXppRSxFQUE2aUUsQ0FBN2lFLEVBQWdqRSxDQUFoakUsRUFBbWpFLENBQW5qRSxFQUFzakUsQ0FBdGpFLEVBQXlqRSxDQUF6akUsRUFBNGpFLENBQTVqRSxFQUErakUsQ0FBL2pFLEVBQWtrRSxDQUFsa0UsRUFBcWtFLENBQXJrRSxFQUF3a0UsQ0FBeGtFLEVBQTJrRSxDQUEza0UsRUFBOGtFLENBQTlrRSxFQUFpbEUsQ0FBamxFLEVBQW9sRSxDQUFwbEUsRUFBdWxFLENBQXZsRSxFQUEwbEUsQ0FBMWxFLEVBQTZsRSxDQUE3bEUsRUFBZ21FLENBQWhtRSxFQUFtbUUsQ0FBbm1FLEVBQXNtRSxDQUF0bUUsRUFBeW1FLENBQXptRSxFQUE0bUUsQ0FBNW1FLEVBQSttRSxDQUEvbUUsRUFBa25FLENBQWxuRSxFQUFxbkUsQ0FBcm5FLEVBQXduRSxDQUF4bkUsRUFBMm5FLENBQTNuRSxFQUE4bkUsQ0FBOW5FLEVBQWlvRSxDQUFqb0UsRUFBb29FLENBQXBvRSxFQUF1b0UsQ0FBdm9FLEVBQTBvRSxDQUExb0UsRUFBNm9FLEVBQTdvRSxFQUFpcEUsRUFBanBFLEVBQXFwRSxDQUFycEUsRUFBd3BFLENBQXhwRSxFQUEycEUsQ0FBM3BFLEVBQThwRSxDQUE5cEUsRUFBaXFFLENBQWpxRSxFQUFvcUUsQ0FBcHFFLEVBQXVxRSxDQUF2cUUsRUFBMHFFLENBQTFxRSxFQUE2cUUsQ0FBN3FFLEVBQWdyRSxDQUFockUsRUFBbXJFLENBQW5yRSxFQUFzckUsQ0FBdHJFLEVBQXlyRSxDQUF6ckUsRUFBNHJFLENBQTVyRSxFQUErckUsQ0FBL3JFLEVBQWtzRSxDQUFsc0UsRUFBcXNFLENBQXJzRSxFQUF3c0UsQ0FBeHNFLEVBQTJzRSxDQUEzc0UsRUFBOHNFLENBQTlzRSxFQUFpdEUsQ0FBanRFLEVBQW90RSxDQUFwdEUsRUFBdXRFLENBQXZ0RSxFQUEwdEUsQ0FBMXRFLEVBQTZ0RSxDQUE3dEUsRUFBZ3VFLENBQWh1RSxFQUFtdUUsQ0FBbnVFLEVBQXN1RSxDQUF0dUUsRUFBeXVFLENBQXp1RSxFQUE0dUUsQ0FBNXVFLEVBQSt1RSxDQUEvdUUsRUFBa3ZFLENBQWx2RSxFQUFxdkUsQ0FBcnZFLEVBQXd2RSxDQUF4dkUsRUFBMnZFLENBQTN2RSxFQUE4dkUsQ0FBOXZFLEVBQWl3RSxDQUFqd0UsRUFBb3dFLENBQXB3RSxFQUF1d0UsQ0FBdndFLEVBQTB3RSxDQUExd0UsRUFBNndFLENBQTd3RSxFQUFneEUsQ0FBaHhFLEVBQW14RSxDQUFueEUsRUFBc3hFLENBQXR4RSxFQUF5eEUsQ0FBenhFLEVBQTR4RSxDQUE1eEUsRUFBK3hFLENBQS94RSxFQUFreUUsQ0FBbHlFLEVBQXF5RSxDQUFyeUUsRUFBd3lFLENBQXh5RSxFQUEyeUUsQ0FBM3lFLEVBQTh5RSxDQUE5eUUsRUFBaXpFLENBQWp6RSxFQUFvekUsQ0FBcHpFLEVBQXV6RSxDQUF2ekUsRUFBMHpFLENBQTF6RSxFQUE2ekUsQ0FBN3pFLEVBQWcwRSxDQUFoMEUsRUFBbTBFLENBQW4wRSxFQUFzMEUsQ0FBdDBFLEVBQXkwRSxDQUF6MEUsRUFBNDBFLENBQTUwRSxFQUErMEUsQ0FBLzBFLENBREM7QUFFVCxZQUFVLEVBRkQ7QUFHVCxVQUFRLGNBSEM7QUFJVCxhQUFXLENBSkY7QUFLVCxVQUFRLFdBTEM7QUFNVCxhQUFXLElBTkY7QUFPVCxXQUFTLEVBUEE7QUFRVCxPQUFLLENBUkk7QUFTVCxPQUFLO0FBVEksRUFBRCxFQVdUO0FBQ0MsVUFBUSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLEVBQTJDLENBQTNDLEVBQThDLENBQTlDLEVBQWlELENBQWpELEVBQW9ELENBQXBELEVBQXVELENBQXZELEVBQTBELENBQTFELEVBQTZELENBQTdELEVBQWdFLENBQWhFLEVBQW1FLENBQW5FLEVBQXNFLENBQXRFLEVBQXlFLENBQXpFLEVBQTRFLENBQTVFLEVBQStFLENBQS9FLEVBQWtGLENBQWxGLEVBQXFGLENBQXJGLEVBQXdGLENBQXhGLEVBQTJGLENBQTNGLEVBQThGLENBQTlGLEVBQWlHLENBQWpHLEVBQW9HLENBQXBHLEVBQXVHLENBQXZHLEVBQTBHLENBQTFHLEVBQTZHLENBQTdHLEVBQWdILENBQWhILEVBQW1ILENBQW5ILEVBQXNILENBQXRILEVBQXlILENBQXpILEVBQTRILENBQTVILEVBQStILENBQS9ILEVBQWtJLENBQWxJLEVBQXFJLENBQXJJLEVBQXdJLENBQXhJLEVBQTJJLENBQTNJLEVBQThJLENBQTlJLEVBQWlKLENBQWpKLEVBQW9KLENBQXBKLEVBQXVKLENBQXZKLEVBQTBKLENBQTFKLEVBQTZKLENBQTdKLEVBQWdLLENBQWhLLEVBQW1LLENBQW5LLEVBQXNLLENBQXRLLEVBQXlLLENBQXpLLEVBQTRLLENBQTVLLEVBQStLLENBQS9LLEVBQWtMLENBQWxMLEVBQXFMLENBQXJMLEVBQXdMLENBQXhMLEVBQTJMLENBQTNMLEVBQThMLENBQTlMLEVBQWlNLENBQWpNLEVBQW9NLENBQXBNLEVBQXVNLENBQXZNLEVBQTBNLENBQTFNLEVBQTZNLENBQTdNLEVBQWdOLENBQWhOLEVBQW1OLENBQW5OLEVBQXNOLENBQXROLEVBQXlOLENBQXpOLEVBQTROLENBQTVOLEVBQStOLENBQS9OLEVBQWtPLENBQWxPLEVBQXFPLENBQXJPLEVBQXdPLENBQXhPLEVBQTJPLENBQTNPLEVBQThPLENBQTlPLEVBQWlQLENBQWpQLEVBQW9QLENBQXBQLEVBQXVQLENBQXZQLEVBQTBQLENBQTFQLEVBQTZQLENBQTdQLEVBQWdRLENBQWhRLEVBQW1RLENBQW5RLEVBQXNRLENBQXRRLEVBQXlRLENBQXpRLEVBQTRRLENBQTVRLEVBQStRLENBQS9RLEVBQWtSLENBQWxSLEVBQXFSLENBQXJSLEVBQXdSLENBQXhSLEVBQTJSLENBQTNSLEVBQThSLENBQTlSLEVBQWlTLENBQWpTLEVBQW9TLENBQXBTLEVBQXVTLENBQXZTLEVBQTBTLENBQTFTLEVBQTZTLENBQTdTLEVBQWdULENBQWhULEVBQW1ULENBQW5ULEVBQXNULENBQXRULEVBQXlULENBQXpULEVBQTRULENBQTVULEVBQStULENBQS9ULEVBQWtVLENBQWxVLEVBQXFVLENBQXJVLEVBQXdVLENBQXhVLEVBQTJVLENBQTNVLEVBQThVLENBQTlVLEVBQWlWLENBQWpWLEVBQW9WLENBQXBWLEVBQXVWLENBQXZWLEVBQTBWLENBQTFWLEVBQTZWLENBQTdWLEVBQWdXLENBQWhXLEVBQW1XLENBQW5XLEVBQXNXLENBQXRXLEVBQXlXLENBQXpXLEVBQTRXLENBQTVXLEVBQStXLENBQS9XLEVBQWtYLENBQWxYLEVBQXFYLENBQXJYLEVBQXdYLENBQXhYLEVBQTJYLENBQTNYLEVBQThYLENBQTlYLEVBQWlZLENBQWpZLEVBQW9ZLENBQXBZLEVBQXVZLENBQXZZLEVBQTBZLENBQTFZLEVBQTZZLENBQTdZLEVB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LEVBQThMLENBQTlMLEVBQWlNLENBQWpNLEVBQW9NLENBQXBNLEVBQXVNLENBQXZNLEVBQTBNLENBQTFNLEVBQTZNLENBQTdNLEVBQWdOLENBQWhOLEVBQW1OLENBQW5OLEVBQXNOLENBQXROLEVBQXlOLENBQXpOLEVBQTROLENBQTVOLEVBQStOLENBQS9OLEVBQWtPLENBQWxPLEVBQXFPLENBQXJPLEVBQXdPLENBQXhPLEVBQTJPLENBQTNPLEVBQThPLENBQTlPLEVBQWlQLENBQWpQLEVBQW9QLENBQXBQLEVBQXVQLENBQXZQLEVBQTBQLENBQTFQLEVBQTZQLENBQTdQLEVBQWdRLENBQWhRLEVBQW1RLENBQW5RLEVBQXNRLENBQXRRLEVBQXlRLENBQXpRLEVBQTRRLENBQTVRLEVBQStRLENBQS9RLEVBQWtSLENBQWxSLEVBQXFSLENBQXJSLEVBQXdSLENBQXhSLEVBQTJSLENBQTNSLEVBQThSLENBQTlSLEVBQWlTLENBQWpTLEVBQW9TLENBQXBTLEVBQXVTLENBQXZTLEVBQTBTLENBQTFTLEVBQTZTLENBQTdTLEVBQWdULENBQWhULEVBQW1ULENBQW5ULEVBQXNULENBQXRULEVBQXlULENBQXpULEVBQTRULENBQTVULEVBQStULENBQS9ULEVBQWtVLENBQWxVLEVBQXFVLENBQXJVLEVBQXdVLENBQXhVLEVBQTJVLENBQTNVLEVBQThVLENBQTlVLEVBQWlWLENBQWpWLEVBQW9WLENBQXBWLEVBQXVWLENBQXZWLEVBQTBWLENBQTFWLEVBQTZWLENBQTdWLEVBQWdXLENBQWhXLEVBQW1XLENBQW5XLEVBQXNXLENBQXRXLEVBQXlXLENBQXpXLEVBQTRXLENBQTVXLEVBQStXLENBQS9XLEVBQWtYLENBQWxYLEVBQXFYLENBQXJYLEVBQXdYLENBQXhYLEVBQTJYLENBQTNYLEVBQThYLENBQTlYLEVBQWlZLENBQWpZLEVBQW9ZLENBQXBZLEVBQXVZLENBQXZZLEVBQTBZLENBQTFZLEVBQTZZLENBQTdZLEVBQWdaLENBQWhaLEVBQW1aLENBQW5aLEVBQXNaLENBQXRaLEVBQXlaLENBQXpaLEVBQTRaLENBQTVa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MUosRUFBNkosQ0FBN0osRUFBZ0ssQ0FBaEssRUFBbUssQ0FBbkssRUFBc0ssQ0FBdEssRUFBeUssQ0FBekssRUFBNEssQ0FBNUssRUFBK0ssQ0FBL0ssRUFBa0wsQ0FBbEwsRUFBcUwsQ0FBckwsRUFBd0wsQ0FBeEwsRUFBMkwsQ0FBM0wsRUFBOEwsQ0FBOUwsRUFBaU0sQ0FBak0sRUFBb00sQ0FBcE0sRUFBdU0sQ0FBdk0sRUFBME0sQ0FBMU0sRUFBNk0sQ0FBN00sRUFBZ04sQ0FBaE4sRUFBbU4sQ0FBbk4sRUFBc04sQ0FBdE4sRUFBeU4sQ0FBek4sRUFBNE4sQ0FBNU4sRUFBK04sQ0FBL04sRUFBa08sQ0FBbE8sRUFBcU8sQ0FBck8sRUFBd08sQ0FBeE8sRUFBMk8sQ0FBM08sRUFBOE8sQ0FBOU8sRUFBaVAsQ0FBalAsRUFBb1AsQ0FBcFAsRUFBdVAsQ0FBdlAsRUFBMFAsQ0FBMVAsRUFBNlAsQ0FBN1AsRUFBZ1EsQ0FBaFEsRUFBbVEsQ0FBblEsRUFBc1EsQ0FBdFEsRUFBeVEsQ0FBelEsRUFBNFEsQ0FBNVEsRUFBK1EsQ0FBL1EsRUFBa1IsQ0FBbFIsRUFBcVIsQ0FBclIsRUFBd1IsQ0FBeFIsRUFBMlIsQ0FBM1IsRUFBOFIsQ0FBOVIsRUFBaVMsQ0FBalMsRUFBb1MsQ0FBcFMsRUFBdVMsQ0FBdlMsRUFBMFMsQ0FBMVMsRUFBNlMsQ0FBN1MsRUFBZ1QsQ0FBaFQsRUFBbVQsQ0FBblQsRUFBc1QsQ0FBdFQsRUFBeVQsQ0FBelQsRUFBNFQsQ0FBNVQsRUFBK1QsQ0FBL1QsRUFBa1UsQ0FBbFUsRUFBcVUsQ0FBclUsRUFBd1UsQ0FBeFUsRUFBMlUsQ0FBM1UsRUFBOFUsQ0FBOVUsRUFBaVYsQ0FBalYsRUFBb1YsQ0FBcFYsRUFBdVYsQ0FBdlYsRUFBMFYsQ0FBMVYsRUFBNlYsQ0FBN1YsRUFBZ1csQ0FBaFcsRUFBbVcsQ0FBblcsRUFBc1csQ0FBdFcsRUFBeVcsQ0FBelcsRUFBNFcsQ0FBNVcsRUFBK1csQ0FBL1csRUFBa1gsQ0FBbFgsRUFBcVgsQ0FBclgsRUFBd1gsQ0FBeFgsRUFBMlgsQ0FB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LENBQW5LLEVBQXNLLENBQXRLLEVBQXlLLENBQXpLLEVBQTRLLENBQTVLLEVBQStLLENBQS9LLEVBQWtMLENBQWxMLEVBQXFMLENBQXJMLEVBQXdMLENBQXhMLEVBQTJMLENBQTNMLEVBQThMLENBQTlMLEVBQWlNLENBQWpNLEVBQW9NLENBQXBNLEVBQXVNLENBQXZNLEVBQTBNLENBQTFNLEVBQTZNLENBQTdNLEVBQWdOLENBQWhOLEVBQW1OLENBQW5OLEVBQXNOLENBQXROLEVBQXlOLENBQXpOLEVBQTROLENBQTVOLEVBQStOLENBQS9OLEVBQWtPLENBQWxPLEVBQXFPLENBQXJPLEVBQXdPLENBQXhPLEVBQTJPLENBQTNPLEVBQThPLENBQTlPLEVBQWlQLENBQWpQLEVBQW9QLENBQXBQLEVBQXVQLENBQXZQLEVBQTBQLENBQTFQLEVBQTZQLENBQTdQLEVBQWdRLENBQWhRLEVBQW1RLENBQW5RLEVBQXNRLENBQXRRLEVBQXlRLENBQXpRLEVBQTRRLENBQTVRLEVBQStRLENBQS9RLEVBQWtSLENBQWxSLEVBQXFSLENBQXJSLEVBQXdSLENBQXhSLEVBQTJSLENBQTNSLEVBQThSLENBQTlSLEVBQWlTLENBQWpTLEVBQW9TLENBQXBTLEVBQXVTLENBQXZTLEVBQTBTLENBQTFTLEVBQTZTLENBQTdTLEVBQWdULENBQWhULEVBQW1ULENBQW5ULEVBQXNULENBQXRULEVBQXlULENBQXpULEVBQTRULENBQTVULEVBQStULENBQS9ULEVBQWtVLENBQWxVLEVBQXFVLENBQXJVLEVBQXdVLENBQXhVLEVBQTJVLENBQTNVLEVBQThVLENBQTlVLEVBQWlWLENBQWpWLEVBQW9WLENBQXBWLEVBQXVWLENBQXZWLEVBQTBWLENBQTFWLEVBQTZWLENBQTdWLEVBQWdXLENBQWhXLEVBQW1XLENBQW5XLEVBQXNXLENBQXRXLEVBQXlXLENBQXpXLEVBQTRXLENBQTVXLEVBQStXLENBQS9XLEVBQWtYLENBQWxYLEVBQXFYLENBQXJYLEVBQXdYLENBQXhYLEVBQTJYLENBQTNYLEVBQThYLENBQTlYLEVBQWlZLENBQWpZLEVBQW9Z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ekssRUFBNEssQ0FBNUssRUFBK0ssQ0FBL0ssRUFBa0wsQ0FBbEwsRUFBcUwsQ0FBckwsRUFBd0wsQ0FBeEwsRUFBMkwsQ0FBM0wsRUFBOEwsQ0FBOUwsRUFBaU0sQ0FBak0sRUFBb00sQ0FBcE0sRUFBdU0sQ0FBdk0sRUFBME0sQ0FBMU0sRUFBNk0sQ0FBN00sRUFBZ04sQ0FBaE4sRUFBbU4sQ0FBbk4sRUFBc04sQ0FBdE4sRUFBeU4sQ0FBek4sRUFBNE4sQ0FBNU4sRUFBK04sQ0FBL04sRUFBa08sQ0FBbE8sRUFBcU8sQ0FBck8sRUFBd08sQ0FBeE8sRUFBMk8sQ0FBM08sRUFBOE8sQ0FBOU8sRUFBaVAsQ0FBalAsRUFBb1AsQ0FBcFAsRUFBdVAsQ0FBdlAsRUFBMFAsQ0FBMVAsRUFBNlAsQ0FBN1AsRUFBZ1EsQ0FBaFEsRUFBbVEsQ0FBblEsRUFBc1EsQ0FBdFEsRUFBeVEsQ0FBelEsRUFBNFEsQ0FBNVEsRUFBK1EsQ0FBL1EsRUFBa1IsQ0FBbFIsRUFBcVIsQ0FBclIsRUFBd1IsQ0FBeFIsRUFBMlIsQ0FBM1IsRUFBOFIsQ0FBOVIsRUFBaVMsQ0FBalMsRUFBb1MsQ0FBcFMsRUFBdVMsQ0FBdlMsRUFBMFMsQ0FBMVMsRUFBNlMsQ0FBN1MsRUFBZ1QsQ0FBaFQsRUFBbVQsQ0FBblQsRUFBc1QsQ0FBdFQsRUFBeVQsQ0FBelQsRUFBNFQsQ0FBNVQsRUFBK1QsQ0FBL1QsRUFBa1UsQ0FBbFUsRUFBcVUsQ0FBclUsRUFBd1UsQ0FBeFUsRUFBMlUsQ0FBM1UsRUFBOFUsQ0FBOVUsRUFBaVYsQ0FBalYsRUFBb1YsQ0FBcFYsRUFBdVYsQ0FBdlYsRUFBMFYsQ0FBMVYsRUFBNlYsQ0FBN1YsRUFBZ1csQ0FBaFcsRUFBbVcsQ0FBblcsRUFBc1csQ0FBdFcsRUFBeVcsQ0FBelcsRUFBNFcsQ0FBNVcsRUFBK1csQ0FBL1csRUFBa1gsQ0FBbFgsRUFBcVgsQ0FBclgsRUFBd1gsQ0FBeFgsRUFBMlgsQ0FBM1gsRUFBOFgsQ0FBOVgsRUFBaVksQ0FBalksRUFBb1ksQ0FBcFksRUFBdVksQ0FBdlksRUFBMFksQ0FB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T0MsV0FBV0MsTUFBWCxDQUFrQixnQkFBUTtBQUNoQyxlQUFPeEMsU0FBUyxDQUFoQjtBQUNBLEtBRk0sRUFFSnNCLE1BRkksQ0FFRyxVQUFDbUIsT0FBRCxFQUFVekMsSUFBVixFQUFtQjtBQUM1QixZQUFHeUMsUUFBUXhDLE9BQVIsQ0FBZ0JELElBQWhCLElBQXdCLENBQTNCLEVBQTZCO0FBQzVCeUMsb0JBQVFsRCxJQUFSLENBQWFTLElBQWI7QUFDQTtBQUNELGVBQU95QyxPQUFQO0FBQ0EsS0FQTSxFQU9KLEVBUEksRUFPQUMsSUFQQSxDQU9LLFVBQUNDLENBQUQsRUFBSUMsQ0FBSixFQUFVO0FBQ3JCLGVBQU9ELElBQUlDLENBQVg7QUFDQSxLQVRNLENBQVA7QUFVQSxDQVhNLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGJhMDkwZmZhYWU3NDhmYzllY2I5IiwiaW1wb3J0IEV4dGVuZGVkU3ByaXRlIGZyb20gJy4vRXh0ZW5kZWRTcHJpdGUnO1xyXG5cclxuY2xhc3MgQUkgZXh0ZW5kcyBFeHRlbmRlZFNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzLCBiZWhhdmlvdXJzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IGAke3Byb3BzLnR5cGV9LSR7eH0tJHt5fWA7XHJcblxyXG4gICAgICAgIHRoaXMuYmVoYXZpb3VycyA9IGJlaGF2aW91cnM7XHJcblxyXG4gICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgICAgICBsaWZlOiAxMCxcclxuICAgICAgICAgICAgc3R1bjogMCxcclxuICAgICAgICAgICAgaGl0OiAwLFxyXG4gICAgICAgICAgICBub2hpdDogMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICAgIHR1cm5JZkJsb2NrZWQoKXtcclxuICAgICAgICBpZih0aGlzLmJvZHkuYmxvY2tlZC5sZWZ0IHx8IHRoaXMuYm9keS5ibG9ja2VkLnJpZ2h0KXtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS54ICo9IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHR1cm4oKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggKj0gLTE7XHJcbiAgICB9XHJcbiAgICBzZXRCb3VuZHMoYm91bmRUbyl7XHJcbiAgICAgICAgaWYoIWJvdW5kVG8gfHwgIU9iamVjdC5rZXlzKGJvdW5kVG8pLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm91bmRUbyA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneCcpICYmXHJcbiAgICAgICAgICAgIGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3knKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kVG8gPSBuZXcgUGhhc2VyLlBvaW50KFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueCxcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLnlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBAUmVjdGFuZ2xlIHsgeDEsIHgyIH1cclxuICAgICAgICBpZihib3VuZFRvLmhhc093blByb3BlcnR5KCd4MScpICYmXHJcbiAgICAgICAgICAgIGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3gyJykgJiZcclxuICAgICAgICAgICAgIWJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3kxJykgJiZcclxuICAgICAgICAgICAgIWJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3kyJykpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFRvID0gbmV3IFBoYXNlci5SZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby54MSxcclxuICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDIgLSBib3VuZFRvLngxLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5oZWlnaHRcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB7eDEsIHkxLCB4MiwgeTJ9XHJcbiAgICAgICAgaWYoYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneDEnKSAmJlxyXG4gICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd4MicpICYmXHJcbiAgICAgICAgICAgIGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3kxJykgJiZcclxuICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTInKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kVG8gPSBuZXcgUGhhc2VyLlJlY3RhbmdsZShcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngxLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueTEsXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby54MiAtIGJvdW5kVG8ueDEsXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby55MiAtIGJvdW5kVG8ueTFcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2hlY2tCb3VuZHMoKXtcclxuICAgICAgICBpZighdGhpcy5ib3VuZFRvKXtcclxuICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBAUG9pbnQge3gsIHl9XHJcbiAgICAgICAgaWYoIXRoaXMuYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSAmJlxyXG4gICAgICAgICAgICAhUGhhc2VyLlJlY3RhbmdsZS5jb250YWluc1BvaW50KHRoaXMuZ2V0Qm91bmRzKCksIHRoaXMuYm91bmRUbykgJiZcclxuICAgICAgICAgICAgKCh0aGlzLnggPCB0aGlzLmJvdW5kVG8ueCAmJiAhdGhpcy5mYWNpbmdSaWdodCkgfHxcclxuICAgICAgICAgICAgKHRoaXMueCA+IHRoaXMuYm91bmRUby54ICYmIHRoaXMuZmFjaW5nUmlnaHQpKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1cm4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEBSZWN0YW5nbGUge3gxLCB4Mn0gb3Ige3gxLCB5MSwgeDIsIHkyfVxyXG4gICAgICAgIGlmKHRoaXMuYm91bmRUbyAmJlxyXG4gICAgICAgICAgICB0aGlzLmJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3dpZHRoJykgJiZcclxuICAgICAgICAgICAgKHRoaXMueCA8IHRoaXMuYm91bmRUby54ICYmIHRoaXMuZmFjaW5nTGVmdCB8fFxyXG4gICAgICAgICAgICB0aGlzLnggPiB0aGlzLmJvdW5kVG8ueCArIHRoaXMuYm91bmRUby53aWR0aCAmJiB0aGlzLmZhY2luZ1JpZ2h0KSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1cm4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB3aGVuKHBhcmFtcykge1xyXG5cdFx0aWYoTWF0aC5yYW5kb20oKSA8IHBhcmFtcy5wcm9iYWJpbGl0eSl7XHJcblx0XHRcdHRoaXNbcGFyYW1zLmFjdGlvbl0gJiYgdGhpc1twYXJhbXMuYWN0aW9uXS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cdH1cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIC8vY29uc3QgZGVidWdCb3VuZHMgPSB0aGlzLmlkKydcXG4nKyAodGhpcy5ib3VuZFRvICYmIE9iamVjdC5rZXlzKHRoaXMuYm91bmRUbykubGVuZ3RoICYmIHRoaXMuYm91bmRUby54KSArJ1xcbicrICh0aGlzLnggfCAwKTtcclxuICAgICAgICAvL3RoaXMuZGVidWcoZGVidWdCb3VuZHMpO1xyXG4gICAgICAgIHRoaXMuYmVoYXZpb3Vycy5mb3JFYWNoKChiZWhhdmlvdXIpID0+IHtcclxuICAgICAgICAgICAgdGhpc1tiZWhhdmlvdXIuYWN0aW9uXSAmJiB0aGlzW2JlaGF2aW91ci5hY3Rpb25dLmNhbGwodGhpcywgYmVoYXZpb3VyLnBhcmFtcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFJO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvQUkuanMiLCJjbGFzcyBFeHRlbmRlZFNwcml0ZSBleHRlbmRzIFBoYXNlci5TcHJpdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzIHx8IHsgYW5pbWF0aW9uczogW10gfTtcclxuICAgICAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSwgMSk7XHJcbiAgICAgICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jaGVja1dvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm91dE9mQm91bmRzS2lsbCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdyYXZpdHkueSA9IHRoaXMucHJvcHMuZ3Jhdml0eTtcclxuICAgICAgICB0aGlzLl9kZWJ1Z1RleHQgPSB0aGlzLmFkZENoaWxkKFxyXG4gICAgICAgICAgICB0aGlzLmdhbWUuYWRkLnRleHQoMjAsIC0yMCwgJ2RlYnVnJywgeyBmb250OiBcIjEycHggQ291cmllclwiLCBmaWxsOiBcIiNmZmZmZmZcIiB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5fZGVidWdUZXh0LnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5hbmltYXRpb25zLmZvckVhY2goYW5pbWF0aW9uID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLmFkZChcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5uYW1lLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZyYW1lcy5tYXAoZnJhbWUgPT4gZnJhbWUudG9TdHJpbmcoKSksXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24uZnBzLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmxvb3BcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZ2FtZVN0YXRlID0gdGhpcy5nYW1lLnN0YXRlLnN0YXRlc1t0aGlzLmdhbWUuc3RhdGUuY3VycmVudF0uZ2FtZVN0YXRlO1xyXG5cclxuICAgICAgICBtb2J4Lm9ic2VydmUoZ2FtZVN0YXRlLCAoY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UnLCBjaGFuZ2UsIGdhbWVTdGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUgPSBtb2J4LmFjdGlvbigoY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuc3ByaXRlU3RhdGUsIGNoYW5nZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzSGl0dGluZygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwcml0ZVN0YXRlLmhpdCA+IHRoaXMuZ2FtZS50aW1lLm5vdztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNTdHVubmVkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlU3RhdGUuc3R1biA+IHRoaXMuZ2FtZS50aW1lLm5vdztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZmFjaW5nUmlnaHQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS54ID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZmFjaW5nTGVmdCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnggPCAwO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVMZWZ0KCl7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gLTE7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnZlbG9jaXR5LnggPiAtdGhpcy5wcm9wcy5tYXhTcGVlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC09IHRoaXMucHJvcHMuYWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlUmlnaHQoKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSAxO1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS52ZWxvY2l0eS54IDwgdGhpcy5wcm9wcy5tYXhTcGVlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ICs9IHRoaXMucHJvcHMuYWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlKCl7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgICAgICBpZih0aGlzLnNjYWxlLnggPT09IDEpe1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVSaWdodCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUxlZnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcCgpe1xyXG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC89IDEuMTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheSgnc3RvcCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGp1bXAoKXtcclxuICAgICAgICBpZih0aGlzLmJvZHkudG91Y2hpbmcuZG93biB8fCB0aGlzLmJvZHkuYmxvY2tlZC5kb3duKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgLT0gMzAwO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheSgnanVtcCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoaXQoKXtcclxuICAgICAgICBjb25zdCBoaXRVbnRpbCA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDkwMCxcclxuICAgICAgICAgICAgYnJlYWtVbnRpbCA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDEwMDA7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ05vdyAlcyBIaXQgJXMgQnJlYWsgJXMnLCB0aGlzLmdhbWUudGltZS5ub3csIGhpdFVudGlsLCBicmVha1VudGlsKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgICAgICAgaGl0OiBoaXRVbnRpbCxcclxuICAgICAgICAgICAgbm9oaXQ6IGJyZWFrVW50aWxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheSgnaGl0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaHVydChkaXJlY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55IC09IDEwMDtcclxuICAgICAgICBpZihkaXJlY3Rpb24gJiYgZGlyZWN0aW9uLmxlZnQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAtPSAxMDAgfHwgdGhpcy5wcm9wcy5tYXhTcGVlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uICYmIGRpcmVjdGlvbi5yaWdodCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ICs9IDEwMCB8fCB0aGlzLnByb3BzLm1heFNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheSgnaHVydCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlYnVnKHRleHQpe1xyXG4gICAgICAgdGhpcy5fZGVidWdUZXh0LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgdGhpcy5fZGVidWdUZXh0LnNjYWxlLnggPSB0aGlzLnNjYWxlLng7XHJcbiAgICAgICB0aGlzLl9kZWJ1Z1RleHQuc2V0VGV4dCh0ZXh0LnRvU3RyaW5nKCkgfHwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ1tTcHJpdGVdIHN0YXRlJyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHRlbmRlZFNwcml0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0V4dGVuZGVkU3ByaXRlLmpzIiwiaW1wb3J0IEV4dGVuZGVkU3ByaXRlIGZyb20gJy4vRXh0ZW5kZWRTcHJpdGUnO1xyXG5cclxuY2xhc3MgSHVtYW4gZXh0ZW5kcyBFeHRlbmRlZFNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGxpZmU6IDEwLFxyXG4gICAgICAgICAgICBzdHVuOiAwLFxyXG4gICAgICAgICAgICBoaXQ6IDAsXHJcbiAgICAgICAgICAgIG5vaGl0OiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEh1bWFuO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJpbXBvcnQgY3JlYXRlIGZyb20gJy4vbWVudS5jcmVhdGUnO1xyXG4vL2ltcG9ydCB1cGRhdGUgZnJvbSAnLi9wbGF5LnVwZGF0ZSc7XHJcblxyXG5jbGFzcyBNZW51IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxufVxyXG5cclxuTWVudS5wcm90b3R5cGUuY3JlYXRlID0gY3JlYXRlO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNZW51O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvbWVudS9pbmRleC5qcyIsImltcG9ydCBBSSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0FJJztcbmltcG9ydCBIdW1hbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL0h1bWFuJztcblxuaW1wb3J0IGxldmVsTG9hZGVyIGZyb20gJy4uLy4uL3NlcnZpY2VzL2xldmVsTG9hZGVyJztcbmltcG9ydCBjcmVhdHVyZUZhY3RvcnkgZnJvbSAnLi4vLi4vc2VydmljZXMvY3JlYXR1cmVGYWN0b3J5JztcbmltcG9ydCBjcmVhdHVyZUNvbmZpZyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnJztcblxuaW1wb3J0IGluaXQgZnJvbSAnLi9wbGF5LmluaXQnO1xuaW1wb3J0IHByZWxvYWQgZnJvbSAnLi9wbGF5LnByZWxvYWQnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuL3BsYXkuY3JlYXRlJztcbmltcG9ydCB1cGRhdGUgZnJvbSAnLi9wbGF5LnVwZGF0ZSc7XG5cclxuY2xhc3MgUGxheSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnbG9iYWxDb25maWcpIHtcclxuICAgICAgICB0aGlzLmtleXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5lbmVteSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmxldmVsID0ge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kTGF5ZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgZ3JvdW5kTGF5ZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdGlsZW1hcDogdW5kZWZpbmVkXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcgPSBnbG9iYWxDb25maWc7XHJcbiAgICAgICAgdGhpcy5jcmVhdHVyZUNvbmZpZyA9IGNyZWF0dXJlQ29uZmlnO1xyXG4gICAgICAgIHRoaXMubGV2ZWxMb2FkZXIgPSBsZXZlbExvYWRlci5jYWxsKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY3JlYXR1cmVGYWN0b3J5ID0gY3JlYXR1cmVGYWN0b3J5LmNhbGwodGhpcyk7XHJcbiAgICB9XHJcbn1cblxuUGxheS5wcm90b3R5cGUuaW5pdCA9IGluaXQ7XG5QbGF5LnByb3RvdHlwZS5wcmVsb2FkID0gcHJlbG9hZDtcclxuUGxheS5wcm90b3R5cGUuY3JlYXRlID0gY3JlYXRlO1xyXG5QbGF5LnByb3RvdHlwZS51cGRhdGUgPSB1cGRhdGU7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L2luZGV4LmpzIiwiY29uc3QgZ2xvYmFsQ29uZmlnID0ge1xyXG4gICAgd2lkdGg6IDU0NixcclxuICAgIGhlaWdodDogMzY4LFxyXG4gICAgYmxvY2tzOiAzLFxyXG4gICAgZG9tRWxlbWVudDogJ2dhbWUnLFxyXG4gICAgYmFja2dyb3VuZFBhdGg6ICdiYWNrZ3JvdW5kcy8nLFxyXG4gICAgdGlsZXNldFBhdGg6ICd0aWxlc2V0cy8nLFxyXG4gICAgbGV2ZWxQYXRoOiAnbGV2ZWxzLycsXHJcbiAgICB0ZXh0dXJlQXRsYXNQYXRoOiAnc3ByaXRlc2hlZXRzLycsXHJcbiAgICB0ZXh0dXJlQXRsYXNOYW1lOiAncHJlMmF0bGFzJyxcclxuICAgIHRleHR1cmVBdGxhc0ltYWdlOiAncHJlMmF0bGFzLnBuZycsXHJcbiAgICB0ZXh0dXJlQXRsYXNKc29uOiAncHJlMmF0bGFzLmpzb24nXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnbG9iYWxDb25maWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2xvYmFsQ29uZmlnLmpzIiwidmFyIGNyZWF0dXJlQ29uZmlncyA9IHtcclxuICBjcmVhdHVyZURlZmF1bHRzOiB7XHJcbiAgICBhY3RpdmU6IHRydWUsXHJcbiAgICBncmF2aXR5OiA1MDAsXHJcbiAgICBib3VuY2U6IDAuMixcclxuICAgIG1hc3M6IDEsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogMTAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBsaXZlczogMSxcclxuICAgIGxpZmVzcGFuOiBJbmZpbml0eSxcclxuICAgIHNlbnNlOiAxNTAsXHJcbiAgICBhbmltYXRpb25zOiBbXSxcclxuICAgIHRpbWVPZjoge1xyXG4gICAgICAnbW92ZSc6IDIwMCxcclxuICAgICAgJ2hpdCc6IDEwMCxcclxuICAgICAgJ2h1cnQnOiA1MDAsXHJcbiAgICAgICdzdG9wJzogMjAwLFxyXG4gICAgICAnaWRsZSc6IDEwXHJcbiAgICB9LFxyXG4gICAgYm91bmRUbyA6IHt9LFxyXG4gICAgYmVoYXZpb3VyczogW1xyXG4gICAgICAgIHsgYWN0aW9uOiAndHVybklmQmxvY2tlZCcgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ21vdmUnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdjaGVja0JvdW5kcycgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgbWFuOiB7XHJcbiAgICB0eXBlOiAnbWFuJyxcclxuICAgIG1heFNwZWVkOiAyMDAsXHJcbiAgICBsaXZlczogOCxcclxuICAgIGxpZmVzcGFuOiBJbmZpbml0eSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzExLCcwMycsJzA1JywxNCwyMF0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2hpdCcsIGZyYW1lczogWzIyLDI0LDI4LDMxLDM0LDIyLDI0LDI4LDMxLDM0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzdG9wJywgZnJhbWVzOiBbNDIsNDUsNDksNTJdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMTYsNDEsNDcsNTAsNTAsNTAsNTAsNTAsNTAsNTAsNTAsMTMsNTAsMTMsNTAsMTNdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjcsMjcsMjcsMjcsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMzAsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjcsMzAsMjcsMzAsMzUsMzYsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjUsJzA3JywnMDcnLCcwNycsJzA3JywnMDInLCcwMiddLCBmcHM6IDUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnaHVydCcsIGZyYW1lczogWzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzdHVuJywgZnJhbWVzOiBbMTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzE5XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFsxMSwnMDMnLCcwNScsMTQsMjBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBkaW5vOiB7XHJcbiAgICB0eXBlOiAnZGlubycsXHJcbiAgICBtYXNzOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDUsXHJcbiAgICBiZWhhdmlvdXJzOiBbXHJcbiAgICAgICAgeyBhY3Rpb246ICd0dXJuSWZCbG9ja2VkJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnbW92ZScgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ2NoZWNrQm91bmRzJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnd2hlbicsIHBhcmFtczogeyBwcm9iYWJpbGl0eTogMC4wMSwgYWN0aW9uOiAnanVtcCcgfSB9XHJcbiAgICBdLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzYwLDM2MCwzNjAsMzYwLDM2MCwzNjAsMzYwLDM2N10sIGZwczogNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzYwLDM2MSwzNjQsMzY3LDM2OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzM2MCwzNjEsMzY0LDM2NywzNjldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2ZhbGwnLCBmcmFtZXM6IFszNjldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM3MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNjAsMzYxLDM2NCwzNjddLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGJlYXI6IHtcclxuICAgIHR5cGU6ICdiZWFyJyxcclxuICAgIG1hc3M6IDEuMixcclxuICAgIG1heFNwZWVkOiA3NSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDE1LFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzIxXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMyMCwzMjEsMzI0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM2NiwzNjMsMzU4LDMxN10sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzMyOF0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgJ3N1cGVyLWJlYXInOiB7XHJcbiAgICBhY2NlbGVyYXRpb246IDMwLFxyXG4gICAgbWF4U3BlZWQ6IDIwMCxcclxuICAgIGltYWdlOiAnc3VwZXItYmVhci1zcHJpdGUtcmVmJywgLy8gb3ZlcnJpZGUgc3ByaXRlIChjcmVhdHVyZSBuYW1lIGJ5IGRlZmF1bHQpXHJcbiAgICBhbmltYXRpb25zOiBbXVxyXG4gIH0sXHJcbiAgdGlnZXI6IHtcclxuICAgIHR5cGU6ICd0aWdlcicsXHJcbiAgICBtYXNzOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDIwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzkzLDM5NV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM5MywzOTVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszOTksNDAxXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZmFsbCcsIGZyYW1lczogWzM5OV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQwMl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszOTMsMzk1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBwdGVybzoge1xyXG4gICAgdHlwZTogJ3B0ZXJvJyxcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiAxMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFs0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3Nyw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3Nyw0NzddLCBmcHM6IDMsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzQwMyw0MDQsNDA1LDQwMyw0MDQsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDAzLDQwNCw0MDUsNDAzLDQwNCw0MDUsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2Rlc2NlbmQnLCBmcmFtZXM6IFs0MDVdLCBmcHM6IDE1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2FzY2VuZCcsIGZyYW1lczogWzQwMyw0MDQsNDA1XSwgZnBzOiAxNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0NzFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbNDA1LDQwMyw0MDRdLCBmcHM6IDE1LCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGRyYWdvbmZseToge1xyXG4gICAgdHlwZTogJ2RyYWdvbmZseScsXHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzM3LDMzOF0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMzNywzMzhdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3R1cm4nLCBmcmFtZXM6IFszMzksMzQwXSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNDJdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzM3LDMzOF0sIGZwczogMTIsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgYmF0OiB7XHJcbiAgICB0eXBlOiAnYmF0JyxcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiAyMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNTEsMzUyLDM1MSwzNTEsMzUxLDM1MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM1NywzNTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM2Ml0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNTcsMzU5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBzcGlkZXI6IHtcclxuICAgIHR5cGU6ICdzcGlkZXInLFxyXG4gICAgbWFzczogMC4zLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzM1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM2NSwzNjgsMzcwLDM3Ml0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFsyOTksMzAyLDMwNSwzMDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3R1cm4nLCBmcmFtZXM6IFszMTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2NsaW1iJywgZnJhbWVzOiBbMzQxLDM0MywzNDUsMzQ3XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICd3YWl0JywgZnJhbWVzOiBbMzMyLDMzNSwzNzJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzMyMl0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIG5hdGl2ZToge1xyXG4gICAgdHlwZTogJ25hdGl2ZScsXHJcbiAgICBtYXhTcGVlZDogMTAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyMCxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNzNdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszNzMsMzc2LDM3OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzgwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNzMsMzc2LDM3OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgcGFycm90OiB7XHJcbiAgICB0eXBlOiAncGFycm90JyxcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiAxMDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzk0LDM5NywzOThdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszOTQsMzk3LDM5OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDAwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszOTQsMzk3LDM5OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgaW5zZWN0OiB7XHJcbiAgICB0eXBlOiAnaW5zZWN0JyxcclxuICAgIG1hc3M6IDEsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDI1LFxyXG4gICAgYmVoYXZpb3VyczogW1xyXG4gICAgICAgIHsgYWN0aW9uOiAndHVybklmQmxvY2tlZCcgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ21vdmUnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdjaGVja0JvdW5kcycgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ3doZW4nLCBwYXJhbXM6IHsgcHJvYmFiaWxpdHk6IDAuMDMsIGFjdGlvbjogJ2p1bXAnIH0gfVxyXG4gICAgXSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM0OCwzNDgsMzQ4LDM0OCwzNDgsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMyMywzNDgsMzQ5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzIzLDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM0OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszMjMsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgYnVnOiB7XHJcbiAgICB0eXBlOiAnYnVnJyxcclxuICAgIG1hc3M6IDEsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDI1LFxyXG4gICAgYmVoYXZpb3VyczogW1xyXG4gICAgICAgIHsgYWN0aW9uOiAndHVybklmQmxvY2tlZCcgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ21vdmUnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdjaGVja0JvdW5kcycgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ3doZW4nLCBwYXJhbXM6IHsgcHJvYmFiaWxpdHk6IDAuMDIsIGFjdGlvbjogJ2p1bXAnIH0gfVxyXG4gICAgXSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzM0NCwzNDZdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM0NF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBmcm9nOiB7XHJcbiAgICB0eXBlOiAnZnJvZycsXHJcbiAgICBtYXNzOiAxLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMS41LFxyXG4gICAganVtcGluZzogNTAwLFxyXG4gICAgbWF4U3BlZWQ6IDgwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiA0MCxcclxuICAgIGJlaGF2aW91cnM6IFtcclxuICAgICAgICB7IGFjdGlvbjogJ3R1cm5JZkJsb2NrZWQnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdtb3ZlJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnY2hlY2tCb3VuZHMnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICd3aGVuJywgcGFyYW1zOiB7IHByb2JhYmlsaXR5OiAwLjEsIGFjdGlvbjogJ2p1bXAnIH0gfVxyXG4gICAgXSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMyNV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMyNSwzMjcsMzMxLDMyNV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszMjUsMzI3LDMzMSwzMjVdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszMzRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzI1LDMyNywzMzEsMzI1XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgdHVydGxlOiB7XHJcbiAgICB0eXBlOiAndHVydGxlJyxcclxuICAgIG1hc3M6IDIsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMC4zLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM5MF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNzcsMzgxLDM4NCwzODVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszODcsMzg5LDM5MCwzOTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM5Ml0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgamVsbHk6IHtcclxuICAgIHR5cGU6ICdqZWxseScsXHJcbiAgICBtYXNzOiAyLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEsXHJcbiAgICBtYXhTcGVlZDogNSxcclxuICAgIGFjY2VsZXJhdGlvbjogMSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbNDIwLDQzMyw0MzRdLCBmcHM6IDMsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGdvcmlsbGE6IHtcclxuICAgIHR5cGU6ICdnb3JpbGxhJyxcclxuICAgIG1hc3M6IDUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzQxMV0sIGZwczogNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdmYWxsJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfVxyXG59O1xyXG5cclxuZm9yKHZhciBjcmVhdHVyZSBpbiBjcmVhdHVyZUNvbmZpZ3Mpe1xyXG4gIC8vY3JlYXR1cmVDb25maWdzW2NyZWF0dXJlXSA9IF8ubWVyZ2Uoe30sIGNvbmZpZ3MuY3JlYXR1cmVEZWZhdWx0cywgY29uZmlnc1tjcmVhdHVyZV0pO1xyXG4gIHZhciBkZWZhdWx0cyA9IGNyZWF0dXJlQ29uZmlnc1snY3JlYXR1cmVEZWZhdWx0cyddO1xyXG4gIGZvcih2YXIgcHJvcCBpbiBkZWZhdWx0cyl7XHJcbiAgICBpZihjcmVhdHVyZUNvbmZpZ3NbY3JlYXR1cmVdW3Byb3BdID09PSB1bmRlZmluZWQpe1xyXG4gICAgICBjcmVhdHVyZUNvbmZpZ3NbY3JlYXR1cmVdW3Byb3BdID0gZGVmYXVsdHNbcHJvcF07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0dXJlQ29uZmlncztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEJhdCBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9iYXQuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgQmVhciBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJlYXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmVhci5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBCdWcgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYnVnLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIERpbm8gZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEaW5vO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Rpbm8uanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgRHJhZ29uZmx5IGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRHJhZ29uZmx5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2RyYWdvbmZseS5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBGcm9nIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRnJvZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9mcm9nLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEdvcmlsbGEgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHb3JpbGxhO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2dvcmlsbGEuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgSW5zZWN0IGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5zZWN0O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2luc2VjdC5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBKZWxseSBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEplbGx5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2plbGx5LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIE5hdGl2ZSBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5hdGl2ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9uYXRpdmUuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgUGFycm90IGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFycm90O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3BhcnJvdC5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBQdGVybyBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFB0ZXJvO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3B0ZXJvLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIFNwaWRlciBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNwaWRlcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9zcGlkZXIuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgVGlnZXIgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUaWdlcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy90aWdlci5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBUdXJ0bGUgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUdXJ0bGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvdHVydGxlLmpzIiwiZnVuY3Rpb24gY3JlYXRlKCl7XHJcblxyXG4gICAgLy8gZnBzIGRlYnVnZ2luZ1xyXG4gICAgdGhpcy5nYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xyXG5cclxuICAgIC8vIENUQSB0ZXh0XHJcbiAgICBjb25zdCB0ZXh0ID0gdGhpcy5nYW1lLmFkZC50ZXh0KFxyXG4gICAgICAgIHRoaXMuZ2FtZS53aWR0aCAvIDIsXHJcbiAgICAgICAgdGhpcy5nYW1lLmhlaWdodCAvIDIsXHJcbiAgICAgICAgXCJDaG9vc2UgYSBsZXZlbCFcXG4xIDIgMyA0IDUgNiBcXG5PciBwcmVzcyBhIGtleSB0byBnZW5lcmF0ZSFcIixcclxuICAgICAgICB7IGZvbnQ6IFwiMjRweCBDb3VyaWVyXCIsIGZpbGw6IFwiI2ZmZmZmZlwiLCBhbGlnbjogXCJjZW50ZXJcIiB9XHJcbiAgICApO1xyXG5cclxuICAgIHRleHQuYW5jaG9yLnNldCgwLjUpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5vbkRvd25DYWxsYmFjayA9IChlKSA9PiB7XHJcbiAgICAgICAgLy8gaWYgcHJlc3NlZCBrZXkgaXMgbnVtYmVyIChzcGFjZSBpcyBlbXB0eSBzdHJpbmcgd2hpY2ggZXZhbHVhdGVzIHRydWUpXHJcbiAgICAgICAgaWYoIWlzTmFOKGUua2V5KSAmJiAvW15cXHNdLy50ZXN0KGUua2V5KSl7XHJcbiAgICAgICAgICAgIGZldGNoKCcvbGV2ZWwvJyArIGUua2V5LCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnXHJcbiAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICB9KS50aGVuKChsZXZlbENvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdQbGF5JywgdHJ1ZSwgdHJ1ZSwgbGV2ZWxDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLm9uRG93bkNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdQbGF5JywgdHJ1ZSwgdHJ1ZSwgdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLm9uRG93bkNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bTWVudV1bQ3JlYXRlXScpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9tZW51L21lbnUuY3JlYXRlLmpzIiwiaW1wb3J0IEh1bWFuIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSHVtYW4nO1xyXG5pbXBvcnQgQUkgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9BSSc7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGUoKXtcclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0NyZWF0ZV0nKTtcclxuICAgIC8vIGZwcyBkZWJ1Z2dpbmdcclxuICAgIHRoaXMuZ2FtZS50aW1lLmFkdmFuY2VkVGltaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBbU0VUIExFVkVMXSBzZXQgZGltZW5zaW9ucywgc3RhcnQgcGh5c2ljIHN5c3RlbVxyXG4gICAgdGhpcy5nYW1lLndvcmxkLnNldEJvdW5kcyhcclxuICAgICAgICAwLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcud2lkdGggKiB0aGlzLmdsb2JhbENvbmZpZy5ibG9ja3MsXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcuaGVpZ2h0XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcblxyXG4gICAgdGhpcy5sZXZlbExvYWRlci5jcmVhdGVCYWNrZ3JvdW5kKCdiYWNrZ3JvdW5kTGF5ZXInKTtcclxuICAgIHRoaXMubGV2ZWxMb2FkZXIuY3JlYXRlVGlsZXMoXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy50aWxlbWFwLFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcudGlsZXNldCxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXRJbWFnZVxyXG4gICAgKTtcclxuICAgIHRoaXMubGV2ZWxMb2FkZXIuY3JlYXRlTGF5ZXJzKHRoaXMubGV2ZWxDb25maWcubGF5ZXJzKTtcclxuXHJcbiAgICAvLyBbU0VUIExFVkVMXSBmaXggYmFja2dyb3VuZCwgcmVzaXplXHJcbiAgICB0aGlzLmxldmVsLmJhY2tncm91bmRMYXllci5maXhlZFRvQ2FtZXJhID0gdGhpcy5sZXZlbENvbmZpZy5maXhlZEJhY2tncm91bmQ7XHJcbiAgICB0aGlzLmxldmVsLmdyb3VuZExheWVyLnJlc2l6ZVdvcmxkKCk7XHJcblxyXG4gICAgdGhpcy5nYW1lU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgIGluaXRpYWxpc2VkOiBmYWxzZSxcclxuICAgICAgICBzY29yZTogMFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSA9IG1vYnguYWN0aW9uKChjaGFuZ2UpID0+IHtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IE9iamVjdC5hc3NpZ24odGhpcy5nYW1lU3RhdGUsIGNoYW5nZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtb2J4Lm9ic2VydmUodGhpcy5nYW1lU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tnYW1lU3RhdGVdIGNoYW5nZScsIGNoYW5nZSwgdGhpcy5nYW1lU3RhdGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7IGluaXRpYWxpc2VkOiB0cnVlIH0pO1xyXG5cclxuICAgIC8vIFtQTEFZRVJdXHJcbiAgICB0aGlzLnBsYXllciA9IG5ldyBIdW1hbihcclxuICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5lbnRyeVBvaW50LngsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5lbnRyeVBvaW50LnksXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcudGV4dHVyZUF0bGFzTmFtZSxcclxuICAgICAgICB0aGlzLmNyZWF0dXJlQ29uZmlnLm1hblxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBbRU5FTUlFU11cclxuICAgIHRoaXMuZW5lbWllcyA9IG5ldyBQaGFzZXIuR3JvdXAodGhpcy5nYW1lKTtcclxuICAgIHRoaXMubGV2ZWxDb25maWcuZW5lbWllcy5mb3JFYWNoKHRoaXMuY3JlYXR1cmVGYWN0b3J5LmNyZWF0ZSk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xyXG5cclxuICAgIC8vIGJpbmQga2V5c1xyXG4gICAgdGhpcy5rZXlzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuICAgIHRoaXMua2V5cy5zcGFjZSA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlNQQUNFQkFSKTtcclxuXHJcbiAgICAvLyBzY29yZSB0ZXh0XHJcbiAgICB0aGlzLm1lbnUgPSB0aGlzLmdhbWUuYWRkLnRleHQoXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcud2lkdGggLSAxMjAsXHJcbiAgICAgICAgMCxcclxuICAgICAgICBcIkxpZmU6IFwiICsgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSxcclxuICAgICAgICB7IGZvbnQ6IFwiMjRweCBDb3VyaWVyXCIsIGZpbGw6IFwiI2ZmZlwiLCBhbGlnbjogXCJjZW50ZXJcIiB9XHJcbiAgICApO1xyXG4gICAgdGhpcy5tZW51LmZpeGVkVG9DYW1lcmEgPSB0cnVlO1xyXG4gICAgbW9ieC5vYnNlcnZlKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgIHRoaXMubWVudS5zZXRUZXh0KFwiTGlmZTogXCIgKyB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmNyZWF0ZS5qcyIsImltcG9ydCBsZXZlbEdlbmVyYXRvciBmcm9tICcuLi8uLi9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9pbmRleCc7XHJcblxyXG5mdW5jdGlvbiBpbml0KGxldmVsQ29uZmlnKXtcclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0luaXRdJywgbGV2ZWxDb25maWcpO1xyXG4gICAgdGhpcy5sZXZlbENvbmZpZyA9IGxldmVsQ29uZmlnIHx8IGxldmVsR2VuZXJhdG9yLmNyZWF0ZSgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5pbml0LmpzIiwiZnVuY3Rpb24gcHJlbG9hZCgpe1xyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bUHJlbG9hZF0nKTtcclxuXHJcbiAgICAvLyBhc3NldHMgdG8gbG9hZCByZWxhdGl2ZSB0byAvYXNzZXRzLy4uXHJcbiAgICB0aGlzLmdhbWUubG9hZC5hdGxhcyhcclxuICAgICAgICAncHJlMmF0bGFzJyxcclxuICAgICAgICAnc3ByaXRlc2hlZXRzL3ByZTJhdGxhcy5wbmcnLFxyXG4gICAgICAgICdzcHJpdGVzaGVldHMvcHJlMmF0bGFzLmpzb24nLFxyXG4gICAgICAgIFBoYXNlci5Mb2FkZXIuVEVYVFVSRV9BVExBU19KU09OX0hBU0hcclxuICAgICk7XHJcblxyXG4gICAgLy8gbG9hZCBiYWNrZ3JvdW5kXHJcbiAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSh0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRLZXksIHRoaXMuZ2xvYmFsQ29uZmlnLmJhY2tncm91bmRQYXRoICsgdGhpcy5sZXZlbENvbmZpZy5iYWNrZ3JvdW5kSW1hZ2UgKyB0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRJbWFnZUV4dGVuc2lvbik7XHJcbiAgICAvLyBsb2FkIHRpbGVzZXRcclxuICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKHRoaXMubGV2ZWxDb25maWcudGlsZXNldCwgdGhpcy5nbG9iYWxDb25maWcudGlsZXNldFBhdGggKyB0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXRJbWFnZSArIHRoaXMubGV2ZWxDb25maWcudGlsZXNldEltYWdlRXh0ZW5zaW9uKTtcclxuICAgIC8vIGxvYWQgdGlsZW1hcFxyXG4gICAgaWYodHlwZW9mIHRoaXMubGV2ZWxDb25maWcudGlsZWRKc29uID09PSAnc3RyaW5nJyl7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQudGlsZW1hcCh0aGlzLmxldmVsQ29uZmlnLnRpbGVtYXAsIHRoaXMuZ2xvYmFsQ29uZmlnLmxldmVsUGF0aCArIHRoaXMubGV2ZWxDb25maWcudGlsZWRKc29uLCBudWxsLCBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQudGlsZW1hcCh0aGlzLmxldmVsQ29uZmlnLnRpbGVtYXAsIG51bGwsIHRoaXMubGV2ZWxDb25maWcudGlsZWRKc29uLCBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmVsb2FkO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnByZWxvYWQuanMiLCJmdW5jdGlvbiB1cGRhdGUoKXtcclxuICAgIC8vY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bVXBkYXRlXScpO1xyXG4gICAgLy8gZnBzXHJcbiAgICB0aGlzLmdhbWUuZGVidWcudGV4dCh0aGlzLmdhbWUudGltZS5mcHMsIDUsIDIwKTtcclxuXHJcbiAgICAvLyBjb2xsaWRlXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5sZXZlbC5jb2xsaXNpb25MYXllcik7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5lbmVtaWVzLCB0aGlzLmxldmVsLmNvbGxpc2lvbkxheWVyKTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5sZXZlbC5kZWF0aExheWVyLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0RFQUQhJyk7XHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdNZW51JywgdHJ1ZSwgdHJ1ZSwgdW5kZWZpbmVkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMucGxheWVyLCB0aGlzLmVuZW1pZXMsIChwbGF5ZXIsIGVuZW15KSA9PiB7XHJcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIuYm9keS50b3VjaGluZy5kb3duICYmIGVuZW15LmJvZHkudG91Y2hpbmcudXApe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLnBsYXllci5pc0hpdHRpbmcgJiYgIXRoaXMucGxheWVyLmlzU3R1bm5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGxpZmU6IHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUgLSAxLFxyXG4gICAgICAgICAgICAgICAgc3R1bjogdGhpcy5nYW1lLnRpbWUubm93ICsgMTUwMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaHVydChlbmVteS5ib2R5LnRvdWNoaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBtb3ZlXHJcbiAgICBvbktleVByZXNzLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uS2V5UHJlc3MoKXtcclxuICAgIC8vIHN0dW4gPT4gYmxvY2tlZFxyXG4gICAgaWYodGhpcy5wbGF5ZXIuaXNTdHVubmVkKXtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3N0dW4nKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbW92ZSBsZWZ0IC8gcmlnaHRcclxuICAgIGlmKHRoaXMua2V5cy5sZWZ0LmlzRG93bil7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZUxlZnQoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgIH0gZWxzZSBpZih0aGlzLmtleXMucmlnaHQuaXNEb3duKXtcclxuICAgICAgICB0aGlzLnBsYXllci5tb3ZlUmlnaHQoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnaWRsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGp1bXBcclxuICAgIGlmKHRoaXMua2V5cy51cC5pc0Rvd24pe1xyXG4gICAgICAgIHRoaXMucGxheWVyLmp1bXAoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2p1bXAnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBoaXRcclxuICAgIGlmKHRoaXMua2V5cy5zcGFjZS5pc0Rvd24pe1xyXG4gICAgICAgIGlmKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLm5vaGl0IDwgdGhpcy5nYW1lLnRpbWUubm93ICYmIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmhpdCA8IHRoaXMuZ2FtZS50aW1lLm5vdyl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmhpdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2hpdCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnVwZGF0ZS5qcyIsImltcG9ydCBnbG9iYWxDb25maWcgZnJvbSAnLi9nbG9iYWxDb25maWcuanMnO1xyXG5pbXBvcnQgTWVudSBmcm9tICcuL2dhbWVzdGF0ZXMvbWVudS9pbmRleC5qcyc7XHJcbmltcG9ydCBQbGF5IGZyb20gJy4vZ2FtZXN0YXRlcy9wbGF5L2luZGV4LmpzJztcclxuXHJcbi8vIGluc3RhbnRpYXRlIGEgUGhhc2VyLkdhbWVcclxuY29uc3QgUExBVEZPUk1FUiA9IG5ldyBQaGFzZXIuR2FtZShcclxuICAgIGdsb2JhbENvbmZpZy53aWR0aCxcclxuICAgIGdsb2JhbENvbmZpZy5oZWlnaHQsXHJcbiAgICBQaGFzZXIuQVVUTyxcclxuICAgIGdsb2JhbENvbmZpZy5kb21FbGVtZW50XHJcbik7XHJcblxyXG4vLyByZWdpc3RlciBnYW1lc3RhdGVzICh3aWxsIGJlIGluc3RhbnRpYXRlZCB3LyB0aGlzLmdhbWUgYXMgMXN0IHBhcmFtLCBwYXNzIGdhbWVDb25maWcgYXMgMm5kKVxyXG5QTEFURk9STUVSLnN0YXRlLmFkZCgnTWVudScsIE1lbnUuYmluZChudWxsLCBnbG9iYWxDb25maWcpKTtcclxuUExBVEZPUk1FUi5zdGF0ZS5hZGQoJ1BsYXknLCBQbGF5LmJpbmQobnVsbCwgZ2xvYmFsQ29uZmlnKSk7XHJcblxyXG5QTEFURk9STUVSLnN0YXRlLnN0YXJ0KCdNZW51JywgdHJ1ZSwgdHJ1ZSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvaW5kZXguanMiLCJpbXBvcnQgYmF0IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2JhdC5qcyc7XHJcbmltcG9ydCBiZWFyIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2JlYXIuanMnO1xyXG5pbXBvcnQgYnVnIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyc7XHJcbmltcG9ydCBkaW5vIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Rpbm8uanMnO1xyXG5pbXBvcnQgZHJhZ29uZmx5IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2RyYWdvbmZseS5qcyc7XHJcbmltcG9ydCBmcm9nIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Zyb2cuanMnO1xyXG5pbXBvcnQgZ29yaWxsYSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9nb3JpbGxhLmpzJztcclxuaW1wb3J0IGluc2VjdCBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9pbnNlY3QuanMnO1xyXG5pbXBvcnQgamVsbHkgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvamVsbHkuanMnO1xyXG5pbXBvcnQgbmF0aXZlIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL25hdGl2ZS5qcyc7XHJcbmltcG9ydCBwYXJyb3QgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvcGFycm90LmpzJztcclxuaW1wb3J0IHB0ZXJvIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL3B0ZXJvLmpzJztcclxuaW1wb3J0IHNwaWRlciBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9zcGlkZXIuanMnO1xyXG5pbXBvcnQgdGlnZXIgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvdGlnZXIuanMnO1xyXG5pbXBvcnQgdHVydGxlIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyc7XHJcblxyXG5pbXBvcnQgQUkgZnJvbSAnLi4vY29tcG9uZW50cy9BSSc7XHJcblxyXG5mdW5jdGlvbiBjcmVhdHVyZUZhY3RvcnkoKSB7XHJcbiAgICBjb25zdCBDcmVhdHVyZSA9IHtcclxuICAgICAgICBiYXQ6IGJhdCxcclxuICAgICAgICBiZWFyOiBiZWFyLFxyXG4gICAgICAgIGJ1ZzogYnVnLFxyXG4gICAgICAgIGRpbm86IGRpbm8sXHJcbiAgICAgICAgZHJhZ29uZmx5OiBkcmFnb25mbHksXHJcbiAgICAgICAgZnJvZzogZnJvZyxcclxuICAgICAgICBnb3JpbGxhOiBnb3JpbGxhLFxyXG4gICAgICAgIGluc2VjdDogaW5zZWN0LFxyXG4gICAgICAgIGplbGx5OiBqZWxseSxcclxuICAgICAgICBuYXRpdmU6IG5hdGl2ZSxcclxuICAgICAgICBwYXJyb3Q6IHBhcnJvdCxcclxuICAgICAgICBwdGVybzogcHRlcm8sXHJcbiAgICAgICAgc3BpZGVyOiBzcGlkZXIsXHJcbiAgICAgICAgdGlnZXI6IHRpZ2VyLFxyXG4gICAgICAgIHR1cnRsZTogdHVydGxlXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlOiAobGV2ZWxDb25maWcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZW5lbXkgPSBuZXcgQUkoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgICAgICAgICBsZXZlbENvbmZpZy5vcmlnaW4ueCxcclxuICAgICAgICAgICAgICAgIGxldmVsQ29uZmlnLm9yaWdpbi55LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxDb25maWcudGV4dHVyZUF0bGFzTmFtZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWdbbGV2ZWxDb25maWcudHlwZV0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0dXJlQ29uZmlnW2xldmVsQ29uZmlnLnR5cGVdLmJlaGF2aW91cnNcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgZW5lbXkuc2V0Qm91bmRzKGxldmVsQ29uZmlnLmJvdW5kVG8pO1xyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMuYWRkKGVuZW15KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXR1cmVGYWN0b3J5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2NyZWF0dXJlRmFjdG9yeS5qcyIsImltcG9ydCBMZXZlbEJ1aWxkZXIgZnJvbSAnLi9sZXZlbEJ1aWxkZXInO1xyXG5pbXBvcnQgbGV2ZWxDb25maWcgZnJvbSAnLi9tb2RlbHMvbGV2ZWxDb25maWcnO1xyXG5cclxuY29uc3QgbGV2ZWxHZW5lcmF0b3IgPSB7XHJcbiAgICBjcmVhdGUoKXtcclxuICAgICAgICBjb25zdCBsZXZlbEJ1aWxkZXIgPSBuZXcgTGV2ZWxCdWlsZGVyKGxldmVsQ29uZmlnKTtcclxuICAgICAgICByZXR1cm4gbGV2ZWxCdWlsZGVyXHJcbiAgICAgICAgICAgIC5jcmVhdGVMYXllcnMoMzQgKiAzLCAyMyAqIDEwKVxyXG4gICAgICAgICAgICAucmFuZG9tQmFja2dyb3VuZCgpXHJcbiAgICAgICAgICAgIC5idWlsZCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGV2ZWxHZW5lcmF0b3I7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvaW5kZXguanMiLCJpbXBvcnQge1xyXG4gICAgZmxhdHRlbixcclxuICAgIGFwcGx5TWF0cml4LFxyXG4gICAgY3JlYXRlTWF0cml4LFxyXG4gICAgbGF5ZXJUb01hdHJpeCxcclxuICAgIGNoZWNrSWZBcmVhSXNDb3ZlcmVkXHJcbn0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7XHJcbiAgICBncm91bmRMYXllcixcclxuICAgIGNvbGxpc2lvbkxheWVyLFxyXG4gICAgZGVhdGhMYXllclxyXG59IGZyb20gJy4vbW9kZWxzL2xheWVycyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgY29sdW1uLFxyXG4gICAgc25vd2JhbGxcclxufSBmcm9tICcuL21vZGVscy9pc2xhbmRzJztcclxuXHJcbmltcG9ydCBiYWNrZ3JvdW5kcyBmcm9tICcuL21vZGVscy9iYWNrZ3JvdW5kcyc7XHJcblxyXG4vLyB3aXRoIGZyZXF1ZW5jeVxyXG5jb25zdCBlbmVteVR5cGVzID0gW1xyXG4gICAgJ2JhdCcsICdiYXQnLCAnYmF0JywgJ2JhdCcsXHJcbiAgICAnYmVhcicsICdiZWFyJywgJ2JlYXInLCAnYmVhcicsICdiZWFyJywgJ2JlYXInLFxyXG4gICAgJ2J1ZycsXHJcbiAgICAnZGlubycsXHJcbiAgICAnZHJhZ29uZmx5JywgJ2RyYWdvbmZseScsICdkcmFnb25mbHknLCAnZHJhZ29uZmx5JywgJ2RyYWdvbmZseScsXHJcbiAgICAnZnJvZycsXHJcbiAgICAnaW5zZWN0JyxcclxuICAgICdqZWxseScsXHJcbiAgICAnbmF0aXZlJywgJ25hdGl2ZScsICduYXRpdmUnLCAnbmF0aXZlJywgJ25hdGl2ZScsXHJcbiAgICAncGFycm90JyxcclxuICAgICdwdGVybycsXHJcbiAgICAnc3BpZGVyJywgJ3NwaWRlcicsICdzcGlkZXInLCAnc3BpZGVyJyxcclxuICAgICd0aWdlcicsXHJcbiAgICAndHVydGxlJ1xyXG5dO1xyXG5cclxuY29uc3QgZmluZFBsYWNlc0ZvciA9IChhTWF0cml4LCBpdGVtcywgcmV0cnkpID0+IHtcclxuICAgIGxldCBtYXRyaXggPSBhTWF0cml4LnNsaWNlKDApO1xyXG4gICAgbGV0IGVuZW1pZXMgPSBbXTtcclxuICAgIHdoaWxlKHJldHJ5LS0pe1xyXG4gICAgICAgIGxldCBpdGVtID0gaXRlbXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaXRlbXMubGVuZ3RoKV0sXHJcbiAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF0cml4WzBdLmxlbmd0aCAtIGl0ZW1bMF0ubGVuZ3RoKSksXHJcbiAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF0cml4Lmxlbmd0aCAtIGl0ZW0ubGVuZ3RoKSk7XHJcbiAgICAgICAgaWYoY2hlY2tJZkFyZWFJc0NvdmVyZWQobWF0cml4LCB4LCB5LCBpdGVtWzBdLmxlbmd0aCwgaXRlbS5sZW5ndGgpKXtcclxuICAgICAgICAgICAgZW5lbWllcy5wdXNoKFt4LCB5LCBpdGVtWzBdLmxlbmd0aF0pO1xyXG4gICAgICAgICAgICBhcHBseU1hdHJpeChtYXRyaXgsIGl0ZW0sIHgsIHkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZW5lbWllczogZW5lbWllcyxcclxuICAgICAgICBpc2xhbmRzOiBtYXRyaXhcclxuICAgIH07XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVFbmVteUF0ID0gKHhUaWxlLCB5VGlsZSwgdGlsZXNXaWR0aCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuXHRcdFwidHlwZVwiOiBlbmVteVR5cGVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVuZW15VHlwZXMubGVuZ3RoKV0sXHJcblx0XHRcIm51bWJlclwiOiAxLFxyXG5cdFx0XCJsaWZlc3BhblwiOiBJbmZpbml0eSxcclxuXHRcdFwib3JpZ2luXCI6IHtcclxuXHRcdFx0XCJ4XCI6ICh4VGlsZSArIHRpbGVzV2lkdGggLyAyKSAqIDE2LFxyXG5cdFx0XHRcInlcIjogeVRpbGUgKiAxNlxyXG5cdFx0fSxcclxuXHRcdFwiYm91bmRUb1wiOiB7XHJcblx0XHRcdFwieDFcIjogeFRpbGUgKiAxNixcclxuXHRcdFx0XCJ4MlwiOiAoeFRpbGUgKyB0aWxlc1dpZHRoKSAqIDE2XHJcblx0XHR9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuY29uc3QgZ2V0Q29sbGlzaW9uTGF5ZXIgPSAoZmxhdE1hdHJpeCwgY29sbGlzaW9uVGlsZXMpID0+IHtcclxuICAgIGxldCBtYXRyaXggPSBmbGF0TWF0cml4LnNsaWNlKDApLm1hcCgodGlsZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBjb2xsaXNpb25UaWxlcy5pbmRleE9mKHRpbGUpID4gLTFcclxuICAgICAgICAgICAgPyB0aWxlXHJcbiAgICAgICAgICAgIDogMDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hdHJpeDtcclxufTtcclxuXHJcbmNvbnN0IGlzbGFuZHMgPSBbXHJcbiAgICBbWzAsMCwwLDBdLFswLDc3LDc4LDBdLFswLDkxLDkyLDBdLFswLDAsMCwwXV0sXHJcbiAgICBbWzAsIDAsIDAsIDBdLCBbNzcsIDExMSwgMTExLCA3OF0sIFs5MSwgMTMwLCAxMzAsIDkyXSwgWzAsIDAsIDAsIDBdXSxcclxuICAgIFtbMCwgMCwgMCwgMCwgMCwgMCwgMF0sIFs3NywgMTExLCAxMTEsIDE0MiwgMTExLCAxNDIsIDc4XSwgWzkxLCAxMzAsIDEzMCwgMTQ0LCAxMzAsIDE0NCwgOTJdLCBbMCwgMCwgMCwgMCwgMCwgMCwgMF1dLFxyXG4gICAgW1swLCAwLCAwLCAwXSwgWzAsIDE4LCAxOSwgMTZdLCBbMTUsIDc5LCAyMywgNTJdLCBbNTgsIDkzLCAzOSwgMzRdLCBbMTEyLCAxMTMsIDM0LCA4M10sIFs3NywgMTExLCAxMTEsIDc4XSwgWzkxLCAxMzAsIDEzMCwgOTJdLCBbMCwgMCwgMCwgMF1dLFxyXG4gICAgW1swLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxbMCw3NywxMTEsNzgsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFswLDkxLDEzMCw5MiwwLDAsMCw3NywxMTEsNzgsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDkxLDEzMCw5MiwwLDAsMCw3Nyw3OCwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCw5MSw5MiwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF1dLFxyXG4gICAgW1swLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsNjQsMF0sWzAsMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDY0LDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCw2NCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDAsMF0sWzAsNjQsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwXV0sXHJcbiAgICBbWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsNzcsMTExLDc4LDBdLFswLDAsMCwwLDAsMCwwLDc3LDc4LDAsMCwwLDAsOTEsMTMwLDkyLDBdLFswLDc3LDExMSw3OCwwLDAsMCw5MSw5Miw3Nyw3OCwwLDAsMCwwLDAsMF0sWzAsOTEsMTMwLDkyLDAsMCwwLDAsMCw5MSw5MiwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF1dLFxyXG4gICAgY29sdW1uLFxyXG4gICAgW1swLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsOTgsOTksMjQzLDEwMCwxMDUsOTcsNjQsOTcsOTcsNjQsOTcsNjQsOTcsOTgsOTksMTAwLDEwNCwxMDQsMTA1LDBdLFswLDEyMiwxMjcsMTI2LDIwNiwwLDAsMCwwLDAsMCwwLDAsMCwyNDUsMTI3LDEyNSwxMjYsMTI3LDAsMF0sWzAsMCwyNjg0MzU0NjgxLDI2ODQzNTQ1OTEsMCwwLDAsMCwwLDAsMCwwLDAsMCwyMzAsMjE2LDIzMCwyMzAsMjE2LDAsMF1dLFxyXG4gICAgc25vd2JhbGxcclxuXTtcclxuY29uc3QgY29sbGlzaW9uVGlsZXMgPSBbMjQsNjQsNzcsNzgsOTEsOTIsOTcsOTgsOTksMTAwLDEwNCwxMDUsMTExLDEyMywxMjQsMTI1LDEyNiwxMjcsMTMwLDE2NywxODAsMTk1LDE5NywyMDQsMjA1LDIwNiwyMDcsMjA4LDIyOSwyNDNdO1xyXG5cclxudmFyIExldmVsQnVpbGRlciA9IGZ1bmN0aW9uKGxldmVsQ29uZmlnKXtcclxuICAgIGxldCBsZXZlbCA9IGxldmVsQ29uZmlnO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGVMYXllcnModGlsZXNXaWR0aCwgdGlsZXNIZWlnaHQpe1xuICAgICAgICAgICAgLy8gMTAwOiByYXJlLCA0MDogZnJlcXVlbnRcbiAgICAgICAgICAgIGNvbnN0IGRlbnNpdHkgPSAxMDAsXG4gICAgICAgICAgICAgICAgcmV0cnkgPSBNYXRoLmZsb29yKCh0aWxlc1dpZHRoICogdGlsZXNIZWlnaHQpIC8gZGVuc2l0eSk7XG4gICAgICAgICAgICBjb25zdCBwbGFjZXNGb3IgPSBmaW5kUGxhY2VzRm9yKGNyZWF0ZU1hdHJpeCh0aWxlc0hlaWdodCwgdGlsZXNXaWR0aCwgMCksIGlzbGFuZHMsIHJldHJ5KTtcblxuICAgICAgICAgICAgbGV2ZWwuZW5lbWllcyA9IHBsYWNlc0Zvci5lbmVtaWVzLm1hcChlbmVteSA9PiBjcmVhdGVFbmVteUF0LmFwcGx5KG51bGwsIGVuZW15KSk7XG5cbiAgICAgICAgICAgIGdyb3VuZExheWVyLmRhdGEgPSBmbGF0dGVuKHBsYWNlc0Zvci5pc2xhbmRzKTtcbiAgICAgICAgICAgIGNvbGxpc2lvbkxheWVyLmRhdGEgPSBnZXRDb2xsaXNpb25MYXllcihncm91bmRMYXllci5kYXRhLCBjb2xsaXNpb25UaWxlcyk7XG4gICAgICAgICAgICBkZWF0aExheWVyLmRhdGEgPSBncm91bmRMYXllci5kYXRhLm1hcCh0aWxlID0+IDApO1xuXHJcbiAgICAgICAgICAgIGxldmVsLnRpbGVkSnNvbi53aWR0aCA9IHRpbGVzV2lkdGg7XHJcbiAgICAgICAgICAgIGxldmVsLnRpbGVkSnNvbi5oZWlnaHQgPSB0aWxlc0hlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGdyb3VuZExheWVyLndpZHRoID0gdGlsZXNXaWR0aDtcclxuICAgICAgICAgICAgZ3JvdW5kTGF5ZXIuaGVpZ2h0ID0gdGlsZXNIZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbGxpc2lvbkxheWVyLndpZHRoID0gdGlsZXNXaWR0aDtcclxuICAgICAgICAgICAgY29sbGlzaW9uTGF5ZXIuaGVpZ2h0ID0gdGlsZXNIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBsZXZlbC53aWR0aCA9IHRpbGVzV2lkdGggKiAxNjtcclxuICAgICAgICAgICAgbGV2ZWwuaGVpZ2h0ID0gdGlsZXNIZWlnaHQgKiAxNjtcclxuXHJcbiAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgIC8vIDE5NSA9IHNwaWtlXHJcbiAgICAgICAgICAgICAgICBncm91bmRMYXllci5kYXRhW2dyb3VuZExheWVyLmRhdGEubGVuZ3RoIC0gdGlsZXNXaWR0aF0gPSAxOTU7XHJcbiAgICAgICAgICAgICAgICBkZWF0aExheWVyLmRhdGFbZGVhdGhMYXllci5kYXRhLmxlbmd0aCAtIHRpbGVzV2lkdGhdID0gMTk1O1xyXG4gICAgICAgICAgICB9IHdoaWxlKHRpbGVzV2lkdGgtLSk7XHJcblxyXG4gICAgICAgICAgICBsZXZlbC50aWxlZEpzb24ubGF5ZXJzID0gW1xyXG4gICAgICAgICAgICAgICAgZ3JvdW5kTGF5ZXIsXHJcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25MYXllcixcclxuICAgICAgICAgICAgICAgIGRlYXRoTGF5ZXJcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByYW5kb21CYWNrZ3JvdW5kKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHJhbmRvbUJhY2tncm91bmQgPSBiYWNrZ3JvdW5kc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBiYWNrZ3JvdW5kcy5sZW5ndGgpXVxyXG4gICAgICAgICAgICBsZXZlbC5iYWNrZ3JvdW5kSW1hZ2UgPSByYW5kb21CYWNrZ3JvdW5kLmJhY2tncm91bmRJbWFnZTtcclxuICAgICAgICAgICAgbGV2ZWwuYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uID0gcmFuZG9tQmFja2dyb3VuZC5iYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb247XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnVpbGQoKXtcclxuICAgICAgICAgICAgcmV0dXJuIGxldmVsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMZXZlbEJ1aWxkZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbGV2ZWxCdWlsZGVyLmpzIiwiY29uc3QgbGV2ZWxNb2RlbCA9IHtcclxuXHRcImhlaWdodFwiOiAyMyxcclxuXHRcImxheWVyc1wiOiBbe1xyXG5cdFx0XHRcImRhdGFcIjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDE4LCAxOSwgMTYsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDE1LCA3OSwgMjMsIDUyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA1OCwgOTMsIDM5LCAzNCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMTEyLCAxMTMsIDM0LCA4MywgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgNzcsIDExMSwgMTExLCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDEzMCwgMTMwLCA5MiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgNzcsIDc4LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5MSwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDk3LCA5OCwgNzcsIDc4LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5MSwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG5cdFx0XHRcImhlaWdodFwiOiAyMyxcclxuXHRcdFx0XCJuYW1lXCI6IFwiZ3JvdW5kLWxheWVyXCIsXHJcblx0XHRcdFwib3BhY2l0eVwiOiAxLFxyXG5cdFx0XHRcInR5cGVcIjogXCJ0aWxlbGF5ZXJcIixcclxuXHRcdFx0XCJ2aXNpYmxlXCI6IHRydWUsXHJcblx0XHRcdFwid2lkdGhcIjogMzQsXHJcblx0XHRcdFwieFwiOiAwLFxyXG5cdFx0XHRcInlcIjogMFxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0XCJkYXRhXCI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA3NywgMTExLCAxMTEsIDc4LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5MSwgMTMwLCAxMzAsIDkyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA3NywgNzgsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDkxLCA5MiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTcsIDk4LCA3NywgNzgsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDkxLCA5MiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcblx0XHRcdFwiaGVpZ2h0XCI6IDIzLFxyXG5cdFx0XHRcIm5hbWVcIjogXCJjb2xsaXNpb24tbGF5ZXJcIixcclxuXHRcdFx0XCJvcGFjaXR5XCI6IDEsXHJcblx0XHRcdFwidHlwZVwiOiBcInRpbGVsYXllclwiLFxyXG5cdFx0XHRcInZpc2libGVcIjogZmFsc2UsXHJcblx0XHRcdFwid2lkdGhcIjogMzQsXHJcblx0XHRcdFwieFwiOiAwLFxyXG5cdFx0XHRcInlcIjogMFxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0XCJkYXRhXCI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuXHRcdFx0XCJoZWlnaHRcIjogMjMsXHJcblx0XHRcdFwibmFtZVwiOiBcImRlYXRoLWxheWVyXCIsXHJcblx0XHRcdFwib3BhY2l0eVwiOiAxLFxyXG5cdFx0XHRcInR5cGVcIjogXCJ0aWxlbGF5ZXJcIixcclxuXHRcdFx0XCJ2aXNpYmxlXCI6IGZhbHNlLFxyXG5cdFx0XHRcIndpZHRoXCI6IDM0LFxyXG5cdFx0XHRcInhcIjogMCxcclxuXHRcdFx0XCJ5XCI6IDBcclxuXHRcdH1cclxuXHRdLFxyXG5cdFwibmV4dG9iamVjdGlkXCI6IDEsXHJcblx0XCJvcmllbnRhdGlvblwiOiBcIm9ydGhvZ29uYWxcIixcclxuXHRcInByb3BlcnRpZXNcIjoge1xyXG5cclxuXHR9LFxyXG5cdFwicmVuZGVyb3JkZXJcIjogXCJyaWdodC1kb3duXCIsXHJcblx0XCJ0aWxlaGVpZ2h0XCI6IDE2LFxyXG5cdFwidGlsZXNldHNcIjogW3tcclxuXHRcdFwiY29sdW1uc1wiOiAxMSxcclxuXHRcdFwiZmlyc3RnaWRcIjogMSxcclxuXHRcdFwiaW1hZ2VcIjogXCJMMS5wbmdcIixcclxuXHRcdFwiaW1hZ2VoZWlnaHRcIjogMzg0LFxyXG5cdFx0XCJpbWFnZXdpZHRoXCI6IDE3NixcclxuXHRcdFwibWFyZ2luXCI6IDAsXHJcblx0XHRcIm5hbWVcIjogXCJMMVwiLFxyXG5cdFx0XCJwcm9wZXJ0aWVzXCI6IHtcclxuXHJcblx0XHR9LFxyXG5cdFx0XCJzcGFjaW5nXCI6IDAsXHJcblx0XHRcInRpbGVjb3VudFwiOiAyNjQsXHJcblx0XHRcInRpbGVoZWlnaHRcIjogMTYsXHJcblx0XHRcInRpbGV3aWR0aFwiOiAxNlxyXG5cdH1dLFxyXG5cdFwidGlsZXdpZHRoXCI6IDE2LFxyXG5cdFwidmVyc2lvblwiOiAxLFxyXG5cdFwid2lkdGhcIjogMzRcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxldmVsTW9kZWw7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL2xldmVsLmpzIiwiaW1wb3J0IGxldmVsIGZyb20gJy4vbGV2ZWwnO1xyXG5cclxuY29uc3QgbGV2ZWxDb25maWcgPSB7XHJcblx0XCJpZFwiOiBcInJpc2Utb2YtdGhlLXRpZGVcIixcclxuXHRcIm5hbWVcIjogXCJSaXNlIG9mIHRoZSBUaWRlXCIsXHJcblx0XCJ0aWxlc2V0XCI6IFwidGlsZXNldC1sZXZlbC1yaXNlLW9mLXRoZS10aWRlXCIsXHJcblx0XCJ0aWxlbWFwXCI6IFwidGlsZW1hcC1sZXZlbC1yaXNlLW9mLXRoZS10aWRlXCIsXHJcblx0XCJ0aWxlZEpzb25cIjogbGV2ZWwsXHJcblx0XCJ0aWxlc2V0SW1hZ2VcIjogXCJMMVwiLFxyXG5cdFwidGlsZXNldEltYWdlRXh0ZW5zaW9uXCI6IFwiLnBuZ1wiLFxyXG5cdFwiYmFja2dyb3VuZEltYWdlXCI6IFwiYmczc2VhbWxlc3NcIixcclxuXHRcImJhY2tncm91bmRJbWFnZUV4dGVuc2lvblwiOiBcIi5qcGdcIixcclxuXHRcImJhY2tncm91bmRLZXlcIjogXCJiYWNrZ3JvdW5kLTJcIixcclxuXHRcIndpZHRoXCI6IDU0NixcclxuXHRcImhlaWdodFwiOiAzNjgsXHJcblx0XCJsYXllcnNcIjoge1xyXG5cdFx0XCJncm91bmRMYXllclwiOiB7XHJcblx0XHRcdFwia2V5XCI6IFwiZ3JvdW5kLWxheWVyXCIsXHJcblx0XHRcdFwidmlzaWJsZVwiOiB0cnVlXHJcblx0XHR9LFxyXG5cdFx0XCJjb2xsaXNpb25MYXllclwiOiB7XHJcblx0XHRcdFwia2V5XCI6IFwiY29sbGlzaW9uLWxheWVyXCIsXHJcblx0XHRcdFwidmlzaWJsZVwiOiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdFwiZGVhdGhMYXllclwiOiB7XHJcblx0XHRcdFwia2V5XCI6IFwiZGVhdGgtbGF5ZXJcIixcclxuXHRcdFx0XCJ2aXNpYmxlXCI6IGZhbHNlXHJcblx0XHR9XHJcblx0fSxcclxuXHRcImZpeGVkQmFja2dyb3VuZFwiOiB0cnVlLFxyXG5cdFwiZW50cnlQb2ludFwiOiB7XHJcblx0XHRcInhcIjogMTAsXHJcblx0XHRcInlcIjogMTBcclxuXHR9LFxyXG5cdFwicG9ydGFsc1wiOiBbXSxcclxuXHRcInBsYXRmb3Jtc1wiOiBbXSxcclxuXHRcImJvbnVzXCI6IFtdLFxyXG5cdFwiZW5lbWllc1wiOiBbXVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGV2ZWxDb25maWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL2xldmVsQ29uZmlnLmpzIiwiZnVuY3Rpb24gbGV2ZWxMb2FkZXIoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNyZWF0ZUJhY2tncm91bmQ6IChsYXllck5hbWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC5iYWNrZ3JvdW5kTGF5ZXIgPSB0aGlzLmdhbWUuYWRkLnRpbGVTcHJpdGUoXHJcbiAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxDb25maWcud2lkdGgsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmhlaWdodCxcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxDb25maWcuYmFja2dyb3VuZEtleVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlTGF5ZXI6IChsYXllcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsW2xheWVyXSA9IHRoaXMubGV2ZWwudGlsZW1hcC5jcmVhdGVMYXllcih0aGlzLmxldmVsQ29uZmlnW2xheWVyXSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGVMYXllcnM6IChsYXllcnMpID0+IHtcclxuICAgICAgICAgICAgZm9yKGxldCBsYXllciBpbiBsYXllcnMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbFtsYXllcl0gPSB0aGlzLmxldmVsLnRpbGVtYXAuY3JlYXRlTGF5ZXIodGhpcy5sZXZlbENvbmZpZy5sYXllcnNbbGF5ZXJdLmtleSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsW2xheWVyXS52aXNpYmxlID0gdGhpcy5sZXZlbENvbmZpZy5sYXllcnNbbGF5ZXJdLnZpc2libGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZVRpbGVzOiAodGlsZW1hcEtleSwgdGlsZXNldEtleSwgdGlsZXNldEltYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcCA9IHRoaXMuZ2FtZS5hZGQudGlsZW1hcCh0aWxlbWFwS2V5KTtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC50aWxlbWFwLmFkZFRpbGVzZXRJbWFnZSh0aWxlc2V0SW1hZ2UsIHRpbGVzZXRLZXkpO1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLnRpbGVtYXAuc2V0Q29sbGlzaW9uQmV0d2VlbigwLCAzMDAwLCB0cnVlLCB0aGlzLmxldmVsQ29uZmlnLmxheWVycy5jb2xsaXNpb25MYXllci5rZXkpO1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLnRpbGVtYXAuc2V0Q29sbGlzaW9uQmV0d2VlbigwLCAzMDAwLCB0cnVlLCB0aGlzLmxldmVsQ29uZmlnLmxheWVycy5kZWF0aExheWVyLmtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxldmVsTG9hZGVyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsTG9hZGVyLmpzIiwiY29uc3QgYmFja2dyb3VuZHMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImJnM3NlYW1sZXNzXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5qcGdcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwidm9sY2Fub1wiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJjYXZlXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImJnMXNlYW1sZXNzXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImZvcmVzdC1ncmVlblwiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJmb3Jlc3QtZmlyZVwiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJmb3Jlc3Qtb3JhbmdlXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImZvcmVzdC1waW5rXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImZvcmVzdFwiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJncmF2ZXlhcmRcIixcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb246IFwiLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwiaWNlLWdyZWVuXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImljZVwiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJzbm93XCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgIH1cclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJhY2tncm91bmRzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9iYWNrZ3JvdW5kcy5qcyIsImV4cG9ydCBjb25zdCBjb2x1bW4gPSBbWzAsMCwwLDAsMCwwLDBdLFswLDk3LDk4LDk5LDEwMCwxMDUsMF0sWzAsMCwxMjIsMTI3LDEyMSwwLDBdLFswLDAsMzcsNTcsMzEsMCwwXSxbMCwwLDM3LDU3LDEyMSwwLDBdLFswLDAsNTgsNjcsMzEsMCwwXSxbMCw4NCw4NSwxMzYsMTIxLDAsMF0sWzAsMCw1OCw2NywzMSwwLDBdLFswLDAsMiw1Nyw1MiwwLDBdLFswLDAsMjEsNjcsMzQsMCwwXSxbMCwwLDM3LDU3LDEyMSwwLDBdLFswLDAsMjY4NDM1NDY4MSwyNjg0MzU0NTkxLDAsMCwwXSxbMCwwLDAsMCwwLDAsMF1dO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNub3diYWxsID0gW1swLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwxOCwxOSwyMCwxNyw2MywxNiwxOCwxOSwyMCwxNywxOCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwxNyw2MywzNCwxMywzNSw2NywzMiwzMywzNCwxMywzNSw0NSw0NiwzMSwwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDAsMiwzLDMwLDQsODAsMTIsNTMsNjUsNjYsNCw4MCw1Niw1NywxMSwxMTAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDE3LDExMCw3OSwyMiwyMyw0NCw0NSw0Niw3OSwyMiwyMyw0NCw0NSwxMjgsMTEyLDExMywxMDcsMjAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwyLDU3LDExLDM4LDM5LDU1LDExNCwxMiw1MywzOCwzOSwyOSw0OSw1MCw1MSw1OSw1MSwxMzEsOTYsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDE1LDc5LDY3LDMyLDMzLDM0LDEzLDM1LDQ2LDc5LDEwNywxMDgsMTEyLDc2LDYxLDYyLDYwLDc2LDYxLDEzMSwxNCwwLDAsMCwwXSxbMCwwLDAsMCwwLDU4LDExLDEyLDUzLDY1LDY2LDQsOTMsODksOTAsMjksNTYsMTI5LDU5LDU5LDQ5LDczLDQ3LDg4LDE0MSwzNCwwLDAsMCwwXSxbMCwwLDAsMCwxNSw2NywzMiw0Niw3OSwyMiwyMyw0NCwxMTMsMTA3LDEwOCwxMDksMTI4LDExMiwxMzMsNjAsNzYsNjEsNjIsMTY3LDEwMCwxMDQsMjI5LDAsMCwwXSxbMCwwLDAsMjAsOTAsMjksNzksMTI5LDkzLDg5LDkwLDI5LDI5LDQ4LDQ5LDUwLDUxLDEzMSw1OSw2Miw3Myw0NywyNCwxODAsMTI1LDEyNiwxMjEsMCwwLDBdLFswLDAsMCwyLDEwOCwxMDksMTI4LDExMiwxMTMsMTA3LDEwOCwxMDksMTMzLDYwLDc2LDYxLDYyLDEzMiwxMzMsNjIsMTY3LDEwMCwxOTcsMzQsNDUsNDYsMzEsMCwwLDBdLFswLDAsMCwyMSw0OSw1MCw1MSwxMzEsNTksNDgsNDksNTAsNTEsNzYsMTMzLDYyLDEzMiw3Myw0NywyNCwxMjQsMTI0LDEyNyw0LDExNCw1NywxMjEsMCwwLDBdLFswLDAsMCwzNyw3NiwxMzIsMTM3LDEzOCwxMzMsNjAsNzYsMTM5LDE3OCwxMzIsMTM3LDEzOCwxMzIsMTY3LDEwMCwxOTcsMzIsMzMsMzQsNDQsMzUsNjcsMzEsMCwwLDBdLFswLDAsMCw1OCwxODQsNzMsMTg0LDczLDEzOCwxOTUsMTg0LDE5MywxOTQsNzMsMTg0LDczLDg4LDE4MCwxMjQsMTI3LDExLDMyMjEyMjU0OTQsMzIyMTIyNTU1MSwzMjIxMjI1NTE4LDMyMjEyMjU1MDQsMzIyMTIyNTUzOSwzMjIxMjI1NDg3LDAsMCwwXSxbMCw5Nyw5OCw5OSwxMDAsMTA0LDEwMCwxMDQsMTAwLDEwNCwxMDAsMjA0LDIwNSwxMDQsMTAwLDEwNCwxOTcsMTMsMzUsNjcsMzIsMzIyMTIyNTUzNywzMjIxMjI1NTI1LDMyMjEyMjU0ODQsMzIyMTIyNTQ4MywzMjIxMjI1NTMwLDAsMCwwLDBdLFswLDAsMTIyLDEyNSwxMjQsMTI3LDEyNSwxMjYsMTIzLDIwNiwxMjQsMjA3LDIwOCwxMjYsMTIzLDIwNiwxMjQsNCw4MCwxMiw1MywzMjIxMjI1NTA1LDMyMjEyMjU1MDQsMzIyMTIyNTUzOSwzMjIxMjI1NTUxLDMyMjEyMjU0ODcsMCwwLDAsMF0sWzAsMCwzMjIxMjI1NDkyLDMyMjEyMjU1NzksMzIyMTIyNTU4NSwzMjIxMjI1NTg0LDMyMjEyMjU2MDAsMzIyMTIyNTUxNywzMjIxMjI1NTE2LDMyMjEyMjU0OTUsMzIyMTIyNTQ5NCwzMjIxMjI1NTUxLDMyMjEyMjU1MTgsMzIyMTIyNTUxNywzMjIxMjI1NTE2LDMyMjEyMjU0OTUsMzIyMTIyNTQ5NCwzMjIxMjI1NTUxLDQ1LDQ2LDc5LDMyMjEyMjU1MTAsMzIyMTIyNTQ4MywzMjIxMjI1NTI5LDMyMjEyMjU0NzQsMCwwLDAsMCwwXSxbMCwwLDAsMzIyMTIyNTU4MiwzMjIxMjI1NDgzLDMyMjEyMjU1MjksMzIyMTIyNTUyOCwzMjIxMjI1NTUyLDMyMjEyMjU0NzYsMzIyMTIyNTUzOCwzMjIxMjI1NTM3LDMyMjEyMjU1MjUsMzIyMTIyNTQ4NCwzMjIxMjI1NTUyLDMyMjEyMjU0NzYsMzIyMTIyNTUwMiwzMjIxMjI1NDc1LDMyMjEyMjU0NzQsMzIyMTIyNTUyNCwzMjIxMjI1NDk1LDMyMjEyMjU0OTQsMzIyMTIyNTQ4NSwzMjIxMjI1NTA2LDMyMjEyMjU1ODIsMzIyMTIyNTQ4OSwwLDAsMCwwLDBdLFswLDAsMCwwLDMyMjEyMjU1MDMsMzIyMTIyNTUxOCwzMjIxMjI1NTE3LDMyMjEyMjU1MDcsMzIyMTIyNTQ4NSwzMjIxMjI1NTA2LDMyMjEyMjU1MDUsMzIyMTIyNTUwNCwzMjIxMjI1NTMyLDMyMjEyMjU1ODAsMzIyMTIyNTU3OSwzMjIxMjI1NTg1LDMyMjEyMjU1ODQsMzIyMTIyNTYwMCwzMjIxMjI1NTgxLDMyMjEyMjU1NTEsMzIyMTIyNTYxNywzMjIxMjI1NDkxLDMyMjEyMjU0OTAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwzMjIxMjI1NDkwLDMyMjEyMjU0ODksMzIyMTIyNTQ5MiwzMjIxMjI1NDkxLDMyMjEyMjU0OTAsMzIyMTIyNTQ4OCwzMjIxMjI1NTM1LDMyMjEyMjU0ODksMzIyMTIyNTU2OCwzMjIxMjI1NTEwLDMyMjEyMjU1MDIsMzIyMTIyNTQ3NSwzMjIxMjI1NTM4LDMyMjEyMjU1MzcsMzIyMTIyNTQ3NCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDMyMjEyMjU0ODYsMzIyMTIyNTU4MCwzMjIxMjI1NTc5LDMyMjEyMjU1MDYsMzIyMTIyNTU4MiwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwzMjIxMjI1NDg5LDMyMjEyMjU0ODgsMzIyMTIyNTQ5MCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXV07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL2lzbGFuZHMuanMiLCJleHBvcnQgY29uc3QgZ3JvdW5kTGF5ZXIgPSB7XHJcbiAgICBcImRhdGFcIjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDE4LCAxOSwgMTYsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDE1LCA3OSwgMjMsIDUyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA1OCwgOTMsIDM5LCAzNCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMTEyLCAxMTMsIDM0LCA4MywgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgNzcsIDExMSwgMTExLCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDEzMCwgMTMwLCA5MiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgNzcsIDc4LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5MSwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDk3LCA5OCwgNzcsIDc4LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5MSwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgXCJoZWlnaHRcIjogMjMsXHJcbiAgICBcIm5hbWVcIjogXCJncm91bmQtbGF5ZXJcIixcclxuICAgIFwib3BhY2l0eVwiOiAxLFxyXG4gICAgXCJ0eXBlXCI6IFwidGlsZWxheWVyXCIsXHJcbiAgICBcInZpc2libGVcIjogdHJ1ZSxcclxuICAgIFwid2lkdGhcIjogMzQsXHJcbiAgICBcInhcIjogMCxcclxuICAgIFwieVwiOiAwXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY29sbGlzaW9uTGF5ZXIgPSB7XHJcbiAgICBcImRhdGFcIjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDc3LCAxMTEsIDExMSwgNzgsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDkxLCAxMzAsIDEzMCwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDc3LCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDkyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5NywgOTgsIDc3LCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDkyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgIFwiaGVpZ2h0XCI6IDIzLFxyXG4gICAgXCJuYW1lXCI6IFwiY29sbGlzaW9uLWxheWVyXCIsXHJcbiAgICBcIm9wYWNpdHlcIjogMSxcclxuICAgIFwidHlwZVwiOiBcInRpbGVsYXllclwiLFxyXG4gICAgXCJ2aXNpYmxlXCI6IGZhbHNlLFxyXG4gICAgXCJ3aWR0aFwiOiAzNCxcclxuICAgIFwieFwiOiAwLFxyXG4gICAgXCJ5XCI6IDBcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWF0aExheWVyID0ge1xyXG4gICAgXCJkYXRhXCI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgIFwiaGVpZ2h0XCI6IDIzLFxyXG4gICAgXCJuYW1lXCI6IFwiZGVhdGgtbGF5ZXJcIixcclxuICAgIFwib3BhY2l0eVwiOiAxLFxyXG4gICAgXCJ0eXBlXCI6IFwidGlsZWxheWVyXCIsXHJcbiAgICBcInZpc2libGVcIjogZmFsc2UsXHJcbiAgICBcIndpZHRoXCI6IDM0LFxyXG4gICAgXCJ4XCI6IDAsXHJcbiAgICBcInlcIjogMFxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9sYXllcnMuanMiLCJcclxuZXhwb3J0IGNvbnN0IGZsYXR0ZW4gPSBtdWx0aWRpbWVuc2lvbmFsID0+IHtcclxuICAgIHJldHVybiBtdWx0aWRpbWVuc2lvbmFsLnJlZHVjZSgocmVzLCByb3cpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzLmNvbmNhdChyb3cpO1xyXG4gICAgfSwgW10pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGFwcGx5TWF0cml4ID0gKGJpZywgc21hbGwsIHgsIHkpID0+IHtcclxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHNtYWxsLmxlbmd0aDsgcm93KyspIHtcclxuICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBzbWFsbFtyb3ddLmxlbmd0aDsgY29sKyspIHtcclxuICAgICAgICAgICAgYmlnW3kgKyByb3ddW3ggKyBjb2xdID0gc21hbGxbcm93XVtjb2xdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBiaWc7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlTWF0cml4ID0gKHJvd3MsIGNvbHMsIHRpbGUpID0+IHtcclxuICAgIGxldCByZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHJvdyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sczsgaisrKSB7XHJcbiAgICAgICAgICAgIHJvdy5wdXNoKHRpbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXMucHVzaChyb3cpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcztcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBsYXllclRvTWF0cml4ID0gbGF5ZXIgPT4ge1xyXG4gICAgcmV0dXJuIGxheWVyLmRhdGEucmVkdWNlKChyZXN1bHQsIHRpbGUsIGkpID0+IHtcclxuICAgICAgICBpZiAoaSAlIGxheWVyLndpZHRoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFt0aWxlXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXS5wdXNoKHRpbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSwgW10pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNoZWNrSWZBcmVhSXNDb3ZlcmVkID0gKG1hdHJpeCwgeCwgeSwgd2lkdGgsIGhlaWdodCkgPT4ge1xyXG4gICAgbGV0IHJlcyA9IDA7XHJcbiAgICBmb3IgKGxldCByb3cgPSB4OyByb3cgPD0geCArIHdpZHRoOyByb3crKykge1xyXG4gICAgICAgIGZvciAobGV0IGNvbCA9IHk7IGNvbCA8PSB5ICsgaGVpZ2h0OyBjb2wrKykge1xyXG4gICAgICAgICAgICByZXMgKz0gbWF0cml4W2NvbF1bcm93XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzID09PSAwO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGZpbHRlckNvbGxpc2lvblRpbGVzID0gZmxhdG1hdHJpeCA9PiB7XHJcblx0cmV0dXJuIGZsYXRtYXRyaXguZmlsdGVyKHRpbGUgPT4ge1xyXG5cdFx0cmV0dXJuIHRpbGUgIT09IDA7XHJcblx0fSkucmVkdWNlKCh1bmlxdWVzLCB0aWxlKSA9PiB7XHJcblx0XHRpZih1bmlxdWVzLmluZGV4T2YodGlsZSkgPCAwKXtcclxuXHRcdFx0dW5pcXVlcy5wdXNoKHRpbGUpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHVuaXF1ZXM7XHJcblx0fSwgW10pLnNvcnQoKGEsIGIpID0+IHtcclxuXHRcdHJldHVybiBhIC0gYlxyXG5cdH0pO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL3V0aWxzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==