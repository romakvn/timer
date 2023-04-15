import axios from "axios";

const baseUrl = "http://localhost:3002/api/prices"
// const baseUrl = "http://192.168.157.22:3001/api/prices"


const getPrices = async () => {
    const resp = await axios.get(baseUrl)

    console.log(resp.data)

    return resp.data
}

export default {
    getPrices
}