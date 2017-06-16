import React from "react";
import {Link} from "react-router";

export default class Menu extends React.Component {
    render() {
        if (localStorage.getItem("userId") !== null) {
            return (
                <div className="btn-group">
                    <Link className="btn btn-danger" to="/" onClick={() => localStorage.removeItem("userId")}>Sign out</Link>
                    <Link className="btn btn-success" to="/articles/create">Add Article</Link>
                    <Link className="btn btn-success" to="/articles/list">Articles List</Link>
                </div>
            );
        }

        return (
            <div className="btn-group">
                <Link className="btn btn-success" to="/login">Sign in</Link>
                <Link className="btn btn-primary" to="/register">Register</Link>
            </div>
        );
    }
}