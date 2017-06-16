import * as React from "react";
import Menu from "./Menu";

export default class Template extends React.Component {
    render() {
        return (
            <div className="page">
                <Menu />
                <div className="wrapper">
                    <section className="content">
                        <div className="content-wrapper">
                            {this.props.children}
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}