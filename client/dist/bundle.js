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

var _levelLoader = __webpack_require__(30);

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

var _index = __webpack_require__(31);

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
/* 29 */,
/* 30 */
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _levelBuilder = __webpack_require__(32);

var _levelBuilder2 = _interopRequireDefault(_levelBuilder);

var _levelConfig = __webpack_require__(34);

var _levelConfig2 = _interopRequireDefault(_levelConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var levelGenerator = {
    create: function create() {
        var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16 * 34 * 3;
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16 * 23;
        var entryPoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { x: 20, y: 50 };

        var levelBuilder = new _levelBuilder2.default(_levelConfig2.default);
        return levelBuilder.createLayers().build();
    }
};

exports.default = levelGenerator;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(36);

var _layers = __webpack_require__(35);

var LevelBuilder = function LevelBuilder(aLevelConfig) {
    var level = aLevelConfig;
    var levelMatrix = [];
    return {
        createLayers: function createLayers() {
            level.tiledJson.layers = [_layers.groundLayer, _layers.collisionLayer, _layers.deathLayer];
            return this;
        },
        setDimensions: function setDimensions(width, height) {
            level.width = width;
            level.height = height;
            return this;
        },
        build: function build() {
            return level;
        }
    };
};

exports.default = LevelBuilder;

/***/ }),
/* 33 */
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _level = __webpack_require__(33);

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
	"width": 544,
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

exports.default = levelConfig;

/***/ }),
/* 35 */
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
/* 36 */
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
            big[x + col][y + row] = small[row][col];
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
    for (var row = x; row < x + width; row++) {
        for (var col = y; col < y + height; col++) {
            res += matrix[row][col];
        }
    }
    return res === 0;
};

