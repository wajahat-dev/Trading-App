import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CountUp from 'react-countup';
import Title from './Title';
import { getHistoricalData } from '../store/actions/ledger';
import { useSelector, useDispatch } from "react-redux";
import { createInstance } from "../store/actions/ledger";
import { Button } from '@material-ui/core';
import CLoader from '../globalcomponents/CLoader';
import { setData } from '../store/TradingReducer';
import { Box } from '@mui/material';


const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});



const RowWithBoxes = () => {
  const initData = useSelector((state) => state.Trading);

  return (
    <Box display="flex">
      <Box border={1} p={2} m={1}>
        <Title>Total Amount Value (Bitcoin)</Title>
        <Typography variant="subtitle1">${(initData.totalamount || 0).toFixed(2)}</Typography>
      </Box>
      
      <Box border={1} p={2} m={1}>
        <Title>Investment Value (Bitcoin)</Title>
        <Typography variant="subtitle1"> ${(initData.investment || 0).toFixed(2)}</Typography>
      </Box>
      <Box border={1} p={2} m={1}>
        <Title>Profit Value (Bitcoin)</Title>
        <Typography variant="subtitle1"> ${(initData.profit  || 0).toFixed(2)}</Typography>
      </Box>
      <Box border={1} p={2} m={1}>
        <Title>Direct Commision (Bitcoin)</Title>
        <Typography variant="subtitle1"> ${(initData.commission || 0).toFixed(2)}</Typography>
      </Box>
      <Box border={1} p={2} m={1}>
        <Title>WithDrawal Limit (Bitcoin)</Title>
        <Typography variant="subtitle1"> ${(initData.investment  * 2 || 0).toFixed(2)}</Typography>
      </Box>
    </Box>
  );
};

export function Deposits({ getHistoricalData, ledger }) {
  const classes = useStyles();
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate()
  const dispatch = useDispatch();
  const [accumulation, setAccumulation] = useState(0)
  const initData = useSelector((state) => state.Trading);
  const [loader, setLoader] = React.useState(false)
  const [globalState, setGlobalState] = useState({
    header: '',
    message: '',
    modal: false,
  })


  useEffect(() => {
    if (!ledger)
      getHistoricalData();
  });

  useEffect(() => {
    if (ledger) {
      const deposits = (ledger.reduce(function (accumulator, instance) {
        return accumulator + parseFloat(instance.deposit);
      }, 0)).toFixed(2);

      const cumulative = ledger.reduce(function (accumulator, instance) {
        return accumulator + (instance.soldPrice * instance.shares) - (instance.boughtPrice * instance.shares);
      }, parseFloat(deposits)).toFixed(2);

      setAccumulation(parseInt(cumulative))
    }
  }, [ledger]);



  return (
    <React.Fragment>
      <CLoader enabled={loader} />

      <div className='userHeader'>
        {/* <Title>Total Amount Value (Bitcoin)</Title>
        <Typography component="p" variant="h4">
          ${(initData.totalamount || 0).toFixed(2)}
        </Typography>
        <Title>Profit Value (Bitcoin)</Title>
        <Typography component="p" variant="h4">
          ${(initData.profit || 0).toFixed(2)}
        </Typography>
        <Title>Investment Value (Bitcoin)</Title>
        <Typography component="p" variant="h4">
          ${(initData.profit || 0).toFixed(2)}
        </Typography>
       */}
        <RowWithBoxes />
        <Typography color="textSecondary" className={classes.depositContext}>
          on {month + '/' + date + '/' + year}
        </Typography> 
        <div>
          <Button variant="outlined" color="neutral"
          //  onClick={onClose}
          >
            Deposit $1000
          </Button>

          <Button variant="outlined" color="neutral"
          // onClick={onClose}
          >
            Maximum Withdrawal $5
          </Button>

        </div>
      </div >
    </React.Fragment >
  );
}

const DepositsContainer = () => {
  const ledger = useSelector((state) => Object.values(state.ledger));
  const dispatch = useDispatch();
  return (
    <Deposits
      ledger={ledger}
      getHistoricalData={() => dispatch(getHistoricalData())}

    />
  );
};

export default DepositsContainer;
