//import

import { styled, Box, Typography } from '@mui/material';

// Styling for the main container with a background image
const Image = styled(Box)`
    width: 100%;
    background: url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80) center/55% repeat-x #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

// Styling for the main heading
const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1;
`;

// Styling for the subheading
const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
`;

const Banner = () => {
    return (
        <Image>
            {/* Render the main heading */}
            <Heading>BLOG</Heading>
            
            {/* Render the subheading */}
            <SubHeading>Praise Oyeboade</SubHeading>
        </Image>
    )
}

export default Banner;
