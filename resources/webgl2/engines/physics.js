import {scene} from './../utils';

export class PhysicsEngine {
    constructor() {
        this.world = null;
        this.bodies = [];
        this.visuals = [];
        this.bodyCount = 0;

        this.friction = 0;
        this.restitution = 0;
        this.gravity = -10;

        this.timeStep = 1/8;
        this.playerPhysicsMaterial = null;
        this.solidMaterial = null;
    };

    initialize() {
        this.overrideCollisionMatrixSet();

        this.world = new CANNON.World();
        this.world.gravity.set(0, 0, this.gravity);
        this.world.broadphase = new CANNON.NaiveBroadphase();
        this.world.solver.iterations = 5;

        this.bodies = [];
        this.visuals = [];

        this.bodyCount = 0;
    };

    overrideCollisionMatrixSet() {
        let collisionMatrixSet = CANNON.World.prototype.collisionMatrixSet;

        CANNON.World.prototype.collisionMatrixSet = function(i, j, value, current) {
            collisionMatrixSet.call(this, i, j, [i, j], current);
        }
    };

    getCollisions(index) {
        let collisions = 0;

        for(let i = 0; i < this.world.collisionMatrix.length; i++) {
            if(
               this.world.collisionMatrix[i] && 
               this.world.collisionMatrix[i].length &&
               (this.world.collisionMatrix[i][0] == index ||
                this.world.collisionMatrix[i][1] == index)
              ) {
                  collisions++;
              }
        }

        return collisions;
    };

    rotateOnAxis(rigidBody, axis, radians) {
        let rotationQuaternion = new CANNON.Quaternion();
        rotationQuaternion.setFromAxisAngle(axis, radians);

        rigidBody.quaternion = rotationQuaternion.mult(rigidBody.quaternion);
    };

    createRigidBody(options) {
        let rigidBody = new CANNON.RigidBody(options.mass, options.shape, options.physicsMaterial);
        rigidBody.position.set(options.position.x, options.position.y, options.position.z);

        if (options.rotation) {
            rigidBody.quaternion.setFromAxisAngle(options.rotation[0], options.rotation[1]);
        }

        this.addVisual(rigidBody, options.meshMaterial, options.customMesh);

        return rigidBody;
    };

    createPhysicsMaterial(material, friction, restitution) {
        let physicsMaterial = material || new CANNON.Material();
        let contactMaterial = new CANNON.ContactMaterial(physicsMaterial, this.playerPhysicsMaterial, friction || this.friction, restitution || this.restitution);

        this.world.addContactMaterial(contactMaterial);

        return physicsMaterial;
    };

    addVisual(body, material, customMesh) {
        let mesh = customMesh || null;

        if (body instanceof CANNON.RigidBody && !mesh) {
            mesh = this.shape2mesh(body.shape, material);
        }

        if (mesh) {
            this.bodies.push(body);
            this.visuals.push(mesh);

            body.visualref = mesh;
            body.visualref.visualId = this.bodies.length - 1;

            scene.add(mesh);
            this.world.add(body);
        }

        return mesh;
    };

