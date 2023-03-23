
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
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        // setError(null);
        // setSnackbarMessage(null);
        // const token = match.params.token;
        // try {
        //     // If no tokens send email to user
        //     // if (!token) {
        //     //     await accountsGraphQL.sendResetPasswordEmail(email);
        //     //     setSnackbarMessage('Email sent');
        //     // } else {
        //     //     // If token try to change user password
        //     //     await accountsGraphQL.resetPassword(token, newPassword);
        //     //     setSnackbarMessage('Your password has been reset successfully');
        //     // }
        // } catch (err) {
        //     setError(err.message);
        //     setSnackbarMessage(null);
        // }
    };

    return (
        <>
            <CNavbar page={'login'} />


            <CenterDivTemplate header={"Forgot password"}>
                <form onSubmit={onSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>

                    <Typography to={"/resetpassword"}>
                        <span>Lost your password? Please enter your username or email address. You will receive a link to create a new password via email</span>
                    </Typography>
                    <FormControl margin="normal">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>


                    {/* <FormControl margin="normal">
                        <InputLabel htmlFor="new-password">New Password</InputLabel>
                        <Input
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </FormControl> */}
                    {/* <Divider  /> */}
                    <Divider  style={{marginTop: 50, marginBottom: 10}}/>

                    <Button variant="contained" color="primary" type="submit">
                        Reset Password
                    </Button>
                    <Button component={LogInLink}>Log In</Button>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={!!snackbarMessage}
                        autoHideDuration={4000}
                        onClose={() => setSnackbarMessage(null)}
                        message={<span>{snackbarMessage}</span>}
                    />
                </form>

            </CenterDivTemplate>

            <CFooter />

        </>
    );
};

export default PasswordResetPage;