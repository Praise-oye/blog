//imports

import { AppBar, Toolbar, styled } from '@mui/material'; 
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

// Styling for the AppBar component
const Component = styled(AppBar)`
    background: #FFFFFF;
    color: black;
`;

// Styling for the Toolbar component
const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
    }
`

const Header = () => {
    // Hook for navigation
    const navigate = useNavigate();

    // Function to handle user logout
    const logout = async () => navigate('/account');
        
    return (
        <Component>
            <Container>
                {/* Link to the Home page */}
                <Link to='/'>HOME</Link>
                {/* Link to the About page */}
                <Link to='/about'>ABOUT</Link>
                {/* Link to the Contact page */}
                <Link to='/contact'>CONTACT</Link>
                {/* Link to log out the user */}
                <Link to='/account' onClick={() => logout()}>LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header;
