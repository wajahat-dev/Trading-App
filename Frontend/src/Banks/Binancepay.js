import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  Typography,
  Paper,
} from "@material-ui/core";

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

function BinancePayCheckout() {
  const classes = useStyles();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle checkout logic
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Typography variant="h5" className={classes.title}>
          Binance Pay Checkout
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
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!phoneNumber}
          >
            Checkout
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default BinancePayCheckout;
