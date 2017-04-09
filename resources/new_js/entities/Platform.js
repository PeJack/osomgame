// Platform - физические платформы, по которым перемещается игрок
export class Platform {
    constructor(id, pos, width, height) {
        this.id = id;
        this.pos = pos;
        this.width = width;
        this.height = height;
    }

    draw(context) {
        context.beginPath();
        context.rect(this.pos[0], this.pos[1], this.width, this.height);
        context.fillStyle = 'black';
        context.fill();
        context.lineWidth = 1;
        context.stroke();
    }
}