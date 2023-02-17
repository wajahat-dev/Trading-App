import { Button, Grid } from '@material-ui/core';
import { TextField } from "@mui/material";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CLoader from './globalcomponents/CLoader';
import CNavbar from './globalcomponents/CNavbar';
import CNotification from './globalcomponents/CNotification';
import { CItem } from './globalcomponents/globalCss';
import { TOKEN_KEY, setToken } from './store/actions/authentication';
import leaf from './tradingImg.png';
import CFooter from './globalcomponents/CFooter';

const INITIAL_USER = {
  name: '',
  email: '',
  cashValue: '',
  password: '',
  confirmPassword: '',
}


const SignUpForm = () => {
  const [globalState, setGlobalState] = useState({
    formData: { ...INITIAL_USER },
    message: '',
    open: false,
    varient: 'info'
  })
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    debugger
    setGlobalState(p => ({ ...p, formData: { ...p.formData, [name]: value } }))
  }

  const handleSubmit = async (e) => {
    debugger
    setLoader(true)
    try {
      const response = await fetch(`https://localhost:7000/api/signup?RoleCodeIfLoggedInAsAdmin=x`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        "accept": '*/*',
        body: JSON.stringify({
          "userNameOrEmail": globalState.formData.email,
          "password": globalState.formData.password,
          "confirmPassword": globalState.formData.confirmPassword
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.messageBox) {
          if (data.messageBox.includes('successfully')) {
            setGlobalState(p => ({ ...p, formData: { ...INITIAL_USER }, message: data.messageBox, open: true, varient: "success" }))
            const { token } = await response.json();
            window.localStorage.setItem(TOKEN_KEY, token);
            dispatch(setToken(token));
          } else {
            setGlobalState(p => ({ ...p, message: data.messageBox, open: true, varient: 'info' }))
          }
        }
      }

    } catch (error) {

    } finally {
      setLoader(false)
    }

  };

  return (
    <>
      <CLoader enabled={loader} />
      <CNotification varient={globalState.varient} isOpen={globalState.open} setOpen={e => setGlobalState(p => ({ ...p, open: e }))} message={globalState.message} />
      <CNavbar page={'signup'} />
      <Grid container spacing={3} style={{ marginTop: 7 }}>
        <Grid item xs={7}>
          <CItem>
            <img className='leaf-rotate' src={leaf} alt="img" />
          </CItem>
        </Grid>
        <Grid item xs={5}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              id="outlined-required"
              label='Full Name'
              name={'name'}
              value={globalState.formData.name}
              onChange={e => {
                debugger
                handleChange(e.target.name, e.target.value)
              }}
              required

            />
          </Grid>
          <Grid item xs={8} style={{ marginTop: 7 }}>
            <TextField
              fullWidth
              id="outlined-required"
              name={'email'}
              type='email'
              label='Email'
              value={globalState.formData.email}
              onChange={e => handleChange(e.target.name, e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={8} style={{ marginTop: 7 }}>
            <TextField
              fullWidth
              id="outlined-required"
              name={'cashValue'}
              type="text"
              label="Deposit Amount"
              required
              value={globalState.formData.cashValue}
              onChange={e => handleChange(e.target.name, e.target.value)}

            />
          </Grid>
          <Grid item xs={8} style={{ marginTop: 7 }}>
            <TextField
              fullWidth
              id="outlined-required"
              name={'password'}
              type='password'
              label='Password'
              value={globalState.formData.password}
              onChange={e => handleChange(e.target.name, e.target.value)}
            />
          </Grid>
          <Grid item xs={8} style={{ marginTop: 7 }}>
            <TextField
              fullWidth
              id="outlined-required"
              name={'confirmPassword'}
              type='password'
              label='Confirm Password'
              value={globalState.formData.confirmPassword}
              onChange={e => handleChange(e.target.name, e.target.value)}

            />
          </Grid>

          <Button onClick={handleSubmit}>Sign Up</Button>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button>
              Log in
            </Button>
          </Link>

        </Grid>
      </Grid>
      <CFooter />

    </>
  );
};




export default SignUpForm;