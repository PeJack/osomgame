// Platform - физические платформы, по которым перемещается игрок
class Platform {
    constructor(id, x, y, width, height) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = 'black';
        context.fill();
        context.lineWidth = 1;
        context.stroke();
    }
}