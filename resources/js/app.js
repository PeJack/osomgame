var ws = null;
var wsurl = "ws://127.0.0.1:8080/ws";
var backend = undefined;
var settings;

window.onload = function() {

    ws = new WebSocket(wsurl);

    backend = new Backend(ws);

    backend.register("getSettings", function(resp) {
        settings = resp.Settings;
        for(var k in resp.Platforms) {
            p = resp.Platforms[k];
            platforms.push(new Platform(p.Id, p.Pos, p.Width, p.Height))
        }

        init();
    });

    backend.register("register", function(resp) {
        var p = resp.Player;

        if (player == undefined) {
            player = new Player(p.Id, p.Pos, p.Width, p.Height, p.Speed);
            input = new Input;
        }

        for(var k in resp.Players) {
            p = resp.Players[k];

            if(p.Id != player.id) {
                players.push(new Player(p.Id, p.Pos, p.Width, p.Height, p.Speed));
            }
        }
        gameLoop();
    });

    backend.register("move", function(resp) {
        var p = resp.Player;

        if (player == undefined || p.Id == player.id) {
            return;
        }

        for (var i = 0; i < players.length; i++) {
            if (players[i].id == p.Id) {
                players[i].pos = p.Pos;
                players[i].speed = p.Speed;
            }
        }
    });

    backend.register("sendMsgToChat", function(resp) {
        message = resp.Message;
        messages.unshift(message);

        chatWindow.innerHTML = '';

        for(k in messages) {
            d = new Date(messages[k].CreatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            msg = '<div>';
            msg += '[' + d + ']';
            msg += '[' + messages[k].OwnerId + ']: ' + messages[k].Text;

            chatWindow.innerHTML += msg;
        }
    });

    backend.register("gameState", function(resp) {
        for(var k in players) {
            if(players[k].id == resp.Player.Id) {
                players.splice(k, 1);
                break;
            }
        }
    });

    backend.onOpen = function() {
        backend.send('getSettings');
        backend.send('register');
    };

    function init() {
        canvas = document.createElement("canvas");
        canvas.style.cssText = "border:1px solid #000000;";
        context = canvas.getContext("2d");

        canvas.width = settings.canvasWidth;
        canvas.height = settings.canvasHeight;
        document.body.appendChild(canvas);

        chatWindow = document.createElement("div");
        chatWindow.id = "chat-window";
        chatWindow.style.cssText = "width:600px;height:100px;overflow-y:scroll";
        document.body.appendChild(chatWindow);

        chatForm = document.createElement("form");
        chatForm.id = "chat-form";

        chatInput = document.createElement("input");
        chatInput.id = "chat-input";
        chatInput.style.cssText = "width:600px;";
        chatInput.type = "text";

        chatForm.appendChild(chatInput);
        document.body.appendChild(chatForm);

        chatForm.onsubmit = function(e){
            e.preventDefault();
            message = new Message(0, chatInput.value, player.id, + new Date());

            backend.send('sendMsgToChat', 'message', message);
            chatInput.value = null;
            chatInput.blur();
        }
    }

};

window.onbeforeunload = function() {
    backend.send('closeConn', 'player', player);
};

function Backend(ws) {
    this.ws = ws;
    this.callbacks = [];

    var self = this;

    ws.onopen = function() {
        self.onOpen();
        console.log("connected to " + wsurl);
    };

    ws.onclose = function(e) {
        self.onClose();
        console.log("connection closed (" + e.code + ")");
    };

    ws.onmessage = function(e) {
        var data = JSON.parse(e.data);
        self.process(data)
    }
}

Backend.prototype.onOpen = function(){};
Backend.prototype.onClose = function(){};

Backend.prototype.send = function(method, entityType = null, entity = null) {
    var request = {
        method: method,
    };

    if(entityType) {
        request[entityType] = entity;
    }

    jsonRequest = JSON.stringify(request);
    ws.send(jsonRequest);
};

Backend.prototype.register = function(method, callback) {
    this.callbacks[method] = callback;
};

Backend.prototype.process = function(data) {
    this.callbacks[data.Method](data)
};