import base from '@/js/api/base.js'
import axios from "axios";
export default {
    getPagingContract(pageRequest){
        return axios.post(`${base.url}/Permission/paging`, pageRequest);
    },
    insertPermission(id, param){
        return axios.post(`${base.url}/AccountPermission/insetCustom/${id}`, param);
    },
    updatePermission(id, param){
        return axios.post(`${base.url}/AccountPermission/updateCustom/${id}`, param);
    },
    deletePermission(id){
        return axios.delete(`${base.url}/AccountPermission/${id}`);
    },
    getAllEmployee(){
        return axios.get(`${base.url}/Account/getAccountCustom`);
    },
    getPermissionByAccountID(id){
        return axios.get(`${base.url}/AccountPermission/getCustom/${id}`);
    }
}