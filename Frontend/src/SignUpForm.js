import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from './store/actions/authentication';
import { createInstance } from './store/actions/ledger';
import { Link } from 'react-router-dom';
import leaf from './tradingImg.png';
import CNavbar from './globalcomponents/CNavbar';
import { Box, Button, Container, Paper, Typography } from '@material-ui/core';
import CLoader from './globalcomponents/CLoader';

const SignUpForm = () => {
  const [globalState, setGlobalState] = useState({
    formData: {
      name: '',
      email: '',
      cashValue: '',
      password: '',
      confirmPassword: '',
    },

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
    await dispatch(signUp(globalState.formData));
    await dispatch(createInstance({
      deposit: globalState.formData.cashValue
    }));

  };

  return (
    <>
      {loader && <CLoader />}
      <CNavbar page={'signup'} />
      <div>
        <img className='leaf-rotate' src={leaf} alt="img" />
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Full Name'
            name={'name'}
            value={globalState.formData.name}
            onChange={e => {
              debugger
              handleChange(e.target.name, e.target.value)
            }}
            required
          />
          <input
            name={'email'}
            type='email'
            placeholder='Email'
            value={globalState.formData.email}
            onChange={e => handleChange(e.target.name, e.target.value)}
            required
          />
          <input
            name={'cashValue'}
            type="text"
            placeholder="Deposit Amount"
            required
            value={globalState.formData.cashValue}
            onChange={e => handleChange(e.target.name, e.target.value)}
          />
          <input
            name={'password'}
            type='password'
            placeholder='Password'
            value={globalState.formData.password}
            onChange={e => handleChange(e.target.name, e.target.value)}
          />
          <input
            name={'confirmPassword'}
            type='password'
            placeholder='Confirm Password'
            value={globalState.formData.confirmPassword}
            onChange={e => handleChange(e.target.name, e.target.value)}
          />
          <Button onClick={handleSubmit}>Sign Up</Button>
          <Link to="/login">
            <Button>
              Log in
            </Button>
          </Link>
        </form>
      </div>
    </>
  );
};




export default SignUpForm;