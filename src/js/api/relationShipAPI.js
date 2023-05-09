import base from '@/js/api/base.js'
import axios from "axios";
export default {
    insertRelationShip(param){
        return axios.post(`${base.url}/RelationShip`, param);
    },
    updateRelationShip(param){
        return axios.put(`${base.url}/RelationShip`, param);
    },
    deleteRelationShip(id){
        return axios.delete(`${base.url}/RelationShip/${id}`);
    },
}