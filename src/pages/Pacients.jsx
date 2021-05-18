import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Profile from '../components/Pacients/Profile';
import List from '../components/Pacients/List';
import Form from '../components/Pacients/Form';
import { useSelector } from 'react-redux';
export default function Pacients(){

    const {formVisible, selected} = useSelector(state => state.pacientReducer)
    
    return(
        <div>
            <Header/>
            <p className=" container mx-auto px-4 w-full text-5xl font-thin text-right pr-10">
                Pacientes 🙋🏻‍♂️
            </p>
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2  gap-10">
                <div>
                    {formVisible? <Form/> : <List/>}                    
                </div>
                <div>
                    { 
                        selected? 
                        <Profile/>: 
                        <div className="w-full text-2xl text-gray-400 text-center mt-24">
                            <p>Selecciona un paciente para ver su historial ... 😎</p> 
                        </div>
                    }
                </div>
            </div>
            <Footer/>
        </div>
        )
}