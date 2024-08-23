import axios from '../config/axiosInterceptor';

export const FollowerListService = async (username) => {
    try {
        const response = await axios.get(`bookbrowse/followers/${username}/`);
        return response; 
    } catch(error) {
        throw error 
    }
}


export const FollowingListService = async (username) => {
    try {
        const response = await axios.get(`bookbrowse/following/${username}/`);
        return response; 
    } catch(error) {
        throw error 
    }
}
