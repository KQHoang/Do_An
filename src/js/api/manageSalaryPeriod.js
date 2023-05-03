import base from '@/js/api/base.js'
import axios from "axios";
export default {
    getPagingSalaryPeriod(pageRequest){
        return axios.post(`${base.url}/SalaryPeriod/paging`, pageRequest);
    },
    insertSalaryPeriod(param){
        return axios.post(`${base.url}/SalaryPeriod`, param);
    },
    updateSalaryPeriod(param){
        return axios.put(`${base.url}/SalaryPeriod`, param);
    },
    deleteSalaryPeriod(id){
        return axios.delete(`${base.url}/SalaryPeriod/${id}`);
    },
    getAllEmployee(){
        return axios.get(`${base.url}/Employee`);
    },
    
}