import React, { useEffect } from 'react'
import ProfileItem from '../Items/ProfileItem'
import { useSelector, useDispatch } from 'react-redux';
import { disSelect, selectPacient } from '../../actions/pacients';
import { Link } from 'react-router-dom';

export default function Profile(){
    const { selected, history } = useSelector(state => state.pacientReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        if(selected){
            dispatch(selectPacient(selected))
        }
    }, [])
    return(
        <section className="text-gray-600 body-font mt-4">
            <div className="container mx-auto flex flex-wrap">
                <button 
                    onClick={() => dispatch(disSelect())}
                    className="absolute rounded-xl text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <label className="text-md text-gray-900 text-right w-full">Historial de: 
                    <span className="font-bold"> {selected.get('name')} </span>  
                </label>
                <div className="flex flex-wrap w-full mt-12">
                    <div className="md:pr-10 md:py-6">
                        {
                            history.map((item, index) => <ProfileItem  key={item.id}item={item} index={index} total={history.length}/>)
                        }
                        
                        <div className="flex relative pb-12">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black inline-flex items-center justify-center text-white relative z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            </div>
                            <div className="flex-grow pl-4">
                                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider font-bold">Proximamente...</h2>
                                <p className="leading-relaxed">Reserva su sesión  
                                    <Link 
                                        className="text-blue-500"
                                        to="/reservaciones">
                                         &nbsp;Aquí
                                    </Link>
                                .</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}