import React from 'react';
import MetricsComponent from '../../src/components/MetricsComponent';
import {shallow} from "enzyme";
import FaGroup from 'react-icons/lib/fa/group';

describe("Metrics component",()=>{

    const label = "dummy label";
    const consolidatedCount="12";
    const icon = FaGroup;


    const metricsComponent= shallow(<MetricsComponent label={label} consolidatedCount={consolidatedCount} Icon={icon}/>);

    it("should render",()=>{
       shallow(<MetricsComponent/>)
    });

    it("has label",()=>{
        expect(metricsComponent.find('.consolidatedCount').text()).toEqual(consolidatedCount)
    });

    it("has given consolidated count",()=>{
       expect(metricsComponent.find('.metricsLabel').text()).toEqual(label);
    });

    it("has given Icon to render",()=>{
        expect(metricsComponent.find('FaGroup').length).toEqual(1);
    });

});