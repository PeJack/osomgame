// Message - сообщения в чате
export class Message {
    constructor(id, text, ownerId, createdAt) {
        this.id = id;
        this.text = text;
        this.ownerId = ownerId;
        this.createdAt = createdAt;  
    }
}