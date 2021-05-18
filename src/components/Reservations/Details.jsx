import React, { useState, useEffect } from 'react'
import { disSelectDetail, disSelectReservation, registerDetail } from '../../actions/reservations'
import { useDispatch, useSelector } from 'react-redux';
import { validateDetailForm } from '../../validators/pacients';
import { formatDate } from '../../helpers/formaters';

export default function Details () {
    const dispatch = useDispatch();
    const initial = {title:'', description:'', comment:''}
    const { details } = useSelector(state => state.reservationReducer);
    const [form, changeForm] = useState(initial);
    const onChange = e => changeForm({...form, [e.target.name]:e.target.value})
    const onClose = () => {
        dispatch(disSelectReservation())
        dispatch(disSelectDetail())
    }
    const onSubmit = () => {
        if(!validateDetailForm(form)){return}
        form.id = details.id;
        dispatch(registerDetail(form))
        changeForm(initial)
        dispatch(disSelectReservation())
        dispatch(disSelectDetail())
    }

    useEffect(() => {
        if(details !== null){
            changeForm({
                title: details.get('title') || '',
                description: details.get('description') || '',
                comment: details.get('comment') || ''
            })
        }
    }, [details])

    return (
        <div className="p-10">
            <p> Paciente: 
                <strong> { details.get('pacient').get('name')} </strong>
            </p>
            <p>
                <span className="text-gray-400 text-sm">
                    {formatDate(details.get('date'))} {details.get('time')}
                </span>
            </p>
            <br/>
            <label htmlFor="title" className="leading-7 text-sm text-gray-600">Titulo</label>
            <input 
                type="text" 
                placeholder="Titulo de la terapia"
                id="title"
                name="title"
                value={form.title}
                onChange={onChange}
                className="w-full bg-white rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            <label htmlFor="description" className="leading-7 text-sm text-gray-600">Comentarios Pre sesión</label>
            <textarea 
                type="text" 
                placeholder="Descripción de la terapia"
                id="description" 
                name="description" 
                rows="5" cols="80"
                value={form.description}
                onChange={onChange}
                className="w-full bg-white rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            <label htmlFor="comment" className="leading-7 text-sm text-gray-600">Comentario Pos sesión</label>
            <textarea 
                type="text" 
                placeholder="Comentarios ..."
                id="comment" 
                name="comment"
                rows="5" cols="80"
                value={form.comment}
                onChange={onChange}
                className="w-full bg-white rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            
            <br/>
            <div className="w-full text-right px-24 py-2 ">
                <button 
                    onClick={()=> onSubmit()}
                    className="absolute ml-1 mt-2 rounded-xl text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600"
                > 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </button>   
                <button 
                    className="absolute ml-12 mt-2 rounded-xl text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600"
                    onClick={() => onClose()}
                > 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )
}