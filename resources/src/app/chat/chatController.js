import {Chat} from './chat';
import {Message} from './message';

//Определяем логику работы с нашим чатом
export class ChatController {
    constructor() {
        this.chat = new Chat();
        this.chat.createChatNode();
        this.chat.createChatContainer();
        this.chat.chatNode.addEventListener('submit', this.sendMessageWatcher.bind(this), false);
    }

    update(message) {
        this.chat.updateChatData(message)
    }

    sendMessageWatcher(e) {
        e.preventDefault();

    }
}