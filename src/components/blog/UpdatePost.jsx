import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPost, updatePost } from "../../actions/posts.actions";
import PostForm from './PostForm';
import { CircularProgress } from '@material-ui/core';

class UpdatePost extends Component {

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id);
    }

    render() {
        if (this.props.post) {
            let data = JSON.parse(this.props.post.text);
            return (
                <div>
                    <PostForm
                        initialValues={{
                            title: this.props.post.title,
                        }}
                        data={data}
                        savePost={this.props.updatePost}
                        postId={this.props.post.post_id}
                    />
                </div>
            )
        }else{
            return(
                <CircularProgress/>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => ({
    post: state.posts[ownProps.match.params.id],
});

export default connect(mapStateToProps, { fetchPost, updatePost })(UpdatePost);
