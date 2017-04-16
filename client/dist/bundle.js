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
            this.player = new _ExtendedSprite2.default(this.game, 200, 200, 'player', {
                acceleration: 10,
                maxSpeed: 200
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
                _this2.player.updateState({
                    life: _this2.player.spriteState.life - 1,
                    stun: _this2.game.time.now + 1000
                });
                _this2.player.hurt(enemy.body.touching);
            });
        }
    }, {
        key: 'onKeyPress',
        value: function onKeyPress() {
            // stun => blocked
            if (this.player.spriteState.stun > this.game.time.now) {
                return;
            }

            // move left / right
            if (this.keys.left.isDown) {
                this.player.moveLeft();
            } else if (this.keys.right.isDown) {
                this.player.moveRight();
            } else {
                this.player.stop();
            }

            // jump
            if (this.keys.up.isDown) {
                this.player.jump();
            }

            // hit
            if (this.keys.space.isDown) {}
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
        _this.props = props;
        _this.game.add.existing(_this);
        _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.anchor.setTo(0.5, 0.5);
        _this.body.collideWorldBounds = true;
        _this.checkWorldBounds = true;
        _this.body.gravity.y = 500;

        var gameState = _this.game.state.states[_this.game.state.current].gameState;
        mobx.observe(gameState, function (change) {
            console.log('change', change, gameState);
        });
        _this.spriteState = mobx.observable({
            life: 10,
            stun: 0
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
        value: function hit() {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjA4NDAyZGExYTdmZGViZWEyNzAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImdhbWVDb25maWciLCJ3aWR0aCIsImhlaWdodCIsImRvbUVsZW1lbnQiLCJHYW1lU3RhdGUiLCJrZXlzIiwidW5kZWZpbmVkIiwicGxheWVyIiwiZW5lbXkiLCJnYW1lU3RhdGUiLCJjb25maWdzIiwiY29uc29sZSIsImxvZyIsImdhbWUiLCJsb2FkIiwiaW1hZ2UiLCJ0aW1lIiwiYWR2YW5jZWRUaW1pbmciLCJ3b3JsZCIsInNldEJvdW5kcyIsInBoeXNpY3MiLCJzdGFydFN5c3RlbSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsIm1vYngiLCJvYnNlcnZhYmxlIiwiaW5pdGlhbGlzZWQiLCJzY29yZSIsInVwZGF0ZVN0YXRlIiwiYWN0aW9uIiwiY2hhbmdlIiwiT2JqZWN0IiwiYXNzaWduIiwib2JzZXJ2ZSIsImFjY2VsZXJhdGlvbiIsIm1heFNwZWVkIiwiYm9keSIsInZlbG9jaXR5IiwieCIsIk1hdGgiLCJyYW5kb20iLCJjYW1lcmEiLCJmb2xsb3ciLCJpbnB1dCIsImtleWJvYXJkIiwiY3JlYXRlQ3Vyc29yS2V5cyIsInNwYWNlIiwiYWRkS2V5IiwiS2V5Ym9hcmQiLCJTUEFDRUJBUiIsIm1lbnUiLCJhZGQiLCJ0ZXh0Iiwic3ByaXRlU3RhdGUiLCJsaWZlIiwiZm9udCIsImZpbGwiLCJhbGlnbiIsInNldFRleHQiLCJkZWJ1ZyIsImZwcyIsIm9uS2V5UHJlc3MiLCJhcmNhZGUiLCJvdmVybGFwIiwic3R1biIsIm5vdyIsImh1cnQiLCJ0b3VjaGluZyIsImxlZnQiLCJpc0Rvd24iLCJtb3ZlTGVmdCIsInJpZ2h0IiwibW92ZVJpZ2h0Iiwic3RvcCIsInVwIiwianVtcCIsIm1vZHVsZSIsImV4cG9ydHMiLCJFeHRlbmRlZFNwcml0ZSIsInkiLCJzcHJpdGUiLCJwcm9wcyIsImV4aXN0aW5nIiwiZW5hYmxlIiwiYW5jaG9yIiwic2V0VG8iLCJjb2xsaWRlV29ybGRCb3VuZHMiLCJjaGVja1dvcmxkQm91bmRzIiwiZ3Jhdml0eSIsInN0YXRlIiwic3RhdGVzIiwiY3VycmVudCIsInNjYWxlIiwiZG93biIsImJsb2NrZWQiLCJkaXJlY3Rpb24iLCJTcHJpdGUiLCJQTEFURk9STUVSIiwiR2FtZSIsIkFVVE8iLCJiaW5kIiwic3RhcnQiLCJpbml0aWFsU3RhdGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBLElBQU1BLGFBQWE7QUFDZkMsV0FBTyxHQURRO0FBRWZDLFlBQVEsR0FGTztBQUdmQyxnQkFBWTtBQUhHLENBQW5COztrQkFNZUgsVTs7Ozs7Ozs7Ozs7QUNOZjs7Ozs7Ozs7SUFFTUksUztBQUNGLHVCQUFZSixVQUFaLEVBQXdCO0FBQUE7O0FBQ3BCLGFBQUtBLFVBQUws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RXdCaEIsT0FBTzZFLE07O0FBMkVuQzs7a0JBRWNsQixjOzs7Ozs7Ozs7QUM3RWY7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDQSxJQUFNbUIsYUFBYSxJQUFJOUUsT0FBTytFLElBQVgsQ0FDZixxQkFBV3BHLEtBREksRUFFZixxQkFBV0MsTUFGSSxFQUdmb0IsT0FBT2dGLElBSFEsRUFJZixxQkFBV25HLFVBSkksQ0FBbkI7O0FBT0E7QUFDQWlHLFdBQVdSLEtBQVgsQ0FBaUJ0QyxHQUFqQixDQUFxQixNQUFyQixFQUE2QixlQUFLaUQsSUFBTCxDQUFVLElBQVYsdUJBQTdCOztBQUVBO0FBQ0FILFdBQVdSLEtBQVgsQ0FBaUJZLEtBQWpCLENBQXVCLE1BQXZCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDLEVBQTJDO0FBQ3ZDQyxrQkFBYztBQUR5QixDQUEzQyxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYwODQwMmRhMWE3ZmRlYmVhMjcwIiwiY29uc3QgZ2FtZUNvbmZpZyA9IHtcclxuICAgIHdpZHRoOiA1NDYsXHJcbiAgICBoZWlnaHQ6IDM2OCxcclxuICAgIGRvbUVsZW1lbnQ6ICdnYW1lJ1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZUNvbmZpZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lY29uZmlnLmpzIiwiaW1wb3J0IEV4dGVuZGVkU3ByaXRlIGZyb20gJy4uL2NvbXBvbmVudHMvRXh0ZW5kZWRTcHJpdGUnO1xuXHJcbmNsYXNzIEdhbWVTdGF0ZXtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWVDb25maWcpIHtcclxuICAgICAgICB0aGlzLmdhbWVDb25maWcgPSBnYW1lQ29uZmlnO1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnBsYXllciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmVuZW15ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoY29uZmlncyl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bSW5pdF0nLCBjb25maWdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcmVsb2FkKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bUHJlbG9hZF0nKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSgncGxheWVyJywgJ21hbi5wbmcnKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSgnZGlubycsICdkaW5vLnBuZycpO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bQ3JlYXRlXScpO1xyXG4gICAgICAgIC8vIGZwcyBkZWJ1Z2dpbmdcclxuICAgICAgICB0aGlzLmdhbWUudGltZS5hZHZhbmNlZFRpbWluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIFtTRVQgTEVWRUxdIHNldCBkaW1lbnNpb25zLCBzdGFydCBwaHlzaWMgc3lzdGVtXHJcbiAgICAgICAgdGhpcy5nYW1lLndvcmxkLnNldEJvdW5kcyhcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgdGhpcy5nYW1lQ29uZmlnLndpZHRoLFxyXG4gICAgICAgICAgICB0aGlzLmdhbWVDb25maWcuaGVpZ2h0XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuICAgICAgICB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyNmZmYnO1xuXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gbW9ieC5vYnNlcnZhYmxlKHtcclxuICAgICAgICAgICAgaW5pdGlhbGlzZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzY29yZTogMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IE9iamVjdC5hc3NpZ24odGhpcy5nYW1lU3RhdGUsIGNoYW5nZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1vYngub2JzZXJ2ZSh0aGlzLmdhbWVTdGF0ZSwgY2hhbmdlID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tnYW1lU3RhdGVdIGNoYW5nZScsIGNoYW5nZSwgdGhpcy5nYW1lU3RhdGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHsgaW5pdGlhbGlzZWQ6IHRydWUgfSk7XHJcblxyXG4gICAgICAgIC8vIFtQTEFZRVJdXHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgRXh0ZW5kZWRTcHJpdGUodGhpcy5nYW1lLCAyMDAsIDIwMCwgJ3BsYXllcicsIHtcclxuICAgICAgICAgICAgYWNjZWxlcmF0aW9uOiAxMCxcclxuICAgICAgICAgICAgbWF4U3BlZWQ6IDIwMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBbRU5FTVldXHJcbiAgICAgICAgdGhpcy5lbmVteSA9IG5ldyBFeHRlbmRlZFNwcml0ZSh0aGlzLmdhbWUsIDQwMCwgMjAwLCAnZGlubycpO1xyXG4gICAgICAgIHRoaXMuZW5lbXkuYm9keS52ZWxvY2l0eS54ID0gTWF0aC5yYW5kb20oKSAqICgtMTApIC0gMTA7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcclxuXHJcbiAgICAgICAgLy8gYmluZCBrZXlzXHJcbiAgICAgICAgdGhpcy5rZXlzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuICAgICAgICB0aGlzLmtleXMuc3BhY2UgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TUEFDRUJBUik7XHJcblxyXG4gICAgICAgIC8vIHNjb3JlIHRleHRcclxuICAgICAgICB0aGlzLm1lbnUgPSB0aGlzLmdhbWUuYWRkLnRleHQoXHJcbiAgICAgICAgICAgIDE1MCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgXCJMaWZlOiBcIiArIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUsXHJcbiAgICAgICAgICAgIHsgZm9udDogXCIyNHB4IENvdXJpZXJcIiwgZmlsbDogXCIjMDAwXCIsIGFsaWduOiBcImNlbnRlclwiIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIG1vYngub2JzZXJ2ZSh0aGlzLnBsYXllci5zcHJpdGVTdGF0ZSwgY2hhbmdlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tZW51LnNldFRleHQoXCJMaWZlOiBcIiArIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtVcGRhdGVdJyk7XHJcbiAgICAgICAgLy8gZnBzXHJcbiAgICAgICAgdGhpcy5nYW1lLmRlYnVnLnRleHQodGhpcy5nYW1lLnRpbWUuZnBzLCA1LCAyMCk7XHJcblxyXG4gICAgICAgIC8vIG1vdmVcclxuICAgICAgICB0aGlzLm9uS2V5UHJlc3MoKTtcclxuXHJcbiAgICAgICAgLy8gY29sbGlkZVxyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMucGxheWVyLCB0aGlzLmVuZW15LCAocGxheWVyLCBlbmVteSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBsaWZlOiB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlIC0gMSxcclxuICAgICAgICAgICAgICAgIHN0dW46IHRoaXMuZ2FtZS50aW1lLm5vdyArIDEwMDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmh1cnQoZW5lbXkuYm9keS50b3VjaGluZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvbktleVByZXNzKCl7XHJcbiAgICAgICAgLy8gc3R1biA9PiBibG9ja2VkXHJcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUuc3R1biA+IHRoaXMuZ2FtZS50aW1lLm5vdyl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG1vdmUgbGVmdCAvIHJpZ2h0XHJcbiAgICAgICAgaWYodGhpcy5rZXlzLmxlZnQuaXNEb3duKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIubW92ZUxlZnQoKTtcclxuICAgICAgICB9IGVsc2UgaWYodGhpcy5rZXlzLnJpZ2h0LmlzRG93bil7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLm1vdmVSaWdodCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnN0b3AoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGp1bXBcclxuICAgICAgICBpZih0aGlzLmtleXMudXAuaXNEb3duKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuanVtcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaGl0XHJcbiAgICAgICAgaWYodGhpcy5rZXlzLnNwYWNlLmlzRG93bil7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lU3RhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5LmpzIiwiY2xhc3MgRXh0ZW5kZWRTcHJpdGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRle1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlKVxyXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xyXG4gICAgICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdyYXZpdHkueSA9IDUwMDtcclxuXHJcbiAgICAgICAgY29uc3QgZ2FtZVN0YXRlID0gdGhpcy5nYW1lLnN0YXRlLnN0YXRlc1t0aGlzLmdhbWUuc3RhdGUuY3VycmVudF0uZ2FtZVN0YXRlO1xyXG4gICAgICAgIG1vYngub2JzZXJ2ZShnYW1lU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UnLCBjaGFuZ2UsIGdhbWVTdGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGxpZmU6IDEwLFxyXG4gICAgICAgICAgICBzdHVuOiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSA9IG1vYnguYWN0aW9uKChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IE9iamVjdC5hc3NpZ24odGhpcy5zcHJpdGVTdGF0ZSwgY2hhbmdlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1slc10gbGlmZTogJywgc3ByaXRlLCB0aGlzLnNwcml0ZVN0YXRlLmxpZmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVMZWZ0KCl7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gLTE7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnZlbG9jaXR5LnggPiAtdGhpcy5wcm9wcy5tYXhTcGVlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC09IHRoaXMucHJvcHMuYWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlUmlnaHQoKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSAxO1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS52ZWxvY2l0eS54IDwgdGhpcy5wcm9wcy5tYXhTcGVlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ICs9IHRoaXMucHJvcHMuYWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlKCl7XHJcbiAgICAgICAgaWYodGhpcy5zY2FsZS54ID09PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlUmlnaHQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVMZWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKXtcclxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAvPSAxLjE7XHJcbiAgICB9XHJcblxyXG4gICAganVtcCgpe1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS50b3VjaGluZy5kb3duIHx8IHRoaXMuYm9keS5ibG9ja2VkLmRvd24pe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSAtPSAzMDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhpdCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBodXJ0KGRpcmVjdGlvbil7XHJcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgLT0gMTAwO1xyXG4gICAgICAgIGlmKGRpcmVjdGlvbiAmJiBkaXJlY3Rpb24ubGVmdCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC09IDEwMCB8fCB0aGlzLnByb3BzLm1heFNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkaXJlY3Rpb24gJiYgZGlyZWN0aW9uLnJpZ2h0KXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggKz0gMTAwIHx8IHRoaXMucHJvcHMubWF4U3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ1tTcHJpdGVdIHN0YXRlJyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHRlbmRlZFNwcml0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0V4dGVuZGVkU3ByaXRlLmpzIiwiaW1wb3J0IGdhbWVDb25maWcgZnJvbSAnLi9nYW1lY29uZmlnLmpzJztcclxuaW1wb3J0IFBsYXkgZnJvbSAnLi9nYW1lc3RhdGVzL3BsYXkuanMnO1xyXG5cclxuLy8gaW5zdGFudGlhdGUgYSBQaGFzZXIuR2FtZVxyXG5jb25zdCBQTEFURk9STUVSID0gbmV3IFBoYXNlci5HYW1lKFxyXG4gICAgZ2FtZUNvbmZpZy53aWR0aCxcclxuICAgIGdhbWVDb25maWcuaGVpZ2h0LFxyXG4gICAgUGhhc2VyLkFVVE8sXHJcbiAgICBnYW1lQ29uZmlnLmRvbUVsZW1lbnRcclxuKTtcclxuXHJcbi8vIHJlZ2lzdGVyIGdhbWVzdGF0ZXMgKHdpbGwgYmUgaW5zdGFudGlhdGVkIHcvIHRoaXMuZ2FtZSBhcyAxc3QgcGFyYW0sIHBhc3MgZ2FtZUNvbmZpZyBhcyAybmQpXHJcblBMQVRGT1JNRVIuc3RhdGUuYWRkKCdQbGF5JywgUGxheS5iaW5kKG51bGwsIGdhbWVDb25maWcpKTtcclxuXHJcbi8vIGtpY2sgb2ZmIGZpcnN0IGdhbWVzdGF0ZTogTWVudVxyXG5QTEFURk9STUVSLnN0YXRlLnN0YXJ0KCdQbGF5JywgdHJ1ZSwgdHJ1ZSwge1xyXG4gICAgaW5pdGlhbFN0YXRlOiAnc29tZSBpbml0aWFsIHN0YXRlJ1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=