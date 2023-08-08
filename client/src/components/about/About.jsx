//imports
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Email } from '@mui/icons-material';

// Banner styled with background-image, width, height, background-position, and background-size
const Banner = styled(Box)`
    background-image: url(https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

// Wrapper styled with padding, margin-top, and text-align
const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 30px;
        text-align: center;
    }
`;

// Text styled with color
const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {
    return (
        <Box>
            {/* Render the Banner component with a background image */}
            <Banner/>

            {/* Render the main content of the About page */}
            <Wrapper>
                {/* Display the name as the main heading */}
                <Typography variant="h3">Praise Oyeboade</Typography>

                {/* Display a brief introduction */}
                <Text variant="h5">My name is Oyeboade Praise. I am currently enrolled at HyperionDev.
                    I am learning to be a web developer. My core languages are html, css, javascript (React),
                    and the MERN stack. I possess a practical approach to problem-solving and excellent leadership skills.
                    I am currently seeking a work opportunity that will provide me the opportunity to capitalize on my skills.
                    I am open to learning new skills. You can view some of my favorite projects here
                    {/* Link to the GitHub profile */}
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/Praise-oye" color="inherit" target="_blank">
                            <GitHub />
                        </Link>
                    </Box>
                    {/* Provide a way to contact via email */}
                    or send me an Email 
                    <Link href="mailto:oyeboadepraise@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;
