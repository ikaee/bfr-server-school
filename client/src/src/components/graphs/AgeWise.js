import React from 'react';
import GraphTitle from "../GraphTitle";
import {Cell, Legend, Pie, PieChart} from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

export const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


const AgeWise = ({title = "Age wise", data = [{name: '0m-6m', value: 100}, {name: '6m-2Y', value: 200}, {name: '2Y-3.5Y', value: 300}, {name: '3.5Y-6', value: 400}]}) => (
    <div>
        <GraphTitle title={title}/>
        <PieChart width={400} height={300}>
            <Legend dataKey={"name"}/>
            <Pie data={data}
                 cx={180}
                 cy={120}
                 labelLine={false}
                 label={renderCustomizedLabel}
                 outerRadius={100}
                 fill="#8884d8">
                {
                    data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                }
            </Pie>
        </PieChart>
    </div>);

export default AgeWise;