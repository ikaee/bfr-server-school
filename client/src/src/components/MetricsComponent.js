import React from 'react';

const MetricsComponent = ({label = "", consolidatedCount = 0, Icon}) =>
    <div >
        <Icon height={95} width={150} style={{float: "left"}}/>
        <div >
            <div ><label className={"consolidatedCount"}>{consolidatedCount}</label></div>
            <div className={"metricsLabel"} >{label}</div>
        </div>
    </div>;
export default MetricsComponent;