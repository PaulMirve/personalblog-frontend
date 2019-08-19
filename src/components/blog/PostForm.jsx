import React, { Component } from 'react'
import { Container, Button } from '@material-ui/core';
import { Field, reduxForm } from "redux-form";
import ImageTool from '@editorjs/image';
import Editor from '@stfy/react-editor.js';
import { TextField } from '@material-ui/core';
import url from '../../api/url';

import './PostForm.css';

class PostForm extends Component {
    renders = {
        renderTextField: ({ input, label, meta: { touched, error }, ...custom }) => {
            return (
                <TextField label={label} {...input} {...custom} />
            );
        },
        renderEditor: ({ input, label, meta: { touched, error }, ...custom }) => {
            return <Editor  {...input} {...custom} />
        }
    }

    handlers = {
        handleSave: ({ title, text }) => {
            let JSONToText = JSON.stringify(text);
            const post = { title, text: JSONToText }
            this.props.savePost(post, this.props.postId);
        },

    }

    render() {
        return (
            <div>
                <Container>
                    <Field
                        name="title"
                        component={this.renders.renderTextField}
                        label="Titulo"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        autoFocus
                    />
                    <Field
                        component={this.renders.renderEditor}
                        name="text"
                        autofocus
                        excludeDefaultTools={['code', 'raw']}
                        customTools={{
                            image: {
                                class: ImageTool,
                                config: {
                                    endpoints: {
                                        byFile: `${url}/image/`, // Your backend file uploader endpoint
                                        byUrl: `${url}/image/`, // Your endpoint that provides uploading by Url
                                    },
                                    field: 'image_url',
                                    additionalRequestHeaders: {
                                        authorization: `Token ${localStorage.getItem('accessToken')}`,
                                    }
                                }
                            }
                        }}
                        data={this.props.data}
                    />
                    <Button
                        fullWidth
                        onClick={this.props.handleSubmit(this.handlers.handleSave)}
                        className="save-post-button"
                    >
                        Guardar
                    </Button>
                </Container>
            </div>
        )
    }
}

export default reduxForm({
    form: 'steam_form',
})(PostForm);