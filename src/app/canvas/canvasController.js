import {Canvas} from "canvas";

export class CanvasController {
    constructor() {
        this.canvas = new Canvas();
        this.ctx = this.canvas.ctx;
    }

    init() {
        let w = this.canvas.width;
        let h = this.canvas.height;

        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(0, 0, w, h);
    }

}