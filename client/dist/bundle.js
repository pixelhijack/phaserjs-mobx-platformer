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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* unknown exports provided */
/* all exports used */
/*!**********************************!*\
  !*** ./client/src/gameconfig.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar gameConfig = {\n    width: 546,\n    height: 368,\n    domElement: 'game'\n};\n\nexports.default = gameConfig;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9jbGllbnQvc3JjL2dhbWVjb25maWcuanM/ODdkYyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBnYW1lQ29uZmlnID0ge1xyXG4gICAgd2lkdGg6IDU0NixcclxuICAgIGhlaWdodDogMzY4LFxyXG4gICAgZG9tRWxlbWVudDogJ2dhbWUnXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lQ29uZmlnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gY2xpZW50L3NyYy9nYW1lY29uZmlnLmpzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBIiwic291cmNlUm9vdCI6IiJ9");

/***/ }),
/* 1 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./client/src/gamestates/play.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar GameState = function () {\n    function GameState(gameConfig) {\n        _classCallCheck(this, GameState);\n\n        this.gameConfig = gameConfig;\n        this.keys = undefined;\n        this.player = undefined;\n        this.enemy = undefined;\n    }\n\n    _createClass(GameState, [{\n        key: 'init',\n        value: function init(configs) {\n            console.log('[PHASER][Component][Init]', configs);\n        }\n    }, {\n        key: 'preload',\n        value: function preload() {\n            console.log('[PHASER][Component][Preload]');\n            this.game.load.image('player', 'man.png');\n            this.game.load.image('dino', 'dino.png');\n        }\n    }, {\n        key: 'create',\n        value: function create() {\n            console.log('[PHASER][Component][Create]');\n            // fps debugging\n            this.game.time.advancedTiming = true;\n\n            // [SET LEVEL] set dimensions, start physic system\n            this.game.world.setBounds(0, 0, this.gameConfig.width, this.gameConfig.height);\n\n            this.game.physics.startSystem(Phaser.Physics.ARCADE);\n\n            // [PLAYER]\n            this.player = this.game.add.sprite(200, 200, 'player');\n\n            // [ENEMY]\n            this.enemy = this.game.add.sprite(400, 200, 'dino');\n\n            this.game.camera.follow(this.player);\n\n            // bind keys\n            this.keys = this.game.input.keyboard.createCursorKeys();\n            this.keys.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);\n        }\n    }, {\n        key: 'update',\n        value: function update() {\n            console.log('[PHASER][Component][Update]');\n            // fps\n            this.game.debug.text(this.game.time.fps, 5, 20);\n\n            // move\n            if (this.keys.left.isDown) {\n                this.player.x--;\n            } else if (this.keys.right.isDown) {\n                this.player.x++;\n            }\n        }\n    }]);\n\n    return GameState;\n}();\n\nmodule.exports = GameState;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9jbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS5qcz85MjE1Il0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEdhbWVTdGF0ZXtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWVDb25maWcpIHtcclxuICAgICAgICB0aGlzLmdhbWVDb25maWcgPSBnYW1lQ29uZmlnO1xyXG4gICAgICAgIHRoaXMua2V5cyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnBsYXllciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmVuZW15ID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoY29uZmlncyl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bSW5pdF0nLCBjb25maWdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcmVsb2FkKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bUHJlbG9hZF0nKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSgncGxheWVyJywgJ21hbi5wbmcnKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSgnZGlubycsICdkaW5vLnBuZycpO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1tQSEFTRVJdW0NvbXBvbmVudF1bQ3JlYXRlXScpO1xyXG4gICAgICAgIC8vIGZwcyBkZWJ1Z2dpbmdcclxuICAgICAgICB0aGlzLmdhbWUudGltZS5hZHZhbmNlZFRpbWluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIFtTRVQgTEVWRUxdIHNldCBkaW1lbnNpb25zLCBzdGFydCBwaHlzaWMgc3lzdGVtXHJcbiAgICAgICAgdGhpcy5nYW1lLndvcmxkLnNldEJvdW5kcyhcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgdGhpcy5nYW1lQ29uZmlnLndpZHRoLFxyXG4gICAgICAgICAgICB0aGlzLmdhbWVDb25maWcuaGVpZ2h0XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuXHJcbiAgICAgICAgLy8gW1BMQVlFUl1cclxuICAgICAgICB0aGlzLnBsYXllciA9IHRoaXMuZ2FtZS5hZGQuc3ByaXRlKDIwMCwgMjAwLCAncGxheWVyJyk7XHJcblxyXG4gICAgICAgIC8vIFtFTkVNWV1cclxuICAgICAgICB0aGlzLmVuZW15ID0gdGhpcy5nYW1lLmFkZC5zcHJpdGUoNDAwLCAyMDAsICdkaW5vJyk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcclxuXHJcbiAgICAgICAgLy8gYmluZCBrZXlzXHJcbiAgICAgICAgdGhpcy5rZXlzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuICAgICAgICB0aGlzLmtleXMuc3BhY2UgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5TUEFDRUJBUik7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnW1BIQVNFUl1bQ29tcG9uZW50XVtVcGRhdGVdJyk7XHJcbiAgICAgICAgLy8gZnBzXHJcbiAgICAgICAgdGhpcy5nYW1lLmRlYnVnLnRleHQodGhpcy5nYW1lLnRpbWUuZnBzLCA1LCAyMCk7XHJcblxyXG4gICAgICAgIC8vIG1vdmVcclxuICAgICAgICBpZih0aGlzLmtleXMubGVmdC5pc0Rvd24pe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci54LS07XHJcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMua2V5cy5yaWdodC5pc0Rvd24pe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci54Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lU3RhdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBjbGllbnQvc3JjL2dhbWVzdGF0ZXMvcGxheS5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBSUEiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }),
/* 2 */
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** ./client/src/index.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _gameconfig = __webpack_require__(/*! ./gameconfig.js */ 0);\n\nvar _gameconfig2 = _interopRequireDefault(_gameconfig);\n\nvar _play = __webpack_require__(/*! ./gamestates/play.js */ 1);\n\nvar _play2 = _interopRequireDefault(_play);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// instantiate a Phaser.Game\nvar PLATFORMER = new Phaser.Game(_gameconfig2.default.width, _gameconfig2.default.height, Phaser.AUTO, _gameconfig2.default.domElement);\n\n// register gamestates (will be instantiated w/ this.game as 1st param, pass gameConfig as 2nd)\nPLATFORMER.state.add('Play', _play2.default.bind(null, _gameconfig2.default));\n\n// kick off first gamestate: Menu\nPLATFORMER.state.start('Play', true, true, {\n    initialState: 'some initial state'\n});//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9jbGllbnQvc3JjL2luZGV4LmpzP2MzZWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdhbWVDb25maWcgZnJvbSAnLi9nYW1lY29uZmlnLmpzJztcclxuaW1wb3J0IFBsYXkgZnJvbSAnLi9nYW1lc3RhdGVzL3BsYXkuanMnO1xyXG5cclxuLy8gaW5zdGFudGlhdGUgYSBQaGFzZXIuR2FtZVxyXG5jb25zdCBQTEFURk9STUVSID0gbmV3IFBoYXNlci5HYW1lKFxyXG4gICAgZ2FtZUNvbmZpZy53aWR0aCxcclxuICAgIGdhbWVDb25maWcuaGVpZ2h0LFxyXG4gICAgUGhhc2VyLkFVVE8sXHJcbiAgICBnYW1lQ29uZmlnLmRvbUVsZW1lbnRcclxuKTtcclxuXHJcbi8vIHJlZ2lzdGVyIGdhbWVzdGF0ZXMgKHdpbGwgYmUgaW5zdGFudGlhdGVkIHcvIHRoaXMuZ2FtZSBhcyAxc3QgcGFyYW0sIHBhc3MgZ2FtZUNvbmZpZyBhcyAybmQpXHJcblBMQVRGT1JNRVIuc3RhdGUuYWRkKCdQbGF5JywgUGxheS5iaW5kKG51bGwsIGdhbWVDb25maWcpKTtcclxuXHJcbi8vIGtpY2sgb2ZmIGZpcnN0IGdhbWVzdGF0ZTogTWVudVxyXG5QTEFURk9STUVSLnN0YXRlLnN0YXJ0KCdQbGF5JywgdHJ1ZSwgdHJ1ZSwge1xyXG4gICAgaW5pdGlhbFN0YXRlOiAnc29tZSBpbml0aWFsIHN0YXRlJ1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGNsaWVudC9zcmMvaW5kZXguanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ })
/******/ ]);