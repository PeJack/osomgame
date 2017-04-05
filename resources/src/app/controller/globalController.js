import {PlayerController} from '../player/playerController';
import {ChatController} from '../chat/chatController';
import {NetworkController} from '../network/network';
import {CanvasController} from '../canvas/canvasController';
import {ControlsController} from '../controller/globalController';

export class GlobalController {
    constructor() {
        this.playerController = new PlayerController();
        this.chatController = new ChatController();
        this.networkController = new NetworkController();
        this.canvasController = new CanvasController();
        this.controlsController = new ControlsController();
    }

    createConnection() {
        let resp = this.networkController.createWs();
        let rP = resp.Player;
        let rPs = resp.Players;
        let players = this.playerController.players;
        let player = this.playerController.player;

        if (!player) {
            this.playerController.createPlayer(
                rP.Id,
                rP.Pos,
                rP.Size,
                rP.Speed);
        }

        for (var prop in rPs) {
            p = rPs[prop];

            if (p.Id != this.playerController.player.id) {
                this.playerController.createPlayer(p.Id, p.Pos, p.Size, p.Speed);
            }
        }
    }

    sendMessage() {
        let resp = this.networkController.sendMsgToChat();
        this.chatController.updateChatData(resp.Message)
    }

    checkGameState() {
        let resp = this.networkController.gameState();
        let player = resp.Player;
        let players = this.playerController.players;

        for (let p in players) {
            if (players[p].id == player.Id) {
                this.playerController.removePlayer(p)
            }
        }
    }

    openConnection(player) {
        this.networkController.register(player);
    }

    drawLoop() {
        this.canvasController.init();
        if (this.playerController.player) {
            this.playerController.player.draw(this.canvasController.ctx);
        }
    }

    handleInput() {
        let moved = false;

        if (document.activeElement === document.getElementById("chat-input")) {
            return;
        }

        if (this.controlsController.isDown('DOWN') || this.controlsController.isDown('DOWN')) {
            this.moved = true;
            this.playerController.pos[1] += this.playerController.speed;
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
}