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
                hit: false,
                counter: 0
            });

            this.updateState = mobx.action(function () {
                _this.gameState.counter++;
            });

            // [PLAYER]
            this.player = new _ExtendedSprite2.default(this.game, 200, 200, 'player', this.gameState);

            // [ENEMY]
            this.enemy = this.game.add.sprite(400, 200, 'dino');

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
                this.player.x--;
                this.updateState();
            } else if (this.keys.right.isDown) {
                this.player.x++;
            }

            // collide
            this.game.physics.arcade.collide(this.player, this.enemies, function (player, enemy) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTdlZGJlMDZkNGZjMzFhN2Y0MDEiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImdhbWVDb25maWciLCJ3aWR0aCIsImhlaWdodCIsImRvbUVsZW1lbnQiLCJHYW1lU3RhdGUiLCJrZXlzIiwidW5kZWZpbmVkIiwicGxheWVyIiwiZW5lbXkiLCJnYW1lU3RhdGUiLCJjb25maWdzIiwiY29uc29sZSIsImxvZyIsImdhbWUiLCJsb2FkIiwiaW1hZ2UiLCJ0aW1lIiwiYWR2YW5jZWRUaW1pbmciLCJ3b3JsZCIsInNldEJvdW5kcyIsInBoeXNpY3MiLCJzdGFydFN5c3RlbSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsIm1vYngiLCJvYnNlcnZhYmxlIiwiaGl0IiwiY291bnRlciIsInVwZGF0ZVN0YXRlIiwiYWN0aW9uIiwiYWRkIiwic3ByaXRlIiwiY2FtZXJhIiwiZm9sbG93IiwiaW5wdXQiLCJrZXlib2FyZCIsImNyZWF0ZUN1cnNvcktleXMiLCJzcGFjZSIsImFkZEtleSIsIktleWJvYXJkIiwiU1BBQ0VCQVIiLCJkZWJ1ZyIsInRleHQiLCJmcHMiLCJsZWZ0IiwiaXNEb3duIiwieCIsInJpZ2h0IiwiYXJjYWRlIiwiY29sbGlkZSIsImVuZW1pZXMiLCJhcmd1bWVudHMiLCJtb2R1bGUiLCJleHBvcnRzIiwiRXh0ZW5kZWRTcHJpdGUiLCJ5IiwiZXhpc3RpbmciLCJlbmFibGUiLCJhbmNob3IiLCJzZXRUbyIsImJvZHkiLCJjb2xsaWRlV29ybGRCb3VuZHMiLCJjaGVja1dvcmxkQm91bmRzIiwib2JzZXJ2ZSIsImNoYW5nZSIsIlNwcml0ZSIsIlBMQVRGT1JNRVIiLCJHYW1lIiwiQVVUTyIsInN0YXRlIiwiYmluZCIsInN0YXJ0IiwiaW5pdGlhbFN0YXRlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNoRUEsSUFBTUEsYUFBYTtBQUNmQyxXQUFPLEdBRFE7QUFFZkMsWUFBUSxHQUZPO0FBR2ZDLGdCQUFZO0FBSEcsQ0FBbkI7O2tCQU1lSCxVOzs7Ozs7Ozs7OztBQ05mOzs7Ozs7OztJQUVNSSxTO0FBQ0YsdUJBQVlKLFVBQVosRUFBd0I7QUFBQTs7QUFDcEIsYUFBS0EsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxhQUFLSyxJQUFMLEdBQVlDLFNBQVo7QUFDQSxhQUFLQyxNQUFMLEdBQWNELFNBQWQ7QUFDQSxhQUFLRSxLQUFMLEdBQWFGLFNBQWI7QUFDQSxhQUFLRyxTQUFMLEdBQWlCSCxTQUFqQjtBQUNIOzs7OzZCQUVJSSxPLEVBQVE7QUFDVEMsb0JBQVFDLEdBQVIsQ0FBWSwyQkFBWixFQUF5Q0YsT0FBekM7QUFDSDs7O2tDQUVRO0FBQ0xDLG9CQUFRQyxHQUFSLENBQVksOEJBQVo7QUFDQSxpQkFBS0MsSUFBTCxDQUFVQyxJQUFWLENBQWVDLEtBQWYsQ0FBcUIs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IFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDE3ZWRiZTA2ZDRmYzMxYTdmNDAxIiwiY29uc3QgZ2FtZUNvbmZpZyA9IHtcclxuICAgIHdpZHRoOiA1NDYsXHJcbiAgICBoZWlnaHQ6IDM2OCxcclxuICAgIGRvbUVsZW1lbnQ6ICdnYW1lJ1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZUNvbmZpZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lY29uZmlnLmpzIiwiaW1wb3J0IEV4dGVuZGVkU3ByaXRlIGZyb20gJy4uL2NvbXBvbmVudHMvRXh0ZW5kZWRTcHJpdGUnO1xuXHJcbmNsYXNzIEdhbWVTdGF0ZXtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWVDb25maWcpIHtcclxuICAgICAgICB0aGlzLmdhbWVDb25maWcgPSBnYW1lQ29uZmlnO1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnBsYXllciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmVuZW15ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoY29uZmlncyl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bSW5pdF0nLCBjb25maWdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcmVsb2FkKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bUHJlbG9hZF0nKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSgncGxheWVyJywgJ21hbi5wbmcnKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSgnZGlubycsICdkaW5vLnBuZycpO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bQ3JlYXRlXScpO1xyXG4gICAgICAgIC8vIGZwcyBkZWJ1Z2dpbmdcclxuICAgICAgICB0aGlzLmdhbWUudGltZS5hZHZhbmNlZFRpbWluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIFtTRVQgTEVWRUxdIHNldCBkaW1lbnNpb25zLCBzdGFydCBwaHlzaWMgc3lzdGVtXHJcbiAgICAgICAgdGhpcy5nYW1lLndvcmxkLnNldEJvdW5kcyhcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgdGhpcy5nYW1lQ29uZmlnLndpZHRoLFxyXG4gICAgICAgICAgICB0aGlzLmdhbWVDb25maWcuaGVpZ2h0XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuICAgICAgICB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyNmZmYnO1xuXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gbW9ieC5vYnNlcnZhYmxlKHtcclxuICAgICAgICAgICAgaGl0OiBmYWxzZSxcclxuICAgICAgICAgICAgY291bnRlcjogMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZS5jb3VudGVyKys7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFtQTEFZRVJdXHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgRXh0ZW5kZWRTcHJpdGUodGhpcy5nYW1lLCAyMDAsIDIwMCwgJ3BsYXllcicsIHRoaXMuZ2FtZVN0YXRlKTtcclxuXHJcbiAgICAgICAgLy8gW0VORU1ZXVxyXG4gICAgICAgIHRoaXMuZW5lbXkgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSg0MDAsIDIwMCwgJ2Rpbm8nKTtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xyXG5cclxuICAgICAgICAvLyBiaW5kIGtleXNcclxuICAgICAgICB0aGlzLmtleXMgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xyXG4gICAgICAgIHRoaXMua2V5cy5zcGFjZSA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlNQQUNFQkFSKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW1VwZGF0ZV0nKTtcclxuICAgICAgICAvLyBmcHNcclxuICAgICAgICB0aGlzLmdhbWUuZGVidWcudGV4dCh0aGlzLmdhbWUudGltZS5mcHMsIDUsIDIwKTtcclxuXHJcbiAgICAgICAgLy8gbW92ZVxyXG4gICAgICAgIGlmKHRoaXMua2V5cy5sZWZ0LmlzRG93bil7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLngtLTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZih0aGlzLmtleXMucmlnaHQuaXNEb3duKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIueCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29sbGlkZVxyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmVuZW1pZXMsIGZ1bmN0aW9uKHBsYXllciwgZW5lbXkpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29sbGlzaW9uIScsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVTdGF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkuanMiLCJjbGFzcyBFeHRlbmRlZFNwcml0ZSBleHRlbmRzIFBoYXNlci5TcHJpdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIGdhbWVTdGF0ZSl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlKVxyXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzKTtcclxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuICAgICAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XHJcbiAgICAgICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jaGVja1dvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICBtb2J4Lm9ic2VydmUoZ2FtZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlJywgY2hhbmdlLCBnYW1lU3RhdGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ1tTcHJpdGVdIHN0YXRlJyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHRlbmRlZFNwcml0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9jb21wb25lbnRzL0V4dGVuZGVkU3ByaXRlLmpzIiwiaW1wb3J0IGdhbWVDb25maWcgZnJvbSAnLi9nYW1lY29uZmlnLmpzJztcclxuaW1wb3J0IFBsYXkgZnJvbSAnLi9nYW1lc3RhdGVzL3BsYXkuanMnO1xyXG5cclxuLy8gaW5zdGFudGlhdGUgYSBQaGFzZXIuR2FtZVxyXG5jb25zdCBQTEFURk9STUVSID0gbmV3IFBoYXNlci5HYW1lKFxyXG4gICAgZ2FtZUNvbmZpZy53aWR0aCxcclxuICAgIGdhbWVDb25maWcuaGVpZ2h0LFxyXG4gICAgUGhhc2VyLkFVVE8sXHJcbiAgICBnYW1lQ29uZmlnLmRvbUVsZW1lbnRcclxuKTtcclxuXHJcbi8vIHJlZ2lzdGVyIGdhbWVzdGF0ZXMgKHdpbGwgYmUgaW5zdGFudGlhdGVkIHcvIHRoaXMuZ2FtZSBhcyAxc3QgcGFyYW0sIHBhc3MgZ2FtZUNvbmZpZyBhcyAybmQpXHJcblBMQVRGT1JNRVIuc3RhdGUuYWRkKCdQbGF5JywgUGxheS5iaW5kKG51bGwsIGdhbWVDb25maWcpKTtcclxuXHJcbi8vIGtpY2sgb2ZmIGZpcnN0IGdhbWVzdGF0ZTogTWVudVxyXG5QTEFURk9STUVSLnN0YXRlLnN0YXJ0KCdQbGF5JywgdHJ1ZSwgdHJ1ZSwge1xyXG4gICAgaW5pdGlhbFN0YXRlOiAnc29tZSBpbml0aWFsIHN0YXRlJ1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=