import Rx from 'rxjs/Rx';

export class State {
    constructor() {
        this.way = {
            left: false,
            right: false,
            up: false,
            down: false
        };
    }
}