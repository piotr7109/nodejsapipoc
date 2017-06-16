import React from "react";
import * as axios from "axios";

export default class Article extends React.Component {

    componentWillMount() {
        this.state = {mode: -10};
        this.id = this.props.params.id || 0;
        this.loadArticle();
    }

    loadArticle() {
        axios.get(`article/${this.id}`)
            .then(response => {
                this.article = response.data;
                return 0;
            })
            .catch(() => -1)
            .then(mode => this.setState({mode}));
    }

    getArticleMarkup() {
        return (
            <article className="article jumbotron">
                <div className="container">
                    <h1>{this.article.title}</h1>
                    <p>{this.article.description}</p>
                    <span className="label label-info">Author: {this.article.author}</span>
                </div>
            </article>
        );
    }

    render() {
        this.article = {
            title: "Title",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            author: "Chuj wie",
            introduction: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        };
        return this.getArticleMarkup();

        switch (this.state.mode) {
            case 0:
                return this.getArticleMarkup();
                break;
            case -1:
                return <div className="alert alert-danger">Article not found</div>;
                break;
            case -10:
                return <div className="alert alert-waring">Loading</div>;
                break;
        }
    }
}