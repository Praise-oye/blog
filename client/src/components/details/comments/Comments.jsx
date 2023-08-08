//imports

import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';

import { API } from '../../../service/api';

//components
import Comment from './Comment';

// Styling for the main container
const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

// Styling for the user's profile image
const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

// Styling for the textarea for entering comments
const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

// Initial values for a new comment
const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    // URL for the user's profile image (default image)
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    // State variables for managing comments and new comment input
    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    // Accessing the current user account from the DataContext
    const { account } = useContext(DataContext);

    // Fetching all comments for the current post when the component mounts or toggle changes
    useEffect(() => {
        const getData = async () => {
            const response = await API.getAllComments(post._id);
            if (response.isSuccess) {
                setComments(response.data);
            }
        }
        getData();
    }, [toggle, post]);

    // Handling changes to the comment input field
    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    // Function to add a new comment
    const addComment = async() => {
        // Calling the API to save the new comment
        await API.newComment(comment);
        // Clearing the comment input after submission
        setComment(initialValue);
        // Toggling the state to refresh the comment section
        setToggle(prev => !prev);
    }
    
    return (
        <Box>
            {/* Comment input section */}
            <Container>
                {/* User's profile image */}
                <Image src={url} alt="dp" />   
                {/* Textarea for entering comments */}
                <StyledTextArea 
                    rowsMin={5} 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                {/* Post button */}
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</Button>             
            </Container>
            {/* Displaying all comments */}
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;
