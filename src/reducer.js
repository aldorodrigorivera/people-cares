import { combineReducers } from "redux";
import userReducer from './reducers/user';
import pacientReducer from './reducers/pacients';
import reservationReducer from './reducers/reservation';

export default combineReducers({
    userReducer,
    pacientReducer,
    reservationReducer,
})