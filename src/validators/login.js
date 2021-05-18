
export function validateLogin(form){
    const {user,password} = form;
    if(user.trim()=== ''){
        alert('Introduce un usuario');
        return false;
    }
    if(password.trim() === ''){
        alert('Introduce la contraseña');
        return false;
    }
    return true
}