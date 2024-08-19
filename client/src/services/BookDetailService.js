import axios from '../config/axiosInterceptor';

export const BookDetailService = async (book_id) => {
    try {
        const response = await axios.get(`/bookbrowse/b/${book_id}`);
        return response 
    } catch(error) {
        throw error 
    }
}