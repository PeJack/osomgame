import {Message} from '../entities/Message';

export class Canvas{
    constructor(backend, settings, player){
        this.player = player;
        this.backend = backend;
        this.settings = settings;

        this.canvas = document.createElement("canvas");
        this.canvas.id = "gameWindow";
        this.canvas.style.cssText = "border:1px solid #000000;";
        this.context = this.canvas.getContext("2d");

        this.canvas.width = settings.canvasWidth;
        this.canvas.height = settings.canvasHeight;
        document.body.appendChild(this.canvas);

        this.chatWindow = document.createElement("div");
        this.chatWindow.id = "chat-window";
        this.chatWindow.style.cssText = "width:600px;height:100px;overflow-y:scroll";
        document.body.appendChild(this.chatWindow);

        this.chatForm = document.createElement("form");
        this.chatForm.id = "chat-form";

        this.chatInput = document.createElement("input");
        this.chatInput.id = "chat-input";
        this.chatInput.style.cssText = "width:600px;";
        this.chatInput.type = "text";

        this.chatForm.appendChild(this.chatInput);
        document.body.appendChild(this.chatForm);

        this.chatForm.onsubmit = (e) => {
            e.preventDefault();

            this.submitListener()
        }
    }

    submitListener(){
        let message = new Message(0, this.chatInput.value, this.player.id, +new Date());

        this.backend.send('sendMsgToChat', 'message', message);
        this.chatInput.value = null;
        this.chatInput.blur();
    }

}