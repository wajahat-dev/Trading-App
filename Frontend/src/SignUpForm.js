import { Button, MenuItem, Select, Input, InputLabel, Grid, FormControl } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { EmailValidation } from './Globalfunc/func';
import CFooter from './globalcomponents/CFooter';
import CLoader from './globalcomponents/CLoader';
import CNavbar from './globalcomponents/CNavbar';
import CNotification from './globalcomponents/CNotification';
import { CItem } from './globalcomponents/globalCss';
import leaf from './tradingImg.png';
import CenterDivTemplate from './globalcomponents/CenterDivTemplate';



const INITIAL_USER = {
  name: '',
  email: '',
  cashValue: '',
  password: '',
  confirmPassword: '',
  cnic: '',
  phone: '',
  country: '',
  dob: '',
  referral_code: '',
}


const SignUpForm = () => {
  const [globalState, setGlobalState] = useState({
    formData: { ...INITIAL_USER },
    message: '',
    open: false,
    varient: 'info'
  })
  const [loader, setLoader] = useState(false)
  const [loader1, setLoader1] = useState(false)
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const API_ENDPOINT = '';



  const handleChange = (name, value) => {

    // if (name == 'cashValue') {
    //   maxDecimalLengthNumberCtlRegex(value, 7, 0, false) && setGlobalState(p => ({ ...p, formData: { ...p.formData, [name]: value } }))
    // }
    // else if(name == 'phone'){
    //   PhoneValidation(value) &&  setGlobalState(p => ({ ...p, formData: { ...p.formData, [name]: value } }))

    // } else if(name == 'cnic'){
    //   CNICValidation(value) &&  setGlobalState(p => ({ ...p, formData: { ...p.formData, [name]: value } }))

    // }else if(name == 'email'){
    //   EmailValidation(value) &&  setGlobalState(p => ({ ...p, formData: { ...p.formData, [name]: value } }))

    // }
    // else {
    // }
    setGlobalState(p => ({ ...p, formData: { ...p.formData, [name]: value } }))

  }

  const getcountryData = async () => {
    const reponse = await fetch(`${process.env.React_APP_BASEURLPARTIAL}/signupfieldsdata`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await reponse.json();
    (body.countries && body.countries.length > 0) && setCountries(body.countries)

  }

  useEffect(() => {

    getcountryData()


  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger
    let existCon = false
    if (!globalState.formData.cnic) {
      setGlobalState(p => ({ ...p, message: 'CNIC Can not be blank', open: true, varient: 'info' }))
      existCon = true
    } else if (!globalState.formData.email) {
      setGlobalState(p => ({ ...p, message: 'Email Can not be blank', open: true, varient: 'info' }))
      existCon = true

    } else if (!globalState.formData.password) {
      setGlobalState(p => ({ ...p, message: 'Password Can not be blank', open: true, varient: 'info' }))
      existCon = true

    } else if (!globalState.formData.confirmPassword) {
      setGlobalState(p => ({ ...p, message: 'Confirm Password Can not be blank', open: true, varient: 'info' }))
      existCon = true

    } else if (globalState.formData.confirmPassword !== globalState.formData.password) {
      setGlobalState(p => ({ ...p, message: 'Passwords Must Match', open: true, varient: 'info' }))
      existCon = true
    } else if (EmailValidation(globalState.formData.email)) {
      setGlobalState(p => ({ ...p, message: 'Email must be in correct format', open: true, varient: 'info' }))
      existCon = true
    }

    if (existCon) return

    setLoader(true)
    try {
      const response = await fetch(`${process.env.React_APP_BASEURLPARTIAL}/signup?RoleCodeIfLoggedInAsAdmin=X&referralcode=${globalState.formData.referral_code || "N"}&cnic=${globalState.formData.cnic || ""}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          accept: '*/*',
        },
        body: JSON.stringify({
          "userNameOrEmail": globalState.formData.email,
          "password": globalState.formData.password,
          "confirmPassword": globalState.formData.confirmPassword
        }),

      });
      if (response.ok) {
        const apiOnedata = await response.json();
        if (apiOnedata.messageBox) {
          if (apiOnedata.messageBox.includes('successfully')) {

            // await storeProfileData(data, token)
            const response1 = await fetch(`${process.env.React_APP_BASEURLPARTIAL}/store-userprofile`, {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiOnedata.token}`,
              },
              body: JSON.stringify({
                "cnic": globalState.formData.cnic,
                "displayname": globalState.formData.name,
                "phone": globalState.formData.phone,
                "country": globalState.formData.country,
                "dob": globalState.formData.dob,
                "blockNow": false
              }),
            });
            if (response1.ok) {
              const apiTwodata = await response1.json();
              if (apiTwodata.goodResponse) {
                setGlobalState(p => ({ ...p, formData: { ...INITIAL_USER }, message: apiOnedata.messageBox, open: true, varient: "success" }))

              } else {
                if (apiTwodata.messageBox) {
                  setGlobalState(p => ({ ...p, message: 'Email must be in correct format', open: true, varient: 'info' }))
                }
              }
            }

          } else {
            setGlobalState(p => ({ ...p, message: apiOnedata.messageBox, open: true, varient: 'info' }))
          }
        }
      }

    } catch (error) {
      console.log('Sign up error', error)
    } finally {
      setLoader(false)
    }


  };


  return (
    <>
      <CLoader enabled={loader} />
      <CLoader enabled={loader1} />
      <CNotification varient={globalState.varient} isOpen={globalState.open} setOpen={e => setGlobalState(p => ({ ...p, open: e }))} message={globalState.message} />
      <CNavbar page={'signup'} />










      <CenterDivTemplate header={"Create your Account"}>

        <form style={{
          display: 'flex',
          flexDirection: 'column',
        }}>


          <FormControl margin="normal">
            <InputLabel htmlFor="fullName">Full Name</InputLabel>
            <Input
              required
              fullWidth
              id="outlined-required"
              label="Full Name"
              onChange={e => {
                // debugger
                handleChange(e.target.name, e.target.value)
              }}
              value={globalState.formData.name}
              name={"name"}
            />
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              required
              fullWidth
              id="outlined-required"
              label="Email"
              onChange={e => handleChange(e.target.name, e.target.value)}
              value={globalState.formData.email}
              type='email'
              name={"email"}

            />
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="cnic">CNIC</InputLabel>
            <Input
              required
              fullWidth
              id="outlined-required"
              label="CNIC"
              onChange={e => handleChange(e.target.name, e.target.value)}
              value={globalState.formData.cnic}
              // type='text'
              name={"cnic"}

            />
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="phone">Phone</InputLabel>
            <Input
              required
              fullWidth
              id="outlined-required"
              label="Phone"
              onChange={e => handleChange(e.target.name, e.target.value)}
              value={globalState.formData.phone}
              name='phone'
            />
          </FormControl>
          <FormControl margin="normal">
            {/* <Autocomplete
              options={countries}
              label='Country'
              getOptionLabel={(country) => country.name}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select a country"
                  variant="outlined"
                />

              )}
              value={globalState.formData.country}
              onChange={(event, value) => handleChange("country", value.name)}
              // getOptionSelected={(option, value) => option.name === value.name}
              getOptionSelected={(option, value) => option.name === value}
              renderOption={(option) => (
                <React.Fragment>
                  <span>{option.name}</span>
                  <span style={{ marginLeft: 8, color: '#999' }}>{option.iso}</span>
                </React.Fragment>
              )}
            /> */}
            <InputLabel htmlFor="Country">Country</InputLabel>
            <Select
              // labelId="demo-simple-select-label"
              // id="demo-simple-select"
              value={globalState.formData.country}
              label="Country"
              onChange={(event) => handleChange("country", event.target.value)}
            >
              {countries && countries.map((data) => {
                return <MenuItem key={data.iso} value={data.name}>{data.name}</MenuItem>
              })}
            </Select>


          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              required
              fullWidth
              id="outlined-required"
              label="Password"
              onChange={e => handleChange(e.target.name, e.target.value)}
              value={globalState.formData.password}
              type='password'
              name={'password'}
            />
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <Input
              required
              fullWidth
              id="outlined-required"
              label="Confirm Password"
              onChange={e => handleChange(e.target.name, e.target.value)}
              value={globalState.formData.confirmPassword}
              type='password'
              name={'confirmPassword'}

            />
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="referralCode">Referral Code</InputLabel>
            <Input
              fullWidth
              id="outlined-required"
              label="Referral Code"
              onChange={e => handleChange(e.target.name, e.target.value)}
              value={globalState.formData.referral_code}
              name={'referral_code'}

            />
          </FormControl>
          <FormControl margin="normal">
            <Button
              variant="contained" color="primary"
              onClick={handleSubmit}>Sign Up</Button>
            {/* <Link to="/login" style={{ textDecoration: 'none' }}> */}
            <Button component={(props) => <Link to="/login" {...props} />}
            // variant="outlined" color="neutral"
            >
              Log in
            </Button>
            {/* </Link> */}
          </FormControl>
        </form>

      </CenterDivTemplate>



      <CFooter />

    </>
  );
};




