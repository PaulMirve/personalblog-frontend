import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button, Hidden, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFileSignature, faSignInAlt, faUser, faFileCode } from '@fortawesome/free-solid-svg-icons';
import { } from "@fortawesome/free-solid-svg-icons";

import './Navbar.css';
import { logout } from '../actions/auth.actions';
import GoogleAuth from './auth/GoogleAuth';

class FrontPage extends Component {

    state = {
        isOpen: false,
    }

    handlers = {
        handleBurguerButtonClick: () => {
            this.setState({ isOpen: true });
        }
    };

    render() {
        return (
            <AppBar position="static" className="navbar">
                <Toolbar>
                    <Link to="/" className="nav-link">
                        <img src={require('../static/img/paul-logo.png')} alt="Logo" className="navbar-logo" />
                    </Link>
                    <Link to="/" className="nav-link nav-title"><Typography variant="h6">PaulMirve</Typography></Link>
                    <div className="buttons">
                        <Hidden smDown>
                            <NavLink
                                activeClassName="active"
                                className="unstyled-link"
                                exact
                                to="/"
                            >
                                <Button>Blog</Button>
                            </NavLink>
                            <NavLink
                                activeClassName="active"
                                className="unstyled-link"
                                to="/about-me">
                                <Button>About Me</Button>
                            </NavLink>
                            <NavLink
                                activeClassName="active"
                                className="unstyled-link"
                                to="/projects"
                            >
                                <Button>Projects</Button>
                            </NavLink>
                            <GoogleAuth />
                            {
                                this.props.isAuthenticated === true ?
                                    <Button onClick={this.props.logout}>Logout</Button>
                                    : ''
                            }
                        </Hidden>
                        <Hidden mdUp><FontAwesomeIcon icon={faBars} className="burguer-button" onClick={this.handlers.handleBurguerButtonClick} /></Hidden>
                    </div>
                </Toolbar>
                <Drawer
                    open={this.state.isOpen}
                    onClose={() => this.setState({ isOpen: false })}
                    anchor="top"
                >
                    <List className="navbar-drawer-list">
                        <ListItem >
                            <ListItemIcon><FontAwesomeIcon icon={faFileSignature} className="nav-list-item-icon" /></ListItemIcon>
                            <ListItemText>
                                <NavLink
                                    activeClassName="active"
                                    exact
                                    to="/"
                                    className="unstyled-link nav-item-text"
                                >
                                    Blog
                                </NavLink >
                            </ListItemText>
                        </ListItem>
                        <ListItem >
                            <ListItemIcon><FontAwesomeIcon icon={faUser} className="nav-list-item-icon" /></ListItemIcon>
                            <ListItemText>
                                <NavLink
                                    activeClassName="active"
                                    to="/about-me"
                                    className="unstyled-link nav-item-text"
                                >
                                    About Me
                                </NavLink >
                            </ListItemText>
                        </ListItem>
                        <ListItem >
                            <ListItemIcon><FontAwesomeIcon icon={faFileCode} className="nav-list-item-icon" /></ListItemIcon>
                            <ListItemText>
                                <NavLink
                                    activeClassName="active"
                                    to="/projects"
                                    className="unstyled-link nav-item-text"
                                >
                                    Projects
                                </NavLink >
                            </ListItemText>
                        </ListItem>
                        <ListItem className="nav-menu-item">
                            <ListItemIcon><FontAwesomeIcon icon={faSignInAlt} className="nav-list-item-icon" /></ListItemIcon>
                            <GoogleAuth />
                        </ListItem>

                        {
                            this.props.isAuthenticated === true ?
                                <ListItem>
                                    <ListItemText onClick={this.props.logout} className="nav-item-text">Logout</ListItemText>
                                </ListItem> : ''
                        }

                    </List>
                </Drawer>
            </AppBar >
        )
    }
}

const mapStateToProps = (state) => {
    return { isAuthenticated: state.auth.isAuthenticated }
};


export default connect(mapStateToProps, { logout })(FrontPage);