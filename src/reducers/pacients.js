import {
    ON_ERROR,
    ON_SHOW_FORM,
    ON_HIDE_FORM,
    ON_INSERT,
    ON_SUCCESS_INSERT,
    ON_QUERY,
    ON_SUCCESS_QUERY,
    ON_SELECT,
    ON_SUCCESS_HISTORY,
    ON_DISSELECT,
    ON_FILTER,
    ON_SUCCESS_FILTER
}from '../types/pacients';

const initialState = {
    pacients:[],
    loading:false,
    error:null,
    selected:null,
    filtered:[],
    formVisible:false,
    history:[]
}

export default function pacientReducer (state = initialState, action) {
    switch(action.type){
        case ON_SHOW_FORM:
            return {
                ...state,
                formVisible:true
            }
        case ON_HIDE_FORM:
            return {
                ...state,
                formVisible:false
            }
        case ON_ERROR:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case ON_INSERT: 
            return {
                ...state,
                loading:true,
                error:null
            }
        case ON_SUCCESS_INSERT: 
            return {
                ...state,
                loading:false,
                pacients: [action.payload,...state.pacients],
                filtered: state.pacients,
                error:null
            }
        case ON_QUERY:
            return {
                ...state, 
                loading: true,
                error:null
            }
        case ON_SUCCESS_QUERY:
            return {
                ...state, 
                loading: false,
                pacients: action.payload,
                filtered: action.payload,
            }
        case ON_SELECT:
            return {
                ...state,
                selected: action.payload,
            }
        case ON_DISSELECT :
            return {
                ...state,
                selected: null
            }
        case ON_SUCCESS_HISTORY: 
            return {
                ...state,
                loading: false,
                history: action.payload
            }
        case ON_FILTER:
            return {
                ...state,
                loading:true,
                error:null
            }
        case ON_SUCCESS_FILTER:
            return {
                ...state,
                loading:false,
                pacients:action.payload,
                filtered:action.payload
            }
        default:
            return {
                ...state
            }
    }
}