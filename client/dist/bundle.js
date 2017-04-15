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
                this.player.x--;
                this.player.updateState({ life: this.player.spriteState.life - 1 });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjc1ZDE1MmRjZDU4OTBlNmEwNzciLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImdhbWVDb25maWciLCJ3aWR0aCIsImhlaWdodCIsImRvbUVsZW1lbnQiLCJHYW1lU3RhdGUiLCJrZXlzIiwidW5kZWZpbmVkIiwicGxheWVyIiwiZW5lbXkiLCJnYW1lU3RhdGUiLCJjb25maWdzIiwiY29uc29sZSIsImxvZyIsImdhbWUiLCJsb2FkIiwiaW1hZ2UiLCJ0aW1lIiwiYWR2YW5jZWRUaW1pbmciLCJ3b3JsZCIsInNldEJvdW5kcyIsInBoeXNpY3MiLCJzdGFydFN5c3RlbSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsIm1vYngiLCJvYnNlcnZhYmxlIiwiaW5pdGlhbGlzZWQiLCJzY29yZSIsInVwZGF0ZVN0YXRlIiwiYWN0aW9uIiwiY2hhbmdlIiwiT2JqZWN0IiwiYXNzaWduIiwib2JzZXJ2ZSIsImNhbWVyYSIsImZvbGxvdyIsImlucHV0Iiwia2V5Ym9hcmQiLCJjcmVhdGVDdXJzb3JLZXlzIiwic3BhY2UiLCJhZGRLZXkiLCJLZXlib2FyZCIsIlNQQUNFQkFSIiwiZGVidWciLCJ0ZXh0IiwiZnBzIiwibGVmdCIsImlzRG93biIsIngiLCJsaWZlIiwic3ByaXRlU3RhdGUiLCJyaWdodCIsImFyY2FkZSIsImNvbGxpZGUiLCJlbmVtaWVzIiwiYXJndW1lbnRzIiwibW9kdWxlIiwiZXhwb3J0cyIsIkV4dGVuZGVkU3ByaXRlIiwieSIsInNwcml0ZSIsImFkZCIsImV4aXN0aW5nIiwiZW5hYmxlIiwiYW5jaG9yIiwic2V0VG8iLCJib2R5IiwiY29sbGlkZVdvcmxkQm91bmRzIiwiY2hlY2tXb3JsZEJvdW5kcyIsIlNwcml0ZSIsIlBMQVRGT1JNRVIiLCJHYW1lIiwiQVVUTyIsInN0YXRlIiwiYmluZCIsInN0YXJ0IiwiaW5pdGlhbFN0YXRlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNoRUEsSUFBTUEsYUFBYTtBQUNmQyxXQUFPLEdBRFE7QUFFZkMsWUFBUSxHQUZPO0FBR2ZDLGdCQUFZO0FBSEcsQ0FBbkI7O2tCQU1lSCxVOzs7Ozs7Ozs7OztBQ05mOzs7Ozs7OztJQUVNSSxTO0FBQ0YsdUJBQVlKLFVBQVosRUFBd0I7QUFBQTs7QUFDcEIsYUFBS0EsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxhQUFLSyxJQUFMLEdBQVlDLFNBQVo7QUFDQSxhQUFLQyxNQUFMLEdBQWNELFNBQWQ7QUFDQSxhQUFLRSxLQUFMLEdBQWFGLFNBQWI7QUFDQSxhQUFLRyxTQUFMLEdBQWlCSCxTQUFqQjtBQUNIOzs7OzZCQUVJSSxPLEVBQVE7QUFDVEMsb0JBQVFDLEdBQVIsQ0FBWSwyQkFBWixFQUF5Q0YsT0FBekM7QUFDSDs7O2tDQUVRO0FBQ0xDLG9CQUFRQyxHQUFSLENBQVksOEJBQVo7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QkosS0FBS0ssTUFBTCxDQUFZLFVBQUNDLE1BQUQsRUFBWTtBQUN2QyxrQkFBS29CLFdBQUwsR0FBbUJuQixPQUFPQyxNQUFQLENBQWMsTUFBS2tCLFdBQW5CLEVBQWdDcEIsTUFBaEMsQ0FBbkI7QUFDQXRCLG9CQUFRQyxHQUFSLENBQVksYUFBWixFQUEyQm1ELE1BQTNCLEVBQW1DLE1BQUtWLFdBQUwsQ0FBaUJELElBQXBEO0FBQ0gsU0FIa0IsQ0FBbkI7QUFkc0M7QUFrQnpDOzs7O2lDQUVPO0FBQ0o7QUFDSDs7OztFQXZCd0I5QixPQUFPa0QsTTs7QUF3Qm5DOztrQkFFY1gsYzs7Ozs7Ozs7O0FDMUJmOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ0EsSUFBTVksYUFBYSxJQUFJbkQsT0FBT29ELElBQVgsQ0FDZixxQkFBV3pFLEtBREksRUFFZixxQkFBV0MsTUFGSSxFQUdmb0IsT0FBT3FELElBSFEsRUFJZixxQkFBV3hFLFVBSkksQ0FBbkI7O0FBT0E7QUFDQXNFLFdBQVdHLEtBQVgsQ0FBaUJaLEdBQWpCLENBQXFCLE1BQXJCLEVBQTZCLGVBQUthLElBQUwsQ0FBVSxJQUFWLHVCQUE3Qjs7QUFFQTtBQUNBSixXQUFXRyxLQUFYLENBQWlCRSxLQUFqQixDQUF1QixNQUF2QixFQUErQixJQUEvQixFQUFxQyxJQUFyQyxFQUEyQztBQUN2Q0Msa0JBQWM7QUFEeUIsQ0FBM0MsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2NzVkMTUyZGNkNTg5MGU2YTA3NyIsImNvbnN0IGdhbWVDb25maWcgPSB7XHJcbiAgICB3aWR0aDogNTQ2LFxyXG4gICAgaGVpZ2h0OiAzNjgsXHJcbiAgICBkb21FbGVtZW50OiAnZ2FtZSdcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVDb25maWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZWNvbmZpZy5qcyIsImltcG9ydCBFeHRlbmRlZFNwcml0ZSBmcm9tICcuLi9jb21wb25lbnRzL0V4dGVuZGVkU3ByaXRlJztcblxyXG5jbGFzcyBHYW1lU3RhdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lQ29uZmlnID0gZ2FtZUNvbmZpZztcclxuICAgICAgICB0aGlzLmtleXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5lbmVteSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KGNvbmZpZ3Mpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0luaXRdJywgY29uZmlncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJlbG9hZCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW1ByZWxvYWRdJyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ3BsYXllcicsICdtYW4ucG5nJyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ2Rpbm8nLCAnZGluby5wbmcnKTtcclxuICAgIH1cclxuICAgIGNyZWF0ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0NyZWF0ZV0nKTtcclxuICAgICAgICAvLyBmcHMgZGVidWdnaW5nXHJcbiAgICAgICAgdGhpcy5nYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBbU0VUIExFVkVMXSBzZXQgZGltZW5zaW9ucywgc3RhcnQgcGh5c2ljIHN5c3RlbVxyXG4gICAgICAgIHRoaXMuZ2FtZS53b3JsZC5zZXRCb3VuZHMoXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbmZpZy53aWR0aCxcclxuICAgICAgICAgICAgdGhpcy5nYW1lQ29uZmlnLmhlaWdodFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmJztcblxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGluaXRpYWxpc2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgc2NvcmU6IDBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSA9IG1vYnguYWN0aW9uKChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2FtZVN0YXRlLCBjaGFuZ2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtb2J4Lm9ic2VydmUodGhpcy5nYW1lU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbZ2FtZVN0YXRlXSBjaGFuZ2UnLCBjaGFuZ2UsIHRoaXMuZ2FtZVN0YXRlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7IGluaXRpYWxpc2VkOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAvLyBbUExBWUVSXVxyXG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IEV4dGVuZGVkU3ByaXRlKHRoaXMuZ2FtZSwgMjAwLCAyMDAsICdwbGF5ZXInLCB0aGlzLmdhbWVTdGF0ZSk7XHJcblxyXG4gICAgICAgIC8vIFtFTkVNWV1cclxuICAgICAgICB0aGlzLmVuZW15ID0gbmV3IEV4dGVuZGVkU3ByaXRlKHRoaXMuZ2FtZSwgNDAwLCAyMDAsICdkaW5vJywgdGhpcy5nYW1lU3RhdGUpO1xyXG5cclxuICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XHJcblxyXG4gICAgICAgIC8vIGJpbmQga2V5c1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XHJcbiAgICAgICAgdGhpcy5rZXlzLnNwYWNlID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bVXBkYXRlXScpO1xyXG4gICAgICAgIC8vIGZwc1xyXG4gICAgICAgIHRoaXMuZ2FtZS5kZWJ1Zy50ZXh0KHRoaXMuZ2FtZS50aW1lLmZwcywgNSwgMjApO1xyXG5cclxuICAgICAgICAvLyBtb3ZlXHJcbiAgICAgICAgaWYodGhpcy5rZXlzLmxlZnQuaXNEb3duKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIueC0tO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci51cGRhdGVTdGF0ZSh7IGxpZmU6IHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUgLSAxIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZih0aGlzLmtleXMucmlnaHQuaXNEb3duKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIueCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29sbGlkZVxyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmVuZW1pZXMsIGZ1bmN0aW9uKHBsYXllciwgZW5lbXkpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29sbGlzaW9uIScsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVTdGF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkuanMiLCJjbGFzcyBFeHRlbmRlZFNwcml0ZSBleHRlbmRzIFBoYXNlci5TcHJpdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIGdhbWVTdGF0ZSl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlKVxyXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzKTtcclxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuICAgICAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XHJcbiAgICAgICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jaGVja1dvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICBtb2J4Lm9ic2VydmUoZ2FtZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlJywgY2hhbmdlLCBnYW1lU3RhdGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgICAgICBsaWZlOiAxMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUgPSBtb2J4LmFjdGlvbigoY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuc3ByaXRlU3RhdGUsIGNoYW5nZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbJXNdIGxpZmU6ICcsIHNwcml0ZSwgdGhpcy5zcHJpdGVTdGF0ZS5saWZlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdbU3ByaXRlXSBzdGF0ZScpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXh0ZW5kZWRTcHJpdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsImltcG9ydCBnYW1lQ29uZmlnIGZyb20gJy4vZ2FtZWNvbmZpZy5qcyc7XHJcbmltcG9ydCBQbGF5IGZyb20gJy4vZ2FtZXN0YXRlcy9wbGF5LmpzJztcclxuXHJcbi8vIGluc3RhbnRpYXRlIGEgUGhhc2VyLkdhbWVcclxuY29uc3QgUExBVEZPUk1FUiA9IG5ldyBQaGFzZXIuR2FtZShcclxuICAgIGdhbWVDb25maWcud2lkdGgsXHJcbiAgICBnYW1lQ29uZmlnLmhlaWdodCxcclxuICAgIFBoYXNlci5BVVRPLFxyXG4gICAgZ2FtZUNvbmZpZy5kb21FbGVtZW50XHJcbik7XHJcblxyXG4vLyByZWdpc3RlciBnYW1lc3RhdGVzICh3aWxsIGJlIGluc3RhbnRpYXRlZCB3LyB0aGlzLmdhbWUgYXMgMXN0IHBhcmFtLCBwYXNzIGdhbWVDb25maWcgYXMgMm5kKVxyXG5QTEFURk9STUVSLnN0YXRlLmFkZCgnUGxheScsIFBsYXkuYmluZChudWxsLCBnYW1lQ29uZmlnKSk7XHJcblxyXG4vLyBraWNrIG9mZiBmaXJzdCBnYW1lc3RhdGU6IE1lbnVcclxuUExBVEZPUk1FUi5zdGF0ZS5zdGFydCgnUGxheScsIHRydWUsIHRydWUsIHtcclxuICAgIGluaXRpYWxTdGF0ZTogJ3NvbWUgaW5pdGlhbCBzdGF0ZSdcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9