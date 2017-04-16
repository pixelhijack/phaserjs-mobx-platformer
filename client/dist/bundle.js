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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ExtendedSprite = __webpack_require__(2);

var _ExtendedSprite2 = _interopRequireDefault(_ExtendedSprite);

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
            this.player = new _ExtendedSprite2.default(this.game, 200, 200, 'pre2atlas', {
                acceleration: 10,
                maxSpeed: 200,
                animations: [{ name: 'move', frames: [11, '03', '05', 14, 20], fps: 10, loop: false }, { name: 'hit', frames: [22, 24, 28, 31, 34, 22, 24, 28, 31, 34], fps: 10, loop: true }, { name: 'stop', frames: [42, 45, 49, 52], fps: 10, loop: false }, { name: 'jump', frames: [16, 41, 47, 50, 50, 50, 50, 50, 50, 50, 50, 13, 50, 13, 50, 13], fps: 10, loop: false }, { name: 'idle', frames: [25, 25, 25, 25, 25, 25, 25, 25, 27, 27, 27, 27, 25, 25, 25, 25, 25, 25, 25, 25, 30, 25, 25, 25, 25, 25, 25, 25, 25, 27, 30, 27, 30, 35, 36, 25, 25, 25, 25, 25, 25, 25, 25, '07', '07', '07', '07', '02', '02'], fps: 5, loop: true }, { name: 'hurt', frames: [19], fps: 10, loop: true }, { name: 'stun', frames: [19], fps: 10, loop: true }, { name: 'die', frames: [19], fps: 10, loop: false }, { name: 'spawn', frames: [11, '03', '05', 14, 20], fps: 10, loop: false }]
            });

            // [ENEMY]
            this.enemy = new _ExtendedSprite2.default(this.game, 400, 200, 'dino');
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
                if (this.player.spriteState.nohit < this.game.time.now) {
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
/* 2 */
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

        _this.spriteState = mobx.observable({
            life: 10,
            stun: 0,
            hit: 0,
            nohit: 0
        });

        _this.updateState = mobx.action(function (change) {
            _this.spriteState = Object.assign(_this.spriteState, change);
            console.log('[%s] life: ', sprite, _this.spriteState.life);
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
            var hitUntil = this.game.time.now + 200,
                breakUntil = this.game.time.now + 300;
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gameconfig = __webpack_require__(0);

var _gameconfig2 = _interopRequireDefault(_gameconfig);

var _play = __webpack_require__(1);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWUyZDA2MGYzZjNjY2FlNGMzNmUiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImdhbWVDb25maWciLCJ3aWR0aCIsImhlaWdodCIsImRvbUVsZW1lbnQiLCJHYW1lU3RhdGUiLCJrZXlzIiwidW5kZWZpbmVkIiwicGxheWVyIiwiZW5lbXkiLCJnYW1lU3RhdGUiLCJjb25maWdzIiwiY29uc29sZSIsImxvZyIsImdhbWUiLCJsb2FkIiwiaW1hZ2UiLCJhdGxhcyIsIlBoYXNlciIsIkxvYWRlciIsIlRFWFRVUkVfQVRMQVNfSlNPTl9IQVNIIiwidGltZSIsImFkdmFuY2VkVGltaW5nIiwid29ybGQiLCJzZXRCb3VuZHMiLCJwaHlzaWNzIiwic3RhcnRTeXN0ZW0iLCJQaHlzaWNzIiwiQVJDQURFIiwic3RhZ2UiLCJiYWNrZ3JvdW5kQ29sb3IiLCJtb2J4Iiwib2JzZXJ2YWJsZSIsImluaXRpYWxpc2VkIiwic2NvcmUiLCJ1cGRhdGVTdGF0ZSIsImFjdGlvbiIsImNoYW5nZSIsIk9iamVjdCIsImFzc2lnbiIsIm9ic2VydmUiLCJhY2NlbGVyYXRpb24iLCJtYXhTcGVlZCIsImFuaW1hdGlvbnMiLCJuYW1lIiwiZnJhbWVzIiwiZnBzIiwibG9vcCIsImJvZHkiLCJ2ZWxvY2l0eSIsIngiLCJNYXRoIiwicmFuZG9tIiwiY2FtZXJhIiwiZm9sbG93IiwiaW5wdXQiLCJrZXlib2FyZCIsImNyZWF0ZUN1cnNvcktleXMiLCJzcGFjZSIsImFkZEtleSIsIktleWJvYXJkIiwiU1BBQ0VCQVIiLCJtZW51IiwiYWRkIiwidGV4dCIsInNwcml0ZVN0YXRlIiwibGlmZSIsImZvbnQiLCJmaWxsIiwiYWxpZ24iLCJzZXRUZXh0IiwiZGVidWciLCJvbktleVByZXNzIiwiYXJjYWRlIiwib3ZlcmxhcCIsImlzSGl0dGluZyIsImlzU3R1bm5lZCIsInN0dW4iLCJub3ciLCJodXJ0IiwidG91Y2hpbmciLCJwbGF5IiwibGVmdCIsImlzRG93biIsIm1vdmVMZWZ0IiwicmlnaHQiLCJtb3ZlUmlnaHQiLCJzdG9wIiwidXAiLCJqdW1wIiwibm9oaXQiLCJoaXQiLCJtb2R1bGUiLCJleHBvcnRzIiwiRXh0ZW5kZWRTcHJpdGUiLCJ5Iiwic3ByaXRlIiwicHJvcHMiLCJleGlzdGluZyIsImVuYWJsZSIsImFuY2hvciIsInNldFRvIiwiY29sbGlkZVdvcmxkQm91bmRzIiwiY2hlY2tXb3JsZEJvdW5kcyIsImdyYXZpdHkiLCJmb3JFYWNoIiwiYW5pbWF0aW9uIiwibWFwIiwiZnJhbWUiLCJ0b1N0cmluZyIsInN0YXRlIiwic3RhdGVzIiwiY3VycmVudCIsInNjYWxlIiwiZG93biIsImJsb2NrZWQiLCJoaXRVbnRpbCIsImJyZWFrVW50aWwiLCJkaXJlY3Rpb24iLCJTcHJpdGUiLCJQTEFURk9STUVSIiwiR2FtZSIsIkFVVE8iLCJiaW5kIiwic3RhcnQiLCJpbml0aWFsU3RhdGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUEr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NEQsSUFBTCxDQUFVLElBQVYsdUJBQTdCOztBQUVBO0FBQ0FILFdBQVdWLEtBQVgsQ0FBaUJjLEtBQWpCLENBQXVCLE1BQXZCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDLEVBQTJDO0FBQ3ZDQyxrQkFBYztBQUR5QixDQUEzQyxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGVlMmQwNjBmM2YzY2NhZTRjMzZlIiwiY29uc3QgZ2FtZUNvbmZpZyA9IHtcclxuICAgIHdpZHRoOiA1NDYsXHJcbiAgICBoZWlnaHQ6IDM2OCxcclxuICAgIGRvbUVsZW1lbnQ6ICdnYW1lJ1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZUNvbmZpZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lY29uZmlnLmpzIiwiaW1wb3J0IEV4dGVuZGVkU3ByaXRlIGZyb20gJy4uL2NvbXBvbmVudHMvRXh0ZW5kZWRTcHJpdGUnO1xuXHJcbmNsYXNzIEdhbWVTdGF0ZXtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWVDb25maWcpIHtcclxuICAgICAgICB0aGlzLmdhbWVDb25maWcgPSBnYW1lQ29uZmlnO1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnBsYXllciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmVuZW15ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoY29uZmlncyl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bSW5pdF0nLCBjb25maWdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcmVsb2FkKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bUHJlbG9hZF0nKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSgncGxheWVyJywgJ21hbi5wbmcnKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSgnZGlubycsICdkaW5vLnBuZycpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5sb2FkLmF0bGFzKFxyXG4gICAgICAgICAgICAncHJlMmF0bGFzJyxcclxuICAgICAgICAgICAgJ3ByZTJhdGxhcy5wbmcnLFxyXG4gICAgICAgICAgICAncHJlMmF0bGFzLmpzb24nLFxyXG4gICAgICAgICAgICBQaGFzZXIuTG9hZGVyLlRFWFRVUkVfQVRMQVNfSlNPTl9IQVNIXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIGNyZWF0ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0NyZWF0ZV0nKTtcclxuICAgICAgICAvLyBmcHMgZGVidWdnaW5nXHJcbiAgICAgICAgdGhpcy5nYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBbU0VUIExFVkVMXSBzZXQgZGltZW5zaW9ucywgc3RhcnQgcGh5c2ljIHN5c3RlbVxyXG4gICAgICAgIHRoaXMuZ2FtZS53b3JsZC5zZXRCb3VuZHMoXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbmZpZy53aWR0aCxcclxuICAgICAgICAgICAgdGhpcy5nYW1lQ29uZmlnLmhlaWdodFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmJztcblxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGluaXRpYWxpc2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgc2NvcmU6IDBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSA9IG1vYnguYWN0aW9uKChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2FtZVN0YXRlLCBjaGFuZ2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtb2J4Lm9ic2VydmUodGhpcy5nYW1lU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbZ2FtZVN0YXRlXSBjaGFuZ2UnLCBjaGFuZ2UsIHRoaXMuZ2FtZVN0YXRlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7IGluaXRpYWxpc2VkOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAvLyBbUExBWUVSXVxyXG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IEV4dGVuZGVkU3ByaXRlKHRoaXMuZ2FtZSwgMjAwLCAyMDAsICdwcmUyYXRsYXMnLCB7XHJcbiAgICAgICAgICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICAgICAgICAgIG1heFNwZWVkOiAyMDAsXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgICAgICAgICB7IG5hbWU6ICdtb3ZlJywgZnJhbWVzOiBbMTEsJzAzJywnMDUnLDE0LDIwXSwgZnBzOiAxMCwgbG9vcDogZmFsc2UgfSxcclxuICAgICAgICAgICAgICB7IG5hbWU6ICdoaXQnLCBmcmFtZXM6IFsyMiwyNCwyOCwzMSwzNCwyMiwyNCwyOCwzMSwzNF0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgICAgICAgICB7IG5hbWU6ICdzdG9wJywgZnJhbWVzOiBbNDIsNDUsNDksNTJdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgIHsgbmFtZTogJ2p1bXAnLCBmcmFtZXM6IFsxNiw0MSw0Nyw1MCw1MCw1MCw1MCw1MCw1MCw1MCw1MCwxMyw1MCwxMyw1MCwxM10sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgeyBuYW1lOiAnaWRsZScsIGZyYW1lczogWzI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI3LDI3LDI3LDI3LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDMwLDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI3LDMwLDI3LDMwLDM1LDM2LDI1LDI1LDI1LDI1LDI1LDI1LDI1LDI1LCcwNycsJzA3JywnMDcnLCcwNycsJzAyJywnMDInXSwgZnBzOiA1LCBsb29wOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgeyBuYW1lOiAnaHVydCcsIGZyYW1lczogWzE5XSwgZnBzOiAxMCwgbG9vcDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgIHsgbmFtZTogJ3N0dW4nLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IHRydWUgfSxcclxuICAgICAgICAgICAgICB7IG5hbWU6ICdkaWUnLCBmcmFtZXM6IFsxOV0sIGZwczogMTAsIGxvb3A6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgeyBuYW1lOiAnc3Bhd24nLCBmcmFtZXM6IFsxMSwnMDMnLCcwNScsMTQsMjBdLCBmcHM6IDEwLCBsb29wOiBmYWxzZSB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gW0VORU1ZXVxyXG4gICAgICAgIHRoaXMuZW5lbXkgPSBuZXcgRXh0ZW5kZWRTcHJpdGUodGhpcy5nYW1lLCA0MDAsIDIwMCwgJ2Rpbm8nKTtcclxuICAgICAgICB0aGlzLmVuZW15LmJvZHkudmVsb2NpdHkueCA9IE1hdGgucmFuZG9tKCkgKiAoLTEwKSAtIDEwO1xyXG5cclxuICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XHJcblxyXG4gICAgICAgIC8vIGJpbmQga2V5c1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XHJcbiAgICAgICAgdGhpcy5rZXlzLnNwYWNlID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpO1xyXG5cclxuICAgICAgICAvLyBzY29yZSB0ZXh0XHJcbiAgICAgICAgdGhpcy5tZW51ID0gdGhpcy5nYW1lLmFkZC50ZXh0KFxyXG4gICAgICAgICAgICAxNTAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIFwiTGlmZTogXCIgKyB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlLFxyXG4gICAgICAgICAgICB7IGZvbnQ6IFwiMjRweCBDb3VyaWVyXCIsIGZpbGw6IFwiIzAwMFwiLCBhbGlnbjogXCJjZW50ZXJcIiB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBtb2J4Lm9ic2VydmUodGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubWVudS5zZXRUZXh0KFwiTGlmZTogXCIgKyB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bVXBkYXRlXScpO1xyXG4gICAgICAgIC8vIGZwc1xyXG4gICAgICAgIHRoaXMuZ2FtZS5kZWJ1Zy50ZXh0KHRoaXMuZ2FtZS50aW1lLmZwcywgNSwgMjApO1xyXG5cclxuICAgICAgICAvLyBtb3ZlXHJcbiAgICAgICAgdGhpcy5vbktleVByZXNzKCk7XHJcblxyXG4gICAgICAgIC8vIGNvbGxpZGVcclxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLnBsYXllciwgdGhpcy5lbmVteSwgKHBsYXllciwgZW5lbXkpID0+IHtcclxuICAgICAgICAgICAgaWYoIXRoaXMucGxheWVyLmlzSGl0dGluZyAmJiAhdGhpcy5wbGF5ZXIuaXNTdHVubmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBsaWZlOiB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlIC0gMSxcclxuICAgICAgICAgICAgICAgICAgICBzdHVuOiB0aGlzLmdhbWUudGltZS5ub3cgKyAxNTAwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmh1cnQoZW5lbXkuYm9keS50b3VjaGluZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIG9uS2V5UHJlc3MoKXtcclxuICAgICAgICAvLyBzdHVuID0+IGJsb2NrZWRcclxuICAgICAgICBpZih0aGlzLnBsYXllci5pc1N0dW5uZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3N0dW4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbW92ZSBsZWZ0IC8gcmlnaHRcclxuICAgICAgICBpZih0aGlzLmtleXMubGVmdC5pc0Rvd24pe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5tb3ZlTGVmdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgICAgICB9IGVsc2UgaWYodGhpcy5rZXlzLnJpZ2h0LmlzRG93bil7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLm1vdmVSaWdodCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ21vdmUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5zdG9wKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnaWRsZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8ganVtcFxyXG4gICAgICAgIGlmKHRoaXMua2V5cy51cC5pc0Rvd24pe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5qdW1wKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbnMucGxheSgnanVtcCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaGl0XHJcbiAgICAgICAgaWYodGhpcy5rZXlzLnNwYWNlLmlzRG93bil7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLm5vaGl0IDwgdGhpcy5nYW1lLnRpbWUubm93KXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmhpdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdoaXQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lU3RhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5LmpzIiwiY2xhc3MgRXh0ZW5kZWRTcHJpdGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRle1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlKVxyXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzIHx8IHsgYW5pbWF0aW9uczogW10gfTtcclxuICAgICAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcclxuICAgICAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYm9keS5ncmF2aXR5LnkgPSA1MDA7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcHMuYW5pbWF0aW9ucy5mb3JFYWNoKGFuaW1hdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ubmFtZSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcmFtZXMubWFwKGZyYW1lID0+IGZyYW1lLnRvU3RyaW5nKCkpLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZwcyxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5sb29wXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdhbWVTdGF0ZSA9IHRoaXMuZ2FtZS5zdGF0ZS5zdGF0ZXNbdGhpcy5nYW1lLnN0YXRlLmN1cnJlbnRdLmdhbWVTdGF0ZTtcclxuXHJcbiAgICAgICAgbW9ieC5vYnNlcnZlKGdhbWVTdGF0ZSwgY2hhbmdlID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZScsIGNoYW5nZSwgZ2FtZVN0YXRlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGxpZmU6IDEwLFxyXG4gICAgICAgICAgICBzdHVuOiAwLFxyXG4gICAgICAgICAgICBoaXQ6IDAsXHJcbiAgICAgICAgICAgIG5vaGl0OiAwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUgPSBtb2J4LmFjdGlvbigoY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuc3ByaXRlU3RhdGUsIGNoYW5nZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbJXNdIGxpZmU6ICcsIHNwcml0ZSwgdGhpcy5zcHJpdGVTdGF0ZS5saWZlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNIaXR0aW5nKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlU3RhdGUuaGl0ID4gdGhpcy5nYW1lLnRpbWUubm93O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc1N0dW5uZWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcHJpdGVTdGF0ZS5zdHVuID4gdGhpcy5nYW1lLnRpbWUubm93O1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVMZWZ0KCl7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gLTE7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnZlbG9jaXR5LnggPiAtdGhpcy5wcm9wcy5tYXhTcGVlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC09IHRoaXMucHJvcHMuYWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlUmlnaHQoKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSAxO1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS52ZWxvY2l0eS54IDwgdGhpcy5wcm9wcy5tYXhTcGVlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ICs9IHRoaXMucHJvcHMuYWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlKCl7XHJcbiAgICAgICAgaWYodGhpcy5zY2FsZS54ID09PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlUmlnaHQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVMZWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKXtcclxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAvPSAxLjE7XHJcbiAgICB9XHJcblxyXG4gICAganVtcCgpe1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS50b3VjaGluZy5kb3duIHx8IHRoaXMuYm9keS5ibG9ja2VkLmRvd24pe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSAtPSAzMDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhpdCgpe1xyXG4gICAgICAgIGNvbnN0IGhpdFVudGlsID0gdGhpcy5nYW1lLnRpbWUubm93ICsgMjAwLFxyXG4gICAgICAgICAgICBicmVha1VudGlsID0gdGhpcy5nYW1lLnRpbWUubm93ICsgMzAwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdOb3cgJXMgSGl0ICVzIEJyZWFrICVzJywgdGhpcy5nYW1lLnRpbWUubm93LCBoaXRVbnRpbCwgYnJlYWtVbnRpbCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgIGhpdDogaGl0VW50aWwsXHJcbiAgICAgICAgICAgIG5vaGl0OiBicmVha1VudGlsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaHVydChkaXJlY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55IC09IDEwMDtcclxuICAgICAgICBpZihkaXJlY3Rpb24gJiYgZGlyZWN0aW9uLmxlZnQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAtPSAxMDAgfHwgdGhpcy5wcm9wcy5tYXhTcGVlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uICYmIGRpcmVjdGlvbi5yaWdodCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ICs9IDEwMCB8fCB0aGlzLnByb3BzLm1heFNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdbU3ByaXRlXSBzdGF0ZScpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXh0ZW5kZWRTcHJpdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsImltcG9ydCBnYW1lQ29uZmlnIGZyb20gJy4vZ2FtZWNvbmZpZy5qcyc7XHJcbmltcG9ydCBQbGF5IGZyb20gJy4vZ2FtZXN0YXRlcy9wbGF5LmpzJztcclxuXHJcbi8vIGluc3RhbnRpYXRlIGEgUGhhc2VyLkdhbWVcclxuY29uc3QgUExBVEZPUk1FUiA9IG5ldyBQaGFzZXIuR2FtZShcclxuICAgIGdhbWVDb25maWcud2lkdGgsXHJcbiAgICBnYW1lQ29uZmlnLmhlaWdodCxcclxuICAgIFBoYXNlci5BVVRPLFxyXG4gICAgZ2FtZUNvbmZpZy5kb21FbGVtZW50XHJcbik7XHJcblxyXG4vLyByZWdpc3RlciBnYW1lc3RhdGVzICh3aWxsIGJlIGluc3RhbnRpYXRlZCB3LyB0aGlzLmdhbWUgYXMgMXN0IHBhcmFtLCBwYXNzIGdhbWVDb25maWcgYXMgMm5kKVxyXG5QTEFURk9STUVSLnN0YXRlLmFkZCgnUGxheScsIFBsYXkuYmluZChudWxsLCBnYW1lQ29uZmlnKSk7XHJcblxyXG4vLyBraWNrIG9mZiBmaXJzdCBnYW1lc3RhdGU6IE1lbnVcclxuUExBVEZPUk1FUi5zdGF0ZS5zdGFydCgnUGxheScsIHRydWUsIHRydWUsIHtcclxuICAgIGluaXRpYWxTdGF0ZTogJ3NvbWUgaW5pdGlhbCBzdGF0ZSdcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9