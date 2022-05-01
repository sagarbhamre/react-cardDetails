import axios from 'axios';


/* this is custom axios instance created for our app */
const instance = axios.create({
    baseURL: 'https://run.mocky.io/v3/0b14a8da-5fc7-4443-8511-53d687399bc9'
    //baseURL: 'https://jsonplaceholder.typicode.com'
});

/* setting up header values */
instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Origin'] = 'https://instacred.me';

// instance.interceptors.request...

export default instance;