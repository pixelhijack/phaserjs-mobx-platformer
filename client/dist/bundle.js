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
            var enemy = new _AI2.default(_this.game, levelConfig.origin.x, levelConfig.origin.y, _this.globalConfig.textureAtlasName, _this.creatureConfig[levelConfig.type], _this.creatureConfig[levelConfig.type].behaviours);
            enemy.setBounds(levelConfig.boundTo);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmU1ZGQ3MWNjNDJhMDYxMDgzYjUiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSHVtYW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL21lbnUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0l0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmF0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmVhci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Rpbm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9kcmFnb25mbHkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9mcm9nLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZ29yaWxsYS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2luc2VjdC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2plbGx5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvbmF0aXZlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcGFycm90LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvcHRlcm8uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9zcGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy90aWdlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvbWVudS9tZW51LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmluaXQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5wcmVsb2FkLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkudXBkYXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9jcmVhdHVyZUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL2xldmVsQnVpbGRlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9iYWNrZ3JvdW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9sYXllcnMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9tb2RlbHMvbGV2ZWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9tb2RlbHMvbGV2ZWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9tb2RlbHMvcGxhdGZvcm1zLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL3RpbGVtYXBzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL3RpbGVzZXRzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbExvYWRlci5qcyJdLCJuYW1lcyI6WyJBSSIsImdhbWUiLCJ4IiwieSIsInNwcml0ZSIsInByb3BzIiwiYmVoYXZpb3VycyIsImlkIiwidHlwZSIsInNwcml0ZVN0YXRlIiwibW9ieCIsIm9ic2VydmFibGUiLCJsaWZlIiwic3R1biIsImhpdCIsIm5vaGl0IiwiYm9keSIsImJsb2NrZWQiLCJsZWZ0IiwicmlnaHQiLCJzY2FsZSIsImJvdW5kVG8iLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiaGFzT3duUHJvcGVydHkiLCJQaGFzZXIiLCJQb2ludCIsIlJlY3RhbmdsZSIsIngxIiwieDIiLCJoZWlnaHQiLCJ5MSIsInkyIiwiY29udGFpbnNQb2ludCIsImdldEJvdW5kcyIsImZhY2luZ1JpZ2h0IiwidHVybiIsImZhY2luZ0xlZnQiLCJ3aWR0aCIsInBhcmFtcyIsIk1hdGgiLCJyYW5kb20iLCJwcm9iYWJpbGl0eSIsImFjdGlvbiIsImNhbGwiLCJmb3JFYWNoIiwiYmVoYXZpb3VyIiwiRXh0ZW5kZWRTcHJpdGUiLCJhbmltYXRpb25zIiwiYWRkIiwiZXhpc3RpbmciLCJwaHlzaWNzIiwiZW5hYmxlIiwiUGh5c2ljcyIsIkFSQ0FERSIsImFuY2hvciIsInNldFRvIiwiY29sbGlkZVdvcmxkQm91bmRzIiwiY2hlY2tXb3JsZEJvdW5kcyIsIm91dE9mQm91bmRzS2lsbCIsImdyYXZpdHkiLCJfZGVidWdUZXh0IiwiYWRkQ2hpbGQiLCJ0ZXh0IiwiZm9udCIsImZpbGwiLCJ2aXNpYmxlIiwiYW5pbWF0aW9uIiwibmFtZSIsImZyYW1lcyIsIm1hcCIsImZyYW1lIiwidG9TdHJpbmciLCJmcHMiLCJsb29wIiwiZ2FtZVN0YXRlIiwic3RhdGUiLCJzdGF0ZXMiLCJjdXJyZW50Iiwib2JzZXJ2ZSIsImNoYW5nZSIsImNvbnNvbGUiLCJsb2ciLCJ1cGRhdGVTdGF0ZSIsImFzc2lnbiIsInZlbG9jaXR5IiwibWF4U3BlZWQiLCJhY2NlbGVyYXRpb24iLCJwbGF5IiwibW92ZVJpZ2h0IiwibW92ZUxlZnQiLCJ0b3VjaGluZyIsImRvd24iLCJoaXRVbnRpbCIsInRpbWUiLCJub3ciLCJicmVha1VudGlsIiwiZGlyZWN0aW9uIiwic2V0VGV4dCIsIlNwcml0ZSIsIkh1bWFuIiwibm9idWlsZCIsInN0ZXAiLCJpdGVtcyIsInBsYXRmb3JtcyIsIk1lbnUiLCJ1bmRlZmluZWQiLCJwcm90b3R5cGUiLCJjcmVhdGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiUGxheSIsImdsb2JhbENvbmZpZyIsInBsYXllciIsImVuZW15IiwiYm9udXMiLCJwb3J0YWxzIiwibGV2ZWwiLCJiYWNrZ3JvdW5kTGF5ZXIiLCJncm91bmRMYXllciIsInRpbGVtYXAiLCJjcmVhdHVyZUNvbmZpZyIsImxldmVsTG9hZGVyIiwiY3JlYXR1cmVGYWN0b3J5IiwiaW5pdCIsInByZWxvYWQiLCJ1cGRhdGUiLCJibG9ja3MiLCJkb21FbGVtZW50IiwiYmFja2dyb3VuZFBhdGgiLCJ0aWxlc2V0UGF0aCIsImxldmVsUGF0aCIsInRleHR1cmVBdGxhc1BhdGgiLCJ0ZXh0dXJlQXRsYXNOYW1lIiwidGV4dHVyZUF0bGFzSW1hZ2UiLCJ0ZXh0dXJlQXRsYXNKc29uIiwiSXRlbSIsImFsbG93R3Jhdml0eSIsImltbW92YWJsZSIsImNyZWF0dXJlQ29uZmlncyIsImNyZWF0dXJlRGVmYXVsdHMiLCJhY3RpdmUiLCJib3VuY2UiLCJtYXNzIiwianVtcGluZyIsImNvbGxpZGUiLCJsaXZlcyIsImxpZmVzcGFuIiwiSW5maW5pdHkiLCJzZW5zZSIsInRpbWVPZiIsIm1hbiIsImRpbm8iLCJiZWFyIiwiaW1hZ2UiLCJ0aWdlciIsInB0ZXJvIiwiZHJhZ29uZmx5IiwiYmF0Iiwic3BpZGVyIiwibmF0aXZlIiwicGFycm90IiwiaW5zZWN0IiwiYnVnIiwiZnJvZyIsInR1cnRsZSIsImplbGx5IiwiZ29yaWxsYSIsImNyZWF0dXJlIiwiZGVmYXVsdHMiLCJwcm9wIiwiQmF0IiwiQmVhciIsIkJ1ZyIsIkRpbm8iLCJEcmFnb25mbHkiLCJGcm9nIiwiR29yaWxsYSIsIkluc2VjdCIsIkplbGx5IiwiTmF0aXZlIiwiUGFycm90IiwiUHRlcm8iLCJTcGlkZXIiLCJUaWdlciIsIlR1cnRsZSIsImFkdmFuY2VkVGltaW5nIiwiYWxpZ24iLCJzZXQiLCJpbnB1dCIsImtleWJvYXJkIiwib25Eb3duQ2FsbGJhY2siLCJlIiwiaXNOYU4iLCJrZXkiLCJ0ZXN0IiwiZmV0Y2giLCJtZXRob2QiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwibGV2ZWxDb25maWciLCJzdGFydCIsIndvcmxkIiwic2V0Qm91bmRzIiwic3RhcnRTeXN0ZW0iLCJjcmVhdGVCYWNrZ3JvdW5kIiwiY3JlYXRlVGlsZXMiLCJ0aWxlc2V0IiwidGlsZXNldEltYWdlIiwiY3JlYXRlTGF5ZXJzIiwibGF5ZXJzIiwibWF4SGVpZ2h0Iiwic2V0R2FtZVNpemUiLCJmaXhlZFRvQ2FtZXJhIiwiZml4ZWRCYWNrZ3JvdW5kIiwicmVzaXplV29ybGQiLCJpbml0aWFsaXNlZCIsInNjb3JlIiwiZW50cnlQb2ludCIsImVuZW1pZXMiLCJHcm91cCIsImNhbWVyYSIsImZvbGxvdyIsImNyZWF0ZUN1cnNvcktleXMiLCJzcGFjZSIsImFkZEtleSIsIktleWJvYXJkIiwiU1BBQ0VCQVIiLCJhbHQiLCJBTFQiLCJjb250cm9sIiwiQ09OVFJPTCIsInNoaWZ0IiwiU0hJRlQiLCJtZW51Iiwic2NhbGVNb2RlIiwiU2NhbGVNYW5hZ2VyIiwiU0hPV19BTEwiLCJwYWdlQWxpZ25Ib3Jpem9udGFsbHkiLCJwYWdlQWxpZ25WZXJ0aWNhbGx5Iiwic2V0TWluTWF4IiwibG9hZCIsImF0bGFzIiwiTG9hZGVyIiwiVEVYVFVSRV9BVExBU19KU09OX0hBU0giLCJiYWNrZ3JvdW5kS2V5IiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uIiwidGlsZXNldEltYWdlRXh0ZW5zaW9uIiwidGlsZWRKc29uIiwiVGlsZW1hcCIsIlRJTEVEX0pTT04iLCJkZWJ1ZyIsImFyY2FkZSIsImNvbGxpc2lvbkxheWVyIiwiZGVhdGhMYXllciIsIm92ZXJsYXAiLCJ1cCIsImlzSGl0dGluZyIsImlzU3R1bm5lZCIsImh1cnQiLCJvbktleVByZXNzIiwiaXNEb3duIiwic3RvcCIsImp1bXAiLCJidWlsZCIsIlBMQVRGT1JNRVIiLCJHYW1lIiwiQVVUTyIsImJpbmQiLCJDcmVhdHVyZSIsIm9yaWdpbiIsImxldmVsR2VuZXJhdG9yIiwibGV2ZWxCdWlsZGVyIiwicmFuZG9tQmFja2dyb3VuZCIsImVuZW15VHlwZXMiLCJmaW5kUGxhY2VzRm9yIiwiYU1hdHJpeCIsInJldHJ5IiwibWF0cml4Iiwic2xpY2UiLCJpdGVtIiwiZmxvb3IiLCJwdXNoIiwiaXNsYW5kcyIsImNyZWF0ZUVuZW15QXQiLCJ4VGlsZSIsInlUaWxlIiwidGlsZXNXaWR0aCIsIm51bWJlciIsImdldENvbGxpc2lvbkxheWVyIiwiZmxhdE1hdHJpeCIsImNvbGxpc2lvblRpbGVzIiwidGlsZSIsImluZGV4T2YiLCJMZXZlbEJ1aWxkZXIiLCJ0aWxlc0hlaWdodCIsImRlbnNpdHkiLCJwbGFjZXNGb3IiLCJhcHBseSIsImRhdGEiLCJ0aWxlc2V0cyIsImJhY2tncm91bmRzIiwibGV2ZWxNb2RlbCIsInBsYXRmb3Jtc0J5SWQiLCJsZXZlbHMiLCJmbGF0dGVuIiwibXVsdGlkaW1lbnNpb25hbCIsInJlZHVjZSIsInJlcyIsInJvdyIsImNvbmNhdCIsImFwcGx5TWF0cml4IiwiYmlnIiwic21hbGwiLCJjb2wiLCJjcmVhdGVNYXRyaXgiLCJyb3dzIiwiY29scyIsImkiLCJqIiwibGF5ZXJUb01hdHJpeCIsImxheWVyIiwicmVzdWx0IiwiY2hlY2tJZkFyZWFJc0NvdmVyZWQiLCJmaWx0ZXJDb2xsaXNpb25UaWxlcyIsImZsYXRtYXRyaXgiLCJmaWx0ZXIiLCJ1bmlxdWVzIiwic29ydCIsImEiLCJiIiwibGF5ZXJOYW1lIiwidGlsZVNwcml0ZSIsImNyZWF0ZUxheWVyIiwidGlsZW1hcEtleSIsInRpbGVzZXRLZXkiLCJhZGRUaWxlc2V0SW1hZ2UiLCJzZXRDb2xsaXNpb25CZXR3ZWVuIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFF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O0FBQ0g7QUF4QkUsS0FBUDtBQTBCSDs7a0JBRWN4RSxXIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmZTVkZDcxY2M0MmEwNjEwODNiNSIsImltcG9ydCBFeHRlbmRlZFNwcml0ZSBmcm9tICcuL0V4dGVuZGVkU3ByaXRlJztcclxuXHJcbmNsYXNzIEFJIGV4dGVuZHMgRXh0ZW5kZWRTcHJpdGUge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcywgYmVoYXZpb3Vycyl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuaWQgPSBgJHtwcm9wcy50eXBlfS0ke3h9LSR7eX1gO1xyXG5cclxuICAgICAgICB0aGlzLmJlaGF2aW91cnMgPSBiZWhhdmlvdXJzO1xyXG5cclxuICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gbW9ieC5vYnNlcnZhYmxlKHtcclxuICAgICAgICAgICAgbGlmZTogMTAsXHJcbiAgICAgICAgICAgIHN0dW46IDAsXHJcbiAgICAgICAgICAgIGhpdDogMCxcclxuICAgICAgICAgICAgbm9oaXQ6IDBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICB0dXJuSWZCbG9ja2VkKCl7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LmJsb2NrZWQubGVmdCB8fCB0aGlzLmJvZHkuYmxvY2tlZC5yaWdodCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUueCAqPSAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0dXJuKCl7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ICo9IC0xO1xyXG4gICAgfVxyXG4gICAgc2V0Qm91bmRzKGJvdW5kVG8pe1xyXG4gICAgICAgIGlmKCFib3VuZFRvIHx8ICFPYmplY3Qua2V5cyhib3VuZFRvKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICB0aGlzLmJvdW5kVG8gPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3gnKSAmJlxyXG4gICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd5Jykpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFRvID0gbmV3IFBoYXNlci5Qb2ludChcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngsXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby55XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQFJlY3RhbmdsZSB7IHgxLCB4MiB9XHJcbiAgICAgICAgaWYoYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneDEnKSAmJlxyXG4gICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd4MicpICYmXHJcbiAgICAgICAgICAgICFib3VuZFRvLmhhc093blByb3BlcnR5KCd5MScpICYmXHJcbiAgICAgICAgICAgICFib3VuZFRvLmhhc093blByb3BlcnR5KCd5MicpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm91bmRUbyA9IG5ldyBQaGFzZXIuUmVjdGFuZ2xlKFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDEsXHJcbiAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLngyIC0gYm91bmRUby54MSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8ge3gxLCB5MSwgeDIsIHkyfVxyXG4gICAgICAgIGlmKGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3gxJykgJiZcclxuICAgICAgICAgICAgYm91bmRUby5oYXNPd25Qcm9wZXJ0eSgneDInKSAmJlxyXG4gICAgICAgICAgICBib3VuZFRvLmhhc093blByb3BlcnR5KCd5MScpICYmXHJcbiAgICAgICAgICAgIGJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3kyJykpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZFRvID0gbmV3IFBoYXNlci5SZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUby54MSxcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvLnkxLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueDIgLSBib3VuZFRvLngxLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG8ueTIgLSBib3VuZFRvLnkxXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNoZWNrQm91bmRzKCl7XHJcbiAgICAgICAgaWYoIXRoaXMuYm91bmRUbyl7XHJcbiAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQFBvaW50IHt4LCB5fVxyXG4gICAgICAgIGlmKCF0aGlzLmJvdW5kVG8uaGFzT3duUHJvcGVydHkoJ3dpZHRoJykgJiZcclxuICAgICAgICAgICAgIVBoYXNlci5SZWN0YW5nbGUuY29udGFpbnNQb2ludCh0aGlzLmdldEJvdW5kcygpLCB0aGlzLmJvdW5kVG8pICYmXHJcbiAgICAgICAgICAgICgodGhpcy54IDwgdGhpcy5ib3VuZFRvLnggJiYgIXRoaXMuZmFjaW5nUmlnaHQpIHx8XHJcbiAgICAgICAgICAgICh0aGlzLnggPiB0aGlzLmJvdW5kVG8ueCAmJiB0aGlzLmZhY2luZ1JpZ2h0KSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50dXJuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBAUmVjdGFuZ2xlIHt4MSwgeDJ9IG9yIHt4MSwgeTEsIHgyLCB5Mn1cclxuICAgICAgICBpZih0aGlzLmJvdW5kVG8gJiZcclxuICAgICAgICAgICAgdGhpcy5ib3VuZFRvLmhhc093blByb3BlcnR5KCd3aWR0aCcpICYmXHJcbiAgICAgICAgICAgICh0aGlzLnggPCB0aGlzLmJvdW5kVG8ueCAmJiB0aGlzLmZhY2luZ0xlZnQgfHxcclxuICAgICAgICAgICAgdGhpcy54ID4gdGhpcy5ib3VuZFRvLnggKyB0aGlzLmJvdW5kVG8ud2lkdGggJiYgdGhpcy5mYWNpbmdSaWdodCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50dXJuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgd2hlbihwYXJhbXMpIHtcclxuXHRcdGlmKE1hdGgucmFuZG9tKCkgPCBwYXJhbXMucHJvYmFiaWxpdHkpe1xyXG5cdFx0XHR0aGlzW3BhcmFtcy5hY3Rpb25dICYmIHRoaXNbcGFyYW1zLmFjdGlvbl0uY2FsbCh0aGlzKTtcclxuXHRcdH1cclxuXHR9XHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL2NvbnN0IGRlYnVnQm91bmRzID0gdGhpcy5pZCsnXFxuJysgKHRoaXMuYm91bmRUbyAmJiBPYmplY3Qua2V5cyh0aGlzLmJvdW5kVG8pLmxlbmd0aCAmJiB0aGlzLmJvdW5kVG8ueCkgKydcXG4nKyAodGhpcy54IHwgMCk7XHJcbiAgICAgICAgLy90aGlzLmRlYnVnKGRlYnVnQm91bmRzKTtcclxuICAgICAgICB0aGlzLmJlaGF2aW91cnMuZm9yRWFjaCgoYmVoYXZpb3VyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXNbYmVoYXZpb3VyLmFjdGlvbl0gJiYgdGhpc1tiZWhhdmlvdXIuYWN0aW9uXS5jYWxsKHRoaXMsIGJlaGF2aW91ci5wYXJhbXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBSTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwiY2xhc3MgRXh0ZW5kZWRTcHJpdGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRle1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlKTtcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wcyB8fCB7IGFuaW1hdGlvbnM6IFtdIH07XHJcbiAgICAgICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzKTtcclxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuICAgICAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUsIDEpO1xyXG4gICAgICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYm9keS5ncmF2aXR5LnkgPSB0aGlzLnByb3BzLmdyYXZpdHk7XHJcbiAgICAgICAgdGhpcy5fZGVidWdUZXh0ID0gdGhpcy5hZGRDaGlsZChcclxuICAgICAgICAgICAgdGhpcy5nYW1lLmFkZC50ZXh0KDIwLCAtMjAsICdkZWJ1ZycsIHsgZm9udDogXCIxMnB4IENvdXJpZXJcIiwgZmlsbDogXCIjZmZmZmZmXCIgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuX2RlYnVnVGV4dC52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcHMuYW5pbWF0aW9ucy5mb3JFYWNoKGFuaW1hdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ubmFtZSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcmFtZXMubWFwKGZyYW1lID0+IGZyYW1lLnRvU3RyaW5nKCkpLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZwcyxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5sb29wXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdhbWVTdGF0ZSA9IHRoaXMuZ2FtZS5zdGF0ZS5zdGF0ZXNbdGhpcy5nYW1lLnN0YXRlLmN1cnJlbnRdLmdhbWVTdGF0ZTtcclxuXHJcbiAgICAgICAgbW9ieC5vYnNlcnZlKGdhbWVTdGF0ZSwgKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlJywgY2hhbmdlLCBnYW1lU3RhdGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gT2JqZWN0LmFzc2lnbih0aGlzLnNwcml0ZVN0YXRlLCBjaGFuZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0hpdHRpbmcoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcHJpdGVTdGF0ZS5oaXQgPiB0aGlzLmdhbWUudGltZS5ub3c7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzU3R1bm5lZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwcml0ZVN0YXRlLnN0dW4gPiB0aGlzLmdhbWUudGltZS5ub3c7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZhY2luZ1JpZ2h0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZhY2luZ0xlZnQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS54IDwgMDtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlTGVmdCgpe1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IC0xO1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS52ZWxvY2l0eS54ID4gLXRoaXMucHJvcHMubWF4U3BlZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAtPSB0aGlzLnByb3BzLmFjY2VsZXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVJpZ2h0KCl7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gMTtcclxuICAgICAgICBpZih0aGlzLmJvZHkudmVsb2NpdHkueCA8IHRoaXMucHJvcHMubWF4U3BlZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCArPSB0aGlzLnByb3BzLmFjY2VsZXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZSgpe1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdtb3ZlJyk7XHJcbiAgICAgICAgaWYodGhpcy5zY2FsZS54ID09PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlUmlnaHQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVMZWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKXtcclxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAvPSAxLjE7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ3N0b3AnKTtcclxuICAgIH1cclxuXHJcbiAgICBqdW1wKCl7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnRvdWNoaW5nLmRvd24gfHwgdGhpcy5ib2R5LmJsb2NrZWQuZG93bil7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55IC09IDMwMDtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ2p1bXAnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGl0KCl7XHJcbiAgICAgICAgY29uc3QgaGl0VW50aWwgPSB0aGlzLmdhbWUudGltZS5ub3cgKyA5MDAsXHJcbiAgICAgICAgICAgIGJyZWFrVW50aWwgPSB0aGlzLmdhbWUudGltZS5ub3cgKyAxMDAwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdOb3cgJXMgSGl0ICVzIEJyZWFrICVzJywgdGhpcy5nYW1lLnRpbWUubm93LCBoaXRVbnRpbCwgYnJlYWtVbnRpbCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgIGhpdDogaGl0VW50aWwsXHJcbiAgICAgICAgICAgIG5vaGl0OiBicmVha1VudGlsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ2hpdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGh1cnQoZGlyZWN0aW9uKXtcclxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSAtPSAxMDA7XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uICYmIGRpcmVjdGlvbi5sZWZ0KXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggLT0gMTAwIHx8IHRoaXMucHJvcHMubWF4U3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRpcmVjdGlvbiAmJiBkaXJlY3Rpb24ucmlnaHQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCArPSAxMDAgfHwgdGhpcy5wcm9wcy5tYXhTcGVlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ2h1cnQnKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWJ1Zyh0ZXh0KXtcclxuICAgICAgIHRoaXMuX2RlYnVnVGV4dC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgIHRoaXMuX2RlYnVnVGV4dC5zY2FsZS54ID0gdGhpcy5zY2FsZS54O1xyXG4gICAgICAgdGhpcy5fZGVidWdUZXh0LnNldFRleHQodGV4dC50b1N0cmluZygpIHx8ICcnKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdbU3ByaXRlXSBzdGF0ZScpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXh0ZW5kZWRTcHJpdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsImltcG9ydCBFeHRlbmRlZFNwcml0ZSBmcm9tICcuL0V4dGVuZGVkU3ByaXRlJztcclxuaW1wb3J0IEl0ZW0gZnJvbSAnLi9JdGVtJztcclxuXHJcbmNsYXNzIEh1bWFuIGV4dGVuZHMgRXh0ZW5kZWRTcHJpdGUge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgICAgICBsaWZlOiAxMCxcclxuICAgICAgICAgICAgc3R1bjogMCxcclxuICAgICAgICAgICAgaGl0OiAwLFxyXG4gICAgICAgICAgICBub2hpdDogMCxcclxuICAgICAgICAgICAgbm9idWlsZDogMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYnVpbGQoeCwgeSl7XHJcbiAgICAgICAgY29uc3Qgc3RlcCA9IG5ldyBJdGVtKHRoaXMuZ2FtZSwgeCwgeSwgJ3ByZTJhdGxhcycsIHtcclxuICAgICAgICAgICAgYW5pbWF0aW9uczogW3sgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFsyOThdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9XVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGF0ZXNbdGhpcy5nYW1lLnN0YXRlLmN1cnJlbnRdLml0ZW1zLnBsYXRmb3Jtcy5hZGQoc3RlcCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgIG5vYnVpbGQ6IHRoaXMuZ2FtZS50aW1lLm5vdyArIDMwMDBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSHVtYW47XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9IdW1hbi5qcyIsImltcG9ydCBjcmVhdGUgZnJvbSAnLi9tZW51LmNyZWF0ZSc7XHJcbi8vaW1wb3J0IHVwZGF0ZSBmcm9tICcuL3BsYXkudXBkYXRlJztcclxuXHJcbmNsYXNzIE1lbnUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5rZXlzID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5NZW51LnByb3RvdHlwZS5jcmVhdGUgPSBjcmVhdGU7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1lbnU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9tZW51L2luZGV4LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQUknO1xuaW1wb3J0IEh1bWFuIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSHVtYW4nO1xuXG5pbXBvcnQgbGV2ZWxMb2FkZXIgZnJvbSAnLi4vLi4vc2VydmljZXMvbGV2ZWxMb2FkZXInO1xuaW1wb3J0IGNyZWF0dXJlRmFjdG9yeSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jcmVhdHVyZUZhY3RvcnknO1xuaW1wb3J0IGNyZWF0dXJlQ29uZmlnIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY3JlYXR1cmVjb25maWcnO1xuXG5pbXBvcnQgaW5pdCBmcm9tICcuL3BsYXkuaW5pdCc7XG5pbXBvcnQgcHJlbG9hZCBmcm9tICcuL3BsYXkucHJlbG9hZCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy4vcGxheS5jcmVhdGUnO1xuaW1wb3J0IHVwZGF0ZSBmcm9tICcuL3BsYXkudXBkYXRlJztcblxyXG5jbGFzcyBQbGF5IHtcclxuICAgIGNvbnN0cnVjdG9yKGdsb2JhbENvbmZpZykge1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnBsYXllciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmVuZW15ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSB7XHJcbiAgICAgICAgICAgIGJvbnVzOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHBvcnRhbHM6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgcGxhdGZvcm1zOiB1bmRlZmluZWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubGV2ZWwgPSB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRMYXllcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBncm91bmRMYXllcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB0aWxlbWFwOiB1bmRlZmluZWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZyA9IGdsb2JhbENvbmZpZztcclxuICAgICAgICB0aGlzLmNyZWF0dXJlQ29uZmlnID0gY3JlYXR1cmVDb25maWc7XHJcbiAgICAgICAgdGhpcy5sZXZlbExvYWRlciA9IGxldmVsTG9hZGVyLmNhbGwodGhpcyk7XHJcbiAgICAgICAgdGhpcy5jcmVhdHVyZUZhY3RvcnkgPSBjcmVhdHVyZUZhY3RvcnkuY2FsbCh0aGlzKTtcclxuICAgIH1cclxufVxuXG5QbGF5LnByb3RvdHlwZS5pbml0ID0gaW5pdDtcblBsYXkucHJvdG90eXBlLnByZWxvYWQgPSBwcmVsb2FkO1xyXG5QbGF5LnByb3RvdHlwZS5jcmVhdGUgPSBjcmVhdGU7XHJcblBsYXkucHJvdG90eXBlLnVwZGF0ZSA9IHVwZGF0ZTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJjb25zdCBnbG9iYWxDb25maWcgPSB7XHJcbiAgICB3aWR0aDogNTQ2LFxyXG4gICAgaGVpZ2h0OiAzNjgsXHJcbiAgICBibG9ja3M6IDMsXHJcbiAgICBkb21FbGVtZW50OiAnZ2FtZScsXHJcbiAgICBiYWNrZ3JvdW5kUGF0aDogJ2JhY2tncm91bmRzLycsXHJcbiAgICB0aWxlc2V0UGF0aDogJ3RpbGVzZXRzLycsXHJcbiAgICBsZXZlbFBhdGg6ICdsZXZlbHMvJyxcclxuICAgIHRleHR1cmVBdGxhc1BhdGg6ICdzcHJpdGVzaGVldHMvJyxcclxuICAgIHRleHR1cmVBdGxhc05hbWU6ICdwcmUyYXRsYXMnLFxyXG4gICAgdGV4dHVyZUF0bGFzSW1hZ2U6ICdwcmUyYXRsYXMucG5nJyxcclxuICAgIHRleHR1cmVBdGxhc0pzb246ICdwcmUyYXRsYXMuanNvbidcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdsb2JhbENvbmZpZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nbG9iYWxDb25maWcuanMiLCJjbGFzcyBJdGVtIGV4dGVuZHMgUGhhc2VyLlNwcml0ZXtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHMgfHwgeyBhbmltYXRpb25zOiBbXSB9O1xyXG4gICAgICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41LCAxKTtcclxuICAgICAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gMDtcclxuICAgICAgICB0aGlzLmFsbG93R3Jhdml0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYm9keS5pbW1vdmFibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLnByb3BzLmFuaW1hdGlvbnMuZm9yRWFjaChhbmltYXRpb24gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24uZnJhbWVzLm1hcChmcmFtZSA9PiBmcmFtZS50b1N0cmluZygpKSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcHMsXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ubG9vcFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdpZGxlJyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJdGVtO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvSXRlbS5qcyIsInZhciBjcmVhdHVyZUNvbmZpZ3MgPSB7XHJcbiAgY3JlYXR1cmVEZWZhdWx0czoge1xyXG4gICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgZ3Jhdml0eTogNTAwLFxyXG4gICAgYm91bmNlOiAwLjIsXHJcbiAgICBtYXNzOiAxLFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDEwMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgbGl2ZXM6IDEsXHJcbiAgICBsaWZlc3BhbjogSW5maW5pdHksXHJcbiAgICBzZW5zZTogMTUwLFxyXG4gICAgYW5pbWF0aW9uczogW10sXHJcbiAgICB0aW1lT2Y6IHtcclxuICAgICAgJ21vdmUnOiAyMDAsXHJcbiAgICAgICdoaXQnOiAxMDAsXHJcbiAgICAgICdodXJ0JzogNTAwLFxyXG4gICAgICAnc3RvcCc6IDIwMCxcclxuICAgICAgJ2lkbGUnOiAxMFxyXG4gICAgfSxcclxuICAgIGJvdW5kVG8gOiB7fSxcclxuICAgIGJlaGF2aW91cnM6IFtcclxuICAgICAgICB7IGFjdGlvbjogJ3R1cm5JZkJsb2NrZWQnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdtb3ZlJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnY2hlY2tCb3VuZHMnIH1cclxuICAgIF1cclxuICB9LFxyXG4gIG1hbjoge1xyXG4gICAgdHlwZTogJ21hbicsXHJcbiAgICBtYXhTcGVlZDogMjAwLFxyXG4gICAgbGl2ZXM6IDgsXHJcbiAgICBsaWZlc3BhbjogSW5maW5pdHksXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFsxMSwnMDMnLCcwNScsMTQsMjBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdoaXQnLCBmcmFtZXM6IFsyMiwyNCwyOCwzMSwzNCwyMiwyNCwyOCwzMSwzNF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3RvcCcsIGZyYW1lczogWzQyLDQ1LDQ5LDUyXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzE2LDQxLDQ3LDUwLDUwLDUwLDUwLDUwLDUwLDUwLDUwLDEzLDUwLDEzLDUwLDEzXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI3LDI3LDI3LDI3LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDMwLDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI3LDMwLDI3LDMwLDM1LDM2LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LCcwNycsJzA3JywnMDcnLCcwNycsJzAyJywnMDInXSwgZnBzOiA1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2h1cnQnLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3R1bicsIGZyYW1lczogWzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMTEsJzAzJywnMDUnLDE0LDIwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgZGlubzoge1xyXG4gICAgdHlwZTogJ2Rpbm8nLFxyXG4gICAgbWFzczogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiA1LFxyXG4gICAgYmVoYXZpb3VyczogW1xyXG4gICAgICAgIHsgYWN0aW9uOiAndHVybklmQmxvY2tlZCcgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ21vdmUnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdjaGVja0JvdW5kcycgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ3doZW4nLCBwYXJhbXM6IHsgcHJvYmFiaWxpdHk6IDAuMDEsIGFjdGlvbjogJ2p1bXAnIH0gfVxyXG4gICAgXSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM2MCwzNjAsMzYwLDM2MCwzNjAsMzYwLDM2MCwzNjddLCBmcHM6IDUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM2MCwzNjEsMzY0LDM2NywzNjldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszNjAsMzYxLDM2NCwzNjcsMzY5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdmYWxsJywgZnJhbWVzOiBbMzY5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNzFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzYwLDM2MSwzNjQsMzY3XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBiZWFyOiB7XHJcbiAgICB0eXBlOiAnYmVhcicsXHJcbiAgICBtYXNzOiAxLjIsXHJcbiAgICBtYXhTcGVlZDogNzUsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxNSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMyMV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMjAsMzIxLDMyNF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNjYsMzYzLDM1OCwzMTddLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszMjhdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gICdzdXBlci1iZWFyJzoge1xyXG4gICAgYWNjZWxlcmF0aW9uOiAzMCxcclxuICAgIG1heFNwZWVkOiAyMDAsXHJcbiAgICBpbWFnZTogJ3N1cGVyLWJlYXItc3ByaXRlLXJlZicsIC8vIG92ZXJyaWRlIHNwcml0ZSAoY3JlYXR1cmUgbmFtZSBieSBkZWZhdWx0KVxyXG4gICAgYW5pbWF0aW9uczogW11cclxuICB9LFxyXG4gIHRpZ2VyOiB7XHJcbiAgICB0eXBlOiAndGlnZXInLFxyXG4gICAgbWFzczogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM5MywzOTVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszOTMsMzk1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzk5LDQwMV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2ZhbGwnLCBmcmFtZXM6IFszOTldLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0MDJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzkzLDM5NV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgcHRlcm86IHtcclxuICAgIHR5cGU6ICdwdGVybycsXHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogMTAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzcsNDc4LDQ3OCw0NzgsNDc4LDQ3OCw0NzcsNDc3XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFs0MDMsNDA0LDQwNSw0MDMsNDA0LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDA1LDQwMyw0MDQsNDA1LDQwMyw0MDQsNDA1LDQwNSw0MDUsNDA1LDQwNSw0MDUsNDA1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkZXNjZW5kJywgZnJhbWVzOiBbNDA1XSwgZnBzOiAxNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdhc2NlbmQnLCBmcmFtZXM6IFs0MDMsNDA0LDQwNV0sIGZwczogMTUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDcxXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzQwNSw0MDMsNDA0XSwgZnBzOiAxNSwgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBkcmFnb25mbHk6IHtcclxuICAgIHR5cGU6ICdkcmFnb25mbHknLFxyXG4gICAgbWFzczogMC41LFxyXG4gICAgZ3Jhdml0eTogMCxcclxuICAgIGJvdW5jZTogMC4xLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IGZhbHNlLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMzNywzMzhdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMzcsMzM4XSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICd0dXJuJywgZnJhbWVzOiBbMzM5LDM0MF0sIGZwczogMTIsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzQyXSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzMzNywzMzhdLCBmcHM6IDEyLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGJhdDoge1xyXG4gICAgdHlwZTogJ2JhdCcsXHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogMjAsXHJcbiAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzUxLDM1MiwzNTEsMzUxLDM1MSwzNTFdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszNTcsMzU5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNjJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzU3LDM1OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgc3BpZGVyOiB7XHJcbiAgICB0eXBlOiAnc3BpZGVyJyxcclxuICAgIG1hc3M6IDAuMyxcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzMzNV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFszNjUsMzY4LDM3MCwzNzJdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMjk5LDMwMiwzMDUsMzA5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICd0dXJuJywgZnJhbWVzOiBbMzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdjbGltYicsIGZyYW1lczogWzM0MSwzNDMsMzQ1LDM0N10sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnd2FpdCcsIGZyYW1lczogWzMzMiwzMzUsMzcyXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszMjJdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBuYXRpdmU6IHtcclxuICAgIHR5cGU6ICduYXRpdmUnLFxyXG4gICAgbWF4U3BlZWQ6IDEwMCxcclxuICAgIGFjY2VsZXJhdGlvbjogMjAsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICB7IG5hbWU6ICdpZGxlJywgZnJhbWVzOiBbMzczXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzczLDM3NiwzNzhdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzM4MF0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzczLDM3NiwzNzhdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHBhcnJvdDoge1xyXG4gICAgdHlwZTogJ3BhcnJvdCcsXHJcbiAgICBtYXNzOiAwLjUsXHJcbiAgICBncmF2aXR5OiAwLFxyXG4gICAgYm91bmNlOiAwLjEsXHJcbiAgICBqdW1waW5nOiAwLFxyXG4gICAgY29sbGlkZTogZmFsc2UsXHJcbiAgICBtYXhTcGVlZDogMTAwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzM5NCwzOTcsMzk4XSwgZnBzOiAxMiwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzk0LDM5NywzOThdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RpZScsIGZyYW1lczogWzQwMF0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzk0LDM5NywzOThdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGluc2VjdDoge1xyXG4gICAgdHlwZTogJ2luc2VjdCcsXHJcbiAgICBtYXNzOiAxLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyNSxcclxuICAgIGJlaGF2aW91cnM6IFtcclxuICAgICAgICB7IGFjdGlvbjogJ3R1cm5JZkJsb2NrZWQnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdtb3ZlJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnY2hlY2tCb3VuZHMnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICd3aGVuJywgcGFyYW1zOiB7IHByb2JhYmlsaXR5OiAwLjAzLCBhY3Rpb246ICdqdW1wJyB9IH1cclxuICAgIF0sXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNDgsMzQ4LDM0OCwzNDgsMzQ4LDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMjMsMzQ4LDM0OV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzMyMywzNDgsMzQ5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNDhdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzIzLDM0OCwzNDldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGJ1Zzoge1xyXG4gICAgdHlwZTogJ2J1ZycsXHJcbiAgICBtYXNzOiAxLFxyXG4gICAgY29sbGlkZTogdHJ1ZSxcclxuICAgIGJvdW5jZTogMS41LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDUwLFxyXG4gICAgYWNjZWxlcmF0aW9uOiAyNSxcclxuICAgIGJlaGF2aW91cnM6IFtcclxuICAgICAgICB7IGFjdGlvbjogJ3R1cm5JZkJsb2NrZWQnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICdtb3ZlJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnY2hlY2tCb3VuZHMnIH0sXHJcbiAgICAgICAgeyBhY3Rpb246ICd3aGVuJywgcGFyYW1zOiB7IHByb2JhYmlsaXR5OiAwLjAyLCBhY3Rpb246ICdqdW1wJyB9IH1cclxuICAgIF0sXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0NCwzNDQsMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzM0NCwzNDZdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFszNDQsMzQ2XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszNDRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzQ0LDM0Nl0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgZnJvZzoge1xyXG4gICAgdHlwZTogJ2Zyb2cnLFxyXG4gICAgbWFzczogMSxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDEuNSxcclxuICAgIGp1bXBpbmc6IDUwMCxcclxuICAgIG1heFNwZWVkOiA4MCxcclxuICAgIGFjY2VsZXJhdGlvbjogNDAsXHJcbiAgICBiZWhhdmlvdXJzOiBbXHJcbiAgICAgICAgeyBhY3Rpb246ICd0dXJuSWZCbG9ja2VkJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnbW92ZScgfSxcclxuICAgICAgICB7IGFjdGlvbjogJ2NoZWNrQm91bmRzJyB9LFxyXG4gICAgICAgIHsgYWN0aW9uOiAnd2hlbicsIHBhcmFtczogeyBwcm9iYWJpbGl0eTogMC4xLCBhY3Rpb246ICdqdW1wJyB9IH1cclxuICAgIF0sXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszMjVdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFszMjUsMzI3LDMzMSwzMjVdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMzI1LDMyNywzMzEsMzI1XSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMzM0XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzMyNSwzMjcsMzMxLDMyNV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHR1cnRsZToge1xyXG4gICAgdHlwZTogJ3R1cnRsZScsXHJcbiAgICBtYXNzOiAyLFxyXG4gICAganVtcGluZzogMCxcclxuICAgIGNvbGxpZGU6IHRydWUsXHJcbiAgICBib3VuY2U6IDAuMyxcclxuICAgIG1heFNwZWVkOiA1MCxcclxuICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFszOTBdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMzc3LDM4MSwzODQsMzg1XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMzg3LDM4OSwzOTAsMzkxXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFszOTJdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH1cclxuICAgIF1cclxuICB9LFxyXG4gIGplbGx5OiB7XHJcbiAgICB0eXBlOiAnamVsbHknLFxyXG4gICAgbWFzczogMixcclxuICAgIGp1bXBpbmc6IDAsXHJcbiAgICBjb2xsaWRlOiB0cnVlLFxyXG4gICAgYm91bmNlOiAxLFxyXG4gICAgbWF4U3BlZWQ6IDUsXHJcbiAgICBhY2NlbGVyYXRpb246IDEsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzQyMCw0MzMsNDM0XSwgZnBzOiAzLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFs0MjAsNDMzLDQzNF0sIGZwczogMywgbG9vcDogdHJ1ZSB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBnb3JpbGxhOiB7XHJcbiAgICB0eXBlOiAnZ29yaWxsYScsXHJcbiAgICBtYXNzOiA1LFxyXG4gICAganVtcGluZzogMzAwLFxyXG4gICAgbWF4U3BlZWQ6IDAsXHJcbiAgICBhY2NlbGVyYXRpb246IDAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFs0MTFdLCBmcHM6IDUsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZmFsbCcsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbNDExXSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICB7IG5hbWU6ICdzcGF3bicsIGZyYW1lczogWzQxMV0sIGZwczogMTAsIGxvb3A6IHRydWUgfVxyXG4gICAgXVxyXG4gIH1cclxufTtcclxuXHJcbmZvcih2YXIgY3JlYXR1cmUgaW4gY3JlYXR1cmVDb25maWdzKXtcclxuICAvL2NyZWF0dXJlQ29uZmlnc1tjcmVhdHVyZV0gPSBfLm1lcmdlKHt9LCBjb25maWdzLmNyZWF0dXJlRGVmYXVsdHMsIGNvbmZpZ3NbY3JlYXR1cmVdKTtcclxuICB2YXIgZGVmYXVsdHMgPSBjcmVhdHVyZUNvbmZpZ3NbJ2NyZWF0dXJlRGVmYXVsdHMnXTtcclxuICBmb3IodmFyIHByb3AgaW4gZGVmYXVsdHMpe1xyXG4gICAgaWYoY3JlYXR1cmVDb25maWdzW2NyZWF0dXJlXVtwcm9wXSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgY3JlYXR1cmVDb25maWdzW2NyZWF0dXJlXVtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdHVyZUNvbmZpZ3M7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZWNvbmZpZy5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBCYXQgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvYmF0LmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEJlYXIgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCZWFyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2JlYXIuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgQnVnIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnVnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBEaW5vIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGlubztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9kaW5vLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIERyYWdvbmZseSBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERyYWdvbmZseTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9kcmFnb25mbHkuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgRnJvZyBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZyb2c7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvZnJvZy5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBHb3JpbGxhIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR29yaWxsYTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9nb3JpbGxhLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIEluc2VjdCBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEluc2VjdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9pbnNlY3QuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgSmVsbHkgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBKZWxseTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9qZWxseS5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBOYXRpdmUgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOYXRpdmU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvbmF0aXZlLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIFBhcnJvdCBleHRlbmRzIEFJe1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTsgICBcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhcnJvdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9wYXJyb3QuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgUHRlcm8gZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQdGVybztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL2NyZWF0dXJlcy9wdGVyby5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9BSS5qcyc7XHJcblxyXG5jbGFzcyBTcGlkZXIgZXh0ZW5kcyBBSXtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuXHQgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyk7ICAgXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcGlkZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvc3BpZGVyLmpzIiwiaW1wb3J0IEFJIGZyb20gJy4uL0FJLmpzJztcclxuXHJcbmNsYXNzIFRpZ2VyIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGlnZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9jcmVhdHVyZXMvdGlnZXIuanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vQUkuanMnO1xyXG5cclxuY2xhc3MgVHVydGxlIGV4dGVuZHMgQUl7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcblx0ICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpOyAgIFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVHVydGxlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyIsImZ1bmN0aW9uIGNyZWF0ZSgpe1xyXG5cclxuICAgIC8vIGZwcyBkZWJ1Z2dpbmdcclxuICAgIHRoaXMuZ2FtZS50aW1lLmFkdmFuY2VkVGltaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBDVEEgdGV4dFxyXG4gICAgY29uc3QgdGV4dCA9IHRoaXMuZ2FtZS5hZGQudGV4dChcclxuICAgICAgICB0aGlzLmdhbWUud2lkdGggLyAyLFxyXG4gICAgICAgIHRoaXMuZ2FtZS5oZWlnaHQgLyAyLFxyXG4gICAgICAgIFwiQ2hvb3NlIGEgbGV2ZWwhXFxuMSAyIDMgNCA1IDYgXFxuT3IgcHJlc3MgYSBrZXkgdG8gZ2VuZXJhdGUhXCIsXHJcbiAgICAgICAgeyBmb250OiBcIjI0cHggQ291cmllclwiLCBmaWxsOiBcIiNmZmZmZmZcIiwgYWxpZ246IFwiY2VudGVyXCIgfVxyXG4gICAgKTtcclxuXHJcbiAgICB0ZXh0LmFuY2hvci5zZXQoMC41KTtcclxuXHJcbiAgICB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQub25Eb3duQ2FsbGJhY2sgPSAoZSkgPT4ge1xyXG4gICAgICAgIC8vIGlmIHByZXNzZWQga2V5IGlzIG51bWJlciAoc3BhY2UgaXMgZW1wdHkgc3RyaW5nIHdoaWNoIGV2YWx1YXRlcyB0cnVlKVxyXG4gICAgICAgIGlmKCFpc05hTihlLmtleSkgJiYgL1teXFxzXS8udGVzdChlLmtleSkpe1xyXG4gICAgICAgICAgICBmZXRjaCgnL2xldmVsLycgKyBlLmtleSwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xyXG4gICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgfSkudGhlbigobGV2ZWxDb25maWcpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnUGxheScsIHRydWUsIHRydWUsIGxldmVsQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5vbkRvd25DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnUGxheScsIHRydWUsIHRydWUsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5vbkRvd25DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW01lbnVdW0NyZWF0ZV0nKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvbWVudS9tZW51LmNyZWF0ZS5qcyIsImltcG9ydCBIdW1hbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL0h1bWFuJztcclxuaW1wb3J0IEFJIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQUknO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlKCl7XHJcbiAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtDcmVhdGVdJyk7XHJcbiAgICAvLyBmcHMgZGVidWdnaW5nXHJcbiAgICB0aGlzLmdhbWUudGltZS5hZHZhbmNlZFRpbWluZyA9IHRydWU7XHJcblxyXG4gICAgLy8gW1NFVCBMRVZFTF0gc2V0IGRpbWVuc2lvbnMsIHN0YXJ0IHBoeXNpYyBzeXN0ZW1cclxuICAgIHRoaXMuZ2FtZS53b3JsZC5zZXRCb3VuZHMoXHJcbiAgICAgICAgMCxcclxuICAgICAgICAwLFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLndpZHRoICogdGhpcy5nbG9iYWxDb25maWcuYmxvY2tzLFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLmhlaWdodFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG5cclxuICAgIHRoaXMubGV2ZWxMb2FkZXIuY3JlYXRlQmFja2dyb3VuZCgnYmFja2dyb3VuZExheWVyJyk7XHJcbiAgICB0aGlzLmxldmVsTG9hZGVyLmNyZWF0ZVRpbGVzKFxyXG4gICAgICAgIHRoaXMubGV2ZWxDb25maWcudGlsZW1hcCxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXQsXHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZy50aWxlc2V0SW1hZ2VcclxuICAgICk7XHJcbiAgICB0aGlzLmxldmVsTG9hZGVyLmNyZWF0ZUxheWVycyh0aGlzLmxldmVsQ29uZmlnLmxheWVycyk7XHJcblxyXG4gICAgaWYodGhpcy5sZXZlbENvbmZpZy5tYXhIZWlnaHQpe1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zY2FsZS5zZXRHYW1lU2l6ZSh0aGlzLmdsb2JhbENvbmZpZy53aWR0aCwgdGhpcy5sZXZlbENvbmZpZy5tYXhIZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFtTRVQgTEVWRUxdIGZpeCBiYWNrZ3JvdW5kLCByZXNpemVcclxuICAgIHRoaXMubGV2ZWwuYmFja2dyb3VuZExheWVyLmZpeGVkVG9DYW1lcmEgPSB0aGlzLmxldmVsQ29uZmlnLmZpeGVkQmFja2dyb3VuZDtcclxuICAgIHRoaXMubGV2ZWwuZ3JvdW5kTGF5ZXIucmVzaXplV29ybGQoKTtcclxuXHJcbiAgICB0aGlzLmdhbWVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgaW5pdGlhbGlzZWQ6IGZhbHNlLFxyXG4gICAgICAgIHNjb3JlOiAwXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gT2JqZWN0LmFzc2lnbih0aGlzLmdhbWVTdGF0ZSwgY2hhbmdlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1vYngub2JzZXJ2ZSh0aGlzLmdhbWVTdGF0ZSwgY2hhbmdlID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnW2dhbWVTdGF0ZV0gY2hhbmdlJywgY2hhbmdlLCB0aGlzLmdhbWVTdGF0ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHsgaW5pdGlhbGlzZWQ6IHRydWUgfSk7XHJcblxyXG4gICAgLy8gW1BMQVlFUl1cclxuICAgIHRoaXMucGxheWVyID0gbmV3IEh1bWFuKFxyXG4gICAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmVudHJ5UG9pbnQueCxcclxuICAgICAgICB0aGlzLmxldmVsQ29uZmlnLmVudHJ5UG9pbnQueSxcclxuICAgICAgICB0aGlzLmdsb2JhbENvbmZpZy50ZXh0dXJlQXRsYXNOYW1lLFxyXG4gICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWcubWFuXHJcbiAgICApO1xyXG5cclxuICAgIC8vIFtFTkVNSUVTXVxyXG4gICAgdGhpcy5lbmVtaWVzID0gbmV3IFBoYXNlci5Hcm91cCh0aGlzLmdhbWUpO1xyXG4gICAgdGhpcy5sZXZlbENvbmZpZy5lbmVtaWVzLmZvckVhY2godGhpcy5jcmVhdHVyZUZhY3RvcnkuY3JlYXRlKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XHJcblxyXG4gICAgLy8gYmluZCBrZXlzXHJcbiAgICB0aGlzLmtleXMgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xyXG4gICAgdGhpcy5rZXlzLnNwYWNlID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpO1xyXG5cclxuICAgIHRoaXMua2V5cy5hbHQgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5BTFQpO1xyXG4gICAgdGhpcy5rZXlzLmNvbnRyb2wgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5DT05UUk9MKTtcclxuICAgIHRoaXMua2V5cy5zaGlmdCA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlNISUZUKTtcclxuXHJcbiAgICAvLyBpdGVtcyAmIHBsYXRmb3Jtc1xyXG4gICAgdGhpcy5pdGVtcy5wbGF0Zm9ybXMgPSBuZXcgUGhhc2VyLkdyb3VwKHRoaXMuZ2FtZSk7XHJcblxyXG4gICAgLy8gc2NvcmUgdGV4dFxyXG4gICAgdGhpcy5tZW51ID0gdGhpcy5nYW1lLmFkZC50ZXh0KFxyXG4gICAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLndpZHRoIC0gMTIwLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgXCJMaWZlOiBcIiArIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUsXHJcbiAgICAgICAgeyBmb250OiBcIjI0cHggQ291cmllclwiLCBmaWxsOiBcIiNmZmZcIiwgYWxpZ246IFwiY2VudGVyXCIgfVxyXG4gICAgKTtcclxuICAgIHRoaXMubWVudS5maXhlZFRvQ2FtZXJhID0gdHJ1ZTtcclxuICAgIG1vYngub2JzZXJ2ZSh0aGlzLnBsYXllci5zcHJpdGVTdGF0ZSwgY2hhbmdlID0+IHtcclxuICAgICAgICB0aGlzLm1lbnUuc2V0VGV4dChcIkxpZmU6IFwiICsgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5jcmVhdGUuanMiLCJpbXBvcnQgbGV2ZWxHZW5lcmF0b3IgZnJvbSAnLi4vLi4vc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvaW5kZXgnO1xyXG5cclxuZnVuY3Rpb24gaW5pdChsZXZlbENvbmZpZyl7XHJcbiAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtJbml0XScsIGxldmVsQ29uZmlnKTtcclxuICAgIHRoaXMubGV2ZWxDb25maWcgPSBsZXZlbENvbmZpZyB8fCBsZXZlbEdlbmVyYXRvci5jcmVhdGUoKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGluaXQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkuaW5pdC5qcyIsImZ1bmN0aW9uIHByZWxvYWQoKXtcclxuICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW1ByZWxvYWRdJyk7XHJcblxyXG4gICAgLy8gLS0tLS0tISBGUFMga2lsbGVyOiBwZXJmb3JtYW5jZSBkcm9wIG9uIHNjYWxpbmcgdXAgbW9yZSB0aGFuIDEuNnhcclxuICAgIHRoaXMuZ2FtZS5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xyXG4gICAgdGhpcy5nYW1lLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XHJcbiAgICB0aGlzLmdhbWUuc2NhbGUucGFnZUFsaWduVmVydGljYWxseSA9IHRydWU7XHJcbiAgICB0aGlzLnNjYWxlLnNldE1pbk1heCgwLCAwLCB0aGlzLmdsb2JhbENvbmZpZy53aWR0aCAqIDEuNCwgdGhpcy5nbG9iYWxDb25maWcuaGVpZ2h0ICogMS40KTtcclxuICAgIC8vIC0tLS0tLSFcclxuXHJcbiAgICAvLyBhc3NldHMgdG8gbG9hZCByZWxhdGl2ZSB0byAvYXNzZXRzLy4uXHJcbiAgICB0aGlzLmdhbWUubG9hZC5hdGxhcyhcclxuICAgICAgICAncHJlMmF0bGFzJyxcclxuICAgICAgICAnc3ByaXRlc2hlZXRzL3ByZTJhdGxhcy5wbmcnLFxyXG4gICAgICAgICdzcHJpdGVzaGVldHMvcHJlMmF0bGFzLmpzb24nLFxyXG4gICAgICAgIFBoYXNlci5Mb2FkZXIuVEVYVFVSRV9BVExBU19KU09OX0hBU0hcclxuICAgICk7XHJcblxyXG4gICAgLy8gbG9hZCBiYWNrZ3JvdW5kXHJcbiAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSh0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRLZXksIHRoaXMuZ2xvYmFsQ29uZmlnLmJhY2tncm91bmRQYXRoICsgdGhpcy5sZXZlbENvbmZpZy5iYWNrZ3JvdW5kSW1hZ2UgKyB0aGlzLmxldmVsQ29uZmlnLmJhY2tncm91bmRJbWFnZUV4dGVuc2lvbik7XHJcbiAgICAvLyBsb2FkIHRpbGVzZXRcclxuICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKHRoaXMubGV2ZWxDb25maWcudGlsZXNldCwgdGhpcy5nbG9iYWxDb25maWcudGlsZXNldFBhdGggKyB0aGlzLmxldmVsQ29uZmlnLnRpbGVzZXRJbWFnZSArIHRoaXMubGV2ZWxDb25maWcudGlsZXNldEltYWdlRXh0ZW5zaW9uKTtcclxuICAgIC8vIGxvYWQgdGlsZW1hcFxyXG4gICAgaWYodHlwZW9mIHRoaXMubGV2ZWxDb25maWcudGlsZWRKc29uID09PSAnc3RyaW5nJyl7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQudGlsZW1hcCh0aGlzLmxldmVsQ29uZmlnLnRpbGVtYXAsIHRoaXMuZ2xvYmFsQ29uZmlnLmxldmVsUGF0aCArIHRoaXMubGV2ZWxDb25maWcudGlsZWRKc29uLCBudWxsLCBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQudGlsZW1hcCh0aGlzLmxldmVsQ29uZmlnLnRpbGVtYXAsIG51bGwsIHRoaXMubGV2ZWxDb25maWcudGlsZWRKc29uLCBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmVsb2FkO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnByZWxvYWQuanMiLCJmdW5jdGlvbiB1cGRhdGUoKXtcclxuICAgIC8vY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bVXBkYXRlXScpO1xyXG4gICAgLy8gZnBzXHJcbiAgICB0aGlzLmdhbWUuZGVidWcudGV4dCh0aGlzLmdhbWUudGltZS5mcHMsIDUsIDIwKTtcclxuXHJcbiAgICAvLyBjb2xsaWRlXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5sZXZlbC5jb2xsaXNpb25MYXllcik7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5lbmVtaWVzLCB0aGlzLmxldmVsLmNvbGxpc2lvbkxheWVyKTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5sZXZlbC5kZWF0aExheWVyLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0RFQUQhJyk7XHJcbiAgICAgICAgdGhpcy5sZXZlbENvbmZpZyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdNZW51JywgdHJ1ZSwgdHJ1ZSwgdW5kZWZpbmVkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLml0ZW1zLnBsYXRmb3Jtcyk7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5wbGF5ZXIsIHRoaXMuZW5lbWllcywgKHBsYXllciwgZW5lbXkpID0+IHtcclxuICAgICAgICBpZih0aGlzLnBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24gJiYgZW5lbXkuYm9keS50b3VjaGluZy51cCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMucGxheWVyLmlzSGl0dGluZyAmJiAhdGhpcy5wbGF5ZXIuaXNTdHVubmVkKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudXBkYXRlU3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgbGlmZTogdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSAtIDEsXHJcbiAgICAgICAgICAgICAgICBzdHVuOiB0aGlzLmdhbWUudGltZS5ub3cgKyAxNTAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5odXJ0KGVuZW15LmJvZHkudG91Y2hpbmcpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIG1vdmVcclxuICAgIG9uS2V5UHJlc3MuY2FsbCh0aGlzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb25LZXlQcmVzcygpe1xyXG4gICAgLy8gc3R1biA9PiBibG9ja2VkXHJcbiAgICBpZih0aGlzLnBsYXllci5pc1N0dW5uZWQpe1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnc3R1bicpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtb3ZlIGxlZnQgLyByaWdodFxyXG4gICAgaWYodGhpcy5rZXlzLmxlZnQuaXNEb3duKXtcclxuICAgICAgICB0aGlzLnBsYXllci5tb3ZlTGVmdCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnbW92ZScpO1xyXG4gICAgfSBlbHNlIGlmKHRoaXMua2V5cy5yaWdodC5pc0Rvd24pe1xyXG4gICAgICAgIHRoaXMucGxheWVyLm1vdmVSaWdodCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnbW92ZScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBsYXllci5zdG9wKCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdpZGxlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8ganVtcFxyXG4gICAgaWYodGhpcy5rZXlzLnVwLmlzRG93bil7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuanVtcCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnanVtcCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGhpdFxyXG4gICAgaWYodGhpcy5rZXlzLnNwYWNlLmlzRG93bil7XHJcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubm9oaXQgPCB0aGlzLmdhbWUudGltZS5ub3cgJiYgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUuaGl0IDwgdGhpcy5nYW1lLnRpbWUubm93KXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaGl0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmKHRoaXMua2V5cy5hbHQuaXNEb3duKXtcclxuICAgICAgICBpZih0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5ub2J1aWxkIDwgdGhpcy5nYW1lLnRpbWUubm93KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHggPSB0aGlzLnBsYXllci5mYWNpbmdSaWdodCA/IHRoaXMucGxheWVyLmJvZHkueCArIDQwIDogdGhpcy5wbGF5ZXIuYm9keS54IC0gMjAsXHJcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5wbGF5ZXIuYm9keS55IC0gMjA7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmJ1aWxkKCh4IHwgMCksICh5IHwgMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnVwZGF0ZS5qcyIsImltcG9ydCBnbG9iYWxDb25maWcgZnJvbSAnLi9nbG9iYWxDb25maWcuanMnO1xyXG5pbXBvcnQgTWVudSBmcm9tICcuL2dhbWVzdGF0ZXMvbWVudS9pbmRleC5qcyc7XHJcbmltcG9ydCBQbGF5IGZyb20gJy4vZ2FtZXN0YXRlcy9wbGF5L2luZGV4LmpzJztcclxuXHJcbi8vIGluc3RhbnRpYXRlIGEgUGhhc2VyLkdhbWVcclxuY29uc3QgUExBVEZPUk1FUiA9IG5ldyBQaGFzZXIuR2FtZShcclxuICAgIGdsb2JhbENvbmZpZy53aWR0aCxcclxuICAgIGdsb2JhbENvbmZpZy5oZWlnaHQsXHJcbiAgICBQaGFzZXIuQVVUTyxcclxuICAgIGdsb2JhbENvbmZpZy5kb21FbGVtZW50XHJcbik7XHJcblxyXG4vLyByZWdpc3RlciBnYW1lc3RhdGVzICh3aWxsIGJlIGluc3RhbnRpYXRlZCB3LyB0aGlzLmdhbWUgYXMgMXN0IHBhcmFtLCBwYXNzIGdhbWVDb25maWcgYXMgMm5kKVxyXG5QTEFURk9STUVSLnN0YXRlLmFkZCgnTWVudScsIE1lbnUuYmluZChudWxsLCBnbG9iYWxDb25maWcpKTtcclxuUExBVEZPUk1FUi5zdGF0ZS5hZGQoJ1BsYXknLCBQbGF5LmJpbmQobnVsbCwgZ2xvYmFsQ29uZmlnKSk7XHJcblxyXG5QTEFURk9STUVSLnN0YXRlLnN0YXJ0KCdNZW51JywgdHJ1ZSwgdHJ1ZSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvaW5kZXguanMiLCJpbXBvcnQgYmF0IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2JhdC5qcyc7XHJcbmltcG9ydCBiZWFyIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2JlYXIuanMnO1xyXG5pbXBvcnQgYnVnIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2J1Zy5qcyc7XHJcbmltcG9ydCBkaW5vIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Rpbm8uanMnO1xyXG5pbXBvcnQgZHJhZ29uZmx5IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2RyYWdvbmZseS5qcyc7XHJcbmltcG9ydCBmcm9nIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL2Zyb2cuanMnO1xyXG5pbXBvcnQgZ29yaWxsYSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9nb3JpbGxhLmpzJztcclxuaW1wb3J0IGluc2VjdCBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9pbnNlY3QuanMnO1xyXG5pbXBvcnQgamVsbHkgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvamVsbHkuanMnO1xyXG5pbXBvcnQgbmF0aXZlIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL25hdGl2ZS5qcyc7XHJcbmltcG9ydCBwYXJyb3QgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvcGFycm90LmpzJztcclxuaW1wb3J0IHB0ZXJvIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL3B0ZXJvLmpzJztcclxuaW1wb3J0IHNwaWRlciBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0dXJlcy9zcGlkZXIuanMnO1xyXG5pbXBvcnQgdGlnZXIgZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdHVyZXMvdGlnZXIuanMnO1xyXG5pbXBvcnQgdHVydGxlIGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXR1cmVzL3R1cnRsZS5qcyc7XHJcblxyXG5pbXBvcnQgQUkgZnJvbSAnLi4vY29tcG9uZW50cy9BSSc7XHJcblxyXG5mdW5jdGlvbiBjcmVhdHVyZUZhY3RvcnkoKSB7XHJcbiAgICBjb25zdCBDcmVhdHVyZSA9IHtcclxuICAgICAgICBiYXQ6IGJhdCxcclxuICAgICAgICBiZWFyOiBiZWFyLFxyXG4gICAgICAgIGJ1ZzogYnVnLFxyXG4gICAgICAgIGRpbm86IGRpbm8sXHJcbiAgICAgICAgZHJhZ29uZmx5OiBkcmFnb25mbHksXHJcbiAgICAgICAgZnJvZzogZnJvZyxcclxuICAgICAgICBnb3JpbGxhOiBnb3JpbGxhLFxyXG4gICAgICAgIGluc2VjdDogaW5zZWN0LFxyXG4gICAgICAgIGplbGx5OiBqZWxseSxcclxuICAgICAgICBuYXRpdmU6IG5hdGl2ZSxcclxuICAgICAgICBwYXJyb3Q6IHBhcnJvdCxcclxuICAgICAgICBwdGVybzogcHRlcm8sXHJcbiAgICAgICAgc3BpZGVyOiBzcGlkZXIsXHJcbiAgICAgICAgdGlnZXI6IHRpZ2VyLFxyXG4gICAgICAgIHR1cnRsZTogdHVydGxlXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlOiAobGV2ZWxDb25maWcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZW5lbXkgPSBuZXcgQUkoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgICAgICAgICBsZXZlbENvbmZpZy5vcmlnaW4ueCxcclxuICAgICAgICAgICAgICAgIGxldmVsQ29uZmlnLm9yaWdpbi55LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxDb25maWcudGV4dHVyZUF0bGFzTmFtZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXR1cmVDb25maWdbbGV2ZWxDb25maWcudHlwZV0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0dXJlQ29uZmlnW2xldmVsQ29uZmlnLnR5cGVdLmJlaGF2aW91cnNcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgZW5lbXkuc2V0Qm91bmRzKGxldmVsQ29uZmlnLmJvdW5kVG8pO1xyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMuYWRkKGVuZW15KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXR1cmVGYWN0b3J5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2NyZWF0dXJlRmFjdG9yeS5qcyIsImltcG9ydCBMZXZlbEJ1aWxkZXIgZnJvbSAnLi9sZXZlbEJ1aWxkZXInO1xyXG5pbXBvcnQgbGV2ZWxDb25maWcgZnJvbSAnLi9tb2RlbHMvbGV2ZWxDb25maWcnO1xyXG5cclxuY29uc3QgbGV2ZWxHZW5lcmF0b3IgPSB7XHJcbiAgICBjcmVhdGUoKXtcclxuICAgICAgICBjb25zdCBsZXZlbEJ1aWxkZXIgPSBuZXcgTGV2ZWxCdWlsZGVyKCdyaXNlLW9mLXRoZS10aWRlJywgbGV2ZWxDb25maWcpO1xyXG4gICAgICAgIHJldHVybiBsZXZlbEJ1aWxkZXJcclxuICAgICAgICAgICAgLmNyZWF0ZUxheWVycygzNCAqIDMsIDIzICogMTApXHJcbiAgICAgICAgICAgIC5yYW5kb21CYWNrZ3JvdW5kKClcclxuICAgICAgICAgICAgLmJ1aWxkKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsZXZlbEdlbmVyYXRvcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9pbmRleC5qcyIsImltcG9ydCB7XHJcbiAgICBmbGF0dGVuLFxyXG4gICAgYXBwbHlNYXRyaXgsXHJcbiAgICBjcmVhdGVNYXRyaXgsXHJcbiAgICBsYXllclRvTWF0cml4LFxyXG4gICAgY2hlY2tJZkFyZWFJc0NvdmVyZWRcclxufSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHtcclxuICAgIGdyb3VuZExheWVyLFxyXG4gICAgY29sbGlzaW9uTGF5ZXIsXHJcbiAgICBkZWF0aExheWVyXHJcbn0gZnJvbSAnLi9tb2RlbHMvbGF5ZXJzJztcclxuXHJcbmltcG9ydCBwbGF0Zm9ybXMgZnJvbSAnLi9tb2RlbHMvcGxhdGZvcm1zJztcclxuaW1wb3J0IHRpbGVtYXBzIGZyb20gJy4vbW9kZWxzL3RpbGVtYXBzJztcclxuaW1wb3J0IHRpbGVzZXRzIGZyb20gJy4vbW9kZWxzL3RpbGVzZXRzJztcclxuaW1wb3J0IGJhY2tncm91bmRzIGZyb20gJy4vbW9kZWxzL2JhY2tncm91bmRzJztcclxuXHJcbi8vIHdpdGggZnJlcXVlbmN5XHJcbmNvbnN0IGVuZW15VHlwZXMgPSBbXHJcbiAgICAnYmF0JywgJ2JhdCcsICdiYXQnLCAnYmF0JyxcclxuICAgICdiZWFyJywgJ2JlYXInLCAnYmVhcicsICdiZWFyJywgJ2JlYXInLCAnYmVhcicsXHJcbiAgICAnYnVnJyxcclxuICAgICdkaW5vJyxcclxuICAgICdkcmFnb25mbHknLCAnZHJhZ29uZmx5JywgJ2RyYWdvbmZseScsICdkcmFnb25mbHknLCAnZHJhZ29uZmx5JyxcclxuICAgICdmcm9nJyxcclxuICAgICdpbnNlY3QnLFxyXG4gICAgJ2plbGx5JyxcclxuICAgICduYXRpdmUnLCAnbmF0aXZlJywgJ25hdGl2ZScsICduYXRpdmUnLCAnbmF0aXZlJyxcclxuICAgICdwYXJyb3QnLFxyXG4gICAgJ3B0ZXJvJyxcclxuICAgICdzcGlkZXInLCAnc3BpZGVyJywgJ3NwaWRlcicsICdzcGlkZXInLFxyXG4gICAgJ3RpZ2VyJyxcclxuICAgICd0dXJ0bGUnXHJcbl07XHJcblxyXG5jb25zdCBmaW5kUGxhY2VzRm9yID0gKGFNYXRyaXgsIGl0ZW1zLCByZXRyeSkgPT4ge1xyXG4gICAgbGV0IG1hdHJpeCA9IGFNYXRyaXguc2xpY2UoMCk7XHJcbiAgICBsZXQgZW5lbWllcyA9IFtdO1xyXG4gICAgd2hpbGUocmV0cnktLSl7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpdGVtcy5sZW5ndGgpXSxcclxuICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXRyaXhbMF0ubGVuZ3RoIC0gaXRlbVswXS5sZW5ndGgpKSxcclxuICAgICAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXRyaXgubGVuZ3RoIC0gaXRlbS5sZW5ndGgpKTtcclxuICAgICAgICBpZihjaGVja0lmQXJlYUlzQ292ZXJlZChtYXRyaXgsIHgsIHksIGl0ZW1bMF0ubGVuZ3RoLCBpdGVtLmxlbmd0aCkpe1xyXG4gICAgICAgICAgICBlbmVtaWVzLnB1c2goW3gsIHksIGl0ZW1bMF0ubGVuZ3RoXSk7XHJcbiAgICAgICAgICAgIGFwcGx5TWF0cml4KG1hdHJpeCwgaXRlbSwgeCwgeSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBlbmVtaWVzOiBlbmVtaWVzLFxyXG4gICAgICAgIGlzbGFuZHM6IG1hdHJpeFxyXG4gICAgfTtcclxufTtcclxuXHJcbmNvbnN0IGNyZWF0ZUVuZW15QXQgPSAoeFRpbGUsIHlUaWxlLCB0aWxlc1dpZHRoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG5cdFx0dHlwZTogZW5lbXlUeXBlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlbmVteVR5cGVzLmxlbmd0aCldLFxyXG5cdFx0bnVtYmVyOiAxLFxyXG5cdFx0bGlmZXNwYW46IEluZmluaXR5LFxyXG5cdFx0b3JpZ2luOiB7XHJcblx0XHRcdHg6ICh4VGlsZSArIHRpbGVzV2lkdGggLyAyKSAqIDE2LFxyXG5cdFx0XHR5OiB5VGlsZSAqIDE2XHJcblx0XHR9LFxyXG5cdFx0Ym91bmRUbzoge1xyXG5cdFx0XHR4MTogeFRpbGUgKiAxNixcclxuXHRcdFx0eDI6ICh4VGlsZSArIHRpbGVzV2lkdGgpICogMTZcclxuXHRcdH1cclxuICAgIH07XHJcbn07XHJcblxyXG5jb25zdCBnZXRDb2xsaXNpb25MYXllciA9IChmbGF0TWF0cml4LCBjb2xsaXNpb25UaWxlcykgPT4ge1xyXG4gICAgbGV0IG1hdHJpeCA9IGZsYXRNYXRyaXguc2xpY2UoMCkubWFwKCh0aWxlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpc2lvblRpbGVzLmluZGV4T2YodGlsZSkgPiAtMVxyXG4gICAgICAgICAgICA/IHRpbGVcclxuICAgICAgICAgICAgOiAwO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbWF0cml4O1xyXG59O1xyXG5cclxudmFyIExldmVsQnVpbGRlciA9IGZ1bmN0aW9uKGlkLCBsZXZlbENvbmZpZyl7XHJcbiAgICBsZXQgbGV2ZWwgPSBPYmplY3QuYXNzaWduKGxldmVsQ29uZmlnLCB0aWxlbWFwc1tpZF0pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGVMYXllcnModGlsZXNXaWR0aCwgdGlsZXNIZWlnaHQpe1xuICAgICAgICAgICAgLy8gMTAwOiByYXJlLCA0MDogZnJlcXVlbnRcbiAgICAgICAgICAgIGNvbnN0IGRlbnNpdHkgPSAxMDAsXG4gICAgICAgICAgICAgICAgcmV0cnkgPSBNYXRoLmZsb29yKCh0aWxlc1dpZHRoICogdGlsZXNIZWlnaHQpIC8gZGVuc2l0eSk7XG4gICAgICAgICAgICBjb25zdCBwbGFjZXNGb3IgPSBmaW5kUGxhY2VzRm9yKGNyZWF0ZU1hdHJpeCh0aWxlc0hlaWdodCwgdGlsZXNXaWR0aCwgMCksIHBsYXRmb3Jtc1tpZF0uZ3JvdW5kTGF5ZXIsIHJldHJ5KTtcblxuICAgICAgICAgICAgbGV2ZWwuZW5lbWllcyA9IHBsYWNlc0Zvci5lbmVtaWVzLm1hcChlbmVteSA9PiBjcmVhdGVFbmVteUF0LmFwcGx5KG51bGwsIGVuZW15KSk7XG5cbiAgICAgICAgICAgIGdyb3VuZExheWVyLmRhdGEgPSBmbGF0dGVuKHBsYWNlc0Zvci5pc2xhbmRzKTtcbiAgICAgICAgICAgIGNvbGxpc2lvbkxheWVyLmRhdGEgPSBnZXRDb2xsaXNpb25MYXllcihncm91bmRMYXllci5kYXRhLCBwbGF0Zm9ybXNbaWRdLmNvbGxpc2lvblRpbGVzKTtcbiAgICAgICAgICAgIGRlYXRoTGF5ZXIuZGF0YSA9IGdyb3VuZExheWVyLmRhdGEubWFwKHRpbGUgPT4gMCk7XG5cclxuICAgICAgICAgICAgbGV2ZWwudGlsZWRKc29uLndpZHRoID0gdGlsZXNXaWR0aDtcclxuICAgICAgICAgICAgbGV2ZWwudGlsZWRKc29uLmhlaWdodCA9IHRpbGVzSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgZ3JvdW5kTGF5ZXIud2lkdGggPSB0aWxlc1dpZHRoO1xyXG4gICAgICAgICAgICBncm91bmRMYXllci5oZWlnaHQgPSB0aWxlc0hlaWdodDtcclxuICAgICAgICAgICAgY29sbGlzaW9uTGF5ZXIud2lkdGggPSB0aWxlc1dpZHRoO1xyXG4gICAgICAgICAgICBjb2xsaXNpb25MYXllci5oZWlnaHQgPSB0aWxlc0hlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGxldmVsLndpZHRoID0gdGlsZXNXaWR0aCAqIDE2O1xyXG4gICAgICAgICAgICBsZXZlbC5oZWlnaHQgPSB0aWxlc0hlaWdodCAqIDE2O1xyXG5cclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgLy8gMTk1ID0gc3Bpa2VcclxuICAgICAgICAgICAgICAgIGdyb3VuZExheWVyLmRhdGFbZ3JvdW5kTGF5ZXIuZGF0YS5sZW5ndGggLSB0aWxlc1dpZHRoXSA9IDE5NTtcclxuICAgICAgICAgICAgICAgIGRlYXRoTGF5ZXIuZGF0YVtkZWF0aExheWVyLmRhdGEubGVuZ3RoIC0gdGlsZXNXaWR0aF0gPSAxOTU7XHJcbiAgICAgICAgICAgIH0gd2hpbGUodGlsZXNXaWR0aC0tKTtcclxuXHJcbiAgICAgICAgICAgIGxldmVsLnRpbGVkSnNvbi5sYXllcnMgPSBbXHJcbiAgICAgICAgICAgICAgICBncm91bmRMYXllcixcclxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbkxheWVyLFxyXG4gICAgICAgICAgICAgICAgZGVhdGhMYXllclxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBsZXZlbC50aWxlZEpzb24udGlsZXNldHMgPSBbdGlsZXNldHNbaWRdXTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByYW5kb21CYWNrZ3JvdW5kKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHJhbmRvbUJhY2tncm91bmQgPSBiYWNrZ3JvdW5kc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBiYWNrZ3JvdW5kcy5sZW5ndGgpXVxyXG4gICAgICAgICAgICBsZXZlbC5iYWNrZ3JvdW5kSW1hZ2UgPSByYW5kb21CYWNrZ3JvdW5kLmJhY2tncm91bmRJbWFnZTtcclxuICAgICAgICAgICAgbGV2ZWwuYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uID0gcmFuZG9tQmFja2dyb3VuZC5iYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb247XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnVpbGQoKXtcclxuICAgICAgICAgICAgcmV0dXJuIGxldmVsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMZXZlbEJ1aWxkZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbGV2ZWxCdWlsZGVyLmpzIiwiY29uc3QgYmFja2dyb3VuZHMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImJnM3NlYW1sZXNzXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5qcGdcIixcclxuICAgICAgICBtYXhIZWlnaHQ6IDQzNFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwidm9sY2Fub1wiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICAgICAgbWF4SGVpZ2h0OiAzNDFcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImNhdmVcIixcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2VFeHRlbnNpb246IFwiLnBuZ1wiLFxyXG4gICAgICAgIG1heEhlaWdodDogNDE2XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJiZzFzZWFtbGVzc1wiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICAgICAgbWF4SGVpZ2h0OiAzNzJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImZvcmVzdC1ncmVlblwiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICAgICAgbWF4SGVpZ2h0OiA0MjBcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImZvcmVzdC1maXJlXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgICAgICBtYXhIZWlnaHQ6IDM0MFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwiZm9yZXN0LW9yYW5nZVwiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICAgICAgbWF4SGVpZ2h0OiA0MjBcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcImZvcmVzdC1waW5rXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgICAgICBtYXhIZWlnaHQ6IDM1MFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwiZm9yZXN0XCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgICAgICBtYXhIZWlnaHQ6IDQyMFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwiZ3JhdmV5YXJkXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgICAgICBtYXhIZWlnaHQ6IDMzOVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwiaWNlLWdyZWVuXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgICAgICBtYXhIZWlnaHQ6IDQyM1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwiaWNlXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZEltYWdlRXh0ZW5zaW9uOiBcIi5wbmdcIixcclxuICAgICAgICBtYXhIZWlnaHQ6IDQyM1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwic25vd1wiLFxyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZUV4dGVuc2lvbjogXCIucG5nXCIsXHJcbiAgICAgICAgbWF4SGVpZ2h0OiAzMzlcclxuICAgIH1cclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJhY2tncm91bmRzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9iYWNrZ3JvdW5kcy5qcyIsImV4cG9ydCBjb25zdCBncm91bmRMYXllciA9IHtcclxuICAgIFwiZGF0YVwiOiBbXSxcclxuICAgIFwiaGVpZ2h0XCI6IDIzLFxyXG4gICAgXCJuYW1lXCI6IFwiZ3JvdW5kLWxheWVyXCIsXHJcbiAgICBcIm9wYWNpdHlcIjogMSxcclxuICAgIFwidHlwZVwiOiBcInRpbGVsYXllclwiLFxyXG4gICAgXCJ2aXNpYmxlXCI6IHRydWUsXHJcbiAgICBcIndpZHRoXCI6IDM0LFxyXG4gICAgXCJ4XCI6IDAsXHJcbiAgICBcInlcIjogMFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbGxpc2lvbkxheWVyID0ge1xyXG4gICAgXCJkYXRhXCI6IFtdLFxyXG4gICAgXCJoZWlnaHRcIjogMjMsXHJcbiAgICBcIm5hbWVcIjogXCJjb2xsaXNpb24tbGF5ZXJcIixcclxuICAgIFwib3BhY2l0eVwiOiAxLFxyXG4gICAgXCJ0eXBlXCI6IFwidGlsZWxheWVyXCIsXHJcbiAgICBcInZpc2libGVcIjogZmFsc2UsXHJcbiAgICBcIndpZHRoXCI6IDM0LFxyXG4gICAgXCJ4XCI6IDAsXHJcbiAgICBcInlcIjogMFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlYXRoTGF5ZXIgPSB7XHJcbiAgICBcImRhdGFcIjogW10sXHJcbiAgICBcImhlaWdodFwiOiAyMyxcclxuICAgIFwibmFtZVwiOiBcImRlYXRoLWxheWVyXCIsXHJcbiAgICBcIm9wYWNpdHlcIjogMSxcclxuICAgIFwidHlwZVwiOiBcInRpbGVsYXllclwiLFxyXG4gICAgXCJ2aXNpYmxlXCI6IGZhbHNlLFxyXG4gICAgXCJ3aWR0aFwiOiAzNCxcclxuICAgIFwieFwiOiAwLFxyXG4gICAgXCJ5XCI6IDBcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9tb2RlbHMvbGF5ZXJzLmpzIiwiY29uc3QgbGV2ZWxNb2RlbCA9IHtcclxuXHRcImhlaWdodFwiOiAyMyxcclxuXHRcImxheWVyc1wiOiBbe1xyXG5cdFx0XHRcImRhdGFcIjogW10sXHJcblx0XHRcdFwiaGVpZ2h0XCI6IDIzLFxyXG5cdFx0XHRcIm5hbWVcIjogXCJncm91bmQtbGF5ZXJcIixcclxuXHRcdFx0XCJvcGFjaXR5XCI6IDEsXHJcblx0XHRcdFwidHlwZVwiOiBcInRpbGVsYXllclwiLFxyXG5cdFx0XHRcInZpc2libGVcIjogdHJ1ZSxcclxuXHRcdFx0XCJ3aWR0aFwiOiAzNCxcclxuXHRcdFx0XCJ4XCI6IDAsXHJcblx0XHRcdFwieVwiOiAwXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRcImRhdGFcIjogW10sXHJcblx0XHRcdFwiaGVpZ2h0XCI6IDIzLFxyXG5cdFx0XHRcIm5hbWVcIjogXCJjb2xsaXNpb24tbGF5ZXJcIixcclxuXHRcdFx0XCJvcGFjaXR5XCI6IDEsXHJcblx0XHRcdFwidHlwZVwiOiBcInRpbGVsYXllclwiLFxyXG5cdFx0XHRcInZpc2libGVcIjogZmFsc2UsXHJcblx0XHRcdFwid2lkdGhcIjogMzQsXHJcblx0XHRcdFwieFwiOiAwLFxyXG5cdFx0XHRcInlcIjogMFxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0XCJkYXRhXCI6IFtdLFxyXG5cdFx0XHRcImhlaWdodFwiOiAyMyxcclxuXHRcdFx0XCJuYW1lXCI6IFwiZGVhdGgtbGF5ZXJcIixcclxuXHRcdFx0XCJvcGFjaXR5XCI6IDEsXHJcblx0XHRcdFwidHlwZVwiOiBcInRpbGVsYXllclwiLFxyXG5cdFx0XHRcInZpc2libGVcIjogZmFsc2UsXHJcblx0XHRcdFwid2lkdGhcIjogMzQsXHJcblx0XHRcdFwieFwiOiAwLFxyXG5cdFx0XHRcInlcIjogMFxyXG5cdFx0fVxyXG5cdF0sXHJcblx0XCJuZXh0b2JqZWN0aWRcIjogMSxcclxuXHRcIm9yaWVudGF0aW9uXCI6IFwib3J0aG9nb25hbFwiLFxyXG5cdFwicHJvcGVydGllc1wiOiB7XHJcblxyXG5cdH0sXHJcblx0XCJyZW5kZXJvcmRlclwiOiBcInJpZ2h0LWRvd25cIixcclxuXHRcInRpbGVoZWlnaHRcIjogMTYsXHJcblx0XCJ0aWxlc2V0c1wiOiBbXSxcclxuXHRcInRpbGV3aWR0aFwiOiAxNixcclxuXHRcInZlcnNpb25cIjogMSxcclxuXHRcIndpZHRoXCI6IDM0XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsZXZlbE1vZGVsO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy9sZXZlbC5qcyIsImltcG9ydCBsZXZlbCBmcm9tICcuL2xldmVsJztcclxuXHJcbmNvbnN0IGxldmVsQ29uZmlnID0ge1xyXG5cdFwiaWRcIjogXCJcIixcclxuXHRcIm5hbWVcIjogXCJcIixcclxuXHRcInRpbGVzZXRcIjogXCJcIixcclxuXHRcInRpbGVtYXBcIjogXCJcIixcclxuXHRcInRpbGVkSnNvblwiOiBsZXZlbCxcclxuXHRcInRpbGVzZXRJbWFnZVwiOiBcIlwiLFxyXG5cdFwidGlsZXNldEltYWdlRXh0ZW5zaW9uXCI6IFwiLnBuZ1wiLFxyXG5cdFwiYmFja2dyb3VuZEltYWdlXCI6IFwiYmczc2VhbWxlc3NcIixcclxuXHRcImJhY2tncm91bmRJbWFnZUV4dGVuc2lvblwiOiBcIi5qcGdcIixcclxuXHRcImJhY2tncm91bmRLZXlcIjogXCJiYWNrZ3JvdW5kLTJcIixcclxuXHRcIndpZHRoXCI6IDU0NixcclxuXHRcImhlaWdodFwiOiAzNjgsXHJcblx0XCJsYXllcnNcIjoge1xyXG5cdFx0XCJncm91bmRMYXllclwiOiB7XHJcblx0XHRcdFwia2V5XCI6IFwiZ3JvdW5kLWxheWVyXCIsXHJcblx0XHRcdFwidmlzaWJsZVwiOiB0cnVlXHJcblx0XHR9LFxyXG5cdFx0XCJjb2xsaXNpb25MYXllclwiOiB7XHJcblx0XHRcdFwia2V5XCI6IFwiY29sbGlzaW9uLWxheWVyXCIsXHJcblx0XHRcdFwidmlzaWJsZVwiOiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdFwiZGVhdGhMYXllclwiOiB7XHJcblx0XHRcdFwia2V5XCI6IFwiZGVhdGgtbGF5ZXJcIixcclxuXHRcdFx0XCJ2aXNpYmxlXCI6IGZhbHNlXHJcblx0XHR9XHJcblx0fSxcclxuXHRcImZpeGVkQmFja2dyb3VuZFwiOiB0cnVlLFxyXG5cdFwiZW50cnlQb2ludFwiOiB7XHJcblx0XHRcInhcIjogMTAsXHJcblx0XHRcInlcIjogMTBcclxuXHR9LFxyXG5cdFwicG9ydGFsc1wiOiBbXSxcclxuXHRcInBsYXRmb3Jtc1wiOiBbXSxcclxuXHRcImJvbnVzXCI6IFtdLFxyXG5cdFwiZW5lbWllc1wiOiBbXVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGV2ZWxDb25maWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL2xldmVsQ29uZmlnLmpzIiwiY29uc3QgcGxhdGZvcm1zQnlJZCA9IHtcclxuICAgICdyaXNlLW9mLXRoZS10aWRlJzoge1xyXG4gICAgICAgIGdyb3VuZExheWVyOiBbXHJcbiAgICAgICAgICAgIFtbMCwwLDAsMF0sWzAsNzcsNzgsMF0sWzAsOTEsOTIsMF0sWzAsMCwwLDBdXSxcclxuICAgICAgICAgICAgW1swLCAwLCAwLCAwXSwgWzc3LCAxMTEsIDExMSwgNzhdLCBbOTEsIDEzMCwgMTMwLCA5Ml0sIFswLCAwLCAwLCAwXV0sXHJcbiAgICAgICAgICAgIFtbMCwgMCwgMCwgMCwgMCwgMCwgMF0sIFs3NywgMTExLCAxMTEsIDE0MiwgMTExLCAxNDIsIDc4XSwgWzkxLCAxMzAsIDEzMCwgMTQ0LCAxMzAsIDE0NCwgOTJdLCBbMCwgMCwgMCwgMCwgMCwgMCwgMF1dLFxyXG4gICAgICAgICAgICBbWzAsIDAsIDAsIDBdLCBbMCwgMTgsIDE5LCAxNl0sIFsxNSwgNzksIDIzLCA1Ml0sIFs1OCwgOTMsIDM5LCAzNF0sIFsxMTIsIDExMywgMzQsIDgzXSwgWzc3LCAxMTEsIDExMSwgNzhdLCBbOTEsIDEzMCwgMTMwLCA5Ml0sIFswLCAwLCAwLCAwXV0sXHJcbiAgICAgICAgICAgIFtbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsNzcsMTExLDc4LDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxbMCw5MSwxMzAsOTIsMCwwLDAsNzcsMTExLDc4LDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCw5MSwxMzAsOTIsMCwwLDAsNzcsNzgsMF0sWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsOTEsOTIsMF0sWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdXSxcclxuICAgICAgICAgICAgW1swLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsNjQsMF0sWzAsMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDY0LDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCw2NCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDAsMF0sWzAsNjQsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwXV0sXHJcbiAgICAgICAgICAgIFtbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCw3NywxMTEsNzgsMF0sWzAsMCwwLDAsMCwwLDAsNzcsNzgsMCwwLDAsMCw5MSwxMzAsOTIsMF0sWzAsNzcsMTExLDc4LDAsMCwwLDkxLDkyLDc3LDc4LDAsMCwwLDAsMCwwXSxbMCw5MSwxMzAsOTIsMCwwLDAsMCwwLDkxLDkyLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXV0sXHJcbiAgICAgICAgICAgIFtbMCwwLDAsMCwwLDAsMF0sWzAsOTcsOTgsOTksMTAwLDEwNSwwXSxbMCwwLDEyMiwxMjcsMTIxLDAsMF0sWzAsMCwzNyw1NywzMSwwLDBdLFswLDAsMzcsNTcsMTIxLDAsMF0sWzAsMCw1OCw2NywzMSwwLDBdLFswLDg0LDg1LDEzNiwxMjEsMCwwXSxbMCwwLDU4LDY3LDMxLDAsMF0sWzAsMCwyLDU3LDUyLDAsMF0sWzAsMCwyMSw2NywzNCwwLDBdLFswLDAsMzcsNTcsMTIxLDAsMF0sWzAsMCwyNjg0MzU0NjgxLDI2ODQzNTQ1OTEsMCwwLDBdLFswLDAsMCwwLDAsMCwwXV0sXHJcbiAgICAgICAgICAgIFtbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFswLDk4LDk5LDI0MywxMDAsMTA1LDk3LDY0LDk3LDk3LDY0LDk3LDY0LDk3LDk4LDk5LDEwMCwxMDQsMTA0LDEwNSwwXSxbMCwxMjIsMTI3LDEyNiwyMDYsMCwwLDAsMCwwLDAsMCwwLDAsMjQ1LDEyNywxMjUsMTI2LDEyNywwLDBdLFswLDAsMjY4NDM1NDY4MSwyNjg0MzU0NTkxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMjMwLDIxNiwyMzAsMjMwLDIxNiwwLDBdXSxcclxuICAgICAgICAgICAgW1swLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwxOCwxOSwyMCwxNyw2MywxNiwxOCwxOSwyMCwxNywxOCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwxNyw2MywzNCwxMywzNSw2NywzMiwzMywzNCwxMywzNSw0NSw0NiwzMSwwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDAsMiwzLDMwLDQsODAsMTIsNTMsNjUsNjYsNCw4MCw1Niw1NywxMSwxMTAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDE3LDExMCw3OSwyMiwyMyw0NCw0NSw0Niw3OSwyMiwyMyw0NCw0NSwxMjgsMTEyLDExMywxMDcsMjAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwyLDU3LDExLDM4LDM5LDU1LDExNCwxMiw1MywzOCwzOSwyOSw0OSw1MCw1MSw1OSw1MSwxMzEsOTYsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDE1LDc5LDY3LDMyLDMzLDM0LDEzLDM1LDQ2LDc5LDEwNywxMDgsMTEyLDc2LDYxLDYyLDYwLDc2LDYxLDEzMSwxNCwwLDAsMCwwXSxbMCwwLDAsMCwwLDU4LDExLDEyLDUzLDY1LDY2LDQsOTMsODksOTAsMjksNTYsMTI5LDU5LDU5LDQ5LDczLDQ3LDg4LDE0MSwzNCwwLDAsMCwwXSxbMCwwLDAsMCwxNSw2NywzMiw0Niw3OSwyMiwyMyw0NCwxMTMsMTA3LDEwOCwxMDksMTI4LDExMiwxMzMsNjAsNzYsNjEsNjIsMTY3LDEwMCwxMDQsMjI5LDAsMCwwXSxbMCwwLDAsMjAsOTAsMjksNzksMTI5LDkzLDg5LDkwLDI5LDI5LDQ4LDQ5LDUwLDUxLDEzMSw1OSw2Miw3Myw0NywyNCwxODAsMTI1LDEyNiwxMjEsMCwwLDBdLFswLDAsMCwyLDEwOCwxMDksMTI4LDExMiwxMTMsMTA3LDEwOCwxMDksMTMzLDYwLDc2LDYxLDYyLDEzMiwxMzMsNjIsMTY3LDEwMCwxOTcsMzQsNDUsNDYsMzEsMCwwLDBdLFswLDAsMCwyMSw0OSw1MCw1MSwxMzEsNTksNDgsNDksNTAsNTEsNzYsMTMzLDYyLDEzMiw3Myw0NywyNCwxMjQsMTI0LDEyNyw0LDExNCw1NywxMjEsMCwwLDBdLFswLDAsMCwzNyw3NiwxMzIsMTM3LDEzOCwxMzMsNjAsNzYsMTM5LDE3OCwxMzIsMTM3LDEzOCwxMzIsMTY3LDEwMCwxOTcsMzIsMzMsMzQsNDQsMzUsNjcsMzEsMCwwLDBdLFswLDAsMCw1OCwxODQsNzMsMTg0LDczLDEzOCwxOTUsMTg0LDE5MywxOTQsNzMsMTg0LDczLDg4LDE4MCwxMjQsMTI3LDExLDMyMjEyMjU0OTQsMzIyMTIyNTU1MSwzMjIxMjI1NTE4LDMyMjEyMjU1MDQsMzIyMTIyNTUzOSwzMjIxMjI1NDg3LDAsMCwwXSxbMCw5Nyw5OCw5OSwxMDAsMTA0LDEwMCwxMDQsMTAwLDEwNCwxMDAsMjA0LDIwNSwxMDQsMTAwLDEwNCwxOTcsMTMsMzUsNjcsMzIsMzIyMTIyNTUzNywzMjIxMjI1NTI1LDMyMjEyMjU0ODQsMzIyMTIyNTQ4MywzMjIxMjI1NTMwLDAsMCwwLDBdLFswLDAsMTIyLDEyNSwxMjQsMTI3LDEyNSwxMjYsMTIzLDIwNiwxMjQsMjA3LDIwOCwxMjYsMTIzLDIwNiwxMjQsNCw4MCwxMiw1MywzMjIxMjI1NTA1LDMyMjEyMjU1MDQsMzIyMTIyNTUzOSwzMjIxMjI1NTUxLDMyMjEyMjU0ODcsMCwwLDAsMF0sWzAsMCwzMjIxMjI1NDkyLDMyMjEyMjU1NzksMzIyMTIyNTU4NSwzMjIxMjI1NTg0LDMyMjEyMjU2MDAsMzIyMTIyNTUxNywzMjIxMjI1NTE2LDMyMjEyMjU0OTUsMzIyMTIyNTQ5NCwzMjIxMjI1NTUxLDMyMjEyMjU1MTgsMzIyMTIyNTUxNywzMjIxMjI1NTE2LDMyMjEyMjU0OTUsMzIyMTIyNTQ5NCwzMjIxMjI1NTUxLDQ1LDQ2LDc5LDMyMjEyMjU1MTAsMzIyMTIyNTQ4MywzMjIxMjI1NTI5LDMyMjEyMjU0NzQsMCwwLDAsMCwwXSxbMCwwLDAsMzIyMTIyNTU4MiwzMjIxMjI1NDgzLDMyMjEyMjU1MjksMzIyMTIyNTUyOCwzMjIxMjI1NTUyLDMyMjEyMjU0NzYsMzIyMTIyNTUzOCwzMjIxMjI1NTM3LDMyMjEyMjU1MjUsMzIyMTIyNTQ4NCwzMjIxMjI1NTUyLDMyMjEyMjU0NzYsMzIyMTIyNTUwMiwzMjIxMjI1NDc1LDMyMjEyMjU0NzQsMzIyMTIyNTUyNCwzMjIxMjI1NDk1LDMyMjEyMjU0OTQsMzIyMTIyNTQ4NSwzMjIxMjI1NTA2LDMyMjEyMjU1ODIsMzIyMTIyNTQ4OSwwLDAsMCwwLDBdLFswLDAsMCwwLDMyMjEyMjU1MDMsMzIyMTIyNTUxOCwzMjIxMjI1NTE3LDMyMjEyMjU1MDcsMzIyMTIyNTQ4NSwzMjIxMjI1NTA2LDMyMjEyMjU1MDUsMzIyMTIyNTUwNCwzMjIxMjI1NTMyLDMyMjEyMjU1ODAsMzIyMTIyNTU3OSwzMjIxMjI1NTg1LDMyMjEyMjU1ODQsMzIyMTIyNTYwMCwzMjIxMjI1NTgxLDMyMjEyMjU1NTEsMzIyMTIyNTYxNywzMjIxMjI1NDkxLDMyMjEyMjU0OTAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwzMjIxMjI1NDkwLDMyMjEyMjU0ODksMzIyMTIyNTQ5MiwzMjIxMjI1NDkxLDMyMjEyMjU0OTAsMzIyMTIyNTQ4OCwzMjIxMjI1NTM1LDMyMjEyMjU0ODksMzIyMTIyNTU2OCwzMjIxMjI1NTEwLDMyMjEyMjU1MDIsMzIyMTIyNTQ3NSwzMjIxMjI1NTM4LDMyMjEyMjU1MzcsMzIyMTIyNTQ3NCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDMyMjEyMjU0ODYsMzIyMTIyNTU4MCwzMjIxMjI1NTc5LDMyMjEyMjU1MDYsMzIyMTIyNTU4MiwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwzMjIxMjI1NDg5LDMyMjEyMjU0ODgsMzIyMTIyNTQ5MCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXV1cclxuICAgICAgICBdLFxyXG4gICAgICAgIGNvbGxpc2lvblRpbGVzOiBbMjQsNjQsNzcsNzgsOTEsOTIsOTcsOTgsOTksMTAwLDEwNCwxMDUsMTExLDEyMywxMjQsMTI1LDEyNiwxMjcsMTMwLDE2NywxODAsMTk1LDE5NywyMDQsMjA1LDIwNiwyMDcsMjA4LDIyOSwyNDNdXHJcbiAgICB9LFxyXG4gICAgJ2hhbGwtb2YtYWdlcyc6IHtcclxuICAgICAgICBncm91bmRMYXllcjogW1xyXG4gICAgICAgICAgICBbWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLCBbMCwgMzA3LCAxNTcsIDE1OCwgMTU3LCAxNTgsIDE1NywgMTU4LCAxNTcsIDE1OCwgMzA4LCAwXSwgWzAsIDMwOSwgMzEwLCAzMTEsIDMxMCwgMzExLCAzMTAsIDMxMSwgMzEwLCAzMTEsIDMxMiwgMF0sIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXV0sXHJcbiAgICAgICAgICAgIFtbMCwgMCwgMCwgMCwgMF0sIFswLCAzMDcsIDE1NywgMzA4LCAwXSwgWzAsIDMwOSwgMzEwLCAzMTIsIDBdLCBbMCwgMCwgMCwgMCwgMF1dLFxyXG4gICAgICAgICAgICBbWzAsIDAsIDAsIDAsIDAsIDBdLCBbMCwgMzA3LCAxNTcsIDE1OCwgMzA4LCAwXSwgWzAsIDMwOSwgMzEwLCAzMTEsIDMxMiwgMF0sIFswLCAwLCAwLCAwLCAwLCAwXV1cclxuICAgICAgICBdLFxyXG4gICAgICAgIGNvbGxpc2lvblRpbGVzOiBbMzA3LCAxNTcsIDE1OCwgMzA4LCAzMDksIDMxMCwgMzExLCAzMTJdXHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IHBsYXRmb3Jtc0J5SWQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvbW9kZWxzL3BsYXRmb3Jtcy5qcyIsImNvbnN0IGxldmVscyA9IHtcclxuICAgICdyaXNlLW9mLXRoZS10aWRlJzoge1xyXG4gICAgICAgICdpZCc6ICdyaXNlLW9mLXRoZS10aWRlJyxcclxuICAgICAgICAnbmFtZSc6ICdSaXNlIG9mIHRoZSBUaWRlJyxcclxuICAgIFx0J3RpbGVzZXQnOiAndGlsZXNldC1sZXZlbC1yaXNlLW9mLXRoZS10aWRlJyxcclxuICAgIFx0J3RpbGVtYXAnOiAndGlsZW1hcC1sZXZlbC1yaXNlLW9mLXRoZS10aWRlJyxcclxuICAgICAgICAndGlsZXNldEltYWdlJzogJ0wxJ1xyXG4gICAgfSxcclxuICAgICdoYWxsLW9mLWFnZXMnOiB7XHJcbiAgICAgICAgJ2lkJzogJ2hhbGwtb2YtYWdlcycsXHJcbiAgICAgICAgJ25hbWUnOiAnSGFsbCBvZiBBZ2VzJyxcclxuICAgIFx0J3RpbGVzZXQnOiAndGlsZXNldC1sZXZlbC1oYWxsLW9mLWFnZXMnLFxyXG4gICAgXHQndGlsZW1hcCc6ICd0aWxlbWFwLWxldmVsLWhhbGwtb2YtYWdlcycsXHJcbiAgICAgICAgJ3RpbGVzZXRJbWFnZSc6ICdMOCdcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxldmVscztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9zZXJ2aWNlcy9sZXZlbEdlbmVyYXRvci9tb2RlbHMvdGlsZW1hcHMuanMiLCJjb25zdCB0aWxlc2V0cyA9IHtcclxuICAgICdyaXNlLW9mLXRoZS10aWRlJzoge1xyXG5cdFx0XCJjb2x1bW5zXCI6IDExLFxyXG5cdFx0XCJmaXJzdGdpZFwiOiAxLFxyXG5cdFx0XCJpbWFnZVwiOiBcIkwxLnBuZ1wiLFxyXG5cdFx0XCJpbWFnZWhlaWdodFwiOiAzODQsXHJcblx0XHRcImltYWdld2lkdGhcIjogMTc2LFxyXG5cdFx0XCJtYXJnaW5cIjogMCxcclxuXHRcdFwibmFtZVwiOiBcIkwxXCIsXHJcblx0XHRcInByb3BlcnRpZXNcIjoge1xyXG5cclxuXHRcdH0sXHJcblx0XHRcInNwYWNpbmdcIjogMCxcclxuXHRcdFwidGlsZWNvdW50XCI6IDI2NCxcclxuXHRcdFwidGlsZWhlaWdodFwiOiAxNixcclxuXHRcdFwidGlsZXdpZHRoXCI6IDE2XHJcblx0fSxcclxuICAgICdoYWxsLW9mLWFnZXMnOiB7XHJcbiAgICAgICAgIFwiY29sdW1uc1wiOjExLFxyXG4gICAgICAgICBcImZpcnN0Z2lkXCI6MSxcclxuICAgICAgICAgXCJpbWFnZVwiOlwiTDgucG5nXCIsXHJcbiAgICAgICAgIFwiaW1hZ2VoZWlnaHRcIjo2MDgsXHJcbiAgICAgICAgIFwiaW1hZ2V3aWR0aFwiOjE3NixcclxuICAgICAgICAgXCJtYXJnaW5cIjowLFxyXG4gICAgICAgICBcIm5hbWVcIjpcIkw4XCIsXHJcbiAgICAgICAgIFwicHJvcGVydGllc1wiOlxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICBcInNwYWNpbmdcIjowLFxyXG4gICAgICAgICBcInRpbGVjb3VudFwiOjQxOCxcclxuICAgICAgICAgXCJ0aWxlaGVpZ2h0XCI6MTYsXHJcbiAgICAgICAgIFwidGlsZXdpZHRoXCI6MTZcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRpbGVzZXRzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL3NlcnZpY2VzL2xldmVsR2VuZXJhdG9yL21vZGVscy90aWxlc2V0cy5qcyIsIlxyXG5leHBvcnQgY29uc3QgZmxhdHRlbiA9IG11bHRpZGltZW5zaW9uYWwgPT4ge1xyXG4gICAgcmV0dXJuIG11bHRpZGltZW5zaW9uYWwucmVkdWNlKChyZXMsIHJvdykgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXMuY29uY2F0KHJvdyk7XHJcbiAgICB9LCBbXSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYXBwbHlNYXRyaXggPSAoYmlnLCBzbWFsbCwgeCwgeSkgPT4ge1xyXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgc21hbGwubGVuZ3RoOyByb3crKykge1xyXG4gICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHNtYWxsW3Jvd10ubGVuZ3RoOyBjb2wrKykge1xyXG4gICAgICAgICAgICBiaWdbeSArIHJvd11beCArIGNvbF0gPSBzbWFsbFtyb3ddW2NvbF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJpZztcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVNYXRyaXggPSAocm93cywgY29scywgdGlsZSkgPT4ge1xyXG4gICAgbGV0IHJlcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyBpKyspIHtcclxuICAgICAgICBsZXQgcm93ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xzOyBqKyspIHtcclxuICAgICAgICAgICAgcm93LnB1c2godGlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcy5wdXNoKHJvdyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGxheWVyVG9NYXRyaXggPSBsYXllciA9PiB7XHJcbiAgICByZXR1cm4gbGF5ZXIuZGF0YS5yZWR1Y2UoKHJlc3VsdCwgdGlsZSwgaSkgPT4ge1xyXG4gICAgICAgIGlmIChpICUgbGF5ZXIud2lkdGggPT09IDApIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW3RpbGVdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdLnB1c2godGlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9LCBbXSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY2hlY2tJZkFyZWFJc0NvdmVyZWQgPSAobWF0cml4LCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSA9PiB7XHJcbiAgICBsZXQgcmVzID0gMDtcclxuICAgIGZvciAobGV0IHJvdyA9IHg7IHJvdyA8PSB4ICsgd2lkdGg7IHJvdysrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgY29sID0geTsgY29sIDw9IHkgKyBoZWlnaHQ7IGNvbCsrKSB7XHJcbiAgICAgICAgICAgIHJlcyArPSBtYXRyaXhbY29sXVtyb3ddO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXMgPT09IDA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZmlsdGVyQ29sbGlzaW9uVGlsZXMgPSBmbGF0bWF0cml4ID0+IHtcclxuXHRyZXR1cm4gZmxhdG1hdHJpeC5maWx0ZXIodGlsZSA9PiB7XHJcblx0XHRyZXR1cm4gdGlsZSAhPT0gMDtcclxuXHR9KS5yZWR1Y2UoKHVuaXF1ZXMsIHRpbGUpID0+IHtcclxuXHRcdGlmKHVuaXF1ZXMuaW5kZXhPZih0aWxlKSA8IDApe1xyXG5cdFx0XHR1bmlxdWVzLnB1c2godGlsZSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdW5pcXVlcztcclxuXHR9LCBbXSkuc29ydCgoYSwgYikgPT4ge1xyXG5cdFx0cmV0dXJuIGEgLSBiXHJcblx0fSk7XHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxHZW5lcmF0b3IvdXRpbHMuanMiLCJmdW5jdGlvbiBsZXZlbExvYWRlcigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlQmFja2dyb3VuZDogKGxheWVyTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLmJhY2tncm91bmRMYXllciA9IHRoaXMuZ2FtZS5hZGQudGlsZVNwcml0ZShcclxuICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbENvbmZpZy53aWR0aCxcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxDb25maWcuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbENvbmZpZy5iYWNrZ3JvdW5kS2V5XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGVMYXllcjogKGxheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWxbbGF5ZXJdID0gdGhpcy5sZXZlbC50aWxlbWFwLmNyZWF0ZUxheWVyKHRoaXMubGV2ZWxDb25maWdbbGF5ZXJdKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZUxheWVyczogKGxheWVycykgPT4ge1xyXG4gICAgICAgICAgICBmb3IobGV0IGxheWVyIGluIGxheWVycyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsW2xheWVyXSA9IHRoaXMubGV2ZWwudGlsZW1hcC5jcmVhdGVMYXllcih0aGlzLmxldmVsQ29uZmlnLmxheWVyc1tsYXllcl0ua2V5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxbbGF5ZXJdLnZpc2libGUgPSB0aGlzLmxldmVsQ29uZmlnLmxheWVyc1tsYXllcl0udmlzaWJsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlVGlsZXM6ICh0aWxlbWFwS2V5LCB0aWxlc2V0S2V5LCB0aWxlc2V0SW1hZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbC50aWxlbWFwID0gdGhpcy5nYW1lLmFkZC50aWxlbWFwKHRpbGVtYXBLZXkpO1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsLnRpbGVtYXAuYWRkVGlsZXNldEltYWdlKHRpbGVzZXRJbWFnZSwgdGlsZXNldEtleSk7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDAsIDMwMDAsIHRydWUsIHRoaXMubGV2ZWxDb25maWcubGF5ZXJzLmNvbGxpc2lvbkxheWVyLmtleSk7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwudGlsZW1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDAsIDMwMDAsIHRydWUsIHRoaXMubGV2ZWxDb25maWcubGF5ZXJzLmRlYXRoTGF5ZXIua2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGV2ZWxMb2FkZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvc2VydmljZXMvbGV2ZWxMb2FkZXIuanMiXSwic291cmNlUm9vdCI6IiJ9