import React, {Component} from "react";
import GenderWise from "./graphs/GenderWise";
import MonthWise from "./graphs/MonthWise";
import AgeWise from "./graphs/AgeWise";
import MetricsDashboard from './MetricsDashboard';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Loader from "react-loader";
import axios from 'axios';
import {Option} from "../utils/Option";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            data: {},
            loaded: true,
            selectedOption: {value: 'attendance', label: 'Attendance'},
            options: [{value: 'attendance', label: 'Attendance'}, {value: "thr", label: "Take Home Ration"}, {value: 'hot-cooked', label: 'HotMeals'}]
        }
    }

    componentDidMount() {
        axios.get(`/bfr/v1/dashboard/${this.state.selectedOption.value}`)
            .then(({data}) => {
                this.setState({
                    loaded:true,
                    data
                })
            })
            .catch(err => {

            })
    }

    onHandleChange = selectedOption => {

        this.setState({
            selectedOption,
            loaded: true,
            selectedDashboard:selectedOption.label
        });

        Option(selectedOption).fold(
            _ => this.setState({selectedOption: '', reportData: [], loaded: true}),
            _ => {
                axios.get(`/bfr/v1/dashboard/${selectedOption.value}`).then(res => {
                    console.log("called got data",res.data);
                    this.setState({
                        selectedOption,
                        data: res.data,
                        loaded: true
                    })
                }).catch(err => {
                    this.setState({loaded: true})
                })

            })

    }

    render() {
        const {options} = this.state;
        let selectedOption = this.state.selectedOption;
        const value = selectedOption && selectedOption.value;
        const {age_data, attendance_data, gender_data, month_data} = this.state.data;

        return (

            <section className="wrapper">
                <div>
                    <Select
                        style={{width: "95%"}}
                        value={value}
                        onChange={this.onHandleChange}
                        options={options}
                    />
                </div>
                <Loader loaded={this.state.loaded} top="50%" left="55%">
                    <div style={{height: '20px',  fontSize: '20px', paddingBottom: '30px'}}>
                        <label > {this.state.selectedOption.label} Dashboard</label>
                    </div>
                    <div>
                        <MetricsDashboard {...attendance_data}/>
                        <MonthWise title='Month wise' data={month_data}/>
                        <GenderWise title='Gender Wise' data={gender_data}/>
                        <AgeWise title={"Age wise"} data={age_data}/>
                    </div>
                </Loader>
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