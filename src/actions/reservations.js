import { initializeParse } from '../database/initial';
import { Pacient, Reservation } from '../database/model';
import { getSession } from '../helpers/session';
import { 
    ON_QUERY, 
    ON_SUCCESS_QUERY,
    ON_ERROR,
    ON_INSERT,
    ON_SUCCESS_INSERT,
    ON_RESERVATIONS,
    ON_SUCCESS_RESERVATIONS,
    ON_SELECT_RESERVATION,
    ON_DISSELECT_RESERVATION,
    ON_DELETE,
    ON_SUCCESS_DELETE,
    ON_DETAIL_SELECTED,
    ON_DETAIL_DISSELECTED,
    ON_REGISTER,
    ON_SUCCESS_REGISTER,
    ON_UPDATE,
    ON_SUCCESS_UPDATE
} from '../types/reservation';
import { preInsertDate } from '../helpers/formaters';


const Parse = initializeParse();

export function selectResevation(reservation){
    return async(dispatch) => dispatch(onSelectReservation(reservation))
}

export function disSelectReservation(){
    return async(dispatch) => dispatch(onDisSelectReservation())
}

export function getCustomers (){
    return async (dispatch) => {
        dispatch(onQuery())
        try {
            const { id } = getSession('session');
            const query = new Parse.Query(Pacient);
            query.equalTo('user', Parse.User.createWithoutData(id));
            query.addAscending('name');
            const pacients = await query.find();
            dispatch(onSuccessQuery(pacients));
        } catch (error) {
            dispatch(onError(error))
        }
    }
}

export function createReservation (form,nav){
    return async (dispatch) => {
        dispatch(onInsert())
        try {
            const { id } = getSession('session');
            const reservation = new Reservation();
            reservation.set('user',Parse.User.createWithoutData(id))
            reservation.set('pacient', Pacient.createWithoutData(form.name))
            reservation.set('type', form.type)
            reservation.set('date', preInsertDate(form))
            reservation.set('time', form.time)
            const response = await reservation.save();
            dispatch(onSuccessInsert(response))
            nav.push('/pacientes')
        } catch (error) {
            alert('Error al crear una reservación')
            dispatch(onError(error))
        }
    }
}

export function getReservations(){
    return async(dispatch) => {
        dispatch(onGetReservations())
        try {
            const { id } = getSession('session');
            const query = new Parse.Query(Reservation);
            query.equalTo('user',Parse.User.createWithoutData(id));
            query.addDescending('date');
            query.include('pacient');
            const reservations = await query.find();
            dispatch(onSuccessGetReservations(reservations));
        } catch (error) {
            alert('Error al listar la reservacion')
            dispatch(onError(error))
        }
    }
}

export function deletReservation(id){
    return async(dispatch) => {
        dispatch(onDelete())
        try {
            const reservation  = Reservation.createWithoutData(id)
            await reservation.destroy();
            dispatch(onSuccessDelete());
            dispatch(getReservations());
        } catch (error) {
            alert('Error al eliminar la reservacion')
            dispatch(onError(error))
        }
    }   
}

export function getFilteredReservations(search){
    return async(dispatch) => {
        dispatch(onGetReservations())
        try {
            const { id } = getSession('session');
            
            const queryPacient = new Parse.Query(Pacient);
            queryPacient.contains('name',search);
            const query = new Parse.Query(Reservation);
            query.equalTo('user',Parse.User.createWithoutData(id));
            query.matchesQuery('pacient',queryPacient);
            query.include('pacient')
            query.addDescending('date')
            const reservations = await query.find();
            dispatch(onSuccessGetReservations(reservations));
        } catch (error) {
            console.log(error);
            alert('Error al listar la reservacion')
            dispatch(onError(error))
        }
    }
}

export function selectDetail(reservation){
    return async(dispatch) => {
        dispatch(onDetail(reservation))
    }
}

export function disSelectDetail(){
    return async(dispatch) => {
        dispatch(onDisSelectDetail())
    }
}

export function registerDetail(form){
    return async(dispatch) => {
        dispatch(onRegister())
        try {
            const reservation = Reservation.createWithoutData(form.id);
            reservation.set('title', form.title)
            reservation.set('description', form.description)
            reservation.set('comment', form.comment)
            await reservation.save();
            dispatch(onSucessRegister())
        } catch (error) {
            console.log(error);
            alert('Error al registrar el detalle de la reservación')
            dispatch(onError(error))
        }
    }
}

export function editReservation (id, form){
    return async(dispatch) => {
        dispatch(onUpdate())
        try {
            const reservation = Reservation.createWithoutData(id);
            reservation.set('pacient', Pacient.createWithoutData(form.name))
            reservation.set('type', form.type)
            reservation.set('date', preInsertDate(form))
            reservation.set('time', form.time)
            await reservation.save();
            dispatch(onSuccessUpdate())
            dispatch(getReservations())
        } catch (error) {
            
        }
    }
}

const onQuery = () => ({
    type:ON_QUERY
})
const onError = error => ({
    type: ON_ERROR,
    payload: error
})
const onSuccessQuery = pacients => ({
    type: ON_SUCCESS_QUERY,
    payload: pacients
})
const onInsert = () => ({
    type: ON_INSERT
})
const onSuccessInsert = reservation => ({
    type: ON_SUCCESS_INSERT,
    payload: reservation
})
const onGetReservations = () => ({
    type: ON_RESERVATIONS
})
const onSuccessGetReservations = reservations => ({
    type: ON_SUCCESS_RESERVATIONS,
    payload: reservations
})
const onSelectReservation = reservation => ({
    type: ON_SELECT_RESERVATION,
    payload: reservation
});
const onDisSelectReservation = () => ({
    type: ON_DISSELECT_RESERVATION,
});
const onDelete = () => ({
    type: ON_DELETE
});
const onSuccessDelete = () => ({
    type: ON_SUCCESS_DELETE
})
const onDetail = id => ({
    type: ON_DETAIL_SELECTED,
    payload: id
})
const onDisSelectDetail = () => ({
    type: ON_DETAIL_DISSELECTED,
})
const onRegister = () => ({
    type: ON_REGISTER
})
const onSucessRegister = () => ({
    type: ON_SUCCESS_REGISTER
})
const onUpdate = () => ({
    type: ON_UPDATE
});
const onSuccessUpdate = () => ({
    type: ON_SUCCESS_UPDATE
})