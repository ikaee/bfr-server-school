import React from 'react';
import AgeWise, {renderCustomizedLabel} from '../../../src/components/graphs/AgeWise';
import {shallow} from "enzyme";
import GraphTitle from "../../../src/components/GraphTitle";
import {PieChart} from 'recharts';

describe("AgeWise graph component", () => {

    const title = "Age wise";
    const data = [{name: 'foo', value: 123}, {name: 'bar', value: 456}];
    const ageWiseComponent = shallow(<AgeWise title={title} data={data}/>);

    it("should render", () => {
        shallow(<AgeWise/>);
    });

    it("has title", () => {
        expect(ageWiseComponent.find('GraphTitle').props().title).toEqual(title);
    });

    it("has Pie chart", () => {
        expect(ageWiseComponent.find("PieChart").length).toEqual(1);
    });

    it("has Pie chart with Pie of given data", () => {
        expect(ageWiseComponent.find("Pie").props().data).toEqual(data);
    });

    it("has Pie chart with *required* props for ui rendering",()=>{
        const renderedPieChart = ageWiseComponent.find("PieChart");
        expect(renderedPieChart.find("Pie").length).toEqual(1);

        const renderedPie = renderedPieChart.find("Pie");
        expect(renderedPie.props().cx).toEqual(180);
        expect(renderedPie.props().cy).toEqual(120);
        expect(renderedPie.props().labelLine).toEqual(false);
        expect(renderedPie.props().outerRadius).toEqual(100);

    });
});