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
            this.player = new _ExtendedSprite2.default(this.game, 200, 200, 'player');

            // [ENEMY]
            this.enemy = new _ExtendedSprite2.default(this.game, 400, 200, 'dino');
            this.enemy.body.velocity.x = Math.random() * -10 - 10;

            this.game.camera.follow(this.player);

            // bind keys
            this.keys = this.game.input.keyboard.createCursorKeys();
            this.keys.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            // score text
            this.menu = this.game.add.text(150, 0, "Life: " + this.player.spriteState.life, { font: "24px Courier", fill: "#000", align: "center" });
            this.setMenu = function (life) {
                _this.menu.setText("Life: " + life);
            };
            mobx.observe(this.player.spriteState, function (change) {
                _this.setMenu(_this.player.spriteState.life);
            });
        }
    }, {
        key: 'update',
        value: function update() {
            var _arguments = arguments,
                _this2 = this;

            console.log('[PHASER][Component][Update]');
            // fps
            this.game.debug.text(this.game.time.fps, 5, 20);

            // move
            if (this.keys.left.isDown) {
                this.player.body.velocity.x--;
            } else if (this.keys.right.isDown) {
                this.player.body.velocity.x++;
            }

            if (this.keys.up.isDown) {
                this.player.jump();
            }

            // collide
            this.game.physics.arcade.overlap(this.player, this.enemy, function (player, enemy) {
                console.log('collision!', _arguments);
                _this2.player.updateState({ life: _this2.player.spriteState.life - 1 });
            });
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

    function ExtendedSprite(game, x, y, sprite) {
        _classCallCheck(this, ExtendedSprite);

        var _this = _possibleConstructorReturn(this, (ExtendedSprite.__proto__ || Object.getPrototypeOf(ExtendedSprite)).call(this, game, x, y, sprite));

        _this.game = game;
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
            life: 10
        });
        _this.updateState = mobx.action(function (change) {
            _this.spriteState = Object.assign(_this.spriteState, change);
            console.log('[%s] life: ', sprite, _this.spriteState.life);
        });
        return _this;
    }

    _createClass(ExtendedSprite, [{
        key: 'jump',
        value: function jump() {
            if (this.body.touching.down || this.body.blocked.down) {
                this.body.velocity.y -= 300;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzlkNzgwMjc3M2QzOGZiYjUwNDgiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImdhbWVDb25maWciLCJ3aWR0aCIsImhlaWdodCIsImRvbUVsZW1lbnQiLCJHYW1lU3RhdGUiLCJrZXlzIiwidW5kZWZpbmVkIiwicGxheWVyIiwiZW5lbXkiLCJnYW1lU3RhdGUiLCJjb25maWdzIiwiY29uc29sZSIsImxvZyIsImdhbWUiLCJsb2FkIiwiaW1hZ2UiLCJ0aW1lIiwiYWR2YW5jZWRUaW1pbmciLCJ3b3JsZCIsInNldEJvdW5kcyIsInBoeXNpY3MiLCJzdGFydFN5c3RlbSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsIm1vYngiLCJvYnNlcnZhYmxlIiwiaW5pdGlhbGlzZWQiLCJzY29yZSIsInVwZGF0ZVN0YXRlIiwiYWN0aW9uIiwiY2hhbmdlIiwiT2JqZWN0IiwiYXNzaWduIiwib2JzZXJ2ZSIsImJvZHkiLCJ2ZWxvY2l0eSIsIngiLCJNYXRoIiwicmFuZG9tIiwiY2FtZXJhIiwiZm9sbG93IiwiaW5wdXQiLCJrZXlib2FyZCIsImNyZWF0ZUN1cnNvcktleXMiLCJzcGFjZSIsImFkZEtleSIsIktleWJvYXJkIiwiU1BBQ0VCQVIiLCJtZW51IiwiYWRkIiwidGV4dCIsInNwcml0ZVN0YXRlIiwibGlmZSIsImZvbnQiLCJmaWxsIiwiYWxpZ24iLCJzZXRNZW51Iiwic2V0VGV4dCIsImRlYnVnIiwiZnBzIiwibGVmdCIsImlzRG93biIsInJpZ2h0IiwidXAiLCJqdW1wIiwiYXJjYWRlIiwib3ZlcmxhcCIsIm1vZHVsZSIsImV4cG9ydHMiLCJFeHRlbmRlZFNwcml0ZSIsInkiLCJzcHJpdGUiLCJleGlzdGluZyIsImVuYWJsZSIsImFuY2hvciIsInNldFRvIiwiY29sbGlkZVdvcmxkQm91bmRzIiwiY2hlY2tXb3JsZEJvdW5kcyIsImdyYXZpdHkiLCJzdGF0ZSIsInN0YXRlcyIsImN1cnJlbnQiLCJ0b3VjaGluZyIsImRvd24iLCJibG9ja2VkIiwiU3ByaXRlIiwiUExBVEZPUk1FUiIsIkdhbWUiLCJBVVRPIiwiYmluZCIsInN0YXJ0IiwiaW5pdGlhbFN0YXRlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hFQSxJQUFNQSxhQUFhO0FBQ2ZDLFdBQU8sR0FEUTtBQUVmQyxZQUFRLEdBRk87QUFHZkMsZ0JBQVk7QUFIRyxDQUFuQjs7a0JBTWVILFU7Ozs7Ozs7Ozs7O0FDTmY7Ozs7Ozs7O0lBRU1JLFM7QUFDRix1QkFBWUosVUFBWixFQUF3QjtBQUFBOztBQUNwQixhQUFLQSxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLGFBQUtLLElBQUwsR0FBWUMsU0FBWjtBQUNBLGFBQUtDLE1BQUwsR0FBY0QsU0FBZDtBQUNBLGFBQUtFLEtBQUwsR0FBYUYsU0FBYjtBQUNBLGFBQUtHLFNB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LENBQVksVUFBQ0MsTUFBRCxFQUFZO0FBQ3ZDLGtCQUFLcUIsV0FBTCxHQUFtQnBCLE9BQU9DLE1BQVAsQ0FBYyxNQUFLbUIsV0FBbkIsRUFBZ0NyQixNQUFoQyxDQUFuQjtBQUNBdEIsb0JBQVFDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCOEQsTUFBM0IsRUFBbUMsTUFBS3BCLFdBQUwsQ0FBaUJDLElBQXBEO0FBQ0gsU0FIa0IsQ0FBbkI7QUFqQjJCO0FBcUI5Qjs7OzsrQkFFSztBQUNGLGdCQUFHLEtBQUtsQixJQUFMLENBQVVnRCxRQUFWLENBQW1CQyxJQUFuQixJQUEyQixLQUFLakQsSUFBTCxDQUFVa0QsT0FBVixDQUFrQkQsSUFBaEQsRUFBcUQ7QUFDakQscUJBQUtqRCxJQUFMLENBQVVDLFFBQVYsQ0FBbUJtQyxDQUFuQixJQUF3QixHQUF4QjtBQUNIO0FBQ0o7OztpQ0FFTztBQUNKO0FBQ0g7Ozs7RUFoQ3dCbkQsT0FBT2tFLE07O0FBaUNuQzs7a0JBRWNoQixjOzs7Ozs7Ozs7QUNuQ2Y7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDQSxJQUFNaUIsYUFBYSxJQUFJbkUsT0FBT29FLElBQVgsQ0FDZixxQkFBV3pGLEtBREksRUFFZixxQkFBV0MsTUFGSSxFQUdmb0IsT0FBT3FFLElBSFEsRUFJZixxQkFBV3hGLFVBSkksQ0FBbkI7O0FBT0E7QUFDQXNGLFdBQVdQLEtBQVgsQ0FBaUI5QixHQUFqQixDQUFxQixNQUFyQixFQUE2QixlQUFLd0MsSUFBTCxDQUFVLElBQVYsdUJBQTdCOztBQUVBO0FBQ0FILFdBQVdQLEtBQVgsQ0FBaUJXLEtBQWpCLENBQXVCLE1BQXZCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDLEVBQTJDO0FBQ3ZDQyxrQkFBYztBQUR5QixDQUEzQyxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGM5ZDc4MDI3NzNkMzhmYmI1MDQ4IiwiY29uc3QgZ2FtZUNvbmZpZyA9IHtcclxuICAgIHdpZHRoOiA1NDYsXHJcbiAgICBoZWlnaHQ6IDM2OCxcclxuICAgIGRvbUVsZW1lbnQ6ICdnYW1lJ1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZUNvbmZpZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lY29uZmlnLmpzIiwiaW1wb3J0IEV4dGVuZGVkU3ByaXRlIGZyb20gJy4uL2NvbXBvbmVudHMvRXh0ZW5kZWRTcHJpdGUnO1xuXHJcbmNsYXNzIEdhbWVTdGF0ZXtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWVDb25maWcpIHtcclxuICAgICAgICB0aGlzLmdhbWVDb25maWcgPSBnYW1lQ29uZmlnO1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnBsYXllciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmVuZW15ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoY29uZmlncyl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bSW5pdF0nLCBjb25maWdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcmVsb2FkKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bUHJlbG9hZF0nKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSgncGxheWVyJywgJ21hbi5wbmcnKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSgnZGlubycsICdkaW5vLnBuZycpO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bQ3JlYXRlXScpO1xyXG4gICAgICAgIC8vIGZwcyBkZWJ1Z2dpbmdcclxuICAgICAgICB0aGlzLmdhbWUudGltZS5hZHZhbmNlZFRpbWluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIFtTRVQgTEVWRUxdIHNldCBkaW1lbnNpb25zLCBzdGFydCBwaHlzaWMgc3lzdGVtXHJcbiAgICAgICAgdGhpcy5nYW1lLndvcmxkLnNldEJvdW5kcyhcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgdGhpcy5nYW1lQ29uZmlnLndpZHRoLFxyXG4gICAgICAgICAgICB0aGlzLmdhbWVDb25maWcuaGVpZ2h0XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuICAgICAgICB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyNmZmYnO1xuXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gbW9ieC5vYnNlcnZhYmxlKHtcclxuICAgICAgICAgICAgaW5pdGlhbGlzZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzY29yZTogMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IE9iamVjdC5hc3NpZ24odGhpcy5nYW1lU3RhdGUsIGNoYW5nZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1vYngub2JzZXJ2ZSh0aGlzLmdhbWVTdGF0ZSwgY2hhbmdlID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tnYW1lU3RhdGVdIGNoYW5nZScsIGNoYW5nZSwgdGhpcy5nYW1lU3RhdGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHsgaW5pdGlhbGlzZWQ6IHRydWUgfSk7XHJcblxyXG4gICAgICAgIC8vIFtQTEFZRVJdXHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgRXh0ZW5kZWRTcHJpdGUodGhpcy5nYW1lLCAyMDAsIDIwMCwgJ3BsYXllcicpO1xyXG5cclxuICAgICAgICAvLyBbRU5FTVldXHJcbiAgICAgICAgdGhpcy5lbmVteSA9IG5ldyBFeHRlbmRlZFNwcml0ZSh0aGlzLmdhbWUsIDQwMCwgMjAwLCAnZGlubycpO1xyXG4gICAgICAgIHRoaXMuZW5lbXkuYm9keS52ZWxvY2l0eS54ID0gTWF0aC5yYW5kb20oKSAqICgtMTApIC0gMTA7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcclxuXHJcbiAgICAgICAgLy8gYmluZCBrZXlzXHJcbiAgICAgICAgdGhpcy5rZXlzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuICAgICAgICB0aGlzLmtleXMuc3BhY2UgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TUEFDRUJBUik7XHJcblxyXG4gICAgICAgIC8vIHNjb3JlIHRleHRcclxuICAgICAgICB0aGlzLm1lbnUgPSB0aGlzLmdhbWUuYWRkLnRleHQoXHJcbiAgICAgICAgICAgIDE1MCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgXCJMaWZlOiBcIiArIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUsXHJcbiAgICAgICAgICAgIHsgZm9udDogXCIyNHB4IENvdXJpZXJcIiwgZmlsbDogXCIjMDAwXCIsIGFsaWduOiBcImNlbnRlclwiIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuc2V0TWVudSA9IGxpZmUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnUuc2V0VGV4dChcIkxpZmU6IFwiICsgbGlmZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBtb2J4Lm9ic2VydmUodGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TWVudSh0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW1VwZGF0ZV0nKTtcclxuICAgICAgICAvLyBmcHNcclxuICAgICAgICB0aGlzLmdhbWUuZGVidWcudGV4dCh0aGlzLmdhbWUudGltZS5mcHMsIDUsIDIwKTtcclxuXHJcbiAgICAgICAgLy8gbW92ZVxyXG4gICAgICAgIGlmKHRoaXMua2V5cy5sZWZ0LmlzRG93bil7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueC0tO1xyXG4gICAgICAgIH0gZWxzZSBpZih0aGlzLmtleXMucmlnaHQuaXNEb3duKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS54Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmtleXMudXAuaXNEb3duKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuanVtcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29sbGlkZVxyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMucGxheWVyLCB0aGlzLmVuZW15LCAocGxheWVyLCBlbmVteSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29sbGlzaW9uIScsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnVwZGF0ZVN0YXRlKHsgbGlmZTogdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSAtIDEgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVTdGF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkuanMiLCJjbGFzcyBFeHRlbmRlZFNwcml0ZSBleHRlbmRzIFBoYXNlci5TcHJpdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSlcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xyXG4gICAgICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdyYXZpdHkueSA9IDUwMDtcclxuXHJcbiAgICAgICAgY29uc3QgZ2FtZVN0YXRlID0gdGhpcy5nYW1lLnN0YXRlLnN0YXRlc1t0aGlzLmdhbWUuc3RhdGUuY3VycmVudF0uZ2FtZVN0YXRlO1xyXG4gICAgICAgIG1vYngub2JzZXJ2ZShnYW1lU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UnLCBjaGFuZ2UsIGdhbWVTdGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGxpZmU6IDEwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSA9IG1vYnguYWN0aW9uKChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IE9iamVjdC5hc3NpZ24odGhpcy5zcHJpdGVTdGF0ZSwgY2hhbmdlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1slc10gbGlmZTogJywgc3ByaXRlLCB0aGlzLnNwcml0ZVN0YXRlLmxpZmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGp1bXAoKXtcclxuICAgICAgICBpZih0aGlzLmJvZHkudG91Y2hpbmcuZG93biB8fCB0aGlzLmJvZHkuYmxvY2tlZC5kb3duKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgLT0gMzAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdbU3ByaXRlXSBzdGF0ZScpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXh0ZW5kZWRTcHJpdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsImltcG9ydCBnYW1lQ29uZmlnIGZyb20gJy4vZ2FtZWNvbmZpZy5qcyc7XHJcbmltcG9ydCBQbGF5IGZyb20gJy4vZ2FtZXN0YXRlcy9wbGF5LmpzJztcclxuXHJcbi8vIGluc3RhbnRpYXRlIGEgUGhhc2VyLkdhbWVcclxuY29uc3QgUExBVEZPUk1FUiA9IG5ldyBQaGFzZXIuR2FtZShcclxuICAgIGdhbWVDb25maWcud2lkdGgsXHJcbiAgICBnYW1lQ29uZmlnLmhlaWdodCxcclxuICAgIFBoYXNlci5BVVRPLFxyXG4gICAgZ2FtZUNvbmZpZy5kb21FbGVtZW50XHJcbik7XHJcblxyXG4vLyByZWdpc3RlciBnYW1lc3RhdGVzICh3aWxsIGJlIGluc3RhbnRpYXRlZCB3LyB0aGlzLmdhbWUgYXMgMXN0IHBhcmFtLCBwYXNzIGdhbWVDb25maWcgYXMgMm5kKVxyXG5QTEFURk9STUVSLnN0YXRlLmFkZCgnUGxheScsIFBsYXkuYmluZChudWxsLCBnYW1lQ29uZmlnKSk7XHJcblxyXG4vLyBraWNrIG9mZiBmaXJzdCBnYW1lc3RhdGU6IE1lbnVcclxuUExBVEZPUk1FUi5zdGF0ZS5zdGFydCgnUGxheScsIHRydWUsIHRydWUsIHtcclxuICAgIGluaXRpYWxTdGF0ZTogJ3NvbWUgaW5pdGlhbCBzdGF0ZSdcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9