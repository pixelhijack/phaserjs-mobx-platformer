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
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
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
        key: 'follow',
        value: function follow() {
            var playerAt = this.game.state.states[this.game.state.current].gameState.playerAt;
            if (playerAt.x > this.body.x - this.props.sense && playerAt.x < this.body.x + this.props.sense && playerAt.y > this.body.y - this.props.sense && playerAt.y < this.body.y + this.props.sense) {
                this.setBounds({
                    x1: playerAt.x - this.props.sense / 2,
                    x2: playerAt.x + this.props.sense / 2,
                    y1: playerAt.y - this.props.sense / 2,
                    y2: playerAt.y + this.props.sense / 2
                });
            } else {
                this.setBounds(this.props.boundTo);
            }
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ExtendedSprite2 = __webpack_require__(1);

var _ExtendedSprite3 = _interopRequireDefault(_ExtendedSprite2);

var _Item = __webpack_require__(6);

var _Item2 = _interopRequireDefault(_Item);

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
            nohit: 0,
            nobuild: 0
        });
        return _this;
    }

    _createClass(Human, [{
        key: 'build',
        value: function build(x, y) {
            var step = new _Item2.default(this.game, x, y, 'pre2atlas', {
                animations: [{ name: 'idle', frames: [298], fps: 10, loop: false }]
            });
            this.game.state.states[this.game.state.current].items.platforms.add(step);
            this.updateState({
                nobuild: this.game.time.now + 3000
            });
        }
    }]);

    return Human;
}(_ExtendedSprite3.default);

exports.default = Human;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _menu = __webpack_require__(23);

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

var _levelLoader = __webpack_require__(40);

var _levelLoader2 = _interopRequireDefault(_levelLoader);

var _creatureFactory = __webpack_require__(29);

var _creatureFactory2 = _interopRequireDefault(_creatureFactory);

var _creatureconfig = __webpack_require__(7);

var _creatureconfig2 = _interopRequireDefault(_creatureconfig);

var _play = __webpack_require__(25);

var _play2 = _interopRequireDefault(_play);

var _play3 = __webpack_require__(26);

var _play4 = _interopRequireDefault(_play3);

var _play5 = __webpack_require__(24);

var _play6 = _interopRequireDefault(_play5);

var _play7 = __webpack_require__(27);

var _play8 = _interopRequireDefault(_play7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Play = function Play(globalConfig) {
    _classCallCheck(this, Play);

    this.keys = undefined;
    this.player = undefined;
    this.enemy = undefined;
    this.gameState = undefined;
    this.items = {
        bonus: undefined,
        portals: undefined,
        platforms: undefined
    };
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


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_Phaser$Sprite) {
    _inherits(Item, _Phaser$Sprite);

    function Item(game, x, y, sprite, props) {
        _classCallCheck(this, Item);

        var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, game, x, y, sprite));

        _this.game = game;
        _this.props = props || { animations: [] };
        _this.game.add.existing(_this);
        _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.anchor.setTo(0.5, 1);
        _this.body.gravity.y = 0;
        _this.allowGravity = false;
        _this.body.immovable = true;

        _this.props.animations.forEach(function (animation) {
            _this.animations.add(animation.name, animation.frames.map(function (frame) {
                return frame.toString();
            }), animation.fps, animation.loop);
        });
        return _this;
    }

    _createClass(Item, [{
        key: 'update',
        value: function update() {
            this.animations.play('idle');
        }
    }]);

    return Item;
}(Phaser.Sprite);

;

exports.default = Item;

/***/ }),
/* 7 */
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
    behaviours: [{ action: 'turnIfBlocked' }, { action: 'move' }, { action: 'checkBounds' }, { action: 'follow' }, { action: 'when', params: { probability: 0.01, action: 'jump' } }],
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
    behaviours: [{ action: 'turnIfBlocked' }, { action: 'move' }, { action: 'checkBounds' }, { action: 'follow' }, { action: 'when', params: { probability: 0.03, action: 'jump' } }],
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
    behaviours: [{ action: 'turnIfBlocked' }, { action: 'move' }, { action: 'checkBounds' }, { action: 'follow' }, { action: 'when', params: { probability: 0.02, action: 'jump' } }],
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
    behaviours: [{ action: 'turnIfBlocked' }, { action: 'move' }, { action: 'checkBounds' }, { action: 'follow' }, { action: 'when', params: { probability: 0.1, action: 'jump' } }],
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
/* 23 */
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
/* 24 */
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

    if (this.levelConfig.maxHeight) {
        this.game.scale.setGameSize(this.globalConfig.width, this.levelConfig.maxHeight);
    }

    // [SET LEVEL] fix background, resize
    this.level.backgroundLayer.fixedToCamera = this.levelConfig.fixedBackground;
    this.level.groundLayer.resizeWorld();

    this.gameState = mobx.observable({
        initialised: false,
        score: 0,
        playerAt: {
            x: undefined,
            y: undefined
        }
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

    this.keys.alt = this.game.input.keyboard.addKey(Phaser.Keyboard.ALT);
    this.keys.control = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
    this.keys.shift = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

    // items & platforms
    this.items.platforms = new Phaser.Group(this.game);

    // score text
    this.menu = this.game.add.text(this.globalConfig.width - 120, 0, "Life: " + this.player.spriteState.life, { font: "24px Courier", fill: "#fff", align: "center" });
    this.menu.fixedToCamera = true;
    mobx.observe(this.player.spriteState, function (change) {
        _this.menu.setText("Life: " + _this.player.spriteState.life);
    });
};

exports.default = create;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = __webpack_require__(30);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init(levelConfig) {
    console.log('[PHASER][Component][Init]', levelConfig);
    this.levelConfig = levelConfig || _index2.default.create();
};

exports.default = init;

/***/ }),
/* 26 */
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
    this.scale.setMinMax(0, 0, this.globalConfig.width * 1.4, this.globalConfig.height * 1.4);
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
/* 27 */
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

    this.game.physics.arcade.collide(this.player, this.items.platforms);

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
    // player make noise
    this.gameState.playerAt.x = this.player.body.x | 0;
    this.gameState.playerAt.y = this.player.body.y | 0;

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
        }
    }

    if (this.keys.alt.isDown) {
        if (this.player.spriteState.nobuild < this.game.time.now) {
            var x = this.player.facingRight ? this.player.body.x + 40 : this.player.body.x - 20,
                y = this.player.body.y - 20;
            this.player.build(x | 0, y | 0);
        }
    }
}

exports.default = update;

/***/ }),
/* 28 */
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bat = __webpack_require__(8);

var _bat2 = _interopRequireDefault(_bat);

var _bear = __webpack_require__(9);

var _bear2 = _interopRequireDefault(_bear);

var _bug = __webpack_require__(10);

var _bug2 = _interopRequireDefault(_bug);

var _dino = __webpack_require__(11);

var _dino2 = _interopRequireDefault(_dino);

var _dragonfly = __webpack_require__(12);

var _dragonfly2 = _interopRequireDefault(_dragonfly);

var _frog = __webpack_require__(13);

var _frog2 = _interopRequireDefault(_frog);

var _gorilla = __webpack_require__(14);

var _gorilla2 = _interopRequireDefault(_gorilla);

var _insect = __webpack_require__(15);

var _insect2 = _interopRequireDefault(_insect);

var _jelly = __webpack_require__(16);

var _jelly2 = _interopRequireDefault(_jelly);

var _native = __webpack_require__(17);

var _native2 = _interopRequireDefault(_native);

var _parrot = __webpack_require__(18);

var _parrot2 = _interopRequireDefault(_parrot);

var _ptero = __webpack_require__(19);

var _ptero2 = _interopRequireDefault(_ptero);

var _spider = __webpack_require__(20);

var _spider2 = _interopRequireDefault(_spider);

var _tiger = __webpack_require__(21);

var _tiger2 = _interopRequireDefault(_tiger);

var _turtle = __webpack_require__(22);

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
            var props = _this.creatureConfig[levelConfig.type];
            props.boundTo = levelConfig.boundTo;

            var enemy = new _AI2.default(_this.game, levelConfig.origin.x, levelConfig.origin.y, _this.globalConfig.textureAtlasName, props, _this.creatureConfig[levelConfig.type].behaviours);
            enemy.setBounds(enemy.props.boundTo);
            _this.enemies.add(enemy);
        }
    };
};

exports.default = creatureFactory;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _levelBuilder = __webpack_require__(31);

var _levelBuilder2 = _interopRequireDefault(_levelBuilder);

var _levelConfig = __webpack_require__(35);

var _levelConfig2 = _interopRequireDefault(_levelConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var levelGenerator = {
    create: function create() {
        var levelBuilder = new _levelBuilder2.default('rise-of-the-tide', _levelConfig2.default);
        return levelBuilder.createLayers(34 * 3, 23 * 10).randomBackground().build();
    }
};

exports.default = levelGenerator;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(39);

var _layers = __webpack_require__(33);

var _platforms = __webpack_require__(36);

var _platforms2 = _interopRequireDefault(_platforms);

var _tilemaps = __webpack_require__(37);

var _tilemaps2 = _interopRequireDefault(_tilemaps);

var _tilesets = __webpack_require__(38);

var _tilesets2 = _interopRequireDefault(_tilesets);

var _backgrounds = __webpack_require__(32);

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
        type: enemyTypes[Math.floor(Math.random() * enemyTypes.length)],
        number: 1,
        lifespan: Infinity,
        origin: {
            x: (xTile + tilesWidth / 2) * 16,
            y: yTile * 16
        },
        boundTo: {
            x1: xTile * 16,
            x2: (xTile + tilesWidth) * 16
        }
    };
};

var getCollisionLayer = function getCollisionLayer(flatMatrix, collisionTiles) {
    var matrix = flatMatrix.slice(0).map(function (tile) {
        return collisionTiles.indexOf(tile) > -1 ? tile : 0;
    });
    return matrix;
};

