import base from '@/js/api/base.js'
import axios from "axios";
export default {
    async getProvince(){
        return axios.get(`${base.url}/PickList/Province`)
    },
    async getDistrict(id){
        return axios.get(`${base.url}/PickList/District/${id}`)
    },
    async getWards(id){
        return axios.get(`${base.url}/PickList/Wards/${id}`)
    }
}   