import { useSelector, useDispatch } from 'react-redux';
import { logout, setUserSession } from '../actions/login';
import { getSession } from '../helpers/session';
import { useHistory } from 'react-router-dom';

export default function Auth({children}){
    const nav = useHistory();
    const dispatch = useDispatch();
    const session = getSession('session');
    const { user } = useSelector(state => state.userReducer);

    if(user === null){
        if(session !== null){
            dispatch(setUserSession(session))
            return children;
        }else{
            dispatch(logout())
            nav.push('/');
            return null;
        }
    }else{
        return children;
    }
    
}