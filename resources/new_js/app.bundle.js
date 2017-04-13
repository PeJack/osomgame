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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MainApp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Platform = __webpack_require__(4);

var _Input = __webpack_require__(8);

var _canvas = __webpack_require__(6);

var _GameLoop = __webpack_require__(2);

var _Player = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.onbeforeunload = function () {
    window.backend.beforeUnloaded();
};

var Backend = function () {
    function Backend(ws, wsurl, player) {
        var _this = this;

        _classCallCheck(this, Backend);

        this.player = player;
        this.ws = ws;
        this.callbacks = [];
        this.settings = null;

        this.ws.onopen = function () {
            _this.onOpen();
            console.log("connected to " + wsurl);
        };

        this.ws.onclose = function (e) {
            _this.beforeUnloaded();
            console.log("connection closed (" + e.code + ")");
        };

        this.ws.onmessage = function (e) {
            var data = JSON.parse(e.data);
            _this.process(data);
        };
    }

    _createClass(Backend, [{
        key: 'send',
        value: function send(method) {
            var entityType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var entity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var request = {
                method: method
            };

            if (entityType) {
                request[entityType] = entity;
            }

            var jsonRequest = JSON.stringify(request);

            this.ws.send(jsonRequest);
        }
    }, {
        key: 'register',
        value: function register(method, callback) {
            this.callbacks[method] = callback;
        }
    }, {
        key: 'process',
        value: function process(data) {
            if (data == 9) {
                return;
            }
            this.callbacks[data.method](data.message);
        }
    }, {
        key: 'beforeUnloaded',
        value: function beforeUnloaded() {
            this.send('closeConn', 'player', this.player);
        }
    }, {
        key: 'onOpen',
        value: function onOpen() {
            this.send('getSettings');
            this.send('register');
        }
    }]);

    return Backend;
}();

