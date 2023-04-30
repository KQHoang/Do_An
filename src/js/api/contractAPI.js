import base from '@/js/api/base.js'
import axios from "axios";
export default {
    getPagingContract(pageRequest){
        return axios.post(`${base.url}/Contract/paging`, pageRequest);
    },
    insertContract(param){
        return axios.post(`${base.url}/Contract`, param);
    },
    updateContract(param){
        return axios.put(`${base.url}/Contract`, param);
    },
    deleteContract(id){
        return axios.delete(`${base.url}/Contract/${id}`);
    },
    getContractByID(id){
        return axios.get(`${base.url}/Contract/${id}`);
    },
    getAllEmployee(){
        return axios.get(`${base.url}/Employee`);
    }
}