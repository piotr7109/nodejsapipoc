import React from "react";
import {Link} from "react-router";
import serialize from "form-serialize";
import * as axios from "axios";

export default class Register extends React.Component {

    componentWillMount() {
        this.state = {mode: 0};
    }

    updateMode(mode) {
        this.setState({mode});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
            .post("/user/register", this.getFormData(event))
            .then(() => 1)
            .catch(error => {
                const errorRes = error.response;

                if (errorRes && errorRes.status === 401) {
                    return -1;
                }

                return -2;
            })
            .then(mode => this.updateMode(mode));
    }

    getFormData(event) {
        const target = event.target;

        return serialize(target, {hash: true});
    }

    getForm() {
        return (
            <form onSubmit={event => this.handleSubmit(event)} className="Form navbar-form">
                <div className="form-row">
                    <label htmlFor="login-form" className="form-label">Login</label>
                    <input className="form-control form-input-control"
                           id="login-input" required type="text" name="login" placeholder="Login"/>
                </div>
                <div className="form-row">
                    <label htmlFor="password-input" className="form-label">Password</label>
                    <input className="form-control form-input-control"
                           id="password-input" required type="text" name="password" placeholder="Password"/>
                </div>
                <input type="submit" className="btn btn-primary" value="Register user"/>
            </form>
        )
    }

    getHomePageLink() {
        return (
            <Link className="menu-item-link" to="/">
                Back to Homepage
            </Link>
        );
    }

    render() {
        const formTemplate = this.getForm();

        switch (this.state.mode) {
            case 0:
                return formTemplate;
                break;
            case 1:
                return (
                    <div>
                        <div className="alert alert-success">Successfully registered!</div>
                        {this.getHomePageLink()}
                    </div>
                );
                break;
            case -1:
                return (
                    <div>
                        <div className="alert alert-danger">User already exists!</div>
                        {formTemplate}
                    </div>
                );
                break;
            case -2:
                return (
                    <div>
                        <div className="alert alert-danger">Service error</div>
                        {formTemplate}
                    </div>
                );
                break;
            case -10:
                return <div>Loading</div>;
                break;
        }
    }
}