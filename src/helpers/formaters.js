
import * as moment from 'moment-timezone';

export const formatPhone = phone => {
    let cleaned = ('' + phone).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };
}

export const formatDate = createdAt => {
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(createdAt);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(createdAt);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(createdAt);
    return `${da}/${mo}/${ye} 📆`.toUpperCase()
}

export const initialName = name => {
    let pre = name?.split(' ')[0][0].toUpperCase();
    if(name?.split(' ').length > 1 ){
        pre+=name?.split(' ')[1][0].toUpperCase();
    }
    return pre;
}

export const getDate = date => moment(date).format('yyyy-MM-DD');

export const getTime = date => moment(date).tz("America/Mexico_City").format('HH:MM');

export const getShortTime = date => moment(date).tz("America/Mexico_City").format('HH A');

export const preInsertDate = form => new Date(form.date)

