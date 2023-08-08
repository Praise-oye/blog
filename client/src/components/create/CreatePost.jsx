import React, { useState, useEffect, useContext } from 'react';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

// Styling for the main container with margin and responsive design
const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

// Styling for the image display
const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

// Styling for the form control
const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

// Styling for the input text field
const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

// Styling for the textarea for post description
const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

// Initial values for the post form fields
const initialPost = {
    title: '',
    description: '',
    picture: '', // We don't need this here
    username: '', // We don't need this here
    categories: '',
    createdDate: new Date()
}

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

    // Handle file upload and set post data when the file changes
    useEffect(() => {
        if (file) {
            const getImage = async () => {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                // Upload the file to the server and get the response
                const response = await API.uploadFile(data);
                // Update the post object with the image URL received from the server
                setPost(prevPost => ({ ...prevPost, picture: response.data }));
            }
            getImage();
        }
    }, [file])

    // Set categories and username for the post when the location or account username changes
    useEffect(() => {
        setPost(prevPost => ({
            ...prevPost,
            categories: location.search?.split('=')[1] || 'All', // Get the category from the URL query or set to 'All'
            username: account.username // Get the username from the account context
        }));
    }, [location.search, account.username])

    // Function to save the post when the "Publish" button is clicked
    const savePost = async () => {
        await API.createPost(post); // Send the post data to the server to save
        navigate('/'); // Navigate back to the homepage after saving
    }

    // Handler for input changes (generic function for any input field)
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update the corresponding field in the post state with the new value
        setPost(prevPost => ({ ...prevPost, [name]: value }));
    }

    return (
        <Container>
            {/* Display the image */}
            <Image src={post.picture || 'https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80'} alt="post" />

            {/* Form control for file upload, title input, and publish button */}
            <StyledFormControl>
                {/* File upload button */}
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                {/* Input text field for the title */}
                <InputTextField onChange={handleChange} name='title' placeholder="Title" />
                {/* Button to publish the post */}
                <Button onClick={savePost} variant="contained" color="primary">Publish</Button>
            </StyledFormControl>

            {/* Textarea for post description */}
            <Textarea
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={handleChange}
            />
        </Container>
    )
}

export default CreatePost;
