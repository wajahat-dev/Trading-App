import {
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { setTimeout } from "timers";
import CNotification from "./globalcomponents/CNotification";
import CLoader from "./globalcomponents/CLoader";
import { EmailValidation } from "./Globalfunc/func";




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

function Amount() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
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

        setEmail(event.target.value);
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
        if (!email) {
            setGlobalState(p => ({ ...p, message: 'Email Can not be blank', open: true, varient: 'info' }))
            existCon = true
        } 
        else if (EmailValidation(email)) {
            setGlobalState(p => ({ ...p, message: 'Email must in correct format', open: true, varient: 'info' }))
            existCon = true
        } else if (!amount) {
            setGlobalState(p => ({ ...p, message: 'Amount Can not be blank', open: true, varient: 'info' }))
            existCon = true
        }

        if (existCon) return


        setLoader(true)

        try {
            const response = await fetch(`${process.env.React_APP_BASEURLPARTIAL}/transaction/sentamounttoothers`, {
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
          
                    UserEmail: email,Amount: amount
                }),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.success) {
                    setCnicNumber('')
                    setEmail('')
                    setAmount('')
                    setGlobalState(p => ({ ...p, varient: 'success', message: data.messageBox, open: true }))
                    // setTimeout(()=>{
                    //     history.push('/kycc')
                    // }, 2000);
                }else{
                    // if( data.messageBox.includes("Your Amuont is greater than balance")){
                    //     setGlobalState(p => ({ ...p, varient: 'info', message: data.messageBox, open: true }))
                    // }else{

                    // }
                    setGlobalState(p => ({ ...p, varient: 'info', message: data.messageBox, open: true }))
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
                        Sent Amount To Other
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    className={classes.input}
                                    value={email}
                                    onChange={handlePhoneNumberChange}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
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
                            </Grid> */}
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
                            disabled={!email || !amount}
                            onClick={JazzCash}
                            style={{ marginBottom: 8 }}
                        >
                            Send
                        </Button>
                    </form>
                </Paper>
            </div>
        </>
    );
}

export default Amount;
