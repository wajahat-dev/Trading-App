import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ReferenceLine, AreaChart } from 'recharts';
import CNotification from './globalcomponents/CNotification';
import CLoader from './globalcomponents/CLoader';
import { useDispatch } from 'react-redux';
import { setData } from './store/TradingReducer';
import { Box } from '@material-ui/core';
import { useMediaQuery, useTheme,Grid } from '@material-ui/core';
const data = [
  { day: '2022-03-01', profit: 200 },
  { day: '2022-03-02', profit: 300 },
  { day: '2022-03-03', profit: 150 },
  { day: '2022-03-04', profit: 450 },
  { day: '2022-03-05', profit: 600 },
  { day: '2022-03-06', profit: 400 },
  { day: '2022-03-07', profit: 700 },
  { day: '2022-04-01', profit: 200 },
  { day: '2022-04-02', profit: 300 },
  { day: '2022-04-03', profit: 150 },
  { day: '2022-04-04', profit: 450 },
  { day: '2022-04-05', profit: 600 },
  { day: '2022-04-06', profit: 400 },
  { day: '2022-04-07', profit: 700 },

  // add more data for the month
];

const Graph = () => {
  const [view, setView] = useState('week');
  const [loader, setLoader] = useState(false)
  const [globalState, setGlobalState] = useState({
    message: '',
    open: false,
    varient: 'info',
    griddata: []
  })
  const filteredData = view === 'week' ? globalState.griddata.slice(-7) : globalState.griddata;
  const dispatch = useDispatch();

  const theme = useTheme();

  const isSmallerScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const md = useMediaQuery(theme.breakpoints.down('sm'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  var final = 400
  if (xs) {
    final = 300
  } else if (sm) {
    final = 600
  } else {
    final = 900

  }







  useEffect(() => {
    getGridData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getGridData = async () => {
    setLoader(true)

    try {
      const response = await fetch(`${process.env.React_APP_BASEURLPARTIAL}/getusergriddata`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          accept: '*/*',
          Authorization: `Bearer ${localStorage.getItem('TOKEN_KEY')
            ? localStorage.getItem('TOKEN_KEY')
            : ''
            }`,
        },
      });
      const data = await response.json()
      debugger

      if (data && data.griddata) {
        setGlobalState(p => ({ ...p, griddata: data.historydata }))
        dispatch(setData({ key: 'totalamount', value: data.totalamount }))
        // dispatch(setData({ key: 'totalamount', }))
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false)

    }

  }




  return (
    <>


      <CNotification isOpen={globalState.open} setOpen={e => setGlobalState(p => ({ ...p, open: e }))} message={globalState.message} />
      <CLoader enabled={loader} />
      <Grid container spacing={2}>
        
        {/* <ResponsiveContainer width={700} height="80%"> */}
        <LineChart width={final} height={400} data={filteredData}
          // <LineChart  data={filteredData}
          margin={{
            top: 30,
            // right: 30,
            // left: 20,
            // bottom: 5,
          }}
        >

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" name="Date" />
          <YAxis name="Profit" unit="$"/>
          <Tooltip />
          <Legend />
          <Line type="monotone" name="Profit Trend" dataKey="totalAmount" stroke="#2196f3" activeDot={{ r: 8 }} />
        </LineChart>
        </Grid>



      <div className="position-detail-lists">
        <div className='stock-chart'>
          <div className='button-container'>
            <Button variant="outlined" color="neutral" onClick={() => setView('week')}>
              View Week
            </Button>
            <Button variant="outlined" color="neutral" onClick={() => setView('month')} >
              View Month
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};


export default React.memo(Graph);