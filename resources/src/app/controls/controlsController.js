import {Controls} from './controls';

export class ControlsController {
    constructor() {
        this.moved = false;
        this.controls = new Controls();
        this.input = null;
        this.window = window;
    }

    setKey(event, status) {
        var code = event.keyCode;
        var key;

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
        pressedKeys[key] = status;
    }

    addListeners() {
        this.document.addEventListener('keydown', (e) => {
            this.setKey(e, true);
        });

        this.document.addEventListener('keyup', (e) => {
            this.setKey(e, false)
        });

        this.window.addEventListener('blur', () => {
            this.pressedKeys = {};
        });

        this.window.addEventListener('mousedown', (e) => {
            this.pressedMouse = true;
        });

        this.window.addEventListener('mouseup', (e) => {
            this.pressedMouse = false;
        })
    }

    handleInput() {
        isDown((key) => {
            return this.pressedKeys[key.toUpperCase()];
        });

        isMouseDown((key) => {
            return this.pressedMouse;
        });
    }
}