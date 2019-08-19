import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

class Post extends Component {
    render() {
        const { title, created_date } = this.props;
        const date = new Date(created_date);
        let formatDate = `${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`;
        return (
            <div>
                <Link className="post-card-link" to={`/post/${this.props.id}`}>
                    <Card className="post-card">
                        <Typography className="post-card-title" variant="h4">{title}</Typography>
                        <Typography className="post-card-date">{formatDate}</Typography>
                    </Card>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {})(Post);

