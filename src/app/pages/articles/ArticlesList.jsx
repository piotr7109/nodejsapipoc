import React from "react";
import {Link} from "react-router";
import * as axios from "axios";

export default class ArticlesList extends React.Component {

    componentWillMount() {
        this.articles = [
            {
                title: "Title",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                author: "Chuj wie",
                introduction: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            },
            {
                title: "Title",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                author: "Chuj wie",
                introduction: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            },
            {
                title: "Title",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                author: "Chuj wie",
                introduction: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            },
            {
                title: "Title",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                author: "Chuj wie",
                introduction: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            },
            {
                title: "Title",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                author: "Chuj wie",
                introduction: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            }
        ];

        this.state = {mode: 0};
        //this.loadData();
    }

    loadData() {
        axios.get("/articles")
            .then(result => {
                this.articles = result.data;
                return 0;
            })
            .catch(() => -1)
            .then(mode => this.setState({mode}));
    }

    getArticles() {
        return (
            <div className="row articles-list">
                {
                    this.articles.map(article => {
                        return (
                        <div className="col-sm-6">
                            <div className="article jumbotron">
                                <div className="container">
                                    <h2>{article.title}</h2>
                                    <p>{article.introduction}</p>
                                    <span className="label label-info">Author: {article.author}</span>
                                    <p>
                                        <Link className="btn btn-primary btn-lg" to={`/article/${article.id}`}>
                                            Show full article
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                            );
                        })
                    }
            </div>
        );
    }

    render() {
        switch (this.state.mode) {
            case 0:
                return this.getArticles();
                break;
            case -1:
                return <div className="alert alert-danger">Articles list cannot be loaded</div>;
                break;
            case -10:
                return <div className="alert alert-waring">Loading</div>;
                break;

        }
    }
}