
import { Box, Paper, Typography } from '@material-ui/core';
import { Grid } from '@mui/material';
import React from 'react';

const CenterDivTemplate = ({ children, header }) => {
    return (
        <Grid  container justifyContent="center" alignItems="center" height="100vh">
            <Grid item md={5} spacing={2}>
                <Typography variant="h6" gutterBottom>
                    {header}
                </Typography>
                <Paper component={Box} p={2} variant="outlined"  >
                    {children}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default CenterDivTemplate;