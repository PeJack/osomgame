import Rx from 'rxjs/Rx';

export class Dispatcher{
    constructor(reducer) {
        this.reducer = reducer;
        this.way = new Rx.Subject();
    }

    createAction(type, payload, property) {
        let action = {
            type: type,
            payload: payload
        };

        this.reducer.dispatch(action, property).subscribe(direction => {
            this.way.next(direction);
        })
    }

    getWay(direction) {
        return Rx.Observable.create((observer) => {
            observer.next(direction);
            observer.complete();
        });
    }
}
