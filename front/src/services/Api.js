import axios from "axios";

const Api = axios.create({
    baseURL: 'http://127.0.0.1:8989/api',
});

export default Api;