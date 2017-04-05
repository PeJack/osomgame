export class Player{
    constructor(id, pos, size, speed){
        this.id = id;
        this.pos = pos;
        this.size = size || 20;
        this.speed = speed || 4;
    }

    draw(context){
        context.beginPath();
        context.rect(this.pos[0], this.pos[1], this.size, this.size);
        context.fillStyle = 'yellow';
        context.fill();
        context.lineWidth = 7;
        context.strokeStyle = 'black';
        context.stroke();
        context.font = '30px Arial';
        context.fillStyle = 'black';
        context.fillText(this.id, this.pos[0] + this.size / 3, this.pos[1] + this.size / 2);
    }
}