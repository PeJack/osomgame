var app =
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var canvas = exports.canvas = document.getElementById("glcanvas");

var camera = exports.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 30000);

var scene = exports.scene = new THREE.Scene();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(4);

var _ground = __webpack_require__(7);

var _light = __webpack_require__(6);

var _water = __webpack_require__(8);

var _model = __webpack_require__(5);

var _utils = __webpack_require__(0);

var _physics = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var renderer = new THREE.WebGLRenderer({ antialias: true });
var container = document.getElementById('container');
var modelLoader = new _model.ModelLoader();
var clock = new THREE.Clock();
var physicsEngine = new _physics.PhysicsEngine();

var frameDelta = 0;

var Game = exports.Game = function () {
	function Game() {
		var _this = this;

		_classCallCheck(this, Game);

		this.addModels();
		this.loadGame = function () {
			var x = modelLoader.percentLoaded();
			console.log("Загружено: " + x + "%");

			if (x < 100) {
				window.setTimeout(_this.loadGame, 100);
				return;
			}

			// camera.up.set(0, 0, 1);

			_utils.scene.fog = new THREE.FogExp2(0xaabbbb, 0.00025);
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.setClearColor(0x000000, 1);
			renderer.shadowMap.enabled = true;

			physicsEngine.initialize();
			physicsEngine.playerPhysicsMaterial = new CANNON.Material('playerMaterial');

			_this.player = new _player.Player(renderer, modelLoader, physicsEngine);
			_this.player.spawn({
				scale: 1,
				health: 100,
				px: 0,
				py: 100,
				pz: 0
			});

			container.innerHTML = '';
			container.appendChild(renderer.domElement);

			_this.ground = new _ground.Ground();
			_this.light = new _light.Light();
			_this.water = new _water.Water();

			renderer.setClearColor(window.game.helpers.rgbToHex(_this.light.skycolor - 150, _this.light.skycolor - 30, _this.light.skycolor), 1);

			_utils.scene.add(_utils.camera);
			_utils.scene.add(_this.ground.mesh);
			_utils.scene.add(_this.light.lighttarget);
			_utils.scene.add(_this.light.spotlight);
			_utils.scene.add(_this.light.hemilight);
			_utils.scene.add(_this.water.mesh);

			_utils.scene.add(_this.player.mesh);

			_this.gameLoop = function () {
				window.requestAnimFrame(_this.gameLoop);
				_this.render();
				_this.update();
			};

			_this.gameLoop();
		};

		this.loadGame();
	}

	_createClass(Game, [{
		key: 'addModels',
		value: function addModels() {
			modelLoader.addJSON({
				obj: 'src/models/player/quandtum_grapple_girl_1_0.json',
				name: "player"
			});
		}
	}, {
		key: 'render',
		value: function render() {
			renderer.render(_utils.scene, _utils.camera);
		}
	}, {
		key: 'update',
		value: function update() {
			var delta = clock.getDelta();
			var elapsed = clock.getElapsedTime();

			this.player.draw(elapsed, delta);
		}
	}]);

	return Game;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(1);

var _utils = __webpack_require__(0);

window.requestAnimFrame = function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
		window.setTimeout(callback, 1000 / 60);
	};
}();

loadGame();

