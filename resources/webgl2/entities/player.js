import {camera} from './../utils';

export class Player {
    constructor(renderer, modelLoader, physicsEngine) {
        let self = this;

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
        this.rigidBody = new CANNON.RigidBody(
            this.mass, 
            this.shape, 
            this.physicsEngine.createPhysicsMaterial(this.physicsEngine.playerPhysicsMaterial)
        );
        this.rigidBody.position.set(0, 0, 50);
        this.mesh = this.physicsEngine.addVisual(this.rigidBody, null, this.model.mesh);

        this.orientationConstraint = new CANNON.HingeConstraint(
            this.rigidBody, 
            new CANNON.Vec3(0, 0, 0),
            new CANNON.Vec3(0, 0, 1),
            this.rigidBody,
            new CANNON.Vec3(0, 0, 1),
            new CANNON.Vec3(0, 0, 1),                        
        );

        this.physicsEngine.world.addConstraint(this.orientationConstraint);

        this.rigidBody.postStep = function() {
            this.rigidBody.angularVelocity.z = 0;
            this.setOrientation();
        };

        this.rigidBody.addEventListener('collide', function(e) {
            if(!this.isGrounded) {
                this.isGrounded = (new CANNON.Ray(this.mesh.position, new CANNON.Vec3(0, 0, -1)).intersectBody(e.contact.bi).length > 0);
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

        document.addEventListener('keyup', (e) => self.onKeyUp(e), false);
		document.addEventListener('keydown', (e) => self.onKeyDown(e), false);
	    document.addEventListener('mousemove', (e) => self.onMouseMove(e), false);
	    document.addEventListener('mouseup', (e) => self.onMouseUp(e), false);
	    document.addEventListener('mousedown', (e) => self.onMouseDown(e), false);    
    };

    setAnimation(type) {
        if(type != this.animType) {
            if(this.animations[this.animType])
                this.animations[this.animType].pause();

            this.animType = type;
            this.animations[type].play();
        }
    };

    setCamera() {
        this.mesh.add(camera);

        let x = this.mesh.position.x;
        let y = this.mesh.position.y;
        let z = this.mesh.position.z;

        camera.position.set(x, y + 60, z - 100);
        camera.rotation.set(0, 0, -Math.PI);
        camera.rotation.x = Math.min(Math.PI+1, Math.max(Math.PI, camera.rotation.x));
    };

    updateCamera() {
        let camCoordinates = window.game.helpers.polarToCartesian(this.cameraOffsetH, this.rotationRadians.z);        
        
        let x = this.mesh.position.x;
        let y = this.mesh.position.y + 60;
        let z = this.mesh.position.z + this.cameraOffsetV;
        
        camera.position.set(x, y, z);  
        camera.lookAt(this.mesh.position);
    };

    updateOrientation() {
        this.rotationRadians = new THREE.Euler().setFromQuaternion(this.rigidBody.quaternion);

        this.rotationAngleX = Math.round(window.game.helpers.radToDeg(this.rotationRadians.x));
        this.rotationAngleY = Math.round(window.game.helpers.radToDeg(this.rotationRadians.y));

        if ((this.physicsEngine.getCollisions(this.rigidBody.index) &&
            ((this.rotationAngleX >= 90) || 
                (this.rotationAngleX <= -90) ||
                (this.rotationAngleY >= 90) ||
                (this.rotationAngleY <= -90)))
            )
        {
            this.rigidBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), this.rotationRadians.z);
        } 
    };

    draw(elapsed, delta) {
        this.handleKeys(elapsed, delta);
        this.updateOrientation();
        this.updateCamera();
    };

    spawn(args) {
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
    };


    handleKeys(elapsed, delta) {
        let moveDistance = 200 * delta;

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
    };

    onKeyDown(event) {
		this.currentlyPressedKeys[event.keyCode] = true;
	};

	onKeyUp(event) {
		this.currentlyPressedKeys[event.keyCode] = false;
	};

	onMouseDown(event) {
	    event.preventDefault();

	    if (event.button == this.mouseButtons.LEFT) { 
	    	this.isMouseDown = true;
	    }
	};

	onMouseMove(event) {
        // event.preventDefault();
        let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        
        let	x = movementX * 0.001;
        let	y = movementY * 0.001;
        
        let rotateAngle = (Math.PI / 1.5) * x;
        this.physicsEngine.rotateOnAxis(this.rigidBody, new CANNON.Vec3(0, 1, 0), -rotateAngle)
   
        this.mesh.rotateOnAxis(new THREE.Vector3(0,1,0), -rotateAngle);

        camera.rotation.y += y;
        // camera.rotation.x = Math.min(Math.PI+1, Math.max(Math.PI, camera.rotation.x ));
	};

	onMouseUp(event) {
	    this.isMouseDown = false;
	};
}