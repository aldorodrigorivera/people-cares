export function validateReservation(form){
    const { name, date, time, type } = form;
    if(name.trim() === ''){
        alert('Selecciona un paciente');
        return false
    }
    if(type.trim() === ''){
        alert('Selecciona un tipo de terapia');
        return false
    }
    if(date.trim() === ''){
        alert('Selecciona una fecha');
        return false
    }
    if(time.trim() === ''){
        alert('Selecciona una hora');
        return false
    }
    return true
}