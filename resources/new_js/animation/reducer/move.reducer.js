import Rx from 'rxjs/Rx';

export let State = {
    way: null
};

export function reducer(action, state = State) {
    console.log('123');
    switch (action.type) {
        case ("LEFT"):
            state.way = "left";
            break;
        case ("RIGHT"):
            state.way = "right";
            break;
        case ("UP"):
            state.way = "top";
            break;
        case ("DOWN"):
            state.way = "bottom";
            break;
    }
}

export const Way = Rx.Observable.of((state = State) => state.way);

export function ways(state = State) {
    return Rx.Observable.create(observer => {
        observer.next(state.way);
        observer.complete();
    })
}