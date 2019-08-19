import React, { Component } from 'react';
import { connect } from 'react-redux';

import './AddPost.css';
import { savePost } from '../../actions/posts.actions';
import PostForm from './PostForm';

class AddPost extends Component {

    state = {
        selectedFile: null,
    }

    render() {
        return (
            <div>
                <PostForm
                    savePost={this.props.savePost}
                />
            </div>
        )
    }
}

export default connect(null, { savePost })(AddPost);
