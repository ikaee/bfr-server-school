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

        <div class="row state-overview">
            <div class="col-lg-4 col-sm-6">
                <section class="panel">
                    <div class="symbol terques">
                        <i class="fa  fa-hand-pointer-o"></i>
                    </div>
                    <div class="value">
                        <h1 class="count">
                            {present}
                        </h1>
                        <p>New Users</p>
                    </div>
                </section>
            </div>
            <div class="col-lg-4 col-sm-6">
                <section class="panel">
                    <div class="symbol red">
                        <i class="fa fa-tags"></i>
                    </div>
                    <div class="value">
                        <h1 class=" count2">
                            0
                        </h1>
                        <p>Sales</p>
                    </div>
                </section>
            </div>
            <div class="col-lg-4 col-sm-6">
                <section class="panel">
                    <div class="symbol yellow">
                        <i class="fa fa-shopping-cart"></i>
                    </div>
                    <div class="value">
                        <h1 class=" count3">
                            0
                        </h1>
                        <p>New Order</p>
                    </div>
                </section>
            </div>
        </div>
        <div style={metricsStyle}> <MetricsComponent label={"Present"} consolidatedCount={present} Icon={FaHandOUp} /></div>
        <div style={metricsStyle}><MetricsComponent label={"Total"} consolidatedCount={total} Icon={FaGroup}/></div>
        <div style={metricsStyle}><MetricsComponent label={"Percentage"} consolidatedCount={percentage} Icon={FaPercent}/></div>
    </div>);

export default MetricsDashboard;