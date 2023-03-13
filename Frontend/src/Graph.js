// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import * as Utils from './Globalfunc/Utils';


// export function Graph() {

//  const options = {
//   responsive: true,
//   interaction: {
//     mode: 'index' ,
//     intersect: false,
//   },
//   stacked: false,
//   plugins: {
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart - Multi Axis',
//     },
//   },
//   scales: {
//     y: {
//       type: 'linear' ,
//       display: true,
//       position: 'left' ,
//     },
//     y1: {
//       type: 'linear' ,
//       display: true,
//       position: 'right' ,
//       grid: {
//         drawOnChartArea: false,
//       },
//     },
//   },
// };

// // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


// const labels = Utils.months({count: 12});
// const data = {
//   labels: labels,
//   datasets: [{
//     label: 'Profit',
//     // data: [65, 59, 80, 81, 56, 55, 40],
//     data: Utils.labels({min: 0, max: 1000}),
//     fill: true,
//     borderColor: 'rgb(75, 192, 192)',
//     tension: 0.1
//   }]
// };


//   return <Line options={options} data={data} />;

// }



import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CNotification from './globalcomponents/CNotification';
import CLoader from './globalcomponents/CLoader';

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


  useEffect(() => {

    getGridData()



  }, [])

  const getGridData = async () => {
    setLoader(true)

    try {
      const response = await fetch(`https://localhost:7000/api/getusergriddata`, {
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

      if(data && data.globalState){
        setGlobalState(p => ({...p, griddata: data.griddata}))
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

      {/* <Button variant="outlined" color="neutral" onClick={() => setView('week')}
        // onClick={onClose}
        >
          View Week
        </Button>

        <Button variant="outlined" color="neutral" onClick={() => setView('month')}
        // onClick={onClose}
        >
          View Month
        </Button> */}
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <LineChart width={800} height={600} data={filteredData}
        //  margin={{
        //   top: 5,
        //   right: 30,
        //   left: 20,
        //   bottom: 5,
        // }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" />
        </LineChart>
      {/* </ResponsiveContainer> */}

      <div className="position-detail-lists">
    
        <div className='stock-chart'>

          <div className='button-container'>
            <Button variant="outlined" color="neutral" onClick={() => setView('week')}
            // onClick={onClose}
            >
              View Week
            </Button>

            <Button variant="outlined" color="neutral" onClick={() => setView('month')}
            // onClick={onClose}
            >
              View Month
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};


export default React.memo(Graph);