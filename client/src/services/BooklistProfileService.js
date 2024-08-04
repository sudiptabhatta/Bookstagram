import axios from '../config/axiosInterceptor';


export const userBooklistProfileService = async (username) => {
    try {
        const response = await axios.get(`/bookbrowse/profile/${username}`)
        return response.data[0]
    } catch(error) {
        throw error
    }
}