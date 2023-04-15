import axios from "axios";

const baseUrl = "http://localhost:3002/api/rooms"
// const baseUrl = "http://192.168.157.22:3001/api/rooms"


const getRooms = async () => {
    const resp = await axios.get(baseUrl)

    console.log(resp.data)

    return resp.data
}

const updateRooms = async (payload) => {
    const resp = await axios.put(baseUrl, payload)

    console.log(resp.data)

    return resp.data
}

export default {
    getRooms,
    updateRooms
}