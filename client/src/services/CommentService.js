import axios from '../config/axiosInterceptor';


export const CommentService = async (values, book_id) => {
    const formData = new FormData();
    formData.append('comment', values.comment_data.comment);

    try {
        const response = await axios.post(`/bookbrowse/book/${book_id}/comment/`, formData);
        return response 
    } catch(error) {
        if(error.response && error.response.data.error) {
            throw new Error(error.response.data.error)
        } else {
            throw new Error('Unknown Exception occurred.')
        }
    }

}