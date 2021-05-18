import React from 'react'
import { formatPhone, getDate } from '../../helpers/formaters';
import { useDispatch } from 'react-redux';
import { selectResevation, deletReservation, selectDetail, disSelectDetail, disSelectReservation } from '../../actions/reservations';

export default function ReservationItem({ item }){
    const dispatch = useDispatch();
    const onComment = () => { 
        dispatch(disSelectDetail())
        dispatch(disSelectReservation())
        dispatch(selectDetail(item))
    }
    const onDelete = () => {
        if(window.confirm('Desea eliminar la reservación?')){
            dispatch(deletReservation(item.id))
        }
    }
    const onSelect = () => dispatch(selectResevation(item))

    return (
        <div className="flex relative pb-12">
            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 inline-flex items-center justify-center text-white relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
            <div className="flex-grow pl-4 w-full" onClick={()=>onComment()}>
                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider font-bold"> {item.get('pacient').get('name')} </h2>
                <p className="leading-relaxed text-justify text-xs">{item.get('type')} | {formatPhone(item.get('pacient').get('phone'))} 📱</p>
                <p className="leading-relaxed text-xs text-gray-400">{getDate(item.get('date'))} {item.get('time')} 📆</p>
            </div>
            <div className="absolute w-full text-right">
                <svg 
                    onClick={()=>onSelect()}
                    xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white cursor-pointer mr-2 rounded bg-green-500 p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>

                <svg 
                    onClick={()=>onDelete()}
                    xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white cursor-pointer rounded bg-red-500 p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                
            </div>
        </div>
    )
}
