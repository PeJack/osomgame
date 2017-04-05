import {Player} from './player';

export class PlayerController {
    constructor() {
        this.players = [];
        this.player = null;
    }

    createPlayer(id, pos, size, speed) {
        this.player = new Player(id, pos, size, speed);
        this.updatePlayers(this.players);
    }

    updatePlayers(players) {
        players.forEach((item, index) => {
            if (item.Id != this.player.id) {
                this.players.push(new Player(item.Id, item.Pos, item.Size, item.Speed));
            }
        })
    }

    removePlayer(i) {
        this.players.splice(i, 1);
    }

    movePlayer(resp) {
        var rPlayer = resp.Player;

        if (!this.player || rPlayer == this.player.id) { return; }

        this.players.forEach((player) => {
            if (player.id == rPlayer.Id) {
                player.pos = rPlayer.Pos;
                player.speed = rPlayer.Speed;
            }
        })
    }
}