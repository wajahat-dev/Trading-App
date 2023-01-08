import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/actions/authentication";
import { Link } from 'react-router-dom';
import leaf from './tradingImg.png';
import { AppBar, Box, Button, FormControl, Grid, Input, InputLabel, ListItem, Paper, Toolbar, Typography, styled } from "@material-ui/core";
import { TextField } from "@mui/material";
import CNavbar from "./globalcomponents/CNavbar";


const LoginPanel = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
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
              {/* <Input
                type="password"
                placeholder="Password"
                value={password}
                label="Password"

                onChange={updatePassword}
              /> */}

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


      {/* <main className="centered middled"> */}


      {/* </main> */}
    </>
  );
};

export default LoginPanel;
