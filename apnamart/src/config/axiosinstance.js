import axios from "axios"
// 'https://apna-mart.herokuapp.com'
// 'http://localhost:5000'
export const axiosinstance = axios.create({
    baseURL:'http://localhost:5000'
})