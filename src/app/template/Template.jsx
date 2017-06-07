import * as React from 'react';

export default class Template extends React.Component {
    render() {
        return (
            <div className="page">
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