import { initializeParse } from '../database/initial';
import { Pacient, Reservation } from '../database/model';
import { getSession } from '../helpers/session';
import { 
    ON_SHOW_FORM, 
    ON_HIDE_FORM, 
    ON_INSERT, 
    ON_SUCCESS_INSERT, 
    ON_QUERY, 
    ON_SUCCESS_QUERY,
    ON_SELECT,
    ON_ERROR,
    ON_SUCCESS_HISTORY,
    ON_DISSELECT,
    ON_FILTER,
    ON_SUCCESS_FILTER
} from '../types/pacients';

const Parse = initializeParse();

export function visibleForm(visible){
    return async (dispatch) => {
        visible ? dispatch(onShowForm()) : dispatch(onHideForm())
    }
}

export function disSelect(){
    return async (dispatch) => {
        dispatch(onDisSelect());
    }
}

export function insert(form){
    return async(dispatch) => {
        dispatch(onInsert())
        const { name,phone } = form;
        try {
            const {id} = getSession('session');
            const pacient = new Pacient();
            pacient.set('name',name)
            pacient.set('phone',phone)
            pacient.set('user',Parse.User.createWithoutData(id))
            await pacient.save();
            dispatch(onSuccessInsert(form));
        } catch (error) {
            dispatch(onError(error));
            alert('Error al crear paciente');
        }
    }
}

export function getPatiens(){
    return async(dispatch) => {
        dispatch(onQuery())
        try {
            const { id } = getSession('session')
            const query = new Parse.Query(Pacient);
            query.addDescending('createdAt');
            query.limit(10);
            query.equalTo('user',Parse.User.createWithoutData(id))
            const response = await query.find();
            dispatch(onSuccessQuery(response));
        } catch (error) {
            onError(error);
            alert('Error al buscar los pacientes');
        }
    }
}

export function filterPacients(search){
    return async(dispatch) => {
        dispatch(onFilter())
        try {
            const query = new Parse.Query(Pacient);
            query.addDescending('createdAt');
            query.limit(10);
            query.contains('name',search);
            const response = await query.find();
            dispatch(onSuccessFilter(response));
        } catch (error) {
            onError(error);
            alert('Error al filtrar los pacientes');
        }
    }
}

export function selectPacient (pacient) {
    return async(dispatch) => {
        dispatch(onSelectPacient(pacient))
        try {
            const {id} = getSession('session');
            const query = new Parse.Query(Reservation);
            query.equalTo('pacient', Pacient.createWithoutData(pacient.id));
            query.addDescending('createdAt');
            query.limit(10);
            query.equalTo('active',true);
            query.equalTo('user', Parse.User.createWithoutData(id));
            const history = await query.find();
            dispatch(onSuccessHistory(history));
        } catch (error) {
            onError(error);   
            alert('Error al obtener el hisotrial del paciente.')
        }
    }
}

const onShowForm = () => ({
    type:ON_SHOW_FORM
});
const onHideForm = () => ({
    type:ON_HIDE_FORM
});
const onInsert = () => ({
    type:ON_INSERT
});
const onSuccessInsert = pacient => ({
    type: ON_SUCCESS_INSERT,
    payload:pacient,
})
const onError = error => ({
    type:ON_ERROR,
    payload:error
});
const onQuery = () => ({
    type: ON_QUERY
});
const onSuccessQuery = patiens => ({
    type: ON_SUCCESS_QUERY,
    payload: patiens
});
const onSelectPacient = patient => ({
    type: ON_SELECT,
    payload:patient
});
const onSuccessHistory = history => ({
    type: ON_SUCCESS_HISTORY,
    payload: history
})
const onDisSelect = () => ({
    type: ON_DISSELECT
})
const onFilter = () => ({
    type: ON_FILTER
})
const onSuccessFilter = pacients => ({
    type: ON_SUCCESS_FILTER,
    payload: pacients
})