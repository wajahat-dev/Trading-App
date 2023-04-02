import { Button, Paper, styled } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ReferenceLine, AreaChart, Brush } from 'recharts';
import CNotification from './globalcomponents/CNotification';
import CLoader from './globalcomponents/CLoader';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from './store/TradingReducer';
import { Box } from '@material-ui/core';
import { useMediaQuery, useTheme, Grid } from '@material-ui/core';
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

class CustomizedLabel extends React.PureComponent {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10}
        textAnchor="middle">
        {value}$
      </text>
    );
  }
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


class CustomizedAxisTick extends React.PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        {/* <text height={600} x={10} y={10} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)"> */}
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)" >
          {payload.value}
        </text>
      </g>
    );
  }
}

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
  const initData = useSelector(state => state.Trading);

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

  useEffect(() => {
    if(initData.isRefreshUserDetails){
      getGridData()
      dispatch(setData({key: "isRefreshUserDetails", value: false}))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initData.isRefreshUserDetails])

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


      </Grid>


      <Grid container spacing={2}>
        <Grid item xs={12} md={12} >
          <Item>
            <h4>Daily Profit Data</h4>
            <div style={{ width: "100%", height: 500 }}>
              <ResponsiveContainer>

                <LineChart
                  // width={final} height={400} 
                  data={filteredData}
                  // <LineChart  data={filteredData}
                  margin={{
                    top: 30,
                    right: 30,
                    left: 80,
                    bottom: 100,
                  }}
                >

                  <CartesianGrid
                  offset={333}
                  fill={"#2196f3"}

                  strokeDasharray="3 3" 
                  // strokeDasharray="" 
                  />
                  {/* <XAxis dataKey="date" name="Date" /> */}
                  <XAxis dataKey="date" name="Date" 
                  // tick={<CustomizedAxisTick />}
                  angle={-45}
                  dy={45}
                  
                  />
                  <YAxis name="Profit" unit="$"
                  //  width={300}
                  label={{
                    value: `Profit`,
                    style: { textAnchor: 'middle' },
                    angle: -45,
                    position: 'left',
                    offset: 0,
                  }}
                    allo />
                  <Tooltip />
                  {/* <Line label={<CustomizedLabel />} type="monotone" name="Profit Trend" dataKey="totalAmount" stroke="#2196f3" activeDot={{ r: 8 }} strokeWidth={3} /> */}
                  <Line label={<CustomizedLabel />}
                  
                  type="monotone" name="" dataKey="totalAmount" stroke="#FF0000" activeDot={{ r: 8 }} strokeWidth={2} />
                  <Brush y={450}/>
                  {/* <Legend /> */}

                </LineChart>
              </ResponsiveContainer>

            </div>
            {/* <AreaChart
             width={final} height={400} data={filteredData}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" name="Date" />
          <YAxis name="Profit" unit="$" label={{
              value: `Profit`,
              style: { textAnchor: 'middle' },
              angle: -45,
              position: 'left',
              offset: 0,
            }}
            allo/>
            <Tooltip />
            <Area type="monotone" name="Profit Trend" dataKey="totalAmount" stroke="#2196f3" activeDot={{ r: 8 }} />
          </AreaChart> */}


          </Item>
        </Grid>
        <Grid item xs={12} md={12} >

          <Item><div className="position-detail-lists">

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
          </div></Item>
        </Grid>
      </Grid>






    </>
  );
};


export default React.memo(Graph);