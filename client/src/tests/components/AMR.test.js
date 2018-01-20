import React from "react";

import AMR from "../../src/components/AMR";
import {mount, shallow} from "enzyme";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import asyncAssert from "../test-utils/AsyncUtil";

describe('AMR component', () => {


    let mock = null;
    const dropDownData = [
        {value: 1, label: "Foo"},
        {value: 123, label: "Bar"}
    ];
    const code = 123;
    const reportData = [
        {
            "studentcode": "001",
            "schoolcode": "123",
            "name": "Bob",
            "surname": "b",
            "gender": "M",
            "dob": "24-05-2017",
            "attendance": "24-05-2017"
        },
        {
            "code": "001",
            "schoolcode": "123",
            "name": "Bob",
            "surname": "b",
            "gender": "M",
            "dob": "24-05-2017",
            "attendance": "24-05-2017"
        }];
    const reportTableColumns = [
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
            Header: 'Attendance',
            accessor: 'attendance'
        }, {
            Header: 'Image',
            accessor: 'image'
        }]

    let component;
    let componentInstance;
    beforeEach(() => {
        mock = new MockAdapter(axios);
        mock.onGet('/amr/dropdown').reply(200, dropDownData);
        mock.onGet(`/bfr/v1/amr/${code}`).reply(200, {"data": reportData});
        mock.onGet(`/bfr/amr/student-image/001`).reply(200, "bitmapString");
        component = shallow(<AMR/>);
        componentInstance = mount(<AMR/>)
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
                ...reportData[0],
                image: <a onClick={_ => _}>View Image</a>
            },
            {
                ...reportData[1],
                image: <a onClick={_ => _}>View Image</a>
            }];
        component.instance().onHandleChange({value: 123, label: "Bar"});
        setTimeout(() => {
            expect(component.state().reportData[0].studentcode).toEqual("001");
            expect(component.state().reportData[0].schoolcode).toEqual("123");
            expect(component.state().reportData[0].image.type).toEqual("a");
            expect(component.find('ReactTable').props().columns).toEqual(reportTableColumns);
            // expect(component.find('ReactTable').props().data).toEqual([]);
            done();
        }, 0)

    });

    it('has selected value', (done) => {
        let selectedOption = {value: code, label: "Bar"};
        component.find('Select').props().onChange(selectedOption);
        setTimeout(() => {
            expect(component.state().selectedOption).toEqual(selectedOption);
            done();
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

    it("add image tag in report data on click of View Image url", done => {
        const data =
            [
                {
                    ...reportData[0],
                    "image": <a>View Image</a>
                },
                {
                    ...reportData[1],
                    "image": <a>View Image</a>
                }]
        const expectedReportedData =
            [
                {
                    ...reportData[0],
                    "image": <img src={"data:image/jpeg;base64,bitmapString"}
                                  style={{"height": "40px", "width": "40px"}}/>
                },
                {
                    ...reportData[1],
                    "image": <a>View Image</a>
                }]
        component.instance().setState({reportData: data})
         component.instance().addImage(data[0])
        setTimeout(() => {
            expect(component.state().reportData).toEqual(expectedReportedData)
            done();
        }, 0)
    });

    it("display No Image when image does not exist ", () => {
    })

    it("should add View Image url in report data", () => {
        //TODO not able to check onClick function in anchor tag
        expect(component.instance().addImageLink(reportData[0]).image.props.children).toEqual("View Image");
        expect(component.instance().addImageLink(reportData[0]).image.type).toEqual("a");
    })
    it("should no call api when selected option is cancelled from dropdown", done => {
        let selectedOption = {value: code, label: "Bar"};
        component.find("Select").props().onChange(selectedOption)
        component.find("Select").props().onChange(null)
        setTimeout(() => {
            // expect(component.state().selectedOption).toEqual('')
            // expect(component.state().reportData).toEqual([])
            done();
        }, 0)

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

    describe("loaded", () => {
        it("should not be displayed after page is loaded", (done) => {
            asyncAssert(done, () => {
                expect(componentInstance.instance().state.loaded).toEqual(true);
                expect(componentInstance.find('Loader').length).toEqual(0);
            }, 0)
        })
        it("should be displayed when page is loading", () => {
            // expect(component.state().loaded).toEqual(false)
        })
    })


});