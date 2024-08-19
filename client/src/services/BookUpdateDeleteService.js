import axios from '../config/axiosInterceptor';

export const bookUpdateService = async (values, book_id) => {
    const formData = new FormData();
    formData.append('caption', values.caption);
    formData.append('description', values.description);
    if (values.new_book_image != null) {
        formData.append('book_image', values.new_book_image);
    }

    try {
        const response = await axios.put(`/bookbrowse/${book_id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response 
    } catch(error) {
        if(error.response && error.response.data.error) {
            throw new Error(error.response.data.error)
        } else {
            throw new Error('Unknown Exception occurred.')
        }
    }
} 


export const bookDeleteService = async (book_id) => {
    try {
        const response = await axios.delete(`/bookbrowse/${book_id}`);
        return response 
    } catch(error) {
        throw new Error('Unknown Exception occurred.')
    }
}