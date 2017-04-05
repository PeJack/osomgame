
export class NetworkController {
    constructor() {
        this.ws = new WebSocket(this.uri);
        this.backend = new Backend(this.ws);
        this.uri = "ws://127.0.0.1:8080/ws";
    }


    register() {
        this.backend.register("register", (resp) => {
            return resp
        });
    }

    sendMsgToChat() {
        this.backend.register("sendMsgToChat", (resp) => {
            return resp
        })
    }

    gameState() {
        this.backend.register("gameState", (resp) => {return resp})
    }

    playerRegister(player) {
        this.backend.onOpen = () => {
            this.backend.send('register', 'player', player)
        }
    }



}