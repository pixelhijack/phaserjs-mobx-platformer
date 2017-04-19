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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
        _this.anchor.setTo(0.5, 0.5);
        _this.body.collideWorldBounds = true;
        _this.checkWorldBounds = true;
        _this.body.gravity.y = 500;

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
        key: 'moveLeft',
        value: function moveLeft() {
            this.scale.x = -1;
            if (this.body.velocity.x > -this.props.maxSpeed) {
                this.body.velocity.x -= this.props.acceleration;
            }
        }
    }, {
        key: 'moveRight',
        value: function moveRight() {
            this.scale.x = 1;
            if (this.body.velocity.x < this.props.maxSpeed) {
                this.body.velocity.x += this.props.acceleration;
            }
        }
    }, {
        key: 'move',
        value: function move() {
            if (this.scale.x === 1) {
                this.moveRight();
            } else {
                this.moveLeft();
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.body.velocity.x /= 1.1;
        }
    }, {
        key: 'jump',
        value: function jump() {
            if (this.body.touching.down || this.body.blocked.down) {
                this.body.velocity.y -= 300;
            }
        }
    }, {
        key: 'hit',
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
        key: 'hurt',
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
        key: 'update',
        value: function update() {
            //console.log('[Sprite] state');
        }
    }, {
        key: 'isHitting',
        get: function get() {
            return this.spriteState.hit > this.game.time.now;
        }
    }, {
        key: 'isStunned',
        get: function get() {
            return this.spriteState.stun > this.game.time.now;
        }
    }]);

    return ExtendedSprite;
}(Phaser.Sprite);

;

exports.default = ExtendedSprite;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var gameConfig = {
    width: 546,
    height: 368,
    domElement: 'game'
};

exports.default = gameConfig;

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ExtendedSprite2 = __webpack_require__(0);

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

        _this.spriteState = mobx.observable({
            life: 10,
            stun: 0,
            hit: 0,
            nohit: 0
        });
        return _this;
    }

    return AI;
}(_ExtendedSprite3.default);

exports.default = AI;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ExtendedSprite2 = __webpack_require__(0);

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gameconfig = __webpack_require__(1);

var _gameconfig2 = _interopRequireDefault(_gameconfig);

var _index = __webpack_require__(6);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// instantiate a Phaser.Game
var PLATFORMER = new Phaser.Game(_gameconfig2.default.width, _gameconfig2.default.height, Phaser.AUTO, _gameconfig2.default.domElement);

// register gamestates (will be instantiated w/ this.game as 1st param, pass gameConfig as 2nd)
PLATFORMER.state.add('Play', _index2.default.bind(null, _gameconfig2.default));

