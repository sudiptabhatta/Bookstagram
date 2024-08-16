import axios from '../config/axiosInterceptor';


export const userBooklistProfileService = async (username, page=1, page_size=6) => {
    try {
        const response = await axios.get(`/bookbrowse/profile/${username}?page=${page}&page_size=${page_size}`)
        return response.data[0]
    } catch(error) {
        throw error
    }
}