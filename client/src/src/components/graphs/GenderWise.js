import React from 'react';
import GraphTitle from "../GraphTitle";
import {Doughnut} from "react-chartjs";

const GenderWise = ({ title = 'Gender Wise', data = [{value: 50, color: "#F7464A"}, {value: 50, color: "#3a53e0"}] }) => (
    <div>
        <div><GraphTitle title={title}/></div>
        <Doughnut data={data} width="200" height="200"/>
    </div>);


export default GenderWise;