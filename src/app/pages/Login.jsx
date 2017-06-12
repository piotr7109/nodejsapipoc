import React from 'react';
import serialize from 'form-serialize';
import * as axios from 'axios';

export default class Login extends React.Component {

    constructor() {
        super();
        this.state = {mode: 0};
    }

    updateMode(mode) {
        this.setState({mode});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
            .post('/user/login', this.getFormData(event))
            .then(result => console.log(result));
    }

    getFormData(event) {
        const target = event.target,
            data = serialize(target, {hash: true}),
            formData:FormData = new FormData();

        formData.append('userData', JSON.stringify(data));

        return formData;
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
                <input type="submit" className="btn btn-primary" value="Log in"/>
            </form>
        )
    }

    render() {
        switch (this.state.mode) {
            case 0:
                return this.getForm();
                break;
            case 1:
                return <div>mode 1</div>;
                break;
            case 2:
                return <div>Success</div>;
                break;
            case -1:
                return <div>Fail</div>;
                break;
            case -10:
                return <div>Loading</div>;
                break;
        }
    }
}