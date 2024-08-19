import axios from '../config/axiosInterceptor';

export const UserSearchService = async (searchParam) => {
    try {
        const response = await axios.get(`/bookbrowse/users?search=${searchParam}`);
        return response
    } catch (error) {
        throw new Error('Unknown Exception occurred.')
    }
}