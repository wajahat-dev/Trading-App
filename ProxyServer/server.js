// const express = require('express')
import express from 'express'
const app = express()
import bodyParser from 'body-parser'
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
import cors from 'cors'
import fetch from 'node-fetch'
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())
const URL = 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction'
const body = { "pp_Version": "1.1", "pp_BankID": "", "pp_ProductID": "", "pp_Language": "EN", "pp_MerchantID": "MWALLET", "pp_SubMerchantID": "", "pp_Password": "808ww559vu", "pp_TxnRefNo": "T20230112225853", "pp_MobileNumber": "03411728699", "pp_CNIC": "345678", "pp_Amount": "10000", "pp_TxnType": "MWALLET", "pp_DiscountedAmount": "", "pp_TxnCurrency": "PKR", "pp_TxnDateTime": "20230112225853", "pp_BillReference": "BillRef", "pp_Description": "Hello", "pp_TxnExpiryDateTime": "20230112235853", "pp_SecureHash": "f3259c86bc2a8cd4188c5256fb50fb22f1e60867f0b5e3bfab00de510c5444b4", "ppmpf_1": "", "ppmpf_2": "", "ppmpf_3": "", "ppmpf_4": "", "ppmpf_5": "", "pp_ReturnURL": "" }
app.post('/', async (rq, rs) => {
    const respone = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(rq.body),
        headers: {'Content-Type': 'application/json'}
    }
    )
    rs.json(await respone.json())
})


app.listen(3001, () => {
    console.log('listening on port 3001')
})