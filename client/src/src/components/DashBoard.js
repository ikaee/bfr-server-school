import React from "react";
import GenderWise from "./graphs/GenderWise";
import MonthWise from "./graphs/MonthWise";
import AgeWise from "./graphs/AgeWise";
import MetricsComponent from "./MetricsComponent";
import FaGroup from 'react-icons/lib/fa/group';

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
        <MetricsComponent label={"Present"} consolidatedCount={12} Icon={FaGroup}/>
        <GenderWise title={"Gender Wise"} data={data}/>
        <MonthWise/>
        <AgeWise/>
    </div>;
export default Dashboard;