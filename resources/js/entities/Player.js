import Rx from 'rxjs/Rx';
import 'rxjs/operator/map';

// Player - игрок
export class Player {
    constructor(id, x, y, width, height, speed, dispatcher) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width || 20;
        this.height = height || 20;
        this.speed = speed || 4;
        this.velX = 0;
        this.velY = 0;
        this.dispatcher = dispatcher;

        // Состояния игрока
        this.isMoved = false;
        this.isJumping = false;
        this.isGrounded = false;
        this.isAlive = true;

        // Определение вектора движения
        this.vector = {x: 0, y: 0};
        this.getVector();

        // Счетчик для контролирования уменьшения длинны вектора
        this.intervalTime = 0;
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
        context.fillText(this.id, this.x - this.width / 5, this.y - 10);
    }

    getVector() {
        this.dispatcher.way.subscribe((way) => {
            let x1 = +way.right;
            let x2 = -way.left || 0;

            let y1 = +way.up;
            let y2 = -way.down || 0;

            let newVector = {x: x1 + x2, y: y1 + y2};

            for (let cord in this.vector) {
                if (this.vector.x > 10) {
                    this.vector.x = 10;
                } else if (this.vector.x < -10) {
                    this.vector.x = -10;
                } else if (this.vector.y > 2) {
                    this.vector.y = 2;
                } else if (this.vector.y < -2) {
                    this.vector.y = -2;
                }

                this.vector[cord] += newVector[cord];
            }
            console.log(this.vector);
            this.intervalTime = 10;
            this.downGradeTimeoutter()
        })
    }

    downGradeVector() {
        if (!this.vector.x) {
            this.vector.x = 0
        } else if (!this.vector.y) {
            this.vector.y = 0
        } else if (!this.vector.x && !this.vector.y) {
            return;
        }
        this.downGradeTimeoutter();
    }

    downGradeTimeoutter() {
        setInterval(() => {
            this.vector.x--;
            this.vector.y--;
            this.intervalTime--;
            console.log(this.intervalTime);
            this.checkInterval();
        }, 200)
    }

    checkInterval() {
        if (!this.intervalTime) {
            clearInterval(this.downGradeTimeoutter());
        }
    }

    animateWay() {
        console.log(this.dispatcher);
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