import React, {Component} from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import axios from 'axios';
import {css, StyleSheet} from "aphrodite";
import ReactTable from 'react-table'
import "react-table/react-table.css";
import image from "../images/item.bmp"

export const reportTableColumns = [
    {
        Header: 'Code',
        accessor: 'code'
    }, {
        Header: 'Name',
        accessor: 'name'
    }, {
        Header: 'Surname',
        accessor: 'surname'
    }, {
        Header: 'Gender',
        accessor: 'gender'
    }, {
        Header: 'Dob',
        accessor: 'dob'
    }, {
        Header: 'Attendance',
        accessor: 'attendance'
    }, {
        Header: 'Image',
        accessor: 'image'
    }]

class AMR extends Component {

    constructor() {
        super();
        this.state = {
            selectedOption: '',
            options: [],
            reportData: []

        }
    }


    convertImage = (record) => {
        const MIME = "data:image/jpeg;base64,";
        return Object.assign({}, record, {
            image: <img src={MIME + record.image} style={{width: '40px', height: '40px'}}/>
        })
    };


    onHandleChange = selectedOption => {
        //TODO make api call
        axios.get(`/getAMRData/${selectedOption.value}`).then(({data}) => {
            this.setState({
                reportData: data.map(this.convertImage),
                selectedOption
            })
        })

    }

    render() {
        const {options} = this.state;
        let selectedOption = this.state.selectedOption;
        const value = selectedOption && selectedOption.value;
        return (
            <div>
                <Select
                    value={value}
                    onChange={this.onHandleChange}
                    options={options}
                />
                <ReactTable
                    style={{width: "900px", marginTop: "20px"}}
                    data={this.state.reportData}
                    columns={reportTableColumns}
                    filterable
                    defaultPageSize={5}
                    className="-striped -highlight"
                />
            </div>
        )
    }

    componentDidMount = () => {
        axios.get('/getAMRDropdown').then(({data}) => {
            this.setState({
                options: data,
            })
        })
    }

}

export default AMR;