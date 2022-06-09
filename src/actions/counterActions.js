import * as types from './actionTypes';

export function incrementValue(payload) {
    return { type: types.INCREMENT_VALUE, payload };
}

export function decrementValue(payload) {
    return { type: types.DECREMENT_VALUE, payload };
}

export function resetValue(payload) {
    return { type: types.RESET_VALUE };
}

