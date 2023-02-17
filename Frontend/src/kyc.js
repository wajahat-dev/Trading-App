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
    focusVisible: {},
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

    const handleClick = (title,slug) => {
        debugger
        history.push({
            pathname: '/'+slug,
            state: { title: title },
        });
    };


    if (!token) {
        return <Redirect to="/" />;
    }
    return (

        <>
            <JazzCash />

            <div className={classes.root}>
                <Grid container spacing={2}>
                    {images.map((image) => (
                        <Grid item md={4} key={image.title}>
                            <ButtonBase
                                focusRipple
                                className={classes.image}
                                focusVisibleClassName={classes.focusVisible}
                                style={{
                                    width: image.width,
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

const JazzCash = () => {

    // const JAZZCASH_HTTP_POST_URL = 
    const INTEGRITY_KEY = "8scc0yux1z"
    var arr = []

    const [state, setState] = useState({
        "pp_Version": "1.1",
        "pp_BankID": "",
        pp_ProductID: '',
        pp_Language: "EN",
        pp_SubMerchantID: "",
        pp_TxnRefNo: "",
        pp_Amount: "10000",
        pp_Password: '',
        pp_CNIC: '',
        pp_MobileNumber: '',
        pp_MerchantID: '',
        pp_TxnType: '',
        pp_DiscountedAmount: "",
        pp_TxnCurrency: "PKR",
        pp_TxnDateTime: "",
        pp_BillReference: "BillRef",
        pp_Description: "Hello",
        pp_TxnExpiryDateTime: "",
        pp_SecureHash: "",
        ppmpf_1: "",
        ppmpf_2: "",
        ppmpf_3: "",
        ppmpf_4: "",
        ppmpf_5: "",
        pp_ReturnURL: ''
    })

    const secureHash = (data) => {
        const ordered = Object.keys(data).sort().reduce(
            (obj, key) => {
                obj[key] = data[key];
                return obj;
            },
            {}
        );
        var hash = ""
        Object.entries(ordered).forEach(
            ([key, value]) => {
                if (value != "") {
                    hash += '&' + value
                }
            }
        );;
        return hash;
    }

    const convertToSHA = async (string) => {
        await sha256(string).then((hash) => {
            console.log(hash);
        });
    };
    useEffect(() => {
        const caller = () => {


            try {
                debugger
                var date = new Date()
                date = date.getFullYear() + ("0" + (date.getMonth())).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours()).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2)
                var date1 = new Date()
                date1.setHours(date1.getHours() + 1);
                date1 = date1.getFullYear() + ("0" + (date1.getMonth())).slice(-2) + ("0" + date1.getDate()).slice(-2) + ("0" + date1.getHours()).slice(-2) + ("0" + date1.getMinutes()).slice(-2) + ("0" + date1.getSeconds()).slice(-2)
                var tXID = 'T' + date



                var hash = secureHash({ ...state })
                hash = INTEGRITY_KEY + hash; //Integritykey + hashString
                const hmacDigest = hmacSHA256(hash, INTEGRITY_KEY).toString();

                const statetmp = { ...state }
                statetmp.pp_TxnDateTime = date
                statetmp.pp_TxnExpiryDateTime = date1
                statetmp.pp_TxnRefNo = 'T' + date
                statetmp.pp_SecureHash = hmacDigest
                console.log('wwwwww', process)
                statetmp.pp_Password = REACT_APP_pp_Password
                statetmp.pp_CNIC = REACT_APP_pp_CNIC
                statetmp.pp_MobileNumber = REACT_APP_pp_MobileNumber
                statetmp.pp_MerchantID = REACT_APP_pp_MerchantID
                statetmp.pp_TxnType = REACT_APP_pp_MerchantID



                // pp_BillReference= 'T' + date,
                fetch(
                    'http://localhost:3001', {
                    method: "POST",
                    // mode: 'cors',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        // 'Accept': '*/*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(statetmp)
                })
                    .then(function (response) {

                        return response.json();
                    })
                    .then(function (data) {
                        setState(statetmp)
                        console.log(data.pp_ResponseMessage)
                    }).catch(err => {
                        console.log(err)
                    })
            } catch (error) {
                console.log('failed to jazzcash')
            }
        }
        caller()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    return (
        <>

        </>
    )
}



export default Kyc;
