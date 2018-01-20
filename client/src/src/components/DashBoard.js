import React from "react";
import GenderWise from "./graphs/GenderWise";
import MonthWise from "./graphs/MonthWise";
import AgeWise from "./graphs/AgeWise";
import MetricsDashboard from './MetricsDashboard';

const Dashboard = () =>
    <section class="wrapper">
        <div>
            <MetricsDashboard present={10} total={20} percentage={50}/>
            <MonthWise/>
            <GenderWise/>
            <AgeWise/>
        </div>
    </section>;
const data = [
    {
        value: 40,
        color: "#F7464A"
    },
    {
        value: 50,
        color: "#E2EAE9"
    }];
export default Dashboard;