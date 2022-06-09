import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function counterReducer(state = initialState, action) {
    switch (action.type) {

        case types.INCREMENT_VALUE:
            return {
                counter: state.counter + Number(action.payload)
            }

        case types.DECREMENT_VALUE:
            return {
                counter: state.counter - Number(action.payload)
            }

        case types.RESET_VALUE:
            return {
                counter: 0
            }


        default: return state;
    }
}