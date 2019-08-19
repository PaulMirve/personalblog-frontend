import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux';

import PostList from './blog/PostList';
import Login from './auth/Login';
import { isAuthenticated } from '../actions/auth.actions';
import Post from './blog/Post';
import AddPost from './blog/AddPost';
import UpdatePost from './blog/UpdatePost';
import RequireAuth from './auth/RequireAuth';
import { CircularProgress } from '@material-ui/core';
import Navbar from './Navbar';
import AboutMe from './aboutme/AboutMe';
import Projects from './projects/Projects';

class App extends Component {
    componentDidMount() {
        this.props.isAuthenticated();
    }
    render() {
        if (this.props.auth !== undefined) {
            return (
                <div>
                    <Navbar />
                    <Route exact path="/" component={PostList} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/about-me" component={AboutMe} />
                    <Route exact path="/projects" component={Projects} />
                    <Route exact path="/post/:id" component={Post} />
                    <Route exact path="/posts/new" component={RequireAuth(AddPost)} />
                    <Route exact path="/post/modify/:id" component={RequireAuth(UpdatePost)} />
                </div>
            )
        } else {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <div>
                        <CircularProgress
                            style={{
                                height: '100px',
                                width: '100px',
                            }}
                        />
                        <p>Cargando...</p>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { isAuthenticated })(App);