// kick off first gamestate: Menu
PLATFORMER.state.start('Play', true, true, {
    initialState: 'some initial state'
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _AI = __webpack_require__(3);

var _AI2 = _interopRequireDefault(_AI);

var _Human = __webpack_require__(4);

var _Human2 = _interopRequireDefault(_Human);

var _play = __webpack_require__(7);

var _play2 = _interopRequireDefault(_play);

var _play3 = __webpack_require__(8);

var _play4 = _interopRequireDefault(_play3);

var _play5 = __webpack_require__(9);

var _play6 = _interopRequireDefault(_play5);

var _play7 = __webpack_require__(10);

var _play8 = _interopRequireDefault(_play7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameState = function GameState(gameConfig) {
    _classCallCheck(this, GameState);

    this.gameConfig = gameConfig;
    this.keys = undefined;
    this.player = undefined;
    this.enemy = undefined;
    this.gameState = undefined;
};

GameState.prototype.init = _play2.default;
GameState.prototype.preload = _play4.default;
GameState.prototype.create = _play6.default;
GameState.prototype.update = _play8.default;

module.exports = GameState;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function init(configs) {
    console.log('[PHASER][Component][Init]', configs);
};

exports.default = init;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function preload() {
    console.log('[PHASER][Component][Preload]');
    this.game.load.image('player', 'man.png');
    this.game.load.image('dino', 'dino.png');
    this.game.load.atlas('pre2atlas', 'pre2atlas.png', 'pre2atlas.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
};

exports.default = preload;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Human = __webpack_require__(4);

var _Human2 = _interopRequireDefault(_Human);

var _AI = __webpack_require__(3);

var _AI2 = _interopRequireDefault(_AI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create() {
    var _this = this;

    console.log('[PHASER][Component][Create]');
    // fps debugging
    this.game.time.advancedTiming = true;

    // [SET LEVEL] set dimensions, start physic system
    this.game.world.setBounds(0, 0, this.gameConfig.width, this.gameConfig.height);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = '#fff';

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
    this.player = new _Human2.default(this.game, 200, 200, 'pre2atlas', {
        acceleration: 10,
        maxSpeed: 200,
        animations: [{ name: 'move', frames: [11, '03', '05', 14, 20], fps: 10, loop: false }, { name: 'hit', frames: [22, 24, 28, 31, 34, 22, 24, 28, 31, 34], fps: 10, loop: true }, { name: 'stop', frames: [42, 45, 49, 52], fps: 10, loop: false }, { name: 'jump', frames: [16, 41, 47, 50, 50, 50, 50, 50, 50, 50, 50, 13, 50, 13, 50, 13], fps: 10, loop: false }, { name: 'idle', frames: [25, 25, 25, 25, 25, 25, 25, 25, 27, 27, 27, 27, 25, 25, 25, 25, 25, 25, 25, 25, 30, 25, 25, 25, 25, 25, 25, 25, 25, 27, 30, 27, 30, 35, 36, 25, 25, 25, 25, 25, 25, 25, 25, '07', '07', '07', '07', '02', '02'], fps: 5, loop: true }, { name: 'hurt', frames: [19], fps: 10, loop: true }, { name: 'stun', frames: [19], fps: 10, loop: true }, { name: 'die', frames: [19], fps: 10, loop: false }, { name: 'spawn', frames: [11, '03', '05', 14, 20], fps: 10, loop: false }]
    });

    // [ENEMY]
    this.enemy = new _AI2.default(this.game, 400, 200, 'dino');
    this.enemy.body.velocity.x = Math.random() * -10 - 10;

    this.game.camera.follow(this.player);

    // bind keys
    this.keys = this.game.input.keyboard.createCursorKeys();
    this.keys.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // score text
    this.menu = this.game.add.text(150, 0, "Life: " + this.player.spriteState.life, { font: "24px Courier", fill: "#000", align: "center" });
    mobx.observe(this.player.spriteState, function (change) {
        _this.menu.setText("Life: " + _this.player.spriteState.life);
    });
};

exports.default = create;

/***/ }),
/* 10 */
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

    // move
    onKeyPress.call(this);

    // collide
    this.game.physics.arcade.overlap(this.player, this.enemy, function (player, enemy) {
        if (!_this.player.isHitting && !_this.player.isStunned) {
            _this.player.updateState({
                life: _this.player.spriteState.life - 1,
                stun: _this.game.time.now + 1500
            });
            _this.player.hurt(enemy.body.touching);
        }
    });
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDQyYTk4ZGM4ZTI5ZGI0OTRiZDIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0V4dGVuZGVkU3ByaXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZWNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvQUkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0h1bWFuLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5pbml0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5L3BsYXkucHJlbG9hZC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJFeHRlbmRlZFNwcml0ZSIsImdhbWUiLCJ4IiwieSIsInNwcml0ZSIsInByb3BzIiwiYW5pbWF0aW9ucyIsImFkZCIsImV4aXN0aW5nIiwicGh5c2ljcyIsImVuYWJsZSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJhbmNob3IiLCJzZXRUbyIsImJvZHkiLCJjb2xsaWRlV29ybGRCb3VuZHMiLCJjaGVja1dvcmxkQm91bmRzIiwiZ3Jhdml0eSIsImZvckVhY2giLCJhbmltYXRpb24iLCJuYW1lIiwiZnJhbWVzIiwibWFwIiwiZnJhbWUiLCJ0b1N0cmluZyIsImZwcyIsImxvb3AiLCJnYW1lU3RhdGUiLCJzdGF0ZSIsInN0YXRlcyIsImN1cnJlbnQiLCJtb2J4Iiwib2JzZXJ2ZSIsImNoYW5nZSIsImNvbnNvbGUiLCJsb2ciLCJ1cGRhdGVTdGF0ZSIsImFjdGlvbiIsInNwcml0ZVN0YXRlIiwiT2JqZWN0IiwiYXNzaWduIiwic2NhbGUiLCJ2ZWxvY2l0eSIsIm1heFNwZWVkIiwiYWNjZWxlcmF0aW9uIiwibW92ZVJpZ2h0IiwibW92ZUxlZnQiLCJ0b3VjaGluZyIsImRvd24iLCJibG9ja2VkIiwiaGl0VW50aWwiLCJ0aW1lIiwibm93IiwiYnJlYWtVbnRpbCIsImhpdCIsIm5vaGl0IiwiZGlyZWN0aW9uIiwibGVmdCIsInJpZ2h0Iiwic3R1biIsIlNwcml0ZSIsImdhbWVDb25maWciLCJ3aWR0aCIsImhlaWdodCIsImRvbUVsZW1lbnQiLCJBSSIsIm9ic2VydmFibGUiLCJsaWZlIiwiSHVtYW4iLCJQTEFURk9STUVSIiwiR2FtZSIsIkFVVE8iLCJiaW5kIiwic3RhcnQiLCJpbml0aWFsU3RhdGUiLCJHYW1lU3RhdGUiLCJrZXlzIiwidW5kZWZpbmVkIiwicGxheWVyIiwiZW5lbXkiLCJwcm90b3R5cGUiLCJpbml0IiwicHJlbG9hZCIsImNyZWF0ZSIsInVwZGF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJjb25maWdzIiwibG9hZCIsImltYWdlIiwiYXRsYXMiLCJMb2FkZXIiLCJURVhUVVJFX0FUTEFTX0pTT05fSEFTSCIsImFkdmFuY2VkVGltaW5nIiwid29ybGQiLCJzZXRCb3VuZHMiLCJzdGFydFN5c3RlbSIsInN0YWdlIiwiYmFja2dyb3VuZENvbG9yIiwiaW5pdGlhbGlzZWQiLCJzY29yZSIsIk1hdGgiLCJyYW5kb20iLCJjYW1lcmEiLCJmb2xsb3ciLCJpbnB1dCIsImtleWJvYXJkIiwiY3JlYXRlQ3Vyc29yS2V5cyIsInNwYWNlIiwiYWRkS2V5IiwiS2V5Ym9hcmQiLCJTUEFDRUJBUiIsIm1lbnUiLCJ0ZXh0IiwiZm9udCIsImZpbGwiLCJhbGlnbiIsInNldFRleHQiLCJkZWJ1ZyIsIm9uS2V5UHJlc3MiLCJjYWxsIiwiYXJjYWRlIiwib3ZlcmxhcCIsImlzSGl0dGluZyIsImlzU3R1bm5lZCIsImh1cnQiLCJwbGF5IiwiaXNEb3duIiwic3RvcCIsInVwIiwianVtcCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNoRU1BLGM7OztBQUNGLDRCQUFZQyxJQUFaLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLE1BQXhCLEVBQWdDQyxLQUFoQyxFQUFzQztBQUFBOztBQUFBLG9JQUM1QkosSUFENEIsRUFDdEJDLENBRHNCLEVBQ25CQyxDQURtQixFQUNoQkMsTUFEZ0I7O0FBRWxDLGNBQUtILElBQUwsR0FBWUEsSUFBWjtBQUNBLGNBQUtJLEtBQUwsR0FBYUEsU0FBUyxFQUFFQyxZQUFZLEVBQWQsRUFBdEI7QUFDQSxjQUFLTCxJQUFMLENBQVVNLEdBQVYsQ0FBY0MsUUFBZDtBQUNBLGNBQUtQLElBQUwsQ0FBVVEsT0FBVixDQUFrQkMsTUFBbEIsUUFBK0JDLE9BQU9DLE9BQVAsQ0FBZUMsTUFBOUM7QUFDQSxjQUFLQyxNQUFMLENBQVlDLEtBQVosQ0FBa0IsR0FBbEIsRUFBdUIsR0FBdkI7QUFDQSxjQUFLQyxJQUFMLENBQVVDLGtCQUFWLEdBQStCLElBQS9CO0FBQ0EsY0FBS0MsZ0JBQUwsR0FBd0IsSUFBeEI7QUFDQSxjQUFLRixJQUFMLENBQVVHLE9BQVYsQ0FBa0JoQixDQUFsQixHQUFzQixHQUF0Qjs7QUFFQSxjQUFLRSxLQUFMLENBQVdDLFVBQVgsQ0FBc0JjLE9BQXRCLENBQThCLHFCQUFhO0FBQ3ZDLGtCQUFLZCxVQUFMLENBQWdCQyxHQUFoQixDQUNJYyxVQUFVQyxJQURkLEVBRUlELFVBQVVFLE1BQVYsQ0FBaUJDLEdBQWpCLENBQXFCO0FBQUEsdUJBQVNDLE1BQU1DLFFBQU4sRUFBVDtBQUFBLGFBQXJCLENBRkosRUFHSUwsVUFBVU0sR0FIZCxFQUlJTixVQUFVTyxJQUpkO0FBTUgsU0FQRDs7QUFTQSxZQUFNQyxZQUFZLE1BQUs1QixJQUFMLENBQVU2QixLQUFWLENBQWdCQyxNQUFoQixDQUF1QixNQUFLOUIsSUFBTCxDQUFVNkIsS0FBVixDQUFnQkUsT0FBdkMsRUFBZ0RILFNBQWxFOztBQUVBSSxhQUFLQyxPQUFMLENBQWFMLFNBQWIsRUFBd0IsVUFBQ00sTUFBRCxFQUFZO0FBQ2hDQyxvQkFBUUMsR0FBUixDQUFZLFFBQVosRUFBc0JGLE1BQXRCLEVBQThCTixTQUE5QjtBQUNILFNBRkQ7O0FBSUEsY0FBS1MsV0FBTCxHQUFtQkwsS0FBS00sTUFBTCxDQUFZLFVBQUNKLE1BQUQsRUFBWTtBQUN2QyxrQkFBS0ssV0FBTCxHQUFtQkMsT0FBT0MsTUFBUCxDQUFjLE1BQUtGLFdBQW5CLEVBQWdDTCxNQUFoQyxDQUFuQjtBQUNILFNBRmtCLENBQW5CO0FBMUJrQztBQTZCckM7Ozs7bUNBVVM7QUFDTixpQkFBS1EsS0FBTCxDQUFXekMsQ0FBWCxHQUFlLENBQUMsQ0FBaEI7QUFDQSxnQkFBRyxLQUFLYyxJQUFMLENBQVU0QixRQUFWLENBQW1CMUMsQ0FBbkIsR0FBdUIsQ0FBQyxLQUFLRyxLQUFMLENBQVd3QyxRQUF0QyxFQUErQztBQUMzQyxxQkFBSzdCLElBQUwsQ0FBVTRCLFFBQVYsQ0FBbUIxQyxDQUFuQixJQUF3QixLQUFLRyxLQUFMLENBQVd5QyxZQUFuQztBQUNIO0FBQ0o7OztvQ0FFVTtBQUNQLGlCQUFLSCxLQUFMLENBQVd6QyxDQUFYLEdBQWUsQ0FBZjtBQUNBLGdCQUFHLEtBQUtjLElBQUwsQ0FBVTRCLFFBQVYsQ0FBbUIxQyxDQUFuQixHQUF1QixLQUFLRyxLQUFMLENBQVd3QyxRQUFyQyxFQUE4QztBQUMxQyxxQkFBSzdCLElBQUwsQ0FBVTRCLFFBQVYsQ0FBbUIxQyxDQUFuQixJQUF3QixLQUFLRyxLQUFMLENBQVd5QyxZQUFuQztBQUNIO0FBQ0o7OzsrQkFFSztBQUNGLGdCQUFHLEtBQUtILEtBQUwsQ0FBV3pDLENBQVgsS0FBaUIsQ0FBcEIsRUFBc0I7QUFDbEIscUJBQUs2QyxTQUFMO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUtDLFFBQUw7QUFDSDtBQUNKOzs7K0JBRUs7QUFDRixpQkFBS2hDLElBQUwsQ0FBVTRCLFFBQVYsQ0FBbUIxQyxDQUFuQixJQUF3QixHQUF4QjtBQUNIOzs7K0JBRUs7QUFDRixnQkFBRyxLQUFLYyxJQUFMLENBQVVpQyxRQUFWLENBQW1CQyxJQUFuQixJQUEyQixLQUFLbEMsSUFBTCxDQUFVbUMsT0FBVixDQUFrQkQsSUFBaEQsRUFBcUQ7QUFDakQscUJBQUtsQyxJQUFMLENBQVU0QixRQUFWLENBQW1CekMsQ0FBbkIsSUFBd0IsR0FBeEI7QUFDSDtBQUNKOzs7OEJBRUk7QUFDRCxnQkFBTWlELFdBQVcsS0FBS25ELElBQUwsQ0FBVW9ELElBQVYsQ0FBZUMsR0FBZixHQUFxQixHQUF0QztBQUFBLGdCQUNJQyxhQUFhLEtBQUt0RCxJQUFMLENBQVVvRCxJQUFWLENBQWVDLEdBQWYsR0FBcUIsSUFEdEM7QUFFQWxCLG9CQUFRQyxHQUFSLENBQVksd0JBQVosRUFBc0MsS0FBS3BDLElBQUwsQ0FBVW9ELElBQVYsQ0FBZUMsR0FBckQsRUFBMERGLFFBQTFELEVBQW9FRyxVQUFwRTtBQUNBLGlCQUFLakIsV0FBTCxDQUFpQjtBQUNia0IscUJBQUtKLFFBRFE7QUFFYkssdUJBQU9GO0FBRk0sYUFBakI7QUFJSDs7OzZCQUVJRyxTLEVBQVU7QUFDWCxpQkFBSzFDLElBQUwsQ0FBVTRCLFFBQVYsQ0FBbUJ6QyxDQUFuQixJQUF3QixHQUF4QjtBQUNBLGdCQUFHdUQsYUFBYUEsVUFBVUMsSUFBMUIsRUFBK0I7QUFDM0IscUJBQUszQyxJQUFMLENBQVU0QixRQUFWLENBQW1CMUMsQ0FBbkIsSUFBd0IsT0FBTyxLQUFLRyxLQUFMLENBQVd3QyxRQUExQztBQUNIO0FBQ0QsZ0JBQUdhLGFBQWFBLFVBQVVFLEtBQTFCLEVBQWdDO0FBQzVCLHFCQUFLNUMsSUFBTCxDQUFVNEIsUUFBVixDQUFtQjFDLENBQW5CLElBQXdCLE9BQU8sS0FBS0csS0FBTCxDQUFXd0MsUUFBMUM7QUFDSDtBQUNKOzs7aUNBRU87QUFDSjtBQUNIOzs7NEJBOURjO0FBQ1gsbUJBQU8sS0FBS0wsV0FBTCxDQUFpQmdCLEdBQWpCLEdBQXVCLEtBQUt2RCxJQUFMLENBQVVvRCxJQUFWLENBQWVDLEdBQTdDO0FBQ0g7Ozs0QkFFYztBQUNYLG1CQUFPLEtBQUtkLFdBQUwsQ0FBaUJxQixJQUFqQixHQUF3QixLQUFLNUQsSUFBTCxDQUFVb0QsSUFBVixDQUFlQyxHQUE5QztBQUNIOzs7O0VBdEN3QjNDLE9BQU9tRCxNOztBQStGbkM7O2tCQUVjOUQsYzs7Ozs7Ozs7Ozs7O0FDakdmLElBQU0rRCxhQUFhO0FBQ2ZDLFdBQU8sR0FEUTtBQUVmQyxZQUFRLEdBRk87QUFHZkMsZ0JBQVk7QUFIRyxDQUFuQjs7a0JBTWVILFU7Ozs7Ozs7Ozs7Ozs7O0FDTmY7Ozs7Ozs7Ozs7OztJQUVNSSxFOzs7QUFDRixnQkFBWWxFLElBQVosRUFBa0JDLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QkMsTUFBeEIsRUFBZ0NDLEtBQWhDLEVBQXNDO0FBQUE7O0FBQUEsNEdBQzVCSixJQUQ0QixFQUN0QkMsQ0FEc0IsRUFDbkJDLENBRG1CLEVBQ2hCQyxNQURnQixFQUNSQyxLQURROztBQUdsQyxjQUFLbUMsV0FBTCxHQUFtQlAsS0FBS21DLFVBQUwsQ0FBZ0I7QUFDL0JDLGtCQUFNLEVBRHlCO0FBRS9CUixrQkFBTSxDQUZ5QjtBQUcvQkwsaUJBQUssQ0FIMEI7QUFJL0JDLG1CQUFPO0FBSndCLFNBQWhCLENBQW5CO0FBSGtDO0FBU3JDOzs7OztrQkFHVVUsRTs7Ozs7Ozs7Ozs7OztBQ2ZmOzs7Ozs7Ozs7Ozs7SUFFTUcsSzs7O0FBQ0YsbUJBQVlyRSxJQUFaLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLE1BQXhCLEVBQWdDQyxLQUFoQyxFQUFzQztBQUFBOztBQUFBLGtIQUM1QkosSUFENEIsRUFDdEJDLENBRHNCLEVBQ25CQyxDQURtQixFQUNoQkMsTUFEZ0IsRUFDUkMsS0FEUTs7QUFHbEMsY0FBS21DLFdBQUwsR0FBbUJQLEtBQUttQyxVQUFMLENBQWdCO0FBQy9CQyxrQkFBTSxFQUR5QjtBQUUvQlIsa0JBQU0sQ0FGeUI7QUFHL0JMLGlCQUFLLENBSDBCO0FBSS9CQyxtQkFBTztBQUp3QixTQUFoQixDQUFuQjtBQUhrQztBQVNyQzs7Ozs7a0JBR1VhLEs7Ozs7Ozs7OztBQ2ZmOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ0EsSUFBTUMsYUFBYSxJQUFJNUQsT0FBTzZELElBQVgsQ0FDZixxQkFBV1IsS0FESSxFQUVmLHFCQUFXQyxNQUZJLEVBR2Z0RCxPQUFPOEQsSUFIUSxFQUlmLHFCQUFXUCxVQUpJLENBQW5COztBQU9BO0FBQ0FLLFdBQVd6QyxLQUFYLENBQWlCdkIsR0FBakIsQ0FBcUIsTUFBckIsRUFBNkIsZ0JBQUttRSxJQUFMLENBQVUsSUFBVix1QkFBN0I7O0FBRUE7QUFDQUgsV0FBV3pDLEtBQVgsQ0FBaUI2QyxLQUFqQixDQUF1QixNQUF2QixFQUErQixJQUEvQixFQUFxQyxJQUFyQyxFQUEyQztBQUN2Q0Msa0JBQWM7QUFEeUIsQ0FBM0MsRTs7Ozs7Ozs7O0FDZkE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVNQyxTLEdBQ0YsbUJBQVlkLFVBQVosRUFBd0I7QUFBQTs7QUFDcEIsU0FBS0EsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLZSxJQUFMLEdBQVlDLFNBQVo7QUFDQSxTQUFLQyxNQUFMLEdBQWNELFNBQWQ7QUFDQSxTQUFLRSxLQUFMLEdBQWFGLFNBQWI7QUFDQSxTQUFLbEQsU0FBTCxHQUFpQmtELFNBQWpCO0FBRUgsQzs7QUFHTEYsVUFBVUssU0FBVixDQUFvQkMsSUFBcEI7QUFDQU4sVUFBVUssU0FBVixDQUFvQkUsT0FBcEI7QUFDQVAsVUFBVUssU0FBVixDQUFvQkcsTUFBcEI7QUFDQVIsVUFBVUssU0FBVixDQUFvQkksTUFBcEI7O0FBRUFDLE9BQU9DLE9BQVAsR0FBaUJYLFNBQWpCLEM7Ozs7Ozs7Ozs7OztBQ3hCQSxTQUFTTSxJQUFULENBQWNNLE9BQWQsRUFBc0I7QUFDbEJyRCxZQUFRQyxHQUFSLENBQVksMkJBQVosRUFBeUNvRCxPQUF6QztBQUNIOztrQkFFY04sSTs7Ozs7Ozs7Ozs7O0FDSmYsU0FBU0MsT0FBVCxHQUFrQjtBQUNkaEQsWUFBUUMsR0FBUixDQUFZLDhCQUFaO0FBQ0EsU0FBS3BDLElBQUwsQ0FBVXlGLElBQVYsQ0FBZUMsS0FBZixDQUFxQixRQUFyQixFQUErQixTQUEvQjtBQUNBLFNBQUsxRixJQUFMLENBQVV5RixJQUFWLENBQWVDLEtBQWYsQ0FBcUIsTUFBckIsRUFBNkIsVUFBN0I7QUFDQSxTQUFLMUYsSUFBTCxDQUFVeUYsSUFBVixDQUFlRSxLQUFmLENBQ0ksV0FESixFQUVJLGVBRkosRUFHSSxnQkFISixFQUlJakYsT0FBT2tGLE1BQVAsQ0FBY0MsdUJBSmxCO0FBTUg7O2tCQUVjVixPOzs7Ozs7Ozs7Ozs7O0FDWmY7Ozs7QUFDQTs7Ozs7O0FBRUEsU0FBU0MsTUFBVCxHQUFpQjtBQUFBOztBQUNiakQsWUFBUUMsR0FBUixDQUFZLDZCQUFaO0FBQ0E7QUFDQSxTQUFLcEMsSUFBTCxDQUFVb0QsSUFBVixDQUFlMEMsY0FBZixHQUFnQyxJQUFoQzs7QUFFQTtBQUNBLFNBQUs5RixJQUFMLENBQVUrRixLQUFWLENBQWdCQyxTQUFoQixDQUNJLENBREosRUFFSSxDQUZKLEVBR0ksS0FBS2xDLFVBQUwsQ0FBZ0JDLEtBSHBCLEVBSUksS0FBS0QsVUFBTCxDQUFnQkUsTUFKcEI7O0FBT0EsU0FBS2hFLElBQUwsQ0FBVVEsT0FBVixDQUFrQnlGLFdBQWxCLENBQThCdkYsT0FBT0MsT0FBUCxDQUFlQyxNQUE3QztBQUNBLFNBQUtaLElBQUwsQ0FBVWtHLEtBQVYsQ0FBZ0JDLGVBQWhCLEdBQWtDLE1BQWxDOztBQUVBLFNBQUt2RSxTQUFMLEdBQWlCSSxLQUFLbUMsVUFBTCxDQUFnQjtBQUM3QmlDLHFCQUFhLEtBRGdCO0FBRTdCQyxlQUFPO0FBRnNCLEtBQWhCLENBQWpCOztBQUtBLFNBQUtoRSxXQUFMLEdBQW1CTCxLQUFLTSxNQUFMLENBQVksVUFBQ0osTUFBRCxFQUFZO0FBQ3ZDLGNBQUtOLFNBQUwsR0FBaUJZLE9BQU9DLE1BQVAsQ0FBYyxNQUFLYixTQUFuQixFQUE4Qk0sTUFBOUIsQ0FBakI7QUFDSCxLQUZrQixDQUFuQjs7QUFJQUYsU0FBS0MsT0FBTCxDQUFhLEtBQUtMLFNBQWxCLEVBQTZCLGtCQUFVO0FBQ25DTyxnQkFBUUMsR0FBUixDQUFZLG9CQUFaLEVBQWtDRixNQUFsQyxFQUEwQyxNQUFLTixTQUEvQztBQUNILEtBRkQ7O0FBSUEsU0FBS1MsV0FBTCxDQUFpQixFQUFFK0QsYUFBYSxJQUFmLEVBQWpCOztBQUVBO0FBQ0EsU0FBS3JCLE1BQUwsR0FBYyxvQkFBVSxLQUFLL0UsSUFBZixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixXQUEvQixFQUE0QztBQUN0RDZDLHNCQUFjLEVBRHdDO0FBRXRERCxrQkFBVSxHQUY0QztBQUd0RHZDLG9CQUFZLENBQ1YsRUFBRWdCLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEVBQUQsRUFBSSxJQUFKLEVBQVMsSUFBVCxFQUFjLEVBQWQsRUFBaUIsRUFBakIsQ0FBeEIsRUFBOENJLEtBQUssRUFBbkQsRUFBdURDLE1BQU0sS0FBN0QsRUFEVSxFQUVWLEVBQUVOLE1BQU0sS0FBUixFQUFlQyxRQUFRLENBQUMsRUFBRCxFQUFJLEVBQUosRUFBTyxFQUFQLEVBQVUsRUFBVixFQUFhLEVBQWIsRUFBZ0IsRUFBaEIsRUFBbUIsRUFBbkIsRUFBc0IsRUFBdEIsRUFBeUIsRUFBekIsRUFBNEIsRUFBNUIsQ0FBdkIsRUFBd0RJLEtBQUssRUFBN0QsRUFBaUVDLE1BQU0sSUFBdkUsRUFGVSxFQUdWLEVBQUVOLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEVBQUQsRUFBSSxFQUFKLEVBQU8sRUFBUCxFQUFVLEVBQVYsQ0FBeEIsRUFBdUNJLEtBQUssRUFBNUMsRUFBZ0RDLE1BQU0sS0FBdEQsRUFIVSxFQUlWLEVBQUVOLE1BQU0sTUFBUixFQUFnQkMsUUFBUSxDQUFDLEVBQUQsRUFBSSxFQUFKLEVBQU8sRUFBUCxFQUFVLEVBQVYsRUFBYSxFQUFiLEVBQWdCLEVBQWhCLEVBQW1CLEVBQW5CLEVBQXNCLEVBQXRCLEVBQXlCLEVBQXpCLEVBQTRCLEVBQTVCLEVBQStCLEVBQS9CLEVBQWtDLEVBQWxDLEVBQXFDLEVBQXJDLEVBQXdDLEVBQXhDLEVBQTJDLEVBQTNDLEVBQThDLEVBQTlDLENBQXhCLEVBQTJFSSxLQUFLLEVBQWhGLEVBQW9GQyxNQUFNLEtBQTFGLEVBSlUsRUFLVixFQUFFTixNQUFNLE1BQVIsRUFBZ0JDLFFBQVEsQ0FBQyxFQUFELEVBQUksRUFBSixFQUFPLEVBQVAsRUFBVSxFQUFWLEVBQWEsRUFBYixFQUFnQixFQUFoQixFQUFtQixFQUFuQixFQUFzQixFQUF0QixFQUF5QixFQUF6QixFQUE0QixFQUE1QixFQUErQixFQUEvQixFQUFrQyxFQUFsQyxFQUFxQyxFQUFyQyxFQUF3QyxFQUF4QyxFQUEyQyxFQUEzQyxFQUE4QyxFQUE5QyxFQUFpRCxFQUFqRCxFQUFvRCxFQUFwRCxFQUF1RCxFQUF2RCxFQUEwRCxFQUExRCxFQUE2RCxFQUE3RCxFQUFnRSxFQUFoRSxFQUFtRSxFQUFuRSxFQUFzRSxFQUF0RSxFQUF5RSxFQUF6RSxFQUE0RSxFQUE1RSxFQUErRSxFQUEvRSxFQUFrRixFQUFsRixFQUFxRixFQUFyRixFQUF3RixFQUF4RixFQUEyRixFQUEzRixFQUE4RixFQUE5RixFQUFpRyxFQUFqRyxFQUFvRyxFQUFwRyxFQUF1RyxFQUF2RyxFQUEwRyxFQUExRyxFQUE2RyxFQUE3RyxFQUFnSCxFQUFoSCxFQUFtSCxFQUFuSCxFQUFzSCxFQUF0SCxFQUF5SCxFQUF6SCxFQUE0SCxFQUE1SCxFQUErSCxFQUEvSCxFQUFrSSxJQUFsSSxFQUF1SSxJQUF2SSxFQUE0SSxJQUE1SSxFQUFpSixJQUFqSixFQUFzSixJQUF0SixFQUEySixJQUEzSixDQUF4QixFQUEwTEksS0FBSyxDQUEvTCxFQUFrTUMsTUFBTSxJQUF4TSxFQUxVLEVBTVYsRUFBRU4sTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsRUFBRCxDQUF4QixFQUE4QkksS0FBSyxFQUFuQyxFQUF1Q0MsTUFBTSxJQUE3QyxFQU5VLEVBT1YsRUFBRU4sTUFBTSxNQUFSLEVBQWdCQyxRQUFRLENBQUMsRUFBRCxDQUF4QixFQUE4QkksS0FBSyxFQUFuQyxFQUF1Q0MsTUFBTSxJQUE3QyxFQVBVLEVBUVYsRUFBRU4sTUFBTSxLQUFSLEVBQWVDLFFBQVEsQ0FBQyxFQUFELENBQXZCLEVBQTZCSSxLQUFLLEVBQWxDLEVBQXNDQyxNQUFNLEtBQTVDLEVBUlUsRUFTVixFQUFFTixNQUFNLE9BQVIsRUFBaUJDLFFBQVEsQ0FBQyxFQUFELEVBQUksSUFBSixFQUFTLElBQVQsRUFBYyxFQUFkLEVBQWlCLEVBQWpCLENBQXpCLEVBQStDSSxLQUFLLEVBQXBELEVBQXdEQyxNQUFNLEtBQTlELEVBVFU7QUFIMEMsS0FBNUMsQ0FBZDs7QUFnQkE7QUFDQSxTQUFLcUQsS0FBTCxHQUFhLGlCQUFPLEtBQUtoRixJQUFaLEVBQWtCLEdBQWxCLEVBQXVCLEdBQXZCLEVBQTRCLE1BQTVCLENBQWI7QUFDQSxTQUFLZ0YsS0FBTCxDQUFXakUsSUFBWCxDQUFnQjRCLFFBQWhCLENBQXlCMUMsQ0FBekIsR0FBNkJxRyxLQUFLQyxNQUFMLEtBQWlCLENBQUMsRUFBbEIsR0FBd0IsRUFBckQ7O0FBRUEsU0FBS3ZHLElBQUwsQ0FBVXdHLE1BQVYsQ0FBaUJDLE1BQWpCLENBQXdCLEtBQUsxQixNQUE3Qjs7QUFFQTtBQUNBLFNBQUtGLElBQUwsR0FBWSxLQUFLN0UsSUFBTCxDQUFVMEcsS0FBVixDQUFnQkMsUUFBaEIsQ0FBeUJDLGdCQUF6QixFQUFaO0FBQ0EsU0FBSy9CLElBQUwsQ0FBVWdDLEtBQVYsR0FBa0IsS0FBSzdHLElBQUwsQ0FBVTBHLEtBQVYsQ0FBZ0JDLFFBQWhCLENBQXlCRyxNQUF6QixDQUFnQ3BHLE9BQU9xRyxRQUFQLENBQWdCQyxRQUFoRCxDQUFsQjs7QUFFQTtBQUNBLFNBQUtDLElBQUwsR0FBWSxLQUFLakgsSUFBTCxDQUFVTSxHQUFWLENBQWM0RyxJQUFkLENBQ1IsR0FEUSxFQUVSLENBRlEsRUFHUixXQUFXLEtBQUtuQyxNQUFMLENBQVl4QyxXQUFaLENBQXdCNkIsSUFIM0IsRUFJUixFQUFFK0MsTUFBTSxjQUFSLEVBQXdCQyxNQUFNLE1BQTlCLEVBQXNDQyxPQUFPLFFBQTdDLEVBSlEsQ0FBWjtBQU1BckYsU0FBS0MsT0FBTCxDQUFhLEtBQUs4QyxNQUFMLENBQVl4QyxXQUF6QixFQUFzQyxrQkFBVTtBQUM1QyxjQUFLMEUsSUFBTCxDQUFVSyxPQUFWLENBQWtCLFdBQVcsTUFBS3ZDLE1BQUwsQ0FBWXhDLFdBQVosQ0FBd0I2QixJQUFyRDtBQUNILEtBRkQ7QUFHSDs7a0JBRWNnQixNOzs7Ozs7Ozs7Ozs7QUN6RWYsU0FBU0MsTUFBVCxHQUFpQjtBQUFBOztBQUNiO0FBQ0E7QUFDQSxTQUFLckYsSUFBTCxDQUFVdUgsS0FBVixDQUFnQkwsSUFBaEIsQ0FBcUIsS0FBS2xILElBQUwsQ0FBVW9ELElBQVYsQ0FBZTFCLEdBQXBDLEVBQXlDLENBQXpDLEVBQTRDLEVBQTVDOztBQUVBO0FBQ0E4RixlQUFXQyxJQUFYLENBQWdCLElBQWhCOztBQUVBO0FBQ0EsU0FBS3pILElBQUwsQ0FBVVEsT0FBVixDQUFrQmtILE1BQWxCLENBQXlCQyxPQUF6QixDQUFpQyxLQUFLNUMsTUFBdEMsRUFBOEMsS0FBS0MsS0FBbkQsRUFBMEQsVUFBQ0QsTUFBRCxFQUFTQyxLQUFULEVBQW1CO0FBQ3pFLFlBQUcsQ0FBQyxNQUFLRCxNQUFMLENBQVk2QyxTQUFiLElBQTBCLENBQUMsTUFBSzdDLE1BQUwsQ0FBWThDLFNBQTFDLEVBQW9EO0FBQ2hELGtCQUFLOUMsTUFBTCxDQUFZMUMsV0FBWixDQUF3QjtBQUNwQitCLHNCQUFNLE1BQUtXLE1BQUwsQ0FBWXhDLFdBQVosQ0FBd0I2QixJQUF4QixHQUErQixDQURqQjtBQUVwQlIsc0JBQU0sTUFBSzVELElBQUwsQ0FBVW9ELElBQVYsQ0FBZUMsR0FBZixHQUFxQjtBQUZQLGFBQXhCO0FBSUEsa0JBQUswQixNQUFMLENBQVkrQyxJQUFaLENBQWlCOUMsTUFBTWpFLElBQU4sQ0FBV2lDLFFBQTVCO0FBQ0g7QUFDSixLQVJEO0FBU0g7O0FBRUQsU0FBU3dFLFVBQVQsR0FBcUI7QUFDakI7QUFDQSxRQUFHLEtBQUt6QyxNQUFMLENBQVk4QyxTQUFmLEVBQXlCO0FBQ3JCLGFBQUs5QyxNQUFMLENBQVkxRSxVQUFaLENBQXVCMEgsSUFBdkIsQ0FBNEIsTUFBNUI7QUFDQTtBQUNIOztBQUVEO0FBQ0EsUUFBRyxLQUFLbEQsSUFBTCxDQUFVbkIsSUFBVixDQUFlc0UsTUFBbEIsRUFBeUI7QUFDckIsYUFBS2pELE1BQUwsQ0FBWWhDLFFBQVo7QUFDQSxhQUFLZ0MsTUFBTCxDQUFZMUUsVUFBWixDQUF1QjBILElBQXZCLENBQTRCLE1BQTVCO0FBQ0gsS0FIRCxNQUdPLElBQUcsS0FBS2xELElBQUwsQ0FBVWxCLEtBQVYsQ0FBZ0JxRSxNQUFuQixFQUEwQjtBQUM3QixhQUFLakQsTUFBTCxDQUFZakMsU0FBWjtBQUNBLGFBQUtpQyxNQUFMLENBQVkxRSxVQUFaLENBQXVCMEgsSUFBdkIsQ0FBNEIsTUFBNUI7QUFDSCxLQUhNLE1BR0E7QUFDSCxhQUFLaEQsTUFBTCxDQUFZa0QsSUFBWjtBQUNBLGFBQUtsRCxNQUFMLENBQVkxRSxVQUFaLENBQXVCMEgsSUFBdkIsQ0FBNEIsTUFBNUI7QUFDSDs7QUFFRDtBQUNBLFFBQUcsS0FBS2xELElBQUwsQ0FBVXFELEVBQVYsQ0FBYUYsTUFBaEIsRUFBdUI7QUFDbkIsYUFBS2pELE1BQUwsQ0FBWW9ELElBQVo7QUFDQSxhQUFLcEQsTUFBTCxDQUFZMUUsVUFBWixDQUF1QjBILElBQXZCLENBQTRCLE1BQTVCO0FBQ0g7O0FBRUQ7QUFDQSxRQUFHLEtBQUtsRCxJQUFMLENBQVVnQyxLQUFWLENBQWdCbUIsTUFBbkIsRUFBMEI7QUFDdEIsWUFBRyxLQUFLakQsTUFBTCxDQUFZeEMsV0FBWixDQUF3QmlCLEtBQXhCLEdBQWdDLEtBQUt4RCxJQUFMLENBQVVvRCxJQUFWLENBQWVDLEdBQS9DLElBQXNELEtBQUswQixNQUFMLENBQVl4QyxXQUFaLENBQXdCZ0IsR0FBeEIsR0FBOEIsS0FBS3ZELElBQUwsQ0FBVW9ELElBQVYsQ0FBZUMsR0FBdEcsRUFBMEc7QUFDdEcsaUJBQUswQixNQUFMLENBQVl4QixHQUFaO0FBQ0EsaUJBQUt3QixNQUFMLENBQVkxRSxVQUFaLENBQXVCMEgsSUFBdkIsQ0FBNEIsS0FBNUI7QUFDSDtBQUNKO0FBQ0o7O2tCQUVjMUMsTSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0NDJhOThkYzhlMjlkYjQ5NGJkMiIsImNsYXNzIEV4dGVuZGVkU3ByaXRlIGV4dGVuZHMgUGhhc2VyLlNwcml0ZXtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHMgfHwgeyBhbmltYXRpb25zOiBbXSB9O1xyXG4gICAgICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xyXG4gICAgICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdyYXZpdHkueSA9IDUwMDtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5hbmltYXRpb25zLmZvckVhY2goYW5pbWF0aW9uID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLmFkZChcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5uYW1lLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZyYW1lcy5tYXAoZnJhbWUgPT4gZnJhbWUudG9TdHJpbmcoKSksXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24uZnBzLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmxvb3BcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZ2FtZVN0YXRlID0gdGhpcy5nYW1lLnN0YXRlLnN0YXRlc1t0aGlzLmdhbWUuc3RhdGUuY3VycmVudF0uZ2FtZVN0YXRlO1xyXG5cclxuICAgICAgICBtb2J4Lm9ic2VydmUoZ2FtZVN0YXRlLCAoY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UnLCBjaGFuZ2UsIGdhbWVTdGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUgPSBtb2J4LmFjdGlvbigoY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuc3ByaXRlU3RhdGUsIGNoYW5nZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzSGl0dGluZygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwcml0ZVN0YXRlLmhpdCA+IHRoaXMuZ2FtZS50aW1lLm5vdztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNTdHVubmVkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlU3RhdGUuc3R1biA+IHRoaXMuZ2FtZS50aW1lLm5vdztcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlTGVmdCgpe1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IC0xO1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS52ZWxvY2l0eS54ID4gLXRoaXMucHJvcHMubWF4U3BlZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAtPSB0aGlzLnByb3BzLmFjY2VsZXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVJpZ2h0KCl7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gMTtcclxuICAgICAgICBpZih0aGlzLmJvZHkudmVsb2NpdHkueCA8IHRoaXMucHJvcHMubWF4U3BlZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCArPSB0aGlzLnByb3BzLmFjY2VsZXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuc2NhbGUueCA9PT0gMSl7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVJpZ2h0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlTGVmdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdG9wKCl7XHJcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggLz0gMS4xO1xyXG4gICAgfVxyXG5cclxuICAgIGp1bXAoKXtcclxuICAgICAgICBpZih0aGlzLmJvZHkudG91Y2hpbmcuZG93biB8fCB0aGlzLmJvZHkuYmxvY2tlZC5kb3duKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgLT0gMzAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoaXQoKXtcclxuICAgICAgICBjb25zdCBoaXRVbnRpbCA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDkwMCxcclxuICAgICAgICAgICAgYnJlYWtVbnRpbCA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDEwMDA7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ05vdyAlcyBIaXQgJXMgQnJlYWsgJXMnLCB0aGlzLmdhbWUudGltZS5ub3csIGhpdFVudGlsLCBicmVha1VudGlsKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgICAgICAgaGl0OiBoaXRVbnRpbCxcclxuICAgICAgICAgICAgbm9oaXQ6IGJyZWFrVW50aWxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBodXJ0KGRpcmVjdGlvbil7XHJcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgLT0gMTAwO1xyXG4gICAgICAgIGlmKGRpcmVjdGlvbiAmJiBkaXJlY3Rpb24ubGVmdCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC09IDEwMCB8fCB0aGlzLnByb3BzLm1heFNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkaXJlY3Rpb24gJiYgZGlyZWN0aW9uLnJpZ2h0KXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggKz0gMTAwIHx8IHRoaXMucHJvcHMubWF4U3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ1tTcHJpdGVdIHN0YXRlJyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHRlbmRlZFNwcml0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0V4dGVuZGVkU3ByaXRlLmpzIiwiY29uc3QgZ2FtZUNvbmZpZyA9IHtcclxuICAgIHdpZHRoOiA1NDYsXHJcbiAgICBoZWlnaHQ6IDM2OCxcclxuICAgIGRvbUVsZW1lbnQ6ICdnYW1lJ1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZUNvbmZpZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lY29uZmlnLmpzIiwiaW1wb3J0IEV4dGVuZGVkU3ByaXRlIGZyb20gJy4vRXh0ZW5kZWRTcHJpdGUnO1xyXG5cclxuY2xhc3MgQUkgZXh0ZW5kcyBFeHRlbmRlZFNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGxpZmU6IDEwLFxyXG4gICAgICAgICAgICBzdHVuOiAwLFxyXG4gICAgICAgICAgICBoaXQ6IDAsXHJcbiAgICAgICAgICAgIG5vaGl0OiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFJO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvQUkuanMiLCJpbXBvcnQgRXh0ZW5kZWRTcHJpdGUgZnJvbSAnLi9FeHRlbmRlZFNwcml0ZSc7XHJcblxyXG5jbGFzcyBIdW1hbiBleHRlbmRzIEV4dGVuZGVkU3ByaXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gbW9ieC5vYnNlcnZhYmxlKHtcclxuICAgICAgICAgICAgbGlmZTogMTAsXHJcbiAgICAgICAgICAgIHN0dW46IDAsXHJcbiAgICAgICAgICAgIGhpdDogMCxcclxuICAgICAgICAgICAgbm9oaXQ6IDBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSHVtYW47XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9IdW1hbi5qcyIsImltcG9ydCBnYW1lQ29uZmlnIGZyb20gJy4vZ2FtZWNvbmZpZy5qcyc7XHJcbmltcG9ydCBQbGF5IGZyb20gJy4vZ2FtZXN0YXRlcy9wbGF5L2luZGV4LmpzJztcclxuXHJcbi8vIGluc3RhbnRpYXRlIGEgUGhhc2VyLkdhbWVcclxuY29uc3QgUExBVEZPUk1FUiA9IG5ldyBQaGFzZXIuR2FtZShcclxuICAgIGdhbWVDb25maWcud2lkdGgsXHJcbiAgICBnYW1lQ29uZmlnLmhlaWdodCxcclxuICAgIFBoYXNlci5BVVRPLFxyXG4gICAgZ2FtZUNvbmZpZy5kb21FbGVtZW50XHJcbik7XHJcblxyXG4vLyByZWdpc3RlciBnYW1lc3RhdGVzICh3aWxsIGJlIGluc3RhbnRpYXRlZCB3LyB0aGlzLmdhbWUgYXMgMXN0IHBhcmFtLCBwYXNzIGdhbWVDb25maWcgYXMgMm5kKVxyXG5QTEFURk9STUVSLnN0YXRlLmFkZCgnUGxheScsIFBsYXkuYmluZChudWxsLCBnYW1lQ29uZmlnKSk7XHJcblxyXG4vLyBraWNrIG9mZiBmaXJzdCBnYW1lc3RhdGU6IE1lbnVcclxuUExBVEZPUk1FUi5zdGF0ZS5zdGFydCgnUGxheScsIHRydWUsIHRydWUsIHtcclxuICAgIGluaXRpYWxTdGF0ZTogJ3NvbWUgaW5pdGlhbCBzdGF0ZSdcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvaW5kZXguanMiLCJpbXBvcnQgQUkgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9BSSc7XG5pbXBvcnQgSHVtYW4gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9IdW1hbic7XG5cbmltcG9ydCBpbml0IGZyb20gJy4vcGxheS5pbml0JztcbmltcG9ydCBwcmVsb2FkIGZyb20gJy4vcGxheS5wcmVsb2FkJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLi9wbGF5LmNyZWF0ZSc7XG5pbXBvcnQgdXBkYXRlIGZyb20gJy4vcGxheS51cGRhdGUnO1xuXHJcbmNsYXNzIEdhbWVTdGF0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lQ29uZmlnID0gZ2FtZUNvbmZpZztcclxuICAgICAgICB0aGlzLmtleXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5lbmVteSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICB9XHJcbn1cblxuR2FtZVN0YXRlLnByb3RvdHlwZS5pbml0ID0gaW5pdDtcbkdhbWVTdGF0ZS5wcm90b3R5cGUucHJlbG9hZCA9IHByZWxvYWQ7XHJcbkdhbWVTdGF0ZS5wcm90b3R5cGUuY3JlYXRlID0gY3JlYXRlO1xyXG5HYW1lU3RhdGUucHJvdG90eXBlLnVwZGF0ZSA9IHVwZGF0ZTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZVN0YXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9pbmRleC5qcyIsImZ1bmN0aW9uIGluaXQoY29uZmlncyl7XHJcbiAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtJbml0XScsIGNvbmZpZ3MpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkvcGxheS5pbml0LmpzIiwiZnVuY3Rpb24gcHJlbG9hZCgpe1xyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bUHJlbG9hZF0nKTtcclxuICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKCdwbGF5ZXInLCAnbWFuLnBuZycpO1xyXG4gICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ2Rpbm8nLCAnZGluby5wbmcnKTtcclxuICAgIHRoaXMuZ2FtZS5sb2FkLmF0bGFzKFxyXG4gICAgICAgICdwcmUyYXRsYXMnLFxyXG4gICAgICAgICdwcmUyYXRsYXMucG5nJyxcclxuICAgICAgICAncHJlMmF0bGFzLmpzb24nLFxyXG4gICAgICAgIFBoYXNlci5Mb2FkZXIuVEVYVFVSRV9BVExBU19KU09OX0hBU0hcclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmVsb2FkO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnByZWxvYWQuanMiLCJpbXBvcnQgSHVtYW4gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9IdW1hbic7XHJcbmltcG9ydCBBSSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0FJJztcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZSgpe1xyXG4gICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bQ3JlYXRlXScpO1xyXG4gICAgLy8gZnBzIGRlYnVnZ2luZ1xyXG4gICAgdGhpcy5nYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xyXG5cclxuICAgIC8vIFtTRVQgTEVWRUxdIHNldCBkaW1lbnNpb25zLCBzdGFydCBwaHlzaWMgc3lzdGVtXHJcbiAgICB0aGlzLmdhbWUud29ybGQuc2V0Qm91bmRzKFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgMCxcclxuICAgICAgICB0aGlzLmdhbWVDb25maWcud2lkdGgsXHJcbiAgICAgICAgdGhpcy5nYW1lQ29uZmlnLmhlaWdodFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgdGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmJztcclxuXHJcbiAgICB0aGlzLmdhbWVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgaW5pdGlhbGlzZWQ6IGZhbHNlLFxyXG4gICAgICAgIHNjb3JlOiAwXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gT2JqZWN0LmFzc2lnbih0aGlzLmdhbWVTdGF0ZSwgY2hhbmdlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1vYngub2JzZXJ2ZSh0aGlzLmdhbWVTdGF0ZSwgY2hhbmdlID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnW2dhbWVTdGF0ZV0gY2hhbmdlJywgY2hhbmdlLCB0aGlzLmdhbWVTdGF0ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHsgaW5pdGlhbGlzZWQ6IHRydWUgfSk7XHJcblxyXG4gICAgLy8gW1BMQVlFUl1cclxuICAgIHRoaXMucGxheWVyID0gbmV3IEh1bWFuKHRoaXMuZ2FtZSwgMjAwLCAyMDAsICdwcmUyYXRsYXMnLCB7XHJcbiAgICAgICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgICAgICBtYXhTcGVlZDogMjAwLFxyXG4gICAgICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgICAgIHsgbmFtZTogJ21vdmUnLCBmcmFtZXM6IFsxMSwnMDMnLCcwNScsMTQsMjBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICAgICAgeyBuYW1lOiAnaGl0JywgZnJhbWVzOiBbMjIsMjQsMjgsMzEsMzQsMjIsMjQsMjgsMzEsMzRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgICAgICB7IG5hbWU6ICdzdG9wJywgZnJhbWVzOiBbNDIsNDUsNDksNTJdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICAgICAgeyBuYW1lOiAnanVtcCcsIGZyYW1lczogWzE2LDQxLDQ3LDUwLDUwLDUwLDUwLDUwLDUwLDUwLDUwLDEzLDUwLDEzLDUwLDEzXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFsyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNywyNywyNywyNywyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwzMCwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNywzMCwyNywzMCwzNSwzNiwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwnMDcnLCcwNycsJzA3JywnMDcnLCcwMicsJzAyJ10sIGZwczogNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICAgICAgeyBuYW1lOiAnaHVydCcsIGZyYW1lczogWzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICAgICAgeyBuYW1lOiAnc3R1bicsIGZyYW1lczogWzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMTldLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFsxMSwnMDMnLCcwNScsMTQsMjBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9XHJcbiAgICAgICAgXVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gW0VORU1ZXVxyXG4gICAgdGhpcy5lbmVteSA9IG5ldyBBSSh0aGlzLmdhbWUsIDQwMCwgMjAwLCAnZGlubycpO1xyXG4gICAgdGhpcy5lbmVteS5ib2R5LnZlbG9jaXR5LnggPSBNYXRoLnJhbmRvbSgpICogKC0xMCkgLSAxMDtcclxuXHJcbiAgICB0aGlzLmdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XHJcblxyXG4gICAgLy8gYmluZCBrZXlzXHJcbiAgICB0aGlzLmtleXMgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xyXG4gICAgdGhpcy5rZXlzLnNwYWNlID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpO1xyXG5cclxuICAgIC8vIHNjb3JlIHRleHRcclxuICAgIHRoaXMubWVudSA9IHRoaXMuZ2FtZS5hZGQudGV4dChcclxuICAgICAgICAxNTAsXHJcbiAgICAgICAgMCxcclxuICAgICAgICBcIkxpZmU6IFwiICsgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSxcclxuICAgICAgICB7IGZvbnQ6IFwiMjRweCBDb3VyaWVyXCIsIGZpbGw6IFwiIzAwMFwiLCBhbGlnbjogXCJjZW50ZXJcIiB9XHJcbiAgICApO1xyXG4gICAgbW9ieC5vYnNlcnZlKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgIHRoaXMubWVudS5zZXRUZXh0KFwiTGlmZTogXCIgKyB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LmNyZWF0ZS5qcyIsImZ1bmN0aW9uIHVwZGF0ZSgpe1xyXG4gICAgLy9jb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtVcGRhdGVdJyk7XHJcbiAgICAvLyBmcHNcclxuICAgIHRoaXMuZ2FtZS5kZWJ1Zy50ZXh0KHRoaXMuZ2FtZS50aW1lLmZwcywgNSwgMjApO1xyXG5cclxuICAgIC8vIG1vdmVcclxuICAgIG9uS2V5UHJlc3MuY2FsbCh0aGlzKTtcclxuXHJcbiAgICAvLyBjb2xsaWRlXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLnBsYXllciwgdGhpcy5lbmVteSwgKHBsYXllciwgZW5lbXkpID0+IHtcclxuICAgICAgICBpZighdGhpcy5wbGF5ZXIuaXNIaXR0aW5nICYmICF0aGlzLnBsYXllci5pc1N0dW5uZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBsaWZlOiB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlIC0gMSxcclxuICAgICAgICAgICAgICAgIHN0dW46IHRoaXMuZ2FtZS50aW1lLm5vdyArIDE1MDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmh1cnQoZW5lbXkuYm9keS50b3VjaGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uS2V5UHJlc3MoKXtcclxuICAgIC8vIHN0dW4gPT4gYmxvY2tlZFxyXG4gICAgaWYodGhpcy5wbGF5ZXIuaXNTdHVubmVkKXtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3N0dW4nKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbW92ZSBsZWZ0IC8gcmlnaHRcclxuICAgIGlmKHRoaXMua2V5cy5sZWZ0LmlzRG93bil7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZUxlZnQoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgIH0gZWxzZSBpZih0aGlzLmtleXMucmlnaHQuaXNEb3duKXtcclxuICAgICAgICB0aGlzLnBsYXllci5tb3ZlUmlnaHQoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnaWRsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGp1bXBcclxuICAgIGlmKHRoaXMua2V5cy51cC5pc0Rvd24pe1xyXG4gICAgICAgIHRoaXMucGxheWVyLmp1bXAoKTtcclxuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2p1bXAnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBoaXRcclxuICAgIGlmKHRoaXMua2V5cy5zcGFjZS5pc0Rvd24pe1xyXG4gICAgICAgIGlmKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLm5vaGl0IDwgdGhpcy5nYW1lLnRpbWUubm93ICYmIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmhpdCA8IHRoaXMuZ2FtZS50aW1lLm5vdyl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmhpdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2hpdCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS9wbGF5LnVwZGF0ZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=