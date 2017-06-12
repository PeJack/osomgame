import {canvas} from './../../utils';

var groundV = require('./../../src/shaders/ground.vs');
var groundF = require('./../../src/shaders/ground.fs');

export class Ground {
    constructor() {
        this.noise = 0;

        this.create();
    }

    create() {
        let noise = this.generateNoise();
        for(let x = 0; x < noise.length; x++) {
            for(let y = 0; y < noise[x].length; y++) {
                let color = Math.round((255 * noise[x][y]));

                if (color < 0) color = 0;
                let context = canvas.getContext("2d");
                context.fillStyle = "rgb("+color+", "+color+", "+color+")";
                context.fillRect(x,y,1,1);
            }
        }

        this.noise = noise;

        let loader = new THREE.TextureLoader();

        let bumpTexture = loader.load(canvas.toDataURL());
        bumpTexture.wrapS = bumpTexture.wrapT = THREE.RepeatWrapping;
        let bumpScale = 200.0;

        let grassTexture = loader.load("src/textures/grass.png");
	    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;

        let rockTexture = loader.load("src/textures/rock.jpg");
	    rockTexture.wrapS = rockTexture.wrapT = THREE.RepeatWrapping; 

        let uniforms = {
            bumpTexture:    {  type: "t", value: bumpTexture  },
            bumpScale:      {  type: "f", value: bumpScale    },
            grassTexture:   {  type: "t", value: grassTexture },
            rockTexture:    {  type: "t", value: rockTexture  },
        };

        let material = new THREE.ShaderMaterial(
            {
                uniforms: uniforms,
                vertexShader: groundV,
                fragmentShader: groundF,
                transparent: true
            }
        );

        let geometry = new THREE.PlaneGeometry(5000, 5000, 50, 50);
        let plane = new THREE.Mesh(geometry, material);

        plane.rotation.x = -Math.PI / 2;
        this.mesh = plane;
    }

    generateNoise() {
        let noiseArr = [];

        for(let i = 0; i <= 15; i++) {
            noiseArr[i] = [];

            for(let j = 0; j <= 15; j++) {
                let height = Math.random();

                if(i == 0 || j == 0 || i == 5 || j == 5 || j == 10 || i == 10)
                    height = -0.15;

                noiseArr[i][j] = height;
            }
        }
        return(this.interpolate(noiseArr));
    }

    interpolate(points) {
        let noiseArr = [];
        let x = 0;
        let y = 0;
	    let p = 30;

        for(let i = 0; i < 300; i++) {
            if(i != 0 && i % p == 0)
                x++;

            noiseArr[i] = [];
            for(let j = 0; j < 300; j++) {
                if(j != 0 && j % p == 0)
                    y++;

                let mu_x = (i%p) / p;
                let mu_2 = (1 - Math.cos(mu_x * Math.PI)) / 2;

                let int_x1 = points[x][y] * (1 - mu_2) + points[x+1][y] * mu_2;
                let int_x2 = points[x][y+1] * (1 - mu_2) + points[x+1][y+1] * mu_2;

                let mu_y = (j%p) / p;
                mu_2 = (1 - Math.cos(mu_y * Math.PI)) / 2;
                let int_y = int_x1 * (1 - mu_2) + int_x2 * mu_2;

                noiseArr[i][j] = int_y;
            }
            y = 0;
        }        
        return(noiseArr);
    }
}