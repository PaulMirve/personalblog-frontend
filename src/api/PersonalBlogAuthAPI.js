import axios from 'axios';
import url from './url';

export default axios.create({
    baseURL: url,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('accessToken')
    }
});