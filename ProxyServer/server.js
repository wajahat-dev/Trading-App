// const express = require('express')
import express from "express";
const app = express();
import bodyParser from "body-parser";
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
import cors from "cors";
import fetch from "node-fetch";
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());
const URL =
  "https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction";

app.post("/", async (rq, rs) => {
  const respone = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(rq.body),
    headers: { "Content-Type": "application/json" },
  });
  rs.json(await respone.json());
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
