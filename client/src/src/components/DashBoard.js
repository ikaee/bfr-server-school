import React, {Component} from "react";
import GenderWise from "./graphs/GenderWise";
import MonthWise from "./graphs/MonthWise";
import AgeWise from "./graphs/AgeWise";
import MetricsDashboard from './MetricsDashboard';
import axios from 'axios';


class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        axios.get("/bfr/v1/dashboard")
            .then(({data}) => {
                this.setState({data})
            })
            .catch(err => {

            })
    }

    render() {
        const {age_data, attendance_data, gender_data, month_data} = this.state.data;
        return (
            <section className="wrapper">
                <div>
                    <MetricsDashboard {...attendance_data}/>
                    <MonthWise title ='Month wise' data={month_data}/>
                    <GenderWise title = 'Gender Wise' data = {gender_data}/>
                    <AgeWise title = {"Age wise"} data={age_data}/>
                </div>
            </section>
        )
    }
}

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