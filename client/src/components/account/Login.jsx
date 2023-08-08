//Imports
import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

// Styling for the main container of the component
const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

// Styling for the image inside the login/signup form
const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

// Styling for the wrapper containing the login/signup fields
const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

// Styling for the login button
const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

// Styling for the signup button
const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

// Styling for the text inside the form
const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

// Styling for displaying error messages
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

// Initial values for the login and signup form fields
const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
    // State variables to hold the form data and error message
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    // URL of the image to be displayed in the login/signup form
    const imageURL = 'https://revenuearchitects.com/wp-content/uploads/2017/02/Blog_pic-1030x584.png';

    useEffect(() => {
        // Clear the error message whenever the login form values change
        showError(false);
    }, [login])

    // Handler for login form field changes
    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    // Handler for signup form field changes
    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    // Function to handle user login
    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            // If login is successful, store access and refresh tokens in session storage,
            // update the user account in the data context, set user as authenticated,
            // clear the login form, and navigate to the home page
            showError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            isUserAuthenticated(true)
            setLogin(loginInitialValues);
            navigate('/');
        } else {
            // If login fails, show the error message
            showError('Something went wrong! please try again later');
        }
    }

    // Function to handle user signup
    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            // If signup is successful, clear the signup form and toggle to login view
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            // If signup fails, show the error message
            showError('Something went wrong! please try again later');
        }
    }

    // Function to toggle between login and signup view
    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    return (
        <Component>
            <Box>
                {/* Display the image */}
                <Image src={imageURL} alt="blog" />

                {/* Render login or signup view based on the 'account' state */}
                {account === 'login' ?
                    <Wrapper>
                        {/* Login form fields */}
                        <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name='username' label='Enter Username' />
                        <TextField variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />

                        {/* Display error message if any */}
                        {error && <Error>{error}</Error>}

                        {/* Login button */}
                        <LoginButton variant="contained" onClick={() => loginUser()} >Login</LoginButton>

                        {/* Text */}
                        <Text style={{ textAlign: 'center' }}>OR</Text>

                        {/* Signup button */}
                        <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                    </Wrapper> :
                    <Wrapper>
                        {/* Signup form fields */}
                        <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label='Enter Name' />
                        <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                        <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />

                        {/* Signup button */}
                        <SignupButton onClick={() => signupUser()} >Signup</SignupButton>

                        {/* Text */}
                        <Text style={{ textAlign: 'center' }}>OR</Text>

                        {/* Login button */}
                        <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                    </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login;
