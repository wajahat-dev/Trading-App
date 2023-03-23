import { Button, FormControl, Grid, Input, InputLabel } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { CheckemptyDate, EmailValidation, ToDatabaseFormat } from "../Globalfunc/func";
import CFooter from "../globalcomponents/CFooter";
import CLoader from "../globalcomponents/CLoader";
import CNavbar from "../globalcomponents/CNavbar";
import CNotification from "../globalcomponents/CNotification";
import CenterDivTemplate from "../globalcomponents/CenterDivTemplate";
import TypographyWithLink from "../globalcomponents/TypographyWithLink";
import { TOKEN_KEY, setToken } from "../store/actions/authentication";


const LoginPanel = ({ setUserData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false)
  const [globalState, setGlobalState] = useState({
    message: '',
    open: false
  })
  let history = useHistory();

  const handleSubmit = async (e) => {
    debugger
    e.preventDefault()
    let existCon = false
    if (!email) {
      setGlobalState(p => ({ ...p, message: 'Email Can not be blank', open: true, varient: 'info' }))
      existCon = true

    } else if (!password) {
      setGlobalState(p => ({ ...p, message: 'Password Can not be blank', open: true, varient: 'info' }))
      existCon = true

    } else if (EmailValidation(email)) {
      setGlobalState(p => ({ ...p, message: 'Email must be in correct format', open: true, varient: 'info' }))
      existCon = true
    }
    if (existCon) return

    setLoader(true)
    try {
      const response = await fetch(`${process.env.React_APP_BASEURLPARTIAL}/login`, {
        method: "post",
        "accept": '*/*',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "username": email,
          "password": password,
          "clientid": 0
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.messageBox) {
          if (data.messageBox.includes('successfully')) {
            if (!CheckemptyDate(ToDatabaseFormat(data.user.inActiveDate))) {
              setGlobalState(p => ({ ...p, message: data.messageBox, open: true }))
              window.localStorage.setItem(TOKEN_KEY, data.token);
              dispatch(setToken(data.token));
              setUserData(data.user)
              history.push("/");

            } else {
              setGlobalState(p => ({ ...p, message: "User account has been blocked, please contact to admin", open: true }))
            }
          } else {
            setGlobalState(p => ({ ...p, message: data.messageBox, open: true }))
          }
        }
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false)
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };



  return (
    <>
      <CNotification isOpen={globalState.open} setOpen={e => setGlobalState(p => ({ ...p, open: e }))} message={globalState.message} />
      <CLoader enabled={loader} />
      <CNavbar page={'login'} />

      <CenterDivTemplate header={"Login"}>

        <form style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <FormControl margin="normal">
            <InputLabel htmlFor="Email">Email</InputLabel>
            <Input
              id="Email"
              type="email"
              value={email}
              fullWidth={true}
              onChange={updateEmail}
            />
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="Password">Password</InputLabel>
            <Input
              required
              fullWidth
              id="outlined-required"
              label="Password"
              onChange={updatePassword}
              value={password}
              type='password'
            />
          </FormControl>


          <Grid item md={12} style={{ marginTop: 5 }}>

            <TypographyWithLink to={"/resetpassword"}>
              <span>Forget Password?</span>
            </TypographyWithLink>
          </Grid>
          <Grid item md={12}>

            <Button
              component={(props) => <Link to="/" {...props} />}
              fullWidth
              variant="contained" color="primary"
              onClick={handleSubmit} >
              Log in</Button>

          </Grid>
          <Grid item md={12}>
            <Button
              component={(props) => <Link to="/signup" {...props} />}
              fullWidth type="button"    >
              Sign Up
            </Button>
          </Grid>
        </form>
      </CenterDivTemplate>
      <CFooter />
    </>
  );
};

export default LoginPanel;
