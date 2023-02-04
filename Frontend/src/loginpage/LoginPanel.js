import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/actions/authentication";
import { Link } from 'react-router-dom';
import leaf from '../tradingImg.png';
import { AppBar, Box, Button, FormControl, Grid, Input, InputLabel, ListItem, Paper, Toolbar, Typography, styled } from "@material-ui/core";
import { TextField } from "@mui/material";
import CNavbar from "../globalcomponents/CNavbar";
import CLoader from "../globalcomponents/CLoader";
import CNotification from "../globalcomponents/CNotification";


const LoginPanel = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false)
  const [globalState, setGlobalState] = useState({
    message: '',
    open: false
  })

  const handleSubmit = async (e) => {
    debugger
    setLoader(true)
    try {
      e.preventDefault();
      dispatch(login(email, password));
      setGlobalState(p => ({...p, message: 'User not found', open: true}))
    } catch (error) {
      
    }finally{
    setLoader(false)
      
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <CNotification isOpen={globalState.open} setOpen={e => setGlobalState(p=>({...p, open:e}))} message={globalState.message}/>

      {loader && <CLoader />}
      {/* <CLoader /> */}
      <CNavbar page={'login'} />

      <Grid container spacing={3}>
        <Grid item xs={7}>
          <img className='leaf-rotate' src={leaf} alt="img" />
        </Grid>
        <Grid item xs={5}>

          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 3, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >

            <div>
              <TextField
                required
                id="outlined-required"
                label="Email"
                onChange={updateEmail}
                value={email}

              />
              
              <TextField
                required
                id="outlined-required"
                label="Password"
                onChange={updatePassword}
                value={password}
            type={password}
              />

            </div>
            <div>
              <Link to="/" underline="none"
              >
                <Button type="submit"
                  onClick={handleSubmit}
                >Log in</Button>
              </Link>
              <Link to="/signup"  underline="none">
                <Button type="button" >
                  Sign Up
                </Button>
              </Link>
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPanel;
