export class Canvas {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.body = document.querySelector("body");
    }

    canvasCreator() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.canvas.style.cssText = "border:1px solid #000000;";

        this.ctx = this.canvas.getContext("2d");
        this.body.appendChild(canvas)
    }
}