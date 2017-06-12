export class Water {
    constructor() {
        this.mesh = null;

        this.create();
    }

    create() {
        let geometry = new THREE.PlaneGeometry(15000, 15000, 128, 128);
        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
        geometry.dynamic = true;

        let i,j,il,jl;

        for (i = 0, il = geometry.vertices.length; i < il; i++ ) {
	        geometry.vertices[i].y = 35 * Math.sin(i / 2);
	    }
	
	    geometry.computeFaceNormals();
	    geometry.computeVertexNormals();

        let loader = new THREE.TextureLoader();

        let texture = loader.load("src/textures/water.jpg");
	    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(32,32);

        let material = new THREE.MeshPhongMaterial( 
            { 
              color: 0x00CCFF, 
			  map: texture,
			  transparent: true, 
			  opacity: 0.5, 
			  shininess: 10.0,
			  emissive: 0x555555,
			  specular: 0x000000,
			  depthWrite: false,
			  depthTest: true 
            }
        );

        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0,70,0);

        this.mesh = mesh;
    }
}