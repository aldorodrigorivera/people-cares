import {
    ON_ERROR,
    ON_QUERY,
    ON_SUCCESS_QUERY,
    ON_SUCCESS_INSERT,
    ON_INSERT,
    ON_RESERVATIONS,
    ON_SUCCESS_RESERVATIONS,
    ON_SELECT_RESERVATION,
    ON_DISSELECT_RESERVATION,
    ON_DELETE,
    ON_SUCCESS_DELETE,
    ON_DETAIL_DISSELECTED,
    ON_DETAIL_SELECTED,
    ON_UPDATE,
    ON_SUCCESS_UPDATE,
}from '../types/reservation';

const initialState = {
    customers:[],
    loading:false,
    error:null,
    reservations:[],
    filtered:[],
    selected:null,
    details:null
}

export default function reservationReducer (state = initialState, action) {
    switch(action.type){
        
        case ON_ERROR:
            return {
                ...state,
                loading:false,
                error:action.payload
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
                customers: action.payload,
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
                reservations:[action.payload,...state.reservations],
                filtered:state.reservations
            }
        case ON_RESERVATIONS:
            return {
                ...state,
                loading:true,
                error:null
            }
        case ON_SUCCESS_RESERVATIONS:
            return {
                ...state,
                loading:false,
                reservations: action.payload,
                filtered: action.payload,
            }
        case ON_SELECT_RESERVATION:
            return {
                ...state,
                selected: action.payload,
            }
        case ON_DISSELECT_RESERVATION:
            return {
                ...state,
                selected: null,
                details:null
            }
        case ON_DELETE:
            return{
                ...state,
                loading:true,
                selected:null
            }
        case ON_SUCCESS_DELETE:
            return{
                ...state,
                loading:false,
                selected:null,
            }
        case ON_DETAIL_DISSELECTED:
            return{
                ...state,
                details:null
            }
        case ON_DETAIL_SELECTED:
            return{
                ...state,
                details:action.payload
            }
        case ON_UPDATE:
            return {
                ...state,
                loading:true
            }
        case ON_SUCCESS_UPDATE:
            return{
                ...state,
                loading:false
            }
        default:
            return {
                ...state
            }
    }
}