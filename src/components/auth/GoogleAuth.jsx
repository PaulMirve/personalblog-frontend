import React, { Component } from 'react';
import { CircularProgress, Button, Menu, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';

class GoogleAuth extends Component {

    state = { isSignedIn: null, name: null, isOpen: false, anchorEl: null }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '504459634167-7vd94dh1ahm5qmbbh8fgmf52veaq4j5p.apps.googleusercontent.com',
                scope: 'email',
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                if (this.auth.isSignedIn.get()) {
                    this.setState({ name: this.auth.currentUser.get().getBasicProfile().getName() });
                }
                this.auth.isSignedIn.listen(this.handlers.onAuthChange);
            });
        });
    };

    renders = {
        renderAuthButton: () => {
            if (this.state.isSignedIn === null) {
                return <CircularProgress />
            } else if (this.state.isSignedIn) {
                return (
                    <Button onClick={(e) => this.setState({ isOpen: true, anchorEl: e.target })}>
                        {this.state.name ? this.state.name : ''}
                    </Button>)
            } else {
                return <Button onClick={this.handlers.handleSingIn}>Sign In</Button>
            };
        },
        renderMenu: () => {
            return (
                <Menu
                    open={this.state.isOpen}
                    onClose={this.handlers.handleMenuClose}
                    anchorEl={this.state.anchorEl}
                >
                    <MenuItem>
                        <Button onClick={this.handlers.handleSignOut}>Logout</Button>
                    </MenuItem>
                </Menu>
            );
        }

    };

    handlers = {
        onAuthChange: () => {
            this.setState({ isSignedIn: this.auth.isSignedIn.get(), name: this.auth.currentUser.get().getBasicProfile().getName() });
        },
        handleButtonClick: (params) => {
        },
        handleMenuClose: () => {
            this.setState({ isOpen: false });
        },
        handleSingIn: () => {
            this.auth.signIn();
        },
        handleSignOut: () => {
            this.auth.signOut();
            this.setState({ isOpen: false });
        },

    };

    render() {
        return (
            <div style={{ color: 'white' }}>
                {this.renders.renderAuthButton()}
                {this.renders.renderMenu()}
            </div>
        )
    }
}

export default connect(null, {})(GoogleAuth);
