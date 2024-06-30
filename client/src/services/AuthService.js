import axios from '../config/axiosInstance';

const signupService = async (values) => {
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('fullname', values.fullname);
    formData.append('username', values.username);
    formData.append('password', values.password);
    formData.append('confirm_password', values.confirm_password);

    try {
        const response = await axios.post('/auth/signup/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data  

    } catch (error) {
        throw error
    }
}

export default signupService;