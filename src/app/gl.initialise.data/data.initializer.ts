import {createShader} from './shaders.creator';
import {createProgram} from './programm.creator';
import {resize} from './canvas.normalizer';

import * as fromSource from './shaders.source';
import * as bufferData from './buffer.data';

export class InitData {
    //consts
    private canvas: any;
    private gl: any;
    private vertexShaderSource: string;
    private fragmentShaderSource: string;

    //functions
    public vertexShader: any;
    public fragmentShader: any;
    public program: any;
    public positionAttributeLocation: any;

    public positionBuffer : any;

    constructor() {
        this.canvas = document.getElementById('c');
        this.gl = this.canvas.getContext('webgl');

        this.vertexShaderSource = fromSource.vertexShaderSource;
        this.fragmentShaderSource = fromSource.fragmentShaderSource;

        this.vertexShader = createShader(this.gl, this.gl.VERTEX_SHADER, this.vertexShaderSource);
        this.fragmentShader = createShader(this.gl, this.gl.FRAGMENT_SHADER, this.fragmentShaderSource);
        this.program = createProgram(this.gl, this.vertexShader, this.fragmentShader);
        this.positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_location");
        console.log(this.positionAttributeLocation);

        this.positionBuffer = this.gl.createBuffer();
        resize(this.gl);
    }

    initBuffer(buffer = this.positionBuffer, gl = this.gl) {
        gl.bindBuffer(gl.ARRAY_BUFFER ,buffer);
        gl.bufferData(gl.ARRAY_BUFFER, bufferData.getPositions(bufferData.positions), gl.STATIC_DRAW);
    }
}