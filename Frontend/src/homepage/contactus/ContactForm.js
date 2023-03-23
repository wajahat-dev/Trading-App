import React, { useState, useEffect } from "react";
import { useFormControls } from "./ContactFormControls";
import { Button, FormControl, Grid, Input, InputLabel } from "@material-ui/core";
import CenterDivTemplate from "../../globalcomponents/CenterDivTemplate";
import { Link } from 'react-router-dom';
import CNotification from "../../globalcomponents/CNotification";
import { EmailValidation } from "../../Globalfunc/func";
const inputFieldValues = [
    {
        name: "fullName",
        label: "Full Name",
        id: "my-name"
    },
    {
        name: "email",
        label: "Email",
        id: "my-email"
    },
    {
        name: "message",
        label: "Message",
        id: "my-message",
        multiline: true,
        rows: 10
    }
];

export const ContactForm = () => {
    const [globalState, setGlobalState] = useState({
        message: '',
        open: false,
        email: "",
        emailname: '',
        emailMessage: '',
        varient: ''
    })


    const handleChange = (name, value) => {
        debugger
        setGlobalState(p => ({ ...p, [name]: value }))

    }
    const onSend = ()=>{
        if (!globalState.emailname) {
            setGlobalState(p => ({ ...p, message: 'Name Can not be blank', open: true, varient: 'info' }))
            return 
          } else if (!globalState.email) {
            setGlobalState(p => ({ ...p, message: 'Email Can not be blank', open: true, varient: 'info' }))
           return
      
          } else if (!globalState.emailMessage) {
            setGlobalState(p => ({ ...p, message: 'Message Can not be blank', open: true, varient: 'info' }))
           return

          }else if (EmailValidation(globalState.email)) {
            setGlobalState(p => ({ ...p, message: 'Email must be in correct format', open: true, varient: 'info' }))
            return
           
          }



    }


    return (
        // <Box mt={4}>
        //     <Grid container
        //         justifyContent="center" alignItems="center" direction="column"
        //     >
        //         <Grid item xs={8} >
        //             <form autoComplete="off" onSubmit={handleFormSubmit}>
        //                 {inputFieldValues.map((inputFieldValue, index) => {
        //                     return (
        //                         <TextField
        //                             key={index}
        //                             onChange={handleInputValue}
        //                             onBlur={handleInputValue}
        //                             name={inputFieldValue.name}
        //                             label={inputFieldValue.label}
        //                             error={errors[inputFieldValue.name]}
        //                             multiline={inputFieldValue.multiline ?? false}
        //                             fullWidth
        //                             rows={inputFieldValue.rows ?? 1}
        //                             autoComplete="none"
        //                             {...(errors[inputFieldValue.name] && {
        //                                 error: true,
        //                                 helperText: errors[inputFieldValue.name]
        //                             })}
        //                         />
        //                     );
        //                 })}
        //                 <Button
        //                     variant="contained"
        //                     type="submit"
        //                     color="secondary"
        //                     disabled={!formIsValid()}
        //                 >
        //                     Send Message
        //                 </Button>
        //             </form>
        //         </Grid>
        //     </Grid>
        // </Box>
       <>
      <CNotification varient={globalState.varient} isOpen={globalState.open} setOpen={e => setGlobalState(p => ({ ...p, open: e }))} message={globalState.message} />
       
       <CenterDivTemplate header={"Contact Us"}>
            <form style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <FormControl margin="normal">
                    <InputLabel htmlFor="emailname">Full Name</InputLabel>
                    <Input
                        id="emailname"
                        type="text"
                        name={"emailname"}
                        value={globalState.emailname}
                        fullWidth={true}
                        onChange={e => handleChange(e.target.name, e.target.value)}

                    />
                </FormControl>
                <FormControl margin="normal">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        id="email"
                        type="email"
                        name={"email"}
                        value={globalState.email}
                        fullWidth={true}
                        onChange={e => handleChange(e.target.name, e.target.value)}

                    />
                </FormControl>
                <FormControl margin="normal">
                    <InputLabel htmlFor="emailMessage">Message</InputLabel>
                    <Input
                        id="emailMessage"
                        type="textarea"
                        multiline
                        rows={7}
                        name={"emailMessage"}
                        value={globalState.emailMessage}
                        fullWidth={true}
                        onChange={e => handleChange(e.target.name, e.target.value)}
                    />
                </FormControl>

                <Grid item md={12}>

                    <Button
                        // component={(props) => <Link to="/" {...props} />}
                        fullWidth
                        variant="contained" color="primary"
                    onClick={onSend}
                    >
                        Send

                    </Button>

                </Grid>
                <Grid item md={12}>
                    <Button
                        component={(props) => <Link to="/login" {...props} />}
                        fullWidth type="button"    >
                        Log in
                    </Button>
                </Grid>
            </form>
        </CenterDivTemplate>
       </>
    );
};
