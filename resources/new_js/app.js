import {Platform} from './entities/Platform';
import {Input} from './systems/Input';
import {Canvas} from './graph/canvas';
import {GameLoop} from './GameLoop';
import {Player} from './entities/Player';

window.onbeforeunload = function() {
    window.backend.beforeUnloaded();
};

class Backend {
    constructor(ws, wsurl, player) {
        this.player = player;
        this.ws = ws;
        this.callbacks = [];
        this.settings = null;

        this.ws.onopen = () => {
            this.onOpen();
            console.log("connected to " + wsurl);
        };

        this.ws.onclose = (e) => {
            this.beforeUnloaded();
            console.log("connection closed (" + e.code + ")");
        };

        this.ws.onmessage = (e) => {
            let data = JSON.parse(e.data);
            this.process(data)
        }
    }

    send(method, entityType = null, entity = null) {
        let request = {
            method: method,
        };

        if (entityType) {
            request[entityType] = entity;
        }

        let jsonRequest = JSON.stringify(request);

        this.ws.send(jsonRequest);
    }

    register(method, callback) {
        this.callbacks[method] = callback;
    };

    process(data) {
        if(data == 9) { return; }
        this.callbacks[data.method](data.message)
    };

    beforeUnloaded() {
        this.send('closeConn', 'player', this.player);
    };

    onOpen() {
        this.send('getSettings');
        this.send('register');
    };
    
}
export class MainApp {
    
    constructor(db) {
        this.db = db;
        this.wsurl = "ws://127.0.0.1:8080/ws";

        //Элементы DOM
        this.canvas = null;

        //Веб сокеты
        this.ws = null;

        //Сервис управления сокетами
        this.backend = null;
        this.settings = {};

        //Класс для отрисовки картинки нашего изображения
        this.gameLoop = null;

        this.start();
    }

    start() {
        this.ws = new WebSocket(this.wsurl);

        this.backend = new Backend(this.ws, this.wsurl, this.db.player);
        window.backend = this.backend;    

        this.backend.register("getSettings", (resp) => {
            for(let k in resp) {
                this.settings[k] = resp[k];
            }

            this.init();
        });

        this.backend.register("register", (resp) => {

            if (!this.db.player) {
                let p = new Player(
                    resp.player.ID,
                    resp.player.X,
                    resp.player.Y,
                    resp.player.Width,
                    resp.player.Height,
                    resp.player.Speed
                )
                
                this.db.setPlayer(p);
                this.input = new Input();
            }

            this.gameLoop = new GameLoop(
                this.canvas,
                this.canvas.context,
                this.input,
                this.backend,
                this.db,
                this.settings
            );
        });

        this.backend.register("move", (resp) => {
            if (this.db.player == undefined || resp.id == this.db.player.id) {
                return;
            }

            let p = this.db.players[resp.id];
            if (!p) { return };

            p.x = resp.x;
            p.y = resp.y;
            p.speed = resp.speed; 
        });

        this.backend.register("sendMsgToChat", (resp) => {
            this.db.message = resp.Message;
            this.db.removeMessage(this.db.message);

            this.canvas.chatWindow.innerHTML = '';

            for (k in this.db.messages) {
                d = new Date(this.db.messages[k].CreatedAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

                let msg = '<div>';
                msg += '[' + d + ']';
                msg += '[' + this.db.messages[k].OwnerId + ']: ' + this.db.messages[k].Text;

                this.canvas.chatWindow.innerHTML += msg;
            }
        });

        this.backend.register("gameState", (resp) => {
            for(let id in resp.platforms) {
                let p = resp.platforms[id];

                if(!this.db.platforms[id]) {
                    this.db.addPlatform(id, new Platform(p.ID, p.X, p.Y, p.Width, p.Height)); 
                }
            };

            for (let id in this.db.players) {
                if(!resp.players[id]) {
                    this.db.removePlayer(id);
                }
            }

            for(let id in resp.players) {
                let p = resp.players[id];
                if(!this.db.players[id] && this.db.player.id != p.ID) {
                    this.db.addPlayer(id, new Player(p.ID, p.X, p.Y, p.Width, p.Height, p.Speed));
                }
            }
        });
    }

    init() {
        this.canvas = new Canvas(this.backend, this.settings, this.db.player);
    }
}
