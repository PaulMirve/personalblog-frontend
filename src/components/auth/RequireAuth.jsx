import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import history from '../../history';

export default function(ComposedComponent){
    class Authentication extends Component{
        componentWillMount(){
            if(!this.props.authenticated){
                history.push('/login');
            }
        }

        componentWillUpdate(nextProps){
            if(!nextProps.authenticated){
                history.push('/login');
            }
        }

        PropTypes = {
            router: PropTypes.object,
        }

        render(){
            return <ComposedComponent {...this.props}/>
        }
    }

    const mapStateToProps = (state) => {
        return {authenticated: state.auth.isAuthenticated};
    }

    return connect(mapStateToProps)(Authentication);
    
}