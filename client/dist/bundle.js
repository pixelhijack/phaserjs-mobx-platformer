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
            if (this.keys.space.isDown) {
                if (this.player.spriteState.nohit < this.game.time.now) {
                    this.player.hit();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmJlMWY4NGE4ZTMyM2UzOGI3ZWMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImdhbWVDb25maWciLCJ3aWR0aCIsImhlaWdodCIsImRvbUVsZW1lbnQiLCJHYW1lU3RhdGUiLCJrZXlzIiwidW5kZWZpbmVkIiwicGxheWVyIiwiZW5lbXkiLCJnYW1lU3RhdGUiLCJjb25maWdzIiwiY29uc29sZSIsImxvZyIsImdhbWUiLCJsb2FkIiwiaW1hZ2UiLCJ0aW1lIiwiYWR2YW5jZWRUaW1pbmciLCJ3b3JsZCIsInNldEJvdW5kcyIsInBoeXNpY3MiLCJzdGFydFN5c3RlbSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsIm1vYngiLCJvYnNlcnZhYmxlIiwiaW5pdGlhbGlzZWQiLCJzY29yZSIsInVwZGF0ZVN0YXRlIiwiYWN0aW9uIiwiY2hhbmdlIiwiT2JqZWN0IiwiYXNzaWduIiwib2JzZXJ2ZSIsImFjY2VsZXJhdGlvbiIsIm1heFNwZWVkIiwiYm9keSIsInZlbG9jaXR5IiwieCIsIk1hdGgiLCJyYW5kb20iLCJjYW1lcmEiLCJmb2xsb3ciLCJpbnB1dCIsImtleWJvYXJkIiwiY3JlYXRlQ3Vyc29yS2V5cyIsInNwYWNlIiwiYWRkS2V5IiwiS2V5Ym9hcmQiLCJTUEFDRUJBUiIsIm1lbnUiLCJhZGQiLCJ0ZXh0Iiwic3ByaXRlU3RhdGUiLCJsaWZlIiwiZm9udCIsImZpbGwiLCJhbGlnbiIsInNldFRleHQiLCJkZWJ1ZyIsImZwcyIsIm9uS2V5UHJlc3MiLCJhcmNhZGUiLCJvdmVybGFwIiwiaXNIaXR0aW5nIiwiaXNTdHVubmVkIiwic3R1biIsIm5vdyIsImh1cnQiLCJ0b3VjaGluZyIsImxlZnQiLCJpc0Rvd24iLCJtb3ZlTGVmdCIsInJpZ2h0IiwibW92ZVJpZ2h0Iiwic3RvcCIsInVwIiwianVtcCIsIm5vaGl0IiwiaGl0IiwibW9kdWxlIiwiZXhwb3J0cyIsIkV4dGVuZGVkU3ByaXRlIiwieSIsInNwcml0ZSIsInByb3BzIiwiZXhpc3RpbmciLCJlbmFibGUiLCJhbmNob3IiLCJzZXRUbyIsImNvbGxpZGVXb3JsZEJvdW5kcyIsImNoZWNrV29ybGRCb3VuZHMiLCJncmF2aXR5Iiwic3RhdGUiLCJzdGF0ZXMiLCJjdXJyZW50Iiwic2NhbGUiLCJkb3duIiwiYmxvY2tlZCIsImhpdFVudGlsIiwiYnJlYWtVbnRpbCIsImRpcmVjdGlvbiIsIlNwcml0ZSIsIlBMQVRGT1JNRVIiLCJHYW1lIiwiQVVUTyIsImJpbmQiLCJzdGFydCIsImluaXRpYWxTdGF0ZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoRUEsSUFBTUEsYUFBYTtBQUNmQyxXQUFPLEdBRFE7QUFFZkMsWUFBUSxHQUZPO0FBR2ZDLGdCQUFZO0FBSEcsQ0FBbkI7O2tCQU1lSCxVOzs7Ozs7Ozs7OztBQ05m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USxFQUlmLHFCQUFXekcsVUFKSSxDQUFuQjs7QUFPQTtBQUNBdUcsV0FBV1YsS0FBWCxDQUFpQjFDLEdBQWpCLENBQXFCLE1BQXJCLEVBQTZCLGVBQUt1RCxJQUFMLENBQVUsSUFBVix1QkFBN0I7O0FBRUE7QUFDQUgsV0FBV1YsS0FBWCxDQUFpQmMsS0FBakIsQ0FBdUIsTUFBdkIsRUFBK0IsSUFBL0IsRUFBcUMsSUFBckMsRUFBMkM7QUFDdkNDLGtCQUFjO0FBRHlCLENBQTNDLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNmJlMWY4NGE4ZTMyM2UzOGI3ZWMiLCJjb25zdCBnYW1lQ29uZmlnID0ge1xyXG4gICAgd2lkdGg6IDU0NixcclxuICAgIGhlaWdodDogMzY4LFxyXG4gICAgZG9tRWxlbWVudDogJ2dhbWUnXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lQ29uZmlnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVjb25maWcuanMiLCJpbXBvcnQgRXh0ZW5kZWRTcHJpdGUgZnJvbSAnLi4vY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZSc7XG5cclxuY2xhc3MgR2FtZVN0YXRle1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZUNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuZ2FtZUNvbmZpZyA9IGdhbWVDb25maWc7XHJcbiAgICAgICAgdGhpcy5rZXlzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZW5lbXkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChjb25maWdzKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtJbml0XScsIGNvbmZpZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByZWxvYWQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtQcmVsb2FkXScpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKCdwbGF5ZXInLCAnbWFuLnBuZycpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKCdkaW5vJywgJ2Rpbm8ucG5nJyk7XHJcbiAgICB9XHJcbiAgICBjcmVhdGUoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtDcmVhdGVdJyk7XHJcbiAgICAgICAgLy8gZnBzIGRlYnVnZ2luZ1xyXG4gICAgICAgIHRoaXMuZ2FtZS50aW1lLmFkdmFuY2VkVGltaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gW1NFVCBMRVZFTF0gc2V0IGRpbWVuc2lvbnMsIHN0YXJ0IHBoeXNpYyBzeXN0ZW1cclxuICAgICAgICB0aGlzLmdhbWUud29ybGQuc2V0Qm91bmRzKFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICB0aGlzLmdhbWVDb25maWcud2lkdGgsXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbmZpZy5oZWlnaHRcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZic7XG5cbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgICAgICBpbml0aWFsaXNlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNjb3JlOiAwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUgPSBtb2J4LmFjdGlvbigoY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gT2JqZWN0LmFzc2lnbih0aGlzLmdhbWVTdGF0ZSwgY2hhbmdlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbW9ieC5vYnNlcnZlKHRoaXMuZ2FtZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnW2dhbWVTdGF0ZV0gY2hhbmdlJywgY2hhbmdlLCB0aGlzLmdhbWVTdGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoeyBpbml0aWFsaXNlZDogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgLy8gW1BMQVlFUl1cclxuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBFeHRlbmRlZFNwcml0ZSh0aGlzLmdhbWUsIDIwMCwgMjAwLCAncGxheWVyJywge1xyXG4gICAgICAgICAgICBhY2NlbGVyYXRpb246IDEwLFxyXG4gICAgICAgICAgICBtYXhTcGVlZDogMjAwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFtFTkVNWV1cclxuICAgICAgICB0aGlzLmVuZW15ID0gbmV3IEV4dGVuZGVkU3ByaXRlKHRoaXMuZ2FtZSwgNDAwLCAyMDAsICdkaW5vJyk7XHJcbiAgICAgICAgdGhpcy5lbmVteS5ib2R5LnZlbG9jaXR5LnggPSBNYXRoLnJhbmRvbSgpICogKC0xMCkgLSAxMDtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xyXG5cclxuICAgICAgICAvLyBiaW5kIGtleXNcclxuICAgICAgICB0aGlzLmtleXMgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xyXG4gICAgICAgIHRoaXMua2V5cy5zcGFjZSA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlNQQUNFQkFSKTtcclxuXHJcbiAgICAgICAgLy8gc2NvcmUgdGV4dFxyXG4gICAgICAgIHRoaXMubWVudSA9IHRoaXMuZ2FtZS5hZGQudGV4dChcclxuICAgICAgICAgICAgMTUwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICBcIkxpZmU6IFwiICsgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSxcclxuICAgICAgICAgICAgeyBmb250OiBcIjI0cHggQ291cmllclwiLCBmaWxsOiBcIiMwMDBcIiwgYWxpZ246IFwiY2VudGVyXCIgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbW9ieC5vYnNlcnZlKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnUuc2V0VGV4dChcIkxpZmU6IFwiICsgdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW1VwZGF0ZV0nKTtcclxuICAgICAgICAvLyBmcHNcclxuICAgICAgICB0aGlzLmdhbWUuZGVidWcudGV4dCh0aGlzLmdhbWUudGltZS5mcHMsIDUsIDIwKTtcclxuXHJcbiAgICAgICAgLy8gbW92ZVxyXG4gICAgICAgIHRoaXMub25LZXlQcmVzcygpO1xyXG5cclxuICAgICAgICAvLyBjb2xsaWRlXHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5wbGF5ZXIsIHRoaXMuZW5lbXksIChwbGF5ZXIsIGVuZW15KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLnBsYXllci5pc0hpdHRpbmcgJiYgIXRoaXMucGxheWVyLmlzU3R1bm5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlmZTogdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSAtIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3R1bjogdGhpcy5nYW1lLnRpbWUubm93ICsgMTUwMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5odXJ0KGVuZW15LmJvZHkudG91Y2hpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvbktleVByZXNzKCl7XHJcbiAgICAgICAgLy8gc3R1biA9PiBibG9ja2VkXHJcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIuaXNTdHVubmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbW92ZSBsZWZ0IC8gcmlnaHRcclxuICAgICAgICBpZih0aGlzLmtleXMubGVmdC5pc0Rvd24pe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5tb3ZlTGVmdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZih0aGlzLmtleXMucmlnaHQuaXNEb3duKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIubW92ZVJpZ2h0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8ganVtcFxyXG4gICAgICAgIGlmKHRoaXMua2V5cy51cC5pc0Rvd24pe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5qdW1wKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBoaXRcclxuICAgICAgICBpZih0aGlzLmtleXMuc3BhY2UuaXNEb3duKXtcclxuICAgICAgICAgICAgaWYodGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubm9oaXQgPCB0aGlzLmdhbWUudGltZS5ub3cpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaGl0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZVN0YXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS5qcyIsImNsYXNzIEV4dGVuZGVkU3ByaXRlIGV4dGVuZHMgUGhhc2VyLlNwcml0ZXtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNwcml0ZSwgcHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksIHNwcml0ZSlcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcclxuICAgICAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcclxuICAgICAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYm9keS5ncmF2aXR5LnkgPSA1MDA7XHJcblxyXG4gICAgICAgIGNvbnN0IGdhbWVTdGF0ZSA9IHRoaXMuZ2FtZS5zdGF0ZS5zdGF0ZXNbdGhpcy5nYW1lLnN0YXRlLmN1cnJlbnRdLmdhbWVTdGF0ZTtcclxuICAgICAgICBtb2J4Lm9ic2VydmUoZ2FtZVN0YXRlLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlJywgY2hhbmdlLCBnYW1lU3RhdGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBtb2J4Lm9ic2VydmFibGUoe1xyXG4gICAgICAgICAgICBsaWZlOiAxMCxcclxuICAgICAgICAgICAgc3R1bjogMCxcclxuICAgICAgICAgICAgaGl0OiAwLFxyXG4gICAgICAgICAgICBub2hpdDogMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUgPSBtb2J4LmFjdGlvbigoY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlU3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuc3ByaXRlU3RhdGUsIGNoYW5nZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbJXNdIGxpZmU6ICcsIHNwcml0ZSwgdGhpcy5zcHJpdGVTdGF0ZS5saWZlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNIaXR0aW5nKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlU3RhdGUuaGl0ID4gdGhpcy5nYW1lLnRpbWUubm93O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc1N0dW5uZWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcHJpdGVTdGF0ZS5zdHVuID4gdGhpcy5nYW1lLnRpbWUubm93O1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVMZWZ0KCl7XHJcbiAgICAgICAgdGhpcy5zY2FsZS54ID0gLTE7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnZlbG9jaXR5LnggPiAtdGhpcy5wcm9wcy5tYXhTcGVlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC09IHRoaXMucHJvcHMuYWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlUmlnaHQoKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSAxO1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS52ZWxvY2l0eS54IDwgdGhpcy5wcm9wcy5tYXhTcGVlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ICs9IHRoaXMucHJvcHMuYWNjZWxlcmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlKCl7XHJcbiAgICAgICAgaWYodGhpcy5zY2FsZS54ID09PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlUmlnaHQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVMZWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKXtcclxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAvPSAxLjE7XHJcbiAgICB9XHJcblxyXG4gICAganVtcCgpe1xyXG4gICAgICAgIGlmKHRoaXMuYm9keS50b3VjaGluZy5kb3duIHx8IHRoaXMuYm9keS5ibG9ja2VkLmRvd24pe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSAtPSAzMDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhpdCgpe1xyXG4gICAgICAgIGNvbnN0IGhpdFVudGlsID0gdGhpcy5nYW1lLnRpbWUubm93ICsgMjAwLFxyXG4gICAgICAgICAgICBicmVha1VudGlsID0gdGhpcy5nYW1lLnRpbWUubm93ICsgMzAwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdOb3cgJXMgSGl0ICVzIEJyZWFrICVzJywgdGhpcy5nYW1lLnRpbWUubm93LCBoaXRVbnRpbCwgYnJlYWtVbnRpbCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgIGhpdDogaGl0VW50aWwsXHJcbiAgICAgICAgICAgIG5vaGl0OiBicmVha1VudGlsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaHVydChkaXJlY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55IC09IDEwMDtcclxuICAgICAgICBpZihkaXJlY3Rpb24gJiYgZGlyZWN0aW9uLmxlZnQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCAtPSAxMDAgfHwgdGhpcy5wcm9wcy5tYXhTcGVlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uICYmIGRpcmVjdGlvbi5yaWdodCl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ICs9IDEwMCB8fCB0aGlzLnByb3BzLm1heFNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdbU3ByaXRlXSBzdGF0ZScpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXh0ZW5kZWRTcHJpdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsImltcG9ydCBnYW1lQ29uZmlnIGZyb20gJy4vZ2FtZWNvbmZpZy5qcyc7XHJcbmltcG9ydCBQbGF5IGZyb20gJy4vZ2FtZXN0YXRlcy9wbGF5LmpzJztcclxuXHJcbi8vIGluc3RhbnRpYXRlIGEgUGhhc2VyLkdhbWVcclxuY29uc3QgUExBVEZPUk1FUiA9IG5ldyBQaGFzZXIuR2FtZShcclxuICAgIGdhbWVDb25maWcud2lkdGgsXHJcbiAgICBnYW1lQ29uZmlnLmhlaWdodCxcclxuICAgIFBoYXNlci5BVVRPLFxyXG4gICAgZ2FtZUNvbmZpZy5kb21FbGVtZW50XHJcbik7XHJcblxyXG4vLyByZWdpc3RlciBnYW1lc3RhdGVzICh3aWxsIGJlIGluc3RhbnRpYXRlZCB3LyB0aGlzLmdhbWUgYXMgMXN0IHBhcmFtLCBwYXNzIGdhbWVDb25maWcgYXMgMm5kKVxyXG5QTEFURk9STUVSLnN0YXRlLmFkZCgnUGxheScsIFBsYXkuYmluZChudWxsLCBnYW1lQ29uZmlnKSk7XHJcblxyXG4vLyBraWNrIG9mZiBmaXJzdCBnYW1lc3RhdGU6IE1lbnVcclxuUExBVEZPUk1FUi5zdGF0ZS5zdGFydCgnUGxheScsIHRydWUsIHRydWUsIHtcclxuICAgIGluaXRpYWxTdGF0ZTogJ3NvbWUgaW5pdGlhbCBzdGF0ZSdcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9