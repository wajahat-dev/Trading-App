import {
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    makeStyles,
} from "@material-ui/core";
import hmacSHA256 from 'crypto-js/hmac-sha256';
import sha256 from 'crypto-js/sha256';
import React, { useState } from "react";


const REACT_APP_pp_Password = process.env.REACT_APP_pp_Password
const REACT_APP_pp_CNIC = process.env.REACT_APP_pp_CNIC
const REACT_APP_pp_MobileNumber = process.env.REACT_APP_pp_MobileNumber
const REACT_APP_pp_MerchantID = process.env.REACT_APP_pp_MerchantID




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    maxWidth: 500,
    margin: "auto",
  },
  title: {
    margin: theme.spacing(2),
  },
  form: {
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function JazzCashCheckout() {
  const classes = useStyles();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cnicNumber, setCnicNumber] = useState("");

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleCnicNumberChange = (event) => {
    setCnicNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle checkout logic
  };



  const JazzCash = () => {

    // const JAZZCASH_HTTP_POST_URL = 
    const INTEGRITY_KEY = "8scc0yux1z"
    var payload = {
        "pp_Version": "1.1",
        "pp_BankID": "",
        pp_ProductID: '',
        pp_Language: "EN",
        pp_SubMerchantID: "",
        pp_TxnRefNo: "",
        pp_Amount: "10000",
        pp_Password: '',
        pp_CNIC: '',
        pp_MobileNumber: '',
        pp_MerchantID: '',
        pp_TxnType: '',
        pp_DiscountedAmount: "",
        pp_TxnCurrency: "PKR",
        pp_TxnDateTime: "",
        pp_BillReference: "BillRef",
        pp_Description: "Hello",
        pp_TxnExpiryDateTime: "",
        pp_SecureHash: "",
        ppmpf_1: "",
        ppmpf_2: "",
        ppmpf_3: "",
        ppmpf_4: "",
        ppmpf_5: "",
        pp_ReturnURL: ''
    }
    const secureHash = (data) => {
        const ordered = Object.keys(data).sort().reduce(
            (obj, key) => {
                obj[key] = data[key];
                return obj;
            },
            {}
        );
        var hash = ""
        Object.entries(ordered).forEach(
            ([key, value]) => {
                if (value != "") {
                    hash += '&' + value
                }
            }
        );;
        return hash;
    }

    const convertToSHA = async (string) => {
        await sha256(string).then((hash) => {
            console.log(hash);
        });
    };


    try {
        debugger
        var date = new Date()
        date = date.getFullYear() + ("0" + (date.getMonth())).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours()).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2)
        var date1 = new Date()
        date1.setHours(date1.getHours() + 1);
        date1 = date1.getFullYear() + ("0" + (date1.getMonth())).slice(-2) + ("0" + date1.getDate()).slice(-2) + ("0" + date1.getHours()).slice(-2) + ("0" + date1.getMinutes()).slice(-2) + ("0" + date1.getSeconds()).slice(-2)
        var tXID = 'T' + date



        var hash = secureHash({ ...payload })
        hash = INTEGRITY_KEY + hash; //Integritykey + hashString
        const hmacDigest = hmacSHA256(hash, INTEGRITY_KEY).toString();

        const statetmp = { ...payload }
        statetmp.pp_TxnDateTime = date
        statetmp.pp_TxnExpiryDateTime = date1
        statetmp.pp_TxnRefNo = 'T' + date
        statetmp.pp_SecureHash = hmacDigest
        console.log('wwwwww', process)

        statetmp.pp_Password = REACT_APP_pp_Password
        statetmp.pp_CNIC = cnicNumber
        statetmp.pp_MobileNumber = phoneNumber
        statetmp.pp_MerchantID = REACT_APP_pp_MerchantID
        statetmp.pp_TxnType = REACT_APP_pp_MerchantID
        // pp_BillReference= 'T' + date,
        fetch(
            'http://localhost:3001', {
            method: "POST",
            // mode: 'cors',
            headers: {
                // 'Access-Control-Allow-Origin': '*',
                // 'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(statetmp)
        })
            .then(function (response) {

                return response.json();
            })
            .then(function (data) {
                // setState(statetmp)
                console.log(data.pp_ResponseMessage)
            }).catch(err => {
                console.log(err)
            })
    } catch (error) {
        console.log('failed to jazzcash')
    }

}


  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Typography variant="h5" className={classes.title}>
          JazzCash Checkout
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="phone-number"
                label="Phone Number"
                variant="outlined"
                fullWidth
                className={classes.input}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="cnic-number"
                label="CNIC Number"
                variant="outlined"
                fullWidth
                className={classes.input}
                value={cnicNumber}
                onChange={handleCnicNumberChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!phoneNumber || !cnicNumber}
            onClick={JazzCash}
          >
            Checkout
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default JazzCashCheckout;
