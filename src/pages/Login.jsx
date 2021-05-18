import React,{useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { validateLogin } from '../validators/login';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetPassword } from '../actions/login';
import Loader from '../components/loader';
import { getSession } from '../helpers/session';
export default function Login(){
    const [form, changeForm] = useState({user:'',password:''});
    const {loading} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const nav = useHistory();
    const onChange = e => changeForm({ ...form, [e.target.name]:e.target.value });
    const onSubmit = () => {
        const valid = validateLogin(form);
        if(!valid){ return; }
        dispatch(login(form, nav));
        changeForm({user:'', password:''});
    }
    const onConfirm = () => {
        var email = prompt("Introduce el correo");
        if(email === null || email.trim() === '') { return; }
        dispatch(resetPassword(email));
    }
    useEffect(() => {
       if(getSession('session') !== null){
           nav.push('/reservaciones');
           return
       }
    }, [])
    return(
        <div className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                <div className="lg:w-2/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 text-center">
                    <p className="leading-relaxed mt-4">
                        La administracion del sitio es privada, 
                        si no tienes cuenta te invitamos a retirarte
                        <Link to='/' className="text-blue-500"> OK</Link>
                    </p>
                </div>
                <div className="lg:w-3/6 md:w-1/2 bg-gray-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                    <h2 className="text-gray-900 text-4xl font-medium title-font mb-5 text-center">Inicia sesión con tu cuenta</h2>
                    <div className="relative mb-4">
                        <label 
                            htmlFor="user" 
                            className="leading-7 text-sm text-gray-600">
                             Correo electronico
                        </label>
                        <input 
                            type="text" 
                            id="user"
                            onChange={onChange}
                            value={form.user}
                            placeholder="admin@mail.com"
                            name="user" 
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="password" 
                        className="leading-7 text-sm text-gray-600">
                            Contraseña
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            onChange={onChange}
                            value={form.password}
                            placeholder="Admin123"
                            name="password" 
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    {
                        !loading ? 
                            <button 
                                disabled={loading}
                                className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                                onClick={() => onSubmit()}
                            >Iniciar sesión 👀</button>
                        : <Loader/>
                    }
                    
                    <p 
                        className="text-sm text-blue-500 mt-3 cursor-pointer"
                        onClick={()=> onConfirm()}
                    >Resetar Contraseña 😅</p>
                </div>
            </div>
        </div>
    )
}