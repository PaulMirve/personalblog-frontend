import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { Card, CardContent, Avatar, CardHeader, Button, CardActions } from '@material-ui/core';
import { deleteComment, updateComment } from "../../../actions/comments.actions";

class Comment extends Component {

    state = { editable: false }

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
                            <Button onClick={() => this.setState({ editable: true })}>
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
                        <Button onClick={this.props.handleSubmit(this.handlers.handleEditSubmit)}>Save</Button>
                    </div>
                );
            }
        },
        renderTextField: ({ input, label, meta: { touched, error }, ...custom }) => {
            return (
                <textarea
                    {...custom}
                    {...input}
                    style={{ width: '100%', height: '30px' }}
                    cols="30"
                    rows="10"
                />
            );
        },

    };

    handlers = {
        handleEditSubmit: (text) => {
            this.props.updateComment(this.props.data.comment_id, text);
            this.setState({ editable: false });
        },

    }

    render() {
        const { author, text, created_date } = this.props.data;
        return (
            <div>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar>
                                P
                             </Avatar>
                        }

                        title={author}
                        subheader={created_date}
                    />
                    <CardContent>
                        {
                            this.state.editable === true ?
                                <Field
                                    name="text"
                                    component={this.renders.renderTextField}
                                    text={text}
                                />
                                :
                                <p>{text}</p>
                        }

                    </CardContent>
                    <CardActions>
                        {
                            this.state.editable === true ? this.renders.renderEditButtons() : this.renders.renderButtons()
                        }
                    </CardActions>
                </Card>
            </div>
        )
    }
}

const formWrapped = reduxForm({ form: 'edit_form' })(Comment);

const mapStateToProps = (state, ownProps) => {
    return {
        googleAuth: state.auth.googleAuth,
        initialValues: {
            text: ownProps.data.text
        }
    }
};

export default connect(mapStateToProps, { deleteComment, updateComment })(formWrapped);
