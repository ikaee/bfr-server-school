import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class NavMenu extends Component {
    constructor() {
        super();
        this.state = {
            linkKey: 1
        }
    }

    activeClass = key => this.state.linkKey === key ? "active" : ""
    activeKey = linkKey => this.setState({linkKey});

    render() {
        return (
            <aside>
                <div id="sidebar" className="nav-collapse ">
                    <ul className="sidebar-menu" id="nav-accordion">
                        <li>
                            <Link className={this.activeClass(1)} onClick={() => this.activeKey(1)} to={"/"}>
                                <i className="fa fa-line-chart"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={this.activeClass(2)} onClick={() => this.activeKey(2)} to={"/amr"}>
                                <i className="fa fa-table"></i>
                                <span>AMR</span>
                            </Link>
                        </li>

                        <li>
                            <Link className={this.activeClass(3)} onClick={() => this.activeKey(3)} to={"/mid-day"}>
                                <i className="fa fa-table"></i>
                                <span>Mid day Meal</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={this.activeClass(4)} onClick={() => this.activeKey(4)} to={"/admin"}>
                                <i className="fa fa-user-circle"></i>
                                <span>Admin</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

        )
    }
}
