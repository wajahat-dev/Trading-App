import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePosition } from './store/actions/current-position';
import { createPosition, exitPosition } from './store/actions/positions';
import { createInstance } from './store/actions/ledger';
import CryptoJS from 'crypto-js'
import crypto from 'crypto-js'
import hmacSHA256 from 'crypto-js/hmac-sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import enc_utf8 from 'crypto-js/enc-utf8';
import Utf8 from 'crypto-js/enc-utf8';
import sha256 from 'crypto-js/sha256';
import { Button } from '@material-ui/core';



const Kyc = ({ authenticated, setAuthenticated }) => {
    const token = useSelector(state => state.authentication.token);
    const [globalState, setGlobalState] = useState({
        formData: {

        }
    })
    
    const handleSubmit = (e)=>{

    }

   
  const handleChange = (name, value) => {
    debugger
    setGlobalState(p => ({ ...p, formData: { ...p.formData, [name]: value } }))
  }


    if (!token) {
        return <Redirect to="/" />;
    }
    return (
        <div>
            
            <JazzCash />
            {/* <form onSubmit={handleSubmit}>
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
          
          <Button onClick={handleSubmit}>Sign Up</Button>
          <Link to="/login">
            <Button>
              Log in
            </Button>
          </Link>
        </form> */}

        </div>
    );
}

const JazzCash = () => {

    // const JAZZCASH_HTTP_POST_URL = 
    const INTEGRITY_KEY = "8scc0yux1z"
    var arr = []

    const [state, setState] = useState({
        "pp_Version": "1.1",
        "pp_BankID": "",
        pp_ProductID: '',
        pp_Language: "EN",
        pp_MerchantID: "MWALLET",
        pp_SubMerchantID: "",
        pp_Password: "808ww559vu",
        pp_TxnRefNo: "",
        pp_MobileNumber: "03411728699",
        pp_CNIC: "345678",
        pp_Amount: "10000",
        pp_TxnType: "MWALLET",
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

     
        


    })

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
    useEffect(() => {
        const caller = () => {
           
            
            try {
                debugger
                var date = new Date()
                date = date.getFullYear() + ("0" + (date.getMonth())).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours()).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2)
                var date1 = new Date()
                date1.setHours(date1.getHours() + 1);
                date1 = date1.getFullYear() + ("0" + (date1.getMonth())).slice(-2) + ("0" + date1.getDate()).slice(-2) + ("0" + date1.getHours()).slice(-2) + ("0" + date1.getMinutes()).slice(-2) + ("0" + date1.getSeconds()).slice(-2)
                var tXID = 'T' + date
        
        
        
                var hash = secureHash({...state})
                hash = INTEGRITY_KEY + hash; //Integritykey + hashString
                const hmacDigest = hmacSHA256(hash, INTEGRITY_KEY).toString();
        
                const statetmp = { ...state }
                statetmp.pp_TxnDateTime = date
                statetmp.pp_TxnExpiryDateTime = date1
                statetmp.pp_TxnRefNo = 'T' + date
                statetmp.pp_SecureHash = hmacDigest
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
                        setState(statetmp)
                        console.log(data.pp_ResponseMessage)
                    }).catch(err=>{
                        console.log(err)
                    })
            } catch (error) {
                console.log('failed to jazzcash')
            }
        }
        caller()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    


    return (
        <>
            
        </>
    )
}



export default Kyc;