export default SignUpForm;




//    {/* <form onSubmit={handleSubmit}> */}
//    <Grid container spacing={3} style={{ marginTop: 7 }}>
//    <Grid item xs={7}>
//      <CItem>
//        <img className='leaf-rotate' src={leaf} alt="img" />
//      </CItem>
//    </Grid>
//    <Grid item xs={5}>
//      <Grid item xs={8}>
//        <TextField
//          fullWidth
//          id="outlined-required"
//          label='Full Name'
//          name={'name'}
//          value={globalState.formData.name}
//          onChange={e => {
//            // debugger
//            handleChange(e.target.name, e.target.value)
//          }}
//          required

//        />
//      </Grid>
//      <Grid item xs={8} style={{ marginTop: 7 }}>
//        <TextField
//          fullWidth
//          id="outlined-required"
//          name={'email'}
//          type='email'
//          label='Email'
//          value={globalState.formData.email}
//          onChange={e => handleChange(e.target.name, e.target.value)}
//          required
//        />
//      </Grid>
//      <Grid item xs={8} style={{ marginTop: 7 }}>
//        <TextField
//          fullWidth
//          id="outlined-required"
//          name={'cnic'}
//          type='cnic'
//          label='Cnic'
//          value={globalState.formData.cnic}
//          onChange={e => handleChange(e.target.name, e.target.value)}
//          required
//        />
//      </Grid>
//      <Grid item xs={8} style={{ marginTop: 7 }}>
//        <TextField
//          fullWidth
//          id="outlined-required"
//          name={'phone'}
//          type='phone'
//          label='Phone'
//          value={globalState.formData.phone}
//          onChange={e => handleChange(e.target.name, e.target.value)}
//          required
//        />
//      </Grid>
//      <Grid item xs={8} style={{ marginTop: 7 }}>
//        {/* <TextField
//          fullWidth
//          id="outlined-required"
//          name={'country'}
//          type='text'
//          label='Country'
//          value={globalState.formData.country}
//          onChange={e => handleChange(e.target.name, e.target.value)}
//          required
//        /> */}

