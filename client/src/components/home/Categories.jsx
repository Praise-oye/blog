import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { categories } from '../../constants/data';

// StyledTable component with custom styling
const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;

// StyledButton component with custom styling
const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;

// StyledLink component with custom styling
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

// Categories component displays a table of categories
const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    
    return (
        <>
            {/* Link to the create page with the selected category */}
            <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </Link>
            
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink to={"/"}>
                                All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Map through the categories array and render each category */}
                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell>
                                    {/* Link to the home page with the selected category */}
                                    <StyledLink to={`/?category=${category.type}`}>
                                        {category.type}
                                    </StyledLink>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>
        </>
    )
}

export default Categories;
