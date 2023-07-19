import {SET_ALERT, REMOVE_ALERT} from '../actions/types';
const initialState = [];
export default function (state = initialState, action) {
    const {type, payload} = action
    switch(action.type){
        case SET_ALERT:
            return [...state, action.payload] // We can also write payload instead of action.payload because we have destructured it in line 1
        case REMOVE_ALERT:
            return state.filter(alert=>alert.id !== action.payload);
        default:
            return state;
    }
}