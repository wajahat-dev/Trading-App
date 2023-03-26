
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { Grid } from '@mui/material';
import CNavbar from './globalcomponents/CNavbar';
import CFooter from './globalcomponents/CFooter';
import { RouteComponentProps, Link } from 'react-router-dom';
import { FormControl, Divider, InputLabel, Input, Button, Typography, Snackbar, Box, Paper } from '@material-ui/core';
import CenterDivTemplate from './globalcomponents/CenterDivTemplate';
import TypographyWithLink from './globalcomponents/TypographyWithLink';
import CLoader from './globalcomponents/CLoader';
import CNotification from './globalcomponents/CNotification';


// function PasswordResetPage() {
//     const [email, setEmail] = useState('');
//     const [resetSent, setResetSent] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Send the email to the backend to generate the reset link
//         await axios.post('/api/resetpassword', { email });

//         setResetSent(true);
//     };

//     return (
//         <>
//             <CNavbar page={'login'} />
//             <form onSubmit={handleSubmit}>
//                 <Grid container spacing={3} 
//                 //   direction="column"
//                   alignItems="center"
//                   justifyContent="center"
//                 style={{ marginTop: 7 }}>
//                     {resetSent ? (
//                         <Grid item xs={12}>
//                             <Grid item md={12} xs={12} style={{ marginTop: 7 }}>
//                                 <Typography>Reset link sent to {email}</Typography>
//                             </Grid>

//                         </Grid>
//                     ) : <>
//                         <Grid 
//                            justifyContent="center"
//                         item md={6} xs={12} style={{ marginTop: 7 }}
//                         >
// {/* <div> */}
//                             <Grid item  md={6} xs={12} style={{ marginTop: 7 }}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     id="outlined-required"
//                                     label="Email"
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     value={email}
//                                     type='email'
//                                 />
//                             </Grid>
//                             <Grid md={6} xs={12} item style={{ marginTop: 7 }}>
//                                 <Button
//                                     fullWidth
//                                     type="submit" variant="contained" color="primary">Send Reset Link</Button>

//                             </Grid>
//                         </Grid >
//                         {/* </div> */}
//                     </>}
//                 </Grid>
//             </form >
//             <CFooter />
//         </>
//     );
// }

// function ResetPasswordConfirmationPage() {
//     const [validToken, setValidToken] = useState(false);

//     const searchParams = new URLSearchParams(window.location.search);
//     const token = searchParams.get('token');

//     // Send the token to the backend to verify the reset link
//     useEffect(() => {
//         const verifyResetLink = async () => {
//             try {
//                 await axios.get(`/api/resetpassword?token=${token}`);
//                 setValidToken(true);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         verifyResetLink();
//     }, [token]);

//     return (
//         <div>
//             {validToken ? (
//                 <Typography>Reset your password here</Typography>
//             ) : (
//                 <Typography>Invalid reset link</Typography>
//             )}
//         </div>
//     );
// }

// export default PasswordResetPage;


// import { makeStyles } from '@material-ui/styles';

// import { accountsGraphQL } from './utils/accounts';
// import FormError from './components/FormError';

// const useStyles = makeStyles({
//     formContainer: {
//         display: 'flex',
//         flexDirection: 'column',
//     },
// });

const LogInLink = (props) => <Link to="/login" {...props} />;



const PasswordResetPage = (e) => {
    // const classes = useStyles();
    const [snackbarMessage, setSnackbarMessage] = ("");
    const [error, setError] = ("");
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loader, setLoader] = React.useState(false)
    const [globalState, setGlobalState] = useState({
        header: '',
        message: '',
        modal: false,
        notificationToast: false
    })

    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    useEffect(() => {
        // token
        // alert(token)
        if (token) {

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])


    const verifytoken = async (e) => {
        debugger
        if (!password) {
            setGlobalState(p => ({ ...p, message: 'Password Can not be blank', notificationToast: true, varient: 'info' }))
            return
        } else if (!confirmpassword) {
            setGlobalState(p => ({ ...p, message: 'Confirm Password Can not be blank', notificationToast: true, varient: 'info' }))
            return
        } else if (password !== confirmpassword) {
            setGlobalState(p => ({ ...p, message: 'Passwords Must Match', notificationToast: true, varient: 'info' }))
            return
        }



        setLoader(true)
        try {
            const response = await fetch(`${process.env.React_APP_BASEURLPARTIAL}/verifyresetlink?token=${token}`, {
                method: "post",
                body: JSON.stringify({
                    password: password,
                    confirmpassword: confirmpassword,
                }),
                headers: {
                    "accept": '*/*',
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('TOKEN_KEY')
                        ? localStorage.getItem('TOKEN_KEY')
                        : ''
                        }`,
                },
            });

            // if (response.ok) {
            //     const data = await response.json();
            //     if(data.success){
            //         getData()
            //         data.message && setGlobalState(p => ({ ...p,varient: 'success', message:   data.message, notificationToast: true }))
            //     }else{
            //         data.message && setGlobalState(p => ({ ...p,varient: 'warning', message:   data.message, notificationToast: true }))
            //     }
            // }
            // setGlobalState(p => ({ ...p, modal: false }))
        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false)
        }
    };



    const onSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)
        try {
            const response = await fetch(`${process.env.React_APP_BASEURLPARTIAL}/reset-password`, {
                method: "post",
                body: JSON.stringify({
                    Email: email,
                }),
                headers: {
                    "accept": '*/*',
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('TOKEN_KEY')
                        ? localStorage.getItem('TOKEN_KEY')
                        : ''
                        }`,
                },
                
            });

            // if (response.ok) {
            //     const data = await response.json();
            //     if(data.success){
            //         getData()
            //         data.message && setGlobalState(p => ({ ...p,varient: 'success', message:   data.message, notificationToast: true }))
            //     }else{
            //         data.message && setGlobalState(p => ({ ...p,varient: 'warning', message:   data.message, notificationToast: true }))
            //     }
            // }
            // setGlobalState(p => ({ ...p, modal: false }))
        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false)
        }
    };


    return (
        <>
            <CLoader enabled={loader} />
            <CNotification isOpen={globalState.notificationToast} setOpen={e => setGlobalState(p => ({ ...p, notificationToast: e }))} message={globalState.message} />
            <CNavbar page={'login'} />
            <CenterDivTemplate header={token ? "Reset Password" : "Forgot password"}>
                <form style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Typography to={"/resetpassword"}>
                        <span>Lost your password? Please enter your email address. You will receive a link to create a new password via email</span>
                    </Typography>
                    {token ? <>
                        <FormControl margin="normal">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FormControl>
                        <FormControl margin="normal">
                            <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
                            <Input id="confirmpassword" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </FormControl>
                        <Divider style={{ marginTop: 50, marginBottom: 10 }} />

                        <Button variant="contained" color="primary"  onClick={verifytoken}>
                            Reset Password
                        </Button>
                    </> : <>

                        <FormControl margin="normal">
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormControl>

                        <Divider style={{ marginTop: 50, marginBottom: 10 }} />

                        <Button variant="contained" color="primary" 
                            onClick={onSubmit}
                        >
                            Reset Password
                        </Button>
                        <Button component={LogInLink}>Log In</Button></>}
                </form>
            </CenterDivTemplate>
            <CFooter />
        </>
    );
};



export default PasswordResetPage;