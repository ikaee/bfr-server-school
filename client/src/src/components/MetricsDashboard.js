import React from 'react';
import MetricsComponent from './MetricsComponent';
import FaGroup from 'react-icons/lib/fa/group';
import FaHandOUp from 'react-icons/lib/fa/hand-o-up';
import FaPercent from 'react-icons/lib/fa/percent';

const metricsStyle ={
    float:'left',
    height:'100px',
    width:'300px',
    border:'ridge',
    borderRadius:'8px'
}

const MetricsDashboard = ({total = 0, present = 0, percentage = 0}) => (
    <div>
        <div style={metricsStyle}> <MetricsComponent label={"Present"} consolidatedCount={present} Icon={FaHandOUp} /></div>
        <div style={metricsStyle}><MetricsComponent label={"Total"} consolidatedCount={total} Icon={FaGroup}/></div>
        <div style={metricsStyle}><MetricsComponent label={"Percentage"} consolidatedCount={percentage} Icon={FaPercent}/></div>
    </div>);

export default MetricsDashboard;