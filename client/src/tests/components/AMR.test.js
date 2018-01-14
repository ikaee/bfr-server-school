import React from "react";

import AMR from "../../src/components/AMR";
import {shallow} from "enzyme";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('AMR component', () => {


    let mock = null;
    const dropDownData = [
        {value: 1, label: "Foo"},
        {value: 123, label: "Bar"}
    ];
    const code = 123;
    const reportData = [
        {
            "code": "001",
            "name": "Bob",
            "surname": "b",
            "gender": "M",
            "dob": "24-05-2017",
            "attendance": "24-05-2017",
            image: "bitmapString"
        },
        {
            "code": "001",
            "name": "Bob",
            "surname": "b",
            "gender": "M",
            "dob": "24-05-2017",
            "attendance": "24-05-2017",
            image: "bitmapString"
        }];
    const reportTableColumns = [
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

    let component;
    beforeEach(() => {
        mock = new MockAdapter(axios);
        mock.onGet('/amr/dropdown').reply(200, dropDownData);
        mock.onGet(`/bfr/v1/amr/${code}`).reply(200, {"data": reportData});
        component = shallow(<AMR/>);
    });


    it('has select dropdown', () => {
        expect(component.find('Select').length).toEqual(1);
    });
    it('has report table', () => {
        expect(component.find('ReactTable').length).toEqual(1);
    });
    it('report table has data for selected dropdown value', (done) => {
        const expectedData = [
            {
                "code": "001",
                "name": "Bob",
                "surname": "b",
                "gender": "M",
                "dob": "24-05-2017",
                "attendance": "24-05-2017",
                image: <img src={"data:image/jpeg;base64,bitmapString"} style={{"height": "40px", "width": "40px"}}/>
            },
            {
                "code": "001",
                "name": "Bob",
                "surname": "b",
                "gender": "M",
                "dob": "24-05-2017",
                "attendance": "24-05-2017",
                image: <img src={"data:image/jpeg;base64,bitmapString"} style={{"height": "40px", "width": "40px"}}/>
            }];
        component.instance().onHandleChange({value: 123, label: "Bar"});
        setTimeout(() => {
            expect(component.state().reportData).toEqual(expectedData);
             expect(component.find('ReactTable').props().columns).toEqual(reportTableColumns);
             // expect(component.find('ReactTable').props().data).toEqual([]);
            done();
        },0)

    });

    it('has selected value', () => {
        let selectedOption = {value: code, label: "Bar"};
        component.find('Select').props().onChange(selectedOption);
        setTimeout(() => {
            expect(component.state().selectedOption).toEqual(selectedOption);
        }, 0);

    });

    it('should fetch drop down data from service', () => {
        expect(component.state().options).toEqual(dropDownData);
    });
    it('should set empty array as dropdown data when api call fails', () => {
        mock.onGet('/getAMRDropdown').reply(500);
        const component = shallow(<AMR/>)
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

    it("should convert to image", () => {
        const image = <img src={"data:image/jpeg;base64,bitmapString"} style={{"height": "40px", "width": "40px"}}/>
        expect(component.instance().convertImage(reportData[0]).image).toEqual(image);
    });
    it("should no call api when selected option is cancelled from dropdown", done => {
        let selectedOption = {value: code, label: "Bar"};
        component.find("Select").props().onChange(selectedOption)
        component.find("Select").props().onChange(null)
        setTimeout(() => {
            // expect(component.state().selectedOption).toEqual('')
            // expect(component.state().reportData).toEqual([])
            done();
        }, 0)

    })


});