import GenderWise from '../../../src/components/graphs/GenderWise';
import {shallow, mount} from "enzyme";
import React from 'react';
import GraphTitle from '../../../src/components/GraphTitle';
import {Doughnut} from "react-chartjs";


describe('Gender wise Graph',()=>{
    const data = [
        {
            value: 30,
            color: "#F7464A"
        },
        {
            value: 50,
            color: "#E2EAE9"
        }];
    const genderWiseComponent = shallow(<GenderWise title={"Gender Wise"} data={data}/>);

    it('should render',()=>{
       shallow(<GenderWise/>);
    });

    it('has title',()=>{
        const title = <GraphTitle title={"Gender Wise"}/>;
        expect(genderWiseComponent).toContainReact(title);
    });

    it('has Doughnut graph',()=>{
        const genderGraph = <Doughnut data={data} height="200" width="200" />;
        expect(genderWiseComponent.props().children[1]).toEqual(genderGraph)
    });

});