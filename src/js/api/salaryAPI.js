import base from '@/js/api/base.js'
import axios from "axios";
export default {
    getForPersonal(id, customFilter){
        return axios.get(`${base.url}/SalaryPeriod/getForPersonal/${id}/${customFilter.month}/${customFilter.year}`);
    },
    export(id, customFilter){
        return `${base.url}/SalaryPeriod/export/${id}/${customFilter.month}/${customFilter.year}`;
    }
}