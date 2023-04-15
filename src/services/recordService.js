import axios from "axios";

const baseUrl = "http://localhost:3002/api/records"
// const baseUrl = "http://192.168.157.22:3001/api/records"

const createRecord = async (payload) => {
    const resp = await axios.post(baseUrl, payload)

    return resp.data
}

const getTotal = async () => {
    const resp = await axios.get(baseUrl)
    console.log(resp.data[0])
    return resp.data[0]
}

export {
    createRecord,
    getTotal
}