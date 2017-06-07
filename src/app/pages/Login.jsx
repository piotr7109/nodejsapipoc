import React from 'react';

export default class Login extends React.Component {

    constructor() {
        super();
        this.state = {mode: 0};
    }

    updateMode(mode) {
        this.setState({mode});
    }

    handleSubmit(event) {
        this.updateMode(1);
        event.preventDefault();
    }

    getForm() {
        return (
            <form onSubmit={event => this.handleSubmit(event)} className="Form navbar-form">
                <div className="form-row">
                    <label htmlFor="login-form" className="form-label">Login</label>
                    <input id="login-input" required type="text" className="form-control form-input-control"
                           name="login-input" placeholder="Login"/>
                </div>
                <div className="form-row">
                    <label htmlFor="password-input" className="form-label">Password</label>
                    <input id="password-input" required type="text" className="form-control form-input-control"
                           name="password-input" placeholder="Password"/>
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