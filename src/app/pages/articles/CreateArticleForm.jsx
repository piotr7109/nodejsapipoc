import React from 'react';
import {Link} from 'react-router';
import serialize from 'form-serialize';
import * as axios from 'axios';

export default class CreateArticleForm extends React.Component {
    componentWillMount() {
        this.formControls = [
            {name: "title", textContent: "Title"},
            {name: "description", textContent: "Description"},
            {name: "author", textContent: "Author"},
            {name: "introduction", textContent: "Introduction"}
        ];
        this.state = {mode: 0};
    }

    updateMode(mode) {
        this.setState({mode});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
            .post('/article/create', this.getFormData(event))
            .then(result => {
                this.articleId = result.data;
                return 1;
            })
            .catch(error => -2)
            .then(mode => this.updateMode(mode));
    }

    getFormData(event) {
        const target = event.target;

        return serialize(target, {hash: true});
    }

    getForm() {
        return (
            <form onSubmit={event => this.handleSubmit(event)} className="Form navbar-form">
                {
                    this.formControls.map(item => {
                        return (
                        <div className="form-row">
                            <label htmlFor={`${item.name}-form`} className="form-label">{item.textContent}</label>
                            <input className="form-control form-input-control"
                                   id={`${item.name}-input`} required type="text" name={item.name} placeholder={item.textContent}/>
                        </div>
                            );
                        })
                    }
                <input type="submit" className="btn btn-primary" value="Create Article"/>
            </form>
        );
    }

    render() {
        const formTemplate = this.getForm();

        switch (this.state.mode) {
            case 0:
                return formTemplate;
            case 1:
                return (
                    <div>
                        <div className="alert alert-success">Article added!</div>
                        <Link to={`/article/${this.articleId}`}>See it</Link>
                    </div>
                );
            case -2:
                return (
                    <div>
                        <div className="alert alert-danger">Service error</div>
                        {formTemplate}
                    </div>
                );
            case -10:
                return <div>Loading</div>;
        }
    }
}