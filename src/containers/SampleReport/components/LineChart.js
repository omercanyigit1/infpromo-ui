import React from 'react';
import { Bar } from 'react-chartjs-2';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const LineChartComponent = ({data, tickFormatX, tickFormatY, dataKeyLine}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}
                 margin={{top: 10, right: 10, left: -10, bottom: 0}}>
        <XAxis dataKey="month" tickCount={20} minTickGap={-20} angle={-30} tickSize={15}
               height={40} padding={{top: 10}}/>
        <YAxis tickFormatter={tickFormatX}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip  />
        <Legend/>
        <Line type="monotone" dataKey={`${dataKeyLine}`} stroke="#3367d6" strokeWidth={2}
              activeDot={{r: 3}}/>
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineChartComponent;
