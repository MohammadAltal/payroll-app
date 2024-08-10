import React from 'react';
import Box from "@mui/material/Box";

function PageNotFound(props) {
    return (
        <Box sx={{ textAlign: 'center', mt: 25}}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for could not be found.</p>
        </Box>
    );
}

export default PageNotFound;
