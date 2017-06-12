import {TextureAtlas} from './utils/texture';
import {Ground} from './renderer/map/ground';
import {Level} from './renderer/map/level';
import {Camera} from './renderer/camera';
import {Sprites} from './utils/sprite';
import {gl} from './utils/webgl';
import {DungeonConverter} from './renderer/map/dungeon-converter';
import {Input} from './ui/input';
import {Data} from './utils/data';
import {canvas} from './utils/canvas';
import {Light} from './utils/light';

var glmat = require('./vendor/gl-matrix');

export class Game {
    constructor() {
		this.counter = 0;
		this.loading = document.getElementById("loading");
        this.groundTexture = new TextureAtlas("src/img/ldfaithful.png", 8);
		this.characterTexture = new TextureAtlas("src/img/oryx.png", 8);

		this.loadGame = () => {
			if (!this.groundTexture.texture) {		
				window.setTimeout(this.loadGame, 100);
				return;
			}

			if (!this.characterTexture.texture) {			
				window.setTimeout(this.loadGame, 100);
				return;
			}

			this.ground = new Ground(this.groundTexture);
			this.level = new Level([0.1,0.1,0.0],[2,3,3,3,3,3],[2,3],[40,40],[4,4],[5,5]);

			this.camera = new Camera();

			this.sprites = new Sprites(this.characterTexture);

			this.sprites.addSprite(Math.floor(Math.random()*256), [0,0,0]);

			this.player = this.sprites.sprites[0];

			this.sprites.update();

			this.input = new Input();
			this.data = new Data();

			this.lights = [];
			this.lights[0] = new Light([1.0, 0.5, 0.0], [0,5,1], [0.3, 0.1, 0.05]);		

			this.goToLevel(0);

			this.gameLoop = () => {
				window.requestAnimFrame(this.gameLoop);
				this.display();
				this.input.update();
			}

			this.gameLoop();
		}

		this.loadGame();
    }



	 goToLevel(num) {
		this.loading.innerHTML = "Загрузка, пожалуйста, подождите...";

		this.dungeonObj = new DungeonConverter(this.level);

		this.lights[1] = new Light(
			[1.0, 0.5, 0.0],
			this.centerXY(this.dungeonObj.upstairs), 
			[0.2, 0.1, 0.05]
		);

		this.ground.generate(this.dungeonObj.cubes);

		this.player.pos = this.centerXY(this.dungeonObj.upstairs);

		this.sprites.update();
		this.loading.innerHTML = "Уровень " + num + 1;
	}

	centerXY(pos) {
		return [pos[0]+0.5, pos[1]+0.5, pos[2]];
	}

	renderWorld() {
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.BACK);
		gl.useProgram(this.data.world.program);
		this.data.world.m.vMatrix = this.camera.matrix;
		
		gl.uniformMatrix4fv(this.data.world.u.MMatrix, false, this.data.world.m.mMatrix);
		gl.uniformMatrix4fv(this.data.world.u.VMatrix, false, this.data.world.m.vMatrix);
		gl.uniformMatrix4fv(this.data.world.u.PMatrix, false, this.data.world.m.pMatrix);
		gl.uniform3fv(this.data.world.u.AmbientColor, this.level.ambient);
		
		this.updateLights(this.data.world);
		
