import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost } from "../../actions/posts.actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from "react-share";

import './PostHero.css';
import { Button } from '@material-ui/core';

const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

class PostHero extends Component {

    renders = {
        renderUpdateDeleteButtons: () => {
            if (this.props.isAuthenticated) {
                if (this.props.post) {
                    return (
                        <div className="hero-buttons">
                            <Link
                                to={`/post/modify/${this.props.post.post_id}`}
                                className="unstyled-link"
                            >
                                <Button><FontAwesomeIcon icon={faTrashAlt} />Modificar</Button>
                            </Link>
                            <Button onClick={this.handlers.handleDelete}><FontAwesomeIcon icon={faPencilAlt} />Borrar</Button>
                        </div>
                    );
                }
            }
        },
    }

    handlers = {
        handleDelete: () => {
            this.props.deletePost(this.props.postId);
        }

    }

    render() {
        const date = new Date(this.props.date);
        let formatDate = `${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`;
        return (
            <div className="hero">
                <div className="hero-title">
                    <h1>{this.props.title}</h1>
                </div>
                <div>
                    <p className="date"><FontAwesomeIcon icon={faCalendarAlt} />{formatDate}</p>
                </div>
                {this.renders.renderUpdateDeleteButtons()}
                <div className="social-media-buttons">
                    <FacebookShareButton url={window.location.href}><FacebookIcon size={32} /></FacebookShareButton>
                    <TwitterShareButton url={window.location.href}><TwitterIcon size={32} /></TwitterShareButton>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { deletePost })(PostHero);
