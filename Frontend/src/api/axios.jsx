import axios from "axios";
const baseURL = import.meta.env.VITE_baseUrl

export const DataBase = axios.create({
    baseURL,
    headers:{
        'Content-Type':'application/json'
    }
})