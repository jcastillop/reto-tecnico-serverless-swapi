import axios from 'axios';

const swApi = axios.create({
    baseURL: '/api'
});


export default swApi;