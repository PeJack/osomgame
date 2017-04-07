// GameLoop - главный цикл игры

// TODO: 
// 1) переписать отрисовку игрока в цикле (player.update);
// 2) переписать хендлер управления (handleInput);
// 3) пофиксить баг с ускорением персонажа при присоединении нового игрока;

var canvas;
var context;
var player;
var input;

var players = [];
var messages = [];
var platforms = [];

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function draw() {
    context.fillStyle="#FFF";
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (player != undefined) {
        player.draw(context);
    }

    for (var i = 0; i < players.length; i++) {
        players[i].draw(context);
    }

    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw(context);
    }

}

function update() {
    handleInput();
    collisionCheck();
    player.update(backend);
}

function handleInput() {
    player.isMoved = false;

    if(document.activeElement === document.getElementById("chat-input")) {
        return;
    }

    if (input.isDown('DOWN') || input.isDown('s')) {
        player.isMoved = true;
        player.pos[1] += player.speed;
    }

    if (input.isDown('UP') || input.isDown('w')) {
        if (!player.isJumping && player.isGrounded) {
            player.isJumping = true;
            player.isGrounded = false;
            player.velY = -player.speed * 2;
        }
    }

    if (input.isDown('LEFT') || input.isDown('a')) {
        player.isMoved = true;        
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }

    if (input.isDown('RIGHT') || input.isDown('d')) {
        player.isMoved = true;       
        if (player.velX < player.speed) {
            player.velX++;
        }
    }

    player.velX *= parseFloat(settings.friction);
    player.velY += parseFloat(settings.gravity);
}

function collisionCheck() {
    player.isGrounded = false;

    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];

        var colDir = player.collide(platform);   
        if (colDir === "left" || colDir === "right") {
            player.velX = 0;
            player.isJumping = false;
        } else if (colDir === "bottom") {
            player.isGrounded = true;
            player.isJumping = false;
        } else if (colDir === "top") {
            player.velY *= -1;
        }   
    }

    if(player.isGrounded){
         player.velY = 0;
    }
    
    player.pos[0] += player.velX;
    player.pos[1] += player.velY;
}
