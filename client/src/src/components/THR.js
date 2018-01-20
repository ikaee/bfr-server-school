import React, {Component} from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import axios from 'axios';
import {css, StyleSheet} from "aphrodite";
import ReactTable from 'react-table'
import "react-table/react-table.css";
import {Option} from "../utils/Option"
import Loader from "react-loader"

export const reportTableColumns = [
    {
        Header: 'Code',
        accessor: 'studentcode'
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
        Header: 'THR',
        accessor: 'thr'
    }, {
        Header: 'Image',
        accessor: 'image'
    }]

export default class THR extends Component {

    constructor() {
        super();
        this.state = {
            selectedOption: '',
            options: [],
            reportData: [],
            loaded: false
        }
    }


    addImageLink = record => {
        return Object.assign({}, record, {
            image: <a onClick={_ => this.addImage(record)}>View Image</a>
        })
    };

    isSameCode = (r, record) => r.studentcode === record.studentcode

    addImage = record => {
        const MIME = "data:image/jpeg;base64,";
        axios.get(`/bfr/thr/student-image/${record.schoolcode}/${record.studentcode}`).then(res => {
            const image = <img src={MIME + res.data} style={{"height": "40px", "width": "40px"}}/>;
            const newRecord = Object.assign({}, record, {"image": image})

            this.setState(prevState => ({
                reportData: prevState.reportData.map(r => this.isSameCode(r, record) ? newRecord : r)
            }))
        })
    }


    onHandleChange = selectedOption => {
        this.setState({loaded: false});
        Option(selectedOption).fold(
            _ => this.setState({selectedOption: '', reportData: [], loaded: true}),
            _ => {
                axios.get(`/bfr/thr/log/${selectedOption.value}`).then(res => {
                    this.setState({
                        selectedOption,
                        reportData: res.data.data.map(this.addImageLink),
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
        return (
            <div>
                <Loader loaded={this.state.loaded} top="300px" left="100%">
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
                </Loader>
            </div>
        )
    }

    componentDidMount = () => {
        axios.get('/bfr/thr/dropdown').then(({data}) => {
            console.log("sdsd", data);
            this.setState({
                options: data,
                loaded: true
            })
        }).catch(err => {
            this.setState({loaded: true})
        })
    }

}