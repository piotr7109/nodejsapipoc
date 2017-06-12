import React from 'react';
import serialize from 'form-serialize';
import * as axios from 'axios';

export default class Login extends React.Component {
    componentWillMount() {
        window.localStorage.clear();//TO REMOVE
        this.state = {mode: 0};
        if (localStorage.getItem('userId') !== null) {
            this.updateMode(3);
        }
    }

    updateMode(mode) {
        this.setState({mode});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
            .post('/user/login', this.getFormData(event))
            .then(result => {
                const userId = result.data.id;

                if (userId) {
                    localStorage.setItem('userId', userId);
                    return 1;
                }

                return -1;
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
                return <div className="alert alert-success">Succesfully logged in!</div>;
                break;
            case 2:
                return <div>Success</div>;
                break;
            case 3:
                return <div className="alert alert-warning">You are already logged in!</div>;
                break;
            case -1:
                return <div className="alert alert-danger">Enter a valid credentials</div>;
                break;
            case -10:
                return <div>Loading</div>;
                break;
        }
    }
}