    removeVisual(body) {
		if (body.visualref) {
			var old_b = [];
			var old_v = [];
			var n = this.bodies.length;

			for (var i = 0; i < n; i++){
				old_b.unshift(this.bodies.pop());
				old_v.unshift(this.visuals.pop());
			}

			var id = body.visualref.visualId;

			for (var j = 0; j < old_b.length; j++){
				if (j !== id){
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
	};

	removeAllVisuals() {
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
	};

	updatePhysics() {
	    this.bodyCount = this.bodies.length;

		for (let i = 0; i < this.bodyCount; i++) {
			let body = this.bodies[i], visual = this.visuals[i];
			
            body.position.copy(visual.position);
			
            if (body.quaternion) {
				body.quaternion.copy(visual.quaternion);
			}
		}

		this.world.step(this.timestep);
	};
	
    shape2mesh(shape, currentMaterial) {
		let mesh;
		let submesh;

		switch (shape.type){
			case CANNON.Shape.types.SPHERE:
				let sphere_geometry = new THREE.SphereGeometry(shape.radius, shape.wSeg, shape.hSeg);
				mesh = new THREE.Mesh(sphere_geometry, currentMaterial);
				break;

			case CANNON.Shape.types.PLANE:
				let geometry = new THREE.PlaneGeometry(100, 100);
				mesh = new THREE.Object3D();
				submesh = new THREE.Object3D();
				let ground = new THREE.Mesh(geometry, currentMaterial);
				ground.scale = new THREE.Vector3(1000, 1000, 1000);
				submesh.add(ground);

				ground.castShadow = true;
				ground.receiveShadow = true;

				mesh.add(submesh);
				break;

			case CANNON.Shape.types.BOX:
				let box_geometry = new THREE.CubeGeometry(shape.halfExtents.x * 2,
						shape.halfExtents.y * 2,
						shape.halfExtents.z * 2);
				mesh = new THREE.Mesh(box_geometry, currentMaterial);
				mesh.castShadow = true;
				mesh.receiveShadow = true;
				break;

			case CANNON.Shape.types.COMPOUND:
				let o3d = new THREE.Object3D();
				for(let i = 0; i<shape.childShapes.length; i++){

					let subshape = shape.childShapes[i];
					let o = shape.childOffsets[i];
					let q = shape.childOrientations[i];

					submesh = _cannon.shape2mesh(subshape);
					submesh.position.set(o.x,o.y,o.z);
					submesh.quaternion.set(q.x,q.y,q.z,q.w);

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
			for (let i = 0; i < mesh.children.length; i++) {
				mesh.children[i].castShadow = true;
				mesh.children[i].receiveShadow = true;

				if (mesh.children[i]){
					for(var j = 0; j < mesh.children[i].length; j++) {
						mesh.children[i].children[j].castShadow = true;
						mesh.children[i].children[j].receiveShadow = true;
					}
				}
			}
		}

		return mesh;
	};
		
    showAABBs() {
		let self = this;

		let GeometryCache = function(createFunc) {
			let self = this, geo = null, geometries = [], gone = [];

			self.request = function() {
				if (geometries.length) {
					geo = geometries.pop();
				} else {
					geo = createFunc();
				}

				this.scene.add(geo);
				gone.push(geo);

				return geo;
			};

			self.restart = function() {
				while(gone.length) {
					geometries.push(gone.pop());
				}
			};

			self.hideCached = function() {
				for (let i = 0; i < geometries.length; i++) {
					this.scene.remove(geometries[i]);
				}
			}
		};

		let bboxGeometry = new THREE.CubeGeometry(1, 1, 1);

		let bboxMaterial = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			wireframe: true
		});

		let bboxMeshCache = new GeometryCache(function() {
			return new THREE.Mesh(bboxGeometry, bboxMaterial);
		});

		self.update = function() {
			bboxMeshCache.restart();

			for (let i = 0; i < this.bodies.length; i++) {
				let b = this.bodies[i];

				if (b.computeAABB) {
					if(b.aabbNeedsUpdate){
						b.computeAABB();
					}

					if (isFinite(b.aabbmax.x) &&
					    isFinite(b.aabbmax.y) &&
						isFinite(b.aabbmax.z) &&
						isFinite(b.aabbmin.x) &&
						isFinite(b.aabbmin.y) &&
						isFinite(b.aabbmin.z) &&
						b.aabbmax.x - b.aabbmin.x != 0 &&
						b.aabbmax.y - b.aabbmin.y != 0 &&
						b.aabbmax.z - b.aabbmin.z != 0) {
						let mesh = bboxMeshCache.request();

						mesh.scale.set(b.aabbmax.x - b.aabbmin.x,
							b.aabbmax.y - b.aabbmin.y,
							b.aabbmax.z - b.aabbmin.z);

						mesh.position.set((b.aabbmax.x + b.aabbmin.x) * 0.5,
						    (b.aabbmax.y + b.aabbmin.y) * 0.5,
							(b.aabbmax.z + b.aabbmin.z) * 0.5);
					}
				}
			}

			bboxMeshCache.hideCached();
		};
		
		self.intialize = function() {
			let updatePhysics = this.updatePhysics;

			this.updatePhysics = function() {
				updatePhysics();
				self.update();
			}
		};

		return self;
	};    
}