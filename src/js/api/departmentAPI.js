import base from '@/js/api/base.js'
import axios from "axios";
export default {
    getPagingDepartment(pageRequest){
        return axios.post(`${base.url}/Department/paging`, pageRequest);
    },
    insertDepartment(param){
        return axios.post(`${base.url}/Department`, param);
    },
    updateDepartment(param){
        return axios.put(`${base.url}/Department`, param);
    },
    deleteDepartment(id){
        return axios.delete(`${base.url}/Department/${id}`);
    },
}