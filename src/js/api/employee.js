import base from '@/js/api/base.js'
import axios from "axios";
export default {
    updateEmployee(param){
        return axios.put(`${base.url}/Employee`, param);
    },
    getEmployee(id){
        return axios.get(`${base.url}/Employee/${id}`);
    },
    getPositionByID(id){
        return axios.get(`${base.url}/Position/${id}`);
    },
    getDepartmentByID(id){
        return axios.get(`${base.url}/Department/${id}`);
    },
    getContactByEmployeeID(id){
        return axios.get(`${base.url}/Contract/getByEmployeeID/${id}`);
    }
}