import React from 'react';

const MetricsDashboard = ({total = 0, present = 0, percentage = 0}) => (
    <div>
        <div className="row state-overview">
            <div className="col-lg-4 col-sm-6" >
                <section className="panel">
                    <div className="symbol terques">
                        <i className="fa  fa-hand-pointer-o"></i>
                    </div>
                    <div className="value">
                        <h1 className="count">
                            {present}
                        </h1>
                        <p>Present</p>
                    </div>
                </section>
            </div>
            <div className="col-lg-4 col-sm-6">
                <section className="panel">
                    <div className="symbol red">
                        <i className="fa fa-users"></i>
                    </div>
                    <div className="value">
                        <h1 className=" count2">
                            {total}
                        </h1>
                        <p>Total</p>
                    </div>
                </section>
            </div>
            <div className="col-lg-4 col-sm-6">
                <section className="panel">
                    <div className="symbol yellow">
                        <i className="fa fa-percent"></i>
                    </div>
                    <div className="value">
                        <h1 className=" count3">
                            {percentage}
                        </h1>
                        <p>Percentage</p>
                    </div>
                </section>
            </div>
        </div>
    </div>);

export default MetricsDashboard;