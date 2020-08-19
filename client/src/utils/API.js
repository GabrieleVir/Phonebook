import axios from "axios";
const headers = {
    "Content-Type": "application/json"
};
const burl = "http://localhost:8800";

export default {
    create: function(send) {
        return axios.post(`${burl}/phonebook/create`, send, {headers: headers});
    },
    fetchBySearch: function(recieve) {
        return axios.get(`${burl}/phonebook/search?search=` + recieve, {headers: headers});
    },
    fetch: function(id) {
        return axios.get(`${burl}/phonebook/fetch/` + id, {headers: headers});
    },
    update: function(id, update) {
        return axios.put(`${burl}/phonebook/edit/` + id, update, {headers: headers});
    }
};