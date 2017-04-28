import {canvas} from './../utils/canvas';

export class Input {
    constructor() {
        this._buttonListener = new ButtonListener();
        this._mouseMoveListener = new MouseMoveListener();
        
        canvas.contentEditable = true; // дать канвасу фокус (preventDefault)
    };

    update() {
      this._buttonListener.update();
    }

    isDown(button) {
        return this._buttonListener.isDown(button);
    }

    isPressed(button) {
        return this._buttonListener.isPressed(button);
    }

    getMousePosition() {
      return this._mouseMoveListener.getMousePosition();
    }

    getMouseScroll(){
        return this._mouseMoveListener.getMouseScroll();
    }

}

class ButtonListener {
    constructor() {
        let self = this;

        this._buttonDownState = {};
        this._buttonPressedState = {};
        
        canvas.addEventListener('keydown', (e) => self._down(e.keyCode), false);
        
        canvas.addEventListener('keyup', (e) => self._up(e.keyCode), false);   

        canvas.addEventListener('mousedown', (e) => self._down(self._getMouseButton(e)), false); 

        canvas.addEventListener('mouseup', (e) => self._up(self._getMouseButton(e)), false);                   
    }

    update() {
      for (let i in this._buttonPressedState) {
        if (this._buttonPressedState[i] === true) { // кнопка нажата и событие продолжается
          this._buttonPressedState[i] = false; // окончание нажатия кнопки
        }
      }
    }

    _down(buttonId) {
      this._buttonDownState[buttonId] = true;
      if (this._buttonPressedState[buttonId] === undefined) { // начало нового нажатия
        this._buttonPressedState[buttonId] = true; // регистрация кнопки
      }  
    }

    _up(buttonId) {
      this._buttonDownState[buttonId] = false;
      if (this._buttonPressedState[buttonId] === false) { // предыдущее нажатие окончено
        this._buttonPressedState[buttonId] = undefined; // подготовка к следующему нажатию
      }
    }

    isDown(button) {
      return this._buttonDownState[button] || false;
    }

    isPressed(button) {
      return this._buttonPressedState[button] || false;
    }

    _getMouseButton(e) {
        if (e.which !== undefined || e.button !== undefined) {
          if (e.which === 3 || e.button === 2) {
            return "RIGHT_MOUSE";
          } else if (e.which === 1 || e.button === 0 || e.button === 1) {
            return "LEFT_MOUSE";
          }
        }
 
    }
}

class MouseMoveListener {
    constructor() {
        this._bindings = [];
        this._mousePosition;
        this._scroll;

        let self = this;
        let mousewheelevent = (/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";

        canvas.addEventListener('mousemove', function(e) {
          let absoluteMousePosition = self._getAbsoluteMousePosition(e);
          let elementPosition = getElementPosition(canvas);

          self._mousePosition = {
            x: absoluteMousePosition.x - elementPosition.x,
            y: absoluteMousePosition.y - elementPosition.y
          };
        }, false);

        canvas.addEventListener('mousemove', function(e) {
          for (let i = 0; i < self._bindings.length; i++) {
            self._bindings[i](self.getMousePosition());
          }
        }, false);

         canvas.addEventListener (mousewheelevent, (e) => self.mousewheel(e), false);   
    }

    mousewheel(e) {
		let event = window.event || e;
		this._scroll = event.detail ? event.detail : -event.wheelDelta/120;
	}

    getMousePosition() {
      return this._mousePosition;
    }

    getMouseScroll() {
        return this._scroll;
    }

    _getAbsoluteMousePosition(e) {
	    if (e.pageX) {
            return { x: e.pageX, y: e.pageY };
	    } else if (e.clientX) {
            return { x: e.clientX, y: e.clientY };
      }
    }
}

var getWindow = function(document) {
  return document.parentWindow || document.defaultView;
};

var getElementPosition = function(element) {
  var rect = element.getBoundingClientRect();
  var document = element.ownerDocument;
  var body = document.body;
  var window = getWindow(document);
  return {
    x: rect.left + (window.pageXOffset || body.scrollLeft) - (body.clientLeft || 0),
    y: rect.top + (window.pageYOffset || body.scrollTop) - (body.clientTop || 0)
  };
};



