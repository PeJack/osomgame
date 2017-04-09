export const ActionTypes = {
    MOVE_LEFT: '[Move] Left',
    MOVE_RIGHT: '[Move] Right',
    MOVE_TOP: '[Move] Top',
    MOVE_BOTTOM: '[Move] Bottom'
};

export class MoveLeftAction {
    type = ActionTypes.MOVE_LEFT;
    payload = null;

    constructor(payload) {
        this.payload = payload
    }
}

export class MoveRightAction {
    type = ActionTypes.MOVE_RIGHT;
    payload = null;

    constructor(payload) {
        this.payload = payload
    }
}

export class MoveTopAction {
    type = ActionTypes.MOVE_TOP;
    payload = null;

    constructor(payload) {
        this.payload = payload
    }
}

export class MoveBottomAction {
    type = ActionTypes.MOVE_BOTTOM;
    payload = null;

    constructor(payload) {
        this.payload = payload
    }
}