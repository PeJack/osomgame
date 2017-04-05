export class Controls {
    constructor() {
        this.pressedKeys = {};
        this.pressedMouse = false;
        this.document = document;
        this.window = window;
    }

    setKey(event, status) {
        let code = event.keyCode;
        let key;

        switch (code) {
            case 32:
                key = 'SPACE';
                break;
            case 37:
                key = 'LEFT';
                break;
            case 38:
                key = 'UP';
                break;
            case 39:
                key = 'RIGHT';
                break;
            case 40:
                key = 'DOWN';
                break;
            default:
                // Convert ASCII codes to letters
                key = String.fromCharCode(code);
        }

        return key;
    }
}