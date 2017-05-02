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

var _levelLoader = __webpack_require__(37);

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

    // ------! FPS killer: performance drop on scaling up more than 1.6x
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.scale.setMinMax(0, 0, this.globalConfig.width * 1.6, this.globalConfig.height * 1.6);
    // ------!

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

var _levelConfig = __webpack_require__(35);

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

var _utils = __webpack_require__(36);

var _layers = __webpack_require__(33);

var _islands = __webpack_require__(32);

var _backgrounds = __webpack_require__(31);

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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var column = exports.column = [[0, 0, 0, 0, 0, 0, 0], [0, 97, 98, 99, 100, 105, 0], [0, 0, 122, 127, 121, 0, 0], [0, 0, 37, 57, 31, 0, 0], [0, 0, 37, 57, 121, 0, 0], [0, 0, 58, 67, 31, 0, 0], [0, 84, 85, 136, 121, 0, 0], [0, 0, 58, 67, 31, 0, 0], [0, 0, 2, 57, 52, 0, 0], [0, 0, 21, 67, 34, 0, 0], [0, 0, 37, 57, 121, 0, 0], [0, 0, 2684354681, 2684354591, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];

var snowball = exports.snowball = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 19, 20, 17, 63, 16, 18, 19, 20, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 17, 63, 34, 13, 35, 67, 32, 33, 34, 13, 35, 45, 46, 31, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 30, 4, 80, 12, 53, 65, 66, 4, 80, 56, 57, 11, 110, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 17, 110, 79, 22, 23, 44, 45, 46, 79, 22, 23, 44, 45, 128, 112, 113, 107, 20, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 2, 57, 11, 38, 39, 55, 114, 12, 53, 38, 39, 29, 49, 50, 51, 59, 51, 131, 96, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 15, 79, 67, 32, 33, 34, 13, 35, 46, 79, 107, 108, 112, 76, 61, 62, 60, 76, 61, 131, 14, 0, 0, 0, 0], [0, 0, 0, 0, 0, 58, 11, 12, 53, 65, 66, 4, 93, 89, 90, 29, 56, 129, 59, 59, 49, 73, 47, 88, 141, 34, 0, 0, 0, 0], [0, 0, 0, 0, 15, 67, 32, 46, 79, 22, 23, 44, 113, 107, 108, 109, 128, 112, 133, 60, 76, 61, 62, 167, 100, 104, 229, 0, 0, 0], [0, 0, 0, 20, 90, 29, 79, 129, 93, 89, 90, 29, 29, 48, 49, 50, 51, 131, 59, 62, 73, 47, 24, 180, 125, 126, 121, 0, 0, 0], [0, 0, 0, 2, 108, 109, 128, 112, 113, 107, 108, 109, 133, 60, 76, 61, 62, 132, 133, 62, 167, 100, 197, 34, 45, 46, 31, 0, 0, 0], [0, 0, 0, 21, 49, 50, 51, 131, 59, 48, 49, 50, 51, 76, 133, 62, 132, 73, 47, 24, 124, 124, 127, 4, 114, 57, 121, 0, 0, 0], [0, 0, 0, 37, 76, 132, 137, 138, 133, 60, 76, 139, 178, 132, 137, 138, 132, 167, 100, 197, 32, 33, 34, 44, 35, 67, 31, 0, 0, 0], [0, 0, 0, 58, 184, 73, 184, 73, 138, 195, 184, 193, 194, 73, 184, 73, 88, 180, 124, 127, 11, 3221225494, 3221225551, 3221225518, 3221225504, 3221225539, 3221225487, 0, 0, 0], [0, 97, 98, 99, 100, 104, 100, 104, 100, 104, 100, 204, 205, 104, 100, 104, 197, 13, 35, 67, 32, 3221225537, 3221225525, 3221225484, 3221225483, 3221225530, 0, 0, 0, 0], [0, 0, 122, 125, 124, 127, 125, 126, 123, 206, 124, 207, 208, 126, 123, 206, 124, 4, 80, 12, 53, 3221225505, 3221225504, 3221225539, 3221225551, 3221225487, 0, 0, 0, 0], [0, 0, 3221225492, 3221225579, 3221225585, 3221225584, 3221225600, 3221225517, 3221225516, 3221225495, 3221225494, 3221225551, 3221225518, 3221225517, 3221225516, 3221225495, 3221225494, 3221225551, 45, 46, 79, 3221225510, 3221225483, 3221225529, 3221225474, 0, 0, 0, 0, 0], [0, 0, 0, 3221225582, 3221225483, 3221225529, 3221225528, 3221225552, 3221225476, 3221225538, 3221225537, 3221225525, 3221225484, 3221225552, 3221225476, 3221225502, 3221225475, 3221225474, 3221225524, 3221225495, 3221225494, 3221225485, 3221225506, 3221225582, 3221225489, 0, 0, 0, 0, 0], [0, 0, 0, 0, 3221225503, 3221225518, 3221225517, 3221225507, 3221225485, 3221225506, 3221225505, 3221225504, 3221225532, 3221225580, 3221225579, 3221225585, 3221225584, 3221225600, 3221225581, 3221225551, 3221225617, 3221225491, 3221225490, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3221225490, 3221225489, 3221225492, 3221225491, 3221225490, 3221225488, 3221225535, 3221225489, 3221225568, 3221225510, 3221225502, 3221225475, 3221225538, 3221225537, 3221225474, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3221225486, 3221225580, 3221225579, 3221225506, 3221225582, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3221225489, 3221225488, 3221225490, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

/***/ }),
/* 33 */
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
/* 34 */
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _level = __webpack_require__(34);

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
/* 37 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWNlMjU3NTM0ZDkxMTRhOWIxYjAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL21lbnUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmF0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmVhci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Rpbm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9kcmFnb25mbHkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9mcm9nLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZ29yaWxsYS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2luc2VjdC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2plbGx5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvbmF0aXZlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcGFycm90LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcHRlcm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9zcGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy90aWdlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvbWVudS9tZW51LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmluaXQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5wcmVsb2FkLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkudXBkYXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9jcmVhdHVyZUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL2xldmVsQnVpbGRlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9iYWNrZ3JvdW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9pc2xhbmRzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL2xheWVycy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9sZXZlbC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9sZXZlbENvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL3V0aWxzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxMb2FkZXIuanMiXSwibmFtZXMiOlsiQUkiLCJnYW1lIiwieCIsInkiLCJzcHJpdGUiLCJwcm9wcyIsImJlaGF2aW91cnMiLCJpZCIsInR5cGUiLCJzcHJpdGVTdGF0ZSIsIm1vYngiLCJvYnNlcnZhYmxlIiwibGlmZSIsInN0dW4iLCJoaXQiLCJub2hpdCIsImJvZHkiLCJibG9ja2VkIiwibGVmdCIsInJpZ2h0Iiwic2NhbGUiLCJib3VuZFRvIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImhhc093blByb3BlcnR5IiwiUGhhc2VyIiwiUG9pbnQiLCJSZWN0YW5nbGUiLCJ4MSIsIngyIiwiaGVpZ2h0IiwieTEiLCJ5MiIsImNvbnRhaW5zUG9pbnQiLCJnZXRCb3VuZHMiLCJmYWNpbmdSaWdodCIsInR1cm4iLCJmYWNpbmdMZWZ0Iiwid2lkdGgiLCJwYXJhbXMiLCJNYXRoIiwicmFuZG9tIiwicHJvYmFiaWxpdHkiLCJhY3Rpb24iLCJjYWxsIiwiZm9yRWFjaCIsImJlaGF2aW91ciIsIkV4dGVuZGVkU3ByaXRlIiwiYW5pbWF0aW9ucyIsImFkZCIsImV4aXN0aW5nIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoeXNpY3MiLCJBUkNBREUiLCJhbmNob3IiLCJzZXRUbyIsImNvbGxpZGVXb3JsZEJvdW5kcyIsImNoZWNrV29ybGRCb3VuZHMiLCJvdXRPZkJvdW5kc0tpbGwiLCJncmF2aXR5IiwiX2RlYnVnVGV4dCIsImFkZENoaWxkIiwidGV4dCIsImZvbnQiLCJmaWxsIiwidmlzaWJsZSIsImFuaW1hdGlvbiIsIm5hbWUiLCJmcmFtZXMiLCJtYXAiLCJmcmFtZSIsInRvU3RyaW5nIiwiZnBzIiwibG9vcCIsImdhbWVTdGF0ZSIsInN0YXRlIiwic3RhdGVzIiwiY3VycmVudCIsIm9ic2VydmUiLCJjaGFuZ2UiLCJjb25zb2xlIiwibG9nIiwidXBkYXRlU3RhdGUiLCJhc3NpZ24iLCJ2ZWxvY2l0eSIsIm1heFNwZWVkIiwiYWNjZWxlcmF0aW9uIiwicGxheSIsIm1vdmVSaWdodCIsIm1vdmVMZWZ0IiwidG91Y2hpbmciLCJkb3duIiwiaGl0VW50aWwiLCJ0aW1lIiwibm93IiwiYnJlYWtVbnRpbCIsImRpcmVjdGlvbiIsInNldFRleHQiLCJTcHJpdGUiLCJIdW1hbiIsIk1lbnUiLCJ1bmRlZmluZWQiLCJwcm90b3R5cGUiLCJjcmVhdGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiUGxheSIsImdsb2JhbENvbmZpZyIsInBsYXllciIsImVuZW15IiwibGV2ZWwiLCJiYWNrZ3JvdW5kTGF5ZXIiLCJncm91bmRMYXllciIsInRpbGVtYXAiLCJjcmVhdHVyZUNvbmZpZyIsImxldmVsTG9hZGVyIiwiY3JlYXR1cmVGYWN0b3J5IiwiaW5pdCIsInByZWxvYWQiLCJ1cGRhdGUiLCJibG9ja3MiLCJkb21FbGVtZW50IiwiYmFja2dyb3VuZFBhdGgiLCJ0aWxlc2V0UGF0aCIsImxldmVsUGF0aCIsInRleHR1cmVBdGxhc1BhdGgiLCJ0ZXh0dXJlQXRsYXNOYW1lIiwidGV4dHVyZUF0bGFzSW1hZ2UiLCJ0ZXh0dXJlQXRsYXNKc29uIiwiY3JlYXR1cmVDb25maWdzIiwiY3JlYXR1cmVEZWZhdWx0cyIsImFjdGl2ZSIsImJvdW5jZSIsIm1hc3MiLCJqdW1waW5nIiwiY29sbGlkZSIsImxpdmVzIiwibGlmZXNwYW4iLCJJbmZpbml0eSIsInNlbnNlIiwidGltZU9mIiwibWFuIiwiZGlubyIsImJlYXIiLCJpbWFnZSIsInRpZ2VyIiwicHRlcm8iLCJkcmFnb25mbHkiLCJiYXQiLCJzcGlkZXIiLCJuYXRpdmUiLCJwYXJyb3QiLCJpbnNlY3QiLCJidWciLCJmcm9nIiwidHVydGxlIiwiamVsbHkiLCJnb3JpbGxhIiwiY3JlYXR1cmUiLCJkZWZhdWx0cyIsInByb3AiLCJCYXQiLCJCZWFyIiwiQnVnIiwiRGlubyIsIkRyYWdvbmZseSIsIkZyb2ciLCJHb3JpbGxhIiwiSW5zZWN0IiwiSmVsbHkiLCJOYXRpdmUiLCJQYXJyb3QiLCJQdGVybyIsIlNwaWRlciIsIlRpZ2VyIiwiVHVydGxlIiwiYWR2YW5jZWRUaW1pbmciLCJhbGlnbiIsInNldCIsImlucHV0Iiwia2V5Ym9hcmQiLCJvbkRvd25DYWxsYmFjayIsImUiLCJpc05hTiIsImtleSIsInRlc3QiLCJmZXRjaCIsIm1ldGhvZCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJsZXZlbENvbmZpZyIsInN0YXJ0Iiwid29ybGQiLCJzZXRCb3VuZHMiLCJzdGFydFN5c3RlbSIsImNyZWF0ZUJhY2tncm91bmQiLCJjcmVhdGVUaWxlcyIsInRpbGVzZXQiLCJ0aWxlc2V0SW1hZ2UiLCJjcmVhdGVMYXllcnMiLCJsYXllcnMiLCJmaXhlZFRvQ2FtZXJhIiwiZml4ZWRCYWNrZ3JvdW5kIiwicmVzaXplV29ybGQiLCJpbml0aWFsaXNlZCIsInNjb3JlIiwiZW50cnlQb2ludCIsImVuZW1pZXMiLCJHcm91cCIsImNhbWVyYSIsImZvbGxvdyIsImNyZWF0ZUN1cnNvcktleXMiLCJzcGFjZSIsImFkZEtleSIsIktleWJvYXJkIiwiU1BBQ0VCQVIiLCJtZW51Iiwic2NhbGVNb2RlIiwiU2NhbGVNYW5hZ2VyIiwiU0hPV19BTEwiLCJwYWdlQWxpZ25Ib3Jpem9udGFsbHkiLCJwYWdlQWxpZ25WZXJ0aWNhbGx5Iiwic2V0TWluTWF4IiwibG9hZCIsImF0bGFzIiwiTG9hZGVyIiwiVEVYVFVSRV9BVExBU19KU09OX0hBU0giLCJiYWNrZ3JvdW5kS2V5IiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uIiwidGlsZXNldEltYWdlRXh0ZW5zaW9uIiwidGlsZWRKc29uIiwiVGlsZW1hcCIsIlRJTEVEX0pTT04iLCJkZWJ1ZyIsImFyY2FkZSIsImNvbGxpc2lvbkxheWVyIiwiZGVhdGhMYXllciIsIm92ZXJsYXAiLCJ1cCIsImlzSGl0dGluZyIsImlzU3R1bm5lZCIsImh1cnQiLCJvbktleVByZXNzIiwiaXNEb3duIiwic3RvcCIsImp1bXAiLCJQTEFURk9STUVSIiwiR2FtZSIsIkFVVE8iLCJiaW5kIiwiQ3JlYXR1cmUiLCJvcmlnaW4iLCJsZXZlbEdlbmVyYXRvciIsImxldmVsQnVpbGRlciIsInJhbmRvbUJhY2tncm91bmQiLCJidWlsZCIsImVuZW15VHlwZXMiLCJmaW5kUGxhY2VzRm9yIiwiYU1hdHJpeCIsIml0ZW1zIiwicmV0cnkiLCJtYXRyaXgiLCJzbGljZSIsIml0ZW0iLCJmbG9vciIsInB1c2giLCJpc2xhbmRzIiwiY3JlYXRlRW5lbXlBdCIsInhUaWxlIiwieVRpbGUiLCJ0aWxlc1dpZHRoIiwiZ2V0Q29sbGlzaW9uTGF5ZXIiLCJmbGF0TWF0cml4IiwiY29sbGlzaW9uVGlsZXMiLCJ0aWxlIiwiaW5kZXhPZiIsIkxldmVsQnVpbGRlciIsInRpbGVzSGVpZ2h0IiwiZGVuc2l0eSIsInBsYWNlc0ZvciIsImFwcGx5IiwiZGF0YSIsImJhY2tncm91bmRzIiwiY29sdW1uIiwic25vd2JhbGwiLCJsZXZlbE1vZGVsIiwiZmxhdHRlbiIsIm11bHRpZGltZW5zaW9uYWwiLCJyZWR1Y2UiLCJyZXMiLCJyb3ciLCJjb25jYXQiLCJhcHBseU1hdHJpeCIsImJpZyIsInNtYWxsIiwiY29sIiwiY3JlYXRlTWF0cml4Iiwicm93cyIsImNvbHMiLCJpIiwiaiIsImxheWVyVG9NYXRyaXgiLCJsYXllciIsInJlc3VsdCIsImNoZWNrSWZBcmVhSXNDb3ZlcmVkIiwiZmlsdGVyQ29sbGlzaW9uVGlsZXMiLCJmbGF0bWF0cml4IiwiZmlsdGVyIiwidW5pcXVlcyIsInNvcnQiLCJhIiwiYiIsImxheWVyTmFtZSIsInRpbGVTcHJpdGUiLCJjcmVhdGVMYXllciIsInRpbGVtYXBLZXkiLCJ0aWxlc2V0S2V5IiwiYWRkVGlsZXNldEltYWdlIiwic2V0Q29sbGlzaW9uQmV0d2VlbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRUE7Ozs7Ozs7Ozs7OztJQUVNQSxFOzs7QUFDRixnQkFBWUMsSUFBWixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCQyxNQUF4QixFQUFnQ0MsS0FBaEMsRUFBdUNDLFVBQXZDLEVBQWtEO0FBQUE7O0FBQUEsNEdBQ3hDTCxJQUR3QyxFQUNsQ0MsQ0FEa0MsRUFDL0JDLENBRCtCLEVBQzVCQyxNQUQ0QixFQUNwQkMsS0FEb0I7O0FBRzlDLGNBQUtFLEVBQUwsR0FBYUYsTUFBTUcsSUFBbkIsU0FBMkJOLENBQTNCLFNBQWdDQyxDQUFoQzs7QUFFQSxjQUFLRyxVQUFMLEdBQWtCQSxVQUFsQjs7QUFFQSxjQUFLRyxXQUFMLEdBQW1C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QWtJLENBQWxJLEVBQXFJLENBQXJJLEVBQXdJLENBQXhJLEVBQTJJLENBQTNJLEVBQThJLENBQTlJLEVBQWlKLENBQWpKLEVBQW9KLENBQXBKLEVBQXVKLENBQXZKLEVBQTBKLENBQTFKLEVBQTZKLENBQTdKLEVBQWdLLENBQWhLLEVBQW1LLENBQW5LLEVBQXNLLENBQXRLLEVBQXlLLENBQXpLLEVBQTRLLENBQTVLLEVBQStLLENBQS9LLEVBQWtMLENBQWxMLEVBQXFMLENBQXJMLEVBQXdMLENBQXhMLEVBQTJMLENBQTNMLEVBQThMLENBQTlMLEVBQWlNLENBQWpNLEVBQW9NLENBQXBNLEVBQXVNLENBQXZNLEVBQTBNLENBQTFNLEVBQTZNLENBQTdNLEVBQWdOLENBQWhOLEVBQW1OLENBQW5OLEVBQXNOLENBQXROLEVBQXlOLENBQXpOLEVBQTROLENBQTVOLEVBQStOLENBQS9OLEVBQWtPLENBQWxPLEVBQXFPLENBQXJPLEVBQXdPLENBQXhPLEVBQTJPLENBQTNPLEVBQThPLENBQTlPLEVBQWlQLENBQWpQLEVBQW9QLENBQXBQLEVBQXVQLENBQXZQLEVBQTBQLENBQTFQLEVBQTZQLENBQTdQLEVBQWdRLENBQWhRLEVBQW1RLENBQW5RLEVBQXNRLENBQXRRLEVBQXlRLENBQXpRLEVBQTRRLENBQTVRLEVBQStRLENBQS9RLEVBQWtSLENBQWxSLEVBQXFSLENBQXJSLEVBQXdSLENBQXhSLEVBQTJSLENBQTNSLEVBQThSLENBQTlSLEVBQWlTLENBQWpTLEVBQW9TLENBQXBTLEVBQXVTLENBQXZTLEVBQTBTLENBQTFTLEVBQTZTLENBQTdTLEVBQWdULENBQWhULEVBQW1ULENBQW5ULEVBQXNULENBQXRULEVBQXlULENBQXpULEVBQTRULENBQTVULEVBQStULENBQS9ULEVBQWtVLENBQWxVLEVBQXFVLENBQXJVLEVBQXdVLENBQXhVLEVBQTJVLENBQTNVLEVBQThVLENBQTlVLEVBQWlWLENBQWpWLEVBQW9WLENBQXBWLEVBQXVWLENBQXZWLEVBQTBWLENBQTFWLEVBQTZWLENBQTdWLEVBQWdXLENBQWhXLEVB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SSxFQUEySSxDQUEzSSxFQUE4SSxDQUE5SSxFQUFpSixDQUFqSixFQUFvSixDQUFwSixFQUF1SixDQUF2SixFQUEwSixDQUExSixFQUE2SixDQUE3SixFQUFnSyxDQUFoSyxFQUFtSyxDQUFuSyxFQUFzSyxDQUF0SyxFQUF5SyxDQUF6SyxFQUE0SyxDQUE1SyxFQUErSyxDQUEvSyxFQUFrTCxDQUFsTCxFQUFxTCxDQUFyTCxFQUF3TCxDQUF4TCxFQUEyTCxDQUEzTCxFQUE4TCxDQUE5TCxFQUFpTSxDQUFqTSxFQUFvTSxDQUFwTSxFQUF1TSxDQUF2TSxFQUEwTSxDQUExTSxFQUE2TSxDQUE3TSxFQUFnTixDQUFoTixFQUFtTixDQUFuTixFQUFzTixDQUF0TixFQUF5TixDQUF6TixFQUE0TixDQUE1TixFQUErTixDQUEvTixFQUFrTyxDQUFsTyxFQUFxTyxDQUFyTyxFQUF3TyxDQUF4TyxFQUEyTyxDQUEzTyxFQUE4TyxDQUE5TyxFQUFpUCxDQUFqUCxFQUFvUCxDQUFwUCxFQUF1UCxDQUF2UCxFQUEwUCxDQUExUCxFQUE2UCxDQUE3UCxFQUFnUSxDQUFoUSxFQUFtUSxDQUFuUSxFQUFzUSxDQUF0USxFQUF5USxDQUF6USxFQUE0USxDQUE1USxFQUErUSxDQUEvUSxFQUFrUixDQUFsUixFQUFxUixDQUFyUixFQUF3UixDQUF4UixFQUEyUixDQUEzUixFQUE4UixDQUE5UixFQUFpUyxDQUFqUyxFQUFvUyxDQUFwUyxFQUF1UyxDQUF2UyxFQUEwUyxDQUExUyxFQUE2UyxDQUE3UyxFQUFnVCxDQUFoVCxFQUFtVCxDQUFuVCxFQUFzVCxDQUF0VCxFQUF5VCxDQUF6VCxFQUE0VCxDQUE1VCxFQUErVCxDQUEvVCxFQUFrVSxDQUFsVSxFQUFxVSxDQUFyVSxFQUF3VSxDQUF4VSxFQUEyVSxDQUEzVSxFQUE4VSxDQUE5VSxFQUFpVixDQUFqVixFQUFvVixDQUFwVixFQUF1VixDQUF2VixFQUEwVixDQUExVixFQUE2VixDQUE3VixFQUFnVyxDQUFoVyxFQUFtVyxDQUFuVyxFQUFzVyxDQUF0VyxFQUF5VyxDQUF6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QWlKLENBQWpKLEVBQW9KLENBQXBKLEVBQXVKLENBQXZKLEVBQTBKLENBQTFKLEVBQTZKLENBQTdKLEVBQWdLLENBQWhLLEVBQW1LLENBQW5LLEVBQXNLLENBQXRLLEVBQXlLLENBQXpLLEVBQTRLLENBQTVLLEVBQStLLENBQS9LLEVBQWtMLENBQWxMLEVBQXFMLENBQXJMLEVBQXdMLENBQXhMLEVBQTJMLENBQTNMLEVBQThMLENBQTlMLEVBQWlNLENBQWpNLEVBQW9NLENBQXBNLEVBQXVNLENBQXZNLEVBQTBNLENBQTFNLEVBQTZNLENBQTdNLEVBQWdOLENBQWhOLEVBQW1OLENBQW5OLEVBQXNOLENBQXROLEVBQXlOLENBQXpOLEVBQTROLENBQTVOLEVBQStOLENBQS9OLEVBQWtPLENBQWxPLEVBQXFPLENBQXJPLEVBQXdPLENBQXhPLEVBQTJPLENBQTNPLEVBQThPLENBQTlPLEVBQWlQLENBQWpQLEVBQW9QLENBQXBQLEVBQXVQLENBQXZQLEVBQTBQLENBQTFQLEVBQTZQLENBQTdQLEVBQWdRLENBQWhRLEVBQW1RLENBQW5RLEVBQXNRLENBQXRRLEVBQXlRLENBQXpRLEVBQTRRLENBQTVRLEVBQStRLENBQS9RLEVBQWtSLENBQWxSLEVBQXFSLENBQXJSLEVBQXdSLENBQXhSLEVBQTJSLENBQTNSLEVBQThSLENBQTlSLEVBQWlTLENBQWpTLEVBQW9TLENBQXBTLEVBQXVTLENBQXZTLEVBQTBTLENBQTFTLEVBQTZTLENBQTdTLEVBQWdULENBQWhULEVBQW1ULENBQW5ULEVBQXNULENBQXRULEVBQXlULENBQXpULEVBQTRULENBQTVULEVBQStULENBQS9ULEVBQWtVLENBQWxVLEVBQXFVLENBQXJVLEVBQXdVLENBQXhVLEVBQTJVLENBQTNVLEVBQThVLENBQTlVLEVBQWlWLENBQWpWLEVBQW9WLENBQXBWLEVBQXVWLENBQXZWLEVBQTBWLENBQTFWLEVBQTZWLENBQTdWLEVBQWdXLENBQWhXLEVBQW1XLENBQW5XLEVBQXNXLENBQXRXLEVBQXlXLENBQXpXLEVBQTRXLENBQTVXLEVBQStXLENBQS9XLEVB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SSxDQUE5SSxFQUFpSixDQUFqSixFQUFvSixDQUFwSixFQUF1SixDQUF2SixFQUEwSixDQUExSixFQUE2SixDQUE3SixFQUFnSyxDQUFoSyxFQUFtSyxDQUFuSyxFQUFzSyxDQUF0SyxFQUF5SyxDQUF6SyxFQUE0SyxDQUE1SyxFQUErSyxDQUEvSyxFQUFrTCxDQUFsTCxFQUFxTCxDQUFyTCxFQUF3TCxDQUF4TCxFQUEyTCxDQUEzTCxFQUE4TCxDQUE5TCxFQUFpTSxDQUFqTSxFQUFvTSxDQUFwTSxFQUF1TSxDQUF2TSxFQUEwTSxDQUExTSxFQUE2TSxDQUE3TSxFQUFnTixDQUFoTixFQUFtTixDQUFuTixFQUFzTixDQUF0TixFQUF5TixDQUF6TixFQUE0TixDQUE1TixFQUErTixDQUEvTixFQUFrTyxDQUFsTyxFQUFxTyxDQUFyTyxFQUF3TyxDQUF4TyxFQUEyTyxDQUEzTyxFQUE4TyxDQUE5TyxFQUFpUCxDQUFqUCxFQUFvUCxDQUFwUCxFQUF1UCxDQUF2UCxFQUEwUCxDQUExUCxFQUE2UCxDQUE3UCxFQUFnUSxDQUFoUSxFQUFtUSxDQUFuUSxFQUFzUSxDQUF0USxFQUF5USxDQUF6USxFQUE0USxDQUE1USxFQUErUSxDQUEvUSxFQUFrUixDQUFsUixFQUFxUixDQUFyUixFQUF3UixDQUF4UixFQUEyUixDQUEzUixFQUE4UixDQUE5UixFQUFpUyxDQUFqUyxFQUFvUyxDQUFwUyxFQUF1UyxDQUF2UyxFQUEwUyxDQUExUyxFQUE2UyxDQUE3UyxFQUFnVCxDQUFoVCxFQUFtVCxDQUFuVCxFQUFzVCxDQUF0VCxFQUF5VCxDQUF6VCxFQUE0VCxDQUE1VCxFQUErVCxDQUEvVCxFQUFrVSxDQUFsVSxFQUFxVSxDQUFyVSxFQUF3VSxDQUF4VSxFQUEyVSxDQUEzVSxFQUE4VSxDQUE5VSxFQUFpVixDQUFqVixFQUFvVixDQUFwVixFQUF1VixDQUF2VixFQUEwVixDQUExVixFQUE2VixDQUE3VixFQUFnVyxDQUFoVyxFQUFtVyxDQUFuVyxFQUFzVyxDQUF0VyxFQUF5VyxDQUF6VyxFQUE0VyxDQUE1VyxFQUEr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NkosQ0FBN0osRUFBZ0ssQ0FBaEssRUFBbUssQ0FBbkssRUFBc0ssQ0FBdEssRUFBeUssQ0FBekssRUFBNEssQ0FBNUssRUFBK0ssQ0FBL0ssRUFBa0wsQ0FBbEwsRUFBcUwsQ0FBckwsRUFBd0wsQ0FBeEwsRUFBMkwsQ0FBM0wsRUFBOEwsQ0FBOUwsRUFBaU0sQ0FBak0sRUFBb00sQ0FBcE0sRUFBdU0sQ0FBdk0sRUFBME0sQ0FBMU0sRUFBNk0sQ0FBN00sRUFBZ04sQ0FBaE4sRUFBbU4sQ0FBbk4sRUFBc04sQ0FBdE4sRUFBeU4sQ0FBek4sRUFBNE4sQ0FBNU4sRUFBK04sQ0FBL04sRUFBa08sQ0FBbE8sRUFBcU8sQ0FBck8sRUFBd08sQ0FBeE8sRUFBMk8sQ0FBM08sRUFBOE8sQ0FBOU8sRUFBaVAsQ0FBalAsRUFBb1AsQ0FBcFAsRUFBdVAsQ0FBdlAsRUFBMFAsQ0FBMVAsRUFBNlAsQ0FBN1AsRUFBZ1EsQ0FBaFEsRUFBbVEsQ0FBblEsRUFBc1EsQ0FBdFEsRUFBeVEsQ0FBelEsRUFBNFEsQ0FBNVEsRUFBK1EsQ0FBL1EsRUFBa1IsQ0FBbFIsRUFBcVIsQ0FBclIsRUFBd1IsQ0FBeFIsRUFBMlIsQ0FBM1IsRUFBOFIsQ0FBOVIsRUFBaVMsQ0FBalMsRUFBb1MsQ0FBcFMsRUFBdVMsQ0FBdlMsRUFBMFMsQ0FBMVMsRUFBNlMsQ0FBN1MsRUFBZ1QsQ0FBaFQsRUFBbVQsQ0FBblQsRUFBc1QsQ0FBdFQsRUFBeVQsQ0FBelQsRUFBNFQsQ0FBNVQsRUFBK1QsQ0FBL1QsRUFBa1UsQ0FBbFUsRUFBcVUsQ0FBclUsRUFBd1UsQ0FBeFUsRUFBMlUsQ0FBM1UsRUFBOFUsQ0FBOVUsRUFBaVYsQ0FBalYsRUFBb1YsQ0FBcFYsRUFBdVYsQ0FBdlYsRUFBMFYsQ0FBMVYsRUFBNlYsQ0FBN1YsRUFBZ1csQ0FBaFcsRUFBbVcsQ0FBblcsRUFBc1csQ0FBdFcsRUFBeVcsQ0FBelcsRUFBNFcsQ0FBNVcsRUFBK1csQ0FBL1csRUFBa1gsQ0FBbFgsRUFBcVgsQ0FBclgsRUFBd1gsQ0FBeFgsRUFBMlgsQ0FBM1gsRUFB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RUFBNEssQ0FBNUssRUFBK0ssQ0FBL0ssRUFBa0wsQ0FBbEwsRUFBcUwsQ0FBckwsRUFBd0wsQ0FBeEwsRUFBMkwsQ0FBM0wsRUFBOEwsQ0FBOUwsRUFBaU0sQ0FBak0sRUFBb00sQ0FBcE0sRUFBdU0sQ0FBdk0sRUFBME0sQ0FBMU0sRUFBNk0sQ0FBN00sRUFBZ04sQ0FBaE4sRUFBbU4sQ0FBbk4sRUFBc04sQ0FBdE4sRUFBeU4sQ0FBek4sRUFBNE4sQ0FBNU4sRUFBK04sQ0FBL04sRUFBa08sQ0FBbE8sRUFBcU8sQ0FBck8sRUFBd08sQ0FBeE8sRUFBMk8sQ0FBM08sRUFBOE8sQ0FBOU8sRUFBaVAsQ0FBalAsRUFBb1AsQ0FBcFAsRUFBdVAsQ0FBdlAsRUFBMFAsQ0FBMVAsRUFBNlAsQ0FBN1AsRUFBZ1EsQ0FBaFEsRUFBbVEsQ0FBblEsRUFBc1EsQ0FBdFEsRUFBeVEsQ0FBelEsRUFBNFEsQ0FBNVEsRUFBK1EsQ0FBL1EsRUFBa1IsQ0FBbFIsRUFBcVIsQ0FBclIsRUFBd1IsQ0FBeFIsRUFBMlIsQ0FBM1IsRUFBOFIsQ0FBOVIsRUFBaVMsQ0FBalMsRUFBb1MsQ0FBcFMsRUFBdVMsQ0FBdlMsRUFBMFMsQ0FBMVMsRUFBNlMsQ0FBN1MsRUFBZ1QsQ0FBaFQsRUFBbVQsQ0FBblQsRUFBc1QsQ0FBdFQsRUFBeVQsQ0FBelQsRUFBNFQsQ0FBNVQsRUFBK1QsQ0FBL1QsRUFBa1UsQ0FBbFUsRUFBcVUsQ0FBclUsRUFBd1UsQ0FBeFUsRUFBMlUsQ0FBM1UsRUFBOFUsQ0FBOVUsRUFBaVYsQ0FBalYsRUFBb1YsQ0FBcFYsRUFBdVYsQ0FBdlYsRUFBMFYsQ0FBMVYsRUFBNlYsQ0FBN1YsRUFBZ1csQ0FBaFcsRUFBbVcsQ0FBblcsRUFBc1csQ0FBdFcsRUFBeVcsQ0FBelcsRUFBNFcsQ0FBNVcsRUFBK1csQ0FBL1csRUFBa1gsQ0FBbFgsRUFBcVgsQ0FBclgsRUFBd1gsQ0FBeFgsRUFBMlgsQ0FBM1gsRUFBOFgsQ0FBOVgsRUFBaVksQ0FBalksRUFBb1ksQ0FBcFksRUFBdVksQ0FBdlksRUFBMFksQ0FBMVksRUFBNlksQ0FBN1ksRUFBZ1osQ0FBaFosRUFBbVosQ0FBblosRUFBc1osQ0FBdFosRUFBeVosQ0FBelosRUFBNFosQ0FBNVosRUFBK1osQ0FBL1osRUFBa2EsQ0FBbGEsRUFBcWEsQ0FBcmEsRUFBd2EsQ0FBeGEsRUFBMmEsQ0FBM2EsRUFBOGEsQ0FBOWEsRUFBaWIsQ0FBamIsRUFBb2IsQ0FBcGIsRUFBdWIsQ0FBdmIsRUFBMGIsQ0FBMWIsRUFBNmIsQ0FBN2IsRUFBZ2MsQ0FBaGMsRUFBbWMsQ0FBbmMsRUFBc2MsQ0FBdGMsRUFBeWMsQ0FBemMsRUFBNGMsQ0FBNWMsRUFBK2MsQ0FBL2MsRUFBa2QsQ0FBbGQsRUFBcWQsQ0FBcmQsRUFBd2QsQ0FBeGQsRUFBMmQsQ0FBM2QsRUFBOGQsQ0FBOWQsRUFBaWUsQ0FBamUsRUFBb2UsQ0FBcGUsRUFBdWUsQ0FBdmUsRUFBMGUsQ0FBMWUsRUFBNmUsQ0FBN2UsRUFBZ2YsQ0FBaGYsRUFBbWYsQ0FBbmYsRUFBc2YsQ0FBdGYsRUFBeWYsQ0FBemYsRUFBNGYsQ0FBNWYsRUFBK2YsQ0FBL2YsRUFBa2dCLENBQWxnQixFQUFxZ0IsQ0FBcmdCLEVBQXdnQixDQUF4Z0IsRUFBMmdCLENBQTNnQixFQUE4Z0IsQ0FBOWdCLEVBQWloQixDQUFqaEIsRUFBb2hCLENBQXBoQixFQUF1aEIsQ0FBdmhCLEVBQTBoQixDQUExaEIsRUFBNmhCLENBQTdoQixFQUFnaUIsQ0FBaGlCLEVBQW1pQixDQUFuaUIsRUFBc2lCLENBQXRpQixFQUF5aUIsQ0FBemlCLEVBQTRpQixDQUE1aUIsRUFBK2lCLENBQS9pQixFQUFrakIsQ0FBbGpCLEVBQXFqQixDQUFyakIsRUFBd2pCLENBQXhqQixFQUEyakIsQ0FBM2pCLEVBQThqQixDQUE5akIsRUFBaWtCLENBQWprQixFQUFva0IsQ0FBcGtCLEVBQXVrQixDQUF2a0IsRUFBMGtCLENBQTFrQixFQUE2a0IsQ0FBN2tCLEVBQWdsQixDQUFobEIsRUFBbWxCLENBQW5sQixFQUFzbEIsQ0FBdGxCLEVBQXlsQixDQUF6bEIsRUFBNGxCLENBQTVsQixFQUErbEIsQ0FBL2xCLEVBQWttQixDQUFsbUIsRUFBcW1CLENBQXJtQixFQUF3bUIsQ0FBeG1CLEVBQTJtQixDQUEzbUIsRUFBOG1CLENBQTltQixFQUFpbkIsQ0FBam5CLEVBQW9uQixDQUFwbkIsRUFBdW5CLENBQXZuQixFQUEwbkIsQ0FBMW5CLEVBQTZuQixDQUE3bkIsRUFBZ29CLENBQWhvQixFQUFtb0IsQ0FBbm9CLEVBQXNvQixDQUF0b0IsRUFBeW9CLENBQXpvQixFQUE0b0IsQ0FBNW9CLEVBQStvQixDQUEvb0IsRUFBa3BCLENBQWxwQixFQUFxcEIsQ0FBcnBCLEVBQXdwQixDQUF4cEIsRUFBMnBCLENBQTNwQixFQUE4cEIsQ0FBOXBCLEVBQWlxQixDQUFqcUIsRUFBb3FCLENBQXBxQixFQUF1cUIsQ0FBdnFCLEVBQTBxQixDQUExcUIsRUFBNnFCLENBQTdxQixFQUFnckIsQ0FBaHJCLEVBQW1yQixDQUFuckIsRUFBc3JCLENBQXRyQixFQUF5ckIsQ0FBenJCLEVBQTRyQixDQUE1ckIsRUFBK3JCLENBQS9yQixFQUFrc0IsQ0FBbHNCLEVBQXFzQixDQUFyc0IsRUFBd3NCLENBQXhzQixFQUEyc0IsQ0FBM3NCLEVBQThzQixDQUE5c0IsRUFBaXRCLENBQWp0QixFQUFvdEIsQ0FBcHRCLEVBQXV0QixDQUF2dEIsRUFBMHRCLENBQTF0QixFQUE2dEIsQ0FBN3RCLEVBQWd1QixDQUFodUIsRUFBbXVCLENBQW51QixFQUFzdUIsQ0FBdHVCLEVBQXl1QixDQUF6dUIsRUFBNHVCLENBQTV1QixFQUErdUIsQ0FBL3VCLEVBQWt2QixDQUFsdkIsRUFBcXZCLENBQXJ2QixFQUF3dkIsQ0FBeHZCLEVBQTJ2QixDQUEzdkIsRUFBOHZCLENBQTl2QixFQUFpd0IsQ0FBandCLEVBQW93QixDQUFwd0IsRUFBdXdCLENBQXZ3QixFQUEwd0IsQ0FBMXdCLEVBQTZ3QixDQUE3d0IsRUFBZ3hCLENBQWh4QixFQUFteEIsQ0FBbnhCLEVBQXN4QixDQUF0eEIsRUFBeXhCLENBQXp4QixFQUE0eEIsQ0FBNXhCLEVBQSt4QixDQUEveEIsRUFBa3lCLENBQWx5QixFQUFxeUIsQ0FBcnlCLEVBQXd5QixDQUF4eUIsRUFBMnlCLENBQTN5QixFQUE4eUIsQ0FBOXlCLEVBQWl6QixDQUFqekIsRUFBb3pCLENBQXB6QixFQUF1ekIsQ0FBdnpCLEVBQTB6QixDQUExekIsRUFBNnpCLENBQTd6QixFQUFnMEIsQ0FBaDBCLEVBQW0wQixDQUFuMEIsRUFBczBCLENBQXQwQixFQUF5MEIsQ0FBejBCLEVBQTQwQixDQUE1MEIsRUFBKzBCLENBQS8wQixFQUFrMUIsQ0FBbDFCLEVBQXExQixDQUFyMUIsRUFBdzFCLENBQXgxQixFQUEyMUIsQ0FBMzFCLEVBQTgxQixDQUE5MUIsRUFBaTJCLENBQWoyQixFQUFvMkIsQ0FBcDJCLEVBQXUyQixDQUF2MkIsRUFBMDJCLENBQTEyQixFQUE2MkIsQ0FBNzJCLEVBQWczQixDQUFoM0IsRUFBbTNCLENBQW4zQixFQUFzM0IsQ0FBdDNCLEVBQXkzQixDQUF6M0IsRUFBNDNCLENBQTUzQixFQUErM0IsQ0FBLzNCLEVBQWs0QixDQUFsNEIsRUFBcTRCLENBQXI0QixFQUF3NEIsQ0FBeDRCLEVBQTI0QixDQUEzNEIsRUFBODRCLENBQTk0QixFQUFpNUIsQ0FBajVCLEVBQW81QixDQUFwNUIsRUFBdTVCLENBQXY1QixFQUEwNUIsQ0FBMTVCLEVBQTY1QixDQUE3NUIsRUFBZzZCLENBQWg2QixFQUFtNkIsQ0FBbjZCLEVBQXM2QixDQUF0NkIsRUFBeTZCLENBQXo2QixFQUE0NkIsQ0FBNTZCLEVBQSs2QixDQUEvNkIsRUFBazdCLENBQWw3QixFQUFxN0IsQ0FBcjdCLEVBQXc3QixDQUF4N0IsRUFBMjdCLENBQTM3QixFQUE4N0IsQ0FBOTdCLEVBQWk4QixDQUFqOEIsRUFBbzhCLENBQXA4QixFQUF1OEIsQ0FBdjhCLEVBQTA4QixDQUExOEIsRUFBNjhCLENBQTc4QixFQUFnOUIsQ0FBaDlCLEVBQW05QixDQUFuOUIsRUFBczlCLENBQXQ5QixFQUF5OUIsQ0FBejlCLEVBQTQ5QixDQUE1OUIsRUFBKzlCLENBQS85QixFQUFrK0IsQ0FBbCtCLEVBQXErQixDQUFyK0IsRUFBdytCLENBQXgrQixFQUEyK0IsQ0FBMytCLEVBQTgrQixDQUE5K0IsRUFBaS9CLENBQWovQixFQUFvL0IsQ0FBcC9CLEVBQXUvQixDQUF2L0IsRUFBMC9CLENBQTEvQixFQUE2L0IsQ0FBNy9CLEVBQWdnQyxDQUFoZ0MsRUFBbWdDLENBQW5nQyxFQUFzZ0MsQ0FBdGdDLEVBQXlnQyxDQUF6Z0MsRUFBNGdDLENBQTVnQyxFQUErZ0MsQ0FBL2dDLEVBQWtoQyxDQUFsaEMsRUFBcWhDLENBQXJoQyxFQUF3aEMsQ0FBeGhDLEVBQTJoQyxDQUEzaEMsRUFBOGhDLENBQTloQyxFQUFpaUMsQ0FBamlDLEVBQW9pQyxDQUFwaUMsRUFBdWlDLENBQXZpQyxFQUEwaUMsQ0FBMWlDLEVBQTZpQyxDQUE3aUMsRUFBZ2pDLENBQWhqQyxFQUFtakMsQ0FBbmpDLEVBQXNqQyxDQUF0akMsRUFBeWpDLENBQXpqQyxFQUE0akMsQ0FBNWpDLEVBQStqQyxDQUEvakMsRUFBa2tDLENBQWxrQyxFQUFxa0MsQ0FBcmtDLEVBQXdrQyxDQUF4a0MsRUFBMmtDLENBQTNrQyxFQUE4a0MsQ0FBOWtDLEVBQWlsQyxDQUFqbEMsRUFBb2xDLENBQXBsQyxFQUF1bEMsQ0FBdmxDLEVBQTBsQyxDQUExbEMsRUFBNmxDLENBQTdsQyxFQUFnbUMsQ0FBaG1DLEVBQW1tQyxDQUFubUMsRUFBc21DLENBQXRtQyxFQUF5bUMsQ0FBem1DLEVBQTRtQyxDQUE1bUMsRUFBK21DLENBQS9tQyxFQUFrbkMsQ0FBbG5DLEVBQXFuQyxDQUFybkMsRUFBd25DLENBQXhuQyxFQUEybkMsQ0FBM25DLEVBQThuQyxDQUE5bkMsRUFBaW9DLENBQWpvQyxFQUFvb0MsQ0FBcG9DLEVBQXVvQyxDQUF2b0MsRUFBMG9DLENBQTFvQyxFQUE2b0MsQ0FBN29DLEVBQWdwQyxDQUFocEMsRUFBbXBDLENBQW5wQyxFQUFzcEMsQ0FBdHBDLEVBQXlwQyxDQUF6cEMsRUFBNHBDLENBQTVwQyxFQUErcEMsQ0FBL3BDLEVBQWtxQyxDQUFscUMsRUFBcXFDLENBQXJxQyxFQUF3cUMsQ0FBeHFDLEVBQTJxQyxDQUEzcUMsRUFBOHFDLENBQTlxQyxFQUFpckMsQ0FBanJDLEVBQW9yQyxDQUFwckMsRUFBdXJDLENBQXZyQyxFQUEwckMsQ0FBMXJDLEVBQTZyQyxDQUE3ckMsRUFBZ3NDLENBQWhzQyxFQUFtc0MsQ0FBbnNDLEVBQXNzQyxDQUF0c0MsRUFBeXNDLENBQXpzQyxFQUE0c0MsQ0FBNXNDLEVBQStzQyxDQUEvc0MsRUFBa3RDLENBQWx0QyxFQUFxdEMsQ0FBcnRDLEVBQXd0QyxDQUF4dEMsRUFBMnRDLENBQTN0QyxFQUE4dEMsQ0FBOXRDLEVBQWl1QyxDQUFqdUMsRUFBb3VDLENBQXB1QyxFQUF1dUMsQ0FBdnVDLEVBQTB1QyxDQUExdUMsRUFBNnVDLENBQTd1QyxFQUFndkMsQ0FBaHZDLEVBQW12QyxDQUFudkMsRUFBc3ZDLENBQXR2QyxFQUF5dkMsQ0FBenZDLEVBQTR2QyxDQUE1dkMsRUFBK3ZDLENBQS92QyxFQUFrd0MsQ0FBbHdDLEVBQXF3QyxDQUFyd0MsRUFBd3dDLENBQXh3QyxFQUEyd0MsQ0FBM3dDLEVBQTh3QyxDQUE5d0MsRUFBaXhDLENBQWp4QyxFQUFveEMsQ0FBcHhDLEVBQXV4QyxDQUF2eEMsRUFBMHhDLENBQTF4QyxFQUE2eEMsQ0FBN3hDLEVBQWd5QyxDQUFoeUMsRUFBbXlDLENBQW55QyxFQUFzeUMsQ0FBdHlDLEVBQXl5QyxDQUF6eUMsRUFBNHlDLENBQTV5QyxFQUEreUMsQ0FBL3lDLEVBQWt6QyxDQUFsekMsRUFBcXpDLENBQXJ6QyxFQUF3ekMsQ0FBeHpDLEVBQTJ6QyxDQUEzekMsRUFBOHpDLENBQTl6QyxFQUFpMEMsQ0FBajBDLEVBQW8wQyxDQUFwMEMsRUFBdTBDLENBQXYwQyxFQUEwMEMsQ0FBMTBDLEVBQTYwQyxDQUE3MEMsRUFBZzFDLENBQWgxQyxFQUFtMUMsQ0FBbjFDLEVBQXMxQyxDQUF0MUMsRUFBeTFDLENBQXoxQyxFQUE0MUMsQ0FBNTFDLEVBQSsxQyxDQUEvMUMsRUFBazJDLENBQWwyQyxFQUFxMkMsQ0FBcjJDLEVBQXcyQyxDQUF4MkMsRUFBMjJDLENBQTMyQyxFQUE4MkMsQ0FBOTJDLEVBQWkzQyxDQUFqM0MsRUFBbzNDLENBQXAzQyxFQUF1M0MsQ0FBdjNDLEVBQTAzQyxDQUExM0MsRUFBNjNDLENBQTczQyxFQUFnNEMsQ0FBaDRDLEVBQW00QyxDQUFuNEMsRUFBczRDLENBQXQ0QyxFQUF5NEMsQ0FBejRDLEVBQTQ0QyxDQUE1NEMsRUFBKzRDLENBQS80QyxFQUFrNUMsQ0FBbDVDLEVBQXE1QyxDQUFyNUMsRUFBdzVDLENBQXg1QyxFQUEyNUMsQ0FBMzVDLEVBQTg1QyxDQUE5NUMsRUFBaTZDLENBQWo2QyxFQUFvNkMsQ0FBcDZDLEVBQXU2QyxDQUF2NkMsRUFBMDZDLENBQTE2QyxFQUE2NkMsQ0FBNzZDLEVBQWc3QyxDQUFoN0MsRUFBbTdDLENBQW43QyxFQUFzN0MsQ0FBdDdDLEVBQXk3QyxDQUF6N0MsRUFBNDdDLENBQTU3QyxFQUErN0MsQ0FBLzdDLEVBQWs4QyxDQUFsOEMsRUFBcThDLENBQXI4QyxFQUF3OEMsQ0FBeDhDLEVBQTI4QyxDQUEzOEMsRUFBODhDLENBQTk4QyxFQUFpOUMsQ0FBajlDLEVBQW85QyxDQUFwOUMsRUFBdTlDLENBQXY5QyxFQUEwOUMsQ0FBMTlDLEVBQTY5QyxDQUE3OUMsRUFBZytDLENBQWgrQyxFQUFtK0MsQ0FBbitDLEVBQXMrQyxDQUF0K0MsRUFBeStDLENBQXorQyxFQUE0K0MsQ0FBNStDLEVBQSsrQyxDQUEvK0MsRUFBay9DLENBQWwvQyxFQUFxL0MsQ0FBci9DLEVBQXcvQyxDQUF4L0MsRUFBMi9DLENBQTMvQyxFQUE4L0MsQ0FBOS9DLEVBQWlnRCxDQUFqZ0QsRUFBb2dELENBQXBnRCxFQUF1Z0QsQ0FBdmdELEVBQTBnRCxDQUExZ0QsRUFBNmdELENBQTdnRCxFQUFnaEQsQ0FBaGhELEVBQW1oRCxDQUFuaEQsRUFBc2hELENBQXRoRCxFQUF5aEQsQ0FBemhELEVBQTRoRCxDQUE1aEQsRUFBK2hELENBQS9oRCxFQUFraUQsQ0FBbGlELEVBQXFpRCxDQUFyaUQsRUFBd2lELENBQXhpRCxFQUEyaUQsQ0FBM2lELEVBQThpRCxDQUE5aUQsRUFBaWpELENBQWpqRCxFQUFvakQsQ0FBcGpELEVBQXVqRCxDQUF2akQsRUFBMGpELENBQTFqRCxFQUE2akQsQ0FBN2pELEVBQWdrRCxDQUFoa0QsRUFBbWtELENBQW5rRCxFQUFza0QsQ0FBdGtELEVBQXlrRCxDQUF6a0QsRUFBNGtELENBQTVrRCxFQUEra0QsQ0FBL2tELEVBQWtsRCxDQUFsbEQsRUFBcWxELENBQXJsRCxFQUF3bEQsQ0FBeGxELEVBQTJsRCxDQUEzbEQsRUFBOGxELENBQTlsRCxFQUFpbUQsQ0FBam1ELEVBQW9tRCxDQUFwbUQsRUFBdW1ELENBQXZtRCxFQUEwbUQsQ0FBMW1ELEVBQTZtRCxDQUE3bUQsRUFBZ25ELENBQWhuRCxFQUFtbkQsQ0FBbm5ELEVBQXNuRCxDQUF0bkQsRUFBeW5ELENBQXpuRCxFQUE0bkQsQ0FBNW5ELEVBQStuRCxDQUEvbkQsRUFBa29ELENBQWxvRCxFQUFxb0QsQ0FBcm9ELEVBQXdvRCxDQUF4b0QsRUFBMm9ELENBQTNvRCxFQUE4b0QsQ0FBOW9ELEVBQWlwRCxDQUFqcEQsRUFBb3BELENBQXBwRCxFQUF1cEQsQ0FBdnBELEVBQTBwRCxDQUExcEQsRUFBNnBELENBQTdwRCxFQUFncUQsQ0FBaHFELEVBQW1xRCxDQUFucUQsRUFBc3FELENBQXRxRCxFQUF5cUQsQ0FBenFELEVBQTRxRCxDQUE1cUQsRUFBK3FELENBQS9xRCxFQUFrckQsQ0FBbHJELEVBQXFyRCxDQUFyckQsRUFBd3JELENBQXhyRCxFQUEyckQsQ0FBM3JELEVBQThyRCxDQUE5ckQsRUFBaXNELENBQWpzRCxFQUFvc0QsQ0FBcHNELEVBQXVzRCxDQUF2c0QsRUFBMHNELENBQTFzRCxFQUE2c0QsQ0FBN3NELEVBQWd0RCxDQUFodEQsRUFBbXRELENBQW50RCxFQUFzdEQsQ0FBdHRELEVBQXl0RCxDQUF6dEQsRUFBNHRELENBQTV0RCxFQUErdEQsQ0FBL3RELEVBQWt1RCxDQUFsdUQsRUFBcXVELENBQXJ1RCxFQUF3dUQsQ0FBeHVELEVBQTJ1RCxDQUEzdUQsRUFBOHVELENBQTl1RCxFQUFpdkQsQ0FBanZELEVBQW92RCxDQUFwdkQsRUFBdXZELENBQXZ2RCxFQUEwdkQsQ0FBMXZELEVBQTZ2RCxDQUE3dkQsRUFBZ3dELENBQWh3RCxFQUFtd0QsQ0FBbndELEVBQXN3RCxDQUF0d0QsRUFBeXdELENBQXp3RCxFQUE0d0QsQ0FBNXdELEVBQSt3RCxDQUEvd0QsRUFBa3hELENBQWx4RCxFQUFxeEQsQ0FBcnhELEVBQXd4RCxDQUF4eEQsRUFBMnhELENBQTN4RCxFQUE4eEQsQ0FBOXhELEVBQWl5RCxDQUFqeUQsRUFBb3lELENBQXB5RCxFQUF1eUQsQ0FBdnlELEVBQTB5RCxDQUExeUQsRUFBNnlELENBQTd5RCxFQUFnekQsQ0FBaHpELEVBQW16RCxDQUFuekQsRUFBc3pELENBQXR6RCxFQUF5ekQsQ0FBenpELEVBQTR6RCxDQUE1ekQsRUFBK3pELENBQS96RCxFQUFrMEQsQ0FBbDBELEVBQXEwRCxDQUFyMEQsRUFBdzBELENBQXgwRCxFQUEyMEQsQ0FBMzBELEVBQTgwRCxDQUE5MEQsRUFBaTFELENBQWoxRCxFQUFvMUQsQ0FBcDFELEVBQXUxRCxDQUF2MUQsRUFBMDFELENBQTExRCxFQUE2MUQsQ0FBNzFELEVBQWcyRCxDQUFoMkQsRUFBbTJELENBQW4yRCxFQUFzMkQsQ0FBdDJELEVBQXkyRCxDQUF6MkQsRUFBNDJELENBQTUyRCxFQUErMkQsQ0FBLzJELEVBQWszRCxDQUFsM0QsRUFBcTNELENBQXIzRCxFQUF3M0QsQ0FBeDNELEVBQTIzRCxDQUEzM0QsRUFBODNELENBQTkzRCxFQUFpNEQsQ0FBajRELEVBQW80RCxDQUFwNEQsRUFBdTRELENBQXY0RCxFQUEwNEQsQ0FBMTRELEVBQTY0RCxDQUE3NEQsRUFBZzVELENBQWg1RCxFQUFtNUQsQ0FBbjVELEVBQXM1RCxDQUF0NUQsRUFBeTVELENBQXo1RCxFQUE0NUQsQ0FBNTVELEVBQSs1RCxDQUEvNUQsRUFBazZELENBQWw2RCxFQUFxNkQsQ0FBcjZELEVBQXc2RCxDQUF4NkQsRUFBMjZELENBQTM2RCxFQUE4NkQsQ0FBOTZELEVBQWk3RCxDQUFqN0QsRUFBbzdELENBQXA3RCxFQUF1N0QsQ0FBdjdELEVBQTA3RCxDQUExN0QsRUFBNjdELENBQTc3RCxFQUFnOEQsQ0FBaDhELEVBQW04RCxDQUFuOEQsRUFBczhELENBQXQ4RCxFQUF5OEQsQ0FBejhELEVBQTQ4RCxDQUE1OEQsRUFBKzhELENBQS84RCxFQUFrOUQsQ0FBbDlELEVBQXE5RCxDQUFyOUQsRUFBdzlELENBQXg5RCxFQUEyOUQsQ0FBMzlELEVBQTg5RCxDQUE5OUQsRUFBaStELENBQWorRCxFQUFvK0QsQ0FBcCtELEVBQXUrRCxDQUF2K0QsRUFBMCtELENBQTErRCxFQUE2K0QsQ0FBNytELEVBQWcvRCxDQUFoL0QsRUFBbS9ELENBQW4vRCxFQUFzL0QsQ0FBdC9ELEVBQXkvRCxDQUF6L0QsRUFBNC9ELENBQTUvRCxFQUErL0QsQ0FBLy9ELEVBQWtnRSxDQUFsZ0UsRUFBcWdFLENBQXJnRSxFQUF3Z0UsQ0FBeGdFLEVBQTJnRSxDQUEzZ0UsRUFBOGdFLENBQTlnRSxFQUFpaEUsQ0FBamhFLEVBQW9oRSxDQUFwaEUsRUFBdWhFLENBQXZoRSxFQUEwaEUsQ0FBMWhFLEVBQTZoRSxDQUE3aEUsRUFBZ2lFLENBQWhpRSxFQUFtaUUsQ0FBbmlFLEVBQXNpRSxDQUF0aUUsRUFBeWlFLENBQXppRSxFQUE0aUUsQ0FBNWlFLEVBQStpRSxDQUEvaUUsRUFBa2pFLENBQWxqRSxFQUFxakUsQ0FBcmpFLEVBQXdqRSxDQUF4akUsRUFBMmpFLENBQTNqRSxFQUE4akUsQ0FBOWpFLEVBQWlrRSxDQUFqa0UsRUFBb2tFLENBQXBrRSxFQUF1a0UsQ0FBdmtFLEVBQTBrRSxDQUExa0UsRUFBNmtFLENBQTdrRSxFQUFnbEUsQ0FBaGxFLEVBQW1sRSxDQUFubEUsRUFBc2xFLENBQXRsRSxFQUF5bEUsQ0FBemxFLEVBQTRsRSxDQUE1bEUsRUFBK2xFLENBQS9sRSxFQUFrbUUsQ0FBbG1FLEVBQXFtRSxDQUFybUUsRUFBd21FLENBQXhtRSxFQUEybUUsQ0FBM21FLEVBQThtRSxDQUE5bUUsRUFBaW5FLENBQWpuRSxFQUFvbkUsQ0FBcG5FLEVBQXVuRSxDQUF2bkUsRUFBMG5FLENBQTFuRSxFQUE2bkUsQ0FBN25FLEVBQWdvRSxDQUFob0UsRUFBbW9FLENBQW5vRSxFQUFzb0UsQ0FBdG9FLEVBQXlvRSxDQUF6b0UsRUFBNG9FLENBQTVvRSxFQUErb0UsQ0FBL29FLEVBQWtwRSxDQUFscEUsRUFBcXBFLENBQXJwRSxFQUF3cEUsQ0FBeHBFLEVBQTJwRSxDQUEzcEUsRUFBOHBFLENBQTlwRSxFQUFpcUUsQ0FBanFFLEVBQW9xRSxDQUFwcUUsRUFBdXFFLENBQXZxRSxFQUEwcUUsQ0FBMXFFLEVBQTZxRSxDQUE3cUUsRUFBZ3JFLENBQWhyRSxFQUFtckUsQ0FBbnJFLEVBQXNyRSxDQUF0ckUsRUFBeXJFLENBQXpyRSxFQUE0ckUsQ0FBNXJFLEVBQStyRSxDQUEvckUsRUFBa3NFLENBQWxzRSxFQUFxc0UsQ0FBcnNFLEVBQXdzRSxDQUF4c0UsRUFBMnNFLENBQTNzRSxFQUE4c0UsQ0FBOXNFLEVBQWl0RSxDQUFqdEUsRUFBb3RFLENBQXB0RSxFQUF1dEUsQ0FBdnRFLEVBQTB0RSxDQUExdEUsRUFBNnRFLENBQTd0RSxFQUFndUUsQ0FBaHVFLEVBQW11RSxDQUFudUUsRUFBc3VFLENBQXR1RSxFQUF5dUUsQ0FBenVFLEVBQTR1RSxDQUE1dUUsRUFBK3VFLENBQS91RSxFQUFrdkUsQ0FBbHZFLEVBQXF2RSxDQUFydkUsRUFBd3ZFLENBQXh2RSxFQUEydkUsQ0FBM3ZFLEVBQTh2RSxDQUE5dkUsRUFBaXdFLENBQWp3RSxFQUFvd0UsQ0FBcHdFLEVBQXV3RSxDQUF2d0UsRUFBMHdFLENBQTF3RSxFQUE2d0UsQ0FBN3dFLEVBQWd4RSxDQUFoeEUsRUFBbXhFLENBQW54RSxFQUFzeEUsQ0FBdHhFLEVBQXl4RSxDQUF6eEUsRUFBNHhFLENBQTV4RSxFQUEreEUsQ0FBL3hFLEVBQWt5RSxDQUFseUUsRUFBcXlFLENBQXJ5RSxFQUF3eUUsQ0FBeHlFLENBRFQ7QUFFQyxZQUFVLEVBRlg7QUFHQyxVQUFRLGFBSFQ7QUFJQyxhQUFXLENBSlo7QUFLQyxVQUFRLFdBTFQ7QUFNQyxhQUFXLEtBTlo7QUFPQyxXQUFTLEVBUFY7QUFRQyxPQUFLLENBUk47QUFTQyxPQUFLO0FBVE4sRUF0QlMsQ0FGUTtBQW9DbEIsaUJBQWdCLENBcENFO0FBcUNsQixnQkFBZSxZQXJDRztBQXNDbEIsZUFBYyxFQXRDSTtBQXlDbEIsZ0JBQWUsWUF6Q0c7QUEwQ2xCLGVBQWMsRUExQ0k7QUEyQ2xCLGFBQVksQ0FBQztBQUNaLGFBQVcsRUFEQztBQUVaLGNBQVksQ0FGQTtBQUdaLFdBQVMsUUFIRztBQUlaLGlCQUFlLEdBSkg7QUFLWixnQkFBYyxHQUxGO0FBTVosWUFBVSxDQU5FO0FBT1osVUFBUSxJQVBJO0FBUVosZ0JBQWMsRUFSRjtBQVdaLGFBQVcsQ0FYQztBQVlaLGVBQWEsR0FaRDtBQWFaLGdCQUFjLEVBYkY7QUFjWixlQUFhO0FBZEQsRUFBRCxDQTNDTTtBQTJEbEIsY0FBYSxFQTNESztBQTREbEIsWUFBVyxDQTVETztBQTZEbEIsVUFBUztBQTdEUyxDQUFuQjs7a0JBZ0VlQSxVOzs7Ozs7Ozs7Ozs7O0FDaEVmOzs7Ozs7QUFFQSxJQUFNaEcsY0FBYztBQUNuQixPQUFNLGtCQURhO0FBRW5CLFNBQVEsa0JBRlc7QUFHbkIsWUFBVyxnQ0FIUTtBQUluQixZQUFXLGdDQUpRO0FBS25CLDZCQUxtQjtBQU1uQixpQkFBZ0IsSUFORztBQU9uQiwwQkFBeUIsTUFQTjtBQVFuQixvQkFBbUIsYUFSQTtBQVNuQiw2QkFBNEIsTUFUVDtBQVVuQixrQkFBaUIsY0FWRTtBQVduQixVQUFTLEdBWFU7QUFZbkIsV0FBVSxHQVpTO0FBYW5CLFdBQVU7QUFDVCxpQkFBZTtBQUNkLFVBQU8sY0FETztBQUVkLGNBQVc7QUFGRyxHQUROO0FBS1Qsb0JBQWtCO0FBQ2pCLFVBQU8saUJBRFU7QUFFakIsY0FBVztBQUZNLEdBTFQ7QUFTVCxnQkFBYztBQUNiLFVBQU8sYUFETTtBQUViLGNBQVc7QUFGRTtBQVRMLEVBYlM7QUEyQm5CLG9CQUFtQixJQTNCQTtBQTRCbkIsZUFBYztBQUNiLE9BQUssRUFEUTtBQUViLE9BQUs7QUFGUSxFQTVCSztBQWdDbkIsWUFBVyxFQWhDUTtBQWlDbkIsY0FBYSxFQWpDTTtBQWtDbkIsVUFBUyxFQWxDVTtBQW1DbkIsWUFBVztBQW5DUSxDQUFwQjs7a0JBc0NlQSxXOzs7Ozs7Ozs7Ozs7QUN2Q1IsSUFBTWlHLDRCQUFVLFNBQVZBLE9BQVUsbUJBQW9CO0FBQ3ZDLFdBQU9DLGlCQUFpQkMsTUFBakIsQ0FBd0IsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDekMsZUFBT0QsSUFBSUUsTUFBSixDQUFXRCxHQUFYLENBQVA7QUFDSCxLQUZNLEVBRUosRUFGSSxDQUFQO0FBR0gsQ0FKTTs7QUFNQSxJQUFNRSxvQ0FBYyxTQUFkQSxXQUFjLENBQUNDLEdBQUQsRUFBTUMsS0FBTixFQUFheFMsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBc0I7QUFDN0MsU0FBSyxJQUFJbVMsTUFBTSxDQUFmLEVBQWtCQSxNQUFNSSxNQUFNbFIsTUFBOUIsRUFBc0M4USxLQUF0QyxFQUE2QztBQUN6QyxhQUFLLElBQUlLLE1BQU0sQ0FBZixFQUFrQkEsTUFBTUQsTUFBTUosR0FBTixFQUFXOVEsTUFBbkMsRUFBMkNtUixLQUEzQyxFQUFrRDtBQUM5Q0YsZ0JBQUl0UyxJQUFJbVMsR0FBUixFQUFhcFMsSUFBSXlTLEdBQWpCLElBQXdCRCxNQUFNSixHQUFOLEVBQVdLLEdBQVgsQ0FBeEI7QUFDSDtBQUNKO0FBQ0QsV0FBT0YsR0FBUDtBQUNILENBUE07O0FBU0EsSUFBTUcsc0NBQWUsU0FBZkEsWUFBZSxDQUFDQyxJQUFELEVBQU9DLElBQVAsRUFBYXhCLElBQWIsRUFBc0I7QUFDOUMsUUFBSWUsTUFBTSxFQUFWO0FBQ0EsU0FBSyxJQUFJVSxJQUFJLENBQWIsRUFBZ0JBLElBQUlGLElBQXBCLEVBQTBCRSxHQUExQixFQUErQjtBQUMzQixZQUFJVCxNQUFNLEVBQVY7QUFDQSxhQUFLLElBQUlVLElBQUksQ0FBYixFQUFnQkEsSUFBSUYsSUFBcEIsRUFBMEJFLEdBQTFCLEVBQStCO0FBQzNCVixnQkFBSXpCLElBQUosQ0FBU1MsSUFBVDtBQUNIO0FBQ0RlLFlBQUl4QixJQUFKLENBQVN5QixHQUFUO0FBQ0g7QUFDRCxXQUFPRCxHQUFQO0FBQ0gsQ0FWTTs7QUFZQSxJQUFNWSx3Q0FBZ0IsU0FBaEJBLGFBQWdCLFFBQVM7QUFDbEMsV0FBT0MsTUFBTXJCLElBQU4sQ0FBV08sTUFBWCxDQUFrQixVQUFDZSxNQUFELEVBQVM3QixJQUFULEVBQWV5QixDQUFmLEVBQXFCO0FBQzFDLFlBQUlBLElBQUlHLE1BQU0zUSxLQUFWLEtBQW9CLENBQXhCLEVBQTJCO0FBQ3ZCNFEsbUJBQU90QyxJQUFQLENBQVksQ0FBQ1MsSUFBRCxDQUFaO0FBQ0gsU0FGRCxNQUVPO0FBQ0g2QixtQkFBT0EsT0FBTzNSLE1BQVAsR0FBZ0IsQ0FBdkIsRUFBMEJxUCxJQUExQixDQUErQlMsSUFBL0I7QUFDSDtBQUNELGVBQU82QixNQUFQO0FBQ0gsS0FQTSxFQU9KLEVBUEksQ0FBUDtBQVFILENBVE07O0FBV0EsSUFBTUMsc0RBQXVCLFNBQXZCQSxvQkFBdUIsQ0FBQzNDLE1BQUQsRUFBU3ZRLENBQVQsRUFBWUMsQ0FBWixFQUFlb0MsS0FBZixFQUFzQlIsTUFBdEIsRUFBaUM7QUFDakUsUUFBSXNRLE1BQU0sQ0FBVjtBQUNBLFNBQUssSUFBSUMsTUFBTXBTLENBQWYsRUFBa0JvUyxPQUFPcFMsSUFBSXFDLEtBQTdCLEVBQW9DK1AsS0FBcEMsRUFBMkM7QUFDdkMsYUFBSyxJQUFJSyxNQUFNeFMsQ0FBZixFQUFrQndTLE9BQU94UyxJQUFJNEIsTUFBN0IsRUFBcUM0USxLQUFyQyxFQUE0QztBQUN4Q04sbUJBQU81QixPQUFPa0MsR0FBUCxFQUFZTCxHQUFaLENBQVA7QUFDSDtBQUNKO0FBQ0QsV0FBT0QsUUFBUSxDQUFmO0FBQ0gsQ0FSTTs7QUFVQSxJQUFNZ0Isc0RBQXVCLFNBQXZCQSxvQkFBdUIsYUFBYztBQUNqRCxXQUFPQyxXQUFXQyxNQUFYLENBQWtCLGdCQUFRO0FBQ2hDLGVBQU9qQyxTQUFTLENBQWhCO0FBQ0EsS0FGTSxFQUVKYyxNQUZJLENBRUcsVUFBQ29CLE9BQUQsRUFBVWxDLElBQVYsRUFBbUI7QUFDNUIsWUFBR2tDLFFBQVFqQyxPQUFSLENBQWdCRCxJQUFoQixJQUF3QixDQUEzQixFQUE2QjtBQUM1QmtDLG9CQUFRM0MsSUFBUixDQUFhUyxJQUFiO0FBQ0E7QUFDRCxlQUFPa0MsT0FBUDtBQUNBLEtBUE0sRUFPSixFQVBJLEVBT0FDLElBUEEsQ0FPSyxVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUNyQixlQUFPRCxJQUFJQyxDQUFYO0FBQ0EsS0FUTSxDQUFQO0FBVUEsQ0FYTSxDOzs7Ozs7Ozs7Ozs7QUNqRFAsU0FBU3RNLFdBQVQsR0FBdUI7QUFBQTs7QUFDbkIsV0FBTztBQUNIaUYsMEJBQWtCLDBCQUFDc0gsU0FBRCxFQUFlO0FBQzdCLGtCQUFLNU0sS0FBTCxDQUFXQyxlQUFYLEdBQTZCLE1BQUtoSCxJQUFMLENBQVVpRCxHQUFWLENBQWMyUSxVQUFkLENBQ3pCLENBRHlCLEVBRXpCLENBRnlCLEVBR3pCLE1BQUs1SCxXQUFMLENBQWlCMUosS0FIUSxFQUl6QixNQUFLMEosV0FBTCxDQUFpQmxLLE1BSlEsRUFLekIsTUFBS2tLLFdBQUwsQ0FBaUJxQyxhQUxRLENBQTdCO0FBT0gsU0FURTtBQVVId0YscUJBQWEscUJBQUNaLEtBQUQsRUFBVztBQUNwQixrQkFBS2xNLEtBQUwsQ0FBV2tNLEtBQVgsSUFBb0IsTUFBS2xNLEtBQUwsQ0FBV0csT0FBWCxDQUFtQjJNLFdBQW5CLENBQStCLE1BQUs3SCxXQUFMLENBQWlCaUgsS0FBakIsQ0FBL0IsQ0FBcEI7QUFDSCxTQVpFO0FBYUh4RyxzQkFBYyxzQkFBQ0MsTUFBRCxFQUFZO0FBQ3RCLGlCQUFJLElBQUl1RyxLQUFSLElBQWlCdkcsTUFBakIsRUFBd0I7QUFDcEIsc0JBQUszRixLQUFMLENBQVdrTSxLQUFYLElBQW9CLE1BQUtsTSxLQUFMLENBQVdHLE9BQVgsQ0FBbUIyTSxXQUFuQixDQUErQixNQUFLN0gsV0FBTCxDQUFpQlUsTUFBakIsQ0FBd0J1RyxLQUF4QixFQUErQnhILEdBQTlELENBQXBCO0FBQ0Esc0JBQUsxRSxLQUFMLENBQVdrTSxLQUFYLEVBQWtCL08sT0FBbEIsR0FBNEIsTUFBSzhILFdBQUwsQ0FBaUJVLE1BQWpCLENBQXdCdUcsS0FBeEIsRUFBK0IvTyxPQUEzRDtBQUNIO0FBQ0osU0FsQkU7QUFtQkhvSSxxQkFBYSxxQkFBQ3dILFVBQUQsRUFBYUMsVUFBYixFQUF5QnZILFlBQXpCLEVBQTBDO0FBQ25ELGtCQUFLekYsS0FBTCxDQUFXRyxPQUFYLEdBQXFCLE1BQUtsSCxJQUFMLENBQVVpRCxHQUFWLENBQWNpRSxPQUFkLENBQXNCNE0sVUFBdEIsQ0FBckI7QUFDQSxrQkFBSy9NLEtBQUwsQ0FBV0csT0FBWCxDQUFtQjhNLGVBQW5CLENBQW1DeEgsWUFBbkMsRUFBaUR1SCxVQUFqRDtBQUNBLGtCQUFLaE4sS0FBTCxDQUFXRyxPQUFYLENBQW1CK00sbUJBQW5CLENBQXVDLENBQXZDLEVBQTBDLElBQTFDLEVBQWdELElBQWhELEVBQXNELE1BQUtqSSxXQUFMLENBQWlCVSxNQUFqQixDQUF3Qm9DLGNBQXhCLENBQXVDckQsR0FBN0Y7QUFDQSxrQkFBSzFFLEtBQUwsQ0FBV0csT0FBWCxDQUFtQitNLG1CQUFuQixDQUF1QyxDQUF2QyxFQUEwQyxJQUExQyxFQUFnRCxJQUFoRCxFQUFzRCxNQUFLakksV0FBTCxDQUFpQlUsTUFBakIsQ0FBd0JxQyxVQUF4QixDQUFtQ3RELEdBQXpGO0FBQ0g7QUF4QkUsS0FBUDtBQTBCSDs7a0JBRWNyRSxXIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1Y2UyNTc1MzRkOTExNGE5YjFiMCIsImltcG9ydCBFeHRlbmRlZFNwcml0ZSBmcm9tICcuL0V4dGVuZGVkU3ByaXRlJztcclxuXHJcbmNsYXNzIEFJIGV4dGVuZHMgRXh0ZW5kZWRTcHJpdGUge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcywgYmVoYXZpb3Vycyl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuaWQgPSBgJHtwcm9wcy50eXBlfS0ke3h9LSR7eX1gO1xyXG5cclxuICAgICAgICB0aGlzLmJlaGF2aW91cnMgPSBiZWhhdmlvdXJzO1xyXG5cclxuICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gbW9ieC5vYnNlcnZhYmxlKHtcclxuICAgICAgICAgICAgbGlmZTogMTAsXHJcbiAgICAgICAgICAgIHN0dW46IDAsXHJcbiAgICAgICAgICAgIGhpdDogMCxcclxuICAgICAgICAgICAgbm9oaXQ6IDBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICB0dXJuSWZCbG9ja2VkKCl7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LmJsb2NrZWQubGVmdCB8fCB0aGlzLmJvZHkuYmxvY2tlZC5yaWdodCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUueCAqPSAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0dXJuKCl7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ICo9IC0xO1xyXG4gICAgfVxyXG4gICAgc2V0Qm91bmRzKGJvdW5kVG8pe1xyXG4gICAgICAgIGlmKCFib3VuZFRvIHx8ICFPYmplY3Qua2V5cyhib3VuZFRvKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICB0aGlzLmJvdW5kVG8gPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3gnKSAmJlxyXG4gICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd5Jykpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFRvID0gbmV3IFBoYXNlci5Qb2ludChcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngsXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby55XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQFJlY3RhbmdsZSB7IHgxLCB4MiB9XHJcbiAgICAgICAgaWYoYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneDEnKSAmJlxyXG4gICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd4MicpICYmXHJcbiAgICAgICAgICAgICFib3VuZFRvLmhhc093blByb3BlcnR5KCd5MScpICYmXHJcbiAgICAgICAgICAgICFib3VuZFRvLmhhc093blByb3BlcnR5KCd5MicpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRUbyA9IG5ldyBQaGFzZXIuUmVjdGFuZ2xlKFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDEsXHJcbiAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngyIC0gYm91bmRUby54MSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8ge3gxLCB5MSwgeDIsIHkyfVxyXG4gICAgICAgIGlmKGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3gxJykgJiZcclxuICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneDInKSAmJlxyXG4gICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd5MScpICYmXHJcbiAgICAgICAgICAgIGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3kyJykpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFRvID0gbmV3IFBoYXNlci5SZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby54MSxcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLnkxLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDIgLSBib3VuZFRvLngxLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueTIgLSBib3VuZFRvLnkxXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNoZWNrQm91bmRzKCl7XHJcbiAgICAgICAgaWYoIXRoaXMuYm91bmRUbyl7XHJcbiAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQFBvaW50IHt4LCB5fVxyXG4gICAgICAgIGlmKCF0aGlzLmJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3dpZHRoJykgJiZcclxuICAgICAgICAgICAgIVBoYXNlci5SZWN0YW5nbGUuY29udGFpbnNQb2ludCh0aGlzLmdldEJvdW5kcygpLCB0aGlzLmJvdW5kVG8pICYmXHJcbiAgICAgICAgICAgICgodGhpcy54IDwgdGhpcy5ib3VuZFRvLnggJiYgIXRoaXMuZmFjaW5nUmlnaHQpIHx8XHJcbiAgICAgICAgICAgICh0aGlzLnggPiB0aGlzLmJvdW5kVG8ueCAmJiB0aGlzLmZhY2luZ1JpZ2h0KSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50dXJuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBAUmVjdGFuZ2xlIHt4MSwgeDJ9IG9yIHt4MSwgeTEsIHgyLCB5Mn1cclxuICAgICAgICBpZih0aGlzLmJvdW5kVG8gJiZcclxuICAgICAgICAgICAgdGhpcy5ib3VuZFRvLmhhc093blByb3BlcnR5KCd3aWR0aCcpICYmXHJcbiAgICAgICAgICAgICh0aGlzLnggPCB0aGlzLmJvdW5kVG8ueCAmJiB0aGlzLmZhY2luZ0xlZnQgfHxcclxuICAgICAgICAgICAgdGhpcy54ID4gdGhpcy5ib3VuZFRvLnggKyB0aGlzLmJvdW5kVG8ud2lkdGggJiYgdGhpcy5mYWNpbmdSaWdodCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50dXJuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgd2hlbihwYXJhbXMpIHtcclxuXHRcdGlmKE1hdGgucmFuZG9tKCkgPCBwYXJhbXMucHJvYmFiaWxpdHkpe1xyXG5cdFx0XHR0aGlzW3BhcmFtcy5hY3Rpb25dICYmIHRoaXNbcGFyYW1zLmFjdGlvbl0uY2FsbCh0aGlzKTtcclxuXHRcdH1cclxuXHR9XHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL2NvbnN0IGRlYnVnQm91bmRzID0gdGhpcy5pZCsnXFxuJysgKHRoaXMuYm91bmRUbyAmJiBPYmplY3Qua2V5cyh0aGlzLmJvdW5kVG8pLmxlbmd0aCAmJiB0aGlzLmJvdW5kVG8ueCkgKydcXG4nKyAodGhpcy54IHwgMCk7XHJcbiAgICAgICAgLy90aGlzLmRlYnVnKGRlYnVnQm91bmRzKTtcclxuICAgICAgICB0aGlzLmJlaGF2aW91cnMuZm9yRWFjaCgoYmVoYXZpb3VyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXNbYmVoYXZpb3VyLmFjdGlvbl0gJiYgdGhpc1tiZWhhdmlvdXIuYWN0aW9uXS5jYWxsKHRoaXMsIGJlaGF2aW91ci5wYXJhbXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBSTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwiY2xhc3MgRXh0ZW5kZWRTcHJpdGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRle1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlKTtcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wcyB8fCB7IGFuaW1hdGlvbnM6IFtdIH07XHJcbiAgICAgICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzKTtcclxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuICAgICAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUsIDEpO1xyXG4gICAgICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYm9keS5ncmF2aXR5LnkgPSB0aGlzLnByb3BzLmdyYXZpdHk7XHJcbiAgICAgICAgdGhpcy5fZGVidWdUZXh0ID0gdGhpcy5hZGRDaGlsZChcclxuICAgICAgICAgICAgdGhpcy5nYW1lLmFkZC50ZXh0KDIwLCAtMjAsICdkZWJ1ZycsIHsgZm9udDogXCIxMnB4IENvdXJpZXJcIiwgZmlsbDogXCIjZmZmZmZmXCIgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuX2RlYnVnVGV4dC52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcHMuYW5pbWF0aW9ucy5mb3JFYWNoKGFuaW1hdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ubmFtZSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcmFtZXMubWFwKGZyYW1lID0+IGZyYW1lLnRvU3RyaW5nKCkpLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZwcyxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5sb29wXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdhbWVTdGF0ZSA9IHRoaXMuZ2FtZS5zdGF0ZS5zdGF0ZXNbdGhpcy5nYW1lLnN0YXRlLmN1cnJlbnRdLmdhbWVTdGF0ZTtcclxuXHJcbiAgICAgICAgbW9ieC5vYnNlcnZlKGdhbWVTdGF0ZSwgKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlJywgY2hhbmdlLCBnYW1lU3RhdGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gT2JqZWN0LmFzc2lnbih0aGlzLnNwcml0ZVN0YXRlLCBjaGFuZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0hpdHRpbmcoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcHJpdGVTdGF0ZS5oaXQgPiB0aGlzLmdhbWUudGltZS5ub3c7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzU3R1bm5lZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwcml0ZVN0YXRlLnN0dW4gPiB0aGlzLmdhbWUudGltZS5ub3c7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZhY2luZ1JpZ2h0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZhY2luZ0xlZnQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS54IDwgMDtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlTGVmdCgpe1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IC0xO1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS52ZWxvY2l0eS54ID4gLXRoaXMucHJvcHMubWF4U3BlZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAtPSB0aGlzLnByb3BzLmFjY2VsZXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVJpZ2h0KCl7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gMTtcclxuICAgICAgICBpZih0aGlzLmJvZHkudmVsb2NpdHkueCA8IHRoaXMucHJvcHMubWF4U3BlZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCArPSB0aGlzLnByb3BzLmFjY2VsZXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZSgpe1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdtb3ZlJyk7XHJcbiAgICAgICAgaWYodGhpcy5zY2FsZS54ID09PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlUmlnaHQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVMZWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKXtcclxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAvPSAxLjE7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ3N0b3AnKTtcclxuICAgIH1cclxuXHJcbiAgICBqdW1wKCl7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnRvdWNoaW5nLmRvd24gfHwgdGhpcy5ib2R5LmJsb2NrZWQuZG93bil7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55IC09IDMwMDtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ2p1bXAnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGl0KCl7XHJcbiAgICAgICAgY29uc3QgaGl0VW50aWwgPSB0aGlzLmdhbWUudGltZS5ub3cgKyA5MDAsXHJcbiAgICAgICAgICAgIGJyZWFrVW50aWwgPSB0aGlzLmdhbWUudGltZS5ub3cgKyAxMDAwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdOb3cgJXMgSGl0ICVzIEJyZWFrICVzJywgdGhpcy5nYW1lLnRpbWUubm93LCBoaXRVbnRpbCwgYnJlYWtVbnRpbCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgIGhpdDogaGl0VW50aWwsXHJcbiAgICAgICAgICAgIG5vaGl0OiBicmVha1VudGlsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ2hpdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGh1cnQoZGlyZWN0aW9uKXtcclxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSAtPSAxMDA7XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uICYmIGRpcmVjdGlvbi5sZWZ0KXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggLT0gMTAwIHx8IHRoaXMucHJvcHMubWF4U3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRpcmVjdGlvbiAmJiBkaXJlY3Rpb24ucmlnaHQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCArPSAxMDAgfHwgdGhpcy5wcm9wcy5tYXhTcGVlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ2h1cnQnKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWJ1Zyh0ZXh0KXtcclxuICAgICAgIHRoaXMuX2RlYnVnVGV4dC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgIHRoaXMuX2RlYnVnVGV4dC5zY2FsZS54ID0gdGhpcy5zY2FsZS54O1xyXG4gICAgICAgdGhpcy5fZGVidWdUZXh0LnNldFRleHQodGV4dC50b1N0cmluZygpIHx8ICcnKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdbU3ByaXRlXSBzdGF0ZScpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXh0ZW5kZWRTcHJpdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsImltcG9ydCBFeHRlbmRlZFNwcml0ZSBmcm9tICcuL0V4dGVuZGVkU3ByaXRlJztcclxuXHJcbmNsYXNzIEh1bWFuIGV4dGVuZHMgRXh0ZW5kZWRTcHJpdGUge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgICAgICBsaWZlOiAxMCxcclxuICAgICAgICAgICAgc3R1bjogMCxcclxuICAgICAgICAgICAgaGl0OiAwLFxyXG4gICAgICAgICAgICBub2hpdDogMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIdW1hbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0h1bWFuLmpzIiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuL21lbnUuY3JlYXRlJztcclxuLy9pbXBvcnQgdXBkYXRlIGZyb20gJy4vcGxheS51cGRhdGUnO1xyXG5cclxuY2xhc3MgTWVudSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmtleXMgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbk1lbnUucHJvdG90eXBlLmNyZWF0ZSA9IGNyZWF0ZTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWVudTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL21lbnUvaW5kZXguanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9BSSc7XG5pbXBvcnQgSHVtYW4gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9IdW1hbic7XG5cbmltcG9ydCBsZXZlbExvYWRlciBmcm9tICcuLi8uLi9zZXJ2aWNlcy9sZXZlbExvYWRlcic7XG5pbXBvcnQgY3JlYXR1cmVGYWN0b3J5IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NyZWF0dXJlRmFjdG9yeSc7XG5pbXBvcnQgY3JlYXR1cmVDb25maWcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jcmVhdHVyZWNvbmZpZyc7XG5cbmltcG9ydCBpbml0IGZyb20gJy4vcGxheS5pbml0JztcbmltcG9ydCBwcmVsb2FkIGZyb20gJy4vcGxheS5wcmVsb2FkJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLi9wbGF5LmNyZWF0ZSc7XG5pbXBvcnQgdXBkYXRlIGZyb20gJy4vcGxheS51cGRhdGUnO1xuXHJcbmNsYXNzIFBsYXkge1xyXG4gICAgY29uc3RydWN0b3IoZ2xvYmFsQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5rZXlzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZW5lbXkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5sZXZlbCA9IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZExheWVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGdyb3VuZExheWVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHRpbGVtYXA6IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnID0gZ2xvYmFsQ29uZmlnO1xyXG4gICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWcgPSBjcmVhdHVyZUNvbmZpZztcclxuICAgICAgICB0aGlzLmxldmVsTG9hZGVyID0gbGV2ZWxMb2FkZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICB0aGlzLmNyZWF0dXJlRmFjdG9yeSA9IGNyZWF0dXJlRmFjdG9yeS5jYWxsKHRoaXMpO1xyXG4gICAgfVxyXG59XG5cblBsYXkucHJvdG90eXBlLmluaXQgPSBpbml0O1xuUGxheS5wcm90b3R5cGUucHJlbG9hZCA9IHByZWxvYWQ7XHJcblBsYXkucHJvdG90eXBlLmNyZWF0ZSA9IGNyZWF0ZTtcclxuUGxheS5wcm90b3R5cGUudXBkYXRlID0gdXBkYXRlO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9pbmRleC5qcyIsImNvbnN0IGdsb2JhbENvbmZpZyA9IHtcclxuICAgIHdpZHRoOiA1NDYsXHJcbiAgICBoZWlnaHQ6IDM2OCxcclxuICAgIGJsb2NrczogMyxcclxuICAgIGRvbUVsZW1lbnQ6ICdnYW1lJyxcclxuICAgIGJhY2tncm91bmRQYXRoOiAnYmFja2dyb3VuZHMvJyxcclxuICAgIHRpbGVzZXRQYXRoOiAndGlsZXNldHMvJyxcclxuICAgIGxldmVsUGF0aDogJ2xldmVscy8nLFxyXG4gICAgdGV4dHVyZUF0bGFzUGF0aDogJ3Nwcml0ZXNoZWV0cy8nLFxyXG4gICAgdGV4dHVyZUF0bGFzTmFtZTogJ3ByZTJhdGxhcycsXHJcbiAgICB0ZXh0dXJlQXRsYXNJbWFnZTogJ3ByZTJhdGxhcy5wbmcnLFxyXG4gICAgdGV4dHVyZUF0bGFzSnNvbjogJ3ByZTJhdGxhcy5qc29uJ1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2xvYmFsQ29uZmlnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dsb2JhbENvbmZpZy5qcyIsInZhciBjcmVhdHVyZUNvbmZpZ3MgPSB7XHJcbiAgY3JlYXR1cmVEZWZhdWx0czoge1xyXG4gICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgZ3Jhdml0eTogNTAwLFxyXG4gICAgYm91bmNlOiAwLjIsXHJcbiAgICBtYXNzOiAxLFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDEwMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgbGl2ZXM6IDEsXHJcbiAgICBsaWZlc3BhbjogSW5maW5pdHksXHJcbiAgICBzZW5zZTogMTUwLFxyXG4gICAgYW5pbWF0aW9uczogW10sXHJcbiAgICB0aW1lT2Y6IHtcclxuICAgICAgJ21vdmUnOiAyMDAsXHJcbiAgICAgICdoaXQnOiAxMDAsXHJcbiAgICAgICdodXJ0JzogNTAwLFxyXG4gICAgICAnc3RvcCc6IDIwMCxcclxuICAgICAgJ2lkbGUnOiAxMFxyXG4gICAgfSxcclxuICAgIGJvdW5kVG8gOiB7fSxcclxuICAgIGJlaGF2aW91cnM6IFtcclxuICAgICAgICB7IGFjdGlvbjogJ3R1cm5JZkJsb2NrZWQnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdtb3ZlJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnY2hlY2tCb3VuZHMnIH1cclxuICAgIF1cclxuICB9LFxyXG4gIG1hbjoge1xyXG4gICAgdHlwZTogJ21hbicsXHJcbiAgICBtYXhTcGVlZDogMjAwLFxyXG4gICAgbGl2ZXM6IDgsXHJcbiAgICBsaWZlc3BhbjogSW5maW5pdHksXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFsxMSwnMDMnLCcwNScsMTQsMjBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdoaXQnLCBmcmFtZXM6IFsyMiwyNCwyOCwzMSwzNCwyMiwyNCwyOCwzMSwzNF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3RvcCcsIGZyYW1lczogWzQyLDQ1LDQ5LDUyXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzE2LDQxLDQ3LDUwLDUwLDUwLDUwLDUwLDUwLDUwLDUwLDEzLDUwLDEzLDUwLDEzXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI3LDI3LDI3LDI3LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDMwLDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI3LDMwLDI3LDMwLDM1LDM2LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LCcwNycsJzA3JywnMDcnLCcwNycsJzAyJywnMDInXSwgZnBzOiA1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2h1cnQnLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3R1bicsIGZyYW1lczogWzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMTEsJzAzJywnMDUnLDE0LDIwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgZGlubzoge1xyXG4gICAgdHlwZTogJ2Rpbm8nLFxyXG4gICAgbWFzczogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiA1LFxyXG4gICAgYmVoYXZpb3VyczogW1xyXG4gICAgICAgIHsgYWN0aW9uOiAndHVybklmQmxvY2tlZCcgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ21vdmUnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdjaGVja0JvdW5kcycgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ3doZW4nLCBwYXJhbXM6IHsgcHJvYmFiaWxpdHk6IDAuMDEsIGFjdGlvbjogJ2p1bXAnIH0gfVxyXG4gICAgXSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM2MCwzNjAsMzYwLDM2MCwzNjAsMzYwLDM2MCwzNjddLCBmcHM6IDUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM2MCwzNjEsMzY0LDM2NywzNjldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszNjAsMzYxLDM2NCwzNjcsMzY5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdmYWxsJywgZnJhbWVzOiBbMzY5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNzFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzYwLDM2MSwzNjQsMzY3XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBiZWFyOiB7XHJcbiAgICB0eXBlOiAnYmVhcicsXHJcbiAgICBtYXNzOiAxLjIsXHJcbiAgICBtYXhTcGVlZDogNzUsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxNSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMyMV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMjAsMzIxLDMyNF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNjYsMzYzLDM1OCwzMTddLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszMjhdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gICdzdXBlci1iZWFyJzoge1xyXG4gICAgYWNjZWxlcmF0aW9uOiAzMCxcclxuICAgIG1heFNwZWVkOiAyMDAsXHJcbiAgICBpbWFnZTogJ3N1cGVyLWJlYXItc3ByaXRlLXJlZicsIC8vIG92ZXJyaWRlIHNwcml0ZSAoY3JlYXR1cmUgbmFtZSBieSBkZWZhdWx0KVxyXG4gICAgYW5pbWF0aW9uczogW11cclxuICB9LFxyXG4gIHRpZ2VyOiB7XHJcbiAgICB0eXBlOiAndGlnZXInLFxyXG4gICAgbWFzczogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM5MywzOTVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszOTMsMzk1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzk5LDQwMV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2ZhbGwnLCBmcmFtZXM6IFszOTldLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0MDJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzkzLDM5NV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgcHRlcm86IHtcclxuICAgIHR5cGU6ICdwdGVybycsXHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogMTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzcsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzcsNDc3XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFs0MDMsNDA0LDQwNSw0MDMsNDA0LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDA1LDQwMyw0MDQsNDA1LDQwMyw0MDQsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDA1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkZXNjZW5kJywgZnJhbWVzOiBbNDA1XSwgZnBzOiAxNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdhc2NlbmQnLCBmcmFtZXM6IFs0MDMsNDA0LDQwNV0sIGZwczogMTUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDcxXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzQwNSw0MDMsNDA0XSwgZnBzOiAxNSwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBkcmFnb25mbHk6IHtcclxuICAgIHR5cGU6ICdkcmFnb25mbHknLFxyXG4gICAgbWFzczogMC41LFxyXG4gICAgZ3Jhdml0eTogMCxcclxuICAgIGJvdW5jZTogMC4xLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IGZhbHNlLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMzNywzMzhdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMzcsMzM4XSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICd0dXJuJywgZnJhbWVzOiBbMzM5LDM0MF0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzQyXSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzMzNywzMzhdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGJhdDoge1xyXG4gICAgdHlwZTogJ2JhdCcsXHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogMjAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzUxLDM1MiwzNTEsMzUxLDM1MSwzNTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszNTcsMzU5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNjJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzU3LDM1OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgc3BpZGVyOiB7XHJcbiAgICB0eXBlOiAnc3BpZGVyJyxcclxuICAgIG1hc3M6IDAuMyxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMzNV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNjUsMzY4LDM3MCwzNzJdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMjk5LDMwMiwzMDUsMzA5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICd0dXJuJywgZnJhbWVzOiBbMzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdjbGltYicsIGZyYW1lczogWzM0MSwzNDMsMzQ1LDM0N10sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnd2FpdCcsIGZyYW1lczogWzMzMiwzMzUsMzcyXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszMjJdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBuYXRpdmU6IHtcclxuICAgIHR5cGU6ICduYXRpdmUnLFxyXG4gICAgbWF4U3BlZWQ6IDEwMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMjAsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzczXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzczLDM3NiwzNzhdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM4MF0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzczLDM3NiwzNzhdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHBhcnJvdDoge1xyXG4gICAgdHlwZTogJ3BhcnJvdCcsXHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogMTAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM5NCwzOTcsMzk4XSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzk0LDM5NywzOThdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQwMF0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzk0LDM5NywzOThdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGluc2VjdDoge1xyXG4gICAgdHlwZTogJ2luc2VjdCcsXHJcbiAgICBtYXNzOiAxLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyNSxcclxuICAgIGJlaGF2aW91cnM6IFtcclxuICAgICAgICB7IGFjdGlvbjogJ3R1cm5JZkJsb2NrZWQnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdtb3ZlJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnY2hlY2tCb3VuZHMnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICd3aGVuJywgcGFyYW1zOiB7IHByb2JhYmlsaXR5OiAwLjAzLCBhY3Rpb246ICdqdW1wJyB9IH1cclxuICAgIF0sXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNDgsMzQ4LDM0OCwzNDgsMzQ4LDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMjMsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzMyMywzNDgsMzQ5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNDhdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzIzLDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGJ1Zzoge1xyXG4gICAgdHlwZTogJ2J1ZycsXHJcbiAgICBtYXNzOiAxLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyNSxcclxuICAgIGJlaGF2aW91cnM6IFtcclxuICAgICAgICB7IGFjdGlvbjogJ3R1cm5JZkJsb2NrZWQnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdtb3ZlJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnY2hlY2tCb3VuZHMnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICd3aGVuJywgcGFyYW1zOiB7IHByb2JhYmlsaXR5OiAwLjAyLCBhY3Rpb246ICdqdW1wJyB9IH1cclxuICAgIF0sXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM0NCwzNDZdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNDRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgZnJvZzoge1xyXG4gICAgdHlwZTogJ2Zyb2cnLFxyXG4gICAgbWFzczogMSxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEuNSxcclxuICAgIGp1bXBpbmc6IDUwMCxcclxuICAgIG1heFNwZWVkOiA4MCxcclxuICAgIGFjY2VsZXJhdGlvbjogNDAsXHJcbiAgICBiZWhhdmlvdXJzOiBbXHJcbiAgICAgICAgeyBhY3Rpb246ICd0dXJuSWZCbG9ja2VkJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnbW92ZScgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ2NoZWNrQm91bmRzJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnd2hlbicsIHBhcmFtczogeyBwcm9iYWJpbGl0eTogMC4xLCBhY3Rpb246ICdqdW1wJyB9IH1cclxuICAgIF0sXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszMjVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMjUsMzI3LDMzMSwzMjVdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzI1LDMyNywzMzEsMzI1XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzM0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzMyNSwzMjcsMzMxLDMyNV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHR1cnRsZToge1xyXG4gICAgdHlwZTogJ3R1cnRsZScsXHJcbiAgICBtYXNzOiAyLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDAuMyxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszOTBdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzc3LDM4MSwzODQsMzg1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzg3LDM4OSwzOTAsMzkxXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszOTJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGplbGx5OiB7XHJcbiAgICB0eXBlOiAnamVsbHknLFxyXG4gICAgbWFzczogMixcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAxLFxyXG4gICAgbWF4U3BlZWQ6IDUsXHJcbiAgICBhY2NlbGVyYXRpb246IDEsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBnb3JpbGxhOiB7XHJcbiAgICB0eXBlOiAnZ29yaWxsYScsXHJcbiAgICBtYXNzOiA1LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZmFsbCcsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH1cclxufTtcclxuXHJcbmZvcih2YXIgY3JlYXR1cmUgaW4gY3JlYXR1cmVDb25maWdzKXtcclxuICAvL2NyZWF0dXJlQ29uZmlnc1tjcmVhdHVyZV0gPSBfLm1lcmdlKHt9LCBjb25maWdzLmNyZWF0dXJlRGVmYXVsdHMsIGNvbmZpZ3NbY3JlYXR1cmVdKTtcclxuICB2YXIgZGVmYXVsdHMgPSBjcmVhdHVyZUNvbmZpZ3NbJ2NyZWF0dXJlRGVmYXVsdHMnXTtcclxuICBmb3IodmFyIHByb3AgaW4gZGVmYXVsdHMpe1xyXG4gICAgaWYoY3JlYXR1cmVDb25maWdzW2NyZWF0dXJlXVtwcm9wXSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgY3JlYXR1cmVDb25maWdzW2NyZWF0dXJlXVtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdHVyZUNvbmZpZ3M7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZWNvbmZpZy5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBCYXQgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmF0LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEJlYXIgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCZWFyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2JlYXIuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgQnVnIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnVnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBEaW5vIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGlubztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9kaW5vLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIERyYWdvbmZseSBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERyYWdvbmZseTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9kcmFnb25mbHkuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgRnJvZyBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZyb2c7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZnJvZy5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBHb3JpbGxhIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR29yaWxsYTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9nb3JpbGxhLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEluc2VjdCBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEluc2VjdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9pbnNlY3QuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgSmVsbHkgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBKZWxseTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9qZWxseS5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBOYXRpdmUgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOYXRpdmU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvbmF0aXZlLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIFBhcnJvdCBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhcnJvdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9wYXJyb3QuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgUHRlcm8gZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQdGVybztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9wdGVyby5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBTcGlkZXIgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcGlkZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvc3BpZGVyLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIFRpZ2VyIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGlnZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvdGlnZXIuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgVHVydGxlIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVHVydGxlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyIsImZ1bmN0aW9uIGNyZWF0ZSgpe1xyXG5cclxuICAgIC8vIGZwcyBkZWJ1Z2dpbmdcclxuICAgIHRoaXMuZ2FtZS50aW1lLmFkdmFuY2VkVGltaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBDVEEgdGV4dFxyXG4gICAgY29uc3QgdGV4dCA9IHRoaXMuZ2FtZS5hZGQudGV4dChcclxuICAgICAgICB0aGlzLmdhbWUud2lkdGggLyAyLFxyXG4gICAgICAgIHRoaXMuZ2FtZS5oZWlnaHQgLyAyLFxyXG4gICAgICAgIFwiQ2hvb3NlIGEgbGV2ZWwhXFxuMSAyIDMgNCA1IDYgXFxuT3IgcHJlc3MgYSBrZXkgdG8gZ2VuZXJhdGUhXCIsXHJcbiAgICAgICAgeyBmb250OiBcIjI0cHggQ291cmllclwiLCBmaWxsOiBcIiNmZmZmZmZcIiwgYWxpZ246IFwiY2VudGVyXCIgfVxyXG4gICAgKTtcclxuXHJcbiAgICB0ZXh0LmFuY2hvci5zZXQoMC41KTtcclxuXHJcbiAgICB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQub25Eb3duQ2FsbGJhY2sgPSAoZSkgPT4ge1xyXG4gICAgICAgIC8vIGlmIHByZXNzZWQga2V5IGlzIG51bWJlciAoc3BhY2UgaXMgZW1wdHkgc3RyaW5nIHdoaWNoIGV2YWx1YXRlcyB0cnVlKVxyXG4gICAgICAgIGlmKCFpc05hTihlLmtleSkgJiYgL1teXFxzXS8udGVzdChlLmtleSkpe1xyXG4gICAgICAgICAgICBmZXRjaCgnL2xldmVsLycgKyBlLmtleSwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xyXG4gICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgfSkudGhlbigobGV2ZWxDb25maWcpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnUGxheScsIHRydWUsIHRydWUsIGxldmVsQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5vbkRvd25DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnUGxheScsIHRydWUsIHRydWUsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5vbkRvd25DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW01lbnVdW0NyZWF0ZV0nKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvbWVudS9tZW51LmNyZWF0ZS5qcyIsImltcG9ydCBIdW1hbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL0h1bWFuJztcclxuaW1wb3J0IEFJIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQUknO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlKCl7XHJcbiAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtDcmVhdGVdJyk7XHJcbiAgICAvLyBmcHMgZGVidWdnaW5nXHJcbiAgICB0aGlzLmdhbWUudGltZS5hZHZhbmNlZFRpbWluZyA9IHRydWU7XHJcblxyXG4gICAgLy8gW1NFVCBMRVZFTF0gc2V0IGRpbWVuc2lvbnMsIHN0YXJ0IHBoeXNpYyBzeXN0ZW1cclxuICAgIHRoaXMuZ2FtZS53b3JsZC5zZXRCb3VuZHMoXHJcbiAgICAgICAgMCxcclxuICAgICAgICAwLFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLndpZHRoICogdGhpcy5nbG9iYWxDb25maWcuYmxvY2tzLFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLmhlaWdodFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG5cclxuICAgIHRoaXMubGV2ZWxMb2FkZXIuY3JlYXRlQmFja2dyb3VuZCgnYmFja2dyb3VuZExheWVyJyk7XHJcbiAgICB0aGlzLmxldmVsTG9hZGVyLmNyZWF0ZVRpbGVzKFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcudGlsZW1hcCxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXQsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy50aWxlc2V0SW1hZ2VcclxuICAgICk7XHJcbiAgICB0aGlzLmxldmVsTG9hZGVyLmNyZWF0ZUxheWVycyh0aGlzLmxldmVsQ29uZmlnLmxheWVycyk7XHJcblxyXG4gICAgLy8gW1NFVCBMRVZFTF0gZml4IGJhY2tncm91bmQsIHJlc2l6ZVxyXG4gICAgdGhpcy5sZXZlbC5iYWNrZ3JvdW5kTGF5ZXIuZml4ZWRUb0NhbWVyYSA9IHRoaXMubGV2ZWxDb25maWcuZml4ZWRCYWNrZ3JvdW5kO1xyXG4gICAgdGhpcy5sZXZlbC5ncm91bmRMYXllci5yZXNpemVXb3JsZCgpO1xyXG5cclxuICAgIHRoaXMuZ2FtZVN0YXRlID0gbW9ieC5vYnNlcnZhYmxlKHtcclxuICAgICAgICBpbml0aWFsaXNlZDogZmFsc2UsXHJcbiAgICAgICAgc2NvcmU6IDBcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudXBkYXRlU3RhdGUgPSBtb2J4LmFjdGlvbigoY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2FtZVN0YXRlLCBjaGFuZ2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbW9ieC5vYnNlcnZlKHRoaXMuZ2FtZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbZ2FtZVN0YXRlXSBjaGFuZ2UnLCBjaGFuZ2UsIHRoaXMuZ2FtZVN0YXRlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudXBkYXRlU3RhdGUoeyBpbml0aWFsaXNlZDogdHJ1ZSB9KTtcclxuXHJcbiAgICAvLyBbUExBWUVSXVxyXG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgSHVtYW4oXHJcbiAgICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcuZW50cnlQb2ludC54LFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcuZW50cnlQb2ludC55LFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLnRleHR1cmVBdGxhc05hbWUsXHJcbiAgICAgICAgdGhpcy5jcmVhdHVyZUNvbmZpZy5tYW5cclxuICAgICk7XHJcblxyXG4gICAgLy8gW0VORU1JRVNdXHJcbiAgICB0aGlzLmVuZW1pZXMgPSBuZXcgUGhhc2VyLkdyb3VwKHRoaXMuZ2FtZSk7XHJcbiAgICB0aGlzLmxldmVsQ29uZmlnLmVuZW1pZXMuZm9yRWFjaCh0aGlzLmNyZWF0dXJlRmFjdG9yeS5jcmVhdGUpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcclxuXHJcbiAgICAvLyBiaW5kIGtleXNcclxuICAgIHRoaXMua2V5cyA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XHJcbiAgICB0aGlzLmtleXMuc3BhY2UgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TUEFDRUJBUik7XHJcblxyXG4gICAgLy8gc2NvcmUgdGV4dFxyXG4gICAgdGhpcy5tZW51ID0gdGhpcy5nYW1lLmFkZC50ZXh0KFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLndpZHRoIC0gMTIwLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgXCJMaWZlOiBcIiArIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUsXHJcbiAgICAgICAgeyBmb250OiBcIjI0cHggQ291cmllclwiLCBmaWxsOiBcIiNmZmZcIiwgYWxpZ246IFwiY2VudGVyXCIgfVxyXG4gICAgKTtcclxuICAgIHRoaXMubWVudS5maXhlZFRvQ2FtZXJhID0gdHJ1ZTtcclxuICAgIG1vYngub2JzZXJ2ZSh0aGlzLnBsYXllci5zcHJpdGVTdGF0ZSwgY2hhbmdlID0+IHtcclxuICAgICAgICB0aGlzLm1lbnUuc2V0VGV4dChcIkxpZmU6IFwiICsgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5jcmVhdGUuanMiLCJpbXBvcnQgbGV2ZWxHZW5lcmF0b3IgZnJvbSAnLi4vLi4vc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvaW5kZXgnO1xyXG5cclxuZnVuY3Rpb24gaW5pdChsZXZlbENvbmZpZyl7XHJcbiAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtJbml0XScsIGxldmVsQ29uZmlnKTtcclxuICAgIHRoaXMubGV2ZWxDb25maWcgPSBsZXZlbENvbmZpZyB8fCBsZXZlbEdlbmVyYXRvci5jcmVhdGUoKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGluaXQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuaW5pdC5qcyIsImZ1bmN0aW9uIHByZWxvYWQoKXtcclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW1ByZWxvYWRdJyk7XHJcblxyXG4gICAgLy8gLS0tLS0tISBGUFMga2lsbGVyOiBwZXJmb3JtYW5jZSBkcm9wIG9uIHNjYWxpbmcgdXAgbW9yZSB0aGFuIDEuNnhcclxuICAgIHRoaXMuZ2FtZS5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xyXG4gICAgdGhpcy5nYW1lLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XHJcbiAgICB0aGlzLmdhbWUuc2NhbGUucGFnZUFsaWduVmVydGljYWxseSA9IHRydWU7XHJcbiAgICB0aGlzLnNjYWxlLnNldE1pbk1heCgwLCAwLCB0aGlzLmdsb2JhbENvbmZpZy53aWR0aCAqIDEuNiwgdGhpcy5nbG9iYWxDb25maWcuaGVpZ2h0ICogMS42KTtcclxuICAgIC8vIC0tLS0tLSFcclxuXHJcbiAgICAvLyBhc3NldHMgdG8gbG9hZCByZWxhdGl2ZSB0byAvYXNzZXRzLy4uXHJcbiAgICB0aGlzLmdhbWUubG9hZC5hdGxhcyhcclxuICAgICAgICAncHJlMmF0bGFzJyxcclxuICAgICAgICAnc3ByaXRlc2hlZXRzL3ByZTJhdGxhcy5wbmcnLFxyXG4gICAgICAgICdzcHJpdGVzaGVldHMvcHJlMmF0bGFzLmpzb24nLFxyXG4gICAgICAgIFBoYXNlci5Mb2FkZXIuVEVYVFVSRV9BVExBU19KU09OX0hBU0hcclxuICAgICk7XHJcblxyXG4gICAgLy8gbG9hZCBiYWNrZ3JvdW5kXHJcbiAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSh0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRLZXksIHRoaXMuZ2xvYmFsQ29uZmlnLmJhY2tncm91bmRQYXRoICsgdGhpcy5sZXZlbENvbmZpZy5iYWNrZ3JvdW5kSW1hZ2UgKyB0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRJbWFnZUV4dGVuc2lvbik7XHJcbiAgICAvLyBsb2FkIHRpbGVzZXRcclxuICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKHRoaXMubGV2ZWxDb25maWcudGlsZXNldCwgdGhpcy5nbG9iYWxDb25maWcudGlsZXNldFBhdGggKyB0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXRJbWFnZSArIHRoaXMubGV2ZWxDb25maWcudGlsZXNldEltYWdlRXh0ZW5zaW9uKTtcclxuICAgIC8vIGxvYWQgdGlsZW1hcFxyXG4gICAgaWYodHlwZW9mIHRoaXMubGV2ZWxDb25maWcudGlsZWRKc29uID09PSAnc3RyaW5nJyl7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQudGlsZW1hcCh0aGlzLmxldmVsQ29uZmlnLnRpbGVtYXAsIHRoaXMuZ2xvYmFsQ29uZmlnLmxldmVsUGF0aCArIHRoaXMubGV2ZWxDb25maWcudGlsZWRKc29uLCBudWxsLCBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQudGlsZW1hcCh0aGlzLmxldmVsQ29uZmlnLnRpbGVtYXAsIG51bGwsIHRoaXMubGV2ZWxDb25maWcudGlsZWRKc29uLCBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmVsb2FkO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnByZWxvYWQuanMiLCJmdW5jdGlvbiB1cGRhdGUoKXtcclxuICAgIC8vY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bVXBkYXRlXScpO1xyXG4gICAgLy8gZnBzXHJcbiAgICB0aGlzLmdhbWUuZGVidWcudGV4dCh0aGlzLmdhbWUudGltZS5mcHMsIDUsIDIwKTtcclxuXHJcbiAgICAvLyBjb2xsaWRlXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5sZXZlbC5jb2xsaXNpb25MYXllcik7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5lbmVtaWVzLCB0aGlzLmxldmVsLmNvbGxpc2lvbkxheWVyKTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5sZXZlbC5kZWF0aExheWVyLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0RFQUQhJyk7XHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdNZW51JywgdHJ1ZSwgdHJ1ZSwgdW5kZWZpbmVkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMucGxheWVyLCB0aGlzLmVuZW1pZXMsIChwbGF5ZXIsIGVuZW15KSA9PiB7XHJcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIuYm9keS50b3VjaGluZy5kb3duICYmIGVuZW15LmJvZHkudG91Y2hpbmcudXApe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLnBsYXllci5pc0hpdHRpbmcgJiYgIXRoaXMucGxheWVyLmlzU3R1bm5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGxpZmU6IHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUgLSAxLFxyXG4gICAgICAgICAgICAgICAgc3R1bjogdGhpcy5nYW1lLnRpbWUubm93ICsgMTUwMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaHVydChlbmVteS5ib2R5LnRvdWNoaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBtb3ZlXHJcbiAgICBvbktleVByZXNzLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uS2V5UHJlc3MoKXtcclxuICAgIC8vIHN0dW4gPT4gYmxvY2tlZFxyXG4gICAgaWYodGhpcy5wbGF5ZXIuaXNTdHVubmVkKXtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3N0dW4nKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbW92ZSBsZWZ0IC8gcmlnaHRcclxuICAgIGlmKHRoaXMua2V5cy5sZWZ0LmlzRG93bil7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZUxlZnQoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgIH0gZWxzZSBpZih0aGlzLmtleXMucmlnaHQuaXNEb3duKXtcclxuICAgICAgICB0aGlzLnBsYXllci5tb3ZlUmlnaHQoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnaWRsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGp1bXBcclxuICAgIGlmKHRoaXMua2V5cy51cC5pc0Rvd24pe1xyXG4gICAgICAgIHRoaXMucGxheWVyLmp1bXAoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2p1bXAnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBoaXRcclxuICAgIGlmKHRoaXMua2V5cy5zcGFjZS5pc0Rvd24pe1xyXG4gICAgICAgIGlmKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLm5vaGl0IDwgdGhpcy5nYW1lLnRpbWUubm93ICYmIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmhpdCA8IHRoaXMuZ2FtZS50aW1lLm5vdyl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmhpdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2hpdCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnVwZGF0ZS5qcyIsImltcG9ydCBnbG9iYWxDb25maWcgZnJvbSAnLi9nbG9iYWxDb25maWcuanMnO1xyXG5pbXBvcnQgTWVudSBmcm9tICcuL2dhbWVzdGF0ZXMvbWVudS9pbmRleC5qcyc7XHJcbmltcG9ydCBQbGF5IGZyb20gJy4vZ2FtZXN0YXRlcy9wbGF5L2luZGV4LmpzJztcclxuXHJcbi8vIGluc3RhbnRpYXRlIGEgUGhhc2VyLkdhbWVcclxuY29uc3QgUExBVEZPUk1FUiA9IG5ldyBQaGFzZXIuR2FtZShcclxuICAgIGdsb2JhbENvbmZpZy53aWR0aCxcclxuICAgIGdsb2JhbENvbmZpZy5oZWlnaHQsXHJcbiAgICBQaGFzZXIuQVVUTyxcclxuICAgIGdsb2JhbENvbmZpZy5kb21FbGVtZW50XHJcbik7XHJcblxyXG4vLyByZWdpc3RlciBnYW1lc3RhdGVzICh3aWxsIGJlIGluc3RhbnRpYXRlZCB3LyB0aGlzLmdhbWUgYXMgMXN0IHBhcmFtLCBwYXNzIGdhbWVDb25maWcgYXMgMm5kKVxyXG5QTEFURk9STUVSLnN0YXRlLmFkZCgnTWVudScsIE1lbnUuYmluZChudWxsLCBnbG9iYWxDb25maWcpKTtcclxuUExBVEZPUk1FUi5zdGF0ZS5hZGQoJ1BsYXknLCBQbGF5LmJpbmQobnVsbCwgZ2xvYmFsQ29uZmlnKSk7XHJcblxyXG5QTEFURk9STUVSLnN0YXRlLnN0YXJ0KCdNZW51JywgdHJ1ZSwgdHJ1ZSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvaW5kZXguanMiLCJpbXBvcnQgYmF0IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2JhdC5qcyc7XHJcbmltcG9ydCBiZWFyIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2JlYXIuanMnO1xyXG5pbXBvcnQgYnVnIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyc7XHJcbmltcG9ydCBkaW5vIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Rpbm8uanMnO1xyXG5pbXBvcnQgZHJhZ29uZmx5IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2RyYWdvbmZseS5qcyc7XHJcbmltcG9ydCBmcm9nIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Zyb2cuanMnO1xyXG5pbXBvcnQgZ29yaWxsYSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9nb3JpbGxhLmpzJztcclxuaW1wb3J0IGluc2VjdCBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9pbnNlY3QuanMnO1xyXG5pbXBvcnQgamVsbHkgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvamVsbHkuanMnO1xyXG5pbXBvcnQgbmF0aXZlIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL25hdGl2ZS5qcyc7XHJcbmltcG9ydCBwYXJyb3QgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvcGFycm90LmpzJztcclxuaW1wb3J0IHB0ZXJvIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL3B0ZXJvLmpzJztcclxuaW1wb3J0IHNwaWRlciBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9zcGlkZXIuanMnO1xyXG5pbXBvcnQgdGlnZXIgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvdGlnZXIuanMnO1xyXG5pbXBvcnQgdHVydGxlIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyc7XHJcblxyXG5pbXBvcnQgQUkgZnJvbSAnLi4vY29tcG9uZW50cy9BSSc7XHJcblxyXG5mdW5jdGlvbiBjcmVhdHVyZUZhY3RvcnkoKSB7XHJcbiAgICBjb25zdCBDcmVhdHVyZSA9IHtcclxuICAgICAgICBiYXQ6IGJhdCxcclxuICAgICAgICBiZWFyOiBiZWFyLFxyXG4gICAgICAgIGJ1ZzogYnVnLFxyXG4gICAgICAgIGRpbm86IGRpbm8sXHJcbiAgICAgICAgZHJhZ29uZmx5OiBkcmFnb25mbHksXHJcbiAgICAgICAgZnJvZzogZnJvZyxcclxuICAgICAgICBnb3JpbGxhOiBnb3JpbGxhLFxyXG4gICAgICAgIGluc2VjdDogaW5zZWN0LFxyXG4gICAgICAgIGplbGx5OiBqZWxseSxcclxuICAgICAgICBuYXRpdmU6IG5hdGl2ZSxcclxuICAgICAgICBwYXJyb3Q6IHBhcnJvdCxcclxuICAgICAgICBwdGVybzogcHRlcm8sXHJcbiAgICAgICAgc3BpZGVyOiBzcGlkZXIsXHJcbiAgICAgICAgdGlnZXI6IHRpZ2VyLFxyXG4gICAgICAgIHR1cnRsZTogdHVydGxlXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlOiAobGV2ZWxDb25maWcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZW5lbXkgPSBuZXcgQUkoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgICAgICAgICBsZXZlbENvbmZpZy5vcmlnaW4ueCxcclxuICAgICAgICAgICAgICAgIGxldmVsQ29uZmlnLm9yaWdpbi55LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxDb25maWcudGV4dHVyZUF0bGFzTmFtZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWdbbGV2ZWxDb25maWcudHlwZV0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0dXJlQ29uZmlnW2xldmVsQ29uZmlnLnR5cGVdLmJlaGF2aW91cnNcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgZW5lbXkuc2V0Qm91bmRzKGxldmVsQ29uZmlnLmJvdW5kVG8pO1xyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMuYWRkKGVuZW15KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXR1cmVGYWN0b3J5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2NyZWF0dXJlRmFjdG9yeS5qcyIsImltcG9ydCBMZXZlbEJ1aWxkZXIgZnJvbSAnLi9sZXZlbEJ1aWxkZXInO1xyXG5pbXBvcnQgbGV2ZWxDb25maWcgZnJvbSAnLi9tb2RlbHMvbGV2ZWxDb25maWcnO1xyXG5cclxuY29uc3QgbGV2ZWxHZW5lcmF0b3IgPSB7XHJcbiAgICBjcmVhdGUoKXtcclxuICAgICAgICBjb25zdCBsZXZlbEJ1aWxkZXIgPSBuZXcgTGV2ZWxCdWlsZGVyKGxldmVsQ29uZmlnKTtcclxuICAgICAgICByZXR1cm4gbGV2ZWxCdWlsZGVyXHJcbiAgICAgICAgICAgIC5jcmVhdGVMYXllcnMoMzQgKiAzLCAyMyAqIDEwKVxyXG4gICAgICAgICAgICAucmFuZG9tQmFja2dyb3VuZCgpXHJcbiAgICAgICAgICAgIC5idWlsZCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGV2ZWxHZW5lcmF0b3I7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvaW5kZXguanMiLCJpbXBvcnQge1xyXG4gICAgZmxhdHRlbixcclxuICAgIGFwcGx5TWF0cml4LFxyXG4gICAgY3JlYXRlTWF0cml4LFxyXG4gICAgbGF5ZXJUb01hdHJpeCxcclxuICAgIGNoZWNrSWZBcmVhSXNDb3ZlcmVkXHJcbn0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7XHJcbiAgICBncm91bmRMYXllcixcclxuICAgIGNvbGxpc2lvbkxheWVyLFxyXG4gICAgZGVhdGhMYXllclxyXG59IGZyb20gJy4vbW9kZWxzL2xheWVycyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgY29sdW1uLFxyXG4gICAgc25vd2JhbGxcclxufSBmcm9tICcuL21vZGVscy9pc2xhbmRzJztcclxuXHJcbmltcG9ydCBiYWNrZ3JvdW5kcyBmcm9tICcuL21vZGVscy9iYWNrZ3JvdW5kcyc7XHJcblxyXG4vLyB3aXRoIGZyZXF1ZW5jeVxyXG5jb25zdCBlbmVteVR5cGVzID0gW1xyXG4gICAgJ2JhdCcsICdiYXQnLCAnYmF0JywgJ2JhdCcsXHJcbiAgICAnYmVhcicsICdiZWFyJywgJ2JlYXInLCAnYmVhcicsICdiZWFyJywgJ2JlYXInLFxyXG4gICAgJ2J1ZycsXHJcbiAgICAnZGlubycsXHJcbiAgICAnZHJhZ29uZmx5JywgJ2RyYWdvbmZseScsICdkcmFnb25mbHknLCAnZHJhZ29uZmx5JywgJ2RyYWdvbmZseScsXHJcbiAgICAnZnJvZycsXHJcbiAgICAnaW5zZWN0JyxcclxuICAgICdqZWxseScsXHJcbiAgICAnbmF0aXZlJywgJ25hdGl2ZScsICduYXRpdmUnLCAnbmF0aXZlJywgJ25hdGl2ZScsXHJcbiAgICAncGFycm90JyxcclxuICAgICdwdGVybycsXHJcbiAgICAnc3BpZGVyJywgJ3NwaWRlcicsICdzcGlkZXInLCAnc3BpZGVyJyxcclxuICAgICd0aWdlcicsXHJcbiAgICAndHVydGxlJ1xyXG5dO1xyXG5cclxuY29uc3QgZmluZFBsYWNlc0ZvciA9IChhTWF0cml4LCBpdGVtcywgcmV0cnkpID0+IHtcclxuICAgIGxldCBtYXRyaXggPSBhTWF0cml4LnNsaWNlKDApO1xyXG4gICAgbGV0IGVuZW1pZXMgPSBbXTtcclxuICAgIHdoaWxlKHJldHJ5LS0pe1xyXG4gICAgICAgIGxldCBpdGVtID0gaXRlbXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaXRlbXMubGVuZ3RoKV0sXHJcbiAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF0cml4WzBdLmxlbmd0aCAtIGl0ZW1bMF0ubGVuZ3RoKSksXHJcbiAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF0cml4Lmxlbmd0aCAtIGl0ZW0ubGVuZ3RoKSk7XHJcbiAgICAgICAgaWYoY2hlY2tJZkFyZWFJc0NvdmVyZWQobWF0cml4LCB4LCB5LCBpdGVtWzBdLmxlbmd0aCwgaXRlbS5sZW5ndGgpKXtcclxuICAgICAgICAgICAgZW5lbWllcy5wdXNoKFt4LCB5LCBpdGVtWzBdLmxlbmd0aF0pO1xyXG4gICAgICAgICAgICBhcHBseU1hdHJpeChtYXRyaXgsIGl0ZW0sIHgsIHkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZW5lbWllczogZW5lbWllcyxcclxuICAgICAgICBpc2xhbmRzOiBtYXRyaXhcclxuICAgIH07XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVFbmVteUF0ID0gKHhUaWxlLCB5VGlsZSwgdGlsZXNXaWR0aCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuXHRcdFwidHlwZVwiOiBlbmVteVR5cGVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVuZW15VHlwZXMubGVuZ3RoKV0sXHJcblx0XHRcIm51bWJlclwiOiAxLFxyXG5cdFx0XCJsaWZlc3BhblwiOiBJbmZpbml0eSxcclxuXHRcdFwib3JpZ2luXCI6IHtcclxuXHRcdFx0XCJ4XCI6ICh4VGlsZSArIHRpbGVzV2lkdGggLyAyKSAqIDE2LFxyXG5cdFx0XHRcInlcIjogeVRpbGUgKiAxNlxyXG5cdFx0fSxcclxuXHRcdFwiYm91bmRUb1wiOiB7XHJcblx0XHRcdFwieDFcIjogeFRpbGUgKiAxNixcclxuXHRcdFx0XCJ4MlwiOiAoeFRpbGUgKyB0aWxlc1dpZHRoKSAqIDE2XHJcblx0XHR9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuY29uc3QgZ2V0Q29sbGlzaW9uTGF5ZXIgPSAoZmxhdE1hdHJpeCwgY29sbGlzaW9uVGlsZXMpID0+IHtcclxuICAgIGxldCBtYXRyaXggPSBmbGF0TWF0cml4LnNsaWNlKDApLm1hcCgodGlsZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBjb2xsaXNpb25UaWxlcy5pbmRleE9mKHRpbGUpID4gLTFcclxuICAgICAgICAgICAgPyB0aWxlXHJcbiAgICAgICAgICAgIDogMDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hdHJpeDtcclxufTtcclxuXHJcbmNvbnN0IGlzbGFuZHMgPSBbXHJcbiAgICBbWzAsMCwwLDBdLFswLDc3LDc4LDBdLFswLDkxLDkyLDBdLFswLDAsMCwwXV0sXHJcbiAgICBbWzAsIDAsIDAsIDBdLCBbNzcsIDExMSwgMTExLCA3OF0sIFs5MSwgMTMwLCAxMzAsIDkyXSwgWzAsIDAsIDAsIDBdXSxcclxuICAgIFtbMCwgMCwgMCwgMCwgMCwgMCwgMF0sIFs3NywgMTExLCAxMTEsIDE0MiwgMTExLCAxNDIsIDc4XSwgWzkxLCAxMzAsIDEzMCwgMTQ0LCAxMzAsIDE0NCwgOTJdLCBbMCwgMCwgMCwgMCwgMCwgMCwgMF1dLFxyXG4gICAgW1swLCAwLCAwLCAwXSwgWzAsIDE4LCAxOSwgMTZdLCBbMTUsIDc5LCAyMywgNTJdLCBbNTgsIDkzLCAzOSwgMzRdLCBbMTEyLCAxMTMsIDM0LCA4M10sIFs3NywgMTExLCAxMTEsIDc4XSwgWzkxLCAxMzAsIDEzMCwgOTJdLCBbMCwgMCwgMCwgMF1dLFxyXG4gICAgW1swLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxbMCw3NywxMTEsNzgsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFswLDkxLDEzMCw5MiwwLDAsMCw3NywxMTEsNzgsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDkxLDEzMCw5MiwwLDAsMCw3Nyw3OCwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCw5MSw5MiwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF1dLFxyXG4gICAgW1swLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsNjQsMF0sWzAsMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDY0LDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCw2NCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDAsMF0sWzAsNjQsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwXV0sXHJcbiAgICBbWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsNzcsMTExLDc4LDBdLFswLDAsMCwwLDAsMCwwLDc3LDc4LDAsMCwwLDAsOTEsMTMwLDkyLDBdLFswLDc3LDExMSw3OCwwLDAsMCw5MSw5Miw3Nyw3OCwwLDAsMCwwLDAsMF0sWzAsOTEsMTMwLDkyLDAsMCwwLDAsMCw5MSw5MiwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF1dLFxyXG4gICAgY29sdW1uLFxyXG4gICAgW1swLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsOTgsOTksMjQzLDEwMCwxMDUsOTcsNjQsOTcsOTcsNjQsOTcsNjQsOTcsOTgsOTksMTAwLDEwNCwxMDQsMTA1LDBdLFswLDEyMiwxMjcsMTI2LDIwNiwwLDAsMCwwLDAsMCwwLDAsMCwyNDUsMTI3LDEyNSwxMjYsMTI3LDAsMF0sWzAsMCwyNjg0MzU0NjgxLDI2ODQzNTQ1OTEsMCwwLDAsMCwwLDAsMCwwLDAsMCwyMzAsMjE2LDIzMCwyMzAsMjE2LDAsMF1dLFxyXG4gICAgc25vd2JhbGxcclxuXTtcclxuY29uc3QgY29sbGlzaW9uVGlsZXMgPSBbMjQsNjQsNzcsNzgsOTEsOTIsOTcsOTgsOTksMTAwLDEwNCwxMDUsMTExLDEyMywxMjQsMTI1LDEyNiwxMjcsMTMwLDE2NywxODAsMTk1LDE5NywyMDQsMjA1LDIwNiwyMDcsMjA4LDIyOSwyNDNdO1xyXG5cclxudmFyIExldmVsQnVpbGRlciA9IGZ1bmN0aW9uKGxldmVsQ29uZmlnKXtcclxuICAgIGxldCBsZXZlbCA9IGxldmVsQ29uZmlnO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGVMYXllcnModGlsZXNXaWR0aCwgdGlsZXNIZWlnaHQpe1xuICAgICAgICAgICAgLy8gMTAwOiByYXJlLCA0MDogZnJlcXVlbnRcbiAgICAgICAgICAgIGNvbnN0IGRlbnNpdHkgPSAxMDAsXG4gICAgICAgICAgICAgICAgcmV0cnkgPSBNYXRoLmZsb29yKCh0aWxlc1dpZHRoICogdGlsZXNIZWlnaHQpIC8gZGVuc2l0eSk7XG4gICAgICAgICAgICBjb25zdCBwbGFjZXNGb3IgPSBmaW5kUGxhY2VzRm9yKGNyZWF0ZU1hdHJpeCh0aWxlc0hlaWdodCwgdGlsZXNXaWR0aCwgMCksIGlzbGFuZHMsIHJldHJ5KTtcblxuICAgICAgICAgICAgbGV2ZWwuZW5lbWllcyA9IHBsYWNlc0Zvci5lbmVtaWVzLm1hcChlbmVteSA9PiBjcmVhdGVFbmVteUF0LmFwcGx5KG51bGwsIGVuZW15KSk7XG5cbiAgICAgICAgICAgIGdyb3VuZExheWVyLmRhdGEgPSBmbGF0dGVuKHBsYWNlc0Zvci5pc2xhbmRzKTtcbiAgICAgICAgICAgIGNvbGxpc2lvbkxheWVyLmRhdGEgPSBnZXRDb2xsaXNpb25MYXllcihncm91bmRMYXllci5kYXRhLCBjb2xsaXNpb25UaWxlcyk7XG4gICAgICAgICAgICBkZWF0aExheWVyLmRhdGEgPSBncm91bmRMYXllci5kYXRhLm1hcCh0aWxlID0+IDApO1xuXHJcbiAgICAgICAgICAgIGxldmVsLnRpbGVkSnNvbi53aWR0aCA9IHRpbGVzV2lkdGg7XHJcbiAgICAgICAgICAgIGxldmVsLnRpbGVkSnNvbi5oZWlnaHQgPSB0aWxlc0hlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGdyb3VuZExheWVyLndpZHRoID0gdGlsZXNXaWR0aDtcclxuICAgICAgICAgICAgZ3JvdW5kTGF5ZXIuaGVpZ2h0ID0gdGlsZXNIZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbGxpc2lvbkxheWVyLndpZHRoID0gdGlsZXNXaWR0aDtcclxuICAgICAgICAgICAgY29sbGlzaW9uTGF5ZXIuaGVpZ2h0ID0gdGlsZXNIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBsZXZlbC53aWR0aCA9IHRpbGVzV2lkdGggKiAxNjtcclxuICAgICAgICAgICAgbGV2ZWwuaGVpZ2h0ID0gdGlsZXNIZWlnaHQgKiAxNjtcclxuXHJcbiAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgIC8vIDE5NSA9IHNwaWtlXHJcbiAgICAgICAgICAgICAgICBncm91bmRMYXllci5kYXRhW2dyb3VuZExheWVyLmRhdGEubGVuZ3RoIC0gdGlsZXNXaWR0aF0gPSAxOTU7XHJcbiAgICAgICAgICAgICAgICBkZWF0aExheWVyLmRhdGFbZGVhdGhMYXllci5kYXRhLmxlbmd0aCAtIHRpbGVzV2lkdGhdID0gMTk1O1xyXG4gICAgICAgICAgICB9IHdoaWxlKHRpbGVzV2lkdGgtLSk7XHJcblxyXG4gICAgICAgICAgICBsZXZlbC50aWxlZEpzb24ubGF5ZXJzID0gW1xyXG4gICAgICAgICAgICAgICAgZ3JvdW5kTGF5ZXIsXHJcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25MYXllcixcclxuICAgICAgICAgICAgICAgIGRlYXRoTGF5ZXJcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByYW5kb21CYWNrZ3JvdW5kKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHJhbmRvbUJhY2tncm91bmQgPSBiYWNrZ3JvdW5kc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBiYWNrZ3JvdW5kcy5sZW5ndGgpXVxyXG4gICAgICAgICAgICBsZXZlbC5iYWNrZ3JvdW5kSW1hZ2UgPSByYW5kb21CYWNrZ3JvdW5kLmJhY2tncm91bmRJbWFnZTtcclxuICAgICAgICAgICAgbGV2ZWwuYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uID0gcmFuZG9tQmFja2dyb3VuZC5iYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb247XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnVpbGQoKXtcclxuICAgICAgICAgICAgcmV0dXJuIGxldmVsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMZXZlbEJ1aWxkZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbGV2ZWxCdWlsZGVyLmpzIiwiY29uc3QgYmFja2dyb3VuZHMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImJnM3NlYW1sZXNzXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5qcGdcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwidm9sY2Fub1wiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJjYXZlXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImJnMXNlYW1sZXNzXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImZvcmVzdC1ncmVlblwiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJmb3Jlc3QtZmlyZVwiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJmb3Jlc3Qtb3JhbmdlXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImZvcmVzdC1waW5rXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImZvcmVzdFwiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJncmF2ZXlhcmRcIixcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb246IFwiLnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwiaWNlLWdyZWVuXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImljZVwiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJzbm93XCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgIH1cclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJhY2tncm91bmRzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9iYWNrZ3JvdW5kcy5qcyIsImV4cG9ydCBjb25zdCBjb2x1bW4gPSBbWzAsMCwwLDAsMCwwLDBdLFswLDk3LDk4LDk5LDEwMCwxMDUsMF0sWzAsMCwxMjIsMTI3LDEyMSwwLDBdLFswLDAsMzcsNTcsMzEsMCwwXSxbMCwwLDM3LDU3LDEyMSwwLDBdLFswLDAsNTgsNjcsMzEsMCwwXSxbMCw4NCw4NSwxMzYsMTIxLDAsMF0sWzAsMCw1OCw2NywzMSwwLDBdLFswLDAsMiw1Nyw1MiwwLDBdLFswLDAsMjEsNjcsMzQsMCwwXSxbMCwwLDM3LDU3LDEyMSwwLDBdLFswLDAsMjY4NDM1NDY4MSwyNjg0MzU0NTkxLDAsMCwwXSxbMCwwLDAsMCwwLDAsMF1dO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNub3diYWxsID0gW1swLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwxOCwxOSwyMCwxNyw2MywxNiwxOCwxOSwyMCwxNywxOCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwxNyw2MywzNCwxMywzNSw2NywzMiwzMywzNCwxMywzNSw0NSw0NiwzMSwwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDAsMiwzLDMwLDQsODAsMTIsNTMsNjUsNjYsNCw4MCw1Niw1NywxMSwxMTAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDE3LDExMCw3OSwyMiwyMyw0NCw0NSw0Niw3OSwyMiwyMyw0NCw0NSwxMjgsMTEyLDExMywxMDcsMjAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwyLDU3LDExLDM4LDM5LDU1LDExNCwxMiw1MywzOCwzOSwyOSw0OSw1MCw1MSw1OSw1MSwxMzEsOTYsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDE1LDc5LDY3LDMyLDMzLDM0LDEzLDM1LDQ2LDc5LDEwNywxMDgsMTEyLDc2LDYxLDYyLDYwLDc2LDYxLDEzMSwxNCwwLDAsMCwwXSxbMCwwLDAsMCwwLDU4LDExLDEyLDUzLDY1LDY2LDQsOTMsODksOTAsMjksNTYsMTI5LDU5LDU5LDQ5LDczLDQ3LDg4LDE0MSwzNCwwLDAsMCwwXSxbMCwwLDAsMCwxNSw2NywzMiw0Niw3OSwyMiwyMyw0NCwxMTMsMTA3LDEwOCwxMDksMTI4LDExMiwxMzMsNjAsNzYsNjEsNjIsMTY3LDEwMCwxMDQsMjI5LDAsMCwwXSxbMCwwLDAsMjAsOTAsMjksNzksMTI5LDkzLDg5LDkwLDI5LDI5LDQ4LDQ5LDUwLDUxLDEzMSw1OSw2Miw3Myw0NywyNCwxODAsMTI1LDEyNiwxMjEsMCwwLDBdLFswLDAsMCwyLDEwOCwxMDksMTI4LDExMiwxMTMsMTA3LDEwOCwxMDksMTMzLDYwLDc2LDYxLDYyLDEzMiwxMzMsNjIsMTY3LDEwMCwxOTcsMzQsNDUsNDYsMzEsMCwwLDBdLFswLDAsMCwyMSw0OSw1MCw1MSwxMzEsNTksNDgsNDksNTAsNTEsNzYsMTMzLDYyLDEzMiw3Myw0NywyNCwxMjQsMTI0LDEyNyw0LDExNCw1NywxMjEsMCwwLDBdLFswLDAsMCwzNyw3NiwxMzIsMTM3LDEzOCwxMzMsNjAsNzYsMTM5LDE3OCwxMzIsMTM3LDEzOCwxMzIsMTY3LDEwMCwxOTcsMzIsMzMsMzQsNDQsMzUsNjcsMzEsMCwwLDBdLFswLDAsMCw1OCwxODQsNzMsMTg0LDczLDEzOCwxOTUsMTg0LDE5MywxOTQsNzMsMTg0LDczLDg4LDE4MCwxMjQsMTI3LDExLDMyMjEyMjU0OTQsMzIyMTIyNTU1MSwzMjIxMjI1NTE4LDMyMjEyMjU1MDQsMzIyMTIyNTUzOSwzMjIxMjI1NDg3LDAsMCwwXSxbMCw5Nyw5OCw5OSwxMDAsMTA0LDEwMCwxMDQsMTAwLDEwNCwxMDAsMjA0LDIwNSwxMDQsMTAwLDEwNCwxOTcsMTMsMzUsNjcsMzIsMzIyMTIyNTUzNywzMjIxMjI1NTI1LDMyMjEyMjU0ODQsMzIyMTIyNTQ4MywzMjIxMjI1NTMwLDAsMCwwLDBdLFswLDAsMTIyLDEyNSwxMjQsMTI3LDEyNSwxMjYsMTIzLDIwNiwxMjQsMjA3LDIwOCwxMjYsMTIzLDIwNiwxMjQsNCw4MCwxMiw1MywzMjIxMjI1NTA1LDMyMjEyMjU1MDQsMzIyMTIyNTUzOSwzMjIxMjI1NTUxLDMyMjEyMjU0ODcsMCwwLDAsMF0sWzAsMCwzMjIxMjI1NDkyLDMyMjEyMjU1NzksMzIyMTIyNTU4NSwzMjIxMjI1NTg0LDMyMjEyMjU2MDAsMzIyMTIyNTUxNywzMjIxMjI1NTE2LDMyMjEyMjU0OTUsMzIyMTIyNTQ5NCwzMjIxMjI1NTUxLDMyMjEyMjU1MTgsMzIyMTIyNTUxNywzMjIxMjI1NTE2LDMyMjEyMjU0OTUsMzIyMTIyNTQ5NCwzMjIxMjI1NTUxLDQ1LDQ2LDc5LDMyMjEyMjU1MTAsMzIyMTIyNTQ4MywzMjIxMjI1NTI5LDMyMjEyMjU0NzQsMCwwLDAsMCwwXSxbMCwwLDAsMzIyMTIyNTU4MiwzMjIxMjI1NDgzLDMyMjEyMjU1MjksMzIyMTIyNTUyOCwzMjIxMjI1NTUyLDMyMjEyMjU0NzYsMzIyMTIyNTUzOCwzMjIxMjI1NTM3LDMyMjEyMjU1MjUsMzIyMTIyNTQ4NCwzMjIxMjI1NTUyLDMyMjEyMjU0NzYsMzIyMTIyNTUwMiwzMjIxMjI1NDc1LDMyMjEyMjU0NzQsMzIyMTIyNTUyNCwzMjIxMjI1NDk1LDMyMjEyMjU0OTQsMzIyMTIyNTQ4NSwzMjIxMjI1NTA2LDMyMjEyMjU1ODIsMzIyMTIyNTQ4OSwwLDAsMCwwLDBdLFswLDAsMCwwLDMyMjEyMjU1MDMsMzIyMTIyNTUxOCwzMjIxMjI1NTE3LDMyMjEyMjU1MDcsMzIyMTIyNTQ4NSwzMjIxMjI1NTA2LDMyMjEyMjU1MDUsMzIyMTIyNTUwNCwzMjIxMjI1NTMyLDMyMjEyMjU1ODAsMzIyMTIyNTU3OSwzMjIxMjI1NTg1LDMyMjEyMjU1ODQsMzIyMTIyNTYwMCwzMjIxMjI1NTgxLDMyMjEyMjU1NTEsMzIyMTIyNTYxNywzMjIxMjI1NDkxLDMyMjEyMjU0OTAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwzMjIxMjI1NDkwLDMyMjEyMjU0ODksMzIyMTIyNTQ5MiwzMjIxMjI1NDkxLDMyMjEyMjU0OTAsMzIyMTIyNTQ4OCwzMjIxMjI1NTM1LDMyMjEyMjU0ODksMzIyMTIyNTU2OCwzMjIxMjI1NTEwLDMyMjEyMjU1MDIsMzIyMTIyNTQ3NSwzMjIxMjI1NTM4LDMyMjEyMjU1MzcsMzIyMTIyNTQ3NCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDMyMjEyMjU0ODYsMzIyMTIyNTU4MCwzMjIxMjI1NTc5LDMyMjEyMjU1MDYsMzIyMTIyNTU4MiwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwzMjIxMjI1NDg5LDMyMjEyMjU0ODgsMzIyMTIyNTQ5MCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXV07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL2lzbGFuZHMuanMiLCJleHBvcnQgY29uc3QgZ3JvdW5kTGF5ZXIgPSB7XHJcbiAgICBcImRhdGFcIjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDE4LCAxOSwgMTYsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDE1LCA3OSwgMjMsIDUyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA1OCwgOTMsIDM5LCAzNCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMTEyLCAxMTMsIDM0LCA4MywgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgNzcsIDExMSwgMTExLCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDEzMCwgMTMwLCA5MiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgNzcsIDc4LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5MSwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDk3LCA5OCwgNzcsIDc4LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5MSwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgXCJoZWlnaHRcIjogMjMsXHJcbiAgICBcIm5hbWVcIjogXCJncm91bmQtbGF5ZXJcIixcclxuICAgIFwib3BhY2l0eVwiOiAxLFxyXG4gICAgXCJ0eXBlXCI6IFwidGlsZWxheWVyXCIsXHJcbiAgICBcInZpc2libGVcIjogdHJ1ZSxcclxuICAgIFwid2lkdGhcIjogMzQsXHJcbiAgICBcInhcIjogMCxcclxuICAgIFwieVwiOiAwXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY29sbGlzaW9uTGF5ZXIgPSB7XHJcbiAgICBcImRhdGFcIjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDc3LCAxMTEsIDExMSwgNzgsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDkxLCAxMzAsIDEzMCwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDc3LCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDkyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5NywgOTgsIDc3LCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDkyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgIFwiaGVpZ2h0XCI6IDIzLFxyXG4gICAgXCJuYW1lXCI6IFwiY29sbGlzaW9uLWxheWVyXCIsXHJcbiAgICBcIm9wYWNpdHlcIjogMSxcclxuICAgIFwidHlwZVwiOiBcInRpbGVsYXllclwiLFxyXG4gICAgXCJ2aXNpYmxlXCI6IGZhbHNlLFxyXG4gICAgXCJ3aWR0aFwiOiAzNCxcclxuICAgIFwieFwiOiAwLFxyXG4gICAgXCJ5XCI6IDBcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWF0aExheWVyID0ge1xyXG4gICAgXCJkYXRhXCI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgIFwiaGVpZ2h0XCI6IDIzLFxyXG4gICAgXCJuYW1lXCI6IFwiZGVhdGgtbGF5ZXJcIixcclxuICAgIFwib3BhY2l0eVwiOiAxLFxyXG4gICAgXCJ0eXBlXCI6IFwidGlsZWxheWVyXCIsXHJcbiAgICBcInZpc2libGVcIjogZmFsc2UsXHJcbiAgICBcIndpZHRoXCI6IDM0LFxyXG4gICAgXCJ4XCI6IDAsXHJcbiAgICBcInlcIjogMFxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9sYXllcnMuanMiLCJjb25zdCBsZXZlbE1vZGVsID0ge1xyXG5cdFwiaGVpZ2h0XCI6IDIzLFxyXG5cdFwibGF5ZXJzXCI6IFt7XHJcblx0XHRcdFwiZGF0YVwiOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMTgsIDE5LCAxNiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMTUsIDc5LCAyMywgNTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDU4LCA5MywgMzksIDM0LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxMTIsIDExMywgMzQsIDgzLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA3NywgMTExLCAxMTEsIDc4LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5MSwgMTMwLCAxMzAsIDkyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA3NywgNzgsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDkxLCA5MiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTcsIDk4LCA3NywgNzgsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDkxLCA5MiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcblx0XHRcdFwiaGVpZ2h0XCI6IDIzLFxyXG5cdFx0XHRcIm5hbWVcIjogXCJncm91bmQtbGF5ZXJcIixcclxuXHRcdFx0XCJvcGFjaXR5XCI6IDEsXHJcblx0XHRcdFwidHlwZVwiOiBcInRpbGVsYXllclwiLFxyXG5cdFx0XHRcInZpc2libGVcIjogdHJ1ZSxcclxuXHRcdFx0XCJ3aWR0aFwiOiAzNCxcclxuXHRcdFx0XCJ4XCI6IDAsXHJcblx0XHRcdFwieVwiOiAwXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRcImRhdGFcIjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDc3LCAxMTEsIDExMSwgNzgsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDkxLCAxMzAsIDEzMCwgOTIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDc3LCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDkyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5NywgOTgsIDc3LCA3OCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOTEsIDkyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuXHRcdFx0XCJoZWlnaHRcIjogMjMsXHJcblx0XHRcdFwibmFtZVwiOiBcImNvbGxpc2lvbi1sYXllclwiLFxyXG5cdFx0XHRcIm9wYWNpdHlcIjogMSxcclxuXHRcdFx0XCJ0eXBlXCI6IFwidGlsZWxheWVyXCIsXHJcblx0XHRcdFwidmlzaWJsZVwiOiBmYWxzZSxcclxuXHRcdFx0XCJ3aWR0aFwiOiAzNCxcclxuXHRcdFx0XCJ4XCI6IDAsXHJcblx0XHRcdFwieVwiOiAwXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRcImRhdGFcIjogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG5cdFx0XHRcImhlaWdodFwiOiAyMyxcclxuXHRcdFx0XCJuYW1lXCI6IFwiZGVhdGgtbGF5ZXJcIixcclxuXHRcdFx0XCJvcGFjaXR5XCI6IDEsXHJcblx0XHRcdFwidHlwZVwiOiBcInRpbGVsYXllclwiLFxyXG5cdFx0XHRcInZpc2libGVcIjogZmFsc2UsXHJcblx0XHRcdFwid2lkdGhcIjogMzQsXHJcblx0XHRcdFwieFwiOiAwLFxyXG5cdFx0XHRcInlcIjogMFxyXG5cdFx0fVxyXG5cdF0sXHJcblx0XCJuZXh0b2JqZWN0aWRcIjogMSxcclxuXHRcIm9yaWVudGF0aW9uXCI6IFwib3J0aG9nb25hbFwiLFxyXG5cdFwicHJvcGVydGllc1wiOiB7XHJcblxyXG5cdH0sXHJcblx0XCJyZW5kZXJvcmRlclwiOiBcInJpZ2h0LWRvd25cIixcclxuXHRcInRpbGVoZWlnaHRcIjogMTYsXHJcblx0XCJ0aWxlc2V0c1wiOiBbe1xyXG5cdFx0XCJjb2x1bW5zXCI6IDExLFxyXG5cdFx0XCJmaXJzdGdpZFwiOiAxLFxyXG5cdFx0XCJpbWFnZVwiOiBcIkwxLnBuZ1wiLFxyXG5cdFx0XCJpbWFnZWhlaWdodFwiOiAzODQsXHJcblx0XHRcImltYWdld2lkdGhcIjogMTc2LFxyXG5cdFx0XCJtYXJnaW5cIjogMCxcclxuXHRcdFwibmFtZVwiOiBcIkwxXCIsXHJcblx0XHRcInByb3BlcnRpZXNcIjoge1xyXG5cclxuXHRcdH0sXHJcblx0XHRcInNwYWNpbmdcIjogMCxcclxuXHRcdFwidGlsZWNvdW50XCI6IDI2NCxcclxuXHRcdFwidGlsZWhlaWdodFwiOiAxNixcclxuXHRcdFwidGlsZXdpZHRoXCI6IDE2XHJcblx0fV0sXHJcblx0XCJ0aWxld2lkdGhcIjogMTYsXHJcblx0XCJ2ZXJzaW9uXCI6IDEsXHJcblx0XCJ3aWR0aFwiOiAzNFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGV2ZWxNb2RlbDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9tb2RlbHMvbGV2ZWwuanMiLCJpbXBvcnQgbGV2ZWwgZnJvbSAnLi9sZXZlbCc7XHJcblxyXG5jb25zdCBsZXZlbENvbmZpZyA9IHtcclxuXHRcImlkXCI6IFwicmlzZS1vZi10aGUtdGlkZVwiLFxyXG5cdFwibmFtZVwiOiBcIlJpc2Ugb2YgdGhlIFRpZGVcIixcclxuXHRcInRpbGVzZXRcIjogXCJ0aWxlc2V0LWxldmVsLXJpc2Utb2YtdGhlLXRpZGVcIixcclxuXHRcInRpbGVtYXBcIjogXCJ0aWxlbWFwLWxldmVsLXJpc2Utb2YtdGhlLXRpZGVcIixcclxuXHRcInRpbGVkSnNvblwiOiBsZXZlbCxcclxuXHRcInRpbGVzZXRJbWFnZVwiOiBcIkwxXCIsXHJcblx0XCJ0aWxlc2V0SW1hZ2VFeHRlbnNpb25cIjogXCIucG5nXCIsXHJcblx0XCJiYWNrZ3JvdW5kSW1hZ2VcIjogXCJiZzNzZWFtbGVzc1wiLFxyXG5cdFwiYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uXCI6IFwiLmpwZ1wiLFxyXG5cdFwiYmFja2dyb3VuZEtleVwiOiBcImJhY2tncm91bmQtMlwiLFxyXG5cdFwid2lkdGhcIjogNTQ2LFxyXG5cdFwiaGVpZ2h0XCI6IDM2OCxcclxuXHRcImxheWVyc1wiOiB7XHJcblx0XHRcImdyb3VuZExheWVyXCI6IHtcclxuXHRcdFx0XCJrZXlcIjogXCJncm91bmQtbGF5ZXJcIixcclxuXHRcdFx0XCJ2aXNpYmxlXCI6IHRydWVcclxuXHRcdH0sXHJcblx0XHRcImNvbGxpc2lvbkxheWVyXCI6IHtcclxuXHRcdFx0XCJrZXlcIjogXCJjb2xsaXNpb24tbGF5ZXJcIixcclxuXHRcdFx0XCJ2aXNpYmxlXCI6IGZhbHNlXHJcblx0XHR9LFxyXG5cdFx0XCJkZWF0aExheWVyXCI6IHtcclxuXHRcdFx0XCJrZXlcIjogXCJkZWF0aC1sYXllclwiLFxyXG5cdFx0XHRcInZpc2libGVcIjogZmFsc2VcclxuXHRcdH1cclxuXHR9LFxyXG5cdFwiZml4ZWRCYWNrZ3JvdW5kXCI6IHRydWUsXHJcblx0XCJlbnRyeVBvaW50XCI6IHtcclxuXHRcdFwieFwiOiAxMCxcclxuXHRcdFwieVwiOiAxMFxyXG5cdH0sXHJcblx0XCJwb3J0YWxzXCI6IFtdLFxyXG5cdFwicGxhdGZvcm1zXCI6IFtdLFxyXG5cdFwiYm9udXNcIjogW10sXHJcblx0XCJlbmVtaWVzXCI6IFtdXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsZXZlbENvbmZpZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9tb2RlbHMvbGV2ZWxDb25maWcuanMiLCJcclxuZXhwb3J0IGNvbnN0IGZsYXR0ZW4gPSBtdWx0aWRpbWVuc2lvbmFsID0+IHtcclxuICAgIHJldHVybiBtdWx0aWRpbWVuc2lvbmFsLnJlZHVjZSgocmVzLCByb3cpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzLmNvbmNhdChyb3cpO1xyXG4gICAgfSwgW10pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGFwcGx5TWF0cml4ID0gKGJpZywgc21hbGwsIHgsIHkpID0+IHtcclxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHNtYWxsLmxlbmd0aDsgcm93KyspIHtcclxuICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBzbWFsbFtyb3ddLmxlbmd0aDsgY29sKyspIHtcclxuICAgICAgICAgICAgYmlnW3kgKyByb3ddW3ggKyBjb2xdID0gc21hbGxbcm93XVtjb2xdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBiaWc7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlTWF0cml4ID0gKHJvd3MsIGNvbHMsIHRpbGUpID0+IHtcclxuICAgIGxldCByZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHJvdyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sczsgaisrKSB7XHJcbiAgICAgICAgICAgIHJvdy5wdXNoKHRpbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXMucHVzaChyb3cpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcztcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBsYXllclRvTWF0cml4ID0gbGF5ZXIgPT4ge1xyXG4gICAgcmV0dXJuIGxheWVyLmRhdGEucmVkdWNlKChyZXN1bHQsIHRpbGUsIGkpID0+IHtcclxuICAgICAgICBpZiAoaSAlIGxheWVyLndpZHRoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFt0aWxlXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXS5wdXNoKHRpbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSwgW10pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNoZWNrSWZBcmVhSXNDb3ZlcmVkID0gKG1hdHJpeCwgeCwgeSwgd2lkdGgsIGhlaWdodCkgPT4ge1xyXG4gICAgbGV0IHJlcyA9IDA7XHJcbiAgICBmb3IgKGxldCByb3cgPSB4OyByb3cgPD0geCArIHdpZHRoOyByb3crKykge1xyXG4gICAgICAgIGZvciAobGV0IGNvbCA9IHk7IGNvbCA8PSB5ICsgaGVpZ2h0OyBjb2wrKykge1xyXG4gICAgICAgICAgICByZXMgKz0gbWF0cml4W2NvbF1bcm93XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzID09PSAwO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGZpbHRlckNvbGxpc2lvblRpbGVzID0gZmxhdG1hdHJpeCA9PiB7XHJcblx0cmV0dXJuIGZsYXRtYXRyaXguZmlsdGVyKHRpbGUgPT4ge1xyXG5cdFx0cmV0dXJuIHRpbGUgIT09IDA7XHJcblx0fSkucmVkdWNlKCh1bmlxdWVzLCB0aWxlKSA9PiB7XHJcblx0XHRpZih1bmlxdWVzLmluZGV4T2YodGlsZSkgPCAwKXtcclxuXHRcdFx0dW5pcXVlcy5wdXNoKHRpbGUpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHVuaXF1ZXM7XHJcblx0fSwgW10pLnNvcnQoKGEsIGIpID0+IHtcclxuXHRcdHJldHVybiBhIC0gYlxyXG5cdH0pO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL3V0aWxzLmpzIiwiZnVuY3Rpb24gbGV2ZWxMb2FkZXIoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNyZWF0ZUJhY2tncm91bmQ6IChsYXllck5hbWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC5iYWNrZ3JvdW5kTGF5ZXIgPSB0aGlzLmdhbWUuYWRkLnRpbGVTcHJpdGUoXHJcbiAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxDb25maWcud2lkdGgsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmhlaWdodCxcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxDb25maWcuYmFja2dyb3VuZEtleVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlTGF5ZXI6IChsYXllcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsW2xheWVyXSA9IHRoaXMubGV2ZWwudGlsZW1hcC5jcmVhdGVMYXllcih0aGlzLmxldmVsQ29uZmlnW2xheWVyXSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGVMYXllcnM6IChsYXllcnMpID0+IHtcclxuICAgICAgICAgICAgZm9yKGxldCBsYXllciBpbiBsYXllcnMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbFtsYXllcl0gPSB0aGlzLmxldmVsLnRpbGVtYXAuY3JlYXRlTGF5ZXIodGhpcy5sZXZlbENvbmZpZy5sYXllcnNbbGF5ZXJdLmtleSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsW2xheWVyXS52aXNpYmxlID0gdGhpcy5sZXZlbENvbmZpZy5sYXllcnNbbGF5ZXJdLnZpc2libGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZVRpbGVzOiAodGlsZW1hcEtleSwgdGlsZXNldEtleSwgdGlsZXNldEltYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcCA9IHRoaXMuZ2FtZS5hZGQudGlsZW1hcCh0aWxlbWFwS2V5KTtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC50aWxlbWFwLmFkZFRpbGVzZXRJbWFnZSh0aWxlc2V0SW1hZ2UsIHRpbGVzZXRLZXkpO1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLnRpbGVtYXAuc2V0Q29sbGlzaW9uQmV0d2VlbigwLCAzMDAwLCB0cnVlLCB0aGlzLmxldmVsQ29uZmlnLmxheWVycy5jb2xsaXNpb25MYXllci5rZXkpO1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLnRpbGVtYXAuc2V0Q29sbGlzaW9uQmV0d2VlbigwLCAzMDAwLCB0cnVlLCB0aGlzLmxldmVsQ29uZmlnLmxheWVycy5kZWF0aExheWVyLmtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxldmVsTG9hZGVyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsTG9hZGVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==