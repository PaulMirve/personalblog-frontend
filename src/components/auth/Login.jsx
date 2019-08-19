import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { Grid, TextField, Container, Button, Avatar, Typography, SnackbarContent } from '@material-ui/core';

import './Login.css';
import { login } from '../../actions/auth.actions';

class Login extends Component {
    handleSubmit = (e) => {
        this.props.login(e);
    }

    renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
        return (
            <TextField label={label} {...input} {...custom} />
        );
    }

    render() {
        return (
            <div>
                <Container >
                    <Grid container className="container">
                        <Grid item xs={12} md={6} className="form-container">
                            <div className="avatar-container">
                                <Avatar className="icon-avatar"><FontAwesomeIcon className="icon" icon={faLock} /></Avatar>
                            </div>
                            <Typography variant="h3">Login</Typography>
                            {
                                this.props.auth === 'error' ?
                                    <SnackbarContent
                                        style={{backgroundColor:"red"}}
                                        message="Usuario o contraseña equivocada"
                                    /> :
                                    ''
                            }
                            <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                                <Field
                                    name="username"
                                    component={this.renderTextField}
                                    label="Nombre de usuario"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    required
                                    autoFocus
                                />
                                <Field
                                    name="password"
                                    component={this.renderTextField}
                                    type="password"
                                    label="Contraseña"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    required
                                    autoFocus
                                />
                                <Button
                                    type="submit"
                                    className="login-btn"
                                    fullWidth
                                    variant="contained"
                                >
                                    Entrar
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth.isAuthenticated
})

const formWrapped = reduxForm({ form: 'login_form' })(Login);

export default connect(mapStateToProps, { login })(formWrapped);
