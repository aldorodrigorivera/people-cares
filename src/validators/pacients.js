
export function validateForm(form){
    const { name, phone } = form;
    if(name.trim()=== ''){
        alert('Introduce el nombre del ');
        return false;
    }
    if(phone.trim() === ''){
        alert('Introduce el celular del paciente');
        return false;
    }
    if(phone.length < 10 && phone.length > 11){
        alert('Introduce el celular un celular valido');
        return false; 
    }
    return true
}

export function validateDetailForm(form){
    const { title, description, comment } = form;
    if(title.trim() === ''){
        alert('Ingresa un titulo');
        return false;
    }
    if(description.trim() === ''){
        alert('Ingresa una descripción');
        return false;
    }
    if(comment.trim() === ''){
        alert('Ingresa un comentario');
        return false;
    }
    return true
}