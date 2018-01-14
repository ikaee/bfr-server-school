import React, {Component} from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import axios from 'axios';

class AMR extends Component {

    constructor() {
        super();
        this.state = {
            selectedOption: '',
            options: []

        }
    }

    onHandleChange = selectedOption => {
        this.setState({selectedOption})
    }

    render() {
        const {dropDownData} = this.state.options;
        let selectedOption = this.state.selectedOption;
        const value = selectedOption && selectedOption.value;
        return (
            <div>
                <Select
                    value={value}
                    onChange={this.onHandleChange}
                    options={dropDownData}
                />
            </div>
        )
    }

    componentDidMount = () => {
        axios.get('/getAMRDropdown').then(({data}) => {
            this.setState({
                options: data
            })
        })
    }

}

export default AMR;