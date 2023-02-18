import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const CHeader = ({ header, body='' }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5">{header}</Typography>
            </Grid>
            <Grid item xs={12}>
                {body && body}
            </Grid>
        </Grid>
    );
};

export default CHeader;