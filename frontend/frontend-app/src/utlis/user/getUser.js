import axios from 'axios';

export const getUser = async(id) => {
    const response = await axios.get(`https://fashionethnic.onrender.com/userDetails/${id}`);
    return response.data;
}