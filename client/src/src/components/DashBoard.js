import React from "react";
import GenderWise from "./graphs/GenderWise";
import MonthWise from "./graphs/MonthWise";
import AgeWise from "./graphs/AgeWise";
import MetricsDashboard from './MetricsDashboard';

const data = [
    {
        value: 40,
        color: "#F7464A"
    },
    {
        value: 50,
        color: "#E2EAE9"
    }];
const Dashboard = () =>
    <div>
        <MetricsDashboard present={10} total={20} percentage={50}/>
        <div style={{float:'left', margin:'80px'}}>
            <div style={{float:'left',backgroundColor:'white'}}><GenderWise title={"Gender Wise"} data={data}/></div>
            <div style={{float:'left',backgroundColor:'white', floatLeft:'50px'}}><MonthWise/></div>
            <div style={{float:'left',backgroundColor:'white'}}><AgeWise/></div>
        </div>
    </div>;
export default Dashboard;