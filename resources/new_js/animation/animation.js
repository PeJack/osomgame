// import Rx from 'rxjs/Rx';
import * as fromWay from './reducer/move.reducer';

const Reducer = fromWay.reducer;
const Way = fromWay.ways;

export class ActionCreator {
    constructor() {
        this.reducer = Reducer;
        this.way = Way;
    }

    createAction(type, payload) {

        let action = {
            type: type,
        };

        if (payload) {
            action.payload = payload
        }

        this.dispatch(action)
    }

    dispatch(action) {
        this.reducer(action);
    }
}
