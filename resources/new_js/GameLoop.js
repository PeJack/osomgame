// GameLoop - главный цикл игры

// TODO: 
// 1) переписать отрисовку игрока в цикле (player.update);
// 2) переписать хендлер управления (handleInput);
// 3) пофиксить баг с ускорением персонажа при присоединении нового игрока;
export class GameLoop {
    constructor(canvas, context, input, backend, db, settings) {
        this.backend = backend;
        this.canvas = canvas;
        this.context = context;
        this.input = input;
        this.settings = settings;

        this.db = db;

        this.draw = () => {
            this.context.fillStyle = "#FFF";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

            if (this.db.player) {
                this.db.player.draw(this.context);
            }

            this.db.players.forEach((player) => {
                player.draw(this.context);
            });

            this.db.platforms.forEach((platform) => {
                platform.draw(this.context);
            });
        };

        this.update = () => {
            this.handleInput();
            this.collisionCheck();
            this.db.player.update(this.backend);
        };

        this.gameLoop = () => {

            this.update();
            this.draw();
            requestAnimationFrame(this.gameLoop);
        };

        this.handleInput = () => {
            this.db.player.isMoved = false;

            if (document.activeElement === document.getElementById("chat-input")) {
                return;
            }

            if (this.input.isDown('DOWN') || this.input.isDown('s')) {
                this.db.player.isMoved = true;
                this.db.player.pos[1] += this.db.player.speed;
            }

            if (this.input.isDown('UP') || this.input.isDown('w')) {
                if (!this.db.player.isJumping && this.db.player.isGrounded) {
                    this.db.player.isJumping = true;
                    this.db.player.isGrounded = false;
                    this.db.player.velY = -this.db.player.speed * 2;
                }
            }

            if (this.input.isDown('LEFT') || this.input.isDown('a')) {
                this.db.player.isMoved = true;
                if (this.db.player.velX > -this.db.player.speed) {
                    this.db.player.velX--;
                }
            }

            if (this.input.isDown('RIGHT') || this.input.isDown('d')) {
                this.db.player.isMoved = true;
                if (this.db.player.velX < this.db.player.speed) {
                    this.db.player.velX++;
                }
            }

            this.db.player.velX *= parseFloat(this.settings.friction);
            this.db.player.velY += parseFloat(this.settings.gravity);
        };

        this.collisionCheck = () => {
            this.db.player.isGrounded = false;

            for (let i = 0; i < this.db.platforms.length; i++) {
                let platform = this.db.platforms[i];

                let colDir = this.db.player.collide(platform);
                if (colDir === "left" || colDir === "right") {
                    this.db.player.velX = 0;
                    this.db.player.isJumping = false;
                } else if (colDir === "bottom") {
                    this.db.player.isGrounded = true;
                    this.db.player.isJumping = false;
                } else if (colDir === "top") {
                    this.db.player.velY *= -1;
                }
            }

            if (this.db.player.isGrounded) {
                this.db.player.velY = 0;
            }

            this.db.player.pos[0] += this.db.player.velX;
            this.db.player.pos[1] += this.db.player.velY;
        };

        this.gameLoop();
    }
}
