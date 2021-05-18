import React from 'react'
import { formatDate } from '../../helpers/formaters';

export default function ProfileItem({item, index, total}){
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
            <div className="flex-grow pl-4">
                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider font-bold">No. {total-(index)} | {item.get('type')}</h2>
                <p className="leading-relaxed text-justify text-xs">{item.get('description') || "Pendiente"}</p>
                <p className="leading-relaxed text-justify">{item.get('comment') || "..."}</p>
                <p className="leading-relaxed text-xs text-gray-400">{formatDate(item.get('date')) +' '+ item.get('time')}</p>
            </div>
        </div>
    )
}