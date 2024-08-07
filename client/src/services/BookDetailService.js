import axios from '../config/axiosInterceptor';

export const BookDetailService = async (user_id) => {
    try {
        const response = await axios.get(`/bookbrowse/b/${user_id}`);
        return response 
    } catch(error) {
        throw error 
    }
}