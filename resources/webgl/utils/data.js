import {Program} from './program'
import {gl} from './webgl';
import {Light} from './light';

var worldV = require('./../src/shaders/world.vs');
var worldF = require('./../src/shaders/world.fs');
var billboardV = require('./../src/shaders/billboard.vs');
var depthV = require('./../src/shaders/depth.vs');
var depthF = require('./../src/shaders/depth.fs');


export class Data {
    constructor() {
        this.programs = {
            world: new Program(
				worldV, // vs 
                worldF, // fs
				[
					"Position", 
					"Texture", 
					"Normal"
				], // attributes
				[
					"PMatrix", 
					"MMatrix", 
					"VMatrix", 
					"Sampler", 
					"LightVMatrix", 
					"LightPMatrix", 
					"AmbientColor", 
					"DepthMap", 
					"Light"
				], // uniforms
				{
					pMatrix: 4,
					mMatrix: 4,
					vMatrix: 4
				} // matrices
			),
			sprites: new Program(
				billboardV, 
				worldF, 
				[
					"Position", 
					"Offset",
					"Texture",
					"Moving",
					"Flipped"
				],
				[
					"Counter", 
					"CamPos", 
					"PMatrix", 
					"MMatrix", 
					"VMatrix", 
					"Sampler", 
					"AmbientColor", 
					"DepthMap", 
					"Light"
				],
				{}
			),
			depth: new Program(
				depthV, 
				depthF,
				[
					"Position"
				],
				[
					"PMatrix", 
					"NMatrix", 
					"MMatrix", 
				],
				{
					pMatrix: 4,
					mMatrix: 4,
					vMatrix: 4
				}
			)
        };

        this.setLightUniforms(this.programs.world);
		this.setLightUniforms(this.programs.sprites);

        this.programs.background = [0, 0, 0, 1];
		this.programs.rotateSpeed = 0.01;
		this.programs.zoomFactor = 0.01;

		gl.enable(gl.DEPTH_TEST);

		gl.useProgram(this.programs.world.program);

        return this.programs;
    }


	setLightUniforms(prog) {
		// Uniform array of PointLight structs in GLSL
		prog.u.Light = [];
		for (let i = 0; i < 4; i++) {
			var l = prog.u.Light;
			l[i] = {};
			for (var key in new Light()) {
				l[i][key] = gl.getUniformLocation(prog.program, "uLight["+i+"]."+key);
			}
		}
	}

}