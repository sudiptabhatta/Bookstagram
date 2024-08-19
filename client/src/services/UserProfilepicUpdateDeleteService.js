import axios from '../config/axiosInterceptor';

export const UserProfilepicUpdateService = async (file, username) => {
    const formData = new FormData()
    if(file != null) {
        formData.append('profile_picture', file)
    }

    try {
        const response = await axios.put(`bookbrowse/profile_picture/${username}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response
    } catch(error) {
        if(error.response && error.response.data.error) {
            throw new Error(error.response.data.error)
        } else {
            throw new Error('Unknown Exception occurred.')
        }
    }
}


export const UserProfilepicDeleteService = async (username) => {
    try {
        const response = await axios.delete(`/bookbrowse/profile_picture/${username}`);
        return response 
    } catch(error) {
        throw new Error('Unknown Exception occurred.')
    }
}