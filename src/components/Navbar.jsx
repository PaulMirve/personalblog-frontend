import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button, Hidden, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFileSignature, faSignInAlt, faUser, faFileCode } from '@fortawesome/free-solid-svg-icons';
import { } from "@fortawesome/free-solid-svg-icons";

import './Navbar.css';
import { logout } from '../actions/auth.actions';

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
                            <Link className="unstyled-link" to="/"><Button>Blog</Button></Link>
                            <Link className="unstyled-link" to="/about-me"><Button>About Me</Button></Link>
                            <Link className="unstyled-link" to="/projects"><Button>Projects</Button></Link>
                            {
                                this.props.isAuthenticated === true ?
                                    <Button onClick={this.props.logout}>Logout</Button>
                                    : <Link to="/login" className="nav-link"><Button className="nav-button">Login</Button></Link>
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
                            <ListItemText><Link to="/blog" className="unstyled-link nav-item-text">Blog</Link ></ListItemText>
                        </ListItem>
                        <ListItem >
                            <ListItemIcon><FontAwesomeIcon icon={faUser} className="nav-list-item-icon" /></ListItemIcon>
                            <ListItemText><Link to="/about-me" className="unstyled-link nav-item-text">About Me</Link ></ListItemText>
                        </ListItem>
                        <ListItem >
                            <ListItemIcon><FontAwesomeIcon icon={faFileCode} className="nav-list-item-icon" /></ListItemIcon>
                            <ListItemText><Link to="/projects" className="unstyled-link nav-item-text">Projects</Link ></ListItemText>
                        </ListItem>
                        <ListItem className="nav-menu-item">
                            <ListItemIcon><FontAwesomeIcon icon={faSignInAlt} className="nav-list-item-icon" /></ListItemIcon>
                            {
                                this.props.isAuthenticated === true ?
                                    <ListItemText onClick={this.props.logout} className="nav-item-text">Logout</ListItemText>
                                    : <ListItemText><Link to="/login" className="unstyled-link nav-item-text">Login</Link></ListItemText>
                            }
                        </ListItem>
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