export class db {
    constructor() {
        this.message = undefined;
        this.player = undefined;

        this.messages = {};
        this.players = {};
        this.platforms = {};
    }

    addMessage(id, message) {
        this.messages[id] = message;
    }

    removeMessage(message) {
        this.messages.unshift(message)
    }

    setPlayer(player) {
        this.player = player;
    }

    addPlayer(id, player) {
        this.players[id] = player
    }

    removePlayer(id) {
        delete this.players[id]
    }

    addPlatform(id, platform) {
        this.platforms[id] = platform
    }

    removePlatform(id) {
        delete this.platforms[id]
    }

    getDb(){
        return this;
    }
}