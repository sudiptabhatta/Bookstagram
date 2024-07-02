import * as yup from 'yup';

export const userSchema = yup.object().shape({
  email: yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"Invalid email address").required('Email is required'),
  fullname: yup.string().min(2, 'Full name must be at least 2 characters long').required('Full name is required'),
  username: yup.string().min(5, 'Username must be at least 5 characters long').max(20, 'Username must be less than 20 characters long').required('Username is required'),
  password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ).required('Password is required'),
  confirm_password: yup.string().oneOf([yup.ref('password')], 'Passwords doesn\'t match').required('Pasword confirmation is required'),
})