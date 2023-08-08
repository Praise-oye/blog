import { styled, Box, Typography } from '@mui/material';

// Styling for the container component
const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 350px;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

// Styling for the image component
const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

// Styling for the text component
const Text = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

// Styling for the heading component
const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600
`;

// Styling for the details component
const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;

// Post component displays a post with its details
const Post = ({ post }) => {
    // Set the URL for the post image, use a default image if not provided
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';

    // Function to add ellipsis to a string if it exceeds a character limit
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    }

    return (
        <Container>
            {/* Display the post image */}
            <Image src={url} alt="post" />
            {/* Display the post categories */}
            <Text>{post.categories}</Text>
            {/* Display the post title with ellipsis */}
            <Heading>{addEllipsis(post.title, 20)}</Heading>
            {/* Display the post author */}
            <Text>Author: {post.username}</Text>
            {/* Display the post description with ellipsis */}
            <Details>{addEllipsis(post.description, 100)}</Details>
        </Container>
    )
}

export default Post;
