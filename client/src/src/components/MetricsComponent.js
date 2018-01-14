import React from 'react';

const MetricsComponent = ({label = "", consolidatedCount = 0, Icon}) =>
    <div>
        <Icon height={50} width={50} color={'green'} style={{float: "left"}}/>
        <div style={{marginLeft: "60px"}}>
            <label className={"consolidatedCount"}>{consolidatedCount}</label>
            <div className={"metricsLabel"}>{label}</div>
        </div>
    </div>;
export default MetricsComponent;