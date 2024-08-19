import axios from '../config/axiosInterceptor';

export const BookRatingService = async (book_id, selectedValue) => {

    const payload = {
        "rating": selectedValue
    }

    try {
        const response = await axios.post(`bookbrowse/book/${book_id}/rate/`, payload);
        return response 
    } catch (error) {
        if(error.response && error.response.data.detail) {
            throw new Error(error.response.data.detail)
        } else {
            throw new Error('Unknown Exception occurred.')
        }
    }
}