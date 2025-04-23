import axios from 'axios';

export const getUser = async(id) => {
    const response = await axios.get(`https://fashionethnic.onrender.com/api/users/userDetails/${id}`);
    return response.data;
}