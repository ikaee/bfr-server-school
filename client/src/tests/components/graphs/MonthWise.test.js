import React from 'react';
import MonthWise from '../../../src/components/graphs/MonthWise';
import {shallow} from "enzyme";
import GraphTitle from "../../../src/components/GraphTitle";

describe("Month wise Graph", () => {

    const data = [{name: "abc", attendance: 100}, {name: "pqr", attendance: 200}];
    const title = "Month wise";
    const monthWiseComponent = shallow(<MonthWise title={title} data={data}/>);

    it("should render", () => {
        shallow(<MonthWise/>);
    });

    it("has title", () => {
        const title = <GraphTitle title={"Month wise"}/>;
        expect(monthWiseComponent).toContainReact(title);
    });

    it("has Bar chart", () => {
        expect(monthWiseComponent.find("BarChart").length).toEqual(1);
    });

    it("has Bar chart with given data", () => {
        expect(monthWiseComponent.find("BarChart").props().data).toEqual(data);
    });

});