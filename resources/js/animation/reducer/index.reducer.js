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
                this.state.way.left = action.payload;
                break;
            case ("RIGHT"):
                this.state.way.right = action.payload;
                break;
            case("SPACE"):
            case ("UP"):
                this.state.way.up = action.payload;
                break;
            case ("DOWN"):
                this.state.way.down = action.payload;
                break;
        }
    }

    dispatch(action, property) {
        this.reducer(action);
        return this.watch(property);
    }
}