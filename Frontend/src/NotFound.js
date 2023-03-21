
import React from 'react';
import { Typography, Container } from '@material-ui/core';


const NotFound = () => {
    return (
      <Container>
        <Typography variant="h4" component="h1">
          Page Not Found
        </Typography>
        <Typography variant="subtitle1">
          Sorry, the page you are looking for does not exist.
        </Typography>
      </Container>
    );
  };

  export default NotFound;
