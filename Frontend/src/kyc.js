import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePosition } from './store/actions/current-position';
import { createPosition, exitPosition } from './store/actions/positions';
import { createInstance } from './store/actions/ledger';
import CryptoJS from 'crypto-js'
import crypto from 'crypto-js'
import hmacSHA256 from 'crypto-js/hmac-sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import enc_utf8 from 'crypto-js/enc-utf8';
import Utf8 from 'crypto-js/enc-utf8';
import sha256 from 'crypto-js/sha256';
import { Button, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useHistory } from 'react-router-dom';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';


const REACT_APP_pp_Password = process.env.REACT_APP_pp_Password
const REACT_APP_pp_CNIC = process.env.REACT_APP_pp_CNIC
const REACT_APP_pp_MobileNumber = process.env.REACT_APP_pp_MobileNumber
const REACT_APP_pp_MerchantID = process.env.REACT_APP_pp_MerchantID




const images = [{ slug: 'jazzcash', url: 'https://pixabay.com/illustrations/smartphone-phone-call-mobile-4103051/', title: 'EasyPaisa', width: '33.33%', },
// { slug: 'binancepay', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Skrill_Logo.svg/1200px-Skrill_Logo.svg.png', title: 'Skrill', width: '33.33%', },
{ slug: 'binancepay', url: 'https://cdn.freebiesupply.com/logos/large/2x/binance-1-logo-png-transparent.png', title: 'Binance Pay', width: '33.33%', },
{ slug: 'visamaster', url: 'https://cdn.freebiesupply.com/logos/large/2x/binance-1-logo-png-transparent.png', title: 'Visa, MasterCard', width: '33.33%', },];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
        marginTop: '20px'
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,

            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,

            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {
      
    },
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.5,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));


const Kyc = ({ authenticated, setAuthenticated }) => {
    const token = useSelector(state => state.authentication.token);
    const [globalState, setGlobalState] = useState({
        formData: {

        }
    })

    const handleSubmit = (e) => {

    }


    const handleChange = (name, value) => {
        debugger
        setGlobalState(p => ({ ...p, formData: { ...p.formData, [name]: value } }))
    }

    const classes = useStyles();
    const history = useHistory();

    const handleClick = (title, slug) => {
        debugger
        history.push({
            pathname: '/' + slug,
            state: { title: title },
        });
    };


    if (!token) {
        return <Redirect to="/" />;
    }
    return (

        <>    

            <div className={classes.root}>
                <Grid container spacing={2}>
                    {images.map((image) => (
                        <Grid item md={4} key={image.title}>
                            <ButtonBase
                                focusRipple
                                className={classes.image}
                                // focusVisibleClassName={classes.focusVisible}
                                style={{
                                    width: image.width,
                                    backgroundColor: '#2196f3',
                                    color: 'rgb(0,0,0)',
                                }}
                                onClick={() => handleClick(image.title, image.slug)}
                            >
                                <span
                                    className={classes.imageSrc}
                                    style={{
                                        backgroundImage: `url(${image.url})`,
                                    }}
                                />
                                <span className={classes.imageBackdrop} />
                                <span className={classes.imageButton}>
                                    <Typography
                                        component="span"
                                        variant="subtitle1"
                                        color="inherit"
                                        className={classes.imageTitle}
                                    >
                                        {image.title}
                                        <span className={classes.imageMarked} />
                                    </Typography>
                                </span>
                            </ButtonBase>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
        // <div>

        //     {/* <form onSubmit={handleSubmit}>
        //   <input
        //     type='text'
        //     placeholder='Full Name'
        //     name={'name'}
        //     value={globalState.formData.name}
        //     onChange={e => {
        //       debugger
        //       handleChange(e.target.name, e.target.value)
        //     }}
        //     required
        //   />
        //   <input
        //     name={'email'}
        //     type='email'
        //     placeholder='Email'
        //     value={globalState.formData.email}
        //     onChange={e => handleChange(e.target.name, e.target.value)}
        //     required
        //   />

        //   <Button onClick={handleSubmit}>Sign Up</Button>
        //   <Link to="/login">
        //     <Button>
        //       Log in
        //     </Button>
        //   </Link>
        // </form> */}

        // </div>
    );
}




export default Kyc;
