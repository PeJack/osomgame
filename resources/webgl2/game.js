import {Player} from './entities/player';
import {Ground} from './renderer/map/ground';
import {Light} from './renderer/light';
import {Water} from './renderer/water';
import {ModelLoader} from './loaders/model';

const clock = new THREE.Clock();
var frameDelta = 0;

export class Game {
    constructor() {	
		this.requestAnimationFramePID = null;
		
		this.cameraFov = 90;
		this.cameraNear = 0.1;
		this.cameraFar = 1000;

		this.antialias = true;
		this.clearColor = 0x000000;

		this.modelLoader = new ModelLoader();
	}

	preInit() {
		this.addModels();

		this.preInit = () => {
			let x = this.modelLoader.percentLoaded();
    		console.log("Загружено: " + x + "%");

    		if(x < 100) {
    		    window.setTimeout(this.loadGame, 100);
    		    return;
    		}
		}
		
	}

	init() {
		this.container = document.getElementById('container');
		
		this.renderer = new THREE.WebGLRenderer({antialias: this.antialias});
		this.renderer.setClearColor(this.clearColor, 1);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		
		this.container.appendChild(renderer.domElement);

		this.camera = new THREE.PerspectiveCamera(this.cameraFov, window.innerWidth / window.innerHeight, this.cameraNear, this.cameraFar);

		this.scene = new THREE.Scene();
	}



	loadGame(){ 
		if(this.requestAnimationFramePID != nill) {
			cancelAnimationFrame(this.requestAnimationFramePID);
		}

		this.gameLoop();
	}

	gameLoop() {
		var self = this;

		this.render();
		this.update();

		this.requestAnimationFramePID = requestAnimationFrame(function() {
			self.gameLoop();
		});
	}



		// this.addModels();
		// this.loadGame = () => {
		// 	let x = modelLoader.percentLoaded();
    	// 	console.log("Загружено: " + x + "%");

    	// 	if(x < 100) {
    	// 	    window.setTimeout(this.loadGame, 100);
    	// 	    return;
    	// 	}
			
		// 	// camera.up.set(0, 0, 1);

		// 	scene.fog = new THREE.FogExp2(0xaabbbb, 0.00025);
		// 	renderer.setSize(window.innerWidth, window.innerHeight);
		// 	renderer.setClearColor(0x000000, 1);
		// 	renderer.shadowMap.enabled = true;

		// 	physicsEngine.initialize();
		// 	physicsEngine.playerPhysicsMaterial = new CANNON.Material('playerMaterial');			

		// 	this.player = new Player(renderer, modelLoader, physicsEngine);	   
		// 	this.player.spawn({
		// 		scale: 1,
		// 		health: 100,
		// 		px: 0,
		// 		py:	100,
		// 		pz: 0,
		// 	});	

		// 	container.innerHTML = '';
   		// 	container.appendChild(renderer.domElement);

		// 	this.ground = new Ground();	
		// 	this.light = new Light();
		// 	this.water = new Water();

	    // 	renderer.setClearColor(window.game.helpers.rgbToHex(this.light.skycolor-150, this.light.skycolor-30, this.light.skycolor), 1); 

		// 	scene.add(camera);
		// 	scene.add(this.ground.mesh);
		// 	scene.add(this.light.lighttarget);
		// 	scene.add(this.light.spotlight);
		// 	scene.add(this.light.hemilight);
		// 	scene.add(this.water.mesh);

		// 	scene.add(this.player.mesh);

		// 	this.gameLoop = () => {
		// 		window.requestAnimFrame(this.gameLoop);
		// 		this.render();
		// 		this.update();
		// 	};

		// 	this.gameLoop();
		// };

		// this.loadGame();

	addModels() {
		this.modelLoader.addJSON({
			obj: 'src/models/player/quandtum_grapple_girl_1_0.json',
		    name: "player"
		});
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}

	update() {
		let delta = clock.getDelta();
		let elapsed = clock.getElapsedTime();

		this.player.draw(elapsed, delta);
	}
}