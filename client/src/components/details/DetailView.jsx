// Import necessary libraries and components
import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import Comments from './comments/Comments';

// Styling for the main container
const Container = styled(Box)(({ theme }) => ({
  margin: '50px 100px',
  [theme.breakpoints.down('md')]: {
    margin: 0
  },
}));

// Styling for the image
const Image = styled('img')({
  width: '100%',
  height: '50vh',
  objectFit: 'cover'
});

// Styling for the edit icon
const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

// Styling for the delete icon
const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

// Styling for the heading
const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
`;

// Styling for the author section
const Author = styled(Box)(({ theme }) => ({
  color: '#878787',
  display: 'flex',
  margin: '20px 0',
  [theme.breakpoints.down('sm')]: {
    display: 'block'
  },
}));

// Component for displaying the detailed view of a blog post
const DetailView = () => {
  const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  // State variables
  const [post, setPost] = useState({});
  const { account } = useContext(DataContext); // Access account data from DataContext
  const navigate = useNavigate(); // Navigation hook for programmatic navigation
  const { id } = useParams(); // Access the 'id' parameter from the URL

  // Fetch the blog post data from the API when the component mounts or 'id' changes
  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, [id]); // Include 'id' in the dependency array to re-fetch data when 'id' changes

  // Function to delete the blog post
  const deleteBlog = async () => {
    await API.deletePost(post._id); // Call the API to delete the post
    navigate('/'); // Navigate back to the homepage after deletion
  };

  // JSX rendering for the detailed view
  return (
    <Container>
      {/* Display the blog post image, if available, else use a default URL */}
      <Image src={post.picture || url} alt="post" />

      {/* Show edit and delete icons if the logged-in user is the author of the post */}
      <Box style={{ float: 'right' }}>
  {(account.username === post.username || account.username === 'admin') && (
    <>
      <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
      <DeleteIcon onClick={() => deleteBlog()} color="error" />
    </>
  )}
</Box>


      {/* Display the blog post title */}
      <Heading>{post.title}</Heading>

      {/* Display the author and created date of the blog post */}
      <Author>
        {/* Link to the author's profile page */}
        <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography>Author: <span style={{ fontWeight: 600 }}>{post.username}</span></Typography>
        </Link>
        {/* Display the formatted created date */}
        <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createdDate).toDateString()}</Typography>
      </Author>

      {/* Display the blog post description */}
      <Typography>{post.description}</Typography>

      {/* Render the comments section passing the 'post' data */}
      <Comments post={post} />
    </Container>
  );
};

export default DetailView;
