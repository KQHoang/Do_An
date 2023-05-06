import base from '@/js/api/base.js'
import axios from "axios";
export default {
    getPagingAccount(pageRequest){
        return axios.post(`${base.url}/Account/paging`, pageRequest);
    },
    insertAccount(param){
        return axios.post(`${base.url}/Account`, param);
    },
    updateAccount(param){
        return axios.put(`${base.url}/Account`, param);
    },
    deleteAccount(id){
        return axios.delete(`${base.url}/Account/${id}`);
    },
    getAllEmployee(){
        return axios.get(`${base.url}/Employee`);
    },
}