import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { insert, visibleForm } from '../../actions/pacients';
import { validateForm } from '../../validators/pacients';

export default function Form() {
    const dispatch = useDispatch();
    const [form, changeForm] = useState({name:'', phone:''});
    const onSubmit = () => {
        const valid = validateForm(form);
        if(!valid){return}
        dispatch(insert(form));
        dispatch(visibleForm(false));
        changeForm({name:'', phone:''});
    }
    const onChange = e => changeForm({...form, [e.target.name]:e.target.value})
    
    return(
        <div className="p-10">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Nombre del paciente</label>
            <input 
                type="text" 
                placeholder="Fulanito de Tal"
                id="name"
                value={form.name}
                onChange={onChange}
                name="name" 
                className="w-full bg-white rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Telefono celular</label>
            <input 
                type="phone" 
                placeholder="4421110000"
                id="phone" 
                maxLength="10"
                value={form.phone}
                onChange={onChange}
                name="phone" 
                className="w-full bg-white rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            <br/>
            <div className="w-full text-right px-24 py-2 ">
                <button 
                    onClick={() => onSubmit()}
                    className="absolute ml-1 mt-2 rounded-xl text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600"
                > 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                </button>   
                <button 
                    className="absolute ml-12 mt-2 rounded-xl text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600"
                    onClick={() => dispatch(visibleForm(false))}
                > 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )
}