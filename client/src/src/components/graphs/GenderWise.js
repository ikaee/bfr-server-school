import React from 'react';
import GraphTitle from "../GraphTitle";
import {Doughnut} from "react-chartjs";

const GenderWise = ({title, data}) => (
    <div>
        <div><GraphTitle title={title}/></div>
        <Doughnut data={data}   width="200" height="200"/>
    </div>);


export default GenderWise;