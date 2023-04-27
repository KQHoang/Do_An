import base from '@/js/api/base.js'
import axios from "axios";
export default {
    insertProfile(employee){
        return axios.post(`${base.url}/Employee`, employee);
    },
    updateProfile(employee){
        return axios.put(`${base.url}/Employee`, employee);
    },
    getPagingProfile(pageRequest){
        return axios.post(`${base.url}/Employee/paging`, pageRequest);
    },
    getProfileByID(id){
        return axios.get(`${base.url}/Employee/${id}`);
    },
    getDeleteByID(id){
        return axios.delete(`${base.url}/Employee/${id}`);
    },
    getNewCode(){
        return axios.get(`${base.url}/Employee/getCode`);
    },
    getPosition(){
        return axios.get(`${base.url}/Position`);
    },
    getDepartment(){
        return axios.get(`${base.url}/Department`);
    },

}  