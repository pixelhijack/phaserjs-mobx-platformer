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
            this.enemy.body.velocity.x = Math.random() * -10 - 10;

            this.game.camera.follow(this.player);

            // bind keys
            this.keys = this.game.input.keyboard.createCursorKeys();
            this.keys.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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
        _this.body.gravity.y = 500;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjBkMGVhMWNmNzY5ODE2NjE0NWMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImdhbWVDb25maWciLCJ3aWR0aCIsImhlaWdodCIsImRvbUVsZW1lbnQiLCJHYW1lU3RhdGUiLCJrZXlzIiwidW5kZWZpbmVkIiwicGxheWVyIiwiZW5lbXkiLCJnYW1lU3RhdGUiLCJjb25maWdzIiwiY29uc29sZSIsImxvZyIsImdhbWUiLCJsb2FkIiwiaW1hZ2UiLCJ0aW1lIiwiYWR2YW5jZWRUaW1pbmciLCJ3b3JsZCIsInNldEJvdW5kcyIsInBoeXNpY3MiLCJzdGFydFN5c3RlbSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsIm1vYngiLCJvYnNlcnZhYmxlIiwiaW5pdGlhbGlzZWQiLCJzY29yZSIsInVwZGF0ZVN0YXRlIiwiYWN0aW9uIiwiY2hhbmdlIiwiT2JqZWN0IiwiYXNzaWduIiwib2JzZXJ2ZSIsImJvZHkiLCJ2ZWxvY2l0eSIsIngiLCJNYXRoIiwicmFuZG9tIiwiY2FtZXJhIiwiZm9sbG93IiwiaW5wdXQiLCJrZXlib2FyZCIsImNyZWF0ZUN1cnNvcktleXMiLCJzcGFjZSIsImFkZEtleSIsIktleWJvYXJkIiwiU1BBQ0VCQVIiLCJkZWJ1ZyIsInRleHQiLCJmcHMiLCJsZWZ0IiwiaXNEb3duIiwicmlnaHQiLCJ1cCIsImp1bXAiLCJhcmNhZGUiLCJvdmVybGFwIiwibGlmZSIsInNwcml0ZVN0YXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsIkV4dGVuZGVkU3ByaXRlIiwieSIsInNwcml0ZSIsImFkZCIsImV4aXN0aW5nIiwiZW5hYmxlIiwiYW5jaG9yIiwic2V0VG8iLCJjb2xsaWRlV29ybGRCb3VuZHMiLCJjaGVja1dvcmxkQm91bmRzIiwiZ3Jhdml0eSIsInRvdWNoaW5nIiwiZG93biIsImJsb2NrZWQiLCJTcHJpdGUiLCJQTEFURk9STUVSIiwiR2FtZSIsIkFVVE8iLCJzdGF0ZSIsImJpbmQiLCJzdGFydCIsImluaXRpYWxTdGF0ZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDaEVBLElBQU1BLGFBQWE7QUFDZkMsV0FBTyxHQURRO0FBRWZDLFlBQVEsR0FGTztBQUdmQyxnQkFBWTtBQUhHLENBQW5COztrQkFNZUgsVTs7Ozs7Ozs7Ozs7QUNOZjs7Ozs7Ozs7SUFFTUksUztBQUNGLHVCQUFZSixVQUFaLEVBQXdCO0FBQUE7O0FBQ3BCLGFBQUtBLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsYUFBS0ssSUFBTCxHQUFZQyxTQUFaO0FBQ0EsYUFBS0MsTUFBTCxHQUFjRCxTQUFkO0FBQ0EsYUFBS0UsS0FBTCxHQUFhRixTQUFiO0FBQ0EsYUFBS0csU0FBTCxHQUFpQkgsU0FBakI7QUFDSDs7Ozs2QkFFSUksTyxFQUFRO0FBQ1RDLG9CQUFRQyxHQUFSLENBQVksMkJBQVos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QixPQUFPNEQsSUFIUSxFQUlmLHFCQUFXL0UsVUFKSSxDQUFuQjs7QUFPQTtBQUNBNkUsV0FBV0csS0FBWCxDQUFpQmYsR0FBakIsQ0FBcUIsTUFBckIsRUFBNkIsZUFBS2dCLElBQUwsQ0FBVSxJQUFWLHVCQUE3Qjs7QUFFQTtBQUNBSixXQUFXRyxLQUFYLENBQWlCRSxLQUFqQixDQUF1QixNQUF2QixFQUErQixJQUEvQixFQUFxQyxJQUFyQyxFQUEyQztBQUN2Q0Msa0JBQWM7QUFEeUIsQ0FBM0MsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2MGQwZWExY2Y3Njk4MTY2MTQ1YyIsImNvbnN0IGdhbWVDb25maWcgPSB7XHJcbiAgICB3aWR0aDogNTQ2LFxyXG4gICAgaGVpZ2h0OiAzNjgsXHJcbiAgICBkb21FbGVtZW50OiAnZ2FtZSdcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVDb25maWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZWNvbmZpZy5qcyIsImltcG9ydCBFeHRlbmRlZFNwcml0ZSBmcm9tICcuLi9jb21wb25lbnRzL0V4dGVuZGVkU3ByaXRlJztcblxyXG5jbGFzcyBHYW1lU3RhdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lQ29uZmlnID0gZ2FtZUNvbmZpZztcclxuICAgICAgICB0aGlzLmtleXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5lbmVteSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KGNvbmZpZ3Mpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0luaXRdJywgY29uZmlncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJlbG9hZCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW1ByZWxvYWRdJyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ3BsYXllcicsICdtYW4ucG5nJyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ2Rpbm8nLCAnZGluby5wbmcnKTtcclxuICAgIH1cclxuICAgIGNyZWF0ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0NyZWF0ZV0nKTtcclxuICAgICAgICAvLyBmcHMgZGVidWdnaW5nXHJcbiAgICAgICAgdGhpcy5nYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBbU0VUIExFVkVMXSBzZXQgZGltZW5zaW9ucywgc3RhcnQgcGh5c2ljIHN5c3RlbVxyXG4gICAgICAgIHRoaXMuZ2FtZS53b3JsZC5zZXRCb3VuZHMoXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbmZpZy53aWR0aCxcclxuICAgICAgICAgICAgdGhpcy5nYW1lQ29uZmlnLmhlaWdodFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmJztcblxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGluaXRpYWxpc2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgc2NvcmU6IDBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSA9IG1vYnguYWN0aW9uKChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2FtZVN0YXRlLCBjaGFuZ2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtb2J4Lm9ic2VydmUodGhpcy5nYW1lU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbZ2FtZVN0YXRlXSBjaGFuZ2UnLCBjaGFuZ2UsIHRoaXMuZ2FtZVN0YXRlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7IGluaXRpYWxpc2VkOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAvLyBbUExBWUVSXVxyXG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IEV4dGVuZGVkU3ByaXRlKHRoaXMuZ2FtZSwgMjAwLCAyMDAsICdwbGF5ZXInLCB0aGlzLmdhbWVTdGF0ZSk7XHJcblxyXG4gICAgICAgIC8vIFtFTkVNWV1cclxuICAgICAgICB0aGlzLmVuZW15ID0gbmV3IEV4dGVuZGVkU3ByaXRlKHRoaXMuZ2FtZSwgNDAwLCAyMDAsICdkaW5vJywgdGhpcy5nYW1lU3RhdGUpO1xyXG4gICAgICAgIHRoaXMuZW5lbXkuYm9keS52ZWxvY2l0eS54ID0gTWF0aC5yYW5kb20oKSAqICgtMTApIC0gMTA7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcclxuXHJcbiAgICAgICAgLy8gYmluZCBrZXlzXHJcbiAgICAgICAgdGhpcy5rZXlzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuICAgICAgICB0aGlzLmtleXMuc3BhY2UgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TUEFDRUJBUik7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtVcGRhdGVdJyk7XHJcbiAgICAgICAgLy8gZnBzXHJcbiAgICAgICAgdGhpcy5nYW1lLmRlYnVnLnRleHQodGhpcy5nYW1lLnRpbWUuZnBzLCA1LCAyMCk7XHJcblxyXG4gICAgICAgIC8vIG1vdmVcclxuICAgICAgICBpZih0aGlzLmtleXMubGVmdC5pc0Rvd24pe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LngtLTtcclxuICAgICAgICB9IGVsc2UgaWYodGhpcy5rZXlzLnJpZ2h0LmlzRG93bil7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5rZXlzLnVwLmlzRG93bil7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmp1bXAoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbGxpZGVcclxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLnBsYXllciwgdGhpcy5lbmVteSwgKHBsYXllciwgZW5lbXkpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbGxpc2lvbiEnLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci51cGRhdGVTdGF0ZSh7IGxpZmU6IHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUgLSAxIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lU3RhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5LmpzIiwiY2xhc3MgRXh0ZW5kZWRTcHJpdGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRle1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc3ByaXRlLCBnYW1lU3RhdGUpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSlcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xyXG4gICAgICAgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ib2R5LmdyYXZpdHkueSA9IDUwMDtcclxuICAgICAgICBtb2J4Lm9ic2VydmUoZ2FtZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlJywgY2hhbmdlLCBnYW1lU3RhdGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgICAgICBsaWZlOiAxMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUgPSBtb2J4LmFjdGlvbigoY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuc3ByaXRlU3RhdGUsIGNoYW5nZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbJXNdIGxpZmU6ICcsIHNwcml0ZSwgdGhpcy5zcHJpdGVTdGF0ZS5saWZlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBqdW1wKCl7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnRvdWNoaW5nLmRvd24gfHwgdGhpcy5ib2R5LmJsb2NrZWQuZG93bil7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55IC09IDMwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnW1Nwcml0ZV0gc3RhdGUnKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4dGVuZGVkU3ByaXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvRXh0ZW5kZWRTcHJpdGUuanMiLCJpbXBvcnQgZ2FtZUNvbmZpZyBmcm9tICcuL2dhbWVjb25maWcuanMnO1xyXG5pbXBvcnQgUGxheSBmcm9tICcuL2dhbWVzdGF0ZXMvcGxheS5qcyc7XHJcblxyXG4vLyBpbnN0YW50aWF0ZSBhIFBoYXNlci5HYW1lXHJcbmNvbnN0IFBMQVRGT1JNRVIgPSBuZXcgUGhhc2VyLkdhbWUoXHJcbiAgICBnYW1lQ29uZmlnLndpZHRoLFxyXG4gICAgZ2FtZUNvbmZpZy5oZWlnaHQsXHJcbiAgICBQaGFzZXIuQVVUTyxcclxuICAgIGdhbWVDb25maWcuZG9tRWxlbWVudFxyXG4pO1xyXG5cclxuLy8gcmVnaXN0ZXIgZ2FtZXN0YXRlcyAod2lsbCBiZSBpbnN0YW50aWF0ZWQgdy8gdGhpcy5nYW1lIGFzIDFzdCBwYXJhbSwgcGFzcyBnYW1lQ29uZmlnIGFzIDJuZClcclxuUExBVEZPUk1FUi5zdGF0ZS5hZGQoJ1BsYXknLCBQbGF5LmJpbmQobnVsbCwgZ2FtZUNvbmZpZykpO1xyXG5cclxuLy8ga2ljayBvZmYgZmlyc3QgZ2FtZXN0YXRlOiBNZW51XHJcblBMQVRGT1JNRVIuc3RhdGUuc3RhcnQoJ1BsYXknLCB0cnVlLCB0cnVlLCB7XHJcbiAgICBpbml0aWFsU3RhdGU6ICdzb21lIGluaXRpYWwgc3RhdGUnXHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==