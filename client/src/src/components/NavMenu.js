import React from "react";
import {LeftTabs, Tab} from "pui-react-tabs";
import Dashboard from "./DashBoard";
import AMR from "./AMR";
import Admin from "./Admin";
import FaDashboard from "react-icons";

const NavMenu = () =>
    <div>
        <LeftTabs defaultActiveKey={1} tabWidth={3} paneWidth={9}>
            <Tab eventKey={1} title="Dashboard"><FaDashboard/> {<Dashboard />}</Tab>
            <Tab eventKey={2} title="AMR">{<AMR />}</Tab>
            <Tab eventKey={3} title="Admin">{<Admin />}</Tab>
        </LeftTabs>
    </div>;
export default NavMenu;