import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createReservation, getCustomers, disSelectReservation, editReservation } from '../../actions/reservations';
import { validateReservation } from '../../validators/reservation';
import { getDate } from '../../helpers/formaters';
import Loader from '../loader';
import { useHistory } from 'react-router-dom';

export default function Form(){
    const nav = useHistory();
    const initial = {name:'', date:'', time:'', type:''}
    const { customers, loading, selected } = useSelector(state => state.reservationReducer)
    const dispatch = useDispatch();
    const [form, changeForm] = useState(initial)
    const clear = () => { 
        dispatch(disSelectReservation());
        changeForm(initial); 
    }
    const onChange = e => changeForm({ ...form, [e.target.name]:e.target.value })
    const onSubmit = () => {
        if(!validateReservation){return};
        dispatch(createReservation(form,nav))
        changeForm(initial)
    }
    const onUpdate = () => {
        if(!validateReservation){return};
        dispatch(editReservation(selected.id,form));
        clear()
    }
    useEffect(() => {
        if(customers.length === 0){
            dispatch(getCustomers())
        }
        if(selected !== null){
            changeForm({
                name:selected?.get('pacient')?.id,
                type:selected?.get('type'),
                date:getDate(selected?.get('date')),
                time:selected?.get('time')
            })
        }
    }, [selected])

    return(
        <div className="p-10">

            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Realiza la reservació para tu paciente</label>
            <select 
                name="name" 
                id="name"
                value={form.name}
                onChange={onChange}
                className="w-full bg-white rounded border py-3 bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            >
                <option value="">Selecciona un paciente</option>
                {
                    customers.map(item => <option value={item.id} key={item.id}>{item.get('name')}</option> )
                }
            </select>

            <label htmlFor="type" className="leading-7 text-sm text-gray-600">Terapia</label>
            <select 
                name="type" 
                id="type"
                value={form.type}
                onChange={onChange}
                className="w-full bg-white rounded border py-3 bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            >
                <option value="">Selecciona un tipo de terapia</option>
                <option>Fisioterapia</option>
                <option>Alineacion de chakras</option>
                <option>Regreción</option>
            </select>

            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Fecha de sesión</label>
            <input 
                type="date" 
                placeholder="02/11/2020"
                id="date"
                min={new Date().toISOString().split("T")[0]}
                value={form.date}
                onChange={onChange}
                name="date" 
                className="w-full bg-white rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
           
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Hora de la sesión</label>
            <input 
                type="time" 
                placeholder="00:00"
                id="time" 
                value={form.time}
                onChange={onChange}
                name="time" 
                className="w-full bg-white rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            <br/>
            {
                !loading ? 
                <div className="w-full text-right px-24 py-2 ">
                    {
                        selected === null ? 
                            <button 
                                onClick={()=> onSubmit()}
                                className="absolute ml-1 mt-2 rounded-xl text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600"
                            > 
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </button>   
                        :
                            <button 
                                onClick={() => onUpdate()}
                                className="absolute ml-1 mt-2 rounded-xl text-white bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-600"
                            > 
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>  
                    }
                    <button 
                        onClick={() => clear()}
                        className="absolute ml-12 mt-2 rounded-xl text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600"
                    > 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                : <Loader/>
            }
            
        </div>
    )
}