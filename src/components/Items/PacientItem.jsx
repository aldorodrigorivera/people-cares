import React from 'react'
import { formatPhone,formatDate,initialName} from '../../helpers/formaters'
import { useDispatch } from 'react-redux';
import { selectPacient } from '../../actions/pacients';


export default function PacientItem ({item}){
    const dispatch = useDispatch();
    return (
        <div 
            className="h-full flex items-center p-4 rounded-lg mr-0 md:mr-15" 
            onClick={()=> dispatch(selectPacient(item))}
        >
            <span className="w-16 h-16 bg-gray-100 object-center flex-shrink-0 rounded-full mr-4 pt-4 text-center text-lg"
            >{initialName(item.get('name'))}</span>
            <div className="flex-grow">
                <h2 className="text-gray-900 title-font font-medium">{ item.get('name') }</h2>
                <p className="text-gray-500 text-xs">{ formatPhone(item.get('phone')) } 📱</p>
                <p className="text-gray-400 text-xs capitalize">{ formatDate(item.get('createdAt'))}</p>
            </div>
        </div>
    )
}