import React from 'react';
import GraphTitle from "../GraphTitle";
import {Doughnut} from "react-chartjs";

const GenderWise = ({title = 'Gender Wise', data = [{value: 50, color: "#6ccac9"}, {value: 50, color: "#ff6c60"}]}) => (
    <div className="col-lg-3 col-sm-6"
         style={{marginLeft: "2%", marginBottom: "2%", backgroundColor: "white", height: "235px", borderRadius:'7px'}}>
        <div><GraphTitle title={title}/></div>
        <Doughnut data={data} width="275" height="180" style={{float: "left"}}/>
        <div>
            <label className="col-lg-5 col-sm-6" style={{color: "#ff6c60", top: "10px", marginLeft: "30px"}}>Female {data[1].value}%</label>
            <label className="col-lg-5 col-sm-6" style={{color: "#6ccac9", top: "10px"}}>Male {data[0].value}%</label>
        </div>
    </div>);


export default GenderWise;