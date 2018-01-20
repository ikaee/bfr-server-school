import React from 'react';
import GraphTitle from "../GraphTitle";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from 'recharts';


const MonthWise = ({
                       title = 'Month wise',
                       data = [
                           {name: 'Jan', value: 0},
                           {name: 'Feb', value: 0},
                           {name: 'Mar', value: 0},
                           {name: 'Apr', value: 0},
                           {name: 'May', value: 0},
                           {name: 'Jun', value: 0},
                           {name: 'Jul', value: 0},
                           {name: 'Aug', value: 0},
                           {name: 'Sep', value: 0},
                           {name: 'Oct', value: 0},
                           {name: 'Nov', value: 0},
                           {name: 'Dec', value: 0}]
                   }) => (

    <div className="col-lg-10 col-sm-6" style={{backgroundColor: "white", width: "850px", borderRadius: '7px'}}>
        <GraphTitle title={title}/>
        <BarChart width={800} height={500} data={data}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="value" fill="#8884d8"/>
        </BarChart>
    </div>);


export default MonthWise;