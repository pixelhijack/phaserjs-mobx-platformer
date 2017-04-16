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
                if (!_this2.player.isHitting) {
                    _this2.player.updateState({
                        life: _this2.player.spriteState.life - 1,
                        stun: _this2.game.time.now + 1000
                    });
                    _this2.player.hurt(enemy.body.touching);
                }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDMxMjc4MGY1ZTAzYWIyOWJlYmEiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NyYy9nYW1lY29uZmlnLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvZ2FtZXN0YXRlcy9wbGF5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zcmMvY29tcG9uZW50cy9FeHRlbmRlZFNwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImdhbWVDb25maWciLCJ3aWR0aCIsImhlaWdodCIsImRvbUVsZW1lbnQiLCJHYW1lU3RhdGUiLCJrZXlzIiwidW5kZWZpbmVkIiwicGxheWVyIiwiZW5lbXkiLCJnYW1lU3RhdGUiLCJjb25maWdzIiwiY29uc29sZSIsImxvZyIsImdhbWUiLCJsb2FkIiwiaW1hZ2UiLCJ0aW1lIiwiYWR2YW5jZWRUaW1pbmciLCJ3b3JsZCIsInNldEJvdW5kcyIsInBoeXNpY3MiLCJzdGFydFN5c3RlbSIsIlBoYXNlciIsIlBoeXNpY3MiLCJBUkNBREUiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsIm1vYngiLCJvYnNlcnZhYmxlIiwiaW5pdGlhbGlzZWQiLCJzY29yZSIsInVwZGF0ZVN0YXRlIiwiYWN0aW9uIiwiY2hhbmdlIiwiT2JqZWN0IiwiYXNzaWduIiwib2JzZXJ2ZSIsImFjY2VsZXJhdGlvbiIsIm1heFNwZWVkIiwiYm9keSIsInZlbG9jaXR5IiwieCIsIk1hdGgiLCJyYW5kb20iLCJjYW1lcmEiLCJmb2xsb3ciLCJpbnB1dCIsImtleWJvYXJkIiwiY3JlYXRlQ3Vyc29yS2V5cyIsInNwYWNlIiwiYWRkS2V5IiwiS2V5Ym9hcmQiLCJTUEFDRUJBUiIsIm1lbnUiLCJhZGQiLCJ0ZXh0Iiwic3ByaXRlU3RhdGUiLCJsaWZlIiwiZm9udCIsImZpbGwiLCJhbGlnbiIsInNldFRleHQiLCJkZWJ1ZyIsImZwcyIsIm9uS2V5UHJlc3MiLCJhcmNhZGUiLCJvdmVybGFwIiwiaXNIaXR0aW5nIiwic3R1biIsIm5vdyIsImh1cnQiLCJ0b3VjaGluZyIsImxlZnQiLCJpc0Rvd24iLCJtb3ZlTGVmdCIsInJpZ2h0IiwibW92ZVJpZ2h0Iiwic3RvcCIsInVwIiwianVtcCIsIm5vaGl0IiwiaGl0IiwibW9kdWxlIiwiZXhwb3J0cyIsIkV4dGVuZGVkU3ByaXRlIiwieSIsInNwcml0ZSIsInByb3BzIiwiZXhpc3RpbmciLCJlbmFibGUiLCJhbmNob3IiLCJzZXRUbyIsImNvbGxpZGVXb3JsZEJvdW5kcyIsImNoZWNrV29ybGRCb3VuZHMiLCJncmF2aXR5Iiwic3RhdGUiLCJzdGF0ZXMiLCJjdXJyZW50Iiwic2NhbGUiLCJkb3duIiwiYmxvY2tlZCIsImhpdFVudGlsIiwiYnJlYWtVbnRpbCIsImRpcmVjdGlvbiIsIlNwcml0ZSIsIlBMQVRGT1JNRVIiLCJHYW1lIiwiQVVUTyIsImJpbmQiLCJzdGFydCIsImluaXRpYWxTdGF0ZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoRUEsSUFBTUEsYUFBYTtBQUNmQyxXQUFPLEdBRFE7QUFFZkMsWUFBUSxHQUZPO0FBR2ZDLGdCQUFZO0FBSEcsQ0FBbkI7O2tCQU1lSCxVOzs7Ozs7Ozs7OztBQ05mOzs7Ozs7OztJQUVN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ZUFBS3NELElBQUwsQ0FBVSxJQUFWLHVCQUE3Qjs7QUFFQTtBQUNBSCxXQUFXVixLQUFYLENBQWlCYyxLQUFqQixDQUF1QixNQUF2QixFQUErQixJQUEvQixFQUFxQyxJQUFyQyxFQUEyQztBQUN2Q0Msa0JBQWM7QUFEeUIsQ0FBM0MsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwMzEyNzgwZjVlMDNhYjI5YmViYSIsImNvbnN0IGdhbWVDb25maWcgPSB7XHJcbiAgICB3aWR0aDogNTQ2LFxyXG4gICAgaGVpZ2h0OiAzNjgsXHJcbiAgICBkb21FbGVtZW50OiAnZ2FtZSdcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVDb25maWc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvZ2FtZWNvbmZpZy5qcyIsImltcG9ydCBFeHRlbmRlZFNwcml0ZSBmcm9tICcuLi9jb21wb25lbnRzL0V4dGVuZGVkU3ByaXRlJztcblxyXG5jbGFzcyBHYW1lU3RhdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lQ29uZmlnID0gZ2FtZUNvbmZpZztcclxuICAgICAgICB0aGlzLmtleXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5lbmVteSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KGNvbmZpZ3Mpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0luaXRdJywgY29uZmlncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJlbG9hZCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW1ByZWxvYWRdJyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ3BsYXllcicsICdtYW4ucG5nJyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ2Rpbm8nLCAnZGluby5wbmcnKTtcclxuICAgIH1cclxuICAgIGNyZWF0ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbUEhBU0VSXVtDb21wb25lbnRdW0NyZWF0ZV0nKTtcclxuICAgICAgICAvLyBmcHMgZGVidWdnaW5nXHJcbiAgICAgICAgdGhpcy5nYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBbU0VUIExFVkVMXSBzZXQgZGltZW5zaW9ucywgc3RhcnQgcGh5c2ljIHN5c3RlbVxyXG4gICAgICAgIHRoaXMuZ2FtZS53b3JsZC5zZXRCb3VuZHMoXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbmZpZy53aWR0aCxcclxuICAgICAgICAgICAgdGhpcy5nYW1lQ29uZmlnLmhlaWdodFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmJztcblxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IG1vYngub2JzZXJ2YWJsZSh7XHJcbiAgICAgICAgICAgIGluaXRpYWxpc2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgc2NvcmU6IDBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSA9IG1vYnguYWN0aW9uKChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2FtZVN0YXRlLCBjaGFuZ2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtb2J4Lm9ic2VydmUodGhpcy5nYW1lU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbZ2FtZVN0YXRlXSBjaGFuZ2UnLCBjaGFuZ2UsIHRoaXMuZ2FtZVN0YXRlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7IGluaXRpYWxpc2VkOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAvLyBbUExBWUVSXVxyXG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IEV4dGVuZGVkU3ByaXRlKHRoaXMuZ2FtZSwgMjAwLCAyMDAsICdwbGF5ZXInLCB7XHJcbiAgICAgICAgICAgIGFjY2VsZXJhdGlvbjogMTAsXHJcbiAgICAgICAgICAgIG1heFNwZWVkOiAyMDBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gW0VORU1ZXVxyXG4gICAgICAgIHRoaXMuZW5lbXkgPSBuZXcgRXh0ZW5kZWRTcHJpdGUodGhpcy5nYW1lLCA0MDAsIDIwMCwgJ2Rpbm8nKTtcclxuICAgICAgICB0aGlzLmVuZW15LmJvZHkudmVsb2NpdHkueCA9IE1hdGgucmFuZG9tKCkgKiAoLTEwKSAtIDEwO1xyXG5cclxuICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XHJcblxyXG4gICAgICAgIC8vIGJpbmQga2V5c1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XHJcbiAgICAgICAgdGhpcy5rZXlzLnNwYWNlID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpO1xyXG5cclxuICAgICAgICAvLyBzY29yZSB0ZXh0XHJcbiAgICAgICAgdGhpcy5tZW51ID0gdGhpcy5nYW1lLmFkZC50ZXh0KFxyXG4gICAgICAgICAgICAxNTAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIFwiTGlmZTogXCIgKyB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlLFxyXG4gICAgICAgICAgICB7IGZvbnQ6IFwiMjRweCBDb3VyaWVyXCIsIGZpbGw6IFwiIzAwMFwiLCBhbGlnbjogXCJjZW50ZXJcIiB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBtb2J4Lm9ic2VydmUodGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubWVudS5zZXRUZXh0KFwiTGlmZTogXCIgKyB0aGlzLnBsYXllci5zcHJpdGVTdGF0ZS5saWZlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bVXBkYXRlXScpO1xyXG4gICAgICAgIC8vIGZwc1xyXG4gICAgICAgIHRoaXMuZ2FtZS5kZWJ1Zy50ZXh0KHRoaXMuZ2FtZS50aW1lLmZwcywgNSwgMjApO1xyXG5cclxuICAgICAgICAvLyBtb3ZlXHJcbiAgICAgICAgdGhpcy5vbktleVByZXNzKCk7XHJcblxyXG4gICAgICAgIC8vIGNvbGxpZGVcclxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLnBsYXllciwgdGhpcy5lbmVteSwgKHBsYXllciwgZW5lbXkpID0+IHtcclxuICAgICAgICAgICAgaWYoIXRoaXMucGxheWVyLmlzSGl0dGluZyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlmZTogdGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUubGlmZSAtIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3R1bjogdGhpcy5nYW1lLnRpbWUubm93ICsgMTAwMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5odXJ0KGVuZW15LmJvZHkudG91Y2hpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvbktleVByZXNzKCl7XHJcbiAgICAgICAgLy8gc3R1biA9PiBibG9ja2VkXHJcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIuc3ByaXRlU3RhdGUuc3R1biA+IHRoaXMuZ2FtZS50aW1lLm5vdyl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG1vdmUgbGVmdCAvIHJpZ2h0XHJcbiAgICAgICAgaWYodGhpcy5rZXlzLmxlZnQuaXNEb3duKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIubW92ZUxlZnQoKTtcclxuICAgICAgICB9IGVsc2UgaWYodGhpcy5rZXlzLnJpZ2h0LmlzRG93bil7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLm1vdmVSaWdodCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnN0b3AoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGp1bXBcclxuICAgICAgICBpZih0aGlzLmtleXMudXAuaXNEb3duKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuanVtcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaGl0XHJcbiAgICAgICAgaWYodGhpcy5rZXlzLnNwYWNlLmlzRG93bil7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucGxheWVyLnNwcml0ZVN0YXRlLm5vaGl0IDwgdGhpcy5nYW1lLnRpbWUubm93KXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmhpdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVTdGF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9nYW1lc3RhdGVzL3BsYXkuanMiLCJjbGFzcyBFeHRlbmRlZFNwcml0ZSBleHRlbmRzIFBoYXNlci5TcHJpdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzcHJpdGUsIHByb3BzKXtcclxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCBzcHJpdGUpXHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHM7XHJcbiAgICAgICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzKTtcclxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuICAgICAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XHJcbiAgICAgICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jaGVja1dvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gNTAwO1xyXG5cclxuICAgICAgICBjb25zdCBnYW1lU3RhdGUgPSB0aGlzLmdhbWUuc3RhdGUuc3RhdGVzW3RoaXMuZ2FtZS5zdGF0ZS5jdXJyZW50XS5nYW1lU3RhdGU7XHJcbiAgICAgICAgbW9ieC5vYnNlcnZlKGdhbWVTdGF0ZSwgY2hhbmdlID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZScsIGNoYW5nZSwgZ2FtZVN0YXRlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gbW9ieC5vYnNlcnZhYmxlKHtcclxuICAgICAgICAgICAgbGlmZTogMTAsXHJcbiAgICAgICAgICAgIHN0dW46IDAsXHJcbiAgICAgICAgICAgIGhpdDogMCxcclxuICAgICAgICAgICAgbm9oaXQ6IDBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlID0gbW9ieC5hY3Rpb24oKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZVN0YXRlID0gT2JqZWN0LmFzc2lnbih0aGlzLnNwcml0ZVN0YXRlLCBjaGFuZ2UpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnWyVzXSBsaWZlOiAnLCBzcHJpdGUsIHRoaXMuc3ByaXRlU3RhdGUubGlmZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUxlZnQoKXtcclxuICAgICAgICB0aGlzLnNjYWxlLnggPSAtMTtcclxuICAgICAgICBpZih0aGlzLmJvZHkudmVsb2NpdHkueCA+IC10aGlzLnByb3BzLm1heFNwZWVkKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggLT0gdGhpcy5wcm9wcy5hY2NlbGVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVSaWdodCgpe1xyXG4gICAgICAgIHRoaXMuc2NhbGUueCA9IDE7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnZlbG9jaXR5LnggPCB0aGlzLnByb3BzLm1heFNwZWVkKXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggKz0gdGhpcy5wcm9wcy5hY2NlbGVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmUoKXtcclxuICAgICAgICBpZih0aGlzLnNjYWxlLnggPT09IDEpe1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVSaWdodCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUxlZnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcCgpe1xyXG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54IC89IDEuMTtcclxuICAgIH1cclxuXHJcbiAgICBqdW1wKCl7XHJcbiAgICAgICAgaWYodGhpcy5ib2R5LnRvdWNoaW5nLmRvd24gfHwgdGhpcy5ib2R5LmJsb2NrZWQuZG93bil7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS55IC09IDMwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGl0KCl7XHJcbiAgICAgICAgY29uc3QgaGl0VW50aWwgPSB0aGlzLmdhbWUudGltZS5ub3cgKyAyMDAsXHJcbiAgICAgICAgICAgIGJyZWFrVW50aWwgPSB0aGlzLmdhbWUudGltZS5ub3cgKyAzMDA7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ05vdyAlcyBIaXQgJXMgQnJlYWsgJXMnLCB0aGlzLmdhbWUudGltZS5ub3csIGhpdFVudGlsLCBicmVha1VudGlsKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgICAgICAgaGl0OiBoaXRVbnRpbCxcclxuICAgICAgICAgICAgbm9oaXQ6IGJyZWFrVW50aWxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNIaXR0aW5nKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlU3RhdGUuaGl0ID4gdGhpcy5nYW1lLnRpbWUubm93O1xyXG4gICAgfVxyXG5cclxuICAgIGh1cnQoZGlyZWN0aW9uKXtcclxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSAtPSAxMDA7XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uICYmIGRpcmVjdGlvbi5sZWZ0KXtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggLT0gMTAwIHx8IHRoaXMucHJvcHMubWF4U3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRpcmVjdGlvbiAmJiBkaXJlY3Rpb24ucmlnaHQpe1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCArPSAxMDAgfHwgdGhpcy5wcm9wcy5tYXhTcGVlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnW1Nwcml0ZV0gc3RhdGUnKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4dGVuZGVkU3ByaXRlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2NvbXBvbmVudHMvRXh0ZW5kZWRTcHJpdGUuanMiLCJpbXBvcnQgZ2FtZUNvbmZpZyBmcm9tICcuL2dhbWVjb25maWcuanMnO1xyXG5pbXBvcnQgUGxheSBmcm9tICcuL2dhbWVzdGF0ZXMvcGxheS5qcyc7XHJcblxyXG4vLyBpbnN0YW50aWF0ZSBhIFBoYXNlci5HYW1lXHJcbmNvbnN0IFBMQVRGT1JNRVIgPSBuZXcgUGhhc2VyLkdhbWUoXHJcbiAgICBnYW1lQ29uZmlnLndpZHRoLFxyXG4gICAgZ2FtZUNvbmZpZy5oZWlnaHQsXHJcbiAgICBQaGFzZXIuQVVUTyxcclxuICAgIGdhbWVDb25maWcuZG9tRWxlbWVudFxyXG4pO1xyXG5cclxuLy8gcmVnaXN0ZXIgZ2FtZXN0YXRlcyAod2lsbCBiZSBpbnN0YW50aWF0ZWQgdy8gdGhpcy5nYW1lIGFzIDFzdCBwYXJhbSwgcGFzcyBnYW1lQ29uZmlnIGFzIDJuZClcclxuUExBVEZPUk1FUi5zdGF0ZS5hZGQoJ1BsYXknLCBQbGF5LmJpbmQobnVsbCwgZ2FtZUNvbmZpZykpO1xyXG5cclxuLy8ga2ljayBvZmYgZmlyc3QgZ2FtZXN0YXRlOiBNZW51XHJcblBMQVRGT1JNRVIuc3RhdGUuc3RhcnQoJ1BsYXknLCB0cnVlLCB0cnVlLCB7XHJcbiAgICBpbml0aWFsU3RhdGU6ICdzb21lIGluaXRpYWwgc3RhdGUnXHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==