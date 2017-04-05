export class Message {
    constructor(id, text, onwerId, createdAt) {
        this.id = id;
        this.text = text;
        this.ownerId = onwerId;
        this.createdAt = createdAt;
    }
}