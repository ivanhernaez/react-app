import axios from "axios";

const baseUrl = "http://localhost:5028/api/"

const configHeaders = {
    "content-type": "application/json",
    "Accept": "application/json",
};

export default {


    customer(url = baseUrl + 'customer/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: (id, data) => axios.delete(url + id, {data : data})
        }
    }
}