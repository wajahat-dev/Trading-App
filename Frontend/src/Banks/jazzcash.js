import {
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    makeStyles,
} from "@material-ui/core";
import hmacSHA256 from 'crypto-js/hmac-sha256';
import sha256 from 'crypto-js/sha256';
import React, { useState } from "react";
import CNotification from "../globalcomponents/CNotification";
import CLoader from "../globalcomponents/CLoader";
import { CNICValidation, PhoneValidation, generateDateTime, generateExpiryDateTime, generateSecureHash, generateSecureHashv2, getTransactionDateTime, getTransactionExpiry } from "../Globalfunc/func";
import crypto from 'crypto'
import querystring from 'querystring'
import { useHistory } from 'react-router-dom';
import { setTimeout } from "timers";

const REACT_APP_pp_Password = process.env.REACT_APP_pp_Password
const REACT_APP_pp_CNIC = process.env.REACT_APP_pp_CNIC
const REACT_APP_pp_MobileNumber = process.env.REACT_APP_pp_MobileNumber
const REACT_APP_pp_MerchantID = process.env.REACT_APP_pp_MerchantID
const REACT_APP_pp_salt = process.env.REACT_APP_pp_salt




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
        maxWidth: 500,
        margin: "auto",
    },
    title: {
        margin: theme.spacing(2),
    },
    form: {
        margin: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    input: {
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

function JazzCashCheckout() {
    const classes = useStyles();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [cnicNumber, setCnicNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loader, setLoader] = useState(false)
    const history = useHistory();


    const [globalState, setGlobalState] = useState({
        message: '',
        open: false,
        varient: 'info'
    })

    const handlePhoneNumberChange = (event) => {

        setPhoneNumber(event.target.value);
    };

    const handleCnicNumberChange = (event) => {

        setCnicNumber(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle checkout logic
    };


    const apiCalling = async () => {

        let existCon = false
        if (!phoneNumber) {
            setGlobalState(p => ({ ...p, message: 'Phone Can not be blank', open: true, varient: 'info' }))
            existCon = true
        } else if (!CNICValidation(cnicNumber)) {
            setGlobalState(p => ({ ...p, message: 'CNIC Can not be blank', open: true, varient: 'info' }))
            existCon = true
        } else if (!amount) {
            setGlobalState(p => ({ ...p, message: 'Amount Can not be blank', open: true, varient: 'info' }))
            existCon = true
        } else if (PhoneValidation(phoneNumber)) {
            setGlobalState(p => ({ ...p, message: 'Phone must be in correct format', open: true, varient: 'info' }))
            existCon = true
        }

        if (existCon) return


        setLoader(true)

        try {
            const response = await fetch(`https://localhost:7000/api/submit-jc_wallet-request`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    accept: '*/*',

                    Authorization: `Bearer ${localStorage.getItem('TOKEN_KEY')
                        ? localStorage.getItem('TOKEN_KEY')
                        : ''
                        }`,
                },
                body: JSON.stringify({
                    "emailOrUsername": "",
                    "userID": "",
                    "description": "",
                    "payload": '',
                    phoneNumber: phoneNumber, cnic: cnicNumber, amount: amount
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // if (data.pp_ResponseMessage) {
                //     setGlobalState(p => ({ ...p, varient: 'error', message: data.pp_ResponseMessage, open: true }))
                // }
                if (data.success) {
                    setCnicNumber('')
                    setPhoneNumber('')
                    setAmount('')
                    setGlobalState(p => ({ ...p, varient: 'success', message: 'Send To Admin', open: true }))
                    setTimeout(()=>{
                        history.push('/kycc')
                    }, 2000);
                }else{
                    if( data.messageBox.includes("Your Amuont is greater than balance")){
                        setGlobalState(p => ({ ...p, varient: 'info', message: data.messageBox, open: true }))
                    }else{
                        setGlobalState(p => ({ ...p, varient: 'info', message: data.messageBox, open: true }))

                    }


                }
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false)
        }
    }



    const JazzCash = () => {
        try {
            debugger
            // const INTEGRITY_KEY = REACT_APP_pp_salt
            // var payload = {
            //     "pp_Version": "1.1",
            //     "pp_TxnType": "MWALLET",
            //     "pp_Language": "EN",
            //     "pp_MerchantID": "",
            //     "pp_SubMerchantID": "",
            //     "pp_Password": "",
            //     "pp_BankID": "",
            //     "pp_ProductID": "",
            //     "pp_TxnRefNo": "",
            //     "pp_Amount": "",
            //     "pp_TxnCurrency": "PKR",
            //     "pp_TxnDateTime": "",
            //     "pp_BillReference": "billref",
            //     "pp_Description": "Description of transaction",
            //     "pp_TxnExpiryDateTime": "",
            //     "pp_ReturnURL": "",
            //     "ppmpf_1": "",
            //     "ppmpf_2": "",
            //     "ppmpf_3": "",
            //     "ppmpf_4": "",
            //     "ppmpf_5": ""
            // }
            // payload.pp_MerchantID = REACT_APP_pp_MerchantID
            // payload.pp_Password = REACT_APP_pp_Password
            // payload.pp_TxnRefNo = 'T' + getTransactionDateTime()
            // payload.pp_TxnDateTime = getTransactionDateTime()
            // payload.pp_TxnExpiryDateTime = getTransactionExpiry(30)
            // payload['pp_SecureHash'] = generateSecureHash(payload, INTEGRITY_KEY, hmacSHA256)

            // payload.ppmpf_1 = phoneNumber
            // payload.pp_Amount = amount
            // payload.pp_ReturnURL = 'https://wajahatali.vercel.app/' // must be hosted website not work in local
            // console.log(payload)
            apiCalling()
        } catch (error) {
            console.log('failed to jazzcash')
        }
    }


    return (
        <>
            <CNotification varient={globalState.varient} isOpen={globalState.open} setOpen={e => setGlobalState(p => ({ ...p, open: e }))} message={globalState.message} />
            <CLoader enabled={loader} />
            <div className={classes.root}>
                <Paper elevation={3}>
                    <Typography variant="h5" className={classes.title}>
                        JazzCash Checkout
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="phone-number"
                                    label="Phone Number"
                                    variant="outlined"
                                    fullWidth
                                    className={classes.input}
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="cnic-number"
                                    label="CNIC Number"
                                    variant="outlined"
                                    fullWidth
                                    className={classes.input}
                                    value={cnicNumber}
                                    placeholder="#####-#######-#"
                                    onChange={handleCnicNumberChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="Amount"
                                    label="Amount"
                                    variant="outlined"
                                    fullWidth
                                    className={classes.input}
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={!phoneNumber || !cnicNumber || !amount}
                            onClick={JazzCash}
                            style={{ marginBottom: 8 }}
                        >
                            Checkout
                        </Button>
                    </form>
                </Paper>
            </div>
        </>
    );
}

export default JazzCashCheckout;
