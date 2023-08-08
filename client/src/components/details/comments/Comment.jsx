//imports

import { useContext } from "react";

import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';

import { API } from '../../../service/api';
import { DataContext } from "../../../context/DataProvider";

// Styling for the main component container
const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

// Styling for the container of each comment
const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

// Styling for the name of the comment author
const Name = styled(Typography)`
    font-weight: 600;
    font-size: 18px;
    margin-right: 20px;
`;

// Styling for the date of the comment
const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

// Styling for the delete icon
const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

const Comment = ({ comment, setToggle }) => {
    const { account } = useContext(DataContext);
    
    // Function to remove a comment
    const removeComment = async () => {
        await API.deleteComment(comment._id);
        // Call setToggle to refresh the comment section after deletion
        setToggle(prev => !prev);
    }

    return (
        <Component>
            {/* Container for comment author name, date, and delete icon (if the comment is made by the current user) */}
            <Container>
                {/* Comment author name */}
                <Name>{comment.name}</Name>
                {/* Date of the comment */}
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                {/* Delete icon, visible only for comments made by the current user */}
                { comment.name === account.username && <DeleteIcon onClick={() => removeComment()} /> }
            </Container>
            {/* Comment text */}
            <Typography>{comment.comments}</Typography>
        </Component>
    )
}

export default Comment;
