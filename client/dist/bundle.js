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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AI = __webpack_require__(3);

var _AI2 = _interopRequireDefault(_AI);

var _Human = __webpack_require__(4);

var _Human2 = _interopRequireDefault(_Human);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameState = function () {
    function GameState(gameConfig) {
        _classCallCheck(this, GameState);

        this.gameConfig = gameConfig;
        this.keys = undefined;
        this.player = undefined;
        this.enemy = undefined;
        this.gameState = undefined;
    }

    _createClass(GameState, [{
        key: 'init',
        value: function init(configs) {
            console.log('[PHASER][Component][Init]', configs);
        }
    }, {
        key: 'preload',
        value: function preload() {
            console.log('[PHASER][Component][Preload]');
            this.game.load.image('player', 'man.png');
            this.game.load.image('dino', 'dino.png');
            this.game.load.atlas('pre2atlas', 'pre2atlas.png', 'pre2atlas.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        }
    }, {
        key: 'create',
        value: function create() {
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
        }
    }, {
        key: 'update',
        value: function update() {
            var _this2 = this;

            //console.log('[PHASER][Component][Update]');
            // fps
            this.game.debug.text(this.game.time.fps, 5, 20);

            // move
            this.onKeyPress();

            // collide
            this.game.physics.arcade.overlap(this.player, this.enemy, function (player, enemy) {
                if (!_this2.player.isHitting && !_this2.player.isStunned) {
                    _this2.player.updateState({
                        life: _this2.player.spriteState.life - 1,
                        stun: _this2.game.time.now + 1500
                    });
                    _this2.player.hurt(enemy.body.touching);
                }
            });
        }
    }, {
        key: 'onKeyPress',
        value: function onKeyPress() {
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
    }]);

    return GameState;
}();

module.exports = GameState;

/***/ }),
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

        var _this = _possibleConstructorReturn(this, (AI.__proto__ || Object.getPrototypeOf(AI)).call(this, game, x, y, sprite));

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

        var _this = _possibleConstructorReturn(this, (Human.__proto__ || Object.getPrototypeOf(Human)).call(this, game, x, y, sprite));

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

var _play = __webpack_require__(2);

var _play2 = _interopRequireDefault(_play);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// instantiate a Phaser.Game
var PLATFORMER = new Phaser.Game(_gameconfig2.default.width, _gameconfig2.default.height, Phaser.AUTO, _gameconfig2.default.domElement);

// register gamestates (will be instantiated w/ this.game as 1st param, pass gameConfig as 2nd)
PLATFORMER.state.add('Play', _play2.default.bind(null, _gameconfig2.default));

// kick off first gamestate: Menu
PLATFORMER.state.start('Play', true, true, {
    initialState: 'some initial state'
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjU2ZTVhNWVmMDg2YTQ5YjVmZjciLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0V4dGVuZGVkU3ByaXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZWNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvQUkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9jb21wb25lbnRzL0h1bWFuLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiRXh0ZW5kZWRTcHJpdGUiLCJnYW1lIiwieCIsInkiLCJzcHJpdGUiLCJwcm9wcyIsImFuaW1hdGlvbnMiLCJhZGQiLCJleGlzdGluZyIsInBoeXNpY3MiLCJlbmFibGUiLCJQaGFzZXIiLCJQaHlzaWNzIiwiQVJDQURFIiwiYW5jaG9yIiwic2V0VG8iLCJib2R5IiwiY29sbGlkZVdvcmxkQm91bmRzIiwiY2hlY2tXb3JsZEJvdW5kcyIsImdyYXZpdHkiLCJmb3JFYWNoIiwiYW5pbWF0aW9uIiwibmFtZSIsImZyYW1lcyIsIm1hcCIsImZyYW1lIiwidG9TdHJpbmciLCJmcHMiLCJsb29wIiwiZ2FtZVN0YXRlIiwic3RhdGUiLCJzdGF0ZXMiLCJjdXJyZW50IiwibW9ieCIsIm9ic2VydmUiLCJjaGFuZ2UiLCJjb25zb2xlIiwibG9nIiwidXBkYXRlU3RhdGUiLCJhY3Rpb24iLCJzcHJpdGVTdGF0ZSIsIk9iamVjdCIsImFzc2lnbiIsInNjYWxlIiwidmVsb2NpdHkiLCJtYXhTcGVlZCIsImFjY2VsZXJhdGlvbiIsIm1vdmVSaWdodCIsIm1vdmVMZWZ0IiwidG91Y2hpbmciLCJkb3duIiwiYmxvY2tlZCIsImhpdFVudGlsIiwidGltZSIsIm5vdyIsImJyZWFrVW50aWwiLCJoaXQiLCJub2hpdCIsImRpcmVjdGlvbiIsImxlZnQiLCJyaWdodCIsInN0dW4iLCJTcHJpdGUiLCJnYW1lQ29uZmlnIiwid2lkdGgiLCJoZWlnaHQiLCJkb21FbGVtZW50IiwiR2FtZVN0YXRlIiwia2V5cyIsInVuZGVmaW5lZCIsInBsYXllciIsImVuZW15IiwiY29uZmlncyIsImxvYWQiLCJpbWFnZSIsImF0bGFzIiwiTG9hZGVyIiwiVEVYVFVSRV9BVExBU19KU09OX0hBU0giLCJhZHZhbmNlZFRpbWluZyIsIndvcmxkIiwic2V0Qm91bmRzIiwic3RhcnRTeXN0ZW0iLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsIm9ic2VydmFibGUiLCJpbml0aWFsaXNlZCIsInNjb3JlIiwiTWF0aCIsInJhbmRvbSIsImNhbWVyYSIsImZvbGxvdyIsImlucHV0Iiwia2V5Ym9hcmQiLCJjcmVhdGVDdXJzb3JLZXlzIiwic3BhY2UiLCJhZGRLZXkiLCJLZXlib2FyZCIsIlNQQUNFQkFSIiwibWVudSIsInRleHQiLCJsaWZlIiwiZm9udCIsImZpbGwiLCJhbGlnbiIsInNldFRleHQiLCJkZWJ1ZyIsIm9uS2V5UHJlc3MiLCJhcmNhZGUiLCJvdmVybGFwIiwiaXNIaXR0aW5nIiwiaXNTdHVubmVkIiwiaHVydCIsInBsYXkiLCJpc0Rvd24iLCJzdG9wIiwidXAiLCJqdW1wIiwibW9kdWxlIiwiZXhwb3J0cyIsIkFJIiwiSHVtYW4iLCJQTEFURk9STUVSIiwiR2FtZSIsIkFVVE8iLCJiaW5kIiwic3RhcnQiLCJpbml0aWFsU3RhdGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7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QWdCO0FBQy9CZ0Isa0JBQU0sRUFEeUI7QUFFL0J2QyxrQkFBTSxDQUZ5QjtBQUcvQkwsaUJBQUssQ0FIMEI7QUFJL0JDLG1CQUFPO0FBSndCLFNBQWhCLENBQW5CO0FBSGtDO0FBU3JDOzs7OztrQkFHVThELEU7Ozs7Ozs7Ozs7Ozs7QUNmZjs7Ozs7Ozs7Ozs7O0lBRU1DLEs7OztBQUNGLG1CQUFZdkgsSUFBWixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCQyxNQUF4QixFQUFnQ0MsS0FBaEMsRUFBc0M7QUFBQTs7QUFBQSxrSEFDNUJKLElBRDRCLEVBQ3RCQyxDQURzQixFQUNuQkMsQ0FEbUIsRUFDaEJDLE1BRGdCOztBQUdsQyxjQUFLb0MsV0FBTCxHQUFtQlAsS0FBS21ELFVBQUwsQ0FBZ0I7QUFDL0JnQixrQkFBTSxFQUR5QjtBQUUvQnZDLGtCQUFNLENBRnlCO0FBRy9CTCxpQkFBSyxDQUgwQjtBQUkvQkMsbUJBQU87QUFKd0IsU0FBaEIsQ0FBbkI7QUFIa0M7QUFTckM7Ozs7O2tCQUdVK0QsSzs7Ozs7Ozs7O0FDZmY7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDQSxJQUFNQyxhQUFhLElBQUk5RyxPQUFPK0csSUFBWCxDQUNmLHFCQUFXMUQsS0FESSxFQUVmLHFCQUFXQyxNQUZJLEVBR2Z0RCxPQUFPZ0gsSUFIUSxFQUlmLHFCQUFXekQsVUFKSSxDQUFuQjs7QUFPQTtBQUNBdUQsV0FBVzNGLEtBQVgsQ0FBaUJ2QixHQUFqQixDQUFxQixNQUFyQixFQUE2QixlQUFLcUgsSUFBTCxDQUFVLElBQVYsdUJBQTdCOztBQUVBO0FBQ0FILFdBQVczRixLQUFYLENBQWlCK0YsS0FBakIsQ0FBdUIsTUFBdkIsRUFBK0IsSUFBL0IsRUFBcUMsSUFBckMsRUFBMkM7QUFDdkNDLGtCQUFjO0FBRHlCLENBQTNDLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZjU2ZTVhNWVmMDg2YTQ5YjVmZjciLCJjbGFzcyBFeHRlbmRlZFNwcml0ZSBleHRlbmRzIFBoYXNlci5TcHJpdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzIHx8IHsgYW5pbWF0aW9uczogW10gfTtcclxuICAgICAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcclxuICAgICAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYm9keS5ncmF2aXR5LnkgPSA1MDA7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcHMuYW5pbWF0aW9ucy5mb3JFYWNoKGFuaW1hdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ubmFtZSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcmFtZXMubWFwKGZyYW1lID0+IGZyYW1lLnRvU3RyaW5nKCkpLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZwcyxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5sb29wXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdhbWVTdGF0ZSA9IHRoaXMuZ2FtZS5zdGF0ZS5zdGF0ZXNbdGhpcy5nYW1lLnN0YXRlLmN1cnJlbnRdLmdhbWVTdGF0ZTtcclxuXHJcbiAgICAgICAgbW9ieC5vYnNlcnZlKGdhbWVTdGF0ZSwgKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlJywgY2hhbmdlLCBnYW1lU3RhdGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gT2JqZWN0LmFzc2lnbih0aGlzLnNwcml0ZVN0YXRlLCBjaGFuZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0hpdHRpbmcoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcHJpdGVTdGF0ZS5oaXQgPiB0aGlzLmdhbWUudGltZS5ub3c7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzU3R1bm5lZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwcml0ZVN0YXRlLnN0dW4gPiB0aGlzLmdhbWUudGltZS5ub3c7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUxlZnQoKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSAtMTtcclxuICAgICAgICBpZih0aGlzLmJvZHkudmVsb2NpdHkueCA+IC10aGlzLnByb3BzLm1heFNwZWVkKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggLT0gdGhpcy5wcm9wcy5hY2NlbGVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVSaWdodCgpe1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IDE7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnZlbG9jaXR5LnggPCB0aGlzLnByb3BzLm1heFNwZWVkKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggKz0gdGhpcy5wcm9wcy5hY2NlbGVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmUoKXtcclxuICAgICAgICBpZih0aGlzLnNjYWxlLnggPT09IDEpe1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVSaWdodCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUxlZnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcCgpe1xyXG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC89IDEuMTtcclxuICAgIH1cclxuXHJcbiAgICBqdW1wKCl7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnRvdWNoaW5nLmRvd24gfHwgdGhpcy5ib2R5LmJsb2NrZWQuZG93bil7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55IC09IDMwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGl0KCl7XHJcbiAgICAgICAgY29uc3QgaGl0VW50aWwgPSB0aGlzLmdhbWUudGltZS5ub3cgKyA5MDAsXHJcbiAgICAgICAgICAgIGJyZWFrVW50aWwgPSB0aGlzLmdhbWUudGltZS5ub3cgKyAxMDAwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdOb3cgJXMgSGl0ICVzIEJyZWFrICVzJywgdGhpcy5nYW1lLnRpbWUubm93LCBoaXRVbnRpbCwgYnJlYWtVbnRpbCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgIGhpdDogaGl0VW50aWwsXHJcbiAgICAgICAgICAgIG5vaGl0OiBicmVha1VudGlsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaHVydChkaXJlY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55IC09IDEwMDtcclxuICAgICAgICBpZihkaXJlY3Rpb24gJiYgZGlyZWN0aW9uLmxlZnQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAtPSAxMDAgfHwgdGhpcy5wcm9wcy5tYXhTcGVlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uICYmIGRpcmVjdGlvbi5yaWdodCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ICs9IDEwMCB8fCB0aGlzLnByb3BzLm1heFNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdbU3ByaXRlXSBzdGF0ZScpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXh0ZW5kZWRTcHJpdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsImNvbnN0IGdhbWVDb25maWcgPSB7XHJcbiAgICB3aWR0aDogNTQ2LFxyXG4gICAgaGVpZ2h0OiAzNjgsXHJcbiAgICBkb21FbGVtZW50OiAnZ2FtZSdcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVDb25maWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZWNvbmZpZy5qcyIsImltcG9ydCBBSSBmcm9tICcuLi9jb21wb25lbnRzL0FJJztcbmltcG9ydCBIdW1hbiBmcm9tICcuLi9jb21wb25lbnRzL0h1bWFuJztcblxyXG5jbGFzcyBHYW1lU3RhdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lQ29uZmlnID0gZ2FtZUNvbmZpZztcclxuICAgICAgICB0aGlzLmtleXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5lbmVteSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KGNvbmZpZ3Mpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0luaXRdJywgY29uZmlncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJlbG9hZCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW1ByZWxvYWRdJyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ3BsYXllcicsICdtYW4ucG5nJyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ2Rpbm8nLCAnZGluby5wbmcnKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC5hdGxhcyhcclxuICAgICAgICAgICAgJ3ByZTJhdGxhcycsXHJcbiAgICAgICAgICAgICdwcmUyYXRsYXMucG5nJyxcclxuICAgICAgICAgICAgJ3ByZTJhdGxhcy5qc29uJyxcclxuICAgICAgICAgICAgUGhhc2VyLkxvYWRlci5URVhUVVJFX0FUTEFTX0pTT05fSEFTSFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBjcmVhdGUoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtDcmVhdGVdJyk7XHJcbiAgICAgICAgLy8gZnBzIGRlYnVnZ2luZ1xyXG4gICAgICAgIHRoaXMuZ2FtZS50aW1lLmFkdmFuY2VkVGltaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gW1NFVCBMRVZFTF0gc2V0IGRpbWVuc2lvbnMsIHN0YXJ0IHBoeXNpYyBzeXN0ZW1cclxuICAgICAgICB0aGlzLmdhbWUud29ybGQuc2V0Qm91bmRzKFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICB0aGlzLmdhbWVDb25maWcud2lkdGgsXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbmZpZy5oZWlnaHRcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZic7XG5cbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgICAgICBpbml0aWFsaXNlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNjb3JlOiAwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUgPSBtb2J4LmFjdGlvbigoY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gT2JqZWN0LmFzc2lnbih0aGlzLmdhbWVTdGF0ZSwgY2hhbmdlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbW9ieC5vYnNlcnZlKHRoaXMuZ2FtZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnW2dhbWVTdGF0ZV0gY2hhbmdlJywgY2hhbmdlLCB0aGlzLmdhbWVTdGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoeyBpbml0aWFsaXNlZDogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgLy8gW1BMQVlFUl1cclxuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBIdW1hbih0aGlzLmdhbWUsIDIwMCwgMjAwLCAncHJlMmF0bGFzJywge1xyXG4gICAgICAgICAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgICAgICAgICBtYXhTcGVlZDogMjAwLFxyXG4gICAgICAgICAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgICAgICAgICAgeyBuYW1lOiAnbW92ZScsIGZyYW1lczogWzExLCcwMycsJzA1JywxNCwyMF0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgeyBuYW1lOiAnaGl0JywgZnJhbWVzOiBbMjIsMjQsMjgsMzEsMzQsMjIsMjQsMjgsMzEsMzRdLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgeyBuYW1lOiAnc3RvcCcsIGZyYW1lczogWzQyLDQ1LDQ5LDUyXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgICAgICAgICB7IG5hbWU6ICdqdW1wJywgZnJhbWVzOiBbMTYsNDEsNDcsNTAsNTAsNTAsNTAsNTAsNTAsNTAsNTAsMTMsNTAsMTMsNTAsMTNdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgIHsgbmFtZTogJ2lkbGUnLCBmcmFtZXM6IFsyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNywyNywyNywyNywyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwzMCwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNywzMCwyNywzMCwzNSwzNiwyNSwyNSwyNSwyNSwyNSwyNSwyNSwyNSwnMDcnLCcwNycsJzA3JywnMDcnLCcwMicsJzAyJ10sIGZwczogNSwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgIHsgbmFtZTogJ2h1cnQnLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgICAgICAgICB7IG5hbWU6ICdzdHVuJywgZnJhbWVzOiBbMTldLCBmcHM6IDEwLCBsb29wOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgeyBuYW1lOiAnZGllJywgZnJhbWVzOiBbMTldLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgIHsgbmFtZTogJ3NwYXduJywgZnJhbWVzOiBbMTEsJzAzJywnMDUnLDE0LDIwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFtFTkVNWV1cclxuICAgICAgICB0aGlzLmVuZW15ID0gbmV3IEFJKHRoaXMuZ2FtZSwgNDAwLCAyMDAsICdkaW5vJyk7XHJcbiAgICAgICAgdGhpcy5lbmVteS5ib2R5LnZlbG9jaXR5LnggPSBNYXRoLnJhbmRvbSgpICogKC0xMCkgLSAxMDtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xyXG5cclxuICAgICAgICAvLyBiaW5kIGtleXNcclxuICAgICAgICB0aGlzLmtleXMgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xyXG4gICAgICAgIHRoaXMua2V5cy5zcGFjZSA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlNQQUNFQkFSKTtcclxuXHJcbiAgICAgICAgLy8gc2NvcmUgdGV4dFxyXG4gICAgICAgIHRoaXMubWVudSA9IHRoaXMuZ2FtZS5hZGQudGV4dChcclxuICAgICAgICAgICAgMTUwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICBcIkxpZmU6IFwiICsgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSxcclxuICAgICAgICAgICAgeyBmb250OiBcIjI0cHggQ291cmllclwiLCBmaWxsOiBcIiMwMDBcIiwgYWxpZ246IFwiY2VudGVyXCIgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbW9ieC5vYnNlcnZlKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnUuc2V0VGV4dChcIkxpZmU6IFwiICsgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW1VwZGF0ZV0nKTtcclxuICAgICAgICAvLyBmcHNcclxuICAgICAgICB0aGlzLmdhbWUuZGVidWcudGV4dCh0aGlzLmdhbWUudGltZS5mcHMsIDUsIDIwKTtcclxuXHJcbiAgICAgICAgLy8gbW92ZVxyXG4gICAgICAgIHRoaXMub25LZXlQcmVzcygpO1xyXG5cclxuICAgICAgICAvLyBjb2xsaWRlXHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5wbGF5ZXIsIHRoaXMuZW5lbXksIChwbGF5ZXIsIGVuZW15KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLnBsYXllci5pc0hpdHRpbmcgJiYgIXRoaXMucGxheWVyLmlzU3R1bm5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlmZTogdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSAtIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3R1bjogdGhpcy5nYW1lLnRpbWUubm93ICsgMTUwMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5odXJ0KGVuZW15LmJvZHkudG91Y2hpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvbktleVByZXNzKCl7XHJcbiAgICAgICAgLy8gc3R1biA9PiBibG9ja2VkXHJcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIuaXNTdHVubmVkKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdzdHVuJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG1vdmUgbGVmdCAvIHJpZ2h0XHJcbiAgICAgICAgaWYodGhpcy5rZXlzLmxlZnQuaXNEb3duKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIubW92ZUxlZnQoKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdtb3ZlJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMua2V5cy5yaWdodC5pc0Rvd24pe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5tb3ZlUmlnaHQoKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdtb3ZlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2lkbGUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGp1bXBcclxuICAgICAgICBpZih0aGlzLmtleXMudXAuaXNEb3duKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuanVtcCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2p1bXAnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGhpdFxyXG4gICAgICAgIGlmKHRoaXMua2V5cy5zcGFjZS5pc0Rvd24pe1xyXG4gICAgICAgICAgICBpZih0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5ub2hpdCA8IHRoaXMuZ2FtZS50aW1lLm5vdyAmJiB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5oaXQgPCB0aGlzLmdhbWUudGltZS5ub3cpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaGl0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ2hpdCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVTdGF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkuanMiLCJpbXBvcnQgRXh0ZW5kZWRTcHJpdGUgZnJvbSAnLi9FeHRlbmRlZFNwcml0ZSc7XHJcblxyXG5jbGFzcyBBSSBleHRlbmRzIEV4dGVuZGVkU3ByaXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgICAgICBsaWZlOiAxMCxcclxuICAgICAgICAgICAgc3R1bjogMCxcclxuICAgICAgICAgICAgaGl0OiAwLFxyXG4gICAgICAgICAgICBub2hpdDogMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBSTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0FJLmpzIiwiaW1wb3J0IEV4dGVuZGVkU3ByaXRlIGZyb20gJy4vRXh0ZW5kZWRTcHJpdGUnO1xyXG5cclxuY2xhc3MgSHVtYW4gZXh0ZW5kcyBFeHRlbmRlZFNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUpO1xyXG5cclxuICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gbW9ieC5vYnNlcnZhYmxlKHtcclxuICAgICAgICAgICAgbGlmZTogMTAsXHJcbiAgICAgICAgICAgIHN0dW46IDAsXHJcbiAgICAgICAgICAgIGhpdDogMCxcclxuICAgICAgICAgICAgbm9oaXQ6IDBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSHVtYW47XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9IdW1hbi5qcyIsImltcG9ydCBnYW1lQ29uZmlnIGZyb20gJy4vZ2FtZWNvbmZpZy5qcyc7XHJcbmltcG9ydCBQbGF5IGZyb20gJy4vZ2FtZXN0YXRlcy9wbGF5LmpzJztcclxuXHJcbi8vIGluc3RhbnRpYXRlIGEgUGhhc2VyLkdhbWVcclxuY29uc3QgUExBVEZPUk1FUiA9IG5ldyBQaGFzZXIuR2FtZShcclxuICAgIGdhbWVDb25maWcud2lkdGgsXHJcbiAgICBnYW1lQ29uZmlnLmhlaWdodCxcclxuICAgIFBoYXNlci5BVVRPLFxyXG4gICAgZ2FtZUNvbmZpZy5kb21FbGVtZW50XHJcbik7XHJcblxyXG4vLyByZWdpc3RlciBnYW1lc3RhdGVzICh3aWxsIGJlIGluc3RhbnRpYXRlZCB3LyB0aGlzLmdhbWUgYXMgMXN0IHBhcmFtLCBwYXNzIGdhbWVDb25maWcgYXMgMm5kKVxyXG5QTEFURk9STUVSLnN0YXRlLmFkZCgnUGxheScsIFBsYXkuYmluZChudWxsLCBnYW1lQ29uZmlnKSk7XHJcblxyXG4vLyBraWNrIG9mZiBmaXJzdCBnYW1lc3RhdGU6IE1lbnVcclxuUExBVEZPUk1FUi5zdGF0ZS5zdGFydCgnUGxheScsIHRydWUsIHRydWUsIHtcclxuICAgIGluaXRpYWxTdGF0ZTogJ3NvbWUgaW5pdGlhbCBzdGF0ZSdcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9