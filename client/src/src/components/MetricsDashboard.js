import React from 'react';

const MetricsDashboard = ({total = 0, present = 0, percentage = 0}) => (
    <div>
        <div class="row state-overview">
            <div class="col-lg-4 col-sm-6" >
                <section class="panel">
                    <div class="symbol terques">
                        <i class="fa  fa-hand-pointer-o"></i>
                    </div>
                    <div class="value">
                        <h1 class="count">
                            {present}
                        </h1>
                        <p>Present</p>
                    </div>
                </section>
            </div>
            <div class="col-lg-4 col-sm-6">
                <section class="panel">
                    <div class="symbol red">
                        <i class="fa fa-users"></i>
                    </div>
                    <div class="value">
                        <h1 class=" count2">
                            {total}
                        </h1>
                        <p>Total</p>
                    </div>
                </section>
            </div>
            <div class="col-lg-4 col-sm-6">
                <section class="panel">
                    <div class="symbol yellow">
                        <i class="fa fa-percent"></i>
                    </div>
                    <div class="value">
                        <h1 class=" count3">
                            {percentage}
                        </h1>
                        <p>Percentage</p>
                    </div>
                </section>
            </div>
        </div>
    </div>);

export default MetricsDashboard;