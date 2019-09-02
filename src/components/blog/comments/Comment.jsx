import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Card, CardContent, Avatar, CardHeader, Button, CardActions, Grid } from '@material-ui/core';
import { deleteComment, updateComment } from "../../../actions/comments.actions";

import './Comment.css';

const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Diciember'
];

class Comment extends Component {

    state = { editable: false, text: '' }

    renders = {
        renderButtons: () => {
            if (this.props.googleAuth) {
                if (this.props.googleAuth.userEmail === this.props.data.author_email) {
                    return (
                        <div>
                            <Button
                                onClick={() => { this.props.deleteComment(this.props.data.comment_id) }}
                            >
                                Delete
                            </Button>
                            <Button onClick={() => this.setState({ editable: true, text: this.props.data.text })}>
                                Edit
                            </Button>
                        </div>
                    );
                }
            }
        },
        renderEditButtons: () => {
            if (this.state.editable === true) {
                return (
                    <div>
                        <Button onClick={() => this.setState({ editable: false })}>Cancel</Button>
                        <Button onClick={this.handlers.handleEditSubmit}>Save</Button>
                    </div>
                );
            }
        },
        renderTextField: () => {
            return (
                <textarea
                    style={{ width: '100%', height: '30px' }}
                    value={this.state.text}
                    onChange={(e) => this.setState({ text: e.target.value })}
                    cols="30"
                    rows="10"
                />
            );
        },

    };

    handlers = {
        handleEditSubmit: () => {
            this.props.updateComment(this.props.data.comment_id, { text: this.state.text });
            this.setState({ editable: false });
        },

    }

    render() {
        const { author, text, created_date, author_image } = this.props.data;
        const date = new Date(created_date);
        let formatDate = `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
        return (
            <div>
                <Grid item xs={12} md={6} component={Card} className="comment-card" >
                    <CardHeader
                        avatar={
                            <Avatar src={author_image} />
                        }

                        title={author}
                        subheader={formatDate}
                    />
                    <CardContent className="comment-text">
                        {
                            this.state.editable === true ?
                                this.renders.renderTextField()
                                :
                                <p>{text}</p>
                        }

                    </CardContent>
                    <CardActions>
                        {
                            this.state.editable === true ? this.renders.renderEditButtons() : this.renders.renderButtons()
                        }
                    </CardActions>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        googleAuth: state.auth.googleAuth,
        initialValues: {
            text: ownProps.data.text
        }
    }
};

export default connect(mapStateToProps, { deleteComment, updateComment })(Comment);
