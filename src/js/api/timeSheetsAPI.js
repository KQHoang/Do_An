import base from '@/js/api/base.js'
import axios from "axios";
export default {
    getPagingTimeSheets(pageRequest){
        return axios.post(`${base.url}/TimeSheets/paging`, pageRequest);
    },
    insertTimeSheets(param){
        return axios.post(`${base.url}/TimeSheets`, param);
    },
    updateTimeSheets(param){
        return axios.put(`${base.url}/TimeSheets`, param);
    },
    deleteTimeSheets(id){
        return axios.delete(`${base.url}/TimeSheets/${id}`);
    },
    getAllEmployee(){
        return axios.get(`${base.url}/Employee`);
    }
}