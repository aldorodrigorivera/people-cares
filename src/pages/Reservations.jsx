import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Form from '../components/Reservations/Form'
import List from '../components/Reservations/List'
import { useSelector } from 'react-redux'
import Details from '../components/Reservations/Details'

export default function Reservations(){

    const {details} = useSelector(state => state.reservationReducer)

    return(
        <div>
            <Header/>
            <p className=" container mx-auto px-4 w-full text-5xl font-thin text-right pr-10">
                Reservaciones 📆
            </p>
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2  gap-10">
                <div>
                    {
                        details !== null ?
                         <Details/>
                        :
                         <Form/> 
                    }
                                     
                </div>
                <div>
                    <List/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}