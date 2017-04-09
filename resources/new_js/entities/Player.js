// Player - игрок
export class Player {
    constructor(id, x, y, width, height, speed) {
        this.id = id;
        this.x = x;
        this.y = y;
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


        context.rect(this.x, this.y, this.width, this.height);

        context.fillStyle = 'yellow';
        context.fill();

        context.lineWidth = 7;
        context.strokeStyle = 'black';
        context.stroke();

        context.font = '24px Arial';  
        context.fillStyle = 'black';  
        context.fillText(this.id, this.x - this.width/5, this.y - 10);        
    }

    update(backend) {
        backend.send('move', 'player', this);
    }

    collide(obj) {
        // получение векторов из позиций
        let vX = (this.x + (this.width / 2)) - (obj.x + (obj.width / 2)),
            vY = (this.y + (this.height / 2)) - (obj.y + (obj.height / 2)),
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
                    this.y += oY;
                } else {
                    colDir = "bottom";
                    this.y -= oY;
                }
            } else {
                if (vX > 0) {
                    colDir = "left";
                    this.x += oX;
                } else {
                    colDir = "right";
                    this.x -= oX;
                }
            }
        }
        return colDir;
    }
}