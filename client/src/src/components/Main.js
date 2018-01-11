import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import DocumentTitle from "react-document-title";
import faviconImage from "../images/icds.ico";
import Favicon from "react-favicon";
import Header from "./Header";
import NavMenu from "./NavMenu";


export default () =>
    <Router>
        <div>
            <DocumentTitle title="BFR"/>
            <Favicon url={faviconImage}/>
            <Header title={"ICDS"} date={"January 2018"}/>
            <NavMenu/>
        </div>
    </Router>