		// Bind buffers
		this.attributesSetup(this.data.world.a.Position, this.ground.vertexObject, 3);
		this.attributesSetup(this.data.world.a.Texture, this.ground.texCoordObject, 2);
		this.attributesSetup(this.data.world.a.Normal, this.ground.normalObject, 3);
		
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.ground.textureAtlas.texture);
		gl.uniform1i(this.data.world.u.Sampler, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ground.indexObject);
		gl.drawElements(gl.TRIANGLES, this.ground.numVertices(), gl.UNSIGNED_SHORT, 0);
	}

	updateLights(program) {
		for (var i=0; i < this.lights.length; i++) {
			this.lights[i].update();
			gl.uniform1f(program.u.Light[i].enabled, this.lights[i].enabled);
			gl.uniform3fv(program.u.Light[i].attenuation, this.lights[i].attenuation);
			gl.uniform3fv(program.u.Light[i].color, this.lights[i].color);
			gl.uniform3fv(program.u.Light[i].position, this.lights[i].position);
		}
	}

	handleInputs() {
		var inputMask = 0;

		if (this.input.isDown(87)) inputMask += 1; // W
		if (this.input.isDown(65)) inputMask += 2; // A
		if (this.input.isDown(83)) inputMask += 4; // S
		if (this.input.isDown(68)) inputMask += 8; // D

		switch(inputMask) {
		case  1: this.player.turnAndMove(this.ground, 0); break;
		case  2: this.player.flipped = 1; this.player.turnAndMove(this.ground, Math.PI/2); break;
		case  3: this.player.flipped = 1; this.player.turnAndMove(this.ground, Math.PI/4); break;
		case  4: this.player.turnAndMove(this.ground, Math.PI); break;
		case  6: this.player.flipped = 1; this.player.turnAndMove(this.ground, 3/4*Math.PI); break;
		case  8: this.player.flipped = 0; this.player.turnAndMove(this.ground,-Math.PI/2); break;
		case  9: this.player.flipped = 0; this.player.turnAndMove(this.ground,-Math.PI/4); break;
		case 12: this.player.flipped = 0; this.player.turnAndMove(this.ground, 5/4*Math.PI); break;
		}

		if (this.input.isDown("RIGHT_MOUSE")) {
			var angleChange = [
				-this.input.getMousePosition().y * this.data.rotateSpeed, 
				0, 
				this.input.getMousePosition().x * this.data.rotateSpeed
			];
			this.camera.changeAngle(angleChange);
		}

		if (this.input.getMouseScroll()) {
			this.camera.changeDistance(this.input.getMouseScroll());
		}
	}

	attributesSetup(attr, object, size, type) {
		if (!type)
			type = gl.FLOAT;
		gl.enableVertexAttribArray(attr);
		gl.bindBuffer(gl.ARRAY_BUFFER, object);
		gl.vertexAttribPointer(attr, size, type, false, 0, 0);
	}

	renderSprites() {
		gl.disable(gl.CULL_FACE);
		this.counter++;

		gl.useProgram(this.data.sprites.program);
		this.data.world.m.vMatrix = this.camera.matrix;

		// Orientation of character about camera
		this.sprites.sprites[0].theta = this.camera.theta[2];
		this.sprites.update();

		gl.uniformMatrix4fv(this.data.sprites.u.MMatrix, false, this.data.world.m.mMatrix);
		gl.uniformMatrix4fv(this.data.sprites.u.VMatrix, false, this.data.world.m.vMatrix);
		gl.uniformMatrix4fv(this.data.sprites.u.PMatrix, false, this.data.world.m.pMatrix);

		gl.uniform1f(this.data.sprites.u.Counter, this.counter);
		gl.uniform3fv(this.data.sprites.u.AmbientColor, this.level.ambient);
		gl.uniform3fv(this.data.sprites.u.CamPos, this.camera.pos);

		this.updateLights(this.data.sprites);

		// Bind buffers
		this.attributesSetup(this.data.sprites.a.Position, this.sprites.vertexObject, 3);
		this.attributesSetup(this.data.sprites.a.Texture, this.sprites.texCoordObject, 2);
		this.attributesSetup(this.data.sprites.a.Offset, this.sprites.offsetObject, 3);
		this.attributesSetup(this.data.sprites.a.Moving, this.sprites.movingObject, 1);
		this.attributesSetup(this.data.sprites.a.Flipped, this.sprites.flippedObject, 1);
		
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.sprites.textureAtlas.texture);
		gl.uniform1i(this.data.sprites.u.Sampler, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.sprites.indexObject);
		gl.drawElements(gl.TRIANGLES, this.sprites.numVertices(), gl.UNSIGNED_SHORT, 0);
	}

	display() {
		gl.clearColor.apply(gl, this.data.background);
		gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

		gl.viewport(0, 0, canvas.width, canvas.height);
		glmat.mat4.perspective(this.data.world.m.pMatrix, 45.0, canvas.width/canvas.height, 0.1, 100.0);

		this.handleInputs();

		this.lights[0].position = this.player.pos.slice(0);
		this.lights[0].position[2] += 2;

		this.camera.moveCenter(this.player.pos, [0.0, 0.0, 0.5]);
		this.camera.updateMatrix(this.ground.cubes);

		this.renderWorld();
		this.renderSprites();
	}

}

