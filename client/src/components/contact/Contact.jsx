//imports

import { Box, styled, Typography, Link } from '@mui/material';
import { Email } from '@mui/icons-material';

// Styling for the banner section with a background image
const Banner = styled(Box)`
    background-image: url(https://images.unsplash.com/photo-1525598912003-663126343e1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

// Styling for the wrapper section with padding
const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

// Styling for the main text with a specified color
const Text = styled(Typography)`
    color: #878787;
`;

const Contact = () => {
    return (
        <Box>
            {/* Banner section */}
            <Banner />

            {/* Wrapper section */}
            <Wrapper>
                {/* Heading */}
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                {/* Contact information */}
                <Text variant="h5">
                    Reach out to me on Email 
                    {/* Email link */}
                    <Link href="mailto:oyeboadepraise@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;
