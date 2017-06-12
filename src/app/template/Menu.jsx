import React from 'react';
import {Link} from 'react-router';

export default class Menu extends React.Component {
    getLoginControls() {
        if (localStorage.getItem('userId') !== null) {
            return <Link to="/" onClick={() => localStorage.removeItem('userId')}>Logout</Link>;
        }

        return <Link to="/login">Login</Link>;
    }

    render() {
        return (
            <div>
                {this.getLoginControls()}
            </div>
        );
    }
}