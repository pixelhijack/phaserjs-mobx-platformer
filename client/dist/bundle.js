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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGZkYjE5OTZhZTBlNzBmMDRlNjEiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImdhbWVDb25maWciLCJ3aWR0aCIsImhlaWdodCIsImRvbUVsZW1lbnQiLCJHYW1lU3RhdGUiLCJrZXlzIiwidW5kZWZpbmVkIiwicGxheWVyIiwiZW5lbXkiLCJnYW1lU3RhdGUiLCJjb25maWdzIiwiY29uc29sZSIsImxvZyIsImdhbWUiLCJsb2FkIiwiaW1hZ2UiLCJ0aW1lIiwiYWR2YW5jZWRUaW1pbmciLCJ3b3JsZCIsInNldEJvdW5kcyIsInBoeXNpY3MiLCJzdGFydFN5c3RlbSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsIm1vYngiLCJvYnNlcnZhYmxlIiwiaW5pdGlhbGlzZWQiLCJzY29yZSIsInVwZGF0ZVN0YXRlIiwiYWN0aW9uIiwiY2hhbmdlIiwiT2JqZWN0IiwiYXNzaWduIiwib2JzZXJ2ZSIsImJvZHkiLCJ2ZWxvY2l0eSIsIngiLCJNYXRoIiwicmFuZG9tIiwiY2FtZXJhIiwiZm9sbG93IiwiaW5wdXQiLCJrZXlib2FyZCIsImNyZWF0ZUN1cnNvcktleXMiLCJzcGFjZSIsImFkZEtleSIsIktleWJvYXJkIiwiU1BBQ0VCQVIiLCJtZW51IiwiYWRkIiwidGV4dCIsInNwcml0ZVN0YXRlIiwibGlmZSIsImZvbnQiLCJmaWxsIiwiYWxpZ24iLCJzZXRNZW51Iiwic2V0VGV4dCIsImRlYnVnIiwiZnBzIiwibGVmdCIsImlzRG93biIsInJpZ2h0IiwidXAiLCJqdW1wIiwiYXJjYWRlIiwib3ZlcmxhcCIsIm1vZHVsZSIsImV4cG9ydHMiLCJFeHRlbmRlZFNwcml0ZSIsInkiLCJzcHJpdGUiLCJleGlzdGluZyIsImVuYWJsZSIsImFuY2hvciIsInNldFRvIiwiY29sbGlkZVdvcmxkQm91bmRzIiwiY2hlY2tXb3JsZEJvdW5kcyIsImdyYXZpdHkiLCJ0b3VjaGluZyIsImRvd24iLCJibG9ja2VkIiwiU3ByaXRlIiwiUExBVEZPUk1FUiIsIkdhbWUiLCJBVVRPIiwic3RhdGUiLCJiaW5kIiwic3RhcnQiLCJpbml0aWFsU3RhdGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2hFQSxJQUFNQSxhQUFhO0FBQ2ZDLFdBQU8sR0FEUTtBQUVmQyxZQUFRLEdBRk87QUFHZkMsZ0JBQVk7QUFIRyxDQUFuQjs7a0JBTWVILFU7Ozs7Ozs7Ozs7O0FDTmY7Ozs7Ozs7O0lBRU1JLFM7QUFDRix1QkFBWUosVUFBWixFQUF3QjtBQUFBOztBQUNwQixhQUFLQSxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLGFBQUtLLElBQUwsR0FBWUMsU0FBWjtBQUNBLGFBQUtDLE1BQUwsR0FBY0QsU0FBZDtBQUNBLGFBQUtFLEtBQUwsR0FBYUYsU0FBYjtBQUNBLGFBQUtHLFNBQUwsR0FBaUJILFNBQWpCO0FBQ0g7Ozs7NkJBRUlJLE8sRUFBUTtBQUNUQyxvQkFBUUMsR0FBUixDQUFZLDJCQUFaLEVBQXlDRixPQUF6QztBQUNIOzs7a0NBRVE7QUFDTEMsb0JBQVFDLEdBQVIsQ0FBWSw4QkFBWjtBQUNBLGlCQUFLQyxJQUFMLENBQVVDLElBQVYsQ0FBZUMsS0FBZixDQUFxQixRQUFyQixFQUErQixTQUEvQjtBQUNBLGlCQUFLRixJQUFMLENBQVVDLElBQVYsQ0FBZUMsS0FBZixDQUFxQixNQUFyQixFQUE2QixVQUE3QjtBQUNIOzs7aUNBQ087QUFBQTs7QUFDSkosb0JBQVFDLEdBQVIsQ0FBWSw2QkFBWjtBQUNBO0FBQ0EsaUJBQUtDLElBQUwsQ0FBVUcsSUFBVixDQUFlQyxjQUFmLEdBQWdDLElBQWhDOztBQUVBO0FBQ0EsaUJBQUtKLElBQUwsQ0FBVUssS0FBVixDQUFnQkMsU0FBaEIsQ0FDSSxDQURKLEVBRUksQ0FGSixFQUdJLEtBQUtuQixVQUFMLENBQWdCQyxLQUhwQixFQUlJLEtBQUtELFVBQUwsQ0FBZ0JFLE1BSnBCOztBQU9BLGlCQUFLVyxJQUFMLENBQVVPLE9BQVYsQ0FBa0JDLFdBQWxCLENBQThCQyxPQUFPQyxPQUFQLENBQWVDLE1BQTdDO0FBQ0EsaUJBQUtYLElBQUwsQ0FBVVksS0FBVixDQUFnQkMsZUFBaEIsR0FBa0MsTUFBbEM7O0FBRUEsaUJBQUtqQixTQUFMLEdBQWlCa0IsS0FBS0MsVUFBTCxDQUFnQjtBQUM3QkMsNkJBQWEsS0FEZ0I7QUFFN0JDLHVCQUFPO0FBRnNCLGFBQWhCLENBQWpCOztBQUtBLGlCQUFLQyxXQUFMLEdBQW1CSixLQUFLSyxNQUFMLENBQVksVUFBQ0MsTUFBRCxFQUFZO0FBQ3ZDLHNCQUFLeEIsU0FBTCxHQUFpQnlCLE9BQU9DLE1BQVAsQ0FBYyxNQUFLMUIsU0FBbkIsRUFBOEJ3QixNQUE5QixDQUFqQjtBQUNILGFBRmtCLENBQW5COztBQUlBTixpQkFBS1MsT0FBTCxDQUFhLEtBQUszQixTQUFsQixFQUE2QixrQkFBVTtBQUNuQ0Usd0JBQVFDLEdBQVIsQ0FBWSxvQkFBWixFQUFrQ3FCLE1BQWxDLEVBQTBDLE1BQUt4QixTQUEvQztBQUNILGFBRkQ7O0FBSUEsaUJBQUtzQixXQUFMLENBQWlCLEVBQUVGLGFBQWEsSUFBZixFQUFqQjs7QUFFQTtBQUNBLGlCQUFLdEIsTUFBTCxHQUFjLDZCQUFtQixLQUFLTSxJQUF4QixFQUE4QixHQUE5QixFQUFtQyxHQUFuQyxFQUF3QyxRQUF4QyxFQUFrRCxLQUFLSixTQUF2RCxDQUFkOztBQUVBO0FBQ0EsaUJBQUtELEtBQUwsR0FBYSw2QkFBbUIsS0FBS0ssSUFBeEIsRUFBOEIsR0FBOUIsRUFBbUMsR0FBbkMsRUFBd0MsTUFBeEMsRUFBZ0QsS0FBS0osU0FBckQsQ0FBYjtBQUNBLGlCQUFLRCxLQUFMLENBQVc2QixJQUFYLENBQWdCQyxRQUFoQixDQUF5QkMsQ0FBekIsR0FBNkJDLEtBQUtDLE1BQUwsS0FBaUIsQ0FBQyxFQUFsQixHQUF3QixFQUFyRDs7QUFFQSxpQkFBSzVCLElBQUwsQ0FBVTZCLE1BQVYsQ0FBaUJDLE1BQWpCLENBQXdCLEtBQUtwQyxNQUE3Qjs7QUFFQTtBQUNBLGlCQUFLRixJQUFMLEdBQVksS0FBS1EsSUFBTCxDQUFVK0IsS0FBVixDQUFnQkMsUUFBaEIsQ0FBeUJDLGdCQUF6QixFQUFaO0FBQ0EsaUJBQUt6QyxJQUFMLENBQVUwQyxLQUFWLEdBQWtCLEtBQUtsQyxJQUFMLENBQVUrQixLQUFWLENBQWdCQyxRQUFoQixDQUF5QkcsTUFBekIsQ0FBZ0MxQixPQUFPMkIsUUFBUCxDQUFnQkMsUUFBaEQsQ0FBbEI7O0FBRUE7QUFDQSxpQkFBS0MsSUFBTCxHQUFZLEtBQUt0QyxJQUFMLENBQVV1QyxHQUFWLENBQWNDLElBQWQsQ0FDUixHQURRLEVBRVIsQ0FGUSxFQUdSLFdBQVcsS0FBSzlDLE1BQUwsQ0FBWStDLFdBQVosQ0FBd0JDLElBSDNCLEVBSVIsRUFBRUMsTUFBTSxjQUFSLEVBQXdCQyxNQUFNLE1BQTlCLEVBQXNDQyxPQUFPLFFBQTdDLEVBSlEsQ0FBWjtBQU1BLGlCQUFLQyxPQUFMLEdBQWUsZ0JBQVE7QUFDbkIsc0JBQUtSLElBQUwsQ0FBVVMsT0FBVixDQUFrQixXQUFXTCxJQUE3QjtBQUNILGFBRkQ7QUFHQTVCLGlCQUFLUyxPQUFMLENBQWEsS0FBSzdCLE1BQUwsQ0FBWStDLFdBQXpCLEVBQXNDLGtCQUFVO0FBQzVDLHNCQUFLSyxPQUFMLENBQWEsTUFBS3BELE1BQUwsQ0FBWStDLFdBQVosQ0FBd0JDLElBQXJDO0FBQ0gsYUFGRDtBQUdIOzs7aUNBQ087QUFBQTtBQUFBOztBQUNKNUMsb0JBQVFDLEdBQVIsQ0FBWSw2QkFBWjtBQUNBO0FBQ0EsaUJBQUtDLElBQUwsQ0FBVWdELEtBQVYsQ0FBZ0JSLElBQWhCLENBQXFCLEtBQUt4QyxJQUFMLENBQVVHLElBQVYsQ0FBZThDLEdBQXBDLEVBQXlDLENBQXpDLEVBQTRDLEVBQTVDOztBQUVBO0FBQ0EsZ0JBQUcsS0FBS3pELElBQUwsQ0FBVTBELElBQVYsQ0FBZUMsTUFBbEIsRUFBeUI7QUFDckIscUJBQUt6RCxNQUFMLENBQVk4QixJQUFaLENBQWlCQyxRQUFqQixDQUEwQkMsQ0FBMUI7QUFDSCxhQUZELE1BRU8sSUFBRyxLQUFLbEMsSUFBTCxDQUFVNEQsS0FBVixDQUFnQkQsTUFBbkIsRUFBMEI7QUFDN0IscUJBQUt6RCxNQUFMLENBQVk4QixJQUFaLENBQWlCQyxRQUFqQixDQUEwQkMsQ0FBMUI7QUFDSDs7QUFFRCxnQkFBRyxLQUFLbEMsSUFBTCxDQUFVNkQsRUFBVixDQUFhRixNQUFoQixFQUF1QjtBQUNuQixxQkFBS3pELE1BQUwsQ0FBWTRELElBQVo7QUFDSDs7QUFFRDtBQUNBLGlCQUFLdEQsSUFBTCxDQUFVTyxPQUFWLENBQWtCZ0QsTUFBbEIsQ0FBeUJDLE9BQXpCLENBQWlDLEtBQUs5RCxNQUF0QyxFQUE4QyxLQUFLQyxLQUFuRCxFQUEwRCxVQUFDRCxNQUFELEVBQVNDLEtBQVQsRUFBbUI7QUFDekVHLHdCQUFRQyxHQUFSLENBQVksWUFBWjtBQUNBLHVCQUFLTCxNQUFMLENBQVl3QixXQUFaLENBQXdCLEVBQUV3QixNQUFNLE9BQUtoRCxNQUFMLENBQVkrQyxXQUFaLENBQXdCQyxJQUF4QixHQUErQixDQUF2QyxFQUF4QjtBQUNILGFBSEQ7QUFJSDs7Ozs7O0FBSUxlLE9BQU9DLE9BQVAsR0FBaUJuRSxTQUFqQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN2R01vRSxjOzs7QUFDRiw0QkFBWTNELElBQVosRUFBa0IwQixDQUFsQixFQUFxQmtDLENBQXJCLEVBQXdCQyxNQUF4QixFQUFnQ2pFLFNBQWhDLEVBQTBDO0FBQUE7O0FBQUEsb0lBQ2hDSSxJQURnQyxFQUMxQjBCLENBRDBCLEVBQ3ZCa0MsQ0FEdUIsRUFDcEJDLE1BRG9COztBQUV0QyxjQUFLN0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsY0FBS0EsSUFBTCxDQUFVdUMsR0FBVixDQUFjdUIsUUFBZDtBQUNBLGNBQUs5RCxJQUFMLENBQVVPLE9BQVYsQ0FBa0J3RCxNQUFsQixRQUErQnRELE9BQU9DLE9BQVAsQ0FBZUMsTUFBOUM7QUFDQSxjQUFLcUQsTUFBTCxDQUFZQyxLQUFaLENBQWtCLEdBQWxCLEVBQXVCLEdBQXZCO0FBQ0EsY0FBS3pDLElBQUwsQ0FBVTBDLGtCQUFWLEdBQStCLElBQS9CO0FBQ0EsY0FBS0MsZ0JBQUwsR0FBd0IsSUFBeEI7QUFDQSxjQUFLM0MsSUFBTCxDQUFVNEMsT0FBVixDQUFrQlIsQ0FBbEIsR0FBc0IsR0FBdEI7QUFDQTlDLGFBQUtTLE9BQUwsQ0FBYTNCLFNBQWIsRUFBd0Isa0JBQVU7QUFDOUJFLG9CQUFRQyxHQUFSLENBQVksUUFBWixFQUFzQnFCLE1BQXRCLEVBQThCeEIsU0FBOUI7QUFDSCxTQUZEO0FBR0EsY0FBSzZDLFdBQUwsR0FBbUIzQixLQUFLQyxVQUFMLENBQWdCO0FBQy9CMkIsa0JBQU07QUFEeUIsU0FBaEIsQ0FBbkI7QUFHQSxjQUFLeEIsV0FBTCxHQUFtQkosS0FBS0ssTUFBTCxDQUFZLFVBQUNDLE1BQUQsRUFBWTtBQUN2QyxrQkFBS3FCLFdBQUwsR0FBbUJwQixPQUFPQyxNQUFQLENBQWMsTUFBS21CLFdBQW5CLEVBQWdDckIsTUFBaEMsQ0FBbkI7QUFDQXRCLG9CQUFRQyxHQUFSLENBQVksYUFBWixFQUEyQjhELE1BQTNCLEVBQW1DLE1BQUtwQixXQUFMLENBQWlCQyxJQUFwRDtBQUNILFNBSGtCLENBQW5CO0FBZnNDO0FBbUJ6Qzs7OzsrQkFFSztBQUNGLGdCQUFHLEtBQUtsQixJQUFMLENBQVU2QyxRQUFWLENBQW1CQyxJQUFuQixJQUEyQixLQUFLOUMsSUFBTCxDQUFVK0MsT0FBVixDQUFrQkQsSUFBaEQsRUFBcUQ7QUFDakQscUJBQUs5QyxJQUFMLENBQVVDLFFBQVYsQ0FBbUJtQyxDQUFuQixJQUF3QixHQUF4QjtBQUNIO0FBQ0o7OztpQ0FFTztBQUNKO0FBQ0g7Ozs7RUE5QndCbkQsT0FBTytELE07O0FBK0JuQzs7a0JBRWNiLGM7Ozs7Ozs7OztBQ2pDZjs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBLElBQU1jLGFBQWEsSUFBSWhFLE9BQU9pRSxJQUFYLENBQ2YscUJBQVd0RixLQURJLEVBRWYscUJBQVdDLE1BRkksRUFHZm9CLE9BQU9rRSxJQUhRLEVBSWYscUJBQVdyRixVQUpJLENBQW5COztBQU9BO0FBQ0FtRixXQUFXRyxLQUFYLENBQWlCckMsR0FBakIsQ0FBcUIsTUFBckIsRUFBNkIsZUFBS3NDLElBQUwsQ0FBVSxJQUFWLHVCQUE3Qjs7QUFFQTtBQUNBSixXQUFXRyxLQUFYLENBQWlCRSxLQUFqQixDQUF1QixNQUF2QixFQUErQixJQUEvQixFQUFxQyxJQUFyQyxFQUEyQztBQUN2Q0Msa0JBQWM7QUFEeUIsQ0FBM0MsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4ZmRiMTk5NmFlMGU3MGYwNGU2MSIsImNvbnN0IGdhbWVDb25maWcgPSB7XHJcbiAgICB3aWR0aDogNTQ2LFxyXG4gICAgaGVpZ2h0OiAzNjgsXHJcbiAgICBkb21FbGVtZW50OiAnZ2FtZSdcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVDb25maWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZWNvbmZpZy5qcyIsImltcG9ydCBFeHRlbmRlZFNwcml0ZSBmcm9tICcuLi9jb21wb25lbnRzL0V4dGVuZGVkU3ByaXRlJztcblxyXG5jbGFzcyBHYW1lU3RhdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lQ29uZmlnID0gZ2FtZUNvbmZpZztcclxuICAgICAgICB0aGlzLmtleXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5lbmVteSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KGNvbmZpZ3Mpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0luaXRdJywgY29uZmlncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJlbG9hZCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW1ByZWxvYWRdJyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ3BsYXllcicsICdtYW4ucG5nJyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ2Rpbm8nLCAnZGluby5wbmcnKTtcclxuICAgIH1cclxuICAgIGNyZWF0ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0NyZWF0ZV0nKTtcclxuICAgICAgICAvLyBmcHMgZGVidWdnaW5nXHJcbiAgICAgICAgdGhpcy5nYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBbU0VUIExFVkVMXSBzZXQgZGltZW5zaW9ucywgc3RhcnQgcGh5c2ljIHN5c3RlbVxyXG4gICAgICAgIHRoaXMuZ2FtZS53b3JsZC5zZXRCb3VuZHMoXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbmZpZy53aWR0aCxcclxuICAgICAgICAgICAgdGhpcy5nYW1lQ29uZmlnLmhlaWdodFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmJztcblxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGluaXRpYWxpc2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgc2NvcmU6IDBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSA9IG1vYnguYWN0aW9uKChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2FtZVN0YXRlLCBjaGFuZ2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtb2J4Lm9ic2VydmUodGhpcy5nYW1lU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbZ2FtZVN0YXRlXSBjaGFuZ2UnLCBjaGFuZ2UsIHRoaXMuZ2FtZVN0YXRlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7IGluaXRpYWxpc2VkOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAvLyBbUExBWUVSXVxyXG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IEV4dGVuZGVkU3ByaXRlKHRoaXMuZ2FtZSwgMjAwLCAyMDAsICdwbGF5ZXInLCB0aGlzLmdhbWVTdGF0ZSk7XHJcblxyXG4gICAgICAgIC8vIFtFTkVNWV1cclxuICAgICAgICB0aGlzLmVuZW15ID0gbmV3IEV4dGVuZGVkU3ByaXRlKHRoaXMuZ2FtZSwgNDAwLCAyMDAsICdkaW5vJywgdGhpcy5nYW1lU3RhdGUpO1xyXG4gICAgICAgIHRoaXMuZW5lbXkuYm9keS52ZWxvY2l0eS54ID0gTWF0aC5yYW5kb20oKSAqICgtMTApIC0gMTA7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcclxuXHJcbiAgICAgICAgLy8gYmluZCBrZXlzXHJcbiAgICAgICAgdGhpcy5rZXlzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuICAgICAgICB0aGlzLmtleXMuc3BhY2UgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TUEFDRUJBUik7XHJcblxyXG4gICAgICAgIC8vIHNjb3JlIHRleHRcclxuICAgICAgICB0aGlzLm1lbnUgPSB0aGlzLmdhbWUuYWRkLnRleHQoXHJcbiAgICAgICAgICAgIDE1MCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgXCJMaWZlOiBcIiArIHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLmxpZmUsXHJcbiAgICAgICAgICAgIHsgZm9udDogXCIyNHB4IENvdXJpZXJcIiwgZmlsbDogXCIjMDAwXCIsIGFsaWduOiBcImNlbnRlclwiIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuc2V0TWVudSA9IGxpZmUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnUuc2V0VGV4dChcIkxpZmU6IFwiICsgbGlmZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBtb2J4Lm9ic2VydmUodGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TWVudSh0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW1VwZGF0ZV0nKTtcclxuICAgICAgICAvLyBmcHNcclxuICAgICAgICB0aGlzLmdhbWUuZGVidWcudGV4dCh0aGlzLmdhbWUudGltZS5mcHMsIDUsIDIwKTtcclxuXHJcbiAgICAgICAgLy8gbW92ZVxyXG4gICAgICAgIGlmKHRoaXMua2V5cy5sZWZ0LmlzRG93bil7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueC0tO1xyXG4gICAgICAgIH0gZWxzZSBpZih0aGlzLmtleXMucmlnaHQuaXNEb3duKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS54Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmtleXMudXAuaXNEb3duKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuanVtcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29sbGlkZVxyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMucGxheWVyLCB0aGlzLmVuZW15LCAocGxheWVyLCBlbmVteSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29sbGlzaW9uIScsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnVwZGF0ZVN0YXRlKHsgbGlmZTogdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSAtIDEgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVTdGF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkuanMiLCJjbGFzcyBFeHRlbmRlZFNwcml0ZSBleHRlbmRzIFBoYXNlci5TcHJpdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIGdhbWVTdGF0ZSl7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgc3ByaXRlKVxyXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzKTtcclxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuICAgICAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XHJcbiAgICAgICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jaGVja1dvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gNTAwO1xyXG4gICAgICAgIG1vYngub2JzZXJ2ZShnYW1lU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UnLCBjaGFuZ2UsIGdhbWVTdGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGxpZmU6IDEwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSA9IG1vYnguYWN0aW9uKChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVTdGF0ZSA9IE9iamVjdC5hc3NpZ24odGhpcy5zcHJpdGVTdGF0ZSwgY2hhbmdlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1slc10gbGlmZTogJywgc3ByaXRlLCB0aGlzLnNwcml0ZVN0YXRlLmxpZmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGp1bXAoKXtcclxuICAgICAgICBpZih0aGlzLmJvZHkudG91Y2hpbmcuZG93biB8fCB0aGlzLmJvZHkuYmxvY2tlZC5kb3duKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgLT0gMzAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdbU3ByaXRlXSBzdGF0ZScpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXh0ZW5kZWRTcHJpdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsImltcG9ydCBnYW1lQ29uZmlnIGZyb20gJy4vZ2FtZWNvbmZpZy5qcyc7XHJcbmltcG9ydCBQbGF5IGZyb20gJy4vZ2FtZXN0YXRlcy9wbGF5LmpzJztcclxuXHJcbi8vIGluc3RhbnRpYXRlIGEgUGhhc2VyLkdhbWVcclxuY29uc3QgUExBVEZPUk1FUiA9IG5ldyBQaGFzZXIuR2FtZShcclxuICAgIGdhbWVDb25maWcud2lkdGgsXHJcbiAgICBnYW1lQ29uZmlnLmhlaWdodCxcclxuICAgIFBoYXNlci5BVVRPLFxyXG4gICAgZ2FtZUNvbmZpZy5kb21FbGVtZW50XHJcbik7XHJcblxyXG4vLyByZWdpc3RlciBnYW1lc3RhdGVzICh3aWxsIGJlIGluc3RhbnRpYXRlZCB3LyB0aGlzLmdhbWUgYXMgMXN0IHBhcmFtLCBwYXNzIGdhbWVDb25maWcgYXMgMm5kKVxyXG5QTEFURk9STUVSLnN0YXRlLmFkZCgnUGxheScsIFBsYXkuYmluZChudWxsLCBnYW1lQ29uZmlnKSk7XHJcblxyXG4vLyBraWNrIG9mZiBmaXJzdCBnYW1lc3RhdGU6IE1lbnVcclxuUExBVEZPUk1FUi5zdGF0ZS5zdGFydCgnUGxheScsIHRydWUsIHRydWUsIHtcclxuICAgIGluaXRpYWxTdGF0ZTogJ3NvbWUgaW5pdGlhbCBzdGF0ZSdcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9