import axios from '../config/axiosInterceptor';

export const UserFollowService = async (loggedinUsername, selectedUsername) => {
    const payload = {
        "user1": loggedinUsername,
        "user2": selectedUsername
    }

    try {
        const response = await axios.post('bookbrowse/follow-unfollow/', payload);
        return response
    } catch(error) {
        if(error.response && error.response.data.error) {
            throw new Error(error.response.data.error)
        } else {
            throw new Error('Unknown Exception occurred.')
        }
    }
}

export const UserUnfollowService = async (loggedinUsername, selectedUsername) => {
    const payload = {
        "data": {
            "user1": loggedinUsername,
            "user2": selectedUsername
        }
    }

    try {
        const response = await axios.delete('bookbrowse/follow-unfollow/', payload);
        return response
    } catch(error) {
        throw new Error('Unknown Exception occurred.')
    }
}