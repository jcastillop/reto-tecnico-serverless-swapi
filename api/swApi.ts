import axios from 'axios';
//usando axios para conectarse a swApi 
const swApi = axios.create({
    baseURL: '/api'
});
export default swApi;