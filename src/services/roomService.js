import axios from "axios";

const baseUrl = "http://localhost:3001/api/rooms"

const getRooms = async () => {
    const resp = await axios.get(baseUrl)

    return resp.data
}

const updateRooms = async (payload) => {
    const resp = await axios.put(baseUrl, payload)

    return resp.data
}

export default {
    getRooms,
    updateRooms
}