var MainApp = exports.MainApp = function () {
    function MainApp(db) {
        _classCallCheck(this, MainApp);

        this.db = db;
        this.wsurl = "ws://127.0.0.1:8080/ws";

        //Элементы DOM
        this.canvas = null;

        //Веб сокеты
        this.ws = null;

        //Сервис управления сокетами
        this.backend = null;
        this.settings = {};

        //Класс для отрисовки картинки нашего изображения
        this.gameLoop = null;

        this.start();
    }

    _createClass(MainApp, [{
        key: 'start',
        value: function start() {
            var _this2 = this;

            this.ws = new WebSocket(this.wsurl);

            this.backend = new Backend(this.ws, this.wsurl, this.db.player);
            window.backend = this.backend;

            this.backend.register("getSettings", function (resp) {
                for (var _k in resp) {
                    _this2.settings[_k] = resp[_k];
                }

                _this2.init();
            });

            this.backend.register("register", function (resp) {

                if (!_this2.db.player) {
                    var p = new _Player.Player(resp.player.ID, resp.player.X, resp.player.Y, resp.player.Width, resp.player.Height, resp.player.Speed);

                    _this2.db.setPlayer(p);
                    _this2.input = new _Input.Input();
                }

                _this2.gameLoop = new _GameLoop.GameLoop(_this2.canvas, _this2.canvas.context, _this2.input, _this2.backend, _this2.db, _this2.settings);
            });

            this.backend.register("move", function (resp) {
                if (_this2.db.player == undefined || resp.id == _this2.db.player.id) {
                    return;
                }

                var p = _this2.db.players[resp.id];
                if (!p) {
                    return;
                };

                p.x = resp.x;
                p.y = resp.y;
                p.speed = resp.speed;
            });

            this.backend.register("sendMsgToChat", function (resp) {
                _this2.db.message = resp.Message;
                _this2.db.removeMessage(_this2.db.message);

                _this2.canvas.chatWindow.innerHTML = '';

                for (k in _this2.db.messages) {
                    d = new Date(_this2.db.messages[k].CreatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    var msg = '<div>';
                    msg += '[' + d + ']';
                    msg += '[' + _this2.db.messages[k].OwnerId + ']: ' + _this2.db.messages[k].Text;

                    _this2.canvas.chatWindow.innerHTML += msg;
                }
            });

            this.backend.register("gameState", function (resp) {
                for (var id in resp.platforms) {
                    var p = resp.platforms[id];

                    if (!_this2.db.platforms[id]) {
                        _this2.db.addPlatform(id, new _Platform.Platform(p.ID, p.X, p.Y, p.Width, p.Height));
                    }
                };

                for (var _id in _this2.db.players) {
                    if (!resp.players[_id]) {
                        _this2.db.removePlayer(_id);
                    }
                }

                for (var _id2 in resp.players) {
                    var _p = resp.players[_id2];
                    if (!_this2.db.players[_id2] && _this2.db.player.id != _p.ID) {
                        _this2.db.addPlayer(_id2, new _Player.Player(_p.ID, _p.X, _p.Y, _p.Width, _p.Height, _p.Speed));
                    }
                }
            });
        }
    }, {
        key: 'init',
        value: function init() {
            this.canvas = new _canvas.Canvas(this.backend, this.settings, this.db.player);
        }
    }]);

    return MainApp;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var db = exports.db = function () {
    function db() {
        _classCallCheck(this, db);

        this.message = undefined;
        this.player = undefined;

        this.messages = {};
        this.players = {};
        this.platforms = {};
    }

    _createClass(db, [{
        key: "addMessage",
        value: function addMessage(id, message) {
            this.messages[id] = message;
        }
    }, {
        key: "removeMessage",
        value: function removeMessage(message) {
            this.messages.unshift(message);
        }
    }, {
        key: "setPlayer",
        value: function setPlayer(player) {
            this.player = player;
        }
    }, {
        key: "addPlayer",
        value: function addPlayer(id, player) {
            this.players[id] = player;
        }
    }, {
        key: "removePlayer",
        value: function removePlayer(id) {
            delete this.players[id];
        }
    }, {
        key: "addPlatform",
        value: function addPlatform(id, platform) {
            this.platforms[id] = platform;
        }
    }, {
        key: "removePlatform",
        value: function removePlatform(id) {
            delete this.platforms[id];
        }
    }, {
        key: "getDb",
        value: function getDb() {
            return this;
        }
    }]);

    return db;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// GameLoop - главный цикл игры

// TODO: 
// 1) переписать отрисовку игрока в цикле (player.update);
// 2) переписать хендлер управления (handleInput);
// 3) пофиксить баг с ускорением персонажа при присоединении нового игрока;
var GameLoop = exports.GameLoop = function GameLoop(canvas, context, input, backend, db, settings) {
    var _this = this;

    _classCallCheck(this, GameLoop);

    this.backend = backend;
    this.canvas = document.getElementById("gameWindow");
    this.context = this.canvas.getContext("2d");
    this.input = input;
    this.settings = settings;

    this.db = db;

    this.draw = function () {
        _this.context.fillStyle = "#FFF";
        _this.context.fillRect(0, 0, _this.canvas.width, _this.canvas.height);

        if (_this.db.player) {
            _this.db.player.draw(_this.context);
        }

        for (var id in _this.db.players) {
            _this.db.players[id].draw(context);
        }

        for (var _id in _this.db.platforms) {
            _this.db.platforms[_id].draw(context);
        }
    };

    this.update = function () {
        _this.handleInput();
        _this.collisionCheck();
        _this.db.player.update(_this.backend);
    };

    this.gameLoop = function () {

        _this.update();
        _this.draw();
        requestAnimationFrame(_this.gameLoop);
    };

    this.handleInput = function () {
        _this.db.player.isMoved = false;

        if (document.activeElement === document.getElementById("chat-input")) {
            return;
        }

        if (_this.input.isDown('DOWN') || _this.input.isDown('s')) {
            _this.db.player.isMoved = true;
            _this.db.player.y += _this.db.player.speed;
        }

        if (_this.input.isDown('UP') || _this.input.isDown('w')) {
            if (!_this.db.player.isJumping && _this.db.player.isGrounded) {
                _this.db.player.isJumping = true;
                _this.db.player.isGrounded = false;
                _this.db.player.velY = -_this.db.player.speed * 2;
            }
        }

        if (_this.input.isDown('LEFT') || _this.input.isDown('a')) {
            _this.db.player.isMoved = true;
            if (_this.db.player.velX > -_this.db.player.speed) {
                _this.db.player.velX--;
            }
        }

        if (_this.input.isDown('RIGHT') || _this.input.isDown('d')) {
            _this.db.player.isMoved = true;
            if (_this.db.player.velX < _this.db.player.speed) {
                _this.db.player.velX++;
            }
        }

        _this.db.player.velX *= parseFloat(_this.settings.friction);
        _this.db.player.velY += parseFloat(_this.settings.gravity);
    };

    this.collisionCheck = function () {
        _this.db.player.isGrounded = false;

        for (var id in _this.db.platforms) {
            var platform = _this.db.platforms[id];

            var colDir = _this.db.player.collide(platform);
            if (colDir === "left" || colDir === "right") {
                _this.db.player.velX = 0;
                _this.db.player.isJumping = false;
            } else if (colDir === "bottom") {
                _this.db.player.isGrounded = true;
                _this.db.player.isJumping = false;
            } else if (colDir === "top") {
                _this.db.player.velY *= -1;
            }
        }

        if (_this.db.player.isGrounded) {
            _this.db.player.velY = 0;
        }

        _this.db.player.x += _this.db.player.velX;
        _this.db.player.y += _this.db.player.velY;
    };

    this.gameLoop();
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Message - сообщения в чате
var Message = exports.Message = function Message(id, text, ownerId, createdAt) {
    _classCallCheck(this, Message);

    this.id = id;
    this.text = text;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Platform - физические платформы, по которым перемещается игрок
var Platform = exports.Platform = function () {
    function Platform(id, x, y, width, height) {
        _classCallCheck(this, Platform);

        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    _createClass(Platform, [{
        key: 'draw',
        value: function draw(context) {
            context.beginPath();
            context.rect(this.x, this.y, this.width, this.height);
            context.fillStyle = 'black';
            context.fill();
            context.lineWidth = 1;
            context.stroke();
        }
    }]);

    return Platform;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Player - игрок
var Player = exports.Player = function () {
    function Player(id, x, y, width, height, speed) {
        _classCallCheck(this, Player);

        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width || 20;
        this.height = height || 20;
        this.speed = speed || 4;
        this.velX = 0;
        this.velY = 0;

        // Состояния игрока
        this.isMoved = false;
        this.isJumping = false;
        this.isGrounded = false;
        this.isAlive = true;
    }

    _createClass(Player, [{
        key: 'draw',
        value: function draw(context) {
            context.beginPath();

            context.rect(this.x, this.y, this.width, this.height);

            context.fillStyle = 'yellow';
            context.fill();

            context.lineWidth = 7;
            context.strokeStyle = 'black';
            context.stroke();

            context.font = '24px Arial';
            context.fillStyle = 'black';
            context.fillText(this.id, this.x - this.width / 5, this.y - 10);
        }
    }, {
        key: 'update',
        value: function update(backend) {
            backend.send('move', 'player', this);
        }
    }, {
        key: 'collide',
        value: function collide(obj) {
            // получение векторов из позиций
            var vX = this.x + this.width / 2 - (obj.x + obj.width / 2),
                vY = this.y + this.height / 2 - (obj.y + obj.height / 2),
                hWidths = this.width / 2 + obj.width / 2,
                hHeights = this.height / 2 + obj.height / 2,
                colDir = null;

            if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
                // проверка с какой стороны происходит столкновение
                var oX = hWidths - Math.abs(vX),
                    oY = hHeights - Math.abs(vY);
                if (oX >= oY) {
                    if (vY > 0) {
                        colDir = "top";
                        this.y += oY;
                    } else {
                        colDir = "bottom";
                        this.y -= oY;
                    }
                } else {
                    if (vX > 0) {
                        colDir = "left";
                        this.x += oX;
                    } else {
                        colDir = "right";
                        this.x -= oX;
                    }
                }
            }
            return colDir;
        }
    }]);

    return Player;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Canvas = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Message = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = exports.Canvas = function () {
    function Canvas(backend, settings, player) {
        var _this = this;

        _classCallCheck(this, Canvas);

        this.player = player;
        this.backend = backend;
        this.settings = settings;

        this.canvas = document.createElement("canvas");
        this.canvas.id = "gameWindow";
        this.canvas.style.cssText = "border:1px solid #000000;";
        this.context = this.canvas.getContext("2d");

        this.canvas.width = settings.canvasWidth;
        this.canvas.height = settings.canvasHeight;
        document.body.appendChild(this.canvas);

        this.chatWindow = document.createElement("div");
        this.chatWindow.id = "chat-window";
        this.chatWindow.style.cssText = "width:600px;height:100px;overflow-y:scroll";
        document.body.appendChild(this.chatWindow);

        this.chatForm = document.createElement("form");
        this.chatForm.id = "chat-form";

        this.chatInput = document.createElement("input");
        this.chatInput.id = "chat-input";
        this.chatInput.style.cssText = "width:600px;";
        this.chatInput.type = "text";

        this.chatForm.appendChild(this.chatInput);
        document.body.appendChild(this.chatForm);

        this.chatForm.onsubmit = function (e) {
            e.preventDefault();

            _this.submitListener();
        };
    }

    _createClass(Canvas, [{
        key: "submitListener",
        value: function submitListener() {
            var message = new _Message.Message(0, this.chatInput.value, this.player.id, +new Date());

            this.backend.send('sendMsgToChat', 'message', message);
            this.chatInput.value = null;
            this.chatInput.blur();
        }
    }]);

    return Canvas;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _db = __webpack_require__(1);

var _app = __webpack_require__(0);

new _app.MainApp(new _db.db());

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Input - система управления игрока
var Input = exports.Input = function () {
    function Input() {
        var _this = this;

        _classCallCheck(this, Input);

        this.pressedKeys = {};
        this.pressedMouse = false;

        document.addEventListener('keydown', function (e) {
            return _this.setKey(e, true);
        });
        document.addEventListener('keyup', function (e) {
            return _this.setKey(e, false);
        });

        window.addEventListener('blur', function () {
            return _this.pressedKeys = {};
        });

        window.addEventListener('mousedown', function (e) {
            return _this.pressedMouse = true;
        });
        window.addEventListener('mouseup', function (e) {
            return _this.pressedMouse = false;
        });
    }

    _createClass(Input, [{
        key: 'isDown',
        value: function isDown(key) {
            return this.pressedKeys[key.toUpperCase()];
        }
    }, {
        key: 'isMouseDown',
        value: function isMouseDown() {
            return this.pressedMouse;
        }
    }, {
        key: 'setKey',
        value: function setKey(event, status) {
            var code = event.keyCode;
            var key = void 0;

            switch (code) {
                case 32:
                    key = 'SPACE';break;
                case 37:
                    key = 'LEFT';break;
                case 38:
                    key = 'UP';break;
                case 39:
                    key = 'RIGHT';break;
                case 40:
                    key = 'DOWN';break;
                default:
                    // Convert ASCII codes to letters
                    key = String.fromCharCode(code);
            }

            this.pressedKeys[key] = status;
        }
    }]);

    return Input;
}();

/***/ })
/******/ ]);