import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

export function Graph() {


// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

 const options = {
  responsive: true,
  interaction: {
    mode: 'index' ,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart - Multi Axis',
    },
  },
  scales: {
    y: {
      type: 'linear' ,
      display: true,
      position: 'left' ,
    },
    y1: {
      type: 'linear' ,
      display: true,
      position: 'right' ,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const [stockChartXValues, setstockChartXValues] = useState([]);
const [stockChartYValues, setstockChartYValues] = useState([]);

 const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: stockChartXValues,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Dataset 2',
      data: stockChartXValues,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      yAxisID: 'y1',
    },
    
  ],
};


const lineChartData = {
    labels: stockChartXValues,
    datasets: [
      {
        label: 'Portfolio Value',
        data: stockChartYValues,
        fill: false,
        backgroundColor: stockChartYValues[0] < stockChartYValues[stockChartYValues.length - 1] ? 'green' : 'red',
        // borderColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: stockChartYValues[0] < stockChartYValues[stockChartYValues.length - 1] ? 'green' : 'red',

      },
    ],
  }

  const options1 = {
    legend: {
      display: true,
    },
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
      xAxes: [{
        display: false,
      }]
    },
  }


  return <Line options={options} data={data} />;
//   return   <Line data={lineChartData} options={options1} />
  ;
}
