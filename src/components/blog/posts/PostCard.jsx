import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Diciember'
];

class Post extends Component {
    render() {
        const { title, created_date } = this.props;
        const date = new Date(created_date);
        let formatDate = `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
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

