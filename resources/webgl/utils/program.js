import {gl} from './webgl';
var glmat = require('./../vendor/gl-matrix');

export class Program {
    constructor(vs, fs, att, uni, mats) {
        this.glProgram = this.initShader(vs,fs);
		let p = {
			program: this.glProgram,
			a: {},
			u: {},
			m: {}
		};
		// Set attributes
		for (let i = 0; i < att.length; i++) 
			p.a[att[i]] = gl.getAttribLocation(this.glProgram, "a"+att[i]);

		// Set uniforms
		for (let i = 0; i < uni.length; i++) 
			p.u[uni[i]] = gl.getUniformLocation(this.glProgram, "u"+uni[i]);

		// Initialize matrices
		for (let prop in mats) {
			let size = mats[prop];
			let mat;
			switch(size) {
			case 2: mat = glmat.mat2; break;
			case 3: mat = glmat.mat3; break;
			case 4: mat = glmat.mat4; break;
			default: console.log("Invalid matrix size");
			}
			p.m[prop] = mat.create();
			mat.identity(p.m[prop]);
		};

        return p;
    }

    // Returns compiled shader
	getShader(type, text) {
	    let shader = gl.createShader(type);
		gl.shaderSource(shader, text);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			throw (type == gl.VERTEX_SHADER ? "Vertex" : "Fragment")
				+ " failed to compile:\n\n" 
				+ gl.getShaderInfoLog(shader);
		}

		return shader;
	}

    // Assigns shaders to program and returns the program
	initShader(vertexShaderText, fragmentShaderText) {
		let shaderProgram = gl.createProgram();
		gl.attachShader(shaderProgram, this.getShader(gl.VERTEX_SHADER, vertexShaderText));
		gl.attachShader(shaderProgram, this.getShader(gl.FRAGMENT_SHADER, fragmentShaderText));
		gl.linkProgram(shaderProgram);

		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) 
			throw new Error("Could not initialize shaders");

		return shaderProgram;
	}
}		
        


