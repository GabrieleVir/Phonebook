import axios from "axios";
const headers = {
    "Content-Type": "application/json"
};
const burl = "http://localhost:8800";

export default {
    create: function(send) {
        return axios.post(`${burl}/phonebook/create`, send, {headers: headers});
    },
};