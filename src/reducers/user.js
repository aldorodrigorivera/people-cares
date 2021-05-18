import {
    ON_LOGIN,
    ON_SUCCESS_LOGIN,
    ON_ERROR,
    ON_LOGOUT,
    ON_RETRIEVE_SESSION,
    ON_RESET,
    ON_SUCCESS_RESET,
    
}from '../types/user';

const initialState = {
    user:null,
    loading:false,
    error:null
}

export default function userReducer (state = initialState, action) {
    switch(action.type){
        case ON_LOGIN:
            return {
                ...state,
                loading:true,
                error:null
            }
        case ON_SUCCESS_LOGIN:
            return {
                ...state,
                loading:false,
                user:action.payload,
            }
        case ON_ERROR:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case ON_LOGOUT:
            return {
                user:null,
                loading:false,
                error:null
            }
        case ON_RETRIEVE_SESSION:
            return {
                ...state,
                user:action.payload
            }
        case ON_RESET:
            return {
                ...state,
                loading: true,
            }
        case ON_SUCCESS_RESET:
            return {
                ...state,
                loading:false
            }
        default:
            return {
                ...state
            }
    }
}