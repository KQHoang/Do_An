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
    login(email, password){
        return axios.post(`${base.url}/Account/login/${email}/${password}`);
    },
    getByAccountID(id){
        return axios.get(`${base.url}/Account/${id}`);
    }, 
    changePassword(id, password, oldPassword){
        return axios.post(`${base.url}/Account/changePassword/${id}/${password}/${oldPassword}`);
    },
    checkPermission(id, systemName){
        return axios.post(`${base.url}/Account/check-permission/${id}/${systemName}`);
    },


}