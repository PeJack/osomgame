export class Chat {
    constructor() {
        this.body = document.querySelector("body");
        this.chatNode = null;
        this.chatContainer = null;
        this.messages = [];
        this.message = null;
    }

    createChatContainer() {
        this.chatContainer = document.createElement("div");
        this.chatContainer.id = "chat-window";
        this.chatContainer.style.cssText = "width:600px;height:100px;overflow-y:scroll;";
        this.chatContainer.appendChild(this.chatNode);
        this.body.appendChild(this.chatContainer);
    }

    createChatNode() {
        this.chatNode = document.createElement("form");
        this.chatNode.id = "chat-form";
    }

    createChatInput() {
        let chatInput = document.createElement("input");
        chatInput.id = "chat-input";
        chatInput.style.cssText = "width:600px;";
        chatInput.type = "text";

        this.chatNode.appendChild(chatInput);
    }

    updateChatData(message) {
        this.messages.unshift(message);

        this.messages.forEach((item) => {
            this.chatNode.appendChild(Chat.createMessage(item));
        })
    }

    static createMessage(message) {
        let author = document.createElement("span");
        let messageText = document.createElement("p");
        let messageDate = document.createElement("b");
        let messageNode = document.createElement("div");

        author.innerText = message.OwnerId;
        messageText.innerText = message.Text;
        messageDate.innerText =
            new Date(message.CreatedAt)
                .toLocaleString([], {hour: '2-digit', minut: '2-digit'});

        messageNode.appendChild(author);
        messageNode.appendChild(messageDate);
        messageNode.appendChild(messageText);

        return messageNode;
    }
}