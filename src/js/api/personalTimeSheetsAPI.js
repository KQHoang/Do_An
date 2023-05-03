import base from '@/js/api/base.js'
import axios from "axios";
export default {
    getAllTimeSheets(id, customFilter){
        return axios.get(`${base.url}/TimeSheets/getForPersonal/${id}/${customFilter.month}/${customFilter.year}`);
    }
}