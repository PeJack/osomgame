// Input - система управления игрока
export class Input {
    constructor() {
        this.pressedKeys = {};
        this.pressedMouse = false;

        document.addEventListener('keydown', (e) => this.setKey(e, true));
        document.addEventListener('keyup', (e) => this.setKey(e, false));
        
        window.addEventListener('blur', () => this.pressedKeys = {});

        window.addEventListener('mousedown', (e) => this.pressedMouse = true);
        window.addEventListener('mouseup', (e) => this.pressedMouse = false);
    }

    isDown(key) {
        return this.pressedKeys[key.toUpperCase()];
    }

    isMouseDown() {
        return this.pressedMouse;
    }
    
    setKey(event, status) {
        let code = event.keyCode;
        let key;

        switch(code) {
            case 32:
                key = 'SPACE'; break;
            case 37:
                key = 'LEFT'; break;
            case 38:
                key = 'UP'; break;
            case 39:
                key = 'RIGHT'; break;
            case 40:
                key = 'DOWN'; break;
            default:
                // Convert ASCII codes to letters
                key = String.fromCharCode(code);
        }

        this.pressedKeys[key] = status;
    }
}


