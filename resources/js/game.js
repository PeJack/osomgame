var canvas;
var context;
var player;

var players = [];
var messages = [];

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
}

function update() {
    handleInput();
}

function handleInput() {
    var moved = false;

    if(document.activeElement === document.getElementById("chat-input")) {
        return;
    }

    if (input.isDown('DOWN') || input.isDown('s')) {
        moved = true;
        player.pos[1] += player.speed;
    }

    if (input.isDown('UP') || input.isDown('w')) {
        moved = true;
        player.pos[1] -= player.speed;
    }

    if (input.isDown('LEFT') || input.isDown('a')) {
        moved = true;
        player.pos[0] -= player.speed;
    }

    if (input.isDown('RIGHT') || input.isDown('d')) {
        moved = true;
        player.pos[0] += player.speed;
    }

    if (moved) {
        backend.send('move', 'player', player);
    }
}

function Player(id, pos, size, speed) {
    this.id = id;
    this.pos = pos;
    this.size = size || 20;
    this.speed = speed || 4;
}

Player.prototype.draw = function (context) {
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
};

function Message(id, text, ownerId, createdAt) {
    this.id = id;
    this.text = text;
    this.ownerId = ownerId;
    this.createdAt = createdAt;   
}
