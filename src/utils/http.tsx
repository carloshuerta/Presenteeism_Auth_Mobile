import axios from 'axios';
import { environment } from '../../environment';

export const get = (url) => {
    return axios.get(`${environment.API_URL}${url}`)
}

export const post = (url, body = null) => {
    return axios.post(`${environment.API_URL}${url}`, body)
}

export const fromData = (url, fromData) => {
    console.log(fromData)
    return axios.post(`${environment.API_URL}${url}`, fromData, { 
        headers: {
          'Content-Type': 'multipart/form-data',
        }
    })
}

export const req = (options) => {
    return axios(options);
}