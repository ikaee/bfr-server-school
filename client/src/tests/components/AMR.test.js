import React from "react";

import AMR from "../../src/components/AMR";
import {shallow, mount} from "enzyme";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('AMR component', () => {


    let mock = null;
    const dropDownData = [
        {value: 1, label: "Foo"},
        {value: 2, label: "Bar"}
    ];
    let component;
    beforeEach(() => {
        mock = new MockAdapter(axios);
        mock.onGet('/getAMRDropdown').reply(200, dropDownData);
        component = shallow(<AMR/>);
    });


    it('has select dropdown', () => {
        expect(component.find('Select').length).toEqual(1);
    });

    it('has selected value', () => {
        let selectedOption = {value: 2, label: "Bar"};
        component.find('Select').props().onChange(selectedOption);
        expect(component.state().selectedOption).toEqual(selectedOption);
    });

    it('should fetch drop down data from service', () => {
         expect(component.state().options).toEqual(dropDownData);
    });
    it('should set empty array as dropdown data when api call fails', () => {
        mock.onGet('/getAMRDropdown').reply(500);
        const component = shallow(<AMR />)
        expect(component.state().options).toEqual([]);
    });

    describe('Select dropdown', () => {
        it('has default placeHolder', () => {
            expect(component.find('Select').props().placeholder).toEqual("Select...");
        });
        it('has value from state', () => {
            let selectedOption = {value: 2, label: "Bar"};
            component.setState({selectedOption});
            expect(component.find("Select").props().value).toEqual(selectedOption.value);
        });

    });

});