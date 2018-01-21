import React, {Component} from "react";
import axios from 'axios';

export default class Admin extends Component {
    constructor(){
        super();
        this.state = {
            loaded: true
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const schoolcode = this.refs.schoolcode.value;
        const studentcode = this.refs.studentcode.value;
        const name = this.refs.firstname.value;
        const surname = this.refs.surname.value;
        const gender = this.refs.gender.value;
        const dob = this.refs.dob.value;
        const registration = {schoolcode, studentcode, name, surname, gender, dob}
        this.setState({loaded: false})
        axios.post("").then(data => {

        }).catch(err => {

        })
    }

    render() {
        return (
                <section className="wrapper">
                    <div className="row">
                        <div className="col-lg-12">
                            <section className="panel">
                                <header className="panel-heading">
                                    Registration
                                </header>
                                <div className="panel-body">
                                    <div className="form">
                                        <form className="cmxform form-horizontal tasi-form" id="signupForm" method="get"
                                              action="" onSubmit={this.handleSubmit}>
                                            <div className="form-group ">
                                                <label for="schoolcode" className="control-label col-lg-2">Code</label>
                                                <div className="col-lg-10">
                                                    <input className=" form-control" id="schoolcode" name="schoolcode"
                                                           type="text" ref="schoolcode"/>
                                                </div>
                                            </div>
                                            <div className="form-group ">
                                                <label for="studentcode" className="control-label col-lg-2">Beneficiary Code</label>
                                                <div className="col-lg-10">
                                                    <input className=" form-control" id="studentcode" name="studentcode"
                                                           type="text" ref="studentcode"/>
                                                </div>
                                            </div>
                                            <div className="form-group ">
                                                <label for="firstname" className="control-label col-lg-2">Firstname</label>
                                                <div className="col-lg-10">
                                                    <input className=" form-control" id="firstname" name="firstname"
                                                           type="text" ref="firstname"/>
                                                </div>
                                            </div>
                                            <div className="form-group ">
                                                <label for="surname" className="control-label col-lg-2">Surname</label>
                                                <div className="col-lg-10">
                                                    <input className=" form-control" id="surname" name="surname"
                                                           type="text" ref="surname"/>
                                                </div>
                                            </div>
                                            <div className="form-group ">
                                                <label for="gender" className="control-label col-lg-2">Gender</label>
                                                <div className="col-lg-10">
                                                    <input className="form-control " id="gender" name="gender"
                                                           type="text" ref="gender"/>
                                                </div>
                                            </div>
                                            <div className="form-group ">
                                                <label for="dob" className="control-label col-lg-2">DOB</label>
                                                <div className="col-lg-10">
                                                    <input className=" form-control" id="dob" name="dob"
                                                           type="text" ref="dob"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-lg-offset-2 col-lg-10">
                                                    <button className="btn btn-danger" type="submit" value="Submit">Submit</button>
                                                    <button className="btn btn-default" type="button">Cancel</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
        )
    }
}