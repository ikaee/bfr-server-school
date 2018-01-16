import React from 'react';
import MetricsDashboard from '../../src/components/MetricsDashboard';
import {shallow} from "enzyme";
import MetricsComponent from "../../src/components/MetricsComponent";
import FaGroup from 'react-icons/lib/fa/group';
import FaHandOUp from 'react-icons/lib/fa/hand-o-up';
import FaPercent from 'react-icons/lib/fa/percent';

describe("MetricsDashboard", () => {

    const component = shallow(<MetricsDashboard present={10} total={20} percentage={50}/>);

    it("should render", () => {
        shallow(<MetricsDashboard present={10} total={20} percentage={50}/>);
    });

    it("has Metrics data for dashboard with default values", () => {
        const presentMetricsComponent = <MetricsComponent label={"Present"} consolidatedCount={10} Icon={FaHandOUp}/>;
        const totalMetricsComponent = <MetricsComponent label={"Total"} consolidatedCount={20} Icon={FaGroup}/>;
        const percentageMetricsComponent = <MetricsComponent label={"Percentage"} consolidatedCount={50} Icon={FaPercent}/>;

        expect(component).toContainReact(presentMetricsComponent);
        expect(component).toContainReact(totalMetricsComponent);
        expect(component).toContainReact(percentageMetricsComponent);


    });
});