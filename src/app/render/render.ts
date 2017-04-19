import {InitData} from '../gl.initialise.data/data.initializer';

export class RenderManager {
    public data: any;

    constructor() {
        this.data = new InitData();
    }

    start() {
        this.data.initBuffer();
        this.data.gl.viewport(0, 0, this.data.gl.canvas.width, this.data.gl.canvas.height);
        this.data.gl.clearColor(0, 0, 0, 0);
        this.data.gl.clear(this.data.gl.COLOR_BUFFER_BIT);
        this.data.gl.useProgram(this.data.program);
    }

    bufferInit() {
        this.data.gl.enableVertexAttribArray(this.data.positionAttributeLocation);
        this.data.gl.bindBuffer(this.data.gl.ARRAY_BUFFER, this.data.positionBuffer);

        let size = 2;
        let type = this.data.gl.FLOAT;
        let normalize = false;
        let stride = 0;
        let offset = 0;

        this.data.gl.vertexAttribPointer(this.data.positionAttributeLocation, size, type, normalize, stride, offset)
    }

    run(){
        let primitiveType = this.data.gl.TRIANGLES;
        let offset = 0;
        let count = 3;

        this.data.gl.drawArrays(primitiveType, offset, count);
    }
}