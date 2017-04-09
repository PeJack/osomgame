import {Platform} from './entities/Platform';
import {Input} from './systems/Input';
import {Canvas} from './graph/canvas';
import {GameLoop} from './GameLoop';
import {Player} from './entities/Player';

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
            this.onClose();
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
        this.callbacks[data.Method](data)
    };

    beforeUnloaded() {
        this.send('closeConn', 'player', this.player);
    };

    onOpen() {
        this.send('getSettings');
        this.send('register');
    };

    onClose() {
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
        this.settings = null;

        //Класс для отрисовки картинки нашего изображения
        this.gameLoop = null;

        this.start();
    }

    start() {
        this.ws = new WebSocket(this.wsurl);

        this.backend = new Backend(this.ws, this.wsurl, this.db.player);

        this.backend.register("getSettings", (resp) => {
            this.settings = resp.Settings;

            resp.Platforms.forEach((platform) => {
                this.db.addPlatform(new Platform(platform.Id, platform.Pos, platform.Width, platform.Height));
            });

            this.init();
        });

        this.backend.register("register", (resp) => {

            if (!this.db.player) {
                this.db.setPlayer(new Player(
                    resp.Player.Id,
                    resp.Player.Pos,
                    resp.Player.Width,
                    resp.Player.Height,
                    resp.Player.Speed
                ));

                this.input = new Input();
            }

            if (resp.Player.Id != this.db.player.id) {
                this.db.addPlayer(
                    new Player(
                        resp.Player.Id,
                        resp.Player.Pos,
                        resp.Player.Width,
                        resp.Player.Height,
                        resp.Player.Speed
                    )
                );
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
            let p = resp.Player;

            if (this.db.player == undefined || p.Id == this.db.player.id) {
                return;
            }

            this.db.players.forEach((player) => {
                if (player.id == p.Id) {
                    player.pos = p.Pos;
                    player.speed = p.Speed;
                }
            });
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
            for (let k in this.db.players) {
                if (this.db.players[k].id == resp.Player.Id) {
                    this.db.removePlayer(k);
                    break;
                }
            }
        });
    }

    init() {
        this.canvas = new Canvas(this.backend, this.settings, this.db.player);
    }
}