var putMatrixAtPoint = exports.putMatrixAtPoint = function putMatrixAtPoint(big, small, points) {
    points.forEach(function (point) {
        applyMatrix(big, small, point[0], point[1]);
    });
    return big;
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjUxMjQ4N2RjMjVjZTczZWFiYTMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL21lbnUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmF0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmVhci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Rpbm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9kcmFnb25mbHkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9mcm9nLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZ29yaWxsYS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2luc2VjdC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2plbGx5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvbmF0aXZlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcGFycm90LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcHRlcm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9zcGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy90aWdlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvbWVudS9tZW51LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmluaXQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5wcmVsb2FkLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkudXBkYXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9jcmVhdHVyZUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbExvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbGV2ZWxCdWlsZGVyLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL2xldmVsLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL2xldmVsQ29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL2xheWVycy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL3V0aWxzLmpzIl0sIm5hbWVzIjpbIkFJIiwiZ2FtZSIsIngiLCJ5Iiwic3ByaXRlIiwicHJvcHMiLCJiZWhhdmlvdXJzIiwiaWQiLCJ0eXBlIiwic3ByaXRlU3RhdGUiLCJtb2J4Iiwib2JzZXJ2YWJsZSIsImxpZmUiLCJzdHVuIiwiaGl0Iiwibm9oaXQiLCJib2R5IiwiYmxvY2tlZCIsImxlZnQiLCJyaWdodCIsInNjYWxlIiwiYm91bmRUbyIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJoYXNPd25Qcm9wZXJ0eSIsIlBoYXNlciIsIlBvaW50IiwiUmVjdGFuZ2xlIiwieDEiLCJ4MiIsImhlaWdodCIsInkxIiwieTIiLCJjb250YWluc1BvaW50IiwiZ2V0Qm91bmRzIiwiZmFjaW5nUmlnaHQiLCJ0dXJuIiwiZmFjaW5nTGVmdCIsIndpZHRoIiwicGFyYW1zIiwiTWF0aCIsInJhbmRvbSIsInByb2JhYmlsaXR5IiwiYWN0aW9uIiwiY2FsbCIsImZvckVhY2giLCJiZWhhdmlvdXIiLCJFeHRlbmRlZFNwcml0ZSIsImFuaW1hdGlvbnMiLCJhZGQiLCJleGlzdGluZyIsInBoeXNpY3MiLCJlbmFibGUiLCJQaHlzaWNzIiwiQVJDQURFIiwiYW5jaG9yIiwic2V0VG8iLCJjb2xsaWRlV29ybGRCb3VuZHMiLCJjaGVja1dvcmxkQm91bmRzIiwib3V0T2ZCb3VuZHNLaWxsIiwiZ3Jhdml0eSIsIl9kZWJ1Z1RleHQiLCJhZGRDaGlsZCIsInRleHQiLCJmb250IiwiZmlsbCIsInZpc2libGUiLCJhbmltYXRpb24iLCJuYW1lIiwiZnJhbWVzIiwibWFwIiwiZnJhbWUiLCJ0b1N0cmluZyIsImZwcyIsImxvb3AiLCJnYW1lU3RhdGUiLCJzdGF0ZSIsInN0YXRlcyIsImN1cnJlbnQiLCJvYnNlcnZlIiwiY2hhbmdlIiwiY29uc29sZSIsImxvZyIsInVwZGF0ZVN0YXRlIiwiYXNzaWduIiwidmVsb2NpdHkiLCJtYXhTcGVlZCIsImFjY2VsZXJhdGlvbiIsInBsYXkiLCJtb3ZlUmlnaHQiLCJtb3ZlTGVmdCIsInRvdWNoaW5nIiwiZG93biIsImhpdFVudGlsIiwidGltZSIsIm5vdyIsImJyZWFrVW50aWwiLCJkaXJlY3Rpb24iLCJzZXRUZXh0IiwiU3ByaXRlIiwiSHVtYW4iLCJNZW51IiwidW5kZWZpbmVkIiwicHJvdG90eXBlIiwiY3JlYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsIlBsYXkiLCJnbG9iYWxDb25maWciLCJwbGF5ZXIiLCJlbmVteSIsImxldmVsIiwiYmFja2dyb3VuZExheWVyIiwiZ3JvdW5kTGF5ZXIiLCJ0aWxlbWFwIiwiY3JlYXR1cmVDb25maWciLCJsZXZlbExvYWRlciIsImNyZWF0dXJlRmFjdG9yeSIsImluaXQiLCJwcmVsb2FkIiwidXBkYXRlIiwiYmxvY2tzIiwiZG9tRWxlbWVudCIsImJhY2tncm91bmRQYXRoIiwidGlsZXNldFBhdGgiLCJsZXZlbFBhdGgiLCJ0ZXh0dXJlQXRsYXNQYXRoIiwidGV4dHVyZUF0bGFzTmFtZSIsInRleHR1cmVBdGxhc0ltYWdlIiwidGV4dHVyZUF0bGFzSnNvbiIsImNyZWF0dXJlQ29uZmlncyIsImNyZWF0dXJlRGVmYXVsdHMiLCJhY3RpdmUiLCJib3VuY2UiLCJtYXNzIiwianVtcGluZyIsImNvbGxpZGUiLCJsaXZlcyIsImxpZmVzcGFuIiwiSW5maW5pdHkiLCJzZW5zZSIsInRpbWVPZiIsIm1hbiIsImRpbm8iLCJiZWFyIiwiaW1hZ2UiLCJ0aWdlciIsInB0ZXJvIiwiZHJhZ29uZmx5IiwiYmF0Iiwic3BpZGVyIiwibmF0aXZlIiwicGFycm90IiwiaW5zZWN0IiwiYnVnIiwiZnJvZyIsInR1cnRsZSIsImplbGx5IiwiZ29yaWxsYSIsImNyZWF0dXJlIiwiZGVmYXVsdHMiLCJwcm9wIiwiQmF0IiwiQmVhciIsIkJ1ZyIsIkRpbm8iLCJEcmFnb25mbHkiLCJGcm9nIiwiR29yaWxsYSIsIkluc2VjdCIsIkplbGx5IiwiTmF0aXZlIiwiUGFycm90IiwiUHRlcm8iLCJTcGlkZXIiLCJUaWdlciIsIlR1cnRsZSIsImFkdmFuY2VkVGltaW5nIiwiYWxpZ24iLCJzZXQiLCJpbnB1dCIsImtleWJvYXJkIiwib25Eb3duQ2FsbGJhY2siLCJlIiwiaXNOYU4iLCJrZXkiLCJ0ZXN0IiwiZmV0Y2giLCJtZXRob2QiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwibGV2ZWxDb25maWciLCJzdGFydCIsIndvcmxkIiwic2V0Qm91bmRzIiwic3RhcnRTeXN0ZW0iLCJjcmVhdGVCYWNrZ3JvdW5kIiwiY3JlYXRlVGlsZXMiLCJ0aWxlc2V0IiwidGlsZXNldEltYWdlIiwiY3JlYXRlTGF5ZXJzIiwibGF5ZXJzIiwiZml4ZWRUb0NhbWVyYSIsImZpeGVkQmFja2dyb3VuZCIsInJlc2l6ZVdvcmxkIiwiaW5pdGlhbGlzZWQiLCJzY29yZSIsImVudHJ5UG9pbnQiLCJlbmVtaWVzIiwiR3JvdXAiLCJjYW1lcmEiLCJmb2xsb3ciLCJjcmVhdGVDdXJzb3JLZXlzIiwic3BhY2UiLCJhZGRLZXkiLCJLZXlib2FyZCIsIlNQQUNFQkFSIiwibWVudSIsImxvYWQiLCJhdGxhcyIsIkxvYWRlciIsIlRFWFRVUkVfQVRMQVNfSlNPTl9IQVNIIiwiYmFja2dyb3VuZEtleSIsImJhY2tncm91bmRJbWFnZSIsImJhY2tncm91bmRJbWFnZUV4dGVuc2lvbiIsInRpbGVzZXRJbWFnZUV4dGVuc2lvbiIsInRpbGVkSnNvbiIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwiZGVidWciLCJhcmNhZGUiLCJjb2xsaXNpb25MYXllciIsIm92ZXJsYXAiLCJ1cCIsImlzSGl0dGluZyIsImlzU3R1bm5lZCIsImh1cnQiLCJvbktleVByZXNzIiwiaXNEb3duIiwic3RvcCIsImp1bXAiLCJQTEFURk9STUVSIiwiR2FtZSIsIkFVVE8iLCJiaW5kIiwiQ3JlYXR1cmUiLCJvcmlnaW4iLCJsYXllck5hbWUiLCJ0aWxlU3ByaXRlIiwiY3JlYXRlTGF5ZXIiLCJsYXllciIsInRpbGVtYXBLZXkiLCJ0aWxlc2V0S2V5IiwiYWRkVGlsZXNldEltYWdlIiwic2V0Q29sbGlzaW9uQmV0d2VlbiIsImRlYXRoTGF5ZXIiLCJsZXZlbEdlbmVyYXRvciIsImxldmVsQnVpbGRlciIsImJ1aWxkIiwiTGV2ZWxCdWlsZGVyIiwiYUxldmVsQ29uZmlnIiwibGV2ZWxNYXRyaXgiLCJzZXREaW1lbnNpb25zIiwibGV2ZWxNb2RlbCIsImZsYXR0ZW4iLCJtdWx0aWRpbWVuc2lvbmFsIiwicmVkdWNlIiwicmVzIiwicm93IiwiY29uY2F0IiwiYXBwbHlNYXRyaXgiLCJiaWciLCJzbWFsbCIsImNvbCIsImNyZWF0ZU1hdHJpeCIsInJvd3MiLCJjb2xzIiwidGlsZSIsImkiLCJqIiwicHVzaCIsImxheWVyVG9NYXRyaXgiLCJkYXRhIiwicmVzdWx0IiwiY2hlY2tJZkFyZWFJc0NvdmVyZWQiLCJtYXRyaXgiLCJwdXRNYXRyaXhBdFBvaW50IiwicG9pbnRzIiwicG9pbnQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7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SyxDQUE1SyxFQUErSyxDQUEvSyxFQUFrTCxDQUFsTCxFQUFxTCxDQUFyTCxFQUF3TCxDQUF4TCxFQUEyTCxDQUEzTCxFQUE4TCxDQUE5TCxFQUFpTSxDQUFqTSxFQUFvTSxDQUFwTSxFQUF1TSxDQUF2TSxFQUEwTSxDQUExTSxFQUE2TSxDQUE3TSxFQUFnTixDQUFoTixFQUFtTixDQUFuTixFQUFzTixDQUF0TixFQUF5TixDQUF6TixFQUE0TixDQUE1TixFQUErTixDQUEvTixFQUFrTyxDQUFsTyxFQUFxTyxDQUFyTyxFQUF3TyxDQUF4TyxFQUEyTyxDQUEzTyxFQUE4TyxDQUE5TyxFQUFpUCxDQUFqUCxFQUFvUCxDQUFwUCxFQUF1UCxDQUF2UCxFQUEwUCxDQUExUCxFQUE2UCxDQUE3UCxFQUFnUSxDQUFoUSxFQUFtUSxDQUFuUSxFQUFzUSxDQUF0USxFQUF5USxDQUF6USxFQUE0USxDQUE1USxFQUErUSxDQUEvUSxFQUFrUixDQUFsUixFQUFxUixDQUFyUixFQUF3UixDQUF4UixFQUEyUixDQUEzUixFQUE4UixDQUE5UixFQUFpUyxDQUFqUyxFQUFvUyxDQUFwUyxFQUF1UyxDQUF2UyxFQUEwUyxDQUExUyxFQUE2UyxDQUE3UyxFQUFnVCxDQUFoVCxFQUFtVCxDQUFuVCxFQUFzVCxDQUF0VCxFQUF5VCxDQUF6VCxFQUE0VCxDQUE1VCxFQUErVCxDQUEvVCxFQUFrVSxDQUFsVSxFQUFxVSxDQUFyVSxFQUF3VSxDQUF4VSxFQUEyVSxDQUEzVSxFQUE4VSxDQUE5VSxFQUFpVixDQUFqVixFQUFvVixDQUFwVixFQUF1VixDQUF2VixFQUEwVixDQUExVixFQUE2VixDQUE3VixFQUFnVyxDQUFoVyxFQUFtVyxDQUFuVyxFQUFzVyxDQUF0VyxFQUF5VyxDQUF6VyxFQUE0VyxDQUE1VyxFQUErVyxDQUEvVyxFQUFrWCxDQUFsWCxFQUFxWCxDQUFyWCxFQUF3WCxDQUF4WCxFQUEyWCxDQUEzWCxFQUE4WCxDQUE5WCxFQUFpWSxDQUFqWSxFQUFvWSxDQUFwWSxFQUF1WSxDQUF2WSxFQUEwWSxDQUExWSxFQUE2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MkwsQ0FBM0wsRUFBOEwsQ0FBOUwsRUFBaU0sQ0FBak0sRUFBb00sQ0FBcE0sRUFBdU0sQ0FBdk0sRUFBME0sQ0FBMU0sRUFBNk0sQ0FBN00sRUFBZ04sQ0FBaE4sRUFBbU4sQ0FBbk4sRUFBc04sQ0FBdE4sRUFBeU4sQ0FBek4sRUFBNE4sQ0FBNU4sRUFBK04sQ0FBL04sRUFBa08sQ0FBbE8sRUFBcU8sQ0FBck8sRUFBd08sQ0FBeE8sRUFBMk8sQ0FBM08sRUFBOE8sQ0FBOU8sRUFBaVAsQ0FBalAsRUFBb1AsQ0FBcFAsRUFBdVAsQ0FBdlAsRUFBMFAsQ0FBMVAsRUFBNlAsQ0FBN1AsRUFBZ1EsQ0FBaFEsRUFBbVEsQ0FBblEsRUFBc1EsQ0FBdFEsRUFBeVEsQ0FBelEsRUFBNFEsQ0FBNVEsRUFBK1EsQ0FBL1EsRUFBa1IsQ0FBbFIsRUFBcVIsQ0FBclIsRUFBd1IsQ0FBeFIsRUFBMlIsQ0FBM1IsRUFBOFIsQ0FBOVIsRUFBaVMsQ0FBalMsRUFBb1MsQ0FBcFMsRUFBdVMsQ0FBdlMsRUFBMFMsQ0FBMVMsRUFBNlMsQ0FBN1MsRUFBZ1QsQ0FBaFQsRUFBbVQsQ0FBblQsRUFBc1QsQ0FBdFQsRUFBeVQsQ0FBelQsRUFBNFQsQ0FBNVQsRUFBK1QsQ0FBL1QsRUFBa1UsQ0FBbFUsRUFBcVUsQ0FBclUsRUFBd1UsQ0FBeFUsRUFBMlUsQ0FBM1UsRUFBOFUsQ0FBOVUsRUFBaVYsQ0FBalYsRUFBb1YsQ0FBcFYsRUFBdVYsQ0FBdlYsRUFBMFYsQ0FBMVYsRUFBNlYsQ0FBN1YsRUFBZ1csQ0FBaFcsRUFBbVcsQ0FBblcsRUFBc1csQ0FBdFcsRUFBeVcsQ0FBelcsRUFBNFcsQ0FBNVcsRUFBK1csQ0FBL1csRUFBa1gsQ0FBbFgsRUFBcVgsQ0FBclgsRUFBd1gsQ0FBeFgsRUFBMlgsQ0FBM1gsRUFBOFgsQ0FBOVgsRUFBaVksQ0FBalksRUFBb1ksQ0FBcFksRUFBdVksQ0FBdlksRUFBMFksQ0FBMVksRUFBNlksQ0FBN1ksRUFBZ1osQ0FBaFosRUFBbVosQ0FBblosRUFBc1osQ0FBdFosRUFBeVosQ0FBelosRUFB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RUFBME0sQ0FBMU0sRUFBNk0sQ0FBN00sRUFBZ04sQ0FBaE4sRUFBbU4sQ0FBbk4sRUFBc04sQ0FBdE4sRUFBeU4sQ0FBek4sRUFBNE4sQ0FBNU4sRUFBK04sQ0FBL04sRUFBa08sQ0FBbE8sRUFBcU8sQ0FBck8sRUFBd08sQ0FBeE8sRUFBMk8sQ0FBM08sRUFBOE8sQ0FBOU8sRUFBaVAsQ0FBalAsRUFBb1AsQ0FBcFAsRUFBdVAsQ0FBdlAsRUFBMFAsQ0FBMVAsRUFBNlAsQ0FBN1AsRUFBZ1EsQ0FBaFEsRUFBbVEsQ0FBblEsRUFBc1EsQ0FBdFEsRUFBeVEsQ0FBelEsRUFBNFEsQ0FBNVEsRUFBK1EsQ0FBL1EsRUFBa1IsQ0FBbFIsRUFBcVIsQ0FBclIsRUFBd1IsQ0FBeFIsRUFBMlIsQ0FBM1IsRUFBOFIsQ0FBOVIsRUFBaVMsQ0FBalMsRUFBb1MsQ0FBcFMsRUFBdVMsQ0FBdlMsRUFBMFMsQ0FBMVMsRUFBNlMsQ0FBN1MsRUFBZ1QsQ0FBaFQsRUFBbVQsQ0FBblQsRUFBc1QsQ0FBdFQsRUFBeVQsQ0FBelQsRUFBNFQsQ0FBNVQsRUFBK1QsQ0FBL1QsRUFBa1UsQ0FBbFUsRUFBcVUsQ0FBclUsRUFBd1UsQ0FBeFUsRUFBMlUsQ0FBM1UsRUFBOFUsQ0FBOVUsRUFBaVYsQ0FBalYsRUFBb1YsQ0FBcFYsRUFBdVYsQ0FBdlYsRUFBMFYsQ0FBMVYsRUFBNlYsQ0FBN1YsRUFBZ1csQ0FBaFcsRUFBbVcsQ0FBblcsRUFBc1csQ0FBdFcsRUFBeVcsQ0FBelcsRUFBNFcsQ0FBNVcsRUFBK1csQ0FBL1csRUFBa1gsQ0FBbFgsRUFBcVgsQ0FBclgsRUFBd1gsQ0FBeFgsRUFBMlgsQ0FBM1gsRUFBOFgsQ0FBOVgsRUFBaVksQ0FBalksRUFBb1ksQ0FBcFksRUFBdVksQ0FBdlksRUFBMFksQ0FBMVksRUFBNlksQ0FBN1ksRUFBZ1osQ0FBaFosRUFBbVosQ0FBblosRUFBc1osQ0FBdFosRUFBeVosQ0FBelosRUFBNFosQ0FBNVosRUFBK1osQ0FBL1osRUFBa2EsQ0FBbGEsRUFBcWEsQ0FBcmEsRUFBd2EsQ0FBeGEs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TSxDQUF2TSxFQUEwTSxDQUExTSxFQUE2TSxDQUE3TSxFQUFnTixDQUFoTixFQUFtTixDQUFuTixFQUFzTixDQUF0TixFQUF5TixDQUF6TixFQUE0TixDQUE1TixFQUErTixDQUEvTixFQUFrTyxDQUFsTyxFQUFxTyxDQUFyTyxFQUF3TyxDQUF4TyxFQUEyTyxDQUEzTyxFQUE4TyxDQUE5TyxFQUFpUCxDQUFqUCxFQUFvUCxDQUFwUCxFQUF1UCxDQUF2UCxFQUEwUCxDQUExUCxFQUE2UCxDQUE3UCxFQUFnUSxDQUFoUSxFQUFtUSxDQUFuUSxFQUFzUSxDQUF0USxFQUF5USxDQUF6USxFQUE0USxDQUE1USxFQUErUSxDQUEvUSxFQUFrUixDQUFsUixFQUFxUixDQUFyUixFQUF3UixDQUF4UixFQUEyUixDQUEzUixFQUE4UixDQUE5UixFQUFpUyxDQUFqUyxFQUFvUyxDQUFwUyxFQUF1UyxDQUF2UyxFQUEwUyxDQUExUyxFQUE2UyxDQUE3UyxFQUFnVCxDQUFoVCxFQUFtVCxDQUFuVCxFQUFzVCxDQUF0VCxFQUF5VCxDQUF6VCxFQUE0VCxDQUE1VCxFQUErVCxDQUEvVCxFQUFrVSxDQUFsVSxFQUFxVSxDQUFyVSxFQUF3VSxDQUF4VSxFQUEyVSxDQUEzVSxFQUE4VSxDQUE5VSxFQUFpVixDQUFqVixFQUFvVixDQUFwVixFQUF1VixDQUF2VixFQUEwVixDQUExVixFQUE2VixDQUE3VixFQUFnVyxDQUFoVyxFQUFtVyxDQUFuVyxFQUFzVyxDQUF0VyxFQUF5VyxDQUF6VyxFQUE0VyxDQUE1VyxFQUErVyxDQUEvVyxFQUFrWCxDQUFsWCxFQUFxWCxDQUFyWCxFQUF3WCxDQUF4WCxFQUEyWCxDQUEzWCxFQUE4WCxDQUE5WCxFQUFpWSxDQUFqWSxFQUFvWSxDQUFwWSxFQUF1WSxDQUF2WSxFQUEwWSxDQUExWSxFQUE2WSxDQUE3WSxFQUFnWixDQUFoWixFQUFtWixDQUFuWixFQUFzWixDQUF0WixFQUF5WixDQUF6WixFQUE0WixDQUE1WixFQUErWixDQUEvWixFQUFrYSxDQUFsYSxFQUFxYSxDQUFyYSxFQUF3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RUFBZ04sQ0FBaE4sRUFBbU4sQ0FBbk4sRUFBc04sQ0FBdE4sRUFBeU4sQ0FBek4sRUFBNE4sQ0FBNU4sRUFBK04sQ0FBL04sRUFBa08sQ0FBbE8sRUFBcU8sQ0FBck8sRUFBd08sQ0FBeE8sRUFBMk8sQ0FBM08sRUFBOE8sQ0FBOU8sRUFBaVAsQ0FBalAsRUFBb1AsQ0FBcFAsRUFBdVAsQ0FBdlAsRUFBMFAsQ0FBMVAsRUFBNlAsQ0FBN1AsRUFBZ1EsQ0FBaFEsRUFBbVEsQ0FBblEsRUFBc1EsQ0FBdFEsRUFBeVEsQ0FBelEsRUFBNFEsQ0FBNVEsRUFBK1EsQ0FBL1EsRUFBa1IsQ0FBbFIsRUFBcVIsQ0FBclIsRUFBd1IsQ0FBeFIsRUFBMlIsQ0FBM1IsRUFBOFIsQ0FBOVIsRUFBaVMsQ0FBalMsRUFBb1MsQ0FBcFMsRUFBdVMsQ0FBdlMsRUFBMFMsQ0FBMVMsRUFBNlMsQ0FBN1MsRUFBZ1QsQ0FBaFQsRUFBbVQsQ0FBblQsRUFBc1QsQ0FBdFQsRUFBeVQsQ0FBelQsRUFBNFQsQ0FBNVQsRUFBK1QsQ0FBL1QsRUFBa1UsQ0FBbFUsRUFBcVUsQ0FBclUsRUFBd1UsQ0FBeFUsRUFBMlUsQ0FBM1UsRUFBOFUsQ0FBOVUsRUFBaVYsQ0FBalYsRUFBb1YsQ0FBcFYsRUFBdVYsQ0FBdlYsRUFBMFYsQ0FBMVYsRUFBNlYsQ0FBN1YsRUFBZ1csQ0FBaFcsRUFBbVcsQ0FBblcsRUFBc1csQ0FBdFcsRUFBeVcsQ0FBelcsRUFBNFcsQ0FBNVcsRUFBK1csQ0FBL1csRUFBa1gsQ0FBbFgsRUFBcVgsQ0FBclgsRUFBd1gsQ0FBeFgsRUFBMlgsQ0FBM1gsRUFBOFgsQ0FBOVgsRUFBaVksQ0FBalksRUFBb1ksQ0FBcFksRUFBdVksQ0FBdlksRUFBMFksQ0FBMVksRUFBNlksQ0FBN1ksRUFBZ1osQ0FBaFosRUFBbVosQ0FBblosRUFBc1osQ0FBdFosRUFBeVosQ0FBelosRUFBNFosQ0FBNVosRUFBK1osQ0FBL1osRUFBa2EsQ0FBbGEsRUFBcWEsQ0FBcmEsRUFBd2EsQ0FBeGEsRUFBMmEsQ0FBM2EsRUFBOGEsQ0FBOWEs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c04sQ0FBdE4sRUFBeU4sQ0FBek4sRUFBNE4sQ0FBNU4sRUFBK04sQ0FBL04sRUFBa08sQ0FBbE8sRUFBcU8sQ0FBck8sRUFBd08sQ0FBeE8sRUFBMk8sQ0FBM08sRUFBOE8sQ0FBOU8sRUFBaVAsQ0FBalAsRUFBb1AsQ0FBcFAsRUFBdVAsQ0FBdlAsRUFBMFAsQ0FBMVAsRUFBNlAsQ0FBN1AsRUFBZ1EsQ0FBaFEsRUFBbVEsQ0FBblEsRUFBc1EsQ0FBdFEsRUFBeVEsQ0FBelEsRUFBNFEsQ0FBNVEsRUFBK1EsQ0FBL1EsRUFBa1IsQ0FBbFIsRUFBcVIsQ0FBclIsRUFBd1IsQ0FBeFIsRUFBMlIsQ0FBM1IsRUFBOFIsQ0FBOVIsRUFBaVMsQ0FBalMsRUFBb1MsQ0FBcFMsRUFBdVMsQ0FBdlMsRUFBMFMsQ0FBMVMsRUFBNlMsQ0FBN1MsRUFBZ1QsQ0FBaFQsRUFBbVQsQ0FBblQsRUFBc1QsQ0FBdFQsRUFBeVQsQ0FBelQsRUFBNFQsQ0FBNVQsRUFBK1QsQ0FBL1QsRUFBa1UsQ0FBbFUsRUFBcVUsQ0FBclUsRUFBd1UsQ0FBeFUsRUFBMlUsQ0FBM1UsRUFBOFUsQ0FBOVUsRUFBaVYsQ0FBalYsRUFBb1YsQ0FBcFYsRUFBdVYsQ0FBdlYsRUFBMFYsQ0FBMVYsRUFBNlYsQ0FBN1YsRUFBZ1csQ0FBaFcsRUFBbVcsQ0FBblcsRUFBc1csQ0FBdFcsRUFBeVcsQ0FBelcsRUFBNFcsQ0FBNVcsRUFBK1csQ0FBL1csRUFBa1gsQ0FBbFgsRUFBcVgsQ0FBclgsRUFBd1gsQ0FBeFgsRUFBMlgsQ0FBM1gsRUFBOFgsQ0FBOVgsRUFBaVksQ0FBalksRUFBb1ksQ0FBcFksRUFBdVksQ0FBdlksRUFBMFksQ0FBMVksRUFBNlksQ0FBN1ksRUFBZ1osQ0FBaFosRUFBbVosQ0FBblosRUFBc1osQ0FBdFosRUFBeVosQ0FBelosRUFBNFosQ0FBNVosRUFBK1osQ0FBL1osRUFBa2EsQ0FBbGEsRUFBcWEsQ0FBcmEsRUFBd2EsQ0FBeGEsRUFBMmEsQ0FBM2EsRUFBOGEsQ0FBOWEsRUFBaWIsQ0FBamIsRUFBb2IsQ0FBcGIsRUFB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YnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGY1MTI0ODdkYzI1Y2U3M2VhYmEzIiwiaW1wb3J0IEV4dGVuZGVkU3ByaXRlIGZyb20gJy4vRXh0ZW5kZWRTcHJpdGUnO1xyXG5cclxuY2xhc3MgQUkgZXh0ZW5kcyBFeHRlbmRlZFNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzLCBiZWhhdmlvdXJzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IGAke3Byb3BzLnR5cGV9LSR7eH0tJHt5fWA7XHJcblxyXG4gICAgICAgIHRoaXMuYmVoYXZpb3VycyA9IGJlaGF2aW91cnM7XHJcblxyXG4gICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgICAgICBsaWZlOiAxMCxcclxuICAgICAgICAgICAgc3R1bjogMCxcclxuICAgICAgICAgICAgaGl0OiAwLFxyXG4gICAgICAgICAgICBub2hpdDogMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICAgIHR1cm5JZkJsb2NrZWQoKXtcclxuICAgICAgICBpZih0aGlzLmJvZHkuYmxvY2tlZC5sZWZ0IHx8IHRoaXMuYm9keS5ibG9ja2VkLnJpZ2h0KXtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZS54ICo9IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHR1cm4oKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggKj0gLTE7XHJcbiAgICB9XHJcbiAgICBzZXRCb3VuZHMoYm91bmRUbyl7XHJcbiAgICAgICAgaWYoIWJvdW5kVG8gfHwgIU9iamVjdC5rZXlzKGJvdW5kVG8pLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm91bmRUbyA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneCcpICYmXHJcbiAgICAgICAgICAgIGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3knKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kVG8gPSBuZXcgUGhhc2VyLlBvaW50KFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueCxcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLnlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBAUmVjdGFuZ2xlIHsgeDEsIHgyIH1cclxuICAgICAgICBpZihib3VuZFRvLmhhc093blByb3BlcnR5KCd4MScpICYmXHJcbiAgICAgICAgICAgIGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3gyJykgJiZcclxuICAgICAgICAgICAgIWJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3kxJykgJiZcclxuICAgICAgICAgICAgIWJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3kyJykpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFRvID0gbmV3IFBoYXNlci5SZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby54MSxcclxuICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDIgLSBib3VuZFRvLngxLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5oZWlnaHRcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB7eDEsIHkxLCB4MiwgeTJ9XHJcbiAgICAgICAgaWYoYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneDEnKSAmJlxyXG4gICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd4MicpICYmXHJcbiAgICAgICAgICAgIGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3kxJykgJiZcclxuICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTInKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kVG8gPSBuZXcgUGhhc2VyLlJlY3RhbmdsZShcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngxLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueTEsXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby54MiAtIGJvdW5kVG8ueDEsXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby55MiAtIGJvdW5kVG8ueTFcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2hlY2tCb3VuZHMoKXtcclxuICAgICAgICBpZighdGhpcy5ib3VuZFRvKXtcclxuICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBAUG9pbnQge3gsIHl9XHJcbiAgICAgICAgaWYoIXRoaXMuYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSAmJlxyXG4gICAgICAgICAgICAhUGhhc2VyLlJlY3RhbmdsZS5jb250YWluc1BvaW50KHRoaXMuZ2V0Qm91bmRzKCksIHRoaXMuYm91bmRUbykgJiZcclxuICAgICAgICAgICAgKCh0aGlzLnggPCB0aGlzLmJvdW5kVG8ueCAmJiAhdGhpcy5mYWNpbmdSaWdodCkgfHxcclxuICAgICAgICAgICAgKHRoaXMueCA+IHRoaXMuYm91bmRUby54ICYmIHRoaXMuZmFjaW5nUmlnaHQpKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1cm4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEBSZWN0YW5nbGUge3gxLCB4Mn0gb3Ige3gxLCB5MSwgeDIsIHkyfVxyXG4gICAgICAgIGlmKHRoaXMuYm91bmRUbyAmJlxyXG4gICAgICAgICAgICB0aGlzLmJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3dpZHRoJykgJiZcclxuICAgICAgICAgICAgKHRoaXMueCA8IHRoaXMuYm91bmRUby54ICYmIHRoaXMuZmFjaW5nTGVmdCB8fFxyXG4gICAgICAgICAgICB0aGlzLnggPiB0aGlzLmJvdW5kVG8ueCArIHRoaXMuYm91bmRUby53aWR0aCAmJiB0aGlzLmZhY2luZ1JpZ2h0KSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1cm4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB3aGVuKHBhcmFtcykge1xyXG5cdFx0aWYoTWF0aC5yYW5kb20oKSA8IHBhcmFtcy5wcm9iYWJpbGl0eSl7XHJcblx0XHRcdHRoaXNbcGFyYW1zLmFjdGlvbl0gJiYgdGhpc1twYXJhbXMuYWN0aW9uXS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cdH1cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIC8vY29uc3QgZGVidWdCb3VuZHMgPSB0aGlzLmlkKydcXG4nKyAodGhpcy5ib3VuZFRvICYmIE9iamVjdC5rZXlzKHRoaXMuYm91bmRUbykubGVuZ3RoICYmIHRoaXMuYm91bmRUby54KSArJ1xcbicrICh0aGlzLnggfCAwKTtcclxuICAgICAgICAvL3RoaXMuZGVidWcoZGVidWdCb3VuZHMpO1xyXG4gICAgICAgIHRoaXMuYmVoYXZpb3Vycy5mb3JFYWNoKChiZWhhdmlvdXIpID0+IHtcclxuICAgICAgICAgICAgdGhpc1tiZWhhdmlvdXIuYWN0aW9uXSAmJiB0aGlzW2JlaGF2aW91ci5hY3Rpb25dLmNhbGwodGhpcywgYmVoYXZpb3VyLnBhcmFtcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFJO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvQUkuanMiLCJjbGFzcyBFeHRlbmRlZFNwcml0ZSBleHRlbmRzIFBoYXNlci5TcHJpdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzIHx8IHsgYW5pbWF0aW9uczogW10gfTtcclxuICAgICAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSwgMSk7XHJcbiAgICAgICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jaGVja1dvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm91dE9mQm91bmRzS2lsbCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdyYXZpdHkueSA9IHRoaXMucHJvcHMuZ3Jhdml0eTtcclxuICAgICAgICB0aGlzLl9kZWJ1Z1RleHQgPSB0aGlzLmFkZENoaWxkKFxyXG4gICAgICAgICAgICB0aGlzLmdhbWUuYWRkLnRleHQoMjAsIC0yMCwgJ2RlYnVnJywgeyBmb250OiBcIjEycHggQ291cmllclwiLCBmaWxsOiBcIiNmZmZmZmZcIiB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5fZGVidWdUZXh0LnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5hbmltYXRpb25zLmZvckVhY2goYW5pbWF0aW9uID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLmFkZChcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5uYW1lLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZyYW1lcy5tYXAoZnJhbWUgPT4gZnJhbWUudG9TdHJpbmcoKSksXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24uZnBzLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmxvb3BcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZ2FtZVN0YXRlID0gdGhpcy5nYW1lLnN0YXRlLnN0YXRlc1t0aGlzLmdhbWUuc3RhdGUuY3VycmVudF0uZ2FtZVN0YXRlO1xyXG5cclxuICAgICAgICBtb2J4Lm9ic2VydmUoZ2FtZVN0YXRlLCAoY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UnLCBjaGFuZ2UsIGdhbWVTdGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUgPSBtb2J4LmFjdGlvbigoY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuc3ByaXRlU3RhdGUsIGNoYW5nZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzSGl0dGluZygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwcml0ZVN0YXRlLmhpdCA+IHRoaXMuZ2FtZS50aW1lLm5vdztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNTdHVubmVkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlU3RhdGUuc3R1biA+IHRoaXMuZ2FtZS50aW1lLm5vdztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZmFjaW5nUmlnaHQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS54ID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZmFjaW5nTGVmdCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnggPCAwO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVMZWZ0KCl7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gLTE7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnZlbG9jaXR5LnggPiAtdGhpcy5wcm9wcy5tYXhTcGVlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC09IHRoaXMucHJvcHMuYWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlUmlnaHQoKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSAxO1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS52ZWxvY2l0eS54IDwgdGhpcy5wcm9wcy5tYXhTcGVlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ICs9IHRoaXMucHJvcHMuYWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlKCl7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgICAgICBpZih0aGlzLnNjYWxlLnggPT09IDEpe1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVSaWdodCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUxlZnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcCgpe1xyXG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC89IDEuMTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheSgnc3RvcCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGp1bXAoKXtcclxuICAgICAgICBpZih0aGlzLmJvZHkudG91Y2hpbmcuZG93biB8fCB0aGlzLmJvZHkuYmxvY2tlZC5kb3duKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgLT0gMzAwO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheSgnanVtcCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoaXQoKXtcclxuICAgICAgICBjb25zdCBoaXRVbnRpbCA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDkwMCxcclxuICAgICAgICAgICAgYnJlYWtVbnRpbCA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDEwMDA7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ05vdyAlcyBIaXQgJXMgQnJlYWsgJXMnLCB0aGlzLmdhbWUudGltZS5ub3csIGhpdFVudGlsLCBicmVha1VudGlsKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgICAgICAgaGl0OiBoaXRVbnRpbCxcclxuICAgICAgICAgICAgbm9oaXQ6IGJyZWFrVW50aWxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheSgnaGl0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaHVydChkaXJlY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55IC09IDEwMDtcclxuICAgICAgICBpZihkaXJlY3Rpb24gJiYgZGlyZWN0aW9uLmxlZnQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAtPSAxMDAgfHwgdGhpcy5wcm9wcy5tYXhTcGVlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uICYmIGRpcmVjdGlvbi5yaWdodCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ICs9IDEwMCB8fCB0aGlzLnByb3BzLm1heFNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheSgnaHVydCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlYnVnKHRleHQpe1xyXG4gICAgICAgdGhpcy5fZGVidWdUZXh0LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgdGhpcy5fZGVidWdUZXh0LnNjYWxlLnggPSB0aGlzLnNjYWxlLng7XHJcbiAgICAgICB0aGlzLl9kZWJ1Z1RleHQuc2V0VGV4dCh0ZXh0LnRvU3RyaW5nKCkgfHwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ1tTcHJpdGVdIHN0YXRlJyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHRlbmRlZFNwcml0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0V4dGVuZGVkU3ByaXRlLmpzIiwiaW1wb3J0IEV4dGVuZGVkU3ByaXRlIGZyb20gJy4vRXh0ZW5kZWRTcHJpdGUnO1xyXG5cclxuY2xhc3MgSHVtYW4gZXh0ZW5kcyBFeHRlbmRlZFNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGxpZmU6IDEwLFxyXG4gICAgICAgICAgICBzdHVuOiAwLFxyXG4gICAgICAgICAgICBoaXQ6IDAsXHJcbiAgICAgICAgICAgIG5vaGl0OiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEh1bWFuO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJpbXBvcnQgY3JlYXRlIGZyb20gJy4vbWVudS5jcmVhdGUnO1xyXG4vL2ltcG9ydCB1cGRhdGUgZnJvbSAnLi9wbGF5LnVwZGF0ZSc7XHJcblxyXG5jbGFzcyBNZW51IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxufVxyXG5cclxuTWVudS5wcm90b3R5cGUuY3JlYXRlID0gY3JlYXRlO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNZW51O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvbWVudS9pbmRleC5qcyIsImltcG9ydCBBSSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0FJJztcbmltcG9ydCBIdW1hbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL0h1bWFuJztcblxuaW1wb3J0IGxldmVsTG9hZGVyIGZyb20gJy4uLy4uL3NlcnZpY2VzL2xldmVsTG9hZGVyJztcbmltcG9ydCBjcmVhdHVyZUZhY3RvcnkgZnJvbSAnLi4vLi4vc2VydmljZXMvY3JlYXR1cmVGYWN0b3J5JztcbmltcG9ydCBjcmVhdHVyZUNvbmZpZyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnJztcblxuaW1wb3J0IGluaXQgZnJvbSAnLi9wbGF5LmluaXQnO1xuaW1wb3J0IHByZWxvYWQgZnJvbSAnLi9wbGF5LnByZWxvYWQnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuL3BsYXkuY3JlYXRlJztcbmltcG9ydCB1cGRhdGUgZnJvbSAnLi9wbGF5LnVwZGF0ZSc7XG5cclxuY2xhc3MgUGxheSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnbG9iYWxDb25maWcpIHtcclxuICAgICAgICB0aGlzLmtleXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5lbmVteSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmxldmVsID0ge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kTGF5ZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgZ3JvdW5kTGF5ZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdGlsZW1hcDogdW5kZWZpbmVkXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcgPSBnbG9iYWxDb25maWc7XHJcbiAgICAgICAgdGhpcy5jcmVhdHVyZUNvbmZpZyA9IGNyZWF0dXJlQ29uZmlnO1xyXG4gICAgICAgIHRoaXMubGV2ZWxMb2FkZXIgPSBsZXZlbExvYWRlci5jYWxsKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY3JlYXR1cmVGYWN0b3J5ID0gY3JlYXR1cmVGYWN0b3J5LmNhbGwodGhpcyk7XHJcbiAgICB9XHJcbn1cblxuUGxheS5wcm90b3R5cGUuaW5pdCA9IGluaXQ7XG5QbGF5LnByb3RvdHlwZS5wcmVsb2FkID0gcHJlbG9hZDtcclxuUGxheS5wcm90b3R5cGUuY3JlYXRlID0gY3JlYXRlO1xyXG5QbGF5LnByb3RvdHlwZS51cGRhdGUgPSB1cGRhdGU7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L2luZGV4LmpzIiwiY29uc3QgZ2xvYmFsQ29uZmlnID0ge1xyXG4gICAgd2lkdGg6IDU0NixcclxuICAgIGhlaWdodDogMzY4LFxyXG4gICAgYmxvY2tzOiAzLFxyXG4gICAgZG9tRWxlbWVudDogJ2dhbWUnLFxyXG4gICAgYmFja2dyb3VuZFBhdGg6ICdiYWNrZ3JvdW5kcy8nLFxyXG4gICAgdGlsZXNldFBhdGg6ICd0aWxlc2V0cy8nLFxyXG4gICAgbGV2ZWxQYXRoOiAnbGV2ZWxzLycsXHJcbiAgICB0ZXh0dXJlQXRsYXNQYXRoOiAnc3ByaXRlc2hlZXRzLycsXHJcbiAgICB0ZXh0dXJlQXRsYXNOYW1lOiAncHJlMmF0bGFzJyxcclxuICAgIHRleHR1cmVBdGxhc0ltYWdlOiAncHJlMmF0bGFzLnBuZycsXHJcbiAgICB0ZXh0dXJlQXRsYXNKc29uOiAncHJlMmF0bGFzLmpzb24nXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnbG9iYWxDb25maWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2xvYmFsQ29uZmlnLmpzIiwidmFyIGNyZWF0dXJlQ29uZmlncyA9IHtcclxuICBjcmVhdHVyZURlZmF1bHRzOiB7XHJcbiAgICBhY3RpdmU6IHRydWUsXHJcbiAgICBncmF2aXR5OiA1MDAsXHJcbiAgICBib3VuY2U6IDAuMixcclxuICAgIG1hc3M6IDEsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogMTAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBsaXZlczogMSxcclxuICAgIGxpZmVzcGFuOiBJbmZpbml0eSxcclxuICAgIHNlbnNlOiAxNTAsXHJcbiAgICBhbmltYXRpb25zOiBbXSxcclxuICAgIHRpbWVPZjoge1xyXG4gICAgICAnbW92ZSc6IDIwMCxcclxuICAgICAgJ2hpdCc6IDEwMCxcclxuICAgICAgJ2h1cnQnOiA1MDAsXHJcbiAgICAgICdzdG9wJzogMjAwLFxyXG4gICAgICAnaWRsZSc6IDEwXHJcbiAgICB9LFxyXG4gICAgYm91bmRUbyA6IHt9LFxyXG4gICAgYmVoYXZpb3VyczogW1xyXG4gICAgICAgIHsgYWN0aW9uOiAndHVybklmQmxvY2tlZCcgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ21vdmUnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdjaGVja0JvdW5kcycgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgbWFuOiB7XHJcbiAgICB0eXBlOiAnbWFuJyxcclxuICAgIG1heFNwZWVkOiAyMDAsXHJcbiAgICBsaXZlczogOCxcclxuICAgIGxpZmVzcGFuOiBJbmZpbml0eSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzExLCcwMycsJzA1JywxNCwyMF0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2hpdCcsIGZyYW1lczogWzIyLDI0LDI4LDMxLDM0LDIyLDI0LDI4LDMxLDM0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzdG9wJywgZnJhbWVzOiBbNDIsNDUsNDksNTJdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMTYsNDEsNDcsNTAsNTAsNTAsNTAsNTAsNTAsNTAsNTAsMTMsNTAsMTMsNTAsMTNdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjcsMjcsMjcsMjcsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMzAsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjcsMzAsMjcsMzAsMzUsMzYsMjUsMjUsMjUsMjUsMjUsMjUsMjUsMjUsJzA3JywnMDcnLCcwNycsJzA3JywnMDInLCcwMiddLCBmcHM6IDUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnaHVydCcsIGZyYW1lczogWzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzdHVuJywgZnJhbWVzOiBbMTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzE5XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFsxMSwnMDMnLCcwNScsMTQsMjBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBkaW5vOiB7XHJcbiAgICB0eXBlOiAnZGlubycsXHJcbiAgICBtYXNzOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDUsXHJcbiAgICBiZWhhdmlvdXJzOiBbXHJcbiAgICAgICAgeyBhY3Rpb246ICd0dXJuSWZCbG9ja2VkJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnbW92ZScgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ2NoZWNrQm91bmRzJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnd2hlbicsIHBhcmFtczogeyBwcm9iYWJpbGl0eTogMC4wMSwgYWN0aW9uOiAnanVtcCcgfSB9XHJcbiAgICBdLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzYwLDM2MCwzNjAsMzYwLDM2MCwzNjAsMzYwLDM2N10sIGZwczogNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzYwLDM2MSwzNjQsMzY3LDM2OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzM2MCwzNjEsMzY0LDM2NywzNjldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2ZhbGwnLCBmcmFtZXM6IFszNjldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM3MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNjAsMzYxLDM2NCwzNjddLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGJlYXI6IHtcclxuICAgIHR5cGU6ICdiZWFyJyxcclxuICAgIG1hc3M6IDEuMixcclxuICAgIG1heFNwZWVkOiA3NSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDE1LFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzIxXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMyMCwzMjEsMzI0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM2NiwzNjMsMzU4LDMxN10sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzMyOF0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgJ3N1cGVyLWJlYXInOiB7XHJcbiAgICBhY2NlbGVyYXRpb246IDMwLFxyXG4gICAgbWF4U3BlZWQ6IDIwMCxcclxuICAgIGltYWdlOiAnc3VwZXItYmVhci1zcHJpdGUtcmVmJywgLy8gb3ZlcnJpZGUgc3ByaXRlIChjcmVhdHVyZSBuYW1lIGJ5IGRlZmF1bHQpXHJcbiAgICBhbmltYXRpb25zOiBbXVxyXG4gIH0sXHJcbiAgdGlnZXI6IHtcclxuICAgIHR5cGU6ICd0aWdlcicsXHJcbiAgICBtYXNzOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDIwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzkzLDM5NV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM5MywzOTVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszOTksNDAxXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZmFsbCcsIGZyYW1lczogWzM5OV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQwMl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszOTMsMzk1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBwdGVybzoge1xyXG4gICAgdHlwZTogJ3B0ZXJvJyxcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiAxMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFs0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3Nyw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3Nyw0NzddLCBmcHM6IDMsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzQwMyw0MDQsNDA1LDQwMyw0MDQsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDAzLDQwNCw0MDUsNDAzLDQwNCw0MDUsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2Rlc2NlbmQnLCBmcmFtZXM6IFs0MDVdLCBmcHM6IDE1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2FzY2VuZCcsIGZyYW1lczogWzQwMyw0MDQsNDA1XSwgZnBzOiAxNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0NzFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbNDA1LDQwMyw0MDRdLCBmcHM6IDE1LCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGRyYWdvbmZseToge1xyXG4gICAgdHlwZTogJ2RyYWdvbmZseScsXHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzM3LDMzOF0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMzNywzMzhdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3R1cm4nLCBmcmFtZXM6IFszMzksMzQwXSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNDJdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzM3LDMzOF0sIGZwczogMTIsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgYmF0OiB7XHJcbiAgICB0eXBlOiAnYmF0JyxcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiAyMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNTEsMzUyLDM1MSwzNTEsMzUxLDM1MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM1NywzNTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM2Ml0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNTcsMzU5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBzcGlkZXI6IHtcclxuICAgIHR5cGU6ICdzcGlkZXInLFxyXG4gICAgbWFzczogMC4zLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzM1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM2NSwzNjgsMzcwLDM3Ml0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFsyOTksMzAyLDMwNSwzMDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3R1cm4nLCBmcmFtZXM6IFszMTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2NsaW1iJywgZnJhbWVzOiBbMzQxLDM0MywzNDUsMzQ3XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICd3YWl0JywgZnJhbWVzOiBbMzMyLDMzNSwzNzJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzMyMl0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIG5hdGl2ZToge1xyXG4gICAgdHlwZTogJ25hdGl2ZScsXHJcbiAgICBtYXhTcGVlZDogMTAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyMCxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNzNdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszNzMsMzc2LDM3OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzgwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNzMsMzc2LDM3OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgcGFycm90OiB7XHJcbiAgICB0eXBlOiAncGFycm90JyxcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiAxMDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzk0LDM5NywzOThdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszOTQsMzk3LDM5OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDAwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszOTQsMzk3LDM5OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgaW5zZWN0OiB7XHJcbiAgICB0eXBlOiAnaW5zZWN0JyxcclxuICAgIG1hc3M6IDEsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDI1LFxyXG4gICAgYmVoYXZpb3VyczogW1xyXG4gICAgICAgIHsgYWN0aW9uOiAndHVybklmQmxvY2tlZCcgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ21vdmUnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdjaGVja0JvdW5kcycgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ3doZW4nLCBwYXJhbXM6IHsgcHJvYmFiaWxpdHk6IDAuMDMsIGFjdGlvbjogJ2p1bXAnIH0gfVxyXG4gICAgXSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM0OCwzNDgsMzQ4LDM0OCwzNDgsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMyMywzNDgsMzQ5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzIzLDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM0OF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszMjMsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgYnVnOiB7XHJcbiAgICB0eXBlOiAnYnVnJyxcclxuICAgIG1hc3M6IDEsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAxLjUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDI1LFxyXG4gICAgYmVoYXZpb3VyczogW1xyXG4gICAgICAgIHsgYWN0aW9uOiAndHVybklmQmxvY2tlZCcgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ21vdmUnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdjaGVja0JvdW5kcycgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ3doZW4nLCBwYXJhbXM6IHsgcHJvYmFiaWxpdHk6IDAuMDIsIGFjdGlvbjogJ2p1bXAnIH0gfVxyXG4gICAgXSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzM0NCwzNDZdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM0NF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBmcm9nOiB7XHJcbiAgICB0eXBlOiAnZnJvZycsXHJcbiAgICBtYXNzOiAxLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMS41LFxyXG4gICAganVtcGluZzogNTAwLFxyXG4gICAgbWF4U3BlZWQ6IDgwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiA0MCxcclxuICAgIGJlaGF2aW91cnM6IFtcclxuICAgICAgICB7IGFjdGlvbjogJ3R1cm5JZkJsb2NrZWQnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdtb3ZlJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnY2hlY2tCb3VuZHMnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICd3aGVuJywgcGFyYW1zOiB7IHByb2JhYmlsaXR5OiAwLjEsIGFjdGlvbjogJ2p1bXAnIH0gfVxyXG4gICAgXSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMyNV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzMyNSwzMjcsMzMxLDMyNV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszMjUsMzI3LDMzMSwzMjVdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszMzRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzI1LDMyNywzMzEsMzI1XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgdHVydGxlOiB7XHJcbiAgICB0eXBlOiAndHVydGxlJyxcclxuICAgIG1hc3M6IDIsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMC4zLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM5MF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNzcsMzgxLDM4NCwzODVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszODcsMzg5LDM5MCwzOTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM5Ml0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgamVsbHk6IHtcclxuICAgIHR5cGU6ICdqZWxseScsXHJcbiAgICBtYXNzOiAyLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEsXHJcbiAgICBtYXhTcGVlZDogNSxcclxuICAgIGFjY2VsZXJhdGlvbjogMSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbNDIwLDQzMyw0MzRdLCBmcHM6IDMsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGdvcmlsbGE6IHtcclxuICAgIHR5cGU6ICdnb3JpbGxhJyxcclxuICAgIG1hc3M6IDUsXHJcbiAgICBqdW1waW5nOiAzMDAsXHJcbiAgICBtYXhTcGVlZDogMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzQxMV0sIGZwczogNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdmYWxsJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfVxyXG59O1xyXG5cclxuZm9yKHZhciBjcmVhdHVyZSBpbiBjcmVhdHVyZUNvbmZpZ3Mpe1xyXG4gIC8vY3JlYXR1cmVDb25maWdzW2NyZWF0dXJlXSA9IF8ubWVyZ2Uoe30sIGNvbmZpZ3MuY3JlYXR1cmVEZWZhdWx0cywgY29uZmlnc1tjcmVhdHVyZV0pO1xyXG4gIHZhciBkZWZhdWx0cyA9IGNyZWF0dXJlQ29uZmlnc1snY3JlYXR1cmVEZWZhdWx0cyddO1xyXG4gIGZvcih2YXIgcHJvcCBpbiBkZWZhdWx0cyl7XHJcbiAgICBpZihjcmVhdHVyZUNvbmZpZ3NbY3JlYXR1cmVdW3Byb3BdID09PSB1bmRlZmluZWQpe1xyXG4gICAgICBjcmVhdHVyZUNvbmZpZ3NbY3JlYXR1cmVdW3Byb3BdID0gZGVmYXVsdHNbcHJvcF07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0dXJlQ29uZmlncztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEJhdCBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9iYXQuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgQmVhciBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJlYXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmVhci5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBCdWcgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYnVnLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIERpbm8gZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEaW5vO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Rpbm8uanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgRHJhZ29uZmx5IGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRHJhZ29uZmx5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2RyYWdvbmZseS5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBGcm9nIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRnJvZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9mcm9nLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEdvcmlsbGEgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHb3JpbGxhO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2dvcmlsbGEuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgSW5zZWN0IGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5zZWN0O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2luc2VjdC5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBKZWxseSBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEplbGx5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2plbGx5LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIE5hdGl2ZSBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5hdGl2ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9uYXRpdmUuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgUGFycm90IGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFycm90O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3BhcnJvdC5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBQdGVybyBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFB0ZXJvO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3B0ZXJvLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIFNwaWRlciBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNwaWRlcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9zcGlkZXIuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgVGlnZXIgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUaWdlcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy90aWdlci5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBUdXJ0bGUgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUdXJ0bGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvdHVydGxlLmpzIiwiZnVuY3Rpb24gY3JlYXRlKCl7XHJcblxyXG4gICAgLy8gZnBzIGRlYnVnZ2luZ1xyXG4gICAgdGhpcy5nYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xyXG5cclxuICAgIC8vIENUQSB0ZXh0XHJcbiAgICBjb25zdCB0ZXh0ID0gdGhpcy5nYW1lLmFkZC50ZXh0KFxyXG4gICAgICAgIHRoaXMuZ2FtZS53aWR0aCAvIDIsXHJcbiAgICAgICAgdGhpcy5nYW1lLmhlaWdodCAvIDIsXHJcbiAgICAgICAgXCJDaG9vc2UgYSBsZXZlbCFcXG4xIDIgMyA0IDUgNiBcXG5PciBwcmVzcyBhIGtleSB0byBnZW5lcmF0ZSFcIixcclxuICAgICAgICB7IGZvbnQ6IFwiMjRweCBDb3VyaWVyXCIsIGZpbGw6IFwiI2ZmZmZmZlwiLCBhbGlnbjogXCJjZW50ZXJcIiB9XHJcbiAgICApO1xyXG5cclxuICAgIHRleHQuYW5jaG9yLnNldCgwLjUpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5vbkRvd25DYWxsYmFjayA9IChlKSA9PiB7XHJcbiAgICAgICAgLy8gaWYgcHJlc3NlZCBrZXkgaXMgbnVtYmVyIChzcGFjZSBpcyBlbXB0eSBzdHJpbmcgd2hpY2ggZXZhbHVhdGVzIHRydWUpXHJcbiAgICAgICAgaWYoIWlzTmFOKGUua2V5KSAmJiAvW15cXHNdLy50ZXN0KGUua2V5KSl7XHJcbiAgICAgICAgICAgIGZldGNoKCcvbGV2ZWwvJyArIGUua2V5LCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnXHJcbiAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICB9KS50aGVuKChsZXZlbENvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdQbGF5JywgdHJ1ZSwgdHJ1ZSwgbGV2ZWxDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLm9uRG93bkNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdQbGF5JywgdHJ1ZSwgdHJ1ZSwgdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLm9uRG93bkNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bTWVudV1bQ3JlYXRlXScpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9tZW51L21lbnUuY3JlYXRlLmpzIiwiaW1wb3J0IEh1bWFuIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSHVtYW4nO1xyXG5pbXBvcnQgQUkgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9BSSc7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGUoKXtcclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0NyZWF0ZV0nKTtcclxuICAgIC8vIGZwcyBkZWJ1Z2dpbmdcclxuICAgIHRoaXMuZ2FtZS50aW1lLmFkdmFuY2VkVGltaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBbU0VUIExFVkVMXSBzZXQgZGltZW5zaW9ucywgc3RhcnQgcGh5c2ljIHN5c3RlbVxyXG4gICAgdGhpcy5nYW1lLndvcmxkLnNldEJvdW5kcyhcclxuICAgICAgICAwLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcud2lkdGggKiB0aGlzLmdsb2JhbENvbmZpZy5ibG9ja3MsXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcuaGVpZ2h0XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcblxyXG4gICAgdGhpcy5sZXZlbExvYWRlci5jcmVhdGVCYWNrZ3JvdW5kKCdiYWNrZ3JvdW5kTGF5ZXInKTtcclxuICAgIHRoaXMubGV2ZWxMb2FkZXIuY3JlYXRlVGlsZXMoXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy50aWxlbWFwLFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcudGlsZXNldCxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXRJbWFnZVxyXG4gICAgKTtcclxuICAgIHRoaXMubGV2ZWxMb2FkZXIuY3JlYXRlTGF5ZXJzKHRoaXMubGV2ZWxDb25maWcubGF5ZXJzKTtcclxuXHJcbiAgICAvLyBbU0VUIExFVkVMXSBmaXggYmFja2dyb3VuZCwgcmVzaXplXHJcbiAgICB0aGlzLmxldmVsLmJhY2tncm91bmRMYXllci5maXhlZFRvQ2FtZXJhID0gdGhpcy5sZXZlbENvbmZpZy5maXhlZEJhY2tncm91bmQ7XHJcbiAgICB0aGlzLmxldmVsLmdyb3VuZExheWVyLnJlc2l6ZVdvcmxkKCk7XHJcblxyXG4gICAgdGhpcy5nYW1lU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgIGluaXRpYWxpc2VkOiBmYWxzZSxcclxuICAgICAgICBzY29yZTogMFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSA9IG1vYnguYWN0aW9uKChjaGFuZ2UpID0+IHtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IE9iamVjdC5hc3NpZ24odGhpcy5nYW1lU3RhdGUsIGNoYW5nZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtb2J4Lm9ic2VydmUodGhpcy5nYW1lU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tnYW1lU3RhdGVdIGNoYW5nZScsIGNoYW5nZSwgdGhpcy5nYW1lU3RhdGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7IGluaXRpYWxpc2VkOiB0cnVlIH0pO1xyXG5cclxuICAgIC8vIFtQTEFZRVJdXHJcbiAgICB0aGlzLnBsYXllciA9IG5ldyBIdW1hbihcclxuICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5lbnRyeVBvaW50LngsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5lbnRyeVBvaW50LnksXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcudGV4dHVyZUF0bGFzTmFtZSxcclxuICAgICAgICB0aGlzLmNyZWF0dXJlQ29uZmlnLm1hblxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBbRU5FTUlFU11cclxuICAgIHRoaXMuZW5lbWllcyA9IG5ldyBQaGFzZXIuR3JvdXAodGhpcy5nYW1lKTtcclxuICAgIHRoaXMubGV2ZWxDb25maWcuZW5lbWllcy5mb3JFYWNoKHRoaXMuY3JlYXR1cmVGYWN0b3J5LmNyZWF0ZSk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xyXG5cclxuICAgIC8vIGJpbmQga2V5c1xyXG4gICAgdGhpcy5rZXlzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuICAgIHRoaXMua2V5cy5zcGFjZSA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlNQQUNFQkFSKTtcclxuXHJcbiAgICAvLyBzY29yZSB0ZXh0XHJcbiAgICB0aGlzLm1lbnUgPSB0aGlzLmdhbWUuYWRkLnRleHQoXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcud2lkdGggLSAxMjAsXHJcbiAgICAgICAgMCxcclxuICAgICAgICBcIkxpZmU6IFwiICsgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSxcclxuICAgICAgICB7IGZvbnQ6IFwiMjRweCBDb3VyaWVyXCIsIGZpbGw6IFwiI2ZmZlwiLCBhbGlnbjogXCJjZW50ZXJcIiB9XHJcbiAgICApO1xyXG4gICAgdGhpcy5tZW51LmZpeGVkVG9DYW1lcmEgPSB0cnVlO1xyXG4gICAgbW9ieC5vYnNlcnZlKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgIHRoaXMubWVudS5zZXRUZXh0KFwiTGlmZTogXCIgKyB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmNyZWF0ZS5qcyIsImltcG9ydCBsZXZlbEdlbmVyYXRvciBmcm9tICcuLi8uLi9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9pbmRleCc7XHJcblxyXG5mdW5jdGlvbiBpbml0KGxldmVsQ29uZmlnKXtcclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0luaXRdJywgbGV2ZWxDb25maWcpO1xyXG4gICAgdGhpcy5sZXZlbENvbmZpZyA9IGxldmVsQ29uZmlnIHx8IGxldmVsR2VuZXJhdG9yLmNyZWF0ZSgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5pbml0LmpzIiwiZnVuY3Rpb24gcHJlbG9hZCgpe1xyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bUHJlbG9hZF0nKTtcclxuXHJcbiAgICAvLyBhc3NldHMgdG8gbG9hZCByZWxhdGl2ZSB0byAvYXNzZXRzLy4uXHJcbiAgICB0aGlzLmdhbWUubG9hZC5hdGxhcyhcclxuICAgICAgICAncHJlMmF0bGFzJyxcclxuICAgICAgICAnc3ByaXRlc2hlZXRzL3ByZTJhdGxhcy5wbmcnLFxyXG4gICAgICAgICdzcHJpdGVzaGVldHMvcHJlMmF0bGFzLmpzb24nLFxyXG4gICAgICAgIFBoYXNlci5Mb2FkZXIuVEVYVFVSRV9BVExBU19KU09OX0hBU0hcclxuICAgICk7XHJcblxyXG4gICAgLy8gbG9hZCBiYWNrZ3JvdW5kXHJcbiAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSh0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRLZXksIHRoaXMuZ2xvYmFsQ29uZmlnLmJhY2tncm91bmRQYXRoICsgdGhpcy5sZXZlbENvbmZpZy5iYWNrZ3JvdW5kSW1hZ2UgKyB0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRJbWFnZUV4dGVuc2lvbik7XHJcbiAgICAvLyBsb2FkIHRpbGVzZXRcclxuICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKHRoaXMubGV2ZWxDb25maWcudGlsZXNldCwgdGhpcy5nbG9iYWxDb25maWcudGlsZXNldFBhdGggKyB0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXRJbWFnZSArIHRoaXMubGV2ZWxDb25maWcudGlsZXNldEltYWdlRXh0ZW5zaW9uKTtcclxuICAgIC8vIGxvYWQgdGlsZW1hcFxyXG4gICAgaWYodHlwZW9mIHRoaXMubGV2ZWxDb25maWcudGlsZWRKc29uID09PSAnc3RyaW5nJyl7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQudGlsZW1hcCh0aGlzLmxldmVsQ29uZmlnLnRpbGVtYXAsIHRoaXMuZ2xvYmFsQ29uZmlnLmxldmVsUGF0aCArIHRoaXMubGV2ZWxDb25maWcudGlsZWRKc29uLCBudWxsLCBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQudGlsZW1hcCh0aGlzLmxldmVsQ29uZmlnLnRpbGVtYXAsIG51bGwsIHRoaXMubGV2ZWxDb25maWcudGlsZWRKc29uLCBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmVsb2FkO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnByZWxvYWQuanMiLCJmdW5jdGlvbiB1cGRhdGUoKXtcclxuICAgIC8vY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bVXBkYXRlXScpO1xyXG4gICAgLy8gZnBzXHJcbiAgICB0aGlzLmdhbWUuZGVidWcudGV4dCh0aGlzLmdhbWUudGltZS5mcHMsIDUsIDIwKTtcclxuXHJcbiAgICAvLyBjb2xsaWRlXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5sZXZlbC5jb2xsaXNpb25MYXllcik7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5lbmVtaWVzLCB0aGlzLmxldmVsLmNvbGxpc2lvbkxheWVyKTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLnBsYXllciwgdGhpcy5lbmVtaWVzLCAocGxheWVyLCBlbmVteSkgPT4ge1xyXG4gICAgICAgIGlmKHRoaXMucGxheWVyLmJvZHkudG91Y2hpbmcuZG93biAmJiBlbmVteS5ib2R5LnRvdWNoaW5nLnVwKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhpcy5wbGF5ZXIuaXNIaXR0aW5nICYmICF0aGlzLnBsYXllci5pc1N0dW5uZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBsaWZlOiB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlIC0gMSxcclxuICAgICAgICAgICAgICAgIHN0dW46IHRoaXMuZ2FtZS50aW1lLm5vdyArIDE1MDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmh1cnQoZW5lbXkuYm9keS50b3VjaGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gbW92ZVxyXG4gICAgb25LZXlQcmVzcy5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvbktleVByZXNzKCl7XHJcbiAgICAvLyBzdHVuID0+IGJsb2NrZWRcclxuICAgIGlmKHRoaXMucGxheWVyLmlzU3R1bm5lZCl7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdzdHVuJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1vdmUgbGVmdCAvIHJpZ2h0XHJcbiAgICBpZih0aGlzLmtleXMubGVmdC5pc0Rvd24pe1xyXG4gICAgICAgIHRoaXMucGxheWVyLm1vdmVMZWZ0KCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdtb3ZlJyk7XHJcbiAgICB9IGVsc2UgaWYodGhpcy5rZXlzLnJpZ2h0LmlzRG93bil7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZVJpZ2h0KCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdtb3ZlJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGxheWVyLnN0b3AoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2lkbGUnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBqdW1wXHJcbiAgICBpZih0aGlzLmtleXMudXAuaXNEb3duKXtcclxuICAgICAgICB0aGlzLnBsYXllci5qdW1wKCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdqdW1wJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaGl0XHJcbiAgICBpZih0aGlzLmtleXMuc3BhY2UuaXNEb3duKXtcclxuICAgICAgICBpZih0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5ub2hpdCA8IHRoaXMuZ2FtZS50aW1lLm5vdyAmJiB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5oaXQgPCB0aGlzLmdhbWUudGltZS5ub3cpe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5oaXQoKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdoaXQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVwZGF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS51cGRhdGUuanMiLCJpbXBvcnQgZ2xvYmFsQ29uZmlnIGZyb20gJy4vZ2xvYmFsQ29uZmlnLmpzJztcclxuaW1wb3J0IE1lbnUgZnJvbSAnLi9nYW1lc3RhdGVzL21lbnUvaW5kZXguanMnO1xyXG5pbXBvcnQgUGxheSBmcm9tICcuL2dhbWVzdGF0ZXMvcGxheS9pbmRleC5qcyc7XHJcblxyXG4vLyBpbnN0YW50aWF0ZSBhIFBoYXNlci5HYW1lXHJcbmNvbnN0IFBMQVRGT1JNRVIgPSBuZXcgUGhhc2VyLkdhbWUoXHJcbiAgICBnbG9iYWxDb25maWcud2lkdGgsXHJcbiAgICBnbG9iYWxDb25maWcuaGVpZ2h0LFxyXG4gICAgUGhhc2VyLkFVVE8sXHJcbiAgICBnbG9iYWxDb25maWcuZG9tRWxlbWVudFxyXG4pO1xyXG5cclxuLy8gcmVnaXN0ZXIgZ2FtZXN0YXRlcyAod2lsbCBiZSBpbnN0YW50aWF0ZWQgdy8gdGhpcy5nYW1lIGFzIDFzdCBwYXJhbSwgcGFzcyBnYW1lQ29uZmlnIGFzIDJuZClcclxuUExBVEZPUk1FUi5zdGF0ZS5hZGQoJ01lbnUnLCBNZW51LmJpbmQobnVsbCwgZ2xvYmFsQ29uZmlnKSk7XHJcblBMQVRGT1JNRVIuc3RhdGUuYWRkKCdQbGF5JywgUGxheS5iaW5kKG51bGwsIGdsb2JhbENvbmZpZykpO1xyXG5cclxuUExBVEZPUk1FUi5zdGF0ZS5zdGFydCgnTWVudScsIHRydWUsIHRydWUpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2luZGV4LmpzIiwiaW1wb3J0IGJhdCBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9iYXQuanMnO1xyXG5pbXBvcnQgYmVhciBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9iZWFyLmpzJztcclxuaW1wb3J0IGJ1ZyBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9idWcuanMnO1xyXG5pbXBvcnQgZGlubyBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9kaW5vLmpzJztcclxuaW1wb3J0IGRyYWdvbmZseSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9kcmFnb25mbHkuanMnO1xyXG5pbXBvcnQgZnJvZyBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9mcm9nLmpzJztcclxuaW1wb3J0IGdvcmlsbGEgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvZ29yaWxsYS5qcyc7XHJcbmltcG9ydCBpbnNlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvaW5zZWN0LmpzJztcclxuaW1wb3J0IGplbGx5IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2plbGx5LmpzJztcclxuaW1wb3J0IG5hdGl2ZSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9uYXRpdmUuanMnO1xyXG5pbXBvcnQgcGFycm90IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL3BhcnJvdC5qcyc7XHJcbmltcG9ydCBwdGVybyBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9wdGVyby5qcyc7XHJcbmltcG9ydCBzcGlkZXIgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvc3BpZGVyLmpzJztcclxuaW1wb3J0IHRpZ2VyIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL3RpZ2VyLmpzJztcclxuaW1wb3J0IHR1cnRsZSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy90dXJ0bGUuanMnO1xyXG5cclxuaW1wb3J0IEFJIGZyb20gJy4uL2NvbXBvbmVudHMvQUknO1xyXG5cclxuZnVuY3Rpb24gY3JlYXR1cmVGYWN0b3J5KCkge1xyXG4gICAgY29uc3QgQ3JlYXR1cmUgPSB7XHJcbiAgICAgICAgYmF0OiBiYXQsXHJcbiAgICAgICAgYmVhcjogYmVhcixcclxuICAgICAgICBidWc6IGJ1ZyxcclxuICAgICAgICBkaW5vOiBkaW5vLFxyXG4gICAgICAgIGRyYWdvbmZseTogZHJhZ29uZmx5LFxyXG4gICAgICAgIGZyb2c6IGZyb2csXHJcbiAgICAgICAgZ29yaWxsYTogZ29yaWxsYSxcclxuICAgICAgICBpbnNlY3Q6IGluc2VjdCxcclxuICAgICAgICBqZWxseTogamVsbHksXHJcbiAgICAgICAgbmF0aXZlOiBuYXRpdmUsXHJcbiAgICAgICAgcGFycm90OiBwYXJyb3QsXHJcbiAgICAgICAgcHRlcm86IHB0ZXJvLFxyXG4gICAgICAgIHNwaWRlcjogc3BpZGVyLFxyXG4gICAgICAgIHRpZ2VyOiB0aWdlcixcclxuICAgICAgICB0dXJ0bGU6IHR1cnRsZVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNyZWF0ZTogKGxldmVsQ29uZmlnKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVuZW15ID0gbmV3IEFJKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICAgICAgICAgICAgbGV2ZWxDb25maWcub3JpZ2luLngsXHJcbiAgICAgICAgICAgICAgICBsZXZlbENvbmZpZy5vcmlnaW4ueSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLnRleHR1cmVBdGxhc05hbWUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0dXJlQ29uZmlnW2xldmVsQ29uZmlnLnR5cGVdLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdHVyZUNvbmZpZ1tsZXZlbENvbmZpZy50eXBlXS5iZWhhdmlvdXJzXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGVuZW15LnNldEJvdW5kcyhsZXZlbENvbmZpZy5ib3VuZFRvKTtcclxuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLmFkZChlbmVteSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0dXJlRmFjdG9yeTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9jcmVhdHVyZUZhY3RvcnkuanMiLCJmdW5jdGlvbiBsZXZlbExvYWRlcigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlQmFja2dyb3VuZDogKGxheWVyTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLmJhY2tncm91bmRMYXllciA9IHRoaXMuZ2FtZS5hZGQudGlsZVNwcml0ZShcclxuICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbENvbmZpZy53aWR0aCxcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxDb25maWcuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5iYWNrZ3JvdW5kS2V5XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGVMYXllcjogKGxheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWxbbGF5ZXJdID0gdGhpcy5sZXZlbC50aWxlbWFwLmNyZWF0ZUxheWVyKHRoaXMubGV2ZWxDb25maWdbbGF5ZXJdKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZUxheWVyczogKGxheWVycykgPT4ge1xyXG4gICAgICAgICAgICBmb3IobGV0IGxheWVyIGluIGxheWVycyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsW2xheWVyXSA9IHRoaXMubGV2ZWwudGlsZW1hcC5jcmVhdGVMYXllcih0aGlzLmxldmVsQ29uZmlnLmxheWVyc1tsYXllcl0ua2V5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxbbGF5ZXJdLnZpc2libGUgPSB0aGlzLmxldmVsQ29uZmlnLmxheWVyc1tsYXllcl0udmlzaWJsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlVGlsZXM6ICh0aWxlbWFwS2V5LCB0aWxlc2V0S2V5LCB0aWxlc2V0SW1hZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC50aWxlbWFwID0gdGhpcy5nYW1lLmFkZC50aWxlbWFwKHRpbGVtYXBLZXkpO1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLnRpbGVtYXAuYWRkVGlsZXNldEltYWdlKHRpbGVzZXRJbWFnZSwgdGlsZXNldEtleSk7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDAsIDMwMDAsIHRydWUsIHRoaXMubGV2ZWxDb25maWcubGF5ZXJzLmNvbGxpc2lvbkxheWVyLmtleSk7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDAsIDMwMDAsIHRydWUsIHRoaXMubGV2ZWxDb25maWcubGF5ZXJzLmRlYXRoTGF5ZXIua2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGV2ZWxMb2FkZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxMb2FkZXIuanMiLCJpbXBvcnQgTGV2ZWxCdWlsZGVyIGZyb20gJy4vbGV2ZWxCdWlsZGVyJztcclxuaW1wb3J0IGxldmVsQ29uZmlnIGZyb20gJy4vbW9kZWxzL2xldmVsQ29uZmlnJztcclxuXHJcbmNvbnN0IGxldmVsR2VuZXJhdG9yID0ge1xyXG4gICAgY3JlYXRlKHdpZHRoID0gMTYgKiAzNCAqIDMsIGhlaWdodCA9IDE2ICogMjMsIGVudHJ5UG9pbnQgPSB7IHg6IDIwLCB5OiA1MCB9KXtcclxuICAgICAgICBjb25zdCBsZXZlbEJ1aWxkZXIgPSBuZXcgTGV2ZWxCdWlsZGVyKGxldmVsQ29uZmlnKTtcclxuICAgICAgICByZXR1cm4gbGV2ZWxCdWlsZGVyXHJcbiAgICAgICAgICAgIC5jcmVhdGVMYXllcnMoKVxyXG4gICAgICAgICAgICAuYnVpbGQoKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxldmVsR2VuZXJhdG9yO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL2luZGV4LmpzIiwiaW1wb3J0IHtcclxuICAgIGZsYXR0ZW4sXHJcbiAgICBhcHBseU1hdHJpeCxcclxuICAgIGNyZWF0ZU1hdHJpeCxcclxuICAgIGxheWVyVG9NYXRyaXgsXHJcbiAgICBjaGVja0lmQXJlYUlzQ292ZXJlZCxcclxuICAgIHB1dE1hdHJpeEF0UG9pbnRcclxufSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHtcclxuICAgIGdyb3VuZExheWVyLFxyXG4gICAgY29sbGlzaW9uTGF5ZXIsXHJcbiAgICBkZWF0aExheWVyXHJcbn0gZnJvbSAnLi9tb2RlbHMvbGF5ZXJzJztcclxuXHJcbnZhciBMZXZlbEJ1aWxkZXIgPSBmdW5jdGlvbihhTGV2ZWxDb25maWcpe1xyXG4gICAgbGV0IGxldmVsID0gYUxldmVsQ29uZmlnO1xyXG4gICAgbGV0IGxldmVsTWF0cml4ID0gW107XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNyZWF0ZUxheWVycygpe1xuICAgICAgICAgICAgbGV2ZWwudGlsZWRKc29uLmxheWVycyA9IFtcclxuICAgICAgICAgICAgICAgIGdyb3VuZExheWVyLFxyXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uTGF5ZXIsXHJcbiAgICAgICAgICAgICAgICBkZWF0aExheWVyXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0RGltZW5zaW9ucyh3aWR0aCwgaGVpZ2h0KXtcclxuICAgICAgICAgICAgbGV2ZWwud2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgbGV2ZWwuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ1aWxkKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBsZXZlbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGV2ZWxCdWlsZGVyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL2xldmVsQnVpbGRlci5qcyIsImNvbnN0IGxldmVsTW9kZWwgPSB7XHJcblx0XCJoZWlnaHRcIjogMjMsXHJcblx0XCJsYXllcnNcIjogW3tcclxuXHRcdFx0XCJkYXRhXCI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxOCwgMTksIDE2LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxNSwgNzksIDIzLCA1MiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgNTgsIDkzLCAzOSwgMzQsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDExMiwgMTEzLCAzNCwgODMsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDc3LCAxMTEsIDExMSwgNzgsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDkxLCAxMzAsIDEzMCwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDc3LCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDkyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5NywgOTgsIDc3LCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDkyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuXHRcdFx0XCJoZWlnaHRcIjogMjMsXHJcblx0XHRcdFwibmFtZVwiOiBcImdyb3VuZC1sYXllclwiLFxyXG5cdFx0XHRcIm9wYWNpdHlcIjogMSxcclxuXHRcdFx0XCJ0eXBlXCI6IFwidGlsZWxheWVyXCIsXHJcblx0XHRcdFwidmlzaWJsZVwiOiB0cnVlLFxyXG5cdFx0XHRcIndpZHRoXCI6IDM0LFxyXG5cdFx0XHRcInhcIjogMCxcclxuXHRcdFx0XCJ5XCI6IDBcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdFwiZGF0YVwiOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgNzcsIDExMSwgMTExLCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDEzMCwgMTMwLCA5MiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgNzcsIDc4LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5MSwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDk3LCA5OCwgNzcsIDc4LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5MSwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG5cdFx0XHRcImhlaWdodFwiOiAyMyxcclxuXHRcdFx0XCJuYW1lXCI6IFwiY29sbGlzaW9uLWxheWVyXCIsXHJcblx0XHRcdFwib3BhY2l0eVwiOiAxLFxyXG5cdFx0XHRcInR5cGVcIjogXCJ0aWxlbGF5ZXJcIixcclxuXHRcdFx0XCJ2aXNpYmxlXCI6IGZhbHNlLFxyXG5cdFx0XHRcIndpZHRoXCI6IDM0LFxyXG5cdFx0XHRcInhcIjogMCxcclxuXHRcdFx0XCJ5XCI6IDBcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdFwiZGF0YVwiOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcblx0XHRcdFwiaGVpZ2h0XCI6IDIzLFxyXG5cdFx0XHRcIm5hbWVcIjogXCJkZWF0aC1sYXllclwiLFxyXG5cdFx0XHRcIm9wYWNpdHlcIjogMSxcclxuXHRcdFx0XCJ0eXBlXCI6IFwidGlsZWxheWVyXCIsXHJcblx0XHRcdFwidmlzaWJsZVwiOiBmYWxzZSxcclxuXHRcdFx0XCJ3aWR0aFwiOiAzNCxcclxuXHRcdFx0XCJ4XCI6IDAsXHJcblx0XHRcdFwieVwiOiAwXHJcblx0XHR9XHJcblx0XSxcclxuXHRcIm5leHRvYmplY3RpZFwiOiAxLFxyXG5cdFwib3JpZW50YXRpb25cIjogXCJvcnRob2dvbmFsXCIsXHJcblx0XCJwcm9wZXJ0aWVzXCI6IHtcclxuXHJcblx0fSxcclxuXHRcInJlbmRlcm9yZGVyXCI6IFwicmlnaHQtZG93blwiLFxyXG5cdFwidGlsZWhlaWdodFwiOiAxNixcclxuXHRcInRpbGVzZXRzXCI6IFt7XHJcblx0XHRcImNvbHVtbnNcIjogMTEsXHJcblx0XHRcImZpcnN0Z2lkXCI6IDEsXHJcblx0XHRcImltYWdlXCI6IFwiTDEucG5nXCIsXHJcblx0XHRcImltYWdlaGVpZ2h0XCI6IDM4NCxcclxuXHRcdFwiaW1hZ2V3aWR0aFwiOiAxNzYsXHJcblx0XHRcIm1hcmdpblwiOiAwLFxyXG5cdFx0XCJuYW1lXCI6IFwiTDFcIixcclxuXHRcdFwicHJvcGVydGllc1wiOiB7XHJcblxyXG5cdFx0fSxcclxuXHRcdFwic3BhY2luZ1wiOiAwLFxyXG5cdFx0XCJ0aWxlY291bnRcIjogMjY0LFxyXG5cdFx0XCJ0aWxlaGVpZ2h0XCI6IDE2LFxyXG5cdFx0XCJ0aWxld2lkdGhcIjogMTZcclxuXHR9XSxcclxuXHRcInRpbGV3aWR0aFwiOiAxNixcclxuXHRcInZlcnNpb25cIjogMSxcclxuXHRcIndpZHRoXCI6IDM0XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsZXZlbE1vZGVsO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9sZXZlbC5qcyIsImltcG9ydCBsZXZlbCBmcm9tICcuL2xldmVsJztcclxuXHJcbmNvbnN0IGxldmVsQ29uZmlnID0ge1xyXG5cdFwiaWRcIjogXCJyaXNlLW9mLXRoZS10aWRlXCIsXHJcblx0XCJuYW1lXCI6IFwiUmlzZSBvZiB0aGUgVGlkZVwiLFxyXG5cdFwidGlsZXNldFwiOiBcInRpbGVzZXQtbGV2ZWwtcmlzZS1vZi10aGUtdGlkZVwiLFxyXG5cdFwidGlsZW1hcFwiOiBcInRpbGVtYXAtbGV2ZWwtcmlzZS1vZi10aGUtdGlkZVwiLFxyXG5cdFwidGlsZWRKc29uXCI6IGxldmVsLFxyXG5cdFwidGlsZXNldEltYWdlXCI6IFwiTDFcIixcclxuXHRcInRpbGVzZXRJbWFnZUV4dGVuc2lvblwiOiBcIi5wbmdcIixcclxuXHRcImJhY2tncm91bmRJbWFnZVwiOiBcImJnM3NlYW1sZXNzXCIsXHJcblx0XCJiYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb25cIjogXCIuanBnXCIsXHJcblx0XCJiYWNrZ3JvdW5kS2V5XCI6IFwiYmFja2dyb3VuZC0yXCIsXHJcblx0XCJ3aWR0aFwiOiA1NDQsXHJcblx0XCJoZWlnaHRcIjogMzY4LFxyXG5cdFwibGF5ZXJzXCI6IHtcclxuXHRcdFwiZ3JvdW5kTGF5ZXJcIjoge1xyXG5cdFx0XHRcImtleVwiOiBcImdyb3VuZC1sYXllclwiLFxyXG5cdFx0XHRcInZpc2libGVcIjogdHJ1ZVxyXG5cdFx0fSxcclxuXHRcdFwiY29sbGlzaW9uTGF5ZXJcIjoge1xyXG5cdFx0XHRcImtleVwiOiBcImNvbGxpc2lvbi1sYXllclwiLFxyXG5cdFx0XHRcInZpc2libGVcIjogZmFsc2VcclxuXHRcdH0sXHJcblx0XHRcImRlYXRoTGF5ZXJcIjoge1xyXG5cdFx0XHRcImtleVwiOiBcImRlYXRoLWxheWVyXCIsXHJcblx0XHRcdFwidmlzaWJsZVwiOiBmYWxzZVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0XCJmaXhlZEJhY2tncm91bmRcIjogdHJ1ZSxcclxuXHRcImVudHJ5UG9pbnRcIjoge1xyXG5cdFx0XCJ4XCI6IDQwLFxyXG5cdFx0XCJ5XCI6IDI1MFxyXG5cdH0sXHJcblx0XCJwb3J0YWxzXCI6IFtdLFxyXG5cdFwicGxhdGZvcm1zXCI6IFtdLFxyXG5cdFwiYm9udXNcIjogW10sXHJcblx0XCJlbmVtaWVzXCI6IFtdXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsZXZlbENvbmZpZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9tb2RlbHMvbGV2ZWxDb25maWcuanMiLCJleHBvcnQgY29uc3QgZ3JvdW5kTGF5ZXIgPSB7XHJcbiAgICBcImRhdGFcIjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDE4LCAxOSwgMTYsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDE1LCA3OSwgMjMsIDUyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA1OCwgOTMsIDM5LCAzNCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMTEyLCAxMTMsIDM0LCA4MywgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgNzcsIDExMSwgMTExLCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDEzMCwgMTMwLCA5MiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgNzcsIDc4LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5MSwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDk3LCA5OCwgNzcsIDc4LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5MSwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgXCJoZWlnaHRcIjogMjMsXHJcbiAgICBcIm5hbWVcIjogXCJncm91bmQtbGF5ZXJcIixcclxuICAgIFwib3BhY2l0eVwiOiAxLFxyXG4gICAgXCJ0eXBlXCI6IFwidGlsZWxheWVyXCIsXHJcbiAgICBcInZpc2libGVcIjogdHJ1ZSxcclxuICAgIFwid2lkdGhcIjogMzQsXHJcbiAgICBcInhcIjogMCxcclxuICAgIFwieVwiOiAwXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY29sbGlzaW9uTGF5ZXIgPSB7XHJcbiAgICBcImRhdGFcIjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDc3LCAxMTEsIDExMSwgNzgsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDkxLCAxMzAsIDEzMCwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDc3LCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDkyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5NywgOTgsIDc3LCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDkyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgIFwiaGVpZ2h0XCI6IDIzLFxyXG4gICAgXCJuYW1lXCI6IFwiY29sbGlzaW9uLWxheWVyXCIsXHJcbiAgICBcIm9wYWNpdHlcIjogMSxcclxuICAgIFwidHlwZVwiOiBcInRpbGVsYXllclwiLFxyXG4gICAgXCJ2aXNpYmxlXCI6IGZhbHNlLFxyXG4gICAgXCJ3aWR0aFwiOiAzNCxcclxuICAgIFwieFwiOiAwLFxyXG4gICAgXCJ5XCI6IDBcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWF0aExheWVyID0ge1xyXG4gICAgXCJkYXRhXCI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgIFwiaGVpZ2h0XCI6IDIzLFxyXG4gICAgXCJuYW1lXCI6IFwiZGVhdGgtbGF5ZXJcIixcclxuICAgIFwib3BhY2l0eVwiOiAxLFxyXG4gICAgXCJ0eXBlXCI6IFwidGlsZWxheWVyXCIsXHJcbiAgICBcInZpc2libGVcIjogZmFsc2UsXHJcbiAgICBcIndpZHRoXCI6IDM0LFxyXG4gICAgXCJ4XCI6IDAsXHJcbiAgICBcInlcIjogMFxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9sYXllcnMuanMiLCJcclxuZXhwb3J0IGNvbnN0IGZsYXR0ZW4gPSBtdWx0aWRpbWVuc2lvbmFsID0+IHtcclxuICAgIHJldHVybiBtdWx0aWRpbWVuc2lvbmFsLnJlZHVjZSgocmVzLCByb3cpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzLmNvbmNhdChyb3cpO1xyXG4gICAgfSwgW10pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGFwcGx5TWF0cml4ID0gKGJpZywgc21hbGwsIHgsIHkpID0+IHtcclxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHNtYWxsLmxlbmd0aDsgcm93KyspIHtcclxuICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBzbWFsbFtyb3ddLmxlbmd0aDsgY29sKyspIHtcclxuICAgICAgICAgICAgYmlnW3ggKyBjb2xdW3kgKyByb3ddID0gc21hbGxbcm93XVtjb2xdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBiaWc7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlTWF0cml4ID0gKHJvd3MsIGNvbHMsIHRpbGUpID0+IHtcclxuICAgIGxldCByZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHJvdyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sczsgaisrKSB7XHJcbiAgICAgICAgICAgIHJvdy5wdXNoKHRpbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXMucHVzaChyb3cpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcztcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBsYXllclRvTWF0cml4ID0gbGF5ZXIgPT4ge1xyXG4gICAgcmV0dXJuIGxheWVyLmRhdGEucmVkdWNlKChyZXN1bHQsIHRpbGUsIGkpID0+IHtcclxuICAgICAgICBpZiAoaSAlIGxheWVyLndpZHRoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFt0aWxlXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXS5wdXNoKHRpbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSwgW10pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNoZWNrSWZBcmVhSXNDb3ZlcmVkID0gKG1hdHJpeCwgeCwgeSwgd2lkdGgsIGhlaWdodCkgPT4ge1xyXG4gICAgbGV0IHJlcyA9IDA7XHJcbiAgICBmb3IgKGxldCByb3cgPSB4OyByb3cgPCB4ICsgd2lkdGg7IHJvdysrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgY29sID0geTsgY29sIDwgeSArIGhlaWdodDsgY29sKyspIHtcclxuICAgICAgICAgICAgcmVzICs9IG1hdHJpeFtyb3ddW2NvbF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcyA9PT0gMDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwdXRNYXRyaXhBdFBvaW50ID0gKGJpZywgc21hbGwsIHBvaW50cykgPT4ge1xyXG4gICAgcG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICAgIGFwcGx5TWF0cml4KGJpZywgc21hbGwsIHBvaW50WzBdLCBwb2ludFsxXSlcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGJpZztcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci91dGlscy5qcyJdLCJzb3VyY2VSb290IjoiIn0=