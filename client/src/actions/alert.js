import { SET_ALERT, REMOVE_ALERT } from "./types";
import {v4, uuid} from "uuid";

export const setAlert = (msg, alertType, timeout=5000) => dispatch => { // We are using thunk middleware here
    const id = v4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id}
    })

    setTimeout(()=>dispatch({type: REMOVE_ALERT, payload: id}), timeout)
}