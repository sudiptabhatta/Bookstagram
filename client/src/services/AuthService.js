import axios from '../config/axiosInterceptor';

export const signupService = async (values) => {
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
        if(error.response && error.response.data) {
            throw new Error(error.response.data.errors[0])
        } else {
            throw new Error("Registration failed!")
        }
    }
}

export const loginService = async (credentials) => {
    try {
        const response = await axios.post('/auth/login/', credentials)
        return response
    } catch(error) {
        throw error
    }
}