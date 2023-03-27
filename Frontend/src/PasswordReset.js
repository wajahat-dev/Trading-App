
import { Button, Divider, FormControl, Input, InputLabel, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CFooter from './globalcomponents/CFooter';
import CLoader from './globalcomponents/CLoader';
import CNavbar from './globalcomponents/CNavbar';
import CNotification from './globalcomponents/CNotification';
import CenterDivTemplate from './globalcomponents/CenterDivTemplate';
import { useHistory } from 'react-router-dom';


const LogInLink = (props) => <Link to="/login" {...props} />;


const PasswordResetPage = (e) => {

    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loader, setLoader] = React.useState(false)
    const [globalState, setGlobalState] = useState({
        header: '',
        message: '',
        modal: false,
        notificationToast: false
    })
    const history = useHistory();

    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');


    useEffect(() => {
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

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setPassword("")
                    setConfirmPassword("")
                    data.messageBox && setGlobalState(p => ({ ...p, varient: 'success', message: data.messageBox, notificationToast: true }))
                    setTimeout(()=>{
                        history.push('/login')
                    }, 2000);
                } else {
                    data.messageBox && setGlobalState(p => ({ ...p, varient: 'warning', message: data.messageBox, notificationToast: true }))
                }
            }
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
                            <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FormControl>
                        <FormControl margin="normal">
                            <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
                            <Input type="password" id="confirmpassword" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </FormControl>
                        <Divider style={{ marginTop: 50, marginBottom: 10 }} />

                        <Button variant="contained" color="primary" onClick={verifytoken}>
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