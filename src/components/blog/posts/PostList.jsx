import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Post from './PostCard';
import { fetchPosts } from '../../../actions/posts.actions';
import { Container } from '@material-ui/core';
import './PostList.css';

class PostList extends Component {

    componentDidMount() {
        this.props.fetchPosts();
    }
    render() {
        return (
            <div>
                <Container className="posts-container">
                    {this.props.isAuthenticated ?
                        <div className="add-post">
                            <FontAwesomeIcon icon={faPlus} style={{marginRight: '5px'}} />
                            <Link to="/posts/nuevo">New Post</Link>
                        </div> : ''}
                    {
                        this.props.posts.map(post => {
                            return <Post
                                key={post.post_id}
                                id={post.post_id}
                                title={post.title}
                                content={post.text}
                                created_date={post.created_date}
                            />
                        })
                    }
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    posts: Object.values(state.posts),
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { fetchPosts })(PostList);