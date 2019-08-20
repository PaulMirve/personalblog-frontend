import React, { Component } from 'react';
import { reduxForm, Field } from "redux-form";
import { connect } from 'react-redux';
import { saveComment } from "../../../actions/comments.actions";
import { Button, Grid } from '@material-ui/core';

import './Comment.css';

class AddComment extends Component {
    renders = {
        renderTextArea: ({ input, meta: { touched, error }, ...custom }) => {
            return (
                <textarea cols="30" rows="10" {...input} {...custom} />
            );
        }

    };

    handlers = {
        handleCommentClick: ({comment}) => {
            const date = new Date();

            const comm = {
                author: 'Paul Miranda Vega',
                author_email: 'paul.mv396@gmail.com',
                created_date: `${date.getFullYear()}-${ ('0' + (date.getMonth()+1)).slice(-2)}-${date.getDate()} ${date.toLocaleTimeString()}`,
                post: this.props.postId,
                text: comment
            }
            this.props.saveComment(comm);
        }

    }

    render() {
        return (
            <div>
                <Grid item xs={12} md={5}>
                    <Field
                        component={this.renders.renderTextArea}
                        name="comment"
                        className="comment-textarea"
                    />
                </Grid>
                <Grid item xs={12} md={5} className="comment-button">
                    <Button                    
                        onClick={this.props.handleSubmit(this.handlers.handleCommentClick)}
                    >
                        Comment
                        </Button>
                </Grid>
            </div>
        )
    }
}

const formWrapped = reduxForm({ form: 'comment_form' })(AddComment);

export default connect(null, { saveComment })(formWrapped);