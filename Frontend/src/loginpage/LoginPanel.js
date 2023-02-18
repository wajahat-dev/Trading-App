import { Button, Grid, Paper, styled } from "@material-ui/core";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import CLoader from "../globalcomponents/CLoader";
import CNavbar from "../globalcomponents/CNavbar";
import CNotification from "../globalcomponents/CNotification";
import { TOKEN_KEY, setToken } from "../store/actions/authentication";
import leaf from '../tradingImg.png';
import {CItem} from "../globalcomponents/globalCss";
import CFooter from "../globalcomponents/CFooter";
import { setUserDetails } from "../store/reducers/trades";
import { CheckemptyDate, ToDatabaseFormat } from "../Globalfunc/func";


const LoginPanel = (props) => {
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
    setLoader(true)
    try {
      const response = await fetch(`https://localhost:7000/api/login`, {
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
            if( !CheckemptyDate(ToDatabaseFormat(data.user.inActiveDate))){
              setGlobalState(p => ({ ...p, message: data.messageBox, open: true }))
              window.localStorage.setItem(TOKEN_KEY, data.token);
              dispatch(setToken(data.token));
              dispatch(setUserDetails(data.user))
              history.push("/");
            }else{
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
      <Grid container spacing={3} style={{ marginTop: 7 }}>
        <Grid item xs={7}>
          <CItem>
            <img className='leaf-rotate' src={leaf} alt="img" />
          </CItem>
        </Grid>
        <Grid item xs={5}>

          <Grid item xs={8}>
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Email"
              onChange={updateEmail}
              value={email}

            />
          </Grid>
          <Grid item xs={8} style={{ marginTop: 7 }}>
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Password"
              onChange={updatePassword}
              value={password}
              type={password}
            />
          </Grid>
          <div>
          </div>
          <div>
            <Link to="/" style={{ textDecoration: 'none' }}
            >
              <Button
                onClick={handleSubmit}
              >Log in</Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Button type="button" >
                Sign Up
              </Button>
            </Link>
          </div>
        </Grid>
      </Grid>
      <CFooter />
    </>
  );
};

export default LoginPanel;
