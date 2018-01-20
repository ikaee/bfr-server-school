import React from 'react';
import GraphTitle from "../GraphTitle";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from 'recharts';


const MonthWise = ({title ='Month wise', data=[
    {name: 'Jan', attendance: 900},
    {name: 'Feb', attendance: 500},
    {name: 'Mar', attendance: 700},
    {name: 'Apr', attendance: 300},
    {name: 'May', attendance: 450},
    {name: 'Jun', attendance: 500},
    {name: 'Jul', attendance: 100},
    {name: 'Aug', attendance: 400},
    {name: 'Sep', attendance: 600},
    {name: 'Oct', attendance: 700},
    {name: 'Nov', attendance: 450},
    {name: 'Dec', attendance: 200}] }) => (

    <div class="col-lg-10 col-sm-6" style={{backgroundColor: "white", width: "850px", borderRadius:'7px'}}>
        <GraphTitle title={title}/>
        <BarChart width={800} height={500} data={data} >
            <XAxis dataKey="name"/>
            <YAxis />
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="attendance" fill="#8884d8" />
        </BarChart>
    </div>);


export default MonthWise;