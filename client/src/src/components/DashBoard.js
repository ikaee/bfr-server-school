import React from "react";
import GenderWise from "./graphs/GenderWise";
const data = [
    {
        value: 30,
        color: "#F7464A"
    },
    {
        value: 50,
        color: "#E2EAE9"
    }];
const Dashboard = () =>
    <div>
        <GenderWise title={"Gender Wise"} data={data}/>
    </div>;
export default Dashboard;