//        <Autocomplete
//          options={countries}
//          getOptionLabel={(country) => country.name}
//          label='Country'
//          fullWidth
//          renderInput={(params) => (
//            <TextField
//              {...params}
//              label="Select a country"
//              variant="outlined"
//            />
//          )}
//          value={globalState.formData.country}
//          onChange={(event, value) => handleChange("country", value.name)}
//          getOptionSelected={(option, value) => option.name === value.name}
//          renderOption={(option) => (
//            <React.Fragment>
//              <span>{option.name}</span>
//              <span style={{ marginLeft: 8, color: '#999' }}>{option.iso}</span>
//            </React.Fragment>
//          )}
//        />


//      </Grid><Grid item xs={8} style={{ marginTop: 7 }}>
//        {/* <TextField
//          fullWidth
//          id="outlined-required"
//          name={'dob'}
//          type='dob'
//          label='Dob'
//          value={globalState.formData.dob}
//          onChange={e => handleChange(e.target.name, e.target.value)}
//          required
//        /> */}
//        {/* <DesktopDatePicker
//          label="For desktop"
//          value={globalState.formData.dob}

//          // onChange={e => handleChange(e.target.name, e.target.value)}

//          renderInput={(params) => <TextField {...params} />}
//        /> */}
//        {/* <DatePicker
//    mask="____/__/__"
//    // value={value}
//    // onChange={(newValue) => setValue(newValue)}
//    renderInput={(params) => <TextField {...params} />}
//  /> */}
//      </Grid>














//      {/* <Grid item xs={8} style={{ marginTop: 7 }}>
//        <TextField
//          fullWidth
//          id="outlined-required"
//          name={'cashValue'}
//          type="text"
//          label="Deposit Amount"
//          required
//          value={globalState.formData.cashValue}
//          onChange={e => handleChange(e.target.name, e.target.value)}

//        />
//      </Grid> */}
//      <Grid item xs={8} style={{ marginTop: 7 }}>
//        <TextField
//          fullWidth
//          id="outlined-required"
//          name={'password'}
//          type='password'
//          required

//          label='Password'
//          value={globalState.formData.password}
//          onChange={e => handleChange(e.target.name, e.target.value)}
//        />
//      </Grid>
//      <Grid item xs={8} style={{ marginTop: 7 }}>
//        <TextField
//          fullWidth
//          id="outlined-required"
//          name={'confirmPassword'}
//          type='password'
//          required

//          label='Confirm Password'
//          value={globalState.formData.confirmPassword}
//          onChange={e => handleChange(e.target.name, e.target.value)}

//        />
//      </Grid>
//      <Grid item xs={8} style={{ marginTop: 7 }}>
//        <TextField
//          fullWidth
//          id="outlined-required"
//          name={'referral_code'}
//          type='text'
//          label='Referral Code'
//          value={globalState.formData.referral_code}
//          onChange={e => handleChange(e.target.name, e.target.value)}

//        />
//      </Grid>

//      <div style={{ marginTop: 7 }}>
//        <Button variant="outlined" color="neutral" onClick={handleSubmit}>Sign Up</Button>
//        {/* <Button type='submit'>Sign Up</Button> */}
//        <Link to="/login" style={{ textDecoration: 'none' }}>
//          <Button variant="outlined" color="neutral">
//            Log in
//          </Button>
//        </Link>
//      </div>

//    </Grid>
//  </Grid>
//  {/* </form> */}

