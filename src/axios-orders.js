import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://react-burger-7176b.firebaseio.com/'
})

export default instance;