import base from '@/js/api/base.js'
import axios from "axios";
export default {
    getPagingPosition(pageRequest){
        return axios.post(`${base.url}/Position/paging`, pageRequest);
    },
    insertPosition(param){
        return axios.post(`${base.url}/Position`, param);
    },
    updatePosition(param){
        return axios.put(`${base.url}/Position`, param);
    },
}