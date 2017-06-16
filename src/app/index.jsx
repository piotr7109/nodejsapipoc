import React from "react";
import {render} from "react-dom";
import {Router, Route, hashHistory} from "react-router";
import Template from "./template/Template";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateArticleForm from "./pages/articles/CreateArticleForm";
import Article from "./pages/articles/Article";
import ArticlesList from "./pages/articles/ArticlesList";

class App extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route component={Template}>
                    <Route path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/articles/create" component={CreateArticleForm}/>
                    <Route path="/article/:id" component={Article}/>
                    <Route path="/articles/list" component={ArticlesList}/>
                </Route>
            </Router>
        );
    }
}

render(<App/>, document.getElementById("app"));