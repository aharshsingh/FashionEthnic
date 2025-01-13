import axios from 'axios';

export const getUser = async(id) => {
    const response = await axios.get(`http://localhost:7000/userDetails/${id}`);
    return response.data;
}