var LevelBuilder = function LevelBuilder(id, levelConfig) {
    var level = Object.assign(levelConfig, _tilemaps2.default[id]);
    return {
        createLayers: function createLayers(tilesWidth, tilesHeight) {
            // 100: rare, 40: frequent
            var density = 100,
                retry = Math.floor(tilesWidth * tilesHeight / density);
            var placesFor = findPlacesFor((0, _utils.createMatrix)(tilesHeight, tilesWidth, 0), _platforms2.default[id].groundLayer, retry);

            level.enemies = placesFor.enemies.map(function (enemy) {
                return createEnemyAt.apply(null, enemy);
            });

            _layers.groundLayer.data = (0, _utils.flatten)(placesFor.islands);
            _layers.collisionLayer.data = getCollisionLayer(_layers.groundLayer.data, _platforms2.default[id].collisionTiles);
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
            level.tiledJson.tilesets = [_tilesets2.default[id]];
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var backgrounds = [{
    backgroundImage: "bg3seamless",
    backgroundImageExtension: ".jpg",
    maxHeight: 434
}, {
    backgroundImage: "volcano",
    backgroundImageExtension: ".png",
    maxHeight: 341
}, {
    backgroundImage: "cave",
    backgroundImageExtension: ".png",
    maxHeight: 416
}, {
    backgroundImage: "bg1seamless",
    backgroundImageExtension: ".png",
    maxHeight: 372
}, {
    backgroundImage: "forest-green",
    backgroundImageExtension: ".png",
    maxHeight: 420
}, {
    backgroundImage: "forest-fire",
    backgroundImageExtension: ".png",
    maxHeight: 340
}, {
    backgroundImage: "forest-orange",
    backgroundImageExtension: ".png",
    maxHeight: 420
}, {
    backgroundImage: "forest-pink",
    backgroundImageExtension: ".png",
    maxHeight: 350
}, {
    backgroundImage: "forest",
    backgroundImageExtension: ".png",
    maxHeight: 420
}, {
    backgroundImage: "graveyard",
    backgroundImageExtension: ".png",
    maxHeight: 339
}, {
    backgroundImage: "ice-green",
    backgroundImageExtension: ".png",
    maxHeight: 423
}, {
    backgroundImage: "ice",
    backgroundImageExtension: ".png",
    maxHeight: 423
}, {
    backgroundImage: "snow",
    backgroundImageExtension: ".png",
    maxHeight: 339
}];

exports.default = backgrounds;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var groundLayer = exports.groundLayer = {
    "data": [],
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
    "data": [],
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
    "data": [],
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
		"data": [],
		"height": 23,
		"name": "ground-layer",
		"opacity": 1,
		"type": "tilelayer",
		"visible": true,
		"width": 34,
		"x": 0,
		"y": 0
	}, {
		"data": [],
		"height": 23,
		"name": "collision-layer",
		"opacity": 1,
		"type": "tilelayer",
		"visible": false,
		"width": 34,
		"x": 0,
		"y": 0
	}, {
		"data": [],
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
	"tilesets": [],
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
	"id": "",
	"name": "",
	"tileset": "",
	"tilemap": "",
	"tiledJson": _level2.default,
	"tilesetImage": "",
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
var platformsById = {
    'rise-of-the-tide': {
        groundLayer: [[[0, 0, 0, 0], [0, 77, 78, 0], [0, 91, 92, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [77, 111, 111, 78], [91, 130, 130, 92], [0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0], [77, 111, 111, 142, 111, 142, 78], [91, 130, 130, 144, 130, 144, 92], [0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0], [0, 18, 19, 16], [15, 79, 23, 52], [58, 93, 39, 34], [112, 113, 34, 83], [77, 111, 111, 78], [91, 130, 130, 92], [0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 77, 111, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 91, 130, 92, 0, 0, 0, 77, 111, 78, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 91, 130, 92, 0, 0, 0, 77, 78, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 92, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 64, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 64, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 64, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 64, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77, 111, 78, 0], [0, 0, 0, 0, 0, 0, 0, 77, 78, 0, 0, 0, 0, 91, 130, 92, 0], [0, 77, 111, 78, 0, 0, 0, 91, 92, 77, 78, 0, 0, 0, 0, 0, 0], [0, 91, 130, 92, 0, 0, 0, 0, 0, 91, 92, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0], [0, 97, 98, 99, 100, 105, 0], [0, 0, 122, 127, 121, 0, 0], [0, 0, 37, 57, 31, 0, 0], [0, 0, 37, 57, 121, 0, 0], [0, 0, 58, 67, 31, 0, 0], [0, 84, 85, 136, 121, 0, 0], [0, 0, 58, 67, 31, 0, 0], [0, 0, 2, 57, 52, 0, 0], [0, 0, 21, 67, 34, 0, 0], [0, 0, 37, 57, 121, 0, 0], [0, 0, 2684354681, 2684354591, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 98, 99, 243, 100, 105, 97, 64, 97, 97, 64, 97, 64, 97, 98, 99, 100, 104, 104, 105, 0], [0, 122, 127, 126, 206, 0, 0, 0, 0, 0, 0, 0, 0, 0, 245, 127, 125, 126, 127, 0, 0], [0, 0, 2684354681, 2684354591, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 230, 216, 230, 230, 216, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 19, 20, 17, 63, 16, 18, 19, 20, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 17, 63, 34, 13, 35, 67, 32, 33, 34, 13, 35, 45, 46, 31, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 30, 4, 80, 12, 53, 65, 66, 4, 80, 56, 57, 11, 110, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 17, 110, 79, 22, 23, 44, 45, 46, 79, 22, 23, 44, 45, 128, 112, 113, 107, 20, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 2, 57, 11, 38, 39, 55, 114, 12, 53, 38, 39, 29, 49, 50, 51, 59, 51, 131, 96, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 15, 79, 67, 32, 33, 34, 13, 35, 46, 79, 107, 108, 112, 76, 61, 62, 60, 76, 61, 131, 14, 0, 0, 0, 0], [0, 0, 0, 0, 0, 58, 11, 12, 53, 65, 66, 4, 93, 89, 90, 29, 56, 129, 59, 59, 49, 73, 47, 88, 141, 34, 0, 0, 0, 0], [0, 0, 0, 0, 15, 67, 32, 46, 79, 22, 23, 44, 113, 107, 108, 109, 128, 112, 133, 60, 76, 61, 62, 167, 100, 104, 229, 0, 0, 0], [0, 0, 0, 20, 90, 29, 79, 129, 93, 89, 90, 29, 29, 48, 49, 50, 51, 131, 59, 62, 73, 47, 24, 180, 125, 126, 121, 0, 0, 0], [0, 0, 0, 2, 108, 109, 128, 112, 113, 107, 108, 109, 133, 60, 76, 61, 62, 132, 133, 62, 167, 100, 197, 34, 45, 46, 31, 0, 0, 0], [0, 0, 0, 21, 49, 50, 51, 131, 59, 48, 49, 50, 51, 76, 133, 62, 132, 73, 47, 24, 124, 124, 127, 4, 114, 57, 121, 0, 0, 0], [0, 0, 0, 37, 76, 132, 137, 138, 133, 60, 76, 139, 178, 132, 137, 138, 132, 167, 100, 197, 32, 33, 34, 44, 35, 67, 31, 0, 0, 0], [0, 0, 0, 58, 184, 73, 184, 73, 138, 195, 184, 193, 194, 73, 184, 73, 88, 180, 124, 127, 11, 3221225494, 3221225551, 3221225518, 3221225504, 3221225539, 3221225487, 0, 0, 0], [0, 97, 98, 99, 100, 104, 100, 104, 100, 104, 100, 204, 205, 104, 100, 104, 197, 13, 35, 67, 32, 3221225537, 3221225525, 3221225484, 3221225483, 3221225530, 0, 0, 0, 0], [0, 0, 122, 125, 124, 127, 125, 126, 123, 206, 124, 207, 208, 126, 123, 206, 124, 4, 80, 12, 53, 3221225505, 3221225504, 3221225539, 3221225551, 3221225487, 0, 0, 0, 0], [0, 0, 3221225492, 3221225579, 3221225585, 3221225584, 3221225600, 3221225517, 3221225516, 3221225495, 3221225494, 3221225551, 3221225518, 3221225517, 3221225516, 3221225495, 3221225494, 3221225551, 45, 46, 79, 3221225510, 3221225483, 3221225529, 3221225474, 0, 0, 0, 0, 0], [0, 0, 0, 3221225582, 3221225483, 3221225529, 3221225528, 3221225552, 3221225476, 3221225538, 3221225537, 3221225525, 3221225484, 3221225552, 3221225476, 3221225502, 3221225475, 3221225474, 3221225524, 3221225495, 3221225494, 3221225485, 3221225506, 3221225582, 3221225489, 0, 0, 0, 0, 0], [0, 0, 0, 0, 3221225503, 3221225518, 3221225517, 3221225507, 3221225485, 3221225506, 3221225505, 3221225504, 3221225532, 3221225580, 3221225579, 3221225585, 3221225584, 3221225600, 3221225581, 3221225551, 3221225617, 3221225491, 3221225490, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3221225490, 3221225489, 3221225492, 3221225491, 3221225490, 3221225488, 3221225535, 3221225489, 3221225568, 3221225510, 3221225502, 3221225475, 3221225538, 3221225537, 3221225474, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3221225486, 3221225580, 3221225579, 3221225506, 3221225582, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3221225489, 3221225488, 3221225490, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]],
        collisionTiles: [24, 64, 77, 78, 91, 92, 97, 98, 99, 100, 104, 105, 111, 123, 124, 125, 126, 127, 130, 167, 180, 195, 197, 204, 205, 206, 207, 208, 229, 243]
    },
    'hall-of-ages': {
        groundLayer: [[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 307, 157, 158, 157, 158, 157, 158, 157, 158, 308, 0], [0, 309, 310, 311, 310, 311, 310, 311, 310, 311, 312, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0], [0, 307, 157, 308, 0], [0, 309, 310, 312, 0], [0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0], [0, 307, 157, 158, 308, 0], [0, 309, 310, 311, 312, 0], [0, 0, 0, 0, 0, 0]]],
        collisionTiles: [307, 157, 158, 308, 309, 310, 311, 312]
    }
};
exports.default = platformsById;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var levels = {
    'rise-of-the-tide': {
        'id': 'rise-of-the-tide',
        'name': 'Rise of the Tide',
        'tileset': 'tileset-level-rise-of-the-tide',
        'tilemap': 'tilemap-level-rise-of-the-tide',
        'tilesetImage': 'L1'
    },
    'hall-of-ages': {
        'id': 'hall-of-ages',
        'name': 'Hall of Ages',
        'tileset': 'tileset-level-hall-of-ages',
        'tilemap': 'tilemap-level-hall-of-ages',
        'tilesetImage': 'L8'
    }
};

exports.default = levels;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
var tilesets = {
   'rise-of-the-tide': {
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
   },
   'hall-of-ages': {
      "columns": 11,
      "firstgid": 1,
      "image": "L8.png",
      "imageheight": 608,
      "imagewidth": 176,
      "margin": 0,
      "name": "L8",
      "properties": {},
      "spacing": 0,
      "tilecount": 418,
      "tileheight": 16,
      "tilewidth": 16
   }
};

exports.default = tilesets;

/***/ }),
/* 39 */
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
/* 40 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTZhYmVmNjNhNWRmYjQ5YTdkNzIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL21lbnUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0l0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmF0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmVhci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Rpbm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9kcmFnb25mbHkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9mcm9nLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZ29yaWxsYS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2luc2VjdC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2plbGx5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvbmF0aXZlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcGFycm90LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcHRlcm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9zcGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy90aWdlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvbWVudS9tZW51LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmluaXQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5wcmVsb2FkLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkudXBkYXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9jcmVhdHVyZUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL2xldmVsQnVpbGRlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9iYWNrZ3JvdW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9sYXllcnMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9tb2RlbHMvbGV2ZWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9tb2RlbHMvbGV2ZWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9tb2RlbHMvcGxhdGZvcm1zLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL3RpbGVtYXBzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL3RpbGVzZXRzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbExvYWRlci5qcyJdLCJuYW1lcyI6WyJBSSIsImdhbWUiLCJ4IiwieSIsInNwcml0ZSIsInByb3BzIiwiYmVoYXZpb3VycyIsImlkIiwidHlwZSIsInNwcml0ZVN0YXRlIiwibW9ieCIsIm9ic2VydmFibGUiLCJsaWZlIiwic3R1biIsImhpdCIsIm5vaGl0IiwiYm9keSIsImJsb2NrZWQiLCJsZWZ0IiwicmlnaHQiLCJzY2FsZSIsInBsYXllckF0Iiwic3RhdGUiLCJzdGF0ZXMiLCJjdXJyZW50IiwiZ2FtZVN0YXRlIiwic2Vuc2UiLCJzZXRCb3VuZHMiLCJ4MSIsIngyIiwieTEiLCJ5MiIsImJvdW5kVG8iLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiaGFzT3duUHJvcGVydHkiLCJQaGFzZXIiLCJQb2ludCIsIlJlY3RhbmdsZSIsImhlaWdodCIsImNvbnRhaW5zUG9pbnQiLCJnZXRCb3VuZHMiLCJmYWNpbmdSaWdodCIsInR1cm4iLCJmYWNpbmdMZWZ0Iiwid2lkdGgiLCJwYXJhbXMiLCJNYXRoIiwicmFuZG9tIiwicHJvYmFiaWxpdHkiLCJhY3Rpb24iLCJjYWxsIiwiZm9yRWFjaCIsImJlaGF2aW91ciIsIkV4dGVuZGVkU3ByaXRlIiwiYW5pbWF0aW9ucyIsImFkZCIsImV4aXN0aW5nIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoeXNpY3MiLCJBUkNBREUiLCJhbmNob3IiLCJzZXRUbyIsImNvbGxpZGVXb3JsZEJvdW5kcyIsImNoZWNrV29ybGRCb3VuZHMiLCJvdXRPZkJvdW5kc0tpbGwiLCJncmF2aXR5IiwiX2RlYnVnVGV4dCIsImFkZENoaWxkIiwidGV4dCIsImZvbnQiLCJmaWxsIiwidmlzaWJsZSIsImFuaW1hdGlvbiIsIm5hbWUiLCJmcmFtZXMiLCJtYXAiLCJmcmFtZSIsInRvU3RyaW5nIiwiZnBzIiwibG9vcCIsIm9ic2VydmUiLCJjaGFuZ2UiLCJjb25zb2xlIiwibG9nIiwidXBkYXRlU3RhdGUiLCJhc3NpZ24iLCJ2ZWxvY2l0eSIsIm1heFNwZWVkIiwiYWNjZWxlcmF0aW9uIiwicGxheSIsIm1vdmVSaWdodCIsIm1vdmVMZWZ0IiwidG91Y2hpbmciLCJkb3duIiwiaGl0VW50aWwiLCJ0aW1lIiwibm93IiwiYnJlYWtVbnRpbCIsImRpcmVjdGlvbiIsInNldFRleHQiLCJTcHJpdGUiLCJIdW1hbiIsIm5vYnVpbGQiLCJzdGVwIiwiaXRlbXMiLCJwbGF0Zm9ybXMiLCJNZW51IiwidW5kZWZpbmVkIiwicHJvdG90eXBlIiwiY3JlYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsIlBsYXkiLCJnbG9iYWxDb25maWciLCJwbGF5ZXIiLCJlbmVteSIsImJvbnVzIiwicG9ydGFscyIsImxldmVsIiwiYmFja2dyb3VuZExheWVyIiwiZ3JvdW5kTGF5ZXIiLCJ0aWxlbWFwIiwiY3JlYXR1cmVDb25maWciLCJsZXZlbExvYWRlciIsImNyZWF0dXJlRmFjdG9yeSIsImluaXQiLCJwcmVsb2FkIiwidXBkYXRlIiwiYmxvY2tzIiwiZG9tRWxlbWVudCIsImJhY2tncm91bmRQYXRoIiwidGlsZXNldFBhdGgiLCJsZXZlbFBhdGgiLCJ0ZXh0dXJlQXRsYXNQYXRoIiwidGV4dHVyZUF0bGFzTmFtZSIsInRleHR1cmVBdGxhc0ltYWdlIiwidGV4dHVyZUF0bGFzSnNvbiIsIkl0ZW0iLCJhbGxvd0dyYXZpdHkiLCJpbW1vdmFibGUiLCJjcmVhdHVyZUNvbmZpZ3MiLCJjcmVhdHVyZURlZmF1bHRzIiwiYWN0aXZlIiwiYm91bmNlIiwibWFzcyIsImp1bXBpbmciLCJjb2xsaWRlIiwibGl2ZXMiLCJsaWZlc3BhbiIsIkluZmluaXR5IiwidGltZU9mIiwibWFuIiwiZGlubyIsImJlYXIiLCJpbWFnZSIsInRpZ2VyIiwicHRlcm8iLCJkcmFnb25mbHkiLCJiYXQiLCJzcGlkZXIiLCJuYXRpdmUiLCJwYXJyb3QiLCJpbnNlY3QiLCJidWciLCJmcm9nIiwidHVydGxlIiwiamVsbHkiLCJnb3JpbGxhIiwiY3JlYXR1cmUiLCJkZWZhdWx0cyIsInByb3AiLCJCYXQiLCJCZWFyIiwiQnVnIiwiRGlubyIsIkRyYWdvbmZseSIsIkZyb2ciLCJHb3JpbGxhIiwiSW5zZWN0IiwiSmVsbHkiLCJOYXRpdmUiLCJQYXJyb3QiLCJQdGVybyIsIlNwaWRlciIsIlRpZ2VyIiwiVHVydGxlIiwiYWR2YW5jZWRUaW1pbmciLCJhbGlnbiIsInNldCIsImlucHV0Iiwia2V5Ym9hcmQiLCJvbkRvd25DYWxsYmFjayIsImUiLCJpc05hTiIsImtleSIsInRlc3QiLCJmZXRjaCIsIm1ldGhvZCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJsZXZlbENvbmZpZyIsInN0YXJ0Iiwid29ybGQiLCJzdGFydFN5c3RlbSIsImNyZWF0ZUJhY2tncm91bmQiLCJjcmVhdGVUaWxlcyIsInRpbGVzZXQiLCJ0aWxlc2V0SW1hZ2UiLCJjcmVhdGVMYXllcnMiLCJsYXllcnMiLCJtYXhIZWlnaHQiLCJzZXRHYW1lU2l6ZSIsImZpeGVkVG9DYW1lcmEiLCJmaXhlZEJhY2tncm91bmQiLCJyZXNpemVXb3JsZCIsImluaXRpYWxpc2VkIiwic2NvcmUiLCJlbnRyeVBvaW50IiwiZW5lbWllcyIsIkdyb3VwIiwiY2FtZXJhIiwiZm9sbG93IiwiY3JlYXRlQ3Vyc29yS2V5cyIsInNwYWNlIiwiYWRkS2V5IiwiS2V5Ym9hcmQiLCJTUEFDRUJBUiIsImFsdCIsIkFMVCIsImNvbnRyb2wiLCJDT05UUk9MIiwic2hpZnQiLCJTSElGVCIsIm1lbnUiLCJzY2FsZU1vZGUiLCJTY2FsZU1hbmFnZXIiLCJTSE9XX0FMTCIsInBhZ2VBbGlnbkhvcml6b250YWxseSIsInBhZ2VBbGlnblZlcnRpY2FsbHkiLCJzZXRNaW5NYXgiLCJsb2FkIiwiYXRsYXMiLCJMb2FkZXIiLCJURVhUVVJFX0FUTEFTX0pTT05fSEFTSCIsImJhY2tncm91bmRLZXkiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJiYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb24iLCJ0aWxlc2V0SW1hZ2VFeHRlbnNpb24iLCJ0aWxlZEpzb24iLCJUaWxlbWFwIiwiVElMRURfSlNPTiIsImRlYnVnIiwiYXJjYWRlIiwiY29sbGlzaW9uTGF5ZXIiLCJkZWF0aExheWVyIiwib3ZlcmxhcCIsInVwIiwiaXNIaXR0aW5nIiwiaXNTdHVubmVkIiwiaHVydCIsIm9uS2V5UHJlc3MiLCJpc0Rvd24iLCJzdG9wIiwianVtcCIsImJ1aWxkIiwiUExBVEZPUk1FUiIsIkdhbWUiLCJBVVRPIiwiYmluZCIsIkNyZWF0dXJlIiwib3JpZ2luIiwibGV2ZWxHZW5lcmF0b3IiLCJsZXZlbEJ1aWxkZXIiLCJyYW5kb21CYWNrZ3JvdW5kIiwiZW5lbXlUeXBlcyIsImZpbmRQbGFjZXNGb3IiLCJhTWF0cml4IiwicmV0cnkiLCJtYXRyaXgiLCJzbGljZSIsIml0ZW0iLCJmbG9vciIsInB1c2giLCJpc2xhbmRzIiwiY3JlYXRlRW5lbXlBdCIsInhUaWxlIiwieVRpbGUiLCJ0aWxlc1dpZHRoIiwibnVtYmVyIiwiZ2V0Q29sbGlzaW9uTGF5ZXIiLCJmbGF0TWF0cml4IiwiY29sbGlzaW9uVGlsZXMiLCJ0aWxlIiwiaW5kZXhPZiIsIkxldmVsQnVpbGRlciIsInRpbGVzSGVpZ2h0IiwiZGVuc2l0eSIsInBsYWNlc0ZvciIsImFwcGx5IiwiZGF0YSIsInRpbGVzZXRzIiwiYmFja2dyb3VuZHMiLCJsZXZlbE1vZGVsIiwicGxhdGZvcm1zQnlJZCIsImxldmVscyIsImZsYXR0ZW4iLCJtdWx0aWRpbWVuc2lvbmFsIiwicmVkdWNlIiwicmVzIiwicm93IiwiY29uY2F0IiwiYXBwbHlNYXRyaXgiLCJiaWciLCJzbWFsbCIsImNvbCIsImNyZWF0ZU1hdHJpeCIsInJvd3MiLCJjb2xzIiwiaSIsImoiLCJsYXllclRvTWF0cml4IiwibGF5ZXIiLCJyZXN1bHQiLCJjaGVja0lmQXJlYUlzQ292ZXJlZCIsImZpbHRlckNvbGxpc2lvblRpbGVzIiwiZmxhdG1hdHJpeCIsImZpbHRlciIsInVuaXF1ZXMiLCJzb3J0IiwiYSIsImIiLCJsYXllck5hbWUiLCJ0aWxlU3ByaXRlIiwiY3JlYXRlTGF5ZXIiLCJ0aWxlbWFwS2V5IiwidGlsZXNldEtleSIsImFkZFRpbGVzZXRJbWFnZSIsInNldENvbGxpc2lvbkJldHdlZW4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFD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QnNOLFVBQXRCLENBQXJCO0FBQ0Esa0JBQUt6TixLQUFMLENBQVdHLE9BQVgsQ0FBbUJ3TixlQUFuQixDQUFtQ2pJLFlBQW5DLEVBQWlEZ0ksVUFBakQ7QUFDQSxrQkFBSzFOLEtBQUwsQ0FBV0csT0FBWCxDQUFtQnlOLG1CQUFuQixDQUF1QyxDQUF2QyxFQUEwQyxJQUExQyxFQUFnRCxJQUFoRCxFQUFzRCxNQUFLekksV0FBTCxDQUFpQlMsTUFBakIsQ0FBd0I0QyxjQUF4QixDQUF1QzVELEdBQTdGO0FBQ0Esa0JBQUs1RSxLQUFMLENBQVdHLE9BQVgsQ0FBbUJ5TixtQkFBbkIsQ0FBdUMsQ0FBdkMsRUFBMEMsSUFBMUMsRUFBZ0QsSUFBaEQsRUFBc0QsTUFBS3pJLFdBQUwsQ0FBaUJTLE1BQWpCLENBQXdCNkMsVUFBeEIsQ0FBbUM3RCxHQUF6RjtBQUNIO0FBeEJFLEtBQVA7QUEwQkg7O2tCQUVjdkUsVyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyOCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNTZhYmVmNjNhNWRmYjQ5YTdkNzIiLCJpbXBvcnQgRXh0ZW5kZWRTcHJpdGUgZnJvbSAnLi9FeHRlbmRlZFNwcml0ZSc7XHJcblxyXG5jbGFzcyBBSSBleHRlbmRzIEV4dGVuZGVkU3ByaXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMsIGJlaGF2aW91cnMpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLmlkID0gYCR7cHJvcHMudHlwZX0tJHt4fS0ke3l9YDtcclxuXHJcbiAgICAgICAgdGhpcy5iZWhhdmlvdXJzID0gYmVoYXZpb3VycztcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGxpZmU6IDEwLFxyXG4gICAgICAgICAgICBzdHVuOiAwLFxyXG4gICAgICAgICAgICBoaXQ6IDAsXHJcbiAgICAgICAgICAgIG5vaGl0OiAwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gICAgdHVybklmQmxvY2tlZCgpe1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS5ibG9ja2VkLmxlZnQgfHwgdGhpcy5ib2R5LmJsb2NrZWQucmlnaHQpe1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlLnggKj0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdHVybigpe1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCAqPSAtMTtcclxuICAgIH1cclxuICAgIGZvbGxvdygpe1xyXG4gICAgICAgIGNvbnN0IHBsYXllckF0ID0gdGhpcy5nYW1lLnN0YXRlLnN0YXRlc1t0aGlzLmdhbWUuc3RhdGUuY3VycmVudF0uZ2FtZVN0YXRlLnBsYXllckF0O1xyXG4gICAgICAgIGlmKFxyXG4gICAgICAgICAgICBwbGF5ZXJBdC54ID4gdGhpcy5ib2R5LnggLSB0aGlzLnByb3BzLnNlbnNlICYmXHJcbiAgICAgICAgICAgIHBsYXllckF0LnggPCB0aGlzLmJvZHkueCArIHRoaXMucHJvcHMuc2Vuc2UgJiZcclxuICAgICAgICAgICAgcGxheWVyQXQueSA+IHRoaXMuYm9keS55IC0gdGhpcy5wcm9wcy5zZW5zZSAmJlxyXG4gICAgICAgICAgICBwbGF5ZXJBdC55IDwgdGhpcy5ib2R5LnkgKyB0aGlzLnByb3BzLnNlbnNlXHJcbiAgICAgICAgKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRCb3VuZHMoe1xyXG4gICAgICAgICAgICAgICAgeDE6IHBsYXllckF0LnggLSB0aGlzLnByb3BzLnNlbnNlIC8gMixcclxuICAgICAgICAgICAgICAgIHgyOiBwbGF5ZXJBdC54ICsgdGhpcy5wcm9wcy5zZW5zZSAvIDIsXHJcbiAgICAgICAgICAgICAgICB5MTogcGxheWVyQXQueSAtIHRoaXMucHJvcHMuc2Vuc2UgLyAyLFxyXG4gICAgICAgICAgICAgICAgeTI6IHBsYXllckF0LnkgKyB0aGlzLnByb3BzLnNlbnNlIC8gMlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldEJvdW5kcyh0aGlzLnByb3BzLmJvdW5kVG8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNldEJvdW5kcyhib3VuZFRvKXtcclxuICAgICAgICBpZighYm91bmRUbyB8fCAhT2JqZWN0LmtleXMoYm91bmRUbykubGVuZ3RoKXtcclxuICAgICAgICAgICAgdGhpcy5ib3VuZFRvID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihib3VuZFRvLmhhc093blByb3BlcnR5KCd4JykgJiZcclxuICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneScpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRUbyA9IG5ldyBQaGFzZXIuUG9pbnQoXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby54LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEBSZWN0YW5nbGUgeyB4MSwgeDIgfVxyXG4gICAgICAgIGlmKGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3gxJykgJiZcclxuICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneDInKSAmJlxyXG4gICAgICAgICAgICAhYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTEnKSAmJlxyXG4gICAgICAgICAgICAhYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTInKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvdW5kVG8gPSBuZXcgUGhhc2VyLlJlY3RhbmdsZShcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngxLFxyXG4gICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby54MiAtIGJvdW5kVG8ueDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmhlaWdodFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHt4MSwgeTEsIHgyLCB5Mn1cclxuICAgICAgICBpZihib3VuZFRvLmhhc093blByb3BlcnR5KCd4MScpICYmXHJcbiAgICAgICAgICAgIGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3gyJykgJiZcclxuICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneTEnKSAmJlxyXG4gICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd5MicpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRUbyA9IG5ldyBQaGFzZXIuUmVjdGFuZ2xlKFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDEsXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby55MSxcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngyIC0gYm91bmRUby54MSxcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLnkyIC0gYm91bmRUby55MVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjaGVja0JvdW5kcygpe1xyXG4gICAgICAgIGlmKCF0aGlzLmJvdW5kVG8pe1xyXG4gICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEBQb2ludCB7eCwgeX1cclxuICAgICAgICBpZighdGhpcy5ib3VuZFRvLmhhc093blByb3BlcnR5KCd3aWR0aCcpICYmXHJcbiAgICAgICAgICAgICFQaGFzZXIuUmVjdGFuZ2xlLmNvbnRhaW5zUG9pbnQodGhpcy5nZXRCb3VuZHMoKSwgdGhpcy5ib3VuZFRvKSAmJlxyXG4gICAgICAgICAgICAoKHRoaXMueCA8IHRoaXMuYm91bmRUby54ICYmICF0aGlzLmZhY2luZ1JpZ2h0KSB8fFxyXG4gICAgICAgICAgICAodGhpcy54ID4gdGhpcy5ib3VuZFRvLnggJiYgdGhpcy5mYWNpbmdSaWdodCkpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudHVybigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQFJlY3RhbmdsZSB7eDEsIHgyfSBvciB7eDEsIHkxLCB4MiwgeTJ9XHJcbiAgICAgICAgaWYodGhpcy5ib3VuZFRvICYmXHJcbiAgICAgICAgICAgIHRoaXMuYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSAmJlxyXG4gICAgICAgICAgICAodGhpcy54IDwgdGhpcy5ib3VuZFRvLnggJiYgdGhpcy5mYWNpbmdMZWZ0IHx8XHJcbiAgICAgICAgICAgIHRoaXMueCA+IHRoaXMuYm91bmRUby54ICsgdGhpcy5ib3VuZFRvLndpZHRoICYmIHRoaXMuZmFjaW5nUmlnaHQpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudHVybigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHdoZW4ocGFyYW1zKSB7XHJcblx0XHRpZihNYXRoLnJhbmRvbSgpIDwgcGFyYW1zLnByb2JhYmlsaXR5KXtcclxuXHRcdFx0dGhpc1twYXJhbXMuYWN0aW9uXSAmJiB0aGlzW3BhcmFtcy5hY3Rpb25dLmNhbGwodGhpcyk7XHJcblx0XHR9XHJcblx0fVxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgLy9jb25zdCBkZWJ1Z0JvdW5kcyA9IHRoaXMuaWQrJ1xcbicrICh0aGlzLmJvdW5kVG8gJiYgT2JqZWN0LmtleXModGhpcy5ib3VuZFRvKS5sZW5ndGggJiYgdGhpcy5ib3VuZFRvLngpICsnXFxuJysgKHRoaXMueCB8IDApO1xyXG4gICAgICAgIC8vdGhpcy5kZWJ1ZyhkZWJ1Z0JvdW5kcyk7XHJcbiAgICAgICAgdGhpcy5iZWhhdmlvdXJzLmZvckVhY2goKGJlaGF2aW91cikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzW2JlaGF2aW91ci5hY3Rpb25dICYmIHRoaXNbYmVoYXZpb3VyLmFjdGlvbl0uY2FsbCh0aGlzLCBiZWhhdmlvdXIucGFyYW1zKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQUk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9BSS5qcyIsImNsYXNzIEV4dGVuZGVkU3ByaXRlIGV4dGVuZHMgUGhhc2VyLlNwcml0ZXtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHMgfHwgeyBhbmltYXRpb25zOiBbXSB9O1xyXG4gICAgICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41LCAxKTtcclxuICAgICAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub3V0T2ZCb3VuZHNLaWxsID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gdGhpcy5wcm9wcy5ncmF2aXR5O1xyXG4gICAgICAgIHRoaXMuX2RlYnVnVGV4dCA9IHRoaXMuYWRkQ2hpbGQoXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGQudGV4dCgyMCwgLTIwLCAnZGVidWcnLCB7IGZvbnQ6IFwiMTJweCBDb3VyaWVyXCIsIGZpbGw6IFwiI2ZmZmZmZlwiIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLl9kZWJ1Z1RleHQudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnByb3BzLmFuaW1hdGlvbnMuZm9yRWFjaChhbmltYXRpb24gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24uZnJhbWVzLm1hcChmcmFtZSA9PiBmcmFtZS50b1N0cmluZygpKSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcHMsXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ubG9vcFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBnYW1lU3RhdGUgPSB0aGlzLmdhbWUuc3RhdGUuc3RhdGVzW3RoaXMuZ2FtZS5zdGF0ZS5jdXJyZW50XS5nYW1lU3RhdGU7XHJcblxyXG4gICAgICAgIG1vYngub2JzZXJ2ZShnYW1lU3RhdGUsIChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZScsIGNoYW5nZSwgZ2FtZVN0YXRlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSA9IG1vYnguYWN0aW9uKChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IE9iamVjdC5hc3NpZ24odGhpcy5zcHJpdGVTdGF0ZSwgY2hhbmdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNIaXR0aW5nKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlU3RhdGUuaGl0ID4gdGhpcy5nYW1lLnRpbWUubm93O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc1N0dW5uZWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcHJpdGVTdGF0ZS5zdHVuID4gdGhpcy5nYW1lLnRpbWUubm93O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBmYWNpbmdSaWdodCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlLnggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBmYWNpbmdMZWZ0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCA8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUxlZnQoKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSAtMTtcclxuICAgICAgICBpZih0aGlzLmJvZHkudmVsb2NpdHkueCA+IC10aGlzLnByb3BzLm1heFNwZWVkKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggLT0gdGhpcy5wcm9wcy5hY2NlbGVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVSaWdodCgpe1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IDE7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnZlbG9jaXR5LnggPCB0aGlzLnByb3BzLm1heFNwZWVkKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggKz0gdGhpcy5wcm9wcy5hY2NlbGVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmUoKXtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheSgnbW92ZScpO1xyXG4gICAgICAgIGlmKHRoaXMuc2NhbGUueCA9PT0gMSl7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVJpZ2h0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlTGVmdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdG9wKCl7XHJcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggLz0gMS4xO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdzdG9wJyk7XHJcbiAgICB9XHJcblxyXG4gICAganVtcCgpe1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS50b3VjaGluZy5kb3duIHx8IHRoaXMuYm9keS5ibG9ja2VkLmRvd24pe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSAtPSAzMDA7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdqdW1wJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhpdCgpe1xyXG4gICAgICAgIGNvbnN0IGhpdFVudGlsID0gdGhpcy5nYW1lLnRpbWUubm93ICsgOTAwLFxyXG4gICAgICAgICAgICBicmVha1VudGlsID0gdGhpcy5nYW1lLnRpbWUubm93ICsgMTAwMDtcclxuICAgICAgICBjb25zb2xlLmxvZygnTm93ICVzIEhpdCAlcyBCcmVhayAlcycsIHRoaXMuZ2FtZS50aW1lLm5vdywgaGl0VW50aWwsIGJyZWFrVW50aWwpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICAgICAgICBoaXQ6IGhpdFVudGlsLFxyXG4gICAgICAgICAgICBub2hpdDogYnJlYWtVbnRpbFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdoaXQnKTtcclxuICAgIH1cclxuXHJcbiAgICBodXJ0KGRpcmVjdGlvbil7XHJcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgLT0gMTAwO1xyXG4gICAgICAgIGlmKGRpcmVjdGlvbiAmJiBkaXJlY3Rpb24ubGVmdCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC09IDEwMCB8fCB0aGlzLnByb3BzLm1heFNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkaXJlY3Rpb24gJiYgZGlyZWN0aW9uLnJpZ2h0KXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggKz0gMTAwIHx8IHRoaXMucHJvcHMubWF4U3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdodXJ0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVidWcodGV4dCl7XHJcbiAgICAgICB0aGlzLl9kZWJ1Z1RleHQudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICB0aGlzLl9kZWJ1Z1RleHQuc2NhbGUueCA9IHRoaXMuc2NhbGUueDtcclxuICAgICAgIHRoaXMuX2RlYnVnVGV4dC5zZXRUZXh0KHRleHQudG9TdHJpbmcoKSB8fCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnW1Nwcml0ZV0gc3RhdGUnKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4dGVuZGVkU3ByaXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvRXh0ZW5kZWRTcHJpdGUuanMiLCJpbXBvcnQgRXh0ZW5kZWRTcHJpdGUgZnJvbSAnLi9FeHRlbmRlZFNwcml0ZSc7XHJcbmltcG9ydCBJdGVtIGZyb20gJy4vSXRlbSc7XHJcblxyXG5jbGFzcyBIdW1hbiBleHRlbmRzIEV4dGVuZGVkU3ByaXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gbW9ieC5vYnNlcnZhYmxlKHtcclxuICAgICAgICAgICAgbGlmZTogMTAsXHJcbiAgICAgICAgICAgIHN0dW46IDAsXHJcbiAgICAgICAgICAgIGhpdDogMCxcclxuICAgICAgICAgICAgbm9oaXQ6IDAsXHJcbiAgICAgICAgICAgIG5vYnVpbGQ6IDBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGJ1aWxkKHgsIHkpe1xyXG4gICAgICAgIGNvbnN0IHN0ZXAgPSBuZXcgSXRlbSh0aGlzLmdhbWUsIHgsIHksICdwcmUyYXRsYXMnLCB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbnM6IFt7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMjk4XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfV1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhdGVzW3RoaXMuZ2FtZS5zdGF0ZS5jdXJyZW50XS5pdGVtcy5wbGF0Zm9ybXMuYWRkKHN0ZXApO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICAgICAgICBub2J1aWxkOiB0aGlzLmdhbWUudGltZS5ub3cgKyAzMDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEh1bWFuO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJpbXBvcnQgY3JlYXRlIGZyb20gJy4vbWVudS5jcmVhdGUnO1xyXG4vL2ltcG9ydCB1cGRhdGUgZnJvbSAnLi9wbGF5LnVwZGF0ZSc7XHJcblxyXG5jbGFzcyBNZW51IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxufVxyXG5cclxuTWVudS5wcm90b3R5cGUuY3JlYXRlID0gY3JlYXRlO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNZW51O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvbWVudS9pbmRleC5qcyIsImltcG9ydCBBSSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0FJJztcbmltcG9ydCBIdW1hbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL0h1bWFuJztcblxuaW1wb3J0IGxldmVsTG9hZGVyIGZyb20gJy4uLy4uL3NlcnZpY2VzL2xldmVsTG9hZGVyJztcbmltcG9ydCBjcmVhdHVyZUZhY3RvcnkgZnJvbSAnLi4vLi4vc2VydmljZXMvY3JlYXR1cmVGYWN0b3J5JztcbmltcG9ydCBjcmVhdHVyZUNvbmZpZyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnJztcblxuaW1wb3J0IGluaXQgZnJvbSAnLi9wbGF5LmluaXQnO1xuaW1wb3J0IHByZWxvYWQgZnJvbSAnLi9wbGF5LnByZWxvYWQnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuL3BsYXkuY3JlYXRlJztcbmltcG9ydCB1cGRhdGUgZnJvbSAnLi9wbGF5LnVwZGF0ZSc7XG5cclxuY2xhc3MgUGxheSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnbG9iYWxDb25maWcpIHtcclxuICAgICAgICB0aGlzLmtleXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5lbmVteSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLml0ZW1zID0ge1xyXG4gICAgICAgICAgICBib251czogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBwb3J0YWxzOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHBsYXRmb3JtczogdW5kZWZpbmVkXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmxldmVsID0ge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kTGF5ZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgZ3JvdW5kTGF5ZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdGlsZW1hcDogdW5kZWZpbmVkXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcgPSBnbG9iYWxDb25maWc7XHJcbiAgICAgICAgdGhpcy5jcmVhdHVyZUNvbmZpZyA9IGNyZWF0dXJlQ29uZmlnO1xyXG4gICAgICAgIHRoaXMubGV2ZWxMb2FkZXIgPSBsZXZlbExvYWRlci5jYWxsKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY3JlYXR1cmVGYWN0b3J5ID0gY3JlYXR1cmVGYWN0b3J5LmNhbGwodGhpcyk7XHJcbiAgICB9XHJcbn1cblxuUGxheS5wcm90b3R5cGUuaW5pdCA9IGluaXQ7XG5QbGF5LnByb3RvdHlwZS5wcmVsb2FkID0gcHJlbG9hZDtcclxuUGxheS5wcm90b3R5cGUuY3JlYXRlID0gY3JlYXRlO1xyXG5QbGF5LnByb3RvdHlwZS51cGRhdGUgPSB1cGRhdGU7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L2luZGV4LmpzIiwiY29uc3QgZ2xvYmFsQ29uZmlnID0ge1xyXG4gICAgd2lkdGg6IDU0NixcclxuICAgIGhlaWdodDogMzY4LFxyXG4gICAgYmxvY2tzOiAzLFxyXG4gICAgZG9tRWxlbWVudDogJ2dhbWUnLFxyXG4gICAgYmFja2dyb3VuZFBhdGg6ICdiYWNrZ3JvdW5kcy8nLFxyXG4gICAgdGlsZXNldFBhdGg6ICd0aWxlc2V0cy8nLFxyXG4gICAgbGV2ZWxQYXRoOiAnbGV2ZWxzLycsXHJcbiAgICB0ZXh0dXJlQXRsYXNQYXRoOiAnc3ByaXRlc2hlZXRzLycsXHJcbiAgICB0ZXh0dXJlQXRsYXNOYW1lOiAncHJlMmF0bGFzJyxcclxuICAgIHRleHR1cmVBdGxhc0ltYWdlOiAncHJlMmF0bGFzLnBuZycsXHJcbiAgICB0ZXh0dXJlQXRsYXNKc29uOiAncHJlMmF0bGFzLmpzb24nXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnbG9iYWxDb25maWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2xvYmFsQ29uZmlnLmpzIiwiY2xhc3MgSXRlbSBleHRlbmRzIFBoYXNlci5TcHJpdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzIHx8IHsgYW5pbWF0aW9uczogW10gfTtcclxuICAgICAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSwgMSk7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdyYXZpdHkueSA9IDA7XHJcbiAgICAgICAgdGhpcy5hbGxvd0dyYXZpdHkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJvZHkuaW1tb3ZhYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5hbmltYXRpb25zLmZvckVhY2goYW5pbWF0aW9uID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLmFkZChcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5uYW1lLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZyYW1lcy5tYXAoZnJhbWUgPT4gZnJhbWUudG9TdHJpbmcoKSksXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24uZnBzLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmxvb3BcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheSgnaWRsZScpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSXRlbTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0l0ZW0uanMiLCJ2YXIgY3JlYXR1cmVDb25maWdzID0ge1xyXG4gIGNyZWF0dXJlRGVmYXVsdHM6IHtcclxuICAgIGFjdGl2ZTogdHJ1ZSxcclxuICAgIGdyYXZpdHk6IDUwMCxcclxuICAgIGJvdW5jZTogMC4yLFxyXG4gICAgbWFzczogMSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiAxMDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGxpdmVzOiAxLFxyXG4gICAgbGlmZXNwYW46IEluZmluaXR5LFxyXG4gICAgc2Vuc2U6IDE1MCxcclxuICAgIGFuaW1hdGlvbnM6IFtdLFxyXG4gICAgdGltZU9mOiB7XHJcbiAgICAgICdtb3ZlJzogMjAwLFxyXG4gICAgICAnaGl0JzogMTAwLFxyXG4gICAgICAnaHVydCc6IDUwMCxcclxuICAgICAgJ3N0b3AnOiAyMDAsXHJcbiAgICAgICdpZGxlJzogMTBcclxuICAgIH0sXHJcbiAgICBib3VuZFRvIDoge30sXHJcbiAgICBiZWhhdmlvdXJzOiBbXHJcbiAgICAgICAgeyBhY3Rpb246ICd0dXJuSWZCbG9ja2VkJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnbW92ZScgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ2NoZWNrQm91bmRzJyB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBtYW46IHtcclxuICAgIHR5cGU6ICdtYW4nLFxyXG4gICAgbWF4U3BlZWQ6IDIwMCxcclxuICAgIGxpdmVzOiA4LFxyXG4gICAgbGlmZXNwYW46IEluZmluaXR5LFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMTEsJzAzJywnMDUnLDE0LDIwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnaGl0JywgZnJhbWVzOiBbMjIsMjQsMjgsMzEsMzQsMjIsMjQsMjgsMzEsMzRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3N0b3AnLCBmcmFtZXM6IFs0Miw0NSw0OSw1Ml0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFsxNiw0MSw0Nyw1MCw1MCw1MCw1MCw1MCw1MCw1MCw1MCwxMyw1MCwxMyw1MCwxM10sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFsyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNywyNywyNywyNywyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwzMCwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNywzMCwyNywzMCwzNSwzNiwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwnMDcnLCcwNycsJzA3JywnMDcnLCcwMicsJzAyJ10sIGZwczogNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdodXJ0JywgZnJhbWVzOiBbMTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3N0dW4nLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMTldLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzExLCcwMycsJzA1JywxNCwyMF0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGRpbm86IHtcclxuICAgIHR5cGU6ICdkaW5vJyxcclxuICAgIG1hc3M6IDEuNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogNSxcclxuICAgIGJlaGF2aW91cnM6IFtcclxuICAgICAgICB7IGFjdGlvbjogJ3R1cm5JZkJsb2NrZWQnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdtb3ZlJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnY2hlY2tCb3VuZHMnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdmb2xsb3cnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICd3aGVuJywgcGFyYW1zOiB7IHByb2JhYmlsaXR5OiAwLjAxLCBhY3Rpb246ICdqdW1wJyB9IH1cclxuICAgIF0sXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNjAsMzYwLDM2MCwzNjAsMzYwLDM2MCwzNjAsMzY3XSwgZnBzOiA1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszNjAsMzYxLDM2NCwzNjcsMzY5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzYwLDM2MSwzNjQsMzY3LDM2OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZmFsbCcsIGZyYW1lczogWzM2OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzcxXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM2MCwzNjEsMzY0LDM2N10sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgYmVhcjoge1xyXG4gICAgdHlwZTogJ2JlYXInLFxyXG4gICAgbWFzczogMS4yLFxyXG4gICAgbWF4U3BlZWQ6IDc1LFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTUsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszMjFdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzIwLDMyMSwzMjRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzY2LDM2MywzNTgsMzE3XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzI4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICAnc3VwZXItYmVhcic6IHtcclxuICAgIGFjY2VsZXJhdGlvbjogMzAsXHJcbiAgICBtYXhTcGVlZDogMjAwLFxyXG4gICAgaW1hZ2U6ICdzdXBlci1iZWFyLXNwcml0ZS1yZWYnLCAvLyBvdmVycmlkZSBzcHJpdGUgKGNyZWF0dXJlIG5hbWUgYnkgZGVmYXVsdClcclxuICAgIGFuaW1hdGlvbnM6IFtdXHJcbiAgfSxcclxuICB0aWdlcjoge1xyXG4gICAgdHlwZTogJ3RpZ2VyJyxcclxuICAgIG1hc3M6IDEuNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMjAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszOTMsMzk1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzkzLDM5NV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzM5OSw0MDFdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdmYWxsJywgZnJhbWVzOiBbMzk5XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDAyXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM5MywzOTVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHB0ZXJvOiB7XHJcbiAgICB0eXBlOiAncHRlcm8nLFxyXG4gICAgbWFzczogMC41LFxyXG4gICAgZ3Jhdml0eTogMCxcclxuICAgIGJvdW5jZTogMC4xLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IGZhbHNlLFxyXG4gICAgbWF4U3BlZWQ6IDEwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc3LDQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc3LDQ3N10sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbNDAzLDQwNCw0MDUsNDAzLDQwNCw0MDUsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDMsNDA0LDQwNSw0MDMsNDA0LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDA1LDQwNV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGVzY2VuZCcsIGZyYW1lczogWzQwNV0sIGZwczogMTUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnYXNjZW5kJywgZnJhbWVzOiBbNDAzLDQwNCw0MDVdLCBmcHM6IDE1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQ3MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFs0MDUsNDAzLDQwNF0sIGZwczogMTUsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgZHJhZ29uZmx5OiB7XHJcbiAgICB0eXBlOiAnZHJhZ29uZmx5JyxcclxuICAgIG1hc3M6IDAuNSxcclxuICAgIGdyYXZpdHk6IDAsXHJcbiAgICBib3VuY2U6IDAuMSxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiBmYWxzZSxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszMzcsMzM4XSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzM3LDMzOF0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAndHVybicsIGZyYW1lczogWzMzOSwzNDBdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM0Ml0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszMzcsMzM4XSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBiYXQ6IHtcclxuICAgIHR5cGU6ICdiYXQnLFxyXG4gICAgbWFzczogMC41LFxyXG4gICAgZ3Jhdml0eTogMCxcclxuICAgIGJvdW5jZTogMC4xLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IGZhbHNlLFxyXG4gICAgbWF4U3BlZWQ6IDIwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM1MSwzNTIsMzUxLDM1MSwzNTEsMzUxXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzU3LDM1OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzYyXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM1NywzNTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHNwaWRlcjoge1xyXG4gICAgdHlwZTogJ3NwaWRlcicsXHJcbiAgICBtYXNzOiAwLjMsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszMzVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzY1LDM2OCwzNzAsMzcyXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzI5OSwzMDIsMzA1LDMwOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAndHVybicsIGZyYW1lczogWzMxOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnY2xpbWInLCBmcmFtZXM6IFszNDEsMzQzLDM0NSwzNDddLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3dhaXQnLCBmcmFtZXM6IFszMzIsMzM1LDM3Ml0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzIyXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgbmF0aXZlOiB7XHJcbiAgICB0eXBlOiAnbmF0aXZlJyxcclxuICAgIG1heFNwZWVkOiAxMDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDIwLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM3M10sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM3MywzNzYsMzc4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszODBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM3MywzNzYsMzc4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBwYXJyb3Q6IHtcclxuICAgIHR5cGU6ICdwYXJyb3QnLFxyXG4gICAgbWFzczogMC41LFxyXG4gICAgZ3Jhdml0eTogMCxcclxuICAgIGJvdW5jZTogMC4xLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IGZhbHNlLFxyXG4gICAgbWF4U3BlZWQ6IDEwMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszOTQsMzk3LDM5OF0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM5NCwzOTcsMzk4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0MDBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM5NCwzOTcsMzk4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBpbnNlY3Q6IHtcclxuICAgIHR5cGU6ICdpbnNlY3QnLFxyXG4gICAgbWFzczogMSxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEuNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMjUsXHJcbiAgICBiZWhhdmlvdXJzOiBbXHJcbiAgICAgICAgeyBhY3Rpb246ICd0dXJuSWZCbG9ja2VkJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnbW92ZScgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ2NoZWNrQm91bmRzJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnZm9sbG93JyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnd2hlbicsIHBhcmFtczogeyBwcm9iYWJpbGl0eTogMC4wMywgYWN0aW9uOiAnanVtcCcgfSB9XHJcbiAgICBdLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzQ4LDM0OCwzNDgsMzQ4LDM0OCwzNDgsMzQ5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzIzLDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszMjMsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzQ4XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzMyMywzNDgsMzQ5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBidWc6IHtcclxuICAgIHR5cGU6ICdidWcnLFxyXG4gICAgbWFzczogMSxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEuNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMjUsXHJcbiAgICBiZWhhdmlvdXJzOiBbXHJcbiAgICAgICAgeyBhY3Rpb246ICd0dXJuSWZCbG9ja2VkJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnbW92ZScgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ2NoZWNrQm91bmRzJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnZm9sbG93JyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnd2hlbicsIHBhcmFtczogeyBwcm9iYWJpbGl0eTogMC4wMiwgYWN0aW9uOiAnanVtcCcgfSB9XHJcbiAgICBdLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzQ0LDM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0NCwzNDZdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzQ0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM0NCwzNDZdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGZyb2c6IHtcclxuICAgIHR5cGU6ICdmcm9nJyxcclxuICAgIG1hc3M6IDEsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAxLjUsXHJcbiAgICBqdW1waW5nOiA1MDAsXHJcbiAgICBtYXhTcGVlZDogODAsXHJcbiAgICBhY2NlbGVyYXRpb246IDQwLFxyXG4gICAgYmVoYXZpb3VyczogW1xyXG4gICAgICAgIHsgYWN0aW9uOiAndHVybklmQmxvY2tlZCcgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ21vdmUnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdjaGVja0JvdW5kcycgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ2ZvbGxvdycgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ3doZW4nLCBwYXJhbXM6IHsgcHJvYmFiaWxpdHk6IDAuMSwgYWN0aW9uOiAnanVtcCcgfSB9XHJcbiAgICBdLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzI1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzI1LDMyNywzMzEsMzI1XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzMyNSwzMjcsMzMxLDMyNV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzMzNF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszMjUsMzI3LDMzMSwzMjVdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICB0dXJ0bGU6IHtcclxuICAgIHR5cGU6ICd0dXJ0bGUnLFxyXG4gICAgbWFzczogMixcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAwLjMsXHJcbiAgICBtYXhTcGVlZDogNTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzkwXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzM3NywzODEsMzg0LDM4NV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM4NywzODksMzkwLDM5MV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzkyXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBqZWxseToge1xyXG4gICAgdHlwZTogJ2plbGx5JyxcclxuICAgIG1hc3M6IDIsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMSxcclxuICAgIG1heFNwZWVkOiA1LFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbNDIwLDQzMyw0MzRdLCBmcHM6IDMsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbNDIwLDQzMyw0MzRdLCBmcHM6IDMsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDIwLDQzMyw0MzRdLCBmcHM6IDMsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgZ29yaWxsYToge1xyXG4gICAgdHlwZTogJ2dvcmlsbGEnLFxyXG4gICAgbWFzczogNSxcclxuICAgIGp1bXBpbmc6IDMwMCxcclxuICAgIG1heFNwZWVkOiAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbNDExXSwgZnBzOiA1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2ZhbGwnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9XHJcbn07XHJcblxyXG5mb3IodmFyIGNyZWF0dXJlIGluIGNyZWF0dXJlQ29uZmlncyl7XHJcbiAgLy9jcmVhdHVyZUNvbmZpZ3NbY3JlYXR1cmVdID0gXy5tZXJnZSh7fSwgY29uZmlncy5jcmVhdHVyZURlZmF1bHRzLCBjb25maWdzW2NyZWF0dXJlXSk7XHJcbiAgdmFyIGRlZmF1bHRzID0gY3JlYXR1cmVDb25maWdzWydjcmVhdHVyZURlZmF1bHRzJ107XHJcbiAgZm9yKHZhciBwcm9wIGluIGRlZmF1bHRzKXtcclxuICAgIGlmKGNyZWF0dXJlQ29uZmlnc1tjcmVhdHVyZV1bcHJvcF0gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgIGNyZWF0dXJlQ29uZmlnc1tjcmVhdHVyZV1bcHJvcF0gPSBkZWZhdWx0c1twcm9wXTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXR1cmVDb25maWdzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVjb25maWcuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgQmF0IGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmF0O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2JhdC5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBCZWFyIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmVhcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9iZWFyLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEJ1ZyBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1ZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9idWcuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgRGlubyBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERpbm87XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZGluby5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBEcmFnb25mbHkgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEcmFnb25mbHk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZHJhZ29uZmx5LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEZyb2cgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGcm9nO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Zyb2cuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgR29yaWxsYSBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdvcmlsbGE7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZ29yaWxsYS5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBJbnNlY3QgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnNlY3Q7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvaW5zZWN0LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEplbGx5IGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSmVsbHk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvamVsbHkuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgTmF0aXZlIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmF0aXZlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL25hdGl2ZS5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBQYXJyb3QgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYXJyb3Q7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcGFycm90LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIFB0ZXJvIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHRlcm87XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcHRlcm8uanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgU3BpZGVyIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3BpZGVyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3NwaWRlci5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBUaWdlciBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRpZ2VyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3RpZ2VyLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIFR1cnRsZSBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFR1cnRsZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy90dXJ0bGUuanMiLCJmdW5jdGlvbiBjcmVhdGUoKXtcclxuXHJcbiAgICAvLyBmcHMgZGVidWdnaW5nXHJcbiAgICB0aGlzLmdhbWUudGltZS5hZHZhbmNlZFRpbWluZyA9IHRydWU7XHJcblxyXG4gICAgLy8gQ1RBIHRleHRcclxuICAgIGNvbnN0IHRleHQgPSB0aGlzLmdhbWUuYWRkLnRleHQoXHJcbiAgICAgICAgdGhpcy5nYW1lLndpZHRoIC8gMixcclxuICAgICAgICB0aGlzLmdhbWUuaGVpZ2h0IC8gMixcclxuICAgICAgICBcIkNob29zZSBhIGxldmVsIVxcbjEgMiAzIDQgNSA2IFxcbk9yIHByZXNzIGEga2V5IHRvIGdlbmVyYXRlIVwiLFxyXG4gICAgICAgIHsgZm9udDogXCIyNHB4IENvdXJpZXJcIiwgZmlsbDogXCIjZmZmZmZmXCIsIGFsaWduOiBcImNlbnRlclwiIH1cclxuICAgICk7XHJcblxyXG4gICAgdGV4dC5hbmNob3Iuc2V0KDAuNSk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLm9uRG93bkNhbGxiYWNrID0gKGUpID0+IHtcclxuICAgICAgICAvLyBpZiBwcmVzc2VkIGtleSBpcyBudW1iZXIgKHNwYWNlIGlzIGVtcHR5IHN0cmluZyB3aGljaCBldmFsdWF0ZXMgdHJ1ZSlcclxuICAgICAgICBpZighaXNOYU4oZS5rZXkpICYmIC9bXlxcc10vLnRlc3QoZS5rZXkpKXtcclxuICAgICAgICAgICAgZmV0Y2goJy9sZXZlbC8nICsgZS5rZXksIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcclxuICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIH0pLnRoZW4oKGxldmVsQ29uZmlnKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ1BsYXknLCB0cnVlLCB0cnVlLCBsZXZlbENvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQub25Eb3duQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ1BsYXknLCB0cnVlLCB0cnVlLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQub25Eb3duQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtNZW51XVtDcmVhdGVdJyk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL21lbnUvbWVudS5jcmVhdGUuanMiLCJpbXBvcnQgSHVtYW4gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9IdW1hbic7XHJcbmltcG9ydCBBSSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0FJJztcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZSgpe1xyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bQ3JlYXRlXScpO1xyXG4gICAgLy8gZnBzIGRlYnVnZ2luZ1xyXG4gICAgdGhpcy5nYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xyXG5cclxuICAgIC8vIFtTRVQgTEVWRUxdIHNldCBkaW1lbnNpb25zLCBzdGFydCBwaHlzaWMgc3lzdGVtXHJcbiAgICB0aGlzLmdhbWUud29ybGQuc2V0Qm91bmRzKFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgMCxcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy53aWR0aCAqIHRoaXMuZ2xvYmFsQ29uZmlnLmJsb2NrcyxcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy5oZWlnaHRcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuXHJcbiAgICB0aGlzLmxldmVsTG9hZGVyLmNyZWF0ZUJhY2tncm91bmQoJ2JhY2tncm91bmRMYXllcicpO1xyXG4gICAgdGhpcy5sZXZlbExvYWRlci5jcmVhdGVUaWxlcyhcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLnRpbGVtYXAsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy50aWxlc2V0LFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcudGlsZXNldEltYWdlXHJcbiAgICApO1xyXG4gICAgdGhpcy5sZXZlbExvYWRlci5jcmVhdGVMYXllcnModGhpcy5sZXZlbENvbmZpZy5sYXllcnMpO1xyXG5cclxuICAgIGlmKHRoaXMubGV2ZWxDb25maWcubWF4SGVpZ2h0KXtcclxuICAgICAgICB0aGlzLmdhbWUuc2NhbGUuc2V0R2FtZVNpemUodGhpcy5nbG9iYWxDb25maWcud2lkdGgsIHRoaXMubGV2ZWxDb25maWcubWF4SGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBbU0VUIExFVkVMXSBmaXggYmFja2dyb3VuZCwgcmVzaXplXHJcbiAgICB0aGlzLmxldmVsLmJhY2tncm91bmRMYXllci5maXhlZFRvQ2FtZXJhID0gdGhpcy5sZXZlbENvbmZpZy5maXhlZEJhY2tncm91bmQ7XHJcbiAgICB0aGlzLmxldmVsLmdyb3VuZExheWVyLnJlc2l6ZVdvcmxkKCk7XHJcblxyXG4gICAgdGhpcy5nYW1lU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgIGluaXRpYWxpc2VkOiBmYWxzZSxcclxuICAgICAgICBzY29yZTogMCxcclxuICAgICAgICBwbGF5ZXJBdDoge1xyXG4gICAgICAgICAgICB4OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHk6IHVuZGVmaW5lZFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudXBkYXRlU3RhdGUgPSBtb2J4LmFjdGlvbigoY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2FtZVN0YXRlLCBjaGFuZ2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbW9ieC5vYnNlcnZlKHRoaXMuZ2FtZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbZ2FtZVN0YXRlXSBjaGFuZ2UnLCBjaGFuZ2UsIHRoaXMuZ2FtZVN0YXRlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudXBkYXRlU3RhdGUoeyBpbml0aWFsaXNlZDogdHJ1ZSB9KTtcclxuXHJcbiAgICAvLyBbUExBWUVSXVxyXG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgSHVtYW4oXHJcbiAgICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcuZW50cnlQb2ludC54LFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcuZW50cnlQb2ludC55LFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLnRleHR1cmVBdGxhc05hbWUsXHJcbiAgICAgICAgdGhpcy5jcmVhdHVyZUNvbmZpZy5tYW5cclxuICAgICk7XHJcblxyXG4gICAgLy8gW0VORU1JRVNdXHJcbiAgICB0aGlzLmVuZW1pZXMgPSBuZXcgUGhhc2VyLkdyb3VwKHRoaXMuZ2FtZSk7XHJcbiAgICB0aGlzLmxldmVsQ29uZmlnLmVuZW1pZXMuZm9yRWFjaCh0aGlzLmNyZWF0dXJlRmFjdG9yeS5jcmVhdGUpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcclxuXHJcbiAgICAvLyBiaW5kIGtleXNcclxuICAgIHRoaXMua2V5cyA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XHJcbiAgICB0aGlzLmtleXMuc3BhY2UgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TUEFDRUJBUik7XHJcblxyXG4gICAgdGhpcy5rZXlzLmFsdCA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkFMVCk7XHJcbiAgICB0aGlzLmtleXMuY29udHJvbCA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkNPTlRST0wpO1xyXG4gICAgdGhpcy5rZXlzLnNoaWZ0ID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU0hJRlQpO1xyXG5cclxuICAgIC8vIGl0ZW1zICYgcGxhdGZvcm1zXHJcbiAgICB0aGlzLml0ZW1zLnBsYXRmb3JtcyA9IG5ldyBQaGFzZXIuR3JvdXAodGhpcy5nYW1lKTtcclxuXHJcbiAgICAvLyBzY29yZSB0ZXh0XHJcbiAgICB0aGlzLm1lbnUgPSB0aGlzLmdhbWUuYWRkLnRleHQoXHJcbiAgICAgICAgdGhpcy5nbG9iYWxDb25maWcud2lkdGggLSAxMjAsXHJcbiAgICAgICAgMCxcclxuICAgICAgICBcIkxpZmU6IFwiICsgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSxcclxuICAgICAgICB7IGZvbnQ6IFwiMjRweCBDb3VyaWVyXCIsIGZpbGw6IFwiI2ZmZlwiLCBhbGlnbjogXCJjZW50ZXJcIiB9XHJcbiAgICApO1xyXG4gICAgdGhpcy5tZW51LmZpeGVkVG9DYW1lcmEgPSB0cnVlO1xyXG4gICAgbW9ieC5vYnNlcnZlKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgIHRoaXMubWVudS5zZXRUZXh0KFwiTGlmZTogXCIgKyB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmNyZWF0ZS5qcyIsImltcG9ydCBsZXZlbEdlbmVyYXRvciBmcm9tICcuLi8uLi9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9pbmRleCc7XHJcblxyXG5mdW5jdGlvbiBpbml0KGxldmVsQ29uZmlnKXtcclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0luaXRdJywgbGV2ZWxDb25maWcpO1xyXG4gICAgdGhpcy5sZXZlbENvbmZpZyA9IGxldmVsQ29uZmlnIHx8IGxldmVsR2VuZXJhdG9yLmNyZWF0ZSgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5pbml0LmpzIiwiZnVuY3Rpb24gcHJlbG9hZCgpe1xyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bUHJlbG9hZF0nKTtcclxuXHJcbiAgICAvLyAtLS0tLS0hIEZQUyBraWxsZXI6IHBlcmZvcm1hbmNlIGRyb3Agb24gc2NhbGluZyB1cCBtb3JlIHRoYW4gMS42eFxyXG4gICAgdGhpcy5nYW1lLnNjYWxlLnNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuU0hPV19BTEw7XHJcbiAgICB0aGlzLmdhbWUuc2NhbGUucGFnZUFsaWduSG9yaXpvbnRhbGx5ID0gdHJ1ZTtcclxuICAgIHRoaXMuZ2FtZS5zY2FsZS5wYWdlQWxpZ25WZXJ0aWNhbGx5ID0gdHJ1ZTtcclxuICAgIHRoaXMuc2NhbGUuc2V0TWluTWF4KDAsIDAsIHRoaXMuZ2xvYmFsQ29uZmlnLndpZHRoICogMS40LCB0aGlzLmdsb2JhbENvbmZpZy5oZWlnaHQgKiAxLjQpO1xyXG4gICAgLy8gLS0tLS0tIVxyXG5cclxuICAgIC8vIGFzc2V0cyB0byBsb2FkIHJlbGF0aXZlIHRvIC9hc3NldHMvLi5cclxuICAgIHRoaXMuZ2FtZS5sb2FkLmF0bGFzKFxyXG4gICAgICAgICdwcmUyYXRsYXMnLFxyXG4gICAgICAgICdzcHJpdGVzaGVldHMvcHJlMmF0bGFzLnBuZycsXHJcbiAgICAgICAgJ3Nwcml0ZXNoZWV0cy9wcmUyYXRsYXMuanNvbicsXHJcbiAgICAgICAgUGhhc2VyLkxvYWRlci5URVhUVVJFX0FUTEFTX0pTT05fSEFTSFxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBsb2FkIGJhY2tncm91bmRcclxuICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKHRoaXMubGV2ZWxDb25maWcuYmFja2dyb3VuZEtleSwgdGhpcy5nbG9iYWxDb25maWcuYmFja2dyb3VuZFBhdGggKyB0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRJbWFnZSArIHRoaXMubGV2ZWxDb25maWcuYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uKTtcclxuICAgIC8vIGxvYWQgdGlsZXNldFxyXG4gICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UodGhpcy5sZXZlbENvbmZpZy50aWxlc2V0LCB0aGlzLmdsb2JhbENvbmZpZy50aWxlc2V0UGF0aCArIHRoaXMubGV2ZWxDb25maWcudGlsZXNldEltYWdlICsgdGhpcy5sZXZlbENvbmZpZy50aWxlc2V0SW1hZ2VFeHRlbnNpb24pO1xyXG4gICAgLy8gbG9hZCB0aWxlbWFwXHJcbiAgICBpZih0eXBlb2YgdGhpcy5sZXZlbENvbmZpZy50aWxlZEpzb24gPT09ICdzdHJpbmcnKXtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC50aWxlbWFwKHRoaXMubGV2ZWxDb25maWcudGlsZW1hcCwgdGhpcy5nbG9iYWxDb25maWcubGV2ZWxQYXRoICsgdGhpcy5sZXZlbENvbmZpZy50aWxlZEpzb24sIG51bGwsIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC50aWxlbWFwKHRoaXMubGV2ZWxDb25maWcudGlsZW1hcCwgbnVsbCwgdGhpcy5sZXZlbENvbmZpZy50aWxlZEpzb24sIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByZWxvYWQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkucHJlbG9hZC5qcyIsImZ1bmN0aW9uIHVwZGF0ZSgpe1xyXG4gICAgLy9jb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtVcGRhdGVdJyk7XHJcbiAgICAvLyBmcHNcclxuICAgIHRoaXMuZ2FtZS5kZWJ1Zy50ZXh0KHRoaXMuZ2FtZS50aW1lLmZwcywgNSwgMjApO1xyXG5cclxuICAgIC8vIGNvbGxpZGVcclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmxldmVsLmNvbGxpc2lvbkxheWVyKTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLmVuZW1pZXMsIHRoaXMubGV2ZWwuY29sbGlzaW9uTGF5ZXIpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmxldmVsLmRlYXRoTGF5ZXIsICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnREVBRCEnKTtcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ01lbnUnLCB0cnVlLCB0cnVlLCB1bmRlZmluZWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMuaXRlbXMucGxhdGZvcm1zKTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLnBsYXllciwgdGhpcy5lbmVtaWVzLCAocGxheWVyLCBlbmVteSkgPT4ge1xyXG4gICAgICAgIGlmKHRoaXMucGxheWVyLmJvZHkudG91Y2hpbmcuZG93biAmJiBlbmVteS5ib2R5LnRvdWNoaW5nLnVwKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhpcy5wbGF5ZXIuaXNIaXR0aW5nICYmICF0aGlzLnBsYXllci5pc1N0dW5uZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBsaWZlOiB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlIC0gMSxcclxuICAgICAgICAgICAgICAgIHN0dW46IHRoaXMuZ2FtZS50aW1lLm5vdyArIDE1MDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmh1cnQoZW5lbXkuYm9keS50b3VjaGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gbW92ZVxyXG4gICAgb25LZXlQcmVzcy5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvbktleVByZXNzKCl7XHJcbiAgICAvLyBwbGF5ZXIgbWFrZSBub2lzZVxyXG4gICAgdGhpcy5nYW1lU3RhdGUucGxheWVyQXQueCA9IHRoaXMucGxheWVyLmJvZHkueCB8IDA7XHJcbiAgICB0aGlzLmdhbWVTdGF0ZS5wbGF5ZXJBdC55ID0gdGhpcy5wbGF5ZXIuYm9keS55IHwgMDtcclxuXHJcbiAgICAvLyBzdHVuID0+IGJsb2NrZWRcclxuICAgIGlmKHRoaXMucGxheWVyLmlzU3R1bm5lZCl7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdzdHVuJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1vdmUgbGVmdCAvIHJpZ2h0XHJcbiAgICBpZih0aGlzLmtleXMubGVmdC5pc0Rvd24pe1xyXG4gICAgICAgIHRoaXMucGxheWVyLm1vdmVMZWZ0KCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdtb3ZlJyk7XHJcbiAgICB9IGVsc2UgaWYodGhpcy5rZXlzLnJpZ2h0LmlzRG93bil7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZVJpZ2h0KCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdtb3ZlJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGxheWVyLnN0b3AoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2lkbGUnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBqdW1wXHJcbiAgICBpZih0aGlzLmtleXMudXAuaXNEb3duKXtcclxuICAgICAgICB0aGlzLnBsYXllci5qdW1wKCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdqdW1wJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaGl0XHJcbiAgICBpZih0aGlzLmtleXMuc3BhY2UuaXNEb3duKXtcclxuICAgICAgICBpZih0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5ub2hpdCA8IHRoaXMuZ2FtZS50aW1lLm5vdyAmJiB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5oaXQgPCB0aGlzLmdhbWUudGltZS5ub3cpe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5oaXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5rZXlzLmFsdC5pc0Rvd24pe1xyXG4gICAgICAgIGlmKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLm5vYnVpbGQgPCB0aGlzLmdhbWUudGltZS5ub3cpIHtcclxuICAgICAgICAgICAgY29uc3QgeCA9IHRoaXMucGxheWVyLmZhY2luZ1JpZ2h0ID8gdGhpcy5wbGF5ZXIuYm9keS54ICsgNDAgOiB0aGlzLnBsYXllci5ib2R5LnggLSAyMCxcclxuICAgICAgICAgICAgICAgIHkgPSB0aGlzLnBsYXllci5ib2R5LnkgLSAyMDtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYnVpbGQoKHggfCAwKSwgKHkgfCAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1cGRhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkudXBkYXRlLmpzIiwiaW1wb3J0IGdsb2JhbENvbmZpZyBmcm9tICcuL2dsb2JhbENvbmZpZy5qcyc7XHJcbmltcG9ydCBNZW51IGZyb20gJy4vZ2FtZXN0YXRlcy9tZW51L2luZGV4LmpzJztcclxuaW1wb3J0IFBsYXkgZnJvbSAnLi9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMnO1xyXG5cclxuLy8gaW5zdGFudGlhdGUgYSBQaGFzZXIuR2FtZVxyXG5jb25zdCBQTEFURk9STUVSID0gbmV3IFBoYXNlci5HYW1lKFxyXG4gICAgZ2xvYmFsQ29uZmlnLndpZHRoLFxyXG4gICAgZ2xvYmFsQ29uZmlnLmhlaWdodCxcclxuICAgIFBoYXNlci5BVVRPLFxyXG4gICAgZ2xvYmFsQ29uZmlnLmRvbUVsZW1lbnRcclxuKTtcclxuXHJcbi8vIHJlZ2lzdGVyIGdhbWVzdGF0ZXMgKHdpbGwgYmUgaW5zdGFudGlhdGVkIHcvIHRoaXMuZ2FtZSBhcyAxc3QgcGFyYW0sIHBhc3MgZ2FtZUNvbmZpZyBhcyAybmQpXHJcblBMQVRGT1JNRVIuc3RhdGUuYWRkKCdNZW51JywgTWVudS5iaW5kKG51bGwsIGdsb2JhbENvbmZpZykpO1xyXG5QTEFURk9STUVSLnN0YXRlLmFkZCgnUGxheScsIFBsYXkuYmluZChudWxsLCBnbG9iYWxDb25maWcpKTtcclxuXHJcblBMQVRGT1JNRVIuc3RhdGUuc3RhcnQoJ01lbnUnLCB0cnVlLCB0cnVlKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9pbmRleC5qcyIsImltcG9ydCBiYXQgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvYmF0LmpzJztcclxuaW1wb3J0IGJlYXIgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvYmVhci5qcyc7XHJcbmltcG9ydCBidWcgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvYnVnLmpzJztcclxuaW1wb3J0IGRpbm8gZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvZGluby5qcyc7XHJcbmltcG9ydCBkcmFnb25mbHkgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvZHJhZ29uZmx5LmpzJztcclxuaW1wb3J0IGZyb2cgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvZnJvZy5qcyc7XHJcbmltcG9ydCBnb3JpbGxhIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2dvcmlsbGEuanMnO1xyXG5pbXBvcnQgaW5zZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2luc2VjdC5qcyc7XHJcbmltcG9ydCBqZWxseSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9qZWxseS5qcyc7XHJcbmltcG9ydCBuYXRpdmUgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvbmF0aXZlLmpzJztcclxuaW1wb3J0IHBhcnJvdCBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9wYXJyb3QuanMnO1xyXG5pbXBvcnQgcHRlcm8gZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvcHRlcm8uanMnO1xyXG5pbXBvcnQgc3BpZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL3NwaWRlci5qcyc7XHJcbmltcG9ydCB0aWdlciBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy90aWdlci5qcyc7XHJcbmltcG9ydCB0dXJ0bGUgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvdHVydGxlLmpzJztcclxuXHJcbmltcG9ydCBBSSBmcm9tICcuLi9jb21wb25lbnRzL0FJJztcclxuXHJcbmZ1bmN0aW9uIGNyZWF0dXJlRmFjdG9yeSgpIHtcclxuICAgIGNvbnN0IENyZWF0dXJlID0ge1xyXG4gICAgICAgIGJhdDogYmF0LFxyXG4gICAgICAgIGJlYXI6IGJlYXIsXHJcbiAgICAgICAgYnVnOiBidWcsXHJcbiAgICAgICAgZGlubzogZGlubyxcclxuICAgICAgICBkcmFnb25mbHk6IGRyYWdvbmZseSxcclxuICAgICAgICBmcm9nOiBmcm9nLFxyXG4gICAgICAgIGdvcmlsbGE6IGdvcmlsbGEsXHJcbiAgICAgICAgaW5zZWN0OiBpbnNlY3QsXHJcbiAgICAgICAgamVsbHk6IGplbGx5LFxyXG4gICAgICAgIG5hdGl2ZTogbmF0aXZlLFxyXG4gICAgICAgIHBhcnJvdDogcGFycm90LFxyXG4gICAgICAgIHB0ZXJvOiBwdGVybyxcclxuICAgICAgICBzcGlkZXI6IHNwaWRlcixcclxuICAgICAgICB0aWdlcjogdGlnZXIsXHJcbiAgICAgICAgdHVydGxlOiB0dXJ0bGVcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGU6IChsZXZlbENvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcHJvcHMgPSB0aGlzLmNyZWF0dXJlQ29uZmlnW2xldmVsQ29uZmlnLnR5cGVdO1xyXG4gICAgICAgICAgICBwcm9wcy5ib3VuZFRvID0gbGV2ZWxDb25maWcuYm91bmRUbztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVuZW15ID0gbmV3IEFJKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICAgICAgICAgICAgbGV2ZWxDb25maWcub3JpZ2luLngsXHJcbiAgICAgICAgICAgICAgICBsZXZlbENvbmZpZy5vcmlnaW4ueSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLnRleHR1cmVBdGxhc05hbWUsXHJcbiAgICAgICAgICAgICAgICBwcm9wcyxcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWdbbGV2ZWxDb25maWcudHlwZV0uYmVoYXZpb3Vyc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBlbmVteS5zZXRCb3VuZHMoZW5lbXkucHJvcHMuYm91bmRUbyk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5hZGQoZW5lbXkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdHVyZUZhY3Rvcnk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvY3JlYXR1cmVGYWN0b3J5LmpzIiwiaW1wb3J0IExldmVsQnVpbGRlciBmcm9tICcuL2xldmVsQnVpbGRlcic7XHJcbmltcG9ydCBsZXZlbENvbmZpZyBmcm9tICcuL21vZGVscy9sZXZlbENvbmZpZyc7XHJcblxyXG5jb25zdCBsZXZlbEdlbmVyYXRvciA9IHtcclxuICAgIGNyZWF0ZSgpe1xyXG4gICAgICAgIGNvbnN0IGxldmVsQnVpbGRlciA9IG5ldyBMZXZlbEJ1aWxkZXIoJ3Jpc2Utb2YtdGhlLXRpZGUnLCBsZXZlbENvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIGxldmVsQnVpbGRlclxyXG4gICAgICAgICAgICAuY3JlYXRlTGF5ZXJzKDM0ICogMywgMjMgKiAxMClcclxuICAgICAgICAgICAgLnJhbmRvbUJhY2tncm91bmQoKVxyXG4gICAgICAgICAgICAuYnVpbGQoKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxldmVsR2VuZXJhdG9yO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL2luZGV4LmpzIiwiaW1wb3J0IHtcclxuICAgIGZsYXR0ZW4sXHJcbiAgICBhcHBseU1hdHJpeCxcclxuICAgIGNyZWF0ZU1hdHJpeCxcclxuICAgIGxheWVyVG9NYXRyaXgsXHJcbiAgICBjaGVja0lmQXJlYUlzQ292ZXJlZFxyXG59IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQge1xyXG4gICAgZ3JvdW5kTGF5ZXIsXHJcbiAgICBjb2xsaXNpb25MYXllcixcclxuICAgIGRlYXRoTGF5ZXJcclxufSBmcm9tICcuL21vZGVscy9sYXllcnMnO1xyXG5cclxuaW1wb3J0IHBsYXRmb3JtcyBmcm9tICcuL21vZGVscy9wbGF0Zm9ybXMnO1xyXG5pbXBvcnQgdGlsZW1hcHMgZnJvbSAnLi9tb2RlbHMvdGlsZW1hcHMnO1xyXG5pbXBvcnQgdGlsZXNldHMgZnJvbSAnLi9tb2RlbHMvdGlsZXNldHMnO1xyXG5pbXBvcnQgYmFja2dyb3VuZHMgZnJvbSAnLi9tb2RlbHMvYmFja2dyb3VuZHMnO1xyXG5cclxuLy8gd2l0aCBmcmVxdWVuY3lcclxuY29uc3QgZW5lbXlUeXBlcyA9IFtcclxuICAgICdiYXQnLCAnYmF0JywgJ2JhdCcsICdiYXQnLFxyXG4gICAgJ2JlYXInLCAnYmVhcicsICdiZWFyJywgJ2JlYXInLCAnYmVhcicsICdiZWFyJyxcclxuICAgICdidWcnLFxyXG4gICAgJ2Rpbm8nLFxyXG4gICAgJ2RyYWdvbmZseScsICdkcmFnb25mbHknLCAnZHJhZ29uZmx5JywgJ2RyYWdvbmZseScsICdkcmFnb25mbHknLFxyXG4gICAgJ2Zyb2cnLFxyXG4gICAgJ2luc2VjdCcsXHJcbiAgICAnamVsbHknLFxyXG4gICAgJ25hdGl2ZScsICduYXRpdmUnLCAnbmF0aXZlJywgJ25hdGl2ZScsICduYXRpdmUnLFxyXG4gICAgJ3BhcnJvdCcsXHJcbiAgICAncHRlcm8nLFxyXG4gICAgJ3NwaWRlcicsICdzcGlkZXInLCAnc3BpZGVyJywgJ3NwaWRlcicsXHJcbiAgICAndGlnZXInLFxyXG4gICAgJ3R1cnRsZSdcclxuXTtcclxuXHJcbmNvbnN0IGZpbmRQbGFjZXNGb3IgPSAoYU1hdHJpeCwgaXRlbXMsIHJldHJ5KSA9PiB7XHJcbiAgICBsZXQgbWF0cml4ID0gYU1hdHJpeC5zbGljZSgwKTtcclxuICAgIGxldCBlbmVtaWVzID0gW107XHJcbiAgICB3aGlsZShyZXRyeS0tKXtcclxuICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGl0ZW1zLmxlbmd0aCldLFxyXG4gICAgICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1hdHJpeFswXS5sZW5ndGggLSBpdGVtWzBdLmxlbmd0aCkpLFxyXG4gICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1hdHJpeC5sZW5ndGggLSBpdGVtLmxlbmd0aCkpO1xyXG4gICAgICAgIGlmKGNoZWNrSWZBcmVhSXNDb3ZlcmVkKG1hdHJpeCwgeCwgeSwgaXRlbVswXS5sZW5ndGgsIGl0ZW0ubGVuZ3RoKSl7XHJcbiAgICAgICAgICAgIGVuZW1pZXMucHVzaChbeCwgeSwgaXRlbVswXS5sZW5ndGhdKTtcclxuICAgICAgICAgICAgYXBwbHlNYXRyaXgobWF0cml4LCBpdGVtLCB4LCB5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGVuZW1pZXM6IGVuZW1pZXMsXHJcbiAgICAgICAgaXNsYW5kczogbWF0cml4XHJcbiAgICB9O1xyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlRW5lbXlBdCA9ICh4VGlsZSwgeVRpbGUsIHRpbGVzV2lkdGgpID0+IHtcclxuICAgIHJldHVybiB7XHJcblx0XHR0eXBlOiBlbmVteVR5cGVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVuZW15VHlwZXMubGVuZ3RoKV0sXHJcblx0XHRudW1iZXI6IDEsXHJcblx0XHRsaWZlc3BhbjogSW5maW5pdHksXHJcblx0XHRvcmlnaW46IHtcclxuXHRcdFx0eDogKHhUaWxlICsgdGlsZXNXaWR0aCAvIDIpICogMTYsXHJcblx0XHRcdHk6IHlUaWxlICogMTZcclxuXHRcdH0sXHJcblx0XHRib3VuZFRvOiB7XHJcblx0XHRcdHgxOiB4VGlsZSAqIDE2LFxyXG5cdFx0XHR4MjogKHhUaWxlICsgdGlsZXNXaWR0aCkgKiAxNlxyXG5cdFx0fVxyXG4gICAgfTtcclxufTtcclxuXHJcbmNvbnN0IGdldENvbGxpc2lvbkxheWVyID0gKGZsYXRNYXRyaXgsIGNvbGxpc2lvblRpbGVzKSA9PiB7XHJcbiAgICBsZXQgbWF0cml4ID0gZmxhdE1hdHJpeC5zbGljZSgwKS5tYXAoKHRpbGUpID0+IHtcclxuICAgICAgICByZXR1cm4gY29sbGlzaW9uVGlsZXMuaW5kZXhPZih0aWxlKSA+IC0xXHJcbiAgICAgICAgICAgID8gdGlsZVxyXG4gICAgICAgICAgICA6IDA7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtYXRyaXg7XHJcbn07XHJcblxyXG52YXIgTGV2ZWxCdWlsZGVyID0gZnVuY3Rpb24oaWQsIGxldmVsQ29uZmlnKXtcclxuICAgIGxldCBsZXZlbCA9IE9iamVjdC5hc3NpZ24obGV2ZWxDb25maWcsIHRpbGVtYXBzW2lkXSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNyZWF0ZUxheWVycyh0aWxlc1dpZHRoLCB0aWxlc0hlaWdodCl7XG4gICAgICAgICAgICAvLyAxMDA6IHJhcmUsIDQwOiBmcmVxdWVudFxuICAgICAgICAgICAgY29uc3QgZGVuc2l0eSA9IDEwMCxcbiAgICAgICAgICAgICAgICByZXRyeSA9IE1hdGguZmxvb3IoKHRpbGVzV2lkdGggKiB0aWxlc0hlaWdodCkgLyBkZW5zaXR5KTtcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlc0ZvciA9IGZpbmRQbGFjZXNGb3IoY3JlYXRlTWF0cml4KHRpbGVzSGVpZ2h0LCB0aWxlc1dpZHRoLCAwKSwgcGxhdGZvcm1zW2lkXS5ncm91bmRMYXllciwgcmV0cnkpO1xuXG4gICAgICAgICAgICBsZXZlbC5lbmVtaWVzID0gcGxhY2VzRm9yLmVuZW1pZXMubWFwKGVuZW15ID0+IGNyZWF0ZUVuZW15QXQuYXBwbHkobnVsbCwgZW5lbXkpKTtcblxuICAgICAgICAgICAgZ3JvdW5kTGF5ZXIuZGF0YSA9IGZsYXR0ZW4ocGxhY2VzRm9yLmlzbGFuZHMpO1xuICAgICAgICAgICAgY29sbGlzaW9uTGF5ZXIuZGF0YSA9IGdldENvbGxpc2lvbkxheWVyKGdyb3VuZExheWVyLmRhdGEsIHBsYXRmb3Jtc1tpZF0uY29sbGlzaW9uVGlsZXMpO1xuICAgICAgICAgICAgZGVhdGhMYXllci5kYXRhID0gZ3JvdW5kTGF5ZXIuZGF0YS5tYXAodGlsZSA9PiAwKTtcblxyXG4gICAgICAgICAgICBsZXZlbC50aWxlZEpzb24ud2lkdGggPSB0aWxlc1dpZHRoO1xyXG4gICAgICAgICAgICBsZXZlbC50aWxlZEpzb24uaGVpZ2h0ID0gdGlsZXNIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBncm91bmRMYXllci53aWR0aCA9IHRpbGVzV2lkdGg7XHJcbiAgICAgICAgICAgIGdyb3VuZExheWVyLmhlaWdodCA9IHRpbGVzSGVpZ2h0O1xyXG4gICAgICAgICAgICBjb2xsaXNpb25MYXllci53aWR0aCA9IHRpbGVzV2lkdGg7XHJcbiAgICAgICAgICAgIGNvbGxpc2lvbkxheWVyLmhlaWdodCA9IHRpbGVzSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgbGV2ZWwud2lkdGggPSB0aWxlc1dpZHRoICogMTY7XHJcbiAgICAgICAgICAgIGxldmVsLmhlaWdodCA9IHRpbGVzSGVpZ2h0ICogMTY7XHJcblxyXG4gICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAvLyAxOTUgPSBzcGlrZVxyXG4gICAgICAgICAgICAgICAgZ3JvdW5kTGF5ZXIuZGF0YVtncm91bmRMYXllci5kYXRhLmxlbmd0aCAtIHRpbGVzV2lkdGhdID0gMTk1O1xyXG4gICAgICAgICAgICAgICAgZGVhdGhMYXllci5kYXRhW2RlYXRoTGF5ZXIuZGF0YS5sZW5ndGggLSB0aWxlc1dpZHRoXSA9IDE5NTtcclxuICAgICAgICAgICAgfSB3aGlsZSh0aWxlc1dpZHRoLS0pO1xyXG5cclxuICAgICAgICAgICAgbGV2ZWwudGlsZWRKc29uLmxheWVycyA9IFtcclxuICAgICAgICAgICAgICAgIGdyb3VuZExheWVyLFxyXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uTGF5ZXIsXHJcbiAgICAgICAgICAgICAgICBkZWF0aExheWVyXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGxldmVsLnRpbGVkSnNvbi50aWxlc2V0cyA9IFt0aWxlc2V0c1tpZF1dO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJhbmRvbUJhY2tncm91bmQoKXtcclxuICAgICAgICAgICAgY29uc3QgcmFuZG9tQmFja2dyb3VuZCA9IGJhY2tncm91bmRzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJhY2tncm91bmRzLmxlbmd0aCldXHJcbiAgICAgICAgICAgIGxldmVsLmJhY2tncm91bmRJbWFnZSA9IHJhbmRvbUJhY2tncm91bmQuYmFja2dyb3VuZEltYWdlO1xyXG4gICAgICAgICAgICBsZXZlbC5iYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb24gPSByYW5kb21CYWNrZ3JvdW5kLmJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBidWlsZCgpe1xyXG4gICAgICAgICAgICByZXR1cm4gbGV2ZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExldmVsQnVpbGRlcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9sZXZlbEJ1aWxkZXIuanMiLCJjb25zdCBiYWNrZ3JvdW5kcyA9IFtcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwiYmczc2VhbWxlc3NcIixcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb246IFwiLmpwZ1wiLFxyXG4gICAgICAgIG1heEhlaWdodDogNDM0XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJ2b2xjYW5vXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgICAgICBtYXhIZWlnaHQ6IDM0MVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwiY2F2ZVwiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICAgICAgbWF4SGVpZ2h0OiA0MTZcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImJnMXNlYW1sZXNzXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgICAgICBtYXhIZWlnaHQ6IDM3MlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwiZm9yZXN0LWdyZWVuXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgICAgICBtYXhIZWlnaHQ6IDQyMFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwiZm9yZXN0LWZpcmVcIixcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb246IFwiLnBuZ1wiLFxyXG4gICAgICAgIG1heEhlaWdodDogMzQwXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJmb3Jlc3Qtb3JhbmdlXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgICAgICBtYXhIZWlnaHQ6IDQyMFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwiZm9yZXN0LXBpbmtcIixcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb246IFwiLnBuZ1wiLFxyXG4gICAgICAgIG1heEhlaWdodDogMzUwXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJmb3Jlc3RcIixcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb246IFwiLnBuZ1wiLFxyXG4gICAgICAgIG1heEhlaWdodDogNDIwXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJncmF2ZXlhcmRcIixcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb246IFwiLnBuZ1wiLFxyXG4gICAgICAgIG1heEhlaWdodDogMzM5XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJpY2UtZ3JlZW5cIixcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb246IFwiLnBuZ1wiLFxyXG4gICAgICAgIG1heEhlaWdodDogNDIzXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJpY2VcIixcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb246IFwiLnBuZ1wiLFxyXG4gICAgICAgIG1heEhlaWdodDogNDIzXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJzbm93XCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgICAgICBtYXhIZWlnaHQ6IDMzOVxyXG4gICAgfVxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYmFja2dyb3VuZHM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL2JhY2tncm91bmRzLmpzIiwiZXhwb3J0IGNvbnN0IGdyb3VuZExheWVyID0ge1xyXG4gICAgXCJkYXRhXCI6IFtdLFxyXG4gICAgXCJoZWlnaHRcIjogMjMsXHJcbiAgICBcIm5hbWVcIjogXCJncm91bmQtbGF5ZXJcIixcclxuICAgIFwib3BhY2l0eVwiOiAxLFxyXG4gICAgXCJ0eXBlXCI6IFwidGlsZWxheWVyXCIsXHJcbiAgICBcInZpc2libGVcIjogdHJ1ZSxcclxuICAgIFwid2lkdGhcIjogMzQsXHJcbiAgICBcInhcIjogMCxcclxuICAgIFwieVwiOiAwXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY29sbGlzaW9uTGF5ZXIgPSB7XHJcbiAgICBcImRhdGFcIjogW10sXHJcbiAgICBcImhlaWdodFwiOiAyMyxcclxuICAgIFwibmFtZVwiOiBcImNvbGxpc2lvbi1sYXllclwiLFxyXG4gICAgXCJvcGFjaXR5XCI6IDEsXHJcbiAgICBcInR5cGVcIjogXCJ0aWxlbGF5ZXJcIixcclxuICAgIFwidmlzaWJsZVwiOiBmYWxzZSxcclxuICAgIFwid2lkdGhcIjogMzQsXHJcbiAgICBcInhcIjogMCxcclxuICAgIFwieVwiOiAwXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGVhdGhMYXllciA9IHtcclxuICAgIFwiZGF0YVwiOiBbXSxcclxuICAgIFwiaGVpZ2h0XCI6IDIzLFxyXG4gICAgXCJuYW1lXCI6IFwiZGVhdGgtbGF5ZXJcIixcclxuICAgIFwib3BhY2l0eVwiOiAxLFxyXG4gICAgXCJ0eXBlXCI6IFwidGlsZWxheWVyXCIsXHJcbiAgICBcInZpc2libGVcIjogZmFsc2UsXHJcbiAgICBcIndpZHRoXCI6IDM0LFxyXG4gICAgXCJ4XCI6IDAsXHJcbiAgICBcInlcIjogMFxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9sYXllcnMuanMiLCJjb25zdCBsZXZlbE1vZGVsID0ge1xyXG5cdFwiaGVpZ2h0XCI6IDIzLFxyXG5cdFwibGF5ZXJzXCI6IFt7XHJcblx0XHRcdFwiZGF0YVwiOiBbXSxcclxuXHRcdFx0XCJoZWlnaHRcIjogMjMsXHJcblx0XHRcdFwibmFtZVwiOiBcImdyb3VuZC1sYXllclwiLFxyXG5cdFx0XHRcIm9wYWNpdHlcIjogMSxcclxuXHRcdFx0XCJ0eXBlXCI6IFwidGlsZWxheWVyXCIsXHJcblx0XHRcdFwidmlzaWJsZVwiOiB0cnVlLFxyXG5cdFx0XHRcIndpZHRoXCI6IDM0LFxyXG5cdFx0XHRcInhcIjogMCxcclxuXHRcdFx0XCJ5XCI6IDBcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdFwiZGF0YVwiOiBbXSxcclxuXHRcdFx0XCJoZWlnaHRcIjogMjMsXHJcblx0XHRcdFwibmFtZVwiOiBcImNvbGxpc2lvbi1sYXllclwiLFxyXG5cdFx0XHRcIm9wYWNpdHlcIjogMSxcclxuXHRcdFx0XCJ0eXBlXCI6IFwidGlsZWxheWVyXCIsXHJcblx0XHRcdFwidmlzaWJsZVwiOiBmYWxzZSxcclxuXHRcdFx0XCJ3aWR0aFwiOiAzNCxcclxuXHRcdFx0XCJ4XCI6IDAsXHJcblx0XHRcdFwieVwiOiAwXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRcImRhdGFcIjogW10sXHJcblx0XHRcdFwiaGVpZ2h0XCI6IDIzLFxyXG5cdFx0XHRcIm5hbWVcIjogXCJkZWF0aC1sYXllclwiLFxyXG5cdFx0XHRcIm9wYWNpdHlcIjogMSxcclxuXHRcdFx0XCJ0eXBlXCI6IFwidGlsZWxheWVyXCIsXHJcblx0XHRcdFwidmlzaWJsZVwiOiBmYWxzZSxcclxuXHRcdFx0XCJ3aWR0aFwiOiAzNCxcclxuXHRcdFx0XCJ4XCI6IDAsXHJcblx0XHRcdFwieVwiOiAwXHJcblx0XHR9XHJcblx0XSxcclxuXHRcIm5leHRvYmplY3RpZFwiOiAxLFxyXG5cdFwib3JpZW50YXRpb25cIjogXCJvcnRob2dvbmFsXCIsXHJcblx0XCJwcm9wZXJ0aWVzXCI6IHtcclxuXHJcblx0fSxcclxuXHRcInJlbmRlcm9yZGVyXCI6IFwicmlnaHQtZG93blwiLFxyXG5cdFwidGlsZWhlaWdodFwiOiAxNixcclxuXHRcInRpbGVzZXRzXCI6IFtdLFxyXG5cdFwidGlsZXdpZHRoXCI6IDE2LFxyXG5cdFwidmVyc2lvblwiOiAxLFxyXG5cdFwid2lkdGhcIjogMzRcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxldmVsTW9kZWw7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL2xldmVsLmpzIiwiaW1wb3J0IGxldmVsIGZyb20gJy4vbGV2ZWwnO1xyXG5cclxuY29uc3QgbGV2ZWxDb25maWcgPSB7XHJcblx0XCJpZFwiOiBcIlwiLFxyXG5cdFwibmFtZVwiOiBcIlwiLFxyXG5cdFwidGlsZXNldFwiOiBcIlwiLFxyXG5cdFwidGlsZW1hcFwiOiBcIlwiLFxyXG5cdFwidGlsZWRKc29uXCI6IGxldmVsLFxyXG5cdFwidGlsZXNldEltYWdlXCI6IFwiXCIsXHJcblx0XCJ0aWxlc2V0SW1hZ2VFeHRlbnNpb25cIjogXCIucG5nXCIsXHJcblx0XCJiYWNrZ3JvdW5kSW1hZ2VcIjogXCJiZzNzZWFtbGVzc1wiLFxyXG5cdFwiYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uXCI6IFwiLmpwZ1wiLFxyXG5cdFwiYmFja2dyb3VuZEtleVwiOiBcImJhY2tncm91bmQtMlwiLFxyXG5cdFwid2lkdGhcIjogNTQ2LFxyXG5cdFwiaGVpZ2h0XCI6IDM2OCxcclxuXHRcImxheWVyc1wiOiB7XHJcblx0XHRcImdyb3VuZExheWVyXCI6IHtcclxuXHRcdFx0XCJrZXlcIjogXCJncm91bmQtbGF5ZXJcIixcclxuXHRcdFx0XCJ2aXNpYmxlXCI6IHRydWVcclxuXHRcdH0sXHJcblx0XHRcImNvbGxpc2lvbkxheWVyXCI6IHtcclxuXHRcdFx0XCJrZXlcIjogXCJjb2xsaXNpb24tbGF5ZXJcIixcclxuXHRcdFx0XCJ2aXNpYmxlXCI6IGZhbHNlXHJcblx0XHR9LFxyXG5cdFx0XCJkZWF0aExheWVyXCI6IHtcclxuXHRcdFx0XCJrZXlcIjogXCJkZWF0aC1sYXllclwiLFxyXG5cdFx0XHRcInZpc2libGVcIjogZmFsc2VcclxuXHRcdH1cclxuXHR9LFxyXG5cdFwiZml4ZWRCYWNrZ3JvdW5kXCI6IHRydWUsXHJcblx0XCJlbnRyeVBvaW50XCI6IHtcclxuXHRcdFwieFwiOiAxMCxcclxuXHRcdFwieVwiOiAxMFxyXG5cdH0sXHJcblx0XCJwb3J0YWxzXCI6IFtdLFxyXG5cdFwicGxhdGZvcm1zXCI6IFtdLFxyXG5cdFwiYm9udXNcIjogW10sXHJcblx0XCJlbmVtaWVzXCI6IFtdXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsZXZlbENvbmZpZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9tb2RlbHMvbGV2ZWxDb25maWcuanMiLCJjb25zdCBwbGF0Zm9ybXNCeUlkID0ge1xyXG4gICAgJ3Jpc2Utb2YtdGhlLXRpZGUnOiB7XHJcbiAgICAgICAgZ3JvdW5kTGF5ZXI6IFtcclxuICAgICAgICAgICAgW1swLDAsMCwwXSxbMCw3Nyw3OCwwXSxbMCw5MSw5MiwwXSxbMCwwLDAsMF1dLFxyXG4gICAgICAgICAgICBbWzAsIDAsIDAsIDBdLCBbNzcsIDExMSwgMTExLCA3OF0sIFs5MSwgMTMwLCAxMzAsIDkyXSwgWzAsIDAsIDAsIDBdXSxcclxuICAgICAgICAgICAgW1swLCAwLCAwLCAwLCAwLCAwLCAwXSwgWzc3LCAxMTEsIDExMSwgMTQyLCAxMTEsIDE0MiwgNzhdLCBbOTEsIDEzMCwgMTMwLCAxNDQsIDEzMCwgMTQ0LCA5Ml0sIFswLCAwLCAwLCAwLCAwLCAwLCAwXV0sXHJcbiAgICAgICAgICAgIFtbMCwgMCwgMCwgMF0sIFswLCAxOCwgMTksIDE2XSwgWzE1LCA3OSwgMjMsIDUyXSwgWzU4LCA5MywgMzksIDM0XSwgWzExMiwgMTEzLCAzNCwgODNdLCBbNzcsIDExMSwgMTExLCA3OF0sIFs5MSwgMTMwLCAxMzAsIDkyXSwgWzAsIDAsIDAsIDBdXSxcclxuICAgICAgICAgICAgW1swLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxbMCw3NywxMTEsNzgsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFswLDkxLDEzMCw5MiwwLDAsMCw3NywxMTEsNzgsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDkxLDEzMCw5MiwwLDAsMCw3Nyw3OCwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCw5MSw5MiwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF1dLFxyXG4gICAgICAgICAgICBbWzAsMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCw2NCwwXSxbMCwwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsNjQsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDY0LDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwXSxbMCw2NCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDBdXSxcclxuICAgICAgICAgICAgW1swLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDc3LDExMSw3OCwwXSxbMCwwLDAsMCwwLDAsMCw3Nyw3OCwwLDAsMCwwLDkxLDEzMCw5MiwwXSxbMCw3NywxMTEsNzgsMCwwLDAsOTEsOTIsNzcsNzgsMCwwLDAsMCwwLDBdLFswLDkxLDEzMCw5MiwwLDAsMCwwLDAsOTEsOTIsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdXSxcclxuICAgICAgICAgICAgW1swLDAsMCwwLDAsMCwwXSxbMCw5Nyw5OCw5OSwxMDAsMTA1LDBdLFswLDAsMTIyLDEyNywxMjEsMCwwXSxbMCwwLDM3LDU3LDMxLDAsMF0sWzAsMCwzNyw1NywxMjEsMCwwXSxbMCwwLDU4LDY3LDMxLDAsMF0sWzAsODQsODUsMTM2LDEyMSwwLDBdLFswLDAsNTgsNjcsMzEsMCwwXSxbMCwwLDIsNTcsNTIsMCwwXSxbMCwwLDIxLDY3LDM0LDAsMF0sWzAsMCwzNyw1NywxMjEsMCwwXSxbMCwwLDI2ODQzNTQ2ODEsMjY4NDM1NDU5MSwwLDAsMF0sWzAsMCwwLDAsMCwwLDBdXSxcclxuICAgICAgICAgICAgW1swLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsOTgsOTksMjQzLDEwMCwxMDUsOTcsNjQsOTcsOTcsNjQsOTcsNjQsOTcsOTgsOTksMTAwLDEwNCwxMDQsMTA1LDBdLFswLDEyMiwxMjcsMTI2LDIwNiwwLDAsMCwwLDAsMCwwLDAsMCwyNDUsMTI3LDEyNSwxMjYsMTI3LDAsMF0sWzAsMCwyNjg0MzU0NjgxLDI2ODQzNTQ1OTEsMCwwLDAsMCwwLDAsMCwwLDAsMCwyMzAsMjE2LDIzMCwyMzAsMjE2LDAsMF1dLFxyXG4gICAgICAgICAgICBbWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDAsMCwwLDE4LDE5LDIwLDE3LDYzLDE2LDE4LDE5LDIwLDE3LDE4LDAsMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDE3LDYzLDM0LDEzLDM1LDY3LDMyLDMzLDM0LDEzLDM1LDQ1LDQ2LDMxLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwyLDMsMzAsNCw4MCwxMiw1Myw2NSw2Niw0LDgwLDU2LDU3LDExLDExMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMTcsMTEwLDc5LDIyLDIzLDQ0LDQ1LDQ2LDc5LDIyLDIzLDQ0LDQ1LDEyOCwxMTIsMTEzLDEwNywyMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDIsNTcsMTEsMzgsMzksNTUsMTE0LDEyLDUzLDM4LDM5LDI5LDQ5LDUwLDUxLDU5LDUxLDEzMSw5NiwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMTUsNzksNjcsMzIsMzMsMzQsMTMsMzUsNDYsNzksMTA3LDEwOCwxMTIsNzYsNjEsNjIsNjAsNzYsNjEsMTMxLDE0LDAsMCwwLDBdLFswLDAsMCwwLDAsNTgsMTEsMTIsNTMsNjUsNjYsNCw5Myw4OSw5MCwyOSw1NiwxMjksNTksNTksNDksNzMsNDcsODgsMTQxLDM0LDAsMCwwLDBdLFswLDAsMCwwLDE1LDY3LDMyLDQ2LDc5LDIyLDIzLDQ0LDExMywxMDcsMTA4LDEwOSwxMjgsMTEyLDEzMyw2MCw3Niw2MSw2MiwxNjcsMTAwLDEwNCwyMjksMCwwLDBdLFswLDAsMCwyMCw5MCwyOSw3OSwxMjksOTMsODksOTAsMjksMjksNDgsNDksNTAsNTEsMTMxLDU5LDYyLDczLDQ3LDI0LDE4MCwxMjUsMTI2LDEyMSwwLDAsMF0sWzAsMCwwLDIsMTA4LDEwOSwxMjgsMTEyLDExMywxMDcsMTA4LDEwOSwxMzMsNjAsNzYsNjEsNjIsMTMyLDEzMyw2MiwxNjcsMTAwLDE5NywzNCw0NSw0NiwzMSwwLDAsMF0sWzAsMCwwLDIxLDQ5LDUwLDUxLDEzMSw1OSw0OCw0OSw1MCw1MSw3NiwxMzMsNjIsMTMyLDczLDQ3LDI0LDEyNCwxMjQsMTI3LDQsMTE0LDU3LDEyMSwwLDAsMF0sWzAsMCwwLDM3LDc2LDEzMiwxMzcsMTM4LDEzMyw2MCw3NiwxMzksMTc4LDEzMiwxMzcsMTM4LDEzMiwxNjcsMTAwLDE5NywzMiwzMywzNCw0NCwzNSw2NywzMSwwLDAsMF0sWzAsMCwwLDU4LDE4NCw3MywxODQsNzMsMTM4LDE5NSwxODQsMTkzLDE5NCw3MywxODQsNzMsODgsMTgwLDEyNCwxMjcsMTEsMzIyMTIyNTQ5NCwzMjIxMjI1NTUxLDMyMjEyMjU1MTgsMzIyMTIyNTUwNCwzMjIxMjI1NTM5LDMyMjEyMjU0ODcsMCwwLDBdLFswLDk3LDk4LDk5LDEwMCwxMDQsMTAwLDEwNCwxMDAsMTA0LDEwMCwyMDQsMjA1LDEwNCwxMDAsMTA0LDE5NywxMywzNSw2NywzMiwzMjIxMjI1NTM3LDMyMjEyMjU1MjUsMzIyMTIyNTQ4NCwzMjIxMjI1NDgzLDMyMjEyMjU1MzAsMCwwLDAsMF0sWzAsMCwxMjIsMTI1LDEyNCwxMjcsMTI1LDEyNiwxMjMsMjA2LDEyNCwyMDcsMjA4LDEyNiwxMjMsMjA2LDEyNCw0LDgwLDEyLDUzLDMyMjEyMjU1MDUsMzIyMTIyNTUwNCwzMjIxMjI1NTM5LDMyMjEyMjU1NTEsMzIyMTIyNTQ4NywwLDAsMCwwXSxbMCwwLDMyMjEyMjU0OTIsMzIyMTIyNTU3OSwzMjIxMjI1NTg1LDMyMjEyMjU1ODQsMzIyMTIyNTYwMCwzMjIxMjI1NTE3LDMyMjEyMjU1MTYsMzIyMTIyNTQ5NSwzMjIxMjI1NDk0LDMyMjEyMjU1NTEsMzIyMTIyNTUxOCwzMjIxMjI1NTE3LDMyMjEyMjU1MTYsMzIyMTIyNTQ5NSwzMjIxMjI1NDk0LDMyMjEyMjU1NTEsNDUsNDYsNzksMzIyMTIyNTUxMCwzMjIxMjI1NDgzLDMyMjEyMjU1MjksMzIyMTIyNTQ3NCwwLDAsMCwwLDBdLFswLDAsMCwzMjIxMjI1NTgyLDMyMjEyMjU0ODMsMzIyMTIyNTUyOSwzMjIxMjI1NTI4LDMyMjEyMjU1NTIsMzIyMTIyNTQ3NiwzMjIxMjI1NTM4LDMyMjEyMjU1MzcsMzIyMTIyNTUyNSwzMjIxMjI1NDg0LDMyMjEyMjU1NTIsMzIyMTIyNTQ3NiwzMjIxMjI1NTAyLDMyMjEyMjU0NzUsMzIyMTIyNTQ3NCwzMjIxMjI1NTI0LDMyMjEyMjU0OTUsMzIyMTIyNTQ5NCwzMjIxMjI1NDg1LDMyMjEyMjU1MDYsMzIyMTIyNTU4MiwzMjIxMjI1NDg5LDAsMCwwLDAsMF0sWzAsMCwwLDAsMzIyMTIyNTUwMywzMjIxMjI1NTE4LDMyMjEyMjU1MTcsMzIyMTIyNTUwNywzMjIxMjI1NDg1LDMyMjEyMjU1MDYsMzIyMTIyNTUwNSwzMjIxMjI1NTA0LDMyMjEyMjU1MzIsMzIyMTIyNTU4MCwzMjIxMjI1NTc5LDMyMjEyMjU1ODUsMzIyMTIyNTU4NCwzMjIxMjI1NjAwLDMyMjEyMjU1ODEsMzIyMTIyNTU1MSwzMjIxMjI1NjE3LDMyMjEyMjU0OTEsMzIyMTIyNTQ5MCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDMyMjEyMjU0OTAsMzIyMTIyNTQ4OSwzMjIxMjI1NDkyLDMyMjEyMjU0OTEsMzIyMTIyNTQ5MCwzMjIxMjI1NDg4LDMyMjEyMjU1MzUsMzIyMTIyNTQ4OSwzMjIxMjI1NTY4LDMyMjEyMjU1MTAsMzIyMTIyNTUwMiwzMjIxMjI1NDc1LDMyMjEyMjU1MzgsMzIyMTIyNTUzNywzMjIxMjI1NDc0LDAsMCwwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMzIyMTIyNTQ4NiwzMjIxMjI1NTgwLDMyMjEyMjU1NzksMzIyMTIyNTUwNiwzMjIxMjI1NTgyLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDMyMjEyMjU0ODksMzIyMTIyNTQ4OCwzMjIxMjI1NDkwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdXVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgY29sbGlzaW9uVGlsZXM6IFsyNCw2NCw3Nyw3OCw5MSw5Miw5Nyw5OCw5OSwxMDAsMTA0LDEwNSwxMTEsMTIzLDEyNCwxMjUsMTI2LDEyNywxMzAsMTY3LDE4MCwxOTUsMTk3LDIwNCwyMDUsMjA2LDIwNywyMDgsMjI5LDI0M11cclxuICAgIH0sXHJcbiAgICAnaGFsbC1vZi1hZ2VzJzoge1xyXG4gICAgICAgIGdyb3VuZExheWVyOiBbXHJcbiAgICAgICAgICAgIFtbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sIFswLCAzMDcsIDE1NywgMTU4LCAxNTcsIDE1OCwgMTU3LCAxNTgsIDE1NywgMTU4LCAzMDgsIDBdLCBbMCwgMzA5LCAzMTAsIDMxMSwgMzEwLCAzMTEsIDMxMCwgMzExLCAzMTAsIDMxMSwgMzEyLCAwXSwgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdXSxcclxuICAgICAgICAgICAgW1swLCAwLCAwLCAwLCAwXSwgWzAsIDMwNywgMTU3LCAzMDgsIDBdLCBbMCwgMzA5LCAzMTAsIDMxMiwgMF0sIFswLCAwLCAwLCAwLCAwXV0sXHJcbiAgICAgICAgICAgIFtbMCwgMCwgMCwgMCwgMCwgMF0sIFswLCAzMDcsIDE1NywgMTU4LCAzMDgsIDBdLCBbMCwgMzA5LCAzMTAsIDMxMSwgMzEyLCAwXSwgWzAsIDAsIDAsIDAsIDAsIDBdXVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgY29sbGlzaW9uVGlsZXM6IFszMDcsIDE1NywgMTU4LCAzMDgsIDMwOSwgMzEwLCAzMTEsIDMxMl1cclxuICAgIH1cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgcGxhdGZvcm1zQnlJZDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9tb2RlbHMvcGxhdGZvcm1zLmpzIiwiY29uc3QgbGV2ZWxzID0ge1xyXG4gICAgJ3Jpc2Utb2YtdGhlLXRpZGUnOiB7XHJcbiAgICAgICAgJ2lkJzogJ3Jpc2Utb2YtdGhlLXRpZGUnLFxyXG4gICAgICAgICduYW1lJzogJ1Jpc2Ugb2YgdGhlIFRpZGUnLFxyXG4gICAgXHQndGlsZXNldCc6ICd0aWxlc2V0LWxldmVsLXJpc2Utb2YtdGhlLXRpZGUnLFxyXG4gICAgXHQndGlsZW1hcCc6ICd0aWxlbWFwLWxldmVsLXJpc2Utb2YtdGhlLXRpZGUnLFxyXG4gICAgICAgICd0aWxlc2V0SW1hZ2UnOiAnTDEnXHJcbiAgICB9LFxyXG4gICAgJ2hhbGwtb2YtYWdlcyc6IHtcclxuICAgICAgICAnaWQnOiAnaGFsbC1vZi1hZ2VzJyxcclxuICAgICAgICAnbmFtZSc6ICdIYWxsIG9mIEFnZXMnLFxyXG4gICAgXHQndGlsZXNldCc6ICd0aWxlc2V0LWxldmVsLWhhbGwtb2YtYWdlcycsXHJcbiAgICBcdCd0aWxlbWFwJzogJ3RpbGVtYXAtbGV2ZWwtaGFsbC1vZi1hZ2VzJyxcclxuICAgICAgICAndGlsZXNldEltYWdlJzogJ0w4J1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGV2ZWxzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy90aWxlbWFwcy5qcyIsImNvbnN0IHRpbGVzZXRzID0ge1xyXG4gICAgJ3Jpc2Utb2YtdGhlLXRpZGUnOiB7XHJcblx0XHRcImNvbHVtbnNcIjogMTEsXHJcblx0XHRcImZpcnN0Z2lkXCI6IDEsXHJcblx0XHRcImltYWdlXCI6IFwiTDEucG5nXCIsXHJcblx0XHRcImltYWdlaGVpZ2h0XCI6IDM4NCxcclxuXHRcdFwiaW1hZ2V3aWR0aFwiOiAxNzYsXHJcblx0XHRcIm1hcmdpblwiOiAwLFxyXG5cdFx0XCJuYW1lXCI6IFwiTDFcIixcclxuXHRcdFwicHJvcGVydGllc1wiOiB7XHJcblxyXG5cdFx0fSxcclxuXHRcdFwic3BhY2luZ1wiOiAwLFxyXG5cdFx0XCJ0aWxlY291bnRcIjogMjY0LFxyXG5cdFx0XCJ0aWxlaGVpZ2h0XCI6IDE2LFxyXG5cdFx0XCJ0aWxld2lkdGhcIjogMTZcclxuXHR9LFxyXG4gICAgJ2hhbGwtb2YtYWdlcyc6IHtcclxuICAgICAgICAgXCJjb2x1bW5zXCI6MTEsXHJcbiAgICAgICAgIFwiZmlyc3RnaWRcIjoxLFxyXG4gICAgICAgICBcImltYWdlXCI6XCJMOC5wbmdcIixcclxuICAgICAgICAgXCJpbWFnZWhlaWdodFwiOjYwOCxcclxuICAgICAgICAgXCJpbWFnZXdpZHRoXCI6MTc2LFxyXG4gICAgICAgICBcIm1hcmdpblwiOjAsXHJcbiAgICAgICAgIFwibmFtZVwiOlwiTDhcIixcclxuICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6XHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgIFwic3BhY2luZ1wiOjAsXHJcbiAgICAgICAgIFwidGlsZWNvdW50XCI6NDE4LFxyXG4gICAgICAgICBcInRpbGVoZWlnaHRcIjoxNixcclxuICAgICAgICAgXCJ0aWxld2lkdGhcIjoxNlxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGlsZXNldHM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL3RpbGVzZXRzLmpzIiwiXHJcbmV4cG9ydCBjb25zdCBmbGF0dGVuID0gbXVsdGlkaW1lbnNpb25hbCA9PiB7XHJcbiAgICByZXR1cm4gbXVsdGlkaW1lbnNpb25hbC5yZWR1Y2UoKHJlcywgcm93KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5jb25jYXQocm93KTtcclxuICAgIH0sIFtdKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBhcHBseU1hdHJpeCA9IChiaWcsIHNtYWxsLCB4LCB5KSA9PiB7XHJcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBzbWFsbC5sZW5ndGg7IHJvdysrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgc21hbGxbcm93XS5sZW5ndGg7IGNvbCsrKSB7XHJcbiAgICAgICAgICAgIGJpZ1t5ICsgcm93XVt4ICsgY29sXSA9IHNtYWxsW3Jvd11bY29sXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYmlnO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZU1hdHJpeCA9IChyb3dzLCBjb2xzLCB0aWxlKSA9PiB7XHJcbiAgICBsZXQgcmVzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkrKykge1xyXG4gICAgICAgIGxldCByb3cgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHM7IGorKykge1xyXG4gICAgICAgICAgICByb3cucHVzaCh0aWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzLnB1c2gocm93KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXM7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgbGF5ZXJUb01hdHJpeCA9IGxheWVyID0+IHtcclxuICAgIHJldHVybiBsYXllci5kYXRhLnJlZHVjZSgocmVzdWx0LCB0aWxlLCBpKSA9PiB7XHJcbiAgICAgICAgaWYgKGkgJSBsYXllci53aWR0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChbdGlsZV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0ucHVzaCh0aWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0sIFtdKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjaGVja0lmQXJlYUlzQ292ZXJlZCA9IChtYXRyaXgsIHgsIHksIHdpZHRoLCBoZWlnaHQpID0+IHtcclxuICAgIGxldCByZXMgPSAwO1xyXG4gICAgZm9yIChsZXQgcm93ID0geDsgcm93IDw9IHggKyB3aWR0aDsgcm93KyspIHtcclxuICAgICAgICBmb3IgKGxldCBjb2wgPSB5OyBjb2wgPD0geSArIGhlaWdodDsgY29sKyspIHtcclxuICAgICAgICAgICAgcmVzICs9IG1hdHJpeFtjb2xdW3Jvd107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcyA9PT0gMDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmaWx0ZXJDb2xsaXNpb25UaWxlcyA9IGZsYXRtYXRyaXggPT4ge1xyXG5cdHJldHVybiBmbGF0bWF0cml4LmZpbHRlcih0aWxlID0+IHtcclxuXHRcdHJldHVybiB0aWxlICE9PSAwO1xyXG5cdH0pLnJlZHVjZSgodW5pcXVlcywgdGlsZSkgPT4ge1xyXG5cdFx0aWYodW5pcXVlcy5pbmRleE9mKHRpbGUpIDwgMCl7XHJcblx0XHRcdHVuaXF1ZXMucHVzaCh0aWxlKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB1bmlxdWVzO1xyXG5cdH0sIFtdKS5zb3J0KChhLCBiKSA9PiB7XHJcblx0XHRyZXR1cm4gYSAtIGJcclxuXHR9KTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci91dGlscy5qcyIsImZ1bmN0aW9uIGxldmVsTG9hZGVyKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGVCYWNrZ3JvdW5kOiAobGF5ZXJOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwuYmFja2dyb3VuZExheWVyID0gdGhpcy5nYW1lLmFkZC50aWxlU3ByaXRlKFxyXG4gICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsQ29uZmlnLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRLZXlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZUxheWVyOiAobGF5ZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbFtsYXllcl0gPSB0aGlzLmxldmVsLnRpbGVtYXAuY3JlYXRlTGF5ZXIodGhpcy5sZXZlbENvbmZpZ1tsYXllcl0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlTGF5ZXJzOiAobGF5ZXJzKSA9PiB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgbGF5ZXIgaW4gbGF5ZXJzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxbbGF5ZXJdID0gdGhpcy5sZXZlbC50aWxlbWFwLmNyZWF0ZUxheWVyKHRoaXMubGV2ZWxDb25maWcubGF5ZXJzW2xheWVyXS5rZXkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbFtsYXllcl0udmlzaWJsZSA9IHRoaXMubGV2ZWxDb25maWcubGF5ZXJzW2xheWVyXS52aXNpYmxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGVUaWxlczogKHRpbGVtYXBLZXksIHRpbGVzZXRLZXksIHRpbGVzZXRJbWFnZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLnRpbGVtYXAgPSB0aGlzLmdhbWUuYWRkLnRpbGVtYXAodGlsZW1hcEtleSk7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcC5hZGRUaWxlc2V0SW1hZ2UodGlsZXNldEltYWdlLCB0aWxlc2V0S2V5KTtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC50aWxlbWFwLnNldENvbGxpc2lvbkJldHdlZW4oMCwgMzAwMCwgdHJ1ZSwgdGhpcy5sZXZlbENvbmZpZy5sYXllcnMuY29sbGlzaW9uTGF5ZXIua2V5KTtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC50aWxlbWFwLnNldENvbGxpc2lvbkJldHdlZW4oMCwgMzAwMCwgdHJ1ZSwgdGhpcy5sZXZlbENvbmZpZy5sYXllcnMuZGVhdGhMYXllci5rZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsZXZlbExvYWRlcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbExvYWRlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=