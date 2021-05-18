import {
    ON_LOGIN,
    ON_SUCCESS_LOGIN,
    ON_ERROR,
    ON_LOGOUT,
    ON_RESET,
    ON_SUCCESS_RESET,
    ON_RETRIEVE_SESSION
} from '../types/user';
import { initializeParse, handleParseError } from '../database/initial';
import { processUser,saveSession,deleteSession } from '../helpers/session';

const Parse = initializeParse();

export function login(form,nav){
    return async (dispatch) => {
        dispatch(onLogin());
        try {
            const { user, password } = form;
            const response = await Parse.User.logIn(user,password);
            const userResponse = processUser(response);
            dispatch(onSuccess(userResponse));
            saveSession(userResponse);
            nav.push('/reservaciones')
        } catch (error) {
            dispatch(onError(error));
            handleParseError(error);
        }
    }
}

export function setUserSession(user) {
    return async (dispatch) => {
        dispatch(retrieveSession(user));
    }
}


export function logout () {
    return async(dispatch) => {
        dispatch(onLogOut());
        await Parse.User.logOut();
        deleteSession();
    }
}

export function resetPassword (email) {
    return async(dispatch) => {
        dispatch(onReset());
        try {
            await Parse.User.requestPasswordReset(email);
            dispatch(onSuccessReset());
            alert('Correo enviado exitosamente')
        } catch (error) {
            alert('Lo sentimos, este correo lo se encuentra registrado')
            dispatch(onError(error))
        }

    }
}



const onLogin = () => ({
    type: ON_LOGIN
})
const onSuccess = user => ({
    type: ON_SUCCESS_LOGIN,
    payload: user
})
const onError = error => ({
    type: ON_ERROR,
    payload: error
})
const onLogOut = () => ({
    type: ON_LOGOUT
})
const onReset = () => ({
    type: ON_RESET
})
const onSuccessReset = () => ({
    type: ON_SUCCESS_RESET
})
const retrieveSession = user => ({
    type: ON_RETRIEVE_SESSION,
    payload:user
})