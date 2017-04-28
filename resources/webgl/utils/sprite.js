import {gl} from './webgl';

var glmat = require('./../vendor/gl-matrix');

class Sprite {
    constructor(pos) {
        this.pos = pos ? pos : [0,0,0];
	    this.theta = 0;
	    this.vel = [0,0,0];
	    this.maxSpeed = 0.1;
	    this.moving = 0;
	    this.flipped = 0.0;
    }

    moveTo(pos) {
        this.pos = pos;
        this.moving = 0;
    }

    moveToward(env, pos) {
        let dx = pos[0] - this.pos[0];
        let dy = pos[1] - this.pos[1];

        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1)
            return;

        this.theta = Math.atan2(dy, dx);
        this.limitTheta();
        this.flipped = (this.theta < 0.5 * Math.PI || this.theta > 1.5 * Math.PI) ? 0 : 1
        this.moveForward(env);    
    }

    limitTheta() {
        if(this.theta < 0) {
            this.theta += 2 * Math.PI;
        } else if (this.theta > 2 * Math.PI) {
            this.theta -= 2 * Math.PI;
        }
    }

    turnAndMove(env, amount) {
        this.theta += amount;
        this.moveForward(env);
        this.theta -= amount;
        this.limitTheta();
    }

    moveForward(env) {
        this.vel[0] = this.maxSpeed * Math.cos(this.theta);
        this.vel[1] = this.maxSpeed * Math.sin(this.theta);
        this.checkCollision(env);
        
        for(let i = 0; i < 3; i++) {
            this.pos[i] += this.vel[i];
        }
        this.moving = 1;
    } 

    checkCollision(env) {
        for(let i = 0; i < 3; i++) {
            if(this.vel[i] == 0) {
                continue;
            }

            let padding = (this.vel[i] > 0) ? 0.5 : -0.5;

            let testPos = this.pos.slice(0);
            if(env.collision(testPos)) {
                this.vel[i] = 0;
            }
        }
    }
}

export class Sprites {
    constructor(textureAtlas) {
	    this.textureAtlas = textureAtlas;
	    this.sprites = [];
	    this.vertices = [];
	    this.offsets = [];
	    this.texCoords = [];
	    this.indices = [];
	    this.moving = [];
	    this.flipped = [];
	    this.baseIndex = 0;
	    this.vertexObject = gl.createBuffer();
	    this.texCoordObject = gl.createBuffer();
	    this.offsetObject = gl.createBuffer();
	    this.indexObject = gl.createBuffer();
	    this.movingObject = gl.createBuffer();
	    this.flippedObject = gl.createBuffer();        
    }

    numVertices() {
        return this.indices.length;
    }

    update() {
        for(let i = 0; i < this.sprites.length; i++) {
            this.moveSprite(i, this.sprites[i].pos);
            this.flipSprite(i, this.sprites[i].flipped);
        }

		// Initialize buffer data
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexObject);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordObject);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texCoords), gl.STATIC_DRAW);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.offsetObject);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.offsets), gl.STATIC_DRAW);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.movingObject);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.moving), gl.STATIC_DRAW);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.flippedObject);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.flipped), gl.STATIC_DRAW);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexObject);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

		gl.bindBuffer(gl.ARRAY_BUFFER, null);

		for (var i=0; i<this.sprites.length; i++) {
			this.sprites[i].moving = 0;
		}

    }

    addSprite(tileNum, pos) {
		/* 1--0
		   |  |
		   2--3 */
		let o = [
			[ 0.5, 0.0, 1.0],
			[-0.5, 0.0, 1.0],
			[-0.5, 0.0, 0.0],
			[ 0.5, 0.0, 0.0]
		];

		this.sprites.push(new Sprite(pos));

		for (let i=0; i<4; i++) {
			this.vertices = this.vertices.concat(pos);
			this.offsets = this.offsets.concat(o[i]);
			this.moving.push(0);
			this.flipped.push(0);
		}

		var st = this.textureAtlas.getST(tileNum);

		this.texCoords = this.texCoords.concat(
			st[2], st[1], 
			st[0], st[1], 
			st[0], st[3],
			st[2], st[3]
		);

		this.indices.push(
			this.baseIndex, this.baseIndex+1, this.baseIndex+2,
			this.baseIndex, this.baseIndex+2, this.baseIndex+3
		);
		this.baseIndex += 4;        
    }

    flipSprite(spriteId, flipped) {
        for(let i = 0; i < 4; i++) {
            this.flipped[spriteId * 4 + i] = this.sprites[spriteId].flipped;
        }
    }

    moveSprite(spriteId, pos) {
		for (let i=0; i<4; i++) {
			this.moving[spriteId*4+i] = this.sprites[spriteId].moving;
			for (let j=0; j<3; j++) {
				this.vertices[spriteId*12+i*3+j] = pos[j];
            }
		}
	}

	offsetSprite(spriteId, d) {
		for (let i=0; i<4; i++)  {
			for (let j=0; j<3; j++) {
				this.vertices[spriteId*4+i*3+j] += d[j];
            }
        }
	}
}