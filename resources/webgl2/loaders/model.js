export class ModelLoader {
    constructor() {
        this.models = [];
        this.loaded = 0;
        this.total = 0;
    }

    percentLoaded() {
        return Math.round((this.loaded/this.total)*100);
    }

    getModel(name) {
        return this.models[name]
    };

    addJSON(args) {
        this.models[args.name] = new THREE.Object3D();
        this.models[args.name].args = args;
        this.total++;

        let loader = new THREE.JSONLoader();
        loader.load(args.obj, this.loadJSON.bind(this, args.name));
    };

    loadJSON(name, geometry, materials) {
        //let faceMaterial = new THREE.MeshFaceMaterial(materials);
        this.createCannonGeometry(geometry, 1);

        let halfExtents = this.createCannonHalfExtents(geometry);
        let mesh = new THREE.SkinnedMesh(geometry, materials);

        let mixer = new THREE.AnimationMixer(geometry);
        let animations = {};

        geometry.animations.map(function(anim) {
            animations[anim.name] = mixer.clipAction(anim);
        })

        this.models[name].mesh = mesh;
        this.models[name].halfExtents = halfExtents;
        this.models[name].animations = animations;

        this.loaded++;
    };

    createCannonGeometry(geometry, scale) {
        let translateX, translateY, translateZ;

        geometry.computeBoundingBox();

		translateX = -((geometry.boundingBox.getSize().x / 2) + geometry.boundingBox.min.x);
		translateY = -((geometry.boundingBox.getSize().y / 2) + geometry.boundingBox.min.y);
		translateZ = -((geometry.boundingBox.getSize().z / 2) + geometry.boundingBox.min.z);

		//geometry.applyMatrix(new THREE.Matrix4().makeTranslation(translateX, translateY, translateZ));
		//geometry.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2));
		geometry.applyMatrix(new THREE.Matrix4().makeScale(scale, scale, scale));
    };

    createCannonHalfExtents(geometry) {
        geometry.computeBoundingBox();

        return new CANNON.Vec3(
            (geometry.boundingBox.max.x - geometry.boundingBox.min.x) * 0.5,
            (geometry.boundingBox.max.y - geometry.boundingBox.min.y) * 0.5, 
            (geometry.boundingBox.max.z - geometry.boundingBox.min.z) * 0.5                       
        );
    }
}