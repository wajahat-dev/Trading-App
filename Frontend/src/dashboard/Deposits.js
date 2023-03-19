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




const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export function Deposits({ getHistoricalData, ledger }) {
  const classes = useStyles();
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate()
  const dispatch = useDispatch();
  const [accumulation, setAccumulation] = useState(0)

  const Trading = useSelector((state) => state.Trading);


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

  const handleClick = async (e) => {
    const deposit = 1000;

    const payload = {
      deposit
    };
    await dispatch(createInstance(payload));
  }

  const takeOut = async (e) => {
    const deposit = -5;

    const payload = {
      deposit
    };
    await dispatch(createInstance(payload));
  }
  const [loader, setLoader] = React.useState(false)

  const [globalState, setGlobalState] = useState({
    header: '',
    message: '',
    modal: false,
  })

  const onClickModal = async (isSuspendAction) => {
    setLoader(true)

    try {
      const response = await fetch(`https://localhost:7000/api/suspend-user`, {
        method: "post",

        body: JSON.stringify({
          "userId": globalState.selectedRow.userId,
          "adminID": "string",
          "isSuspendAction": isSuspendAction
        }),
        headers: {
          "Content-Type": "application/json",
          "accept": '*/*',
          Authorization: `Bearer ${localStorage.getItem('TOKEN_KEY')
            ? localStorage.getItem('TOKEN_KEY')
            : ''
            }`,

        },
      });
      
      setGlobalState(p => ({ ...p, modal: false }))

    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false)
    }
  }


  return (
    <React.Fragment>
      <CLoader enabled={loader} />

      <div className='userHeader'>
        <Title>Portfolio Value</Title>
        <Typography component="p" variant="h4">
          {/* $<CountUp start={0} decimals={2} end={accumulation} duration={1.00} separator="," /> */}
          ${(Trading.totalamount || 0 ).toFixed(2)}
        </Typography>
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
