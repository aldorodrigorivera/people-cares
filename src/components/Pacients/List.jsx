import React, {useEffect, useState} from 'react'
import PacientItem from '../Items/PacientItem';
import { useDispatch, useSelector } from 'react-redux';
import { visibleForm, getPatiens, filterPacients } from '../../actions/pacients';
import Loader from '../loader';


export default function List(){

    const dispatch = useDispatch();
    const { loading, filtered } = useSelector(state => state.pacientReducer);
    const [search, changeSearch] = useState("");
    const onChange = e => changeSearch(e.target.value);
    const onSearch = () => {
        if(search.trim() !== ''){
            dispatch(filterPacients(search))
        }else{
            dispatch(getPatiens())
        }
    }
    
    useEffect(() => {
        dispatch(getPatiens())
    }, []);

    return(
        <div className="p-10">
            <div className="w-full">
                <label htmlFor="search" className="text-sm text-gray-600">Buscar paciente</label>
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
                    onClick={() => onSearch()}
                    className="absolute ml-1 rounded-xl text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600"
                > 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </button>
                <button 
                    onClick={() => dispatch(visibleForm(true))}
                    className="absolute ml-12 rounded-xl text-white bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-600"
                > 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                </button>
            </div>
            <div>
                <div className="mt-10 w-full">
                    <label className="leading-7 text-sm text-gray-600">Pacientes recientes</label>
                    {!loading ?
                        filtered.map(item => <PacientItem 
                            key={item.id} 
                            item={item}
                        />)
                    : <Loader/>}
                </div>
            </div>
        </div>
    )
}