export class db {
    constructor() {
        this.message = undefined;
        this.player = undefined;

        this.messages = [];
        this.players = [];
        this.platforms = [];
    }

    addMessage(message) {
        this.messages.push(message);
    }

    removeMessage(message) {
        this.messages.unshift(message)
    }

    setPlayer(player) {
        this.player = player;
    }

    addPlayer(player) {
        this.players.push(player)
    }

    removePlayer(i) {
        this.players.splice(i, 1)
    }

    addPlatform(platform) {
        this.platforms.push(platform)
    }

    removePlatform(i) {
        this.platforms.splice(i, 1)
    }

    getDb(){
        return this;
    }
}