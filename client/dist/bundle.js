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

var _levelLoader = __webpack_require__(29);

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
function init(levelConfig) {
    console.log('[PHASER][Component][Init]', levelConfig);
    this.levelConfig = levelConfig;
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
    this.game.load.tilemap(this.levelConfig.tilemap, this.globalConfig.levelPath + this.levelConfig.tiledJson, null, Phaser.Tilemap.TILED_JSON);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjFlYjIxYWZhMjY4MmJkYmMxOWMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL21lbnUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmF0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmVhci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Rpbm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9kcmFnb25mbHkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9mcm9nLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZ29yaWxsYS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2luc2VjdC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2plbGx5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvbmF0aXZlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcGFycm90LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcHRlcm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9zcGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy90aWdlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvbWVudS9tZW51LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmluaXQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5wcmVsb2FkLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkudXBkYXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9jcmVhdHVyZUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbExvYWRlci5qcyJdLCJuYW1lcyI6WyJBSSIsImdhbWUiLCJ4IiwieSIsInNwcml0ZSIsInByb3BzIiwiYmVoYXZpb3VycyIsImlkIiwidHlwZSIsInNwcml0ZVN0YXRlIiwibW9ieCIsIm9ic2VydmFibGUiLCJsaWZlIiwic3R1biIsImhpdCIsIm5vaGl0IiwiYm9keSIsImJsb2NrZWQiLCJsZWZ0IiwicmlnaHQiLCJzY2FsZSIsImJvdW5kVG8iLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiaGFzT3duUHJvcGVydHkiLCJQaGFzZXIiLCJQb2ludCIsIlJlY3RhbmdsZSIsIngxIiwieDIiLCJoZWlnaHQiLCJ5MSIsInkyIiwiY29udGFpbnNQb2ludCIsImdldEJvdW5kcyIsImZhY2luZ1JpZ2h0IiwidHVybiIsImZhY2luZ0xlZnQiLCJ3aWR0aCIsInBhcmFtcyIsIk1hdGgiLCJyYW5kb20iLCJwcm9iYWJpbGl0eSIsImFjdGlvbiIsImNhbGwiLCJmb3JFYWNoIiwiYmVoYXZpb3VyIiwiRXh0ZW5kZWRTcHJpdGUiLCJhbmltYXRpb25zIiwiYWRkIiwiZXhpc3RpbmciLCJwaHlzaWNzIiwiZW5hYmxlIiwiUGh5c2ljcyIsIkFSQ0FERSIsImFuY2hvciIsInNldFRvIiwiY29sbGlkZVdvcmxkQm91bmRzIiwiY2hlY2tXb3JsZEJvdW5kcyIsIm91dE9mQm91bmRzS2lsbCIsImdyYXZpdHkiLCJfZGVidWdUZXh0IiwiYWRkQ2hpbGQiLCJ0ZXh0IiwiZm9udCIsImZpbGwiLCJ2aXNpYmxlIiwiYW5pbWF0aW9uIiwibmFtZSIsImZyYW1lcyIsIm1hcCIsImZyYW1lIiwidG9TdHJpbmciLCJmcHMiLCJsb29wIiwiZ2FtZVN0YXRlIiwic3RhdGUiLCJzdGF0ZXMiLCJjdXJyZW50Iiwib2JzZXJ2ZSIsImNoYW5nZSIsImNvbnNvbGUiLCJsb2ciLCJ1cGRhdGVTdGF0ZSIsImFzc2lnbiIsInZlbG9jaXR5IiwibWF4U3BlZWQiLCJhY2NlbGVyYXRpb24iLCJwbGF5IiwibW92ZVJpZ2h0IiwibW92ZUxlZnQiLCJ0b3VjaGluZyIsImRvd24iLCJoaXRVbnRpbCIsInRpbWUiLCJub3ciLCJicmVha1VudGlsIiwiZGlyZWN0aW9uIiwic2V0VGV4dCIsIlNwcml0ZSIsIkh1bWFuIiwiTWVudSIsInVuZGVmaW5lZCIsInByb3RvdHlwZSIsImNyZWF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJQbGF5IiwiZ2xvYmFsQ29uZmlnIiwicGxheWVyIiwiZW5lbXkiLCJsZXZlbCIsImJhY2tncm91bmRMYXllciIsImdyb3VuZExheWVyIiwidGlsZW1hcCIsImNyZWF0dXJlQ29uZmlnIiwibGV2ZWxMb2FkZXIiLCJjcmVhdHVyZUZhY3RvcnkiLCJpbml0IiwicHJlbG9hZCIsInVwZGF0ZSIsImJsb2NrcyIsImRvbUVsZW1lbnQiLCJiYWNrZ3JvdW5kUGF0aCIsInRpbGVzZXRQYXRoIiwibGV2ZWxQYXRoIiwidGV4dHVyZUF0bGFzUGF0aCIsInRleHR1cmVBdGxhc05hbWUiLCJ0ZXh0dXJlQXRsYXNJbWFnZSIsInRleHR1cmVBdGxhc0pzb24iLCJjcmVhdHVyZUNvbmZpZ3MiLCJjcmVhdHVyZURlZmF1bHRzIiwiYWN0aXZlIiwiYm91bmNlIiwibWFzcyIsImp1bXBpbmciLCJjb2xsaWRlIiwibGl2ZXMiLCJsaWZlc3BhbiIsIkluZmluaXR5Iiwic2Vuc2UiLCJ0aW1lT2YiLCJtYW4iLCJkaW5vIiwiYmVhciIsImltYWdlIiwidGlnZXIiLCJwdGVybyIsImRyYWdvbmZseSIsImJhdCIsInNwaWRlciIsIm5hdGl2ZSIsInBhcnJvdCIsImluc2VjdCIsImJ1ZyIsImZyb2ciLCJ0dXJ0bGUiLCJqZWxseSIsImdvcmlsbGEiLCJjcmVhdHVyZSIsImRlZmF1bHRzIiwicHJvcCIsIkJhdCIsIkJlYXIiLCJCdWciLCJEaW5vIiwiRHJhZ29uZmx5IiwiRnJvZyIsIkdvcmlsbGEiLCJJbnNlY3QiLCJKZWxseSIsIk5hdGl2ZSIsIlBhcnJvdCIsIlB0ZXJvIiwiU3BpZGVyIiwiVGlnZXIiLCJUdXJ0bGUiLCJhZHZhbmNlZFRpbWluZyIsImFsaWduIiwic2V0IiwiaW5wdXQiLCJrZXlib2FyZCIsIm9uRG93bkNhbGxiYWNrIiwiZSIsImZldGNoIiwia2V5IiwibWV0aG9kIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImxldmVsQ29uZmlnIiwic3RhcnQiLCJ3b3JsZCIsInNldEJvdW5kcyIsInN0YXJ0U3lzdGVtIiwiY3JlYXRlQmFja2dyb3VuZCIsImNyZWF0ZVRpbGVzIiwidGlsZXNldCIsInRpbGVzZXRJbWFnZSIsImNyZWF0ZUxheWVycyIsImxheWVycyIsImZpeGVkVG9DYW1lcmEiLCJmaXhlZEJhY2tncm91bmQiLCJyZXNpemVXb3JsZCIsImluaXRpYWxpc2VkIiwic2NvcmUiLCJlbnRyeVBvaW50IiwiZW5lbWllcyIsIkdyb3VwIiwiY2FtZXJhIiwiZm9sbG93IiwiY3JlYXRlQ3Vyc29yS2V5cyIsInNwYWNlIiwiYWRkS2V5IiwiS2V5Ym9hcmQiLCJTUEFDRUJBUiIsIm1lbnUiLCJsb2FkIiwiYXRsYXMiLCJMb2FkZXIiLCJURVhUVVJFX0FUTEFTX0pTT05fSEFTSCIsImJhY2tncm91bmRLZXkiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJiYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb24iLCJ0aWxlc2V0SW1hZ2VFeHRlbnNpb24iLCJ0aWxlZEpzb24iLCJUaWxlbWFwIiwiVElMRURfSlNPTiIsImRlYnVnIiwiYXJjYWRlIiwiY29sbGlzaW9uTGF5ZXIiLCJvdmVybGFwIiwidXAiLCJpc0hpdHRpbmciLCJpc1N0dW5uZWQiLCJodXJ0Iiwib25LZXlQcmVzcyIsImlzRG93biIsInN0b3AiLCJqdW1wIiwiUExBVEZPUk1FUiIsIkdhbWUiLCJBVVRPIiwiYmluZCIsIkNyZWF0dXJlIiwib3JpZ2luIiwibGF5ZXJOYW1lIiwidGlsZVNwcml0ZSIsImNyZWF0ZUxheWVyIiwibGF5ZXIiLCJ0aWxlbWFwS2V5IiwidGlsZXNldEtleSIsImFkZFRpbGVzZXRJbWFnZSIsInNldENvbGxpc2lvbkJldHdlZW4iLCJkZWF0aExheWVyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNB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QUlpRCxLQUFSLElBQWlCakQsTUFBakIsRUFBd0I7QUFDcEIsc0JBQUt6RixLQUFMLENBQVcwSSxLQUFYLElBQW9CLE1BQUsxSSxLQUFMLENBQVdHLE9BQVgsQ0FBbUJzSSxXQUFuQixDQUErQixNQUFLMUQsV0FBTCxDQUFpQlUsTUFBakIsQ0FBd0JpRCxLQUF4QixFQUErQmhFLEdBQTlELENBQXBCO0FBQ0Esc0JBQUsxRSxLQUFMLENBQVcwSSxLQUFYLEVBQWtCdkwsT0FBbEIsR0FBNEIsTUFBSzRILFdBQUwsQ0FBaUJVLE1BQWpCLENBQXdCaUQsS0FBeEIsRUFBK0J2TCxPQUEzRDtBQUNIO0FBQ0osU0FsQkU7QUFtQkhrSSxxQkFBYSxxQkFBQ3NELFVBQUQsRUFBYUMsVUFBYixFQUF5QnJELFlBQXpCLEVBQTBDO0FBQ25ELGtCQUFLdkYsS0FBTCxDQUFXRyxPQUFYLEdBQXFCLE1BQUtsSCxJQUFMLENBQVVpRCxHQUFWLENBQWNpRSxPQUFkLENBQXNCd0ksVUFBdEIsQ0FBckI7QUFDQSxrQkFBSzNJLEtBQUwsQ0FBV0csT0FBWCxDQUFtQjBJLGVBQW5CLENBQW1DdEQsWUFBbkMsRUFBaURxRCxVQUFqRDtBQUNBLGtCQUFLNUksS0FBTCxDQUFXRyxPQUFYLENBQW1CMkksbUJBQW5CLENBQXVDLENBQXZDLEVBQTBDLElBQTFDLEVBQWdELElBQWhELEVBQXNELE1BQUsvRCxXQUFMLENBQWlCVSxNQUFqQixDQUF3QjhCLGNBQXhCLENBQXVDN0MsR0FBN0Y7QUFDQSxrQkFBSzFFLEtBQUwsQ0FBV0csT0FBWCxDQUFtQjJJLG1CQUFuQixDQUF1QyxDQUF2QyxFQUEwQyxJQUExQyxFQUFnRCxJQUFoRCxFQUFzRCxNQUFLL0QsV0FBTCxDQUFpQlUsTUFBakIsQ0FBd0JzRCxVQUF4QixDQUFtQ3JFLEdBQXpGO0FBQ0g7QUF4QkUsS0FBUDtBQTBCSDs7a0JBRWNyRSxXIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiMWViMjFhZmEyNjgyYmRiYzE5YyIsImltcG9ydCBFeHRlbmRlZFNwcml0ZSBmcm9tICcuL0V4dGVuZGVkU3ByaXRlJztcclxuXHJcbmNsYXNzIEFJIGV4dGVuZHMgRXh0ZW5kZWRTcHJpdGUge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcywgYmVoYXZpb3Vycyl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuaWQgPSBgJHtwcm9wcy50eXBlfS0ke3h9LSR7eX1gO1xyXG5cclxuICAgICAgICB0aGlzLmJlaGF2aW91cnMgPSBiZWhhdmlvdXJzO1xyXG5cclxuICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gbW9ieC5vYnNlcnZhYmxlKHtcclxuICAgICAgICAgICAgbGlmZTogMTAsXHJcbiAgICAgICAgICAgIHN0dW46IDAsXHJcbiAgICAgICAgICAgIGhpdDogMCxcclxuICAgICAgICAgICAgbm9oaXQ6IDBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICB0dXJuSWZCbG9ja2VkKCl7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LmJsb2NrZWQubGVmdCB8fCB0aGlzLmJvZHkuYmxvY2tlZC5yaWdodCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUueCAqPSAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0dXJuKCl7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ICo9IC0xO1xyXG4gICAgfVxyXG4gICAgc2V0Qm91bmRzKGJvdW5kVG8pe1xyXG4gICAgICAgIGlmKCFib3VuZFRvIHx8ICFPYmplY3Qua2V5cyhib3VuZFRvKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICB0aGlzLmJvdW5kVG8gPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3gnKSAmJlxyXG4gICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd5Jykpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFRvID0gbmV3IFBoYXNlci5Qb2ludChcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngsXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby55XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQFJlY3RhbmdsZSB7IHgxLCB4MiB9XHJcbiAgICAgICAgaWYoYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneDEnKSAmJlxyXG4gICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd4MicpICYmXHJcbiAgICAgICAgICAgICFib3VuZFRvLmhhc093blByb3BlcnR5KCd5MScpICYmXHJcbiAgICAgICAgICAgICFib3VuZFRvLmhhc093blByb3BlcnR5KCd5MicpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRUbyA9IG5ldyBQaGFzZXIuUmVjdGFuZ2xlKFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDEsXHJcbiAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngyIC0gYm91bmRUby54MSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8ge3gxLCB5MSwgeDIsIHkyfVxyXG4gICAgICAgIGlmKGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3gxJykgJiZcclxuICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneDInKSAmJlxyXG4gICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd5MScpICYmXHJcbiAgICAgICAgICAgIGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3kyJykpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFRvID0gbmV3IFBoYXNlci5SZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby54MSxcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLnkxLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDIgLSBib3VuZFRvLngxLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueTIgLSBib3VuZFRvLnkxXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNoZWNrQm91bmRzKCl7XHJcbiAgICAgICAgaWYoIXRoaXMuYm91bmRUbyl7XHJcbiAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQFBvaW50IHt4LCB5fVxyXG4gICAgICAgIGlmKCF0aGlzLmJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3dpZHRoJykgJiZcclxuICAgICAgICAgICAgIVBoYXNlci5SZWN0YW5nbGUuY29udGFpbnNQb2ludCh0aGlzLmdldEJvdW5kcygpLCB0aGlzLmJvdW5kVG8pICYmXHJcbiAgICAgICAgICAgICgodGhpcy54IDwgdGhpcy5ib3VuZFRvLnggJiYgIXRoaXMuZmFjaW5nUmlnaHQpIHx8XHJcbiAgICAgICAgICAgICh0aGlzLnggPiB0aGlzLmJvdW5kVG8ueCAmJiB0aGlzLmZhY2luZ1JpZ2h0KSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50dXJuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBAUmVjdGFuZ2xlIHt4MSwgeDJ9IG9yIHt4MSwgeTEsIHgyLCB5Mn1cclxuICAgICAgICBpZih0aGlzLmJvdW5kVG8gJiZcclxuICAgICAgICAgICAgdGhpcy5ib3VuZFRvLmhhc093blByb3BlcnR5KCd3aWR0aCcpICYmXHJcbiAgICAgICAgICAgICh0aGlzLnggPCB0aGlzLmJvdW5kVG8ueCAmJiB0aGlzLmZhY2luZ0xlZnQgfHxcclxuICAgICAgICAgICAgdGhpcy54ID4gdGhpcy5ib3VuZFRvLnggKyB0aGlzLmJvdW5kVG8ud2lkdGggJiYgdGhpcy5mYWNpbmdSaWdodCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50dXJuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgd2hlbihwYXJhbXMpIHtcclxuXHRcdGlmKE1hdGgucmFuZG9tKCkgPCBwYXJhbXMucHJvYmFiaWxpdHkpe1xyXG5cdFx0XHR0aGlzW3BhcmFtcy5hY3Rpb25dICYmIHRoaXNbcGFyYW1zLmFjdGlvbl0uY2FsbCh0aGlzKTtcclxuXHRcdH1cclxuXHR9XHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL2NvbnN0IGRlYnVnQm91bmRzID0gdGhpcy5pZCsnXFxuJysgKHRoaXMuYm91bmRUbyAmJiBPYmplY3Qua2V5cyh0aGlzLmJvdW5kVG8pLmxlbmd0aCAmJiB0aGlzLmJvdW5kVG8ueCkgKydcXG4nKyAodGhpcy54IHwgMCk7XHJcbiAgICAgICAgLy90aGlzLmRlYnVnKGRlYnVnQm91bmRzKTtcclxuICAgICAgICB0aGlzLmJlaGF2aW91cnMuZm9yRWFjaCgoYmVoYXZpb3VyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXNbYmVoYXZpb3VyLmFjdGlvbl0gJiYgdGhpc1tiZWhhdmlvdXIuYWN0aW9uXS5jYWxsKHRoaXMsIGJlaGF2aW91ci5wYXJhbXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBSTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwiY2xhc3MgRXh0ZW5kZWRTcHJpdGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRle1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlKTtcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wcyB8fCB7IGFuaW1hdGlvbnM6IFtdIH07XHJcbiAgICAgICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzKTtcclxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuICAgICAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUsIDEpO1xyXG4gICAgICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYm9keS5ncmF2aXR5LnkgPSB0aGlzLnByb3BzLmdyYXZpdHk7XHJcbiAgICAgICAgdGhpcy5fZGVidWdUZXh0ID0gdGhpcy5hZGRDaGlsZChcclxuICAgICAgICAgICAgdGhpcy5nYW1lLmFkZC50ZXh0KDIwLCAtMjAsICdkZWJ1ZycsIHsgZm9udDogXCIxMnB4IENvdXJpZXJcIiwgZmlsbDogXCIjZmZmZmZmXCIgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuX2RlYnVnVGV4dC52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcHMuYW5pbWF0aW9ucy5mb3JFYWNoKGFuaW1hdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ubmFtZSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcmFtZXMubWFwKGZyYW1lID0+IGZyYW1lLnRvU3RyaW5nKCkpLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZwcyxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5sb29wXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdhbWVTdGF0ZSA9IHRoaXMuZ2FtZS5zdGF0ZS5zdGF0ZXNbdGhpcy5nYW1lLnN0YXRlLmN1cnJlbnRdLmdhbWVTdGF0ZTtcclxuXHJcbiAgICAgICAgbW9ieC5vYnNlcnZlKGdhbWVTdGF0ZSwgKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlJywgY2hhbmdlLCBnYW1lU3RhdGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gT2JqZWN0LmFzc2lnbih0aGlzLnNwcml0ZVN0YXRlLCBjaGFuZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0hpdHRpbmcoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcHJpdGVTdGF0ZS5oaXQgPiB0aGlzLmdhbWUudGltZS5ub3c7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzU3R1bm5lZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwcml0ZVN0YXRlLnN0dW4gPiB0aGlzLmdhbWUudGltZS5ub3c7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZhY2luZ1JpZ2h0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZhY2luZ0xlZnQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS54IDwgMDtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlTGVmdCgpe1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IC0xO1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS52ZWxvY2l0eS54ID4gLXRoaXMucHJvcHMubWF4U3BlZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAtPSB0aGlzLnByb3BzLmFjY2VsZXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVJpZ2h0KCl7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gMTtcclxuICAgICAgICBpZih0aGlzLmJvZHkudmVsb2NpdHkueCA8IHRoaXMucHJvcHMubWF4U3BlZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCArPSB0aGlzLnByb3BzLmFjY2VsZXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZSgpe1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdtb3ZlJyk7XHJcbiAgICAgICAgaWYodGhpcy5zY2FsZS54ID09PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlUmlnaHQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVMZWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKXtcclxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAvPSAxLjE7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ3N0b3AnKTtcclxuICAgIH1cclxuXHJcbiAgICBqdW1wKCl7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnRvdWNoaW5nLmRvd24gfHwgdGhpcy5ib2R5LmJsb2NrZWQuZG93bil7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55IC09IDMwMDtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ2p1bXAnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGl0KCl7XHJcbiAgICAgICAgY29uc3QgaGl0VW50aWwgPSB0aGlzLmdhbWUudGltZS5ub3cgKyA5MDAsXHJcbiAgICAgICAgICAgIGJyZWFrVW50aWwgPSB0aGlzLmdhbWUudGltZS5ub3cgKyAxMDAwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdOb3cgJXMgSGl0ICVzIEJyZWFrICVzJywgdGhpcy5nYW1lLnRpbWUubm93LCBoaXRVbnRpbCwgYnJlYWtVbnRpbCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgIGhpdDogaGl0VW50aWwsXHJcbiAgICAgICAgICAgIG5vaGl0OiBicmVha1VudGlsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ2hpdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGh1cnQoZGlyZWN0aW9uKXtcclxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSAtPSAxMDA7XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uICYmIGRpcmVjdGlvbi5sZWZ0KXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggLT0gMTAwIHx8IHRoaXMucHJvcHMubWF4U3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRpcmVjdGlvbiAmJiBkaXJlY3Rpb24ucmlnaHQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCArPSAxMDAgfHwgdGhpcy5wcm9wcy5tYXhTcGVlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ2h1cnQnKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWJ1Zyh0ZXh0KXtcclxuICAgICAgIHRoaXMuX2RlYnVnVGV4dC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgIHRoaXMuX2RlYnVnVGV4dC5zY2FsZS54ID0gdGhpcy5zY2FsZS54O1xyXG4gICAgICAgdGhpcy5fZGVidWdUZXh0LnNldFRleHQodGV4dC50b1N0cmluZygpIHx8ICcnKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdbU3ByaXRlXSBzdGF0ZScpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXh0ZW5kZWRTcHJpdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsImltcG9ydCBFeHRlbmRlZFNwcml0ZSBmcm9tICcuL0V4dGVuZGVkU3ByaXRlJztcclxuXHJcbmNsYXNzIEh1bWFuIGV4dGVuZHMgRXh0ZW5kZWRTcHJpdGUge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgICAgICBsaWZlOiAxMCxcclxuICAgICAgICAgICAgc3R1bjogMCxcclxuICAgICAgICAgICAgaGl0OiAwLFxyXG4gICAgICAgICAgICBub2hpdDogMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIdW1hbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0h1bWFuLmpzIiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuL21lbnUuY3JlYXRlJztcclxuLy9pbXBvcnQgdXBkYXRlIGZyb20gJy4vcGxheS51cGRhdGUnO1xyXG5cclxuY2xhc3MgTWVudSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmtleXMgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbk1lbnUucHJvdG90eXBlLmNyZWF0ZSA9IGNyZWF0ZTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWVudTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL21lbnUvaW5kZXguanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9BSSc7XG5pbXBvcnQgSHVtYW4gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9IdW1hbic7XG5cbmltcG9ydCBsZXZlbExvYWRlciBmcm9tICcuLi8uLi9zZXJ2aWNlcy9sZXZlbExvYWRlcic7XG5pbXBvcnQgY3JlYXR1cmVGYWN0b3J5IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NyZWF0dXJlRmFjdG9yeSc7XG5pbXBvcnQgY3JlYXR1cmVDb25maWcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jcmVhdHVyZWNvbmZpZyc7XG5cbmltcG9ydCBpbml0IGZyb20gJy4vcGxheS5pbml0JztcbmltcG9ydCBwcmVsb2FkIGZyb20gJy4vcGxheS5wcmVsb2FkJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLi9wbGF5LmNyZWF0ZSc7XG5pbXBvcnQgdXBkYXRlIGZyb20gJy4vcGxheS51cGRhdGUnO1xuXHJcbmNsYXNzIFBsYXkge1xyXG4gICAgY29uc3RydWN0b3IoZ2xvYmFsQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5rZXlzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZW5lbXkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5sZXZlbCA9IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZExheWVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGdyb3VuZExheWVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHRpbGVtYXA6IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnID0gZ2xvYmFsQ29uZmlnO1xyXG4gICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWcgPSBjcmVhdHVyZUNvbmZpZztcclxuICAgICAgICB0aGlzLmxldmVsTG9hZGVyID0gbGV2ZWxMb2FkZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICB0aGlzLmNyZWF0dXJlRmFjdG9yeSA9IGNyZWF0dXJlRmFjdG9yeS5jYWxsKHRoaXMpO1xyXG4gICAgfVxyXG59XG5cblBsYXkucHJvdG90eXBlLmluaXQgPSBpbml0O1xuUGxheS5wcm90b3R5cGUucHJlbG9hZCA9IHByZWxvYWQ7XHJcblBsYXkucHJvdG90eXBlLmNyZWF0ZSA9IGNyZWF0ZTtcclxuUGxheS5wcm90b3R5cGUudXBkYXRlID0gdXBkYXRlO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9pbmRleC5qcyIsImNvbnN0IGdsb2JhbENvbmZpZyA9IHtcclxuICAgIHdpZHRoOiA1NDYsXHJcbiAgICBoZWlnaHQ6IDM2OCxcclxuICAgIGJsb2NrczogMyxcclxuICAgIGRvbUVsZW1lbnQ6ICdnYW1lJyxcclxuICAgIGJhY2tncm91bmRQYXRoOiAnYmFja2dyb3VuZHMvJyxcclxuICAgIHRpbGVzZXRQYXRoOiAndGlsZXNldHMvJyxcclxuICAgIGxldmVsUGF0aDogJ2xldmVscy8nLFxyXG4gICAgdGV4dHVyZUF0bGFzUGF0aDogJ3Nwcml0ZXNoZWV0cy8nLFxyXG4gICAgdGV4dHVyZUF0bGFzTmFtZTogJ3ByZTJhdGxhcycsXHJcbiAgICB0ZXh0dXJlQXRsYXNJbWFnZTogJ3ByZTJhdGxhcy5wbmcnLFxyXG4gICAgdGV4dHVyZUF0bGFzSnNvbjogJ3ByZTJhdGxhcy5qc29uJ1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2xvYmFsQ29uZmlnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dsb2JhbENvbmZpZy5qcyIsInZhciBjcmVhdHVyZUNvbmZpZ3MgPSB7XHJcbiAgY3JlYXR1cmVEZWZhdWx0czoge1xyXG4gICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgZ3Jhdml0eTogNTAwLFxyXG4gICAgYm91bmNlOiAwLjIsXHJcbiAgICBtYXNzOiAxLFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDEwMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgbGl2ZXM6IDEsXHJcbiAgICBsaWZlc3BhbjogSW5maW5pdHksXHJcbiAgICBzZW5zZTogMTUwLFxyXG4gICAgYW5pbWF0aW9uczogW10sXHJcbiAgICB0aW1lT2Y6IHtcclxuICAgICAgJ21vdmUnOiAyMDAsXHJcbiAgICAgICdoaXQnOiAxMDAsXHJcbiAgICAgICdodXJ0JzogNTAwLFxyXG4gICAgICAnc3RvcCc6IDIwMCxcclxuICAgICAgJ2lkbGUnOiAxMFxyXG4gICAgfSxcclxuICAgIGJvdW5kVG8gOiB7fSxcclxuICAgIGJlaGF2aW91cnM6IFtcclxuICAgICAgICB7IGFjdGlvbjogJ3R1cm5JZkJsb2NrZWQnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdtb3ZlJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnY2hlY2tCb3VuZHMnIH1cclxuICAgIF1cclxuICB9LFxyXG4gIG1hbjoge1xyXG4gICAgdHlwZTogJ21hbicsXHJcbiAgICBtYXhTcGVlZDogMjAwLFxyXG4gICAgbGl2ZXM6IDgsXHJcbiAgICBsaWZlc3BhbjogSW5maW5pdHksXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFsxMSwnMDMnLCcwNScsMTQsMjBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdoaXQnLCBmcmFtZXM6IFsyMiwyNCwyOCwzMSwzNCwyMiwyNCwyOCwzMSwzNF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3RvcCcsIGZyYW1lczogWzQyLDQ1LDQ5LDUyXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzE2LDQxLDQ3LDUwLDUwLDUwLDUwLDUwLDUwLDUwLDUwLDEzLDUwLDEzLDUwLDEzXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI3LDI3LDI3LDI3LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDMwLDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI3LDMwLDI3LDMwLDM1LDM2LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LCcwNycsJzA3JywnMDcnLCcwNycsJzAyJywnMDInXSwgZnBzOiA1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2h1cnQnLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3R1bicsIGZyYW1lczogWzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMTEsJzAzJywnMDUnLDE0LDIwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgZGlubzoge1xyXG4gICAgdHlwZTogJ2Rpbm8nLFxyXG4gICAgbWFzczogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiA1LFxyXG4gICAgYmVoYXZpb3VyczogW1xyXG4gICAgICAgIHsgYWN0aW9uOiAndHVybklmQmxvY2tlZCcgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ21vdmUnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdjaGVja0JvdW5kcycgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ3doZW4nLCBwYXJhbXM6IHsgcHJvYmFiaWxpdHk6IDAuMDEsIGFjdGlvbjogJ2p1bXAnIH0gfVxyXG4gICAgXSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM2MCwzNjAsMzYwLDM2MCwzNjAsMzYwLDM2MCwzNjddLCBmcHM6IDUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM2MCwzNjEsMzY0LDM2NywzNjldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszNjAsMzYxLDM2NCwzNjcsMzY5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdmYWxsJywgZnJhbWVzOiBbMzY5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNzFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzYwLDM2MSwzNjQsMzY3XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBiZWFyOiB7XHJcbiAgICB0eXBlOiAnYmVhcicsXHJcbiAgICBtYXNzOiAxLjIsXHJcbiAgICBtYXhTcGVlZDogNzUsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxNSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMyMV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMjAsMzIxLDMyNF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNjYsMzYzLDM1OCwzMTddLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszMjhdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gICdzdXBlci1iZWFyJzoge1xyXG4gICAgYWNjZWxlcmF0aW9uOiAzMCxcclxuICAgIG1heFNwZWVkOiAyMDAsXHJcbiAgICBpbWFnZTogJ3N1cGVyLWJlYXItc3ByaXRlLXJlZicsIC8vIG92ZXJyaWRlIHNwcml0ZSAoY3JlYXR1cmUgbmFtZSBieSBkZWZhdWx0KVxyXG4gICAgYW5pbWF0aW9uczogW11cclxuICB9LFxyXG4gIHRpZ2VyOiB7XHJcbiAgICB0eXBlOiAndGlnZXInLFxyXG4gICAgbWFzczogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM5MywzOTVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszOTMsMzk1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzk5LDQwMV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2ZhbGwnLCBmcmFtZXM6IFszOTldLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0MDJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzkzLDM5NV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgcHRlcm86IHtcclxuICAgIHR5cGU6ICdwdGVybycsXHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogMTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzcsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzcsNDc3XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFs0MDMsNDA0LDQwNSw0MDMsNDA0LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDA1LDQwMyw0MDQsNDA1LDQwMyw0MDQsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDA1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkZXNjZW5kJywgZnJhbWVzOiBbNDA1XSwgZnBzOiAxNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdhc2NlbmQnLCBmcmFtZXM6IFs0MDMsNDA0LDQwNV0sIGZwczogMTUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDcxXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzQwNSw0MDMsNDA0XSwgZnBzOiAxNSwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBkcmFnb25mbHk6IHtcclxuICAgIHR5cGU6ICdkcmFnb25mbHknLFxyXG4gICAgbWFzczogMC41LFxyXG4gICAgZ3Jhdml0eTogMCxcclxuICAgIGJvdW5jZTogMC4xLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IGZhbHNlLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMzNywzMzhdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMzcsMzM4XSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICd0dXJuJywgZnJhbWVzOiBbMzM5LDM0MF0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzQyXSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzMzNywzMzhdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGJhdDoge1xyXG4gICAgdHlwZTogJ2JhdCcsXHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogMjAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzUxLDM1MiwzNTEsMzUxLDM1MSwzNTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszNTcsMzU5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNjJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzU3LDM1OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgc3BpZGVyOiB7XHJcbiAgICB0eXBlOiAnc3BpZGVyJyxcclxuICAgIG1hc3M6IDAuMyxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMzNV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNjUsMzY4LDM3MCwzNzJdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMjk5LDMwMiwzMDUsMzA5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICd0dXJuJywgZnJhbWVzOiBbMzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdjbGltYicsIGZyYW1lczogWzM0MSwzNDMsMzQ1LDM0N10sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnd2FpdCcsIGZyYW1lczogWzMzMiwzMzUsMzcyXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszMjJdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBuYXRpdmU6IHtcclxuICAgIHR5cGU6ICduYXRpdmUnLFxyXG4gICAgbWF4U3BlZWQ6IDEwMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMjAsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzczXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzczLDM3NiwzNzhdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM4MF0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzczLDM3NiwzNzhdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHBhcnJvdDoge1xyXG4gICAgdHlwZTogJ3BhcnJvdCcsXHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogMTAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM5NCwzOTcsMzk4XSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzk0LDM5NywzOThdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQwMF0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzk0LDM5NywzOThdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGluc2VjdDoge1xyXG4gICAgdHlwZTogJ2luc2VjdCcsXHJcbiAgICBtYXNzOiAxLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyNSxcclxuICAgIGJlaGF2aW91cnM6IFtcclxuICAgICAgICB7IGFjdGlvbjogJ3R1cm5JZkJsb2NrZWQnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdtb3ZlJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnY2hlY2tCb3VuZHMnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICd3aGVuJywgcGFyYW1zOiB7IHByb2JhYmlsaXR5OiAwLjAzLCBhY3Rpb246ICdqdW1wJyB9IH1cclxuICAgIF0sXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNDgsMzQ4LDM0OCwzNDgsMzQ4LDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMjMsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzMyMywzNDgsMzQ5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNDhdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzIzLDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGJ1Zzoge1xyXG4gICAgdHlwZTogJ2J1ZycsXHJcbiAgICBtYXNzOiAxLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyNSxcclxuICAgIGJlaGF2aW91cnM6IFtcclxuICAgICAgICB7IGFjdGlvbjogJ3R1cm5JZkJsb2NrZWQnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdtb3ZlJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnY2hlY2tCb3VuZHMnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICd3aGVuJywgcGFyYW1zOiB7IHByb2JhYmlsaXR5OiAwLjAyLCBhY3Rpb246ICdqdW1wJyB9IH1cclxuICAgIF0sXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM0NCwzNDZdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNDRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgZnJvZzoge1xyXG4gICAgdHlwZTogJ2Zyb2cnLFxyXG4gICAgbWFzczogMSxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEuNSxcclxuICAgIGp1bXBpbmc6IDUwMCxcclxuICAgIG1heFNwZWVkOiA4MCxcclxuICAgIGFjY2VsZXJhdGlvbjogNDAsXHJcbiAgICBiZWhhdmlvdXJzOiBbXHJcbiAgICAgICAgeyBhY3Rpb246ICd0dXJuSWZCbG9ja2VkJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnbW92ZScgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ2NoZWNrQm91bmRzJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnd2hlbicsIHBhcmFtczogeyBwcm9iYWJpbGl0eTogMC4xLCBhY3Rpb246ICdqdW1wJyB9IH1cclxuICAgIF0sXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszMjVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMjUsMzI3LDMzMSwzMjVdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzI1LDMyNywzMzEsMzI1XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzM0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzMyNSwzMjcsMzMxLDMyNV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHR1cnRsZToge1xyXG4gICAgdHlwZTogJ3R1cnRsZScsXHJcbiAgICBtYXNzOiAyLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDAuMyxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszOTBdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzc3LDM4MSwzODQsMzg1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzg3LDM4OSwzOTAsMzkxXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszOTJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGplbGx5OiB7XHJcbiAgICB0eXBlOiAnamVsbHknLFxyXG4gICAgbWFzczogMixcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAxLFxyXG4gICAgbWF4U3BlZWQ6IDUsXHJcbiAgICBhY2NlbGVyYXRpb246IDEsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBnb3JpbGxhOiB7XHJcbiAgICB0eXBlOiAnZ29yaWxsYScsXHJcbiAgICBtYXNzOiA1LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZmFsbCcsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH1cclxufTtcclxuXHJcbmZvcih2YXIgY3JlYXR1cmUgaW4gY3JlYXR1cmVDb25maWdzKXtcclxuICAvL2NyZWF0dXJlQ29uZmlnc1tjcmVhdHVyZV0gPSBfLm1lcmdlKHt9LCBjb25maWdzLmNyZWF0dXJlRGVmYXVsdHMsIGNvbmZpZ3NbY3JlYXR1cmVdKTtcclxuICB2YXIgZGVmYXVsdHMgPSBjcmVhdHVyZUNvbmZpZ3NbJ2NyZWF0dXJlRGVmYXVsdHMnXTtcclxuICBmb3IodmFyIHByb3AgaW4gZGVmYXVsdHMpe1xyXG4gICAgaWYoY3JlYXR1cmVDb25maWdzW2NyZWF0dXJlXVtwcm9wXSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgY3JlYXR1cmVDb25maWdzW2NyZWF0dXJlXVtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdHVyZUNvbmZpZ3M7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZWNvbmZpZy5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBCYXQgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmF0LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEJlYXIgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCZWFyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2JlYXIuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgQnVnIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnVnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBEaW5vIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGlubztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9kaW5vLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIERyYWdvbmZseSBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERyYWdvbmZseTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9kcmFnb25mbHkuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgRnJvZyBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZyb2c7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZnJvZy5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBHb3JpbGxhIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR29yaWxsYTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9nb3JpbGxhLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEluc2VjdCBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEluc2VjdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9pbnNlY3QuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgSmVsbHkgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBKZWxseTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9qZWxseS5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBOYXRpdmUgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOYXRpdmU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvbmF0aXZlLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIFBhcnJvdCBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhcnJvdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9wYXJyb3QuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgUHRlcm8gZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQdGVybztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9wdGVyby5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBTcGlkZXIgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcGlkZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvc3BpZGVyLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIFRpZ2VyIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGlnZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvdGlnZXIuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgVHVydGxlIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVHVydGxlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyIsImZ1bmN0aW9uIGNyZWF0ZSgpe1xyXG5cclxuICAgIC8vIGZwcyBkZWJ1Z2dpbmdcclxuICAgIHRoaXMuZ2FtZS50aW1lLmFkdmFuY2VkVGltaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBDVEEgdGV4dFxyXG4gICAgY29uc3QgdGV4dCA9IHRoaXMuZ2FtZS5hZGQudGV4dChcclxuICAgICAgICB0aGlzLmdhbWUud2lkdGggLyAyLFxyXG4gICAgICAgIHRoaXMuZ2FtZS5oZWlnaHQgLyAyLFxyXG4gICAgICAgIFwiQ2hvb3NlIGEgbGV2ZWwhXFxuMSAyIDMgNCA1IDZcIixcclxuICAgICAgICB7IGZvbnQ6IFwiMjRweCBDb3VyaWVyXCIsIGZpbGw6IFwiI2ZmZmZmZlwiLCBhbGlnbjogXCJjZW50ZXJcIiB9XHJcbiAgICApO1xyXG5cclxuICAgIHRleHQuYW5jaG9yLnNldCgwLjUpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5vbkRvd25DYWxsYmFjayA9IChlKSA9PiB7XHJcbiAgICAgICAgZmV0Y2goJy9sZXZlbC8nICsgZS5rZXksIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xyXG4gICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgfSkudGhlbigobGV2ZWxDb25maWcpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdQbGF5JywgdHJ1ZSwgdHJ1ZSwgbGV2ZWxDb25maWcpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQub25Eb3duQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG5cclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtNZW51XVtDcmVhdGVdJyk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL21lbnUvbWVudS5jcmVhdGUuanMiLCJpbXBvcnQgSHVtYW4gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9IdW1hbic7XHJcbmltcG9ydCBBSSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0FJJztcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZSgpe1xyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bQ3JlYXRlXScpO1xyXG4gICAgLy8gZnBzIGRlYnVnZ2luZ1xyXG4gICAgdGhpcy5nYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xyXG5cclxuICAgIC8vIFtTRVQgTEVWRUxdIHNldCBkaW1lbnNpb25zLCBzdGFydCBwaHlzaWMgc3lzdGVtXHJcbiAgICB0aGlzLmdhbWUud29ybGQuc2V0Qm91bmRzKFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgMCxcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy53aWR0aCAqIHRoaXMuZ2xvYmFsQ29uZmlnLmJsb2NrcyxcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy5oZWlnaHRcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuXHJcbiAgICB0aGlzLmxldmVsTG9hZGVyLmNyZWF0ZUJhY2tncm91bmQoJ2JhY2tncm91bmRMYXllcicpO1xyXG4gICAgdGhpcy5sZXZlbExvYWRlci5jcmVhdGVUaWxlcyhcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLnRpbGVtYXAsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy50aWxlc2V0LFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcudGlsZXNldEltYWdlXHJcbiAgICApO1xyXG4gICAgdGhpcy5sZXZlbExvYWRlci5jcmVhdGVMYXllcnModGhpcy5sZXZlbENvbmZpZy5sYXllcnMpO1xyXG5cclxuICAgIC8vIFtTRVQgTEVWRUxdIGZpeCBiYWNrZ3JvdW5kLCByZXNpemVcclxuICAgIHRoaXMubGV2ZWwuYmFja2dyb3VuZExheWVyLmZpeGVkVG9DYW1lcmEgPSB0aGlzLmxldmVsQ29uZmlnLmZpeGVkQmFja2dyb3VuZDtcclxuICAgIHRoaXMubGV2ZWwuZ3JvdW5kTGF5ZXIucmVzaXplV29ybGQoKTtcclxuXHJcbiAgICB0aGlzLmdhbWVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgaW5pdGlhbGlzZWQ6IGZhbHNlLFxyXG4gICAgICAgIHNjb3JlOiAwXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gT2JqZWN0LmFzc2lnbih0aGlzLmdhbWVTdGF0ZSwgY2hhbmdlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1vYngub2JzZXJ2ZSh0aGlzLmdhbWVTdGF0ZSwgY2hhbmdlID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnW2dhbWVTdGF0ZV0gY2hhbmdlJywgY2hhbmdlLCB0aGlzLmdhbWVTdGF0ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHsgaW5pdGlhbGlzZWQ6IHRydWUgfSk7XHJcblxyXG4gICAgLy8gW1BMQVlFUl1cclxuICAgIHRoaXMucGxheWVyID0gbmV3IEh1bWFuKFxyXG4gICAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmVudHJ5UG9pbnQueCxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmVudHJ5UG9pbnQueSxcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy50ZXh0dXJlQXRsYXNOYW1lLFxyXG4gICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWcubWFuXHJcbiAgICApO1xyXG5cclxuICAgIC8vIFtFTkVNSUVTXVxyXG4gICAgdGhpcy5lbmVtaWVzID0gbmV3IFBoYXNlci5Hcm91cCh0aGlzLmdhbWUpO1xyXG4gICAgdGhpcy5sZXZlbENvbmZpZy5lbmVtaWVzLmZvckVhY2godGhpcy5jcmVhdHVyZUZhY3RvcnkuY3JlYXRlKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XHJcblxyXG4gICAgLy8gYmluZCBrZXlzXHJcbiAgICB0aGlzLmtleXMgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xyXG4gICAgdGhpcy5rZXlzLnNwYWNlID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpO1xyXG5cclxuICAgIC8vIHNjb3JlIHRleHRcclxuICAgIHRoaXMubWVudSA9IHRoaXMuZ2FtZS5hZGQudGV4dChcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy53aWR0aCAtIDEyMCxcclxuICAgICAgICAwLFxyXG4gICAgICAgIFwiTGlmZTogXCIgKyB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlLFxyXG4gICAgICAgIHsgZm9udDogXCIyNHB4IENvdXJpZXJcIiwgZmlsbDogXCIjZmZmXCIsIGFsaWduOiBcImNlbnRlclwiIH1cclxuICAgICk7XHJcbiAgICB0aGlzLm1lbnUuZml4ZWRUb0NhbWVyYSA9IHRydWU7XHJcbiAgICBtb2J4Lm9ic2VydmUodGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgdGhpcy5tZW51LnNldFRleHQoXCJMaWZlOiBcIiArIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuY3JlYXRlLmpzIiwiZnVuY3Rpb24gaW5pdChsZXZlbENvbmZpZyl7XHJcbiAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtJbml0XScsIGxldmVsQ29uZmlnKTtcclxuICAgIHRoaXMubGV2ZWxDb25maWcgPSBsZXZlbENvbmZpZztcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGluaXQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuaW5pdC5qcyIsImZ1bmN0aW9uIHByZWxvYWQoKXtcclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW1ByZWxvYWRdJyk7XHJcblxyXG4gICAgLy8gYXNzZXRzIHRvIGxvYWQgcmVsYXRpdmUgdG8gL2Fzc2V0cy8uLlxyXG4gICAgdGhpcy5nYW1lLmxvYWQuYXRsYXMoXHJcbiAgICAgICAgJ3ByZTJhdGxhcycsXHJcbiAgICAgICAgJ3Nwcml0ZXNoZWV0cy9wcmUyYXRsYXMucG5nJyxcclxuICAgICAgICAnc3ByaXRlc2hlZXRzL3ByZTJhdGxhcy5qc29uJyxcclxuICAgICAgICBQaGFzZXIuTG9hZGVyLlRFWFRVUkVfQVRMQVNfSlNPTl9IQVNIXHJcbiAgICApO1xyXG5cclxuICAgIC8vIGxvYWQgYmFja2dyb3VuZFxyXG4gICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UodGhpcy5sZXZlbENvbmZpZy5iYWNrZ3JvdW5kS2V5LCB0aGlzLmdsb2JhbENvbmZpZy5iYWNrZ3JvdW5kUGF0aCArIHRoaXMubGV2ZWxDb25maWcuYmFja2dyb3VuZEltYWdlICsgdGhpcy5sZXZlbENvbmZpZy5iYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb24pO1xyXG4gICAgLy8gbG9hZCB0aWxlc2V0XHJcbiAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSh0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXQsIHRoaXMuZ2xvYmFsQ29uZmlnLnRpbGVzZXRQYXRoICsgdGhpcy5sZXZlbENvbmZpZy50aWxlc2V0SW1hZ2UgKyB0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXRJbWFnZUV4dGVuc2lvbik7XHJcbiAgICAvLyBsb2FkIHRpbGVtYXBcclxuICAgIHRoaXMuZ2FtZS5sb2FkLnRpbGVtYXAodGhpcy5sZXZlbENvbmZpZy50aWxlbWFwLCB0aGlzLmdsb2JhbENvbmZpZy5sZXZlbFBhdGggKyB0aGlzLmxldmVsQ29uZmlnLnRpbGVkSnNvbiwgbnVsbCwgUGhhc2VyLlRpbGVtYXAuVElMRURfSlNPTik7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJlbG9hZDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5wcmVsb2FkLmpzIiwiZnVuY3Rpb24gdXBkYXRlKCl7XHJcbiAgICAvL2NvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW1VwZGF0ZV0nKTtcclxuICAgIC8vIGZwc1xyXG4gICAgdGhpcy5nYW1lLmRlYnVnLnRleHQodGhpcy5nYW1lLnRpbWUuZnBzLCA1LCAyMCk7XHJcblxyXG4gICAgLy8gY29sbGlkZVxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMubGV2ZWwuY29sbGlzaW9uTGF5ZXIpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMuZW5lbWllcywgdGhpcy5sZXZlbC5jb2xsaXNpb25MYXllcik7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5wbGF5ZXIsIHRoaXMuZW5lbWllcywgKHBsYXllciwgZW5lbXkpID0+IHtcclxuICAgICAgICBpZih0aGlzLnBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24gJiYgZW5lbXkuYm9keS50b3VjaGluZy51cCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMucGxheWVyLmlzSGl0dGluZyAmJiAhdGhpcy5wbGF5ZXIuaXNTdHVubmVkKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudXBkYXRlU3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgbGlmZTogdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSAtIDEsXHJcbiAgICAgICAgICAgICAgICBzdHVuOiB0aGlzLmdhbWUudGltZS5ub3cgKyAxNTAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5odXJ0KGVuZW15LmJvZHkudG91Y2hpbmcpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIG1vdmVcclxuICAgIG9uS2V5UHJlc3MuY2FsbCh0aGlzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb25LZXlQcmVzcygpe1xyXG4gICAgLy8gc3R1biA9PiBibG9ja2VkXHJcbiAgICBpZih0aGlzLnBsYXllci5pc1N0dW5uZWQpe1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnc3R1bicpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtb3ZlIGxlZnQgLyByaWdodFxyXG4gICAgaWYodGhpcy5rZXlzLmxlZnQuaXNEb3duKXtcclxuICAgICAgICB0aGlzLnBsYXllci5tb3ZlTGVmdCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnbW92ZScpO1xyXG4gICAgfSBlbHNlIGlmKHRoaXMua2V5cy5yaWdodC5pc0Rvd24pe1xyXG4gICAgICAgIHRoaXMucGxheWVyLm1vdmVSaWdodCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnbW92ZScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBsYXllci5zdG9wKCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdpZGxlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8ganVtcFxyXG4gICAgaWYodGhpcy5rZXlzLnVwLmlzRG93bil7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuanVtcCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnanVtcCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGhpdFxyXG4gICAgaWYodGhpcy5rZXlzLnNwYWNlLmlzRG93bil7XHJcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubm9oaXQgPCB0aGlzLmdhbWUudGltZS5ub3cgJiYgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUuaGl0IDwgdGhpcy5nYW1lLnRpbWUubm93KXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaGl0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnaGl0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1cGRhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkudXBkYXRlLmpzIiwiaW1wb3J0IGdsb2JhbENvbmZpZyBmcm9tICcuL2dsb2JhbENvbmZpZy5qcyc7XHJcbmltcG9ydCBNZW51IGZyb20gJy4vZ2FtZXN0YXRlcy9tZW51L2luZGV4LmpzJztcclxuaW1wb3J0IFBsYXkgZnJvbSAnLi9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMnO1xyXG5cclxuLy8gaW5zdGFudGlhdGUgYSBQaGFzZXIuR2FtZVxyXG5jb25zdCBQTEFURk9STUVSID0gbmV3IFBoYXNlci5HYW1lKFxyXG4gICAgZ2xvYmFsQ29uZmlnLndpZHRoLFxyXG4gICAgZ2xvYmFsQ29uZmlnLmhlaWdodCxcclxuICAgIFBoYXNlci5BVVRPLFxyXG4gICAgZ2xvYmFsQ29uZmlnLmRvbUVsZW1lbnRcclxuKTtcclxuXHJcbi8vIHJlZ2lzdGVyIGdhbWVzdGF0ZXMgKHdpbGwgYmUgaW5zdGFudGlhdGVkIHcvIHRoaXMuZ2FtZSBhcyAxc3QgcGFyYW0sIHBhc3MgZ2FtZUNvbmZpZyBhcyAybmQpXHJcblBMQVRGT1JNRVIuc3RhdGUuYWRkKCdNZW51JywgTWVudS5iaW5kKG51bGwsIGdsb2JhbENvbmZpZykpO1xyXG5QTEFURk9STUVSLnN0YXRlLmFkZCgnUGxheScsIFBsYXkuYmluZChudWxsLCBnbG9iYWxDb25maWcpKTtcclxuXHJcblBMQVRGT1JNRVIuc3RhdGUuc3RhcnQoJ01lbnUnLCB0cnVlLCB0cnVlKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9pbmRleC5qcyIsImltcG9ydCBiYXQgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvYmF0LmpzJztcclxuaW1wb3J0IGJlYXIgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvYmVhci5qcyc7XHJcbmltcG9ydCBidWcgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvYnVnLmpzJztcclxuaW1wb3J0IGRpbm8gZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvZGluby5qcyc7XHJcbmltcG9ydCBkcmFnb25mbHkgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvZHJhZ29uZmx5LmpzJztcclxuaW1wb3J0IGZyb2cgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvZnJvZy5qcyc7XHJcbmltcG9ydCBnb3JpbGxhIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2dvcmlsbGEuanMnO1xyXG5pbXBvcnQgaW5zZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2luc2VjdC5qcyc7XHJcbmltcG9ydCBqZWxseSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9qZWxseS5qcyc7XHJcbmltcG9ydCBuYXRpdmUgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvbmF0aXZlLmpzJztcclxuaW1wb3J0IHBhcnJvdCBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9wYXJyb3QuanMnO1xyXG5pbXBvcnQgcHRlcm8gZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvcHRlcm8uanMnO1xyXG5pbXBvcnQgc3BpZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL3NwaWRlci5qcyc7XHJcbmltcG9ydCB0aWdlciBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy90aWdlci5qcyc7XHJcbmltcG9ydCB0dXJ0bGUgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvdHVydGxlLmpzJztcclxuXHJcbmltcG9ydCBBSSBmcm9tICcuLi9jb21wb25lbnRzL0FJJztcclxuXHJcbmZ1bmN0aW9uIGNyZWF0dXJlRmFjdG9yeSgpIHtcclxuICAgIGNvbnN0IENyZWF0dXJlID0ge1xyXG4gICAgICAgIGJhdDogYmF0LFxyXG4gICAgICAgIGJlYXI6IGJlYXIsXHJcbiAgICAgICAgYnVnOiBidWcsXHJcbiAgICAgICAgZGlubzogZGlubyxcclxuICAgICAgICBkcmFnb25mbHk6IGRyYWdvbmZseSxcclxuICAgICAgICBmcm9nOiBmcm9nLFxyXG4gICAgICAgIGdvcmlsbGE6IGdvcmlsbGEsXHJcbiAgICAgICAgaW5zZWN0OiBpbnNlY3QsXHJcbiAgICAgICAgamVsbHk6IGplbGx5LFxyXG4gICAgICAgIG5hdGl2ZTogbmF0aXZlLFxyXG4gICAgICAgIHBhcnJvdDogcGFycm90LFxyXG4gICAgICAgIHB0ZXJvOiBwdGVybyxcclxuICAgICAgICBzcGlkZXI6IHNwaWRlcixcclxuICAgICAgICB0aWdlcjogdGlnZXIsXHJcbiAgICAgICAgdHVydGxlOiB0dXJ0bGVcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGU6IChsZXZlbENvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBlbmVteSA9IG5ldyBBSShcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgICAgICAgICAgIGxldmVsQ29uZmlnLm9yaWdpbi54LFxyXG4gICAgICAgICAgICAgICAgbGV2ZWxDb25maWcub3JpZ2luLnksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy50ZXh0dXJlQXRsYXNOYW1lLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdHVyZUNvbmZpZ1tsZXZlbENvbmZpZy50eXBlXSxcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWdbbGV2ZWxDb25maWcudHlwZV0uYmVoYXZpb3Vyc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBlbmVteS5zZXRCb3VuZHMobGV2ZWxDb25maWcuYm91bmRUbyk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5hZGQoZW5lbXkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdHVyZUZhY3Rvcnk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvY3JlYXR1cmVGYWN0b3J5LmpzIiwiZnVuY3Rpb24gbGV2ZWxMb2FkZXIoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNyZWF0ZUJhY2tncm91bmQ6IChsYXllck5hbWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC5iYWNrZ3JvdW5kTGF5ZXIgPSB0aGlzLmdhbWUuYWRkLnRpbGVTcHJpdGUoXHJcbiAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxDb25maWcud2lkdGgsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmhlaWdodCxcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxDb25maWcuYmFja2dyb3VuZEtleVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlTGF5ZXI6IChsYXllcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsW2xheWVyXSA9IHRoaXMubGV2ZWwudGlsZW1hcC5jcmVhdGVMYXllcih0aGlzLmxldmVsQ29uZmlnW2xheWVyXSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGVMYXllcnM6IChsYXllcnMpID0+IHtcclxuICAgICAgICAgICAgZm9yKGxldCBsYXllciBpbiBsYXllcnMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbFtsYXllcl0gPSB0aGlzLmxldmVsLnRpbGVtYXAuY3JlYXRlTGF5ZXIodGhpcy5sZXZlbENvbmZpZy5sYXllcnNbbGF5ZXJdLmtleSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsW2xheWVyXS52aXNpYmxlID0gdGhpcy5sZXZlbENvbmZpZy5sYXllcnNbbGF5ZXJdLnZpc2libGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZVRpbGVzOiAodGlsZW1hcEtleSwgdGlsZXNldEtleSwgdGlsZXNldEltYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcCA9IHRoaXMuZ2FtZS5hZGQudGlsZW1hcCh0aWxlbWFwS2V5KTtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC50aWxlbWFwLmFkZFRpbGVzZXRJbWFnZSh0aWxlc2V0SW1hZ2UsIHRpbGVzZXRLZXkpO1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLnRpbGVtYXAuc2V0Q29sbGlzaW9uQmV0d2VlbigwLCAzMDAwLCB0cnVlLCB0aGlzLmxldmVsQ29uZmlnLmxheWVycy5jb2xsaXNpb25MYXllci5rZXkpO1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLnRpbGVtYXAuc2V0Q29sbGlzaW9uQmV0d2VlbigwLCAzMDAwLCB0cnVlLCB0aGlzLmxldmVsQ29uZmlnLmxheWVycy5kZWF0aExheWVyLmtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxldmVsTG9hZGVyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsTG9hZGVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==