function loadGame() {
	if (!_utils.canvas) {
		window.setTimeout(loadGame, 100);
		return;
	}
	new _game.Game();
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PhysicsEngine = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PhysicsEngine = exports.PhysicsEngine = function () {
	function PhysicsEngine() {
		_classCallCheck(this, PhysicsEngine);

		this.world = null;
		this.bodies = [];
		this.visuals = [];
		this.bodyCount = 0;

		this.friction = 0;
		this.restitution = 0;
		this.gravity = -10;

		this.timeStep = 1 / 8;
		this.playerPhysicsMaterial = null;
		this.solidMaterial = null;
	}

	_createClass(PhysicsEngine, [{
		key: "initialize",
		value: function initialize() {
			this.overrideCollisionMatrixSet();

			this.world = new CANNON.World();
			this.world.gravity.set(0, 0, this.gravity);
			this.world.broadphase = new CANNON.NaiveBroadphase();
			this.world.solver.iterations = 5;

			this.bodies = [];
			this.visuals = [];

			this.bodyCount = 0;
		}
	}, {
		key: "overrideCollisionMatrixSet",
		value: function overrideCollisionMatrixSet() {
			var collisionMatrixSet = CANNON.World.prototype.collisionMatrixSet;

			CANNON.World.prototype.collisionMatrixSet = function (i, j, value, current) {
				collisionMatrixSet.call(this, i, j, [i, j], current);
			};
		}
	}, {
		key: "getCollisions",
		value: function getCollisions(index) {
			var collisions = 0;

			for (var i = 0; i < this.world.collisionMatrix.length; i++) {
				if (this.world.collisionMatrix[i] && this.world.collisionMatrix[i].length && (this.world.collisionMatrix[i][0] == index || this.world.collisionMatrix[i][1] == index)) {
					collisions++;
				}
			}

			return collisions;
		}
	}, {
		key: "rotateOnAxis",
		value: function rotateOnAxis(rigidBody, axis, radians) {
			var rotationQuaternion = new CANNON.Quaternion();
			rotationQuaternion.setFromAxisAngle(axis, radians);

			rigidBody.quaternion = rotationQuaternion.mult(rigidBody.quaternion);
		}
	}, {
		key: "createRigidBody",
		value: function createRigidBody(options) {
			var rigidBody = new CANNON.RigidBody(options.mass, options.shape, options.physicsMaterial);
			rigidBody.position.set(options.position.x, options.position.y, options.position.z);

			if (options.rotation) {
				rigidBody.quaternion.setFromAxisAngle(options.rotation[0], options.rotation[1]);
			}

			this.addVisual(rigidBody, options.meshMaterial, options.customMesh);

			return rigidBody;
		}
	}, {
		key: "createPhysicsMaterial",
		value: function createPhysicsMaterial(material, friction, restitution) {
			var physicsMaterial = material || new CANNON.Material();
			var contactMaterial = new CANNON.ContactMaterial(physicsMaterial, this.playerPhysicsMaterial, friction || this.friction, restitution || this.restitution);

			this.world.addContactMaterial(contactMaterial);

			return physicsMaterial;
		}
	}, {
		key: "addVisual",
		value: function addVisual(body, material, customMesh) {
			var mesh = customMesh || null;

			if (body instanceof CANNON.RigidBody && !mesh) {
				mesh = this.shape2mesh(body.shape, material);
			}

			if (mesh) {
				this.bodies.push(body);
				this.visuals.push(mesh);

				body.visualref = mesh;
				body.visualref.visualId = this.bodies.length - 1;

				_utils.scene.add(mesh);
				this.world.add(body);
			}

			return mesh;
		}
	}, {
		key: "removeVisual",
		value: function removeVisual(body) {
			if (body.visualref) {
				var old_b = [];
				var old_v = [];
				var n = this.bodies.length;

				for (var i = 0; i < n; i++) {
					old_b.unshift(this.bodies.pop());
					old_v.unshift(this.visuals.pop());
				}

				var id = body.visualref.visualId;

				for (var j = 0; j < old_b.length; j++) {
					if (j !== id) {
						var i = j > id ? j - 1 : j;
						this.bodies[i] = old_b[j];
						this.visuals[i] = old_v[j];
						this.bodies[i].visualref = old_b[j].visualref;
						this.bodies[i].visualref.visualId = i;
					}
				}

				body.visualref.visualId = null;
				this.scene.remove(body.visualref);
				body.visualref = null;
				this.world.remove(body);
			}
		}
	}, {
		key: "removeAllVisuals",
		value: function removeAllVisuals() {
			this.bodies.forEach(function (body) {
				if (body.visualref) {
					body.visualref.visualId = null;
					this.scene.remove(body.visualref);
					body.visualref = null;
					this.world.remove(body);
				}
			});
			this.bodies = [];
			this.visuals = [];
		}
	}, {
		key: "updatePhysics",
		value: function updatePhysics() {
			this.bodyCount = this.bodies.length;

			for (var i = 0; i < this.bodyCount; i++) {
				var body = this.bodies[i],
				    visual = this.visuals[i];

				body.position.copy(visual.position);

				if (body.quaternion) {
					body.quaternion.copy(visual.quaternion);
				}
			}

			this.world.step(this.timestep);
		}
	}, {
		key: "shape2mesh",
		value: function shape2mesh(shape, currentMaterial) {
			var mesh = void 0;
			var submesh = void 0;

			switch (shape.type) {
				case CANNON.Shape.types.SPHERE:
					var sphere_geometry = new THREE.SphereGeometry(shape.radius, shape.wSeg, shape.hSeg);
					mesh = new THREE.Mesh(sphere_geometry, currentMaterial);
					break;

				case CANNON.Shape.types.PLANE:
					var geometry = new THREE.PlaneGeometry(100, 100);
					mesh = new THREE.Object3D();
					submesh = new THREE.Object3D();
					var ground = new THREE.Mesh(geometry, currentMaterial);
					ground.scale = new THREE.Vector3(1000, 1000, 1000);
					submesh.add(ground);

					ground.castShadow = true;
					ground.receiveShadow = true;

					mesh.add(submesh);
					break;

				case CANNON.Shape.types.BOX:
					var box_geometry = new THREE.CubeGeometry(shape.halfExtents.x * 2, shape.halfExtents.y * 2, shape.halfExtents.z * 2);
					mesh = new THREE.Mesh(box_geometry, currentMaterial);
					mesh.castShadow = true;
					mesh.receiveShadow = true;
					break;

				case CANNON.Shape.types.COMPOUND:
					var o3d = new THREE.Object3D();
					for (var i = 0; i < shape.childShapes.length; i++) {

						var subshape = shape.childShapes[i];
						var o = shape.childOffsets[i];
						var q = shape.childOrientations[i];

						submesh = _cannon.shape2mesh(subshape);
						submesh.position.set(o.x, o.y, o.z);
						submesh.quaternion.set(q.x, q.y, q.z, q.w);

						submesh.useQuaternion = true;
						o3d.add(submesh);
						mesh = o3d;
					}
					break;

				default:
					throw "Visual type not recognized: " + shape.type;
			}

			mesh.receiveShadow = true;
			mesh.castShadow = true;

			if (mesh.children) {
				for (var _i = 0; _i < mesh.children.length; _i++) {
					mesh.children[_i].castShadow = true;
					mesh.children[_i].receiveShadow = true;

					if (mesh.children[_i]) {
						for (var j = 0; j < mesh.children[_i].length; j++) {
							mesh.children[_i].children[j].castShadow = true;
							mesh.children[_i].children[j].receiveShadow = true;
						}
					}
				}
			}

			return mesh;
		}
	}, {
		key: "showAABBs",
		value: function showAABBs() {
			var self = this;

			var GeometryCache = function GeometryCache(createFunc) {
				var self = this,
				    geo = null,
				    geometries = [],
				    gone = [];

				self.request = function () {
					if (geometries.length) {
						geo = geometries.pop();
					} else {
						geo = createFunc();
					}

					this.scene.add(geo);
					gone.push(geo);

					return geo;
				};

				self.restart = function () {
					while (gone.length) {
						geometries.push(gone.pop());
					}
				};

				self.hideCached = function () {
					for (var i = 0; i < geometries.length; i++) {
						this.scene.remove(geometries[i]);
					}
				};
			};

			var bboxGeometry = new THREE.CubeGeometry(1, 1, 1);

			var bboxMaterial = new THREE.MeshBasicMaterial({
				color: 0xffffff,
				wireframe: true
			});

			var bboxMeshCache = new GeometryCache(function () {
				return new THREE.Mesh(bboxGeometry, bboxMaterial);
			});

			self.update = function () {
				bboxMeshCache.restart();

				for (var i = 0; i < this.bodies.length; i++) {
					var b = this.bodies[i];

					if (b.computeAABB) {
						if (b.aabbNeedsUpdate) {
							b.computeAABB();
						}

						if (isFinite(b.aabbmax.x) && isFinite(b.aabbmax.y) && isFinite(b.aabbmax.z) && isFinite(b.aabbmin.x) && isFinite(b.aabbmin.y) && isFinite(b.aabbmin.z) && b.aabbmax.x - b.aabbmin.x != 0 && b.aabbmax.y - b.aabbmin.y != 0 && b.aabbmax.z - b.aabbmin.z != 0) {
							var mesh = bboxMeshCache.request();

							mesh.scale.set(b.aabbmax.x - b.aabbmin.x, b.aabbmax.y - b.aabbmin.y, b.aabbmax.z - b.aabbmin.z);

							mesh.position.set((b.aabbmax.x + b.aabbmin.x) * 0.5, (b.aabbmax.y + b.aabbmin.y) * 0.5, (b.aabbmax.z + b.aabbmin.z) * 0.5);
						}
					}
				}

				bboxMeshCache.hideCached();
			};

			self.intialize = function () {
				var updatePhysics = this.updatePhysics;

				this.updatePhysics = function () {
					updatePhysics();
					self.update();
				};
			};

			return self;
		}
	}]);

	return PhysicsEngine;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Player = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = exports.Player = function () {
    function Player(renderer, modelLoader, physicsEngine) {
        _classCallCheck(this, Player);

        var self = this;

        this.renderer = renderer;
        this.modelLoader = modelLoader;
        this.physicsEngine = physicsEngine;

        this.jumpSpeed = 20;
        this.moveSpeed = 90;
        this.mass = 3;
        this.cameraOffsetH = 240;
        this.cameraOffsetV = 140;

        this.isGrounded = false;
        this.isJumping = false;
        this.isMoving = false;

        this.model = this.modelLoader.getModel('player');
        this.shape = new CANNON.Box(this.model.halfExtents);
        this.rigidBody = new CANNON.RigidBody(this.mass, this.shape, this.physicsEngine.createPhysicsMaterial(this.physicsEngine.playerPhysicsMaterial));
        this.rigidBody.position.set(0, 0, 50);
        this.mesh = this.physicsEngine.addVisual(this.rigidBody, null, this.model.mesh);

        this.orientationConstraint = new CANNON.HingeConstraint(this.rigidBody, new CANNON.Vec3(0, 0, 0), new CANNON.Vec3(0, 0, 1), this.rigidBody, new CANNON.Vec3(0, 0, 1), new CANNON.Vec3(0, 0, 1));

        this.physicsEngine.world.addConstraint(this.orientationConstraint);

        this.rigidBody.postStep = function () {
            this.rigidBody.angularVelocity.z = 0;
            this.setOrientation();
        };

        this.rigidBody.addEventListener('collide', function (e) {
            if (!this.isGrounded) {
                this.isGrounded = new CANNON.Ray(this.mesh.position, new CANNON.Vec3(0, 0, -1)).intersectBody(e.contact.bi).length > 0;
            }
        });

        this.animations = {};

        this.currentlyPressedKeys = {};
        this.keys = {
            A: 65,
            S: 83,
            D: 68,
            W: 87,
            SPACEBAR: 32
        };
        this.mouseButtons = {
            LEFT: 0,
            RIGHT: 2
        };
        this.isMouseDown = false;

        document.addEventListener('keyup', function (e) {
            return self.onKeyUp(e);
        }, false);
        document.addEventListener('keydown', function (e) {
            return self.onKeyDown(e);
        }, false);
        document.addEventListener('mousemove', function (e) {
            return self.onMouseMove(e);
        }, false);
        document.addEventListener('mouseup', function (e) {
            return self.onMouseUp(e);
        }, false);
        document.addEventListener('mousedown', function (e) {
            return self.onMouseDown(e);
        }, false);
    }

    _createClass(Player, [{
        key: 'setAnimation',
        value: function setAnimation(type) {
            if (type != this.animType) {
                if (this.animations[this.animType]) this.animations[this.animType].pause();

                this.animType = type;
                this.animations[type].play();
            }
        }
    }, {
        key: 'setCamera',
        value: function setCamera() {
            this.mesh.add(_utils.camera);

            var x = this.mesh.position.x;
            var y = this.mesh.position.y;
            var z = this.mesh.position.z;

            _utils.camera.position.set(x, y + 60, z - 100);
            _utils.camera.rotation.set(0, 0, -Math.PI);
            _utils.camera.rotation.x = Math.min(Math.PI + 1, Math.max(Math.PI, _utils.camera.rotation.x));
        }
    }, {
        key: 'updateCamera',
        value: function updateCamera() {
            var camCoordinates = window.game.helpers.polarToCartesian(this.cameraOffsetH, this.rotationRadians.z);

            var x = this.mesh.position.x;
            var y = this.mesh.position.y + 60;
            var z = this.mesh.position.z + this.cameraOffsetV;

            _utils.camera.position.set(x, y, z);
            _utils.camera.lookAt(this.mesh.position);
        }
    }, {
        key: 'updateOrientation',
        value: function updateOrientation() {
            this.rotationRadians = new THREE.Euler().setFromQuaternion(this.rigidBody.quaternion);

            this.rotationAngleX = Math.round(window.game.helpers.radToDeg(this.rotationRadians.x));
            this.rotationAngleY = Math.round(window.game.helpers.radToDeg(this.rotationRadians.y));

            if (this.physicsEngine.getCollisions(this.rigidBody.index) && (this.rotationAngleX >= 90 || this.rotationAngleX <= -90 || this.rotationAngleY >= 90 || this.rotationAngleY <= -90)) {
                this.rigidBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), this.rotationRadians.z);
            }
        }
    }, {
        key: 'draw',
        value: function draw(elapsed, delta) {
            this.handleKeys(elapsed, delta);
            this.updateOrientation();
            this.updateCamera();
        }
    }, {
        key: 'spawn',
        value: function spawn(args) {
            this.scale = args.scale;
            this.health = args.health;
            this.px = args.px;
            this.py = args.py;
            this.pz = args.pz;

            this.mesh = this.model.mesh;
            // this.animations = model.animations;

            this.scale = 1;

            this.mesh.position.set(this.px, this.py, this.pz);
            this.mesh.scale.set(this.scale, this.scale, this.scale);

            this.setCamera();
        }
    }, {
        key: 'handleKeys',
        value: function handleKeys(elapsed, delta) {
            var moveDistance = 200 * delta;

            if (this.currentlyPressedKeys[this.keys.W]) {
                this.mesh.translateZ(moveDistance);
                // this.setAnimation('Walk');
            }

            if (this.currentlyPressedKeys[this.keys.A]) {
                this.mesh.translateX(moveDistance);
            }

            if (this.currentlyPressedKeys[this.keys.S]) {
                this.mesh.translateZ(-moveDistance);
            }

            if (this.currentlyPressedKeys[this.keys.D]) {
                this.mesh.translateX(-moveDistance);
            }
        }
    }, {
        key: 'onKeyDown',
        value: function onKeyDown(event) {
            this.currentlyPressedKeys[event.keyCode] = true;
        }
    }, {
        key: 'onKeyUp',
        value: function onKeyUp(event) {
            this.currentlyPressedKeys[event.keyCode] = false;
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(event) {
            event.preventDefault();

            if (event.button == this.mouseButtons.LEFT) {
                this.isMouseDown = true;
            }
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(event) {
            // event.preventDefault();
            var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

            var x = movementX * 0.001;
            var y = movementY * 0.001;

            var rotateAngle = Math.PI / 1.5 * x;
            this.physicsEngine.rotateOnAxis(this.rigidBody, new CANNON.Vec3(0, 1, 0), -rotateAngle);

            this.mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), -rotateAngle);

            _utils.camera.rotation.y += y;
            // camera.rotation.x = Math.min(Math.PI+1, Math.max(Math.PI, camera.rotation.x ));
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(event) {
            this.isMouseDown = false;
        }
    }]);

    return Player;
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

var ModelLoader = exports.ModelLoader = function () {
    function ModelLoader() {
        _classCallCheck(this, ModelLoader);

        this.models = [];
        this.loaded = 0;
        this.total = 0;
    }

    _createClass(ModelLoader, [{
        key: "percentLoaded",
        value: function percentLoaded() {
            return Math.round(this.loaded / this.total * 100);
        }
    }, {
        key: "getModel",
        value: function getModel(name) {
            return this.models[name];
        }
    }, {
        key: "addJSON",
        value: function addJSON(args) {
            this.models[args.name] = new THREE.Object3D();
            this.models[args.name].args = args;
            this.total++;

            var loader = new THREE.JSONLoader();
            loader.load(args.obj, this.loadJSON.bind(this, args.name));
        }
    }, {
        key: "loadJSON",
        value: function loadJSON(name, geometry, materials) {
            //let faceMaterial = new THREE.MeshFaceMaterial(materials);
            this.createCannonGeometry(geometry, 1);

            var halfExtents = this.createCannonHalfExtents(geometry);
            var mesh = new THREE.SkinnedMesh(geometry, materials);

            var mixer = new THREE.AnimationMixer(geometry);
            var animations = {};

            geometry.animations.map(function (anim) {
                animations[anim.name] = mixer.clipAction(anim);
            });

            this.models[name].mesh = mesh;
            this.models[name].halfExtents = halfExtents;
            this.models[name].animations = animations;

            this.loaded++;
        }
    }, {
        key: "createCannonGeometry",
        value: function createCannonGeometry(geometry, scale) {
            var translateX = void 0,
                translateY = void 0,
                translateZ = void 0;

            geometry.computeBoundingBox();

            translateX = -(geometry.boundingBox.getSize().x / 2 + geometry.boundingBox.min.x);
            translateY = -(geometry.boundingBox.getSize().y / 2 + geometry.boundingBox.min.y);
            translateZ = -(geometry.boundingBox.getSize().z / 2 + geometry.boundingBox.min.z);

            //geometry.applyMatrix(new THREE.Matrix4().makeTranslation(translateX, translateY, translateZ));
            //geometry.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2));
            geometry.applyMatrix(new THREE.Matrix4().makeScale(scale, scale, scale));
        }
    }, {
        key: "createCannonHalfExtents",
        value: function createCannonHalfExtents(geometry) {
            geometry.computeBoundingBox();

            return new CANNON.Vec3((geometry.boundingBox.max.x - geometry.boundingBox.min.x) * 0.5, (geometry.boundingBox.max.y - geometry.boundingBox.min.y) * 0.5, (geometry.boundingBox.max.z - geometry.boundingBox.min.z) * 0.5);
        }
    }]);

    return ModelLoader;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Light = exports.Light = function () {
    function Light(renderer, scene) {
        _classCallCheck(this, Light);

        this.lighttarget = null;
        this.spotlight = null;
        this.hemilight = null;
        this.skycolor = 200;

        this.create();
    }

    _createClass(Light, [{
        key: "create",
        value: function create() {
            this.lighttarget = new THREE.Object3D();
            this.lighttarget.position.set(0, 0, 0);

            this.spotlight = new THREE.SpotLight(0xffffff);
            this.spotlight.position.set(0, 6500, 0);
            this.spotlight.shadow.camera.visible = false;
            this.spotlight.shadow.camera.near = 3000;
            this.spotlight.shadow.camera.far = 10000;
            this.spotlight.intensity = 1.7;
            this.spotlight.shadow.mapSize.height = 1024;
            this.spotlight.shadow.mapSize.width = 1024;
            this.spotlight.target = this.lighttarget;

            this.hemilight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
            this.hemilight.color.setHSL(0.2, 1, 0.2);
            this.hemilight.groundColor.setHSL(1, 1, 1);
            this.hemilight.position.set(0, 1000, 0);
            this.hemilight.intensity = 0.7;
        }
    }]);

    return Light;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Ground = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var groundV = __webpack_require__(10);
var groundF = __webpack_require__(9);

var Ground = exports.Ground = function () {
    function Ground() {
        _classCallCheck(this, Ground);

        this.noise = 0;

        this.create();
    }

    _createClass(Ground, [{
        key: 'create',
        value: function create() {
            var noise = this.generateNoise();
            for (var x = 0; x < noise.length; x++) {
                for (var y = 0; y < noise[x].length; y++) {
                    var color = Math.round(255 * noise[x][y]);

                    if (color < 0) color = 0;
                    var context = _utils.canvas.getContext("2d");
                    context.fillStyle = "rgb(" + color + ", " + color + ", " + color + ")";
                    context.fillRect(x, y, 1, 1);
                }
            }

            this.noise = noise;

            var loader = new THREE.TextureLoader();

            var bumpTexture = loader.load(_utils.canvas.toDataURL());
            bumpTexture.wrapS = bumpTexture.wrapT = THREE.RepeatWrapping;
            var bumpScale = 200.0;

            var grassTexture = loader.load("src/textures/grass.png");
            grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;

            var rockTexture = loader.load("src/textures/rock.jpg");
            rockTexture.wrapS = rockTexture.wrapT = THREE.RepeatWrapping;

            var uniforms = {
                bumpTexture: { type: "t", value: bumpTexture },
                bumpScale: { type: "f", value: bumpScale },
                grassTexture: { type: "t", value: grassTexture },
                rockTexture: { type: "t", value: rockTexture }
            };

            var material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: groundV,
                fragmentShader: groundF,
                transparent: true
            });

            var geometry = new THREE.PlaneGeometry(5000, 5000, 50, 50);
            var plane = new THREE.Mesh(geometry, material);

            plane.rotation.x = -Math.PI / 2;
            this.mesh = plane;
        }
    }, {
        key: 'generateNoise',
        value: function generateNoise() {
            var noiseArr = [];

            for (var i = 0; i <= 15; i++) {
                noiseArr[i] = [];

                for (var j = 0; j <= 15; j++) {
                    var height = Math.random();

                    if (i == 0 || j == 0 || i == 5 || j == 5 || j == 10 || i == 10) height = -0.15;

                    noiseArr[i][j] = height;
                }
            }
            return this.interpolate(noiseArr);
        }
    }, {
        key: 'interpolate',
        value: function interpolate(points) {
            var noiseArr = [];
            var x = 0;
            var y = 0;
            var p = 30;

            for (var i = 0; i < 300; i++) {
                if (i != 0 && i % p == 0) x++;

                noiseArr[i] = [];
                for (var j = 0; j < 300; j++) {
                    if (j != 0 && j % p == 0) y++;

                    var mu_x = i % p / p;
                    var mu_2 = (1 - Math.cos(mu_x * Math.PI)) / 2;

                    var int_x1 = points[x][y] * (1 - mu_2) + points[x + 1][y] * mu_2;
                    var int_x2 = points[x][y + 1] * (1 - mu_2) + points[x + 1][y + 1] * mu_2;

                    var mu_y = j % p / p;
                    mu_2 = (1 - Math.cos(mu_y * Math.PI)) / 2;
                    var int_y = int_x1 * (1 - mu_2) + int_x2 * mu_2;

                    noiseArr[i][j] = int_y;
                }
                y = 0;
            }
            return noiseArr;
        }
    }]);

    return Ground;
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Water = exports.Water = function () {
    function Water() {
        _classCallCheck(this, Water);

        this.mesh = null;

        this.create();
    }

    _createClass(Water, [{
        key: "create",
        value: function create() {
            var geometry = new THREE.PlaneGeometry(15000, 15000, 128, 128);
            geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
            geometry.dynamic = true;

            var i = void 0,
                j = void 0,
                il = void 0,
                jl = void 0;

            for (i = 0, il = geometry.vertices.length; i < il; i++) {
                geometry.vertices[i].y = 35 * Math.sin(i / 2);
            }

            geometry.computeFaceNormals();
            geometry.computeVertexNormals();

            var loader = new THREE.TextureLoader();

            var texture = loader.load("src/textures/water.jpg");
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(32, 32);

            var material = new THREE.MeshPhongMaterial({
                color: 0x00CCFF,
                map: texture,
                transparent: true,
                opacity: 0.5,
                shininess: 10.0,
                emissive: 0x555555,
                specular: 0x000000,
                depthWrite: false,
                depthTest: true
            });

            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(0, 70, 0);

            this.mesh = mesh;
        }
    }]);

    return Water;
}();

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "uniform sampler2D grassTexture;\nuniform sampler2D rockTexture;\n\nvarying vec2 vUV;\n\nvarying float vAmount;\n\nvoid main() \n{\n    vec4 grass = (smoothstep(0.30, 0.50, vAmount) - smoothstep(0.70, 0.80, vAmount)) * texture2D( grassTexture, vUV * 10.0 );\n    vec4 rock = (smoothstep(0.31, 0.85, vAmount)) * texture2D( rockTexture, vUV * 10.0 ); \n    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0) + grass + rock; \n} "

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "uniform sampler2D bumpTexture;\nuniform float bumpScale;\n\nvarying float vAmount;\nvarying vec2 vUV;\n\nvoid main() \n{ \n\tvUV = uv;\n\tvec4 bumpData = texture2D( bumpTexture, uv );\n\t\n\tvAmount = bumpData.r; // assuming map is grayscale it doesn't matter if you use r, g, or b.\n\t\n\t// move the position along the normal\n    vec3 newPosition = position + normal * bumpScale * vAmount;\n\t\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );\n}"

/***/ })
/******/ ]);