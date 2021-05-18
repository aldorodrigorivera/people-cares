import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/login';
import { ReactComponent as Logo } from '../logo.svg';
import { disSelectReservation } from '../actions/reservations';
import { disSelect } from '../actions/pacients';

export default function Header (){
    const nav = useHistory();
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(disSelect());
        dispatch(disSelectReservation());
        dispatch(logout());
        nav.push('/');
    }
    return(
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                    <Link 
                        className="mr-5 hover:text-gray-900" 
                        to='/reservaciones'
                    > Reservaciones 📆</Link>
                    <Link
                        className="mr-5 hover:text-gray-900"
                        to='/pacientes'
                    > Pacientes 🙋🏻‍♂️</Link>
                </nav>
                <a href="#!" className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
                    <Logo/>
                    <span className="ml-3 text-xl"></span>
                </a>
                <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                    <button 
                        onClick={()=> onLogout()}
                        className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                        Cerrar sesión ✌🏻
                    </button>
                </div>
            </div>
        </header>
    )
}