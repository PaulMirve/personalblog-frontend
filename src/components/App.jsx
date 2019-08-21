import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux';

import PostList from './blog/posts/PostList';
import Login from './auth/Login';
import { isAuthenticated, googleAuthAuthenticated } from '../actions/auth.actions';
import Post from './blog/posts/Post';
import AddPost from './blog/posts/AddPost';
import UpdatePost from './blog/posts/UpdatePost';
import RequireAuth from './auth/RequireAuth';
import { CircularProgress } from '@material-ui/core';
import Navbar from './Navbar';
import AboutMe from './aboutme/AboutMe';
import Projects from './projects/Projects';

class App extends Component {
    componentDidMount() {
        this.props.isAuthenticated();
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '504459634167-7vd94dh1ahm5qmbbh8fgmf52veaq4j5p.apps.googleusercontent.com',
                scope: 'email',
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                if (this.auth.isSignedIn.get()) {
                    this.props.googleAuthAuthenticated({
                        isSigned: this.auth.isSignedIn.get(),
                        userName: this.auth.currentUser.get().getBasicProfile().getName(),
                        userEmail: this.auth.currentUser.get().getBasicProfile().getEmail(),
                        userImage: this.auth.currentUser.get().getBasicProfile().getImageUrl()

                    });
                } else {
                    this.props.googleAuthAuthenticated({ isSigned: this.auth.isSignedIn.get() });
                }
                this.auth.isSignedIn.listen(this.handlers.onAuthChange);
            });
        });
    }

    handlers = {
        onAuthChange: () => {
            if (this.auth.isSignedIn.get()) {
                this.props.googleAuthAuthenticated({
                    isSigned: this.auth.isSignedIn.get(),
                    userName: this.auth.currentUser.get().getBasicProfile().getName(),
                    userEmail: this.auth.currentUser.get().getBasicProfile().getEmail(),
                    userImage: this.auth.currentUser.get().getBasicProfile().getImageUrl()
                });
            } else {
                this.props.googleAuthAuthenticated({
                    isSigned: this.auth.isSignedIn.get(),
                });
            }

        }

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

export default connect(mapStateToProps, { isAuthenticated, googleAuthAuthenticated })(App);
