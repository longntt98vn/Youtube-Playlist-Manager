import { db } from "../firebase/firebase"

let redux = require('redux');

const playlistInitialState = {}
const allReducer = (state = playlistInitialState, action) => {
    switch (action.type) {
        case "ADD_PLAYLIST":
            {
            const db1 = db.ref("playlistList");
            db1.push(action.item);
            return state
            }
        case "DELETE_PLAYLIST":
            {

            return state
            }
        default:
            {

            return state
            }
    }
}