import base from '@/js/api/base.js'
import axios from "axios";
export default {
    getPagingSalary(pageRequest){
        return axios.post(`${base.url}/Salary/paging`, pageRequest);
    },
    insertSalary(param){
        return axios.post(`${base.url}/Salary`, param);
    },
    updateSalary(param){
        return axios.put(`${base.url}/Salary`, param);
    },
    deleteSalary(id){
        return axios.delete(`${base.url}/Salary/${id}`);
    },
    getAllEmployee(){
        return axios.get(`${base.url}/Employee`);
    },
    checkReferenceSalary(id){
        return axios.get(`${base.url}/Salary/checkReferenceSalary/${id}`);
    }
}