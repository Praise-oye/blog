import { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

// Import the API object from the service/api module
import { API } from '../../../service/api';

// Import the Post component
import Post from './Post';

// Posts component displays a list of posts
const Posts = () => {
    // State to store the fetched posts
    const [posts, getPosts] = useState([]);

    // Get the category parameter from the URL using useSearchParams hook
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        // Fetch posts based on the selected category
        const fetchData = async () => {
            // Call the API function getAllPosts with the category parameter
            let response = await API.getAllPosts({ category: category || '' });
            if (response.isSuccess) {
                // Update the state with the fetched posts
                getPosts(response.data);
            }
        }
        fetchData();
    }, [category]);

    return (
        <>
            {
                // If there are posts, map through them and render the Post component
                posts?.length ? posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`details/${post._id}`}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )) : (
                    // If no posts are available for the selected category, display a message
                    <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
                        No data is available for the selected category
                    </Box>
                )
            }
        </>
    )
}

export default Posts;
