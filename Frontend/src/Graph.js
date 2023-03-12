import React from 'react';
import { Line } from 'react-chartjs-2';
import * as Utils from './Globalfunc/Utils';


export function Graph() {

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

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


const labels = Utils.months({count: 12});
const data = {
  labels: labels,
  datasets: [{
    label: 'Profit',
    // data: [65, 59, 80, 81, 56, 55, 40],
    data: Utils.labels({min: 0, max: 1000}),
    fill: true,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};


  return <Line options={options} data={data} />;

}
