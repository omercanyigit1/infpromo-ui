import React from 'react';
import { Bar } from 'react-chartjs-2';

const LineChartComponent = () => {
  return (
    <div>
      <Bar data={{
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
      }} />
    </div>
  )
}

export default LineChartComponent;
