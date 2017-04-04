// Player - игрок
class Player {
    constructor(id, pos, width, height, speed) {
        this.id = id;
        this.pos = pos;
        this.width = width || 20;
        this.height = height || 20;       
        this.speed = speed || 4;
        this.velX = 0;
        this.velY = 0;

        // Состояния игрока
        this.isMoved = false;
	    this.isJumping = false;
        this.isGrounded = false;
	    this.isAlive = true;
    }

    draw(context) {
        context.beginPath();
        context.rect(this.pos[0], this.pos[1], this.width, this.height);
        context.fillStyle = 'yellow';
        context.fill();
        context.lineWidth = 7;
        context.strokeStyle = 'black';
        context.stroke();
        context.font = '24px Arial';  
        context.fillStyle = 'black';  
        context.fillText(this.id, this.pos[0] - this.width/5, this.pos[1] - 10);        
    }

    update(backend) {
        backend.send('move', 'player', this);
    }

    collide(obj) {
        // получение векторов из позиций
        let vX = (this.pos[0] + (this.width / 2)) - (obj.pos[0] + (obj.width / 2)),
            vY = (this.pos[1] + (this.height / 2)) - (obj.pos[1] + (obj.height / 2)),
            hWidths = (this.width / 2) + (obj.width / 2),
            hHeights = (this.height / 2) + (obj.height / 2),
            colDir = null;

        if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
            // проверка с какой стороны происходит столкновение
            let oX = hWidths - Math.abs(vX),
                oY = hHeights - Math.abs(vY);
            if (oX >= oY) {
                if (vY > 0) {
                    colDir = "top";
                    this.pos[1] += oY;
                } else {
                    colDir = "bottom";
                    this.pos[1] -= oY;
                }
            } else {
                if (vX > 0) {
                    colDir = "left";
                    this.pos[0] += oX;
                } else {
                    colDir = "right";
                    this.pos[0] -= oX;
                }
            }
        }
        return colDir;
    }
}