import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Card, CardContent, Avatar, CardHeader } from '@material-ui/core';

class Comment extends Component {
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
                        <p>{text}</p>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {})(Comment);
