import Rx from 'rxjs/Rx';

export class ActionCreator {
    constructor(reducer) {
        this.reducer = reducer;
        this.way = Rx.Subject();
    }

    createAction(type, payload, property) {
        let action = {
            type: type,
            payload: payload
        };

        this.reducer.dispatch(action, property).subscribe(direction => {
            this.way.onNext(direction)
        })
    }

    getWay(direction) {
        return Rx.Observable.create((obse§rver) => {
            observer.next(direction);
            observer.complete();
        });
    }
}
