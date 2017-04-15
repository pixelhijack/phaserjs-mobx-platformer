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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
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

var _ExtendedSprite = __webpack_require__(3);

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
            this.player = new _ExtendedSprite2.default(this.game, 200, 200, 'player', this.gameState);

            // [ENEMY]
            this.enemy = new _ExtendedSprite2.default(this.game, 400, 200, 'dino', this.gameState);

            this.game.camera.follow(this.player);

            // bind keys
            this.keys = this.game.input.keyboard.createCursorKeys();
            this.keys.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        }
    }, {
        key: 'update',
        value: function update() {
            console.log('[PHASER][Component][Update]');
            // fps
            this.game.debug.text(this.game.time.fps, 5, 20);

            // move
            if (this.keys.left.isDown) {
                this.player.body.velocity.x--;
                this.player.updateState({ life: this.player.spriteState.life - 1 });
            } else if (this.keys.right.isDown) {
                this.player.body.velocity.x++;
            }

            // collide
            this.game.physics.arcade.collide(this.player, this.enemy, function (player, enemy) {
                console.log('collision!', arguments);
            });
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExtendedSprite = function (_Phaser$Sprite) {
    _inherits(ExtendedSprite, _Phaser$Sprite);

    function ExtendedSprite(game, x, y, sprite, gameState) {
        _classCallCheck(this, ExtendedSprite);

        var _this = _possibleConstructorReturn(this, (ExtendedSprite.__proto__ || Object.getPrototypeOf(ExtendedSprite)).call(this, game, x, y, sprite));

        _this.game = game;
        _this.game.add.existing(_this);
        _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.anchor.setTo(0.5, 0.5);
        _this.body.collideWorldBounds = true;
        _this.checkWorldBounds = true;
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
/* 4 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWQ4MmQyZjA3YmUzN2YwMTg1ZWQiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImdhbWVDb25maWciLCJ3aWR0aCIsImhlaWdodCIsImRvbUVsZW1lbnQiLCJHYW1lU3RhdGUiLCJrZXlzIiwidW5kZWZpbmVkIiwicGxheWVyIiwiZW5lbXkiLCJnYW1lU3RhdGUiLCJjb25maWdzIiwiY29uc29sZSIsImxvZyIsImdhbWUiLCJsb2FkIiwiaW1hZ2UiLCJ0aW1lIiwiYWR2YW5jZWRUaW1pbmciLCJ3b3JsZCIsInNldEJvdW5kcyIsInBoeXNpY3MiLCJzdGFydFN5c3RlbSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsIm1vYngiLCJvYnNlcnZhYmxlIiwiaW5pdGlhbGlzZWQiLCJzY29yZSIsInVwZGF0ZVN0YXRlIiwiYWN0aW9uIiwiY2hhbmdlIiwiT2JqZWN0IiwiYXNzaWduIiwib2JzZXJ2ZSIsImNhbWVyYSIsImZvbGxvdyIsImlucHV0Iiwia2V5Ym9hcmQiLCJjcmVhdGVDdXJzb3JLZXlzIiwic3BhY2UiLCJhZGRLZXkiLCJLZXlib2FyZCIsIlNQQUNFQkFSIiwiZGVidWciLCJ0ZXh0IiwiZnBzIiwibGVmdCIsImlzRG93biIsImJvZHkiLCJ2ZWxvY2l0eSIsIngiLCJsaWZlIiwic3ByaXRlU3RhdGUiLCJyaWdodCIsImFyY2FkZSIsImNvbGxpZGUiLCJhcmd1bWVudHMiLCJtb2R1bGUiLCJleHBvcnRzIiwiRXh0ZW5kZWRTcHJpdGUiLCJ5Iiwic3ByaXRlIiwiYWRkIiwiZXhpc3RpbmciLCJlbmFibGUiLCJhbmNob3IiLCJzZXRUbyIsImNvbGxpZGVXb3JsZEJvdW5kcyIsImNoZWNrV29ybGRCb3VuZHMiLCJTcHJpdGUiLCJQTEFURk9STUVSIiwiR2FtZSIsIkFVVE8iLCJzdGF0ZSIsImJpbmQiLCJzdGFydCIsImluaXRpYWxTdGF0ZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDaEVBLElBQU1BLGFBQWE7QUFDZkMsV0FBTyxHQURRO0FBRWZDLFlBQVEsR0FGTztBQUdmQyxnQkFBWTtBQUhHLENBQW5COztrQkFNZUgsVTs7Ozs7Ozs7Ozs7QUNOZjs7Ozs7Ozs7SUFFTUksUztBQUNGLHVCQUFZSixVQUFaLEVBQXdCO0FBQUE7O0FBQ3BCLGFBQUtBLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsYUFBS0ssSUFBTCxHQUFZQyxTQUFaO0FBQ0EsYUFBS0MsTUFBTCxHQUFjRCxTQUFkO0FBQ0EsYUFBS0UsS0FBTCxHQUFhRixTQUFiO0FBQ0EsYUFBS0csU0FBTCxHQUFpQkgsU0FBakI7QUFDSDs7Ozs2QkFFSUksTyxFQUFRO0FBQ1RDLG9CQUFRQyxHQUFSLENBQVksMkJBQVosRUFBeUNGLE9BQXpDO0FBQ0g7OztrQ0FFUTtBQUNMQyxvQkFBUUMsR0FBUixDQUFZLDhCQUFa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QUFDL0IwQixrQkFBTTtBQUR5QixTQUFoQixDQUFuQjtBQUdBLGNBQUt2QixXQUFMLEdBQW1CSixLQUFLSyxNQUFMLENBQVksVUFBQ0MsTUFBRCxFQUFZO0FBQ3ZDLGtCQUFLc0IsV0FBTCxHQUFtQnJCLE9BQU9DLE1BQVAsQ0FBYyxNQUFLb0IsV0FBbkIsRUFBZ0N0QixNQUFoQyxDQUFuQjtBQUNBdEIsb0JBQVFDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCb0QsTUFBM0IsRUFBbUMsTUFBS1QsV0FBTCxDQUFpQkQsSUFBcEQ7QUFDSCxTQUhrQixDQUFuQjtBQWRzQztBQWtCekM7Ozs7aUNBRU87QUFDSjtBQUNIOzs7O0VBdkJ3QmhDLE9BQU9rRCxNOztBQXdCbkM7O2tCQUVjVixjOzs7Ozs7Ozs7QUMxQmY7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDQSxJQUFNVyxhQUFhLElBQUluRCxPQUFPb0QsSUFBWCxDQUNmLHFCQUFXekUsS0FESSxFQUVmLHFCQUFXQyxNQUZJLEVBR2ZvQixPQUFPcUQsSUFIUSxFQUlmLHFCQUFXeEUsVUFKSSxDQUFuQjs7QUFPQTtBQUNBc0UsV0FBV0csS0FBWCxDQUFpQlgsR0FBakIsQ0FBcUIsTUFBckIsRUFBNkIsZUFBS1ksSUFBTCxDQUFVLElBQVYsdUJBQTdCOztBQUVBO0FBQ0FKLFdBQVdHLEtBQVgsQ0FBaUJFLEtBQWpCLENBQXVCLE1BQXZCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDLEVBQTJDO0FBQ3ZDQyxrQkFBYztBQUR5QixDQUEzQyxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDVkODJkMmYwN2JlMzdmMDE4NWVkIiwiY29uc3QgZ2FtZUNvbmZpZyA9IHtcclxuICAgIHdpZHRoOiA1NDYsXHJcbiAgICBoZWlnaHQ6IDM2OCxcclxuICAgIGRvbUVsZW1lbnQ6ICdnYW1lJ1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZUNvbmZpZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lY29uZmlnLmpzIiwiaW1wb3J0IEV4dGVuZGVkU3ByaXRlIGZyb20gJy4uL2NvbXBvbmVudHMvRXh0ZW5kZWRTcHJpdGUnO1xuXHJcbmNsYXNzIEdhbWVTdGF0ZXtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWVDb25maWcpIHtcclxuICAgICAgICB0aGlzLmdhbWVDb25maWcgPSBnYW1lQ29uZmlnO1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnBsYXllciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmVuZW15ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoY29uZmlncyl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bSW5pdF0nLCBjb25maWdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcmVsb2FkKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bUHJlbG9hZF0nKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSgncGxheWVyJywgJ21hbi5wbmcnKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSgnZGlubycsICdkaW5vLnBuZycpO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bQ3JlYXRlXScpO1xyXG4gICAgICAgIC8vIGZwcyBkZWJ1Z2dpbmdcclxuICAgICAgICB0aGlzLmdhbWUudGltZS5hZHZhbmNlZFRpbWluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIFtTRVQgTEVWRUxdIHNldCBkaW1lbnNpb25zLCBzdGFydCBwaHlzaWMgc3lzdGVtXHJcbiAgICAgICAgdGhpcy5nYW1lLndvcmxkLnNldEJvdW5kcyhcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgdGhpcy5nYW1lQ29uZmlnLndpZHRoLFxyXG4gICAgICAgICAgICB0aGlzLmdhbWVDb25maWcuaGVpZ2h0XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuICAgICAgICB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyNmZmYnO1xuXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gbW9ieC5vYnNlcnZhYmxlKHtcclxuICAgICAgICAgICAgaW5pdGlhbGlzZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzY29yZTogMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IE9iamVjdC5hc3NpZ24odGhpcy5nYW1lU3RhdGUsIGNoYW5nZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1vYngub2JzZXJ2ZSh0aGlzLmdhbWVTdGF0ZSwgY2hhbmdlID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tnYW1lU3RhdGVdIGNoYW5nZScsIGNoYW5nZSwgdGhpcy5nYW1lU3RhdGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHsgaW5pdGlhbGlzZWQ6IHRydWUgfSk7XHJcblxyXG4gICAgICAgIC8vIFtQTEFZRVJdXHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgRXh0ZW5kZWRTcHJpdGUodGhpcy5nYW1lLCAyMDAsIDIwMCwgJ3BsYXllcicsIHRoaXMuZ2FtZVN0YXRlKTtcclxuXHJcbiAgICAgICAgLy8gW0VORU1ZXVxyXG4gICAgICAgIHRoaXMuZW5lbXkgPSBuZXcgRXh0ZW5kZWRTcHJpdGUodGhpcy5nYW1lLCA0MDAsIDIwMCwgJ2Rpbm8nLCB0aGlzLmdhbWVTdGF0ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcclxuXHJcbiAgICAgICAgLy8gYmluZCBrZXlzXHJcbiAgICAgICAgdGhpcy5rZXlzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuICAgICAgICB0aGlzLmtleXMuc3BhY2UgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TUEFDRUJBUik7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtVcGRhdGVdJyk7XHJcbiAgICAgICAgLy8gZnBzXHJcbiAgICAgICAgdGhpcy5nYW1lLmRlYnVnLnRleHQodGhpcy5nYW1lLnRpbWUuZnBzLCA1LCAyMCk7XHJcblxyXG4gICAgICAgIC8vIG1vdmVcclxuICAgICAgICBpZih0aGlzLmtleXMubGVmdC5pc0Rvd24pe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LngtLTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudXBkYXRlU3RhdGUoeyBsaWZlOiB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlIC0gMSB9KTtcclxuICAgICAgICB9IGVsc2UgaWYodGhpcy5rZXlzLnJpZ2h0LmlzRG93bil7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29sbGlkZVxyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmVuZW15LCBmdW5jdGlvbihwbGF5ZXIsIGVuZW15KXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbGxpc2lvbiEnLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lU3RhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5LmpzIiwiY2xhc3MgRXh0ZW5kZWRTcHJpdGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRle1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBnYW1lU3RhdGUpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSlcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xyXG4gICAgICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgbW9ieC5vYnNlcnZlKGdhbWVTdGF0ZSwgY2hhbmdlID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZScsIGNoYW5nZSwgZ2FtZVN0YXRlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gbW9ieC5vYnNlcnZhYmxlKHtcclxuICAgICAgICAgICAgbGlmZTogMTBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gT2JqZWN0LmFzc2lnbih0aGlzLnNwcml0ZVN0YXRlLCBjaGFuZ2UpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnWyVzXSBsaWZlOiAnLCBzcHJpdGUsIHRoaXMuc3ByaXRlU3RhdGUubGlmZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnW1Nwcml0ZV0gc3RhdGUnKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4dGVuZGVkU3ByaXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvRXh0ZW5kZWRTcHJpdGUuanMiLCJpbXBvcnQgZ2FtZUNvbmZpZyBmcm9tICcuL2dhbWVjb25maWcuanMnO1xyXG5pbXBvcnQgUGxheSBmcm9tICcuL2dhbWVzdGF0ZXMvcGxheS5qcyc7XHJcblxyXG4vLyBpbnN0YW50aWF0ZSBhIFBoYXNlci5HYW1lXHJcbmNvbnN0IFBMQVRGT1JNRVIgPSBuZXcgUGhhc2VyLkdhbWUoXHJcbiAgICBnYW1lQ29uZmlnLndpZHRoLFxyXG4gICAgZ2FtZUNvbmZpZy5oZWlnaHQsXHJcbiAgICBQaGFzZXIuQVVUTyxcclxuICAgIGdhbWVDb25maWcuZG9tRWxlbWVudFxyXG4pO1xyXG5cclxuLy8gcmVnaXN0ZXIgZ2FtZXN0YXRlcyAod2lsbCBiZSBpbnN0YW50aWF0ZWQgdy8gdGhpcy5nYW1lIGFzIDFzdCBwYXJhbSwgcGFzcyBnYW1lQ29uZmlnIGFzIDJuZClcclxuUExBVEZPUk1FUi5zdGF0ZS5hZGQoJ1BsYXknLCBQbGF5LmJpbmQobnVsbCwgZ2FtZUNvbmZpZykpO1xyXG5cclxuLy8ga2ljayBvZmYgZmlyc3QgZ2FtZXN0YXRlOiBNZW51XHJcblBMQVRGT1JNRVIuc3RhdGUuc3RhcnQoJ1BsYXknLCB0cnVlLCB0cnVlLCB7XHJcbiAgICBpbml0aWFsU3RhdGU6ICdzb21lIGluaXRpYWwgc3RhdGUnXHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==