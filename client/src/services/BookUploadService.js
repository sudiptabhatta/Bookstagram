import axios from '../config/axiosInterceptor';

export const BookUploadService = async (values) => {
    const formData = new FormData();
    formData.append('caption', values.caption);
    formData.append('description', values.description);
    formData.append('book_image', values.book_image);


    try {
        const response = await axios.post('/bookbrowse/photo/upload/', formData, {
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