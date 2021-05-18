import React, {useEffect, useState} from 'react'
import ReservationItem from '../Items/ReservationItem';
import { useDispatch, useSelector } from 'react-redux';
import { getReservations, getFilteredReservations } from '../../actions/reservations';
import Loader from '../loader';


export default function List(){

    const dispatch = useDispatch();
    const { loading, filtered } = useSelector(state => state.reservationReducer);
    const [search, changeSearch] = useState('');
    const onChange = e => changeSearch(e.target.value)
    const onSearch = () => {
        if(search.trim() !== ''){
            dispatch(getFilteredReservations(search))
        }else{
            dispatch(getReservations())
        }
    }
    useEffect(() => {
        dispatch(getReservations())
    }, []);

    return(
        <div className="p-10">
            <div className="w-full">
                <label htmlFor="search" className="text-sm text-gray-600">Buscar reservación</label>
                <br/>
                <input 
                    type="text" 
                    placeholder="Fulanito de Tal"
                    id="search" 
                    value={search}
                    onChange={onChange}
                    name="search" 
                    className="relative w-10/12 bg-white rounded-xl border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                <button 
                    onClick={()=>onSearch()}
                    className="absolute ml-1 rounded-xl text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600"
                > 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </button>
            </div>
            <div>
                <div className="mt-10 w-full">
                    <label className="leading-7 text-sm text-gray-600">Reservaciones recientes</label>
                    {!loading ?
                        filtered.map(item => <ReservationItem 
                            key={item.id} 
                            item={item}
                        />)
                    : <Loader/>}
                    <div className="flex relative pb-12">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black inline-flex items-center justify-center text-white relative z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            </div>
                            <div className="flex-grow pl-4">
                                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider font-bold">Listo...</h2>
                                <p className="leading-relaxed">Solo se muestran las ultimas 10 reservaciones 🤓, pero puedes buscar por nombre del paciente 🕵🏻‍♂️
                                .</p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}