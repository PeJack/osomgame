import Rx from 'rxjs/Rx';
import {State} from '../state/state';

export class IndexReducer {
    constructor() {
        this.state = new State();

        this.watch = (property) => {
            return Rx.Observable.create((observer) => {
                observer.next(this.state[property]);
                observer.complete();
            });
        }
    }

    reducer(action) {
        switch (action.type) {
            case ("LEFT"):
                this.state.way = "left";
                break;
            case ("RIGHT"):
                this.state.way = "right";
                break;
            case ("UP"):
                this.state.way = "top";
                break;
            case ("DOWN"):
                this.state.way = "bottom";
                break;
        }
    }

    dispatch(action, property) {
        this.reducer(action);
        return this.watch(property);
    }
}