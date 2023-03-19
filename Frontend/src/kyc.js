
import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Box, Grid, Card, CardActionArea, CardMedia, Typography,makeStyles } from '@material-ui/core';
const images = [
    {
        slug: 'jazzcash',
        url: 'https://pixabay.com/illustrations/smartphone-phone-call-mobile-4103051/',
        title: 'EasyPaisa',
        width: '33.33%',
    },
    {
        slug: 'binancepay',
        url: 'https://cdn.freebiesupply.com/logos/large/2x/binance-1-logo-png-transparent.png',
        title: 'Binance Pay',
        width: '33.33%',
    },
    {
        slug: 'visamaster',
        url: 'https://cdn.freebiesupply.com/logos/large/2x/binance-1-logo-png-transparent.png',
        title: 'Visa, MasterCard',
        width: '33.33%',
    },
];


const useStyles = makeStyles({
    cardRoot: {
      '&:hover': {
        backgroundColor: '#1976d2',
      },
    },
  });

const ImageCardBox = ({ slug, url, title, width }) => {
    
    const history = useHistory();
    const handleClick = (title, slug) => {
        debugger
        history.push({
            pathname: '/' + slug,
            state: { title: title },
        });
    };


      const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card >
                <CardActionArea className={classes.cardRoot} onClick={()=>handleClick(title,slug)}>
                    <CardMedia  component="img" image={url} alt={title} style={{ height: 200 }} />
                    <Typography variant="h6" component="h2" style={{ textAlign: 'center', padding: 16 }}>
                        {title}
                    </Typography>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

const Kyc = () => {
    const token = useSelector(state => state.authentication.token);



    if (!token) {
        return <Redirect to="/" />;
    }
    return (
        <Box style={{ padding: 16 }}>
            <Typography variant="h4" gutterBottom>
                Bank Accounts
            </Typography>
            <Grid container spacing={2}>
                {images.map((image) => (
                    <ImageCardBox key={image.slug} {...image} />
                ))}
            </Grid>
        </Box>
    );
};



export default Kyc




