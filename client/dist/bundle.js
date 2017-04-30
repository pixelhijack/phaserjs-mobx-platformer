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

var _levelLoader = __webpack_require__(35);

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

var _levelConfig = __webpack_require__(33);

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

var _utils = __webpack_require__(34);

var _layers = __webpack_require__(31);

var _islands = __webpack_require__(36);

var _backgrounds = __webpack_require__(37);

var _backgrounds2 = _interopRequireDefault(_backgrounds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var populateMatrix = function populateMatrix(aMatrix, items, retry) {
    var matrix = aMatrix.slice(0);
    while (retry--) {
        var item = items[Math.floor(Math.random() * items.length)],
            x = Math.floor(Math.random() * (matrix[0].length - item[0].length)),
            y = Math.floor(Math.random() * (matrix.length - item.length));
        if ((0, _utils.checkIfAreaIsCovered)(matrix, x, y, item[0].length, item.length)) {
            (0, _utils.applyMatrix)(matrix, item, x, y);
        }
    }
    return matrix;
};

var getCollisionLayer = function getCollisionLayer(flatMatrix, collisionTiles) {
    var matrix = flatMatrix.slice(0).map(function (tile) {
        return collisionTiles.indexOf(tile) > -1 ? tile : 0;
    });
    return matrix;
};

var islands = [[[0, 0, 0, 0], [0, 77, 78, 0], [0, 91, 92, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [77, 111, 111, 78], [91, 130, 130, 92], [0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0], [77, 111, 111, 142, 111, 142, 78], [91, 130, 130, 144, 130, 144, 92], [0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0], [0, 18, 19, 16], [15, 79, 23, 52], [58, 93, 39, 34], [112, 113, 34, 83], [77, 111, 111, 78], [91, 130, 130, 92], [0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 77, 111, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 91, 130, 92, 0, 0, 0, 77, 111, 78, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 91, 130, 92, 0, 0, 0, 77, 78, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 92, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 64, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 64, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 64, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 64, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77, 111, 78, 0], [0, 0, 0, 0, 0, 0, 0, 77, 78, 0, 0, 0, 0, 91, 130, 92, 0], [0, 77, 111, 78, 0, 0, 0, 91, 92, 77, 78, 0, 0, 0, 0, 0, 0], [0, 91, 130, 92, 0, 0, 0, 0, 0, 91, 92, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], _islands.column, [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 98, 99, 243, 100, 105, 97, 64, 97, 97, 64, 97, 64, 97, 98, 99, 100, 104, 104, 105, 0], [0, 122, 127, 126, 206, 0, 0, 0, 0, 0, 0, 0, 0, 0, 245, 127, 125, 126, 127, 0, 0], [0, 0, 2684354681, 2684354591, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 230, 216, 230, 230, 216, 0, 0]], _islands.snowball];
var collisionTiles = [24, 64, 77, 78, 91, 92, 97, 98, 99, 100, 104, 105, 111, 123, 124, 125, 126, 127, 130, 167, 180, 197, 204, 205, 206, 207, 208, 229, 243];

var LevelBuilder = function LevelBuilder(levelConfig) {
    var level = levelConfig;
    return {
        createLayers: function createLayers(tilesWidth, tilesHeight) {
            // 100: rare, 40: frequent
            var density = 100,
                retry = Math.floor(tilesWidth * tilesHeight / density);
            _layers.groundLayer.data = (0, _utils.flatten)(populateMatrix((0, _utils.createMatrix)(tilesHeight, tilesWidth, 0), islands, retry));
            _layers.collisionLayer.data = getCollisionLayer(_layers.groundLayer.data, collisionTiles);

            level.tiledJson.width = tilesWidth;
            level.tiledJson.height = tilesHeight;

            _layers.groundLayer.width = tilesWidth;
            _layers.groundLayer.height = tilesHeight;
            _layers.collisionLayer.width = tilesWidth;
            _layers.collisionLayer.height = tilesHeight;

            level.width = tilesWidth * 16;
            level.height = tilesHeight * 16;

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
/* 32 */
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _level = __webpack_require__(32);

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
/* 34 */
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

/***/ }),
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var column = exports.column = [[0, 0, 0, 0, 0, 0, 0], [0, 97, 98, 99, 100, 105, 0], [0, 0, 122, 127, 121, 0, 0], [0, 0, 37, 57, 31, 0, 0], [0, 0, 37, 57, 121, 0, 0], [0, 0, 58, 67, 31, 0, 0], [0, 84, 85, 136, 121, 0, 0], [0, 0, 58, 67, 31, 0, 0], [0, 0, 2, 57, 52, 0, 0], [0, 0, 21, 67, 34, 0, 0], [0, 0, 37, 57, 121, 0, 0], [0, 0, 2684354681, 2684354591, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];

var snowball = exports.snowball = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 19, 20, 17, 63, 16, 18, 19, 20, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 17, 63, 34, 13, 35, 67, 32, 33, 34, 13, 35, 45, 46, 31, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 30, 4, 80, 12, 53, 65, 66, 4, 80, 56, 57, 11, 110, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 17, 110, 79, 22, 23, 44, 45, 46, 79, 22, 23, 44, 45, 128, 112, 113, 107, 20, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 2, 57, 11, 38, 39, 55, 114, 12, 53, 38, 39, 29, 49, 50, 51, 59, 51, 131, 96, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 15, 79, 67, 32, 33, 34, 13, 35, 46, 79, 107, 108, 112, 76, 61, 62, 60, 76, 61, 131, 14, 0, 0, 0, 0], [0, 0, 0, 0, 0, 58, 11, 12, 53, 65, 66, 4, 93, 89, 90, 29, 56, 129, 59, 59, 49, 73, 47, 88, 141, 34, 0, 0, 0, 0], [0, 0, 0, 0, 15, 67, 32, 46, 79, 22, 23, 44, 113, 107, 108, 109, 128, 112, 133, 60, 76, 61, 62, 167, 100, 104, 229, 0, 0, 0], [0, 0, 0, 20, 90, 29, 79, 129, 93, 89, 90, 29, 29, 48, 49, 50, 51, 131, 59, 62, 73, 47, 24, 180, 125, 126, 121, 0, 0, 0], [0, 0, 0, 2, 108, 109, 128, 112, 113, 107, 108, 109, 133, 60, 76, 61, 62, 132, 133, 62, 167, 100, 197, 34, 45, 46, 31, 0, 0, 0], [0, 0, 0, 21, 49, 50, 51, 131, 59, 48, 49, 50, 51, 76, 133, 62, 132, 73, 47, 24, 124, 124, 127, 4, 114, 57, 121, 0, 0, 0], [0, 0, 0, 37, 76, 132, 137, 138, 133, 60, 76, 139, 178, 132, 137, 138, 132, 167, 100, 197, 32, 33, 34, 44, 35, 67, 31, 0, 0, 0], [0, 0, 0, 58, 184, 73, 184, 73, 138, 195, 184, 193, 194, 73, 184, 73, 88, 180, 124, 127, 11, 3221225494, 3221225551, 3221225518, 3221225504, 3221225539, 3221225487, 0, 0, 0], [0, 97, 98, 99, 100, 104, 100, 104, 100, 104, 100, 204, 205, 104, 100, 104, 197, 13, 35, 67, 32, 3221225537, 3221225525, 3221225484, 3221225483, 3221225530, 0, 0, 0, 0], [0, 0, 122, 125, 124, 127, 125, 126, 123, 206, 124, 207, 208, 126, 123, 206, 124, 4, 80, 12, 53, 3221225505, 3221225504, 3221225539, 3221225551, 3221225487, 0, 0, 0, 0], [0, 0, 3221225492, 3221225579, 3221225585, 3221225584, 3221225600, 3221225517, 3221225516, 3221225495, 3221225494, 3221225551, 3221225518, 3221225517, 3221225516, 3221225495, 3221225494, 3221225551, 45, 46, 79, 3221225510, 3221225483, 3221225529, 3221225474, 0, 0, 0, 0, 0], [0, 0, 0, 3221225582, 3221225483, 3221225529, 3221225528, 3221225552, 3221225476, 3221225538, 3221225537, 3221225525, 3221225484, 3221225552, 3221225476, 3221225502, 3221225475, 3221225474, 3221225524, 3221225495, 3221225494, 3221225485, 3221225506, 3221225582, 3221225489, 0, 0, 0, 0, 0], [0, 0, 0, 0, 3221225503, 3221225518, 3221225517, 3221225507, 3221225485, 3221225506, 3221225505, 3221225504, 3221225532, 3221225580, 3221225579, 3221225585, 3221225584, 3221225600, 3221225581, 3221225551, 3221225617, 3221225491, 3221225490, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3221225490, 3221225489, 3221225492, 3221225491, 3221225490, 3221225488, 3221225535, 3221225489, 3221225568, 3221225510, 3221225502, 3221225475, 3221225538, 3221225537, 3221225474, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3221225486, 3221225580, 3221225579, 3221225506, 3221225582, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3221225489, 3221225488, 3221225490, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

/***/ }),
/* 37 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmU2ZTJhZjRhOWQzNjg0ZmY0YTgiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL21lbnUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmF0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmVhci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Rpbm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9kcmFnb25mbHkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9mcm9nLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZ29yaWxsYS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2luc2VjdC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2plbGx5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvbmF0aXZlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcGFycm90LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcHRlcm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9zcGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy90aWdlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvbWVudS9tZW51LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmluaXQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5wcmVsb2FkLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkudXBkYXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9jcmVhdHVyZUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL2xldmVsQnVpbGRlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9sYXllcnMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9tb2RlbHMvbGV2ZWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9tb2RlbHMvbGV2ZWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsTG9hZGVyLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL2lzbGFuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9tb2RlbHMvYmFja2dyb3VuZHMuanMiXSwibmFtZXMiOlsiQUkiLCJnYW1lIiwieCIsInkiLCJzcHJpdGUiLCJwcm9wcyIsImJlaGF2aW91cnMiLCJpZCIsInR5cGUiLCJzcHJpdGVTdGF0ZSIsIm1vYngiLCJvYnNlcnZhYmxlIiwibGlmZSIsInN0dW4iLCJoaXQiLCJub2hpdCIsImJvZHkiLCJibG9ja2VkIiwibGVmdCIsInJpZ2h0Iiwic2NhbGUiLCJib3VuZFRvIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImhhc093blByb3BlcnR5IiwiUGhhc2VyIiwiUG9pbnQiLCJSZWN0YW5nbGUiLCJ4MSIsIngyIiwiaGVpZ2h0IiwieTEiLCJ5MiIsImNvbnRhaW5zUG9pbnQiLCJnZXRCb3VuZHMiLCJmYWNpbmdSaWdodCIsInR1cm4iLCJmYWNpbmdMZWZ0Iiwid2lkdGgiLCJwYXJhbXMiLCJNYXRoIiwicmFuZG9tIiwicHJvYmFiaWxpdHkiLCJhY3Rpb24iLCJjYWxsIiwiZm9yRWFjaCIsImJlaGF2aW91ciIsIkV4dGVuZGVkU3ByaXRlIiwiYW5pbWF0aW9ucyIsImFkZCIsImV4aXN0aW5nIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoeXNpY3MiLCJBUkNBREUiLCJhbmNob3IiLCJzZXRUbyIsImNvbGxpZGVXb3JsZEJvdW5kcyIsImNoZWNrV29ybGRCb3VuZHMiLCJvdXRPZkJvdW5kc0tpbGwiLCJncmF2aXR5IiwiX2RlYnVnVGV4dCIsImFkZENoaWxkIiwidGV4dCIsImZvbnQiLCJmaWxsIiwidmlzaWJsZSIsImFuaW1hdGlvbiIsIm5hbWUiLCJmcmFtZXMiLCJtYXAiLCJmcmFtZSIsInRvU3RyaW5nIiwiZnBzIiwibG9vcCIsImdhbWVTdGF0ZSIsInN0YXRlIiwic3RhdGVzIiwiY3VycmVudCIsIm9ic2VydmUiLCJjaGFuZ2UiLCJjb25zb2xlIiwibG9nIiwidXBkYXRlU3RhdGUiLCJhc3NpZ24iLCJ2ZWxvY2l0eSIsIm1heFNwZWVkIiwiYWNjZWxlcmF0aW9uIiwicGxheSIsIm1vdmVSaWdodCIsIm1vdmVMZWZ0IiwidG91Y2hpbmciLCJkb3duIiwiaGl0VW50aWwiLCJ0aW1lIiwibm93IiwiYnJlYWtVbnRpbCIsImRpcmVjdGlvbiIsInNldFRleHQiLCJTcHJpdGUiLCJIdW1hbiIsIk1lbnUiLCJ1bmRlZmluZWQiLCJwcm90b3R5cGUiLCJjcmVhdGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiUGxheSIsImdsb2JhbENvbmZpZyIsInBsYXllciIsImVuZW15IiwibGV2ZWwiLCJiYWNrZ3JvdW5kTGF5ZXIiLCJncm91bmRMYXllciIsInRpbGVtYXAiLCJjcmVhdHVyZUNvbmZpZyIsImxldmVsTG9hZGVyIiwiY3JlYXR1cmVGYWN0b3J5IiwiaW5pdCIsInByZWxvYWQiLCJ1cGRhdGUiLCJibG9ja3MiLCJkb21FbGVtZW50IiwiYmFja2dyb3VuZFBhdGgiLCJ0aWxlc2V0UGF0aCIsImxldmVsUGF0aCIsInRleHR1cmVBdGxhc1BhdGgiLCJ0ZXh0dXJlQXRsYXNOYW1lIiwidGV4dHVyZUF0bGFzSW1hZ2UiLCJ0ZXh0dXJlQXRsYXNKc29uIiwiY3JlYXR1cmVDb25maWdzIiwiY3JlYXR1cmVEZWZhdWx0cyIsImFjdGl2ZSIsImJvdW5jZSIsIm1hc3MiLCJqdW1waW5nIiwiY29sbGlkZSIsImxpdmVzIiwibGlmZXNwYW4iLCJJbmZpbml0eSIsInNlbnNlIiwidGltZU9mIiwibWFuIiwiZGlubyIsImJlYXIiLCJpbWFnZSIsInRpZ2VyIiwicHRlcm8iLCJkcmFnb25mbHkiLCJiYXQiLCJzcGlkZXIiLCJuYXRpdmUiLCJwYXJyb3QiLCJpbnNlY3QiLCJidWciLCJmcm9nIiwidHVydGxlIiwiamVsbHkiLCJnb3JpbGxhIiwiY3JlYXR1cmUiLCJkZWZhdWx0cyIsInByb3AiLCJCYXQiLCJCZWFyIiwiQnVnIiwiRGlubyIsIkRyYWdvbmZseSIsIkZyb2ciLCJHb3JpbGxhIiwiSW5zZWN0IiwiSmVsbHkiLCJOYXRpdmUiLCJQYXJyb3QiLCJQdGVybyIsIlNwaWRlciIsIlRpZ2VyIiwiVHVydGxlIiwiYWR2YW5jZWRUaW1pbmciLCJhbGlnbiIsInNldCIsImlucHV0Iiwia2V5Ym9hcmQiLCJvbkRvd25DYWxsYmFjayIsImUiLCJpc05hTiIsImtleSIsInRlc3QiLCJmZXRjaCIsIm1ldGhvZCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJsZXZlbENvbmZpZyIsInN0YXJ0Iiwid29ybGQiLCJzZXRCb3VuZHMiLCJzdGFydFN5c3RlbSIsImNyZWF0ZUJhY2tncm91bmQiLCJjcmVhdGVUaWxlcyIsInRpbGVzZXQiLCJ0aWxlc2V0SW1hZ2UiLCJjcmVhdGVMYXllcnMiLCJsYXllcnMiLCJmaXhlZFRvQ2FtZXJhIiwiZml4ZWRCYWNrZ3JvdW5kIiwicmVzaXplV29ybGQiLCJpbml0aWFsaXNlZCIsInNjb3JlIiwiZW50cnlQb2ludCIsImVuZW1pZXMiLCJHcm91cCIsImNhbWVyYSIsImZvbGxvdyIsImNyZWF0ZUN1cnNvcktleXMiLCJzcGFjZSIsImFkZEtleSIsIktleWJvYXJkIiwiU1BBQ0VCQVIiLCJtZW51IiwibG9hZCIsImF0bGFzIiwiTG9hZGVyIiwiVEVYVFVSRV9BVExBU19KU09OX0hBU0giLCJiYWNrZ3JvdW5kS2V5IiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uIiwidGlsZXNldEltYWdlRXh0ZW5zaW9uIiwidGlsZWRKc29uIiwiVGlsZW1hcCIsIlRJTEVEX0pTT04iLCJkZWJ1ZyIsImFyY2FkZSIsImNvbGxpc2lvbkxheWVyIiwib3ZlcmxhcCIsInVwIiwiaXNIaXR0aW5nIiwiaXNTdHVubmVkIiwiaHVydCIsIm9uS2V5UHJlc3MiLCJpc0Rvd24iLCJzdG9wIiwianVtcCIsIlBMQVRGT1JNRVIiLCJHYW1lIiwiQVVUTyIsImJpbmQiLCJDcmVhdHVyZSIsIm9yaWdpbiIsImxldmVsR2VuZXJhdG9yIiwibGV2ZWxCdWlsZGVyIiwicmFuZG9tQmFja2dyb3VuZCIsImJ1aWxkIiwicG9wdWxhdGVNYXRyaXgiLCJhTWF0cml4IiwiaXRlbXMiLCJyZXRyeSIsIm1hdHJpeCIsInNsaWNlIiwiaXRlbSIsImZsb29yIiwiZ2V0Q29sbGlzaW9uTGF5ZXIiLCJmbGF0TWF0cml4IiwiY29sbGlzaW9uVGlsZXMiLCJ0aWxlIiwiaW5kZXhPZiIsImlzbGFuZHMiLCJMZXZlbEJ1aWxkZXIiLCJ0aWxlc1dpZHRoIiwidGlsZXNIZWlnaHQiLCJkZW5zaXR5IiwiZGF0YSIsImRlYXRoTGF5ZXIiLCJsZXZlbE1vZGVsIiwiZmxhdHRlbiIsIm11bHRpZGltZW5zaW9uYWwiLCJyZWR1Y2UiLCJyZXMiLCJyb3ciLCJjb25jYXQiLCJhcHBseU1hdHJpeCIsImJpZyIsInNtYWxsIiwiY29sIiwiY3JlYXRlTWF0cml4Iiwicm93cyIsImNvbHMiLCJpIiwiaiIsInB1c2giLCJsYXllclRvTWF0cml4IiwibGF5ZXIiLCJyZXN1bHQiLCJjaGVja0lmQXJlYUlzQ292ZXJlZCIsImZpbHRlckNvbGxpc2lvblRpbGVzIiwiZmxhdG1hdHJpeCIsImZpbHRlciIsInVuaXF1ZXMiLCJzb3J0IiwiYSIsImIiLCJsYXllck5hbWUiLCJ0aWxlU3ByaXRlIiwiY3JlYXRlTGF5ZXIiLCJ0aWxlbWFwS2V5IiwidGlsZXNldEtleSIsImFkZFRpbGVzZXRJbWFnZSIsInNldENvbGxpc2lvbkJldHdlZW4iLCJjb2x1bW4iLCJzbm93YmFsbCIsImJhY2tncm91bmRzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQTs7Ozs7Ozs7Ozs7O0lBRU1BLEU7OztBQUNGLGdCQUFZQyxJQUFaLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLE1BQXhCLEVBQWdDQyxLQUFoQyxFQUF1Q0MsVUFBdkMsRUFBa0Q7QUFBQTs7QUFBQSw0R0FDeENMLElBRHdDLEVBQ2xDQyxDQURrQyxFQUMvQkMsQ0FEK0IsRUFDNUJDLE1BRDRCLEVBQ3BCQyxLQURvQjs7QUFHOUMsY0FBS0UsRUFBTCxHQUFhRixNQUFNRyxJQUFuQixTQUEyQk4sQ0FBM0IsU0FBZ0NDLENBQWhDOztBQUVBLGNBQUtHLFVBQUwsR0FBa0JBLFVBQWxCOztBQUVBLGNBQUtHLFdBQUwsR0FBbUJDLEtBQUtDLFVBQUwsQ0FBZ0I7QUFDL0JDLGtCQUFNLEVBRHlCO0FBRS9CQyxrQkFBTSxDQUZ5QjtBQUcvQkMsaUJBQUssQ0FIMEI7QUFJL0JDLG1CQUFPO0FBSndCLFNBQWhCLENBQW5COztBQVA4QztBQWNqRDs7Ozt3Q0FDYztBQUNYLGdCQUFHLEtBQUtDLElBQUwsQ0FBVUMsT0FB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QUEySSxDQUEzSSxFQUE4SSxDQUE5SSxFQUFpSixDQUFqSixFQUFvSixDQUFwSixFQUF1SixDQUF2SixFQUEwSixDQUExSixFQUE2SixDQUE3SixFQUFnSyxDQUFoSyxFQUFtSyxDQUFuSyxFQUFzSyxDQUF0SyxFQUF5SyxDQUF6SyxFQUE0SyxDQUE1SyxFQUErSyxDQUEvSyxFQUFrTCxDQUFsTCxFQUFxTCxDQUFyTCxFQUF3TCxDQUF4TCxFQUEyTCxDQUEzTCxFQUE4TCxDQUE5TCxFQUFpTSxDQUFqTSxFQUFvTSxDQUFwTSxFQUF1TSxDQUF2TSxFQUEwTSxDQUExTSxFQUE2TSxDQUE3TSxFQUFnTixDQUFoTixFQUFtTixDQUFuTixFQUFzTixDQUF0TixFQUF5TixDQUF6TixFQUE0TixDQUE1TixFQUErTixDQUEvTixFQUFrTyxDQUFsTyxFQUFxTyxDQUFyTyxFQUF3TyxDQUF4TyxFQUEyTyxDQUEzTyxFQUE4TyxDQUE5TyxFQUFpUCxDQUFqUCxFQUFvUCxDQUFwUCxFQUF1UCxDQUF2UCxFQUEwUCxDQUExUCxFQUE2UCxDQUE3UCxFQUFnUSxDQUFoUSxFQUFtUSxDQUFuUSxFQUFzUSxDQUF0USxFQUF5USxDQUF6USxFQUE0USxDQUE1USxFQUErUSxDQUEvUSxFQUFrUixDQUFsUixFQUFxUixDQUFyUixFQUF3UixDQUF4UixFQUEyUixDQUEzUixFQUE4UixDQUE5UixFQUFpUyxDQUFqUyxFQUFvUyxDQUFwUyxFQUF1UyxDQUF2UyxFQUEwUyxDQUExUyxFQUE2UyxDQUE3UyxFQUFnVCxDQUFoVCxFQUFtVCxDQUFuVCxFQUFzVCxDQUF0VCxFQUF5VCxDQUF6VCxFQUE0VCxDQUE1VCxFQUErVCxDQUEvVCxFQUFrVSxDQUFsVSxFQUFxVSxDQUFyVSxFQUF3VSxDQUF4VSxFQUEyVSxDQUEzVSxFQUE4VSxDQUE5VSxFQUFpVixDQUFqVixFQUFvVixDQUFwVixFQUF1VixDQUF2VixFQUEwVixDQUExVixFQUE2VixDQUE3VixFQUFnVyxDQUFoVyxFQUFtVyxDQUFuVyxFQUFzVyxDQUF0VyxFQUF5VyxDQUF6VyxF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akosRUFBb0osQ0FBcEosRUFBdUosQ0FBdkosRUFBMEosQ0FBMUosRUFBNkosQ0FBN0osRUFBZ0ssQ0FBaEssRUFBbUssQ0FBbkssRUFBc0ssQ0FBdEssRUFBeUssQ0FBekssRUFBNEssQ0FBNUssRUFBK0ssQ0FBL0ssRUFBa0wsQ0FBbEwsRUFBcUwsQ0FBckwsRUFBd0wsQ0FBeEwsRUFBMkwsQ0FBM0wsRUFBOEwsQ0FBOUwsRUFBaU0sQ0FBak0sRUFBb00sQ0FBcE0sRUFBdU0sQ0FBdk0sRUFBME0sQ0FBMU0sRUFBNk0sQ0FBN00sRUFBZ04sQ0FBaE4sRUFBbU4sQ0FBbk4sRUFBc04sQ0FBdE4sRUFBeU4sQ0FBek4sRUFBNE4sQ0FBNU4sRUFBK04sQ0FBL04sRUFBa08sQ0FBbE8sRUFBcU8sQ0FBck8sRUFBd08sQ0FBeE8sRUFBMk8sQ0FBM08sRUFBOE8sQ0FBOU8sRUFBaVAsQ0FBalAsRUFBb1AsQ0FBcFAsRUFBdVAsQ0FBdlAsRUFBMFAsQ0FBMVAsRUFBNlAsQ0FBN1AsRUFBZ1EsQ0FBaFEsRUFBbVEsQ0FBblEsRUFBc1EsQ0FBdFEsRUFBeVEsQ0FBelEsRUFBNFEsQ0FBNVEsRUFBK1EsQ0FBL1EsRUFBa1IsQ0FBbFIsRUFBcVIsQ0FBclIsRUFBd1IsQ0FBeFIsRUFBMlIsQ0FBM1IsRUFBOFIsQ0FBOVIsRUFBaVMsQ0FBalMsRUFBb1MsQ0FBcFMsRUFBdVMsQ0FBdlMsRUFBMFMsQ0FBMVMsRUFBNlMsQ0FBN1MsRUFBZ1QsQ0FBaFQsRUFBbVQsQ0FBblQsRUFBc1QsQ0FBdFQsRUFBeVQsQ0FBelQsRUFBNFQsQ0FBNVQsRUFBK1QsQ0FBL1QsRUFBa1UsQ0FBbFUsRUFBcVUsQ0FBclUsRUFBd1UsQ0FBeFUsRUFBMlUsQ0FBM1UsRUFBOFUsQ0FBOVUsRUFBaVYsQ0FBalYsRUFBb1YsQ0FBcFYsRUFBdVYsQ0FBdlYsRUFBMFYsQ0FBMVYsRUFBNlYsQ0FBN1YsRUFBZ1csQ0FBaFcsRUFBbVcsQ0FBblcsRUFBc1csQ0FBdFcsRUFBeVcsQ0FBelcsRUFBNFcsQ0FBNVcsRUFBK1csQ0FBL1csRUFBa1gsQ0FB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RUFBMEosQ0FBMUosRUFBNkosQ0FBN0osRUFBZ0ssQ0FBaEssRUFBbUssQ0FBbkssRUFBc0ssQ0FBdEssRUFBeUssQ0FBekssRUFBNEssQ0FBNUssRUFBK0ssQ0FBL0ssRUFBa0wsQ0FBbEwsRUFBcUwsQ0FBckwsRUFBd0wsQ0FBeEwsRUFBMkwsQ0FBM0wsRUFBOEwsQ0FBOUwsRUFBaU0sQ0FBak0sRUFBb00sQ0FBcE0sRUFBdU0sQ0FBdk0sRUFBME0sQ0FBMU0sRUFBNk0sQ0FBN00sRUFBZ04sQ0FBaE4sRUFBbU4sQ0FBbk4sRUFBc04sQ0FBdE4sRUFBeU4sQ0FBek4sRUFBNE4sQ0FBNU4sRUFBK04sQ0FBL04sRUFBa08sQ0FBbE8sRUFBcU8sQ0FBck8sRUFBd08sQ0FBeE8sRUFBMk8sQ0FBM08sRUFBOE8sQ0FBOU8sRUFBaVAsQ0FBalAsRUFBb1AsQ0FBcFAsRUFBdVAsQ0FBdlAsRUFBMFAsQ0FBMVAsRUFBNlAsQ0FBN1AsRUFBZ1EsQ0FBaFEsRUFBbVEsQ0FBblEsRUFBc1EsQ0FBdFEsRUFBeVEsQ0FBelEsRUFBNFEsQ0FBNVEsRUFBK1EsQ0FBL1EsRUFBa1IsQ0FBbFIsRUFBcVIsQ0FBclIsRUFBd1IsQ0FBeFIsRUFBMlIsQ0FBM1IsRUFBOFIsQ0FBOVIsRUFBaVMsQ0FBalMsRUFBb1MsQ0FBcFMsRUFBdVMsQ0FBdlMsRUFBMFMsQ0FBMVMsRUFBNlMsQ0FBN1MsRUFBZ1QsQ0FBaFQsRUFBbVQsQ0FBblQsRUFBc1QsQ0FBdFQsRUFBeVQsQ0FBelQsRUFBNFQsQ0FBNVQsRUFBK1QsQ0FBL1QsRUFBa1UsQ0FBbFUsRUFBcVUsQ0FBclUsRUFBd1UsQ0FBeFUsRUFBMlUsQ0FBM1UsRUFBOFUsQ0FBOVUsRUFBaVYsQ0FBalYsRUFBb1YsQ0FBcFYsRUFBdVYsQ0FBdlYsRUFBMFYsQ0FBMVYsRUFBNlYsQ0FBN1YsRUFBZ1csQ0FBaFcsRUFBbVcsQ0FBblcsRUFBc1csQ0FBdFcsRUFBeVcsQ0FBelcsRUFBNFcsQ0FBNVcsRUFBK1csQ0FBL1csRUFBa1gsQ0FBbFgsRUFBcVgsQ0FBclgsRUFBd1gsQ0FBeFgs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dUosQ0FBdkosRUFBMEosQ0FBMUosRUFBNkosQ0FBN0osRUFBZ0ssQ0FBaEssRUFBbUssQ0FBbkssRUFBc0ssQ0FBdEssRUFBeUssQ0FBekssRUFBNEssQ0FBNUssRUFBK0ssQ0FBL0ssRUFBa0wsQ0FBbEwsRUFBcUwsQ0FBckwsRUFBd0wsQ0FBeEwsRUFBMkwsQ0FBM0wsRUFBOEwsQ0FBOUwsRUFBaU0sQ0FBak0sRUFBb00sQ0FBcE0sRUFBdU0sQ0FBdk0sRUFBME0sQ0FBMU0sRUFBNk0sQ0FBN00sRUFBZ04sQ0FBaE4sRUFBbU4sQ0FBbk4sRUFBc04sQ0FBdE4sRUFBeU4sQ0FBek4sRUFBNE4sQ0FBNU4sRUFBK04sQ0FBL04sRUFBa08sQ0FBbE8sRUFBcU8sQ0FBck8sRUFBd08sQ0FBeE8sRUFBMk8sQ0FBM08sRUFBOE8sQ0FBOU8sRUFBaVAsQ0FBalAsRUFBb1AsQ0FBcFAsRUFBdVAsQ0FBdlAsRUFBMFAsQ0FBMVAsRUFBNlAsQ0FBN1AsRUFBZ1EsQ0FBaFEsRUFBbVEsQ0FBblEsRUFBc1EsQ0FBdFEsRUFBeVEsQ0FBelEsRUFBNFEsQ0FBNVEsRUFBK1EsQ0FBL1EsRUFBa1IsQ0FBbFIsRUFBcVIsQ0FBclIsRUFBd1IsQ0FBeFIsRUFBMlIsQ0FBM1IsRUFBOFIsQ0FBOVIsRUFBaVMsQ0FBalMsRUFBb1MsQ0FBcFMsRUFBdVMsQ0FBdlMsRUFBMFMsQ0FBMVMsRUFBNlMsQ0FBN1MsRUFBZ1QsQ0FBaFQsRUFBbVQsQ0FBblQsRUFBc1QsQ0FBdFQsRUFBeVQsQ0FBelQsRUFBNFQsQ0FBNVQsRUFBK1QsQ0FBL1QsRUFBa1UsQ0FBbFUsRUFBcVUsQ0FBclUsRUFBd1UsQ0FBeFUsRUFBMlUsQ0FBM1UsRUFBOFUsQ0FBOVUsRUFBaVYsQ0FBalYsRUFBb1YsQ0FBcFYsRUFBdVYsQ0FBdlYsRUFBMFYsQ0FBMVYsRUFBNlYsQ0FBN1YsRUFBZ1csQ0FBaFcsRUFBbVcsQ0FBblcsRUFBc1csQ0FBdFcsRUFBeVcsQ0FBelcsRUFBNFcsQ0FBNVcsRUFBK1csQ0FBL1csRUFBa1gsQ0FBbFgsRUFBcVgsQ0FBclgsRUFB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QXNLLENBQXRLLEVBQXlLLENBQXpLLEVBQTRLLENBQTVLLEVBQStLLENBQS9LLEVBQWtMLENBQWxMLEVBQXFMLENBQXJMLEVBQXdMLENBQXhMLEVBQTJMLENBQTNMLEVBQThMLENBQTlMLEVBQWlNLENBQWpNLEVBQW9NLENBQXBNLEVBQXVNLENBQXZNLEVBQTBNLENBQTFNLEVBQTZNLENBQTdNLEVBQWdOLENBQWhOLEVBQW1OLENBQW5OLEVBQXNOLENBQXROLEVBQXlOLENBQXpOLEVBQTROLENBQTVOLEVBQStOLENBQS9OLEVBQWtPLENBQWxPLEVBQXFPLENBQXJPLEVBQXdPLENBQXhPLEVBQTJPLENBQTNPLEVBQThPLENBQTlPLEVBQWlQLENBQWpQLEVBQW9QLENBQXBQLEVBQXVQLENBQXZQLEVBQTBQLENBQTFQLEVBQTZQLENBQTdQLEVBQWdRLENBQWhRLEVBQW1RLENBQW5RLEVBQXNRLENBQXRRLEVBQXlRLENBQXpRLEVBQTRRLENBQTVRLEVBQStRLENBQS9RLEVBQWtSLENBQWxSLEVBQXFSLENBQXJSLEVBQXdSLENBQXhSLEVBQTJSLENBQTNSLEVBQThSLENBQTlSLEVBQWlTLENBQWpTLEVBQW9TLENBQXBTLEVBQXVTLENBQXZTLEVBQTBTLENBQTFTLEVBQTZTLENBQTdTLEVBQWdULENBQWhULEVBQW1ULENBQW5ULEVBQXNULENBQXRULEVBQXlULENBQXpULEVBQTRULENBQTVULEVBQStULENBQS9ULEVBQWtVLENBQWxVLEVBQXFVLENBQXJVLEVBQXdVLENBQXhVLEVBQTJVLENBQTNVLEVBQThVLENBQTlVLEVBQWlWLENBQWpWLEVBQW9WLENBQXBWLEVBQXVWLENBQXZWLEVBQTBWLENBQTFWLEVBQTZWLENBQTdWLEVBQWdXLENBQWhXLEVBQW1XLENBQW5XLEVBQXNXLENBQXRXLEVBQXlXLENBQXpXLEVBQTRXLENBQTVXLEVBQStXLENBQS9XLEVBQWtYLENBQWxYLEVBQXFYLENBQXJYLEVBQXdYLENBQXhYLEVBQTJYLENBQTNYLEVBQThYLENBQTlYLEVBQWlZLENBQWpZLEVBQW9ZLENBQXBZLEVB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LEVBQXFMLENBQXJMLEVBQXdMLENBQXhMLEVBQTJMLENBQTNMLEVBQThMLENBQTlMLEVBQWlNLENBQWpNLEVBQW9NLENBQXBNLEVBQXVNLENBQXZNLEVBQTBNLENBQTFNLEVBQTZNLENBQTdNLEVBQWdOLENBQWhOLEVBQW1OLENBQW5OLEVBQXNOLENBQXROLEVBQXlOLENBQXpOLEVBQTROLENBQTVOLEVBQStOLENBQS9OLEVBQWtPLENBQWxPLEVBQXFPLENBQXJPLEVBQXdPLENBQXhPLEVBQTJPLENBQTNPLEVBQThPLENBQTlPLEVBQWlQLENBQWpQLEVBQW9QLENBQXBQLEVBQXVQLENBQXZQLEVBQTBQLENBQTFQLEVBQTZQLENBQTdQLEVBQWdRLENBQWhRLEVBQW1RLENBQW5RLEVBQXNRLENBQXRRLEVBQXlRLENBQXpRLEVBQTRRLENBQTVRLEVBQStRLENBQS9RLEVBQWtSLENBQWxSLEVBQXFSLENBQXJSLEVBQXdSLENBQXhSLEVBQTJSLENBQTNSLEVBQThSLENBQTlSLEVBQWlTLENBQWpTLEVBQW9TLENBQXBTLEVBQXVTLENBQXZTLEVBQTBTLENBQTFTLEVBQTZTLENBQTdTLEVBQWdULENBQWhULEVBQW1ULENBQW5ULEVBQXNULENBQXRULEVBQXlULENBQXpULEVBQTRULENBQTVULEVBQStULENBQS9ULEVBQWtVLENBQWxVLEVBQXFVLENBQXJVLEVBQXdVLENBQXhVLEVBQTJVLENBQTNVLEVBQThVLENBQTlVLEVBQWlWLENBQWpWLEVBQW9WLENBQXBWLEVBQXVWLENBQXZWLEVBQTBWLENBQTFWLEVBQTZWLENBQTdWLEVBQWdXLENBQWhXLEVBQW1XLENBQW5XLEVBQXNXLENBQXRXLEVBQXlXLENBQXpXLEVBQTRXLENBQTVXLEVBQStXLENBQS9XLEVBQWtYLENBQWxYLEVBQXFYLENBQXJYLEVBQXdYLENBQXhYLEVBQTJYLENBQTNYLEVBQThYLENBQTlYLEVBQWlZLENBQWpZLEVBQW9ZLENBQXBZLEVBQXVZLENBQXZZLEVBQTBZLENBQTFZLEVBQTZZLENBQTdZLEVBQWdaLENBQWhaLEVBQW1aLENBQW5a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RUFBN0IsRUFBZ0MsRUFBaEMsRUFBbUMsRUFBbkMsRUFBc0MsRUFBdEMsRUFBeUMsR0FBekMsRUFBNkMsR0FBN0MsRUFBaUQsR0FBakQsRUFBcUQsRUFBckQsRUFBd0QsRUFBeEQsRUFBMkQsRUFBM0QsRUFBOEQsRUFBOUQsRUFBaUUsRUFBakUsRUFBb0UsRUFBcEUsRUFBdUUsR0FBdkUsRUFBMkUsRUFBM0UsRUFBOEUsQ0FBOUUsRUFBZ0YsQ0FBaEYsRUFBa0YsQ0FBbEYsRUFBb0YsQ0FBcEYsQ0FBbmdCLEVBQTBsQixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsRUFBWCxFQUFjLEVBQWQsRUFBaUIsRUFBakIsRUFBb0IsRUFBcEIsRUFBdUIsRUFBdkIsRUFBMEIsRUFBMUIsRUFBNkIsQ0FBN0IsRUFBK0IsRUFBL0IsRUFBa0MsRUFBbEMsRUFBcUMsRUFBckMsRUFBd0MsRUFBeEMsRUFBMkMsRUFBM0MsRUFBOEMsR0FBOUMsRUFBa0QsRUFBbEQsRUFBcUQsRUFBckQsRUFBd0QsRUFBeEQsRUFBMkQsRUFBM0QsRUFBOEQsRUFBOUQsRUFBaUUsRUFBakUsRUFBb0UsR0FBcEUsRUFBd0UsRUFBeEUsRUFBMkUsQ0FBM0UsRUFBNkUsQ0FBN0UsRUFBK0UsQ0FBL0UsRUFBaUYsQ0FBakYsQ0FBMWxCLEVBQThxQixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxFQUFULEVBQVksRUFBWixFQUFlLEVBQWYsRUFBa0IsRUFBbEIsRUFBcUIsRUFBckIsRUFBd0IsRUFBeEIsRUFBMkIsRUFBM0IsRUFBOEIsRUFBOUIsRUFBaUMsR0FBakMsRUFBcUMsR0FBckMsRUFBeUMsR0FBekMsRUFBNkMsR0FBN0MsRUFBaUQsR0FBakQsRUFBcUQsR0FBckQsRUFBeUQsR0FBekQsRUFBNkQsRUFBN0QsRUFBZ0UsRUFBaEUsRUFBbUUsRUFBbkUsRUFBc0UsRUFBdEUsRUFBeUUsR0FBekUsRUFBNkUsR0FBN0UsRUFBaUYsR0FBakYsRUFBcUYs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QixDQWpCZ0IsRUFxQmhCO0FBQ0lELHFCQUFpQixhQURyQjtBQUVJQyw4QkFBMEI7QUFGOUIsQ0FyQmdCLEVBeUJoQjtBQUNJRCxxQkFBaUIsZUFEckI7QUFFSUMsOEJBQTBCO0FBRjlCLENBekJnQixFQTZCaEI7QUFDSUQscUJBQWlCLGFBRHJCO0FBRUlDLDhCQUEwQjtBQUY5QixDQTdCZ0IsRUFpQ2hCO0FBQ0lELHFCQUFpQixRQURyQjtBQUVJQyw4QkFBMEI7QUFGOUIsQ0FqQ2dCLEVBcUNoQjtBQUNJRCxxQkFBaUIsV0FEckI7QUFFSUMsOEJBQTBCO0FBRjlCLENBckNnQixFQXlDaEI7QUFDSUQscUJBQWlCLFdBRHJCO0FBRUlDLDhCQUEwQjtBQUY5QixDQXpDZ0IsRUE2Q2hCO0FBQ0lELHFCQUFpQixLQURyQjtBQUVJQyw4QkFBMEI7QUFGOUIsQ0E3Q2dCLEVBaURoQjtBQUNJRCxxQkFBaUIsTUFEckI7QUFFSUMsOEJBQTBCO0FBRjlCLENBakRnQixDQUFwQjs7a0JBdURlb0YsVyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMmU2ZTJhZjRhOWQzNjg0ZmY0YTgiLCJpbXBvcnQgRXh0ZW5kZWRTcHJpdGUgZnJvbSAnLi9FeHRlbmRlZFNwcml0ZSc7XHJcblxyXG5jbGFzcyBBSSBleHRlbmRzIEV4dGVuZGVkU3ByaXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMsIGJlaGF2aW91cnMpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLmlkID0gYCR7cHJvcHMudHlwZX0tJHt4fS0ke3l9YDtcclxuXHJcbiAgICAgICAgdGhpcy5iZWhhdmlvdXJzID0gYmVoYXZpb3VycztcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGxpZmU6IDEwLFxyXG4gICAgICAgICAgICBzdHVuOiAwLFxyXG4gICAgICAgICAgICBoaXQ6IDAsXHJcbiAgICAgICAgICAgIG5vaGl0OiAwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gICAgdHVybklmQmxvY2tlZCgpe1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS5ibG9ja2VkLmxlZnQgfHwgdGhpcy5ib2R5LmJsb2NrZWQucmlnaHQpe1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnggKj0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdHVybigpe1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCAqPSAtMTtcclxuICAgIH1cclxuICAgIHNldEJvdW5kcyhib3VuZFRvKXtcclxuICAgICAgICBpZighYm91bmRUbyB8fCAhT2JqZWN0LmtleXMoYm91bmRUbykubGVuZ3RoKXtcclxuICAgICAgICAgICAgdGhpcy5ib3VuZFRvID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihib3VuZFRvLmhhc093blByb3BlcnR5KCd4JykgJiZcclxuICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneScpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRUbyA9IG5ldyBQaGFzZXIuUG9pbnQoXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby54LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEBSZWN0YW5nbGUgeyB4MSwgeDIgfVxyXG4gICAgICAgIGlmKGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3gxJykgJiZcclxuICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneDInKSAmJlxyXG4gICAgICAgICAgICAhYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTEnKSAmJlxyXG4gICAgICAgICAgICAhYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTInKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kVG8gPSBuZXcgUGhhc2VyLlJlY3RhbmdsZShcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngxLFxyXG4gICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby54MiAtIGJvdW5kVG8ueDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmhlaWdodFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHt4MSwgeTEsIHgyLCB5Mn1cclxuICAgICAgICBpZihib3VuZFRvLmhhc093blByb3BlcnR5KCd4MScpICYmXHJcbiAgICAgICAgICAgIGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3gyJykgJiZcclxuICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTEnKSAmJlxyXG4gICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd5MicpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRUbyA9IG5ldyBQaGFzZXIuUmVjdGFuZ2xlKFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDEsXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby55MSxcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngyIC0gYm91bmRUby54MSxcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLnkyIC0gYm91bmRUby55MVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjaGVja0JvdW5kcygpe1xyXG4gICAgICAgIGlmKCF0aGlzLmJvdW5kVG8pe1xyXG4gICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEBQb2ludCB7eCwgeX1cclxuICAgICAgICBpZighdGhpcy5ib3VuZFRvLmhhc093blByb3BlcnR5KCd3aWR0aCcpICYmXHJcbiAgICAgICAgICAgICFQaGFzZXIuUmVjdGFuZ2xlLmNvbnRhaW5zUG9pbnQodGhpcy5nZXRCb3VuZHMoKSwgdGhpcy5ib3VuZFRvKSAmJlxyXG4gICAgICAgICAgICAoKHRoaXMueCA8IHRoaXMuYm91bmRUby54ICYmICF0aGlzLmZhY2luZ1JpZ2h0KSB8fFxyXG4gICAgICAgICAgICAodGhpcy54ID4gdGhpcy5ib3VuZFRvLnggJiYgdGhpcy5mYWNpbmdSaWdodCkpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudHVybigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQFJlY3RhbmdsZSB7eDEsIHgyfSBvciB7eDEsIHkxLCB4MiwgeTJ9XHJcbiAgICAgICAgaWYodGhpcy5ib3VuZFRvICYmXHJcbiAgICAgICAgICAgIHRoaXMuYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSAmJlxyXG4gICAgICAgICAgICAodGhpcy54IDwgdGhpcy5ib3VuZFRvLnggJiYgdGhpcy5mYWNpbmdMZWZ0IHx8XHJcbiAgICAgICAgICAgIHRoaXMueCA+IHRoaXMuYm91bmRUby54ICsgdGhpcy5ib3VuZFRvLndpZHRoICYmIHRoaXMuZmFjaW5nUmlnaHQpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudHVybigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHdoZW4ocGFyYW1zKSB7XHJcblx0XHRpZihNYXRoLnJhbmRvbSgpIDwgcGFyYW1zLnByb2JhYmlsaXR5KXtcclxuXHRcdFx0dGhpc1twYXJhbXMuYWN0aW9uXSAmJiB0aGlzW3BhcmFtcy5hY3Rpb25dLmNhbGwodGhpcyk7XHJcblx0XHR9XHJcblx0fVxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgLy9jb25zdCBkZWJ1Z0JvdW5kcyA9IHRoaXMuaWQrJ1xcbicrICh0aGlzLmJvdW5kVG8gJiYgT2JqZWN0LmtleXModGhpcy5ib3VuZFRvKS5sZW5ndGggJiYgdGhpcy5ib3VuZFRvLngpICsnXFxuJysgKHRoaXMueCB8IDApO1xyXG4gICAgICAgIC8vdGhpcy5kZWJ1ZyhkZWJ1Z0JvdW5kcyk7XHJcbiAgICAgICAgdGhpcy5iZWhhdmlvdXJzLmZvckVhY2goKGJlaGF2aW91cikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzW2JlaGF2aW91ci5hY3Rpb25dICYmIHRoaXNbYmVoYXZpb3VyLmFjdGlvbl0uY2FsbCh0aGlzLCBiZWhhdmlvdXIucGFyYW1zKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQUk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9BSS5qcyIsImNsYXNzIEV4dGVuZGVkU3ByaXRlIGV4dGVuZHMgUGhhc2VyLlNwcml0ZXtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHMgfHwgeyBhbmltYXRpb25zOiBbXSB9O1xyXG4gICAgICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41LCAxKTtcclxuICAgICAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub3V0T2ZCb3VuZHNLaWxsID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gdGhpcy5wcm9wcy5ncmF2aXR5O1xyXG4gICAgICAgIHRoaXMuX2RlYnVnVGV4dCA9IHRoaXMuYWRkQ2hpbGQoXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGQudGV4dCgyMCwgLTIwLCAnZGVidWcnLCB7IGZvbnQ6IFwiMTJweCBDb3VyaWVyXCIsIGZpbGw6IFwiI2ZmZmZmZlwiIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLl9kZWJ1Z1RleHQudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnByb3BzLmFuaW1hdGlvbnMuZm9yRWFjaChhbmltYXRpb24gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24uZnJhbWVzLm1hcChmcmFtZSA9PiBmcmFtZS50b1N0cmluZygpKSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcHMsXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ubG9vcFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBnYW1lU3RhdGUgPSB0aGlzLmdhbWUuc3RhdGUuc3RhdGVzW3RoaXMuZ2FtZS5zdGF0ZS5jdXJyZW50XS5nYW1lU3RhdGU7XHJcblxyXG4gICAgICAgIG1vYngub2JzZXJ2ZShnYW1lU3RhdGUsIChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZScsIGNoYW5nZSwgZ2FtZVN0YXRlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSA9IG1vYnguYWN0aW9uKChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IE9iamVjdC5hc3NpZ24odGhpcy5zcHJpdGVTdGF0ZSwgY2hhbmdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNIaXR0aW5nKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlU3RhdGUuaGl0ID4gdGhpcy5nYW1lLnRpbWUubm93O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc1N0dW5uZWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcHJpdGVTdGF0ZS5zdHVuID4gdGhpcy5nYW1lLnRpbWUubm93O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBmYWNpbmdSaWdodCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBmYWNpbmdMZWZ0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCA8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUxlZnQoKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSAtMTtcclxuICAgICAgICBpZih0aGlzLmJvZHkudmVsb2NpdHkueCA+IC10aGlzLnByb3BzLm1heFNwZWVkKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggLT0gdGhpcy5wcm9wcy5hY2NlbGVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVSaWdodCgpe1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IDE7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnZlbG9jaXR5LnggPCB0aGlzLnByb3BzLm1heFNwZWVkKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggKz0gdGhpcy5wcm9wcy5hY2NlbGVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmUoKXtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheSgnbW92ZScpO1xyXG4gICAgICAgIGlmKHRoaXMuc2NhbGUueCA9PT0gMSl7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVJpZ2h0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlTGVmdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdG9wKCl7XHJcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggLz0gMS4xO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdzdG9wJyk7XHJcbiAgICB9XHJcblxyXG4gICAganVtcCgpe1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS50b3VjaGluZy5kb3duIHx8IHRoaXMuYm9keS5ibG9ja2VkLmRvd24pe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSAtPSAzMDA7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdqdW1wJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhpdCgpe1xyXG4gICAgICAgIGNvbnN0IGhpdFVudGlsID0gdGhpcy5nYW1lLnRpbWUubm93ICsgOTAwLFxyXG4gICAgICAgICAgICBicmVha1VudGlsID0gdGhpcy5nYW1lLnRpbWUubm93ICsgMTAwMDtcclxuICAgICAgICBjb25zb2xlLmxvZygnTm93ICVzIEhpdCAlcyBCcmVhayAlcycsIHRoaXMuZ2FtZS50aW1lLm5vdywgaGl0VW50aWwsIGJyZWFrVW50aWwpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICAgICAgICBoaXQ6IGhpdFVudGlsLFxyXG4gICAgICAgICAgICBub2hpdDogYnJlYWtVbnRpbFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdoaXQnKTtcclxuICAgIH1cclxuXHJcbiAgICBodXJ0KGRpcmVjdGlvbil7XHJcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgLT0gMTAwO1xyXG4gICAgICAgIGlmKGRpcmVjdGlvbiAmJiBkaXJlY3Rpb24ubGVmdCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC09IDEwMCB8fCB0aGlzLnByb3BzLm1heFNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkaXJlY3Rpb24gJiYgZGlyZWN0aW9uLnJpZ2h0KXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggKz0gMTAwIHx8IHRoaXMucHJvcHMubWF4U3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdodXJ0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVidWcodGV4dCl7XHJcbiAgICAgICB0aGlzLl9kZWJ1Z1RleHQudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICB0aGlzLl9kZWJ1Z1RleHQuc2NhbGUueCA9IHRoaXMuc2NhbGUueDtcclxuICAgICAgIHRoaXMuX2RlYnVnVGV4dC5zZXRUZXh0KHRleHQudG9TdHJpbmcoKSB8fCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnW1Nwcml0ZV0gc3RhdGUnKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4dGVuZGVkU3ByaXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvRXh0ZW5kZWRTcHJpdGUuanMiLCJpbXBvcnQgRXh0ZW5kZWRTcHJpdGUgZnJvbSAnLi9FeHRlbmRlZFNwcml0ZSc7XHJcblxyXG5jbGFzcyBIdW1hbiBleHRlbmRzIEV4dGVuZGVkU3ByaXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gbW9ieC5vYnNlcnZhYmxlKHtcclxuICAgICAgICAgICAgbGlmZTogMTAsXHJcbiAgICAgICAgICAgIHN0dW46IDAsXHJcbiAgICAgICAgICAgIGhpdDogMCxcclxuICAgICAgICAgICAgbm9oaXQ6IDBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSHVtYW47XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9IdW1hbi5qcyIsImltcG9ydCBjcmVhdGUgZnJvbSAnLi9tZW51LmNyZWF0ZSc7XHJcbi8vaW1wb3J0IHVwZGF0ZSBmcm9tICcuL3BsYXkudXBkYXRlJztcclxuXHJcbmNsYXNzIE1lbnUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5rZXlzID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5NZW51LnByb3RvdHlwZS5jcmVhdGUgPSBjcmVhdGU7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1lbnU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9tZW51L2luZGV4LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQUknO1xuaW1wb3J0IEh1bWFuIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSHVtYW4nO1xuXG5pbXBvcnQgbGV2ZWxMb2FkZXIgZnJvbSAnLi4vLi4vc2VydmljZXMvbGV2ZWxMb2FkZXInO1xuaW1wb3J0IGNyZWF0dXJlRmFjdG9yeSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jcmVhdHVyZUZhY3RvcnknO1xuaW1wb3J0IGNyZWF0dXJlQ29uZmlnIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY3JlYXR1cmVjb25maWcnO1xuXG5pbXBvcnQgaW5pdCBmcm9tICcuL3BsYXkuaW5pdCc7XG5pbXBvcnQgcHJlbG9hZCBmcm9tICcuL3BsYXkucHJlbG9hZCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy4vcGxheS5jcmVhdGUnO1xuaW1wb3J0IHVwZGF0ZSBmcm9tICcuL3BsYXkudXBkYXRlJztcblxyXG5jbGFzcyBQbGF5IHtcclxuICAgIGNvbnN0cnVjdG9yKGdsb2JhbENvbmZpZykge1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnBsYXllciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmVuZW15ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMubGV2ZWwgPSB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRMYXllcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBncm91bmRMYXllcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB0aWxlbWFwOiB1bmRlZmluZWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZyA9IGdsb2JhbENvbmZpZztcclxuICAgICAgICB0aGlzLmNyZWF0dXJlQ29uZmlnID0gY3JlYXR1cmVDb25maWc7XHJcbiAgICAgICAgdGhpcy5sZXZlbExvYWRlciA9IGxldmVsTG9hZGVyLmNhbGwodGhpcyk7XHJcbiAgICAgICAgdGhpcy5jcmVhdHVyZUZhY3RvcnkgPSBjcmVhdHVyZUZhY3RvcnkuY2FsbCh0aGlzKTtcclxuICAgIH1cclxufVxuXG5QbGF5LnByb3RvdHlwZS5pbml0ID0gaW5pdDtcblBsYXkucHJvdG90eXBlLnByZWxvYWQgPSBwcmVsb2FkO1xyXG5QbGF5LnByb3RvdHlwZS5jcmVhdGUgPSBjcmVhdGU7XHJcblBsYXkucHJvdG90eXBlLnVwZGF0ZSA9IHVwZGF0ZTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJjb25zdCBnbG9iYWxDb25maWcgPSB7XHJcbiAgICB3aWR0aDogNTQ2LFxyXG4gICAgaGVpZ2h0OiAzNjgsXHJcbiAgICBibG9ja3M6IDMsXHJcbiAgICBkb21FbGVtZW50OiAnZ2FtZScsXHJcbiAgICBiYWNrZ3JvdW5kUGF0aDogJ2JhY2tncm91bmRzLycsXHJcbiAgICB0aWxlc2V0UGF0aDogJ3RpbGVzZXRzLycsXHJcbiAgICBsZXZlbFBhdGg6ICdsZXZlbHMvJyxcclxuICAgIHRleHR1cmVBdGxhc1BhdGg6ICdzcHJpdGVzaGVldHMvJyxcclxuICAgIHRleHR1cmVBdGxhc05hbWU6ICdwcmUyYXRsYXMnLFxyXG4gICAgdGV4dHVyZUF0bGFzSW1hZ2U6ICdwcmUyYXRsYXMucG5nJyxcclxuICAgIHRleHR1cmVBdGxhc0pzb246ICdwcmUyYXRsYXMuanNvbidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdsb2JhbENvbmZpZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJ2YXIgY3JlYXR1cmVDb25maWdzID0ge1xyXG4gIGNyZWF0dXJlRGVmYXVsdHM6IHtcclxuICAgIGFjdGl2ZTogdHJ1ZSxcclxuICAgIGdyYXZpdHk6IDUwMCxcclxuICAgIGJvdW5jZTogMC4yLFxyXG4gICAgbWFzczogMSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiAxMDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGxpdmVzOiAxLFxyXG4gICAgbGlmZXNwYW46IEluZmluaXR5LFxyXG4gICAgc2Vuc2U6IDE1MCxcclxuICAgIGFuaW1hdGlvbnM6IFtdLFxyXG4gICAgdGltZU9mOiB7XHJcbiAgICAgICdtb3ZlJzogMjAwLFxyXG4gICAgICAnaGl0JzogMTAwLFxyXG4gICAgICAnaHVydCc6IDUwMCxcclxuICAgICAgJ3N0b3AnOiAyMDAsXHJcbiAgICAgICdpZGxlJzogMTBcclxuICAgIH0sXHJcbiAgICBib3VuZFRvIDoge30sXHJcbiAgICBiZWhhdmlvdXJzOiBbXHJcbiAgICAgICAgeyBhY3Rpb246ICd0dXJuSWZCbG9ja2VkJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnbW92ZScgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ2NoZWNrQm91bmRzJyB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBtYW46IHtcclxuICAgIHR5cGU6ICdtYW4nLFxyXG4gICAgbWF4U3BlZWQ6IDIwMCxcclxuICAgIGxpdmVzOiA4LFxyXG4gICAgbGlmZXNwYW46IEluZmluaXR5LFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMTEsJzAzJywnMDUnLDE0LDIwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnaGl0JywgZnJhbWVzOiBbMjIsMjQsMjgsMzEsMzQsMjIsMjQsMjgsMzEsMzRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3N0b3AnLCBmcmFtZXM6IFs0Miw0NSw0OSw1Ml0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFsxNiw0MSw0Nyw1MCw1MCw1MCw1MCw1MCw1MCw1MCw1MCwxMyw1MCwxMyw1MCwxM10sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFsyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNywyNywyNywyNywyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwzMCwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNywzMCwyNywzMCwzNSwzNiwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwnMDcnLCcwNycsJzA3JywnMDcnLCcwMicsJzAyJ10sIGZwczogNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdodXJ0JywgZnJhbWVzOiBbMTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3N0dW4nLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMTldLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzExLCcwMycsJzA1JywxNCwyMF0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGRpbm86IHtcclxuICAgIHR5cGU6ICdkaW5vJyxcclxuICAgIG1hc3M6IDEuNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogNSxcclxuICAgIGJlaGF2aW91cnM6IFtcclxuICAgICAgICB7IGFjdGlvbjogJ3R1cm5JZkJsb2NrZWQnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdtb3ZlJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnY2hlY2tCb3VuZHMnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICd3aGVuJywgcGFyYW1zOiB7IHByb2JhYmlsaXR5OiAwLjAxLCBhY3Rpb246ICdqdW1wJyB9IH1cclxuICAgIF0sXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNjAsMzYwLDM2MCwzNjAsMzYwLDM2MCwzNjAsMzY3XSwgZnBzOiA1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszNjAsMzYxLDM2NCwzNjcsMzY5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzYwLDM2MSwzNjQsMzY3LDM2OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZmFsbCcsIGZyYW1lczogWzM2OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzcxXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM2MCwzNjEsMzY0LDM2N10sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgYmVhcjoge1xyXG4gICAgdHlwZTogJ2JlYXInLFxyXG4gICAgbWFzczogMS4yLFxyXG4gICAgbWF4U3BlZWQ6IDc1LFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTUsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszMjFdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzIwLDMyMSwzMjRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzY2LDM2MywzNTgsMzE3XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzI4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICAnc3VwZXItYmVhcic6IHtcclxuICAgIGFjY2VsZXJhdGlvbjogMzAsXHJcbiAgICBtYXhTcGVlZDogMjAwLFxyXG4gICAgaW1hZ2U6ICdzdXBlci1iZWFyLXNwcml0ZS1yZWYnLCAvLyBvdmVycmlkZSBzcHJpdGUgKGNyZWF0dXJlIG5hbWUgYnkgZGVmYXVsdClcclxuICAgIGFuaW1hdGlvbnM6IFtdXHJcbiAgfSxcclxuICB0aWdlcjoge1xyXG4gICAgdHlwZTogJ3RpZ2VyJyxcclxuICAgIG1hc3M6IDEuNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMjAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszOTMsMzk1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzkzLDM5NV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzM5OSw0MDFdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdmYWxsJywgZnJhbWVzOiBbMzk5XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDAyXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM5MywzOTVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHB0ZXJvOiB7XHJcbiAgICB0eXBlOiAncHRlcm8nLFxyXG4gICAgbWFzczogMC41LFxyXG4gICAgZ3Jhdml0eTogMCxcclxuICAgIGJvdW5jZTogMC4xLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IGZhbHNlLFxyXG4gICAgbWF4U3BlZWQ6IDEwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc3LDQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc3LDQ3N10sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbNDAzLDQwNCw0MDUsNDAzLDQwNCw0MDUsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDMsNDA0LDQwNSw0MDMsNDA0LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDA1LDQwNV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGVzY2VuZCcsIGZyYW1lczogWzQwNV0sIGZwczogMTUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnYXNjZW5kJywgZnJhbWVzOiBbNDAzLDQwNCw0MDVdLCBmcHM6IDE1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQ3MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFs0MDUsNDAzLDQwNF0sIGZwczogMTUsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgZHJhZ29uZmx5OiB7XHJcbiAgICB0eXBlOiAnZHJhZ29uZmx5JyxcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszMzcsMzM4XSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzM3LDMzOF0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAndHVybicsIGZyYW1lczogWzMzOSwzNDBdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM0Ml0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszMzcsMzM4XSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBiYXQ6IHtcclxuICAgIHR5cGU6ICdiYXQnLFxyXG4gICAgbWFzczogMC41LFxyXG4gICAgZ3Jhdml0eTogMCxcclxuICAgIGJvdW5jZTogMC4xLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IGZhbHNlLFxyXG4gICAgbWF4U3BlZWQ6IDIwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM1MSwzNTIsMzUxLDM1MSwzNTEsMzUxXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzU3LDM1OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzYyXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM1NywzNTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHNwaWRlcjoge1xyXG4gICAgdHlwZTogJ3NwaWRlcicsXHJcbiAgICBtYXNzOiAwLjMsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszMzVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzY1LDM2OCwzNzAsMzcyXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzI5OSwzMDIsMzA1LDMwOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAndHVybicsIGZyYW1lczogWzMxOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnY2xpbWInLCBmcmFtZXM6IFszNDEsMzQzLDM0NSwzNDddLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3dhaXQnLCBmcmFtZXM6IFszMzIsMzM1LDM3Ml0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzIyXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgbmF0aXZlOiB7XHJcbiAgICB0eXBlOiAnbmF0aXZlJyxcclxuICAgIG1heFNwZWVkOiAxMDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDIwLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM3M10sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM3MywzNzYsMzc4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszODBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM3MywzNzYsMzc4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBwYXJyb3Q6IHtcclxuICAgIHR5cGU6ICdwYXJyb3QnLFxyXG4gICAgbWFzczogMC41LFxyXG4gICAgZ3Jhdml0eTogMCxcclxuICAgIGJvdW5jZTogMC4xLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IGZhbHNlLFxyXG4gICAgbWF4U3BlZWQ6IDEwMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszOTQsMzk3LDM5OF0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM5NCwzOTcsMzk4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0MDBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM5NCwzOTcsMzk4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBpbnNlY3Q6IHtcclxuICAgIHR5cGU6ICdpbnNlY3QnLFxyXG4gICAgbWFzczogMSxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEuNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMjUsXHJcbiAgICBiZWhhdmlvdXJzOiBbXHJcbiAgICAgICAgeyBhY3Rpb246ICd0dXJuSWZCbG9ja2VkJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnbW92ZScgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ2NoZWNrQm91bmRzJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnd2hlbicsIHBhcmFtczogeyBwcm9iYWJpbGl0eTogMC4wMywgYWN0aW9uOiAnanVtcCcgfSB9XHJcbiAgICBdLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzQ4LDM0OCwzNDgsMzQ4LDM0OCwzNDgsMzQ5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzIzLDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszMjMsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzQ4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzMyMywzNDgsMzQ5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBidWc6IHtcclxuICAgIHR5cGU6ICdidWcnLFxyXG4gICAgbWFzczogMSxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEuNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMjUsXHJcbiAgICBiZWhhdmlvdXJzOiBbXHJcbiAgICAgICAgeyBhY3Rpb246ICd0dXJuSWZCbG9ja2VkJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnbW92ZScgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ2NoZWNrQm91bmRzJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnd2hlbicsIHBhcmFtczogeyBwcm9iYWJpbGl0eTogMC4wMiwgYWN0aW9uOiAnanVtcCcgfSB9XHJcbiAgICBdLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzQ0LDM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0NCwzNDZdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzQ0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM0NCwzNDZdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGZyb2c6IHtcclxuICAgIHR5cGU6ICdmcm9nJyxcclxuICAgIG1hc3M6IDEsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAxLjUsXHJcbiAgICBqdW1waW5nOiA1MDAsXHJcbiAgICBtYXhTcGVlZDogODAsXHJcbiAgICBhY2NlbGVyYXRpb246IDQwLFxyXG4gICAgYmVoYXZpb3VyczogW1xyXG4gICAgICAgIHsgYWN0aW9uOiAndHVybklmQmxvY2tlZCcgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ21vdmUnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdjaGVja0JvdW5kcycgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ3doZW4nLCBwYXJhbXM6IHsgcHJvYmFiaWxpdHk6IDAuMSwgYWN0aW9uOiAnanVtcCcgfSB9XHJcbiAgICBdLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzI1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzI1LDMyNywzMzEsMzI1XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzMyNSwzMjcsMzMxLDMyNV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzMzNF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszMjUsMzI3LDMzMSwzMjVdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICB0dXJ0bGU6IHtcclxuICAgIHR5cGU6ICd0dXJ0bGUnLFxyXG4gICAgbWFzczogMixcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAwLjMsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzkwXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM3NywzODEsMzg0LDM4NV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM4NywzODksMzkwLDM5MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzkyXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBqZWxseToge1xyXG4gICAgdHlwZTogJ2plbGx5JyxcclxuICAgIG1hc3M6IDIsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMSxcclxuICAgIG1heFNwZWVkOiA1LFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbNDIwLDQzMyw0MzRdLCBmcHM6IDMsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbNDIwLDQzMyw0MzRdLCBmcHM6IDMsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDIwLDQzMyw0MzRdLCBmcHM6IDMsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgZ29yaWxsYToge1xyXG4gICAgdHlwZTogJ2dvcmlsbGEnLFxyXG4gICAgbWFzczogNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbNDExXSwgZnBzOiA1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2ZhbGwnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9XHJcbn07XHJcblxyXG5mb3IodmFyIGNyZWF0dXJlIGluIGNyZWF0dXJlQ29uZmlncyl7XHJcbiAgLy9jcmVhdHVyZUNvbmZpZ3NbY3JlYXR1cmVdID0gXy5tZXJnZSh7fSwgY29uZmlncy5jcmVhdHVyZURlZmF1bHRzLCBjb25maWdzW2NyZWF0dXJlXSk7XHJcbiAgdmFyIGRlZmF1bHRzID0gY3JlYXR1cmVDb25maWdzWydjcmVhdHVyZURlZmF1bHRzJ107XHJcbiAgZm9yKHZhciBwcm9wIGluIGRlZmF1bHRzKXtcclxuICAgIGlmKGNyZWF0dXJlQ29uZmlnc1tjcmVhdHVyZV1bcHJvcF0gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgIGNyZWF0dXJlQ29uZmlnc1tjcmVhdHVyZV1bcHJvcF0gPSBkZWZhdWx0c1twcm9wXTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXR1cmVDb25maWdzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVjb25maWcuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgQmF0IGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmF0O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2JhdC5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBCZWFyIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmVhcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9iZWFyLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEJ1ZyBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1ZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9idWcuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgRGlubyBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERpbm87XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZGluby5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBEcmFnb25mbHkgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEcmFnb25mbHk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZHJhZ29uZmx5LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEZyb2cgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGcm9nO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Zyb2cuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgR29yaWxsYSBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdvcmlsbGE7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZ29yaWxsYS5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBJbnNlY3QgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnNlY3Q7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvaW5zZWN0LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEplbGx5IGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSmVsbHk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvamVsbHkuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgTmF0aXZlIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmF0aXZlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL25hdGl2ZS5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBQYXJyb3QgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYXJyb3Q7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcGFycm90LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIFB0ZXJvIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHRlcm87XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcHRlcm8uanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgU3BpZGVyIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3BpZGVyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3NwaWRlci5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBUaWdlciBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRpZ2VyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3RpZ2VyLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIFR1cnRsZSBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFR1cnRsZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy90dXJ0bGUuanMiLCJmdW5jdGlvbiBjcmVhdGUoKXtcclxuXHJcbiAgICAvLyBmcHMgZGVidWdnaW5nXHJcbiAgICB0aGlzLmdhbWUudGltZS5hZHZhbmNlZFRpbWluZyA9IHRydWU7XHJcblxyXG4gICAgLy8gQ1RBIHRleHRcclxuICAgIGNvbnN0IHRleHQgPSB0aGlzLmdhbWUuYWRkLnRleHQoXHJcbiAgICAgICAgdGhpcy5nYW1lLndpZHRoIC8gMixcclxuICAgICAgICB0aGlzLmdhbWUuaGVpZ2h0IC8gMixcclxuICAgICAgICBcIkNob29zZSBhIGxldmVsIVxcbjEgMiAzIDQgNSA2IFxcbk9yIHByZXNzIGEga2V5IHRvIGdlbmVyYXRlIVwiLFxyXG4gICAgICAgIHsgZm9udDogXCIyNHB4IENvdXJpZXJcIiwgZmlsbDogXCIjZmZmZmZmXCIsIGFsaWduOiBcImNlbnRlclwiIH1cclxuICAgICk7XHJcblxyXG4gICAgdGV4dC5hbmNob3Iuc2V0KDAuNSk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLm9uRG93bkNhbGxiYWNrID0gKGUpID0+IHtcclxuICAgICAgICAvLyBpZiBwcmVzc2VkIGtleSBpcyBudW1iZXIgKHNwYWNlIGlzIGVtcHR5IHN0cmluZyB3aGljaCBldmFsdWF0ZXMgdHJ1ZSlcclxuICAgICAgICBpZighaXNOYU4oZS5rZXkpICYmIC9bXlxcc10vLnRlc3QoZS5rZXkpKXtcclxuICAgICAgICAgICAgZmV0Y2goJy9sZXZlbC8nICsgZS5rZXksIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcclxuICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIH0pLnRoZW4oKGxldmVsQ29uZmlnKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ1BsYXknLCB0cnVlLCB0cnVlLCBsZXZlbENvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQub25Eb3duQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ1BsYXknLCB0cnVlLCB0cnVlLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQub25Eb3duQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtNZW51XVtDcmVhdGVdJyk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL21lbnUvbWVudS5jcmVhdGUuanMiLCJpbXBvcnQgSHVtYW4gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9IdW1hbic7XHJcbmltcG9ydCBBSSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0FJJztcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZSgpe1xyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bQ3JlYXRlXScpO1xyXG4gICAgLy8gZnBzIGRlYnVnZ2luZ1xyXG4gICAgdGhpcy5nYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xyXG5cclxuICAgIC8vIFtTRVQgTEVWRUxdIHNldCBkaW1lbnNpb25zLCBzdGFydCBwaHlzaWMgc3lzdGVtXHJcbiAgICB0aGlzLmdhbWUud29ybGQuc2V0Qm91bmRzKFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgMCxcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy53aWR0aCAqIHRoaXMuZ2xvYmFsQ29uZmlnLmJsb2NrcyxcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy5oZWlnaHRcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuXHJcbiAgICB0aGlzLmxldmVsTG9hZGVyLmNyZWF0ZUJhY2tncm91bmQoJ2JhY2tncm91bmRMYXllcicpO1xyXG4gICAgdGhpcy5sZXZlbExvYWRlci5jcmVhdGVUaWxlcyhcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLnRpbGVtYXAsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy50aWxlc2V0LFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcudGlsZXNldEltYWdlXHJcbiAgICApO1xyXG4gICAgdGhpcy5sZXZlbExvYWRlci5jcmVhdGVMYXllcnModGhpcy5sZXZlbENvbmZpZy5sYXllcnMpO1xyXG5cclxuICAgIC8vIFtTRVQgTEVWRUxdIGZpeCBiYWNrZ3JvdW5kLCByZXNpemVcclxuICAgIHRoaXMubGV2ZWwuYmFja2dyb3VuZExheWVyLmZpeGVkVG9DYW1lcmEgPSB0aGlzLmxldmVsQ29uZmlnLmZpeGVkQmFja2dyb3VuZDtcclxuICAgIHRoaXMubGV2ZWwuZ3JvdW5kTGF5ZXIucmVzaXplV29ybGQoKTtcclxuXHJcbiAgICB0aGlzLmdhbWVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgaW5pdGlhbGlzZWQ6IGZhbHNlLFxyXG4gICAgICAgIHNjb3JlOiAwXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gT2JqZWN0LmFzc2lnbih0aGlzLmdhbWVTdGF0ZSwgY2hhbmdlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1vYngub2JzZXJ2ZSh0aGlzLmdhbWVTdGF0ZSwgY2hhbmdlID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnW2dhbWVTdGF0ZV0gY2hhbmdlJywgY2hhbmdlLCB0aGlzLmdhbWVTdGF0ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHsgaW5pdGlhbGlzZWQ6IHRydWUgfSk7XHJcblxyXG4gICAgLy8gW1BMQVlFUl1cclxuICAgIHRoaXMucGxheWVyID0gbmV3IEh1bWFuKFxyXG4gICAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmVudHJ5UG9pbnQueCxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmVudHJ5UG9pbnQueSxcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy50ZXh0dXJlQXRsYXNOYW1lLFxyXG4gICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWcubWFuXHJcbiAgICApO1xyXG5cclxuICAgIC8vIFtFTkVNSUVTXVxyXG4gICAgdGhpcy5lbmVtaWVzID0gbmV3IFBoYXNlci5Hcm91cCh0aGlzLmdhbWUpO1xyXG4gICAgdGhpcy5sZXZlbENvbmZpZy5lbmVtaWVzLmZvckVhY2godGhpcy5jcmVhdHVyZUZhY3RvcnkuY3JlYXRlKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XHJcblxyXG4gICAgLy8gYmluZCBrZXlzXHJcbiAgICB0aGlzLmtleXMgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xyXG4gICAgdGhpcy5rZXlzLnNwYWNlID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpO1xyXG5cclxuICAgIC8vIHNjb3JlIHRleHRcclxuICAgIHRoaXMubWVudSA9IHRoaXMuZ2FtZS5hZGQudGV4dChcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy53aWR0aCAtIDEyMCxcclxuICAgICAgICAwLFxyXG4gICAgICAgIFwiTGlmZTogXCIgKyB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlLFxyXG4gICAgICAgIHsgZm9udDogXCIyNHB4IENvdXJpZXJcIiwgZmlsbDogXCIjZmZmXCIsIGFsaWduOiBcImNlbnRlclwiIH1cclxuICAgICk7XHJcbiAgICB0aGlzLm1lbnUuZml4ZWRUb0NhbWVyYSA9IHRydWU7XHJcbiAgICBtb2J4Lm9ic2VydmUodGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgdGhpcy5tZW51LnNldFRleHQoXCJMaWZlOiBcIiArIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuY3JlYXRlLmpzIiwiaW1wb3J0IGxldmVsR2VuZXJhdG9yIGZyb20gJy4uLy4uL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL2luZGV4JztcclxuXHJcbmZ1bmN0aW9uIGluaXQobGV2ZWxDb25maWcpe1xyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bSW5pdF0nLCBsZXZlbENvbmZpZyk7XHJcbiAgICB0aGlzLmxldmVsQ29uZmlnID0gbGV2ZWxDb25maWcgfHwgbGV2ZWxHZW5lcmF0b3IuY3JlYXRlKCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbml0O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmluaXQuanMiLCJmdW5jdGlvbiBwcmVsb2FkKCl7XHJcbiAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtQcmVsb2FkXScpO1xyXG5cclxuICAgIC8vIGFzc2V0cyB0byBsb2FkIHJlbGF0aXZlIHRvIC9hc3NldHMvLi5cclxuICAgIHRoaXMuZ2FtZS5sb2FkLmF0bGFzKFxyXG4gICAgICAgICdwcmUyYXRsYXMnLFxyXG4gICAgICAgICdzcHJpdGVzaGVldHMvcHJlMmF0bGFzLnBuZycsXHJcbiAgICAgICAgJ3Nwcml0ZXNoZWV0cy9wcmUyYXRsYXMuanNvbicsXHJcbiAgICAgICAgUGhhc2VyLkxvYWRlci5URVhUVVJFX0FUTEFTX0pTT05fSEFTSFxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBsb2FkIGJhY2tncm91bmRcclxuICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKHRoaXMubGV2ZWxDb25maWcuYmFja2dyb3VuZEtleSwgdGhpcy5nbG9iYWxDb25maWcuYmFja2dyb3VuZFBhdGggKyB0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRJbWFnZSArIHRoaXMubGV2ZWxDb25maWcuYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uKTtcclxuICAgIC8vIGxvYWQgdGlsZXNldFxyXG4gICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UodGhpcy5sZXZlbENvbmZpZy50aWxlc2V0LCB0aGlzLmdsb2JhbENvbmZpZy50aWxlc2V0UGF0aCArIHRoaXMubGV2ZWxDb25maWcudGlsZXNldEltYWdlICsgdGhpcy5sZXZlbENvbmZpZy50aWxlc2V0SW1hZ2VFeHRlbnNpb24pO1xyXG4gICAgLy8gbG9hZCB0aWxlbWFwXHJcbiAgICBpZih0eXBlb2YgdGhpcy5sZXZlbENvbmZpZy50aWxlZEpzb24gPT09ICdzdHJpbmcnKXtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC50aWxlbWFwKHRoaXMubGV2ZWxDb25maWcudGlsZW1hcCwgdGhpcy5nbG9iYWxDb25maWcubGV2ZWxQYXRoICsgdGhpcy5sZXZlbENvbmZpZy50aWxlZEpzb24sIG51bGwsIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC50aWxlbWFwKHRoaXMubGV2ZWxDb25maWcudGlsZW1hcCwgbnVsbCwgdGhpcy5sZXZlbENvbmZpZy50aWxlZEpzb24sIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByZWxvYWQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkucHJlbG9hZC5qcyIsImZ1bmN0aW9uIHVwZGF0ZSgpe1xyXG4gICAgLy9jb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtVcGRhdGVdJyk7XHJcbiAgICAvLyBmcHNcclxuICAgIHRoaXMuZ2FtZS5kZWJ1Zy50ZXh0KHRoaXMuZ2FtZS50aW1lLmZwcywgNSwgMjApO1xyXG5cclxuICAgIC8vIGNvbGxpZGVcclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmxldmVsLmNvbGxpc2lvbkxheWVyKTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLmVuZW1pZXMsIHRoaXMubGV2ZWwuY29sbGlzaW9uTGF5ZXIpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMucGxheWVyLCB0aGlzLmVuZW1pZXMsIChwbGF5ZXIsIGVuZW15KSA9PiB7XHJcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIuYm9keS50b3VjaGluZy5kb3duICYmIGVuZW15LmJvZHkudG91Y2hpbmcudXApe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLnBsYXllci5pc0hpdHRpbmcgJiYgIXRoaXMucGxheWVyLmlzU3R1bm5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGxpZmU6IHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUgLSAxLFxyXG4gICAgICAgICAgICAgICAgc3R1bjogdGhpcy5nYW1lLnRpbWUubm93ICsgMTUwMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaHVydChlbmVteS5ib2R5LnRvdWNoaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBtb3ZlXHJcbiAgICBvbktleVByZXNzLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uS2V5UHJlc3MoKXtcclxuICAgIC8vIHN0dW4gPT4gYmxvY2tlZFxyXG4gICAgaWYodGhpcy5wbGF5ZXIuaXNTdHVubmVkKXtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3N0dW4nKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbW92ZSBsZWZ0IC8gcmlnaHRcclxuICAgIGlmKHRoaXMua2V5cy5sZWZ0LmlzRG93bil7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZUxlZnQoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgIH0gZWxzZSBpZih0aGlzLmtleXMucmlnaHQuaXNEb3duKXtcclxuICAgICAgICB0aGlzLnBsYXllci5tb3ZlUmlnaHQoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnaWRsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGp1bXBcclxuICAgIGlmKHRoaXMua2V5cy51cC5pc0Rvd24pe1xyXG4gICAgICAgIHRoaXMucGxheWVyLmp1bXAoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2p1bXAnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBoaXRcclxuICAgIGlmKHRoaXMua2V5cy5zcGFjZS5pc0Rvd24pe1xyXG4gICAgICAgIGlmKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLm5vaGl0IDwgdGhpcy5nYW1lLnRpbWUubm93ICYmIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmhpdCA8IHRoaXMuZ2FtZS50aW1lLm5vdyl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmhpdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2hpdCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnVwZGF0ZS5qcyIsImltcG9ydCBnbG9iYWxDb25maWcgZnJvbSAnLi9nbG9iYWxDb25maWcuanMnO1xyXG5pbXBvcnQgTWVudSBmcm9tICcuL2dhbWVzdGF0ZXMvbWVudS9pbmRleC5qcyc7XHJcbmltcG9ydCBQbGF5IGZyb20gJy4vZ2FtZXN0YXRlcy9wbGF5L2luZGV4LmpzJztcclxuXHJcbi8vIGluc3RhbnRpYXRlIGEgUGhhc2VyLkdhbWVcclxuY29uc3QgUExBVEZPUk1FUiA9IG5ldyBQaGFzZXIuR2FtZShcclxuICAgIGdsb2JhbENvbmZpZy53aWR0aCxcclxuICAgIGdsb2JhbENvbmZpZy5oZWlnaHQsXHJcbiAgICBQaGFzZXIuQVVUTyxcclxuICAgIGdsb2JhbENvbmZpZy5kb21FbGVtZW50XHJcbik7XHJcblxyXG4vLyByZWdpc3RlciBnYW1lc3RhdGVzICh3aWxsIGJlIGluc3RhbnRpYXRlZCB3LyB0aGlzLmdhbWUgYXMgMXN0IHBhcmFtLCBwYXNzIGdhbWVDb25maWcgYXMgMm5kKVxyXG5QTEFURk9STUVSLnN0YXRlLmFkZCgnTWVudScsIE1lbnUuYmluZChudWxsLCBnbG9iYWxDb25maWcpKTtcclxuUExBVEZPUk1FUi5zdGF0ZS5hZGQoJ1BsYXknLCBQbGF5LmJpbmQobnVsbCwgZ2xvYmFsQ29uZmlnKSk7XHJcblxyXG5QTEFURk9STUVSLnN0YXRlLnN0YXJ0KCdNZW51JywgdHJ1ZSwgdHJ1ZSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvaW5kZXguanMiLCJpbXBvcnQgYmF0IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2JhdC5qcyc7XHJcbmltcG9ydCBiZWFyIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2JlYXIuanMnO1xyXG5pbXBvcnQgYnVnIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyc7XHJcbmltcG9ydCBkaW5vIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Rpbm8uanMnO1xyXG5pbXBvcnQgZHJhZ29uZmx5IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2RyYWdvbmZseS5qcyc7XHJcbmltcG9ydCBmcm9nIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Zyb2cuanMnO1xyXG5pbXBvcnQgZ29yaWxsYSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9nb3JpbGxhLmpzJztcclxuaW1wb3J0IGluc2VjdCBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9pbnNlY3QuanMnO1xyXG5pbXBvcnQgamVsbHkgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvamVsbHkuanMnO1xyXG5pbXBvcnQgbmF0aXZlIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL25hdGl2ZS5qcyc7XHJcbmltcG9ydCBwYXJyb3QgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvcGFycm90LmpzJztcclxuaW1wb3J0IHB0ZXJvIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL3B0ZXJvLmpzJztcclxuaW1wb3J0IHNwaWRlciBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9zcGlkZXIuanMnO1xyXG5pbXBvcnQgdGlnZXIgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvdGlnZXIuanMnO1xyXG5pbXBvcnQgdHVydGxlIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyc7XHJcblxyXG5pbXBvcnQgQUkgZnJvbSAnLi4vY29tcG9uZW50cy9BSSc7XHJcblxyXG5mdW5jdGlvbiBjcmVhdHVyZUZhY3RvcnkoKSB7XHJcbiAgICBjb25zdCBDcmVhdHVyZSA9IHtcclxuICAgICAgICBiYXQ6IGJhdCxcclxuICAgICAgICBiZWFyOiBiZWFyLFxyXG4gICAgICAgIGJ1ZzogYnVnLFxyXG4gICAgICAgIGRpbm86IGRpbm8sXHJcbiAgICAgICAgZHJhZ29uZmx5OiBkcmFnb25mbHksXHJcbiAgICAgICAgZnJvZzogZnJvZyxcclxuICAgICAgICBnb3JpbGxhOiBnb3JpbGxhLFxyXG4gICAgICAgIGluc2VjdDogaW5zZWN0LFxyXG4gICAgICAgIGplbGx5OiBqZWxseSxcclxuICAgICAgICBuYXRpdmU6IG5hdGl2ZSxcclxuICAgICAgICBwYXJyb3Q6IHBhcnJvdCxcclxuICAgICAgICBwdGVybzogcHRlcm8sXHJcbiAgICAgICAgc3BpZGVyOiBzcGlkZXIsXHJcbiAgICAgICAgdGlnZXI6IHRpZ2VyLFxyXG4gICAgICAgIHR1cnRsZTogdHVydGxlXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlOiAobGV2ZWxDb25maWcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZW5lbXkgPSBuZXcgQUkoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgICAgICAgICBsZXZlbENvbmZpZy5vcmlnaW4ueCxcclxuICAgICAgICAgICAgICAgIGxldmVsQ29uZmlnLm9yaWdpbi55LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxDb25maWcudGV4dHVyZUF0bGFzTmFtZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWdbbGV2ZWxDb25maWcudHlwZV0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0dXJlQ29uZmlnW2xldmVsQ29uZmlnLnR5cGVdLmJlaGF2aW91cnNcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgZW5lbXkuc2V0Qm91bmRzKGxldmVsQ29uZmlnLmJvdW5kVG8pO1xyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMuYWRkKGVuZW15KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXR1cmVGYWN0b3J5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2NyZWF0dXJlRmFjdG9yeS5qcyIsImltcG9ydCBMZXZlbEJ1aWxkZXIgZnJvbSAnLi9sZXZlbEJ1aWxkZXInO1xyXG5pbXBvcnQgbGV2ZWxDb25maWcgZnJvbSAnLi9tb2RlbHMvbGV2ZWxDb25maWcnO1xyXG5cclxuY29uc3QgbGV2ZWxHZW5lcmF0b3IgPSB7XHJcbiAgICBjcmVhdGUoKXtcclxuICAgICAgICBjb25zdCBsZXZlbEJ1aWxkZXIgPSBuZXcgTGV2ZWxCdWlsZGVyKGxldmVsQ29uZmlnKTtcclxuICAgICAgICByZXR1cm4gbGV2ZWxCdWlsZGVyXHJcbiAgICAgICAgICAgIC5jcmVhdGVMYXllcnMoMzQgKiAzLCAyMyAqIDEwKVxyXG4gICAgICAgICAgICAucmFuZG9tQmFja2dyb3VuZCgpXHJcbiAgICAgICAgICAgIC5idWlsZCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGV2ZWxHZW5lcmF0b3I7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvaW5kZXguanMiLCJpbXBvcnQge1xyXG4gICAgZmxhdHRlbixcclxuICAgIGFwcGx5TWF0cml4LFxyXG4gICAgY3JlYXRlTWF0cml4LFxyXG4gICAgbGF5ZXJUb01hdHJpeCxcclxuICAgIGNoZWNrSWZBcmVhSXNDb3ZlcmVkXHJcbn0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7XHJcbiAgICBncm91bmRMYXllcixcclxuICAgIGNvbGxpc2lvbkxheWVyLFxyXG4gICAgZGVhdGhMYXllclxyXG59IGZyb20gJy4vbW9kZWxzL2xheWVycyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgY29sdW1uLFxyXG4gICAgc25vd2JhbGxcclxufSBmcm9tICcuL21vZGVscy9pc2xhbmRzJztcclxuXHJcbmltcG9ydCBiYWNrZ3JvdW5kcyBmcm9tICcuL21vZGVscy9iYWNrZ3JvdW5kcyc7XHJcblxyXG5jb25zdCBwb3B1bGF0ZU1hdHJpeCA9IChhTWF0cml4LCBpdGVtcywgcmV0cnkpID0+IHtcclxuICAgIGxldCBtYXRyaXggPSBhTWF0cml4LnNsaWNlKDApO1xyXG4gICAgd2hpbGUocmV0cnktLSl7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpdGVtcy5sZW5ndGgpXSxcclxuICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXRyaXhbMF0ubGVuZ3RoIC0gaXRlbVswXS5sZW5ndGgpKSxcclxuICAgICAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXRyaXgubGVuZ3RoIC0gaXRlbS5sZW5ndGgpKTtcclxuICAgICAgICBpZihjaGVja0lmQXJlYUlzQ292ZXJlZChtYXRyaXgsIHgsIHksIGl0ZW1bMF0ubGVuZ3RoLCBpdGVtLmxlbmd0aCkpe1xyXG4gICAgICAgICAgICBhcHBseU1hdHJpeChtYXRyaXgsIGl0ZW0sIHgsIHkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBtYXRyaXg7XHJcbn07XHJcblxyXG5jb25zdCBnZXRDb2xsaXNpb25MYXllciA9IChmbGF0TWF0cml4LCBjb2xsaXNpb25UaWxlcykgPT4ge1xyXG4gICAgbGV0IG1hdHJpeCA9IGZsYXRNYXRyaXguc2xpY2UoMCkubWFwKCh0aWxlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpc2lvblRpbGVzLmluZGV4T2YodGlsZSkgPiAtMVxyXG4gICAgICAgICAgICA/IHRpbGVcclxuICAgICAgICAgICAgOiAwO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbWF0cml4O1xyXG59O1xyXG5cclxuY29uc3QgaXNsYW5kcyA9IFtcclxuICAgIFtbMCwwLDAsMF0sWzAsNzcsNzgsMF0sWzAsOTEsOTIsMF0sWzAsMCwwLDBdXSxcclxuICAgIFtbMCwgMCwgMCwgMF0sIFs3NywgMTExLCAxMTEsIDc4XSwgWzkxLCAxMzAsIDEzMCwgOTJdLCBbMCwgMCwgMCwgMF1dLFxyXG4gICAgW1swLCAwLCAwLCAwLCAwLCAwLCAwXSwgWzc3LCAxMTEsIDExMSwgMTQyLCAxMTEsIDE0MiwgNzhdLCBbOTEsIDEzMCwgMTMwLCAxNDQsIDEzMCwgMTQ0LCA5Ml0sIFswLCAwLCAwLCAwLCAwLCAwLCAwXV0sXHJcbiAgICBbWzAsIDAsIDAsIDBdLCBbMCwgMTgsIDE5LCAxNl0sIFsxNSwgNzksIDIzLCA1Ml0sIFs1OCwgOTMsIDM5LCAzNF0sIFsxMTIsIDExMywgMzQsIDgzXSwgWzc3LCAxMTEsIDExMSwgNzhdLCBbOTEsIDEzMCwgMTMwLCA5Ml0sIFswLCAwLCAwLCAwXV0sXHJcbiAgICBbWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFswLDc3LDExMSw3OCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsOTEsMTMwLDkyLDAsMCwwLDc3LDExMSw3OCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsOTEsMTMwLDkyLDAsMCwwLDc3LDc4LDBdLFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDkxLDkyLDBdLFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXV0sXHJcbiAgICBbWzAsMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCw2NCwwXSxbMCwwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsNjQsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDY0LDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwXSxbMCw2NCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDBdXSxcclxuICAgIFtbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCw3NywxMTEsNzgsMF0sWzAsMCwwLDAsMCwwLDAsNzcsNzgsMCwwLDAsMCw5MSwxMzAsOTIsMF0sWzAsNzcsMTExLDc4LDAsMCwwLDkxLDkyLDc3LDc4LDAsMCwwLDAsMCwwXSxbMCw5MSwxMzAsOTIsMCwwLDAsMCwwLDkxLDkyLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXV0sXHJcbiAgICBjb2x1bW4sXHJcbiAgICBbWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxbMCw5OCw5OSwyNDMsMTAwLDEwNSw5Nyw2NCw5Nyw5Nyw2NCw5Nyw2NCw5Nyw5OCw5OSwxMDAsMTA0LDEwNCwxMDUsMF0sWzAsMTIyLDEyNywxMjYsMjA2LDAsMCwwLDAsMCwwLDAsMCwwLDI0NSwxMjcsMTI1LDEyNiwxMjcsMCwwXSxbMCwwLDI2ODQzNTQ2ODEsMjY4NDM1NDU5MSwwLDAsMCwwLDAsMCwwLDAsMCwwLDIzMCwyMTYsMjMwLDIzMCwyMTYsMCwwXV0sXHJcbiAgICBzbm93YmFsbFxyXG5dO1xyXG5jb25zdCBjb2xsaXNpb25UaWxlcyA9IFsyNCw2NCw3Nyw3OCw5MSw5Miw5Nyw5OCw5OSwxMDAsMTA0LDEwNSwxMTEsMTIzLDEyNCwxMjUsMTI2LDEyNywxMzAsMTY3LDE4MCwxOTcsMjA0LDIwNSwyMDYsMjA3LDIwOCwyMjksMjQzXTtcclxuXHJcbnZhciBMZXZlbEJ1aWxkZXIgPSBmdW5jdGlvbihsZXZlbENvbmZpZyl7XHJcbiAgICB2YXIgbGV2ZWwgPSBsZXZlbENvbmZpZztcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlTGF5ZXJzKHRpbGVzV2lkdGgsIHRpbGVzSGVpZ2h0KXtcbiAgICAgICAgICAgIC8vIDEwMDogcmFyZSwgNDA6IGZyZXF1ZW50XG4gICAgICAgICAgICBjb25zdCBkZW5zaXR5ID0gMTAwLFxuICAgICAgICAgICAgICAgIHJldHJ5ID0gTWF0aC5mbG9vcigodGlsZXNXaWR0aCAqIHRpbGVzSGVpZ2h0KSAvIGRlbnNpdHkpO1xuICAgICAgICAgICAgZ3JvdW5kTGF5ZXIuZGF0YSA9IGZsYXR0ZW4ocG9wdWxhdGVNYXRyaXgoY3JlYXRlTWF0cml4KHRpbGVzSGVpZ2h0LCB0aWxlc1dpZHRoLCAwKSwgaXNsYW5kcywgcmV0cnkpKTtcbiAgICAgICAgICAgIGNvbGxpc2lvbkxheWVyLmRhdGEgPSBnZXRDb2xsaXNpb25MYXllcihncm91bmRMYXllci5kYXRhLCBjb2xsaXNpb25UaWxlcyk7XG5cclxuICAgICAgICAgICAgbGV2ZWwudGlsZWRKc29uLndpZHRoID0gdGlsZXNXaWR0aDtcclxuICAgICAgICAgICAgbGV2ZWwudGlsZWRKc29uLmhlaWdodCA9IHRpbGVzSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgZ3JvdW5kTGF5ZXIud2lkdGggPSB0aWxlc1dpZHRoO1xyXG4gICAgICAgICAgICBncm91bmRMYXllci5oZWlnaHQgPSB0aWxlc0hlaWdodDtcclxuICAgICAgICAgICAgY29sbGlzaW9uTGF5ZXIud2lkdGggPSB0aWxlc1dpZHRoO1xyXG4gICAgICAgICAgICBjb2xsaXNpb25MYXllci5oZWlnaHQgPSB0aWxlc0hlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGxldmVsLndpZHRoID0gdGlsZXNXaWR0aCAqIDE2O1xyXG4gICAgICAgICAgICBsZXZlbC5oZWlnaHQgPSB0aWxlc0hlaWdodCAqIDE2O1xyXG5cclxuICAgICAgICAgICAgbGV2ZWwudGlsZWRKc29uLmxheWVycyA9IFtcclxuICAgICAgICAgICAgICAgIGdyb3VuZExheWVyLFxyXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uTGF5ZXIsXHJcbiAgICAgICAgICAgICAgICBkZWF0aExheWVyXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmFuZG9tQmFja2dyb3VuZCgpe1xyXG4gICAgICAgICAgICBjb25zdCByYW5kb21CYWNrZ3JvdW5kID0gYmFja2dyb3VuZHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYmFja2dyb3VuZHMubGVuZ3RoKV1cclxuICAgICAgICAgICAgbGV2ZWwuYmFja2dyb3VuZEltYWdlID0gcmFuZG9tQmFja2dyb3VuZC5iYWNrZ3JvdW5kSW1hZ2U7XHJcbiAgICAgICAgICAgIGxldmVsLmJhY2tncm91bmRJbWFnZUV4dGVuc2lvbiA9IHJhbmRvbUJhY2tncm91bmQuYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ1aWxkKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBsZXZlbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGV2ZWxCdWlsZGVyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL2xldmVsQnVpbGRlci5qcyIsImV4cG9ydCBjb25zdCBncm91bmRMYXllciA9IHtcclxuICAgIFwiZGF0YVwiOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMTgsIDE5LCAxNiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMTUsIDc5LCAyMywgNTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDU4LCA5MywgMzksIDM0LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxMTIsIDExMywgMzQsIDgzLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA3NywgMTExLCAxMTEsIDc4LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5MSwgMTMwLCAxMzAsIDkyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA3NywgNzgsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDkxLCA5MiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTcsIDk4LCA3NywgNzgsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDkxLCA5MiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICBcImhlaWdodFwiOiAyMyxcclxuICAgIFwibmFtZVwiOiBcImdyb3VuZC1sYXllclwiLFxyXG4gICAgXCJvcGFjaXR5XCI6IDEsXHJcbiAgICBcInR5cGVcIjogXCJ0aWxlbGF5ZXJcIixcclxuICAgIFwidmlzaWJsZVwiOiB0cnVlLFxyXG4gICAgXCJ3aWR0aFwiOiAzNCxcclxuICAgIFwieFwiOiAwLFxyXG4gICAgXCJ5XCI6IDBcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjb2xsaXNpb25MYXllciA9IHtcclxuICAgIFwiZGF0YVwiOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgNzcsIDExMSwgMTExLCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDEzMCwgMTMwLCA5MiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgNzcsIDc4LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5MSwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDk3LCA5OCwgNzcsIDc4LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5MSwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgXCJoZWlnaHRcIjogMjMsXHJcbiAgICBcIm5hbWVcIjogXCJjb2xsaXNpb24tbGF5ZXJcIixcclxuICAgIFwib3BhY2l0eVwiOiAxLFxyXG4gICAgXCJ0eXBlXCI6IFwidGlsZWxheWVyXCIsXHJcbiAgICBcInZpc2libGVcIjogZmFsc2UsXHJcbiAgICBcIndpZHRoXCI6IDM0LFxyXG4gICAgXCJ4XCI6IDAsXHJcbiAgICBcInlcIjogMFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlYXRoTGF5ZXIgPSB7XHJcbiAgICBcImRhdGFcIjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgXCJoZWlnaHRcIjogMjMsXHJcbiAgICBcIm5hbWVcIjogXCJkZWF0aC1sYXllclwiLFxyXG4gICAgXCJvcGFjaXR5XCI6IDEsXHJcbiAgICBcInR5cGVcIjogXCJ0aWxlbGF5ZXJcIixcclxuICAgIFwidmlzaWJsZVwiOiBmYWxzZSxcclxuICAgIFwid2lkdGhcIjogMzQsXHJcbiAgICBcInhcIjogMCxcclxuICAgIFwieVwiOiAwXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL2xheWVycy5qcyIsImNvbnN0IGxldmVsTW9kZWwgPSB7XHJcblx0XCJoZWlnaHRcIjogMjMsXHJcblx0XCJsYXllcnNcIjogW3tcclxuXHRcdFx0XCJkYXRhXCI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxOCwgMTksIDE2LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxNSwgNzksIDIzLCA1MiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgNTgsIDkzLCAzOSwgMzQsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDExMiwgMTEzLCAzNCwgODMsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDc3LCAxMTEsIDExMSwgNzgsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDkxLCAxMzAsIDEzMCwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDc3LCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDkyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5NywgOTgsIDc3LCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDkyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuXHRcdFx0XCJoZWlnaHRcIjogMjMsXHJcblx0XHRcdFwibmFtZVwiOiBcImdyb3VuZC1sYXllclwiLFxyXG5cdFx0XHRcIm9wYWNpdHlcIjogMSxcclxuXHRcdFx0XCJ0eXBlXCI6IFwidGlsZWxheWVyXCIsXHJcblx0XHRcdFwidmlzaWJsZVwiOiB0cnVlLFxyXG5cdFx0XHRcIndpZHRoXCI6IDM0LFxyXG5cdFx0XHRcInhcIjogMCxcclxuXHRcdFx0XCJ5XCI6IDBcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdFwiZGF0YVwiOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgNzcsIDExMSwgMTExLCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDEzMCwgMTMwLCA5MiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgNzcsIDc4LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5MSwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDk3LCA5OCwgNzcsIDc4LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5MSwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG5cdFx0XHRcImhlaWdodFwiOiAyMyxcclxuXHRcdFx0XCJuYW1lXCI6IFwiY29sbGlzaW9uLWxheWVyXCIsXHJcblx0XHRcdFwib3BhY2l0eVwiOiAxLFxyXG5cdFx0XHRcInR5cGVcIjogXCJ0aWxlbGF5ZXJcIixcclxuXHRcdFx0XCJ2aXNpYmxlXCI6IGZhbHNlLFxyXG5cdFx0XHRcIndpZHRoXCI6IDM0LFxyXG5cdFx0XHRcInhcIjogMCxcclxuXHRcdFx0XCJ5XCI6IDBcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdFwiZGF0YVwiOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcblx0XHRcdFwiaGVpZ2h0XCI6IDIzLFxyXG5cdFx0XHRcIm5hbWVcIjogXCJkZWF0aC1sYXllclwiLFxyXG5cdFx0XHRcIm9wYWNpdHlcIjogMSxcclxuXHRcdFx0XCJ0eXBlXCI6IFwidGlsZWxheWVyXCIsXHJcblx0XHRcdFwidmlzaWJsZVwiOiBmYWxzZSxcclxuXHRcdFx0XCJ3aWR0aFwiOiAzNCxcclxuXHRcdFx0XCJ4XCI6IDAsXHJcblx0XHRcdFwieVwiOiAwXHJcblx0XHR9XHJcblx0XSxcclxuXHRcIm5leHRvYmplY3RpZFwiOiAxLFxyXG5cdFwib3JpZW50YXRpb25cIjogXCJvcnRob2dvbmFsXCIsXHJcblx0XCJwcm9wZXJ0aWVzXCI6IHtcclxuXHJcblx0fSxcclxuXHRcInJlbmRlcm9yZGVyXCI6IFwicmlnaHQtZG93blwiLFxyXG5cdFwidGlsZWhlaWdodFwiOiAxNixcclxuXHRcInRpbGVzZXRzXCI6IFt7XHJcblx0XHRcImNvbHVtbnNcIjogMTEsXHJcblx0XHRcImZpcnN0Z2lkXCI6IDEsXHJcblx0XHRcImltYWdlXCI6IFwiTDEucG5nXCIsXHJcblx0XHRcImltYWdlaGVpZ2h0XCI6IDM4NCxcclxuXHRcdFwiaW1hZ2V3aWR0aFwiOiAxNzYsXHJcblx0XHRcIm1hcmdpblwiOiAwLFxyXG5cdFx0XCJuYW1lXCI6IFwiTDFcIixcclxuXHRcdFwicHJvcGVydGllc1wiOiB7XHJcblxyXG5cdFx0fSxcclxuXHRcdFwic3BhY2luZ1wiOiAwLFxyXG5cdFx0XCJ0aWxlY291bnRcIjogMjY0LFxyXG5cdFx0XCJ0aWxlaGVpZ2h0XCI6IDE2LFxyXG5cdFx0XCJ0aWxld2lkdGhcIjogMTZcclxuXHR9XSxcclxuXHRcInRpbGV3aWR0aFwiOiAxNixcclxuXHRcInZlcnNpb25cIjogMSxcclxuXHRcIndpZHRoXCI6IDM0XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsZXZlbE1vZGVsO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9sZXZlbC5qcyIsImltcG9ydCBsZXZlbCBmcm9tICcuL2xldmVsJztcclxuXHJcbmNvbnN0IGxldmVsQ29uZmlnID0ge1xyXG5cdFwiaWRcIjogXCJyaXNlLW9mLXRoZS10aWRlXCIsXHJcblx0XCJuYW1lXCI6IFwiUmlzZSBvZiB0aGUgVGlkZVwiLFxyXG5cdFwidGlsZXNldFwiOiBcInRpbGVzZXQtbGV2ZWwtcmlzZS1vZi10aGUtdGlkZVwiLFxyXG5cdFwidGlsZW1hcFwiOiBcInRpbGVtYXAtbGV2ZWwtcmlzZS1vZi10aGUtdGlkZVwiLFxyXG5cdFwidGlsZWRKc29uXCI6IGxldmVsLFxyXG5cdFwidGlsZXNldEltYWdlXCI6IFwiTDFcIixcclxuXHRcInRpbGVzZXRJbWFnZUV4dGVuc2lvblwiOiBcIi5wbmdcIixcclxuXHRcImJhY2tncm91bmRJbWFnZVwiOiBcImJnM3NlYW1sZXNzXCIsXHJcblx0XCJiYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb25cIjogXCIuanBnXCIsXHJcblx0XCJiYWNrZ3JvdW5kS2V5XCI6IFwiYmFja2dyb3VuZC0yXCIsXHJcblx0XCJ3aWR0aFwiOiA1NDYsXHJcblx0XCJoZWlnaHRcIjogMzY4LFxyXG5cdFwibGF5ZXJzXCI6IHtcclxuXHRcdFwiZ3JvdW5kTGF5ZXJcIjoge1xyXG5cdFx0XHRcImtleVwiOiBcImdyb3VuZC1sYXllclwiLFxyXG5cdFx0XHRcInZpc2libGVcIjogdHJ1ZVxyXG5cdFx0fSxcclxuXHRcdFwiY29sbGlzaW9uTGF5ZXJcIjoge1xyXG5cdFx0XHRcImtleVwiOiBcImNvbGxpc2lvbi1sYXllclwiLFxyXG5cdFx0XHRcInZpc2libGVcIjogZmFsc2VcclxuXHRcdH0sXHJcblx0XHRcImRlYXRoTGF5ZXJcIjoge1xyXG5cdFx0XHRcImtleVwiOiBcImRlYXRoLWxheWVyXCIsXHJcblx0XHRcdFwidmlzaWJsZVwiOiBmYWxzZVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0XCJmaXhlZEJhY2tncm91bmRcIjogdHJ1ZSxcclxuXHRcImVudHJ5UG9pbnRcIjoge1xyXG5cdFx0XCJ4XCI6IDEwLFxyXG5cdFx0XCJ5XCI6IDEwXHJcblx0fSxcclxuXHRcInBvcnRhbHNcIjogW10sXHJcblx0XCJwbGF0Zm9ybXNcIjogW10sXHJcblx0XCJib251c1wiOiBbXSxcclxuXHRcImVuZW1pZXNcIjogW11cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxldmVsQ29uZmlnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9sZXZlbENvbmZpZy5qcyIsIlxyXG5leHBvcnQgY29uc3QgZmxhdHRlbiA9IG11bHRpZGltZW5zaW9uYWwgPT4ge1xyXG4gICAgcmV0dXJuIG11bHRpZGltZW5zaW9uYWwucmVkdWNlKChyZXMsIHJvdykgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXMuY29uY2F0KHJvdyk7XHJcbiAgICB9LCBbXSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYXBwbHlNYXRyaXggPSAoYmlnLCBzbWFsbCwgeCwgeSkgPT4ge1xyXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgc21hbGwubGVuZ3RoOyByb3crKykge1xyXG4gICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHNtYWxsW3Jvd10ubGVuZ3RoOyBjb2wrKykge1xyXG4gICAgICAgICAgICBiaWdbeSArIHJvd11beCArIGNvbF0gPSBzbWFsbFtyb3ddW2NvbF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJpZztcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVNYXRyaXggPSAocm93cywgY29scywgdGlsZSkgPT4ge1xyXG4gICAgbGV0IHJlcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyBpKyspIHtcclxuICAgICAgICBsZXQgcm93ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xzOyBqKyspIHtcclxuICAgICAgICAgICAgcm93LnB1c2godGlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcy5wdXNoKHJvdyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGxheWVyVG9NYXRyaXggPSBsYXllciA9PiB7XHJcbiAgICByZXR1cm4gbGF5ZXIuZGF0YS5yZWR1Y2UoKHJlc3VsdCwgdGlsZSwgaSkgPT4ge1xyXG4gICAgICAgIGlmIChpICUgbGF5ZXIud2lkdGggPT09IDApIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW3RpbGVdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdLnB1c2godGlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9LCBbXSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY2hlY2tJZkFyZWFJc0NvdmVyZWQgPSAobWF0cml4LCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSA9PiB7XHJcbiAgICBsZXQgcmVzID0gMDtcclxuICAgIGZvciAobGV0IHJvdyA9IHg7IHJvdyA8PSB4ICsgd2lkdGg7IHJvdysrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgY29sID0geTsgY29sIDw9IHkgKyBoZWlnaHQ7IGNvbCsrKSB7XHJcbiAgICAgICAgICAgIHJlcyArPSBtYXRyaXhbY29sXVtyb3ddO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXMgPT09IDA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZmlsdGVyQ29sbGlzaW9uVGlsZXMgPSBmbGF0bWF0cml4ID0+IHtcclxuXHRyZXR1cm4gZmxhdG1hdHJpeC5maWx0ZXIodGlsZSA9PiB7XHJcblx0XHRyZXR1cm4gdGlsZSAhPT0gMDtcclxuXHR9KS5yZWR1Y2UoKHVuaXF1ZXMsIHRpbGUpID0+IHtcclxuXHRcdGlmKHVuaXF1ZXMuaW5kZXhPZih0aWxlKSA8IDApe1xyXG5cdFx0XHR1bmlxdWVzLnB1c2godGlsZSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdW5pcXVlcztcclxuXHR9LCBbXSkuc29ydCgoYSwgYikgPT4ge1xyXG5cdFx0cmV0dXJuIGEgLSBiXHJcblx0fSk7XHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvdXRpbHMuanMiLCJmdW5jdGlvbiBsZXZlbExvYWRlcigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlQmFja2dyb3VuZDogKGxheWVyTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLmJhY2tncm91bmRMYXllciA9IHRoaXMuZ2FtZS5hZGQudGlsZVNwcml0ZShcclxuICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbENvbmZpZy53aWR0aCxcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxDb25maWcuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5iYWNrZ3JvdW5kS2V5XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGVMYXllcjogKGxheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWxbbGF5ZXJdID0gdGhpcy5sZXZlbC50aWxlbWFwLmNyZWF0ZUxheWVyKHRoaXMubGV2ZWxDb25maWdbbGF5ZXJdKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZUxheWVyczogKGxheWVycykgPT4ge1xyXG4gICAgICAgICAgICBmb3IobGV0IGxheWVyIGluIGxheWVycyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsW2xheWVyXSA9IHRoaXMubGV2ZWwudGlsZW1hcC5jcmVhdGVMYXllcih0aGlzLmxldmVsQ29uZmlnLmxheWVyc1tsYXllcl0ua2V5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxbbGF5ZXJdLnZpc2libGUgPSB0aGlzLmxldmVsQ29uZmlnLmxheWVyc1tsYXllcl0udmlzaWJsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlVGlsZXM6ICh0aWxlbWFwS2V5LCB0aWxlc2V0S2V5LCB0aWxlc2V0SW1hZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC50aWxlbWFwID0gdGhpcy5nYW1lLmFkZC50aWxlbWFwKHRpbGVtYXBLZXkpO1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLnRpbGVtYXAuYWRkVGlsZXNldEltYWdlKHRpbGVzZXRJbWFnZSwgdGlsZXNldEtleSk7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDAsIDMwMDAsIHRydWUsIHRoaXMubGV2ZWxDb25maWcubGF5ZXJzLmNvbGxpc2lvbkxheWVyLmtleSk7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDAsIDMwMDAsIHRydWUsIHRoaXMubGV2ZWxDb25maWcubGF5ZXJzLmRlYXRoTGF5ZXIua2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGV2ZWxMb2FkZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxMb2FkZXIuanMiLCJleHBvcnQgY29uc3QgY29sdW1uID0gW1swLDAsMCwwLDAsMCwwXSxbMCw5Nyw5OCw5OSwxMDAsMTA1LDBdLFswLDAsMTIyLDEyNywxMjEsMCwwXSxbMCwwLDM3LDU3LDMxLDAsMF0sWzAsMCwzNyw1NywxMjEsMCwwXSxbMCwwLDU4LDY3LDMxLDAsMF0sWzAsODQsODUsMTM2LDEyMSwwLDBdLFswLDAsNTgsNjcsMzEsMCwwXSxbMCwwLDIsNTcsNTIsMCwwXSxbMCwwLDIxLDY3LDM0LDAsMF0sWzAsMCwzNyw1NywxMjEsMCwwXSxbMCwwLDI2ODQzNTQ2ODEsMjY4NDM1NDU5MSwwLDAsMF0sWzAsMCwwLDAsMCwwLDBdXTtcclxuXHJcbmV4cG9ydCBjb25zdCBzbm93YmFsbCA9IFtbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwLDAsMTgsMTksMjAsMTcsNjMsMTYsMTgsMTksMjAsMTcsMTgsMCwwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDAsMTcsNjMsMzQsMTMsMzUsNjcsMzIsMzMsMzQsMTMsMzUsNDUsNDYsMzEsMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDIsMywzMCw0LDgwLDEyLDUzLDY1LDY2LDQsODAsNTYsNTcsMTEsMTEwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwxNywxMTAsNzksMjIsMjMsNDQsNDUsNDYsNzksMjIsMjMsNDQsNDUsMTI4LDExMiwxMTMsMTA3LDIwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMiw1NywxMSwzOCwzOSw1NSwxMTQsMTIsNTMsMzgsMzksMjksNDksNTAsNTEsNTksNTEsMTMxLDk2LDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwxNSw3OSw2NywzMiwzMywzNCwxMywzNSw0Niw3OSwxMDcsMTA4LDExMiw3Niw2MSw2Miw2MCw3Niw2MSwxMzEsMTQsMCwwLDAsMF0sWzAsMCwwLDAsMCw1OCwxMSwxMiw1Myw2NSw2Niw0LDkzLDg5LDkwLDI5LDU2LDEyOSw1OSw1OSw0OSw3Myw0Nyw4OCwxNDEsMzQsMCwwLDAsMF0sWzAsMCwwLDAsMTUsNjcsMzIsNDYsNzksMjIsMjMsNDQsMTEzLDEwNywxMDgsMTA5LDEyOCwxMTIsMTMzLDYwLDc2LDYxLDYyLDE2NywxMDAsMTA0LDIyOSwwLDAsMF0sWzAsMCwwLDIwLDkwLDI5LDc5LDEyOSw5Myw4OSw5MCwyOSwyOSw0OCw0OSw1MCw1MSwxMzEsNTksNjIsNzMsNDcsMjQsMTgwLDEyNSwxMjYsMTIxLDAsMCwwXSxbMCwwLDAsMiwxMDgsMTA5LDEyOCwxMTIsMTEzLDEwNywxMDgsMTA5LDEzMyw2MCw3Niw2MSw2MiwxMzIsMTMzLDYyLDE2NywxMDAsMTk3LDM0LDQ1LDQ2LDMxLDAsMCwwXSxbMCwwLDAsMjEsNDksNTAsNTEsMTMxLDU5LDQ4LDQ5LDUwLDUxLDc2LDEzMyw2MiwxMzIsNzMsNDcsMjQsMTI0LDEyNCwxMjcsNCwxMTQsNTcsMTIxLDAsMCwwXSxbMCwwLDAsMzcsNzYsMTMyLDEzNywxMzgsMTMzLDYwLDc2LDEzOSwxNzgsMTMyLDEzNywxMzgsMTMyLDE2NywxMDAsMTk3LDMyLDMzLDM0LDQ0LDM1LDY3LDMxLDAsMCwwXSxbMCwwLDAsNTgsMTg0LDczLDE4NCw3MywxMzgsMTk1LDE4NCwxOTMsMTk0LDczLDE4NCw3Myw4OCwxODAsMTI0LDEyNywxMSwzMjIxMjI1NDk0LDMyMjEyMjU1NTEsMzIyMTIyNTUxOCwzMjIxMjI1NTA0LDMyMjEyMjU1MzksMzIyMTIyNTQ4NywwLDAsMF0sWzAsOTcsOTgsOTksMTAwLDEwNCwxMDAsMTA0LDEwMCwxMDQsMTAwLDIwNCwyMDUsMTA0LDEwMCwxMDQsMTk3LDEzLDM1LDY3LDMyLDMyMjEyMjU1MzcsMzIyMTIyNTUyNSwzMjIxMjI1NDg0LDMyMjEyMjU0ODMsMzIyMTIyNTUzMCwwLDAsMCwwXSxbMCwwLDEyMiwxMjUsMTI0LDEyNywxMjUsMTI2LDEyMywyMDYsMTI0LDIwNywyMDgsMTI2LDEyMywyMDYsMTI0LDQsODAsMTIsNTMsMzIyMTIyNTUwNSwzMjIxMjI1NTA0LDMyMjEyMjU1MzksMzIyMTIyNTU1MSwzMjIxMjI1NDg3LDAsMCwwLDBdLFswLDAsMzIyMTIyNTQ5MiwzMjIxMjI1NTc5LDMyMjEyMjU1ODUsMzIyMTIyNTU4NCwzMjIxMjI1NjAwLDMyMjEyMjU1MTcsMzIyMTIyNTUxNiwzMjIxMjI1NDk1LDMyMjEyMjU0OTQsMzIyMTIyNTU1MSwzMjIxMjI1NTE4LDMyMjEyMjU1MTcsMzIyMTIyNTUxNiwzMjIxMjI1NDk1LDMyMjEyMjU0OTQsMzIyMTIyNTU1MSw0NSw0Niw3OSwzMjIxMjI1NTEwLDMyMjEyMjU0ODMsMzIyMTIyNTUyOSwzMjIxMjI1NDc0LDAsMCwwLDAsMF0sWzAsMCwwLDMyMjEyMjU1ODIsMzIyMTIyNTQ4MywzMjIxMjI1NTI5LDMyMjEyMjU1MjgsMzIyMTIyNTU1MiwzMjIxMjI1NDc2LDMyMjEyMjU1MzgsMzIyMTIyNTUzNywzMjIxMjI1NTI1LDMyMjEyMjU0ODQsMzIyMTIyNTU1MiwzMjIxMjI1NDc2LDMyMjEyMjU1MDIsMzIyMTIyNTQ3NSwzMjIxMjI1NDc0LDMyMjEyMjU1MjQsMzIyMTIyNTQ5NSwzMjIxMjI1NDk0LDMyMjEyMjU0ODUsMzIyMTIyNTUwNiwzMjIxMjI1NTgyLDMyMjEyMjU0ODksMCwwLDAsMCwwXSxbMCwwLDAsMCwzMjIxMjI1NTAzLDMyMjEyMjU1MTgsMzIyMTIyNTUxNywzMjIxMjI1NTA3LDMyMjEyMjU0ODUsMzIyMTIyNTUwNiwzMjIxMjI1NTA1LDMyMjEyMjU1MDQsMzIyMTIyNTUzMiwzMjIxMjI1NTgwLDMyMjEyMjU1NzksMzIyMTIyNTU4NSwzMjIxMjI1NTg0LDMyMjEyMjU2MDAsMzIyMTIyNTU4MSwzMjIxMjI1NTUxLDMyMjEyMjU2MTcsMzIyMTIyNTQ5MSwzMjIxMjI1NDkwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMzIyMTIyNTQ5MCwzMjIxMjI1NDg5LDMyMjEyMjU0OTIsMzIyMTIyNTQ5MSwzMjIxMjI1NDkwLDMyMjEyMjU0ODgsMzIyMTIyNTUzNSwzMjIxMjI1NDg5LDMyMjEyMjU1NjgsMzIyMTIyNTUxMCwzMjIxMjI1NTAyLDMyMjEyMjU0NzUsMzIyMTIyNTUzOCwzMjIxMjI1NTM3LDMyMjEyMjU0NzQsMCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwzMjIxMjI1NDg2LDMyMjEyMjU1ODAsMzIyMTIyNTU3OSwzMjIxMjI1NTA2LDMyMjEyMjU1ODIsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMzIyMTIyNTQ4OSwzMjIxMjI1NDg4LDMyMjEyMjU0OTAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF1dO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9pc2xhbmRzLmpzIiwiY29uc3QgYmFja2dyb3VuZHMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImJnM3NlYW1sZXNzXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5qcGdcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwidm9sY2Fub1wiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJjYXZlXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImJnMXNlYW1sZXNzXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImZvcmVzdC1ncmVlblwiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJmb3Jlc3QtZmlyZVwiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJmb3Jlc3Qtb3JhbmdlXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImZvcmVzdC1waW5rXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImZvcmVzdFwiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJncmF2ZXlhcmRcIixcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb246IFwiLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwiaWNlLWdyZWVuXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImljZVwiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJzbm93XCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgIH1cclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJhY2tncm91bmRzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9iYWNrZ3JvdW5kcy5qcyJdLCJzb3VyY2VSb290IjoiIn0=