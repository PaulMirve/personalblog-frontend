import React, { Component } from 'react'
import { connect } from 'react-redux';

import { fetchPost } from "../../../actions/posts.actions";
import { fetchComments } from "../../../actions/comments.actions";
import HTMLGenerator from './HTMLGenerator';
import { Container, Grid } from '@material-ui/core';
import PostHero from './PostHero';
import Comment from '../comments/Comment';
import AddComment from '../comments/AddComment';

class Post extends Component {
    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id);
        this.props.fetchComments(this.props.match.params.id);
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
                </Container>
                <div className="comments-section" >
                    <h1 style={{fontSize: '50px'}}>Comments</h1>
                    <AddComment postId={this.props.match.params.id} />
                    {
                        this.props.comments.map((comment, index) => {
                            return (
                                <Comment key={index} data={comment} />
                            );
                        }).reverse()
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    post: state.posts[ownProps.match.params.id],
    comments: Object.values(state.comments),
})

export default connect(mapStateToProps, { fetchPost, fetchComments })(Post);
