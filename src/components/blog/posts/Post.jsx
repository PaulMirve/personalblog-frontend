import React, { Component } from 'react'
import { connect } from 'react-redux';

import { fetchPost } from "../../actions/posts.actions";
import HTMLGenerator from './HTMLGenerator';
import { Container, Grid } from '@material-ui/core';
import PostHero from './PostHero';

class Post extends Component {
    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id);
    }

    renders = {
        renderTitle: () => {
            if (this.props.post) {
                return (
                    <PostHero
                        title={this.props.post.title}
                        post={this.props.post}
                        postId={this.props.match.params.id}
                        date={this.props.post.created_date}
                    />
                );
            }
        },
        renderText: () => {
            if (this.props.post) {
                let json = JSON.parse(this.props.post.text);
                return (
                    <HTMLGenerator text={json} />
                );
            }
        },
    };

    render() {
        return (
            <div>
                {this.renders.renderTitle()}
                <Container>
                    <Grid container>{this.renders.renderText()}</Grid>
                    {this.props.googleAuth ? <h1>Comments</h1> : ''}
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    post: state.posts[ownProps.match.params.id],
    googleAuth: state.auth.googleAuth,
})

export default connect(mapStateToProps, { fetchPost })(Post);
